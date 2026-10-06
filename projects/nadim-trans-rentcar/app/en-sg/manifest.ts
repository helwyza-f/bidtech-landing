import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NadimTrans RentCar Batam",
    short_name: "NadimTrans",
    description:
      "Reliable Batam car rental in SGD for Singapore visitors with Harbour Bay & Batam Centre delivery.",
    start_url: "/en-sg",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
    orientation: "portrait",
    lang: "en-SG",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
