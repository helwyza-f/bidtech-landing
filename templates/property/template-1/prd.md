# 📄 Product Requirements Document (PRD)
## BUILDINGBLOCKS — Architectural & Luxury Real Estate Platform

| Metadata | Details |
| :--- | :--- |
| **Document Version** | `1.0.0` |
| **Status** | Approved / Ready for Development |
| **Target Audience** | Ultra-High-Net-Worth Individuals (UHNWI), Luxury Real Estate Investors, Architectural Enthusiasts |
| **Target Platforms** | Web Responsive (Desktop, Tablet, Mobile) |
| **Tech Stack** | Next.js 14/15 (App Router), Tailwind CSS, GSAP + ScrollTrigger, Lenis Smooth Scroll, Lucide Icons |

---

## 1. Executive Summary & Product Vision

### 1.1 Product Vision
**BUILDINGBLOCKS** adalah platform landing page arsitektur dan properti residensial mewah yang mengombinasikan estetika editorial majalah kelas atas (*Swiss Architectural Editorial*) dengan interaktivitas web modern. Platform ini bertujuan untuk mempresentasikan portofolio properti ikonik, memvalidasi reputasi firma arsitektur, dan memfasilitasi akuisisi leads privat dari investor properti global.

### 1.2 Business Objectives
- **Brand Authority**: Membangun citra eksklusif setara publikasi arsitektur internasional (*Monocle*, *Architectural Digest*).
- **Lead Generation**: Mendorong calon pembeli mengajukan *Architectural Dossier Request* dan terhubung langsung via *Private Client Desk* (WhatsApp / Telepon).
- **Showcase Portfolio**: Menampilkan spesifikasi teknis denah (*floorplan*), visual resolusi tinggi, dan sebaran properti di 8 metropolitan hubs dunia.

---

## 2. Target Persona & User Profiles

| Persona | Profil & Karakteristik | Kebutuhan Utama |
| :--- | :--- | :--- |
| **Private Investor (UHNWI)** | Usia 35–60, mencari aset residensial premium di Dubai & kota global. | Denah arsitektur akurat, valuasi portofolio transparan, kontak privat yang cepat & diskrit. |
| **Architectural Collector** | Memprioritaskan nilai estetika, material bangunan premium, dan reputasi arsitek. | Eksplorasi craftsmanship visual, narasi filosofi arsitek, detail spesifikasi ruangan. |
| **Luxury Property Broker** | Agen perantara pembeli internasional. | Unduhan ringkasan portofolio (*Dossier*), navigasi peta multi-regional. |

---

## 3. Scope of Work (SOW) & Page Structure

Platform ini dirancang sebagai **Single-Page Editorial Flow** dengan 9 section utama:

1. **Sticky Glass Navigation Bar**: Branding monogram, link section internal, language switch, dan tombol kontak cepat.
2. **Hero Section (Sander House Showcase)**: Tipografi monumental H1 bertumpuk (*solid + outline*), visual properti utama, starburst badge, dan kartu metrik mengambang (*floating metric card*).
3. **Brand Philosophy Section**: Narasi visi brand, tanda tangan founder James Sander, kolase bentuk organik (*egg-shaped pebble collage*), dan 4 KPI tabular.
4. **Craftsmanship Gallery Section**: Grid 4 visual resolusi tinggi dengan navigasi carousel interaktif.
5. **About Us Feature (Split-Screen)**: Showcase visual vertikal, pilar dedikasi desain, dan 3 indikator statistik perusahaan.
6. **Signature Properties Showcase (Dark Canvas)**: Grid 4 kartu properti gelap berlatar kontras tinggi dengan counter `01 / 12` dan modal inspeksi denah.
7. **Interactive Global Locations Map**: Peta vektor dunia dengan titik koordinat berpendar (*radar pulse*) dan switcher informasi hub kota real-time.
8. **Contact & Vision CTA Banner**: Banner konversi eksklusif dengan integrasi langsung WhatsApp & Call desk.
9. **Swiss Grid Footer & Blueprint Modal**: Footer komprehensif 5-kolom, modal denah SVG interaktif, dan tombol back-to-top.

---

## 4. Functional Requirements (FR)

### FR-01: Navigation & Header
- **FR-01.1**: Header wajib berposisi *fixed / sticky* di bagian atas halaman.
- **FR-01.2 (Scroll State)**: Saat halaman di-scroll melewati `60px`, navbar bertransformasi menerapkan efek frosted glassmorphism (`backdrop-filter: blur(20px)` dengan warna latar semi-transparan `rgba(10, 10, 10, 0.85)` dan border `1px`).
- **FR-01.3 (Language Toggle)**: Tombol bahasa beralih antara `EN` dan `ID` secara dinamis.
- **FR-01.4 (Quick Call Pill)**: Tombol telepon mengarahkan ke protokol `tel:+923199492066`.
- **FR-01.5 (Mobile Drawer)**: Menu hamburger responsif yang membuka overlay navigasi layar penuh pada resolusi mobile (`< 1024px`).

### FR-02: Hero Typographic & Visual Layering
- **FR-02.1**: Tipografi display H1 `SANDER HOUSE` tersusun 2 baris:
  - Baris pertama: solid text putih.
  - Baris kedua: outline transparan (`-webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.9)`).
- **FR-02.2**: Starburst badge berputar kontinu (`animate-spin`) dengan durasi 8 detik.
- **FR-02.3**: Kartu metrik `400+ clients` menampilkan 3 avatar verified buyers dengan styling solid/high-contrast.
- **FR-02.4**: Tombol CTA `VIEW LAYOUTS` memicu pembukaan *Architectural Blueprint Modal*.

### FR-03: Brand Philosophy & Pebble Collage
- **FR-03.1**: Menampilkan 3 layer gambar asimetris dengan kurva organik khusus (*pebble radius*).
- **FR-03.2**: Hover effect pada elemen pebble memperbesar gambar secara halus (`scale: 1.05`) dengan durasi transisi `700ms`.
- **FR-03.3**: Empat KPI portofolio (`$1.4B+`, `24 Awards`, `99.4%`, `08 Hubs`) wajib dirender menggunakan font tabular (`tabular-nums`).

### FR-04: Craftsmanship Gallery Carousel
- **FR-04.1**: Menampilkan 4 foto arsitektur dalam format grid responsif.
- **FR-04.2**: Kontrol panah (*Next / Prev*) memicu animasi micro-interaction pergeseran visual menggunakan GSAP.
- **FR-04.3**: Mengklik salah satu kartu galeri membuka denah arsitektur terkait.

### FR-05: Signature Properties Showcase (Dark Mode Canvas)
- **FR-05.1**: Latar belakang bertema gelap (`#0A0A0A`) untuk menciptakan kontras dramatis dari section sebelumnya.
- **FR-05.2**: Setiap kartu properti memuat foto, nama unit, lokasi, dan tombol `VIEW DETAILS`.
- **FR-05.3**: Kontrol navigasi panah memperbarui nomor counter halaman secara berurutan (`01 / 12` hingga `12 / 12`).

### FR-06: Interactive Global Locations Map
- **FR-06.1**: Peta dunia vektor memuat titik pin interaktif untuk: **Dubai**, **Zurich**, **Jakarta**, dan **Singapore**.
- **FR-06.2 (Radar Pulse)**: Pin aktif memiliki efek animasi radar ripple berpendar.
- **FR-06.3 (Data Switching)**: Mengklik salah satu pin secara instan memperbarui judul kota, daftar sub-district, dan label tombol CTA di kartu detail sebelah kanan tanpa reload halaman.

### FR-07: Architectural Blueprint Modal & Lead Dispatch
- **FR-07.1**: Modal menyajikan denah vektor SVG ruangan (*Master Residence*, *Great Atrium*, *Pool Deck*), luas area ($m^2$), dan spesifikasi kamar.
- **FR-07.2**: Tombol `Request Full Architectural Dossier` menutup modal dan memicu notifikasi konfirmasi dispatch (*Toast notification*).

---

## 5. Non-Functional Requirements (NFR)

### 5.1 Performance & Speed
- **Lighthouse Performance Score**: Target $\ge 90$ pada desktop, $\ge 80$ pada mobile.
- **Core Web Vitals**:
  - *Largest Contentful Paint (LCP)*: $\le 2.0\text{ detik}$.
  - *Interaction to Next Paint (INP)*: $\le 100\text{ ms}$.
  - *Cumulative Layout Shift (CLS)*: $\le 0.05$.
- **Frame Rate**: Animasi GSAP dan Lenis scroll wajib berjalan stabil di $60\text{ fps}$ tanpa jank.

### 5.2 Accessibility & Usability (WCAG 2.1 AA)
- **Kontras Warna**: Seluruh teks utama (hitam di atas putih atau putih di atas hitam) harus memenuhi rasio kontras minimal $7:1$ (Level AAA) dan minimal $4.5:1$ (Level AA) untuk teks sekunder.
- **Touch Targets**: Semua tombol interaktif berukuran minimal $44 \times 44\text{ px}$ pada perangkat layar sentuh.
- **Keyboard Navigation**: Modal dapat ditutup menggunakan tombol `Escape` dan fokus trap aktif saat modal terbuka.

### 5.3 Typography & Design Integrity
- **Anti-Aliasing**: Mengaktifkan `-webkit-font-smoothing: antialiased` pada seluruh dokumen.
- **Tabular Numbers**: Seluruh angka metrik dan harga finansial wajib memakai `font-variant-numeric: tabular-nums` untuk mencegah perubahan layout width saat angka berubah.

---

## 6. Technical Architecture & Component Mapping

```
templates/property/template-1/
├── app/
│   ├── layout.tsx              # Root layout + Lenis Smooth Scroll Provider + Fonts
│   └── page.tsx                # Single Page Assembly (9 Core Sections)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky Glass Navbar + Mobile Drawer + Language Switch
│   │   └── Footer.tsx          # 5-Column Swiss Grid Footer + Back to Top
│   ├── sections/
│   │   ├── Hero.tsx            # H1 Sander House + Starburst + Floating Metric Card
│   │   ├── Philosophy.tsx      # James Sander Narrative + Pebble Collage + KPI Grid
│   │   ├── Craftsmanship.tsx   # Gallery Grid + Carousel Controller
│   │   ├── AboutUs.tsx         # Split-Screen Narrative + Pillars + Stats
│   │   ├── SignatureProps.tsx  # Dark Canvas Property Cards + Pagination Counter
│   │   ├── GlobalLocations.tsx # Interactive World Vector Map + City Detail Card
│   │   └── ContactBanner.tsx   # Conversion CTA + WhatsApp & Private Call Pill
│   ├── ui/
│   │   ├── BlueprintModal.tsx  # SVG Floor Plan Inspector + Dossier Request
│   │   └── Toast.tsx           # Lead Confirmation Toast
│   └── providers/
│       └── SmoothScroll.tsx    # Lenis Smooth Scroll Wrapper
├── lib/
│   ├── data.ts                 # Mock Dataset (Properties, Locations, Blueprints, KPIs)
│   └── utils.ts                # Tailwind merge helper (cn)
├── public/
│   └── images/                 # High-resolution architectural assets
├── styles/
│   └── globals.css             # Tailwind base, typography outlines, pebble masks
├── design.md                   # Design System & Token Specification
├── prd.md                      # Product Requirements Document
├── tailwind.config.js          # Extended theme tokens, keyframes & animations
└── package.json                # Dependencies & scripts
```