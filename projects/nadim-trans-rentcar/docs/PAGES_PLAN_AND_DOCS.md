# Dokumen Rencana & Arsitektur Halaman Menu (Plan & Docs)
## Website Nadim Trans RentCar (PT. Nadim Auto Transindo)

Dokumen ini memuat perencanaan strategis (*Plan*), hierarki antarmuka (*UI/UX Architecture*), alur data (*Data Flow*), serta dokumentasi teknis (*Docs*) dari setiap halaman dan menu pada website **Nadim Trans RentCar Batam**.

---

## Daftar Halaman & Menu Utama

| No | Label Menu | Rute URL | Tipe Rendering | Komponen Utama |
| :---: | :--- | :--- | :---: | :--- |
| **1** | **Beranda** | `/` | SSR / Client Animation | `Header`, `Hero`, `Features`, `WhyChooseUs`, `HowToBook`, `Testimonials`, `Faq`, `CTA`, `Footer` |
| **2** | **Kendaraan** | `/kendaraan` | Client Component | `Header`, `KendaraanPage`, Filter Sticky, Search & Sortir, Grid Armada, `Footer` |
| **2b** | **Detail Kendaraan** | `/kendaraan/[id]` | SSG (Static 8 Unit) | `VehicleDetailPage`, `VehicleDetailClient`, Image Gallery, Booking Form, WA Link |
| **3** | **Layanan** | `/layanan` | Client Component | `Header`, `LayananPage`, 4 Service Cards Grid, Value Props, `Footer` |
| **4** | **FAQ** | `/faq` | Client Component | `Header`, `FaqPage`, Search FAQ, 4 Kategori Tab, Accordion, Contact Card, `Footer` |

---

## 1. Menu Beranda (`/`)

### A. Rencana & Tujuan (Plan)
- **Tujuan Bisnis**: Pintu gerbang utama (*primary landing page*) untuk mengonversi pengunjung menjadi penyewa mobil di Batam (turis, pebisnis, instansi dinas, dan tamu bandara).
- **Target Konversi**: Mengarahkan pengunjung memilih armada di section *Features* atau langsung menekan tombol reservasi WhatsApp VVIP.
- **Kesan Visual (Branding)**: Mewah (*luxury gold & dark slate*), terpercaya (legalitas PT resmi di Batam), dan profesional.

### B. Dokumentasi Struktur Section (Docs)

#### 1. Header (`components/layout/Header.tsx`)
- **Fitur**:
  - Navbar *sticky/fixed* dengan efek transisi latar belakang saat di-scroll (`isSolid` state dengan `backdrop-blur-md`).
  - Logo gabungan emblem emas NTR ([`icon-2.webp`](/icons/icon-2.webp)) dan tipografi resmi ([`icon-3.webp`](/icons/icon-3.webp)) berukuran proporsional (`h-10 sm:h-12`).
  - Menu navigasi desktop dengan penanda tautan aktif (`pathname === item.href`).
  - Tombol CTA cepat *"Hubungi Kami"* dan tombol menu hamburger responsif untuk perangkat ponsel/tablet.

#### 2. Hero Section (`components/sections/Hero.tsx`)
- **Elemen Visual**:
  - Foto terminal kedatangan VVIP **Bandara Internasional Hang Nadim Batam** (`background.webp`) dilapisi gradasi halus.
  - Cutout unit **Toyota Alphard VIP** (`mobil-22.webp`) dengan kontak bayangan ban di aspal dan efek parallax interaktif kursor mouse (*mouse-parallax*).
  - Teks headline besar font `Bebas Neue` dipadukan dengan aksen emas `text-amber-400`.
  - Dua tombol aksi: *"Pesan Sekarang"* (langsung WhatsApp) dan *"Lihat Armada"* (scroll halus ke `#collection`).

#### 3. Features Section / Carousel Armada (`components/sections/Features.tsx`)
- **Fitur & Logika**:
  - Menampilkan 3 unit mobil per halaman dari total 8 unit armada Batam.
  - Indikator halaman berbasis *dots* dan *pill* dinamis.
  - **Logika Navigasi Pintar (Smart Directional Buttons)**:
    - *Halaman Pertama*: Tombol kiri nonaktif (`disabled`), tombol kanan **Emas aktif** menandakan arah geser ke kanan.
    - *Halaman Terakhir*: Tombol kiri **Emas aktif** menandakan arah kembali ke kiri, tombol kanan nonaktif (`disabled`).
    - *Halaman Tengah*: Kedua tombol berwarna **Netral putih** (tanpa highlight), namun saat di-*hover* akan berubah menjadi warna **Emas**.
  - Setiap kartu mobil menampilkan foto unit asli, badge kategori bodi, spesifikasi singkat, tarif sewa harian terformat Rupiah, tombol detail, dan tombol booking cepat.

#### 4. Why Choose Us (`components/sections/WhyChooseUs.tsx`)
  - Foto nyata kantor fisik & armada operasional PT. Nadim Auto Transindo di Batam (`background-1.webp`) dalam bingkai elegan yang bersih tanpa overlay teks.
  - Floating badge garansi *100% Unit Terawat & Legal*.
  - 4 pilar kepercayaan: Legalitas PT resmi Batam, armada steril & prima, supir berpengalaman ramah, dan antar-jemput tepat waktu.

#### 5. How To Book (`components/sections/howtobook.tsx`)
- **Alur 3 Langkah**:
  1. *Pilih Kendaraan*: Tentukan jenis mobil sesuai kebutuhan perjalanan.
  2. *Konfirmasi & Verifikasi*: Kirim identitas (KTP/SIM/Paspor) via WhatsApp resmi.
  3. *Serah Terima Kunci*: Unit diantar tepat waktu di Bandara Hang Nadim, pelabuhan, atau hotel.

#### 6. Testimonials (`components/sections/Testimonials.tsx`)
- **Fitur**:
  - Slider ulasan asli pelanggan (pebisnis Singapura, tamu VIP bandara, dan keluarga).
  - Navigasi tombol panah yang konsisten dengan logika visual section Features.

#### 7. Quick FAQ & CTA Banner (`Faq.tsx` & `CTA.tsx`)
- Tanya jawab ringkas di beranda dan banner penutup ajakan sewa mobil dengan latar Alphard VIP.

#### 8. Footer (`components/layout/Footer.tsx`)
- Informasi legal PT. Nadim Auto Transindo, alamat lengkap KDA Batam Kota, hotline WhatsApp 24 jam, tautan rute internal, dan hak cipta resmi.

---

## 2. Menu Kendaraan (`/kendaraan`)

### A. Rencana & Tujuan (Plan)
- **Tujuan**: Katalog menyeluruh (*inventory showcase*) dari seluruh kendaraan yang siap disewa di Kota Batam.
- **Masalah Pengguna yang Diatasi**: Memudahkan calon penyewa membandingkan tipe mobil (MPV keluarga vs SUV dinas vs City Car hemat), harga sewa, dan ketersediaan tanpa harus bertanya manual satu per satu.
- **Optimasi Konversi**: Form pencarian instan dan filter kategori tanpa perlu *refresh* halaman.

### B. Dokumentasi Fitur & State (Docs)

#### 1. Filter Kategori Dinamis (`selectedCategory`)
- Pilihan kategori: `Semua`, `MPV`, `SUV`, `City Car`, `Sedan`, `Minibus`.
- Desain *pill* horizontal responsif yang otomatis aktif dengan latar belakang gradasi emas.

#### 2. Pencarian Instan (`searchQuery`)
- Input teks interaktif dengan ikon pencarian.
- Menyaring mobil secara *real-time* berdasarkan:
  - Nama unit (contoh: *Alphard, Zenix, Fortuner, Brio*).
  - Tipe bodi / transmisi / subkategori.

#### 3. Pengurutan / Sortir (`sortBy`)
- Dropdown opsi:
  - `popular`: Berdasarkan jumlah ulasan dan rating terbanyak.
  - `price-low`: Dari harga sewa terendah (mulai Rp 300.000/hari).
  - `price-high`: Dari armada termewah (Toyota Alphard VIP Rp 3.000.000).

#### 4. Grid Kendaraan & Empty State
- Kartu mobil responsif (1 kolom di HP, 2 di tablet, 3 di desktop).
- Apabila hasil pencarian kosong, menampilkan pesan ramah dan tombol satu klik untuk mereset filter kembali ke semula.

---

## 3. Sub-Menu Detail Kendaraan (`/kendaraan/[id]`)

### A. Rencana & Tujuan (Plan)
- **Tujuan**: Halaman profil spesifik unit kendaraan untuk memberikan transparansi penuh mengenai kondisi fisik mobil, spesifikasi teknis, fasilitas inklusi, dan formulir kalkulasi pemesanan.
- **Arsitektur Teknis**: Menggunakan **Static Site Generation (SSG)** dengan fungsi `generateStaticParams()` yang mengompilasi rute statis untuk semua 8 unit mobil saat proses build. Hasilnya adalah kecepatan akses instan (*0ms database query*).

### B. Dokumentasi Komponen & Data (Docs)

#### 1. Galeri Foto Unit Asli Batam
- Foto resolusi tinggi unit mobil asli dengan *selector thumbnail*.
- Pengunjung dapat melihat tampak depan, sudut samping, dan interior kursi.

#### 2. Spesifikasi Teknis Lengkap
- Grid spesifikasi berbasis ikon:
  - Jumlah Kursi Penumpang (contoh: 4, 7, atau 8 kursi).
  - Kapasitas Koper / Bagasi (contoh: 2, 4, atau 5 koper besar).
  - Jenis Transmisi (*Matic Automatic* atau *Manual*).
  - Jenis Bahan Bakar (*Bensin / Pertamax* atau *Solar Diesel*).

#### 3. Transparansi Layanan & Syarat Sewa
- **Fasilitas Termasuk**: Unit prima ber-AC dingin, asuransi standar, bantuan darurat 24 jam di Batam.
- **Persyaratan Dokumen**: KTP asli, SIM A aktif, deposit jaminan (untuk lepas kunci).

#### 4. Integrasi WhatsApp Otomatis
- Tombol pemesanan langsung membuka percakapan WhatsApp resmi PT. Nadim Auto Transindo dengan pesan terformat otomatis:
  ```text
  Halo Nadim Trans RentCar, saya tertarik untuk menyewa unit:
  - Mobil: Toyota Alphard VIP (ID: 1)
  - Tarif: Rp 3.000.000 / Hari
  Mohon informasi ketersediaan tanggal sewa. Terima kasih.
  ```

---

## 4. Menu Layanan (`/layanan`)

### A. Rencana & Tujuan (Plan)
- **Tujuan**: Mengedukasi pelanggan korporat, instansi dinas, EO pernikahan, dan turis mancanegara mengenai cakupan paket transportasi fleksibel yang disediakan di luar sewa harian biasa.
- **Target Segmen**:
  - Wisatawan Singapura/Malaysia yang membutuhkan supir lokal yang memahami destinasi wisata Batam.
  - Pejabat dinas & tamu VIP Bandara Internasional Hang Nadim.
  - Rombongan keluarga besar / rombongan kantor (*gathering*).

### B. Dokumentasi 4 Paket Layanan (Docs)

1. **Sewa Mobil Lepas Kunci (Self-Drive)**:
   - Kebebasan penuh menjelajah Kota Batam, privasi terjaga, biaya harian lebih hemat.
2. **Sewa Mobil + Supir Profesional**:
   - Pengemudi berlisensi, tepat waktu, ramah, berpakaian rapi, dan paham seluruh rute wisata dan sentra kuliner Batam. Bebas lelah menyetir di jalan.
3. **Antar Jemput Bandara Hang Nadim & Pelabuhan Ferry**:
   - Layanan jemput langsung di pintu kedatangan terminal bandara atau pelabuhan ferry (Batam Center, Harbour Bay, Sekupang, Nongsapura) dengan papan nama (*paging board*).
4. **Carter Minibus / Bus Pariwisata**:
   - Akomodasi grup rombongan besar menggunakan unit Hiace Commuter atau Bus Pariwisata dengan bagasi luas.

---

## 5. Menu FAQ (`/faq`)

### A. Rencana & Tujuan (Plan)
- **Tujuan**: Menjawab keraguan umum calon penyewa seputar legalitas, syarat dokumen, mekanisme pembayaran, asuransi, dan kebijakan pengantaran unit mobil.
- **Efisiensi Operasional**: Mengurangi beban pesan berulang ke *customer service*, sekaligus meningkatkan skor SEO organik melalui *structured FAQ markup*.

### B. Dokumentasi Fitur (Docs)

#### 1. Pencarian Kata Kunci FAQ
- Fitur pencarian interaktif yang menyaring judul pertanyaan dan teks jawaban secara instan.

#### 2. Kategori Tab Terstruktur
- **Pemesanan**: Tata cara booking, kebijakan pembatalan (gratis s.d. 24 jam sebelum sewa), pengantaran unit ke hotel/bandara.
- **Dokumen & Syarat**: Syarat WNI (KTP & SIM A), syarat turis/WNA (Paspor & SIM Internasional), aturan batas usia, deposit sewa.
- **Pembayaran**: Metode pembayaran resmi (Transfer Bank, Kartu Kredit, QRIS), transparansi tanpa biaya tersembunyi.
- **Asuransi & Proteksi**: Cakupan pertanggungan asuransi komprehensif dan layanan bantuan darurat di jalan 24/7.

#### 3. Bantuan Langsung (*Customer Support Card*)
- Kotak bantuan di bagian bawah jika pelanggan memiliki pertanyaan di luar daftar FAQ, dilengkapi tombol telepon dan WhatsApp langsung ke staf *customer service* yang siaga 24 jam.

---

## 6. Sinkronisasi Data Global & File Terpusat

Seluruh data kendaraan, tarif, dan informasi legalitas perusahaan diatur terpusat di satu file:
- **Lokasi File**: [`lib/data.ts`](file:///c:/Users/User/Documents/Bidtech/bidtech-landing/projects/nadim-trans-rentcar/lib/data.ts)
- **Ekspor Utama**:
  - `COMPANY_INFO`: Nama PT, nomor WhatsApp, email, dan alamat kantor Batam.
  - `ALL_CARS`: Array 8 unit mobil lengkap dengan harga, galeri, spesifikasi, dan fitur.
  - `CATEGORIES`: Daftar kategori kendaraan untuk filter katalog.
  - `getCarById(id)` & `getAllCars()`: Fungsi helper untuk halaman katalog dan SSG detail unit.
