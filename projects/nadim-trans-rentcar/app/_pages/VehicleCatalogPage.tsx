import KendaraanClient from "@/app/kendaraan/KendaraanClient";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import type { Locale } from "@/lib/i18n";

export default function VehicleCatalogPage({ locale }: { locale: Locale }) {
  return (
    <>
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: locale === "id" ? "Beranda" : "Home", url: "/" },
          { name: locale === "id" ? "Armada Kendaraan" : "Vehicle Fleet", url: "/kendaraan" },
        ]}
      />
      <KendaraanClient />
    </>
  );
}
