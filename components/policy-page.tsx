import Link from "next/link"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

interface PolicyPageProps {
  title: string
  label: string
  children: React.ReactNode
}

export function PolicyPage({ title, label, children }: PolicyPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <article className="mx-auto max-w-[640px] px-5 pb-24 pt-[7.5rem] lg:px-10 lg:pb-32 lg:pt-44">
        <p className="mb-3 font-sans text-[10px] font-extralight uppercase tracking-[0.3em] text-muted-foreground">
          {label}
        </p>
        <h1 className="font-serif text-3xl font-light uppercase tracking-[0.2em] text-foreground text-balance sm:text-4xl">
          {title}
        </h1>
        <div className="mt-12 space-y-6 text-sm font-light leading-relaxed tracking-wide text-muted-foreground">
          {children}
        </div>
        <p className="mt-16 text-[10px] font-extralight uppercase tracking-[0.3em] text-muted-foreground">
          Останнє оновлення: 28 березня 2026 р. Документ має шаблонний характер — погодьте з юристом перед
          використанням у продакшні.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block border-b border-transparent text-[11px] font-extralight uppercase tracking-[0.24em] text-foreground transition-colors duration-700 hover:border-foreground"
        >
          На головну
        </Link>
      </article>
      <Footer />
    </main>
  )
}
