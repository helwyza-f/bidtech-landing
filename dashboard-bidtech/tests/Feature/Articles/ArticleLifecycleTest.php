<?php

namespace Tests\Feature\Articles;

use App\Enums\ArticleStatus;
use App\Enums\Role;
use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

/**
 * Siklus hidup artikel lewat HTTP: buat, ubah, terbit, nonaktif, aktif lagi, dan hapus.
 */
class ArticleLifecycleTest extends TestCase
{
    use RefreshDatabase;

    private User $media;

    protected function setUp(): void
    {
        parent::setUp();

        config(['filesystems.disks.s3.url' => 'https://media.bidtech.co.id/bidtech']);
        Storage::fake('s3');
        $this->media = User::factory()->create(['role' => Role::Media, 'name' => 'Penulis']);
    }

    private function payload(array $overrides = []): array
    {
        return array_merge([
            'title' => 'Judul Artikel',
            'slug' => 'judul-artikel',
            'excerpt' => 'Ringkasan',
            'content' => [[
                'type' => 'paragraph',
                'content' => [['type' => 'text', 'text' => 'Isi artikel.', 'styles' => []]],
            ]],
            'cover_alt_text' => 'Alt cover',
        ], $overrides);
    }

    public function test_store_creates_draft(): void
    {
        $this->actingAs($this->media)->post(route('dashboard.articles.store'), $this->payload())
            ->assertRedirect()
            ->assertSessionHas('success');

        $article = Article::firstOrFail();
        $this->assertSame(ArticleStatus::Draft, $article->status);
        $this->assertSame($this->media->id, $article->created_by);
        $this->assertNotNull($article->content_updated_at);
    }

    public function test_draft_slug_follows_title_without_recording_history_and_lastmod_only_tracks_content(): void
    {
        $this->actingAs($this->media)->post(route('dashboard.articles.store'), $this->payload());
        $article = Article::firstOrFail();
        $article->forceFill(['content_updated_at' => now()->subDay()])->save();
        $before = $article->fresh()->content_updated_at;

        // Slug kiriman browser diabaikan; judul tetap berarti slug dan lastmod tetap.
        $this->actingAs($this->media)->put(route('dashboard.articles.update', $article), $this->payload(['slug' => 'slug-baru']))
            ->assertSessionHas('success');

        $article->refresh();
        $this->assertSame('judul-artikel', $article->slug);
        $this->assertEquals($before, $article->content_updated_at);

        // Judul draft berubah -> slug ikut judul tanpa memenuhi riwayat slug.
        $this->actingAs($this->media)->put(route('dashboard.articles.update', $article), $this->payload(['title' => 'Judul Baru']));
        $this->assertSame('judul-baru', $article->fresh()->slug);
        $this->assertTrue($article->fresh()->content_updated_at->greaterThan($before));
    }

    public function test_publish_deactivate_activate_cycle(): void
    {
        $cover = UploadedFile::fake()->createWithContent(
            'cover.png',
            base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='),
        );
        $this->actingAs($this->media)->post(route('dashboard.articles.store'), $this->payload([
            'cover_image' => $cover,
        ]));
        $article = Article::firstOrFail();

        $this->actingAs($this->media)->post(route('dashboard.articles.publish', $article))->assertSessionHas('success');
        $article->refresh();
        $this->assertSame(ArticleStatus::Terbit, $article->status);
        $publishedAt = $article->published_at;
        $this->assertNotNull($publishedAt);

        $this->actingAs($this->media)->post(route('dashboard.articles.deactivate', $article))->assertSessionHas('warning');
        $this->assertSame(ArticleStatus::Nonaktif, $article->fresh()->status);

        $article->forceFill(['content_updated_at' => now()->subDay()])->save();
        $this->actingAs($this->media)->post(route('dashboard.articles.activate', $article))->assertSessionHas('success');

        $article->refresh();
        $this->assertSame(ArticleStatus::Terbit, $article->status);
        $this->assertEquals($publishedAt, $article->published_at);
        $this->assertTrue($article->content_updated_at->isToday());
    }

    public function test_cover_is_uploaded_replaced_and_preserved_when_omitted(): void
    {
        $firstCover = UploadedFile::fake()->createWithContent(
            'first.png',
            base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='),
        );

        $this->actingAs($this->media)->post(route('dashboard.articles.store'), $this->payload([
            'cover_image' => $firstCover,
        ]))->assertRedirect();

        $article = Article::firstOrFail();
        $firstUrl = $article->cover_image_url;
        $this->assertNotNull($firstUrl);
        $this->assertStringContainsString('/articles/', $firstUrl);
        $this->assertDatabaseCount('article_images', 1);
        $this->assertDatabaseHas('article_images', ['status' => 'ready', 'tmp_path' => null]);

        $this->actingAs($this->media)->put(
            route('dashboard.articles.update', $article),
            $this->payload(),
        )->assertRedirect();
        $this->assertSame($firstUrl, $article->fresh()->cover_image_url);

        $replacement = UploadedFile::fake()->createWithContent(
            'replacement.png',
            base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='),
        );
        $this->actingAs($this->media)->put(route('dashboard.articles.update', $article), $this->payload([
            'cover_image' => $replacement,
        ]))->assertRedirect();

        $this->assertNotSame($firstUrl, $article->fresh()->cover_image_url);
        $this->assertDatabaseCount('article_images', 2);
    }

    public function test_invalid_cover_does_not_create_article_or_image_record(): void
    {
        $this->actingAs($this->media)->post(route('dashboard.articles.store'), $this->payload([
            'cover_image' => UploadedFile::fake()->createWithContent('fake.jpg', 'not-an-image'),
        ]))->assertSessionHasErrors('cover_image');

        $this->assertDatabaseCount('articles', 0);
        $this->assertDatabaseCount('article_images', 0);
    }

    public function test_cover_url_submitted_by_browser_is_not_trusted(): void
    {
        $this->actingAs($this->media)->post(route('dashboard.articles.store'), $this->payload([
            'cover_image_url' => 'https://untrusted.example/cover.jpg',
        ]))->assertRedirect();

        $this->assertNull(Article::firstOrFail()->cover_image_url);
    }

    public function test_uploaded_asset_id_becomes_cover_and_alt_follows_title(): void
    {
        $cover = UploadedFile::fake()->createWithContent(
            'trusted-cover.png',
            base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='),
        );
        $upload = $this->actingAs($this->media)->postJson(route('dashboard.articles.images.store'), [
            'image' => $cover,
        ])->assertOk();

        $this->actingAs($this->media)->post(route('dashboard.articles.store'), $this->payload([
            'title' => 'Cover Tepercaya',
            'cover_image_id' => $upload->json('image_id'),
            'cover_alt_text' => 'Alt dari browser harus diabaikan',
        ]))->assertRedirect();

        $article = Article::firstOrFail();
        $this->assertStringContainsString('/articles/', $article->cover_image_url);
        $this->assertSame('Cover Tepercaya', $article->cover_alt_text);
    }

    public function test_oversized_cover_is_rejected_before_storage(): void
    {
        $this->actingAs($this->media)->post(route('dashboard.articles.store'), $this->payload([
            'cover_image' => UploadedFile::fake()->create('large.png', 10 * 1024 + 1, 'image/png'),
        ]))->assertSessionHasErrors('cover_image');

        $this->assertDatabaseCount('articles', 0);
        $this->assertDatabaseCount('article_images', 0);
        Storage::disk('s3')->assertDirectoryEmpty('articles');
    }

    public function test_invalid_replacement_keeps_existing_cover(): void
    {
        $article = Article::create([
            'title' => 'Existing Article',
            'slug' => 'existing-article',
            'content' => [['type' => 'paragraph']],
            'cover_image_url' => 'https://media.bidtech.co.id/bidtech/articles/existing.png',
            'cover_alt_text' => 'Existing cover',
            'status' => ArticleStatus::Draft,
            'created_by' => $this->media->id,
            'updated_by' => $this->media->id,
        ]);

        $this->actingAs($this->media)->put(route('dashboard.articles.update', $article), $this->payload([
            'cover_image' => UploadedFile::fake()->createWithContent('fake.png', 'not-an-image'),
        ]))->assertSessionHasErrors('cover_image');

        $this->assertSame('https://media.bidtech.co.id/bidtech/articles/existing.png', $article->fresh()->cover_image_url);
        $this->assertDatabaseCount('article_images', 0);
        Storage::disk('s3')->assertDirectoryEmpty('articles');
    }

    public function test_destroy_soft_deletes_article(): void
    {
        $this->actingAs($this->media)->post(route('dashboard.articles.store'), $this->payload());
        $article = Article::firstOrFail();

        $this->actingAs($this->media)->delete(route('dashboard.articles.destroy', $article))
            ->assertRedirect(route('dashboard.articles.index'))
            ->assertSessionHas('success');

        $this->assertSoftDeleted($article);
    }

    public function test_index_defaults_to_own_articles_for_media_but_can_be_changed(): void
    {
        $other = User::factory()->create(['role' => Role::Media]);
        $this->actingAs($this->media)->post(route('dashboard.articles.store'), $this->payload());
        $this->actingAs($other)->post(route('dashboard.articles.store'), $this->payload(['slug' => 'lain', 'title' => 'Lain']));
        Article::where('slug', 'lain')->update(['status' => ArticleStatus::Terbit]);

        // Tanpa filter apa pun, media hanya melihat artikelnya sendiri secara default.
        $default = $this->actingAs($this->media)->get(route('dashboard.articles.index'))
            ->assertOk()->assertViewIs('pages.kelola-artikel');
        $this->assertSame(['judul-artikel'], $default->viewData('articles')->pluck('slug')->all());
        $this->assertCount(2, $default->viewData('creators'));

        // Memilih "Semua Penulis" (created_by dikirim kosong) menampilkan artikel semua penulis.
        $all = $this->actingAs($this->media)->get(route('dashboard.articles.index', ['created_by' => '']));
        $this->assertCount(2, $all->viewData('articles'));

        // Filter tetap bisa diubah ke penulis lain secara eksplisit.
        $byCreator = $this->actingAs($this->media)->get(route('dashboard.articles.index', ['created_by' => $other->id]));
        $this->assertSame(['lain'], $byCreator->viewData('articles')->pluck('slug')->all());

        $byStatus = $this->actingAs($this->media)->get(route('dashboard.articles.index', ['created_by' => '', 'status' => 'draft']));
        $this->assertSame(['judul-artikel'], $byStatus->viewData('articles')->pluck('slug')->all());
    }

    public function test_index_search_filters_by_title(): void
    {
        $this->actingAs($this->media)->post(route('dashboard.articles.store'), $this->payload(['title' => 'Tips Memilih Domain']));
        $this->actingAs($this->media)->post(route('dashboard.articles.store'), $this->payload(['slug' => 'lain', 'title' => 'Panduan Hosting']));

        $result = $this->actingAs($this->media)->get(route('dashboard.articles.index', ['created_by' => '', 'search' => 'domain']));

        $this->assertSame(['Tips Memilih Domain'], $result->viewData('articles')->pluck('title')->all());
    }

    public function test_create_and_edit_pages_render_for_media(): void
    {
        $this->actingAs($this->media)->post(route('dashboard.articles.store'), $this->payload());
        $article = Article::firstOrFail();

        $this->actingAs($this->media)->get(route('dashboard.articles.create'))->assertOk();
        $this->actingAs($this->media)->get(route('dashboard.articles.edit', $article))->assertOk();
    }
}
