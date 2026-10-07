<?php

namespace Tests\Feature\Articles;

use App\Enums\ArticleStatus;
use App\Enums\Role;
use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleAutosaveTest extends TestCase
{
    use RefreshDatabase;

    private function content(string $text = ''): array
    {
        return [[
            'type' => 'paragraph',
            'content' => $text === '' ? [] : [['type' => 'text', 'text' => $text, 'styles' => []]],
        ]];
    }

    public function test_media_can_create_and_autosave_an_incomplete_draft(): void
    {
        $media = User::factory()->create(['role' => Role::Media, 'name' => 'Alya Media']);

        $created = $this->actingAs($media)->postJson(route('dashboard.articles.drafts.store'), [
            'title' => null,
            'content' => [],
        ])->assertCreated()
            ->assertJsonPath('article.slug', null)
            ->assertJsonPath('article.status', 'draft')
            ->assertJsonPath('article.reading_minutes', 0)
            ->assertJsonStructure(['article', 'edit_url', 'saved_at', 'endpoints']);

        $article = Article::findOrFail($created->json('article.id'));
        $this->assertNull($article->title);
        $this->assertNull($article->slug);

        $this->actingAs($media)->patchJson(route('dashboard.articles.autosave', $article), [
            'title' => 'Draft Pertama',
            'content' => $this->content('Isi autosave.'),
        ])->assertOk()
            ->assertJsonPath('article.slug', 'draft-pertama')
            ->assertJsonPath('article.meta_title', 'Draft Pertama')
            ->assertJsonPath('article.meta_description', 'Isi autosave.')
            ->assertJsonPath('article.reading_minutes', 1);

    }

    public function test_published_article_rejects_autosave_but_accepts_explicit_update(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);
        $article = Article::create([
            'title' => 'Sudah Terbit',
            'slug' => 'sudah-terbit',
            'content' => $this->content('Isi lama.'),
            'status' => ArticleStatus::Terbit,
            'created_by' => $media->id,
            'updated_by' => $media->id,
        ]);

        $this->actingAs($media)->patchJson(route('dashboard.articles.autosave', $article), [
            'title' => 'Tidak Boleh Autosave',
            'content' => $this->content('Isi baru.'),
        ])->assertForbidden();

        $this->assertSame('Sudah Terbit', $article->fresh()->title);

        $this->actingAs($media)->putJson(route('dashboard.articles.update', $article), [
            'title' => 'Update Eksplisit',
            'content' => $this->content('Isi baru.'),
        ])->assertOk()->assertJsonPath('article.title', 'Update Eksplisit');

    }
}
