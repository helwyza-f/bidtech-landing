<?php

namespace App\Enums;

enum Role: string
{
    case Admin = 'ADMIN';
    case Media = 'MEDIA';
    case Marketing = 'MARKETING';
    case Klien = 'KLIEN';
    case Mitra = 'MITRA';
}
