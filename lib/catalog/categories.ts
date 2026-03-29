import type { CatalogRouteSlug } from "@/lib/catalog-routes"

import type { CategoryMeta } from "./types"

export const CATEGORY_META: Record<CatalogRouteSlug, CategoryMeta> = {
  all: {
    title: "Весь асортимент",
    description:
      "Повний вибір колекцій: від сумок і взуття до прикрас та аксесуарів.",
  },
  fashion: {
    title: "Мода",
    description:
      "Сучасні силуети haute couture, вишукані тканини та бездоганні форми для щоденного стилю.",
  },
  bags: {
    title: "Сумки",
    description:
      "Легендарні форми, преміальна шкіра та деталі, що підкреслюють статус і характер.",
  },
  shoes: {
    title: "Взуття",
    description:
      "Безкомпромісний комфорт і архітектурна форма для динамічного міського ритму.",
  },
  accessories: {
    title: "Аксесуари",
    description:
      "Акценти, що завершують образ: пояси, окуляри, ремені та малі шкіряні вироби.",
  },
  perfume: {
    title: "Парфумерія",
    description:
      "Колекція ароматів із благородними нотами для вечора, дня та особливих подій.",
  },
  beauty: {
    title: "Краса",
    description:
      "Лінія догляду та макіяжу з фокусом на світло, тон і природну елегантність.",
  },
  jewelry: {
    title: "Прикраси",
    description:
      "Ювелірні акценти у тонкій геометрії та класичній пропорції, натхненні couture.",
  },
  watches: {
    title: "Годинники",
    description:
      "Точність механіки та вишуканий дизайн для тих, хто обирає позачасовий стиль.",
  },
}
