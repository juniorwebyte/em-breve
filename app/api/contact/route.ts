import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    // Verifica se a API key existe
    if (!process.env.RESEND_API_KEY) {
      console.error("[API] RESEND_API_KEY não configurada")
      return NextResponse.json({ error: "Erro de configuração do servidor" }, { status: 500 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const body = await request.json()
    const { name, email, message } = body

    // Validação básica
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 })
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"
    const destinationEmail = process.env.CONTACT_EMAIL

    if (!destinationEmail) {
      console.error("[API] CONTACT_EMAIL não configurado")
      return NextResponse.json({ error: "Erro de configuração do servidor" }, { status: 500 })
    }

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: destinationEmail,
      subject: `[Webyte Hub] Novo contato de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10b981, #3b82f6); padding: 20px; border-radius: 12px 12px 0 0;">
            <h2 style="color: white; margin: 0;">Novo Contato - Webyte Hub</h2>
          </div>
          <div style="background: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                  <strong style="color: #374151;">Nome:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">
                  ${name}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                  <strong style="color: #374151;">E-mail:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                  <a href="mailto:${email}" style="color: #10b981;">${email}</a>
                </td>
              </tr>
            </table>
            <div style="margin-top: 20px;">
              <strong style="color: #374151;">Mensagem:</strong>
              <p style="background: #f9fafb; padding: 16px; border-radius: 8px; color: #4b5563; margin-top: 8px; line-height: 1.6;">
                ${message}
              </p>
            </div>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              Enviado em: ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}
            </p>
          </div>
        </div>
      `,
      replyTo: email,
    })

    if (error) {
      console.error("[API] Erro Resend:", error.message)
      return NextResponse.json({ error: "Erro ao enviar mensagem. Tente novamente." }, { status: 500 })
    }

    console.log(`[API] Email enviado com sucesso! ID: ${data?.id}`)

    return NextResponse.json(
      {
        success: true,
        message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[API] Erro ao processar contato:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
