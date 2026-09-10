# Teh.in — Landing Page Template UMKM (Minuman Tradisional & Modern)

Template landing page modern bernuansa *Organic, Zen-modern, Airy, Luxurious Minimalist* yang dirancang khusus untuk pelaku UMKM kuliner & minuman (food and beverage).

---

## 🎨 Fitur Utama

- 🍃 **Arsitektur Hero Multi-Layer**: Menampilkan kedalaman visual kanvas dengan bayangan dedaunan alami dan produk HD berembun dingin.
- 🧊 **Frosted Glass Benefit Strip**: Baris ringkas penanda kualitas (Diseduh Segar Tiap 4 Jam, 100% Gula Tebu Asli, Es Kristal RO, Pilihan Ukuran Regular & Jumbo).
- 🍹 **Katalog Menu Favorit Interaktif**: Dilengkapi tombol pemesanan langsung terintegrasi dengan pesan otomatis WhatsApp.
- 🌿 **3 Pilar Keunggulan Artisanal**: Menonjolkan standar mutu dan higienitas produk lokal.
- ⭐ **Testimonial & Social Proof**: Ulasan pelanggan nyata, rating bintang 4.9, dan metrik 15.000+ cup per bulan.
- 📍 **Direktori Gerai Fisik & Quick Order**: Daftar cabang aktif dilengkapi tautan Google Maps.
- 💬 **Floating Quick WhatsApp Action**: Tombol melayang untuk kemudahan konversi pengunjung di perangkat mobile & desktop.
- 📱 **Fully Responsive**: Dioptimalkan sempurna untuk desktop, tablet, dan smartphone.
- 🔍 **SEO & Performance Ready**: Metadata komprehensif, semantic HTML, dan pemuatan gambar Next.js Image teroptimasi.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Vanilla CSS Tokens
- **Icons:** Lucide React
- **Typography:** Google Fonts (DM Serif Display, Cormorant Garamond, Allura, DM Sans, Manrope)

---

## 🚀 Menjalankan Project

```bash
# 1. Masuk ke direktori template
cd templates/umkm/template-1

# 2. Install dependensi
npm install

# 3. Jalankan server pengembangan lokal
npm run dev

# 4. Buka di browser
# http://localhost:3000
```

---

## 📂 Struktur Direktori

```
├── app/
│   ├── layout.tsx         # Root layout, Google Fonts, & metadata SEO
│   └── page.tsx           # Assembly komponen utama
├── components/
│   ├── Header.tsx         # Transparent sticky navigation & mobile drawer
│   ├── Hero.tsx           # Multi-layer canvas, headline, CTA, & benefit strip
│   ├── MenuSection.tsx    # Katalog varian menu favorit & WhatsApp CTA
│   ├── KeunggulanSection.tsx # Tiga pilar keunggulan kualitas
│   ├── TestimonialSection.tsx # Ulasan pelanggan & rating
│   ├── LocationSection.tsx # Informasi gerai fisik & quick order
│   ├── Footer.tsx         # Sitemap, legal, & social links
│   └── FloatingWhatsApp.tsx # Floating quick order button
├── public/
│   └── assets/            # Aset gambar HD terpotong transparan (individual & sheets)
├── styles/
│   └── globals.css        # CSS variables, utility glassmorphism, & styles
└── design.md              # Spesifikasi teknis desain sistem Teh.in
```
