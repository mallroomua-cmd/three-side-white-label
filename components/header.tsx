"use client"

import { useState, useEffect } from "react"
import { Menu, Search, Phone, Heart, User, ShoppingBag, X } from "lucide-react"
import Link from "next/link"

const categories = [
  "New",
  "Bags and Wallets",
  "Women",
  "Men",
  "Perfumes and Beauty",
  "Jewellery",
  "Watches",
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-background shadow-sm" : "bg-transparent"
      }`}
    >
      {/* Main Header */}
      <div className="flex items-center justify-between px-6 lg:px-12 py-4">
        {/* Left - Menu & Search */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`flex items-center gap-2 tracking-[0.15em] text-xs font-light uppercase transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            } hover:opacity-70`}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span className="hidden sm:inline">{isMobileMenuOpen ? "Close" : "Menu"}</span>
          </button>
          <button
            className={`flex items-center gap-2 tracking-[0.15em] text-xs font-light uppercase transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            } hover:opacity-70`}
          >
            <Search className="w-5 h-5" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>

        {/* Center - Brand Name */}
        <Link
          href="/"
          className={`font-serif text-xl sm:text-2xl lg:text-3xl tracking-[0.2em] uppercase transition-colors ${
            isScrolled ? "text-foreground" : "text-white"
          }`}
        >
          Maison Élégance
        </Link>

        {/* Right - Icons */}
        <div className="flex items-center gap-4 lg:gap-6">
          <button
            className={`hidden sm:flex items-center gap-2 tracking-[0.15em] text-xs font-light uppercase transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            } hover:opacity-70`}
          >
            <Phone className="w-4 h-4" />
            <span className="hidden lg:inline">Call Us</span>
          </button>
          <button
            className={`transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            } hover:opacity-70`}
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
          </button>
          <button
            className={`transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            } hover:opacity-70`}
            aria-label="Account"
          >
            <User className="w-5 h-5" />
          </button>
          <button
            className={`transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            } hover:opacity-70`}
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category Navigation */}
      <nav
        className={`overflow-x-auto scrollbar-hide border-t transition-colors ${
          isScrolled ? "border-border" : "border-white/20"
        }`}
      >
        <div className="flex items-center justify-center gap-6 lg:gap-10 px-6 py-3 min-w-max mx-auto">
          {categories.map((category) => (
            <Link
              key={category}
              href="#"
              className={`relative tracking-[0.15em] text-[11px] font-light uppercase whitespace-nowrap transition-colors group ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              {category}
              <span
                className={`absolute left-0 -bottom-1 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${
                  isScrolled ? "bg-foreground" : "bg-white"
                }`}
              />
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[100px] bg-background z-40 animate-in fade-in duration-300">
          <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
            {categories.map((category) => (
              <Link
                key={category}
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-2xl tracking-[0.1em] text-foreground hover:text-accent transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
