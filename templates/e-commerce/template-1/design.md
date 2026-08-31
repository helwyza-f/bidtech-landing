# KONTERKU --- Design System & Landing Page Concept

## 1. Overview

**KONTERKU** adalah landing page untuk konter smartphone yang menjual HP
baru, HP second, dan aksesoris.

Konsep utama:

> **Modern smartphone store dengan nuansa premium, clean, ringan, dan
> conversion-focused.**

Website hanya menggunakan **satu halaman landing page**. Produk tidak
memiliki halaman detail terpisah. Produk ditampilkan secara terbatas di
landing page dan CTA utama diarahkan ke WhatsApp.

Teknologi utama:

-   Next.js
-   GSAP
-   GSAP ScrollTrigger
-   Lenis
-   Tailwind CSS
-   Next/Image

------------------------------------------------------------------------

# 2. Design Direction

### Visual Keywords

-   Premium
-   Clean
-   Modern
-   Trustworthy
-   Minimal
-   Warm
-   Technology
-   Elegant

Website tidak boleh terlihat seperti marketplace.

Hindari:

-   Terlalu banyak card
-   Terlalu banyak badge
-   Sidebar filter
-   Warna terlalu ramai
-   Animasi berlebihan
-   Gradient yang terlalu kuat
-   Layout yang padat

Target visual:

> **Apple-like minimalism + warmth dari warna gold + karakter toko lokal
> yang terpercaya.**

------------------------------------------------------------------------

# 3. Color System

## Primary

### Gold / Champagne

``` text
Primary 500: #D9A441
Primary 600: #C58E2E
Primary 700: #A87522
```

Digunakan untuk:

-   CTA utama
-   Highlight headline
-   Active navigation
-   Icon penting
-   Accent line
-   Badge promo
-   Decorative elements

Gold jangan digunakan sebagai warna background utama dalam jumlah besar.

------------------------------------------------------------------------

## Dark / Text

### Navy Black

``` text
Text 900: #111827
Text 800: #172033
Text 700: #374151
```

Digunakan untuk:

-   Heading
-   Navigation
-   Primary text
-   Product name

Hindari pure black `#000000` agar tampilan lebih lembut.

------------------------------------------------------------------------

## Secondary Text

``` text
Text 600: #667085
Text 500: #98A2B3
```

Digunakan untuk:

-   Subtitle
-   Description
-   Metadata
-   Supporting information

------------------------------------------------------------------------

## Background

### Warm White

``` text
Background: #FCFCFA
Surface: #FFFFFF
Surface Soft: #F7F5F0
```

Background utama menggunakan warm white, bukan putih yang terlalu
dingin.

Tujuannya agar gold accent terlihat lebih natural dan premium.

------------------------------------------------------------------------

## Border

``` text
Border: #EAE7DF
Border Strong: #DAD5C9
```

Border sangat tipis dan tidak dominan.

------------------------------------------------------------------------

## Success

``` text
Success: #2F8F5B
Success Soft: #EAF6EF
```

Digunakan untuk:

-   Ready stock
-   Like New
-   Garansi
-   Status produk

------------------------------------------------------------------------

# 4. Typography

## Primary Font

Rekomendasi:

### Manrope

Alasan:

-   Modern
-   Bersih
-   Geometris
-   Bagus untuk UI
-   Cocok dengan smartphone / technology branding
-   Tetap nyaman dibaca dalam bahasa Indonesia

Alternatif:

-   Inter
-   Plus Jakarta Sans
-   DM Sans

Tetapi default utama tetap:

> **Manrope**

------------------------------------------------------------------------

# 5. Typography Scale

## Hero Heading

Desktop:

``` text
64px — 76px
Font Weight: 700 / 800
Letter Spacing: -0.04em
```

Contoh:

> Temukan\
> Smartphone\
> **Impianmu**

"Impianmu" menggunakan warna gold.

Mobile:

``` text
42px — 48px
Line Height: 1.05
```

------------------------------------------------------------------------

## Section Heading

``` text
42px — 52px
Font Weight: 700
Letter Spacing: -0.03em
```

Contoh:

> Produk Terbaru & Terlaris

Mobile:

``` text
32px — 36px
```

------------------------------------------------------------------------

## Body

``` text
16px — 18px
Line Height: 1.6
Font Weight: 400
```

------------------------------------------------------------------------

## Small Text

``` text
12px — 14px
Font Weight: 500 / 600
```

Digunakan untuk:

-   Badge
-   Label
-   Metadata
-   Category
-   Product condition

------------------------------------------------------------------------

# 6. Navbar

Navbar menggunakan layout minimal.

``` text
[K LOGO]          Home  Produk  Promo  Tentang Kami  Kontak

                                      [ WhatsApp ]
```

### Desktop

-   Height: 76--84px
-   Padding horizontal: 5--7vw
-   Background transparan ketika di hero
-   Setelah scroll: white / warm-white dengan sedikit blur

### Active navigation

Gunakan gold:

``` text
Home
────
```

Underline tipis 2px.

### Scroll behavior

Ketika user mulai scroll:

-   Navbar menjadi `position: fixed`
-   Background berubah menjadi semi-transparent white
-   `backdrop-filter: blur()`
-   Shadow sangat halus
-   Height sedikit mengecil

Animasi menggunakan GSAP.

------------------------------------------------------------------------

# 7. Hero Section

Hero adalah bagian paling visual dan cinematic.

## Layout

Desktop:

``` text
┌──────────────────────────────────────────────┐
│ NAVBAR                                       │
│                                              │
│  CONTENT                 PHONE VISUAL        │
│                                              │
│  KONTer HP               iPhone              │
│  TERPERCAYA              Samsung             │
│                          OnePlus             │
│  Temukan                                      │
│  Smartphone             Mountain             │
│  Impianmu                                     │
│                                              │
│  [Lihat Produk] [WhatsApp]                   │
│                                              │
│  Trust indicators                             │
└──────────────────────────────────────────────┘
```

Hero menggunakan banyak whitespace.

------------------------------------------------------------------------

# 8. Hero Typography

Eyebrow:

``` text
KONTER HP TERPERCAYA
```

-   Gold
-   13px
-   Weight 700
-   Uppercase
-   Letter spacing 0.08em

Headline:

> Temukan\
> Smartphone\
> **Impianmu**

Warna:

``` text
Temukan     #111827
Smartphone  #111827
Impianmu    #D9A441
```

------------------------------------------------------------------------

# 9. Hero CTA

Primary:

``` text
[Lihat Produk →]
```

Style:

-   Background gold
-   Text navy
-   Border radius 10--12px
-   Padding 14px 22px
-   Font weight 700

Hover:

-   Background sedikit lebih gelap
-   TranslateY -2px
-   Shadow bertambah sedikit

Secondary:

``` text
[ WhatsApp  Chat WhatsApp ]
```

Style:

-   White
-   Border #EAE7DF
-   Dark text

------------------------------------------------------------------------

# 10. Hero Phone Composition

Phone visual terdiri dari layer terpisah:

``` text
background
    ↓
decorative circles
    ↓
mountain
    ↓
iPhone
    ↓
OnePlus
    ↓
Samsung
```

Asset ideal:

``` text
iphone.png
samsung.png
oneplus.png
mountain.png
```

Semua menggunakan transparent background.

Tujuannya agar GSAP dapat memberikan parallax berbeda pada setiap objek.

------------------------------------------------------------------------

# 11. Hero Parallax Concept

Parallax menggunakan dua input:

### Mouse

Setiap HP memiliki movement berbeda.

``` text
iPhone: 18px
Samsung: 10px
OnePlus: 25px
Mountain: 5px
```

Tidak semua layer bergerak dengan nilai yang sama.

### Scroll

Saat user scroll:

``` text
Mountain → bergerak paling lambat
iPhone   → medium
Samsung  → lebih jauh
OnePlus  → medium
```

Gunakan:

-   GSAP
-   ScrollTrigger
-   scrub
-   Lenis

------------------------------------------------------------------------

# 12. Hero Entrance Animation

Saat halaman pertama dibuka:

1.  Navbar fade in
2.  Eyebrow slide up
3.  Headline muncul per line
4.  Description muncul
5.  CTA muncul
6.  Mountain muncul
7.  iPhone muncul
8.  Samsung muncul
9.  OnePlus muncul
10. Trust indicators muncul

Animasi tidak boleh terlalu cepat.

Durasi umum:

``` text
0.6s — 1.2s
```

Easing:

``` text
power3.out
expo.out
```

------------------------------------------------------------------------

# 13. Brand Strip

Setelah hero:

``` text
Apple   Samsung   Xiaomi   OPPO   vivo   realme   OnePlus
```

Warna logo dibuat muted gray.

Tidak menggunakan warna brand asli yang terlalu kuat.

Tujuan:

> Memberikan kesan bahwa toko menyediakan banyak pilihan brand.

Animasi:

-   Fade in
-   Stagger
-   Sedikit horizontal movement

------------------------------------------------------------------------

# 14. Product Section

Produk hanya ditampilkan sebagai bagian dari landing page.

Tidak membuat halaman `/produk`.

Section:

``` text
PILIHAN SMARTPHONE

Produk Terbaru & Terlaris
Berbagai pilihan smartphone dari brand terbaik.

[ Semua ] [ iPhone ] [ Samsung ] [ Xiaomi ]

┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│ PHONE  │ │ PHONE  │ │ PHONE  │ │ PHONE  │
│        │ │        │ │        │ │        │
│ Name   │ │ Name   │ │ Name   │ │ Name   │
│ Price  │ │ Price  │ │ Price  │ │ Price  │
└────────┘ └────────┘ └────────┘ └────────┘
```

Tampilkan sekitar:

> **4--6 produk saja**

Jangan membuat section terasa seperti katalog marketplace.

CTA:

``` text
[Lihat Semua Produk →]
```

Tetapi tetap berada dalam landing page atau membuka modal / drawer bila
diperlukan.

------------------------------------------------------------------------

# 15. Product Card

Card menggunakan:

``` text
Background: #FFFFFF
Border: #EAE7DF
Radius: 18px
```

Tidak menggunakan shadow besar.

Hover:

-   translateY(-6px)
-   image scale 1.04
-   shadow lembut
-   transition 300--500ms

Badge:

``` text
BARU
SECOND
LIKE NEW
```

Badge menggunakan ukuran kecil.

------------------------------------------------------------------------

# 16. Product Animation

Saat section masuk viewport:

``` text
Card 1
   ↓
Card 2
   ↓
Card 3
   ↓
Card 4
```

Gunakan stagger.

Contoh konsep:

``` text
stagger: 0.08 — 0.12
duration: 0.7
```

Animasi:

-   opacity 0 → 1
-   y 40 → 0
-   scale 0.98 → 1

Tidak perlu animasi berulang ketika user scroll naik turun.

------------------------------------------------------------------------

# 17. Why Choose Us

Section:

> Kenapa Pilih KONTERKU?

Empat value:

``` text
01  Produk Original
02  Garansi Resmi
03  Harga Terbaik
04  Pelayanan Terpercaya
```

Layout editorial, bukan card grid yang terlalu ramai.

Setiap item memiliki:

-   Number
-   Icon
-   Title
-   Short description
-   Horizontal line

Animation:

-   Number fade
-   Line expand
-   Content slide

------------------------------------------------------------------------

# 18. Promo Section

Promo menjadi section yang lebih visual.

Background:

``` text
#F7F5F0
```

Headline:

> Upgrade Sekarang, Dapatkan Harga Terbaik.

Accent:

Gold.

Phone image dapat diberi parallax ringan.

Jangan menggunakan flash-sale aesthetic yang terlalu ramai.

------------------------------------------------------------------------

# 19. About Section

Layout:

``` text
┌─────────────────────┐
│                     │
│      STORE IMAGE    │
│                     │
└─────────────────────┘

Tentang KONTERKU

Lebih dari sekadar toko HP.
```

Foto toko menggunakan image reveal.

Efek:

``` text
clip-path
scale
opacity
```

Text muncul setelah image reveal.

------------------------------------------------------------------------

# 20. Testimonial

Tampilan minimal.

Contoh:

``` text
★★★★★

"Pelayanannya ramah dan proses
cepat. HP sesuai dengan yang
dijelaskan."

Nama Pelanggan
```

Tampilkan 3 testimonial.

Tidak perlu membuat carousel yang terlalu agresif.

------------------------------------------------------------------------

# 21. Location

Section:

``` text
Kunjungi Toko Kami

Jl. [Alamat]
[Kota]

Jam Operasional
09.00 — 22.00

[Lihat di Google Maps →]
```

Map atau foto toko berada di sisi kanan.

------------------------------------------------------------------------

# 22. Final CTA

Final CTA harus kuat tetapi sederhana.

Headline:

> Siap Menemukan Smartphone Impianmu?

Subtext:

> Konsultasikan kebutuhan smartphone kamu bersama tim KONTERKU.

CTA:

``` text
[ Chat WhatsApp → ]
```

Background dapat menggunakan navy:

``` text
#111827
```

Accent gold:

``` text
#D9A441
```

Ini menjadi satu-satunya section utama dengan background gelap agar ada
kontras sebelum footer.

------------------------------------------------------------------------

# 23. Footer

Footer sederhana.

``` text
KONTERKU
Smartphone Store

Home
Produk
Promo
Tentang Kami
Kontak

WhatsApp
Instagram
Google Maps

© 2026 KONTERKU
```

Background:

``` text
#111827
```

Text:

``` text
#F9FAFB
```

Secondary text:

``` text
#98A2B3
```

Gold hanya untuk accent.

------------------------------------------------------------------------

# 24. Spacing System

Gunakan sistem spacing konsisten.

``` text
4px
8px
12px
16px
24px
32px
48px
64px
80px
96px
120px
```

Section desktop:

``` text
padding-top: 120px
padding-bottom: 120px
```

Hero:

``` text
min-height: 100svh
```

Mobile:

``` text
padding: 64px 20px
```

------------------------------------------------------------------------

# 25. Border Radius

Gunakan radius modern tetapi tidak terlalu rounded.

``` text
Small: 8px
Button: 10–12px
Card: 18px
Image: 20–24px
Large container: 28px
```

Hindari radius 50px pada card.

------------------------------------------------------------------------

# 26. Shadow

Shadow harus sangat subtle.

Default:

``` text
0 8px 30px rgba(17, 24, 39, 0.06)
```

Hover:

``` text
0 16px 40px rgba(17, 24, 39, 0.10)
```

Jangan menggunakan shadow hitam pekat.

------------------------------------------------------------------------

# 27. GSAP Animation Philosophy

GSAP digunakan untuk storytelling, bukan dekorasi berlebihan.

Prioritas:

### Level 1 --- Essential

-   Hero entrance
-   Scroll reveal
-   Product stagger
-   Image reveal
-   Navbar transition

### Level 2 --- Premium

-   Hero parallax
-   Phone movement
-   Promo parallax
-   Horizontal line animation

### Level 3 --- Optional

-   Mouse tracking
-   Floating decorative elements
-   Subtle 3D tilt

Jika performa turun, Level 3 yang pertama dihapus.

------------------------------------------------------------------------

# 28. Lenis

Lenis hanya bertanggung jawab untuk smooth scrolling.

Konsep:

``` text
User Wheel
    ↓
Lenis
    ↓
Smooth Scroll
    ↓
ScrollTrigger
    ↓
GSAP Animation
```

Lenis tidak digunakan sebagai animation engine.

------------------------------------------------------------------------

# 29. Responsive Strategy

## Desktop

Hero:

``` text
50% content
50% visual
```

Phone composition besar.

Parallax aktif.

Mouse interaction aktif.

------------------------------------------------------------------------

## Tablet

Phone visual diperkecil.

Parallax dikurangi.

Mouse interaction dapat dimatikan.

------------------------------------------------------------------------

## Mobile

Layout menjadi:

``` text
Navbar
↓
Headline
↓
Phone Visual
↓
CTA
↓
Trust
↓
Brand
↓
Product
```

Phone tidak terlalu besar.

Mouse parallax dimatikan.

Scroll animation tetap ada tetapi lebih ringan.

------------------------------------------------------------------------

# 30. Accessibility & Performance

Prioritas:

-   `prefers-reduced-motion`
-   Lazy load image di bawah fold
-   Gunakan WebP/AVIF
-   Gunakan Next/Image
-   Jangan animasikan layout properties
-   Prioritaskan `transform` dan `opacity`
-   Jangan menjalankan terlalu banyak GSAP tween bersamaan
-   Gunakan `gsap.context()` untuk cleanup
-   Gunakan responsive animation dengan `gsap.matchMedia()`

Untuk reduced motion:

``` text
prefers-reduced-motion: reduce
```

Animasi kompleks dimatikan dan diganti dengan fade sederhana.

------------------------------------------------------------------------

# 31. Overall Visual Formula

``` text
80% White / Warm White
15% Navy / Dark Text
5% Gold Accent
```

Kesan yang ingin dicapai:

> **Clean first, premium second, animation third.**

Bukan website yang terlihat seperti demo animasi.

------------------------------------------------------------------------

# 32. Final Art Direction

KONTERKU harus terlihat seperti:

> **Toko smartphone lokal yang memiliki standar visual brand premium.**

Hero adalah focal point.

Produk adalah proof.

Trust section membangun keyakinan.

Promo menjadi conversion point.

About dan location membangun kredibilitas.

Final CTA mengarahkan user ke WhatsApp.

Seluruh halaman harus terasa seperti satu cerita visual yang menyatu
dari atas sampai footer.


---

# 33. Detailed Color Tokens

The color system below is the canonical color reference for the entire project.

## Core Brand Colors

```text
Primary Gold:
#D9A441

Primary Gold Hover:
#C58E2E

Primary Gold Active:
#A87522

Warm White Background:
#FCFCFA

White Surface:
#FFFFFF

Soft Warm Surface:
#F7F5F0

Navy / Ink:
#111827
```

## Gold Scale

```text
gold-50:  #FFFBF3
gold-100: #FDF3DE
gold-200: #F7E3B5
gold-300: #EBCB82
gold-400: #E2B65D
gold-500: #D9A441
gold-600: #C58E2E
gold-700: #A87522
gold-800: #805819
```

`gold-500` is the primary KONTERKU brand color.

Use Gold for:

- Primary CTA
- Active navigation
- Headline highlights
- Important icons
- Accent lines
- Small badges
- Price accents
- Decorative elements

Do not use Gold as the dominant page background.

## Neutral / Typography Scale

```text
ink-900: #111827
ink-800: #172033
ink-700: #374151
text-600: #475467
text-500: #667085
text-400: #98A2B3
text-disabled: #C5CAD3
```

Recommended hierarchy:

```text
H1 / H2 / H3       #111827
Body               #475467
Secondary          #667085
Muted              #98A2B3
Disabled           #C5CAD3
```

Avoid pure black `#000000`.

## Background Scale

```text
background-main:   #FCFCFA
surface:           #FFFFFF
surface-soft:      #F7F5F0
gold-soft:         #FFFBF3
```

Recommended section rhythm:

```text
Hero          #FCFCFA
Brand Strip   #FFFFFF
Products      #FCFCFA
Why Us        #FFFFFF
Promo         #F7F5F0
About         #FCFCFA
Testimonials  #FFFFFF
Location      #F7F5F0
Final CTA     #111827
Footer        #111827
```

This alternation provides visual rhythm without introducing unnecessary colors.

## Border Scale

```text
border:        #EAE7DF
border-strong: #DAD5C9
dark-border:   #263044
```

Borders should remain subtle and should never dominate the layout.

## Semantic Colors

```text
success:      #2F8F5B
success-soft: #EAF6EF

whatsapp:     #25D366
```

WhatsApp green should primarily appear on the WhatsApp icon. Do not make the entire WhatsApp CTA bright green because it would compete with the KONTERKU brand color.

---

# 34. Color Usage Ratio

Recommended visual balance:

```text
80%  Warm White / White
15%  Navy / Dark Typography
5%   Gold Accent
```

This is a visual guideline, not a strict CSS rule.

The goal is:

> Clean first, premium second, animation third.

Gold should feel special because it is used sparingly.

---

# 35. Button Color Specifications

## Primary CTA

```text
Background: #D9A441
Text:       #111827
Hover:      #C58E2E
Active:     #A87522
Radius:     10–12px
```

Example:

```text
┌────────────────────────┐
│  Lihat Produk      →   │
└────────────────────────┘
```

## Secondary CTA

```text
Background: #FFFFFF
Text:       #111827
Border:     #EAE7DF
Hover BG:   #F7F5F0
Hover Border:
#DAD5C9
```

## Dark CTA

For the final CTA section:

```text
Section Background: #111827
Button Background:  #D9A441
Button Text:        #111827
Button Hover:       #C58E2E
```

---

# 36. Product Card Colors

```text
Card Background: #FFFFFF
Product Name:    #111827
Product Detail:  #667085
Price:           #111827
Price Accent:    #D9A441
Border:          #EAE7DF
```

Card hover:

```text
Background: #FFFFFF
Border:     #DAD5C9
```

Use shadows sparingly.

---

# 37. Hero Color Treatment

Hero should remain predominantly warm white.

Base:

```text
#FCFCFA
```

Subtle gold glow:

```css
radial-gradient(
  circle at 75% 40%,
  rgba(217, 164, 65, 0.08),
  transparent 35%
)
```

Decorative rings:

```css
border: 1px solid rgba(217, 164, 65, 0.12);
```

Do not use strong gold-to-orange gradients.

The phones remain the visual focal point.

---

# 38. Dark Section Color Treatment

Only the Final CTA and Footer use the dark palette.

```text
Background:        #111827
Primary Text:      #FFFFFF
Secondary Text:    #D1D5DB
Muted Text:        #98A2B3
Accent:            #D9A441
Border:            #263044
```

This creates a strong contrast near the end of the page without making the entire website dark.

---

# 39. Typography Color Examples

Hero:

```text
Temukan      #111827
Smartphone   #111827
Impianmu     #D9A441
```

Section heading:

```text
#111827
```

Body copy:

```text
#475467
```

Small supporting text:

```text
#667085
```

Muted metadata:

```text
#98A2B3
```

---

# 40. CSS Variable Reference

Recommended root tokens:

```css
:root {
  --background: #FCFCFA;
  --surface: #FFFFFF;
  --surface-soft: #F7F5F0;

  --gold-50: #FFFBF3;
  --gold-100: #FDF3DE;
  --gold-200: #F7E3B5;
  --gold-300: #EBCB82;
  --gold-400: #E2B65D;
  --gold-500: #D9A441;
  --gold-600: #C58E2E;
  --gold-700: #A87522;
  --gold-800: #805819;

  --ink-900: #111827;
  --ink-800: #172033;
  --ink-700: #374151;
  --text-600: #475467;
  --text-500: #667085;
  --text-400: #98A2B3;
  --text-disabled: #C5CAD3;

  --border: #EAE7DF;
  --border-strong: #DAD5C9;
  --dark-border: #263044;

  --success: #2F8F5B;
  --success-soft: #EAF6EF;
  --whatsapp: #25D366;
}
```

This section is the source of truth for colors during implementation.
