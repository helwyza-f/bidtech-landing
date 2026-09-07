import { nivoraAssets } from "@/lib/data/asset-paths";

export type Mentor = {
  slug: string;
  name: string;
  role: string;
  company: string;
  track: string;
  photo: string;
};

export const mentors: Mentor[] = [
  {
    slug: "raka-pratama",
    name: "Raka Pratama",
    role: "Sr. Frontend Engineer",
    company: "Marketplace nasional",
    track: "Web",
    photo: nivoraAssets.mentors.rakaPratama,
  },
  {
    slug: "nadia-maharani",
    name: "Nadia Maharani",
    role: "Lead Product Designer",
    company: "Fintech unicorn",
    track: "Design",
    photo: nivoraAssets.mentors.nadiaMaharani,
  },
  {
    slug: "adrian-wijaya",
    name: "Adrian Wijaya",
    role: "Staff Data Scientist",
    company: "E-commerce regional",
    track: "Data",
    photo: nivoraAssets.mentors.adrianWijaya,
  },
  {
    slug: "maya-lestari",
    name: "Maya Lestari",
    role: "Sr. UX Researcher",
    company: "SaaS enterprise global",
    track: "Design",
    photo: nivoraAssets.mentors.mayaLestari,
  },
  {
    slug: "kevin-aditya",
    name: "Kevin Aditya",
    role: "Principal Backend Eng.",
    company: "Ride-hailing superapp",
    track: "Web",
    photo: nivoraAssets.mentors.kevinAditya,
  },
  {
    slug: "sarah-azizah",
    name: "Sarah Azizah",
    role: "Lead Business Analyst",
    company: "Perbankan digital",
    track: "Excel/Data",
    photo: nivoraAssets.mentors.sarahAzizah,
  },
];