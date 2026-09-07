import { nivoraAssets } from "@/lib/data/asset-paths";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  batch: string;
  photo: string;
};

export const testimonialsRowOne: Testimonial[] = [
  {
    quote:
      "Tiga bulan setelah lulus jalur Data, saya pindah dari admin ke junior data analyst. Yang paling menolong itu project akhir — saya bawa dashboard-nya waktu sesi wawancara.",
    name: "Nadia Putri",
    role: "Junior Data Analyst",
    company: "HealthTech",
    batch: "Angkatan 2024",
    photo: nivoraAssets.testimonials.nadiaPutri,
  },
  {
    quote:
      "Code review dari mentor beneran detail. Baru sadar clean code dan pemisahan logika itu bikin perbedaan besar pas tes coding di kantor impian.",
    name: "Kevin Pratama",
    role: "Frontend Developer",
    company: "SaaS Finansial",
    batch: "Angkatan 2023",
    photo: nivoraAssets.testimonials.kevinPratama,
  },
  {
    quote:
      "Dulu saya otodidak UI di Figma tapi belum ngerti cara bikin design system yang beneran bisa dipakai engineer. Di Nivora diajarin naming token sampai auto-layout rapi.",
    name: "Maya Rahma",
    role: "UI/UX Designer",
    company: "E-Commerce",
    batch: "Angkatan 2024",
    photo: nivoraAssets.testimonials.mayaRahma,
  },
];

export const testimonialsRowTwo: Testimonial[] = [
  {
    quote:
      "Program beasiswa Nivora membuka jalan saya yang fresh graduate non-IT bisa tembus kerja dalam 4 bulan. Konsultasi karier 1-on-1 beneran mengubah cara saya bikin CV.",
    name: "Dimas Arya",
    role: "Web Engineer",
    company: "Digital Agency",
    batch: "Angkatan 2023",
    photo: nivoraAssets.testimonials.dimasArya,
  },
  {
    quote:
      "Kelas Excel-nya to the point. Power Query dan otomasi laporan mingguan bikin waktu kerja saya hemat 4 jam per minggu di divisi finance.",
    name: "Rani Safira",
    role: "Finance Officer",
    company: "Logistik Multinasional",
    batch: "Angkatan 2025",
    photo: nivoraAssets.testimonials.raniSafira,
  },
];