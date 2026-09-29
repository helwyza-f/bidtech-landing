import React from "react";
import { COMPANY_INFO, ALL_CARS, Car } from "@/lib/data";

const SITE_URL = "https://nadimstrans.com";

export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "@id": `${SITE_URL}/#autorental`,
    name: COMPANY_INFO.brand,
    legalName: COMPANY_INFO.name,
    alternateName: [
      "NadimTrans",
      "NadimTrans Rent Car Batam",
      "Rental Mobil Batam NadimTrans",
      "PT Nadim Auto Transindo",
    ],
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    image: [
      `${SITE_URL}/images/Alphard.webp`,
      `${SITE_URL}/images/Fortuner.webp`,
      `${SITE_URL}/images/Innova-Zenix.webp`,
    ],
    description:
      "NadimTrans RentCar (PT. Nadim Auto Transindo) adalah penyedia jasa rental mobil dan layanan transportasi terpercaya di Batam. Melayani rental mobil harian, mingguan, hingga bulanan, sewa mobil lepas kunci 24 jam, mobil dengan supir profesional, antar-jemput Bandara Internasional Hang Nadim (BTH), kebutuhan perjalanan bisnis maupun wisata, serta armada premium seperti Toyota Alphard VIP, Innova Zenix, Fortuner, Avanza, dan Hiace. Your Journey, Our Commitment.",
    telephone: COMPANY_INFO.phone,
    email: COMPANY_INFO.email,
    priceRange: "Rp 250.000 - Rp 3.500.000",
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
      name: "Katalog Rental Mobil Batam",
      itemListElement: ALL_CARS.slice(0, 10).map((car) => ({
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
        url: `${SITE_URL}/kendaraan/${car.id}`,
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

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "NadimTrans RentCar Batam",
    alternateName: "NadimTrans",
    description:
      "Situs resmi sewa mobil Batam terpercaya lepas kunci dan dengan supir profesional.",
    publisher: {
      "@id": `${SITE_URL}/#autorental`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/kendaraan?q={search_term_string}`,
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
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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

export function VehicleJsonLd({ car }: { car: Car }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Car", "Product"],
    "@id": `${SITE_URL}/kendaraan/${car.id}#car`,
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
      url: `${SITE_URL}/kendaraan/${car.id}`,
      seller: {
        "@id": `${SITE_URL}/#autorental`,
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
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
