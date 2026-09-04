export type NavItem = {
  label: string;
  href: string;
  highlight?: boolean;
};

export const mainNav: NavItem[] = [
  { label: "Program", href: "#program" },
  { label: "Kursus", href: "#kursus" },
  { label: "Metode", href: "#metode" },
  { label: "Bootcamp", href: "#bootcamp", highlight: true },
  { label: "Mentor", href: "#mentor" },
  { label: "Tentang", href: "#tentang" },
];

export const footerNav = {
  program: [
    { label: "Web Programming", href: "#program" },
    { label: "UI/UX & Product Design", href: "#program" },
    { label: "Data & Business Analytics", href: "#program" },
    { label: "Excel & Office Automation", href: "#program" },
  ],
  perusahaan: [
    { label: "Tentang Nivora", href: "#tentang" },
    { label: "Metode Belajar", href: "#metode" },
    { label: "Mentor Praktisi", href: "#mentor" },
    { label: "Bootcamp 12 Minggu", href: "#bootcamp" },
  ],
  kontak: [
    { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
    { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
    { label: "Verifikasi Sertifikat", href: "/verifikasi-sertifikat" },
  ],
};
