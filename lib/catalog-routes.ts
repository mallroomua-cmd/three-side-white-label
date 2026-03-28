/**
 * PLP slugs for `/category/[slug]`. Must stay in sync with `app/category/[slug]/page.tsx` `categoryMap`.
 * Synthetic `all` is a route segment, not necessarily a DB row when using Supabase later.
 */
export const CATALOG_ROUTE_SLUGS = [
  "all",
  "fashion",
  "bags",
  "shoes",
  "accessories",
  "perfume",
  "beauty",
  "jewelry",
  "watches",
] as const

export type CatalogRouteSlug = (typeof CATALOG_ROUTE_SLUGS)[number]

export function isCatalogRouteSlug(value: string): value is CatalogRouteSlug {
  return (CATALOG_ROUTE_SLUGS as readonly string[]).includes(value)
}
