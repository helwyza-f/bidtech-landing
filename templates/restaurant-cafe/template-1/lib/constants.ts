// Semua teks & data halaman ada di satu tempat.
// Pembeli template cukup menyunting file ini, tidak perlu menyentuh JSX.

export const BRAND = {
  name: "Chef's Table",
  tagline: 'Gastronomi Autentik',
  description:
    'Pengalaman kuliner yang berfokus pada bahan-bahan musiman dan teknik yang halus.',
  phone: '0823-7668-0987',
  address: 'Jl. Pemuda, Cijantra, Kec. Pagedangan, Banten 15336',
};

export const NAV_LINKS = [
  { label: 'Beranda', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Ulasan', href: '/ulasan' },
  { label: 'Galeri', href: '/galeri' },
  { label: 'Kontak', href: '#kontak' },
];

export const HERO = {
  eyebrow: 'Gastronomi Autentik',
  titleLines: ['Bahan Segar,', 'Rasa Tak Terlupakan'],
  subtitle:
    'Rasakan seni kuliner kelas atas dengan kesegaran langsung dari ladang di setiap gigitan.',
  primaryCta: { label: 'Reservasi Meja', href: '#reservasi' },
  secondaryCta: { label: 'Lihat Menu', href: '/menu' },
  image: '/assets/banner.jpg',
};

export const PILLARS = [
  {
    title: 'Bahan Segar dari Petani',
    description:
      'Diambil setiap hari dari pertanian organik lokal untuk memastikan kualitas tertinggi dan rasa musiman yang optimal.',
  },
  {
    title: 'Resep Racikan Koki',
    description:
      'Koki berbintang Michelin kami menembus batas dengan teknik inovatif dan profil rasa yang seimbang.',
  },
  {
    title: 'Pengiriman Ramah Lingkungan',
    description:
      'Nikmati pengalaman restoran di rumah dengan kemasan 100% kompos dan pengiriman bebas emisi.',
  },
];

export const MENU_FILTERS = ['Semua', 'Burger', 'Taco', 'Wrap', 'Minuman'] as const;

export const MENU_ITEMS = [
  {
    name: 'Burger Spesial',
    category: 'Burger',
    description: 'Daging sapi pilihan dengan bawang bombay karamel dan keju cheddar tua.',
    price: 75000,
    badge: 'Populer',
    image: '/assets/banner.jpg',
  },
  {
    name: 'Taco Al Pastor',
    category: 'Taco',
    description: 'Babi panggang lambat dengan nanas panggang, ketumbar, dan salsa verde.',
    price: 60000,
    image: '/assets/banner.jpg',
  },
  {
    name: 'Wrap Ayam Gurih',
    category: 'Wrap',
    description: 'Ayam herbal panggang dengan alpukat Hass, selada romaine, dan saus yogurt.',
    price: 40000,
    image: '/assets/banner.jpg',
  },
  {
    name: 'Soda Jeruk Khas',
    category: 'Minuman',
    description: 'Dibuat sendiri dengan bahan botani segar, grapefruit, dan sirup rosemary.',
    price: 30000,
    image: '/assets/banner.jpg',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'Burger Spesial ini tanpa ragu adalah yang terbaik yang pernah saya coba di kota ini. Perhatian terhadap detail di setiap lapisannya luar biasa.',
    name: 'James D.',
    initials: 'JD',
    role: 'Pengunjung Terverifikasi',
  },
  {
    quote:
      'Kesegaran yang luar biasa. Taco al pastor ini mengingatkan saya pada makanan jalanan di Mexico City tetapi dengan sentuhan gourmet.',
    name: 'Sarah M.',
    initials: 'SM',
    role: 'Pengunjung Terverifikasi',
  },
  {
    quote:
      'Suasananya sehalus menunya. Sempurna untuk malam yang tenang atau makan malam perayaan.',
    name: 'Robert W.',
    initials: 'RW',
    role: 'Pengunjung Terverifikasi',
  },
];

export const OPENING_HOURS = [
  { days: 'Sen - Kam', hours: '11:00 - 22:00' },
  { days: 'Jum - Sab', hours: '11:00 - 00:00' },
  { days: 'Minggu', hours: '10:00 - 21:00' },
];

export const FAQS = [
  {
    question: 'Apakah saya perlu melakukan reservasi?',
    answer:
      'Reservasi sangat disarankan, terutama untuk akhir pekan. Namun kami selalu menyisakan beberapa meja untuk tamu walk-in.',
  },
  {
    question: 'Apakah ada pilihan menu vegetarian?',
    answer:
      'Ada. Setiap kategori menu kami memiliki minimal dua pilihan vegetarian, dan dapur kami siap menyesuaikan sebagian besar hidangan.',
  },
  {
    question: 'Di mana lokasi parkir terdekat?',
    answer:
      'Tersedia parkir basement gratis untuk tamu selama dua jam pertama, dengan akses langsung ke lobi restoran.',
  },
  {
    question: 'Apakah restoran menerima pesanan katering?',
    answer:
      'Kami melayani katering untuk 20 hingga 200 tamu. Hubungi kami minimal tujuh hari sebelum acara.',
  },
];

export const FOOTER_LINKS = {
  'Tautan Cepat': ['Ruang Makan Pribadi', 'Kartu Hadiah', 'Karir', 'Media Kit'],
};

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/chefstable',
  facebook: 'https://facebook.com/chefstable',
  twitter: 'https://twitter.com/chefstable',
};

/** Rp 75.000 — dipakai di kartu menu. */
export function formatPrice(value: number) {
  return `Rp ${value.toLocaleString('id-ID')}`;
}
