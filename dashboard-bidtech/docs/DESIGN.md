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

## Pengecualian: Article Editor Immersive

Route create/edit artikel sengaja tidak memakai sidebar dan tidak mengikuti pola kartu form dashboard. Halaman daftar artikel tetap menggunakan shell dashboard normal.

### Struktur visual

- Sticky editor bar setinggi 72px desktop, 64px tablet, dan 60px mobile berisi kembali, status simpan, preview, moderasi, serta aksi Terbitkan/Update.
- Canvas dan hero cover membentang penuh pada desktop agar pengalaman menulis lebih immersive; H1 tetap inline di atas gambar dengan gradient gelap dan metadata pembuat/tanggal/waktu baca pada bar bawah hero.
- Body memakai reading column maksimal 760px. BlockNote tidak boleh terlihat seperti textarea berbingkai.
- Desktop dan tablet memakai banner edge-to-edge tanpa radius luar; mobile tetap edge-to-edge tanpa border penuh dan dengan kontrol yang ramah sentuh.
- Styling editor ditempatkan sebagai utility Tailwind langsung pada markup React/Blade; CSS native khusus editor tidak digunakan, termasuk untuk state responsif dan selector turunan BlockNote.
- Cover kosong atau gagal dimuat memakai `https://media.bidtech.co.id/bidtech/blog/placeholder.webp`.

### State dan interaksi

- Draft menampilkan `Menyimpan...`, `Tersimpan`, atau `Gagal menyimpan`; error selalu memiliki aksi coba lagi.
- Artikel terbit tidak autosave. Tombol Update aktif saat ada perubahan, dan navigasi keluar dilindungi selama perubahan belum tersimpan.
- Preview bersih memakai renderer BlockNote dan hero yang sama, tetapi mematikan caret, handle, toolbar, dan kontrol cover.
- Admin non-media melihat renderer read-only dan hanya memperoleh aksi moderasi yang diizinkan.
- Loading memakai skeleton berbentuk editor, bukan spinner di tengah layar. Empty body memakai placeholder BlockNote.
- Semua target sentuh mobile minimal 44px dan seluruh kontrol memiliki focus ring yang terlihat.

### Field yang tidak boleh muncul

Kategori, ringkasan/excerpt, slug, meta title, meta description, dan alt cover tidak menjadi input. Slug dan metadata SEO dihitung sistem; alt cover selalu mengikuti judul.
