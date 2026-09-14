# Agak Rapi — Precision Hair Architecture (Beauty & Wellness Template 3)

Template website editorial brutalist untuk studio perawatan rambut pria, barbershop spesialis, dan grooming laboratory dengan presisi tinggi.

## 🎨 Features

- 📐 **Editorial Brutalist Drafting Aesthetic**: Memadukan layout majalah mode avant-garde dengan ketegasan cetak biru arsitektur.
- ⚡ **Dual-Theme Adaptive Engine**: Mode ganda Light Editorial Paper (#F6F6F2) dan Dark Studio (#0C0C0E) dengan persistensi localStorage.
- 🎞️ **Interactive Hero Polaroid Stage**: 6 kartu polaroid multi-warna dengan efek hover rotasi tegak, elevasi, dan neon lime glow.
- 💫 **GSAP Kinetic Marquee Loop**: Ticker satu baris kontinu dengan hover deceleration (0.2x) dan scroll velocity boost (2.4x).
- 🔬 **Live Spec Inspector**: Pemilihan model potongan rambut yang otomatis menginspeksi kecocokan bentuk wajah, perkakas, dan durasi presisi secara real-time.
- 📅 **Integrated Direct Booking Funnel**: Formulir jadwal kunjungan dengan validasi minimal tanggal hari H, sinkronisasi model katalog, dan notifikasi sukses in-page.
- 📜 **Lenis Smooth Scroll Physics**: Scroll halus dengan kompensasi offset navbar anchor (-60px).
- 🧭 **Real-time ScrollSpy**: Header bar memantau posisi vertikal dengan indikator teks tebal (font-weight: 800) dan garis bawah neon lime 3px.

## 🛠️ Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Library UI:** React 19
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS (Custom Theme Tokens)
- **Animasi & Scroll:** GSAP 3 + Lenis Smooth Scroll
- **Font:** Playfair Display (Display Serif), Inter (Sans), JetBrains Mono (Telemetry)

## 🚀 Quick Start

```bash
# 1. Masuk ke direktori template
cd templates/beauty-wellness/template-3

# 2. Install dependencies
npm install

# 3. Jalankan server development
npm run dev

# 4. Buka di browser
# http://localhost:3000
```

## 📝 Customization Points

- **Data Potongan & Harga**: Edit di `data/haircuts.ts`
- **Konfigurasi Studio (Alamat, Jam, WA)**: Edit di `data/site.ts`
- **Standar Filosofi**: Edit di `data/standards.ts`
- **Palet Warna & CSS Tokens**: Edit di `styles/globals.css` & `tailwind.config.js`
- **Metadata & SEO**: Edit di `app/layout.tsx`

## 📂 Folder Structure

```
template-3/
├── app/                  # Next.js App Router (layout & page)
├── components/           # Modular components (layout, providers, sections, ui)
├── data/                 # Pure data layer (haircuts, site, standards)
├── lib/                  # Utilities (utils.ts)
├── styles/               # Global CSS & theme tokens
├── public/               # Static assets & images
├── Design.md             # Design system specifications
├── PRD.md                # Product Requirements Document
├── README.md             # Template overview
└── INSTALLATION.md       # Installation & deployment guide
```

---
© 2026 Bidtech Templates — Beauty & Wellness Collection.
