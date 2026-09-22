<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class Promo extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'description',
        'type',
        'reward_amount',
        'max_discount',
        'min_order_amount',
        'min_applicable_price',
        'target_scope',
        'target_template_id',
        'is_partner',
        'partner_name',
        'partner_code',
        'partner_commission_type',
        'partner_commission_value',
        'allowed_domains',
        'allowed_emails',
        'usage_limit',
        'used_count',
        'usage_per_user',
        'valid_from',
        'valid_until',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'reward_amount'            => 'integer',
            'max_discount'             => 'integer',
            'min_order_amount'         => 'integer',
            'min_applicable_price'     => 'integer',
            'is_partner'               => 'boolean',
            'partner_commission_value' => 'integer',
            'usage_limit'              => 'integer',
            'used_count'               => 'integer',
            'usage_per_user'           => 'integer',
            'is_active'                => 'boolean',
            'valid_from'               => 'datetime',
            'valid_until'              => 'datetime',
        ];
    }

    public function usages(): HasMany
    {
        return $this->hasMany(PromoUsage::class);
    }

    public function isOverrideType(): bool
    {
        return $this->type === 'override_price';
    }

    public function isFreeType(): bool
    {
        return in_array($this->type, ['free', 'free_component'], true);
    }

    public function isBundleType(): bool
    {
        return $this->type === 'bundle_price';
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function targetTemplate(): BelongsTo
    {
        return $this->belongsTo(Template::class, 'target_template_id');
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopePartner(Builder $query): Builder
    {
        return $query->where('is_partner', true);
    }

    public function scopeGeneral(Builder $query): Builder
    {
        return $query->where('is_partner', false);
    }

    /**
     * Cek apakah promo sudah kedaluwarsa atau belum dimulai
     */
    public function isExpired(): bool
    {
        $now = now();

        if ($this->valid_from && $now->lessThan($this->valid_from)) {
            return true; // Belum mulai
        }

        if ($this->valid_until && $now->greaterThan($this->valid_until)) {
            return true; // Sudah lewat
        }

        return false;
    }

    /**
     * Cek ketersediaan kuota global promo
     */
    public function hasQuota(): bool
    {
        if (is_null($this->usage_limit)) {
            return true;
        }

        return $this->used_count < $this->usage_limit;
    }

    /**
     * Cek validasi hak akses email untuk promo mitra (Whitelist Domain / Email)
     */
    public function isEmailAllowed(?string $email): bool
    {
        // Jika tidak ada pembatasan domain/email, semua email diizinkan
        if (empty($this->allowed_domains) && empty($this->allowed_emails)) {
            return true;
        }

        if (empty($email)) {
            return false;
        }

        $email = strtolower(trim($email));

        // 1. Cek Whitelist Domain Email (contoh: batam.go.id, polibatam.ac.id)
        if (!empty($this->allowed_domains)) {
            $domains = array_map('trim', explode(',', strtolower($this->allowed_domains)));
            $emailParts = explode('@', $email);
            $domainPart = $emailParts[1] ?? '';

            foreach ($domains as $d) {
                $d = ltrim($d, '@');
                if (!empty($d) && (strcasecmp($domainPart, $d) === 0 || str_ends_with($domainPart, '.' . $d))) {
                    return true;
                }
            }
        }

        // 2. Cek Whitelist Email Spesifik
        if (!empty($this->allowed_emails)) {
            // Cek apakah format JSON atau teks comma-separated
            $decoded = json_decode($this->allowed_emails, true);
            $specificEmails = is_array($decoded)
                ? array_map('strtolower', array_map('trim', $decoded))
                : array_map('strtolower', array_map('trim', explode(',', $this->allowed_emails)));

            if (in_array($email, $specificEmails, true)) {
                return true;
            }
        }

        return false;
    }
}
