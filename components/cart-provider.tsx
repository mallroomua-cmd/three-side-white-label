"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import { CART_STORAGE_KEY, type CartLine } from "@/lib/cart/types"

function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false
  const o = value as Record<string, unknown>
  return (
    typeof o.variantId === "string" &&
    typeof o.productSlug === "string" &&
    typeof o.title === "string" &&
    typeof o.brand === "string" &&
    typeof o.imageUrl === "string" &&
    typeof o.priceUah === "number" &&
    typeof o.variantLabel === "string" &&
    typeof o.quantity === "number" &&
    o.quantity > 0
  )
}

function readCartFromStorage(): CartLine[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isCartLine)
  } catch {
    return []
  }
}

type AddLineInput = Omit<CartLine, "quantity"> & { quantity?: number }

type CartContextValue = {
  lines: CartLine[]
  hydrated: boolean
  addLine: (line: AddLineInput) => void
  setQuantity: (variantId: string, quantity: number) => void
  removeLine: (variantId: string) => void
  clearCart: () => void
  subtotalUah: number
  totalQuantity: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    queueMicrotask(() => {
      setLines(readCartFromStorage())
      setHydrated(true)
    })
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* Quota exceeded or private mode */
    }
  }, [lines, hydrated])

  const addLine = useCallback((line: AddLineInput) => {
    const qty = line.quantity ?? 1
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.variantId === line.variantId)
      if (idx === -1) {
        return [...prev, { ...line, quantity: qty }]
      }
      const next = [...prev]
      next[idx] = { ...next[idx], quantity: next[idx].quantity + qty }
      return next
    })
  }, [])

  const setQuantity = useCallback((variantId: string, quantity: number) => {
    if (quantity < 1) {
      setLines((prev) => prev.filter((l) => l.variantId !== variantId))
      return
    }
    setLines((prev) => prev.map((l) => (l.variantId === variantId ? { ...l, quantity } : l)))
  }, [])

  const removeLine = useCallback((variantId: string) => {
    setLines((prev) => prev.filter((l) => l.variantId !== variantId))
  }, [])

  const clearCart = useCallback(() => setLines([]), [])

  const subtotalUah = useMemo(
    () => lines.reduce((sum, l) => sum + l.priceUah * l.quantity, 0),
    [lines]
  )

  const totalQuantity = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines])

  const value = useMemo(
    () => ({
      lines,
      hydrated,
      addLine,
      setQuantity,
      removeLine,
      clearCart,
      subtotalUah,
      totalQuantity,
    }),
    [lines, hydrated, addLine, setQuantity, removeLine, clearCart, subtotalUah, totalQuantity]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider")
  }
  return ctx
}
