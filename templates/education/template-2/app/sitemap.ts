import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";
import { courses } from "@/lib/data/courses";
import { mentors } from "@/lib/data/mentors";
import { events } from "@/lib/data/events";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/kursus", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/mentor", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/event", priority: 0.8, changeFrequency: "daily" as const },
    { path: "/bootcamp", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/beasiswa", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/tentang", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/kontak", priority: 0.5, changeFrequency: "monthly" as const },
  ];

  const courseRoutes = courses.map((course) => ({
    path: `/kursus/${course.slug}`,
    priority: 0.7,
    changeFrequency: "weekly" as const,
  }));

  const mentorRoutes = mentors.map((mentor) => ({
    path: `/mentor/${mentor.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  const eventRoutes = events.map((event) => ({
    path: `/event/${event.slug}`,
    priority: 0.6,
    changeFrequency: "weekly" as const,
  }));

  const allRoutes = [...staticRoutes, ...courseRoutes, ...mentorRoutes, ...eventRoutes];

  return allRoutes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}