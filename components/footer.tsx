"use client"

import Link from "next/link"
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from "lucide-react"
import { useState } from "react"

const footerLinks = {
  help: {
    title: "Допомога",
    links: [
      "Часті запитання",
      "Доставка та повернення",
      "Способи оплати",
      "Розмірна сітка",
      "Зв'язатися з нами",
    ],
  },
  services: {
    title: "Послуги",
    links: [
      "Персональний шопінг",
      "Подарункове пакування",
      "Догляд за виробами",
      "Ремонт та реставрація",
    ],
  },
  company: {
    title: "Про нас",
    links: [
      "Історія дому",
      "Сталий розвиток",
      "Кар'єра",
      "Прес-центр",
    ],
  },
  legal: {
    title: "Інформація",
    links: [
      "Умови використання",
      "Політика конфіденційності",
      "Налаштування cookie",
    ],
  },
}

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

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
              <h3 className="font-serif text-2xl lg:text-3xl tracking-[0.1em] uppercase mb-2">
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
                  className="w-full bg-transparent border border-background/30 px-4 py-3.5 text-sm tracking-wide placeholder:text-background/40 focus:outline-none focus:border-background transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3.5 bg-background text-foreground tracking-[0.2em] text-[11px] font-medium uppercase hover:bg-background/90 transition-colors"
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
            <h4 className="tracking-[0.2em] text-[11px] font-medium uppercase mb-6 text-background/70">
              Контакти
            </h4>
            <div className="flex flex-col gap-4">
              <a href="#" className="flex items-center gap-3 text-sm text-background/60 hover:text-background transition-colors">
                <MapPin className="w-4 h-4" />
                <span>Знайти бутик</span>
              </a>
              <a href="tel:+380800123456" className="flex items-center gap-3 text-sm text-background/60 hover:text-background transition-colors">
                <Phone className="w-4 h-4" />
                <span>0 800 123-456</span>
              </a>
              <a href="mailto:contact@threeside.com" className="flex items-center gap-3 text-sm text-background/60 hover:text-background transition-colors">
                <Mail className="w-4 h-4" />
                <span>contact@threeside.com</span>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="tracking-[0.2em] text-[11px] font-medium uppercase mb-6 text-background/70">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-background/60 hover:text-background transition-colors tracking-wide"
                    >
                      {link}
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
            <Link href="#" className="text-background/60 hover:text-background transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-background/60 hover:text-background transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-background/60 hover:text-background transition-colors" aria-label="YouTube">
              <Youtube className="w-5 h-5" />
            </Link>
          </div>

          <Link
            href="/"
            className="font-serif text-xl lg:text-2xl tracking-[0.3em] uppercase"
          >
            THREE SIDE
          </Link>

          <p className="text-[11px] text-background/40 tracking-wide">
            © {new Date().getFullYear()} THREE SIDE. Усі права захищені.
          </p>
        </div>
      </div>
    </footer>
  )
}
