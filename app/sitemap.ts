import type { MetadataRoute } from "next";
import { dividends } from "@/data/dividends";
import { getMakroNewsPosts } from "@/lib/makro-news";

const SITE_URL = "https://utdelning.nu";

function createStockSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const uniqueStockSlugs = Array.from(
    new Set(dividends.map((dividend) => createStockSlug(dividend.company)))
  );

  const stockPages = uniqueStockSlugs.map((slug) => ({
    url: `${SITE_URL}/aktie/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  const makroPosts = await getMakroNewsPosts();
  const makroNewsPages = makroPosts.map((post) => ({
    url: `${SITE_URL}/makro/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/makro/pro`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/utdelningskalender`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/rakna`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/kontakt`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...makroNewsPages,
    ...stockPages,
  ];
}
