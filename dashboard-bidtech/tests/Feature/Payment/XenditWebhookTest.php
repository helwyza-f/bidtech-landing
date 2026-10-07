<?php

namespace Tests\Feature\Payment;

use App\Enums\DomainStatus;
use App\Enums\OrderStatus;
use App\Mail\PaymentSuccessAndAccountMail;
use App\Models\Order;
use App\Models\Template;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

/**
 * Test karakterisasi webhook Xendit.
 */
class XenditWebhookTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        config(['services.xendit.webhook_token' => null, 'services.fonnte.token' => null]);
        Mail::fake();
        Http::fake(['*' => Http::response([], 500)]);

        Template::create([
            'slug' => 'template-uji', 'name' => 'Template Uji', 'category' => 'Umum', 'price' => 2000000,
        ]);
    }

    private function makeOrder(): Order
    {
        return Order::create([
            'order_number' => 'ORD-WH-00001',
            'template_id' => 1,
            'domain_name' => 'Toko-Ku.co.id',
            'domain_price' => 185000,
            'template_price' => 1000000,
            'server_price' => 500000,
            'service_price' => 500000,
            'full_name' => 'Budi',
            'email' => 'budi@example.com',
            'whatsapp' => '08123456789',
            'status' => OrderStatus::Unpaid,
        ]);
    }

    public function test_missing_external_id_is_rejected(): void
    {
        $this->postJson(route('webhook.xendit'), ['status' => 'PAID'])->assertStatus(400);
    }

    public function test_unknown_order_is_acknowledged(): void
    {
        $this->postJson(route('webhook.xendit'), ['external_id' => 'NOPE', 'status' => 'PAID'])
            ->assertOk()
            ->assertJson(['status' => 'success']);
    }

    public function test_wrong_token_is_rejected_in_production_only(): void
    {
        config(['services.xendit.webhook_token' => 'secret']);
        $payload = ['external_id' => 'NOPE', 'status' => 'PAID'];

        $this->postJson(route('webhook.xendit'), $payload, ['x-callback-token' => 'salah'])->assertOk();

        $this->app['env'] = 'production';
        $this->postJson(route('webhook.xendit'), $payload, ['x-callback-token' => 'salah'])->assertStatus(401);
        $this->postJson(route('webhook.xendit'), $payload, ['x-callback-token' => 'secret'])->assertOk();
    }

    public function test_paid_callback_marks_order_paid_and_provisions_account(): void
    {
        $order = $this->makeOrder();

        $this->postJson(route('webhook.xendit'), ['external_id' => $order->order_number, 'status' => 'settled'])
            ->assertOk();

        $order->refresh();
        $this->assertSame(OrderStatus::Paid, $order->status);
        $this->assertNotNull($order->paid_at);
        $this->assertNotNull($order->paid_email_sent_at);

        $user = $order->client;
        $this->assertNotNull($user);
        $this->assertSame('toko-ku@bidtech.co.id', $user->email);
        $this->assertSame('Toko-Ku.co.id', $order->domain_final);
        Mail::assertSent(PaymentSuccessAndAccountMail::class, 1);
    }

    public function test_repeated_paid_callback_keeps_single_account_and_email(): void
    {
        $order = $this->makeOrder();
        $payload = ['external_id' => $order->order_number, 'status' => 'PAID'];

        $this->postJson(route('webhook.xendit'), $payload);
        $this->postJson(route('webhook.xendit'), $payload);

        $this->assertSame(1, User::count());
        Mail::assertSent(PaymentSuccessAndAccountMail::class, 1);
    }

    public function test_paid_callback_refreshes_name_but_leaves_domain_status_alone(): void
    {
        $order = $this->makeOrder();
        $user = app(UserService::class)->createClientAccount($order);
        $user->update(['name' => 'Nama Lama']);
        $order->update(['domain_status' => DomainStatus::Registered]);

        $this->postJson(route('webhook.xendit'), ['external_id' => $order->order_number, 'status' => 'PAID']);

        $user->refresh();
        $this->assertSame('Budi', $user->name);
        $this->assertSame(DomainStatus::Registered, $order->fresh()->domain_status);
    }

    public function test_expired_callback_marks_order_invalid(): void
    {
        $order = $this->makeOrder();

        $this->postJson(route('webhook.xendit'), ['external_id' => $order->order_number, 'status' => 'EXPIRED'])
            ->assertOk();

        $this->assertSame(OrderStatus::Invalid, $order->fresh()->status);
        $this->assertSame(0, User::count());
    }
}
