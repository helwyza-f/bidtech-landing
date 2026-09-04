export type CourseCategory = "Web" | "Design" | "Data" | "Excel";
export type CourseLevel = "Pemula" | "Menengah" | "Mahir";

export type Course = {
  slug: string;
  title: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: string;
  lessons: string;
  mentor: string;
  mentorRole: string;
  tag: string;
  /** Kelas warna aksen untuk thumbnail placeholder — ganti dengan gambar asli saat aset tersedia. */
  accent: string;
};

export const courses: Course[] = [
  {
    slug: "advanced-react-nextjs",
    title: "Advanced React & Next.js",
    category: "Web",
    level: "Mahir",
    duration: "14 jam",
    lessons: "36 materi",
    mentor: "Raka Pratama",
    mentorRole: "Sr. Frontend Eng.",
    tag: "Next.js 15, App Router, SSR, Turbopack",
    accent: "from-blue-600/20 to-indigo-600/10",
  },
  {
    slug: "typescript-modern-web",
    title: "TypeScript untuk Web Modern",
    category: "Web",
    level: "Menengah",
    duration: "9 jam",
    lessons: "24 materi",
    mentor: "Kevin Aditya",
    mentorRole: "Backend Engineer",
    tag: "Generics, Utility Types, Type-safe API",
    accent: "from-sky-600/20 to-cyan-600/10",
  },
  {
    slug: "design-system-figma",
    title: "Design System dengan Figma",
    category: "Design",
    level: "Menengah",
    duration: "10 jam",
    lessons: "28 materi",
    mentor: "Nadia Maharani",
    mentorRole: "Product Designer",
    tag: "Tokens, Component Props, Auto-layout",
    accent: "from-violet-600/20 to-purple-600/10",
  },
  {
    slug: "ui-design-fundamentals",
    title: "UI Design Fundamentals",
    category: "Design",
    level: "Pemula",
    duration: "12 jam",
    lessons: "30 materi",
    mentor: "Maya Lestari",
    mentorRole: "UX Researcher",
    tag: "Grid, Hierarchy, Visual Balance, Prototyping",
    accent: "from-pink-600/20 to-rose-600/10",
  },
  {
    slug: "sql-data-analysis",
    title: "SQL untuk Analisis Data Bisnis",
    category: "Data",
    level: "Pemula",
    duration: "11 jam",
    lessons: "32 materi",
    mentor: "Adrian Wijaya",
    mentorRole: "Data Scientist",
    tag: "PostgreSQL, CTE, Window Functions, Case Studies",
    accent: "from-emerald-600/20 to-teal-600/10",
  },
  {
    slug: "power-bi-visualization",
    title: "Visualisasi Data dengan Power BI",
    category: "Data",
    level: "Menengah",
    duration: "8 jam",
    lessons: "22 materi",
    mentor: "Adrian Wijaya",
    mentorRole: "Data Scientist",
    tag: "DAX, Interactive Dashboards, ETL",
    accent: "from-amber-600/20 to-orange-600/10",
  },
  {
    slug: "excel-for-analyst",
    title: "Excel untuk Analis & Otomasi Kerja",
    category: "Excel",
    level: "Pemula",
    duration: "9 jam",
    lessons: "26 materi",
    mentor: "Sarah Azizah",
    mentorRole: "Business Analyst",
    tag: "XLOOKUP, Power Query, Dynamic Pivot",
    accent: "from-green-600/20 to-emerald-600/10",
  },
  {
    slug: "ai-productivity",
    title: "AI Tools untuk Produktivitas Kerja",
    category: "Excel",
    level: "Pemula",
    duration: "5 jam",
    lessons: "16 materi",
    mentor: "Sarah Azizah",
    mentorRole: "Business Analyst",
    tag: "Prompt Workflow, Spreadsheet Copilot",
    accent: "from-cyan-600/20 to-blue-600/10",
  },
];

export const courseCategories: Array<{ value: CourseCategory | "Semua"; label: string }> = [
  { value: "Semua", label: "Semua bidang" },
  { value: "Web", label: "Web" },
  { value: "Design", label: "Design" },
  { value: "Data", label: "Data" },
  { value: "Excel", label: "Excel" },
];
