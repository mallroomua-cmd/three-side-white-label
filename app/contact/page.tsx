import type { Metadata } from "next"
import Link from "next/link"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { absoluteOgDefaultUrl, defaultOgImageFields } from "@/lib/og-default-meta"

const contactDescription = "Зв'яжіться з THREE SIDE — бутики, сервіс та персональні консультації."

export const metadata: Metadata = {
  title: "Контакти",
  description: contactDescription,
  alternates: {
    canonical: "/contact",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Контакти | THREE SIDE",
    description: contactDescription,
    url: "/contact",
    type: "website",
    siteName: "THREE SIDE",
    locale: "uk_UA",
    images: defaultOgImageFields("Контакти — THREE SIDE"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Контакти | THREE SIDE",
    description: contactDescription,
    images: [absoluteOgDefaultUrl()],
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="px-5 pb-24 pt-[7.5rem] lg:px-10 lg:pb-32 lg:pt-44">
        <div className="max-w-[640px] mx-auto text-center lg:text-left">
          <p className="font-sans font-extralight text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
            Зв&apos;язок
          </p>
          <h1 className="font-serif font-light text-3xl sm:text-4xl tracking-[0.2em] uppercase text-foreground text-balance lg:text-pretty">
            Контакти
          </h1>
          <div
            className="h-px w-12 bg-brand-accent mt-8 mx-auto lg:mx-0"
            aria-hidden
          />
        </div>

        <div className="max-w-[560px] mx-auto mt-16 lg:mt-24 space-y-10 text-center lg:text-left">
          <p className="text-sm font-light text-muted-foreground tracking-wide leading-relaxed">
            Персональні консультації, підбір колекції та питання щодо замовлень — залиште повідомлення на пошту або зателефонуйте.
          </p>

          <div className="space-y-6 pt-4">
            <div>
              <p className="font-sans font-extralight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Електронна пошта
              </p>
              <a
                href="mailto:concierge@threeside.ua"
                className="mt-2 inline-block text-sm font-light text-foreground tracking-wide border-b border-transparent hover:border-foreground transition-colors duration-700"
              >
                concierge@threeside.ua
              </a>
            </div>
            <div>
              <p className="font-sans font-extralight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Телефон</p>
              <a
                href="tel:+380000000000"
                className="mt-2 inline-block text-sm font-light text-foreground tracking-wide border-b border-transparent hover:border-foreground transition-colors duration-700"
              >
                +38 (0XX) XXX XX XX
              </a>
            </div>
          </div>

          <p className="text-xs font-light text-muted-foreground tracking-wide pt-8">
            <Link
              href="/category/all"
              className="border-b border-transparent hover:border-foreground transition-colors duration-700"
            >
              Перейти до каталогу
            </Link>
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
