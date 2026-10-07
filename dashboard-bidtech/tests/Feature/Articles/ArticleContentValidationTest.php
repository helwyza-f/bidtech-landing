<?php

namespace Tests\Feature\Articles;

use App\Enums\ArticleStatus;
use App\Enums\Role;
use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleContentValidationTest extends TestCase
{
    use RefreshDatabase;

    public function test_rejects_h1_heading_in_content(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);

        $response = $this->actingAs($media)->post(route('dashboard.articles.store'), [
            'title' => 'Artikel H1',
            'content' => [
                ['type' => 'heading', 'props' => ['level' => 1]],
            ],
        ]);

        $response->assertSessionHasErrors('content');
        $this->assertDatabaseMissing('articles', ['title' => 'Artikel H1']);
    }

    public function test_rejects_disallowed_block_type(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);

        $response = $this->actingAs($media)->post(route('dashboard.articles.store'), [
            'title' => 'Artikel Video',
            'content' => [
                ['type' => 'video'],
            ],
        ]);

        $response->assertSessionHasErrors('content');
    }

    public function test_allows_divider_in_article_body(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);

        $response = $this->actingAs($media)->post(route('dashboard.articles.store'), [
            'title' => 'Artikel Divider',
            'content' => [
                ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Bagian pertama.', 'styles' => []]]],
                ['type' => 'divider'],
                ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Bagian kedua.', 'styles' => []]]],
            ],
        ]);

        $response->assertRedirect();
        $response->assertSessionDoesntHaveErrors('content');
    }

    public function test_allows_multi_column_blocks_and_persists_their_nested_content(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);
        $columns = [
            [
                'type' => 'columnList',
                'children' => [
                    [
                        'type' => 'column',
                        'props' => ['width' => 1],
                        'children' => [
                            ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Kolom kiri.', 'styles' => []]]],
                        ],
                    ],
                    [
                        'type' => 'column',
                        'props' => ['width' => 1],
                        'children' => [
                            ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Kolom kanan.', 'styles' => []]]],
                        ],
                    ],
                ],
            ],
        ];

        $response = $this->actingAs($media)->post(route('dashboard.articles.store'), [
            'title' => 'Artikel Multi Kolom',
            'content' => $columns,
        ]);

        $response->assertRedirect();
        $response->assertSessionDoesntHaveErrors('content');

        $article = Article::where('title', 'Artikel Multi Kolom')->firstOrFail();
        $this->assertSame('columnList', $article->content[0]['type']);
        $this->assertSame(['column', 'column'], array_column($article->content[0]['children'], 'type'));
    }

    public function test_rejects_h1_nested_inside_a_multi_column_block(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);

        $response = $this->actingAs($media)->post(route('dashboard.articles.store'), [
            'title' => 'Artikel Kolom Dengan H1',
            'content' => [[
                'type' => 'columnList',
                'children' => [
                    [
                        'type' => 'column',
                        'children' => [['type' => 'heading', 'props' => ['level' => 1]]],
                    ],
                    [
                        'type' => 'column',
                        'children' => [['type' => 'paragraph']],
                    ],
                ],
            ]],
        ]);

        $response->assertSessionHasErrors('content');
        $this->assertDatabaseMissing('articles', ['title' => 'Artikel Kolom Dengan H1']);
    }

    public function test_rejects_image_block_without_alt_text(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);

        $response = $this->actingAs($media)->post(route('dashboard.articles.store'), [
            'title' => 'Artikel Gambar',
            'content' => [
                ['type' => 'image', 'props' => ['url' => 'https://media.bidtech.co.id/x.jpg']],
            ],
        ]);

        $response->assertSessionHasErrors('content');
    }

    public function test_publish_allows_placeholder_when_cover_is_missing(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);

        $article = Article::create([
            'title' => 'Artikel Tanpa Cover',
            'slug' => 'artikel-tanpa-cover',
            'content' => [['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Isi lengkap.', 'styles' => []]]]],
            'status' => ArticleStatus::Draft,
            'created_by' => $media->id,
            'updated_by' => $media->id,
        ]);

        $response = $this->actingAs($media)->post(route('dashboard.articles.publish', $article));

        $response->assertRedirect();
        $this->assertSame(ArticleStatus::Terbit, $article->fresh()->status);
    }

    public function test_publish_succeeds_once_title_slug_and_cover_are_filled(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);

        $article = Article::create([
            'title' => 'Artikel Lengkap',
            'slug' => 'artikel-lengkap',
            'content' => [['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Isi lengkap.', 'styles' => []]]]],
            'cover_image_url' => 'https://media.bidtech.co.id/cover.jpg',
            'cover_alt_text' => 'Cover artikel lengkap',
            'status' => ArticleStatus::Draft,
            'created_by' => $media->id,
            'updated_by' => $media->id,
        ]);

        $response = $this->actingAs($media)->post(route('dashboard.articles.publish', $article));

        $response->assertRedirect();
        $article->refresh();
        $this->assertSame(ArticleStatus::Terbit, $article->status);
        $this->assertNotNull($article->published_at);
    }
}
