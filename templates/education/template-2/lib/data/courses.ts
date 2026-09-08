import { nivoraAssets } from "@/lib/data/asset-paths";

export type CourseCategory = "Web" | "Design" | "Data" | "Excel";
export type CourseLevel = "Pemula" | "Menengah" | "Mahir";

export type SyllabusModule = {
  title: string;
  topics: string[];
};

export type Course = {
  slug: string;
  title: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: string;
  lessons: string;
  mentor: string;
  mentorSlug: string;
  mentorRole: string;
  tag: string;
  image: string;
  /** Deskripsi lengkap 2-3 kalimat untuk halaman detail. */
  description: string;
  syllabus: SyllabusModule[];
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
    mentorSlug: "raka-pratama",
    mentorRole: "Sr. Frontend Eng.",
    tag: "Next.js 15, App Router, SSR, Turbopack",
    image: nivoraAssets.courses.advancedReactNextjs,
    description:
      "Kuasai arsitektur aplikasi React skala produksi menggunakan Next.js 15 App Router. Kelas ini fokus pada pola rendering modern (SSR, ISR, streaming), optimasi performa, dan deployment siap pakai.",
    syllabus: [
      {
        title: "Fondasi App Router",
        topics: ["Routing berbasis file", "Layout & template bersarang", "Server vs Client Components"],
      },
      {
        title: "Data Fetching & Rendering",
        topics: ["Server Actions", "Streaming & Suspense", "Caching strategy Next.js 15"],
      },
      {
        title: "Optimasi Produksi",
        topics: ["Turbopack build pipeline", "Bundle analysis", "Core Web Vitals tuning"],
      },
      {
        title: "Project Akhir",
        topics: ["Dashboard fullstack dengan API routes", "Deployment ke Vercel", "Code review bersama mentor"],
      },
    ],
  },
  {
    slug: "typescript-modern-web",
    title: "TypeScript untuk Web Modern",
    category: "Web",
    level: "Menengah",
    duration: "9 jam",
    lessons: "24 materi",
    mentor: "Kevin Aditya",
    mentorSlug: "kevin-aditya",
    mentorRole: "Backend Engineer",
    tag: "Generics, Utility Types, Type-safe API",
    image: nivoraAssets.courses.typescriptModernWeb,
    description:
      "Bangun fondasi TypeScript yang kokoh untuk pengembangan web — dari tipe dasar sampai pola lanjutan yang dipakai tim engineering profesional untuk menjaga kode tetap aman dan mudah dirawat.",
    syllabus: [
      { title: "Dasar Tipe & Interface", topics: ["Type vs Interface", "Union & Intersection Types", "Narrowing"] },
      { title: "Generics", topics: ["Generic function & class", "Constraint pada generics", "Utility types bawaan"] },
      { title: "Integrasi API Type-safe", topics: ["Validasi runtime dengan Zod", "Typed fetch wrapper", "Error handling"] },
    ],
  },
  {
    slug: "frontend-performance",
    title: "Frontend Performance Engineering",
    category: "Web",
    level: "Mahir",
    duration: "8 jam",
    lessons: "20 materi",
    mentor: "Raka Pratama",
    mentorSlug: "raka-pratama",
    mentorRole: "Sr. Frontend Eng.",
    tag: "Core Web Vitals, Lazy Loading, Caching",
    image: nivoraAssets.courses.frontendPerformance,
    description:
      "Pelajari teknik audit dan optimasi performa web tingkat lanjut — dari analisis Core Web Vitals sampai strategi caching dan code-splitting yang berdampak langsung pada pengalaman pengguna.",
    syllabus: [
      { title: "Audit Performa", topics: ["Lighthouse & Web Vitals", "Profiling dengan DevTools", "Menentukan prioritas perbaikan"] },
      { title: "Optimasi Loading", topics: ["Lazy loading & code splitting", "Image optimization", "Font loading strategy"] },
      { title: "Caching & Delivery", topics: ["HTTP caching headers", "CDN strategy", "Service worker dasar"] },
    ],
  },
  {
    slug: "design-system-figma",
    title: "Design System dengan Figma",
    category: "Design",
    level: "Menengah",
    duration: "10 jam",
    lessons: "28 materi",
    mentor: "Nadia Maharani",
    mentorSlug: "nadia-maharani",
    mentorRole: "Product Designer",
    tag: "Tokens, Component Props, Auto-layout",
    image: nivoraAssets.courses.designSystemFigma,
    description:
      "Rancang design system yang benar-benar dipakai tim engineering — mulai dari naming token yang konsisten, component variant, sampai dokumentasi yang memudahkan handoff ke developer.",
    syllabus: [
      { title: "Fondasi Token", topics: ["Color & typography tokens", "Spacing scale", "Naming convention"] },
      { title: "Component Architecture", topics: ["Variants & properties", "Auto-layout lanjutan", "Nested components"] },
      { title: "Dokumentasi & Handoff", topics: ["Dev mode Figma", "Anotasi spesifikasi", "Kolaborasi dengan engineer"] },
    ],
  },
  {
    slug: "ux-research",
    title: "UX Research untuk Produk Digital",
    category: "Design",
    level: "Menengah",
    duration: "9 jam",
    lessons: "22 materi",
    mentor: "Maya Lestari",
    mentorSlug: "maya-lestari",
    mentorRole: "UX Researcher",
    tag: "User Interview, Usability Testing, Insight",
    image: nivoraAssets.courses.uxResearch,
    description:
      "Kuasai metodologi riset pengguna dari perencanaan sampai sintesis insight — supaya keputusan desain produk selalu berbasis data, bukan asumsi semata.",
    syllabus: [
      { title: "Perencanaan Riset", topics: ["Menentukan pertanyaan riset", "Memilih metode yang tepat", "Rekrutmen partisipan"] },
      { title: "Pelaksanaan", topics: ["Teknik user interview", "Usability testing moderat", "Dokumentasi temuan"] },
      { title: "Sintesis & Presentasi", topics: ["Affinity mapping", "Membuat insight report", "Presentasi ke stakeholder"] },
    ],
  },
  {
    slug: "ui-design-fundamentals",
    title: "UI Design Fundamentals",
    category: "Design",
    level: "Pemula",
    duration: "12 jam",
    lessons: "30 materi",
    mentor: "Maya Lestari",
    mentorSlug: "maya-lestari",
    mentorRole: "UX Researcher",
    tag: "Grid, Hierarchy, Visual Balance, Prototyping",
    image: nivoraAssets.courses.uiDesignFundamentals,
    description:
      "Bangun fondasi visual design dari nol — memahami grid, hierarki, dan keseimbangan visual sebelum melangkah ke prototyping interaktif di Figma.",
    syllabus: [
      { title: "Prinsip Visual", topics: ["Grid system", "Hierarki visual", "Kontras & keseimbangan"] },
      { title: "Tipografi & Warna", topics: ["Pairing tipografi", "Teori warna untuk UI", "Aksesibilitas kontras"] },
      { title: "Prototyping Dasar", topics: ["Interaksi sederhana Figma", "Micro-interaction", "Presentasi desain"] },
    ],
  },
  {
    slug: "sql-data-analysis",
    title: "SQL untuk Analisis Data Bisnis",
    category: "Data",
    level: "Pemula",
    duration: "11 jam",
    lessons: "32 materi",
    mentor: "Adrian Wijaya",
    mentorSlug: "adrian-wijaya",
    mentorRole: "Data Scientist",
    tag: "PostgreSQL, CTE, Window Functions, Studi Kasus",
    image: nivoraAssets.courses.sqlDataAnalysis,
    description:
      "Pelajari SQL dari dasar sampai teknik lanjutan yang dipakai analis data profesional untuk mengolah data bisnis nyata menjadi rekomendasi actionable.",
    syllabus: [
      { title: "Dasar Query", topics: ["SELECT, WHERE, JOIN", "Aggregasi & GROUP BY", "Subquery"] },
      { title: "Teknik Lanjutan", topics: ["Common Table Expressions", "Window functions", "Optimasi query"] },
      { title: "Studi Kasus Bisnis", topics: ["Analisis retensi pelanggan", "Laporan penjualan", "Presentasi hasil analisis"] },
    ],
  },
  {
    slug: "power-bi-visualization",
    title: "Visualisasi Data dengan Power BI",
    category: "Data",
    level: "Menengah",
    duration: "8 jam",
    lessons: "22 materi",
    mentor: "Adrian Wijaya",
    mentorSlug: "adrian-wijaya",
    mentorRole: "Data Scientist",
    tag: "DAX, Interactive Dashboards, ETL",
    image: nivoraAssets.courses.powerBiVisualization,
    description:
      "Rancang dashboard eksekutif yang interaktif dan mudah dipahami — dari transformasi data mentah dengan Power Query sampai perhitungan metrik bisnis dengan DAX.",
    syllabus: [
      { title: "Persiapan Data", topics: ["Power Query dasar", "Data modeling", "Relasi antar tabel"] },
      { title: "DAX & Perhitungan", topics: ["Measure vs calculated column", "Time intelligence", "Fungsi DAX lanjutan"] },
      { title: "Dashboard Interaktif", topics: ["Layout & storytelling data", "Filter & slicer", "Publikasi & sharing"] },
    ],
  },
  {
    slug: "python-data-analysis",
    title: "Python untuk Analisis Data",
    category: "Data",
    level: "Menengah",
    duration: "13 jam",
    lessons: "34 materi",
    mentor: "Adrian Wijaya",
    mentorSlug: "adrian-wijaya",
    mentorRole: "Data Scientist",
    tag: "Pandas, NumPy, Data Cleaning, Visualisasi",
    image: nivoraAssets.courses.pythonDataAnalysis,
    description:
      "Gunakan Python sebagai alat analisis data sehari-hari — pembersihan data, eksplorasi, sampai visualisasi yang komunikatif menggunakan Pandas dan library visualisasi populer.",
    syllabus: [
      { title: "Fondasi Pandas & NumPy", topics: ["DataFrame & Series", "Indexing & filtering", "Operasi vektor NumPy"] },
      { title: "Pembersihan Data", topics: ["Handling missing values", "Deteksi outlier", "Transformasi tipe data"] },
      { title: "Eksplorasi & Visualisasi", topics: ["Statistik deskriptif", "Matplotlib & Seaborn", "Notebook storytelling"] },
    ],
  },
  {
    slug: "excel-for-analyst",
    title: "Excel untuk Analis & Otomasi Kerja",
    category: "Excel",
    level: "Pemula",
    duration: "9 jam",
    lessons: "26 materi",
    mentor: "Sarah Azizah",
    mentorSlug: "sarah-azizah",
    mentorRole: "Business Analyst",
    tag: "XLOOKUP, Power Query, Dynamic Pivot",
    image: nivoraAssets.courses.aiProductivity,
    description:
      "Otomasi pekerjaan spreadsheet rutin dan kuasai rumus lanjutan yang langsung dipakai analis bisnis harian — dari XLOOKUP sampai pivot table dinamis.",
    syllabus: [
      { title: "Rumus Lanjutan", topics: ["XLOOKUP & INDEX-MATCH", "Rumus array dinamis", "Conditional logic bertingkat"] },
      { title: "Power Query", topics: ["Import & transformasi data", "Merge & append query", "Refresh otomatis"] },
      { title: "Pivot & Otomasi Laporan", topics: ["Dynamic pivot table", "Template laporan mingguan", "Dasar macro sederhana"] },
    ],
  },
  {
    slug: "ai-productivity",
    title: "AI Tools untuk Produktivitas Kerja",
    category: "Excel",
    level: "Pemula",
    duration: "5 jam",
    lessons: "16 materi",
    mentor: "Sarah Azizah",
    mentorSlug: "sarah-azizah",
    mentorRole: "Business Analyst",
    tag: "Prompt Workflow, Spreadsheet Copilot",
    image: nivoraAssets.courses.aiProductivity,
    description:
      "Manfaatkan AI sebagai asisten kerja sehari-hari — menyusun prompt yang efektif untuk riset, penulisan laporan, dan otomasi tugas administratif rutin.",
    syllabus: [
      { title: "Dasar Prompting", topics: ["Struktur prompt efektif", "Iterasi & refinement", "Kasus penggunaan kantor"] },
      { title: "Integrasi Spreadsheet", topics: ["AI copilot untuk formula", "Ringkasan data otomatis", "Validasi hasil AI"] },
    ],
  },
];

export const courseCategories: Array<{ value: CourseCategory | "Semua"; label: string }> = [
  { value: "Semua", label: "Semua bidang" },
  { value: "Web", label: "Web" },
  { value: "Design", label: "Design" },
  { value: "Data", label: "Data" },
  { value: "Excel", label: "Excel" },
];

export const courseLevels: CourseLevel[] = ["Pemula", "Menengah", "Mahir"];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getRelatedCourses(course: Course, limit = 3): Course[] {
  return courses.filter((c) => c.category === course.category && c.slug !== course.slug).slice(0, limit);
}

export function getCoursesByMentor(mentorSlug: string): Course[] {
  return courses.filter((c) => c.mentorSlug === mentorSlug);
}