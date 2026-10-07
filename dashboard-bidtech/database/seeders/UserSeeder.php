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

        // ==========================================
        // AKUN USER TESTING (Client Portal)
        // ==========================================
        $template = Template::first();

        $order = Order::firstOrCreate(
            ['order_number' => 'ORD-2026-TEST01'],
            [
                'template_id'   => $template ? $template->id : 1,
                'domain_name'   => 'bisnissaya.com',
                'domain_price'  => 150000,
                'full_name'     => 'User Testing',
                'email'         => 'pelanggan@example.test',
                'whatsapp'      => '08123456789',
                'status'        => OrderStatus::Paid,
                'paid_at'       => now(),
            ]
        );

        $client = User::firstOrCreate(
            ['email' => 'test@bidtech.co.id'],
            [
                'name'           => 'User Testing',
                'whatsapp'       => '08123456789',
                'password'       => Hash::make('password123'),
                'role'           => Role::Klien,
            ]
        );
        $order->update(['client_id' => $client->id, 'domain_final' => 'bisnissaya.com', 'domain_status' => 'registered']);
    }
}
