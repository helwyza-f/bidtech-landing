<?php

namespace App\Models;

use App\Enums\ArticleStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'cover_image_url',
        'cover_alt_text',
        'status',
        'published_at',
        'content_updated_at',
        'created_by',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'content' => 'array',
            'status' => ArticleStatus::class,
            'published_at' => 'datetime',
            'content_updated_at' => 'datetime',
        ];
    }

    /**
     * Byline publik memakai data akun media pembuat langsung (nama & foto),
     * bukan entitas "profil penulis" terpisah (spec bagian 4, revisi 2026-09-29).
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

}
