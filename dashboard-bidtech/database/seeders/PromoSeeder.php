<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Promo;

class PromoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $promos = [
            // Promo Umum 1: Potongan Langsung Rp 200.000
            [
                'code'                     => 'BIDTECHHEMAT',
                'name'                     => 'Promo Diskon Bidtech Hemat',
                'description'              => 'Potongan langsung Rp 200.000 untuk semua pemesanan website.',
                'type'                     => 'fixed',
                'reward_amount'            => 200000,
                'max_discount'             => null,
                'min_order_amount'         => 2000000,
                'target_scope'             => 'total',
                'target_template_id'       => null,
                'is_partner'               => false,
                'partner_name'             => null,
                'partner_code'             => null,
                'partner_commission_type'  => 'none',
                'partner_commission_value' => 0,
                'usage_limit'              => 100,
                'usage_per_user'           => 1,
                'valid_from'               => now()->subDays(1),
                'valid_until'              => now()->addMonths(3),
                'is_active'                => true,
            ],

            // Promo Umum 2: Diskon Persentase 25% (Maksimal Rp 500.000)
            [
                'code'                     => 'SUPERDEAL',
                'name'                     => 'Super Deal Diskon 25%',
                'description'              => 'Diskon spesial 25% (maksimal potongan Rp 500.000) untuk seluruh template website.',
                'type'                     => 'percentage',
                'reward_amount'            => 25,
                'max_discount'             => 500000,
                'min_order_amount'         => 2000000,
                'target_scope'             => 'total',
                'target_template_id'       => null,
                'is_partner'               => false,
                'partner_name'             => null,
                'partner_code'             => null,
                'partner_commission_type'  => 'none',
                'partner_commission_value' => 0,
                'usage_limit'              => 50,
                'usage_per_user'           => 1,
                'valid_from'               => now()->subDays(1),
                'valid_until'              => now()->addMonths(2),
                'is_active'                => true,
            ],

            // Promo Khusus Komponen: Gratis Layanan Setup & Deployment (Rp 500.000)
            [
                'code'                     => 'FREESETUP',
                'name'                     => 'Gratis Biaya Setup & Deployment Cloud',
                'description'              => 'Bebas biaya setup dan instalasi sistem cloud sebesar Rp 500.000.',
                'type'                     => 'fixed',
                'reward_amount'            => 500000,
                'max_discount'             => null,
                'min_order_amount'         => 2000000,
                'target_scope'             => 'service', // Khusus memotong porsi komponen service
                'target_template_id'       => null,
                'is_partner'               => false,
                'partner_name'             => null,
                'partner_code'             => null,
                'partner_commission_type'  => 'none',
                'partner_commission_value' => 0,
                'usage_limit'              => 30,
                'usage_per_user'           => 1,
                'valid_from'               => now()->subDays(1),
                'valid_until'              => now()->addMonths(6),
                'is_active'                => true,
            ],

            // Promo Khusus Mitra 1: Komunitas Tech Batam
            [
                'code'                     => 'MITRABATAM',
                'name'                     => 'Kemitraan Komunitas Tech Batam',
                'description'              => 'Program kemitraan resmi Komunitas Developer & Startup Batam. Diskon Rp 300.000 untuk klien.',
                'type'                     => 'fixed',
                'reward_amount'            => 300000,
                'max_discount'             => null,
                'min_order_amount'         => 2000000,
                'target_scope'             => 'total',
                'target_template_id'       => null,
                'is_partner'               => true,
                'partner_name'             => 'Komunitas Tech Batam',
                'partner_code'             => 'PARTNER-BTM-01',
                'partner_commission_type'  => 'fixed',
                'partner_commission_value' => 100000, // Komisi mitra Rp 100.000 per order
                'usage_limit'              => 200,
                'usage_per_user'           => 1,
                'valid_from'               => now()->subDays(1),
                'valid_until'              => now()->addYear(),
                'is_active'                => true,
            ],

            // Promo Khusus Mitra 2: Agensi Partner Network
            [
                'code'                     => 'AGENSIPARTNER',
                'name'                     => 'Program Agensi Partner Bidtech',
                'description'              => 'Diskon kemitraan agensi digital sebesar Rp 500.000.',
                'type'                     => 'fixed',
                'reward_amount'            => 500000,
                'max_discount'             => null,
                'min_order_amount'         => 2000000,
                'target_scope'             => 'total',
                'target_template_id'       => null,
                'is_partner'               => true,
                'partner_name'             => 'Agensi Kreatif Nusantara',
                'partner_code'             => 'PARTNER-AGENCY-02',
                'partner_commission_type'  => 'fixed',
                'partner_commission_value' => 200000, // Komisi mitra Rp 200.000 per order
                'usage_limit'              => 100,
                'usage_per_user'           => 2,
                'valid_from'               => now()->subDays(1),
                'valid_until'              => now()->addYear(),
                'is_active'                => true,
            ],

            // Promo Khusus Mitra 3: Kampus / Akademik
            [
                'code'                     => 'KAMPUSMERDEKA',
                'name'                     => 'Kemitraan Akademik & Pendidikan',
                'description'              => 'Diskon 20% bagi civitas akademika dan mahasiswa mitra.',
                'type'                     => 'percentage',
                'reward_amount'            => 20,
                'max_discount'             => 400000,
                'min_order_amount'         => 2000000,
                'target_scope'             => 'total',
                'target_template_id'       => null,
                'is_partner'               => true,
                'partner_name'             => 'Aliansi Kampus Merdeka',
                'partner_code'             => 'PARTNER-EDU-03',
                'partner_commission_type'  => 'none',
                'partner_commission_value' => 0,
                'usage_limit'              => 150,
                'usage_per_user'           => 1,
                'valid_from'               => now()->subDays(1),
                'valid_until'              => now()->addMonths(8),
                'is_active'                => true,
            ],
        ];

        foreach ($promos as $promo) {
            Promo::updateOrCreate(
                ['code' => $promo['code']],
                $promo
            );
        }
    }
}
