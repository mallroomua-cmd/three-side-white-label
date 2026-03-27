"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"

interface Product {
  id: string
  category: string
  name: string
  price: string
  image: string
}

const products: Product[] = [
  {
    id: "1",
    category: "Сумки",
    name: "Capucines MM",
    price: "520 000 руб.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    category: "Кожаные Аксессуары",
    name: "Zippy Кошелёк",
    price: "95 000 руб.",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    category: "Сумки",
    name: "Petite Malle",
    price: "560 000 руб.",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=800&auto=format&fit=crop",
  },
]

function ProductCard({ product, index }: { product: Product; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`group transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Link href="#" className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-4 text-center">
          <span className="tracking-[0.2em] text-[10px] font-light uppercase text-muted-foreground">
            {product.category}
          </span>
          <h3 className="font-serif text-lg text-foreground mt-1 tracking-wide">
            {product.name}
          </h3>
          <p className="text-sm text-foreground mt-1 font-light">
            {product.price}
          </p>
        </div>
      </Link>
    </div>
  )
}

export function ProductGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 px-6 lg:px-12 bg-background">
      <div className="max-w-[1440px] mx-auto">
        <div
          className={`text-center mb-12 lg:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="tracking-[0.3em] text-[11px] font-light uppercase text-muted-foreground">
            Избранное
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mt-4 tracking-[0.02em]">
            Новые Поступления
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div
          className={`text-center mt-12 lg:mt-16 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            href="#"
            className="relative inline-block text-foreground tracking-[0.15em] text-xs font-light uppercase group"
          >
            Смотреть все товары
            <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-foreground" />
            <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>
      </div>
    </section>
  )
}
