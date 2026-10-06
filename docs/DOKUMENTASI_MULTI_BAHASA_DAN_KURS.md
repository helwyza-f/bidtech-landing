# Dokumentasi Implementasi Multi-Bahasa (4 Bahasa) & Konversi Mata Uang Otomatis
**Website NadimTrans RentCar (PT. Nadim Auto Transindo Batam)**  
*Tanggal Rilis: Oktober 2026*  
*Cabang / Branch: `satria`*

---

## 1. Ringkasan Fitur
Website NadimTrans RentCar kini mendukung **4 Bahasa dan Konversi Mata Uang Otomatis** secara terintegrasi. Saat pengunjung memilih bahasa pada dropdown navigasi, seluruh teks halaman, katalog mobil, ringkasan harga sewa, opsi supir, serta rincian pesan WhatsApp akan otomatis menyesuaikan bahasa dan mata uang target secara real-time.

---

## 2. Tabel Pemetaan 4 Bahasa & Mata Uang

| Kode Locale | Bahasa | Wilayah Sasaran | Mata Uang | Simbol | Nilai Tukar Acuan (ke IDR) | Contoh Harga Avanza |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **`id`** | Bahasa Indonesia (Default) | Wisatawan Domestik & Warga Batam | IDR | **Rp** | `1 IDR = 1 IDR` | **Rp 600.000** |
| **`en`** | English (Global) | Wisatawan Mancanegara / Global | IDR | **Rp** | `1 IDR = 1 IDR` | **Rp 600.000** |
| **`en-sg`** | English (Singapore) | Turis & Pebisnis asal Singapura | SGD | **S$** | `1 SGD ≈ Rp 12.000` | **S$ 50** |
| **`ms`** | Bahasa Melayu | Wisatawan asal Malaysia & Brunei | MYR | **RM** | `1 MYR ≈ Rp 4.000` *(Sesuai Brosur Resmi)* | **RM 150** |

> **Catatan Kurs:**  
> Nilai tukar 1 MYR = Rp 4.000 diambil langsung dari **Price List Resmi Wisatawan Malaysia/Singapura** (`harga-list-3.webp`), di mana Avanza tercantum RM 150 (Rp 600.000), Innova Reborn RM 275 (Rp 1.100.000), dan Alphard Gen 3 RM 750 (Rp 3.000.000).

---

## 3. Struktur Routing & URL (Next.js App Router)

Routing menggunakan struktur bebas prefix untuk Bahasa Indonesia (SEO default Indonesia) dan sub-path prefix untuk bahasa lainnya:

1. **Bahasa Indonesia (`id`)**:
   - Beranda: `/`
   - Katalog Armada: `/kendaraan`
   - Detail Mobil: `/kendaraan/[slug]`
   - Layanan: `/layanan`
   - FAQ: `/faq`

2. **English Global (`en`)**:
   - Beranda: `/en`
   - Katalog Armada: `/en/kendaraan`
   - Detail Mobil: `/en/kendaraan/[slug]`
   - Layanan: `/en/layanan`
   - FAQ: `/en/faq`

3. **English Singapore (`en-sg`)**:
   - Beranda: `/en-sg`
   - Katalog Armada: `/en-sg/kendaraan`
   - Detail Mobil: `/en-sg/kendaraan/[slug]`
   - Layanan: `/en-sg/layanan`
   - FAQ: `/en-sg/faq`

4. **Bahasa Melayu (`ms`)**:
   - Beranda: `/ms`
   - Katalog Armada: `/ms/kendaraan`
   - Detail Mobil: `/ms/kendaraan/[slug]`
   - Layanan: `/ms/layanan`
   - FAQ: `/ms/faq`

---

## 4. Komponen & Logika Teknis yang Diperbarui

### 1. `lib/i18n.ts`
- Mendefinisikan `LOCALES = ["id", "en", "en-sg", "ms"] as const;`
- Menambahkan konfigurasi kurs mata uang `CURRENCIES` dengan fungsi konversi:
  - `convertPrice(valueInIdr, locale)`
  - `formatCurrency(valueInIdr, locale)`
  - `formatRupiah(value, locale)` *(dibuat sebagai alias `formatCurrency` sehingga semua komponen eksisting langsung kompatibel)*
- Memperluas fungsi `removeLocalePrefix(pathname)` dan `getLocalizedPath(locale, pathname)` untuk mendeteksi `en-sg`, `en`, dan `ms`.
- Kamus terjemahan lengkap (`MESSAGES`) untuk 4 bahasa (Hero, Fitur, Katalog, Detail Kendaraan, Widget Booking, FAQ, Layanan, Footer, dan SEO metadata).

### 2. `i18n/request.ts`
- Menghubungkan server-side Next-Intl resolver dengan 4 locale yang valid.

### 3. `components/layout/LanguageSwitcher.tsx`
- Dropdown selector dengan label bahasa dan badge mata uang:
  - `ID` - Bahasa Indonesia (`IDR (Rp)`)
  - `EN` - English (`USD ($)`)
  - `SG` - English (Singapore) (`SGD (S$)`)
  - `MY` - Bahasa Melayu (`MYR (RM)`)
- Tombol di navbar menampilkan kode aktif ringkas (`ID`, `EN`, `SG`, `MY`) untuk kenyamanan tampilan mobile dan desktop.

### 4. `components/booking/VehicleBookingWidget.tsx`
- Surcharge tambahan supir dihitung dan ditampilkan dinamis sesuai kurs:
  - IDR: `+Rp 250.000/hari`
  - MYR: `+RM 63/hari`
  - SGD: `+S$ 21/day`
  - USD: `+$16/day`
- Label paket otomatis berubah:
  - Indonesia: `Lepas Kunci` / `Dengan Supir`
  - Melayu: `Pandu Sendiri` / `Bersama Pemandu`
  - English/Singapore: `Self-Drive` / `With Driver`
- Pesan pemesanan WhatsApp otomatis terjemah sesuai bahasa yang dipilih pemesan lengkap dengan mata uang yang relevan.

### 5. `lib/seo.ts` & `app/sitemap.ts`
- Mendukung OpenGraph locale: `id_ID`, `en_US`, `en_SG`, `ms_MY`.
- Tag `hreflang` otomatis terhubung antar-keempat bahasa untuk optimalisasi Google Search di Indonesia, Singapura, Malaysia, dan Internasional.
- Sitemap dinamis menghasilkan URL lengkap untuk seluruh halaman dan 24 armada di semua 4 bahasa (total 115 halaman terindeks).

---

## 5. Cara Mengubah Kurs di Kemudian Hari

Jika manajemen NadimTrans ingin memperbarui nilai tukar acuan (misal nilai tukar SGD atau Ringgit naik/turun), cukup ubah konstanta `rate` pada file [`lib/i18n.ts`](file:///c:/Users/User/Documents/Bidtech/bidtech-landing/projects/nadim-trans-rentcar/lib/i18n.ts):

```typescript
export const CURRENCIES: Record<Locale, CurrencyConfig> = {
  id: { code: "IDR", symbol: "Rp", rate: 1, locale: "id-ID" },
  en: { code: "IDR", symbol: "Rp", rate: 1, locale: "id-ID" },       // English Global tetap Rupiah (IDR)
  "en-sg": { code: "SGD", symbol: "S$", rate: 12000, locale: "en-SG" }, // 1 SGD = Rp 12.000
  ms: { code: "MYR", symbol: "RM", rate: 4000, locale: "ms-MY" },    // 1 MYR = Rp 4.000
};
```
Perubahan rate ini secara otomatis akan mengubah seluruh harga sewa di katalog, halaman detail mobil, dan widget booking kalkulator tanpa perlu mengubah data armada satu per satu.

---

## 6. Deteksi Otomatis Pengunjung Asal Singapura & Malaysia (Auto Locale Detection)

Website kini dilengkapi sistem **Auto Locale Detection** multi-lapis (server-side edge middleware + client-side instant detection) sehingga ketika pengunjung dari Singapura atau Malaysia pertama kali membuka website, mereka **langsung otomatis dialihkan ke versi bahasa & mata uang negaranya** tanpa harus mengubah bahasa secara manual:

1. **Pengunjung Asal Singapura (`en-sg` - SGD)**:
   - Terdeteksi otomatis via:
     - Header Edge / Geo-IP Server: `x-vercel-ip-country: SG` atau `cf-ipcountry: SG`.
     - Timezone Perangkat Pengguna: `Asia/Singapore` (SGT / UTC+8, instant 0ms).
     - Preferensi Bahasa Browser: `en-SG`, `zh-SG`, atau bahasa turunan `*sg`.
   - **Hasil**: Langsung diarahkan ke rute `/en-sg` (katalog harga SGD dalam `S$`, informasi penjemputan HarbourFront/Batam Centre ferry).

2. **Pengunjung Asal Malaysia (`ms` - MYR)**:
   - Terdeteksi otomatis via:
     - Header Edge / Geo-IP Server: `x-vercel-ip-country: MY` atau `cf-ipcountry: MY`.
     - Timezone Perangkat Pengguna: `Asia/Kuala_Lumpur` atau `Asia/Kuching` (MYT / UTC+8, instant 0ms).
     - Preferensi Bahasa Browser: `ms-MY`, `en-MY`, `ms`, atau `*my`.
   - **Hasil**: Langsung diarahkan ke rute `/ms` (katalog harga Ringgit dalam `RM`, panduan sewa pandu sendiri/pemandu).

3. **Pengunjung Asal Indonesia (`id` - IDR)**:
   - Timezone `Asia/Jakarta`, `Asia/Pontianak`, `Asia/Makassar`, `Asia/Jayapura` atau bahasa `id`.
   - Tetap berada di URL standar Indonesia tanpa perpindahan.

4. **Kontrol Manual Tetap Diprioritaskan**:
   - Jika pengunjung di Singapura atau Malaysia secara sengaja memilih bahasa lain melalui **Language Switcher** (misalnya ingin membaca versi Bahasa Indonesia), sistem menyimpan preferensi ini di `localStorage` dan cookie `nadimtrans-locale`.
   - Auto-detection **tidak akan pernah menimpa** pilihan manual pengguna yang sudah tersimpan.

---

## 7. Status Pengujian Build
- Pengujian kompilasi Next.js (`npm run build`): **100% SUKSES (Exit Code 0)**.
- Sebanyak **115 halaman statis (SSG)** di-*generate* tanpa error.
- Next.js Edge Middleware (`middleware.ts`) aktif dan berukuran `26.8 kB`.
