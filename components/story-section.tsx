"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"

const easeLuxury = [0.25, 0.1, 0.25, 1] as const

interface StorySectionProps {
  image: string
  fullWidthDesktopImage?: string
  category: string
  title: string
  description?: string
  ctaText: string
  ctaLink: string
  reverse?: boolean
  fullWidth?: boolean
  fullWidthImageClassName?: string
  fullWidthDesktopImageClassName?: string
  fullWidthScrimClassName?: string
}

export function StorySection({
  image,
  fullWidthDesktopImage,
  category,
  title,
  description,
  ctaText,
  ctaLink,
  reverse = false,
  fullWidth = false,
  fullWidthImageClassName,
  fullWidthDesktopImageClassName,
  fullWidthScrimClassName = "bg-black/24",
}: StorySectionProps) {
  const reduceMotion = useReducedMotion()

  const reveal = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 8 },
    visible: { opacity: 1, y: 0 },
  }

  const bgZoom = reduceMotion
    ? { hidden: { scale: 1, opacity: 1 }, visible: { scale: 1, opacity: 1 } }
    : { hidden: { scale: 1.04, opacity: 0.96 }, visible: { scale: 1, opacity: 1 } }

  const trans = (duration: number, delay = 0) => ({
    duration: reduceMotion ? 0 : duration,
    ease: easeLuxury,
    delay: reduceMotion ? 0 : delay,
  })

  if (fullWidth) {
    return (
      <motion.section
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative h-[90vh] w-full overflow-hidden bg-secondary lg:h-screen"
      >
        <motion.div
          variants={bgZoom}
          transition={trans(0.9)}
          className="absolute inset-0"
        >
          {fullWidthDesktopImage ? (
            <>
              <Image
                src={image}
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 1023px) 100vw, 0px"
                quality={94}
                className={`object-cover object-center lg:hidden ${fullWidthImageClassName ?? ""}`}
              />
              <Image
                src={fullWidthDesktopImage}
                alt={title}
                fill
                sizes="(min-width: 1024px) 100vw, 0px"
                quality={96}
                className={`hidden object-cover object-center lg:block ${fullWidthDesktopImageClassName ?? fullWidthImageClassName ?? ""}`}
              />
            </>
          ) : (
            <Image
              src={image}
              alt={title}
              fill
              sizes="100vw"
              quality={92}
              className={`object-cover object-center ${fullWidthImageClassName ?? ""}`}
            />
          )}
          <div className={`absolute inset-0 ${fullWidthScrimClassName}`} />
        </motion.div>

        <motion.div
          variants={reveal}
          transition={trans(0.7, 0.12)}
          className="relative flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <span className="mb-4 block font-sans text-[10px] font-extralight uppercase tracking-[0.3em] text-white/80 lg:text-[11px]">
            {category}
          </span>
          <h2 className="max-w-4xl font-serif text-3xl font-light uppercase tracking-[0.2em] text-white text-balance sm:text-4xl lg:text-6xl xl:text-7xl">
            {title}
          </h2>
          {description && (
            <p className="mt-6 max-w-lg text-pretty text-sm font-light tracking-wide text-white/80 lg:text-base">
              {description}
            </p>
          )}
          <Link
            href={ctaLink}
            className="mt-12 border border-white/50 bg-white/95 px-10 py-4 text-[11px] font-extralight uppercase tracking-[0.24em] text-foreground transition-all duration-700 ease-out rounded-none hover:bg-white"
          >
            {ctaText}
          </Link>
        </motion.div>
      </motion.section>
    )
  }

  return (
    <motion.section
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-background"
    >
      <div className="grid min-h-[70vh] lg:grid-cols-2">
        <div className={`relative h-[60vh] overflow-hidden bg-secondary lg:min-h-[70vh] ${reverse ? "lg:order-2" : ""}`}>
          <motion.div variants={bgZoom} transition={trans(0.9)} className="absolute inset-0">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={85}
              className="object-cover object-center"
            />
          </motion.div>
        </div>

        <div
          className={`flex flex-col justify-center px-8 py-24 lg:px-16 lg:py-36 xl:px-24 ${
            reverse ? "lg:order-1" : ""
          }`}
        >
          <motion.div variants={reveal} transition={trans(0.7, 0.08)} className="max-w-md">
            <span className="mb-4 block font-sans text-[10px] font-extralight uppercase tracking-[0.3em] text-muted-foreground">
              {category}
            </span>
            <h2 className="font-serif text-2xl font-light uppercase tracking-[0.2em] text-foreground text-balance sm:text-3xl lg:text-4xl xl:text-5xl">
              {title}
            </h2>
            {description && (
              <p className="mt-6 text-pretty text-sm font-light leading-relaxed text-muted-foreground">{description}</p>
            )}
            <Link
              href={ctaLink}
              className="mt-10 inline-block border-[0.5px] border-brand-ghost px-9 py-3.5 text-[11px] font-extralight uppercase tracking-[0.24em] text-foreground transition-opacity duration-700 ease-out rounded-none hover:opacity-80"
            >
              {ctaText}
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
