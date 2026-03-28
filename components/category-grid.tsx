"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

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
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.12 },
        },
      }}
      className="py-32 lg:py-40 bg-background"
    >
      <div className="px-5 lg:px-10">
        <motion.div
          variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7, ease: easeLuxury }}
          className="text-center mb-14 lg:mb-20"
        >
          <h2 className="font-serif font-light text-2xl sm:text-3xl lg:text-4xl tracking-[0.2em] uppercase text-foreground">
            Категорії
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: easeLuxury, delay: index * 0.04 }}
            >
              <Link href={category.link} className="group relative block overflow-hidden rounded-none">
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    quality={85}
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-black/16 group-hover:bg-black/22 transition-colors duration-700" />
                </div>
                <div className="absolute inset-0 flex items-end justify-center pb-10">
                  <span className="font-sans font-extralight text-white text-sm lg:text-base tracking-[0.3em] uppercase">
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
