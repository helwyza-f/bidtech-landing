import { notFound } from "next/navigation";
import VehicleDetailClient from "@/app/kendaraan/[id]/VehicleDetailClient";
import { BreadcrumbJsonLd, VehicleJsonLd } from "@/components/seo/JsonLd";
import { getCar } from "@/lib/localizedData";
import type { Locale } from "@/lib/i18n";

interface VehicleDetailPageProps {
  locale: Locale;
  id: string;
}

export default function VehicleDetailPage({ locale, id }: VehicleDetailPageProps) {
  const car = getCar(locale, id);

  if (!car) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: locale === "id" ? "Beranda" : "Home", url: "/" },
          { name: locale === "id" ? "Kendaraan" : "Vehicles", url: "/kendaraan" },
          { name: car.name, url: `/kendaraan/${car.id}` },
        ]}
      />
      <VehicleJsonLd car={car} locale={locale} />
      <VehicleDetailClient id={id} />
    </>
  );
}
