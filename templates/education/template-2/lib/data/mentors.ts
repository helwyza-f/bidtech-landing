export type Mentor = {
  name: string;
  role: string;
  company: string;
  track: string;
  initials: string;
  /** Kelas warna Tailwind untuk placeholder foto — ganti dengan foto asli 4:5. */
  colorClass: string;
};

export const mentors: Mentor[] = [
  {
    name: "Raka Pratama",
    role: "Sr. Frontend Engineer",
    company: "Marketplace nasional",
    track: "Web",
    initials: "RP",
    colorClass: "bg-blue-600",
  },
  {
    name: "Nadia Maharani",
    role: "Lead Product Designer",
    company: "Fintech unicorn",
    track: "Design",
    initials: "NM",
    colorClass: "bg-purple-600",
  },
  {
    name: "Adrian Wijaya",
    role: "Staff Data Scientist",
    company: "E-commerce regional",
    track: "Data",
    initials: "AW",
    colorClass: "bg-emerald-600",
  },
  {
    name: "Maya Lestari",
    role: "Sr. UX Researcher",
    company: "SaaS enterprise global",
    track: "Design",
    initials: "ML",
    colorClass: "bg-rose-600",
  },
  {
    name: "Kevin Aditya",
    role: "Principal Backend Eng.",
    company: "Ride-hailing superapp",
    track: "Web",
    initials: "KA",
    colorClass: "bg-indigo-600",
  },
  {
    name: "Sarah Azizah",
    role: "Lead Business Analyst",
    company: "Perbankan digital",
    track: "Excel/Data",
    initials: "SA",
    colorClass: "bg-amber-600",
  },
];
