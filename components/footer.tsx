"use client"

import Link from "next/link"
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react"
import { useState } from "react"

const customerServiceLinks = [
  "Contact Us",
  "FAQs",
  "Shipping & Delivery",
  "Returns & Exchanges",
  "Product Care",
  "Store Locator",
]

const legalLinks = [
  "Terms & Conditions",
  "Privacy Policy",
  "Cookie Policy",
  "Accessibility",
]

export function Footer() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    setEmail("")
  }

  return (
    <footer className="bg-footer text-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Customer Service */}
          <div>
            <h3 className="tracking-[0.2em] text-[11px] font-light uppercase mb-6 text-white/70">
              Customer Service
            </h3>
            <ul className="space-y-3">
              {customerServiceLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm font-light text-white/60 hover:text-white transition-colors tracking-wide"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="tracking-[0.2em] text-[11px] font-light uppercase mb-6 text-white/70">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm font-light text-white/60 hover:text-white transition-colors tracking-wide"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="tracking-[0.2em] text-[11px] font-light uppercase mb-6 text-white/70">
              Follow Us
            </h3>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="tracking-[0.2em] text-[11px] font-light uppercase mb-6 text-white/70">
              Newsletter
            </h3>
            <p className="text-sm font-light text-white/60 mb-4 leading-relaxed">
              Subscribe to receive updates on new collections and exclusive offers.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-transparent border-b border-white/30 py-2 text-sm font-light text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
                required
              />
              <button
                type="submit"
                className="self-start relative text-white tracking-[0.15em] text-xs font-light uppercase group"
              >
                Subscribe
                <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-white/50" />
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-16 pt-12">
          <div className="flex flex-col items-center gap-6">
            {/* Brand Logo */}
            <Link
              href="/"
              className="font-serif text-2xl lg:text-3xl tracking-[0.2em] uppercase text-white"
            >
              THREE SIDE
            </Link>
            
            {/* Copyright */}
            <p className="text-[11px] font-light text-white/40 tracking-wide">
              © {new Date().getFullYear()} THREE SIDE. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
