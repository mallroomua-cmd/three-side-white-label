"use client"

import { useState, useEffect } from "react"
import { Menu, Search, Heart, User, ShoppingBag, X, MapPin, Globe } from "lucide-react"
import Link from "next/link"

const mainNav = [
  "Мода",
  "Сумки",
  "Обувь",
  "Аксессуары",
  "Парфюмерия",
  "Красота",
  "Украшения",
  "Часы",
  "Дом",
  "Подарки",
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen ? "bg-background" : "bg-transparent"
        }`}
      >
        {/* Top Bar */}
        <div className={`hidden lg:flex items-center justify-between px-6 py-2 text-[10px] tracking-[0.1em] uppercase transition-colors border-b ${
          isScrolled ? "border-border/50" : "border-transparent"
        }`}>
          <div className="flex items-center gap-6">
            <button className={`flex items-center gap-1.5 transition-colors hover:opacity-70 ${
              isScrolled ? "text-foreground" : "text-white"
            }`}>
              <MapPin className="w-3 h-3" />
              <span>Найти бутик</span>
            </button>
            <button className={`flex items-center gap-1.5 transition-colors hover:opacity-70 ${
              isScrolled ? "text-foreground" : "text-white"
            }`}>
              <Globe className="w-3 h-3" />
              <span>Россия</span>
            </button>
          </div>
          <div className={`transition-colors ${isScrolled ? "text-foreground" : "text-white"}`}>
            Бесплатная доставка по всей России
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className={`transition-colors hover:opacity-70 ${
              isScrolled ? "text-foreground" : "text-white"
            }`}>
              Связаться с нами
            </Link>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between px-4 lg:px-8 py-4">
          {/* Left - Menu */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-1 transition-colors ${
                isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
              } hover:opacity-70`}
              aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Center - Brand Name */}
          <Link
            href="/"
            className={`absolute left-1/2 -translate-x-1/2 font-serif text-2xl sm:text-3xl lg:text-4xl tracking-[0.3em] uppercase transition-colors ${
              isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
            }`}
          >
            THREE SIDE
          </Link>

          {/* Right - Icons */}
          <div className="flex items-center gap-3 lg:gap-5 ml-auto">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-1 transition-colors ${
                isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
              } hover:opacity-70`}
              aria-label="Поиск"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className={`hidden sm:block p-1 transition-colors ${
                isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
              } hover:opacity-70`}
              aria-label="Избранное"
            >
              <Heart className="w-5 h-5" />
            </button>
            <button
              className={`p-1 transition-colors ${
                isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
              } hover:opacity-70`}
              aria-label="Аккаунт"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              className={`p-1 transition-colors ${
                isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
              } hover:opacity-70`}
              aria-label="Корзина"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className={`hidden lg:block border-t transition-colors ${
          isScrolled ? "border-border/50" : "border-white/20"
        }`}>
          <div className="flex items-center justify-center gap-8 xl:gap-12 px-8 py-3">
            {mainNav.map((item) => (
              <Link
                key={item}
                href="#"
                className={`relative tracking-[0.15em] text-[11px] font-normal uppercase whitespace-nowrap transition-colors group ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
              >
                {item}
                <span
                  className={`absolute left-0 -bottom-1 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${
                    isScrolled ? "bg-foreground" : "bg-white"
                  }`}
                />
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ top: "64px" }}
      >
        <div className="flex flex-col h-full overflow-y-auto py-8 px-6">
          <nav className="flex flex-col gap-1">
            {mainNav.map((item, index) => (
              <Link
                key={item}
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-4 text-lg tracking-[0.1em] uppercase text-foreground border-b border-border/30 transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-8 flex flex-col gap-4">
            <button className="flex items-center gap-2 text-sm tracking-[0.1em] uppercase text-muted-foreground">
              <MapPin className="w-4 h-4" />
              Найти бутик
            </button>
            <button className="flex items-center gap-2 text-sm tracking-[0.1em] uppercase text-muted-foreground">
              <Globe className="w-4 h-4" />
              Россия
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
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <span className="font-serif text-xl tracking-[0.2em] uppercase">Поиск</span>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1 hover:opacity-70 transition-colors"
              aria-label="Закрыть поиск"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 flex items-start justify-center pt-20 px-6">
            <div className="w-full max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Что вы ищете?"
                  className="w-full bg-transparent border-b-2 border-foreground pb-4 text-2xl lg:text-3xl font-light tracking-wide placeholder:text-muted-foreground focus:outline-none"
                  autoFocus={isSearchOpen}
                />
                <Search className="absolute right-0 bottom-4 w-6 h-6 text-foreground" />
              </div>
              <div className="mt-12">
                <h3 className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
                  Популярные запросы
                </h3>
                <div className="flex flex-wrap gap-3">
                  {["Сумки", "Новая коллекция", "Парфюм", "Подарки", "Украшения"].map((term) => (
                    <button
                      key={term}
                      className="px-4 py-2 border border-border text-sm tracking-wide hover:bg-foreground hover:text-background transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
