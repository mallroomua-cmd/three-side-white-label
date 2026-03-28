import { getAppUrl } from '@/lib/get-app-url'

const DESCRIPTION =
  'Відкрийте світ THREE SIDE. Колекції сумок, одягу, парфумерії та прикрас.'

export function HomeJsonLd() {
  const base = getAppUrl()

  const payload = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'THREE SIDE',
        url: base,
        description: DESCRIPTION,
      },
      {
        '@type': 'WebSite',
        name: 'THREE SIDE',
        url: base,
        description: DESCRIPTION,
        publisher: {
          '@type': 'Organization',
          name: 'THREE SIDE',
          url: base,
        },
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
