<?php

namespace Tests\Feature\Admin;

use App\Enums\DomainStatus;
use App\Enums\OrderStatus;
use App\Enums\Role;
use App\Enums\WebsiteStatus;
use App\Models\Order;
use App\Models\Template;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Test karakterisasi perubahan status pesanan oleh admin.
 */
class OrderManagementTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create(['role' => Role::Admin]);
        Template::create(['slug' => 't', 'name' => 'T', 'category' => 'Umum', 'price' => 1]);
    }

    private function order(array $overrides = []): Order
    {
        return Order::create(array_merge([
            'order_number' => 'ORD-A-1', 'template_id' => 1, 'domain_name' => 'tokoku.com', 'domain_price' => 185000,
            'full_name' => 'Budi', 'email' => 'budi@example.com', 'whatsapp' => '0812', 'status' => OrderStatus::Unpaid,
        ], $overrides));
    }

    private function update(Order $order, array $payload)
    {
        return $this->actingAs($this->admin)->post(route('dashboard.order.update-status', $order), $payload);
    }

    public function test_only_admins_can_change_status(): void
    {
        $order = $this->order();
        $client = User::factory()->create();

        $this->actingAs($client)->post(route('dashboard.order.update-status', $order), ['order_status' => 'paid'])
            ->assertRedirect(route('dashboard'));

        $this->assertSame(OrderStatus::Unpaid, $order->fresh()->status);
    }

    public function test_status_is_required_and_must_be_valid(): void
    {
        $order = $this->order();

        $this->update($order, [])->assertSessionHasErrors('order_status');
        $this->update($order, ['order_status' => 'selesai'])->assertSessionHasErrors('order_status');
        $this->update($order, ['order_status' => 'paid', 'domain_status' => 'aneh'])->assertSessionHasErrors('domain_status');
        $this->update($order, ['order_status' => 'paid', 'website_status' => 'aneh'])->assertSessionHasErrors('website_status');
    }

    public function test_marking_paid_sets_paid_at_and_creates_client_account(): void
    {
        $order = $this->order();

        $this->update($order, ['order_status' => 'paid'])->assertSessionHas('success');

        $order->refresh();
        $this->assertSame(OrderStatus::Paid, $order->status);
        $this->assertNotNull($order->paid_at);

        $user = $order->client;
        $this->assertNotNull($user);
        $this->assertSame('tokoku@bidtech.co.id', $user->email);
        $this->assertSame(DomainStatus::PendingRegistration, $order->domain_status);
    }

    public function test_marking_paid_again_keeps_original_paid_at_and_single_account(): void
    {
        $paidAt = now()->subDays(3)->startOfSecond();
        $order = $this->order(['status' => OrderStatus::Paid, 'paid_at' => $paidAt]);

        $this->update($order, ['order_status' => 'paid']);
        $clientId = $order->fresh()->client_id;
        $this->update($order, ['order_status' => 'paid']);

        $this->assertEquals($paidAt, $order->fresh()->paid_at);
        $this->assertSame($clientId, $order->fresh()->client_id);
        $this->assertSame(1, User::where('id', $clientId)->count());
    }

    public function test_marking_unpaid_clears_paid_at(): void
    {
        $order = $this->order(['status' => OrderStatus::Paid, 'paid_at' => now()]);

        $this->update($order, ['order_status' => 'unpaid']);

        $order->refresh();
        $this->assertSame(OrderStatus::Unpaid, $order->status);
        $this->assertNull($order->paid_at);
    }

    public function test_marking_invalid_without_account_only_changes_order(): void
    {
        $order = $this->order();

        $this->update($order, ['order_status' => 'invalid'])->assertSessionHas('success');

        $this->assertSame(OrderStatus::Invalid, $order->fresh()->status);
        $this->assertNull($order->fresh()->client_id);
    }

    public function test_domain_and_website_status_update_the_client_account(): void
    {
        $order = $this->order();

        $this->update($order, [
            'order_status'   => 'paid',
            'domain_status'  => 'registered',
            'domain_final'   => ' baru.co.id ',
            'website_status' => 'deployed',
        ]);

        $order->refresh();
        $this->assertSame('baru.co.id', $order->domain_name);
        $this->assertSame('baru.co.id', $order->domain_final);
        $this->assertSame(DomainStatus::Registered, $order->domain_status);
        $this->assertSame(WebsiteStatus::Deployed, $order->website_status);
    }

    public function test_website_status_is_left_alone_when_not_provided(): void
    {
        $order = $this->order();
        $this->update($order, ['order_status' => 'paid']);

        $this->update($order, ['order_status' => 'paid', 'domain_status' => 'registered']);

        $order->refresh();
        $this->assertSame(DomainStatus::Registered, $order->domain_status);
        $this->assertSame(WebsiteStatus::InProgress, $order->website_status);
    }

    private function listing(array $query = [])
    {
        return $this->actingAs($this->admin)->get(route('dashboard.order', $query))
            ->assertOk()->assertViewIs('pages.kelola-pesanan');
    }

    public function test_admin_order_list_filters_by_status_search_and_category(): void
    {
        Template::create(['slug' => 'kafe', 'name' => 'Kafe', 'category' => 'Kuliner', 'price' => 1]);
        $this->order(['order_number' => 'ORD-A-1', 'full_name' => 'Budi']);
        $this->order(['order_number' => 'ORD-A-2', 'full_name' => 'Sari', 'status' => OrderStatus::Paid, 'template_id' => 2]);

        $this->assertCount(2, $this->listing()->viewData('orders'));
        $this->assertSame(['ORD-A-2'], $this->listing(['status' => 'paid'])->viewData('orders')->pluck('order_number')->all());
        $this->assertSame(['ORD-A-1'], $this->listing(['search' => 'A-1'])->viewData('orders')->pluck('order_number')->all());
        $this->assertSame(['ORD-A-2'], $this->listing(['category' => 'Kuliner'])->viewData('orders')->pluck('order_number')->all());
    }

    public function test_admin_order_list_computes_period_metrics_and_years(): void
    {
        $this->order(['order_number' => 'ORD-A-1']);
        $this->order(['order_number' => 'ORD-A-2', 'status' => OrderStatus::Paid, 'template_price' => 1000, 'server_price' => 0, 'service_price' => 0, 'domain_price' => 500]);
        $old = $this->order(['order_number' => 'ORD-A-3', 'status' => OrderStatus::Invalid]);
        $old->forceFill(['created_at' => now()->subYears(2)])->save();

        $all = $this->listing()->viewData('stats');
        $this->assertSame(3, $all['period_total']);
        $this->assertSame(1, $all['period_paid']);
        $this->assertSame(1500, $all['period_omzet']);
        $this->assertSame([(int) date('Y'), (int) date('Y') - 2], $all['available_years']);
        $this->assertSame(['Umum'], $all['available_categories']);

        $yearly = $this->listing(['period' => 'yearly', 'year' => (int) date('Y')])->viewData('stats');
        $this->assertSame(2, $yearly['period_total']);
        $this->assertSame(0, $yearly['period_invalid']);

        $monthly = $this->listing(['period' => 'monthly', 'year' => (int) date('Y') - 2, 'month' => (int) $old->created_at->format('n')]);
        $this->assertSame(['ORD-A-3'], $monthly->viewData('orders')->pluck('order_number')->all());
        $this->assertSame('Januari', $monthly->viewData('monthsMap')[1]);
    }

    public function test_client_sees_own_order_page_at_the_same_url(): void
    {
        $this->order();
        $client = User::factory()->create();

        $this->actingAs($client)->get(route('dashboard.order'))->assertOk()->assertViewIs('pages.order');
    }
}
