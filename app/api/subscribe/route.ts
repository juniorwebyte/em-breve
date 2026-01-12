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
    const { email } = body

    // Validação básica
    if (!email) {
      return NextResponse.json({ error: "E-mail é obrigatório" }, { status: 400 })
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

    // Envia notificação para o admin
    const { error: notificationError } = await resend.emails.send({
      from: fromEmail,
      to: destinationEmail,
      subject: `[Webyte Hub] Nova inscrição na newsletter`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10b981, #8b5cf6); padding: 20px; border-radius: 12px 12px 0 0;">
            <h2 style="color: white; margin: 0;">Nova Inscrição - Newsletter</h2>
          </div>
          <div style="background: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="color: #374151; font-size: 16px;">
              <strong>Novo inscrito na lista de espera:</strong>
            </p>
            <p style="background: #f0fdf4; padding: 16px; border-radius: 8px; color: #166534; font-size: 18px; text-align: center;">
              ${email}
            </p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              Inscrito em: ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}
            </p>
          </div>
        </div>
      `,
    })

    if (notificationError) {
      console.error("[API] Erro ao enviar notificação:", notificationError.message)
    }

    // Envia confirmação para o inscrito
    const { error: confirmationError } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `Bem-vindo à Webyte Hub!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10b981, #3b82f6); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Webyte Hub</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Soluções Web Inovadoras</p>
          </div>
          <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <h2 style="color: #111827; margin-top: 0;">Obrigado por se inscrever!</h2>
            <p style="color: #4b5563; line-height: 1.7;">
              Você está agora na nossa lista de espera exclusiva. Assim que lançarmos oficialmente, 
              você será um dos primeiros a saber!
            </p>
            <p style="color: #4b5563; line-height: 1.7;">
              Enquanto isso, fique à vontade para nos seguir nas redes sociais:
            </p>
            <div style="text-align: center; margin: 24px 0;">
              <a href="https://www.instagram.com/webytehub/" style="display: inline-block; margin: 0 8px; color: #10b981; text-decoration: none;">Instagram</a>
              <a href="https://github.com/juniorwebyte" style="display: inline-block; margin: 0 8px; color: #10b981; text-decoration: none;">GitHub</a>
              <a href="https://www.linkedin.com/in/j%C3%BAnior-alves-6a625049/" style="display: inline-block; margin: 0 8px; color: #10b981; text-decoration: none;">LinkedIn</a>
            </div>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
            <p style="color: #9ca3af; font-size: 12px; margin: 0; text-align: center;">
              © ${new Date().getFullYear()} Webyte Hub. Todos os direitos reservados.
            </p>
          </div>
        </div>
      `,
    })

    if (confirmationError) {
      console.error("[API] Erro ao enviar confirmação:", confirmationError.message)
    }

    return NextResponse.json(
      {
        success: true,
        message: "Inscrição realizada com sucesso! Verifique seu e-mail.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[API] Erro ao processar inscrição:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
