export type NivoraEvent = {
  date: string;
  title: string;
  type: string;
  status: string;
  speaker: string;
};

export const events: NivoraEvent[] = [
  {
    date: "12 Okt 2026",
    title: "Membangun aplikasi Next.js yang scalable dan production-ready",
    type: "Webinar",
    status: "Gratis",
    speaker: "Raka Pratama",
  },
  {
    date: "19 Okt 2026",
    title: "Desain sistem UI skalabel menggunakan Figma variables & tokens",
    type: "Webinar",
    status: "Gratis",
    speaker: "Nadia Maharani",
  },
  {
    date: "26 Okt 2026",
    title: "Bercerita lewat data: merancang dashboard eksekutif dengan Power BI",
    type: "Workshop live",
    status: "Gratis",
    speaker: "Adrian Wijaya",
  },
  {
    date: "02 Nov 2026",
    title: "Masterclass: formula lanjutan & otomasi spreadsheet tanpa coding",
    type: "Workshop intensif",
    status: "Berbayar (Rp99rb)",
    speaker: "Sarah Azizah",
  },
];
