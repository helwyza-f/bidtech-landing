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

const basePath = process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "";

export const NAV_LINKS = [
  { label: 'Beranda', href: basePath + '/' },
  { label: 'Menu', href: basePath + '/menu' },
  { label: 'Ulasan', href: basePath + '/ulasan' },
  { label: 'Galeri', href: basePath + '/galeri' },
  { label: 'Kontak', href: '#kontak' },
];

export const HERO = {
  eyebrow: 'Gastronomi Autentik',
  titleLines: ['Bahan Segar,', 'Rasa Tak Terlupakan'],
  subtitle:
    'Rasakan seni kuliner kelas atas dengan kesegaran langsung dari ladang di setiap gigitan.',
  primaryCta: { label: 'Reservasi Meja', href: '#reservasi' },
  secondaryCta: { label: 'Lihat Menu', href: basePath + '/menu' },
  image: '/assets/banner.webp',
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
    image: '/assets/menu/burger-special.webp',
  },
  {
    name: 'Taco Al Pastor',
    category: 'Taco',
    description: 'Babi panggang lambat dengan nanas panggang, ketumbar, dan salsa verde.',
    price: 60000,
    image: '/assets/menu/taco-al-pastor.webp',
  },
  {
    name: 'Wrap Ayam Gurih',
    category: 'Wrap',
    description: 'Ayam herbal panggang dengan alpukat Hass, selada romaine, dan saus yogurt.',
    price: 40000,
    image: '/assets/menu/wrap-ayam-gurih.webp',
  },
  {
    name: 'Soda Jeruk Khas',
    category: 'Minuman',
    description: 'Dibuat sendiri dengan bahan botani segar, grapefruit, dan sirup rosemary.',
    price: 30000,
    image: '/assets/menu/soda-jeruk-khas.webp',
  },
  {
    name: 'Burger Cheese',
    category: 'Burger',
    description: 'Daging sapi panggang premium, lelehan keju cheddar, tomat, dan selada renyah.',
    price: 50000,
    image: '/assets/menu/burger-cheese.webp',
  },
  {
    name: 'Burger Beef',
    category: 'Burger',
    description: 'Patty sapi premium dengan selada renyah, tomat, bawang merah, dan saus rumah.',
    price: 65000,
    image: '/assets/menu/burger-beef.webp',
  },
  {
    name: 'Veggie Taco',
    category: 'Taco',
    description: 'Taco vegetarian dengan kacang lembut, guacamole, sayur segar, dan crema ringan.',
    price: 70000,
    image: '/assets/menu/taco-veggie.webp',
  },
  {
    name: 'Mexican Taco',
    category: 'Taco',
    description: 'Isian daging melimpah, crema rempah, alpukat, kubis segar, dan tortilla hangat.',
    price: 50000,
    image: '/assets/menu/taco-mexican.webp',
  },
  {
    name: 'Italian Wrap',
    category: 'Wrap',
    description: 'Wrap premium dengan tomat panggang, mozzarella, basil, zaitun, dan daging asap.',
    price: 35000,
    image: '/assets/menu/wrap-italian.webp',
  },
  {
    name: 'Roast Beef Wrap',
    category: 'Wrap',
    description: 'Slice daging sapi panggang yang super juicy dengan selada, tomat, dan saus krim.',
    price: 60000,
    image: '/assets/menu/wrap-beef.webp',
  },
  {
    name: 'Cola',
    category: 'Minuman',
    description: 'Minuman soda kola legendaris dengan sensasi dingin yang segar dan ringan.',
    price: 20000,
    image: '/assets/menu/cola.webp',
  },
  {
    name: 'Es Teh',
    category: 'Minuman',
    description: 'Seduhan teh pilihan dengan rasa manis pas dan aroma yang bersih.',
    price: 15000,
    image: '/assets/menu/es-teh.webp',
  },
];

export const GALLERY_FILTERS = ['Food', 'Interior', 'Events', 'Staff'] as const;

export const GALLERY_ITEMS = [
  {
    id: 'food-sandwich-platter',
    title: 'Sandwich platter dengan salad segar',
    category: 'Food',
    image: '/assets/gallery/sandwich-platter.webp',
  },
  {
    id: 'food-wrap-board',
    title: 'Wrap panggang di atas papan kayu',
    category: 'Food',
    image: '/assets/gallery/wrap-board.webp',
  },
  {
    id: 'food-burger-closeup',
    title: 'Burger malam dengan saus rumah',
    category: 'Food',
    image: '/assets/gallery/burger-closeup.webp',
  },
  {
    id: 'food-taco-table',
    title: 'Taco meja panjang untuk berbagi',
    category: 'Food',
    image: '/assets/gallery/taco-table.webp',
    moreCount: '10+',
  },
  {
    id: 'interior-main-dining',
    title: 'Ruang makan utama dengan cahaya hangat',
    category: 'Interior',
    image: '/assets/gallery/interior-main-dining.webp',
  },
  {
    id: 'interior-bar-counter',
    title: 'Counter bar untuk tamu malam',
    category: 'Interior',
    image: '/assets/gallery/interior-bar-counter.webp',
  },
  {
    id: 'interior-open-kitchen',
    title: 'Dapur terbuka dekat area servis',
    category: 'Interior',
    image: '/assets/gallery/interior-open-kitchen.webp',
  },
  {
    id: 'interior-corner-table',
    title: 'Meja sudut untuk makan santai',
    category: 'Interior',
    image: '/assets/gallery/interior-corner-table.webp',
    moreCount: '8+',
  },
  {
    id: 'events-shared-table',
    title: 'Meja panjang untuk acara keluarga',
    category: 'Events',
    image: '/assets/gallery/events-shared-table.webp',
  },
  {
    id: 'events-private-dinner',
    title: 'Private dinner dengan menu pilihan',
    category: 'Events',
    image: '/assets/gallery/events-private-dinner.webp',
  },
  {
    id: 'events-catering-table',
    title: 'Catering table untuk perayaan kecil',
    category: 'Events',
    image: '/assets/gallery/events-catering-table.webp',
  },
  {
    id: 'events-seasonal-menu',
    title: 'Seasonal tasting untuk tamu grup',
    category: 'Events',
    image: '/assets/gallery/events-seasonal-menu.webp',
    moreCount: '12+',
  },
  {
    id: 'staff-head-chef',
    title: 'Head chef saat plating menu malam',
    category: 'Staff',
    image: '/assets/gallery/staff-head-chef.webp',
  },
  {
    id: 'staff-prep-station',
    title: 'Tim prep menjaga bahan tetap segar',
    category: 'Staff',
    image: '/assets/gallery/staff-prep-station.webp',
  },
  {
    id: 'staff-line-cook',
    title: 'Line cook menyelesaikan pesanan',
    category: 'Staff',
    image: '/assets/gallery/staff-line-cook.webp',
  },
  {
    id: 'staff-service-team',
    title: 'Service team sebelum ruang makan dibuka',
    category: 'Staff',
    image: '/assets/gallery/staff-service-team.webp',
    moreCount: '6+',
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

/** Contoh output: Rp. 75.000. Dipakai di kartu menu. */
export function formatPrice(value: number) {
  return `Rp. ${value.toLocaleString('id-ID')}`;
}
