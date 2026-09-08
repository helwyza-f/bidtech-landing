import { nivoraAssets } from "@/lib/data/asset-paths";

export type Mentor = {
  slug: string;
  name: string;
  role: string;
  company: string;
  track: string;
  photo: string;
  bio: string;
  experienceYears: number;
  expertise: string[];
  linkedinUrl?: string;
};

export const mentors: Mentor[] = [
  {
    slug: "raka-pratama",
    name: "Raka Pratama",
    role: "Sr. Frontend Engineer",
    company: "Marketplace nasional",
    track: "Web",
    photo: nivoraAssets.mentors.rakaPratama,
    bio: "Raka telah membangun antarmuka skala jutaan pengguna selama lebih dari 7 tahun. Fokusnya di performa aplikasi dan arsitektur frontend yang mudah dirawat tim besar.",
    experienceYears: 7,
    expertise: ["React & Next.js", "Performance Engineering", "Design System Implementation"],
    linkedinUrl: "https://linkedin.com/in/rakapratama",
  },
  {
    slug: "nadia-maharani",
    name: "Nadia Maharani",
    role: "Lead Product Designer",
    company: "Fintech unicorn",
    track: "Design",
    photo: nivoraAssets.mentors.nadiaMaharani,
    bio: "Nadia memimpin tim desain produk di salah satu fintech terbesar Indonesia, dengan fokus pada design system yang scalable dan kolaborasi erat dengan tim engineering.",
    experienceYears: 8,
    expertise: ["Design System", "Figma Auto-layout", "Product Strategy"],
    linkedinUrl: "https://linkedin.com/in/nadiamaharani",
  },
  {
    slug: "adrian-wijaya",
    name: "Adrian Wijaya",
    role: "Staff Data Scientist",
    company: "E-commerce regional",
    track: "Data",
    photo: nivoraAssets.mentors.adrianWijaya,
    bio: "Adrian mengubah data mentah jadi keputusan bisnis di perusahaan e-commerce regional. Berpengalaman membangun dashboard dan model prediktif untuk tim eksekutif.",
    experienceYears: 6,
    expertise: ["SQL & Python", "Power BI", "Statistical Modeling"],
    linkedinUrl: "https://linkedin.com/in/adrianwijaya",
  },
  {
    slug: "maya-lestari",
    name: "Maya Lestari",
    role: "Sr. UX Researcher",
    company: "SaaS enterprise global",
    track: "Design",
    photo: nivoraAssets.mentors.mayaLestari,
    bio: "Maya spesialis riset pengguna untuk produk SaaS enterprise, membantu tim produk global memahami kebutuhan pengguna lewat metodologi riset kualitatif dan kuantitatif.",
    experienceYears: 6,
    expertise: ["User Interview", "Usability Testing", "Insight Synthesis"],
    linkedinUrl: "https://linkedin.com/in/mayalestari",
  },
  {
    slug: "kevin-aditya",
    name: "Kevin Aditya",
    role: "Principal Backend Eng.",
    company: "Ride-hailing superapp",
    track: "Web",
    photo: nivoraAssets.mentors.kevinAditya,
    bio: "Kevin merancang arsitektur backend untuk superapp dengan jutaan transaksi harian. Passionate soal type-safety dan sistem yang tangguh menghadapi skala tinggi.",
    experienceYears: 9,
    expertise: ["TypeScript", "System Architecture", "API Design"],
    linkedinUrl: "https://linkedin.com/in/kevinaditya",
  },
  {
    slug: "sarah-azizah",
    name: "Sarah Azizah",
    role: "Lead Business Analyst",
    company: "Perbankan digital",
    track: "Excel/Data",
    photo: nivoraAssets.mentors.sarahAzizah,
    bio: "Sarah membantu tim finance di bank digital mengotomasi laporan rutin dan menganalisis performa bisnis. Ahli mengubah spreadsheet kompleks jadi alat kerja yang efisien.",
    experienceYears: 5,
    expertise: ["Advanced Excel", "Power Query", "Financial Reporting"],
    linkedinUrl: "https://linkedin.com/in/sarahazizah",
  },
];

export function getMentorBySlug(slug: string): Mentor | undefined {
  return mentors.find((m) => m.slug === slug);
}