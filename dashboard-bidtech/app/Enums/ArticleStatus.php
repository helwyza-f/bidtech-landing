<?php

namespace App\Enums;

enum ArticleStatus: string
{
    case Draft = 'draft';
    case Terbit = 'terbit';
    case Nonaktif = 'nonaktif';

    public function label(): string
    {
        return match ($this) {
            self::Draft => 'Draf',
            self::Terbit => 'Terbit',
            self::Nonaktif => 'Nonaktif',
        };
    }
}
