import { nivoraAssets } from "@/lib/data/asset-paths";

export type NivoraEvent = {
  slug: string;
  date: string;
  title: string;
  type: string;
  status: string;
  speaker: string;
  image: string;
};

export const events: NivoraEvent[] = [
  {
    slug: "building-scalable-nextjs",
    date: "12 Okt 2026",
    title: "Membangun aplikasi Next.js yang scalable dan production-ready",
    type: "Webinar",
    status: "Gratis",
    speaker: "Raka Pratama",
    image: nivoraAssets.events.buildingScalableNextjs,
  },
  {
    slug: "ai-product-design",
    date: "19 Okt 2026",
    title: "Desain produk berbasis AI: workflow riset sampai prototipe",
    type: "Webinar",
    status: "Gratis",
    speaker: "Nadia Maharani",
    image: nivoraAssets.events.aiProductDesign,
  },
  {
    slug: "data-storytelling",
    date: "26 Okt 2026",
    title: "Bercerita lewat data: merancang dashboard eksekutif dengan Power BI",
    type: "Workshop live",
    status: "Gratis",
    speaker: "Adrian Wijaya",
    image: nivoraAssets.events.dataStorytelling,
  },
  {
    slug: "design-system-workshop",
    date: "02 Nov 2026",
    title: "Workshop design system: dari token sampai dokumentasi tim",
    type: "Workshop intensif",
    status: "Berbayar (Rp99rb)",
    speaker: "Nadia Maharani",
    image: nivoraAssets.events.designSystemWorkshop,
  },
];