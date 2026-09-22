<?php

namespace App\Models;

use App\Enums\OrderStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'template_id',
        'domain_name',
        'domain_price',
        'domain_duration',
        'domain_price_per_year',

        // Snapshot Rincian Harga
        'template_price',
        'server_price',
        'service_price',
        'template_desc',
        'server_desc',
        'service_desc',

        // Snapshot Promo & Diskon
        'promo_id',
        'promo_code',
        'discount_amount',

        // Snapshot Mitra
        'is_partner_order',
        'partner_name',
        'partner_commission_amount',

        'full_name',
        'email',
        'whatsapp',
        'xendit_invoice_id',
        'xendit_payment_url',
        'status',
        'payment_expires_at',
        'paid_at',
        'paid_email_sent_at',
    ];

    protected function casts(): array
    {
        return [
            'domain_price'              => 'integer',
            'domain_duration'           => 'integer',
            'domain_price_per_year'     => 'integer',
            'template_price'            => 'integer',
            'server_price'              => 'integer',
            'service_price'             => 'integer',
            'discount_amount'           => 'integer',
            'is_partner_order'          => 'boolean',
            'partner_commission_amount' => 'integer',
            'status'                    => OrderStatus::class,
            'payment_expires_at'        => 'datetime',
            'paid_at'                   => 'datetime',
            'paid_email_sent_at'        => 'datetime',
        ];
    }

    public function template(): BelongsTo
    {
        return $this->belongsTo(Template::class);
    }

    public function promo(): BelongsTo
    {
        return $this->belongsTo(Promo::class);
    }

    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

    public function isPaid(): bool
    {
        return $this->status === OrderStatus::Paid;
    }

    public function isExpired(): bool
    {
        return $this->status === OrderStatus::Invalid 
            || ($this->status === OrderStatus::Unpaid && $this->payment_expires_at && now()->greaterThan($this->payment_expires_at));
    }

    /**
     * Hitung Subtotal kotor sebelum diskon (Template + Server + Layanan + Domain)
     */
    public function getSubtotalAttribute(): int
    {
        $templatePrice = $this->template_price ?? $this->template?->template_price ?? 1000000;
        $serverPrice   = $this->server_price ?? $this->template?->server_price ?? 500000;
        $servicePrice  = $this->service_price ?? $this->template?->service_price ?? 500000;
        $domainPrice   = $this->domain_price ?? 0;

        return $templatePrice + $serverPrice + $servicePrice + $domainPrice;
    }

    /**
     * Hitung Total Tagihan Bersih setelah dipotong Diskon Kode Promo (digunakan di Fonnte & Invoice)
     */
    public function getTotalPriceAttribute(): int
    {
        return max(0, $this->subtotal - ($this->discount_amount ?? 0));
    }

    /**
     * Dapatkan akun user klien untuk order ini, atau buatkan otomatis jika belum ada (1 Template 1 Akun)
     */
    public function getOrCreateUser(): User
    {
        $user = User::where('order_id', $this->id)->first();

        $domainName = strtolower(trim($this->domain_name ?: 'bisnis.com'));
        $baseName = explode('.', $domainName)[0] ?? 'proyek';
        $cleanBase = preg_replace('/[^a-z0-9\-]/', '', $baseName);
        if (empty($cleanBase)) {
            $cleanBase = 'proyek-' . strtolower(\Illuminate\Support\Str::random(4));
        }
        $expectedEmail = "{$cleanBase}@bidtech.co.id";

        if (!$user) {
            if (User::where('email', $expectedEmail)->exists()) {
                $cleanOrder = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $this->order_number));
                $expectedEmail = "{$cleanBase}.{$cleanOrder}@bidtech.co.id";
            }

            $user = User::create([
                'order_id'       => $this->id,
                'name'           => $this->full_name,
                'email'          => $expectedEmail,
                'whatsapp'       => $this->whatsapp,
                'password'       => \Illuminate\Support\Facades\Hash::make('Password123!'),
                'domain_final'   => $this->domain_name,
                'domain_status'  => \App\Enums\DomainStatus::PendingRegistration,
                'website_status' => \App\Enums\WebsiteStatus::InProgress,
            ]);
        }

        return $user;
    }
}

