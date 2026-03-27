import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { CategoryGrid } from "@/components/category-grid"
import { StorySection } from "@/components/story-section"
import { ProductGrid } from "@/components/product-grid"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />

      {/* Category Grid */}
      <CategoryGrid />

      {/* Story Section - Full Width */}
      <StorySection
        fullWidth
        image="/images/hero-beach.jpg"
        category="Круїзна Колекція"
        title="Жіноча Колекція 2026"
        description="Елегантність зустрічає сучасність у новій круїзній колекції. Відкрийте для себе вишукані силуети та розкішні матеріали."
        ctaText="Колекція 2026"
        ctaLink="#"
      />

      {/* Product Grid */}
      <ProductGrid />

      {/* Story Section - Split */}
      <StorySection
        image="/images/hero-men.jpg"
        category="Чоловіча Колекція"
        title="Міський Стиль"
        description="Відкрийте для себе колекцію аксесуарів для сучасного чоловіка. Рюкзаки, сумки та аксесуари, що поєднують практичність з бездоганним стилем."
        ctaText="Переглянути колекцію"
        ctaLink="#"
      />

      {/* Story Section - Split Reverse */}
      <StorySection
        reverse
        image="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop"
        category="Парфумерія"
        title="Мистецтво Ароматів"
        description="Поринь у світ вишуканих ароматів THREE SIDE. Кожен флакон — це історія, розказана через ноти рідкісних інгредієнтів."
        ctaText="Відкрити парфумерію"
        ctaLink="#"
      />

      {/* Story Section - Full Width */}
      <StorySection
        fullWidth
        image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2000&auto=format&fit=crop"
        category="Майстерність"
        title="Мистецтво Досконалості"
        description="Кожен виріб THREE SIDE створюється майстрами з багаторічним досвідом, які зберігають традиції haute couture."
        ctaText="Дізнатися більше"
        ctaLink="#"
      />

      <Footer />
    </main>
  )
}
