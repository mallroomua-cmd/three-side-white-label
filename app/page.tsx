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
        category="Accessories"
        title="The Art of Travel"
        description="From timeless trunks to modern carry-ons, discover luggage crafted for the discerning traveler. Each piece embodies over a century of expertise in the art of travel."
        ctaText="Explore Travel"
        ctaLink="#"
        image="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop"
      />

      {/* Editorial Section 2 - Full Width */}
      <EditorialSection
        layout="full"
        category="Summer 2024"
        title="Ocean Breeze"
        description="A collection inspired by the endless horizon and the gentle caress of sea winds."
        ctaText="Discover the Collection"
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
        title="Craftsmanship Reimagined"
        description="Our artisans blend centuries-old techniques with contemporary vision, creating pieces that transcend time. Each stitch tells a story of dedication and passion."
        ctaText="Meet Our Artisans"
        ctaLink="#"
        image="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1200&auto=format&fit=crop"
        bgColor="bg-secondary"
      />

      <Footer />
    </main>
  )
}
