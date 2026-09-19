---
name: Bidtech Client Portal
description: Clean SaaS client dashboard & order management system with forest green accents and full Lucide icon integration.
colors:
  primary: "#0E3B2E"
  primary-hover: "#144D3D"
  primary-light: "#E7F4EE"
  background: "#F4F6F5"
  surface: "#FFFFFF"
  text-primary: "#0B1B17"
  text-secondary: "#6B7B75"
  border: "#E4E9E6"
  border-light: "#F0F3F1"
  success: "#1E7A53"
  success-surface: "#E7F4EE"
  warning: "#B25E09"
  warning-surface: "#FDF3E7"
  danger: "#E53E3E"
typography:
  fontFamily: "Inter, 'Plus Jakarta Sans', system-ui, sans-serif"
  h1:
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  h2:
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
  body-md:
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label-sm:
    fontSize: "0.75rem"
    fontWeight: 500
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  sidebar-nav-active:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.lg}"
    padding: "12px 16px"
  card:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  button-outline:
    borderColor: "{colors.border}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
---

## Overview
Portal klien Bidtech dirancang untuk memberikan visibilitas penuh terhadap proses pembuatan website secara transparan, tenang, dan terstruktur. Menggunakan warna hijau hutan (*forest green*) yang melambangkan keandalan dan pertumbuhan teknologis tanpa kesan mencolok atau intimidatif.

## Iconography Standard
Menggunakan pustaka **Lucide Icons** dengan karakteristik:
- **Stroke Width:** 1.75px (konsisten pada seluruh interface).
- **Ukuran Standar:** 18px–20px untuk navigasi & tombol, 14px–16px untuk indikator status / pill badge.
- **Warna Ikon:** Mengikuti warna token teks konteksnya (misal: `#FFFFFF` di kartu aktif, `#6B7B75` di teks sekunder, `#1E7A53` pada status sukses).

Daftar Pemetaan Ikon:
- Navigasi: `LayoutDashboard`, `ReceiptText`, `UserCog`, `HelpCircle`, `LogOut`
- Status Kartu: `Globe`, `Activity`, `Layout`
- Timeline Progres: `Check`, `Loader2`, `CircleDot`, `Sparkles`
- Aksi & Kontak: `MessageCircle`, `FileDown`, `ArrowRight`, `ExternalLink`

## Colors & Roles
- **Primary (`#0E3B2E`):** Digunakan eksklusif untuk tombol navigasi aktif dan kartu sorotan utama (*Domain Status*).
- **Canvas Background (`#F4F6F5`):** Warna dasar latar yang memberikan kontras halus terhadap kartu putih murni.
- **Surface (`#FFFFFF`):** Kartu data dan panel konten.
- **Text-primary (`#0B1B17`):** Menghasilkan rasio kontras >15:1 (Lolos WCAG AAA).

## Shapes & Radius
- Kartu utama memakai kelengkungan `24px` (`rounded-3xl`) untuk memberikan kesan modern, ramah, dan tidak kaku.
- Elemen interaktif seperti tombol dan menu item menggunakan `10px–12px` (`rounded-xl`).
- Status indikator dan foto avatar menggunakan `full pill` (`rounded-full`).

## Rules to Never Break
- JANGAN gunakan *drop-shadow* gelap yang pekat atau *blurry*; gunakan pembatas hairline border `#E4E9E6`.
- JANGAN gunakan teks lorem ipsum; gunakan data riil domain, nomor invoice, dan format mata uang Indonesia (Rp).
- Pertahankan struktur 2 kolom yang rapi dengan navigasi *sticky* di sebelah kiri.