<?php

namespace Database\Seeders;

use App\Enums\OrderStatus;
use App\Enums\Role;
use App\Models\Order;
use App\Models\Template;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ==========================================
        // AKUN ADMIN (Dashboard Admin Bidtech)
        // ==========================================
        User::firstOrCreate(
            ['email' => 'admin@bidtech.co.id'],
            [
                'name'           => 'Administrator',
                'whatsapp'       => '08000000000',
                'password'       => Hash::make('adminBidtechOFFICIAL321!'),
                'role'           => Role::Admin,
            ]
        );
    }
}
