"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Pause, Play } from "lucide-react"

const slides = [
  {
    id: 1,
    image: "/images/hero-beach.jpg",
    category: "Жіноча колекція",
    title: "Круїзна Колекція 2026",
    cta: "Переглянути колекцію",
  },
  {
    id: 2,
    image: "/images/hero-men.jpg",
    category: "Чоловіча колекція",
    title: "Весна-Літо 2026",
    cta: "Відкрити",
  },
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressRef = useRef<NodeJS.Timeout | null>(null)

  const SLIDE_DURATION = 6000

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (!isPaused) {
      setProgress(0)
      progressRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 100
          return prev + (100 / (SLIDE_DURATION / 50))
        })
      }, 50)

      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
        setProgress(0)
      }, SLIDE_DURATION)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [isPaused, currentSlide])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setProgress(0)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setProgress(0)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setProgress(0)
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[6000ms] ease-out"
            style={{
              backgroundImage: `url('${slide.image}')`,
              transform: index === currentSlide ? "scale(1.05)" : "scale(1)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-end pb-32 lg:pb-40 px-6 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="tracking-[0.4em] text-[10px] lg:text-[11px] font-light uppercase text-white/80 block mb-4">
            {slides[currentSlide].category}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl xl:text-8xl text-white tracking-[0.08em] uppercase">
            {slides[currentSlide].title}
          </h1>
        </div>

        <Link
          href="#"
          className={`mt-10 px-10 py-4 bg-white text-foreground tracking-[0.2em] text-[11px] font-medium uppercase hover:bg-foreground hover:text-white transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {slides[currentSlide].cta}
        </Link>
      </div>

      {/* Slide Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6">
        {/* Progress Indicators */}
        <div className="flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative h-[2px] w-8 lg:w-12 bg-white/30 overflow-hidden"
              aria-label={`Перейти до слайду ${index + 1}`}
            >
              <div
                className="absolute inset-y-0 left-0 bg-white transition-all duration-100"
                style={{
                  width: index === currentSlide ? `${progress}%` : index < currentSlide ? "100%" : "0%",
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Попередній слайд"
      >
        <ChevronLeft className="w-8 h-8 lg:w-10 lg:h-10" strokeWidth={1} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Наступний слайд"
      >
        <ChevronRight className="w-8 h-8 lg:w-10 lg:h-10" strokeWidth={1} />
      </button>

      {/* Media Controls */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center gap-3">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="p-2 text-white/70 hover:text-white transition-colors"
          aria-label={isPaused ? "Відтворити" : "Пауза"}
        >
          {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
        </button>
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 text-white/70 hover:text-white transition-colors"
          aria-label={isMuted ? "Увімкнути звук" : "Вимкнути звук"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </section>
  )
}
