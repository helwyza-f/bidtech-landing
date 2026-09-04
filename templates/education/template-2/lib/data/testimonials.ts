export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export const testimonialsRowOne: Testimonial[] = [
  {
    quote:
      "Tiga bulan setelah lulus jalur Data, saya pindah dari admin ke junior data analyst. Yang paling menolong itu project akhir — saya bawa dashboard-nya waktu sesi wawancara.",
    name: "Nadia Putri",
    role: "Junior Data Analyst di HealthTech",
    initials: "NP",
  },
  {
    quote:
      "Code review dari mentor beneran detail. Baru sadar clean code dan pemisahan logika itu bikin perbedaan besar pas tes coding di kantor impian.",
    name: "Bagas Setiawan",
    role: "Frontend Developer di SaaS Finansial",
    initials: "BS",
  },
  {
    quote:
      "Dulu saya otodidak UI di Figma tapi belum ngerti cara bikin design system yang beneran bisa dipakai engineer. Di Nivora diajarin naming token sampai auto-layout rapi.",
    name: "Clarissa V.",
    role: "UI/UX Designer di E-Commerce",
    initials: "CV",
  },
];

export const testimonialsRowTwo: Testimonial[] = [
  {
    quote:
      "Program beasiswa Nivora membuka jalan saya yang fresh graduate non-IT bisa tembus kerja dalam 4 bulan. Konsultasi karier 1-on-1 beneran mengubah cara saya bikin CV.",
    name: "Dimas Anggara",
    role: "Web Engineer di Digital Agency",
    initials: "DA",
  },
  {
    quote:
      "Kelas Excel-nya to the point. Power Query dan otomasi laporan mingguan bikin waktu kerja saya hemat 4 jam per minggu di divisi finance.",
    name: "Siti Rahmawati",
    role: "Finance Officer di Logistik Multinasional",
    initials: "SR",
  },
  {
    quote:
      "Sebagai career switcher usia 28 tahun, saya butuh kurikulum yang langsung ke praktik, bukan teori kampus. Bootcamp 12 minggu Nivora ngasih kepastian arah itu.",
    name: "Ferry Irawan",
    role: "Product Analyst di Startup EdTech",
    initials: "FI",
  },
];
