/**
 * Satu sumber kebenaran untuk identitas bisnis.
 *
 * Kenapa dipusatkan di sini: data yang sama dipakai di Navbar, Footer, section
 * Kontak, meta tag SEO, DAN structured data (JSON-LD) untuk Google. Kalau nomor
 * telepon berubah, cukup ubah satu baris di file ini.
 *
 * Untuk template UMKM: file inilah yang perlu diedit klien, bukan komponennya.
 */

export const site = {
  name: "Chef's Table",
  legalName: "Chef's Table",
  tagline: "Gastronomi Autentik",
  description:
    "Pengalaman kuliner yang berfokus pada bahan-bahan musiman dan teknik yang halus. Burger, taco, wrap, dan minuman segar racikan koki di Pagedangan, Tangerang.",
  shortDescription:
    "Pengalaman kuliner yang berfokus pada bahan-bahan musiman dan teknik yang halus.",

  /** Ganti dengan domain asli saat deploy. Dipakai untuk canonical URL & og:url. */
  url: "https://chefstable.example.com",

  /** Gambar default untuk share ke WhatsApp/Facebook/X. Rasio 1200x630. */
  ogImage: "/og-image.jpg",

  locale: "id_ID",
  lang: "id",

  contact: {
    phone: "0823-7668-0987",
    /** Format E.164, wajib untuk link tel: dan wa.me */
    phoneE164: "+6282376680987",
    whatsapp: "6282376680987",
    email: "halo@chefstable.example.com",
  },

  address: {
    street: "Jl. Pemuda, Cijantra",
    district: "Kec. Pagedangan",
    city: "Tangerang",
    region: "Banten",
    postalCode: "15336",
    country: "ID",
    /** Ganti dengan koordinat asli. Dipakai untuk local SEO. */
    latitude: -6.2884,
    longitude: 106.6289,
    mapsUrl: "https://maps.google.com/?q=Jl.+Pemuda+Cijantra+Pagedangan+Banten+15336",
  },

  /**
   * Jam operasional. Format `days` mengikuti schema.org (Mo, Tu, We, Th, Fr, Sa, Su)
   * supaya bisa langsung dipakai untuk JSON-LD tanpa konversi manual.
   */
  openingHours: [
    { label: "Sen - Kam", days: ["Mo", "Tu", "We", "Th"], opens: "11:00", closes: "22:00" },
    { label: "Jum - Sab", days: ["Fr", "Sa"], opens: "11:00", closes: "00:00" },
    { label: "Minggu", days: ["Su"], opens: "10:00", closes: "21:00" },
  ],

  priceRange: "Rp25.000 - Rp95.000",
  servesCuisine: ["Burger", "Taco", "Wrap", "Minuman"],

  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    tiktok: "https://tiktok.com/",
  },
} as const;

/** Menu navigasi utama. Urutan & label mengikuti desain Figma. */
export const navLinks = [
  { label: "Beranda", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "Ulasan", to: "/ulasan" },
  { label: "Galeri", to: "/galeri" },
  { label: "Kontak", to: "/kontak" },
] as const;

/** Link kolom "Tautan Cepat" di footer. */
export const footerLinks = [
  { label: "Ruang Makan Pribadi", to: "/kontak" },
  { label: "Kartu Hadiah", to: "/kontak" },
  { label: "Karir", to: "/tentang" },
  { label: "Media Kit", to: "/tentang" },
] as const;

export const legalLinks = [
  { label: "Kebijakan Privasi", to: "/kebijakan-privasi" },
  { label: "Ketentuan Layanan", to: "/ketentuan-layanan" },
] as const;
