import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/_config/business";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "", changeFrequency: "weekly", priority: 1.0 },
    { path: "/available", changeFrequency: "daily", priority: 0.95 },
    { path: "/hatching-eggs", changeFrequency: "weekly", priority: 0.9 },
    { path: "/chickens", changeFrequency: "weekly", priority: 0.9 },
    { path: "/ducks", changeFrequency: "weekly", priority: 0.85 },
    { path: "/quail", changeFrequency: "weekly", priority: 0.85 },
    { path: "/reserve", changeFrequency: "monthly", priority: 0.9 },
    { path: "/guides/incubation", changeFrequency: "monthly", priority: 0.8 },
    { path: "/guides/brooding", changeFrequency: "monthly", priority: 0.8 },
    { path: "/guides/faq", changeFrequency: "monthly", priority: 0.75 },
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/farm-shop", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
