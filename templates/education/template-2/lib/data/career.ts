import type { LucideIcon } from "lucide-react";
import { FileCheck, Users, Briefcase } from "lucide-react";

export type CareerService = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const careerServices: CareerService[] = [
  {
    icon: FileCheck,
    title: "Review portfolio personal",
    description:
      "Mentor menilai repositori GitHub atau file Figma studi kasusmu, lalu memberi catatan revisi tertulis agar portfolio siap bersaing di tahap screening.",
  },
  {
    icon: Users,
    title: "Sesi konsultasi 1-on-1",
    description:
      "Sesi bersama konsultan karier untuk memetakan target peran, ekspektasi gaji industri, dan strategi menjawab interview HR.",
  },
  {
    icon: Briefcase,
    title: "Koneksi hiring partner",
    description:
      "Akses langsung ke database lowongan internal dan rekomendasi profil lulusan terpilih ke 80+ perusahaan teknologi rekanan kami.",
  },
];
