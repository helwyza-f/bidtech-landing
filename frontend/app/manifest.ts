import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BidTech - Business Innovative Digital Solutions",
    short_name: "BidTech",
    description:
      "Software house profesional di Indonesia untuk pembuatan website modern, aplikasi mobile Android & iOS, dan sistem software custom (ERP/CRM).",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#5fc94a",
    lang: "id",
    categories: ["business", "productivity", "utilities"],
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
