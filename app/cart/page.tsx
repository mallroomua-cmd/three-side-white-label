import type { Metadata } from "next"

import { CartView } from "@/components/cart-view"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "Кошик",
  description: "Ваш кошик THREE SIDE",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

export default function CartPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-36 pb-24 lg:pt-44 lg:pb-32 px-5 lg:px-10">
        <div className="max-w-[960px] mx-auto">
          <header className="text-center border-b border-[0.5px] border-brand-ghost/50 pb-12 lg:pb-16">
            <p className="font-sans font-extralight text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Покупки
            </p>
            <h1 className="font-serif font-light text-3xl sm:text-4xl tracking-[0.2em] uppercase text-foreground">Кошик</h1>
          </header>
          <CartView />
        </div>
      </section>
      <Footer />
    </main>
  )
}
