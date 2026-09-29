import FaqClient from "@/app/faq/FaqClient";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/JsonLd";
import { getFaqs } from "@/lib/localizedData";
import type { Locale } from "@/lib/i18n";

export default function FaqPage({ locale }: { locale: Locale }) {
  const faqs = getFaqs(locale);
  return (
    <>
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: locale === "id" ? "Beranda" : "Home", url: "/" },
          { name: locale === "id" ? "Pusat Bantuan & FAQ" : "Help Centre & FAQ", url: "/faq" },
        ]}
      />
      <FAQPageJsonLd faqs={faqs} locale={locale} />
      <FaqClient />
    </>
  );
}
