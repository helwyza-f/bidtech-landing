<?php

namespace Tests\Feature\Payment;

use App\Enums\OrderStatus;
use App\Models\Order;
use App\Models\Template;
use App\Services\PaymentService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

/**
 * Pesan WhatsApp (Fonnte) untuk invoice belum lunas dan pembayaran berhasil.
 */
class WhatsappNotificationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        config(['services.fonnte.token' => 'fonnte-token', 'services.xendit.key' => 'xnd-test-key']);
        Mail::fake();

        Template::create([
            'slug' => 'template-uji', 'name' => 'Template Uji', 'category' => 'Umum', 'price' => 2000000,
            'template_price' => 1000000, 'server_price' => 500000, 'service_price' => 500000,
        ]);
    }

    private function fakeHttp(array $xenditStatus = []): void
    {
        Http::fake([
            'api.fonnte.com/*' => Http::response(['status' => true], 200),
            'api.xendit.co/v2/invoices/inv_1' => Http::response($xenditStatus ?: ['status' => 'PENDING'], 200),
            'api.xendit.co/v2/invoices' => Http::response(['id' => 'inv_1', 'invoice_url' => 'https://pay.test/inv_1'], 200),
            '*' => Http::response([], 500),
        ]);
    }

    private function fonnteRequests(): array
    {
        return Http::recorded(fn (Request $request) => str_contains($request->url(), 'api.fonnte.com'))
            ->map(fn (array $pair) => $pair[0])->values()->all();
    }

    private function startCheckout(string $whatsapp = '08123456789'): void
    {
        $this->withSession(['checkout' => [
            'template_id' => 1,
            'domain_name' => 'tokoku.com',
            'domain_price' => 185000,
            'customer' => ['name' => 'Budi', 'email' => 'budi@example.com', 'whatsapp' => $whatsapp, 'notes' => ''],
        ]])->get(route('checkout.bayar.redirect', 1));
    }

    public function test_invoice_message_is_sent_with_payment_and_pdf_links(): void
    {
        $this->fakeHttp();

        $this->startCheckout();

        $requests = $this->fonnteRequests();
        $this->assertCount(1, $requests);

        $order = Order::firstOrFail();
        $request = $requests[0];
        $this->assertSame('https://api.fonnte.com/send', $request->url());
        $this->assertSame('fonnte-token', $request->header('Authorization')[0]);
        $this->assertSame('62812345'.'6789', $request->data()['target']);
        $this->assertSame('62', $request->data()['countryCode']);

        $message = $request->data()['message'];
        $this->assertStringContainsString('Halo *Budi*', $message);
        $this->assertStringContainsString("#{$order->order_number}", $message);
        $this->assertStringContainsString('*Template:* Template Uji', $message);
        $this->assertStringContainsString('tokoku.com (1 Tahun)', $message);
        $this->assertStringContainsString('*Rp 2.185.000*', $message);
        $this->assertStringContainsString('https://pay.test/inv_1', $message);
        $this->assertStringContainsString(route('checkout.invoice.download', $order), $message);
        $this->assertStringNotContainsString('Diskon Promo', $message);
        $this->assertStringNotContainsString('Program Kemitraan', $message);
    }

    public function test_invoice_message_mentions_discount_and_partner_program(): void
    {
        $this->fakeHttp();
        $order = Order::create([
            'order_number' => 'ORD-W-1', 'template_id' => 1, 'domain_name' => 'tokoku.com', 'domain_price' => 185000,
            'template_price' => 1000000, 'server_price' => 500000, 'service_price' => 500000,
            'discount_amount' => 100000, 'coupon_code' => 'HEMAT', 'is_partner_order' => true, 'partner_name' => 'Mitra A',
            'full_name' => 'Budi', 'email' => 'budi@example.com', 'whatsapp' => '08123456789', 'status' => OrderStatus::Unpaid,
            'payment_expires_at' => now()->addDay(),
        ]);

        app(PaymentService::class)->sendInvoiceWhatsapp($order);

        $message = $this->fonnteRequests()[0]->data()['message'];
        $this->assertStringContainsString('*Diskon Promo:* -Rp 100.000 (HEMAT)', $message);
        $this->assertStringContainsString('*Program Kemitraan:* Mitra A', $message);
        $this->assertStringContainsString('*Rp 2.085.000*', $message);
    }

    public function test_phone_numbers_are_normalised_to_country_code_62(): void
    {
        $this->fakeHttp();

        foreach (['08123456789', '8123456789', '+62 812-3456-789', '628123456789'] as $phone) {
            Http::fake([
                'api.fonnte.com/*' => Http::response(['status' => true], 200),
                'api.xendit.co/v2/invoices' => Http::response([], 500),
                '*' => Http::response([], 500),
            ]);
            $order = Order::create([
                'order_number' => 'ORD-P-'.md5($phone), 'template_id' => 1, 'domain_name' => 'a.com', 'domain_price' => 1,
                'full_name' => 'A', 'email' => 'a@example.com', 'whatsapp' => $phone, 'status' => OrderStatus::Unpaid,
            ]);

            app(PaymentService::class)->sendInvoiceWhatsapp($order);

            $sent = collect($this->fonnteRequests())->last();
            $this->assertSame('628123456789', $sent->data()['target'], "input: {$phone}");
        }
    }

    public function test_unusable_number_sends_nothing(): void
    {
        $this->fakeHttp();
        $order = Order::create([
            'order_number' => 'ORD-P-0', 'template_id' => 1, 'domain_name' => 'a.com', 'domain_price' => 1,
            'full_name' => 'A', 'email' => 'a@example.com', 'whatsapp' => '---', 'status' => OrderStatus::Unpaid,
        ]);

        app(PaymentService::class)->sendInvoiceWhatsapp($order);

        $this->assertSame([], $this->fonnteRequests());
    }

    public function test_provider_error_does_not_break_the_checkout(): void
    {
        Http::fake([
            'api.fonnte.com/*' => fn () => throw new \RuntimeException('timeout'),
            'api.xendit.co/v2/invoices' => Http::response(['id' => 'inv_1', 'invoice_url' => 'https://pay.test/inv_1'], 200),
            '*' => Http::response([], 500),
        ]);

        $this->startCheckout();

        $this->assertSame(1, Order::count());
    }

    public function test_payment_success_message_carries_login_details_once(): void
    {
        $this->fakeHttp(['status' => 'PAID']);
        $order = Order::create([
            'order_number' => 'ORD-W-2', 'template_id' => 1, 'domain_name' => 'tokoku.com', 'domain_price' => 185000,
            'template_price' => 1000000, 'server_price' => 500000, 'service_price' => 500000,
            'full_name' => 'Budi', 'email' => 'budi@example.com', 'whatsapp' => '08123456789',
            'status' => OrderStatus::Unpaid, 'xendit_invoice_id' => 'inv_1', 'payment_expires_at' => now()->addDay(),
        ]);
        $url = route('checkout.status.check', ['template' => 1, 'order' => $order->order_number]);

        $this->getJson($url)->assertJson(['is_paid' => true]);
        $this->getJson($url);

        $requests = $this->fonnteRequests();
        $this->assertCount(1, $requests);

        $message = $requests[0]->data()['message'];
        $this->assertSame('628123456789', $requests[0]->data()['target']);
        $this->assertStringContainsString('PEMBAYARAN BERHASIL', $message);
        $this->assertStringContainsString('#ORD-W-2', $message);
        $this->assertStringContainsString('*Rp 2.185.000*', $message);
        $this->assertStringContainsString('`tokoku@bidtech.co.id`', $message);
        $this->assertStringContainsString('`Password123!`', $message);
        $this->assertStringContainsString(url('/login'), $message);
    }

    public function test_without_token_nothing_is_sent(): void
    {
        config(['services.fonnte.token' => null]);
        $this->fakeHttp();

        $this->startCheckout();

        $this->assertSame([], $this->fonnteRequests());
        $this->assertSame(1, Order::count());
    }
}
