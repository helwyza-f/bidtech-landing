import React from "react";
import { COMPANY_INFO, type Car } from "@/lib/data";
import { getCars } from "@/lib/localizedData";
import { formatRupiah, getLocalizedPath, translate, type Locale } from "@/lib/i18n";

const SITE_URL = "https://nadimtrans.com";

export function LocalBusinessJsonLd({ locale }: { locale: Locale }) {
  const localizedRoot = getLocalizedPath(locale, "/");
  const cars = getCars(locale);
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "@id": `${SITE_URL}${localizedRoot}#autorental`,
    name: COMPANY_INFO.brand,
    legalName: COMPANY_INFO.name,
    alternateName: [
      "NadimTrans",
      "NadimTrans Rent Car Batam",
      "Rental Mobil Batam NadimTrans",
      "PT Nadim Auto Transindo",
    ],
    url: `${SITE_URL}${localizedRoot}`,
    inLanguage: locale === "id" ? "id-ID" : "en",
    logo: `${SITE_URL}/icon.png`,
    image: [
      `${SITE_URL}/images/Alphard.webp`,
      `${SITE_URL}/images/Fortuner.webp`,
      `${SITE_URL}/images/Innova-Zenix.webp`,
    ],
    description: translate(locale, "metadata.homeDescription"),
    telephone: COMPANY_INFO.phone,
    email: COMPANY_INFO.email,
    priceRange: `${formatRupiah(250000, locale)} - ${formatRupiah(3800000, locale)}`,
    currenciesAccepted: "IDR",
    paymentAccepted: "Cash, Credit Card, Debit Card, Bank Transfer, QRIS",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Perum KDA Cluster Nuri Kepodang, Jl. Kepodang 3 No. 2, Belian, Kec. Batam Kota",
      addressLocality: "Kota Batam",
      addressRegion: "Kepulauan Riau",
      postalCode: "29464",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 1.1192,
      longitude: 104.0535,
    },
    hasMap: COMPANY_INFO.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Kota Batam",
      },
      {
        "@type": "AdministrativeArea",
        name: "Batam Kota",
      },
      {
        "@type": "AdministrativeArea",
        name: "Nagoya / Lubuk Baja",
      },
      {
        "@type": "AdministrativeArea",
        name: "Batam Center",
      },
      {
        "@type": "Airport",
        name: "Bandara Internasional Hang Nadim (BTH)",
      },
      {
        "@type": "Place",
        name: "Pelabuhan Ferry Batam Centre",
      },
      {
        "@type": "Place",
        name: "Pelabuhan Harbour Bay Batam",
      },
      {
        "@type": "Place",
        name: "Pelabuhan Sekupang",
      },
      {
        "@type": "AdministrativeArea",
        name: "Nongsa",
      },
      {
        "@type": "AdministrativeArea",
        name: "Batu Aji",
      },
      {
        "@type": "AdministrativeArea",
        name: "Batu Ampar",
      },
      {
        "@type": "AdministrativeArea",
        name: "Kepulauan Riau",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "284",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "id" ? "Katalog Rental Mobil Batam" : "Batam Car Rental Catalogue",
      itemListElement: cars.slice(0, 10).map((car) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: car.name,
          category: car.category,
          description: car.description,
          image: `${SITE_URL}${car.image}`,
        },
        price: car.price,
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}${getLocalizedPath(locale, `/kendaraan/${car.slug}`)}`,
      })),
    },
    sameAs: [
      `https://wa.me/${COMPANY_INFO.whatsapp}`,
      COMPANY_INFO.instagram,
      COMPANY_INFO.tiktok,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd({ locale }: { locale: Locale }) {
  const localizedRoot = getLocalizedPath(locale, "/");
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}${localizedRoot}#website`,
    url: `${SITE_URL}${localizedRoot}`,
    inLanguage: locale === "id" ? "id-ID" : "en",
    name: "NadimTrans RentCar Batam",
    alternateName: "NadimTrans",
    description: translate(locale, "metadata.homeDescription"),
    publisher: {
      "@id": `${SITE_URL}${localizedRoot}#autorental`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}${getLocalizedPath(locale, "/kendaraan")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQPageJsonLd({
  faqs,
  locale,
}: {
  faqs: Array<{ question: string; answer: string }>;
  locale: Locale;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "id" ? "id-ID" : "en",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function VehicleJsonLd({ car, locale }: { car: Car; locale: Locale }) {
  const vehiclePath = getLocalizedPath(locale, `/kendaraan/${car.slug}`);
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Car", "Product"],
    "@id": `${SITE_URL}${vehiclePath}#car`,
    inLanguage: locale === "id" ? "id-ID" : "en",
    name: car.name,
    image: [`${SITE_URL}${car.image}`],
    description: car.description,
    brand: {
      "@type": "Brand",
      name: car.name.split(" ")[0],
    },
    vehicleConfiguration: car.type,
    category: car.category,
    seatingCapacity: car.specs.seats,
    vehicleTransmission: car.specs.transmission,
    fuelType: car.specs.fuel,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: car.rating.toString(),
      reviewCount: car.reviews.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      price: car.price,
      priceCurrency: "IDR",
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}${vehiclePath}`,
      seller: {
        "@id": `${SITE_URL}${getLocalizedPath(locale, "/")}#autorental`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
  locale,
}: {
  items: Array<{ name: string; url: string }>;
  locale: Locale;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    inLanguage: locale === "id" ? "id-ID" : "en",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${getLocalizedPath(locale, item.url)}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
