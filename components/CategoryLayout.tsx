import Image from "next/image"
import Link from "next/link"

type CategoryProduct = {
  id: string
  slug: string
  brand: string
  name: string
  price: string
  image?: string
}

interface CategoryLayoutProps {
  categorySlug: string
  categoryTitle: string
  categoryDescription: string
  products?: CategoryProduct[]
  brandFilters?: string[]
  selectedBrand?: string
}

export function CategoryLayout({
  categorySlug,
  categoryTitle,
  categoryDescription,
  products = [],
  brandFilters = [],
  selectedBrand,
}: CategoryLayoutProps) {
  const hasProducts = products.length > 0

  return (
    <section className="min-h-screen bg-background px-5 pb-24 pt-[7.5rem] lg:px-10 lg:pb-32 lg:pt-44">
      <div className="max-w-[1600px] mx-auto">
        <header className="text-center border-b border-[0.5px] border-brand-ghost/50 pb-16 lg:pb-20">
          <p className="font-sans font-extralight text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Категорія</p>
          <h1 className="font-serif font-light text-3xl sm:text-4xl lg:text-6xl tracking-[0.2em] uppercase text-foreground">
            {categoryTitle}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-muted-foreground font-light tracking-[0.04em] text-sm lg:text-base">
            {categoryDescription}
          </p>
        </header>

        {brandFilters.length > 0 && (
          <div className="mt-10 lg:mt-12 border-y border-[0.5px] border-brand-ghost/40 py-5">
            <div className="flex flex-wrap items-center gap-3 lg:gap-4 justify-center">
              <Link
                href={`/category/${categorySlug}`}
                className={`px-4 py-2 text-[11px] font-extralight uppercase tracking-[0.2em] border-[0.5px] rounded-none transition-colors duration-700 ${
                  !selectedBrand
                    ? "border-foreground text-foreground"
                    : "border-brand-ghost/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                Усі бренди
              </Link>
              {brandFilters.map((brand) => (
                <Link
                  key={brand}
                  href={`/category/${categorySlug}?brand=${encodeURIComponent(brand)}`}
                  className={`px-4 py-2 text-[11px] font-extralight uppercase tracking-[0.2em] border-[0.5px] rounded-none transition-colors duration-700 ${
                    selectedBrand === brand
                      ? "border-foreground text-foreground"
                      : "border-brand-ghost/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {brand}
                </Link>
              ))}
            </div>
          </div>
        )}

        {hasProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mt-16 lg:mt-20">
            {products.map((product, idx) => (
              <article key={product.id} className="group">
                <Link href={`/product/${product.slug}`} className="block rounded-none">
                  <div className="relative aspect-[3/4] border-[0.5px] border-brand-ghost/50 bg-secondary overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.jpg"}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={85}
                      priority={idx === 0}
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="pt-5">
                    <p className="font-sans font-extralight text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{product.brand}</p>
                    <h2 className="mt-2 font-serif font-light text-sm uppercase tracking-[0.2em] text-foreground">{product.name}</h2>
                    <p className="mt-2 text-sm tracking-[0.04em] text-muted-foreground">{product.price}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-20 lg:mt-24 border border-border/40 py-20 lg:py-28 text-center">
            <p className="font-light uppercase tracking-[0.18em] text-foreground text-sm lg:text-base">
              Колекція оновлюється. Очікуйте незабаром
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
