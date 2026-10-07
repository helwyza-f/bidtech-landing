<?php

namespace App\Enums;

enum DiscountType: string
{
    case Percentage = 'PERCENTAGE';
    case Fixed = 'FIXED';
    case Nominal = 'NOMINAL';
}
