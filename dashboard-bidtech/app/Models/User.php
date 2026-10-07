<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Database\Factories\UserFactory;
use App\Enums\Role;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'role',
        'name',
        'email',
        'whatsapp',
        'password',
        'author_name',
        'photo',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password'          => 'hashed',
            'role'              => Role::class,
        ];
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'client_id');
    }

    public function partner(): HasOne
    {
        return $this->hasOne(Partner::class);
    }

    /**
     * Cek apakah user adalah admin
     */
    public function isAdmin(): bool
    {
        return $this->role === Role::Admin;
    }

    /**
     * Cek apakah user adalah tim media (penulis/editor artikel)
     */
    public function isMedia(): bool
    {
        return $this->role === Role::Media;
    }

    public function isMarketing(): bool { return $this->role === Role::Marketing; }
    public function isKlien(): bool { return $this->role === Role::Klien; }
    public function isMitra(): bool { return $this->role === Role::Mitra; }

    /**
     * Hanya media yang boleh membuat, mengedit, dan mempublikasikan artikel (termasuk unggah gambarnya).
     */
    public function canWriteArticles(): bool
    {
        return $this->isMedia();
    }

    /**
     * Media dan admin bisa melihat semua artikel serta menonaktifkan, mengaktifkan, dan menghapusnya
     * (tidak ada pengecekan kepemilikan).
     */
    public function canModerateArticles(): bool
    {
        return $this->isMedia() || $this->isAdmin();
    }

    /**
     * Nama byline publik yang tampil di artikel. Fallback ke nama akun bila belum diisi.
     */
    public function displayAuthorName(): string
    {
        return $this->author_name ?: $this->name;
    }

    /**
     * URL foto profil pada object storage S3-compatible (prefix "profiles/"), fallback ke placeholder.
     */
    public function getPhotoUrlAttribute(): string
    {
        /** @var \Illuminate\Filesystem\FilesystemAdapter $disk */
        $disk = Storage::disk('s3');

        if (empty($this->photo)) {
            return $disk->url('profiles/placeholder_profile.webp');
        }
        if (str_starts_with($this->photo, 'http://') || str_starts_with($this->photo, 'https://')) {
            return $this->photo;
        }

        return $disk->url(ltrim($this->photo, '/'));
    }
}
