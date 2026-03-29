import type { Metadata } from "next"
import Link from "next/link"

import { CheckoutRequestForm } from "@/components/checkout-request-form"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "Оформлення",
  description: "Оформлення замовлення THREE SIDE — заявка консьєжу",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="px-5 pb-24 pt-[7.5rem] lg:px-10 lg:pb-32 lg:pt-44">
        <div className="mx-auto max-w-[640px] text-center">
          <header className="border-b border-[0.5px] border-brand-ghost/50 pb-12 lg:pb-16">
            <p className="mb-4 font-sans text-[10px] font-extralight uppercase tracking-[0.3em] text-muted-foreground">
              Замовлення
            </p>
            <h1 className="font-serif text-3xl font-light uppercase tracking-[0.2em] text-foreground sm:text-4xl">
              Оформлення
            </h1>
          </header>
          <CheckoutRequestForm />
          <p className="mt-16 text-xs font-light leading-relaxed tracking-wide text-muted-foreground">
            Онлайн-оплата на сайті з&apos;явиться на наступному етапі.{" "}
            <Link href="/delivery" className="border-b border-transparent hover:border-foreground transition-colors duration-700">
              Умови доставки
            </Link>
            {" · "}
            <Link href="/oferta" className="border-b border-transparent hover:border-foreground transition-colors duration-700">
              Оферта
            </Link>
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
