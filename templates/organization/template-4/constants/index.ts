import { NavItem, PillarItem, MissionItem, GalleryItem } from "@/types";

export const SITE_INFO = {
  name: "ALIANSI KEPEMIMPINAN INDONESIA",
  fullName: "ORGANISASI PEMUDA & INOVASI SOSIAL INDONESIA",
  region: "Sekretariat Nasional • Indonesia",
  period: "Masa Bakti 2026–2030",
  slogan: "BERSATU, BERKARYA, BERMARTABAT",
  description:
    "Wadah kolaborasi kepemimpinan, transformasi sosial, dan inovasi strategis generasi muda dalam memperkuat kemandirian dan integritas bangsa.",
  visiUtama:
    "“Terwujudnya tata kelola organisasi yang adaptif, profesional, dan berintegritas tinggi dalam memperjuangkan aspirasi anggota serta melahirkan kepemimpinan transformatif bagi kemajuan bangsa.”",
  visi: [
    "Memperkokoh konsolidasi kelembagaan dan persatuan seluruh elemen organisasi secara inklusif dan berkelanjutan melalui sistem tata kelola modern.",
    "Meningkatkan kapasitas kepemimpinan, kompetensi profesional, dan jejaring kemitraan strategis dengan pemangku kepentingan nasional dan internasional demi kemaslahatan masyarakat.",
  ],
  misi:
    "Mewujudkan organisasi yang solid, mandiri, berdaya saing global, dan berintegritas dalam memperjuangkan kemandirian generasi muda serta inovasi yang berdampak nyata bagi kesejahteraan masyarakat.",
  tujuan: {
    lead:
      "Membangun ekosistem kepemimpinan yang berintegritas, progresif, dan berorientasi masa depan melalui pilar penguatan SDM, sinergi kelembagaan, dan pemanfaatan teknologi, dengan tujuan untuk:",
    points: [
      "Memperkuat kaderisasi dan kapasitas kepemimpinan berkarakter.",
      "Meningkatkan kapasitas kelembagaan dan jejaring kemitraan nasional.",
      "Mendorong inovasi sosial, kewirausahaan, dan aksi nyata generasi muda.",
      "Memberikan advokasi, pendampingan, dan pelayanan optimal bagi segenap anggota.",
    ],
  },
  address:
    "Gedung Transformasi Pemuda Lt. 5, Jl. Sudirman No. 45, Jakarta Pusat 10220",
  phone: "+62 21-5500-8900 / +62 811-9876-5432",
  email: "sekretariat@aliansipemuda.id",
  hours: "Senin – Jumat: 08.30 – 17.00 WIB",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Beranda", href: "/#beranda" },
  { label: "Visi & Misi", href: "/#visi-misi" },
  { label: "Arah Perjuangan", href: "/#pilar" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kontak & Sekretariat", href: "/#kontak" },
];

export const PILLARS: PillarItem[] = [
  {
    id: "pilar-1",
    number: "01",
    title: "Kader Berkarakter",
    description:
      "Penguatan integritas moral, kepemimpinan transformatif, dan wawasan kebangsaan generasi muda secara inklusif dan berkelanjutan.",
    iconName: "Users",
    phaseLabel: "Fase Kaderisasi",
    theme: "forest",
  },
  {
    id: "pilar-2",
    number: "02",
    title: "Inovasi Sosial",
    description:
      "Penerapan teknologi digital, riset kolaboratif, dan solusi kreatif pemuda untuk menjawab tantangan sosial-ekonomi di era modern.",
    iconName: "Lightbulb",
    phaseLabel: "Fase Modernisasi",
    theme: "forest",
  },
  {
    id: "pilar-3",
    number: "03",
    title: "Sinergi Kemitraan",
    description:
      "Membangun jejaring kolaboratif antara organisasi, akademisi, dunia usaha, dan pemerintah guna memperluas dampak kemanfaatan.",
    iconName: "TrendingUp",
    phaseLabel: "Fase Akselerasi",
    theme: "amber",
  },
  {
    id: "pilar-4",
    number: "04",
    title: "Advokasi & Pengabdian",
    description:
      "Penyaluran aspirasi publik, pendampingan masyarakat, dan aksi kerelawanan nyata demi terciptanya keadilan sosial yang inklusif.",
    iconName: "Shield",
    phaseLabel: "Fase Pengabdian",
    theme: "forest",
  },
  {
    id: "pilar-5",
    number: "05",
    title: "Kepemimpinan Berdaya",
    description:
      "Melahirkan insan pemimpin berintegritas tinggi, berdaya saing global, serta berdedikasi penuh untuk kemandirian dan kemajuan bangsa.",
    iconName: "Award",
    phaseLabel: "Puncak Capaian",
    theme: "amber",
    isPinnacle: true,
  },
];

export const MISSIONS: MissionItem[] = [
  {
    id: "misi-1",
    number: "01",
    description:
      "Memperkokoh konsolidasi kelembagaan dan persatuan seluruh elemen kepemimpinan pemuda di tingkat nasional dan daerah secara berkelanjutan.",
    iconName: "Building2",
    theme: "forest",
  },
  {
    id: "misi-2",
    number: "02",
    description:
      "Meningkatkan kapasitas, kompetensi profesional, dan etika kepemimpinan generasi muda melalui pendidikan, pelatihan, dan kaderisasi terpadu.",
    iconName: "GraduationCap",
    theme: "forest",
  },
  {
    id: "misi-3",
    number: "03",
    description:
      "Menyalurkan aspirasi masyarakat serta memberikan advokasi kebijakan publik yang konstruktif, berkeadilan, dan berintegritas.",
    iconName: "Gavel",
    theme: "amber",
  },
  {
    id: "misi-4",
    number: "04",
    description:
      "Mendorong kewirausahaan sosial, kemandirian ekonomi generasi muda, dan inkubasi inisiatif rintisan yang berdampak langsung bagi masyarakat.",
    iconName: "Store",
    theme: "forest",
  },
  {
    id: "misi-5",
    number: "05",
    description:
      "Mendorong pemanfaatan teknologi digital, kecerdasan buatan, dan inovasi pengetahuan untuk mengakselerasi pemecahan masalah publik.",
    iconName: "Bot",
    theme: "forest",
  },
  {
    id: "misi-6",
    number: "06",
    description:
      "Membangun dan memperluas kemitraan strategis dengan pemerintah, sektor swasta, perguruan tinggi, lembaga donor, dan organisasi internasional.",
    iconName: "Handshake",
    theme: "amber",
  },
  {
    id: "misi-7",
    number: "07",
    description:
      "Menggerakkan kepedulian sosial, aksi kemanusiaan, dan pelestarian lingkungan hidup melalui aksi nyata relawan pemuda di seluruh tanah air.",
    iconName: "ClipboardCheck",
    theme: "forest",
  },
  {
    id: "misi-8",
    number: "08",
    description:
      "Meningkatkan peran aktif pemuda dan perempuan dalam kepemimpinan publik, proses pembuatan kebijakan strategis, dan transformasi kebangsaan.",
    iconName: "Users",
    theme: "forest",
  },
  {
    id: "misi-9",
    number: "09",
    description:
      "Membangun tata kelola organisasi yang profesional, terbuka, akuntabel, independen, dan berintegritas tinggi bebas dari pengaruh politik praktis.",
    iconName: "Landmark",
    theme: "amber",
  },
];

export const GALLERY_CATEGORIES = [
  "Semua",
  "Pelantikan Akbar",
  "Konsolidasi Pengurus",
  "Prosesi Pataka",
  "Musyawarah Cabang",
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "galeri-1",
    title: "Penandatanganan Nota Kesepahaman & Kerjasama Strategis",
    category: "Pelantikan Akbar",
    date: "24 Februari 2026",
    description:
      "Peresmian kolaborasi antar-lembaga dalam mendukung program transformasi kepemimpinan berkelanjutan.",
    imageUrl: "/images/gallery-2.webp",
    fallbackUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1469&auto=format&fit=crop",
    isFeatured: true,
  },
  {
    id: "galeri-2",
    title: "Jajaran Pengurus Terpilih dan Dewan Pimpinan Nasional",
    category: "Konsolidasi Pengurus",
    date: "24 Februari 2026",
    description:
      "Soliditas pimpinan pusat dan cabang siap mengakselerasi program kerja strategis organisasi.",
    imageUrl: "/images/gallery-4.webp",
    fallbackUrl: "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "galeri-3",
    title: "Penyerahan Penghargaan & Anugerah Pengabdian Tokoh",
    category: "Prosesi Pataka",
    date: "24 Februari 2026",
    description:
      "Apresiasi tertinggi bagi insan penggerak dan mitra berprestasi pada malam puncak konferensi.",
    imageUrl: "/images/gallery-3.webp",
    fallbackUrl: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "galeri-4",
    title: "Lokakarya Strategis & Sinergi Program Pemberdayaan",
    category: "Konsolidasi Pengurus",
    date: "24 Februari 2026",
    description:
      "Rapat kerja perumusan agenda inovasi sosial dan kemitraan kolaboratif antar bidang.",
    imageUrl: "/images/gallery-6.webp",
    fallbackUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "galeri-5",
    title: "Forum Diskusi Panel Kepemimpinan & Inovasi Sosial",
    category: "Prosesi Pataka",
    date: "24 Februari 2026",
    description:
      "Pertukaran gagasan strategis bersama pakar kepemimpinan dan praktisi organisasi.",
    imageUrl: "/images/gallery-1.webp",
    fallbackUrl: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1469&auto=format&fit=crop",
  },
  {
    id: "galeri-6",
    title: "Sidang Pleno & Musyawarah Nasional Pengurus Wilayah",
    category: "Musyawarah Cabang",
    date: "15 Januari 2026",
    description:
      "Perumusan ketetapan anggaran dasar, garis besar perjuangan, dan arah kebijakan organisasi.",
    imageUrl: "/images/gallery-7.webp",
    fallbackUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1469&auto=format&fit=crop",
  },
];

export const KECAMATAN_OPTIONS = [
  "DKI Jakarta",
  "Jawa Barat",
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",
  "Banten",
  "Sumatera Utara",
  "Riau & Kepulauan Riau",
  "Sumatera Barat",
  "Sumatera Selatan",
  "Kalimantan Timur",
  "Sulawesi Selatan",
  "Bali & Nusa Tenggara",
  "Papua & Maluku",
  "Wilayah Lainnya",
];

export const KATEGORI_OPTIONS = [
  "Pengurus Wilayah / Daerah",
  "Kader & Anggota Pemuda",
  "Komunitas / Organisasi Mitra",
  "Akademisi / Mahasiswa",
  "Lembaga Swadaya Masyarakat (LSM)",
  "Pelaku Usaha / Startup Inovatif",
  "Masyarakat Umum",
];
