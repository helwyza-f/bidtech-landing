<?php

namespace Tests\Feature\Articles;

use App\Enums\ArticleImageStatus;
use App\Enums\Role;
use App\Models\ArticleImage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class ArticleImageUploadTest extends TestCase
{
    use RefreshDatabase;

    private const PNG_1X1 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

    protected function setUp(): void
    {
        parent::setUp();

        config(['filesystems.disks.s3.url' => 'https://media.bidtech.co.id/bidtech']);
        Storage::fake('s3');
    }

    private function image(string $name = 'image.png', string $mime = 'image/png'): UploadedFile
    {
        $path = tempnam(sys_get_temp_dir(), 'bidtech-image-');
        file_put_contents($path, base64_decode(self::PNG_1X1));

        return new class($path, $name, $mime) extends UploadedFile
        {
            public function __construct(string $path, string $name, private readonly string $detectedMime)
            {
                parent::__construct($path, $name, $detectedMime, UPLOAD_ERR_OK, true);
            }

            public function getMimeType(): ?string
            {
                return $this->detectedMime;
            }
        };
    }

    public function test_non_media_user_cannot_upload_an_image(): void
    {
        $admin = User::factory()->create(['role' => Role::Admin]);

        $this->actingAs($admin)->post(route('dashboard.articles.images.store'), [
            'image' => $this->image(),
        ])->assertForbidden();

        $this->assertDatabaseCount('article_images', 0);
        Storage::disk('s3')->assertDirectoryEmpty('articles');
    }

    public function test_guest_is_redirected_before_upload(): void
    {
        $this->post(route('dashboard.articles.images.store'), [
            'image' => $this->image(),
        ])->assertRedirect(route('login.view'));

        $this->assertDatabaseCount('article_images', 0);
        Storage::disk('s3')->assertDirectoryEmpty('articles');
    }

    public function test_media_uploads_an_image_through_laravel(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);

        $response = $this->actingAs($media)->postJson(route('dashboard.articles.images.store'), [
            'image' => $this->image(),
        ])->assertOk()->assertJsonStructure(['image_id', 'url', 'width', 'height']);

        $image = ArticleImage::firstOrFail();
        $this->assertSame(ArticleImageStatus::Ready, $image->status);
        $this->assertNull($image->tmp_path);
        $this->assertSame(1, $image->width);
        $this->assertSame(1, $image->height);
        $this->assertSame($media->id, $image->uploaded_by);
        $this->assertSame('image.png', $image->original_filename);
        $this->assertSame('image/png', $image->mime_type);
        $this->assertGreaterThan(0, $image->size);
        $this->assertSame(1, $response->json('width'));
        $this->assertSame($image->id, $response->json('image_id'));
        $this->assertStringStartsWith('articles/', $image->disk_path);
        $this->assertStringEndsWith('.png', $image->disk_path);
        $this->assertStringContainsString('/articles/', $response->json('url'));
        Storage::disk('s3')->assertExists($image->disk_path);
    }

    /** @return array<string, array{string, string}> */
    public static function allowedFormats(): array
    {
        return [
            'jpeg' => ['photo.jpg', 'image/jpeg'],
            'png' => ['photo.png', 'image/png'],
            'webp' => ['photo.webp', 'image/webp'],
            'avif' => ['photo.avif', 'image/avif'],
            'gif' => ['photo.gif', 'image/gif'],
        ];
    }

    #[DataProvider('allowedFormats')]
    public function test_each_supported_server_detected_format_is_stored(string $name, string $mime): void
    {
        $media = User::factory()->create(['role' => Role::Media]);

        $this->actingAs($media)->postJson(route('dashboard.articles.images.store'), [
            'image' => $this->image($name, $mime),
        ])->assertOk();

        $image = ArticleImage::latest('id')->firstOrFail();
        $this->assertSame($mime, $image->mime_type);
        $this->assertStringEndsWith('.'.pathinfo($name, PATHINFO_EXTENSION), $image->disk_path);
        $this->assertSame(ArticleImageStatus::Ready, $image->status);
        $this->assertNull($image->tmp_path);
        $this->assertSame(1, $image->width);
        $this->assertSame(1, $image->height);
        $this->assertSame($name, $image->original_filename);
    }

    public function test_svg_and_fake_image_content_are_rejected(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);

        $this->actingAs($media)->postJson(route('dashboard.articles.images.store'), [
            'image' => UploadedFile::fake()->createWithContent('logo.svg', '<svg xmlns="http://www.w3.org/2000/svg"></svg>'),
        ])->assertUnprocessable()->assertJsonValidationErrors('image');

        $this->actingAs($media)->postJson(route('dashboard.articles.images.store'), [
            'image' => UploadedFile::fake()->createWithContent('fake.jpg', 'not-an-image'),
        ])->assertUnprocessable()->assertJsonValidationErrors('image');

        $this->assertDatabaseCount('article_images', 0);
    }

    public function test_empty_and_oversized_files_are_rejected(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);

        $this->actingAs($media)->postJson(route('dashboard.articles.images.store'), [
            'image' => UploadedFile::fake()->createWithContent('empty.png', ''),
        ])->assertUnprocessable()->assertJsonValidationErrors('image');

        $this->actingAs($media)->postJson(route('dashboard.articles.images.store'), [
            'image' => UploadedFile::fake()->create('large.png', 10 * 1024 + 1, 'image/png'),
        ])->assertUnprocessable()->assertJsonValidationErrors('image');

        $this->assertDatabaseCount('article_images', 0);
    }

    public function test_image_field_is_required(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);

        $this->actingAs($media)->postJson(route('dashboard.articles.images.store'))
            ->assertUnprocessable()
            ->assertJsonValidationErrors('image');

        $this->assertDatabaseCount('article_images', 0);
    }

    public function test_each_upload_uses_a_unique_final_key(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);

        $this->actingAs($media)->postJson(route('dashboard.articles.images.store'), ['image' => $this->image()])->assertOk();
        $this->actingAs($media)->postJson(route('dashboard.articles.images.store'), ['image' => $this->image()])->assertOk();

        $paths = ArticleImage::pluck('disk_path');
        $this->assertCount(2, $paths);
        $this->assertSame(2, $paths->unique()->count());
        $this->assertTrue($paths->every(fn (string $path) => str_starts_with($path, 'articles/')));
        $this->assertTrue($paths->every(fn (string $path) => ! str_contains($path, 'tmp/')));
    }
}
