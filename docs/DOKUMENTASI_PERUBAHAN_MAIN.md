# Dokumentasi Pembaruan Branch `main` ke `satria`
**Repository:** `bidtech-landing`  
**Status Sinkronisasi:** Up-to-date (Komit HEAD: `4a9c53d`)  
**Tanggal Rangkuman:** 6 Oktober 2026  
**Author Kontributor:** `achul`, `satt12 (Satria)`

---

## 1. Status Sinkronisasi Git

Branch `satria` telah disinkronkan sepenuhnya dengan branch `main` (`origin/main`). Kedua branch saat ini berada pada commit identik dan working tree dalam keadaan bersih (*clean*).

- **Branch Aktif:** `satria`
- **Tracking Remote:** `origin/satria` (identik dengan `origin/main`)
- **Commit Terakhir:** `4a9c53d82aff237539b9f134d329d10888351d9a`
- **Status Integrasi:** Tidak ada merge conflict, semua perubahan dari `main` sudah ditarik secara penuh (*Fast-Forward / Up-to-date*).

---

## 2. Ringkasan Riwayat Komit Terintegrasi

Berikut daftar komit riwayat pembaruan yang digabungkan ke branch `satria`:

| Hash Komit | Penulis | Tanggal | Pesan Komit & Cakupan |
| :--- | :--- | :--- | :--- |
| **`4a9c53d`** | `satt12` | 2026-10-05 | Fitur peta interaktif pengantaran mobil, pemilihan jadwal sewa, dan optimasi responsif iPad & mobile |
| **`6ab30fc`** | `achul` | 2026-09-30 | Revisi `nadimtrans.com` gambar Alphard dan fitur kalender sewa interaktif |
| **`3027cca`** | `achul` | 2026-09-29 | Migrasi parameter detail kendaraan menggunakan slug ramah SEO (`/kendaraan/[slug]`) |
| **`a94326e`** | `achul` | 2026-09-29 | Koreksi nama domain produksi: `nadimstrans.com` → `nadimtrans.com` |
| **`4966af0`** | `achul` | 2026-09-29 | Implementasi fitur multi-bahasa / i18n (Indonesia `/(id)` & Inggris `/en`) di Nadim Trans |
| **`e874b94`** | `achul` | 2026-09-29 | Revisi data spesifikasi & harga 15 unit armada kendaraan serta aset foto transparan baru |
| **`f9a91bd`** | `achul` | 2026-09-28 | Perbaikan deskripsi server default pada seeder template dashboard |
| **`8028ddf`** | `achul` | 2026-09-28 | Pembaruan landing page Bidtech (portfolio baru), pipeline CI/CD Nadim Trans, dan optimasi performa |
| **`ff58165`** | `achul` | 2026-09-25 | Perbaikan bug tombol "Beli" pada seksi template preview landing page |
| **`0610ec9`** | `achul` | 2026-09-25 | Penambahan thumbnail publik untuk template Afindo & Jayawijaya |
| **`09f2fcd`** | `satt12` | 2026-09-25 | Optimasi SEO, AEO (Answer Engine) & GEO (Generative Engine) pada landing page Bidtech |
| **`7b39d56`** | `achul` | 2026-09-25 | Pengamanan password default admin pada database seeder (`adminO###`) |
| **`877e573`** | `achul` | 2026-09-25 | Merge integrasi project Nadim Trans Rent Car ke dalam monorepo Bidtech |
| **`b81c175`** | `achul` | 2026-09-25 | Redesain antarmuka utama landing page Bidtech |

---

## 3. Rincian Perubahan Berdasarkan Modul

### A. Modul Project: Nadim Trans Rent Car (`projects/nadim-trans-rentcar/`)

Pembaruan terbesar terjadi pada aplikasi web Nadim Trans Rent Car, meliputi fitur pemesanan, lokalisasi, SEO, dan aset visual:

#### 1. Peta Interaktif & Pemilihan Titik Antar-Jemput
- **Komponen Baru:** `DeliveryMapPicker.tsx` dan `DeliveryMapModal.tsx`.
- **Fungsi:** Menggunakan Leaflet / OpenStreetMap untuk memilih titik pengantaran dan penjemputan mobil di area Batam (Bandara Hang Nadim, Batam Centre, Nagoya, Harbour Bay, Sekupang, Nongsa, dll).
- **Kalkulasi Biaya:** Mendukung deteksi zona antar gratis vs zona tambahan otomatis.

#### 2. Widget Pemesanan Terpadu & Kalender Sewa
- **Komponen Baru:** `VehicleBookingWidget.tsx` dan `RentalDateSelector.tsx`.
- **Integrasi WhatsApp:** Menggabungkan pilihan tanggal mulai, tanggal selesai, tipe sewa (*Lepas Kunci* atau *Dengan Supir*), serta lokasi antar-jemput ke dalam format pesan WhatsApp siap kirim ke admin rental.
- **Validasi Jadwal:** Pencegahan tanggal lewat (*past dates*), pemilihan durasi minimal sewa, dan kalkulasi total estimasi biaya harian.

#### 3. Refactoring Routing URL ke Slug SEO
- Mengubah path rute detail unit dari ID angka acak (`/kendaraan/[id]`) menjadi slug deskriptif (`/kendaraan/[slug]`), misalnya `/kendaraan/toyota-innova-zenix`.
- Menambahkan aturan redirect otomatis (301/308 permanent redirect) di `next.config.js` untuk mencegah broken link dari tautan lama.

#### 4. Internasionalisasi (i18n) Bilingual (ID / EN)
- Arsitektur rute Next.js App Router dibagi menjadi `app/(id)/` (Bahasa Indonesia) dan `app/en/` (Bahasa Inggris).
- Penyediaan `LanguageSwitcher.tsx`, `LocaleRedirect.tsx`, serta data terjemahan terpusat di `lib/i18n.ts` dan `lib/localizedData.ts`.
- Metadata SEO dan OpenGraph disesuaikan secara dinamis berdasarkan locale aktif.

#### 5. Sinkronisasi Data 15 Armada Resmi & Aset Visual
- Pembaharuan `lib/data.ts` mencakup spesifikasi akurat (kapasitas penumpang, jenis transmisi, kapasitas bagasi, bahan bakar) serta rate sewa harian.
- Penambahan foto unit beresolusi tinggi dengan background transparan:
  - `alphard-gen-4-2.webp`, `alphard-gen-4-3.webp`
  - `Hyundai-Stargazer-2.webp`
  - `New-Ayla-2.webp`, `New-Xenia-2.webp`
  - `hiace.webp`, `nadimtrans.webp`

#### 6. Koreksi Domain Produksi & Konfigurasi Nginx
- Mengganti seluruh referensi domain lama `nadimstrans.com` ke domain resmi `nadimtrans.com` pada:
  - Nginx configuration: `nginx/nadimtrans.com.conf`
  - `robots.ts`, `sitemap.ts`, `JsonLd.tsx`, `lib/seo.ts`
  - Dokumen panduan: `docs/DEPLOYMENT.md`

#### 7. Otomasi Deployment CI/CD
- Penambahan GitHub Actions workflow `.github/workflows/deploy-nadimtrans.yml` untuk build dan deploy otomatis ke server VPS via Docker & SSH.

---

### B. Modul Frontend: Bidtech Landing Page (`frontend/`)

#### 1. Showcase Portfolio Klien Baru
- Penambahan seksi dan data portfolio untuk 5 project klien aktif:
  1. **Nadim Trans Rent Car** (Rental Mobil & Wisata Batam)
  2. **AyoCuci** (Aplikasi & Layanan Laundry On-Demand)
  3. **CRM Pipo Smart** (Sistem Manajemen Relasi Pelanggan)
  4. **HKTI** (Himpunan Kerukunan Tani Indonesia Web Portal)
  5. **VisSociety** (Komunitas & Event Platform)
- Penambahan aset visual di `frontend/public/images/portofolio/`.

#### 2. Optimasi SEO, AEO, dan GEO (Generative Engine Optimization)
- Penambahan Schema Structured Data JSON-LD (`structured-data.tsx`):
  - Skema `Organization`, `WebSite`, `Services`, dan `FAQPage`.
- Dukungan indexing AI Engine melalui `public/llms.txt` dan `public/llms-full.txt` agar layanan Bidtech terdeteksi secara optimal oleh model AI seperti ChatGPT, Claude, dan Gemini.
- Pembuatan OpenGraph dinamis (`opengraph-image.tsx` dan `twitter-image.tsx`) serta manifest aplikasi modern.

#### 3. Perbaikan Antarmuka & Bug Fix
- Memperbaiki event handler tombol "Beli" / "Preview" pada galeri template (`template-preview-section.tsx`).
- Penyempurnaan teks dwibahasa di `lib/i18n/id.ts` dan `lib/i18n/en.ts`.
- Penyegaran komponen Call-to-Action global (`universal-cta.tsx`).

---

### C. Modul Backend & Admin: Bidtech Dashboard (`dashboard-bidtech/`)

#### 1. Keamanan Kredensial Default
- Memperbarui `database/seeders/UserSeeder.php` untuk menggunakan pola password default yang lebih aman (`adminO###`).

#### 2. Seed Data Template & Aset Publik
- Perbaikan metadata dan deskripsi server default di `TemplateSeeder.php`.
- Penambahan aset pratinjau thumbnail template: `afindo.webp` dan `jayawijaya.webp`.

---

## 4. Panduan Verifikasi & Pengembangan Selanjutnya

Jika ingin melanjutkan pengerjaan di branch `satria`:

1. **Pastikan berada di branch `satria`:**
   ```bash
   git branch --show-current
   # Output harus: satria
   ```

2. **Jalankan Frontend Nadim Trans secara lokal:**
   ```bash
   cd projects/nadim-trans-rentcar
   npm install
   npm run dev
   # Akses di: http://localhost:3000 (atau port yang ditentukan di next.config)
   ```

3. **Jalankan Frontend Landing Bidtech:**
   ```bash
   cd ../../frontend
   npm run dev
   # Akses di: http://localhost:3000
   ```

4. **Kirim Perubahan Baru:**
   Ketika pekerjaan baru selesai, lakukan commit dan push langsung ke branch `satria`:
   ```bash
   git add .
   git commit -m "feat/fix: deskripsi perubahan"
   git push origin satria
   ```

---
*Dokumentasi ini dibuat otomatis sebagai referensi sinkronisasi branch git.*
