"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { Menu, Search, Heart, User, ShoppingBag, X, MapPin, Globe } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, useReducedMotion } from "framer-motion"

import { useCart } from "@/components/cart-provider"
import { CATALOG_PRODUCTS, CATEGORY_META } from "@/lib/catalog"

const mainNav = [
  { label: "Мода", href: "/category/fashion" },
  { label: "Сумки", href: "/category/bags" },
  { label: "Взуття", href: "/category/shoes" },
  { label: "Аксесуари", href: "/category/accessories" },
  { label: "Парфумерія", href: "/category/perfume" },
  { label: "Краса", href: "/category/beauty" },
  { label: "Прикраси", href: "/category/jewelry" },
  { label: "Годинники", href: "/category/watches" },
]

function isCategoryNavActive(pathname: string, href: string): boolean {
  if (pathname === href) return true
  return href !== "/" && pathname.startsWith(`${href}/`)
}

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const reduceMotion = useReducedMotion()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeResultIndex, setActiveResultIndex] = useState(-1)
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const { totalQuantity } = useCart()

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (q.length < 2) return []
    return CATALOG_PRODUCTS.filter((product) => {
      const categoryTitle = CATEGORY_META[product.categorySlug]?.title ?? ""
      const haystack = `${product.name} ${product.brand} ${product.slug} ${categoryTitle}`.toLowerCase()
      return haystack.includes(q)
    }).slice(0, 8)
  }, [searchQuery])

  const mobileNavMotion = useMemo(
    () => ({
      container: {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduceMotion ? 0 : 0.1,
            delayChildren: reduceMotion ? 0 : 0.08,
          },
        },
      },
      item: {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
        },
      },
    }),
    [reduceMotion],
  )

  useEffect(() => {
    const handleScroll = () => {
      try {
        setIsScrolled(window.scrollY > 10)
      } catch {
        /* Unavailable in some embeds */
      }
    }
    const syncId = requestAnimationFrame(() => handleScroll())
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      cancelAnimationFrame(syncId)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!isSearchOpen) return
    const focusId = requestAnimationFrame(() => searchInputRef.current?.focus())
    return () => cancelAnimationFrame(focusId)
  }, [isSearchOpen])

  const closeSearch = () => {
    setIsSearchOpen(false)
    setSearchQuery("")
    setActiveResultIndex(-1)
  }

  const openProduct = (slug: string) => {
    closeSearch()
    router.push(`/product/${slug}`)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          isScrolled || isMobileMenuOpen ? "bg-background" : "bg-transparent"
        }`}
      >
        {/* Main Header — mobile: menu | logo | cart + search row */}
        <div className="lg:hidden">
          <div className="flex min-h-10 items-center justify-between gap-2 px-4 pt-3 pb-2">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex shrink-0 items-center justify-center p-1 transition-colors duration-700 ${
                isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
              } hover:opacity-70`}
              aria-label={isMobileMenuOpen ? "Закрити меню" : "Відкрити меню"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 shrink-0" strokeWidth={1} aria-hidden />
              ) : (
                <Menu className="h-6 w-6 shrink-0" strokeWidth={1} aria-hidden />
              )}
            </button>

            <Link
              href="/"
              className={`min-w-0 flex-1 px-1 text-center font-serif font-light text-lg sm:text-xl tracking-[0.2em] uppercase transition-colors duration-700 ${
                isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
              }`}
            >
              <span className="block truncate">THREE SIDE</span>
            </Link>

            <Link
              href="/cart"
              className={`relative inline-flex shrink-0 items-center justify-center p-1 transition-colors duration-700 ${
                isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
              } hover:opacity-70`}
              aria-label="Кошик"
            >
              <ShoppingBag className="h-6 w-6 shrink-0" strokeWidth={1} aria-hidden />
              {totalQuantity > 0 ? (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[1rem] items-center justify-center bg-foreground px-0.5 font-sans text-[9px] font-extralight tabular-nums text-background rounded-none">
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </span>
              ) : null}
            </Link>
          </div>

          <div className="px-4 pb-3 pt-0">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Відкрити пошук"
              className={`group flex w-full items-center gap-3 border-[0.5px] px-4 py-3 rounded-none text-left transition-colors duration-700 ease-out ${
                isScrolled || isMobileMenuOpen
                  ? "border-brand-ghost/40 bg-secondary/40 text-muted-foreground hover:border-brand-ghost/60"
                  : "border-white/40 bg-white/10 text-white/90 hover:bg-white/15"
              }`}
            >
              <Search
                className={`h-4 w-4 shrink-0 opacity-80 transition-opacity duration-700 group-hover:opacity-100 ${
                  isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
                }`}
                strokeWidth={1}
                aria-hidden
              />
              <span className="font-sans font-extralight text-[11px] tracking-[0.28em] uppercase truncate">
                Пошук у колекції Spring 2026
              </span>
            </button>
          </div>
        </div>

        {/* Main Header — desktop */}
        <div className="relative hidden lg:flex items-center justify-between px-8 py-4">
          <div className="w-8 shrink-0" aria-hidden />

          <Link
            href="/"
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif font-light text-3xl xl:text-4xl tracking-[0.2em] uppercase transition-colors duration-700 ${
              isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
            }`}
          >
            THREE SIDE
          </Link>

          <div className="relative z-10 flex items-center gap-5">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className={`p-1 transition-colors duration-700 ${
                isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
              } hover:opacity-70`}
              aria-label="Пошук"
            >
              <Search className="w-5 h-5" strokeWidth={1} aria-hidden />
            </button>
            <button
              type="button"
              className={`p-1 transition-colors duration-700 ${
                isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
              } hover:opacity-70`}
              aria-label="Обране"
            >
              <Heart className="w-5 h-5" strokeWidth={1} aria-hidden />
            </button>
            <button
              type="button"
              className={`p-1 transition-colors duration-700 ${
                isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
              } hover:opacity-70`}
              aria-label="Акаунт"
            >
              <User className="w-5 h-5" strokeWidth={1} aria-hidden />
            </button>
            <Link
              href="/cart"
              className={`relative p-1 transition-colors duration-700 ${
                isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
              } hover:opacity-70`}
              aria-label="Кошик"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1} aria-hidden />
              {totalQuantity > 0 ? (
                <span className="absolute -top-0.5 -right-0.5 min-w-[1rem] h-4 px-0.5 flex items-center justify-center bg-foreground text-background text-[9px] font-extralight tabular-nums rounded-none">
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </span>
              ) : null}
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className={`hidden lg:block border-t transition-colors duration-700 ${
          isScrolled ? "border-[0.5px] border-brand-ghost/40" : "border-white/20"
        }`}>
          <div className="flex items-center justify-center gap-8 xl:gap-12 px-8 py-3">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative font-sans font-extralight tracking-[0.3em] text-[11px] uppercase whitespace-nowrap transition-colors duration-700 group ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 -bottom-1 w-0 h-px transition-all duration-700 ease-out group-hover:w-full ${
                    isScrolled ? "bg-brand-accent" : "bg-white"
                  }`}
                />
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed left-0 right-0 bottom-0 top-[7.5rem] z-40 bg-background transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto py-8 px-6">
          <motion.nav
            className="flex flex-col"
            variants={mobileNavMotion.container}
            initial="hidden"
            animate={isMobileMenuOpen ? "visible" : "hidden"}
            aria-label="Головна навігація"
          >
            {mainNav.map((item) => {
              const active = isCategoryNavActive(pathname, item.href)
              return (
                <motion.div key={item.href} variants={mobileNavMotion.item} className="w-full">
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group relative block w-full -mx-6 px-6 py-5 border-b border-[0.5px] border-brand-ghost/25 font-sans font-extralight text-[11px] tracking-[0.32em] uppercase transition-colors duration-700 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:bg-secondary hover:text-foreground before:absolute before:left-0 before:top-3 before:bottom-3 before:w-px before:bg-brand-accent before:transition-transform before:duration-700 before:ease-[cubic-bezier(0.25,0.1,0.25,1)] before:origin-top before:scale-y-0 group-hover:before:scale-y-100 ${
                      active
                        ? "text-foreground before:scale-y-100"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              )
            })}
          </motion.nav>
          <div className="mt-auto pt-8 flex flex-col gap-4">
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-extralight tracking-[0.3em] uppercase text-muted-foreground transition-colors duration-700 ease-out hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <MapPin className="w-4 h-4 shrink-0" strokeWidth={1} aria-hidden />
              Знайти бутик
            </Link>
            <button
              type="button"
              className="flex items-center gap-2 text-sm font-extralight tracking-[0.3em] uppercase text-muted-foreground text-left transition-colors duration-700 ease-out hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Globe className="w-4 h-4 shrink-0" strokeWidth={1} aria-hidden />
              Україна
            </button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-background transition-all duration-300 ${
          isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[0.5px] border-brand-ghost/40">
            <span className="font-serif font-light text-xl tracking-[0.2em] uppercase">Пошук</span>
            <button
              type="button"
              onClick={closeSearch}
              className="p-1 hover:opacity-70 transition-colors"
              aria-label="Закрити пошук"
            >
              <X className="w-6 h-6" strokeWidth={1} aria-hidden />
            </button>
          </div>
          <div className="flex-1 flex items-start justify-center pt-20 px-6">
            <div className="w-full max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Що ви шукаєте?"
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setActiveResultIndex(-1)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      e.preventDefault()
                      closeSearch()
                      return
                    }
                    if (searchResults.length === 0) return
                    if (e.key === "ArrowDown") {
                      e.preventDefault()
                      setActiveResultIndex((prev) => (prev + 1) % searchResults.length)
                      return
                    }
                    if (e.key === "ArrowUp") {
                      e.preventDefault()
                      setActiveResultIndex((prev) => (prev <= 0 ? searchResults.length - 1 : prev - 1))
                      return
                    }
                    if (e.key === "Enter") {
                      e.preventDefault()
                      const fallback = 0
                      const targetIndex = activeResultIndex >= 0 ? activeResultIndex : fallback
                      const target = searchResults[targetIndex]
                      if (target) openProduct(target.slug)
                    }
                  }}
                  className="w-full bg-transparent border-b-2 border-foreground pb-4 text-2xl lg:text-3xl font-light tracking-wide placeholder:text-muted-foreground focus:outline-none"
                  autoFocus={isSearchOpen}
                />
                <Search className="absolute right-0 bottom-4 w-6 h-6 text-foreground" strokeWidth={1} aria-hidden />
              </div>
              {searchQuery.trim().length < 2 ? (
                <div className="mt-12">
                  <h3 className="mb-4 font-sans font-extralight text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
                    Популярні запити
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {["Сумки", "Нова колекція", "Парфуми", "Подарунки", "Прикраси"].map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setSearchQuery(term)
                          setActiveResultIndex(-1)
                        }}
                        className="rounded-none border-[0.5px] border-brand-ghost px-4 py-2 text-sm font-light tracking-wide transition-colors duration-700 hover:bg-foreground hover:text-background"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-10 border-t border-[0.5px] border-brand-ghost/30 pt-6">
                  <p className="mb-4 font-sans text-[10px] font-extralight uppercase tracking-[0.3em] text-muted-foreground">
                    Знайдено: {searchResults.length}
                  </p>
                  {searchResults.length === 0 ? (
                    <p className="text-sm font-light tracking-wide text-muted-foreground">Нічого не знайдено. Спробуйте інший запит.</p>
                  ) : (
                    <ul className="space-y-1">
                      {searchResults.map((product, index) => {
                        const categoryTitle = CATEGORY_META[product.categorySlug]?.title ?? "Категорія"
                        const isActive = index === activeResultIndex
                        return (
                          <li key={product.slug}>
                            <button
                              type="button"
                              onMouseEnter={() => setActiveResultIndex(index)}
                              onClick={() => openProduct(product.slug)}
                              className={`w-full rounded-none border-l border-transparent px-3 py-3 text-left transition-colors duration-500 ${
                                isActive ? "border-l-foreground bg-secondary/70" : "hover:bg-secondary/50"
                              }`}
                            >
                              <p className="font-serif text-lg font-light tracking-wide text-foreground">{product.name}</p>
                              <p className="mt-1 font-sans text-[10px] font-extralight uppercase tracking-[0.28em] text-muted-foreground">
                                {categoryTitle} · {product.priceLabel}
                              </p>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
