export type ScholarshipTier = {
  name: string;
  discount: string;
  criteria: string;
};

export type TimelineStep = {
  label: string;
  date: string;
  description: string;
};

export type ScholarshipFaq = {
  question: string;
  answer: string;
};

export const scholarship = {
  eyebrow: "Inisiatif akses talenta digital",
  title: "Beasiswa Nivora: potongan biaya hingga 70%",
  description:
    "Kami membuka kesempatan beasiswa jalur prestasi dan bantuan finansial bagi 100 talenta terpilih untuk bergabung di program intensif.",
  checklist: [
    "Terbuka untuk semua 4 jalur spesialisasi digital",
    "Seleksi berkas portfolio dan wawancara motivasi",
    "Pendampingan karier penuh sampai tahap interview hiring partner",
  ],
  deadlineNote: "Gelombang I berakhir akhir bulan ini",
  quota: {
    remaining: "Tersisa 24 kursi",
    total: "100 siswa",
    scheme: "Potongan 50%–70%",
    selection: "CV + tes logika online",
    registrationFee: "100% gratis",
    footnote: "*Hasil seleksi berkas diumumkan maksimal 3 hari kerja setelah pengajuan.",
  },
} as const;

/** Tingkatan potongan biaya berdasarkan hasil seleksi — untuk halaman detail. */
export const scholarshipTiers: ScholarshipTier[] = [
  {
    name: "Beasiswa Prestasi",
    discount: "70%",
    criteria: "Skor tes logika 90+, portfolio kuat, dan lolos wawancara motivasi dengan penilaian sangat baik.",
  },
  {
    name: "Beasiswa Bantuan Sebagian",
    discount: "60%",
    criteria: "Skor tes logika 75-89, menunjukkan komitmen belajar dan kondisi finansial yang membutuhkan bantuan.",
  },
  {
    name: "Beasiswa Akses Awal",
    discount: "50%",
    criteria: "Lolos seleksi berkas dasar — terbuka untuk semua pendaftar yang memenuhi syarat minimum.",
  },
];

/** Tahapan proses pendaftaran, ditampilkan sebagai timeline di halaman detail. */
export const scholarshipTimeline: TimelineStep[] = [
  {
    label: "Pendaftaran & berkas",
    date: "Gelombang I",
    description: "Isi formulir pendaftaran, unggah CV, dan portfolio (jika ada) melalui link yang kami kirim via WhatsApp.",
  },
  {
    label: "Tes logika online",
    date: "3 hari setelah daftar",
    description: "Tes berbasis logika dasar dan pemecahan masalah, durasi 30 menit, bisa dikerjakan dari rumah.",
  },
  {
    label: "Wawancara motivasi",
    date: "1 minggu setelah tes",
    description: "Sesi wawancara singkat 15-20 menit bersama tim akademik untuk memahami tujuan belajarmu.",
  },
  {
    label: "Pengumuman & onboarding",
    date: "Maksimal 3 hari kerja",
    description: "Hasil seleksi dan tingkat beasiswa dikirim via WhatsApp, dilanjutkan sesi onboarding sebelum kelas dimulai.",
  },
];

export const scholarshipRequirements: string[] = [
  "WNI berusia minimal 17 tahun",
  "Berkomitmen mengikuti kelas sampai selesai (tidak ada batasan latar belakang pendidikan)",
  "Memiliki akses laptop/komputer dan koneksi internet stabil",
  "Bersedia mengikuti tes logika online dan wawancara motivasi",
];

export const scholarshipFaqs: ScholarshipFaq[] = [
  {
    question: "Apakah beasiswa ini berlaku untuk semua jalur belajar?",
    answer:
      "Ya, beasiswa terbuka untuk keempat jalur spesialisasi — Web Programming, UI/UX & Product Design, Data & Analytics, dan Excel & Office Productivity.",
  },
  {
    question: "Apakah ada biaya pendaftaran untuk mengikuti seleksi beasiswa?",
    answer: "Tidak ada. Seluruh proses pendaftaran dan seleksi beasiswa 100% gratis tanpa biaya apapun.",
  },
  {
    question: "Bagaimana jika saya tidak lolos beasiswa penuh 70%?",
    answer:
      "Kami menerapkan skema bertingkat — jika tidak memenuhi kriteria beasiswa 70%, kamu tetap berpeluang mendapat potongan 60% atau 50% berdasarkan hasil seleksi berkas dan tes.",
  },
  {
    question: "Apakah beasiswa ini bisa digabung dengan cicilan?",
    answer:
      "Bisa. Sisa biaya setelah potongan beasiswa tetap bisa dicicil lewat mitra pembayaran resmi kami hingga 12 bulan.",
  },
  {
    question: "Berapa lama proses seleksi sampai pengumuman?",
    answer:
      "Total proses dari pendaftaran sampai pengumuman biasanya memakan waktu 10-14 hari, tergantung jadwal tes dan wawancara yang kamu pilih.",
  },
  {
    question: "Apakah kuota beasiswa dibuka ulang setiap bulan?",
    answer:
      "Kuota dibuka per gelombang (biasanya 2-3 gelombang per tahun) dengan jumlah kursi terbatas di setiap gelombang. Kami mengumumkan jadwal gelombang berikutnya lewat WhatsApp dan media sosial.",
  },
];