import type { Metadata } from "next"

import { PolicyPage } from "@/components/policy-page"
import { absoluteOgDefaultUrl, defaultOgImageFields } from "@/lib/og-default-meta"

const title = "Доставка"
const description =
  "Умови доставки замовлень THREE SIDE по Україні: терміни, перевізники та отримання у бутику."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/delivery" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${title} | THREE SIDE`,
    description,
    url: "/delivery",
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

export default function DeliveryPage() {
  return (
    <PolicyPage title={title} label="Інформація">
      <p>
        Ми доставляємо замовлення по всій території України перевіреними службами логістики. Після
        підтвердження замовлення консьєж THREE SIDE повідомить орієнтовний термін та трекінг відправлення.
      </p>
      <p>
        Вартість і строки доставки залежать від регіону, об&apos;єму замовлення та обраного способу
        відправлення. Деталі узгоджуються індивідуально на етапі оформлення.
      </p>
      <p>
        Ви можете отримати покупку особисто в бутику THREE SIDE — попередньо узгодьте час візиту з
        консьєж-службою.
      </p>
      <p>
        У разі пошкодження упаковки при отриманні зафіксуйте це з кур&apos;єром або на відділенні перевізника
        та негайно повідомте нас за контактами на сайті.
      </p>
    </PolicyPage>
  )
}
