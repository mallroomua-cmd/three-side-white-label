"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"

interface Product {
  id: string
  name: string
  price: string
  image: string
  isNew?: boolean
}

const products: Product[] = [
  {
    id: "1",
    name: "Lady THREE SIDE",
    price: "185 000 грн",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "2",
    name: "Saddle Bag",
    price: "135 000 грн",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Book Tote",
    price: "149 000 грн",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=800&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "4",
    name: "30 Montaigne",
    price: "199 000 грн",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
  },
]

function ProductCard({ product, index, isVisible }: { product: Product; index: number; isVisible: boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <div
      className={`group transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href="#" className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F5]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-700 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          />
          {product.isNew && (
            <div className="absolute top-4 left-4">
              <span className="bg-foreground text-background text-[10px] tracking-[0.15em] uppercase px-3 py-1.5">
                Новинка
              </span>
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsWishlisted(!isWishlisted)
            }}
            className={`absolute top-4 right-4 p-2 transition-all duration-300 ${
              isHovered || isWishlisted ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Додати до обраного"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isWishlisted ? "fill-foreground text-foreground" : "text-foreground"
              }`}
            />
          </button>
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-sm tracking-[0.1em] uppercase text-foreground">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
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
    <section ref={sectionRef} className="py-16 lg:py-24 px-4 lg:px-8 bg-background">
      <div className="max-w-[1600px] mx-auto">
        <div
          className={`text-center mb-10 lg:mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="tracking-[0.3em] text-[10px] font-light uppercase text-muted-foreground block mb-3">
            Обране
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-[0.1em] uppercase text-foreground">
            Культові Сумки
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} isVisible={isVisible} />
          ))}
        </div>

        <div
          className={`text-center mt-10 lg:mt-14 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            href="#"
            className="inline-block px-10 py-4 border border-foreground text-foreground tracking-[0.2em] text-[11px] font-medium uppercase hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Переглянути всі сумки
          </Link>
        </div>
      </div>
    </section>
  )
}
