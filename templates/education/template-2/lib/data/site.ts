export const site = {
  name: "Nivora Academy",
  shortName: "Nivora",
  tagline: "Upgrade skill, tanpa hilang arah.",
  description:
    "Akademi keterampilan digital untuk pasar Indonesia — kursus praktis, bootcamp intensif, dan beasiswa untuk karier di industri teknologi.",
  locale: "id",
  url: "https://nivora.academy",
  contact: {
    whatsapp: "6281234567890",
    whatsappUrl: "https://wa.me/6281234567890",
    email: "halo@nivora.academy",
    cities: "Jakarta Selatan & Bandung, Indonesia",
  },
  socials: [
    { label: "Instagram", href: "https://instagram.com/nivora.academy" },
    { label: "LinkedIn", href: "https://linkedin.com/company/nivora-academy" },
    { label: "YouTube", href: "https://youtube.com/@nivora.academy" },
  ],
} as const;

export function whatsappLink(message: string) {
  return `${site.contact.whatsappUrl}?text=${encodeURIComponent(message)}`;
}
