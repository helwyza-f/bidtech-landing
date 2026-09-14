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
        'full_name',
        'email',
        'whatsapp',
        'xendit_invoice_id',
        'xendit_payment_url',
        'status',
        'payment_expires_at',
        'paid_at',
    ];

    protected function casts(): array
    {
        return [
            'domain_price'          => 'integer',
            'status'                => OrderStatus::class,
            'payment_expires_at'    => 'datetime',
            'paid_at'               => 'datetime',
        ];
    }

    public function template(): BelongsTo
    {
        return $this->belongsTo(Template::class);
    }

    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

    public function isPaid(): bool
    {
        return $this->status === OrderStatus::Paid;
    }
}
