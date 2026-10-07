<?php

namespace Tests\Feature\Dashboard;

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
 * Test karakterisasi dashboard klien/admin dan pengaturan akun.
 */
class DashboardTest extends TestCase
{
    use RefreshDatabase;

    private function clientWithOrder(array $orderOverrides = []): User
    {
        Template::create([
            'slug' => 'template-uji', 'name' => 'Template Uji', 'category' => 'Umum', 'price' => 2000000,
            'template_price' => 1000000, 'server_price' => 500000, 'service_price' => 500000,
        ]);

        $client = User::factory()->create(['name' => 'Budi Santoso']);

        Order::create(array_merge([
            'order_number'    => 'ORD-DASH-00001',
            'template_id'     => 1,
            'client_id'       => $client->id,
            'domain_name'     => 'tokoku.com',
            'domain_price'    => 185000,
            'template_price'  => 1000000,
            'server_price'    => 500000,
            'service_price'   => 500000,
            'discount_amount' => 100000,
            'full_name'       => 'Budi Santoso',
            'email'           => 'budi@example.com',
            'whatsapp'        => '0812',
            'status'          => OrderStatus::Paid,
            'paid_at'         => now(),
            'domain_final'    => 'tokoku.com',
            'domain_status'   => DomainStatus::Registered,
            'website_status'  => WebsiteStatus::InProgress,
        ], $orderOverrides));

        return $client;
    }

    public function test_guests_are_redirected_to_login(): void
    {
        $this->get(route('dashboard'))->assertRedirect(route('login.view'));
    }

    public function test_client_overview_exposes_portal_data(): void
    {
        $client = $this->clientWithOrder();

        $this->actingAs($client)->get(route('dashboard'))
            ->assertOk()
            ->assertViewIs('pages.dashboard')
            ->assertViewHas('isAdmin', false)
            ->assertViewHas('adminStats', null)
            ->assertViewHas('firstName', 'Budi')
            ->assertViewHas('initials', 'BS')
            ->assertViewHas('domainName', 'tokoku.com')
            ->assertViewHas('orderNumber', 'ORD-DASH-00001')
            ->assertViewHas('discountAmount', 100000)
            ->assertViewHas('totalPaid', 2085000)
            ->assertViewHas('isDomainRegistered', true)
            ->assertViewHas('isWebsiteLive', false)
            ->assertViewHas('isWebsiteInProgress', true);
    }

    public function test_client_without_order_gets_default_prices(): void
    {
        $client = User::factory()->create(['name' => 'Sari']);

        $this->actingAs($client)->get(route('dashboard'))
            ->assertOk()
            ->assertViewHas('templatePrice', 1000000)
            ->assertViewHas('domainPrice', 185000)
            ->assertViewHas('totalPaid', 2185000)
            ->assertViewHas('domainName', 'bisnis.com')
            ->assertViewHas('initials', 'S');
    }

    public function test_media_is_redirected_away_from_client_dashboard_to_articles(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);

        $this->actingAs($media)->get(route('dashboard'))
            ->assertRedirect(route('dashboard.articles.index'));
    }

    public function test_media_is_redirected_away_from_order_detail_to_articles(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);

        $this->actingAs($media)->get(route('dashboard.order'))
            ->assertRedirect(route('dashboard.articles.index'));
    }

    public function test_admin_overview_includes_statistics(): void
    {
        $this->clientWithOrder();
        $order = Order::first();
        $admin = User::factory()->create(['role' => Role::Admin, 'name' => 'Ani']);

        $response = $this->actingAs($admin)->get(route('dashboard'))
            ->assertOk()
            ->assertViewHas('isAdmin', true)
            ->assertViewHas('orderNumber', 'PORTAL-ADMIN')
            ->assertViewHas('domainName', 'admin.bidtech.id');

        $stats = $response->viewData('adminStats');
        $this->assertSame(1, $stats['total_users']);
        $this->assertSame(1, $stats['total_orders']);
        $this->assertSame(1, $stats['paid_orders']);
        $this->assertSame(2085000, $stats['total_omzet']);
        $this->assertSame(1, $stats['total_templates']);
        $this->assertCount(1, $stats['top_templates']);
        $this->assertCount(1, $stats['recent_orders']);
        $this->assertSame($order->id, $stats['recent_orders']->first()->id);
    }

    public function test_client_order_page_uses_created_at_when_unpaid(): void
    {
        $client = $this->clientWithOrder(['status' => OrderStatus::Unpaid, 'paid_at' => null]);
        $order = Order::first();

        $this->actingAs($client)->get(route('dashboard.order'))
            ->assertOk()
            ->assertViewIs('pages.order')
            ->assertViewHas('totalPaid', 2085000)
            ->assertViewHas('isAdmin', false)
            ->assertViewHas('paidDateShort', $order->created_at->locale('id')->translatedFormat('j M Y'));
    }

    public function test_admin_order_page_shows_order_management(): void
    {
        $this->clientWithOrder();
        $admin = User::factory()->create(['role' => Role::Admin]);

        $this->actingAs($admin)->get(route('dashboard.order'))
            ->assertOk()
            ->assertViewIs('pages.kelola-pesanan');
    }

    public function test_profile_update_validates_and_saves(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->put(route('dashboard.profile.update'), [])
            ->assertSessionHasErrors(['name', 'whatsapp']);

        $this->actingAs($user)->put(route('dashboard.profile.update'), ['name' => 'Baru', 'whatsapp' => '0899'])
            ->assertRedirect()
            ->assertSessionHas('profile_success');

        $this->assertSame('Baru', $user->fresh()->name);
    }

    public function test_edit_profile_page_renders(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get(route('dashboard.profile.edit'))
            ->assertOk()
            ->assertViewIs('pages.edit-profil')
            ->assertViewHas('user');
    }

    public function test_password_update_requires_current_password(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->put(route('dashboard.password.update'), [
            'current_password' => 'salah', 'password' => 'password-baru', 'password_confirmation' => 'password-baru',
        ])->assertSessionHasErrors('current_password');

        $this->actingAs($user)->put(route('dashboard.password.update'), [
            'current_password' => 'password', 'password' => 'password-baru', 'password_confirmation' => 'password-baru',
        ])->assertSessionHas('password_success');

        $this->assertTrue(\Illuminate\Support\Facades\Hash::check('password-baru', $user->fresh()->password));
    }

    public function test_author_profile_is_only_for_media_accounts(): void
    {
        $regular = User::factory()->create();
        $media = User::factory()->create(['role' => Role::Media]);
        $payload = ['author_name' => 'Penulis Baru'];

        // Request biasa (bukan JSON) ditolak middleware 'role:MEDIA' di level route -> redirect+flash.
        $this->actingAs($regular)->put(route('dashboard.author-profile.update'), $payload)->assertRedirect(route('dashboard'));

        $this->actingAs($media)->put(route('dashboard.author-profile.update'), $payload)
            ->assertRedirect()
            ->assertSessionHas('profile_success');
        $this->assertSame('Penulis Baru', $media->fresh()->author_name);
    }
}
