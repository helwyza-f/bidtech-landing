import type { NavLink, Statistic, FAQItem } from "@app-types/index";

export const SITE_NAME = "Yayasan Bhakti Nusantara";
export const SITE_DESCRIPTION = "Merajut Kepedulian, Memberdayakan Masyarakat, Membangun Negeri";

/**
 * Base path this template is deployed under (keep in sync with next.config.ts).
 * `next/image` does not prefix `public/` assets on a static export, so build
 * every image URL through `asset()`.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "";
export const asset = (path: string) => `${BASE_PATH}${path}`;

/** Contact details for Yayasan Bhakti Nusantara */
export const CONTACT = {
  address: "Gedung Graha Bhakti Nusantara, Jl. Tebet Raya No. 45, Jakarta Selatan 12810",
  phoneLabel: "+62 21 8370 5520",
  whatsapp: "6281289001234",
  instagramHandle: "@bhaktinusantara.id",
  instagramUrl: "https://instagram.com/bhaktinusantara.id",
};

export const NAV_LINKS: NavLink[] = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "#about" },
  { label: "Program", href: "#program" },
  { label: "Partisipasi", href: "#membership" },
  { label: "FAQ", href: "#faq" },
];

export const STATISTICS: Statistic[] = [
  { label: "Berdiri Sejak", value: "2018" },
  { label: "Penerima Manfaat", value: "45.000+" },
  { label: "Relawan Terdaftar", value: "3.800+" },
  { label: "Kabupaten/Kota", value: "28" },
];

export const MISSION_POINTS = [
  "Penyaluran Bantuan Sosial & Pos Kesehatan Terpadu",
  "Pemberian Beasiswa Pendidikan & Pembinaan Generasi Muda",
  "Pelatihan Keterampilan Mandiri & Pemberdayaan UMKM Warga",
  "Aksi Cepat Tanggap Bencana & Restorasi Lingkungan Hidup",
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Apa itu Yayasan Bhakti Nusantara dan bagaimana legalitasnya?",
    answer: "Yayasan Bhakti Nusantara adalah organisasi sosial kemasyarakatan nirlaba independen yang telah terdaftar resmi di Kemenkumham RI serta diawasi oleh Dinas Sosial."
  },
  {
    question: "Bagaimana cara mendaftar menjadi Sahabat Relawan?",
    answer: "Pendaftaran relawan terbuka gratis untuk seluruh masyarakat. Anda dapat mengisi formulir pendaftaran relawan melalui tombol WhatsApp atau saat pendaftaran program dibuka."
  },
  {
    question: "Apakah donasi yang disalurkan dapat dipertanggungjawabkan?",
    answer: "Ya, kami menjunjung tinggi transparansi. Setiap laporan keuangan dan penyaluran program diaudit secara berkala oleh Akuntan Publik independen dan dipublikasikan di kanal resmi yayasan."
  },
  {
    question: "Bagaimana mekanisme pengajuan bantuan untuk warga yang membutuhkan?",
    answer: "Masyarakat atau pengurus RT/RW setempat dapat mengajukan permohonan rekomendasi bantuan sosial atau beasiswa dengan menyertakan surat keterangan melalui sekretariat kami."
  },
  {
    question: "Apakah perusahaan kami dapat bekerja sama dalam program CSR?",
    answer: "Tentu. Kami memiliki skema kemitraan korporasi terstruktur untuk merancang, mengeksekusi, dan menyusun laporan dampak sosial (Social Return on Investment) bagi program CSR Anda."
  },
  {
    question: "Di mana saja cakupan wilayah program Bhakti Nusantara?",
    answer: "Saat ini kami memiliki 28 posko dan cabang relawan aktif yang tersebar di pulau Jawa, Sumatera, Kalimantan, Sulawesi, hingga Nusa Tenggara."
  }
];

