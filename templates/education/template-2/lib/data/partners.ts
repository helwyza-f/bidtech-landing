const NIVORA_PARTNER_BASE = "/images/partners";

export type Partner = {
  name: string;
  logo: string;
};

export const partners: Partner[] = [
  { name: "Google", logo: `${NIVORA_PARTNER_BASE}/google.webp` },
  { name: "Tokopedia", logo: `${NIVORA_PARTNER_BASE}/tokopedia.webp` },
  { name: "Gojek", logo: `${NIVORA_PARTNER_BASE}/gojek.webp` },
  { name: "Telkomsel", logo: `${NIVORA_PARTNER_BASE}/telkomsel.webp` },
  { name: "Dana", logo: `${NIVORA_PARTNER_BASE}/dana.webp` },
];