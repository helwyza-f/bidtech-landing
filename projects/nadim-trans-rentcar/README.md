# Rentcar - Automotive & Luxury Car Rental Landing Page (Template 1)

Template landing page modern, premium, dan berkinerja tinggi untuk bisnis **Rental Mobil Mewah**, **Showroom Otomotif**, dan **Layanan Mobilitas Eksekutif**. Dibangun menggunakan **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, dan **Framer Motion**.

---

## 🌟 Fitur Utama

- 🏎️ **Hero Section Parallax & Typography Animation**:
  - Animasi teks judul muncul kata-demi-kata dengan efek blur & slide halus (*word-by-word stagger animation*).
  - Efek paralaks gambar latar belakang saat di-scroll.
  - *Floating Glassmorphic Statistics Card* (50rb+ Anggota, 120+ Lokasi, 4.9/5 Rating, Mitra Terverifikasi).

- 🚗 **Interactive Vehicle Collection (Slider Koleksi Kendaraan)**:
  - *Carousel slider* adaptif dengan tombol navigasi panah kiri & kanan.
  - Filter kategori instan (*Semua, SUV, MPV, Sedan, Sport*).
  - Kartu mobil lengkap dengan badge kategori, spesifikasi (kursi, bagasi, transmisi), dan tarif harian.
  - Responsif otomatis: 1 kartu di mobile, 2 di tablet, 3 di desktop.

- 📄 **Dedicated Catalog Page (`/kendaraan`)**:
  - Halaman terpisah khusus untuk katalog armada lengkap.
  - Fitur **Pencarian Real-Time** (*Live Search*) berdasarkan nama dan tipe mobil.
  - **Filter Kategori** & **Sorting Dropdown** (*Terpopuler, Harga Termurah, Harga Tertinggi*).
  - **Modal Konfirmasi Booking Interaktif** saat menekan tombol *"Sewa Sekarang"*.

- 🛡️ **Why Choose Us (Standar Baru Mobilitas)**:
  - Frame visual 3D card miring dengan *floating badge* "15+ Tahun Pengalaman".
  - Grid 4 pilar keunggulan utama (Garansi Harga, Layanan 24/7, Booking Fleksibel, Pengiriman ke Lokasi).

- 🔑 **How To Book (Proses Pemesanan 3 Langkah)**:
  - Tampilan *Dark Theme* elegan yang memandu alur reservasi pengguna (Pilih Kendaraan -> Tentukan Tanggal -> Konfirmasi & Berkendara).

- 💬 **Testimonials Carousel (Suara Kepercayaan)**:
  - Slider ulasan testimoni bergaya *Royal Blue Card*.
  - 5 bintang rating solid, avatar pengguna terverifikasi, kutipan otentik, dan animasi geser halus.

- ❓ **Interactive FAQ Accordion (Pertanyaan Umum)**:
  - Accordion modern dengan ekspansi tinggi mulus (*smooth height transition*).
  - Memuat jawaban atas pertanyaan esensial seputar asuransi, syarat usia, lokasi pengembalian, dan dokumen.

- 🚀 **High-Conversion Call to Action (CTA)**:
  - Banner ajakan bertindak bernuansa *Royal Blue* dengan panel *glassmorphism* berisi 3 poin jaminan (*Konfirmasi Instan, Pembayaran Aman, Hadiah Keanggotaan*).

- 🧭 **Modern Header & Comprehensive Footer**:
  - Header *always-fixed/sticky* dengan *backdrop blur*, indikator navigasi aktif animasi, dan *scroll-spy*.
  - Footer 4 kolom lengkap dengan logo, media sosial, tautan cepat, kontak telepon/email/jam operasional, alamat kantor pusat, dan legalitas.

- ⚡ **Full Screen Layout & Clean Scroll Animations**:
  - Setiap section dirancang *full viewport* (`min-h-screen`) dengan penataan vertikal yang seimbang.
  - Animasi scroll berjalan halus sekali saat elemen masuk ke viewport (*`viewport={{ once: true }}`*) tanpa loop berulang.
  - Dilengkapi integrasi **Lenis Smooth Scroll** untuk pengalaman scroll yang mulus dan premium.

---

## 🛠️ Tech Stack

| Teknologi | Keterangan |
| :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **UI Components** | Radix / Shadcn UI primitives & Custom Components |
| **Font** | Inter (Google Fonts via `next/font`) |

---

## 🚀 Panduan Menjalankan Project

### 1. Prasyarat
Pastikan Anda telah menginstal **Node.js (v18.17+ atau lebih baru)** dan package manager (`npm`, `yarn`, atau `pnpm`).

### 2. Instalasi Dependensi
Masuk ke direktori template dan install seluruh paket yang dibutuhkan:
```bash
cd templates/automotive/template-1
npm install
```

### 3. Menjalankan Server Development
Jalankan server lokal:
```bash
npm run dev
```
Buka browser dan akses alamat:
```
http://localhost:3000
```

### 4. Build untuk Produksi
Untuk menguji dan membangun versi produksi:
```bash
npm run build
npm run start
```

---

## 📂 Struktur Direktori

```
template-1/
├── app/
│   ├── kendaraan/
│   │   └── page.tsx        # Halaman Khusus Katalog Mobil (/kendaraan)
│   ├── layout.tsx          # Root Layout & Metadata SEO
│   └── page.tsx            # Halaman Utama Landing Page (/)
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Header & Navigasi Navbar
│   │   └── Footer.tsx      # Footer Lengkap 4 Kolom
│   ├── sections/
│   │   ├── Hero.tsx        # Hero Section & Parallax Background
│   │   ├── Features.tsx    # Slider Koleksi Kendaraan & Filter
│   │   ├── WhyChooseUs.tsx # Mengapa Memilih Kami & Floating Badge
│   │   ├── howtobook.tsx   # Alur Pemesanan 3 Langkah (Dark Theme)
│   │   ├── Testimonials.tsx# Slider Testimoni Pelanggan
│   │   ├── Faq.tsx         # FAQ Accordion Interaktif
│   │   └── CTA.tsx         # Call To Action Banner
│   └── ui/
│       └── button.tsx      # Reusable Button Component (CVA)
├── constants/
│   ├── features.ts         # Data Dummy Fitur & Keunggulan
│   └── navigation.ts       # Daftar Menu Navigasi Header/Footer
├── lib/
│   └── utils.ts            # Utility Helper Functions (cn, clsx)
├── public/
│   └── images/             # Aset Gambar Mobil, Hero, & Avatar
├── styles/
│   └── globals.css         # Global Tailwind Directives & Variables
├── tailwind.config.js      # Konfigurasi Tailwind CSS & Color Tokens
├── tsconfig.json           # Konfigurasi TypeScript
└── package.json            # Daftar Dependencies & Script Proyek
```

---

## 🎨 Kustomisasi Cepat

- **Mengubah Konten Mobil**: Edit array `CAR_COLLECTION` di [Features.tsx](file:///d:/magang/Bidtech/bidtech-landing/templates/automotive/template-1/components/sections/Features.tsx) atau `ALL_CARS` di [app/kendaraan/page.tsx](file:///d:/magang/Bidtech/bidtech-landing/templates/automotive/template-1/app/kendaraan/page.tsx).
- **Mengubah Menu Navigasi**: Buka [constants/navigation.ts](file:///d:/magang/Bidtech/bidtech-landing/templates/automotive/template-1/constants/navigation.ts).
- **Mengganti Aset Foto**: Tempatkan gambar baru Anda di direktori `public/images/`.
- **Mengubah Warna Tema**: Sesuaikan palet warna Tailwind di `tailwind.config.js` atau ubah class warna (seperti `bg-blue-600`, `text-blue-600`).
- **Mengubah Metadata SEO**: Buka [app/layout.tsx](file:///d:/magang/Bidtech/bidtech-landing/templates/automotive/template-1/app/layout.tsx) dan sesuaikan properti `metadata` (`title`, `description`, `keywords`).

---

## 📄 Lisensi

Bidtech Landing Page Templates. Dibuat untuk kebutuhan komersial dan template agensi. Bebas dimodifikasi dan dikembangkan sesuai kebutuhan proyek Anda.
