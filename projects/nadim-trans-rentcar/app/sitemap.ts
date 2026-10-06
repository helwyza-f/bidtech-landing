import { MetadataRoute } from "next";
import { getCars } from "@/lib/localizedData";
import { getLocalizedPath, LOCALES, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly";
  priority: number;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: SitemapPage[] = [
    { path: "/", changeFrequency: "daily", priority: 1 },
    { path: "/kendaraan", changeFrequency: "daily", priority: 0.9 },
    { path: "/layanan", changeFrequency: "weekly", priority: 0.8 },
    { path: "/faq", changeFrequency: "weekly", priority: 0.8 },
  ];

  const pages: SitemapPage[] = [
    ...staticPages,
    ...getCars("id").map((car) => ({
      path: `/kendaraan/${car.slug}`,
      changeFrequency: "weekly" as const,
      priority: car.featured ? 0.9 : 0.7,
    })),
  ];

  return pages.flatMap(({ path, changeFrequency, priority }) => {
    const alternatesLanguages: Record<string, string> = {
      "x-default": `${SITE_URL}${getLocalizedPath("id", path)}`,
    };

    LOCALES.forEach((loc) => {
      alternatesLanguages[loc] = `${SITE_URL}${getLocalizedPath(loc, path)}`;
    });

    return LOCALES.map((locale: Locale) => ({
      url: `${SITE_URL}${getLocalizedPath(locale, path)}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: {
        languages: alternatesLanguages,
      },
    }));
  });
}
