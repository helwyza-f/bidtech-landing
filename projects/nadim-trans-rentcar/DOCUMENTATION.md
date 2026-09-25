# Dokumentasi Proyek Website Nadim Trans RentCar (PT. Nadim Auto Transindo)

Dokumentasi resmi arsitektur sistem, struktur data armada, panduan tema warna, dan alur pengerjaan untuk website **Nadim Trans RentCar Batam**.

---

## 1. Profil & Identitas Bisnis

| Komponen | Keterangan |
| :--- | :--- |
| **Nama Legal** | PT. Nadim Auto Transindo |
| **Brand Layanan** | Nadim Trans RentCar |
| **Domisili / Wilayah Operasional** | Batam, Kepulauan Riau |
| **Alamat Kantor Fisik** | Perumahan KDA Cluster Kepodang, Jl. Kepodang 3 No. 2, Belian, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29464 |
| **Nomor Kontak / WhatsApp** | `+62 812-7660-3878` / `+62 822-7132-2301` |
| **Email Resmi** | `pt.nadimautotransindo@gmail.com` |
| **Fokus Layanan** | Rental Mobil Lepas Kunci, Sewa Mobil + Supir, Antar Jemput Bandara Hang Nadim, Carter Pariwisata & Pernikahan Batam |

---

## 2. Panduan Desain & Identitas Visual (Branding)

### A. Palet Warna (Luxury Gold & Dark Slate)
Website telah diperbarui dari tema biru menjadi tema **Gold & White** yang mewah, harmonis dengan logo resmi:
- **Primary Gold**: `#D4AF37` (Tailwind: `gold-500` / `amber-500`)
- **Accent Gold Light**: `#F5E4BE` & `#E4B35D` (Tailwind: `gold-200` & `gold-400`)
- **Dark Luxury Background**: `#020617` (Tailwind: `slate-950`)
- **Card Background**: `#0B0F19` & `#FFFFFF`
- **Text**: `text-white`, `text-slate-900`, `text-amber-400`, `text-gray-300`

### B. Logo & Icon Resmi
- **File Asset**: `/public/icons/icon-2.webp` (dan `/public/images/icon-2.webp`)
- **Penerapan**: Digunakan pada `components/layout/Header.tsx`, `components/layout/Footer.tsx`, serta favicon/app icon di `app/layout.tsx` dalam bentuk emblem transparan siluet mobil emas dan inisial krom "NTR" dengan drop shadow gold.

### C. Tipografi
- **Headline / Judul Utama**: `Bebas Neue` (display uppercase bold & dynamic)
- **Body & Teks Bacaan**: `Inter` (sans-serif modern, bersih, dan mudah dibaca)

---

## 3. Struktur Folder Proyek

```plaintext
projects/nadim-trans-rentcar/
├── app/                                 # Next.js 14 App Router
│   ├── layout.tsx                       # Root layout, Google Fonts (Inter + Bebas Neue), SEO Metadata
│   ├── page.tsx                         # Halaman Beranda (Landing Page Utama)
│   ├── kendaraan/                       
│   │   ├── page.tsx                     # Katalog Seluruh Armada (Search & Filter Kategori)
│   │   └── [id]/                        
│   │       ├── page.tsx                 # Dynamic SSG page (generateStaticParams untuk ID 1-8)
│   │       └── VehicleDetailClient.tsx  # Halaman detail unit, gallery selector, form booking & WA
│   ├── layanan/                         
│   │   └── page.tsx                     # Halaman detail layanan rental (Lepas Kunci, Driver, Airport)
│   └── faq/                             
│       └── page.tsx                     # Halaman tanya-jawab umum & bantuan pelanggan
│
├── components/                          # Komponen Antarmuka (Modular)
│   ├── layout/                          
│   │   ├── Header.tsx                   # Navbar fixed dengan logo resmi & link navigasi
│   │   └── Footer.tsx                   # Footer luxury dark slate dengan legalitas PT & kontak Batam
│   ├── sections/                        # Komponen per-section di halaman utama
│   │   ├── Hero.tsx                     # Hero banner (Background Bandara Hang Nadim + Alphard Cutout)
│   │   ├── Features.tsx                 # Carousel armada mobil unggulan
│   │   ├── WhyChooseUs.tsx              # Keunggulan perusahaan & foto kantor fisik Batam (mobil-16.webp)
│   │   ├── howtobook.tsx                # 3 Langkah mudah alur penyewaan mobil
│   │   ├── Testimonials.tsx             # Testimoni asli pelanggan & tamu VIP Bandara
│   │   └── Faq.tsx                      # Accordion pertanyaan umum di beranda
│   ├── providers/                       
│   │   └── SmoothScroll.tsx             # Lenis smooth-scroll provider
│   └── ui/                              # Komponen UI atomik (Button, Badge, Modal)
│
├── constants/                           
│   └── navigation.ts                    # Daftar link rute menu navigasi website
│
├── lib/                                 
│   ├── data.ts                          # Pusat Data: Daftar 8 armada Batam, spesifikasi, tarif, & info PT
│   └── utils.ts                         # Class merging helper (cn utility)
│
├── public/                              # Aset Statis
│   ├── icons/                           
│   │   ├── icon-2.webp                  # Emblem & icon resmi transparan PT. Nadim Auto Transindo
│   │   └── logo.webp                    # Badge logo square
│   └── images/                          # Foto armada & background asli Batam
│       ├── background.webp              # Foto latar belakang VVIP Hang Nadim Airport
│       ├── mobil-22.webp                # Cutout transparan Toyota Alphard VIP (Hero display)
│       └── mobil-1.webp s/d mobil-21.webp # Foto asli armada mobil dan kantor fisik Batam
│
├── styles/                              
│   └── globals.css                      # Global Tailwind directives & styling
├── tailwind.config.js                   # Konfigurasi token warna gold & utilitas
├── DOCUMENTATION.md                     # File dokumentasi ini
└── package.json                         # Dependencies & scripts
```

---

## 4. Daftar Armada & Sinkronisasi Data Nyata Batam

Seluruh armada diatur terpusat di file [`lib/data.ts`](file:///c:/Users/User/Documents/Bidtech/bidtech-landing/projects/nadim-trans-rentcar/lib/data.ts). Informasi daftar harga asli diekstrak langsung ke sistem:

| ID | Nama Unit | Kategori | Tarif Sewa Harian | Foto Utama | Galeri Unit Nyata |
| :---: | :--- | :---: | :--- | :--- | :--- |
| **1** | **Toyota Alphard VIP** | MPV | **Rp 3.000.000** *(12 Jam Inc. Supir + BBM)* | `mobil-22.webp` | `mobil-4`, `mobil-9`, `mobil-18`, `mobil-1`, `mobil-6`, `mobil-19` |
| **2** | **Toyota Fortuner GR Sport** | SUV | **Rp 1.300.000** / Hari | `mobil-21.webp` | `mobil-16` *(Foto kantor fisik Batam)* |
| **3** | **Toyota Innova Zenix** | MPV | **Rp 600.000** / Hari | `mobil-14.webp` | `mobil-14` |
| **4** | **Hyundai Stargazer** | MPV | **Rp 400.000** / Hari | `mobil-8.webp` | `mobil-2` |
| **5** | **Toyota Avanza Facelift** | MPV | **Rp 350.000** / Hari | `mobil-17.webp` | `mobil-11` |
| **6** | **Toyota Raize Turbo** | SUV | **Rp 350.000** / Hari | `mobil-12.webp` | `mobil-7` |
| **7** | **Honda Brio** | City Car | **Rp 300.000** / Hari | `mobil-20.webp` | `mobil-20` |
| **8** | **Toyota Calya** | MPV | **Rp 300.000** / Hari | `mobil-15.webp` | `mobil-13` |

---

## 5. Implementasi Khusus Section Hero

- **Latar Belakang (`background.webp`)**: Foto nyata terminal kedatangan **VVIP Hang Nadim International Airport**. Dilapisi gradasi gelap halus di sisi kiri (`from-black/95 via-black/70 to-transparent`) untuk menjamin keterbacaan teks tanpa menutupi tulisan nama gedung bandara di sisi kanan.
- **Unit Mobil Utama (`mobil-22.webp`)**: Cutout resolusi tinggi unit Toyota Alphard hitam (plat BP 1510 VJ) dengan kontak bayangan ban di aspal jalan dan efek interaktif *mouse-parallax*.
- **Tanpa Elemen Mengganggu**: Badge teks VVIP yang sebelumnya menumpuk telah dihilangkan sehingga tampilan hero terlihat bersih dan fokus.

---

## 6. Panduan Pengelolaan (Cara Tambah / Edit Mobil)

Untuk menambah atau mengedit harga mobil, Anda cukup mengedit file **`lib/data.ts`**:

```typescript
// Contoh struktur objek mobil di lib/data.ts:
{
  id: 9,
  name: "Toyota Hiace Commuter",
  type: "Minibus Pariwisata",
  category: "Minibus",
  price: 1100000,
  priceFormatted: "1.100.000",
  priceNote: "per Hari (Include Supir)",
  image: "/images/mobil-nama.webp",
  gallery: ["/images/mobil-nama.webp", "/images/interior.webp"],
  rating: 4.9,
  reviews: 32,
  specs: {
    seats: 14,
    luggage: 6,
    transmission: "Manual",
    fuel: "Solar Diesel",
  },
  featured: true,
  description: "Pilihan terbaik untuk rombongan wisata atau dinas di Batam...",
  features: ["Kapasitas 14 Kursi", "Full AC Dingin", "Audio Multimedia"],
  included: ["Unit Kendaraan Prima", "Asuransi Perjalanan", "Bantuan Darurat 24 Jam"],
  terms: ["KTP / Paspor asli", "SIM aktif", "Deposit jaminan sewa"]
}
```

---

## 7. Perintah Menjalankan Proyek

1. **Menjalankan Dev Server Lokal**:
   ```bash
   npm run dev
   ```
   Buka peramban di `http://localhost:3000`.

2. **Membuat Build Produksi**:
   ```bash
   npm run build
   ```
   Menghasilkan 15 rute statis yang teroptimasi secara otomatis.
