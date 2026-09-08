import { nivoraAssets } from "@/lib/data/asset-paths";

export type AgendaItem = {
  time: string;
  activity: string;
};

export type NivoraEvent = {
  slug: string;
  date: string;
  time: string;
  title: string;
  type: string;
  status: string;
  /** Harga terstruktur — 0 berarti gratis, dipakai untuk badge & CTA. */
  price: number;
  speaker: string;
  speakerSlug: string;
  platform: string;
  image: string;
  /** Deskripsi lengkap 2-3 kalimat untuk halaman detail. */
  description: string;
  agenda: AgendaItem[];
};

export const events: NivoraEvent[] = [
  {
    slug: "building-scalable-nextjs",
    date: "12 Okt 2026",
    time: "19.00 - 21.00 WIB",
    title: "Membangun aplikasi Next.js yang scalable dan production-ready",
    type: "Webinar",
    status: "Gratis",
    price: 0,
    speaker: "Raka Pratama",
    speakerSlug: "raka-pratama",
    platform: "Zoom Meeting",
    image: nivoraAssets.events.buildingScalableNextjs,
    description:
      "Pelajari pola arsitektur Next.js 15 App Router yang dipakai tim engineering skala produksi — dari struktur folder, strategi rendering, sampai checklist sebelum deploy ke production.",
    agenda: [
      { time: "19.00", activity: "Pembukaan & perkenalan" },
      { time: "19.10", activity: "Studi kasus arsitektur App Router skala produksi" },
      { time: "19.45", activity: "Live coding: optimasi rendering & caching" },
      { time: "20.30", activity: "Sesi tanya jawab" },
    ],
  },
  {
    slug: "ai-product-design",
    date: "19 Okt 2026",
    time: "19.00 - 21.00 WIB",
    title: "Desain produk berbasis AI: workflow riset sampai prototipe",
    type: "Webinar",
    status: "Gratis",
    price: 0,
    speaker: "Nadia Maharani",
    speakerSlug: "nadia-maharani",
    platform: "Zoom Meeting",
    image: nivoraAssets.events.aiProductDesign,
    description:
      "Eksplorasi bagaimana tools AI mengubah workflow desain produk modern — mulai dari riset cepat, ideasi, sampai prototyping interaktif tanpa mengorbankan kualitas keputusan desain.",
    agenda: [
      { time: "19.00", activity: "Pembukaan & konteks tren AI dalam desain produk" },
      { time: "19.15", activity: "Demo workflow riset dibantu AI" },
      { time: "19.50", activity: "Studi kasus prototipe cepat" },
      { time: "20.30", activity: "Sesi tanya jawab" },
    ],
  },
  {
    slug: "data-storytelling",
    date: "26 Okt 2026",
    time: "19.00 - 21.30 WIB",
    title: "Bercerita lewat data: merancang dashboard eksekutif dengan Power BI",
    type: "Workshop live",
    status: "Gratis",
    price: 0,
    speaker: "Adrian Wijaya",
    speakerSlug: "adrian-wijaya",
    platform: "Zoom Meeting",
    image: nivoraAssets.events.dataStorytelling,
    description:
      "Workshop hands-on merancang dashboard yang benar-benar dipakai eksekutif untuk mengambil keputusan — fokus pada storytelling data, bukan sekadar menumpuk chart.",
    agenda: [
      { time: "19.00", activity: "Pembukaan & prinsip storytelling data" },
      { time: "19.20", activity: "Hands-on: membangun dashboard dari data mentah" },
      { time: "20.30", activity: "Review & feedback langsung" },
      { time: "21.10", activity: "Sesi tanya jawab" },
    ],
  },
  {
    slug: "design-system-workshop",
    date: "02 Nov 2026",
    time: "13.00 - 16.00 WIB",
    title: "Workshop design system: dari token sampai dokumentasi tim",
    type: "Workshop intensif",
    status: "Berbayar",
    price: 99000,
    speaker: "Nadia Maharani",
    speakerSlug: "nadia-maharani",
    platform: "Zoom Meeting + rekaman",
    image: nivoraAssets.events.designSystemWorkshop,
    description:
      "Workshop intensif 3 jam merancang design system dari nol — naming token, component variant, sampai dokumentasi yang memudahkan kolaborasi dengan tim engineering.",
    agenda: [
      { time: "13.00", activity: "Pembukaan & studi kasus design system nyata" },
      { time: "13.30", activity: "Hands-on: menyusun token & component variant" },
      { time: "14.45", activity: "Istirahat" },
      { time: "15.00", activity: "Dokumentasi & handoff ke developer" },
      { time: "15.45", activity: "Sesi tanya jawab" },
    ],
  },
];

export function getEventBySlug(slug: string): NivoraEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getUpcomingEvents(excludeSlug?: string, limit = 3): NivoraEvent[] {
  return events.filter((e) => e.slug !== excludeSlug).slice(0, limit);
}