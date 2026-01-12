// Health check endpoint para monitoramento
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    env: {
      resend: !!process.env.RESEND_API_KEY,
      contactEmail: !!process.env.CONTACT_EMAIL,
      launchDate: process.env.NEXT_PUBLIC_LAUNCH_DATE || "2026-03-01T00:00:00",
    },
  })
}
