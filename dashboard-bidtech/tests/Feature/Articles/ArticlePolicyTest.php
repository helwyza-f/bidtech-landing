<?php

namespace Tests\Feature\Articles;

use App\Enums\ArticleStatus;
use App\Enums\Role;
use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticlePolicyTest extends TestCase
{
    use RefreshDatabase;

    private function validContent(): array
    {
        return [
            ['type' => 'paragraph'],
        ];
    }

    public function test_media_can_create_article(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);

        $response = $this->actingAs($media)->post(route('dashboard.articles.store'), [
            'title' => 'Artikel Pertama',
            'excerpt' => 'Ringkasan',
            'content' => $this->validContent(),
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('articles', [
            'title' => 'Artikel Pertama',
            'status' => ArticleStatus::Draft->value,
            'created_by' => $media->id,
        ]);
    }

    public function test_admin_cannot_create_article(): void
    {
        $admin = User::factory()->create(['role' => Role::Admin]);

        $response = $this->actingAs($admin)->post(route('dashboard.articles.store'), [
            'title' => 'Artikel Admin',
            'content' => $this->validContent(),
        ]);

        $response->assertForbidden();
        $this->assertDatabaseMissing('articles', ['title' => 'Artikel Admin']);
    }

    public function test_admin_cannot_update_or_publish_article(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);
        $admin = User::factory()->create(['role' => Role::Admin]);

        $article = Article::create([
            'title' => 'Judul Awal',
            'slug' => 'judul-awal',
            'content' => $this->validContent(),
            'status' => ArticleStatus::Draft,
            'created_by' => $media->id,
            'updated_by' => $media->id,
        ]);

        $this->actingAs($admin)->put(route('dashboard.articles.update', $article), [
            'title' => 'Diubah Admin',
            'content' => $this->validContent(),
        ])->assertForbidden();

        $this->actingAs($admin)->post(route('dashboard.articles.publish', $article))
            ->assertForbidden();
    }

    public function test_media_and_admin_can_deactivate_activate_and_delete(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);
        $admin = User::factory()->create(['role' => Role::Admin]);

        $article = Article::create([
            'title' => 'Artikel Terbit',
            'slug' => 'artikel-terbit',
            'content' => $this->validContent(),
            'cover_image_url' => 'https://media.bidtech.co.id/cover.jpg',
            'cover_alt_text' => 'Cover',
            'status' => ArticleStatus::Terbit,
            'published_at' => now(),
            'created_by' => $media->id,
            'updated_by' => $media->id,
        ]);

        $this->actingAs($admin)->post(route('dashboard.articles.deactivate', $article))
            ->assertRedirect();
        $this->assertSame(ArticleStatus::Nonaktif, $article->fresh()->status);

        $this->actingAs($media)->post(route('dashboard.articles.activate', $article))
            ->assertRedirect();
        $this->assertSame(ArticleStatus::Terbit, $article->fresh()->status);

        $this->actingAs($admin)->delete(route('dashboard.articles.destroy', $article))
            ->assertRedirect();
        $this->assertSoftDeleted('articles', ['id' => $article->id]);
    }
}
