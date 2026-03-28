"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const easeLuxury = [0.25, 0.1, 0.25, 1] as const

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
  const reveal = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  }

  if (fullWidth) {
    return (
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative h-[90vh] lg:h-screen w-full overflow-hidden bg-secondary"
      >
        <motion.div
          variants={{
            hidden: { scale: 1.04, opacity: 0.96 },
            visible: { scale: 1, opacity: 1 },
          }}
          transition={{ duration: 0.9, ease: easeLuxury }}
          className="absolute inset-0"
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="100vw"
            quality={85}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/24" />
        </motion.div>

        <motion.div
          variants={reveal}
          transition={{ duration: 0.7, ease: easeLuxury, delay: 0.12 }}
          className="relative h-full flex flex-col items-center justify-center px-6 text-center"
        >
          <span className="font-sans font-extralight tracking-[0.3em] text-[10px] lg:text-[11px] uppercase text-white/80 block mb-4">
            {category}
          </span>
          <h2 className="font-serif font-light text-3xl sm:text-4xl lg:text-6xl xl:text-7xl text-white tracking-[0.2em] uppercase max-w-4xl text-balance">
            {title}
          </h2>
          {description && (
            <p className="mt-6 text-white/80 max-w-lg tracking-wide font-light text-pretty text-sm lg:text-base">
              {description}
            </p>
          )}
          <Link
            href={ctaLink}
            className="mt-12 px-10 py-4 border border-white/50 bg-white/95 text-foreground tracking-[0.24em] text-[11px] font-extralight uppercase rounded-none hover:bg-white transition-all duration-700 ease-out"
          >
            {ctaText}
          </Link>
        </motion.div>
      </motion.section>
    )
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-background"
    >
      <div className="grid lg:grid-cols-2 min-h-[70vh]">
        <div className={`relative h-[60vh] lg:min-h-[70vh] overflow-hidden bg-secondary ${reverse ? "lg:order-2" : ""}`}>
          <motion.div
            variants={{
              hidden: { scale: 1.04, opacity: 0.96 },
              visible: { scale: 1, opacity: 1 },
            }}
            transition={{ duration: 0.9, ease: easeLuxury }}
            className="absolute inset-0"
          >
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
          className={`flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-24 lg:py-36 ${
            reverse ? "lg:order-1" : ""
          }`}
        >
          <motion.div
            variants={reveal}
            transition={{ duration: 0.7, ease: easeLuxury, delay: 0.08 }}
            className="max-w-md"
          >
            <span className="font-sans font-extralight tracking-[0.3em] text-[10px] uppercase text-muted-foreground block mb-4">
              {category}
            </span>
            <h2 className="font-serif font-light text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-foreground tracking-[0.2em] uppercase text-balance">
              {title}
            </h2>
            {description && (
              <p className="mt-6 text-muted-foreground leading-relaxed font-light text-pretty text-sm">
                {description}
              </p>
            )}
            <Link
              href={ctaLink}
              className="inline-block mt-10 px-9 py-3.5 border-[0.5px] border-brand-ghost text-foreground tracking-[0.24em] text-[11px] font-extralight uppercase rounded-none hover:opacity-80 transition-opacity duration-700 ease-out"
            >
              {ctaText}
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
