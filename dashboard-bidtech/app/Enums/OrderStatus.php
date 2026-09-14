<?php

namespace App\Enums;

enum OrderStatus: string
{
    case Unpaid = 'unpaid';
    case Paid = 'paid';
    case Invalid = 'invalid';

    public function label(): string 
    {
        return match ($this) {
            self::Unpaid => 'Menunggu pembayaran',
            self::Paid => 'Lunas',
            self::Invalid => 'Kedaluwarsa',
        };
    }
}