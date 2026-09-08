# DPC HKTI Kota Batam — Organization Template 3

Template website profil kelembagaan dan organisasi modern untuk **Dewan Pimpinan Cabang Himpunan Kerukunan Tani Indonesia (DPC HKTI) Kota Batam (Periode 2026–2030)** berbasis **Next.js (App Router)** dan **Tailwind CSS**.

Template ini dirancang dengan standar desain formal, berwibawa, dan premium menggunakan palet warna *Forest Green* (`#115E41`) dan aksen *Harvest Gold* (`#BF8E3D`), dilengkapi transisi animasi dinamis menggunakan **Framer Motion**.

---

## 🎨 Fitur Utama

- ✨ **Hero Section Berwibawa:** Lengkap dengan metadata kepengurusan 2026–2030, kartu semboyan *"HKTI JAYA – TANI MAKMUR"*, dan tombol CTA interaktif.
- ✨ **Aksentuasi Pita Semboyan:** Pita warna emas penegas identitas kemandirian pangan maritim.
- ✨ **5 Pilar Arah Perjuangan:** Grid interaktif 5 pilar gerakan tani dengan efek kartu elevasi bertahap (*staggered animation*).
- ✨ **Visi & 9 Butir Misi Strategis:** Kartu kutipan Visi Utama 2026–2030 serta Bento Grid 3x3 untuk 9 butir misi hasil Muscab.
- ✨ **Galeri Dokumentasi Kegiatan:** Layout bento asimetris dengan arsip foto resolusi tinggi dan fitur pratinjau modal *Lightbox*.
- ✨ **Sekretariat & Formulir Aspirasi:** Informasi hotline, alamat sekretariat, jam kerja, serta formulir aspirasi tani interaktif dengan validasi dan notifikasi mengambang (*Toast*).
- ✨ **Footer Institusi Lengkap:** Menampilkan lambang resmi HKTI, navigasi cepat, kontak, dan hak cipta.
- ✨ **Desain Sepenuhnya Responsif:** Optimal di layar desktop, tablet, dan ponsel pintar.
- ✨ **Animasi Teks & Gambar Halus:** Didukung `framer-motion` untuk *scroll reveal*, *staggered children*, dan *spring transitions*.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14+ (App Router)](https://nextjs.org/)
- **UI & Logic:** [React 18+](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography:** Plus Jakarta Sans (Google Fonts)

---

## 📁 Struktur Folder

```
template-3/
├── app/
│   ├── layout.tsx             # Root layout, metadata SEO, font setup
│   ├── page.tsx               # Halaman utama landing page
│   └── galeri/
│       └── page.tsx           # Halaman dedicated arsip galeri kegiatan
├── components/
│   ├── layout/
│   │   ├── Header.tsx         # Navbar sticky, logo, mobile menu, multi-route support
│   │   └── Footer.tsx         # Footer kelembagaan resmi
│   ├── sections/
│   │   ├── Hero.tsx           # Hero section & CTA
│   │   ├── SloganRibbon.tsx   # Pita semboyan emas
│   │   ├── Pillars.tsx        # 5 Pilar Arah Perjuangan
│   │   ├── VisionMission.tsx  # Visi & 9 Butir Misi Bento Grid
│   │   ├── Gallery.tsx        # Bento galeri dokumentasi kegiatan beranda
│   │   ├── GaleriClient.tsx   # Komponen interaktif galeri (filter & lightbox)
│   │   └── ContactSection.tsx # Info kantor & formulir aspirasi
│   └── ui/
│       ├── Breadcrumb.tsx     # Navigasi rekam jejak halaman
│       ├── LightboxModal.tsx  # Modal pratinjau foto resolusi tinggi dengan navigasi
│       ├── MotionWrapper.tsx  # Wrapper animasi FadeIn & Stagger
│       └── Toast.tsx          # Notifikasi mengambang kustom
├── constants/
│   └── index.ts               # Data teks, misi, pilar, galeri, kontak
├── lib/
│   ├── colors.ts              # Nilai warna resmi HKTI
│   └── utils.ts               # Helper class dan resolver asset
├── public/
│   └── images/                # Asset logo & ratusan foto kegiatan webp
├── styles/
│   └── globals.css            # Variabel CSS & konfigurasi dasar Tailwind
├── design.md                  # Dokumentasi token sistem desain
├── package.json               # Dependensi proyek
└── tsconfig.json              # Konfigurasi TypeScript
```

---

## 🚀 Panduan Menjalankan

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Menjalankan Development Server
```bash
npm run dev
```
Buka peramban di [http://localhost:3000](http://localhost:3000).

### 3. Membangun untuk Produksi
```bash
npm run build
```

---

## 📝 Kustomisasi

- **Warna & Brand:** Ubah token warna di `lib/colors.ts` dan `tailwind.config.js`.
- **Konten Teks & Data:** Edit data pilar, butir misi, kontak, dan alamat di `constants/index.ts`.
- **Aset Gambar:** Letakkan foto baru di `public/images/` dan perbarui daftarnya di `constants/index.ts`.

---

## 📄 Lisensi
Bidtech Templates — Hak Cipta Dilindungi Undang-Undang.
