<?php

namespace Tests\Feature\Articles;

use App\Enums\ArticleStatus;
use App\Enums\Role;
use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class ArticleEditorMountTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_page_renders_block_editor_mount_contract(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);

        $this->actingAs($media)->get(route('dashboard.articles.create'))
            ->assertOk()
            ->assertSee('data-article-editor-root', false)
            ->assertSee('id="article-editor-data"', false)
            ->assertSee('"content":[]', false)
            ->assertSee('"draft_store":', false)
            ->assertSee('https://media.bidtech.co.id/bidtech/blog/placeholder.webp', false)
            ->assertDontSee('id="sidebar"', false);
    }

    public function test_edit_page_passes_quote_block_to_editor_initial_content(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);
        $article = Article::create([
            'title' => 'Artikel Kutipan',
            'slug' => 'artikel-kutipan',
            'content' => [
                [
                    'id' => (string) Str::uuid(),
                    'type' => 'quote',
                    'props' => ['backgroundColor' => 'default', 'textColor' => 'default'],
                    'content' => [['type' => 'text', 'text' => 'Kutipan penting.', 'styles' => []]],
                    'children' => [],
                ],
            ],
            'status' => ArticleStatus::Draft,
            'created_by' => $media->id,
            'updated_by' => $media->id,
        ]);

        $this->actingAs($media)->get(route('dashboard.articles.edit', $article))
            ->assertOk()
            ->assertSee('data-article-editor-root', false)
            ->assertSee('id="article-editor-data"', false)
            ->assertSee('"type":"quote"', false)
            ->assertSee('"meta_description":"Kutipan penting."', false)
            ->assertDontSee('id="sidebar"', false);
    }
}
