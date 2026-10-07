<?php

namespace Tests\Feature\Payment;

use App\Enums\DiscountType;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\Template;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

/**
 * Isi permintaan pembuatan invoice ke Xendit (jumlah, item, dan tautan kembali) untuk tiap bentuk diskon.
 */
class XenditInvoiceRequestTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        config(['services.xendit.key' => 'xnd-test-key', 'services.fonnte.token' => null]);
        Mail::fake();

        Template::create([
            'slug' => 'template-uji', 'name' => 'Template Uji', 'category' => 'Umum', 'price' => 2000000,
            'template_price' => 1000000, 'server_price' => 500000, 'service_price' => 500000,
        ]);
    }

    private function fakeXendit(array $extra = []): void
    {
        Http::fake($extra + [
            'api.xendit.co/v2/invoices' => Http::response(['id' => 'inv_1', 'invoice_url' => 'https://pay.test/inv_1'], 200),
            '*'                         => Http::response([], 500),
        ]);
    }

    private function checkout(int $discount = 0): array
    {
        $checkout = [
            'template_id'  => 1,
            'domain_name'  => 'tokoku.com',
            'domain_price' => 185000,
            'customer'     => ['name' => 'Budi', 'email' => 'budi@example.com', 'whatsapp' => '08123456789', 'notes' => ''],
        ];

        if ($discount > 0) {
            $coupon = Coupon::create([
                'code' => 'HEMAT', 'name' => 'Hemat',
                'subtotal_discount_type' => DiscountType::Nominal, 'subtotal_discount_amount' => $discount,
                'is_active' => true, 'user_usage_limit' => 5,
            ]);
            $checkout['promo'] = [
                'coupon_id' => $coupon->id, 'code' => 'HEMAT', 'is_partner' => false,
                'discount_amount' => $discount, 'partner_commission_amount' => 0,
            ];
        }

        return ['checkout' => $checkout];
    }

    /**
     * Kirim permintaan pembuatan order lalu kembalikan body JSON yang dikirim ke Xendit.
     */
    private function sentInvoice(int $discount = 0): array
    {
        $this->fakeXendit();
        $this->withSession($this->checkout($discount))->get(route('checkout.bayar.redirect', 1));

        $sent = null;
        Http::assertSent(function (Request $request) use (&$sent) {
            if ($request->url() === 'https://api.xendit.co/v2/invoices' && $request->method() === 'POST') {
                $sent = $request;
            }

            return true;
        });

        $this->assertNotNull($sent, 'Permintaan ke Xendit tidak terkirim.');
        $this->assertTrue($sent->hasHeader('Authorization'));
        $this->assertSame('Basic ' . base64_encode('xnd-test-key:'), $sent->header('Authorization')[0]);

        return $sent->data();
    }

    public function test_full_price_invoice_lists_the_four_components(): void
    {
        $body = $this->sentInvoice();
        $order = Order::firstOrFail();

        $this->assertSame($order->order_number, $body['external_id']);
        $this->assertSame(2185000, $body['amount']);
        $this->assertSame('budi@example.com', $body['payer_email']);
        $this->assertSame('IDR', $body['currency']);
        $this->assertSame('Pemesanan Website Template Uji + Domain tokoku.com', $body['description']);
        $this->assertSame(
            ['given_names' => 'Budi', 'email' => 'budi@example.com', 'mobile_number' => '08123456789'],
            $body['customer']
        );
        $this->assertSame(
            route('checkout.bayar', ['template' => 1, 'order' => $order->order_number]),
            $body['success_redirect_url']
        );
        $this->assertSame($body['success_redirect_url'], $body['failure_redirect_url']);

        $this->assertSame(
            [
                ['name' => 'Lisensi Template: Template Uji', 'quantity' => 1, 'price' => 1000000, 'category' => 'Website Template'],
                ['name' => 'Cloud Server & Hosting (1 Tahun)', 'quantity' => 1, 'price' => 500000, 'category' => 'Cloud Server'],
                ['name' => 'Setup & Layanan Deployment', 'quantity' => 1, 'price' => 500000, 'category' => 'Service & Setup'],
                ['name' => 'Domain tokoku.com (1 Tahun)', 'quantity' => 1, 'price' => 185000, 'category' => 'Domain Registration'],
            ],
            $body['items']
        );
    }

    public function test_discounted_invoice_merges_package_and_keeps_domain(): void
    {
        $body = $this->sentInvoice(100000);

        $this->assertSame(2085000, $body['amount']);
        $this->assertSame(
            'Pemesanan Website Template Uji + Domain tokoku.com (Hemat Rp 100.000 via HEMAT)',
            $body['description']
        );
        $this->assertSame(
            [
                ['name' => 'Paket Website Template Uji (Diskon HEMAT)', 'quantity' => 1, 'price' => 1900000, 'category' => 'Website Package'],
                ['name' => 'Domain tokoku.com (1 Tahun)', 'quantity' => 1, 'price' => 185000, 'category' => 'Domain Registration'],
            ],
            $body['items']
        );
        $this->assertSame($body['amount'], array_sum(array_column($body['items'], 'price')));
    }

    public function test_discount_larger_than_package_spills_over_to_the_domain(): void
    {
        $body = $this->sentInvoice(2100000);

        $this->assertSame(85000, $body['amount']);
        $this->assertSame(
            [['name' => 'Domain tokoku.com (1 Tahun) (Diskon HEMAT)', 'quantity' => 1, 'price' => 85000, 'category' => 'Domain Registration']],
            $body['items']
        );
    }

    public function test_fully_discounted_invoice_falls_back_to_a_single_zero_item(): void
    {
        $body = $this->sentInvoice(2185000);

        $this->assertSame(0, $body['amount']);
        $this->assertSame(
            [['name' => 'Paket Website Template Uji + Domain tokoku.com', 'quantity' => 1, 'price' => 0, 'category' => 'Website Package']],
            $body['items']
        );
    }

    public function test_invoice_id_and_url_are_stored_on_the_order(): void
    {
        $this->fakeXendit();
        $this->withSession($this->checkout())->get(route('checkout.bayar.redirect', 1));

        $order = Order::firstOrFail();
        $this->assertSame('inv_1', $order->xendit_invoice_id);
        $this->assertSame('https://pay.test/inv_1', $order->xendit_payment_url);
    }

    public function test_status_lookup_uses_get_with_basic_auth(): void
    {
        $this->fakeXendit(['api.xendit.co/v2/invoices/inv_9' => Http::response(['status' => 'PAID'], 200)]);
        $order = Order::create([
            'order_number' => 'ORD-X-9', 'template_id' => 1, 'domain_name' => 'a.com', 'domain_price' => 1,
            'full_name' => 'A', 'email' => 'a@example.com', 'whatsapp' => '1', 'status' => 'unpaid',
            'xendit_invoice_id' => 'inv_9', 'payment_expires_at' => now()->addDay(),
        ]);

        $this->getJson(route('checkout.status.check', ['template' => 1, 'order' => $order->order_number]))
            ->assertJson(['is_paid' => true]);

        Http::assertSent(fn (Request $r) => $r->method() === 'GET'
            && $r->url() === 'https://api.xendit.co/v2/invoices/inv_9'
            && $r->header('Authorization')[0] === 'Basic ' . base64_encode('xnd-test-key:'));
    }

    public function test_without_secret_key_no_request_is_made_and_the_local_payment_url_is_used(): void
    {
        config(['services.xendit.key' => null]);
        $this->fakeXendit();

        $this->withSession($this->checkout())->get(route('checkout.bayar.redirect', 1));

        Http::assertNotSent(fn (Request $request) => str_contains($request->url(), 'api.xendit.co'));

        $order = Order::firstOrFail();
        $this->assertNull($order->xendit_invoice_id);
        $this->assertSame(
            route('checkout.bayar', ['template' => 1, 'order' => $order->order_number]),
            $order->xendit_payment_url
        );
    }

    public function test_status_lookup_is_skipped_without_secret_key(): void
    {
        config(['services.xendit.key' => null]);
        $this->fakeXendit();
        $order = Order::create([
            'order_number' => 'ORD-X-8', 'template_id' => 1, 'domain_name' => 'a.com', 'domain_price' => 1,
            'full_name' => 'A', 'email' => 'a@example.com', 'whatsapp' => '1', 'status' => 'unpaid',
            'xendit_invoice_id' => 'inv_8', 'payment_expires_at' => now()->addDay(),
        ]);

        $this->getJson(route('checkout.status.check', ['template' => 1, 'order' => $order->order_number]))
            ->assertJson(['is_paid' => false]);

        Http::assertNothingSent();
    }
}
