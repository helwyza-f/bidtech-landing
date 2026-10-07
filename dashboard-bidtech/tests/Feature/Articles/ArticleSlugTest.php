<?php

namespace Tests\Feature\Articles;

use App\Enums\ArticleStatus;
use App\Enums\Role;
use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleSlugTest extends TestCase
{
    use RefreshDatabase;

    private function validContent(): array
    {
        return [[
            'type' => 'paragraph',
            'content' => [['type' => 'text', 'text' => 'Isi artikel.', 'styles' => []]],
        ]];
    }

    public function test_slug_is_generated_from_title_and_browser_slug_is_ignored(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);

        $this->actingAs($media)->post(route('dashboard.articles.store'), [
            'title' => 'Judul Otomatis Artikel',
            'slug' => 'slug-suntikan-browser',
            'content' => $this->validContent(),
        ])->assertRedirect();

        $this->assertDatabaseHas('articles', [
            'title' => 'Judul Otomatis Artikel',
            'slug' => 'judul-otomatis-artikel',
        ]);
    }

    public function test_collision_uses_numeric_suffix_across_active_and_deleted_slugs(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);
        $deleted = Article::create([
            'title' => 'Artikel Sama',
            'slug' => 'artikel-sama',
            'content' => $this->validContent(),
            'status' => ArticleStatus::Draft,
            'created_by' => $media->id,
            'updated_by' => $media->id,
        ]);
        $deleted->delete();

        $this->actingAs($media)->post(route('dashboard.articles.store'), [
            'title' => 'Artikel Sama',
            'content' => $this->validContent(),
        ])->assertRedirect();

        $this->assertDatabaseHas('articles', ['title' => 'Artikel Sama', 'slug' => 'artikel-sama-2']);
    }

    public function test_draft_slug_tracks_title_without_creating_history(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);
        $article = Article::create([
            'title' => 'Judul Awal',
            'slug' => 'judul-awal',
            'content' => $this->validContent(),
            'status' => ArticleStatus::Draft,
            'created_by' => $media->id,
            'updated_by' => $media->id,
        ]);

        $this->actingAs($media)->patchJson(route('dashboard.articles.autosave', $article), [
            'title' => 'Judul Draft Baru',
            'content' => $this->validContent(),
        ])->assertOk()->assertJsonPath('article.slug', 'judul-draft-baru');

        $this->assertSame('judul-draft-baru', $article->fresh()->slug);
    }

    public function test_published_slug_is_locked_when_title_changes(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);
        $article = Article::create([
            'title' => 'Judul Terbit',
            'slug' => 'judul-terbit',
            'content' => $this->validContent(),
            'status' => ArticleStatus::Terbit,
            'created_by' => $media->id,
            'updated_by' => $media->id,
        ]);

        $this->actingAs($media)->putJson(route('dashboard.articles.update', $article), [
            'title' => 'Judul Terbit Diubah',
            'slug' => 'tidak-dipercaya',
            'content' => $this->validContent(),
        ])->assertOk()->assertJsonPath('article.slug', 'judul-terbit');

        $this->assertSame('judul-terbit', $article->fresh()->slug);
    }
}
