🍃 Teh.in — Design System & Technical Specification

Dokumentasi ini merangkum arsitektur visual, sistem desain (design tokens), hierarki lapisan kanvas (canvas layer stacking), interaksi paralaks, dan panduan komponen untuk landing page Teh.in — Kesegaran Teh Asli.

1. Filosofi Desain & Brand Identity

Esensi Merek: Kesegaran alami teh pegunungan tropis nusantara, diseduh segar secara artisanal tanpa pemanis buatan atau sirup sintetis.

Moodboard Visual: Organic, Zen-modern, Airy, Luxurious Minimalist. Memadukan estetika botanical garden dengan ketenangan kedai teh modern bernuansa Jepang-Skandinavia (Japandi).

Kesan Pengguna (User Emotion): Segar, haus terpuaskan (craving quenching), bersih, tepercaya, dan bernuansa premium namun tetap terjangkau.

2. Design Tokens & Color Palette

Palet warna dirancang berdasarkan warna pucuk daun teh hitam basah, seduhan teh berkarakter amber-emas, serta warna latar linen dan marmer alami.

Token Name

Hex Code

Peran / Penggunaan

Deskripsi Emosi

--color-brand

#2D4A27

Primary Buttons, Headline H1, Aksen Daun

Hijau teh pekat, alami, matang

--color-brand-dark

#1F331A

Teks judul kartu, teks utama, logo

Hijau lumut gelap, berwibawa

--color-brand-hover

#22381E

State hover tombol primary

Transisi tegas, responsif

--color-accent

#D49A3D

Bintang rating, badge "Best Seller"

Kuning amber gula tebu/madu

--color-canvas

#F5F2EB

Latar utama (body background)

Linen krem hangat, lembut di mata

--color-surface

#EBE6DA

Kartu sekunder, latar visual menu, footer

Abu-krem marmer podium

--color-card

#FDFBF7

Kartu menu, kartu testimoni

Putih tulang gading bersih

--color-olive

#5C6B57

Body paragraph, sub-header, divider

Hijau daun zaitun redup (muted)

3. Tipografi & Hierarki Font

Kombinasi 5 font Google Web Fonts untuk menciptakan kontras antara artisanal serif dan fungsionalitas modern:

[Logo / Brandmark]         -> Cormorant Garamond (700)
[Headline H1 & H2]         -> DM Serif Display (400)
[Artistic Handwriting]     -> Allura (Cursive Accent)
[Body Text / Paragraph]    -> DM Sans (400, 500, 700)
[Navigation / Badges / UI] -> Manrope (600, 700, 800 uppercase)


Panduan Skala Tipografi

Hero H1: 5rem (80px desktop) / 3rem (mobile), line-height: 0.98, font-family: 'DM Serif Display'.

Hero Script Accent: 2.65rem (42px), line-height: 1.1, font-family: 'Allura'. Berfungsi sebagai emotional hook.

Section Title (H2): 2.5rem (40px), line-height: 1.15.

Body Text: 0.96rem (15.4px), line-height: 1.6, color: var(--color-olive).

UI Badges & Overline Tags: 0.72rem (11.5px), letter-spacing: 0.12em, font-weight: 700, uppercase.

4. Arsitektur Hero Canvas & Multi-layer Stacking

Section Hero dirancang sebagai satu viewport penuh (100vh) dengan sistem tumpang-tindih (z-index hierarchy) untuk menciptakan ilusi ruang 3 dimensi:

[Viewport Top]
├── Layer Header (z-index: 35)
│   └── Transparan tanpa batas kaku, logo + nav-links + WhatsApp CTA
├── Layer 2: Parallax Dedaunan Atas (z-index: 2, mix-blend-mode: multiply)
│   └── Berkas: "ChatGPT Image 9 Sep 2026, 10.13.42.png"
├── Layer 1: Background Dinding Krem & Podium Marmer (z-index: 1)
│   └── Berkas: "ChatGPT Image 9 Sep 2026, 09.41.35.png" + Gradient Overlay
├── Layer Konten Hero (z-index: 10)
│   ├── Kolom Kiri: Teks H1, script sub-headline, deskripsi, dual CTA, metrik
│   └── Kolom Kanan (z-index: 5):
│       ├── Floating Stamp "Racikan Asli" (z-index: 10)
│       ├── Floating Pill "Diseduh Tiap 4 Jam" (z-index: 10)
│       └── Minuman Es Lemon (z-index: 1, margin-bottom: -55px)
└── Layer Bar Manfaat / Benefit Strip (z-index: 40)
    └── Frosted Glassmorphism (backdrop-filter: blur(16px)) menindih bagian bawah minuman
[Viewport Bottom]


Skema Kedalaman (Z-Index Matrix)

z-index: 1 : Background marmer dan podium dasar.

z-index: 2 : Dedaunan botani atas yang melayang dengan paralaks interaktif.

z-index: 5 : Kontainer minuman utama (dasar lempengan batu minuman menembus ke bawah kanvas sejauh -55px).

z-index: 12 : Kolom teks dan metrik (posisi rapat kiri dan sedikit terangkat -12px).

z-index: 35 : Header navigasi situs.

z-index: 40 : Benefit Strip Bar. Memiliki tingkat tertinggi di atas minuman dengan efek kaca buram (frosted glass), sehingga bagian bawah cangkir minuman dan batu marmernya terlihat terbiaskan di balik kaca secara fotorealistis.

5. Sistem Gerak & Interaksi Paralaks

5.1 Smooth Scroll Engine

Pustaka: Lenis Scroll (lenis@1.1.9).

Durasi: 1.2s.

Easing Formula: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) untuk transisi gulir roda mouse yang berbobot (inertial dampening).

5.2 GSAP ScrollTrigger (Dedaunan Atas)

Elemen Target: #parallax-leaves-2.

Perpindahan: y: 80px.

Scrubbing Factor: 1.3 (dedaunan meluncur lambat menciptakan efek latar bertingkat saat pengguna mulai melakukan scroll down).

5.3 Mouse-Tracking Interaction (Kursor Paralaks)

Mengukur posisi relatif mouse terhadap titik tengah kontainer hero:


$$\text{relX} = \frac{\text{clientX} - \text{rect.left}}{\text{rect.width}} - 0.5$$

$$\text{relY} = \frac{\text{clientY} - \text{rect.top}}{\text{rect.height}} - 0.5$$

Transformasi dinamis:

x: $\text{relX} \times -22\text{px}$

y: $\text{relY} \times -16\text{px}$

duration: 1.2s dengan ease: "power2.out".

6. Rincian Komponen & Struktur Halaman

A. Site Header (Transparan)

Tidak menggunakan latar belakang blok maupun garis pemisah (borderless).

Menyatu mulus langsung dengan dedaunan dan dinding krem di Layer 1.

Aksi CTA WhatsApp dengan ikon Phosphor (ph-whatsapp-logo) berbalut tombol kapsul hijau tua.

B. Hero Grid (2 Kolom Seimbang)

Kolom Teks (Kiri): Memiliki pre-tag daun, H1 bertingkat dengan ornamen ikon daun, teks kaligrafi aksen dengan garis dekoratif SVG gelombang, tombol ganda (Pesan via WhatsApp & Lihat Daftar Menu), serta 3 pilar data sosial (15.000+ Cup, Rating 4.9, 100% Halal).

Kolom Minuman (Kanan): Minuman beresolusi tinggi dengan skala maksimal max-width: 860px yang digeser sejauh translateX(-55px) agar terpusat harmonis ke tengah layar.

C. Frosted Benefit Strip Bar

Baris fitur ringkas 5 kolom di bagian bawah hero.

Menggunakan backdrop-filter: blur(16px) dan warna rgba(245, 242, 235, 0.48).

Fitur: Diseduh Segar Tiap Hari, 100% Gula Tebu Asli, Es Kristal RO Higienis, Cup Regular & Jumbo, serta slogan kaligrafi "Lebih dari Sekadar Teh".

D. Menu Favorit

Layout grid responsif (repeat(auto-fit, minmax(260px, 1fr))).

Kartu produk dengan visual preview container, badge kategori (Best Seller, Klasik, Favorit Tropis, Krimis Segar), nama menu, deskripsi rasa, label harga berkarakter serif tebal, dan tombol aksi langsung ke WhatsApp.

E. Tiga Pilar Keunggulan

Menggunakan penomoran besar berpendar (01, 02, 03) dengan opacity halus.

Fokus pada nilai pembeda: Pucuk Daun Pilihan Nusantara, Diseduh Tiap 4 Jam, dan 100% Gula Tebu Murni.

F. Ulasan & Testimoni Pelanggan

Format kartu ulasan berlatar ivory bersih (#FDFBF7) dengan bintang emas, kutipan rasa otentik dari pelanggan nyata, avatar inisial berbingkai lingkaran, dan keterangan persona.

G. Direktori Gerai & Kontak Cepat

Daftar gerai fisik (Batam Center, Nagoya Hill, Tiban Centre) lengkap dengan jam operasional harian dan status buka.

Kartu visual pelengkap dengan ajakan bertindak cepat untuk pemesanan take-away atau pengiriman instan.

H. Footer Situs

Sitemap terstruktur (Navigasi, Varian Menu, Layanan Kemitraan & Franchise).

Ikon sosial media Phosphor (Instagram, WhatsApp, Email).

7. Penyesuaian Responsif (Breakpoints)

Breakpoint

Target Layar

Penyesuaian Layout & Tipografi

Desktop Large (>1280px)

Monitor & iMac

Hero 2 kolom penuh, minuman berukuran maksimal 860px, seluruh elemen dekoratif aktif.

Desktop Medium (1024px - 1279px)

Laptop & iPad Pro

Minuman diskalakan ke 660px - 740px, padding hero disesuaikan.

Tablet (641px - 1023px)

iPad & Tablet

Grid hero beralih ke 1 kolom vertikal, navigasi desktop disederhanakan, strip benefit menjadi 2 baris.

Mobile (<640px)

Smartphone

Ukuran font H1 mengecil ke 3rem, teks script ke 2rem, tombol CTA ditumpuk vertikal dengan touch-target min 44px.

8. Spesifikasi Aset Gambar & Dependensi

Latar Belakang Podium: ChatGPT Image 9 Sep 2026, 09.41.35.png (Dinding krem bertekstur, podium marmer, kisi kayu vertikal).

Dedaunan Atas Parallax: ChatGPT Image 9 Sep 2026, 10.13.42.png (Dedaunan botani atas dengan transparansi alami via blend multiply).

Hero Drink Asset: ChatGPT Image 9 Sep 2026, 08.52.13.png (Minuman Es Teh Lemon berembun dingin di atas tatakan batu marmer bulat).

Library Eksternal:

GSAP 3.12.5 & ScrollTrigger.min.js (Animasi & Paralaks)

Lenis 1.1.9 (Smooth scrolling physics)

@phosphor-icons/web (Ikon UI)

<!-- STREAMING_CHUNK:Finalizing design specification file -->
