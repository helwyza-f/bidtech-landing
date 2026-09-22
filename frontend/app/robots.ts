import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://bidtech.co.id";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
