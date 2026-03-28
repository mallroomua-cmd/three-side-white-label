import type { CatalogRouteSlug } from "@/lib/catalog-routes"

export type CatalogProduct = {
  slug: string
  brand: string
  name: string
  /** Display string e.g. "185 000 грн" */
  priceLabel: string
  /** Integer UAH for cart */
  priceUah: number
  image: string
  description?: string
  categorySlug: CatalogRouteSlug
  isNew?: boolean
}

export type CategoryMeta = {
  title: string
  description: string
  enableBrandFilter?: boolean
}
