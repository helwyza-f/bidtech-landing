import type { Metadata } from "next";
import { getLocalizedPath, translate, type Locale } from "@/lib/i18n";

export const SITE_URL = "https://nadimtrans.com";

const OPEN_GRAPH_LOCALE: Record<Locale, string> = {
  id: "id_ID",
  en: "en_US",
  "en-sg": "en_SG",
  ms: "ms_MY",
};

export function localizedAlternates(locale: Locale, pathname: string) {
  const idPath = getLocalizedPath("id", pathname);
  const enPath = getLocalizedPath("en", pathname);
  const enSgPath = getLocalizedPath("en-sg", pathname);
  const msPath = getLocalizedPath("ms", pathname);

  return {
    canonical: getLocalizedPath(locale, pathname),
    languages: {
      id: idPath,
      en: enPath,
      "en-SG": enSgPath,
      ms: msPath,
      "x-default": idPath,
    },
  };
}

export function pageMetadata(
  locale: Locale,
  pathname: string,
  title: string,
  description: string,
  image = "/images/nadimtrans.webp"
): Metadata {
  const localizedPath = getLocalizedPath(locale, pathname);
  const alternateLocale = locale === "id" ? OPEN_GRAPH_LOCALE.en : OPEN_GRAPH_LOCALE.id;

  return {
    title,
    description,
    alternates: localizedAlternates(locale, pathname),
    openGraph: {
      type: "website",
      locale: OPEN_GRAPH_LOCALE[locale],
      alternateLocale,
      url: `${SITE_URL}${localizedPath}`,
      siteName: "NadimTrans RentCar Batam",
      title,
      description,
      images: [{ url: image, width: 1661, height: 947, alt: "NadimTrans RentCar Batam" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function rootMetadata(locale: Locale): Metadata {
  const title = translate(locale, "metadata.homeTitle");
  const description = translate(locale, "metadata.homeDescription");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: "%s | NadimTrans RentCar Batam",
    },
    description,
    applicationName: "NadimTrans RentCar",
    authors: [
      { name: "PT. Nadim Auto Transindo", url: SITE_URL },
      { name: "Bidtech Solutions", url: "https://bidtech.co.id" },
    ],
    creator: "Bidtech Solutions",
    publisher: "NadimTrans RentCar Batam",
    formatDetection: { telephone: true, address: true, email: true },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
    icons: {
      icon: [{ url: "/icon.png", type: "image/png" }, { url: "/favicon.ico", sizes: "any" }],
      shortcut: "/icon.png",
      apple: "/icon.png",
    },
    other: {
      "geo.region": "ID-KR",
      "geo.placename": "Kota Batam, Kepulauan Riau, Indonesia",
      "geo.position": "1.1192;104.0535",
      ICBM: "1.1192,104.0535",
      "target-country": "id",
    },
  };
}
