<?php

namespace Database\Seeders;

use App\Enums\CommissionType;
use App\Enums\DiscountType;
use App\Enums\DomainStatus;
use App\Enums\OrderStatus;
use App\Enums\Role;
use App\Enums\WebsiteStatus;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\Partner;
use App\Models\Template;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use RuntimeException;

/**
 * Migrasi satu-kali data produksi dari database/bidtech_september_backup.sql (schema lama,
 * promos/promo_usages, users.is_admin dkk) ke schema terbaru (coupons, partners, role enum).
 * Tidak didaftarkan di DatabaseSeeder — jalankan manual sekali:
 *   php artisan db:seed --class=SeptemberSeeder
 */
class SeptemberSeeder extends Seeder
{
    public function run(): void
    {
        DB::transaction(function () {
            $this->assertTemplatesExist();

            $clients = $this->migrateClients();
            $coupons = $this->migratePartnersAndCoupons();
            $this->migrateOrders($clients, $coupons);

            $this->assertCouponUsageMatchesLegacy();
        });
    }

    /**
     * Pre-flight: semua template_id yang dipakai order lama harus sudah ada (dari TemplateSeeder).
     */
    private function assertTemplatesExist(): void
    {
        $required = [1, 4, 9, 10, 12, 16];
        $existing = Template::whereIn('id', $required)->pluck('id')->all();
        $missing = array_diff($required, $existing);

        if ($missing !== []) {
            throw new RuntimeException('SeptemberSeeder: template id hilang, jalankan TemplateSeeder dulu: ' . implode(',', $missing));
        }
    }

    /**
     * 7 user klien lama (dari 8 baris di dump; admin di-skip, sudah dibuat UserSeeder).
     * Hanya user yang old `users.order_id` menunjuk ke order itulah yang di-link lewat client_id
     * (bukan fuzzy-match via email — ada typo email antar order di data lama).
     *
     * @return array<int, array{user: User, domain_status: DomainStatus, domain_final: string, website_status: WebsiteStatus}> keyed by old order id
     */
    private function migrateClients(): array
    {
        $rows = [
            3 => ['Satria', 'mobilsatria@bidtech.co.id', '088270866376', DomainStatus::PendingRegistration, 'mobilsatria.com', WebsiteStatus::InProgress, '2026-09-22 18:17:30', '2026-09-22 18:17:30'],
            6 => ['Fitri', 'skincareachul@bidtech.co.id', '085752380453', DomainStatus::PendingRegistration, 'skincareachul.com', WebsiteStatus::InProgress, '2026-09-23 09:56:27', '2026-09-23 10:02:38'],
            8 => ['dwi gandhi herdian', 'nadimtrans@bidtech.co.id', '081276003870', DomainStatus::Registered, 'Nadimtrans.com', WebsiteStatus::Deployed, '2026-09-23 13:20:35', '2026-09-29 10:28:39'],
            10 => ['Reza', 'echaskincare@bidtech.co.id', '0895629508751', DomainStatus::Registered, 'echaskincare.com', WebsiteStatus::Deployed, '2026-09-24 09:16:11', '2026-09-24 09:27:04'],
            11 => ['Satria', 'ecamobil@bidtech.co.id', '082288132760', DomainStatus::PendingRegistration, 'ecamobil.co.id', WebsiteStatus::InProgress, '2026-09-24 09:44:04', '2026-09-24 09:44:04'],
            12 => ['Cyntia', 'tktunasbaru@bidtech.co.id', '088270866376', DomainStatus::PendingRegistration, 'tktunasbaru.com', WebsiteStatus::InProgress, '2026-09-24 13:45:38', '2026-09-24 13:45:38'],
            18 => ['Pratama', 'febri@bidtech.co.id', '089699375090', DomainStatus::PendingRegistration, 'febri.co.id', WebsiteStatus::InProgress, '2026-10-05 09:51:58', '2026-10-05 09:52:46'],
        ];

        $clients = [];
        foreach ($rows as $oldOrderId => [$name, $email, $whatsapp, $domainStatus, $domainFinal, $websiteStatus, $createdAt, $updatedAt]) {
            $user = User::updateOrCreate(
                ['email' => $email],
                [
                    'name' => $name,
                    'whatsapp' => $whatsapp,
                    'password' => Hash::make('password123'),
                    'role' => Role::Klien,
                ]
            );
            DB::table('users')->where('id', $user->id)->update(['created_at' => $createdAt, 'updated_at' => $updatedAt]);

            $clients[$oldOrderId] = [
                'user' => $user,
                'domain_status' => $domainStatus,
                'domain_final' => $domainFinal,
                'website_status' => $websiteStatus,
            ];
        }

        return $clients;
    }

    /**
     * promos id 1-6 sudah identik dengan CouponSeeder (skip). Sisa 8 baris adalah target migrasi;
     * 6 di antaranya is_partner=1 dan perlu users(role Mitra)+partners baru karena tabel partners
     * belum ada di schema lama. Semua 8 kupon migrasi di-set is_active=false (termasuk 2 kode
     * testing internal ACHULDENYSATRIA/FUJI) — arsip historis saja, admin aktifkan manual bila perlu.
     *
     * @return array<string, Coupon> keyed by code
     */
    private function migratePartnersAndCoupons(): array
    {
        $partnersData = [
            'OKTOSIAGIAN' => ['name' => 'Okto Siagian', 'email' => 'okto-siagian@bidtech.co.id', 'commission' => 700000],
            'FUJI' => ['name' => 'Fuji', 'email' => 'fuji@bidtech.co.id', 'commission' => 700000],
            'AMINGO' => ['name' => 'AMINGO', 'email' => 'amingo@bidtech.co.id', 'commission' => 630000],
            'AMANWEB' => ['name' => 'AMAN WEB', 'email' => 'aman-web@bidtech.co.id', 'commission' => 630000],
            'SAS1221' => ['name' => 'Nia Sari', 'email' => 'nia-sari@bidtech.co.id', 'commission' => 630000],
            'JUNA86' => ['name' => 'Arjuna', 'email' => 'arjuna@bidtech.co.id', 'commission' => 630000],
        ];

        $partners = [];
        foreach ($partnersData as $code => $data) {
            $user = User::updateOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'whatsapp' => '081100000000',
                    'password' => Hash::make('password123'),
                    'role' => Role::Mitra,
                ]
            );
            $partners[$code] = Partner::updateOrCreate(
                ['user_id' => $user->id],
                ['type_commission' => CommissionType::Fixed, 'amount_commission' => $data['commission']]
            );
        }

        // type lama: fixed->Nominal, percentage->Percentage, override_price->Fixed (lihat Coupon::discountFor()).
        // scope lama 'all'/'total' -> subtotal_* (satu-satunya scope yang dipakai 14 baris promos lama).
        $coupons = [
            ['code' => 'ACHULDENYSATRIA', 'name' => 'Kode Promo Rp.1000', 'type' => DiscountType::Fixed, 'amount' => 100, 'max' => null, 'usage_limit' => 10, 'user_usage_limit' => 10, 'valid_from' => '2026-09-22 17:27:00', 'valid_until' => '2026-10-10 17:27:00', 'partner_code' => null],
            ['code' => 'PENGUSAHAHEBAT', 'name' => 'Kode Promo Launching Bidtech 23 September 2026', 'type' => DiscountType::Percentage, 'amount' => 50, 'max' => 500000, 'usage_limit' => null, 'user_usage_limit' => 1, 'valid_from' => '2026-09-23 09:18:00', 'valid_until' => '2026-10-23 09:18:00', 'partner_code' => null],
            ['code' => 'OKTOSIAGIAN', 'name' => 'OKTOSIAGIAN', 'type' => DiscountType::Percentage, 'amount' => 10, 'max' => null, 'usage_limit' => 100, 'user_usage_limit' => 1, 'valid_from' => '2026-09-24 08:52:00', 'valid_until' => '2026-10-24 08:52:00', 'partner_code' => 'OKTOSIAGIAN'],
            ['code' => 'FUJI', 'name' => 'Kerjasama Bidtech x Fuji', 'type' => DiscountType::Fixed, 'amount' => 100, 'max' => null, 'usage_limit' => 100, 'user_usage_limit' => 10, 'valid_from' => '2026-09-24 09:37:00', 'valid_until' => '2026-10-24 09:37:00', 'partner_code' => 'FUJI'],
            ['code' => 'AMINGO', 'name' => 'Mitra Amingo', 'type' => DiscountType::Nominal, 'amount' => 175000, 'max' => null, 'usage_limit' => 1000, 'user_usage_limit' => 100, 'valid_from' => '2026-09-25 19:40:00', 'valid_until' => '2027-09-25 19:40:00', 'partner_code' => 'AMINGO'],
            ['code' => 'AMANWEB', 'name' => 'Mitra Aman Web', 'type' => DiscountType::Nominal, 'amount' => 175000, 'max' => null, 'usage_limit' => 1000, 'user_usage_limit' => 100, 'valid_from' => '2026-09-29 18:15:00', 'valid_until' => '2027-09-29 18:15:00', 'partner_code' => 'AMANWEB'],
            ['code' => 'SAS1221', 'name' => 'Mitra Nia Sari', 'type' => DiscountType::Nominal, 'amount' => 175000, 'max' => null, 'usage_limit' => 1000, 'user_usage_limit' => 100, 'valid_from' => '2026-09-30 00:00:00', 'valid_until' => '2027-09-30 23:59:00', 'partner_code' => 'SAS1221'],
            ['code' => 'JUNA86', 'name' => 'Mitra Arjuna', 'type' => DiscountType::Nominal, 'amount' => 175000, 'max' => null, 'usage_limit' => 1000, 'user_usage_limit' => 100, 'valid_from' => '2026-10-01 00:00:00', 'valid_until' => '2027-10-01 23:59:00', 'partner_code' => 'JUNA86'],
        ];

        $result = [];
        foreach ($coupons as $c) {
            $result[$c['code']] = Coupon::updateOrCreate(
                ['code' => $c['code']],
                [
                    'name' => $c['name'],
                    'subtotal_discount_type' => $c['type'],
                    'subtotal_discount_amount' => $c['amount'],
                    'subtotal_discount_max' => $c['max'],
                    'usage_limit' => $c['usage_limit'],
                    'user_usage_limit' => $c['user_usage_limit'],
                    'valid_from' => $c['valid_from'],
                    'valid_until' => $c['valid_until'],
                    'partner_id' => $c['partner_code'] !== null ? $partners[$c['partner_code']]->id : null,
                    'is_active' => false,
                ]
            );
        }

        return $result;
    }

    /**
     * 17 order lama disalin verbatim (snapshot harga/diskon/komisi tidak dihitung ulang dari
     * master data saat ini). commission_paid_out_at di-set NULL untuk semua (keputusan: belum
     * ada sumber data pencairan komisi di schema lama, admin update manual bila perlu).
     *
     * @param array<int, array{user: User, domain_status: DomainStatus, domain_final: string, website_status: WebsiteStatus}> $clients keyed by old order id
     * @param array<string, Coupon> $coupons keyed by code
     */
    private function migrateOrders(array $clients, array $coupons): void
    {
        $rows = [
            ['old_id' => 2, 'order_number' => 'ORD-20260922-OV1KM', 'template_id' => 9, 'domain_name' => 'chulla.id', 'domain_price' => 222000, 'domain_price_per_year' => 222000, 'template_price' => 1000000, 'server_price' => 500000, 'service_price' => 500000, 'template_desc' => 'Lisensi Desain UI/UX Eksklusif & Source Code Clean', 'server_desc' => 'Cloud Server Hosting 1 Tahun, NVMe High Speed & Free SSL', 'service_desc' => 'Setup Domain, Deployment Instan & Garansi Pemeliharaan', 'coupon_code' => 'ACHULDENYSATRIA', 'discount_amount' => 2221000, 'is_partner_order' => false, 'partner_name' => null, 'partner_commission_amount' => 0, 'full_name' => 'Nasrullah', 'email' => 'arulnasrullah2468@gmail.com', 'whatsapp' => '088270866376', 'xendit_invoice_id' => '6ab2584d940ba9c0d63f36f6', 'xendit_payment_url' => 'https://checkout-staging.xendit.co/web/6ab2584d940ba9c0d63f36f6', 'status' => OrderStatus::Invalid, 'payment_expires_at' => '2026-09-23 10:28:30', 'paid_at' => null, 'paid_email_sent_at' => null, 'created_at' => '2026-09-22 17:28:27', 'updated_at' => '2026-09-23 11:45:33'],
            ['old_id' => 3, 'order_number' => 'ORD-20260922-XDM1Z', 'template_id' => 1, 'domain_name' => 'mobilsatria.com', 'domain_price' => 238650, 'domain_price_per_year' => 238650, 'template_price' => 1000000, 'server_price' => 500000, 'service_price' => 500000, 'template_desc' => 'Lisensi Desain UI/UX Eksklusif & Source Code Clean', 'server_desc' => 'Cloud Server Hosting 1 Tahun, NVMe High Speed & Free SSL', 'service_desc' => 'Setup Domain, Deployment Instan & Garansi Pemeliharaan', 'coupon_code' => 'ACHULDENYSATRIA', 'discount_amount' => 2237650, 'is_partner_order' => false, 'partner_name' => null, 'partner_commission_amount' => 0, 'full_name' => 'Satria', 'email' => 'int.dev.bidtect@gmail.com', 'whatsapp' => '088270866376', 'xendit_invoice_id' => '6ab2637def4cbcfcd2937781', 'xendit_payment_url' => 'https://checkout.xendit.co/web/6ab2637def4cbcfcd2937781', 'status' => OrderStatus::Paid, 'payment_expires_at' => '2026-09-23 11:16:13', 'paid_at' => '2026-09-22 18:17:29', 'paid_email_sent_at' => null, 'created_at' => '2026-09-22 18:16:13', 'updated_at' => '2026-09-22 18:17:29'],
            ['old_id' => 4, 'order_number' => 'ORD-20260923-HMZ0J', 'template_id' => 9, 'domain_name' => 'amaliaslimcare.com', 'domain_price' => 238650, 'domain_price_per_year' => 238650, 'template_price' => 1000000, 'server_price' => 500000, 'service_price' => 500000, 'template_desc' => 'Lisensi Desain UI/UX Eksklusif & Source Code Clean', 'server_desc' => 'Cloud Server Hosting 1 Tahun, NVMe High Speed & Free SSL', 'service_desc' => 'Setup Domain, Deployment Instan & Garansi Pemeliharaan', 'coupon_code' => null, 'discount_amount' => 0, 'is_partner_order' => false, 'partner_name' => null, 'partner_commission_amount' => 0, 'full_name' => 'Bob Nainggolan', 'email' => 'bobyriannainggolan@gmail.com', 'whatsapp' => '081248118613', 'xendit_invoice_id' => '6ab2b73f05ccd978d7f9c970', 'xendit_payment_url' => 'https://checkout.xendit.co/web/6ab2b73f05ccd978d7f9c970', 'status' => OrderStatus::Invalid, 'payment_expires_at' => '2026-09-23 17:13:35', 'paid_at' => null, 'paid_email_sent_at' => null, 'created_at' => '2026-09-23 00:13:33', 'updated_at' => '2026-09-24 00:14:24'],
            ['old_id' => 5, 'order_number' => 'ORD-20260923-HYYBP', 'template_id' => 1, 'domain_name' => 'kaskskaksaks.com', 'domain_price' => 238650, 'domain_price_per_year' => 238650, 'template_price' => 1000000, 'server_price' => 500000, 'service_price' => 500000, 'template_desc' => 'Lisensi Desain UI/UX Eksklusif & Source Code Clean', 'server_desc' => 'Cloud Server Hosting 1 Tahun, NVMe High Speed & Free SSL', 'service_desc' => 'Setup Domain, Deployment Instan & Garansi Pemeliharaan', 'coupon_code' => null, 'discount_amount' => 0, 'is_partner_order' => false, 'partner_name' => null, 'partner_commission_amount' => 0, 'full_name' => 'DSADASDAD', 'email' => 'anjo24696@gmail.com', 'whatsapp' => '087742124885', 'xendit_invoice_id' => '6ab331979997c412b0e2b593', 'xendit_payment_url' => 'https://checkout.xendit.co/web/6ab331979997c412b0e2b593', 'status' => OrderStatus::Invalid, 'payment_expires_at' => '2026-09-24 01:55:35', 'paid_at' => null, 'paid_email_sent_at' => null, 'created_at' => '2026-09-23 08:55:33', 'updated_at' => '2026-09-24 08:56:25'],
            ['old_id' => 6, 'order_number' => 'ORD-20260923-0IEKR', 'template_id' => 9, 'domain_name' => 'skincareachul.com', 'domain_price' => 238650, 'domain_price_per_year' => 238650, 'template_price' => 1000000, 'server_price' => 500000, 'service_price' => 500000, 'template_desc' => 'Lisensi Desain UI/UX Eksklusif & Source Code Clean', 'server_desc' => 'Cloud Server Hosting 1 Tahun, NVMe High Speed & Free SSL', 'service_desc' => 'Setup Domain, Deployment Instan & Garansi Pemeliharaan', 'coupon_code' => 'ACHULDENYSATRIA', 'discount_amount' => 2237650, 'is_partner_order' => false, 'partner_name' => null, 'partner_commission_amount' => 0, 'full_name' => 'Fitri', 'email' => 'fitrianahelen85@gmail.com', 'whatsapp' => '085752380453', 'xendit_invoice_id' => '6ab33ef20e3f9d0dcb0df267', 'xendit_payment_url' => 'https://checkout.xendit.co/web/6ab33ef20e3f9d0dcb0df267', 'status' => OrderStatus::Paid, 'payment_expires_at' => '2026-09-24 02:52:34', 'paid_at' => '2026-09-23 09:56:26', 'paid_email_sent_at' => null, 'created_at' => '2026-09-23 09:52:34', 'updated_at' => '2026-09-23 09:56:26'],
            ['old_id' => 7, 'order_number' => 'ORD-20260923-X8NGU', 'template_id' => 10, 'domain_name' => 'kelaspintar.online', 'domain_price' => 25000, 'domain_price_per_year' => 25000, 'template_price' => 800000, 'server_price' => 700000, 'service_price' => 250000, 'template_desc' => 'Lisensi Desain UI/UX Eksklusif & Source Code Clean', 'server_desc' => 'Cloud Server Hosting 1 Tahun, NVMe High Speed & Free SSL', 'service_desc' => 'Setup Domain, Deployment Instan & Garansi Pemeliharaan', 'coupon_code' => 'PENGUSAHAHEBAT', 'discount_amount' => 500000, 'is_partner_order' => false, 'partner_name' => null, 'partner_commission_amount' => 0, 'full_name' => 'sukma', 'email' => 'sukmaanggraini1818@gmail.com', 'whatsapp' => '082288132760', 'xendit_invoice_id' => '6ab35d967561e225893162ce', 'xendit_payment_url' => 'https://checkout.xendit.co/web/6ab35d967561e225893162ce', 'status' => OrderStatus::Invalid, 'payment_expires_at' => '2026-09-24 05:03:18', 'paid_at' => null, 'paid_email_sent_at' => null, 'created_at' => '2026-09-23 12:03:18', 'updated_at' => '2026-09-24 12:04:20'],
            ['old_id' => 8, 'order_number' => 'ORD-20260923-ZLBWZ', 'template_id' => 1, 'domain_name' => 'Nadimtrans.com', 'domain_price' => 238650, 'domain_price_per_year' => 238650, 'template_price' => 800000, 'server_price' => 700000, 'service_price' => 250000, 'template_desc' => 'Lisensi Desain UI/UX Eksklusif & Source Code Clean', 'server_desc' => 'Cloud Server Hosting 1 Tahun, NVMe High Speed & Free SSL', 'service_desc' => 'Setup Domain, Deployment Instan & Garansi Pemeliharaan', 'coupon_code' => null, 'discount_amount' => 0, 'is_partner_order' => false, 'partner_name' => null, 'partner_commission_amount' => 0, 'full_name' => 'dwi gandhi herdian', 'email' => 'dwigandhi01@gmail.com', 'whatsapp' => '081276003870', 'xendit_invoice_id' => '6ab36f82ec6f60a54034a9e4', 'xendit_payment_url' => 'https://checkout.xendit.co/web/6ab36f82ec6f60a54034a9e4', 'status' => OrderStatus::Paid, 'payment_expires_at' => '2026-09-24 06:19:46', 'paid_at' => '2026-09-23 13:20:35', 'paid_email_sent_at' => '2026-09-23 19:52:10', 'created_at' => '2026-09-23 13:19:46', 'updated_at' => '2026-09-23 19:52:10'],
            ['old_id' => 9, 'order_number' => 'ORD-20260924-O7SUO', 'template_id' => 1, 'domain_name' => 'mobilsatria.com', 'domain_price' => 238650, 'domain_price_per_year' => 238650, 'template_price' => 800000, 'server_price' => 700000, 'service_price' => 250000, 'template_desc' => 'Lisensi Desain UI/UX Eksklusif & Source Code Clean', 'server_desc' => 'Cloud Server Hosting 1 Tahun, NVMe High Speed & Free SSL', 'service_desc' => 'Setup Domain, Deployment Instan & Garansi Pemeliharaan', 'coupon_code' => 'OKTOSIAGIAN', 'discount_amount' => 175000, 'is_partner_order' => true, 'partner_name' => 'Okto Siagian', 'partner_commission_amount' => 700000, 'full_name' => 'Satria', 'email' => 'int.dev.bidtech@gmail.com', 'whatsapp' => '082288132760', 'xendit_invoice_id' => '6ab48328c9c61c312e4f504c', 'xendit_payment_url' => 'https://checkout.xendit.co/web/6ab48328c9c61c312e4f504c', 'status' => OrderStatus::Invalid, 'payment_expires_at' => '2026-09-25 01:55:52', 'paid_at' => null, 'paid_email_sent_at' => null, 'created_at' => '2026-09-24 08:55:52', 'updated_at' => '2026-09-25 08:56:24'],
            ['old_id' => 10, 'order_number' => 'ORD-20260924-XKZLG', 'template_id' => 9, 'domain_name' => 'echaskincare.com', 'domain_price' => 238650, 'domain_price_per_year' => 238650, 'template_price' => 1000000, 'server_price' => 500000, 'service_price' => 500000, 'template_desc' => 'Lisensi Desain UI/UX Eksklusif & Source Code Clean', 'server_desc' => 'Cloud Server Hosting 1 Tahun, NVMe High Speed & Free SSL', 'service_desc' => 'Setup Domain, Deployment Instan & Garansi Pemeliharaan', 'coupon_code' => 'ACHULDENYSATRIA', 'discount_amount' => 2238550, 'is_partner_order' => false, 'partner_name' => null, 'partner_commission_amount' => 0, 'full_name' => 'Reza', 'email' => 'rezasulistya06@gmail.com', 'whatsapp' => '0895629508751', 'xendit_invoice_id' => '6ab487869a4ffad88245801d', 'xendit_payment_url' => 'https://checkout.xendit.co/web/6ab487869a4ffad88245801d', 'status' => OrderStatus::Paid, 'payment_expires_at' => '2026-09-25 02:14:30', 'paid_at' => '2026-09-24 09:16:11', 'paid_email_sent_at' => '2026-09-24 09:16:13', 'created_at' => '2026-09-24 09:14:30', 'updated_at' => '2026-09-24 09:16:13'],
            ['old_id' => 11, 'order_number' => 'ORD-20260924-SNC2U', 'template_id' => 1, 'domain_name' => 'ecamobil.co.id', 'domain_price' => 310800, 'domain_price_per_year' => 310800, 'template_price' => 800000, 'server_price' => 700000, 'service_price' => 250000, 'template_desc' => 'Lisensi Desain UI/UX Eksklusif & Source Code Clean', 'server_desc' => 'Cloud Server Hosting 1 Tahun, NVMe High Speed & Free SSL', 'service_desc' => 'Setup Domain, Deployment Instan & Garansi Pemeliharaan', 'coupon_code' => 'FUJI', 'discount_amount' => 2060700, 'is_partner_order' => true, 'partner_name' => 'Fuji', 'partner_commission_amount' => 700000, 'full_name' => 'Satria', 'email' => 'int.dev.bidtech@gmail.com', 'whatsapp' => '082288132760', 'xendit_invoice_id' => '6ab48e5ac9c61c312e50023e', 'xendit_payment_url' => 'https://checkout.xendit.co/web/6ab48e5ac9c61c312e50023e', 'status' => OrderStatus::Paid, 'payment_expires_at' => '2026-09-25 02:43:38', 'paid_at' => '2026-09-24 09:44:04', 'paid_email_sent_at' => '2026-09-24 09:44:07', 'created_at' => '2026-09-24 09:43:37', 'updated_at' => '2026-09-24 09:44:07'],
            ['old_id' => 12, 'order_number' => 'ORD-20260924-WAD3C', 'template_id' => 10, 'domain_name' => 'tktunasbaru.com', 'domain_price' => 238650, 'domain_price_per_year' => 238650, 'template_price' => 1000000, 'server_price' => 500000, 'service_price' => 500000, 'template_desc' => 'Lisensi Desain UI/UX Eksklusif & Source Code Clean', 'server_desc' => 'Cloud Server Hosting 1 Tahun, NVMe High Speed & Free SSL', 'service_desc' => 'Setup Domain, Deployment Instan & Garansi Pemeliharaan', 'coupon_code' => 'ACHULDENYSATRIA', 'discount_amount' => 2238550, 'is_partner_order' => false, 'partner_name' => null, 'partner_commission_amount' => 0, 'full_name' => 'Cyntia', 'email' => 'cyntia@gmail.com', 'whatsapp' => '088270866376', 'xendit_invoice_id' => '6ab4c6a68cc91c1d6f0c0f78', 'xendit_payment_url' => 'https://checkout.xendit.co/web/6ab4c6a68cc91c1d6f0c0f78', 'status' => OrderStatus::Paid, 'payment_expires_at' => '2026-09-25 06:43:50', 'paid_at' => '2026-09-24 13:45:39', 'paid_email_sent_at' => '2026-09-24 13:45:42', 'created_at' => '2026-09-24 13:43:49', 'updated_at' => '2026-09-24 13:45:42'],
            ['old_id' => 13, 'order_number' => 'ORD-20260925-NJZWS', 'template_id' => 1, 'domain_name' => 'aminrent.com', 'domain_price' => 238650, 'domain_price_per_year' => 238650, 'template_price' => 800000, 'server_price' => 700000, 'service_price' => 250000, 'template_desc' => 'Lisensi dan Hak Guna Template Website, serta kode sumbernya.', 'server_desc' => 'Menggunakan Server Bidtech x Hostinger, yang ditenagai AMD EPYC dan NVMe SSD storage.', 'service_desc' => 'Layanan Tim Bisnis Bidtech yang tanggap dengan kecepatan respon < 10 menit, dan kecepatan pengerjaan website 7-14 hari kerja.', 'coupon_code' => null, 'discount_amount' => 0, 'is_partner_order' => false, 'partner_name' => null, 'partner_commission_amount' => 0, 'full_name' => 'MUHAMMAD AMIN', 'email' => '201055201024@uis.ac.id', 'whatsapp' => '0895410605903', 'xendit_invoice_id' => '6ab65a4835ef9706ea2f6200', 'xendit_payment_url' => 'https://checkout.xendit.co/web/6ab65a4835ef9706ea2f6200', 'status' => OrderStatus::Invalid, 'payment_expires_at' => '2026-09-26 11:26:01', 'paid_at' => null, 'paid_email_sent_at' => null, 'created_at' => '2026-09-25 18:25:58', 'updated_at' => '2026-09-26 18:26:24'],
            ['old_id' => 14, 'order_number' => 'ORD-20260930-JSQNZ', 'template_id' => 1, 'domain_name' => 'namabisnismu.com', 'domain_price' => 238650, 'domain_price_per_year' => 238650, 'template_price' => 800000, 'server_price' => 700000, 'service_price' => 250000, 'template_desc' => 'Lisensi dan Hak Guna Template Website, serta kode sumbernya.', 'server_desc' => 'Menggunakan Server Bidtech, yang ditenagai AMD EPYC dan NVMe SSD storage.', 'service_desc' => 'Layanan Tim Bisnis Bidtech yang tanggap dengan kecepatan respon < 10 menit, dan kecepatan pengerjaan website 7-14 hari kerja.', 'coupon_code' => 'SAS1221', 'discount_amount' => 175000, 'is_partner_order' => true, 'partner_name' => 'Nia Sari', 'partner_commission_amount' => 630000, 'full_name' => 'Budi', 'email' => 'budi@gmail.com', 'whatsapp' => '081519434964', 'xendit_invoice_id' => '6abce30512c9a47bb8784b96', 'xendit_payment_url' => 'https://checkout.xendit.co/web/6abce30512c9a47bb8784b96', 'status' => OrderStatus::Invalid, 'payment_expires_at' => '2026-10-01 10:23:02', 'paid_at' => null, 'paid_email_sent_at' => null, 'created_at' => '2026-09-30 17:23:01', 'updated_at' => '2026-10-01 17:23:25'],
            ['old_id' => 15, 'order_number' => 'ORD-20260930-J96U4', 'template_id' => 1, 'domain_name' => 'namabisnismu.com', 'domain_price' => 238650, 'domain_price_per_year' => 238650, 'template_price' => 800000, 'server_price' => 700000, 'service_price' => 250000, 'template_desc' => 'Lisensi dan Hak Guna Template Website, serta kode sumbernya.', 'server_desc' => 'Menggunakan Server Bidtech, yang ditenagai AMD EPYC dan NVMe SSD storage.', 'service_desc' => 'Layanan Tim Bisnis Bidtech yang tanggap dengan kecepatan respon < 10 menit, dan kecepatan pengerjaan website 7-14 hari kerja.', 'coupon_code' => 'SAS1221', 'discount_amount' => 175000, 'is_partner_order' => true, 'partner_name' => 'Nia Sari', 'partner_commission_amount' => 630000, 'full_name' => 'Budi', 'email' => 'budi@gmail.com', 'whatsapp' => '081519434964', 'xendit_invoice_id' => '6abce308ab52cb7171a15e19', 'xendit_payment_url' => 'https://checkout.xendit.co/web/6abce308ab52cb7171a15e19', 'status' => OrderStatus::Invalid, 'payment_expires_at' => '2026-10-01 10:23:04', 'paid_at' => null, 'paid_email_sent_at' => null, 'created_at' => '2026-09-30 17:23:04', 'updated_at' => '2026-10-01 17:23:25'],
            ['old_id' => 16, 'order_number' => 'ORD-20261001-DKTRN', 'template_id' => 4, 'domain_name' => 'hafisjones.com', 'domain_price' => 238650, 'domain_price_per_year' => 238650, 'template_price' => 800000, 'server_price' => 700000, 'service_price' => 250000, 'template_desc' => 'Lisensi dan Hak Guna Template Website, serta kode sumbernya.', 'server_desc' => 'Menggunakan Server Bidtech, yang ditenagai AMD EPYC dan NVMe SSD storage.', 'service_desc' => 'Layanan Tim Bisnis Bidtech yang tanggap dengan kecepatan respon < 10 menit, dan kecepatan pengerjaan website 7-14 hari kerja.', 'coupon_code' => null, 'discount_amount' => 0, 'is_partner_order' => false, 'partner_name' => null, 'partner_commission_amount' => 0, 'full_name' => 'Hafiz Arsyi', 'email' => 'hafisarsyi3@gmail.com', 'whatsapp' => '081274173920', 'xendit_invoice_id' => '6abe051f8903ae8f6ad15c82', 'xendit_payment_url' => 'https://checkout.xendit.co/web/6abe051f8903ae8f6ad15c82', 'status' => OrderStatus::Invalid, 'payment_expires_at' => '2026-10-02 07:00:47', 'paid_at' => null, 'paid_email_sent_at' => null, 'created_at' => '2026-10-01 14:00:45', 'updated_at' => '2026-10-02 14:01:20'],
            ['old_id' => 17, 'order_number' => 'ORD-20261002-YXSYS', 'template_id' => 16, 'domain_name' => 'semestapro.co.id', 'domain_price' => 310800, 'domain_price_per_year' => 310800, 'template_price' => 800000, 'server_price' => 700000, 'service_price' => 250000, 'template_desc' => 'Lisensi dan Hak Guna Template Website, serta kode sumbernya.', 'server_desc' => 'Menggunakan Server Bidtech, yang ditenagai AMD EPYC dan NVMe SSD storage.', 'service_desc' => 'Layanan Tim Bisnis Bidtech yang tanggap dengan kecepatan respon < 10 menit, dan kecepatan pengerjaan website 7-14 hari kerja.', 'coupon_code' => null, 'discount_amount' => 0, 'is_partner_order' => false, 'partner_name' => null, 'partner_commission_amount' => 0, 'full_name' => 'Budi', 'email' => 'fitrianahelen85@gmail.com', 'whatsapp' => '085752380453', 'xendit_invoice_id' => '6abf6920d1fa13f8864f2c27', 'xendit_payment_url' => 'https://checkout.xendit.co/web/6abf6920d1fa13f8864f2c27', 'status' => OrderStatus::Invalid, 'payment_expires_at' => '2026-10-03 08:19:44', 'paid_at' => null, 'paid_email_sent_at' => null, 'created_at' => '2026-10-02 15:19:44', 'updated_at' => '2026-10-03 15:20:24'],
            ['old_id' => 18, 'order_number' => 'ORD-20261005-PEQGM', 'template_id' => 12, 'domain_name' => 'febri.co.id', 'domain_price' => 310800, 'domain_price_per_year' => 310800, 'template_price' => 800000, 'server_price' => 700000, 'service_price' => 250000, 'template_desc' => 'Lisensi dan Hak Guna Template Website, serta kode sumbernya.', 'server_desc' => 'Menggunakan Server Bidtech, yang ditenagai AMD EPYC dan NVMe SSD storage.', 'service_desc' => 'Layanan Tim Bisnis Bidtech yang tanggap dengan kecepatan respon < 10 menit, dan kecepatan pengerjaan website 7-14 hari kerja.', 'coupon_code' => 'ACHULDENYSATRIA', 'discount_amount' => 2060700, 'is_partner_order' => false, 'partner_name' => null, 'partner_commission_amount' => 0, 'full_name' => 'Pratama', 'email' => 'ryofebri123@gmail.com', 'whatsapp' => '089699375090', 'xendit_invoice_id' => '6ac310644f73971a01d35376', 'xendit_payment_url' => 'https://checkout.xendit.co/web/6ac310644f73971a01d35376', 'status' => OrderStatus::Paid, 'payment_expires_at' => '2026-10-06 02:50:13', 'paid_at' => '2026-10-05 09:51:57', 'paid_email_sent_at' => '2026-10-05 09:52:00', 'created_at' => '2026-10-05 09:50:12', 'updated_at' => '2026-10-05 09:52:00'],
        ];

        foreach ($rows as $row) {
            $client = $clients[$row['old_id']] ?? null;
            $coupon = $row['coupon_code'] !== null ? ($coupons[$row['coupon_code']] ?? null) : null;

            $order = Order::updateOrCreate(
                ['order_number' => $row['order_number']],
                [
                    'template_id' => $row['template_id'],
                    'client_id' => $client !== null ? $client['user']->id : null,
                    'domain_name' => $row['domain_name'],
                    'domain_price' => $row['domain_price'],
                    'domain_duration' => 1,
                    'domain_price_per_year' => $row['domain_price_per_year'],
                    'template_price' => $row['template_price'],
                    'server_price' => $row['server_price'],
                    'service_price' => $row['service_price'],
                    'template_desc' => $row['template_desc'],
                    'server_desc' => $row['server_desc'],
                    'service_desc' => $row['service_desc'],
                    'coupon_id' => $coupon?->id,
                    'coupon_code' => $row['coupon_code'],
                    'discount_amount' => $row['discount_amount'],
                    'is_partner_order' => $row['is_partner_order'],
                    'partner_name' => $row['partner_name'],
                    'partner_commission_amount' => $row['partner_commission_amount'],
                    'commission_paid_out_at' => null,
                    'domain_status' => $client['domain_status'] ?? DomainStatus::PendingRegistration,
                    'domain_final' => $client['domain_final'] ?? null,
                    'website_status' => $client['website_status'] ?? WebsiteStatus::InProgress,
                    'full_name' => $row['full_name'],
                    'email' => $row['email'],
                    'whatsapp' => $row['whatsapp'],
                    'xendit_invoice_id' => $row['xendit_invoice_id'],
                    'xendit_payment_url' => $row['xendit_payment_url'],
                    'status' => $row['status'],
                    'payment_expires_at' => $row['payment_expires_at'],
                    'paid_at' => $row['paid_at'],
                    'paid_email_sent_at' => $row['paid_email_sent_at'],
                ]
            );

            DB::table('orders')->where('id', $order->id)->update([
                'created_at' => $row['created_at'],
                'updated_at' => $row['updated_at'],
            ]);
        }
    }

    /**
     * Validasi: usage per kupon hasil migrasi harus cocok dengan promos.used_count di dump lama
     * (promo_usages tidak dimigrasi — usage diturunkan dari orders.coupon_code, lihat docs/SCHEMA.md).
     */
    private function assertCouponUsageMatchesLegacy(): void
    {
        $expected = [
            'ACHULDENYSATRIA' => 6,
            'PENGUSAHAHEBAT' => 1,
            'OKTOSIAGIAN' => 1,
            'FUJI' => 1,
            'AMINGO' => 0,
            'AMANWEB' => 0,
            'SAS1221' => 2,
            'JUNA86' => 0,
        ];

        foreach ($expected as $code => $count) {
            $actual = DB::table('orders')->where('coupon_code', $code)->count();
            if ($actual !== $count) {
                throw new RuntimeException("SeptemberSeeder: usage kupon {$code} tidak cocok (dump={$count}, hasil migrasi={$actual})");
            }
        }
    }
}
