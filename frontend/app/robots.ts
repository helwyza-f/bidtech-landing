import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://bidtech.co.id";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/template-website", "/llms.txt", "/llms-full.txt"],
        disallow: ["/api/", "/_next/"],
      },
      // Generative AI & Answer Engine bots (GEO & AEO optimization)
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "anthropic-ai",
          "PerplexityBot",
          "Google-Extended",
          "Googlebot",
          "Bingbot",
          "Applebot-Extended",
          "Bytespider",
          "cohere-ai",
        ],
        allow: ["/", "/template-website", "/llms.txt", "/llms-full.txt"],
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
