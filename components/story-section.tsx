"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"

interface StorySectionProps {
  image: string
  category: string
  title: string
  description?: string
  ctaText: string
  ctaLink: string
  reverse?: boolean
  fullWidth?: boolean
}

export function StorySection({
  image,
  category,
  title,
  description,
  ctaText,
  ctaLink,
  reverse = false,
  fullWidth = false,
}: StorySectionProps) {
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

  if (fullWidth) {
    return (
      <section ref={sectionRef} className="relative h-[90vh] lg:h-screen w-full overflow-hidden">
        <div
          className={`absolute inset-0 transition-transform duration-[1500ms] ${
            isVisible ? "scale-100" : "scale-105"
          }`}
        >
          <Image src={image} alt={title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div
          className={`relative h-full flex flex-col items-center justify-center px-6 text-center transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="tracking-[0.4em] text-[10px] lg:text-[11px] font-light uppercase text-white/80 block mb-4">
            {category}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl xl:text-7xl text-white tracking-[0.08em] uppercase max-w-4xl text-balance">
            {title}
          </h2>
          {description && (
            <p className="mt-6 text-white/80 max-w-lg tracking-wide font-light text-pretty text-sm lg:text-base">
              {description}
            </p>
          )}
          <Link
            href={ctaLink}
            className="mt-10 px-10 py-4 bg-white text-foreground tracking-[0.2em] text-[11px] font-medium uppercase hover:bg-foreground hover:text-white transition-all duration-300"
          >
            {ctaText}
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="bg-background">
      <div className={`grid lg:grid-cols-2 min-h-[70vh] ${reverse ? "" : ""}`}>
        {/* Image */}
        <div className={`relative h-[60vh] lg:h-auto overflow-hidden ${reverse ? "lg:order-2" : ""}`}>
          <div
            className={`absolute inset-0 transition-transform duration-[1500ms] ${
              isVisible ? "scale-100" : "scale-105"
            }`}
          >
            <Image src={image} alt={title} fill className="object-cover" />
          </div>
        </div>

        {/* Content */}
        <div
          className={`flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-16 lg:py-24 ${
            reverse ? "lg:order-1" : ""
          }`}
        >
          <div
            className={`max-w-md transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="tracking-[0.3em] text-[10px] font-light uppercase text-muted-foreground block mb-4">
              {category}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-foreground tracking-[0.05em] uppercase text-balance">
              {title}
            </h2>
            {description && (
              <p className="mt-6 text-muted-foreground leading-relaxed font-light text-pretty">
                {description}
              </p>
            )}
            <Link
              href={ctaLink}
              className="inline-block mt-8 px-8 py-3.5 bg-foreground text-background tracking-[0.2em] text-[11px] font-medium uppercase hover:bg-transparent hover:text-foreground border border-foreground transition-all duration-300"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
