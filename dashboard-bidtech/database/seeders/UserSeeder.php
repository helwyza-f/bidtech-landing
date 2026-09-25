<?php

namespace Database\Seeders;

use App\Enums\DomainStatus;
use App\Enums\OrderStatus;
use App\Enums\WebsiteStatus;
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
            ['email' => 'admin@bidtech.com'],
            [
                'order_id'       => null,
                'name'           => 'Administrator',
                'whatsapp'       => '08000000000',
                'password'       => Hash::make('adminBidtechOFFICIAL321!'),
                'is_admin'       => true,
                'domain_status'  => DomainStatus::Registered,
                'domain_final'   => null,
                'website_status' => WebsiteStatus::InProgress,
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
                'email'         => 'test@bidtech.com',
                'whatsapp'      => '08123456789',
                'status'        => OrderStatus::Paid,
                'paid_at'       => now(),
            ]
        );

        User::firstOrCreate(
            ['email' => 'test@bidtech.com'],
            [
                'order_id'       => $order->id,
                'name'           => 'User Testing',
                'whatsapp'       => '08123456789',
                'password'       => Hash::make('password123'),
                'is_admin'       => false,
                'domain_status'  => DomainStatus::Registered,
                'domain_final'   => 'bisnissaya.com',
                'website_status' => WebsiteStatus::InProgress,
            ]
        );
    }
}
