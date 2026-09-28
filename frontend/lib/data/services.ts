import { Globe, Settings2, Smartphone } from "lucide-react";

export interface ServiceMeta {
  image: string;
  icon: typeof Globe;
  isPopular: boolean;
}

export const serviceMeta: ServiceMeta[] = [
  {
    image: "/images/layanan/web.webp",
    icon: Globe,
    isPopular: true,
  },
  {
    image: "/images/layanan/mobile.webp",
    icon: Smartphone,
    isPopular: false,
  },
  {
    image: "/images/layanan/crm.webp",
    icon: Settings2,
    isPopular: false,
  },
];
