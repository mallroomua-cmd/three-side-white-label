import type { Metadata } from "next"
import Link from "next/link"

import { PolicyPage } from "@/components/policy-page"
import { absoluteOgDefaultUrl, defaultOgImageFields } from "@/lib/og-default-meta"

const title = "Файли cookie"
const description =
  "Як THREE SIDE використовує cookie та подібні технології на сайті. Зв'язок із політикою конфіденційності."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${title} | THREE SIDE`,
    description,
    url: "/cookies",
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

export default function CookiesPage() {
  return (
    <PolicyPage title={title} label="Конфіденційність">
      <p>
        Сайт THREE SIDE може використовувати cookie та аналогічні технології для забезпечення роботи сервісу,
        аналітики відвідувань (за наявності відповідних інструментів) і запам&apos;ятовування ваших налаштувань.
      </p>
      <p>
        Ви можете керувати cookie через налаштування браузера. Вимкнення деяких категорій cookie може обмежити
        функціональність сайту.
      </p>
      <p>
        Детальніше про обробку персональних даних — у{" "}
        <Link href="/privacy" className="border-b border-transparent hover:border-foreground transition-colors duration-700">
          політиці конфіденційності
        </Link>
        .
      </p>
    </PolicyPage>
  )
}
