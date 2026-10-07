<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Test karakterisasi login/logout.
 */
class LoginTest extends TestCase
{
    use RefreshDatabase;

    private function user(): User
    {
        return User::factory()->create(['email' => 'budi@example.com']);
    }

    public function test_root_redirects_to_login(): void
    {
        $this->get('/')->assertRedirect(route('login.view'));
    }

    public function test_login_page_is_shown_to_guests_only(): void
    {
        $this->get(route('login.view'))->assertOk()->assertViewIs('pages.login');

        $this->actingAs($this->user())->get(route('login.view'))->assertRedirect();
    }

    public function test_valid_credentials_log_in_and_redirect_to_dashboard(): void
    {
        $user = $this->user();

        $this->post(route('login'), ['email' => 'budi@example.com', 'password' => 'password'])
            ->assertRedirect(route('dashboard'));

        $this->assertAuthenticatedAs($user);
    }

    public function test_login_redirects_back_to_the_intended_page(): void
    {
        $this->user();

        $this->get(route('dashboard.order'))->assertRedirect(route('login.view'));
        $this->post(route('login'), ['email' => 'budi@example.com', 'password' => 'password'])
            ->assertRedirect(route('dashboard.order'));
    }

    public function test_wrong_password_shows_email_error(): void
    {
        $this->user();

        $this->post(route('login'), ['email' => 'budi@example.com', 'password' => 'salah'])
            ->assertSessionHasErrors(['email' => 'Email atau password salah.']);

        $this->assertGuest();
    }

    public function test_login_requires_email_and_password(): void
    {
        $this->post(route('login'), [])->assertSessionHasErrors(['email', 'password']);
    }

    public function test_logout_clears_session_and_redirects_to_login(): void
    {
        $user = $this->user();

        $this->actingAs($user)->post(route('logout'))->assertRedirect(route('login.view'));

        $this->assertGuest();
    }
}
