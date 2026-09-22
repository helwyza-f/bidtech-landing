# 🎟️ Dokumentasi Resmi Sistem Kode Promo & Diskon Kemitraan Bidtech

Dokumentasi ini menjelaskan secara komprehensif arsitektur, daftar voucher aktif, mekanisme validasi, pencatatan komisi mitra, serta panduan teknis integrasi sistem **Kode Promo & Diskon Kemitraan** pada platform Bidtech.

---

## 📑 Daftar Isi
1. [Arsitektur & Konsep Dasar](#1-arsitektur--konsep-dasar)
2. [Daftar Kode Promo Aktif (Siap Uji)](#2-daftar-kode-promo-aktif-siap-uji)
3. [Tipe Diskon & Ruang Lingkup (Scope)](#3-tipe-diskon--ruang-lingkup-scope)
4. [Sistem Kemitraan & Pelacakan Komisi Mitra](#4-sistem-kemitraan--pelacakan-komisi-mitra)
5. [Struktur Basis Data (Database Schema)](#5-struktur-basis-data-database-schema)
6. [Alur Validasi Promo (PromoService)](#6-alur-validasi-promo-promoservice)
7. [Spesifikasi Endpoint API Promo](#7-spesifikasi-endpoint-api-promo)
8. [Panduan Menambahkan Kode Promo Baru](#8-panduan-menambahkan-kode-promo-baru)
9. [Tampilan Promo pada Alur Transaksi & Invoice](#9-tampilan-promo-pada-alur-transaksi--invoice)

---

## 1. Arsitektur & Konsep Dasar

Sistem promo Bidtech dirancang fleksibel untuk mendukung strategi pemasaran digital, diskon umum, program musiman, serta **program kemitraan / afiliasi (B2B, agensi, kampus, komunitas)**.

```
┌─────────────────────────────────────────────────────────────┐
│                 Input Kode Promo di Checkout                │
│             URL: /checkout/{template}/ringkasan             │
│            • AJAX Real-Time (Tanpa Reload Halaman)          │
└──────────────────────────────┬──────────────────────────────┘
                               │ POST /checkout/{id}/promo/apply
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      PromoService.php                       │
│  1. Cek Keaktifan (is_active)                               │
│  2. Cek Masa Berlaku (valid_from & valid_until)             │
│  3. Cek Kuota Penggunaan Global & Per-User                  │
│  4. Cek Minimum Transaksi (min_order_amount)                 │
│  5. Hitung Diskon Berdasarkan Scope (total/template/service)│
│  6. Kalkulasi Komisi Mitra (partner_commission_value)       │
└──────────────────────────────┬──────────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
┌─────────────────────────────┐ ┌─────────────────────────────┐
│      Promo Umum Publik      │ │   Promo Khusus Kemitraan    │
│  • Diskon Nominal Tetap     │ │  • Diskon Klien             │
│  • Diskon Persentase + Cap  │ │  • Badge Mitra Resmi        │
│  • Bebas Biaya Layanan      │ │  • Komisi Mitra Masuk Audit │
└─────────────────────────────┘ └─────────────────────────────┘
```

---

## 2. Daftar Kode Promo Aktif (Siap Uji)

Berikut adalah daftar kode voucher yang telah terdaftar di database (seeder) dan dapat langsung digunakan di halaman checkout:

| Kode Promo | Kategori | Jenis Diskon | Nilai Potongan | Mitra / Afiliasi | Komisi Mitra |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`BIDTECHHEMAT`** | Promo Umum | Nominal Tetap (`fixed`) | **Rp 200.000** | - | - |
| **`SUPERDEAL`** | Promo Umum | Persentase (`percentage`) | **25%** *(Maks Rp 500.000)* | - | - |
| **`FREESETUP`** | Khusus Komponen | Scope Layanan (`service`) | **Rp 500.000** *(Bebas Setup)* | - | - |
| **`MITRABATAM`** | Kemitraan Resmi | Khusus Mitra (`fixed`) | **Rp 300.000** | Komunitas Tech Batam | Rp 100.000 / order |
| **`AGENSIPARTNER`** | Kemitraan Resmi | Khusus Mitra (`fixed`) | **Rp 500.000** | Agensi Kreatif Nusantara | Rp 200.000 / order |
| **`KAMPUSMERDEKA`** | Akademik | Khusus Mitra (`percentage`) | **20%** *(Maks Rp 400.000)* | Aliansi Kampus Merdeka | - |

---

## 3. Tipe Diskon & Ruang Lingkup (Scope)

### A. Tipe Diskon (`type`)
1. **`fixed` (Nominal Tetap)**:
   - Memotong langsung sebesar nilai `reward_amount`.
   - Contoh: `BIDTECHHEMAT` memotong Rp 200.000 secara flat.
2. **`percentage` (Persentase)**:
   - Memotong berdasarkan persentase `reward_amount` (0-100%).
   - Mendukung pembatasan batas atas diskon (`max_discount`).
   - Contoh: `SUPERDEAL` (25%), jika paket Rp 2.000.000 -> 25% = Rp 500.000 (tidak melebihi max cap Rp 500.000).

### B. Ruang Lingkup Diskon (`target_scope`)
Sistem terintegrasi dengan arsitektur pemecahan harga 3 komponen:
- **`total`**: Memotong total subtotal paket keseluruhan.
- **`template`**: Khusus memotong porsi *Harga Lisensi Template* (Rp 1.000.000).
- **`server`**: Khusus memotong porsi *Harga Cloud Server Hosting* (Rp 500.000).
- **`service`**: Khusus memotong porsi *Harga Layanan Setup & Deployment* (Rp 500.000).
  - Contoh: `FREESETUP` menyasar `target_scope: 'service'`, sehingga biaya layanan setup Rp 500.000 menjadi **Rp 0** (Gratis).

---

## 4. Sistem Kemitraan & Pelacakan Komisi Mitra

Bila atribut `is_partner: true`:
1. **Branding Mitra di Checkout**:
   - Halaman checkout memunculkan kartu badge hijau kemitraan:
     `🤝 Program Kemitraan Resmi: {partner_name} • Diskon kemitraan berhasil diterapkan!`
2. **Pencatatan Komisi Otomatis**:
   - Sistem mencatat nilai hak komisi mitra (`partner_commission_value`) ke dalam pesanan (`partner_commission_amount`) dan tabel audit `promo_usages`.
   - Memudahkan rekap bagi hasil / *payout* bulanan ke mitra atau agensi rekanan.
3. **Pencatatan di Dokumen Resmi**:
   - Nama mitra dan nomor voucher tercetak pada invoice PDF resmi dan rincian pesan WhatsApp konfirmasi pembayaran.

---

## 5. Struktur Basis Data (Database Schema)

### A. Tabel `promos` (Master Voucher)
Menyimpan konfigurasi seluruh kode promo:

| Kolom | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | `bigint unsigned` | Primary Key |
| `code` | `varchar(50)` | Kode promo unik (huruf kapital, contoh: `MITRABATAM`) |
| `name` | `varchar(150)` | Nama/judul promosi |
| `description` | `text` | Deskripsi syarat dan ketentuan promo |
| `type` | `enum('fixed','percentage')` | Tipe potongan harga |
| `reward_amount` | `decimal(12,2)` | Nilai potongan (Rupiah jika fixed, % jika percentage) |
| `max_discount` | `decimal(12,2)` | Maksimal plafon diskon (khusus persentase) |
| `min_order_amount`| `decimal(12,2)` | Nilai minimum subtotal transaksi yang diperbolehkan |
| `target_scope` | `enum('total','template','server','service')` | Komponen harga yang dipotong |
| `target_template_id`| `bigint unsigned` | ID template tertentu jika promo eksklusif untuk 1 template |
| `is_partner` | `boolean` | `true` jika merupakan kode voucher kemitraan |
| `partner_name` | `varchar(150)` | Nama organisasi/mitra rekanan |
| `partner_code` | `varchar(50)` | Kode identitas mitra |
| `partner_commission_type` | `enum('none','fixed','percentage')` | Skema komisi mitra |
| `partner_commission_value`| `decimal(12,2)` | Nilai komisi yang berhak diterima mitra |
| `usage_limit` | `int unsigned` | Kuota maksimal penggunaan secara keseluruhan |
| `used_count` | `int unsigned` | Total pemakaian yang telah sukses |
| `usage_per_user` | `int unsigned` | Batas pemakaian per alamat email klien |
| `valid_from` | `timestamp` | Waktu mulai berlaku |
| `valid_until` | `timestamp` | Batas akhir masa berlaku |
| `is_active` | `boolean` | Status switch on/off voucher |

### B. Tabel `promo_usages` (Audit Log Pemakaian)
Mencatat histori setiap kali voucher digunakan:

| Kolom | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | `bigint unsigned` | Primary Key |
| `promo_id` | `bigint unsigned` | Foreign Key ke tabel `promos` |
| `order_id` | `bigint unsigned` | Foreign Key ke tabel `orders` |
| `client_email` | `varchar(150)` | Email pemesan |
| `discount_amount`| `decimal(12,2)` | Nominal diskon riil yang dinikmati klien |
| `partner_commission`| `decimal(12,2)` | Komisi yang dicatat untuk mitra |
| `used_at` | `timestamp` | Waktu transaksi voucher digunakan |

---

## 6. Alur Validasi Promo (`PromoService`)

Setiap kode voucher yang dikirim diverifikasi melalui metode `PromoService::validatePromo()`:

```php
// Tahapan Validasi:
1. Pemeriksaan Eksistensi: Kode promo ditemukan dan berstatus is_active = true.
2. Pemeriksaan Tanggal: now() >= valid_from && now() <= valid_until.
3. Pemeriksaan Kuota Global: used_count < usage_limit.
4. Pemeriksaan Kuota User: Jumlah penggunaan oleh email pemesan < usage_per_user.
5. Pemeriksaan Minimum Order: Subtotal pesanan >= min_order_amount.
6. Pemeriksaan Spesifikasi Template: Jika target_template_id diatur, wajib sesuai dengan template pesanan.
7. Kalkulasi Potongan: Menghitung diskon berdasarkan tipe dan scope harga.
```

---

## 7. Spesifikasi Endpoint API Promo

### A. Terapkan Kode Promo (Apply Promo)
Memvalidasi dan memasang promo ke sesi pesanan aktif.

- **URL:** `/checkout/{template}/promo/apply`
- **Method:** `POST`
- **Headers:** `Accept: application/json`, `Content-Type: application/json`

#### Request Body:
```json
{
  "promo_code": "MITRABATAM"
}
```

#### Response Sukses (`200 OK`):
```json
{
  "status": "success",
  "message": "Kode promo MITRABATAM berhasil diterapkan!",
  "data": {
    "code": "MITRABATAM",
    "name": "Kemitraan Komunitas Tech Batam",
    "type": "fixed",
    "discount_amount": 300000,
    "formatted_discount": "Rp 300.000",
    "is_partner": true,
    "partner_name": "Komunitas Tech Batam",
    "package_subtotal": 2000000,
    "domain_price": 238650,
    "new_total": 1938650,
    "formatted_new_total": "Rp 1.938.650",
    "breakdown": {
      "template_price": 1000000,
      "server_price": 500000,
      "service_price": 500000
    }
  }
}
```

#### Response Error (`400 Bad Request`):
```json
{
  "status": "error",
  "message": "Kode promo tidak ditemukan atau sudah tidak aktif."
}
```

---

### B. Hapus Kode Promo (Remove Promo)
Membatalkan voucher yang sedang terpasang di sesi pemesanan.

- **URL:** `/checkout/{template}/promo/remove`
- **Method:** `POST`
- **Headers:** `Accept: application/json`

#### Response Sukses (`200 OK`):
```json
{
  "status": "success",
  "message": "Kode promo berhasil dihapus.",
  "data": {
    "package_subtotal": 2000000,
    "domain_price": 238650,
    "new_total": 2238650,
    "formatted_new_total": "Rp 2.238.650"
  }
}
```

---

## 8. Panduan Menambahkan Kode Promo Baru

### Opsi 1: Menambahkan Melalui Seeder (`PromoSeeder.php`)
Buka file [`database/seeders/PromoSeeder.php`](file:///d:/magang/Bidtech/bidtech-landing/dashboard-bidtech/database/seeders/PromoSeeder.php) dan tambahkan array baru:

```php
[
    'code'                     => 'KODEPARTNERBARU',
    'name'                     => 'Program Kemitraan Startup Jakarta',
    'description'              => 'Diskon Rp 400.000 khusus jaringan startup mitra.',
    'type'                     => 'fixed',
    'reward_amount'            => 400000,
    'max_discount'             => null,
    'min_order_amount'         => 2000000,
    'target_scope'             => 'total',
    'is_partner'               => true,
    'partner_name'             => 'Jakarta Startup Hub',
    'partner_code'             => 'PARTNER-JKT-01',
    'partner_commission_type'  => 'fixed',
    'partner_commission_value' => 150000, // Komisi mitra Rp 150.000
    'usage_limit'              => 100,
    'usage_per_user'           => 1,
    'valid_from'               => now(),
    'valid_until'              => now()->addMonths(6),
    'is_active'                => true,
]
```
Lalu jalankan di terminal:
```bash
php artisan db:seed --class=PromoSeeder
```

### Opsi 2: Menambahkan Melalui Tinker / Script PHP
```bash
php artisan tinker
```
```php
App\Models\Promo::create([
    'code' => 'DISPLAYSALE',
    'name' => 'Flash Sale Website',
    'type' => 'fixed',
    'reward_amount' => 250000,
    'min_order_amount' => 2000000,
    'target_scope' => 'total',
    'usage_limit' => 50,
    'valid_from' => now(),
    'valid_until' => now()->addDays(14),
    'is_active' => true,
]);
```

---

## 9. Tampilan Promo pada Alur Transaksi & Invoice

1. **Halaman Ringkasan Pemesanan (`/checkout/{template}/ringkasan`)**:
   - Kolom input AJAX dengan tombol "Gunakan" dan "Hapus".
   - Tampilan live kalkulasi pemecahan harga (Template, Server, Layanan, Domain, dan Potongan Promo).
2. **Gateway Pembayaran Xendit**:
   - Nominal tagihan invoice virtual account / QRIS / e-wallet secara otomatis dikurangi sesuai diskon bersih sehingga tidak memicu error harga negatif.
3. **Dokumen Invoice Resmi & Cetak PDF (`/checkout/invoice/{order_number}/download`)**:
   - Menampilkan baris khusus diskon promo dan nama program kemitraan resmi.
4. **Notifikasi WhatsApp Otomatis (Fonnte)**:
   - Pesan rincian pemesanan memuat informasi potongan promo dan selamat datang bagi klien yang menggunakan jalur kemitraan.

---

*Dokumen ini dibuat dan dikelola secara resmi oleh Tim Rekayasa Sistem Bidtech.*
