// Organization & Brand Info
export const ORGANIZATION = {
  name: 'Organization template',
  fullName: 'Yayasan Peduli Masa Depan',
  tagline: ['Bersama Membangun Masa', 'Depan yang Berkelanjutan'],
  description:
    'Menciptakan dampak nyata melalui program pendidikan, pemberdayaan masyarakat, dan pelestarian lingkungan yang berkelanjutan bagi kemandirian generasi penerus.',
  email: 'cs@bidtech.co.id',
  phone: '0821-7601-455',
  address: 'Batam, Kepulauan Riau',
};

const basePath = process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "";

export const NAV_LINKS = [
  { label: 'Beranda', href: basePath + '/' },
  { label: 'Tentang Kami', href: basePath + '/tentang-kami' },
  { label: 'Program', href: basePath + '/program' },
  { label: 'Galeri', href: basePath + '/galeri' },
];

// About & Values Data
export const ABOUT_DATA = {
  tag: 'TENTANG KAMI',
  title: ['Organisasi yang dibangun', 'atas dasar kepercayaan dan', 'transparansi.'],
  description:
    'Kami adalah organisasi yang berfokus pada pendidikan, kesejahteraan, dan pemberdayaan anak. Setiap program dirancang berdasarkan kebutuhan nyata di lapangan, dijalankan secara bertanggung jawab, serta dikelola dengan prinsip transparansi untuk memastikan dampak yang berkelanjutan bagi masyarakat.',
  cards: [
    {
      type: 'visi',
      title: 'Visi',
      description:
        'Sebuah masyarakat di mana setiap komunitas memiliki pengetahuan, sumber daya, dan suara untuk membentuk masa depannya sendiri.',
    },
    {
      type: 'misi',
      title: 'Misi',
      description:
        'Menghadirkan program pendidikan, pemberdayaan, dan perlindungan anak yang berdampak dan berkelanjutan.',
    },
    {
      type: 'nilai',
      title: 'Nilai-Nilai Kami',
      bullets: [
        'Integritas dalam setiap tindakan',
        'Kepedulian terhadap sesama',
        'Transparansi dan akuntabilitas',
      ],
    },
  ],
  stats: [
    { value: '15+', label: 'Tahun Berkarya' },
    { value: '500+', label: 'Mitra Organisasi' },
    { value: '20+', label: 'Wilayah Binaan' },
    { value: '92%', label: 'Dana untuk Program' },
  ],
};

// Team Members
export const TEAM_MEMBERS = [
  {
    name: 'Andina Rahmawati',
    role: 'KETUA YAYASAN/DIREKTUR',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'Dino Setiawan',
    role: 'KEPALA OPERASIONAL',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'Giana Lumbanraja',
    role: 'KEPALA KEMITRAAN',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'Dewi Prameswari',
    role: 'BENDAHARA',
    image:
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=600&auto=format&fit=crop',
  },
];

// Programs Data
export const PROGRAMS = [
  {
    id: 1,
    tag: 'PENDIDIKAN',
    title: 'Rumah Belajar Anak',
    description:
      'Kursus malam gratis tentang literasi digital, perencanaan keuangan, dan keterampilan kerja, diajarkan oleh mentor sukarelawan di 12 pusat komunitas.',
    image:
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop',
    category: 'Pendidikan',
  },
  {
    id: 2,
    tag: 'KESEHATAN',
    title: 'Lingkungan Hijau',
    description:
      'Program reforestasi perkotaan dan pengurangan sampah dijalankan bersama asosiasi warga, sekolah, dan mitra pemerintah setiap kuartal.',
    image:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
    category: 'Kesehatan',
  },
  {
    id: 3,
    tag: 'ADVOCACY',
    title: 'Forum Suara Warga',
    description:
      'Forum publik dan pengarahan kebijakan yang menghubungkan anggota dengan pemerintah lokal tentang transportasi, perumahan, dan ruang publik.',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
    category: 'Pemberdayaan',
  },
  {
    id: 4,
    tag: 'PENDIDIKAN',
    title: 'Rumah Belajar Digital',
    description:
      'Pelatihan literasi digital, dasar pemrograman, dan keterampilan komputer gratis yang dipandu oleh mentor relawan bagi anak-anak dan remaja komunitas.',
    image:
      'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=800&auto=format&fit=crop',
    category: 'Pendidikan',
  },
  {
    id: 5,
    tag: 'PENDIDIKAN',
    title: 'Pojok Baca & Dukungan Beasiswa',
    description:
      'Distribusi buku bacaan edukatif, renovasi perpustakaan komunitas, serta bantuan dana pendidikan berkelanjutan untuk anak-anak prasejahtera.',
    image:
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop',
    category: 'Pendidikan',
  },
  {
    id: 6,
    tag: 'KESEHATAN',
    title: 'Gerakan Lingkungan Hijau',
    description:
      'Penghijauan kota, kelola sampah, dan kebun warga demi lingkungan sehat serta bersih.',
    image:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
    category: 'Kesehatan',
  },
  {
    id: 7,
    tag: 'KESEHATAN',
    title: 'Dapur Gizi & Tumbuh Kembang',
    description:
      'Kursus malam gratis literasi digital, finansial, dan kerja bersama mentor relawan di 12 komunitas.',
    image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
    category: 'Kesehatan',
  },
  {
    id: 8,
    tag: 'PEMBERDAYAAN',
    title: 'Forum Suara Warga',
    description:
      'Ruang temu dan advokasi kebijakan publik yang menjembatani aspirasi masyarakat dengan pemerintah terkait akses fasilitas dan ruang terbuka hijau.',
    image:
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop',
    category: 'Pemberdayaan',
  },
  {
    id: 9,
    tag: 'PEMBERDAYAAN',
    title: 'Sanggar Kriya & Usaha Mandiri',
    description:
      'Pelatihan vokasi, kerajinan tangan, dan literasi finansial demi kemandirian ekonomi keluarga binaan.',
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop',
    category: 'Pemberdayaan',
  },
];

// Gallery Documentation
export const GALLERY_IMAGES = [
  {
    id: 1,
    title: 'Aksi Solidaritas Sosial',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Aspirasi dan Perubahan',
    image: 'https://images.unsplash.com/photo-1571624436279-b272aff752b5?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Kepedulian Sesama',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Ruang Kolaborasi Komunitas',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Festival Warga & Kebersamaan',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Edukasi Gizi Sehat Anak',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 7,
    title: 'Pelatihan & Rapat Koordinasi',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 8,
    title: 'Keceriaan Bersama Relawan',
    image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 9,
    title: 'Dukungan Pendidikan Keluarga',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 10,
    title: 'Penanaman Pohon dan Penghijauan',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 11,
    title: 'Layanan Kesehatan Gratis',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 12,
    title: 'Pemberdayaan UMKM Binaan',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 13,
    title: 'Rumah Belajar Komputer',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 14,
    title: 'Pemberian Donasi & Bantuan',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 15,
    title: 'Ruang Baca Perpustakaan',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 16,
    title: 'Pelatihan Keterampilan Guru',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 17,
    title: 'Bimbingan Belajar Siswa',
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 18,
    title: 'Inovasi Digital Pemuda',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
  },
];

// Testimonials Data
export const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'Program ini sangat berdampak positif bagi kemajuan anak-anak kami di desa. Mereka kini memiliki akses belajar mandiri yang sangat memadai.',
    name: 'Mayang Saraswati',
    role: 'Orang Tua Penerima Manfaat',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    highlighted: false,
  },
  {
    id: 2,
    quote:
      'Sangat bangga bisa berkontribusi. Aksi nyata yayasan ini benar-benar transparan dan langsung dirasakan oleh saudara-saudara kita di pelosok.',
    name: 'Rian Hidayat',
    role: 'Relawan Pendidikan',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    highlighted: true,
  },
  {
    id: 3,
    quote:
      'Transparansi dan profesionalisme pelaporan membuat kami yakin untuk terus menyalurkan bantuan sosial melalui yayasan ini.',
    name: 'Sita Kusuma',
    role: 'Mitra Donatur',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    highlighted: false,
  },
  {
    id: 4,
    quote:
      'Transparansi dan profesionalisme pelaporan membuat kami yakin untuk terus menyalurkan bantuan sosial melalui yayasan ini.',
    name: 'Budi Santoso',
    role: 'Mitra Donatur',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    highlighted: false,
  },
];

// Social Media Links
export const SOCIAL_LINKS = {
  website: 'https://bidtech.or.id',
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  linkedin: 'https://linkedin.com',
};
