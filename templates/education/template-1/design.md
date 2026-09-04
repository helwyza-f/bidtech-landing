---
name: SmartBelajar Landing Page Design System
description: Friendly, clean, and accessible EdTech design system tailored for early childhood learning programs.
colors:
  primary: "#F97316"
  secondary: "#0284C7"
  tertiary: "#FBBF24"
  background: "#FFFFFF"
  surface: "#FFFFFF"
  surface-cream: "#FFFBEB"
  surface-blue: "#F0F9FF"
  text-primary: "#1E293B"
  text-secondary: "#64748B"
  border: "#E2E8F0"
  success: "#10B981"
  warning: "#F59E0B"
  error: "#EF4444"
typography:
  fontFamily: "'Nunito', sans-serif"
  h1:
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  h2:
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.25
  h3:
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
  body-md:
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label-sm:
    fontSize: "0.875rem"
    fontWeight: 600
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
  3xl: "64px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.full}"
    padding: "12px 28px"
    fontWeight: 700
    shadow: "0 4px 14px rgba(249, 115, 22, 0.3)"
  card-floating:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
    shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)"
  container-highlight:
    backgroundColor: "{colors.surface-cream}"
    rounded: "{rounded.xl}"
    padding: "{spacing.2xl}"
---

## Overview
SmartBelajar mengusung identitas visual EdTech yang hangat, ramah anak, dan menumbuhkan rasa percaya diri bagi orang tua. Tipografi bulat Nunito berpadu serasi dengan bentuk-bentuk organik (blobs) dan warna hangat ceria, menghadirkan kesan belajar mandiri yang menyenangkan tanpa kaku.

## Colors
- **Primary (#F97316):** Digunakan khusus untuk aksi utama (CTA button "Daftar Sekarang"), badge promo, dan aksen penting.
- **Secondary (#0284C7):** Digunakan untuk kata penekanan pada headline, ikon fitur sekunder, dan status link.
- **Warm Cream & Soft Blue:** Memberikan ritme visual antar-section agar tidak monoton putih, memisahkan konten fitur tanpa garis border keras.

## Typography (Nunito)
- **Nunito ExtraBold (800):** Khusus Hero Headline H1 dan angka metrik KPI.
- **Nunito Bold (700):** Section header (H2) dan nama program (H3).
- **Nunito Regular/Medium (400/500):** Teks penjelasan, subheadline, dan keterangan benefit.

## Layout & Motion (Lenis + GSAP)
- **Smooth Scroll:** Diinisialisasi menggunakan Lenis untuk scrolling yang fluid dan modern.
- **ScrollTrigger Animations:**
  - Entrance reveal menggunakan GSAP stagger pada kartu program dan metrik KPI.
  - Floating ambient motion pada blob dekoratif dan floating trust-badge di hero banner.

## Rules to Never Break
- Jangan gunakan sudut tajam/persegi kaku (`rounded-0`); pertahankan minimal `rounded-xl` atau `rounded-full`.
- Hindari shadow pekat/hitam pekat; gunakan shadow lembut beropacity rendah (`rgba(0,0,0,0.05)`).
- Jangan gunakan warna gelap pekat murni (`#000000`) untuk teks; selalu gunakan Slate Navy (`#1E293B`) untuk menjaga tone visual tetap bersahabat dan mudah dibaca.
```[cite: 1, 2]