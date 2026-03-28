import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CategoryLayout } from "@/components/CategoryLayout"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { CATEGORY_META, getProductsByCategory } from "@/lib/catalog"
import { isCatalogRouteSlug } from "@/lib/catalog-routes"
import { getAppUrl } from "@/lib/get-app-url"
import { absoluteOgDefaultUrl, defaultOgImageFields } from "@/lib/og-default-meta"

const filterableBrands = ["Chanel", "Dior", "Louis Vuitton", "Prada", "Jacquemus", "Balenciaga"] as const

export const dynamicParams = true
export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  if (!isCatalogRouteSlug(slug)) {
    return { title: "Каталог", robots: { index: false, follow: false } }
  }
  const category = CATEGORY_META[slug]
  if (!category) {
    return { title: "Каталог", robots: { index: false, follow: false } }
  }
  const baseUrl = getAppUrl()
  const canonical = `${baseUrl}/category/${slug}`
  return {
    title: category.title,
    description: category.description,
    alternates: { canonical },
    openGraph: {
      title: `${category.title} | THREE SIDE`,
      description: category.description,
      url: canonical,
      type: "website",
      siteName: "THREE SIDE",
      locale: "uk_UA",
      images: defaultOgImageFields(`${category.title} — THREE SIDE`),
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.title} | THREE SIDE`,
      description: category.description,
      images: [absoluteOgDefaultUrl()],
    },
  }
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ brand?: string }>
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params
  const { brand } = await searchParams

  if (!isCatalogRouteSlug(slug)) {
    notFound()
  }

  const category = CATEGORY_META[slug]
  if (!category) {
    notFound()
  }

  const isBrandFilterEnabled = Boolean(category.enableBrandFilter)
  const safeSelectedBrand =
    isBrandFilterEnabled && brand && filterableBrands.includes(brand as (typeof filterableBrands)[number])
      ? brand
      : undefined

  let products = getProductsByCategory(slug)
  if (safeSelectedBrand) {
    products = products.filter((item) => item.brand === safeSelectedBrand)
  }

  const plpProducts = products.map((p) => ({
    id: p.slug,
    slug: p.slug,
    brand: p.brand,
    name: p.name,
    price: p.priceLabel,
    image: p.image,
  }))

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CategoryLayout
        categorySlug={slug}
        categoryTitle={category.title}
        categoryDescription={category.description}
        products={plpProducts}
        brandFilters={isBrandFilterEnabled ? [...filterableBrands] : []}
        selectedBrand={safeSelectedBrand}
      />
      <Footer />
    </main>
  )
}
