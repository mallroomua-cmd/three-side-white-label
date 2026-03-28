"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Pause, Play } from "lucide-react"

const slides = [
  {
    id: 1,
    image: "/images/hero-home.png",
    category: "Жіноча колекція",
    title: "NEW ERA FASHION",
    cta: "Переглянути колекцію",
  },
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressRef = useRef<NodeJS.Timeout | null>(null)

  const SLIDE_DURATION = 6000

  useEffect(() => {
    if (slides.length === 1 || isPaused) return

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
    <section className="relative h-screen w-full min-h-[100dvh] overflow-hidden bg-secondary">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
          aria-hidden={index !== currentSlide}
        >
          <div
            className="absolute inset-0 overflow-hidden transition-transform duration-[6000ms] ease-out"
            style={{
              transform: index === currentSlide ? "scale(1.04)" : "scale(1)",
            }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === currentSlide}
              quality={index === currentSlide ? 95 : 80}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-black/38" aria-hidden />
        </div>
      ))}

      <div className="relative z-20 flex h-full flex-col items-center justify-end px-6 pb-44 text-center lg:items-start lg:justify-end lg:px-10 lg:pb-28 lg:text-left xl:px-16 xl:pb-36">
        <div className="w-full max-w-4xl lg:max-w-3xl">
          <span className="mb-4 block font-sans text-[10px] font-extralight uppercase tracking-[0.3em] text-white/80 lg:text-[11px]">
            {slides[currentSlide].category}
          </span>
          <h1 className="font-serif text-4xl font-light uppercase tracking-[0.2em] text-white sm:text-5xl lg:text-7xl xl:text-8xl">
            {slides[currentSlide].title}
          </h1>
        </div>

        <div className="mt-10 w-full max-w-4xl lg:mt-12 lg:max-w-3xl">
          <Link
            href="/category/all"
            className="inline-block border border-white/50 bg-white/95 px-10 py-4 font-sans text-[11px] font-extralight uppercase tracking-[0.24em] text-foreground transition-all duration-700 ease-out rounded-none hover:border-foreground hover:bg-foreground hover:text-background"
          >
            {slides[currentSlide].cta}
          </Link>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6">
            <div className="flex items-center gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className="relative h-[2px] w-8 lg:w-12 bg-white/30 overflow-hidden rounded-none"
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

          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 p-2 text-white/70 hover:text-white transition-colors rounded-none"
            aria-label="Попередній слайд"
          >
            <ChevronLeft className="w-8 h-8 lg:w-10 lg:h-10" strokeWidth={1} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 p-2 text-white/70 hover:text-white transition-colors rounded-none"
            aria-label="Наступний слайд"
          >
            <ChevronRight className="w-8 h-8 lg:w-10 lg:h-10" strokeWidth={1} />
          </button>

          <div className="absolute bottom-8 right-8 z-30 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 text-white/70 hover:text-white transition-colors rounded-none"
              aria-label={isPaused ? "Відтворити" : "Пауза"}
            >
              {isPaused ? <Play className="w-4 h-4" strokeWidth={1} /> : <Pause className="w-4 h-4" strokeWidth={1} />}
            </button>
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 text-white/70 hover:text-white transition-colors rounded-none"
              aria-label={isMuted ? "Увімкнути звук" : "Вимкнути звук"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" strokeWidth={1} /> : <Volume2 className="w-4 h-4" strokeWidth={1} />}
            </button>
          </div>
        </>
      )}
    </section>
  )
}
