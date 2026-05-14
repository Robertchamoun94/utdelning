import type { MetadataRoute } from "next";
import { dividends } from "@/data/dividends";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const uniqueStockSlugs = Array.from(
    new Set(dividends.map((dividend) => createStockSlug(dividend.company)))
  );

  const stockPages = uniqueStockSlugs.map((slug) => ({
    url: `${SITE_URL}/aktie/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...stockPages,
  ];
}
