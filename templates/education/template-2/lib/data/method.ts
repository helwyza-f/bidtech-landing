import type { LucideIcon } from "lucide-react";
import { Compass, Layers, FileCheck, Briefcase } from "lucide-react";

export type MethodStep = {
  no: string;
  title: string;
  description: string;
  detail: string;
  icon: LucideIcon;
};

// Satu-satunya tempat penomoran 01-04 dibenarkan — isinya memang berurutan.
export const methodSteps: MethodStep[] = [
  {
    no: "01",
    title: "Tentukan tujuan",
    description:
      "Ikuti asesmen minat 5 menit untuk memetakan jalur belajar yang paling sesuai dengan latar belakang dan target kariermu.",
    detail: "Tes diagnostik minat, konsultasi kurikulum gratis, dan rekomendasi roadmap personal.",
    icon: Compass,
  },
  {
    no: "02",
    title: "Ikuti jalur belajar",
    description:
      "Kelas tersusun berurutan dari modul dasar sampai lanjutan, jadi kamu tidak perlu menebak harus mulai dari mana.",
    detail: "Materi video berdefinisi tinggi, cheatsheet praktis, dan kuis pemahaman di tiap modul.",
    icon: Layers,
  },
  {
    no: "03",
    title: "Kerjakan project nyata",
    description:
      "Setiap jalur ditutup project studi kasus standar industri yang dinilai langsung oleh mentor dari industri.",
    detail: "Feedback baris-demi-baris, sesi review live 1-on-1, dan revisi terarah hingga portfolio layak tayang.",
    icon: FileCheck,
  },
  {
    no: "04",
    title: "Siapkan langkah karier",
    description:
      "Review portfolio, simulasi wawancara teknis, dan rekomendasi langsung ke perusahaan hiring partner.",
    detail: "Rekomendasi kandidat ke 80+ jejaring hiring partner kami di Asia Tenggara.",
    icon: Briefcase,
  },
];
