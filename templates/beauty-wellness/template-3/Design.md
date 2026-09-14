name: Agak Rapi — Precision Hair Architecture
description: Editorial brutalist grooming studio design system merging dark/light studio aesthetics with high-precision architectural drafting elements.
colors:
primary: "#D8F242"
primary-fg: "#0E0E10"
secondary: "#121214"
secondary-fg: "#F6F6F2"
background: "#F6F6F2"
background-dark: "#0C0C0E"
surface: "#FFFFFF"
surface-dark: "#141417"
surface-accent: "#EDEDE8"
surface-accent-dark: "#1C1C20"
text-primary: "#0E0E10"
text-primary-dark: "#F4F4F5"
text-muted: "#71717A"
text-muted-dark: "#9CA3AF"
border: "#E2E2DC"
border-dark: "#26262B"
accent-red: "#E11D48"
accent-blue: "#2563EB"
accent-amber: "#EAB308"
grid-line: "rgba(0, 0, 0, 0.05)"
grid-line-dark: "rgba(255, 255, 255, 0.05)"
typography:
display-2xl:
fontFamily: "Playfair Display, serif"
fontSize: "3.75rem"
fontWeight: 700
lineHeight: 1.08
letterSpacing: "-0.03em"
display-xl:
fontFamily: "Playfair Display, serif"
fontSize: "2.25rem"
fontWeight: 700
lineHeight: 1.2
letterSpacing: "-0.02em"
body-md:
fontFamily: "Inter, sans-serif"
fontSize: "0.875rem"
fontWeight: 400
lineHeight: 1.6
mono-ui:
fontFamily: "JetBrains Mono, monospace"
fontSize: "0.75rem"
fontWeight: 600
letterSpacing: "0.08em"
textTransform: "uppercase"
mono-telemetry:
fontFamily: "JetBrains Mono, monospace"
fontSize: "0.6875rem"
fontWeight: 500
letterSpacing: "0.1em"
textTransform: "uppercase"
rounded:
none: "0px"
xs: "2px"
sm: "4px"
md: "6px"
pill: "9999px"
spacing:
2xs: "2px"
xs: "4px"
sm: "8px"
md: "14px"
lg: "16px"
xl: "24px"
2xl: "32px"
3xl: "64px"
4xl: "96px"
components:
button-primary:
backgroundColor: "var(--text-main)"
textColor: "var(--bg-base)"
fontFamily: "JetBrains Mono, monospace"
fontSize: "0.75rem"
letterSpacing: "0.1em"
rounded: "2px"
padding: "10px 18px"
textTransform: "uppercase"
button-accent:
backgroundColor: "var(--accent-lime)"
textColor: "var(--accent-lime-fg)"
fontFamily: "JetBrains Mono, monospace"
fontSize: "0.75rem"
letterSpacing: "0.08em"
rounded: "4px"
padding: "12px 20px"
fontWeight: 700
card-editorial:
backgroundColor: "var(--bg-surface)"
borderColor: "var(--border-color)"
borderWidth: "1px"
rounded: "4px"
padding: "20px"
telemetry-box:
backgroundColor: "var(--bg-surface)"
borderColor: "var(--border-color)"
borderWidth: "1px"
rounded: "4px"
padding: "14px 16px"
hero-polaroid-frame:
padding: "10px"
rounded: "4px"
shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08)"
transformTransition: "0.3s cubic-bezier(0.16, 1, 0.3, 1)"
input-field:
backgroundColor: "var(--bg-base)"
borderColor: "var(--border-color)"
textColor: "var(--text-main)"
rounded: "4px"
padding: "10px 14px"
fontSize: "0.875rem"

1. Overview & Filosofi Desain

Agak Rapi mengusung filosofi Precision Hair Architecture. Desain ini memadukan ketegasan teknikal cetak biru (architectural blueprint drafting) dengan keanggunan tata letak majalah editorial kontemporer (high-fashion avant-garde).

Antarmuka dirancang agar tidak terasa seperti barbershop konvensional yang klise, melainkan layaknya laboratorium pemotongan rambut berakurasi tinggi dengan pengukuran sudut kranium kepala (Cranial Bone Mapping), alat sterilisasi UV medis, dan gunting baja tempa Jepang.

2. Color Palette & Roles

Sistem warna dibangun di atas fondasi adaptif dua lapis (Dual-Theme Tokens):

Primary Highlight (#D8F242 / Neon Lime / Chartreuse):

Peran fungsional: Penanda status aktif (indicator dot), aksen kata miring (italic highlight) pada headline Playfair Display, garis bawah navigasi aktif, dan aksen card centerpiece.

Aturan ketat: Dilarang digunakan sebagai background kanvas layar penuh; hanya boleh digunakan sebagai aksen mikro tajam.

Kanvas Netral (Light Editorial vs Dark Studio):

Light Canvas (#F6F6F2 / Paper Cream): Memberikan nuansa kertas majalah cetak mewah (warm alabaster), menjaga foto polaroid tetap kontras dan nyaman di mata tanpa membuat lelah saat membaca dalam durasi lama.

Dark Canvas (#0C0C0E / Deep Charcoal): Menghadirkan suasana ruang bedah presisi malam hari dengan saturasi aksen warna yang menyala.

Warna Permukaan (#FFFFFF light / #141417 dark):

Memberikan kedalaman bertingkat (tonal elevation) 1 tingkat di atas kanvas latar.

Aksen Polaroid Multi-Tone:

#EAB308 (Amber Yellow) untuk Spec #01 Skena Crop dan Lab Formula.

#2563EB (Cobalt Blue) untuk Comma Hair Calibration.

#E11D48 (Crimson Red) untuk Modern Mullet Vol. 04.

#27272A (Charcoal Slate) untuk 0.0mm Razor Blade Fade.

3. Typography & Hierarchy

Kombinasi 3 keluarga font yang memiliki kontras karakter tajam:

Display Serif — Playfair Display (Weight: 600, 700):

Digunakan khusus untuk headline utama editorial (H1 & H2).

Selalu kombinasikan kalimat tegas biasa dengan frasa aksen miring (italic) bersanding warna aksen primer (#D8F242).

Body & Form UI — Inter (Weight: 400, 500, 600):

Digunakan untuk teks deskripsi teknis, label formulir, dan paragraf panjang agar keterbacaan (readability) tetap maksimal pada semua ukuran layar.

Telemetry & Metadata — JetBrains Mono (Weight: 500, 600, 700):

Menggunakan karakter huruf kapital penuh (all-caps), spasi antar-huruf longgar (tracking-widest atau letter-spacing: 0.08em - 0.1em), serta diawali simbol teknikal seperti //, ++, ┌, ┘, dan [MAPS].

4. Layout, Grid & Spacing

Sistem Spasi: Kelipatan modular 4px / 8px.

Ukuran Maksimal Konten: 1280px (max-w-7xl) dengan horizontal padding 16px (mobile) hingga 32px (desktop).

Ritme Vertikal Section: Jarak antar bab minimal 80px hingga 112px (py-20 sampai py-28) untuk mempertahankan kesan ruang bernapas (editorial breathing room).

Drafting Grid: Area hero dilengkapi motif garis koordinat arsitek berukuran 32px x 32px dengan opasitas 5%.

5. Shape & Elevation

Radius Sudut:

Konsisten di sudut tajam mikro (2px sampai 4px).

Tidak menggunakan sudut membulat balon (>8px), kecuali elemen badge penanda status atau tombol pil penuh (rounded-full).

Elevasi & Kedalaman:

Menghindari efek bayangan kabur berat (blurry drop shadow).

Kedalaman struktural diciptakan lewat garis pembatas hairline 1px (#E2E2DC / #26262B) dan kartu tumpuk (layered surface).

6. Motion, Lenis, & GSAP Interaction

Smooth Scroll Physics (Lenis):

duration: 1.1, easing eksponensial halus.

Navigasi anchor meluncur otomatis dengan kompensasi offset navbar -60px.

GSAP Infinite Ticker Marquee:

1-line continuous loop dengan transform xPercent: -100.

Hover deceleration: timeScale melambat lembut ke 0.2 saat disentuh mouse.

Scroll-reactive velocity: Akselerasi otomatis ke 2.4x saat pengguna melakukan scroll cepat, lalu kembali mulus ke tempo normal.

Hero Collage Hover:

Kartu polaroid sedikit condong (-6° hingga +4°).

Saat hover, kartu melayang naik ke indeks paling atas (z-index: 40), membesar ke scale(1.05), kembali tegak rotate(0deg), dan memancarkan pendaran aksen neon lime halus.

7. Rules to Never Break (Prinsip Pantangan)

Dilarang memakai warna hitam pekat 100% tanpa batas: Selalu pertahankan garis pemisah hairline 1px arsitektural di setiap pembatas kartu dan section.

Dilarang menggunakan sudut membulat ramah SaaS (16px+): Bentuk harus mencerminkan ketajaman gunting dan pisau cukur berpresisi.

Dilarang membuat teks marquee melompat ke baris baru: Wajib membungkus track dengan kontainer flex-nowrap, overflow-hidden, dan lebar dinamis max-content.

Dilarang menghilangkan penanda navigasi aktif: Navigasi atas wajib menonjolkan section aktif via kombinasi font-weight: 800 dan garis bawah aksen (underline) neon lime.

Dilarang menggunakan placeholder teks Latin (Lorem Ipsum): Seluruh konten harus berupa data riil spesifikasi pangkas rambut, menit pengerjaan, harga rupiah, dan instruksi teknikal.