import type { Metadata } from "next"
import Link from "next/link"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "Оформлення",
  description: "Оформлення замовлення THREE SIDE",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="px-5 pb-24 pt-[7.5rem] lg:px-10 lg:pb-32 lg:pt-44">
        <div className="max-w-[640px] mx-auto text-center">
          <header className="border-b border-[0.5px] border-brand-ghost/50 pb-12 lg:pb-16">
            <p className="font-sans font-extralight text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Замовлення
            </p>
            <h1 className="font-serif font-light text-3xl sm:text-4xl tracking-[0.2em] uppercase text-foreground">
              Оформлення
            </h1>
          </header>
          <p className="mt-14 text-sm font-light text-muted-foreground tracking-wide leading-relaxed">
            Онлайн-оформлення з&apos;явиться на наступному етапі. Поки що зв&apos;яжіться з нами для резерву та доставки.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block border-[0.5px] border-foreground bg-foreground px-8 py-3 text-[11px] font-extralight uppercase tracking-[0.3em] text-background rounded-none transition-colors duration-700 ease-out hover:bg-background hover:text-foreground"
            >
              Контакти
            </Link>
            <Link
              href="/cart"
              className="inline-block border-[0.5px] border-brand-ghost px-8 py-3 text-[11px] font-extralight uppercase tracking-[0.3em] text-foreground rounded-none transition-colors duration-700 ease-out hover:border-foreground"
            >
              Назад до кошика
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
