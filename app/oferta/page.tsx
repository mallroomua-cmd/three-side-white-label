import type { Metadata } from "next"

import { PolicyPage } from "@/components/policy-page"
import { absoluteOgDefaultUrl, defaultOgImageFields } from "@/lib/og-default-meta"

const title = "Договір публічної оферти"
const description =
  "Публічна оферта THREE SIDE: загальні умови укладення договору купівлі-продажу через вебсайт."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/oferta" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${title} | THREE SIDE`,
    description,
    url: "/oferta",
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

export default function OfertaPage() {
  return (
    <PolicyPage title={title} label="Правові умови">
      <p>
        Цей документ є публічною офертою ТОВ «ТРІ САЙД» (далі — Продавець) щодо укладення договору
        купівлі-продажу товарів преміум-сегменту через вебсайт THREE SIDE.
      </p>
      <p>
        Акцептом оферти вважається оформлення замовлення на сайті, підтвердження замовлення електронною
        поштою або телефоном, а також оплата товару в порядку, погодженому з Продавцем. Договір вважається
        укладеним з моменту підтвердження замовлення.
      </p>
      <p>
        Ціни, наявність товарів, умови доставки та оплати зазначаються на сайті або повідомляються
        консьєж-службою. Продавець має право змінювати асортимент і ціни до моменту підтвердження
        замовлення.
      </p>
      <p>
        Сторони звільняються від відповідальності за часткове або повне невиконання зобов&apos;язань у
        разі обставин непереборної сили, передбачених законодавством України.
      </p>
    </PolicyPage>
  )
}
