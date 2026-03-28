"use client"

import { toast } from "sonner"

import { useCart } from "@/components/cart-provider"
import type { CatalogProduct } from "@/lib/catalog/types"

export function ProductAddToCart({ product }: { product: CatalogProduct }) {
  const { addLine } = useCart()

  return (
    <button
      type="button"
      onClick={() => {
        addLine({
          variantId: product.slug,
          productSlug: product.slug,
          title: product.name,
          brand: product.brand,
          imageUrl: product.image,
          priceUah: product.priceUah,
          variantLabel: "Стандарт",
          quantity: 1,
        })
        toast.success("Додано до кошика")
      }}
      className="mt-10 inline-block w-full max-w-xs border-[0.5px] border-foreground bg-foreground px-8 py-3.5 text-[10px] uppercase tracking-[0.28em] font-extralight text-background rounded-none transition-colors duration-700 ease-out hover:bg-background hover:text-foreground"
    >
      Додати до кошика
    </button>
  )
}
