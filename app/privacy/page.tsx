import type { Metadata } from "next"

import { PolicyPage } from "@/components/policy-page"
import { absoluteOgDefaultUrl, defaultOgImageFields } from "@/lib/og-default-meta"

const title = "Політика конфіденційності"
const description =
  "Як THREE SIDE збирає, використовує та захищає персональні дані відвідувачів сайту та клієнтів."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${title} | THREE SIDE`,
    description,
    url: "/privacy",
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

export default function PrivacyPage() {
  return (
    <PolicyPage title={title} label="Захист даних">
      <p>
        THREE SIDE поважає вашу приватність. Ми обробляємо персональні дані відповідно до Закону України
        «Про захист персональних даних» та Регламенту (EU) 2016/679 (GDPR), коли це застосовно до наших
        процесів.
      </p>
      <p>
        Ми можемо обробляти ім&apos;я, контактні дані, адресу доставки, історію звернень та технічні дані
        (IP, cookie, тип браузера) для виконання замовлень, підтримки клієнтів, аналітики відвідувань і
        покращення сервісу.
      </p>
      <p>
        Дані передаються лише тим постачальникам послуг, які забезпечують хостинг, доставку, аналітику або
        комунікацію, за договорами з вимогами конфіденційності. Ми не продаємо персональні дані третім
        сторонам.
      </p>
      <p>
        Ви маєте право на доступ, виправлення, видалення даних та обмеження обробки. Запити надсилайте на
        адресу, зазначену в розділі контактів на сайті.
      </p>
    </PolicyPage>
  )
}
