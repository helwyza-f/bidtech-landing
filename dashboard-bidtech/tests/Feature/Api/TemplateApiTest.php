<?php

namespace Tests\Feature\Api;

use App\Models\Template;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Test karakterisasi API publik template (dipakai frontend Next.js).
 */
class TemplateApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        config(['app.frontend_url' => 'http://frontend.test']);

        Template::create([
            'slug' => 'rentcar-sewa-mobil', 'name' => 'Mobil', 'category' => 'Otomotif', 'price' => 2000000,
            'template_price' => 1000000, 'server_price' => 500000, 'service_price' => 500000,
            'tags' => 'Rental, Mobil', 'preview' => 'images/mobil.webp', 'is_active' => true,
        ]);
        Template::create([
            'slug' => 'kafe', 'name' => 'Kafe', 'category' => 'Kuliner', 'price' => 1500000,
            'template_price' => 800000, 'server_price' => 400000, 'service_price' => 300000,
            'is_active' => true,
        ]);
        Template::create([
            'slug' => 'arsip', 'name' => 'Arsip', 'category' => 'Kuliner', 'price' => 1,
            'is_active' => false,
        ]);
    }

    public function test_index_lists_only_active_templates_with_categories(): void
    {
        $response = $this->getJson('/api/templates')
            ->assertOk()
            ->assertHeader('Access-Control-Allow-Origin', '*')
            ->assertJson(['status' => 'success', 'count' => 2]);

        $this->assertSame([1, 2], collect($response->json('data'))->pluck('id')->all());
        $this->assertSame(
            [['name' => 'Semua Design', 'count' => 2], ['name' => 'Otomotif', 'count' => 1], ['name' => 'Kuliner', 'count' => 1]],
            $response->json('categories')
        );
    }

    public function test_index_item_shape_and_pricing(): void
    {
        $item = $this->getJson('/api/templates')->json('data.0');

        $this->assertSame('Mobil', $item['name']);
        $this->assertSame(['Rental', 'Mobil'], $item['tags']);
        $this->assertSame(2000000, $item['pricing']['total']);
        $this->assertSame('Rp 2.000.000', $item['pricing']['formatted_total']);
        $this->assertSame(url('/checkout/1/domain'), $item['checkout_url']);
        $this->assertSame('http://frontend.test/demo/automotive', $item['demo_url']);
        $this->assertStringEndsWith('images/mobil.webp', $item['image']);
    }

    public function test_index_filters_by_category_search_and_inactive_flag(): void
    {
        $this->assertSame([2], collect($this->getJson('/api/templates?category=Kuliner')->json('data'))->pluck('id')->all());
        $this->assertSame([1], collect($this->getJson('/api/templates?search=rental')->json('data'))->pluck('id')->all());
        $this->assertCount(3, $this->getJson('/api/templates?include_inactive=1')->json('data'));
        $this->assertCount(2, $this->getJson('/api/templates?category=Semua Design')->json('data'));
    }

    public function test_show_returns_template_or_404(): void
    {
        $this->getJson('/api/templates/1')
            ->assertOk()
            ->assertJson(['status' => 'success', 'data' => ['id' => 1, 'name' => 'Mobil']]);

        $this->getJson('/api/templates/99')
            ->assertStatus(404)
            ->assertJson(['status' => 'error', 'message' => 'Template tidak ditemukan']);
    }

    public function test_track_view_increments_counter_on_both_urls(): void
    {
        $this->postJson('/api/templates/view/1')->assertOk()->assertJson(['views' => 1]);
        $this->postJson('/templates/view/1')->assertOk()->assertJson(['views' => 2]);

        $this->assertSame(2, Template::find(1)->views);
        $this->postJson('/api/templates/view/99')->assertStatus(404);
    }
}
