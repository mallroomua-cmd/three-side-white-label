import type { MetadataRoute } from "next"

import { getAllProductSlugs } from "@/lib/catalog"
import { getAppUrl } from "@/lib/get-app-url"
import { CATALOG_ROUTE_SLUGS } from "@/lib/catalog-routes"

export const revalidate = 3600

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getAppUrl()
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]

  const categoryEntries: MetadataRoute.Sitemap = CATALOG_ROUTE_SLUGS.map((slug) => ({
    url: `${base}/category/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }))

  const productEntries: MetadataRoute.Sitemap = getAllProductSlugs().map((slug) => ({
    url: `${base}/product/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }))

  return [...staticEntries, ...categoryEntries, ...productEntries]
}
