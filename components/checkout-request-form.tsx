"use client"

import { useState } from "react"
import Link from "next/link"

export function CheckoutRequestForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [note, setNote] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    setMessage("")
    try {
      const res = await fetch("/api/checkout-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, note }),
      })
      const data = (await res.json()) as { ok?: boolean; emailed?: boolean; error?: string }
      if (!res.ok) {
        setStatus("error")
        setMessage(data.error ?? "Спробуйте ще раз.")
        return
      }
      setStatus("success")
      setMessage(
        data.emailed
          ? "Заявку прийнято. Консьєж зв'яжеться з вами найближчим часом."
          : "Заявку збережено. Щоб гарантувати відповідь, напишіть також на concierge@threeside.ua — у продакшні налаштуйте RESEND_API_KEY та CHECKOUT_NOTIFY_EMAIL.",
      )
      setName("")
      setEmail("")
      setPhone("")
      setNote("")
    } catch {
      setStatus("error")
      setMessage("Помилка мережі. Спробуйте пізніше.")
    }
  }

  if (status === "success") {
    return (
      <div className="mt-14 space-y-8 text-center">
        <p className="text-sm font-light leading-relaxed tracking-wide text-muted-foreground">{message}</p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/cart"
            className="inline-block border-[0.5px] border-brand-ghost px-8 py-3 text-[11px] font-extralight uppercase tracking-[0.3em] text-foreground transition-colors duration-700 ease-out hover:border-foreground rounded-none"
          >
            До кошика
          </Link>
          <Link
            href="/contact"
            className="inline-block border-[0.5px] border-foreground bg-foreground px-8 py-3 text-[11px] font-extralight uppercase tracking-[0.3em] text-background transition-colors duration-700 ease-out hover:bg-background hover:text-foreground rounded-none"
          >
            Контакти
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-14 space-y-8 text-left">
      <p className="text-center text-sm font-light leading-relaxed tracking-wide text-muted-foreground">
        Залиште контакти — консьєж підтвердить наявність, умови доставки та оплати. Кошик не очищується.
      </p>
      <div className="space-y-6">
        <div>
          <label htmlFor="checkout-name" className="block font-sans text-[10px] font-extralight uppercase tracking-[0.3em] text-muted-foreground">
            Ім&apos;я <span className="text-foreground">*</span>
          </label>
          <input
            id="checkout-name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="mt-2 w-full border-[0.5px] border-brand-ghost/50 bg-transparent px-4 py-3 text-sm font-light tracking-wide text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none rounded-none transition-colors duration-700"
            placeholder="Олена Коваленко"
          />
        </div>
        <div>
          <label htmlFor="checkout-email" className="block font-sans text-[10px] font-extralight uppercase tracking-[0.3em] text-muted-foreground">
            Email <span className="text-foreground">*</span>
          </label>
          <input
            id="checkout-email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="mt-2 w-full border-[0.5px] border-brand-ghost/50 bg-transparent px-4 py-3 text-sm font-light tracking-wide text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none rounded-none transition-colors duration-700"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="checkout-phone" className="block font-sans text-[10px] font-extralight uppercase tracking-[0.3em] text-muted-foreground">
            Телефон
          </label>
          <input
            id="checkout-phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            className="mt-2 w-full border-[0.5px] border-brand-ghost/50 bg-transparent px-4 py-3 text-sm font-light tracking-wide text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none rounded-none transition-colors duration-700"
            placeholder="+380 ..."
          />
        </div>
        <div>
          <label htmlFor="checkout-note" className="block font-sans text-[10px] font-extralight uppercase tracking-[0.3em] text-muted-foreground">
            Коментар до замовлення
          </label>
          <textarea
            id="checkout-note"
            name="note"
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="mt-2 w-full resize-y border-[0.5px] border-brand-ghost/50 bg-transparent px-4 py-3 text-sm font-light tracking-wide text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none rounded-none transition-colors duration-700"
            placeholder="Доставка в бутик, подарункове пакування…"
          />
        </div>
      </div>
      {status === "error" ? <p className="text-center text-sm font-light text-foreground">{message}</p> : null}
      <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row sm:pt-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-block border-[0.5px] border-foreground bg-foreground px-8 py-3 text-[11px] font-extralight uppercase tracking-[0.3em] text-background transition-colors duration-700 ease-out hover:bg-background hover:text-foreground disabled:opacity-50 rounded-none"
        >
          {status === "loading" ? "Надсилання…" : "Надіслати заявку"}
        </button>
        <Link
          href="/cart"
          className="inline-block border-[0.5px] border-brand-ghost px-8 py-3 text-center text-[11px] font-extralight uppercase tracking-[0.3em] text-foreground transition-colors duration-700 ease-out hover:border-foreground rounded-none"
        >
          Назад до кошика
        </Link>
      </div>
    </form>
  )
}
