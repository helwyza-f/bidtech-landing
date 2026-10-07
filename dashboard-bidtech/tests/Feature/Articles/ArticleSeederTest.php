<?php

namespace Tests\Feature\Articles;

use App\Enums\ArticleStatus;
use App\Enums\Role;
use App\Models\Article;
use App\Models\User;
use Database\Seeders\ArticleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Seeder artikel dipakai untuk data uji lokal; test ini memastikan ia tetap jalan setelah refactor
 * dan idempoten bila dijalankan ulang.
 */
class ArticleSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_seeder_creates_media_accounts_and_articles_in_expected_states(): void
    {
        $this->seed(ArticleSeeder::class);

        $this->assertSame(3, User::where('role', Role::Media)->count());
        $this->assertSame(5, Article::count());
        $this->assertSame(3, Article::where('status', ArticleStatus::Terbit)->count());
        $this->assertSame(1, Article::where('status', ArticleStatus::Draft)->count());
        $this->assertSame(1, Article::where('status', ArticleStatus::Nonaktif)->count());
    }

    public function test_seeder_can_be_run_twice_without_duplicating_articles(): void
    {
        $this->seed(ArticleSeeder::class);
        $this->seed(ArticleSeeder::class);

        $this->assertSame(5, Article::count());
        $this->assertSame(3, User::where('role', Role::Media)->count());
    }
}
