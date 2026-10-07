<?php

namespace Tests\Feature\Articles;

use App\Enums\ArticleStatus;
use App\Enums\Role;
use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

/**
 * Matriks akses artikel per peran (aturan ada di User::canWriteArticles / canModerateArticles):
 * media = semua aksi; admin = lihat + nonaktif/aktif/hapus; akun lain (klien) = tidak ada akses.
 */
class ArticleAccessTest extends TestCase
{
    use RefreshDatabase;

    private Article $article;

    protected function setUp(): void
    {
        parent::setUp();

        $author = User::factory()->create(['role' => Role::Media]);
        $this->article = Article::create([
            'title' => 'Judul', 'slug' => 'judul', 'content' => [['type' => 'paragraph']],
            'status' => ArticleStatus::Draft, 'created_by' => $author->id, 'updated_by' => $author->id,
        ]);
    }

    private function user(string $role): User
    {
        return User::factory()->create([
            'role' => match ($role) {
                'media' => Role::Media,
                'admin' => Role::Admin,
                default => Role::Klien,
            },
        ]);
    }

    public function test_client_accounts_have_no_access_at_all(): void
    {
        $client = $this->user('client');

        // Request biasa (bukan JSON) ditolak middleware 'role:MEDIA,ADMIN' di level route -> redirect+flash.
        $this->actingAs($client)->get(route('dashboard.articles.index'))->assertRedirect(route('dashboard'));
        $this->actingAs($client)->get(route('dashboard.articles.create'))->assertRedirect(route('dashboard'));
        $this->actingAs($client)->get(route('dashboard.articles.edit', $this->article))->assertRedirect(route('dashboard'));
        $this->actingAs($client)->post(route('dashboard.articles.publish', $this->article))->assertRedirect(route('dashboard'));
        $this->actingAs($client)->post(route('dashboard.articles.deactivate', $this->article))->assertRedirect(route('dashboard'));
        $this->actingAs($client)->post(route('dashboard.articles.activate', $this->article))->assertRedirect(route('dashboard'));
        $this->actingAs($client)->delete(route('dashboard.articles.destroy', $this->article))->assertRedirect(route('dashboard'));
        // Request JSON/AJAX tetap ditolak dengan status murni (403), bukan redirect.
        $this->actingAs($client)->postJson(route('dashboard.articles.images.store'), [
            'image' => UploadedFile::fake()->create('a.jpg', 10, 'image/jpeg'),
        ])->assertForbidden();

        $this->assertNotNull($this->article->fresh());
    }

    public function test_admin_can_view_but_not_write_or_publish(): void
    {
        $admin = $this->user('admin');

        $this->actingAs($admin)->get(route('dashboard.articles.index'))->assertOk();
        $this->actingAs($admin)->get(route('dashboard.articles.edit', $this->article))->assertOk();
        $this->actingAs($admin)->get(route('dashboard.articles.create'))->assertForbidden();
        $this->actingAs($admin)->post(route('dashboard.articles.publish', $this->article))->assertForbidden();
        $this->assertSame(ArticleStatus::Draft, $this->article->fresh()->status);
    }

    public function test_buttons_follow_the_role(): void
    {
        $media = $this->user('media');
        $admin = $this->user('admin');

        $this->actingAs($media)->get(route('dashboard.articles.index'))->assertSee('Tulis Artikel Baru');
        $this->actingAs($admin)->get(route('dashboard.articles.index'))->assertDontSee('Tulis Artikel Baru');

        $this->actingAs($media)->get(route('dashboard.articles.edit', $this->article))
            ->assertSee('"write":true', false)
            ->assertSee('"publish":', false)
            ->assertSee('"destroy":', false);
        $this->actingAs($admin)->get(route('dashboard.articles.edit', $this->article))
            ->assertSee('"write":false', false)
            ->assertSee('"moderate":true', false)
            ->assertSee('"destroy":', false);
    }
}
