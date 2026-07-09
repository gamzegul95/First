import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getServices, getArticles } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, articles] = await Promise.all([getServices(), getArticles()]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/hakkimizda`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/hakkimizda/avukat`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/hizmetler`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/makaleler`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/iletisim`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/gizlilik-ve-cerez-politikasi`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/hizmetler/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/makaleler/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...articlePages];
}
