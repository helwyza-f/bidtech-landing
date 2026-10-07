<?php

namespace App\Models;

use App\Enums\ArticleImageStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class ArticleImage extends Model
{
    protected $fillable = [
        'uploaded_by',
        'tmp_path',
        'disk_path',
        'original_filename',
        'mime_type',
        'size',
        'width',
        'height',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'status' => ArticleImageStatus::class,
        ];
    }

    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    /** URL publik gambar artikel pada object storage S3-compatible. */
    public function publicUrl(): ?string
    {
        return $this->disk_path ? Storage::disk('s3')->url($this->disk_path) : null;
    }
}
