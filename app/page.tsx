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
        category="Аксессуары"
        title="Искусство Путешествий"
        description="От классических чемоданов до современных дорожных сумок — откройте для себя багаж, созданный для взыскательных путешественников. Каждое изделие воплощает более чем вековой опыт в искусстве путешествий."
        ctaText="Смотреть Travel"
        ctaLink="#"
        image="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop"
      />

      {/* Editorial Section 2 - Full Width */}
      <EditorialSection
        layout="full"
        category="Лето 2024"
        title="Морской Бриз"
        description="Коллекция, вдохновлённая бескрайним горизонтом и нежным прикосновением морского ветра."
        ctaText="Смотреть коллекцию"
        ctaLink="#"
        image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
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
