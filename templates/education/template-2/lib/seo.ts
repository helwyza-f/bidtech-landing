import type { Metadata } from "next";
import { site } from "@/lib/data/site";
import { nivoraAssets } from "@/lib/data/asset-paths";
import type { Course } from "@/lib/data/courses";
import type { Mentor } from "@/lib/data/mentors";
import type { NivoraEvent } from "@/lib/data/events";

type BuildMetadataOptions = {
  title: string;
  description: string;
  /** Path relatif dari root, misal "/kursus/advanced-react-nextjs". Kosongkan untuk homepage. */
  path?: string;
  /** Path gambar OG khusus halaman ini — fallback ke OG default situs kalau tidak diisi. */
  image?: string;
  /** "article" untuk halaman detail konten (kursus/event/mentor), "website" untuk halaman umum. */
  type?: "website" | "article";
};

/**
 * Sumber tunggal untuk generate metadata Next.js — dipakai di semua
 * page.tsx/generateMetadata supaya title, description, OpenGraph, dan
 * Twitter Card selalu konsisten strukturnya di seluruh situs, tanpa
 * perlu menulis ulang boilerplate OG di tiap halaman.
 */
export function buildMetadata({
  title,
  description,
  path = "",
  image = nivoraAssets.seo.ogHome,
  type = "website",
}: BuildMetadataOptions): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = `${title} — ${site.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: "id_ID",
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/**
 * JSON-LD structured data — dirender lewat <script type="application/ld+json">
 * di masing-masing halaman detail supaya Google berpotensi menampilkan
 * rich result (course card, event card, person card) di hasil pencarian.
 */

export function courseJsonLd(course: Course) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: site.name,
      sameAs: site.url,
    },
    image: `${site.url}${course.image}`,
    url: `${site.url}/kursus/${course.slug}`,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: course.duration,
    },
  };
}

export function eventJsonLd(event: NivoraEvent) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.date,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url: `${site.url}/event/${event.slug}`,
    },
    image: `${site.url}${event.image}`,
    organizer: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    offers: {
      "@type": "Offer",
      price: event.price,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: `${site.url}/event/${event.slug}`,
    },
  };
}

export function mentorJsonLd(mentor: Mentor) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: mentor.name,
    jobTitle: mentor.role,
    description: mentor.bio,
    image: `${site.url}${mentor.photo}`,
    worksFor: {
      "@type": "Organization",
      name: mentor.company,
    },
    url: `${site.url}/mentor/${mentor.slug}`,
    ...(mentor.linkedinUrl ? { sameAs: [mentor.linkedinUrl] } : {}),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    description: site.description,
    url: site.url,
    logo: `${site.url}${nivoraAssets.brand.logoPrimary}`,
    sameAs: site.socials.map((s) => s.href),
  };
}