import type { Metadata } from "next"

import { CategoryGrid } from "@/components/category-grid"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HomeJsonLd } from "@/components/home-json-ld"
import { ProductGrid } from "@/components/product-grid"
import { StorySection } from "@/components/story-section"
import { getProductBySlug, HOME_FEATURED_SLUGS } from "@/lib/catalog"
import { absoluteOgDefaultUrl, defaultOgImageFields } from "@/lib/og-default-meta"

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

function getFeaturedGridItems() {
  return HOME_FEATURED_SLUGS.map((slug) => {
    const p = getProductBySlug(slug)
    if (!p) return null
    return {
      slug: p.slug,
      name: p.name,
      price: p.priceLabel,
      image: p.image,
      isNew: p.isNew,
    }
  }).filter((item): item is NonNullable<typeof item> => item != null)
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
          image="/images/collection-main.png"
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
          image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2000&auto=format&fit=crop"
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
