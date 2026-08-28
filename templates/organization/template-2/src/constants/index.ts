import type { NavLink, Statistic, FAQItem } from "@app-types/index";

export const SITE_NAME = "Nama Organisasi";
export const SITE_DESCRIPTION = "Slogan Singkat Organisasi Anda";

/**
 * Base path this template is deployed under (keep in sync with next.config.ts).
 * `next/image` does not prefix `public/` assets on a static export, so build
 * every image URL through `asset()`.
 */
export const BASE_PATH = "/demo/community-pro";
export const asset = (path: string) => `${BASE_PATH}${path}`;

/** Placeholder contact details — replace with your organization's real data. */
export const CONTACT = {
  address: "Alamat organisasi Anda di sini",
  phoneLabel: "+62 000-0000-0000",
  whatsapp: "620000000000",
  instagramHandle: "@organisasi",
  instagramUrl: "#",
};

export const NAV_LINKS: NavLink[] = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "#about" },
  { label: "Program", href: "#programs" },
  { label: "Galeri", href: "#gallery" },
];

export const STATISTICS: Statistic[] = [
  { label: "Berdiri Sejak", value: "2020" },
  { label: "Simpatisan", value: "0+" },
  { label: "Anggota Terdaftar", value: "0+" },
  { label: "Negara Cross-Border", value: "0" },
];

export const MISSION_POINTS = [
  "Poin Misi Pertama",
  "Poin Misi Kedua",
  "Poin Misi Ketiga",
  "Poin Misi Keempat",
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Contoh pertanyaan pertama?",
    answer: "Contoh jawaban untuk pertanyaan pertama. Ganti teks placeholder ini dengan jawaban yang sesuai untuk organisasi Anda."
  },
  {
    question: "Contoh pertanyaan kedua?",
    answer: "Contoh jawaban untuk pertanyaan kedua. Ganti teks placeholder ini dengan jawaban yang sesuai untuk organisasi Anda."
  },
  {
    question: "Contoh pertanyaan ketiga?",
    answer: "Contoh jawaban untuk pertanyaan ketiga. Ganti teks placeholder ini dengan jawaban yang sesuai untuk organisasi Anda."
  },
  {
    question: "Contoh pertanyaan keempat?",
    answer: "Contoh jawaban untuk pertanyaan keempat. Ganti teks placeholder ini dengan jawaban yang sesuai untuk organisasi Anda."
  },
  {
    question: "Contoh pertanyaan kelima?",
    answer: "Contoh jawaban untuk pertanyaan kelima. Ganti teks placeholder ini dengan jawaban yang sesuai untuk organisasi Anda."
  },
  {
    question: "Contoh pertanyaan keenam?",
    answer: "Contoh jawaban untuk pertanyaan keenam. Ganti teks placeholder ini dengan jawaban yang sesuai untuk organisasi Anda."
  }
];
