import { site } from "../data/site";

/**
 * Structured data (JSON-LD) — "terjemahan" isi halaman ke bahasa yang dimengerti
 * mesin pencari. Ini yang bikin Google menampilkan jam buka, rating bintang,
 * dan alamat langsung di hasil pencarian (rich result).
 *
 * Untuk UMKM lokal, schema `Restaurant` adalah yang paling berdampak: dia
 * memberi sinyal ke Google Maps/Local Pack tentang lokasi dan jam operasional.
 */

const fullAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.district,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

export function restaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${site.url}/#restaurant`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.contact.phoneE164,
    priceRange: site.priceRange,
    servesCuisine: [...site.servesCuisine],
    image: `${site.url}${site.ogImage}`,
    address: fullAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.latitude,
      longitude: site.address.longitude,
    },
    hasMap: site.address.mapsUrl,
    // Satu entri per rentang hari. Google memakai ini untuk label "Buka/Tutup".
    openingHoursSpecification: site.openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...slot.days],
      opens: slot.opens,
      closes: slot.closes,
    })),
    sameAs: Object.values(site.social),
    acceptsReservations: true,
  };
}

/** Remah roti — membantu Google menampilkan jalur navigasi di hasil pencarian. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

/** Dipakai section FAQ. Bisa memunculkan accordion langsung di hasil Google. */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Daftar menu terstruktur — sinyal kuat untuk pencarian "menu <nama resto>". */
export function menuSchema(
  items: { name: string; description: string; price: number; category: string }[],
) {
  const categories = [...new Set(items.map((item) => item.category))];

  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `Menu ${site.name}`,
    hasMenuSection: categories.map((category) => ({
      "@type": "MenuSection",
      name: category,
      hasMenuItem: items
        .filter((item) => item.category === category)
        .map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          description: item.description,
          offers: {
            "@type": "Offer",
            price: item.price,
            priceCurrency: "IDR",
          },
        })),
    })),
  };
}
