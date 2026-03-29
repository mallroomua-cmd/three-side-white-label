"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"

const easeLuxury = [0.25, 0.1, 0.25, 1] as const

const categories = [
  {
    id: 1,
    name: "Сумки",
    image: "/images/category-bags.png",
    link: "/category/bags",
  },
  {
    id: 2,
    name: "Взуття",
    image: "/images/category-shoes.png",
    link: "/category/shoes",
  },
  {
    id: 3,
    name: "Аксесуари",
    image: "/images/category-accessories.png",
    link: "/category/accessories",
  },
  {
    id: 4,
    name: "Прикраси",
    image: "/images/category-jewelry.png",
    link: "/category/jewelry",
  },
]

export function CategoryGrid() {
  const reduceMotion = useReducedMotion()

  const containerVariants = reduceMotion
    ? { hidden: {}, visible: {} }
    : { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

  const itemFade = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 8 },
    visible: { opacity: 1, y: 0 },
  }

  const trans = (delay = 0) => ({
    duration: reduceMotion ? 0 : 0.7,
    ease: easeLuxury,
    delay: reduceMotion ? 0 : delay,
  })

  return (
    <motion.section
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={containerVariants}
      className="bg-background py-32 lg:py-40"
    >
      <div className="px-5 lg:px-10">
        <motion.div
          variants={itemFade}
          transition={trans()}
          className="mb-14 text-center lg:mb-20"
        >
          <h2 className="font-serif text-2xl font-light uppercase tracking-[0.2em] text-foreground sm:text-3xl lg:text-4xl">
            Категорії
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 md:gap-10 lg:grid-cols-4 lg:gap-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemFade}
              transition={trans(index * 0.04)}
            >
              <Link
                href={category.link}
                className="group relative block overflow-hidden rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    quality={85}
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-black/16 transition-colors duration-700 group-hover:bg-black/22" />
                </div>
                <div className="absolute inset-0 flex items-end justify-center pb-10">
                  <span className="font-serif text-lg font-light uppercase tracking-[0.2em] text-white drop-shadow-sm lg:text-xl">
                    {category.name}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
