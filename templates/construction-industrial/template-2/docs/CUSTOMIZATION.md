# Panduan Kustomisasi Template-2

Panduan ini menjelaskan cara mengubah data, warna, aset visual, dan konfigurasi pada Template-2.

## 1. Mengubah Informasi Perusahaan & Kontak
Buka file `lib/constants.ts`:
- Ubah properti `COMPANY_INFO` (`name`, `tagline`, `hotline`, `whatsapp`, `email`, `address`).
- Perubahan ini otomatis terdistribusi ke Header, Hero, CTA, dan Footer.

## 2. Mengubah Data Armada & Alat Berat
Buka file `lib/constants.ts` pada array `EQUIPMENT_CATALOG`:
- Tambahkan atau ubah objek armada baru dengan properti: `id`, `name`, `category`, `rate`, `power`, `weight`, `capacity`, `description`, dan `image`.

## 3. Mengganti Gambar Hero Cutout
- Simpan gambar transparan baru di `public/images/hero/` dengan format PNG beresolusi tinggi.
- Buka `components/Hero.tsx` dan ubah path `<Image src="/images/hero/nama-file.png" ... />`.

## 4. Menyesuaikan Gaya Tailwind & Warna
- Konfigurasi warna utama ada di `styles/variables.css` dan `tailwind.config.js`.
- Untuk mengganti warna aksen oranye ke warna lain (misal kuning Caterpillar `#f59e0b` atau merah safety `#dc2626`), sesuaikan properti `industrial` dan `primary-container` pada `tailwind.config.js`.
