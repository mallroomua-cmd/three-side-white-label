import type { CatalogRouteSlug } from "@/lib/catalog-routes"

import type { CatalogProduct } from "./types"

const HOUSE = "THREE SIDE"

const p = (
  slug: string,
  name: string,
  priceUah: number,
  categorySlug: CatalogRouteSlug,
  image: string,
  opts?: { description?: string; isNew?: boolean }
): CatalogProduct => ({
  slug,
  brand: HOUSE,
  name,
  priceUah,
  priceLabel: `${priceUah.toLocaleString("uk-UA")} грн`,
  image,
  categorySlug,
  description: opts?.description,
  isNew: opts?.isNew,
})

/** Single source of truth for PDP, PLP, sitemap, cart. Усі позиції — колекції дому THREE SIDE. */
export const CATALOG_PRODUCTS: CatalogProduct[] = [
  p("ts-bag-atelier-i", "Сумка Atelier I", 185_000, "bags", "/images/cult-bag-1.png", {
    description:
      "Структурований силует з преміальної шкіри та лаконічною фурнітурою — щоденна елегантність дому.",
    isNew: true,
  }),
  p("ts-bag-nocturne-ii", "Сумка Nocturne II", 135_000, "bags", "/images/cult-bag-2.png", {
    description: "Компактна форма з ланцюжковим ременем і м’якою стьобаною текстурою.",
  }),
  p("ts-bag-riviera-iii", "Тоут Riviera III", 149_000, "bags", "/images/cult-bag-3.png", {
    description: "Місткий тоут для міста та подорожей — баланс функції та вишуканості.",
    isNew: true,
  }),
  p("ts-bag-obsidian-iv", "Сумка Obsidian IV", 199_000, "bags", "/images/cult-bag-4.png", {
    description: "Глибокий тон, геометричні лінії та акуратні шви майстрів ательє.",
  }),
  p("ts-bag-minimal-v", "Клатч Minimal V", 92_000, "bags", "/images/category-bags.png", {
    description: "Мінімалістичний силует для вечора та особливих виходів.",
  }),
  p("ts-bag-arch-vi", "Сумка Arch VI", 141_000, "bags", "/images/cult-bag-1.png", {
    description: "Архітектурна форма з акцентом на плечовий ремінь та м’яку подушку корпусу.",
  }),

  p("ts-dress-aurora", "Сукня Aurora", 98_000, "fashion", "/images/collection-main.png", {
    description: "Вечірній силует з акцентом на талію та плин преміальної тканини.",
  }),
  p("ts-blouse-silk-line", "Шовкова блуза Linea", 52_000, "fashion", "/images/cult-bag-2.png", {
    description: "Легка шовкова площина та витончений крій для денного та коктейльного дрес-коду.",
  }),
  p("ts-coat-monolith", "Пальто Monolith", 143_000, "fashion", "/images/men-collection.jpg", {
    description: "Чіткий лапель, довга лінія силуету та щільна вовняна основа.",
  }),
  p("ts-skirt-pleat-studio", "Спідниця Pleat Studio", 41_000, "fashion", "/images/cult-bag-4.png", {
    description: "Плісе та чиста геометрія для поєднання з базою ательє.",
  }),

  p("ts-shoe-sling-arch", "Слінгбек Arch", 67_000, "shoes", "/images/category-shoes.png", {
    description: "Відкрита п’ятка, стійкий каблук і витончена лінія підйому стопи.",
  }),
  p("ts-shoe-ballet-soft", "Балетки Soft", 54_000, "shoes", "/images/cult-bag-2.png", {
    description: "М’яка шкіра всередині, ледь помітний каблук — комфорт протягом дня.",
  }),
  p("ts-shoe-loafer-city", "Лофери City", 89_000, "shoes", "/images/cult-bag-3.png", {
    description: "Міський лофер з мінімалістичним носом і гнучкою підошвою.",
  }),
  p("ts-shoe-sneaker-academy", "Кросівки Academy", 73_000, "shoes", "/images/cult-bag-4.png", {
    description: "Легка підошва та лаконічний верх у дусі сучасного urban-стилю.",
  }),
  p("ts-shoe-mule-sun", "Мюлі Sun", 49_000, "shoes", "/images/cult-bag-1.png", {
    description: "Відкритий підйом, стабільна колодка та теплий відтінок шкіри.",
  }),
  p("ts-shoe-heel-line", "Туфлі на підборах Line", 95_000, "shoes", "/images/category-shoes.png", {
    description: "Витягнена лінія носка та витончений каблук для вечірнього дрес-коду.",
  }),

  p("ts-acc-sun-cat", "Сонцезахисні окуляри Cat", 31_000, "accessories", "/images/category-accessories.png", {
    description: "Форма cat-eye з легким глянцем оправи та UV-захистом.",
  }),
  p("ts-acc-belt-core", "Пояс Core", 29_000, "accessories", "/images/cult-bag-4.png", {
    description: "Широкий ремінь з масивною пряжкою в стилістиці дому.",
  }),
  p("ts-acc-scarf-signature", "Хустка Signature", 17_000, "accessories", "/images/cult-bag-1.png", {
    description: "Шовк із принтом, натхненним архівом THREE SIDE.",
  }),
  p("ts-acc-belt-thin", "Вузький ремінь", 22_000, "accessories", "/images/cult-bag-2.png", {
    description: "Тонка лінія та дискретна пряжка для суконь і брюк.",
  }),
  p("ts-acc-cap-bob", "Кепка Bob", 14_000, "accessories", "/images/cult-bag-3.png", {
    description: "Лімітована форма з бавовняного джерсі та вишитим логотипом ательє.",
  }),
  p("ts-acc-scarf-silk", "Шовковий шарф", 19_000, "accessories", "/images/category-accessories.png", {
    description: "Подвійний креп-шовк, ручна обробка країв.",
  }),

  p("ts-jwl-necklace-rose", "Кольє Rose", 116_000, "jewelry", "/images/category-jewelry.png", {
    description: "Тонке золоте плетіння та центральний мотив у геометрії дому.",
  }),
  p("ts-jwl-earring-soft", "Сережки Soft", 124_000, "jewelry", "/images/cult-bag-2.png", {
    description: "Матова поверхня металу та мінімальний об’єм для щоденного носіння.",
  }),
  p("ts-jwl-bracelet-bloom", "Браслет Bloom", 108_000, "jewelry", "/images/category-jewelry.png", {
    description: "Плавні ланки та замок з фірмовим гравіруванням.",
  }),
  p("ts-jwl-ring-geo", "Каблучка Geo", 64_000, "jewelry", "/images/cult-bag-4.png", {
    description: "Гострі грані та полірована площина — скульптурний акцент.",
  }),
  p("ts-jwl-necklace-charm", "Кольє Charm", 47_000, "jewelry", "/images/cult-bag-1.png", {
    description: "Делікатний ланцюг з підвіскою в формі знаку THREE SIDE.",
  }),
  p("ts-jwl-earring-stud", "Сережки Stud", 52_000, "jewelry", "/images/category-jewelry.png", {
    description: "Класичний пусет з каменем огранки ательє.",
  }),
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
  "ts-bag-atelier-i",
  "ts-bag-nocturne-ii",
  "ts-bag-riviera-iii",
  "ts-bag-obsidian-iv",
] as const
