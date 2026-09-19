<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Template extends Model
{
    protected $fillable = [
        'id',
        'name',
        'category',
        'price',
        'template_price',
        'server_price',
        'service_price',
        'template_desc',
        'server_desc',
        'service_desc',
        'preview',
        'views',
        'demo_url',
        'description',
        'tags',
        'is_active',
    ];

    protected $casts = [
        'price'          => 'integer',
        'template_price' => 'integer',
        'server_price'   => 'integer',
        'service_price'  => 'integer',
        'views'          => 'integer',
        'is_active'      => 'boolean',
    ];

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Hitung total pesanan lunas untuk template ini (Laku)
     */
    public function getSalesCountAttribute(): int
    {
        if (array_key_exists('sales_count', $this->attributes)) {
            return (int) $this->attributes['sales_count'];
        }
        return (int) $this->orders()->where('status', \App\Enums\OrderStatus::Paid)->count();
    }

    /**
     * Hitung total pendapatan dari pesanan lunas untuk template ini
     */
    public function getTotalSalesRevenueAttribute(): int
    {
        return (int) $this->orders()->where('status', \App\Enums\OrderStatus::Paid)->get()->sum(function ($order) {
            return $order->total_price;
        });
    }

    /**
     * Hitung total harga paket dari rincian komponen harga (fallback ke $price jika komponen bernilai 0/null)
     */
    public function getTotalPackagePriceAttribute(): int
    {
        $breakdownSum = ($this->template_price ?? 0) + ($this->server_price ?? 0) + ($this->service_price ?? 0);
        return $breakdownSum > 0 ? $breakdownSum : ($this->price ?? 2000000);
    }

    /**
     * URL landing page / live demo resmi di website Bidtech
     */
    public function getLandingUrlAttribute(): string
    {
        if (!empty($this->demo_url)) {
            if (str_starts_with($this->demo_url, 'http://') || str_starts_with($this->demo_url, 'https://')) {
                return $this->demo_url;
            }
            $baseUrl = config('app.frontend_url', env('LANDING_URL', 'http://localhost:3000'));
            return rtrim($baseUrl, '/') . '/' . ltrim($this->demo_url, '/');
        }

        $baseUrl = config('app.frontend_url', env('LANDING_URL', 'http://localhost:3000'));
        $paths = [
            1  => '/demo/automotive',
            2  => '/demo/restaurant-cafe-2',
            3  => '/demo/restaurant-cafe',
            4  => '/demo/beauty-wellness',
            5  => '/demo/community-pro',
            6  => '/demo/organization',
            7  => '/demo/e-commerce',
            8  => '/demo/property',
            9  => '/demo/beauty-wellness-2',
            10 => '/demo/smartbelajar',
            11 => '/demo/nivoraacademy',
            12 => '/demo/aliansi-kepemimpinan-indonesia',
            13 => '/demo/tehin',
            14 => '/demo/agak-rapi',
            15 => '/demo/pinjammobil',
            16 => '/demo/forcevault',
            17 => '/demo/elevasi',
        ];

        return rtrim($baseUrl, '/') . ($paths[$this->id] ?? '/template-website');
    }

    /**
     * URL preview gambar aset (mendukung public assets maupun uploads)
     */
    public function getPreviewUrlAttribute(): string
    {
        if (empty($this->preview)) {
            return asset('images/design_thumbnail/rentcar.webp');
        }
        if (str_starts_with($this->preview, 'http://') || str_starts_with($this->preview, 'https://')) {
            return $this->preview;
        }
        return asset(ltrim($this->preview, '/'));
    }

    /**
     * Array tags hasil pemisahan koma
     */
    public function getTagsListAttribute(): array
    {
        if (empty($this->tags)) {
            return [];
        }
        return array_values(array_filter(array_map('trim', explode(',', $this->tags))));
    }

    /**
     * Increment view counter secara atomic
     */
    public function incrementView(): int
    {
        $this->increment('views');
        return (int) $this->fresh()->views;
    }
}

