export const NAV_LINKS = [
  { label: 'Beranda', href: '/' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Pilihan Mobil', href: '#armada' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontak', href: '#kontak' },
];

export const SERVICES = [
  {
    id: 1,
    title: 'Lepas Kunci',
    description: 'Nikmati kebebasan berkendara sepenuhnya. Pilih mobil impian Anda dan nikmati privasi penuh bersama keluarga.',
    icon: 'car-key',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
    link: '#',
  },
  {
    id: 2,
    title: 'Dengan Sopir',
    description: 'Perjalanan bebas stres dengan pengemudi profesional berpengalaman. Kami pastikan Anda sampai tujuan dengan aman.',
    icon: 'user',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
    link: '#',
  },
  {
    id: 3,
    title: 'Antar-Jemput Bandara',
    description: 'Layanan antar-jemput VIP dari dan ke bandara. Tepat waktu, nyaman, dan membantu membawa semua barang bawaan Anda.',
    icon: 'plane',
    link: '#',
  },
  {
    id: 4,
    title: 'Perjalanan Luar Kota',
    description: 'Armada tangguh dengan perawatan maksimal untuk perjalanan jauh yang aman. Paket liburan atau bisnis luar kota.',
    icon: 'map',
    link: '#',
  },
  {
    id: 5,
    title: 'Rental Perusahaan',
    description: 'Solusi mobilitas bisnis dengan kontrak sewa jangka panjang. Tarif kompetitif, perawatan rutin, dan mobil cadangan.',
    icon: 'building',
    link: '#',
  },
  {
    id: 6,
    title: 'Acara Khusus & VIP',
    description: 'Tingkatkan prestise acara pernikahan atau pertemuan VIP Anda dengan pilihan mobil mewah kelas premium kami.',
    icon: 'star',
    image: '/images/services/acara-khusus.png',
    link: '#',
  },
];

export const FLEET = [
  {
    id: 1,
    name: 'Toyota Avanza',
    category: 'MPV / 7 Penumpang / Automatic',
    price: 300000,
    image: '/images/fleet/avanza.jpg',
    popular: false,
  },
  {
    id: 2,
    name: 'Mitsubishi Xpander',
    category: 'MPV / 7 Penumpang / Automatic',
    price: 350000,
    image: '/images/fleet/xpander.jpg',
    popular: false,
  },
  {
    id: 3,
    name: 'Suzuki Ignis',
    category: 'City Car / 4 Penumpang / Manual',
    price: 250000,
    image: '/images/fleet/ignis.jpg',
    popular: true,
  },
  {
    id: 4,
    name: 'Daihatsu Sirion',
    category: 'City Car / 4 Penumpang / Automatic',
    price: 300000,
    image: '/images/fleet/sirion.jpg',
    popular: false,
  },
];

export const FAQS = [
  {
    question: 'Apa saja syarat dokumen untuk sewa mobil lepas kunci?',
    answer: 'Untuk sewa lepas kunci, Anda memerlukan KTP elektronik asli, SIM A yang masih berlaku, dan jaminan tambahan seperti Kartu Keluarga atau paspor. Verifikasi data memakan waktu maksimal 1 jam.',
  },
  {
    question: 'Apakah biaya sewa sudah termasuk bensin dan tol?',
    answer: 'Tarif yang tertera hanya untuk sewa kendaraan. Biaya bahan bakar, tol, parkir, dan tiket masuk lokasi wisata merupakan tanggung jawab penyewa.',
  },
  {
    question: 'Bagaimana jika terjadi kerusakan atau kecelakaan?',
    answer: 'Semua armada kami dilindungi asuransi All-Risk. Namun, akan ada biaya Own Risk (OR) per kejadian yang harus dibayarkan jika terjadi klaim asuransi akibat kelalaian penyewa.',
  },
];
