import { NextResponse } from "next/server"

interface Body {
  name?: string
  email?: string
  phone?: string
  note?: string
}

export async function POST(request: Request) {
  let body: Body
  try {
    body = (await request.json()) as Body
  } catch {
    return NextResponse.json({ error: "Некоректний запит" }, { status: 400 })
  }

  const name = body.name?.trim()
  const email = body.email?.trim()
  if (!name || !email) {
    return NextResponse.json({ error: "Вкажіть ім'я та email" }, { status: 400 })
  }

  const phone = body.phone?.trim() ?? ""
  const note = body.note?.trim() ?? ""
  const key = process.env.RESEND_API_KEY
  const to = process.env.CHECKOUT_NOTIFY_EMAIL?.trim()
  const from = process.env.RESEND_FROM_EMAIL?.trim() || "THREE SIDE <onboarding@resend.dev>"

  let emailed = false
  if (key && to) {
    const { Resend } = await import("resend")
    const resend = new Resend(key)
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Заявка на оформлення — ${name}`,
      text: `Ім'я: ${name}\nEmail: ${email}\nТелефон: ${phone || "—"}\n\nКоментар:\n${note || "—"}`,
    })
    if (error) {
      return NextResponse.json({ error: "Не вдалося надіслати повідомлення. Спробуйте пізніше." }, { status: 502 })
    }
    emailed = true
  }

  return NextResponse.json({ ok: true, emailed })
}
