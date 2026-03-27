"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"

interface EditorialSectionProps {
  layout: "full" | "split" | "split-reverse"
  category: string
  title: string
  description?: string
  ctaText: string
  ctaLink: string
  image: string
  bgColor?: string
}

export function EditorialSection({
  layout,
  category,
  title,
  description,
  ctaText,
  ctaLink,
  image,
  bgColor = "bg-background",
}: EditorialSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  if (layout === "full") {
    return (
      <section
        ref={sectionRef}
        className={`relative h-[80vh] lg:h-screen w-full overflow-hidden ${bgColor}`}
      >
        <div
          className={`absolute inset-0 transition-transform duration-1000 ${
            isVisible ? "scale-100" : "scale-105"
          }`}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div
          className={`relative h-full flex flex-col items-center justify-center px-6 text-center transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="tracking-[0.3em] text-[11px] font-light uppercase text-white/90">
            {category}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-white mt-4 tracking-[0.05em] text-balance">
            {title}
          </h2>
          {description && (
            <p className="mt-6 text-white/80 max-w-md tracking-wide font-light text-pretty">
              {description}
            </p>
          )}
          <Link
            href={ctaLink}
            className="relative mt-8 text-white tracking-[0.15em] text-xs font-light uppercase group"
          >
            {ctaText}
            <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-white" />
            <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>
      </section>
    )
  }

  const isReverse = layout === "split-reverse"

  return (
    <section ref={sectionRef} className={`${bgColor}`}>
      <div
        className={`grid lg:grid-cols-2 min-h-[70vh] ${
          isReverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Image Side */}
        <div
          className={`relative h-[50vh] lg:h-auto overflow-hidden ${
            isReverse ? "lg:order-2" : ""
          }`}
        >
          <div
            className={`absolute inset-0 transition-transform duration-1000 ${
              isVisible ? "scale-100" : "scale-105"
            }`}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content Side */}
        <div
          className={`flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-16 ${
            isReverse ? "lg:order-1" : ""
          }`}
        >
          <div
            className={`max-w-lg transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="tracking-[0.3em] text-[11px] font-light uppercase text-muted-foreground">
              {category}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mt-4 tracking-[0.02em] text-balance">
              {title}
            </h2>
            {description && (
              <p className="mt-6 text-muted-foreground leading-relaxed font-light text-pretty">
                {description}
              </p>
            )}
            <Link
              href={ctaLink}
              className="relative inline-block mt-8 text-foreground tracking-[0.15em] text-xs font-light uppercase group"
            >
              {ctaText}
              <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-foreground" />
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
