# Template-2: Construction & Industrial Landing Page

Template landing page modern, berkinerja tinggi, dan siap pakai untuk perusahaan rekayasa sipil, kontraktor pertambangan, dan rental armada alat berat skala nasional.

## 🎯 Gambaran Desain
- **Hero Section:** Mengikuti konsep orbital lingkaran konsentris (*Fixbild reference*) dengan tipografi tegas kapital, floating badge interaktif, dan aset cutout dump truck tambang CAT 797F kuning tanpa background.
- **Katalog Armada:** Tab interaktif spesifikasi teknis (Daya Mesin HP, Kapasitas Muatan Ton, Berat GVW).
- **Standar Mutu:** Kepatuhan K3, SILO, dan Kemnaker RI.
- **Portofolio & Tim:** Dokumentasi proyek infrastruktur dan profil insinyur berlisensi.
- **Tender Quote:** Formulir estimasi sewa terintegrasi.

## 📁 Struktur Direktori Sesuai Standar
- `app/`: Next.js App Router (layout, page, 404, dan sub-rute about, services, contact).
- `components/`: Komponen modular (Header, Hero, Services, Features, Projects, Team, Testimonials, CTA, Footer, and common/).
- `lib/`: Utilities (`utils.ts`), data terpusat (`constants.ts`), palet warna (`colors.ts`).
- `styles/`: Tailwind CSS, custom variables, dan animasi orbit.
- `public/`: Asset visual teroptimasi (`dump-truck.png`).
- `screens/`: Preview screenshot desktop, subpage, dan mobile.
- `docs/`: Dokumentasi fitur, kustomisasi, dan warna.

## 🚀 Menjalankan Project
```bash
# Jalankan dev server
npm run dev

# Build untuk produksi
npm run build
```
Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.
