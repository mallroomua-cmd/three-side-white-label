import type { Metadata } from "next"

import { PolicyPage } from "@/components/policy-page"
import { absoluteOgDefaultUrl, defaultOgImageFields } from "@/lib/og-default-meta"

const title = "Повернення та обмін"
const description =
  "Політика повернення та обміну товарів THREE SIDE: строки, збереження товарного вигляду та претензії."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/returns" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${title} | THREE SIDE`,
    description,
    url: "/returns",
    type: "website",
    siteName: "THREE SIDE",
    locale: "uk_UA",
    images: defaultOgImageFields(`${title} — THREE SIDE`),
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | THREE SIDE`,
    description,
    images: [absoluteOgDefaultUrl()],
  },
}

export default function ReturnsPage() {
  return (
    <PolicyPage title={title} label="Інформація">
      <p>
        Ми прагнемо, щоб кожна покупка у THREE SIDE відповідала вашим очікуванням. Якщо виріб не підійшов,
        зверніться до консьєж-служби в розумний строк з моменту отримання — ми підкажемо подальші кроки.
      </p>
      <p>
        Повернення можливе за умови збереження товарного вигляду, цілісності упаковки, ярликів і
        супровідних документів, якщо такі передбачені для категорії товару. Персоналізовані та розпаковані
        парфуми, вироби з ознаками носіння або зміни можуть не підлягати поверненню згідно з чинним
        законодавством — конкретні випадки погоджуються індивідуально.
      </p>
      <p>
        Повернення коштів здійснюється у спосіб, узгоджений з вами, після отримання та перевірки товару на
        відповідність умовам повернення.
      </p>
    </PolicyPage>
  )
}
