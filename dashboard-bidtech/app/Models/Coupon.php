<?php

namespace App\Models;

use App\Enums\DiscountType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Coupon extends Model
{
    protected $fillable = ['name', 'code', 'valid_from', 'valid_until', 'usage_limit', 'user_usage_limit', 'min_order_amount', 'subtotal_discount_type', 'subtotal_discount_amount', 'subtotal_discount_max', 'service_discount_type', 'service_discount_amount', 'service_discount_max', 'template_discount_type', 'template_discount_amount', 'template_discount_max', 'server_discount_type', 'server_discount_amount', 'server_discount_max', 'domain_discount_type', 'domain_discount_amount', 'domain_discount_max', 'partner_id', 'is_active'];

    protected function casts(): array
    {
        return ['valid_from' => 'datetime', 'valid_until' => 'datetime', 'usage_limit' => 'integer', 'user_usage_limit' => 'integer', 'min_order_amount' => 'integer', 'subtotal_discount_type' => DiscountType::class, 'service_discount_type' => DiscountType::class, 'template_discount_type' => DiscountType::class, 'server_discount_type' => DiscountType::class, 'domain_discount_type' => DiscountType::class, 'is_active' => 'boolean'];
    }

    public function partner(): BelongsTo { return $this->belongsTo(Partner::class); }
    public function orders(): HasMany { return $this->hasMany(Order::class); }
    public function scopeActive(Builder $query): Builder { return $query->where('is_active', true); }
    public function isExpired(): bool { return ($this->valid_from && now()->lt($this->valid_from)) || ($this->valid_until && now()->gt($this->valid_until)); }
    public function hasQuota(?string $email = null): bool
    {
        if ($this->usage_limit !== null && $this->orders()->count() >= $this->usage_limit) return false;
        if ($email === null || $this->user_usage_limit === null) return true;
        return $this->orders()->whereRaw('LOWER(email) = ?', [strtolower(trim($email))])->count() < $this->user_usage_limit;
    }

    public function discountFor(string $component, int $price): int
    {
        $type = $this->{"{$component}_discount_type"};
        $amount = (int) ($this->{"{$component}_discount_amount"} ?? 0);
        $max = $this->{"{$component}_discount_max"};
        return match ($type) {
            DiscountType::Percentage => min($price, $max === null ? (int) round($price * $amount / 100) : min((int) round($price * $amount / 100), (int) $max)),
            DiscountType::Fixed => max(0, $price - $amount),
            DiscountType::Nominal => min($price, $amount),
            default => 0,
        };
    }
}
