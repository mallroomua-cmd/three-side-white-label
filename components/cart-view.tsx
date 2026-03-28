"use client"

import Image from "next/image"
import Link from "next/link"

import { useCart } from "@/components/cart-provider"

function formatUah(n: number): string {
  return `${n.toLocaleString("uk-UA")} грн`
}

export function CartView() {
  const { lines, hydrated, setQuantity, removeLine, subtotalUah } = useCart()

  if (!hydrated) {
    return (
      <p className="py-24 text-center text-sm font-light text-muted-foreground tracking-wide">Завантаження…</p>
    )
  }

  if (lines.length === 0) {
    return (
      <div className="py-24 text-center border-[0.5px] border-brand-ghost/50 rounded-none">
        <p className="font-serif font-light text-2xl sm:text-3xl text-muted-foreground tracking-[0.2em] uppercase">
          Кошик порожній
        </p>
        <Link
          href="/category/all"
          className="mt-8 inline-block border-[0.5px] border-foreground px-8 py-3 text-[11px] font-extralight uppercase tracking-[0.3em] text-foreground rounded-none transition-colors duration-700 ease-out hover:bg-foreground hover:text-background"
        >
          До каталогу
        </Link>
      </div>
    )
  }

  return (
    <div className="mt-12 lg:mt-16 space-y-12">
      <ul className="divide-y divide-brand-ghost/30 border-t border-[0.5px] border-brand-ghost/40">
        {lines.map((line) => (
          <li key={line.variantId} className="flex flex-col sm:flex-row gap-6 py-8">
            <Link
              href={`/product/${line.productSlug}`}
              className="relative w-full sm:w-40 shrink-0 aspect-[3/4] border-[0.5px] border-brand-ghost/50 bg-secondary overflow-hidden rounded-none"
            >
              <Image
                src={line.imageUrl}
                alt={line.title}
                fill
                className="object-cover object-center"
                sizes="160px"
                quality={85}
              />
            </Link>
            <div className="flex flex-1 flex-col justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-extralight">{line.brand}</p>
                <Link href={`/product/${line.productSlug}`}>
                  <h2 className="mt-2 font-serif font-light text-sm uppercase tracking-[0.2em] text-foreground hover:opacity-70 transition-opacity duration-700">
                    {line.title}
                  </h2>
                </Link>
                <p className="mt-1 text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-extralight">{line.variantLabel}</p>
                <p className="mt-3 text-sm font-light text-[#C9A96E] tracking-wide">{formatUah(line.priceUah)}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center border-[0.5px] border-brand-ghost/50 rounded-none">
                  <button
                    type="button"
                    onClick={() => setQuantity(line.variantId, line.quantity - 1)}
                    className="px-3 py-2 text-sm font-light hover:bg-secondary transition-colors duration-500 rounded-none"
                    aria-label="Зменшити кількість"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 text-sm font-light tabular-nums min-w-[2.5rem] text-center">{line.quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(line.variantId, line.quantity + 1)}
                    className="px-3 py-2 text-sm font-light hover:bg-secondary transition-colors duration-500 rounded-none"
                    aria-label="Збільшити кількість"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeLine(line.variantId)}
                  className="text-[10px] font-extralight uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors duration-700"
                >
                  Видалити
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t border-[0.5px] border-brand-ghost/40 pt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-extralight">Разом</p>
          <p className="mt-2 font-serif font-light text-2xl tracking-wide text-foreground">{formatUah(subtotalUah)}</p>
        </div>
        <Link
          href="/checkout"
          className="inline-block border-[0.5px] border-foreground px-10 py-3.5 text-[10px] font-extralight uppercase tracking-[0.28em] text-foreground text-center rounded-none transition-colors duration-700 ease-out hover:bg-foreground hover:text-background"
        >
          До оформлення
        </Link>
      </div>
    </div>
  )
}
