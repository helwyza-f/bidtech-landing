import type { LucideIcon } from "lucide-react";
import { Code2, PenTool, BarChart3, Table2 } from "lucide-react";

export type Program = {
  slug: string;
  icon: LucideIcon;
  classCount: number;
  title: string;
  description: string;
};

export const programs: Program[] = [
  {
    slug: "web-programming",
    icon: Code2,
    classCount: 12,
    title: "Web Programming",
    description:
      "Bangun aplikasi web modern dari HTML/CSS dasar, TypeScript, arsitektur React, hingga deployment Next.js fullstack.",
  },
  {
    slug: "uiux-product-design",
    icon: PenTool,
    classCount: 9,
    title: "UI/UX & Product Design",
    description:
      "Kuasai riset pengguna, wireframing, prototipe interaktif Figma, hingga perancangan design system yang dipakai tim.",
  },
  {
    slug: "data-analytics",
    icon: BarChart3,
    classCount: 10,
    title: "Data & Analytics",
    description:
      "Olah data kompleks menjadi rekomendasi bisnis memakai SQL, Python, manipulasi data, dan visualisasi Power BI.",
  },
  {
    slug: "excel-office-productivity",
    icon: Table2,
    classCount: 7,
    title: "Excel & Office Productivity",
    description:
      "Kuasai rumus lanjutan, Power Query, pivot dinamis, otomasi laporan rutin, dan bantuan AI untuk kerja lebih cepat.",
  },
];
