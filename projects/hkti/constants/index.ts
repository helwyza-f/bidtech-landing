import { NavItem, PillarItem, MissionItem, GalleryItem } from "@/types";

export const SITE_INFO = {
  name: "DPC HKTI KOTA BATAM",
  fullName: "HIMPUNAN KERUKUNAN TANI INDONESIA",
  region: "Kota Batam • Kepulauan Riau",
  period: "Periode 2026–2030",
  slogan: "HKTI JAYA – TANI MAKMUR",
  description:
    "Menghimpun potensi petani, memodernisasi agribisnis, dan memperjuangkan kedaulatan pangan maritim & urban farming di Kota Batam demi martabat pertanian nusantara.",
  visiUtama:
    "“Terwujudnya petani dan pelaku usaha pertanian Kota Batam yang sejahtera, mandiri, bermartabat, berdaya saing, dan adaptif terhadap perkembangan teknologi melalui penguatan kelembagaan, modernisasi pertanian, kemitraan, serta pembangunan pertanian yang berkelanjutan.”",
  visi: [
    "Memperkuat persatuan dan kelembagaan petani melalui pembinaan organisasi yang berkelanjutan, meningkatkan pengetahuan, keterampilan, kapasitas, dan kesejahteraan petani melalui pendidikan serta pendampingan, sekaligus mendorong penggunaan teknologi dan inovasi pertanian yang sesuai dengan kebutuhan daerah.",
    "HKTI Kota Batam juga berkomitmen memperjuangkan hak dan kepentingan petani, meningkatkan produktivitas serta nilai ekonomi hasil pertanian, memperluas kemitraan dengan pemerintah, dunia usaha, perguruan tinggi, lembaga keuangan, dan komunitas, serta mendorong keterlibatan generasi muda dalam pengembangan sektor pertanian.",
  ],
  misi:
    "Mewujudkan HKTI Kota Batam sebagai organisasi petani yang profesional, mandiri, bersatu, berdaya saing, dan berintegritas dalam memperjuangkan kepentingan petani serta mendorong terciptanya sektor pertanian yang modern, produktif, berkelanjutan, dan mampu memberikan manfaat nyata bagi kesejahteraan masyarakat Kota Batam.",
  tujuan: {
    lead:
      "Membangun ekosistem pertanian Kota Batam yang kuat, inklusif, dan berkelanjutan dengan menjadikan petani sebagai pelaku utama pembangunan daerah. Melalui penguatan kelembagaan, peningkatan kualitas sumber daya manusia, pemanfaatan teknologi, dan perluasan akses pasar, HKTI Kota Batam bertujuan untuk:",
    points: [
      "Meningkatkan kesejahteraan dan kemandirian petani.",
      "Memperkuat ketahanan serta ketersediaan pangan daerah.",
      "Meningkatkan produktivitas dan nilai jual hasil pertanian.",
      "Memberikan perlindungan dan pendampingan kepada petani.",
    ],
  },
  address:
    "Jl. Rasamala No.1, Kabil, Kecamatan Nongsa, Kota Batam, Kepulauan Riau 29433",
  phone: "+62 812-7700-1973 / (0778) 462-890",
  email: "sekretariat@hktibatam.id",
  hours: "Senin – Jumat: 08.30 – 17.00 WIB",
};

// Diisi setelah link resmi didapat dari klien; dipakai untuk sameAs schema.org
// dan tautan sosial di footer. String kosong otomatis di-exclude oleh lib/schema.ts.
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/hkti_kota_batam/",
  facebook: "https://www.facebook.com/dpkhktibatam/",
  youtube: "https://www.youtube.com/channel/UCPE_mKQN1Q3WlAdFLeCwzxg",
  hktiPusat: "https://hkti.org/",
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
    title: "Petani Bersatu",
    description:
      "Konsolidasi kelembagaan tani dari kelompok tani (Poktan), Gapoktan, hingga asosiasi komoditas se-Kota Batam dalam satu wadah berintegritas.",
    iconName: "Users",
    phaseLabel: "Fase Penguatan",
    theme: "forest",
  },
  {
    id: "pilar-2",
    number: "02",
    title: "Pertanian Maju",
    description:
      "Penerapan smart farming, hidroponik presisi, green house intensif, serta digitalisasi rantai pasok untuk menjawab tantangan lahan kepulauan.",
    iconName: "LampDesk",
    phaseLabel: "Fase Modernisasi",
    theme: "forest",
  },
  {
    id: "pilar-3",
    number: "03",
    title: "Ekonomi Tumbuh",
    description:
      "Pemberdayaan off-farm, hilirisasi produk hortikultura, pendirian koperasi agribisnis, dan kemitraan pasar modern perkotaan & ekspor.",
    iconName: "TrendingUp",
    phaseLabel: "Fase Akselerasi",
    theme: "amber",
  },
  {
    id: "pilar-4",
    number: "04",
    title: "Pangan Berdaulat",
    description:
      "Meminimalkan ketergantungan pasokan impor melalui pemanfaatan lahan tidur, agrowisata pulau, dan stabilitas distribusi logistik logis Batam.",
    iconName: "Shield",
    phaseLabel: "Fase Kedaulatan",
    theme: "forest",
  },
  {
    id: "pilar-5",
    number: "05",
    title: "Tani Makmur",
    description:
      "Kesejahteraan hakiki keluarga tani terwujud: jaminan proteksi gagal panen, regenerasi petani milenial, dan taraf hidup yang bermartabat.",
    iconName: "PiggyBank",
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
      "Memperkuat persatuan dan kelembagaan petani di Kota Batam melalui konsolidasi, pembinaan, dan pengembangan organisasi petani secara berkelanjutan.",
    iconName: "Building2",
    theme: "forest",
  },
  {
    id: "misi-2",
    number: "02",
    description:
      "Meningkatkan kapasitas dan kesejahteraan petani melalui pendidikan, pelatihan, kaderisasi, pendampingan, pemberdayaan, serta pengembangan kompetensi sumber daya manusia pertanian.",
    iconName: "GraduationCap",
    theme: "forest",
  },
  {
    id: "misi-3",
    number: "03",
    description:
      "Memperjuangkan aspirasi dan kepentingan petani serta memberikan advokasi dan bantuan hukum dalam rangka memberikan perlindungan terhadap hak dan kepentingan petani.",
    iconName: "Gavel",
    theme: "amber",
  },
  {
    id: "misi-4",
    number: "04",
    description:
      "Mendorong peningkatan produktivitas dan nilai ekonomi pertanian melalui pengembangan usaha tani on farm dan off farm, penguatan kelembagaan ekonomi petani, serta pengembangan agribisnis.",
    iconName: "Store",
    theme: "forest",
  },
  {
    id: "misi-5",
    number: "05",
    description:
      "Mendorong penerapan pertanian modern dan inovatif dengan memanfaatkan teknologi, pengetahuan, serta inovasi yang sesuai dengan kebutuhan dan potensi pertanian di Kota Batam.",
    iconName: "Bot",
    theme: "forest",
  },
  {
    id: "misi-6",
    number: "06",
    description:
      "Membangun dan memperluas kemitraan strategis dengan Pemerintah Daerah, dunia usaha, perguruan tinggi, lembaga keuangan, komunitas, serta berbagai pemangku kepentingan di bidang pertanian.",
    iconName: "Handshake",
    theme: "amber",
  },
  {
    id: "misi-7",
    number: "07",
    description:
      "Mendorong ketahanan pangan, kemandirian pangan, dan kedaulatan pangan melalui penguatan produksi, distribusi, dan pengembangan potensi pertanian daerah.",
    iconName: "ClipboardCheck",
    theme: "forest",
  },
  {
    id: "misi-8",
    number: "08",
    description:
      "Meningkatkan peran generasi muda dan perempuan dalam sektor pertanian melalui kaderisasi, kewirausahaan, inovasi, dan pengembangan ekonomi pertanian.",
    iconName: "Users",
    theme: "forest",
  },
  {
    id: "misi-9",
    number: "09",
    description:
      "Membangun organisasi HKTI Kota Batam yang profesional, terbuka, demokratis, gotong royong, berintegritas, dan bebas dari pengaruh politik praktis.",
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
    title: "Pelantikan Dewan Pimpinan DPD & DPC HKTI Kepulauan Riau",
    category: "Pelantikan Akbar",
    date: "24 Februari 2026",
    description:
      "Pengukuhan resmi serentak jajaran pengurus kabupaten/kota masa bakti 2026–2031.",
    imageUrl: "/images/gambar-2.webp",
    fallbackUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1469&auto=format&fit=crop",
    isFeatured: true,
  },
  {
    id: "galeri-2",
    title: "Jajaran Pengurus Terpilih dan Pimpinan DPD/DPC HKTI",
    category: "Konsolidasi Pengurus",
    date: "24 Februari 2026",
    description:
      "Soliditas pimpinan daerah dan cabang siap menggerakkan roda organisasi.",
    imageUrl: "/images/gambar-5.webp",
    fallbackUrl: "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "galeri-3",
    title: "Penyerahan Pataka Bendera Kebesaran HKTI",
    category: "Prosesi Pataka",
    date: "24 Februari 2026",
    description:
      "Prosesi sakral penyerahan panji kebesaran kepengurusan HKTI Kepri.",
    imageUrl: "/images/gambar-3.webp",
    fallbackUrl: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "galeri-4",
    title: "Foto Bersama Pelantikan & Musda DPC se-Kepulauan Riau",
    category: "Konsolidasi Pengurus",
    date: "24 Februari 2026",
    description:
      "Kader tani dan jajaran pengurus bersatu memajukan pertanian Kepulauan Riau.",
    imageUrl: "/images/gambar-6.webp",
    fallbackUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "galeri-5",
    title: "Pengibaran Pataka & Semarak Panji HKTI Daerah",
    category: "Prosesi Pataka",
    date: "24 Februari 2026",
    description:
      "Semarak pengibaran bendera kebanggaan HKTI menyongsong kedaulatan pangan.",
    imageUrl: "/images/gambar-4.webp",
    fallbackUrl: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1469&auto=format&fit=crop",
  },
  {
    id: "galeri-6",
    title: "Sidang Pleno & Musyawarah Cabang HKTI Kota Batam",
    category: "Musyawarah Cabang",
    date: "15 Januari 2026",
    description:
      "Perumusan 5 pilar perjuangan dan 9 butir misi ketahanan pangan mandiri serta tata kelola organisasi.",
    imageUrl: "/images/gambar-1.webp",
    fallbackUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1469&auto=format&fit=crop",
  },
];

export const KECAMATAN_OPTIONS = [
  "Batam Kota",
  "Nongsa",
  "Bengkong",
  "Batu Ampar",
  "Lubuk Baja",
  "Sekupang",
  "Batu Aji",
  "Sagulung",
  "Sei Beduk",
  "Galang",
  "Bulang",
  "Belakang Padang",
];

export const KATEGORI_OPTIONS = [
  "Petani Mandiri / Urban Farmer",
  "Kelompok Tani (Poktan / Gapoktan)",
  "Pelaku Usaha / Distributor Pangan",
  "Pemilik Lahan / Investor Agrikultur",
  "Akademisi / Mahasiswa Agribisnis",
  "Masyarakat Umum",
];
