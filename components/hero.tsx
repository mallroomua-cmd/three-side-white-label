"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2000&auto=format&fit=crop')",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-end pb-24 lg:pb-32 px-6 text-center">
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="tracking-[0.3em] text-[11px] font-light uppercase text-white/90">
            Женская коллекция
          </span>
        </div>

        <h1
          className={`font-serif text-5xl sm:text-6xl lg:text-8xl text-white mt-4 tracking-[0.05em] transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Морской Бриз
        </h1>

        <div
          className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-8 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            href="#"
            className="relative text-white tracking-[0.15em] text-xs font-light uppercase group"
          >
            Смотреть коллекцию
            <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-white" />
            <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="#"
            className="relative text-white tracking-[0.15em] text-xs font-light uppercase group"
          >
            Новые поступления
            <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-white" />
            <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-12 bg-white/50" />
      </div>
    </section>
  )
}
