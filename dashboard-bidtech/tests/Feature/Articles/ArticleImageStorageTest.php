<?php

namespace Tests\Feature\Articles;

use App\Enums\Role;
use App\Models\ArticleImage;
use App\Models\User;
use App\Services\ArticleService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use RuntimeException;
use Tests\TestCase;

class ArticleImageStorageTest extends TestCase
{
    use RefreshDatabase;

    private const PNG_1X1 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('s3');
    }

    private function image(): UploadedFile
    {
        return UploadedFile::fake()->createWithContent('image.png', base64_decode(self::PNG_1X1));
    }

    public function test_object_is_removed_when_database_recording_fails(): void
    {
        $media = User::factory()->create(['role' => Role::Media]);
        ArticleImage::creating(function (): never {
            throw new RuntimeException('Simulated database failure.');
        });

        try {
            app(ArticleService::class)->uploadImage($this->image(), $media);
            $this->fail('Database failure was expected.');
        } catch (RuntimeException $exception) {
            $this->assertSame('Simulated database failure.', $exception->getMessage());
            Storage::disk('s3')->assertDirectoryEmpty('articles');
        } finally {
            ArticleImage::flushEventListeners();
        }
    }

    public function test_public_url_uses_configured_media_base_url(): void
    {
        config(['filesystems.disks.s3.url' => 'https://media.bidtech.co.id/bidtech']);
        $media = User::factory()->create(['role' => Role::Media]);
        Storage::forgetDisk('s3');
        $image = ArticleImage::create([
            'uploaded_by' => $media->id,
            'tmp_path' => null,
            'disk_path' => 'articles/example.png',
            'mime_type' => 'image/png',
            'size' => 100,
            'width' => 1,
            'height' => 1,
            'status' => 'ready',
        ]);

        $this->assertSame(
            'https://media.bidtech.co.id/bidtech/'.$image->disk_path,
            $image->publicUrl(),
        );
        $this->assertNull($image->tmp_path);
        $this->assertSame('ready', $image->status->value);
        $this->assertSame(1, $image->width);
        $this->assertSame(1, $image->height);
    }
}
