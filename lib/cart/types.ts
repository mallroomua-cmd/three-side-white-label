export const CART_STORAGE_KEY = "three-side-cart-v1"

export type CartLine = {
  /** Stable id for cart row — product slug for single-SKU catalog */
  variantId: string
  productSlug: string
  title: string
  brand: string
  imageUrl: string
  priceUah: number
  variantLabel: string
  quantity: number
}
