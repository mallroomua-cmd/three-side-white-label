import type { Metadata } from "next"
import dynamic from "next/dynamic"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HomeJsonLd } from "@/components/home-json-ld"
import { getProductBySlug, HOME_FEATURED_SLUGS } from "@/lib/catalog"
import { absoluteOgDefaultUrl, defaultOgImageFields } from "@/lib/og-default-meta"

import type { ProductGridItem } from "@/components/product-grid"

const CategoryGrid = dynamic(
  () => import("@/components/category-grid").then((m) => ({ default: m.CategoryGrid })),
  {
    ssr: true,
    loading: () => <div className="min-h-[280px] bg-background" aria-hidden />,
  },
)

const StorySection = dynamic(
  () => import("@/components/story-section").then((m) => ({ default: m.StorySection })),
  {
    ssr: true,
    loading: () => <div className="min-h-[50vh] bg-background" aria-hidden />,
  },
)

const ProductGrid = dynamic(
  () => import("@/components/product-grid").then((m) => ({ default: m.ProductGrid })),
  {
    ssr: true,
    loading: () => <div className="min-h-[480px] bg-background" aria-hidden />,
  },
)

const Footer = dynamic(
  () => import("@/components/footer").then((m) => ({ default: m.Footer })),
  {
    ssr: true,
    loading: () => <div className="min-h-[240px] bg-secondary" aria-hidden />,
  },
)

const homeDescription =
  "Відкрийте світ THREE SIDE. Досліджуйте наші колекції розкішних сумок, одягу, парфумерії та прикрас."

export const metadata: Metadata = {
  title: {
    absolute: "THREE SIDE | Дім Високої Моди",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "THREE SIDE | Дім Високої Моди",
    description: homeDescription,
    url: "/",
    type: "website",
    siteName: "THREE SIDE",
    locale: "uk_UA",
    images: defaultOgImageFields("THREE SIDE — Дім Високої Моди"),
  },
  twitter: {
    card: "summary_large_image",
    title: "THREE SIDE | Дім Високої Моди",
    description: homeDescription,
    images: [absoluteOgDefaultUrl()],
  },
}

function getFeaturedGridItems(): ProductGridItem[] {
  const items: ProductGridItem[] = []
  for (const slug of HOME_FEATURED_SLUGS) {
    const p = getProductBySlug(slug)
    if (!p) continue
    items.push({
      slug: p.slug,
      name: p.name,
      price: p.priceLabel,
      image: p.image,
      isNew: p.isNew,
    })
  }
  return items
}

export default function Home() {
  const featuredItems = getFeaturedGridItems()

  return (
    <>
      <HomeJsonLd />
      <main className="min-h-screen">
        <Header />
        <Hero />

        <CategoryGrid />

        <StorySection
          fullWidth
          image="/images/collection-cruise-2026.png"
          category="Круїзна Колекція"
          title="Жіноча Колекція 2026"
          description="Елегантність зустрічає сучасність у новій круїзній колекції. Відкрийте для себе вишукані силуети та розкішні матеріали."
          ctaText="Колекція 2026"
          ctaLink="/category/fashion"
        />

        <ProductGrid items={featuredItems} />

        <StorySection
          image="/images/story-men-style.png"
          category="Чоловіча Колекція"
          title="Міський Стиль"
          description="Відкрийте для себе колекцію аксесуарів для сучасного чоловіка. Рюкзаки, сумки та аксесуари, що поєднують практичність з бездоганним стилем."
          ctaText="Переглянути колекцію"
          ctaLink="/category/accessories"
        />

        <StorySection
          reverse
          image="/images/story-before-parfume.png"
          category="Парфумерія"
          title="Мистецтво Ароматів"
          description="Поринь у світ вишуканих ароматів THREE SIDE. Кожен флакон — це історія, розказана через ноти рідкісних інгредієнтів."
          ctaText="Відкрити парфумерію"
          ctaLink="/category/perfume"
        />

        <StorySection
          fullWidth
          image="/images/story-craftsmanship-atelier.jpg"
          fullWidthImageClassName="object-[36%_50%] max-lg:object-[42%_48%]"
          fullWidthScrimClassName="bg-black/32"
          category="Майстерність"
          title="Мистецтво Досконалості"
          description="Кожен виріб THREE SIDE створюється майстрами з багаторічним досвідом, які зберігають традиції haute couture."
          ctaText="Дізнатися більше"
          ctaLink="/contact"
        />

        <Footer />
      </main>
    </>
  )
}
