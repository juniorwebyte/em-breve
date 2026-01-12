import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Webyte Hub | Desenvolvimento Web Moderno",
  description:
    "A Webyte Hub está chegando com soluções inovadoras em desenvolvimento web. Inscreva-se para ser notificado quando lançarmos!",
  generator: "Next.js",
  keywords: ["desenvolvimento web", "webyte hub", "agência digital", "sites modernos", "react", "next.js"],
  authors: [{ name: "Webyte Hub" }],
  openGraph: {
    title: "Webyte Hub | Desenvolvimento Web Moderno",
    description: "Soluções inovadoras em desenvolvimento web",
    type: "website",
    locale: "pt_BR",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#00d4ff",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
