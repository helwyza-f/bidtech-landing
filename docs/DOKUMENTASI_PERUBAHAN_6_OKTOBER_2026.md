# Dokumentasi Perubahan & Pembaruan (6 Oktober 2026)

**Repository:** `bidtech-landing`  
**Proyek Terkait:** `projects/nadim-trans-rentcar/` (Nadim Trans Rent Car Batam) & `bidtech-landing`  
**Cabang / Branch Terkait:** `main` & `satria`  
**Status Sinkronisasi:** Up-to-date (Komit HEAD: `0ff7b6c`)  
**Penulis / Author:** `satt12 (Satria)`  
**Tanggal Pelaksanaan:** Selasa, 6 Oktober 2026  

---

## 1. Ringkasan Eksekutif

Pada tanggal **6 Oktober 2026**, dilakukan serangkaian pembaruan besar (*major release & stability patch*) yang terbagi ke dalam **2 komit utama**:

1. **Komit `8b746d1`** *(Pukul 13:17 WIB)*:
   - Implementasi sistem **Multi-Bahasa (4 Bahasa/Locale)**: Bahasa Indonesia (`id`), English Global (`en`), English Singapore (`en-sg`), dan Bahasa Melayu (`ms`).
   - Implementasi **Konversi Mata Uang Otomatis** (IDR, SGD, MYR) sesuai *Price List Resmi*.
   - Fitur **Auto Locale Detection** berbasis Edge Geo-IP dan timezone perangkat.
   - Penambahan **17 aset foto armada baru** (format WebP) dan pembaruan database menjadi **24 unit kendaraan**.
   - Integrasi SEO multi-bahasa (`hreflang`, OpenGraph locale) dan dynamic sitemap 115 halaman.

2. **Komit `0ff7b6c`** *(Pukul 15:11 WIB)*:
   - Perbaikan bug **Switching Bahasa ID di Lingkungan Hosting/Serverless**.
   - Penambahan rute API Cookie `/api/set-locale` dan proteksi redirect berulang pada Next.js Middleware.
   - Peningkatan UI/UX **Ringkasan Formulir Pemesanan (Order Summary Widget)**.
   - Integrasi seksi **Informasi Rekening Pembayaran Resmi PT Nadim Auto Transindo** (pencegahan penipuan transaksi sewa mobil).

---

## 2. Rincian Komit & Cakupan File

### A. Komit `8b746d1` — Fitur Multi-Bahasa, Kurs Otomatis & Katalog Mobil
> **Pesan Komit:** `feat: multi-bahasa 4 locale (ID, EN, EN-SG, MS), konversi kurs otomatis (SGD & MYR), auto locale detection, dan optimasi UI katalog mobil`  
> **Statistik:** 51 file diubah, +2.218 baris ditambahkan, -231 baris dikurangi.

#### 1. Arsitektur Multi-Bahasa 4 Locale
- **Bahasa Indonesia (`id`)**: Jalur root default tanpa prefix (`/`, `/kendaraan`, `/kendaraan/[slug]`, `/layanan`, `/faq`).
- **English Global (`en`)**: Prefix `/en` (`/en`, `/en/kendaraan`, dst.).
- **English Singapore (`en-sg`)**: Prefix `/en-sg` dengan tarif mata uang Dollar Singapura (`S$`).
- **Bahasa Melayu (`ms`)**: Prefix `/ms` dengan tarif mata uang Ringgit Malaysia (`RM`).
- Menambahkan struktur direktori App Router Next.js:
  - `projects/nadim-trans-rentcar/app/en-sg/*`
  - `projects/nadim-trans-rentcar/app/ms/*`

#### 2. Konversi Mata Uang Terpusat (`lib/i18n.ts`)
- Nilai kurs acuan disesuaikan langsung dengan brosur daftar harga resmi turis (`harga-list-3.webp`):
  - **IDR**: Kurs acuan `1:1`, simbol `Rp`.
  - **SGD**: Acuan `1 SGD ≈ Rp 12.000` (contoh: Avanza S$ 50/hari).
  - **MYR**: Acuan `1 MYR ≈ Rp 4.000` (contoh: Avanza RM 150/hari, Innova Reborn RM 275/hari, Alphard Gen 3 RM 750/hari).
- Helper seragam: `convertPrice()`, `formatCurrency()`, dan `formatRupiah()`.
- Surcharge supir dihitung otomatis sesuai kurs aktif (IDR Rp 250.000, MYR RM 63, SGD S$ 21, USD $16).

#### 3. Auto Locale Detection (Deteksi Negara Pengunjung)
- Pengunjung dari Singapura (`SG`) atau Malaysia (`MY`) otomatis diarahkan ke versi bahasa & mata uang masing-masing saat pertama kali berkunjung via Edge Middleware Geo-IP (`x-vercel-ip-country`, `cf-ipcountry`) dan browser timezone/locale.
- Pilihan manual pengunjung di-cache pada `localStorage` dan cookie `nadimtrans-locale`.

#### 4. Pembaruan Data Armada & 17 Aset Gambar WebP
- Penambahan 17 gambar kendaraan transparan beresolusi tinggi di `projects/nadim-trans-rentcar/public/images/`:
  - `toyota-avanza.webp`, `toyota-innova-reborn.webp`, `toyota-innova-zenix.webp`, `toyota-alphard.webp`
  - `toyota-calya.webp`, `toyota-agya.webp`, `toyota-raize.webp`, `toyota-fortuner.webp`
  - `mitsubishi-xpander.webp`, `honda-hrv.webp`
  - `toyota-hiace-commuter.webp`, `toyota-hiace-premio.webp`, `toyota-hiace-premio-luxury.webp`
  - `isuzu-elf-long.webp`, `medium-bus.webp`, `big-bus.webp`, `harga-list-3.webp`
- Database kendaraan di `projects/nadim-trans-rentcar/lib/data.ts` dimutakhirkan menjadi 24 pilihan armada dengan spesifikasi mendalam (mesin, transmisi, kapasitas penumpang & bagasi, fitur kenyamanan).

---

### B. Komit `0ff7b6c` — Perbaikan Ringkasan Order, Bug Switch ID & Rekening Resmi
> **Pesan Komit:** `feat: perbaikan ringkasan order form, bug switch bahasa ID di hosting, dan info rekening pembayaran resmi`  
> **Statistik:** 9 file diubah, +418 baris ditambahkan, -216 baris dikurangi.

#### 1. Solusi Bug Switch Bahasa Indonesia (`id`) di Serverless Hosting
- **Permasalahan Sebelumnya:** Pada serverless hosting (Vercel / Nginx proxy), pengunjung yang mengganti bahasa kembali ke Bahasa Indonesia ("ID") kerap mengalami *redirect loop* atau terlempar kembali ke `/en-sg` atau `/ms` karena middleware membaca IP asal atau cookie belum ter-set secara server-side.
- **Solusi yang Diterapkan:**
  1. **API Endpoint Khusus:** Dibuat rute `projects/nadim-trans-rentcar/app/api/set-locale/route.ts` untuk menyimpan preferensi bahasa ke dalam HTTP cookie dengan opsi `SameSite: Lax`, `Path: /`, `Max-Age: 1 tahun`, dan `Secure` pada mode HTTPS/Production.
  2. **Query Override:** Penambahan penanganan parameter `?lang=id` di middleware yang langsung membersihkan prefix URL dan menetapkan cookie.
  3. **Pembersihan URL:** Logika di `LanguageSwitcher.tsx` memastikan perpindahan ke `id` mengarah ke rute bersih tanpa prefix (`/kendaraan/[slug]`, bukan `/id/kendaraan/[slug]`).
  4. **Prioritas Cookie di Middleware:** Jika cookie bernilai `id`, middleware langsung mengizinkan request tanpa pernah mengecek Geo-IP ke SG/MY lagi.

#### 2. Penyempurnaan Tampilan Ringkasan Pemesanan (`VehicleBookingWidget.tsx`)
- Redesain kartu **Ringkasan Sewa**:
  - Tampilan rincian unit mobil, durasi sewa, paket (Lepas Kunci / Dengan Supir).
  - Tampilan breakdown tarif per hari x jumlah hari sewa.
  - Biaya tambahan supir tertera terpisah dan jelas.
  - Status lokasi antar-jemput (Zona Gratis vs Biaya Tambahan Luar Area).
  - Integrasi pesan WhatsApp otomatis terformat rapi sesuai mata uang dan bahasa yang aktif.

#### 3. Seksi Informasi Rekening Pembayaran Resmi PT Nadim Auto Transindo
- Ditambahkan ke halaman detail kendaraan (`VehicleDetailClient.tsx`) dan widget pesanan (`VehicleBookingWidget.tsx`).
- Menampilkan rincian rekening resmi perusahaan untuk menjamin keamanan transaksi penyewa dari potensi penipuan rekening bodong:
  - **Nama Bank:** Bank Mandiri
  - **Nomor Rekening:** `1090019999818`
  - **Atas Nama:** `PT NADIM AUTO TRANSINDO`
  - Dilengkapi label verifikasi keamanan resmi dan imbauan transaksi aman.

---

## 3. Daftar File yang Terkena Dampak Perubahan

```text
projects/nadim-trans-rentcar/
├── app/
│   ├── api/set-locale/route.ts                    (BARU: API set locale cookie)
│   ├── en-sg/                                     (BARU: Rute English Singapore)
│   │   ├── faq/page.tsx
│   │   ├── kendaraan/[slug]/page.tsx
│   │   ├── kendaraan/page.tsx
│   │   ├── layanan/page.tsx
│   │   ├── layout.tsx
│   │   ├── manifest.ts
│   │   └── page.tsx
│   ├── ms/                                        (BARU: Rute Bahasa Melayu)
│   │   ├── faq/page.tsx
│   │   ├── kendaraan/[slug]/page.tsx
│   │   ├── kendaraan/page.tsx
│   │   ├── layanan/page.tsx
│   │   ├── layout.tsx
│   │   ├── manifest.ts
│   │   └── page.tsx
│   ├── kendaraan/[slug]/VehicleDetailClient.tsx   (MODIFIKASI: Info Rekening & styling)
│   ├── kendaraan/KendaraanClient.tsx              (MODIFIKASI: Penyesuaian format harga)
│   └── sitemap.ts                                 (MODIFIKASI: 115 sitemap URL)
├── components/
│   ├── booking/DeliveryMapPicker.tsx              (MODIFIKASI: Penyesuaian bahasa)
│   ├── booking/VehicleBookingWidget.tsx           (MODIFIKASI: Ringkasan form, kurs & rekening)
│   ├── layout/LanguageSwitcher.tsx                (MODIFIKASI: Switcher & perbaikan ID)
│   ├── providers/LocaleRedirect.tsx               (MODIFIKASI: Sinkronisasi client cookie)
│   ├── sections/Testimonials.tsx                  (MODIFIKASI: Terjemahan testimoni)
│   └── ui/RentalDateSelector.tsx                  (MODIFIKASI: Label multi-bahasa)
├── lib/
│   ├── data.ts                                    (MODIFIKASI: 24 unit armada lengkap)
│   ├── i18n.ts                                    (MODIFIKASI: Kamus 4 bahasa & logika kurs)
│   ├── localizedData.ts                           (MODIFIKASI: Terjemahan data dinamis)
│   ├── faqData.ts                                 (MODIFIKASI: Terjemahan FAQ)
│   └── seo.ts                                     (MODIFIKASI: hreflang & OpenGraph)
├── middleware.ts                                  (MODIFIKASI: Edge auto-locale & cookie guard)
├── public/images/                                 (17 ASET BARU: Foto kendaraan WebP)
└── docs/
    ├── DOKUMENTASI_MULTI_BAHASA_DAN_KURS.md       (BARU: Panduan sistem multi-bahasa)
    └── DOKUMENTASI_PERUBAHAN_6_OKTOBER_2026.md    (BARU: Dokumen ini)
```

---

## 4. Status Integrasi Git Saat Ini (7 Oktober 2026)

- **Local Branch `main`:** Komit `0ff7b6c`
- **Remote `origin/main`:** Komit `0ff7b6c`
- **Local Branch `satria`:** Komit `0ff7b6c`
- **Remote `origin/satria`:** Komit `0ff7b6c`
- **Selisih Komit (Difference):** 0 komit di depan / 0 komit di belakang (*Identik & Synced*).
- **Keputusan Pull:** Sesuai instruksi, **TIDAK dilakukan git pull** karena remote `origin/main` tidak memiliki komit baru yang belum ditarik.
- **Uncommitted Files di Branch `satria`:**
  - `frontend/components/home/sections/portfolio-section.tsx`
  - `frontend/lib/i18n/en.ts`
  - `frontend/lib/i18n/id.ts`
  *(File di atas berisi pekerjaan terkini pada komponen portofolio landing page Bidtech dan tetap aman di working directory)*.

---
*Dokumentasi disusun secara terperinci untuk rekam jejak pengembangan Bidtech & Nadim Trans Rent Car.*
