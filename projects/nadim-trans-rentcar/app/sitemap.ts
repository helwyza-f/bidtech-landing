import { MetadataRoute } from "next";
import { getAllCars } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nadimstrans.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/kendaraan`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/layanan`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const vehiclePages: MetadataRoute.Sitemap = getAllCars().map((car) => ({
    url: `${baseUrl}/kendaraan/${car.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: car.featured ? 0.9 : 0.7,
  }));

  return [...staticPages, ...vehiclePages];
}
