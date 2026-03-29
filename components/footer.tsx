"use client"

import Link from "next/link"
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from "lucide-react"
import { useState } from "react"

type FooterNavLink = { label: string; href: string }

const footerSections: { title: string; links: FooterNavLink[] }[] = [
  {
    title: "Допомога",
    links: [
      { label: "Часті запитання", href: "/contact" },
      { label: "Доставка", href: "/delivery" },
      { label: "Повернення", href: "/returns" },
      { label: "Способи оплати", href: "/oferta" },
      { label: "Розмірна сітка", href: "/contact" },
      { label: "Зв'язатися з нами", href: "/contact" },
    ],
  },
  {
    title: "Послуги",
    links: [
      { label: "Персональний шопінг", href: "/contact" },
      { label: "Подарункове пакування", href: "/contact" },
      { label: "Догляд за виробами", href: "/contact" },
      { label: "Ремонт та реставрація", href: "/contact" },
    ],
  },
  {
    title: "Про нас",
    links: [
      { label: "Історія дому", href: "/contact" },
      { label: "Сталий розвиток", href: "/contact" },
      { label: "Кар'єра", href: "/contact" },
      { label: "Прес-центр", href: "/contact" },
    ],
  },
  {
    title: "Інформація",
    links: [
      { label: "Публічна оферта", href: "/oferta" },
      { label: "Політика конфіденційності", href: "/privacy" },
      { label: "Файли cookie", href: "/cookies" },
    ],
  },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const instagramHref = process.env.NEXT_PUBLIC_LINK_INSTAGRAM || "#"
  const facebookHref = process.env.NEXT_PUBLIC_LINK_FACEBOOK || "#"
  const youtubeHref = process.env.NEXT_PUBLIC_LINK_YOUTUBE || "#"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribed(true)
    setEmail("")
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-serif font-light text-2xl lg:text-3xl tracking-[0.2em] uppercase mb-2">
                Підпишіться на розсилку
              </h3>
              <p className="text-background/60 text-sm font-light tracking-wide">
                Будьте в курсі нових колекцій та ексклюзивних пропозицій
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Введіть ваш email"
                  className="w-full bg-transparent border-[0.5px] border-background/30 px-4 py-3.5 text-sm font-light tracking-wide placeholder:text-background/40 focus:outline-none focus:border-background rounded-none transition-colors duration-700"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3.5 bg-background text-foreground tracking-[0.2em] text-[11px] font-extralight uppercase rounded-none hover:bg-background/90 transition-colors duration-700"
              >
                {isSubscribed ? "Дякуємо!" : "Підписатися"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="tracking-[0.3em] text-[11px] font-extralight uppercase mb-6 text-background/70">
              Контакти
            </h4>
            <div className="flex flex-col gap-4">
              <Link
                href="/contact"
                className="flex items-center gap-3 text-sm text-background/60 hover:text-background transition-colors duration-700"
              >
                <MapPin className="w-4 h-4 shrink-0" strokeWidth={1} aria-hidden />
                <span>Знайти бутик</span>
              </Link>
              <a
                href="tel:+380800123456"
                className="flex items-center gap-3 text-sm text-background/60 hover:text-background transition-colors duration-700"
              >
                <Phone className="w-4 h-4 shrink-0" strokeWidth={1} aria-hidden />
                <span>0 800 123-456</span>
              </a>
              <a
                href="mailto:contact@threeside.com"
                className="flex items-center gap-3 text-sm text-background/60 hover:text-background transition-colors duration-700"
              >
                <Mail className="w-4 h-4 shrink-0" strokeWidth={1} aria-hidden />
                <span>contact@threeside.com</span>
              </a>
            </div>
          </div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="tracking-[0.3em] text-[11px] font-extralight uppercase mb-6 text-background/70">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {section.links.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-background/60 hover:text-background transition-colors duration-700 tracking-wide"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social & Copyright */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mt-16 pt-8 border-t border-background/10">
          <div className="flex items-center gap-6">
            <Link
              href={instagramHref}
              className="text-background/60 hover:text-background transition-colors duration-700"
              aria-label="Instagram"
              {...(instagramHref !== "#" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <Instagram className="w-5 h-5" strokeWidth={1} />
            </Link>
            <Link
              href={facebookHref}
              className="text-background/60 hover:text-background transition-colors duration-700"
              aria-label="Facebook"
              {...(facebookHref !== "#" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <Facebook className="w-5 h-5" strokeWidth={1} />
            </Link>
            <Link
              href={youtubeHref}
              className="text-background/60 hover:text-background transition-colors duration-700"
              aria-label="YouTube"
              {...(youtubeHref !== "#" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <Youtube className="w-5 h-5" strokeWidth={1} />
            </Link>
          </div>

          <Link href="/" className="font-serif font-light text-xl lg:text-2xl tracking-[0.2em] uppercase">
            THREE SIDE
          </Link>

          <p className="text-[11px] font-light text-background/40 tracking-wide">
            © {new Date().getFullYear()} THREE SIDE. Усі права захищені.
          </p>
        </div>
      </div>
    </footer>
  )
}
