<?php

namespace Tests\Feature\Domain;

use App\Enums\DomainStatus;
use App\Enums\OrderStatus;
use App\Models\Order;
use App\Models\Template;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Test karakterisasi webhook IdCloudHost (domain terdaftar).
 */
class IdCloudHostWebhookTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        config(['services.idcloudhost.webhook_secret' => null]);
        Template::create(['slug' => 't', 'name' => 'T', 'category' => 'Umum', 'price' => 1]);
    }

    private function order(): Order
    {
        return Order::create([
            'order_number' => 'ORD-D-1', 'template_id' => 1, 'domain_name' => 'tokoku.com', 'domain_price' => 1,
            'full_name' => 'A', 'email' => 'a@example.com', 'whatsapp' => '1', 'status' => OrderStatus::Paid,
            'domain_final' => 'tokoku.com', 'domain_status' => DomainStatus::PendingRegistration,
        ]);
    }

    public function test_registered_event_marks_matching_account_as_registered(): void
    {
        $order = $this->order();

        $this->postJson(route('webhook.idcloudhost'), ['event' => 'domain.registered', 'data' => ['domain' => 'tokoku.com']])
            ->assertOk()->assertJson(['status' => 'success']);

        $this->assertSame(DomainStatus::Registered, $order->fresh()->domain_status);
    }

    public function test_event_type_and_flat_domain_fields_are_also_accepted(): void
    {
        $order = $this->order();

        $this->postJson(route('webhook.idcloudhost'), ['type' => 'domain.registered', 'domain' => 'tokoku.com'])->assertOk();

        $this->assertSame(DomainStatus::Registered, $order->fresh()->domain_status);
    }

    public function test_other_events_and_unknown_domains_change_nothing(): void
    {
        $order = $this->order();

        $this->postJson(route('webhook.idcloudhost'), ['event' => 'domain.renewed', 'domain' => 'tokoku.com'])->assertOk();
        $this->postJson(route('webhook.idcloudhost'), ['event' => 'domain.registered', 'domain' => 'lain.com'])->assertOk();

        $this->assertSame(DomainStatus::PendingRegistration, $order->fresh()->domain_status);
    }

    public function test_signature_is_verified_when_secret_is_configured(): void
    {
        config(['services.idcloudhost.webhook_secret' => 'rahasia']);
        $order = $this->order();
        $body = json_encode(['event' => 'domain.registered', 'domain' => 'tokoku.com']);

        $this->call('POST', route('webhook.idcloudhost'), [], [], [], ['CONTENT_TYPE' => 'application/json'], $body)
            ->assertStatus(401);
        $this->call('POST', route('webhook.idcloudhost'), [], [], [], [
            'CONTENT_TYPE' => 'application/json', 'HTTP_X_SIGNATURE' => 'salah',
        ], $body)->assertStatus(401);
        $this->assertSame(DomainStatus::PendingRegistration, $order->fresh()->domain_status);

        $this->call('POST', route('webhook.idcloudhost'), [], [], [], [
            'CONTENT_TYPE' => 'application/json', 'HTTP_X_SIGNATURE' => hash_hmac('sha256', $body, 'rahasia'),
        ], $body)->assertOk();
        $this->assertSame(DomainStatus::Registered, $order->fresh()->domain_status);
    }
}
