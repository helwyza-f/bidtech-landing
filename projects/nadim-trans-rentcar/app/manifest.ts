import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nadim Trans RentCar Batam",
    short_name: "Nadim Trans",
    description:
      "Layanan Rental & Sewa Mobil Mewah dan Terpercaya di Kota Batam. Lepas Kunci 24 Jam dan Driver Profesional.",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
    orientation: "portrait",
    lang: "id",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
