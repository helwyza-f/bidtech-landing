import { MetadataRoute } from "next";
import { getCars } from "@/lib/localizedData";
import { SITE_URL } from "@/lib/seo";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly";
  priority: number;
};

const localizedUrl = (locale: "id" | "en", path: string) =>
  `${SITE_URL}${locale === "en" ? "/en" : ""}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: SitemapPage[] = [
    { path: "", changeFrequency: "daily", priority: 1 },
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
    const idUrl = localizedUrl("id", path);
    const enUrl = localizedUrl("en", path);
    const alternates = {
      languages: { id: idUrl, en: enUrl, "x-default": idUrl },
    };

    return [
      { url: idUrl, lastModified: now, changeFrequency, priority, alternates },
      { url: enUrl, lastModified: now, changeFrequency, priority, alternates },
    ];
  });
}
