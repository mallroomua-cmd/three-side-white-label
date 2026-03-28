import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { CartProvider } from '@/components/cart-provider'
import { getAppUrl } from '@/lib/get-app-url'
import { absoluteOgDefaultUrl, defaultOgImageFields } from '@/lib/og-default-meta'
import { Toaster } from 'sonner'
import './globals.css'

const siteUrl = getAppUrl()

function metadataBaseUrl(): URL {
  try {
    return new URL(siteUrl)
  } catch {
    return new URL('http://localhost:3000')
  }
}

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: true,
})

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['200', '300'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl(),
  title: {
    default: 'Дім Високої Моди',
    template: '%s | THREE SIDE',
  },
  description:
    'Відкрийте світ THREE SIDE. Досліджуйте наші колекції розкішних сумок, одягу, парфумерії та прикрас.',
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: 'THREE SIDE',
    url: siteUrl,
    images: defaultOgImageFields('THREE SIDE'),
  },
  twitter: {
    card: 'summary_large_image',
    images: [absoluteOgDefaultUrl()],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="font-sans font-light antialiased">
        <CartProvider>
          {children}
          <Toaster position="top-center" richColors closeButton />
        </CartProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
