<?php

namespace App\Enums;

enum CommissionType: string
{
    case Percentage = 'PERCENTAGE';
    case Fixed = 'FIXED';
}
