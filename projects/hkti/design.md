---
name: DPC HKTI Kota Batam
description: Design system tokens for DPC Himpunan Kerukunan Tani Indonesia Kota Batam (2026–2030)
colors:
  primary: "#115E41"
  primary-dark: "#0B3525"
  primary-surface: "#166534"
  secondary: "#BF8E3D"
  secondary-dark: "#8C6424"
  secondary-light: "#E8DFCE"
  background: "#FFFFFF"
  surface: "#F0FDF4"
  surface-alt: "#F0F5FA"
  surface-card: "#F0F7FF"
  text-primary: "#0F172A"
  text-secondary: "#475569"
  text-muted: "#94A3B8"
  text-inverse: "#FFFFFF"
  border: "#E2E8F0"
  border-subtle: "#E0EDFB"
  success: "#10B981"
  warning: "#F59E0B"
  error: "#EF4444"
typography:
  fontFamily: "Plus Jakarta Sans, sans-serif"
  h1:
    fontFamily: "{typography.fontFamily}"
    fontSize: 3rem
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: -0.02em
  h2:
    fontFamily: "{typography.fontFamily}"
    fontSize: 2rem
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: -0.01em
  h3:
    fontFamily: "{typography.fontFamily}"
    fontSize: 1.25rem
    fontWeight: 700
    lineHeight: 1.4
  body-lg:
    fontFamily: "{typography.fontFamily}"
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: "{typography.fontFamily}"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "{typography.fontFamily}"
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.5
  label-caps:
    fontFamily: "{typography.fontFamily}"
    fontSize: 0.6875rem
    fontWeight: 700
    letterSpacing: 0.05em
    textTransform: uppercase
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  2xl: 24px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 80px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-inverse}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
    fontWeight: 600
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
  button-accent:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.text-inverse}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    fontWeight: 700
  card-default:
    backgroundColor: "{colors.background}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  card-hero:
    backgroundColor: "rgba(22, 101, 52, 0.75)"
    border: "1px solid rgba(255, 255, 255, 0.15)"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  input:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-primary}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
---

## Overview
Sistem desain resmi DPC HKTI Kota Batam periode 2026–2030 merefleksikan karakter kelembagaan agrikultur modern yang tepercaya, formal, dan berdaya saing. Perpaduan nuansa *Forest Green* dan aksen *Harvest Gold* mengakar kuat pada identitas kemandirian pangan, sementara struktur berbasis kisi (*grid-based*) menjaga keterbacaan data dan program kerja secara terstruktur.

## Colors
- **Primary (`#115E41`)**: Identitas pokok organisasi. Digunakan secara eksklusif untuk tombol aksi utama (*primary CTA*), tajuk visual, *state* menu aktif, serta aksen status utama.
- **Secondary (`#BF8E3D`)**: Merepresentasikan kemakmuran dan hasil panen. Digunakan untuk *banner* semboyan, tombol penekanan khusus (*Jelajahi Visi & Misi*), serta sorotan subjudul kelembagaan.
- **Surface (`#F0FDF4`, `#F0F5FA`)**: Tingkatan warna permukaan lembut untuk memisahkan hierarki modul (kartu visi dan *footer*) tanpa membebani mata.
- **Text Primary (`#0F172A`)**: Kontras tinggi terhadap latar putih dan *surface* (melebihi rasio 12:1, lolos kualifikasi WCAG AAA).

## Typography
- **Font Family**: Tunggal menggunakan *Plus Jakarta Sans* pada seluruh tingkatan hierarki untuk menjamin konsistensi geometri modern yang bersih.
- **Display & Headings**: Menggunakan bobot *Bold* (700) hingga *Extrabold* (800) dengan kerapatan huruf negatif (*tight tracking*) untuk memberikan kesan otoritatif dan kokoh.
- **Body Text**: Menggunakan bobot *Regular* (400) dan *Medium* (500) dengan *line-height* longgar (1.5–1.6) demi keterbacaan optimal pada teks program kerja panjang.

## Spacing & Layout
- **Base Grid**: Mengikuti skala ritme kelipatan 4px/8px.
- **Container**: Lebar maksimal konten dibatasi pada `1280px` (`max-w-7xl`) dengan penataan tepi responsif (`px-4 sm:px-6 lg:px-8`).
- **Section Rhythm**: Pemisah vertikal antarbagian menggunakan rentang 64px hingga 80px untuk menjaga ruang napas visual (*whitespace*).

## Shapes
- **Radius Disiplin**: Elemen interaktif mikro (tombol, formulir input, dan label kecil) menggunakan radius 8px (`rounded-md`), sedangkan kartu informasi dan kontainer modul menggunakan radius 12px–16px (`rounded-lg` hingga `rounded-xl`).
- **Pill Shape**: Radius penuh (`9999px`) diperuntukkan bagi *badge* kategori, indikator status, serta *pill* semboyan.

## Elevation & Depth
- **Strategi Kedalaman**: Dominan *flat* dengan garis batas halus (*1px hairline border*). Bayangan lembut (`0 1px 3px rgba(0,0,0,0.05)`) hanya diaktifkan pada *state hover* untuk memberikan umpan balik taktil (*affordance*) tanpa mengurangi formalitas visual.

## Rules to Never Break
- Tidak boleh mengganti famili huruf *Plus Jakarta Sans* dengan sans-serif generik lain.
- Tidak boleh menerapkan bayangan berat (*heavy/offset shadow*) pada kartu informasi.
- Aksen emas (`#BF8E3D`) tidak boleh digunakan sebagai warna latar teks paragraf panjang demi menjaga standar aksesibilitas kontras.