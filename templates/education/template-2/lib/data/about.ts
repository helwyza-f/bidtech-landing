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