import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { EditorialSection } from "@/components/editorial-section"
import { ProductGrid } from "@/components/product-grid"
import { MonogramStrip } from "@/components/monogram-strip"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"

export default function Home() {
  return (
    <main className="min-h-screen">
      <CustomCursor />
      <Header />
      <Hero />
      
      {/* Editorial Section 1 - Split Layout */}
      <EditorialSection
        layout="split"
        category="Мужская коллекция"
        title="Городской Стиль"
        description="Откройте для себя коллекцию аксессуаров для современного мужчины. Рюкзаки, сумки и аксессуары, сочетающие практичность с безупречным стилем."
        ctaText="Смотреть коллекцию"
        ctaLink="#"
        image="/images/men-collection.jpg"
      />

      {/* Editorial Section 2 - Full Width */}
      <EditorialSection
        layout="full"
        category="Весна-Лето 2026"
        title="Новая Эра Элегантности"
        description="Коллекция, вдохновлённая бескрайним горизонтом и нежным прикосновением морского ветра."
        ctaText="Коллекция 2026"
        ctaLink="#"
        image="/images/hero-woman.jpg"
      />

      {/* Product Grid */}
      <ProductGrid />

      {/* Monogram Pattern Strip */}
      <MonogramStrip />

      {/* Editorial Section 3 - Split Reverse */}
      <EditorialSection
        layout="split-reverse"
        category="Haute Maroquinerie"
        title="Мастерство в Новом Свете"
        description="Наши мастера сочетают вековые техники с современным видением, создавая изделия, неподвластные времени. Каждый стежок рассказывает историю преданности и страсти к делу."
        ctaText="Познакомиться с мастерами"
        ctaLink="#"
        image="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1200&auto=format&fit=crop"
        bgColor="bg-secondary"
      />

      <Footer />
    </main>
  )
}
