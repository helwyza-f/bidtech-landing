<?php

namespace App\Enums;

enum WebsiteStatus: string
{
    case InProgress = 'in_progress';
    case Deployed = 'deployed';
    case Maintenance = 'maintenance';

    public function label(): string
    {
        return match ($this) {
            self::InProgress => 'Website dikerjakan',
            self::Deployed => 'Website live',
            self::Maintenance => 'Perbaikan sementara',
        };
    }
}