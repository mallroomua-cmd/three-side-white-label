import type { CatalogRouteSlug } from "@/lib/catalog-routes"

import type { CatalogProduct } from "./types"

const p = (
  slug: string,
  brand: string,
  name: string,
  priceUah: number,
  categorySlug: CatalogRouteSlug,
  image: string,
  opts?: { description?: string; isNew?: boolean }
): CatalogProduct => ({
  slug,
  brand,
  name,
  priceUah,
  priceLabel: `${priceUah.toLocaleString("uk-UA")} грн`,
  image,
  categorySlug,
  description: opts?.description,
  isNew: opts?.isNew,
})

/** Single source of truth for PDP, PLP, sitemap, cart. */
export const CATALOG_PRODUCTS: CatalogProduct[] = [
  p("lady-d-lite", "Dior", "Lady D-Lite", 185_000, "bags", "/images/cult-bag-1.png", {
    description:
      "Канва з мотивом Toile de Jouy та шкіряні акценти — силует, що став сучасною іконою Дому.",
    isNew: true,
  }),
  p("chanel-handbag-25", "Chanel", "Small Handbag 25", 135_000, "bags", "/images/cult-bag-2.png", {
    description: "Компактна форма з ланцюжком та фірмовою стьобаною шкірою.",
  }),
  p("lv-neverfull-mm", "Louis Vuitton", "Neverfull MM", 149_000, "bags", "/images/cult-bag-3.png", {
    description: "Універсальний тоут у монограм — місткість і елегантність щодня.",
    isNew: true,
  }),
  p("prada-galleria-soft", "Prada", "Galleria Soft", 199_000, "bags", "/images/cult-bag-4.png", {
    description: "Saffiano-шкіра та лаконічна геометрія міланського Дому.",
  }),
  p("jacquemus-le-bambino", "Jacquemus", "Le Bambino", 92_000, "bags", "/images/cult-bag-1.png", {
    description: "Мініатюрний силует провокаційної пропорції.",
  }),
  p("balenciaga-le-cagole-xs", "Balenciaga", "Le Cagole XS", 141_000, "bags", "/images/cult-bag-4.png", {
    description: "Деконструйована класика з заклепками та ремінцем через плече.",
  }),

  p("dior-robe-atelier", "Dior", "Сукня Atelier", 98_000, "fashion", "/images/cult-bag-1.png", {
    description: "Вечірній силует з акцентом на лінію талії та плин тканини.",
  }),
  p("prada-blouse-silk", "Prada", "Шовкова блуза", 52_000, "fashion", "/images/cult-bag-2.png"),
  p("balenciaga-coat-signature", "Balenciaga", "Пальто Signature", 143_000, "fashion", "/images/cult-bag-3.png"),
  p("jacquemus-skirt-pleat", "Jacquemus", "Спідниця Pleat", 41_000, "fashion", "/images/cult-bag-4.png"),

  p("dior-jadior-slingback", "Dior", "J'Adior Slingback", 67_000, "shoes", "/images/cult-bag-1.png"),
  p("chanel-ballerina-classic", "Chanel", "Classic Ballerina", 54_000, "shoes", "/images/cult-bag-2.png"),
  p("prada-monolith-loafers", "Prada", "Monolith Loafers", 89_000, "shoes", "/images/cult-bag-3.png"),
  p("lv-academy", "Louis Vuitton", "LV Academy", 73_000, "shoes", "/images/cult-bag-4.png"),
  p("jacquemus-les-mules", "Jacquemus", "Les Mules", 49_000, "shoes", "/images/cult-bag-1.png"),
  p("balenciaga-knife-heels", "Balenciaga", "Knife Heels", 95_000, "shoes", "/images/cult-bag-2.png"),

  p("chanel-sunglasses-cateye", "Chanel", "Окуляри Cat-Eye", 31_000, "accessories", "/images/cult-bag-3.png"),
  p("dior-belt-saddle", "Dior", "Пояс Saddle", 29_000, "accessories", "/images/cult-bag-4.png"),
  p("lv-scarf-monogram", "Louis Vuitton", "Хустка Monogram", 17_000, "accessories", "/images/cult-bag-1.png"),
  p("prada-belt-leather", "Prada", "Шкіряний ремінь", 22_000, "accessories", "/images/cult-bag-2.png"),
  p("jacquemus-cap-le-bob", "Jacquemus", "Кепка Le Bob", 14_000, "accessories", "/images/cult-bag-3.png"),
  p("balenciaga-scarf-silk", "Balenciaga", "Шовковий шарф", 19_000, "accessories", "/images/cult-bag-4.png"),

  p("dior-necklace-rose-des-vents", "Dior", "Кольє Rose des Vents", 116_000, "jewelry", "/images/cult-bag-1.png"),
  p("chanel-earrings-coco-crush", "Chanel", "Сережки Coco Crush", 124_000, "jewelry", "/images/cult-bag-2.png"),
  p("lv-bracelet-blossom", "Louis Vuitton", "Браслет Blossom", 108_000, "jewelry", "/images/cult-bag-3.png"),
  p("prada-ring-triangle", "Prada", "Каблучка Triangle", 64_000, "jewelry", "/images/cult-bag-4.png"),
  p("jacquemus-necklace-chouchou", "Jacquemus", "Кольє Le Chouchou", 47_000, "jewelry", "/images/cult-bag-1.png"),
  p("balenciaga-earrings-bb", "Balenciaga", "Сережки BB", 52_000, "jewelry", "/images/cult-bag-2.png"),
]

const bySlug = new Map(CATALOG_PRODUCTS.map((item) => [item.slug, item]))

export function getProductBySlug(slug: string): CatalogProduct | undefined {
  return bySlug.get(slug)
}

export function getAllProductSlugs(): string[] {
  return CATALOG_PRODUCTS.map((item) => item.slug)
}

export function getProductsByCategory(categorySlug: CatalogRouteSlug): CatalogProduct[] {
  if (categorySlug === "all") {
    return [...CATALOG_PRODUCTS]
  }
  return CATALOG_PRODUCTS.filter((item) => item.categorySlug === categorySlug)
}

/** Featured on homepage grid (slugs must exist in CATALOG_PRODUCTS). */
export const HOME_FEATURED_SLUGS = [
  "lady-d-lite",
  "chanel-handbag-25",
  "lv-neverfull-mm",
  "prada-galleria-soft",
] as const
