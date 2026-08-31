# BUILDINGBLOCKS — Architectural & Luxury Real Estate Design System

Editorial Swiss-inspired design system with high-contrast typography, organic pebble collage forms, and dual-tone light/dark spatial sections.

---

## Design Tokens & Specification

```yaml
name: BUILDINGBLOCKS — Architectural & Luxury Real Estate Design System
description: Editorial Swiss-inspired design system with high-contrast typography, organic pebble collage forms, and dual-tone light/dark spatial sections.

colors:
  primary: "#0A0A0A"
  secondary: "#171717"
  background: "#FFFFFF"
  background-dark: "#0A0A0A"
  surface-light: "#F9FAFB"
  surface-dark: "#171717"
  text-primary: "#0A0A0A"
  text-secondary: "#6B7280"
  text-dark-primary: "#FFFFFF"
  text-dark-secondary: "#A3A3A3"
  border-light: "#E5E7EB"
  border-dark: "#262626"
  accent-gold: "#FBBF24"
  glass-overlay: "rgba(10, 10, 10, 0.85)"

typography:
  display-hero:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "13.5rem"
    fontWeight: 900
    lineHeight: 0.85
    letterSpacing: "-0.04em"
    textTransform: "uppercase"
  display-h1:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  h2:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  h3:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
  signature:
    fontFamily: '"Playfair Display", Georgia, serif'
    fontSize: "1.75rem"
    fontWeight: 700
    fontStyle: "italic"
  body-md:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  label-caps:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    letterSpacing: "0.25em"
    textTransform: "uppercase"
  numeric-kpi:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 900
    fontVariantNumeric: "tabular-nums"
    letterSpacing: "-0.02em"

rounded:
  sm: "4px"
  md: "8px"
  lg: "16px"
  xl: "24px"
  "2xl": "32px"
  full: "9999px"
  pebble-large: "60% 40% 70% 30% / 50% 60% 40% 50%"
  pebble-sub-1: "40% 60% 50% 50% / 60% 40% 60% 40%"
  pebble-sub-2: "50% 50% 40% 60% / 40% 50% 50% 60%"

spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
  "4xl": "96px"
  "5xl": "128px"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-dark-primary}"
    rounded: "{rounded.full}"
    padding: "14px 28px"
    fontSize: "0.75rem"
    letterSpacing: "0.1em"
    textTransform: "uppercase"
    fontWeight: 700
  button-pill-white:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
    fontWeight: 700
  metric-floating-card:
    backgroundColor: "rgba(0, 0, 0, 0.6)"
    backdropBlur: "20px"
    border: "1px solid rgba(255, 255, 255, 0.2)"
    rounded: "{rounded.xl}"
    padding: "20px"
  property-card-dark:
    backgroundColor: "{colors.surface-dark}"
    border: "1px solid {colors.border-dark}"
    rounded: "{rounded.xl}"
    padding: "12px"
  location-interactive-card:
    backgroundColor: "{colors.background}"
    border: "1px solid {colors.border-light}"
    rounded: "{rounded.2xl}"
    padding: "24px"
```

---

## 1. Overview & Aesthetic Philosophy

Sistem desain **BUILDINGBLOCKS** memadukan estetika publikasi arsitektur kelas atas (*High-End Architectural Editorial*) dengan ketelitian struktural *Swiss Grid System*.

Fokus visual berpusat pada kontras spasial dramatis antara zona terang (*Daylight White Canvas*) dan zona gelap (*Twilight & Night Dark Canvas*), diiringi tipografi berskala monumental, bentuk organik *pebble collage*, serta penyajian data metrik tabular yang presisi.

---

## 2. Color Palette & Semantic Roles

| Token | Hex Value | Semantic Purpose |
| :--- | :--- | :--- |
| **Primary / Deep Pure** | `#0A0A0A` / `#000000` | Headline gelap, background dark canvas, tombol CTA utama, ikon solid |
| **Canvas Light** | `#FFFFFF` | Background utama section editorial, teks putih di hero/dark mode |
| **Surface Off-White** | `#F9FAFB` | Card background pada location map & area sekunder terang |
| **Surface Dark Canvas** | `#171717` | Card background properti signature & dropdown container |
| **Text Secondary** | `#6B7280` | Caption, metadata spesifikasi ruangan, deskripsi panjang |
| **Text Dark Muted** | `#A3A3A3` | Label sekunder dan subhead pada canvas bertema gelap |
| **Hairline Border Light** | `#E5E7EB` | Garis pembatas 1px antar section terang dan card boundary |
| **Hairline Border Dark** | `#262626` | Garis pembatas 1px pada dark canvas & divider footer |
| **Accent Gold / Amber** | `#FBBF24` | Badge sparkle rotasi, indikator kordinat, dan status aktif khusus |
| **Glass Overlay** | `rgba(10, 10, 10, 0.85)` | Backdrop blur overlay untuk modal dan floating navigation |

---

## 3. Typography Rules & Scale

### Display Typography (H1 Sander House)
- Menggunakan teknik **stacked dual-treatment**:
  - Baris pertama: *solid high-contrast text*
  - Baris kedua: *transparent outline text* (`-webkit-text-stroke: 1.5px rgba(255,255,255,0.9)`)
- Skala responsif berjenjang dari `4.5rem` (mobile) hingga `13.5rem` (desktop ultra-wide) dengan `letter-spacing: -0.04em` dan `line-height: 0.85`.

### Editorial Sub-Headings (H2 / H3)
- Menggunakan **Geometric Sans** tebal (`font-weight: 700-800`), `line-height: 1.15-1.25`, menyatu dengan narasi filosofis.

### Founder Signature
- **Playfair Display** (Italic, weight 700) untuk memberikan sentuhan humanis, personal, dan otentik pada blok filosofi James Sander.

### Tabular Figures for Pricing & Metrics
- Semua angka metrik (`$1.4B+`, `400+`, `24`, `08`) dan nomor halaman/counter (`01 / 12`) wajib menggunakan `font-variant-numeric: tabular-nums` untuk mencegah *layout jumping* saat interaksi berlangsung.

---

## 4. Spacing, Shapes & Elevation

### 4.1 Spacing Rhythm
Menggunakan basis `8px / 16px` grid rhythm:
- **Internal Card Padding**: `12px` (property card), `20px` (metric card), `24px` (location detail).
- **Section Vertical Spacing**: `96px – 128px` (`py-24` / `py-32`) untuk memastikan *generous whitespace* arsitektural.
- **Max Content Width**: Dibatasi pada `1440px` dengan padding lateral dinamis `px-6 md:px-12`.

### 4.2 Shapes & Radius Language
- **Pills (`9999px`)**: Seluruh primary CTA buttons, phone pill, tag kategori, dan pill verified buyer.
- **Architectural Cards (`16px – 24px`)**: Membungkus properti, layout modal, dan kontainer visual.
- **Organic Pebble / Egg Shapes (Collage Center)**:
  Bentuk kurva asimetris non-geometris (`border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%`) yang menampilkan 3 layer foto arsitektur overlapping.

### 4.3 Depth & Elevation
Menghindari *heavy drop-shadows* yang buram atau skeumorfik. Depth dihasilkan lewat:
- **Hairline 1px Borders** (`#E5E7EB` pada light mode, `#262626` pada dark mode).
- **Frosted Glassmorphism** (`backdrop-filter: blur(20px)` + `rgba(10, 10, 10, 0.85)`).
- **Glowing Coordinate Pulse** (animasi radar ripple untuk pin lokasi global).

---

## 5. Interaction & Motion Blueprint

- **Lenis Inertia Scrolling**: Menghilangkan stepped scroll default browser untuk menciptakan sensasi membaca majalah editorial mewah.
- **GSAP ScrollTrigger Parallax**:
  - Hero background bergerak halus pada `yPercent: 12` saat di-scroll ke bawah.
  - Text reveal staggers (`y: 30, opacity: 0` $\rightarrow$ `y: 0, opacity: 1`) saat memasuki section Philosophy & About Us.
- **Dynamic Location Switcher**:
  - Mengklik pin peta (Dubai, Zurich, Jakarta, Singapore) memperbarui kartu detail lokasi secara real-time dengan animasi GSAP fade-in bertahap.
- **Architectural Blueprint Modal**:
  - Menampilkan layout denah SVG presisi tinggi lengkap dengan spesifikasi kamar, luas area ($m^2$), dan action *Request Full Architectural Dossier*.

---

## 6. Rules to Never Break

1. 🚫 **Never use heavy multi-colored gradients**: Palet warna visual harus tetap monokromatik editorial (hitam, putih, neutral slate) dengan sentuhan hangat pencahayaan foto asli.
2. 🚫 **Never break tabular alignment on numbers**: Seluruh KPI data, valuasi portfolio, dan counter wajib mempertahankan angka tabular.
3. 🚫 **Never compromise whitespace**: Jangan memadatkan jarak vertikal antar-section; setiap blok karya arsitektur harus memiliki ruang bernafas (*breathing room*) minimal `96px`.
4. 🚫 **Never disable responsive outline scaling**: Tipografi outline `HOUSE` harus mempertahankan rasio stroke yang proporsional di seluruh resolusi layar.
