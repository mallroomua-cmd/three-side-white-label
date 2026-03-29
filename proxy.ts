import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

/**
 * Filtered PLP views (?brand=, ?q=, etc.) should not be indexed alongside the clean canonical URL.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  if (pathname.startsWith("/category/") && search.length > 0) {
    const res = NextResponse.next()
    res.headers.set("X-Robots-Tag", "noindex, follow")
    return res
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/category/:path*", "/checkout/:path*", "/cart/:path*"],
}
