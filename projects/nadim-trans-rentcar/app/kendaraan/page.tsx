import type { Metadata } from "next";
import KendaraanClient from "./KendaraanClient";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Daftar Armada Rental Mobil Batam - Lepas Kunci & Driver",
  description:
    "Pilihan lengkap rental dan sewa mobil Batam: Toyota Alphard VIP, Innova Zenix Hybrid, Innova Reborn, Fortuner GR, Avanza, Xenia, Brio, Calya, dan Hiace. Harga murah transparan, armada bersih dan terawat.",
  keywords: [
    "daftar harga rental mobil batam",
    "sewa mobil batam lepas kunci",
    "sewa mobil batam dengan driver",
    "sewa alphard batam",
    "sewa innova batam",
    "rental hiace batam",
    "rental avanza batam",
    "sewa brio batam",
    "nadim trans batam armada",
  ],
  alternates: {
    canonical: "/kendaraan",
  },
  openGraph: {
    title: "Daftar Armada Rental Mobil Batam - Nadim Trans RentCar",
    description:
      "Temukan kendaraan terbaik untuk perjalanan bisnis dan wisata di Batam. Tersedia sewa lepas kunci & dengan supir profesional.",
    url: "https://nadimstrans.com/kendaraan",
    images: [
      {
        url: "/images/Alphard.webp",
        width: 1661,
        height: 947,
        alt: "Koleksi Armada Rental Mobil Batam Nadim Trans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daftar Armada Rental Mobil Batam - Nadim Trans RentCar",
    description:
      "Rental mobil terlengkap di Batam: MPV, SUV, City Car, hingga Minibus Hiace.",
    images: ["/images/Alphard.webp"],
  },
};

export default function KendaraanPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", url: "/" },
          { name: "Armada Kendaraan", url: "/kendaraan" },
        ]}
      />
      <KendaraanClient />
    </>
  );
}
