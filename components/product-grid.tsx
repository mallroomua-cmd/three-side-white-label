"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { motion } from "framer-motion"

const easeLuxury = [0.25, 0.1, 0.25, 1] as const

export type ProductGridItem = {
  slug: string
  name: string
  price: string
  image: string
  isNew?: boolean
}

function ProductCard({ product, index }: { product: ProductGridItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const isAboveFoldRow = index < 4

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.7, ease: easeLuxury }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block rounded-none">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary border-[0.5px] border-brand-ghost/60">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 50vw, 25vw"
            quality={85}
            priority={isAboveFoldRow}
            className={`object-cover transition-transform duration-1000 ease-out ${
              isHovered ? "scale-[1.04]" : "scale-100"
            }`}
          />
          {product.isNew ? (
            <div className="absolute top-4 left-4">
              <span className="bg-foreground text-background text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 font-extralight rounded-none">
                Новинка
              </span>
            </div>
          ) : null}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              setIsWishlisted(!isWishlisted)
            }}
            className={`absolute top-4 right-4 p-2 transition-opacity duration-700 rounded-none ${
              isHovered || isWishlisted ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Додати до обраного"
          >
            <Heart
              strokeWidth={1}
              className={`w-5 h-5 transition-colors ${
                isWishlisted ? "fill-foreground text-foreground" : "text-foreground"
              }`}
            />
          </button>
        </div>
        <div className="mt-4 text-center">
          <h3 className="font-serif font-light text-sm tracking-[0.2em] uppercase text-foreground">{product.name}</h3>
          <p className="text-sm text-muted-foreground mt-1.5 tracking-[0.04em] font-light">{product.price}</p>
        </div>
      </Link>
    </motion.div>
  )
}

interface ProductGridProps {
  items: ProductGridItem[]
}

export function ProductGrid({ items }: ProductGridProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12,
          },
        },
      }}
      className="py-32 lg:py-40 px-5 lg:px-10 bg-background"
    >
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: easeLuxury }}
          className="text-center mb-14 lg:mb-20"
        >
          <span className="font-sans font-extralight tracking-[0.3em] text-[10px] uppercase text-muted-foreground block mb-3">
            Обране
          </span>
          <h2 className="font-serif font-light text-2xl sm:text-3xl lg:text-4xl tracking-[0.2em] uppercase text-foreground">
            Культові Сумки
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 lg:gap-x-10 lg:gap-y-24">
          {items.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: easeLuxury, delay: 0.12 }}
          className="text-center mt-14 lg:mt-20"
        >
          <Link
            href="/category/bags"
            className="inline-block px-10 py-4 border border-brand-ghost/50 bg-white/95 text-foreground tracking-[0.24em] text-[11px] font-extralight uppercase rounded-none transition-all duration-700 ease-out hover:bg-foreground hover:text-background hover:border-foreground"
          >
            Переглянути всі сумки
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
