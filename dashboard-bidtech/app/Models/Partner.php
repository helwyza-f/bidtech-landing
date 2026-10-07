<?php

namespace App\Models;

use App\Enums\CommissionType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Partner extends Model
{
    protected $fillable = ['user_id', 'type_commission', 'amount_commission'];

    protected function casts(): array
    {
        return ['type_commission' => CommissionType::class, 'amount_commission' => 'integer'];
    }

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function coupons(): HasMany { return $this->hasMany(Coupon::class); }
}
