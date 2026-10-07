<?php

namespace Tests\Feature\Admin;

use App\Enums\OrderStatus;
use App\Enums\Role;
use App\Models\Order;
use App\Models\Template;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Test karakterisasi CRUD template di Admin CMS.
 */
class TemplateManagementTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create(['role' => Role::Admin]);
    }

    private function payload(array $overrides = []): array
    {
        return array_merge([
            'name'           => 'Template Baru',
            'category'       => 'Kuliner',
            'template_price' => 1000000,
            'server_price'   => 500000,
            'service_price'  => 250000,
        ], $overrides);
    }

    private function template(array $overrides = []): Template
    {
        return Template::create(array_merge([
            'slug' => 'lama', 'name' => 'Lama', 'category' => 'Umum', 'price' => 100,
            'template_price' => 10, 'server_price' => 20, 'service_price' => 30,
        ], $overrides));
    }

    public function test_only_admins_can_access(): void
    {
        $client = User::factory()->create();

        $this->get(route('dashboard.templates.index'))->assertRedirect(route('login.view'));
        $this->actingAs($client)->get(route('dashboard.templates.index'))->assertRedirect(route('dashboard'));
        $this->actingAs($client)->post(route('dashboard.templates.store'), $this->payload())->assertRedirect(route('dashboard'));
        $this->assertSame(0, Template::count());
    }

    public function test_index_shows_stats_and_supports_search_and_sort(): void
    {
        $this->template();
        $this->template(['slug' => 'kafe-enak', 'name' => 'Kafe Enak', 'category' => 'Kuliner', 'price' => 900, 'views' => 50]);

        $response = $this->actingAs($this->admin)->get(route('dashboard.templates.index'))
            ->assertOk()
            ->assertViewIs('pages.kelola-template');
        $this->assertSame(2, $response->viewData('stats')['total']);
        $this->assertSame(50, $response->viewData('stats')['total_views']);

        $search = $this->actingAs($this->admin)->get(route('dashboard.templates.index', ['search' => 'kafe']));
        $this->assertSame([2], $search->viewData('templates')->pluck('id')->all());

        $byPrice = $this->actingAs($this->admin)->get(route('dashboard.templates.index', ['sort' => 'price_high']));
        $this->assertSame([2, 1], $byPrice->viewData('templates')->pluck('id')->all());
    }

    public function test_create_and_edit_pages_render(): void
    {
        $template = $this->template();

        $this->actingAs($this->admin)->get(route('dashboard.templates.create'))->assertOk()->assertViewIs('pages.kelola-template');
        $this->actingAs($this->admin)->get(route('dashboard.templates.edit', $template))->assertOk()->assertViewIs('pages.kelola-template');
    }

    public function test_store_validates_required_fields(): void
    {
        $this->actingAs($this->admin)->post(route('dashboard.templates.store'), [])
            ->assertSessionHasErrors(['name', 'category', 'template_price', 'server_price', 'service_price']);
    }

    public function test_store_creates_template_with_defaults_and_summed_price(): void
    {
        $this->actingAs($this->admin)->post(route('dashboard.templates.store'), $this->payload())
            ->assertRedirect(route('dashboard.templates.index'))
            ->assertSessionHas('success');

        $template = Template::firstOrFail();
        $this->assertSame(1750000, $template->price);
        $this->assertSame('https://media.bidtech.co.id/bidtech/templates/rentcar.webp', $template->preview);
        $this->assertSame('Lisensi Desain UI/UX Eksklusif & Source Code Clean', $template->template_desc);
        $this->assertSame(0, $template->views);
        $this->assertTrue($template->is_active);
    }

    public function test_store_prefers_preview_url_and_respects_inactive_flag(): void
    {
        $this->actingAs($this->admin)->post(route('dashboard.templates.store'), $this->payload([
            'preview_url' => 'https://cdn.test/a.webp', 'is_active' => 0,
        ]));

        $template = Template::firstOrFail();
        $this->assertSame('https://cdn.test/a.webp', $template->preview);
        $this->assertFalse($template->is_active);
    }

    public function test_update_changes_fields_and_keeps_preview_when_none_given(): void
    {
        $template = $this->template(['preview' => 'images/lama.webp']);

        // Form asli selalu mengirim semua field nullable (kosong -> null); update() membacanya tanpa `?? null`.
        $formFields = ['template_desc' => null, 'server_desc' => null, 'service_desc' => null, 'demo_url' => null, 'description' => null, 'tags' => null];

        $this->actingAs($this->admin)->put(route('dashboard.templates.update', $template), $this->payload(['name' => 'Baru'] + $formFields))
            ->assertRedirect(route('dashboard.templates.index'))
            ->assertSessionHas('success');

        $template->refresh();
        $this->assertSame('Baru', $template->name);
        $this->assertSame(1750000, $template->price);
        $this->assertSame('images/lama.webp', $template->preview);
    }

    public function test_destroy_deletes_template_without_orders(): void
    {
        $template = $this->template();

        $this->actingAs($this->admin)->delete(route('dashboard.templates.destroy', $template))
            ->assertRedirect(route('dashboard.templates.index'))
            ->assertSessionHas('success');

        $this->assertSame(0, Template::count());
    }

    public function test_destroy_only_deactivates_template_that_has_orders(): void
    {
        $template = $this->template();
        Order::create([
            'order_number' => 'ORD-T-1', 'template_id' => 1, 'domain_name' => 'a.com', 'domain_price' => 1,
            'full_name' => 'A', 'email' => 'a@example.com', 'whatsapp' => '1', 'status' => OrderStatus::Paid,
        ]);

        $this->actingAs($this->admin)->delete(route('dashboard.templates.destroy', $template))
            ->assertSessionHas('warning');

        $this->assertFalse($template->fresh()->is_active);
        $this->assertSame(1, Template::count());
    }

    public function test_toggle_active_flips_the_flag(): void
    {
        $template = $this->template(['is_active' => true]);

        $this->actingAs($this->admin)->from(route('dashboard.templates.index'))
            ->post(route('dashboard.templates.toggle-active', $template))
            ->assertRedirect(route('dashboard.templates.index'))
            ->assertSessionHas('success');
        $this->assertFalse($template->fresh()->is_active);

        $this->actingAs($this->admin)->post(route('dashboard.templates.toggle-active', $template));
        $this->assertTrue($template->fresh()->is_active);
    }
}
