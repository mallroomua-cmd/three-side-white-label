/**
 * Single source of truth for the public site origin (metadata, sitemap, robots, JSON-LD).
 * See `.cursor/rules/seoStandard.md`.
 */
export function getAppUrl(): string {
  const nextRaw = (process.env.NEXT_PUBLIC_APP_URL ?? '').trim()
  const appRaw = (process.env.APP_URL ?? '').trim()
  let candidate = nextRaw || appRaw || "http://localhost:3333"
  candidate = candidate.replace(/\/$/, '')

  if (!/^https?:\/\//i.test(candidate)) {
    candidate =
      (process.env.NODE_ENV === 'production' ? 'https://' : 'http://') + candidate
  }

  if (process.env.NODE_ENV === 'production') {
    candidate = candidate.replace(/^http:\/\//, 'https://')
  }

  try {
    new URL(candidate)
    return candidate
  } catch {
    return "http://localhost:3333"
  }
}
