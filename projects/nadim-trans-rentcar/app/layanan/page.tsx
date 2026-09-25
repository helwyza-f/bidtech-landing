import type { Metadata } from "next";
import LayananClient from "./LayananClient";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Layanan Sewa Mobil Batam - Lepas Kunci, Supir & Antar Jemput Bandara",
  description:
    "Solusi layanan transportasi lengkap di Kota Batam dari Nadim Trans RentCar: Rental Mobil Lepas Kunci 24 Jam, Mobil + Driver Berpengalaman, Antar Jemput Bandara Hang Nadim, dan Sewa Hiace / Bus Pariwisata.",
  keywords: [
    "layanan sewa mobil batam",
    "sewa mobil batam lepas kunci 24 jam",
    "rental mobil dengan supir batam",
    "antar jemput bandara hang nadim batam",
    "sewa hiace batam",
    "sewa bus pariwisata batam",
    "tour batam transport",
    "nadim trans layanan",
  ],
  alternates: {
    canonical: "/layanan",
  },
  openGraph: {
    title: "Layanan Sewa Mobil Batam - Nadim Trans RentCar",
    description:
      "Layanan sewa mobil lepas kunci, paket mobil dengan sopir, serta antar jemput Bandara Hang Nadim Batam tepat waktu.",
    url: "https://nadimstrans.com/layanan",
    images: [
      {
        url: "/images/Alphard.webp",
        width: 1661,
        height: 947,
        alt: "Layanan Rental Mobil Batam Nadim Trans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Layanan Sewa Mobil Batam - Nadim Trans RentCar",
    description:
      "Pilihan layanan rental mobil fleksibel di Batam: Lepas Kunci, Driver, Airport Transfer, dan Paket Rombongan.",
    images: ["/images/Alphard.webp"],
  },
};

export default function LayananPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", url: "/" },
          { name: "Layanan", url: "/layanan" },
        ]}
      />
      <LayananClient />
    </>
  );
}
