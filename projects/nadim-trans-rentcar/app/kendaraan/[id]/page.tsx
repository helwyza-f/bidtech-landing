import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCars, getCarById } from "@/lib/data";
import VehicleDetailClient from "./VehicleDetailClient";
import { BreadcrumbJsonLd, VehicleJsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return getAllCars().map((car) => ({
    id: String(car.id),
  }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const car = getCarById(params.id);

  if (!car) {
    return {
      title: "Mobil Tidak Ditemukan",
      description: "Kendaraan yang Anda cari tidak tersedia di armada Nadim Trans RentCar Batam.",
    };
  }

  const title = `Sewa ${car.name} Batam - Rp ${car.priceFormatted}/hari | Nadim Trans`;
  const description = `Rental ${car.name} di Batam. Kategori ${car.category} (${car.specs.seats} Kursi, ${car.specs.luggage} Koper, Transmisi ${car.specs.transmission}). Tersedia lepas kunci 24 jam & dengan driver profesional. Antar jemput Bandara Hang Nadim gratis.`;
  const imageUrl = car.image.startsWith("http")
    ? car.image
    : `https://nadimstrans.com${car.image}`;

  return {
    title,
    description,
    keywords: [
      `sewa ${car.name.toLowerCase()} batam`,
      `rental ${car.name.toLowerCase()} batam`,
      `harga sewa ${car.name.toLowerCase()} batam`,
      `rental ${car.category.toLowerCase()} batam`,
      "rental mobil batam lepas kunci",
      "sewa mobil bandara hang nadim",
      "nadim trans batam",
    ],
    alternates: {
      canonical: `/kendaraan/${car.id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://nadimstrans.com/kendaraan/${car.id}`,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Sewa ${car.name} Batam - Nadim Trans RentCar`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const car = getCarById(params.id);

  if (!car) {
    notFound();
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", url: "/" },
          { name: "Kendaraan", url: "/kendaraan" },
          { name: car.name, url: `/kendaraan/${car.id}` },
        ]}
      />
      <VehicleJsonLd car={car} />
      <VehicleDetailClient id={params.id} />
    </>
  );
}
