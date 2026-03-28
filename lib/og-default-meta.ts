import { getAppUrl } from '@/lib/get-app-url'

/** Matches [`public/og-default.jpg`](public/og-default.jpg) after resize (1200×630). */
export const OG_DEFAULT_PATH = '/og-default.jpg'
export const OG_DEFAULT_WIDTH = 1200
export const OG_DEFAULT_HEIGHT = 630

export function absoluteOgDefaultUrl(): string {
  return `${getAppUrl().replace(/\/$/, '')}${OG_DEFAULT_PATH}`
}

export function defaultOgImageFields(alt: string) {
  return [
    {
      url: absoluteOgDefaultUrl(),
      width: OG_DEFAULT_WIDTH,
      height: OG_DEFAULT_HEIGHT,
      alt,
    },
  ]
}
