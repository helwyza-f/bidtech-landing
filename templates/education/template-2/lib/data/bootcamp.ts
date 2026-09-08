export type BootcampStage = {
  period: string;
  title: string;
  badge: string;
  focus: string;
  skills: string[];
};

export const bootcampStages: BootcampStage[] = [
  {
    period: "Minggu 1–2",
    title: "Fondasi & Mental Model",
    badge: "Tahap 01",
    focus: "Dasar teknis, toolstack kerja modern, dan cara berpikir computational yang dipakai di tim engineering.",
    skills: ["Git & GitHub Workflow", "Core Standards", "Logic & Architecture"],
  },
  {
    period: "Minggu 3–4",
    title: "Inti Keahlian Teknis",
    badge: "Tahap 02",
    focus: "Materi inti sesuai spesialisasi jalur, dilatih lewat simulasi studi kasus mingguan dengan standar tim profesional.",
    skills: ["State Management", "Design Patterns", "Clean Code Implementation"],
  },
  {
    period: "Minggu 5–6",
    title: "Tools & Kolaborasi Industri",
    badge: "Tahap 03",
    focus: "Workflow agile, integrasi API, kolaborasi lintas peran (Product & Engineering), serta version control tim.",
    skills: ["CI/CD Pipeline", "Testing & Debugging", "Sprint Simulation"],
  },
  {
    period: "Minggu 7–8",
    title: "Project Skala Produksi",
    badge: "Tahap 04",
    focus: "Membangun satu produk aplikasi penuh dari tahap perancangan arsitektur sampai tahap deployment siap pakai.",
    skills: ["Production Architecture", "Performance Budget", "Error Handling"],
  },
  {
    period: "Minggu 9–10",
    title: "Penyempurnaan & Code Review",
    badge: "Tahap 05",
    focus: "Audit performa, accessibility review, refactoring bersama tech lead, serta penulisan dokumentasi teknis.",
    skills: ["Refactoring", "Documentation", "Security Best Practices"],
  },
  {
    period: "Minggu 11–12",
    title: "Persiapan Karier & Penyaluran",
    badge: "Tahap 06",
    focus: "Finalisasi portfolio, simulasi live coding & technical interview, dan koneksi ke hiring partner.",
    skills: ["Technical Interview Mock", "Resume Optimization", "Partner Pitching"],
  },
];

export const bootcampMeta = {
  batchLabel: "Batch 07 dibuka",
  heading: "Bootcamp 12 minggu, dari nol hingga portfolio siap kerja",
  closingNote: "Pendaftaran Batch 07 ditutup dalam waktu terbatas",
  closingDetail: "Termasuk evaluasi portfolio, sesi 1-on-1 bersama mentor, dan pendampingan persiapan karier.",
};

export type BootcampTrack = {
  name: string;
  programSlug: string;
  description: string;
};

/** Jalur spesialisasi yang tersedia dalam bootcamp — link ke Programs section homepage. */
export const bootcampTracks: BootcampTrack[] = [
  {
    name: "Web Programming",
    programSlug: "web-programming",
    description: "React, Next.js, dan arsitektur aplikasi fullstack siap produksi.",
  },
  {
    name: "UI/UX & Product Design",
    programSlug: "uiux-product-design",
    description: "Design system, riset pengguna, dan prototyping standar industri.",
  },
  {
    name: "Data & Analytics",
    programSlug: "data-analytics",
    description: "SQL, Python, dan visualisasi data untuk pengambilan keputusan bisnis.",
  },
];

export const bootcampPricing = {
  price: 8500000,
  originalPrice: 12000000,
  installmentNote: "Cicilan 0% hingga 12 bulan tersedia lewat mitra pembayaran resmi.",
  includes: [
    "12 minggu kelas live malam bersama mentor praktisi",
    "Project skala produksi untuk portfolio",
    "Sesi 1-on-1 review portfolio & simulasi interview",
    "Akses selamanya ke rekaman kelas dan materi",
    "Koneksi langsung ke 80+ hiring partner",
    "Sertifikat kelulusan dengan kredensial digital",
  ],
};

export type BootcampFaq = {
  question: string;
  answer: string;
};

export const bootcampFaqs: BootcampFaq[] = [
  {
    question: "Apa bedanya Bootcamp dengan kursus mandiri biasa?",
    answer:
      "Bootcamp adalah program terpadu ber-batch dengan kurikulum 12 minggu berurutan, kelas live malam bersama mentor, dan pendampingan karier intensif — beda dari kursus mandiri yang bisa diakses fleksibel tanpa ikatan waktu.",
  },
  {
    question: "Berapa jam komitmen belajar per minggu yang dibutuhkan?",
    answer:
      "Dibutuhkan sekitar 12-15 jam per minggu, termasuk 2-3 sesi kelas live malam hari dan pengerjaan tugas di akhir pekan.",
  },
  {
    question: "Apakah bisa memilih jalur spesialisasi sebelum mendaftar?",
    answer:
      "Ya, kamu memilih salah satu dari 3 jalur spesialisasi bootcamp (Web Programming, UI/UX & Product Design, atau Data & Analytics) saat mendaftar. Materi tahap inti (minggu 3-8) disesuaikan dengan jalur pilihanmu.",
  },
  {
    question: "Apakah tersedia cicilan untuk biaya bootcamp?",
    answer:
      "Tersedia. Kami menyediakan cicilan 0% hingga 12 bulan lewat mitra pembayaran resmi, selain opsi pembayaran lunas dengan potongan khusus.",
  },
  {
    question: "Apakah lulusan bootcamp dijamin mendapat pekerjaan?",
    answer:
      "Kami tidak memberi jaminan kerja 100% karena keputusan akhir tetap di tangan perusahaan perekrut. Namun kami menjamin portfolio standar industri dan koneksi langsung ke 80+ hiring partner untuk memperbesar peluangmu.",
  },
];