import { nivoraAssets } from "@/lib/data/asset-paths";

export type Program = {
  slug: string;
  image: string;
  classCount: number;
  title: string;
  description: string;
  skills: string[];
};

export const programs: Program[] = [
  {
    slug: "web-programming",
    image: nivoraAssets.courses.advancedReactNextjs,
    classCount: 12,
    title: "Web Programming",
    description:
      "Bangun aplikasi web modern dari HTML/CSS dasar, TypeScript, arsitektur React, hingga deployment Next.js fullstack.",
    skills: ["React & Next.js", "TypeScript", "API & Database"],
  },
  {
    slug: "uiux-product-design",
    image: nivoraAssets.courses.designSystemFigma,
    classCount: 9,
    title: "UI/UX & Product Design",
    description:
      "Kuasai riset pengguna, wireframing, prototipe interaktif Figma, hingga perancangan design system yang dipakai tim.",
    skills: ["User Research", "Figma Prototyping", "Design System"],
  },
  {
    slug: "data-analytics",
    image: nivoraAssets.courses.sqlDataAnalysis,
    classCount: 10,
    title: "Data & Analytics",
    description:
      "Olah data kompleks menjadi rekomendasi bisnis memakai SQL, Python, manipulasi data, dan visualisasi Power BI.",
    skills: ["SQL & Python", "Data Visualization", "Business Insight"],
  },
  {
    slug: "excel-office-productivity",
    image: nivoraAssets.courses.aiProductivity,
    classCount: 7,
    title: "Excel & Office Productivity",
    description:
      "Kuasai rumus lanjutan, Power Query, pivot dinamis, otomasi laporan rutin, dan bantuan AI untuk kerja lebih cepat.",
    skills: ["Advanced Formula", "Power Query", "AI Workflow"],
  },
];
