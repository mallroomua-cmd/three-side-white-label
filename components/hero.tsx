"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Pause, Play } from "lucide-react"

type HeroSlide = {
  id: number
  image: string
  imageDesktop?: string
  title: string
  cta: string
}

const slides: HeroSlide[] = [
  {
    id: 1,
    image: "/images/hero-home-mobile.jpg",
    imageDesktop: "/images/hero-home-desktop.jpg",
    title: "NEW ERA FASHION",
    cta: "Переглянути колекцію",
  },
]

const CTA_ART_DIRECTION = [
  {
    link: "text-white/92 hover:text-white tracking-[0.2em]",
    line: "h-px bg-white/90",
  },
  {
    link: "text-white/85 hover:text-white tracking-[0.24em]",
    line: "h-px bg-white/70",
  },
  {
    link: "text-white/90 hover:text-white tracking-[0.18em]",
    line: "h-px bg-white/100",
  },
] as const

const HERO_SIZES_MOBILE = "(max-width: 1023px) 100vw, 0px"
const HERO_SIZES_DESKTOP = "(min-width: 1024px) min(100vw, 3840px), 0px"
const HERO_SIZES_SINGLE = "(max-width: 1023px) 100vw, min(100vw, 2560px)"

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

    queueMicrotask(() => setProgress(0))
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

  const ctaMode = CTA_ART_DIRECTION[currentSlide % CTA_ART_DIRECTION.length]

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
            className={`absolute inset-0 overflow-hidden transition-transform duration-[6000ms] ease-out ${
              index === currentSlide ? "max-lg:scale-[1.04] lg:scale-100" : "scale-100"
            }`}
          >
            {slide.imageDesktop ? (
              <>
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority={index === currentSlide}
                  quality={index === currentSlide ? 95 : 80}
                  sizes={HERO_SIZES_MOBILE}
                  className="object-cover object-[58%_48%] lg:hidden"
                  aria-hidden
                />
                <Image
                  src={slide.imageDesktop}
                  alt={slide.title}
                  fill
                  priority={index === currentSlide}
                  quality={index === currentSlide ? 96 : 82}
                  sizes={HERO_SIZES_DESKTOP}
                  loading={index === currentSlide ? "eager" : "lazy"}
                  className="hidden object-cover object-[50%_42%] lg:block"
                />
              </>
            ) : (
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === currentSlide}
                quality={index === currentSlide ? 95 : 80}
                sizes={HERO_SIZES_SINGLE}
                className="object-cover object-center"
              />
            )}
          </div>
          <div className="absolute inset-0 bg-black/24" aria-hidden />
        </div>
      ))}

      <div className="relative z-20 flex h-full items-end justify-center px-6 pb-32 text-center lg:pb-24 xl:pb-28">
        <Link
          href="/category/all"
          className={`group inline-flex flex-col items-center gap-2 rounded-none px-2 py-1 font-serif text-xs font-light uppercase transition-opacity duration-400 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:text-sm ${ctaMode.link}`}
        >
          <span>{slides[currentSlide].cta.toUpperCase()}</span>
          <span
            aria-hidden
            className={`w-full origin-center scale-x-0 transition-transform duration-400 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 ${ctaMode.line}`}
          />
        </Link>
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
