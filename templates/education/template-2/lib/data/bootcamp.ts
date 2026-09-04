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
