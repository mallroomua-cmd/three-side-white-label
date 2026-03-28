import { getAppUrl } from '@/lib/get-app-url'
import type { CatalogProduct } from '@/lib/catalog/types'

function absoluteFromBase(path: string, base: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${base.replace(/\/$/, '')}${normalized}`
}

export function ProductJsonLd({ product }: { product: CatalogProduct }) {
  const base = getAppUrl()
  const imageUrl = absoluteFromBase(product.image, base)
  const productUrl = `${base.replace(/\/$/, '')}/product/${product.slug}`

  const payload = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description ?? `${product.brand} — ${product.name}. THREE SIDE.`,
    image: [imageUrl],
    brand: { '@type': 'Brand', name: product.brand },
    offers: {
      '@type': 'Offer',
      price: product.priceUah,
      priceCurrency: 'UAH',
      availability: 'https://schema.org/InStock',
      url: productUrl,
      seller: { '@type': 'Organization', name: 'THREE SIDE', url: base },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  )
}
