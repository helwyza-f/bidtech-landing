<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PromoUsage extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'promo_id',
        'order_id',
        'email',
        'discount_amount',
        'partner_commission_earned',
        'created_at',
    ];

    protected function casts(): array
    {
        return [
            'discount_amount'           => 'integer',
            'partner_commission_earned' => 'integer',
            'created_at'                => 'datetime',
        ];
    }

    public function promo(): BelongsTo
    {
        return $this->belongsTo(Promo::class);
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
