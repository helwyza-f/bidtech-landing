<?php

namespace Tests\Feature\Checkout;

use App\Models\Template;
use App\Services\DomainService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

/**
 * Pencarian domain: parsing kueri, hasil live dari API IDCloudHost, dan cadangan DNS + harga katalog.
 * Cek DNS ditiru supaya tes tidak butuh jaringan: hanya "toko.com" yang dianggap sudah terdaftar.
 */
class DomainSearchTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Cache::flush();
        config(['services.idcloudhost.key' => null, 'domain.markup' => 0]);

        $this->partialMock(DomainService::class, function ($mock) {
            $mock->shouldReceive('isRegistered')->andReturnUsing(fn (string $domain) => $domain === 'toko.com');
        });
    }

    private function search(string $query): array
    {
        return $this->getJson('/api/domain/search?q='.urlencode($query))->assertOk()->json();
    }

    private function entry(array $result, string $domain): array
    {
        return collect($result['domains'])->firstWhere('domain', $domain);
    }

    public function test_query_parser_splits_name_and_extension(): void
    {
        $parse = app(DomainService::class);

        $this->assertSame(['base' => 'deny', 'ext' => 'com', 'is_exact' => true], $parse->parseQuery('deny.com'));
        $this->assertSame(['base' => 'bengkel', 'ext' => 'co.id', 'is_exact' => true], $parse->parseQuery('Bengkel.CO.ID'));
        $this->assertSame(['base' => 'toko', 'ext' => 'online', 'is_exact' => true], $parse->parseQuery('toko.online'));
        $this->assertSame(['base' => 'warung-kopi', 'ext' => null, 'is_exact' => false], $parse->parseQuery('  warung-kopi '));
        $this->assertSame(['base' => 'wwwtoko', 'ext' => 'online', 'is_exact' => true], $parse->parseQuery('https://www.toko.online/halaman?x=1'));
        $this->assertSame(['base' => 'a', 'ext' => 'id', 'is_exact' => true], $parse->parseQuery('--a--.id'));
    }

    public function test_short_queries_return_an_idle_result_without_searching(): void
    {
        $result = $this->search('a');

        $this->assertSame([], $result['domains']);
        $this->assertSame('idle', $result['source']);
        $this->assertFalse($result['is_live_api']);
    }

    public function test_without_api_key_it_falls_back_to_dns_and_catalog_prices(): void
    {
        $result = $this->search('toko');

        $this->assertSame('dns_fallback', $result['source']);
        $this->assertFalse($result['is_live_api']);
        $this->assertFalse($result['has_api_key']);
        $this->assertSame('Mode Standby (DNS Real-time & Katalog IDCloudHost)', $result['status_label']);
        $this->assertCount(30, $result['domains']);
        $this->assertSame('toko.com', $result['domains'][0]['domain']);

        $com = $this->entry($result, 'toko.com');
        $this->assertFalse($com['available']);
        $this->assertSame(238650, $com['price']);
        $this->assertSame(215000, $com['price_base']);
        $this->assertSame(23650, $com['tax_amount']);
        $this->assertSame(11, $com['tax_pct']);
        $this->assertTrue($com['includes_tax']);

        $this->assertTrue($this->entry($result, 'toko.id')['available']);
        $this->assertSame(222000, $this->entry($result, 'toko.id')['price']);
    }

    public function test_explicit_extension_is_listed_first_and_marked_exact(): void
    {
        $result = $this->search('toko.co.id');

        $this->assertSame('toko.co.id', $result['domains'][0]['domain']);
        $this->assertTrue($result['domains'][0]['is_exact_match']);
        $this->assertSame(['toko.co.id'], collect($result['domains'])->where('is_exact_match', true)->pluck('domain')->all());
        $this->assertCount(30, $result['domains']);
    }

    public function test_markup_is_added_on_top_of_catalog_price(): void
    {
        config(['domain.markup' => 1000]);

        $com = $this->entry($this->search('toko'), 'toko.com');

        $this->assertSame(239650, $com['price']);
        $this->assertSame(1000, $com['markup']);
    }

    /**
     * MASALAH LAMA (didokumentasikan di QueryDomainPricing): kuotasi live diminta, tetapi hasilnya tidak pernah
     * terbaca karena Http::pool memberi indeks numerik, sehingga harga tetap dari katalog. Bila sudah diperbaiki
     * dengan $pool->as($ext), ubah harga .com di bawah menjadi 250000 (price_base 225225, tax_amount 24775, is_premium true).
     */
    public function test_with_api_key_quotes_are_requested_but_prices_still_come_from_catalog(): void
    {
        config(['services.idcloudhost.key' => 'rsl_live_test']);
        Http::fake(fn (Request $request) => str_contains($request->url(), 'domain=toko.com')
            ? Http::response(['data' => [
                'total_price_idr' => 225225, 'tax_idr' => 24775, 'tax_pct' => 11, 'tax_label' => 'PPN',
                'grand_total_idr' => 250000, 'is_premium' => true,
            ]], 200)
            : Http::response([], 500));

        $result = $this->search('toko');

        $this->assertSame('idcloudhost_api', $result['source']);
        $this->assertTrue($result['is_live_api']);
        $this->assertTrue($result['has_api_key']);
        $this->assertSame('Terhubung ke IDCloudHost API (Live)', $result['status_label']);
        $this->assertCount(30, $result['domains']);

        $com = $this->entry($result, 'toko.com');
        $this->assertSame(238650, $com['price']);
        $this->assertFalse($com['available']);
        $this->assertSame(650000, $this->entry($result, 'toko.io')['price']);

        Http::assertSent(fn (Request $request) => $request->hasHeader('Authorization', 'Bearer rsl_live_test')
            && str_contains($request->url(), 'https://api.srs.idch.co.id/v1/pricing/quote?domain=toko.com'));
        Http::assertNotSent(fn (Request $request) => str_contains($request->url(), 'domain=toko.io'));
    }

    public function test_results_are_cached_per_query(): void
    {
        $this->search('toko');
        $this->assertTrue(Cache::has('idch_domain_search_toko_all'));

        $this->partialMock(DomainService::class, function ($mock) {
            $mock->shouldNotReceive('isRegistered');
        });

        $this->assertCount(30, $this->search('toko')['domains']);
    }

    public function test_default_price_by_extension_when_no_price_is_sent(): void
    {
        $template = Template::create(['slug' => 't', 'name' => 'T', 'category' => 'Umum', 'price' => 1000]);

        foreach (['x.com' => 238650, 'x.zzz' => 185000, 'X.COM' => 238650] as $domain => $expected) {
            $this->postJson(route('checkout.domain.select', $template), ['domain' => $domain])
                ->assertOk()
                ->assertJson(['domain_price' => $expected]);
        }
    }
}
