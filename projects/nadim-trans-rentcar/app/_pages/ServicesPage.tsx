import LayananClient from "@/app/layanan/LayananClient";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import type { Locale } from "@/lib/i18n";

export default function ServicesPage({ locale }: { locale: Locale }) {
  return (
    <>
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: locale === "id" ? "Beranda" : "Home", url: "/" },
          { name: locale === "id" ? "Layanan" : "Services", url: "/layanan" },
        ]}
      />
      <LayananClient />
    </>
  );
}
