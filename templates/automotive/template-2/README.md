# Pinjam Mobil - Automotive Rental Template

Template ini adalah referensi antarmuka untuk bisnis rental atau penyewaan mobil. Didesain dengan gaya yang bersih, modern, dan fokus pada konversi, dengan warna aksen kuning (`#FFCC00`) yang cerah dan profesional.

## Fitur Utama
- **Responsive Navigation**: Header dengan sticky menu dan mobile drawer.
- **Hero dengan Booking Widget**: Area utama untuk *search* kendaraan.
- **Daftar Layanan**: Grid layanan yang fleksibel (Lepas Kunci, Dengan Sopir, dll).
- **Katalog Armada**: Galeri pilihan mobil dengan harga dan kategori.
- **Bagian Tentang Kami**: Membangun kepercayaan dengan pelanggan.
- **FAQ Accordion**: Pertanyaan yang sering diajukan yang mudah dinavigasi.

## Struktur Komponen
Semua komponen berada di folder `components/` dan diatur secara modular agar mudah disesuaikan.
- `Header.tsx`
- `Hero.tsx`
- `Services.tsx`
- `Fleet.tsx`
- `About.tsx`
- `FAQ.tsx`
- `Footer.tsx`

## Kustomisasi
- Ubah data armada, layanan, dan FAQ di file `lib/constants.ts`.
- Ubah warna primer di `styles/globals.css` dengan mengganti nilai CSS variable `--primary`.
