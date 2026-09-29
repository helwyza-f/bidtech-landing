import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NadimTrans RentCar Batam",
    short_name: "NadimTrans",
    description:
      "Reliable Batam car rental with self-drive, chauffeur, airport transfer, and All-In options.",
    start_url: "/en",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
    orientation: "portrait",
    lang: "en",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
