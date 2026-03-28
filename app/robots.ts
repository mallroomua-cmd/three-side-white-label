import type { MetadataRoute } from "next"

import { getAppUrl } from "@/lib/get-app-url"

export default function robots(): MetadataRoute.Robots {
  const base = getAppUrl()
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/checkout", "/api/", "/cart"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}
