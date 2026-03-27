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
        image="/images/hero-woman.jpg"
        category="Круизная Коллекция"
        title="Женская Коллекция 2026"
        description="Элегантность встречает современность в новой круизной коллекции. Откройте для себя изысканные силуэты и роскошные материалы."
        ctaText="Коллекция 2026"
        ctaLink="#"
      />

      {/* Product Grid */}
      <ProductGrid />

      {/* Story Section - Split */}
      <StorySection
        image="/images/men-collection.jpg"
        category="Мужская Коллекция"
        title="Городской Стиль"
        description="Откройте для себя коллекцию аксессуаров для современного мужчины. Рюкзаки, сумки и аксессуары, сочетающие практичность с безупречным стилем."
        ctaText="Смотреть коллекцию"
        ctaLink="#"
      />

      {/* Story Section - Split Reverse */}
      <StorySection
        reverse
        image="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop"
        category="Парфюмерия"
        title="Искусство Ароматов"
        description="Погрузитесь в мир изысканных ароматов THREE SIDE. Каждый флакон — это история, рассказанная через ноты редких ингредиентов."
        ctaText="Открыть парфюмерию"
        ctaLink="#"
      />

      {/* Story Section - Full Width */}
      <StorySection
        fullWidth
        image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2000&auto=format&fit=crop"
        category="Мастерство"
        title="Искусство Совершенства"
        description="Каждое изделие THREE SIDE создаётся мастерами с многолетним опытом, хранящими традиции haute couture."
        ctaText="Узнать больше"
        ctaLink="#"
      />

      <Footer />
    </main>
  )
}
