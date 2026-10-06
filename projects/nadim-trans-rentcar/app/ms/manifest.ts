import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NadimTrans RentCar Batam",
    short_name: "NadimTrans",
    description:
      "Perkhidmatan sewa kereta Batam dalam kadar Ringgit Malaysia (RM) untuk pelancong Malaysia.",
    start_url: "/ms",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
    orientation: "portrait",
    lang: "ms-MY",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
