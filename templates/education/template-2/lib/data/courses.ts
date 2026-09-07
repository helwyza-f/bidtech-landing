import { nivoraAssets } from "@/lib/data/asset-paths";

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
  image: string;
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
    image: nivoraAssets.courses.advancedReactNextjs,
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
    image: nivoraAssets.courses.typescriptModernWeb,
  },
  {
    slug: "frontend-performance",
    title: "Frontend Performance Engineering",
    category: "Web",
    level: "Mahir",
    duration: "8 jam",
    lessons: "20 materi",
    mentor: "Raka Pratama",
    mentorRole: "Sr. Frontend Eng.",
    tag: "Core Web Vitals, Lazy Loading, Caching",
    image: nivoraAssets.courses.frontendPerformance,
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
    image: nivoraAssets.courses.designSystemFigma,
  },
  {
    slug: "ux-research",
    title: "UX Research untuk Produk Digital",
    category: "Design",
    level: "Menengah",
    duration: "9 jam",
    lessons: "22 materi",
    mentor: "Maya Lestari",
    mentorRole: "UX Researcher",
    tag: "User Interview, Usability Testing, Insight",
    image: nivoraAssets.courses.uxResearch,
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
    image: nivoraAssets.courses.uiDesignFundamentals,
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
    tag: "PostgreSQL, CTE, Window Functions, Studi Kasus",
    image: nivoraAssets.courses.sqlDataAnalysis,
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
    image: nivoraAssets.courses.powerBiVisualization,
  },
  {
    slug: "python-data-analysis",
    title: "Python untuk Analisis Data",
    category: "Data",
    level: "Menengah",
    duration: "13 jam",
    lessons: "34 materi",
    mentor: "Adrian Wijaya",
    mentorRole: "Data Scientist",
    tag: "Pandas, NumPy, Data Cleaning, Visualisasi",
    image: nivoraAssets.courses.pythonDataAnalysis,
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
    image: nivoraAssets.courses.aiProductivity,
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
    image: nivoraAssets.courses.aiProductivity,
  },
];

export const courseCategories: Array<{ value: CourseCategory | "Semua"; label: string }> = [
  { value: "Semua", label: "Semua bidang" },
  { value: "Web", label: "Web" },
  { value: "Design", label: "Design" },
  { value: "Data", label: "Data" },
  { value: "Excel", label: "Excel" },
];
