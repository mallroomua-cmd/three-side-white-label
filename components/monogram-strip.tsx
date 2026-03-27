"use client"

import { useEffect, useRef, useState } from "react"

export function MonogramStrip() {
  const stripRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (stripRef.current) {
      observer.observe(stripRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={stripRef}
      className={`py-16 lg:py-24 bg-secondary overflow-hidden transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center justify-center gap-2 flex-wrap px-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-2"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {/* Monogram Pattern Element */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-accent/40"
            >
              {/* Diamond shape */}
              <path
                d="M20 2L38 20L20 38L2 20L20 2Z"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
              />
              {/* Inner diamond */}
              <path
                d="M20 8L32 20L20 32L8 20L20 8Z"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
              />
              {/* Center circle */}
              <circle
                cx="20"
                cy="20"
                r="4"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
              />
              {/* Flower petals */}
              <path
                d="M20 14C22 14 24 16 24 18C24 20 22 22 20 22C18 22 16 20 16 18C16 16 18 14 20 14Z"
                fill="currentColor"
                opacity="0.3"
              />
            </svg>
            {/* ME Letters */}
            <span className="font-serif text-2xl text-accent/30 tracking-[0.3em]">
              MÉ
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
