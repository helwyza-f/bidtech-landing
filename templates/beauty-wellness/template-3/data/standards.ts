export interface TechnicalStandard {
  number: string;
  title: string;
  description: string;
  badgeBg: string;
  badgeText: string;
}

export const technicalStandards: TechnicalStandard[] = [
  {
    number: "01",
    title: "Japanese 440C Steel",
    description:
      "Kami menggunakan gunting baja tempa Jepang dengan ketajaman razor mikron untuk memastikan ujung kutikula rambut tidak pecah atau bercabang setelah dipotong.",
    badgeBg: "var(--accent-lime)",
    badgeText: "var(--accent-lime-fg)",
  },
  {
    number: "02",
    title: "Medical UV Sterilization",
    description:
      "Setiap mata pisau, sisir karbon, dan gunting dimasukkan ke dalam bilik sterilisasi sinar UV medis sebelum menyentuh kulit kepala Anda berikutnya.",
    badgeBg: "#2563EB",
    badgeText: "#FFFFFF",
  },
  {
    number: "03",
    title: "Cranial Bone Mapping",
    description:
      "Analisa 3 menit terhadap titik parietal dan occipital bone kepala Anda sebelum gunting pertama memotong, guna menentukan sudut elevasi potongan yang pas.",
    badgeBg: "#EAB308",
    badgeText: "#000000",
  },
];
