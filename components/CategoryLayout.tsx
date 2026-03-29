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
  categoryTitle: string
  categoryDescription: string
  products?: CategoryProduct[]
}

export function CategoryLayout({
  categoryTitle,
  categoryDescription,
  products = [],
}: CategoryLayoutProps) {
  const hasProducts = products.length > 0

  return (
    <section className="min-h-screen bg-background px-5 pb-24 pt-[7.5rem] lg:px-10 lg:pb-32 lg:pt-44">
      <div className="mx-auto max-w-[1600px]">
        <header className="border-b border-[0.5px] border-brand-ghost/50 pb-16 text-center lg:pb-20">
          <p className="mb-4 font-sans text-[10px] font-extralight uppercase tracking-[0.3em] text-muted-foreground">
            Категорія
          </p>
          <h1 className="font-serif text-3xl font-light uppercase tracking-[0.2em] text-foreground sm:text-4xl lg:text-6xl">
            {categoryTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm font-light tracking-[0.04em] text-muted-foreground lg:text-base">
            {categoryDescription}
          </p>
        </header>

        {hasProducts ? (
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:mt-20 lg:grid-cols-3 lg:gap-12">
            {products.map((product, idx) => (
              <article key={product.id} className="group">
                <Link href={`/product/${product.slug}`} className="block rounded-none">
                  <div className="relative aspect-[3/4] overflow-hidden border-[0.5px] border-brand-ghost/50 bg-secondary">
                    <Image
                      src={product.image || "/og-default.jpg"}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={85}
                      priority={idx === 0}
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="pt-5">
                    <p className="font-sans text-[11px] font-extralight uppercase tracking-[0.3em] text-muted-foreground">
                      {product.brand}
                    </p>
                    <h2 className="mt-2 font-serif text-sm font-light uppercase tracking-[0.2em] text-foreground">
                      {product.name}
                    </h2>
                    <p className="mt-2 text-sm tracking-[0.04em] text-muted-foreground">{product.price}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-20 border border-border/40 py-20 text-center lg:mt-28 lg:py-28">
            <p className="text-sm font-light uppercase tracking-[0.18em] text-foreground lg:text-base">
              Колекція оновлюється. Очікуйте незабаром
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
