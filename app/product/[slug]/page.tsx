import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ProductAddToCart } from "@/components/product-add-to-cart"
import { ProductBreadcrumbJsonLd } from "@/components/product-breadcrumb-json-ld"
import { ProductJsonLd } from "@/components/product-json-ld"
import { CATEGORY_META, getProductBySlug } from "@/lib/catalog"
import { getAppUrl } from "@/lib/get-app-url"
import { absoluteOgDefaultUrl, defaultOgImageFields } from "@/lib/og-default-meta"

export const dynamicParams = true
export const revalidate = 3600

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) {
    return { title: "Товар", robots: { index: false, follow: false } }
  }
  const baseUrl = getAppUrl()
  const canonical = `${baseUrl}/product/${product.slug}`
  const description =
    product.description ?? `${product.brand} — ${product.name}. THREE SIDE.`
  return {
    title: product.name,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${product.name} | THREE SIDE`,
      description,
      url: canonical,
      type: "website",
      siteName: "THREE SIDE",
      locale: "uk_UA",
      images: defaultOgImageFields(`${product.name} — THREE SIDE`),
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | THREE SIDE`,
      description,
      images: [absoluteOgDefaultUrl()],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) {
    notFound()
  }

  const categoryMeta = CATEGORY_META[product.categorySlug]
  const categoryHref = `/category/${product.categorySlug}`
  const categoryLabel = categoryMeta?.title ?? "Каталог"

  return (
    <>
      <ProductJsonLd product={product} />
      <ProductBreadcrumbJsonLd
        categoryHref={categoryHref}
        categoryLabel={categoryLabel}
        productName={product.name}
        productSlug={product.slug}
      />
      <main className="min-h-screen bg-background">
        <Header />
        <article className="px-5 pb-24 pt-[7.5rem] lg:px-10 lg:pb-32 lg:pt-40">
          <div className="max-w-[1200px] mx-auto">
            <nav className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-extralight mb-10 lg:mb-14">
              <Link href={categoryHref} className="hover:text-foreground transition-colors duration-700 ease-out">
                {categoryLabel}
              </Link>
              <span className="mx-3 text-brand-ghost/80">/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div className="relative aspect-[3/4] border-[0.5px] border-brand-ghost/50 bg-secondary overflow-hidden">
                <Image
                  src={product.image}
                  alt={`${product.name} — ${product.brand}`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={95}
                  priority
                />
              </div>

              <div className="flex flex-col lg:pt-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-extralight">{product.brand}</p>
                <h1 className="mt-3 font-serif font-light text-3xl sm:text-4xl tracking-[0.2em] uppercase text-foreground leading-tight">
                  {product.name}
                </h1>
                <p className="mt-8 text-sm font-light text-[#C9A96E] tracking-wider">{product.priceLabel}</p>
                {product.description ? (
                  <p className="mt-8 text-sm font-light text-muted-foreground tracking-wide leading-relaxed max-w-xl">
                    {product.description}
                  </p>
                ) : null}
                <ProductAddToCart product={product} />
                <p className="mt-8 text-xs font-light text-muted-foreground tracking-wide max-w-md">
                  Потрібна консультація?{" "}
                  <Link href="/contact" className="border-b border-transparent hover:border-foreground transition-colors duration-700">
                    Напишіть нам
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </article>
        <Footer />
      </main>
    </>
  )
}
