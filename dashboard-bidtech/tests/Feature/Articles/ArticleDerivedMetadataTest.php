<?php

namespace Tests\Feature\Articles;

use App\Services\ArticleService;
use Tests\TestCase;

class ArticleDerivedMetadataTest extends TestCase
{
    private function paragraph(string $text): array
    {
        return [
            'type' => 'paragraph',
            'content' => [['type' => 'text', 'text' => $text, 'styles' => []]],
        ];
    }

    public function test_metadata_is_unicode_safe_normalized_and_limited_to_120_characters(): void
    {
        $text = "  Teknologi   Indonesia\n".str_repeat("\u{00E9}", 115).' sisanya';
        $metadata = app(ArticleService::class)->deriveContentMetadata([$this->paragraph($text)]);

        $this->assertStringStartsWith('Teknologi Indonesia ', $metadata['plain_text']);
        $this->assertSame(120, mb_strlen($metadata['meta_description']));
        $this->assertStringNotContainsString("\n", $metadata['meta_description']);
    }

    public function test_reading_time_uses_2500_characters_per_minute(): void
    {
        $service = app(ArticleService::class);

        $this->assertSame(0, $service->deriveContentMetadata([])['reading_minutes']);
        $this->assertSame(1, $service->deriveContentMetadata([$this->paragraph('a')])['reading_minutes']);
        $this->assertSame(1, $service->deriveContentMetadata([$this->paragraph(str_repeat('a', 2500))])['reading_minutes']);
        $this->assertSame(2, $service->deriveContentMetadata([$this->paragraph(str_repeat('a', 2501))])['reading_minutes']);
    }

    public function test_nested_and_table_text_is_counted_but_image_urls_are_not(): void
    {
        $blocks = [[
            'type' => 'paragraph',
            'content' => [['type' => 'text', 'text' => 'Awal', 'styles' => []]],
            'children' => [[
                'type' => 'table',
                'content' => ['rows' => [['cells' => [[['type' => 'text', 'text' => 'Tabel', 'styles' => []]]]]]],
                'children' => [],
            ]],
        ], [
            'type' => 'image',
            'props' => ['url' => 'https://example.test/rahasia-di-url.jpg', 'caption' => 'Caption'],
        ]];

        $plain = app(ArticleService::class)->deriveContentMetadata($blocks)['plain_text'];
        $this->assertSame('Awal Tabel', $plain);
        $this->assertStringNotContainsString('example.test', $plain);
    }
}
