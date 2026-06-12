import type { MetadataRoute } from "next";
import { dividends } from "@/data/dividends";
import { getMakroNewsPosts } from "@/lib/makro-news";

const SITE_URL = "https://www.utdelning.nu";

export const dynamic = "force-dynamic";

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
  const latestMakroUpdate = makroPosts[0]?.updatedAt
    ? new Date(makroPosts[0].updatedAt)
    : new Date();
  const makroNewsPages = makroPosts.map((post) => ({
    url: `${SITE_URL}/nyheter/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "daily" as const,
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
      url: `${SITE_URL}/nyheter`,
      lastModified: latestMakroUpdate,
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
    {
      url: `${SITE_URL}/integritetspolicy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...makroNewsPages,
    ...stockPages,
  ];
}
