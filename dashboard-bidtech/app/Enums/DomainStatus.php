<?php

namespace App\Enums;

enum DomainStatus: string
{
    case PendingRegistration = 'pending_registration';
    case Registered = 'registered';

    public function label(): string
    {
        return match ($this) {
            self::PendingRegistration => 'Domain diproses',
            self::Registered => 'Domain aktif',
        };
    }
}