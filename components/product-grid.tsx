"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

const easeLuxury = [0.25, 0.1, 0.25, 1] as const

export type ProductGridItem = {
  slug: string
  name: string
  price: string
  image: string
  isNew?: boolean
}

function ProductCard({ product }: { product: ProductGridItem }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={{
        hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 8 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: reduceMotion ? 0 : 0.7, ease: easeLuxury }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/product/${product.slug}`}
        className="block rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      >
        <div className="relative aspect-[3/4] overflow-hidden border-[0.5px] border-brand-ghost/60 bg-secondary">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 50vw, 25vw"
            quality={85}
            className={`object-cover transition-transform duration-1000 ease-out motion-reduce:transition-none ${
              !reduceMotion && isHovered ? "scale-[1.04]" : "scale-100"
            }`}
          />
          {product.isNew ? (
            <div className="absolute left-4 top-4">
              <span className="rounded-none bg-foreground px-3 py-1.5 text-[10px] font-extralight uppercase tracking-[0.15em] text-background">
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
            className={`absolute right-4 top-4 rounded-none p-2 transition-opacity duration-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
              isHovered || isWishlisted ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Додати до обраного"
            aria-pressed={isWishlisted}
          >
            <Heart
              strokeWidth={1}
              className={`h-5 w-5 transition-colors ${
                isWishlisted ? "fill-foreground text-foreground" : "text-foreground"
              }`}
            />
          </button>
        </div>
        <div className="mt-4 text-center">
          <h3 className="font-serif text-sm font-light uppercase tracking-[0.2em] text-foreground">{product.name}</h3>
          <p className="mt-1.5 text-sm font-light tracking-[0.04em] text-muted-foreground">{product.price}</p>
        </div>
      </Link>
    </motion.div>
  )
}

interface ProductGridProps {
  items: ProductGridItem[]
}

export function ProductGrid({ items }: ProductGridProps) {
  const reduceMotion = useReducedMotion()

  const stagger = reduceMotion
    ? { hidden: {}, visible: {} }
    : { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

  const fade = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 8 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.section
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={stagger}
      className="bg-background px-5 py-32 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <motion.div
          variants={fade}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: easeLuxury }}
          className="mb-14 text-center lg:mb-20"
        >
          <span className="mb-3 block font-sans text-[10px] font-extralight uppercase tracking-[0.3em] text-muted-foreground">
            Обране
          </span>
          <h2 className="font-serif text-2xl font-light uppercase tracking-[0.2em] text-foreground sm:text-3xl lg:text-4xl">
            Колекція ательє
          </h2>
        </motion.div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="grid grid-cols-2 gap-x-6 gap-y-16 lg:col-span-10 lg:col-start-2 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-24">
            {items.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>

        <motion.div
          variants={fade}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: easeLuxury, delay: reduceMotion ? 0 : 0.12 }}
          className="mt-14 text-center lg:mt-20"
        >
          <Link
            href="/category/bags"
            className="inline-block border border-brand-ghost/50 bg-white/95 px-10 py-4 text-[11px] font-extralight uppercase tracking-[0.24em] text-foreground transition-all duration-700 ease-out rounded-none hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Переглянути всі сумки
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
