import { nivoraAssets } from "@/lib/data/asset-paths";

export type TimelineMilestone = {
  year: string;
  title: string;
  description: string;
  image: string;
};

export const aboutTimeline: TimelineMilestone[] = [
  {
    year: "2021",
    title: "Nivora Academy dimulai",
    description: "Berawal dari kelas komunitas kecil untuk pemula yang ingin pindah karier ke bidang digital.",
    image: nivoraAssets.about.learningCommunity,
  },
  {
    year: "2022",
    title: "Jalur spesialisasi pertama",
    description: "Web Programming dan Data Analytics resmi jadi jalur terstruktur dengan mentor tetap.",
    image: nivoraAssets.intensive.mentoring,
  },
  {
    year: "2023",
    title: "Bootcamp intensif diluncurkan",
    description: "Program 12 minggu dengan project skala produksi dan koneksi langsung ke hiring partner.",
    image: nivoraAssets.intensive.project,
  },
  {
    year: "2025",
    title: "12.000+ learner aktif",
    description: "Komunitas alumni tumbuh di 6 kota, dengan mentor dari perusahaan teknologi terkemuka.",
    image: nivoraAssets.career.careerConsultation,
  },
];

export type AboutValue = {
  title: string;
  description: string;
};

/** Nilai/prinsip inti — khusus dipakai di halaman /tentang, tidak ada di homepage. */
export const aboutValues: AboutValue[] = [
  {
    title: "Portfolio, bukan sertifikat semata",
    description:
      "Kami mengukur keberhasilan belajar dari karya nyata yang bisa ditunjukkan ke perekrut, bukan sekadar selembar sertifikat kelulusan.",
  },
  {
    title: "Mentor yang masih aktif berkarya",
    description:
      "Semua mentor kami adalah praktisi yang masih bekerja di industri — materi selalu relevan dengan apa yang benar-benar dipakai tim engineering dan desain saat ini.",
  },
  {
    title: "Jujur soal ekspektasi",
    description:
      "Kami tidak menjanjikan jaminan kerja instan. Yang kami janjikan adalah persiapan sekuat mungkin — portfolio, koneksi, dan kepercayaan diri menghadapi rekrutmen nyata.",
  },
];

export const aboutMission =
  "Menjadi jembatan antara niat belajar dan kemampuan kerja nyata — supaya setiap orang yang serius ingin berkarier di bidang digital punya jalur yang jelas untuk diikuti, bukan tutorial acak tanpa arah.";