import { getAppUrl } from '@/lib/get-app-url'

type ProductBreadcrumbJsonLdProps = {
  categoryHref: string
  categoryLabel: string
  productName: string
  productSlug: string
}

export function ProductBreadcrumbJsonLd({
  categoryHref,
  categoryLabel,
  productName,
  productSlug,
}: ProductBreadcrumbJsonLdProps) {
  const base = getAppUrl().replace(/\/$/, '')
  const homeUrl = `${base}/`
  const categoryPath = categoryHref.startsWith('/') ? categoryHref : `/${categoryHref}`
  const categoryUrl = `${base}${categoryPath}`
  const productUrl = `${base}/product/${productSlug}`

  const payload = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Головна',
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryLabel,
        item: categoryUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: productName,
        item: productUrl,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  )
}
