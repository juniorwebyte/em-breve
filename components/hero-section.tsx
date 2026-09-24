"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowRight, Mail, Sparkles, Loader2, Rocket, Gauge, Palette, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CountdownTimer } from "@/components/countdown-timer"

const HIGHLIGHTS = [
  {
    icon: Rocket,
    title: "Lançamento estratégico",
    description: "MVP pensado para ser rápido, claro e memorável.",
  },
  {
    icon: Gauge,
    title: "Performance em foco",
    description: "Experiências leves, rápidas e otimizadas para conversão.",
  },
  {
    icon: Palette,
    title: "Design premium",
    description: "Visual moderno que comunica valor e confiança.",
  },
] as const

const LAUNCH_DATE = process.env.NEXT_PUBLIC_LAUNCH_DATE || "2026-03-01T00:00:00"

const HINT_CONFIG = {
  enabled: true,
  alwaysVisible: true,
  timeout: 7000,
  pulse: true,
  text: "digite WEBYTE",
}

const DEV_HINT_CONFIG = {
  enabled: true,
  alwaysVisible: true,
  timeout: 7000,
  pulse: true,
  text: "digite DEV",
}

export function HeroSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [showHint, setShowHint] = useState(HINT_CONFIG.enabled)
  const [showDevHint, setShowDevHint] = useState(DEV_HINT_CONFIG.enabled)
  const isMobile =
    typeof window !== "undefined" &&
    (window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))

  useEffect(() => {
    if (HINT_CONFIG.enabled && !HINT_CONFIG.alwaysVisible) {
      const hintTimer = setTimeout(() => {
        setShowHint(false)
      }, HINT_CONFIG.timeout)

      return () => clearTimeout(hintTimer)
    }

    if (DEV_HINT_CONFIG.enabled && !DEV_HINT_CONFIG.alwaysVisible) {
      const devHintTimer = setTimeout(() => {
        setShowDevHint(false)
      }, DEV_HINT_CONFIG.timeout)

      return () => clearTimeout(devHintTimer)
    }

    return undefined
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus("success")
        setEmail("")
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        setStatus("error")
        setTimeout(() => setStatus("idle"), 5000)
      }
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center py-32 px-4">
      {!isMobile && (
        <>
          <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse delay-1000" />
        </>
      )}
      {isMobile && (
        <>
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
        </>
      )}

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm border border-border/50 mb-8 opacity-100">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Design, estratégia e presença digital que convertem</span>
          </div>

          {(HINT_CONFIG.enabled || DEV_HINT_CONFIG.enabled) && (
            <div className="mb-8 min-h-[1.5rem] flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 opacity-100">
              {HINT_CONFIG.enabled && showHint && (
                <span
                  className={`text-xs text-primary/70 font-mono tracking-widest ${
                    HINT_CONFIG.pulse && !isMobile ? "animate-pulse" : ""
                  }`}
                >
                  {HINT_CONFIG.text}
                </span>
              )}
              {HINT_CONFIG.enabled && showHint && DEV_HINT_CONFIG.enabled && showDevHint && (
                <span className="hidden sm:inline text-xs text-muted-foreground/50">|</span>
              )}
              {DEV_HINT_CONFIG.enabled && showDevHint && (
                <span
                  className={`text-xs text-green-500/70 font-mono tracking-widest ${
                    DEV_HINT_CONFIG.pulse && !isMobile ? "animate-pulse" : ""
                  }`}
                >
                  {DEV_HINT_CONFIG.text}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight opacity-100">
            <span className="text-balance">
              Sua presença digital
              <br />
              <span
                className={`bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent ${!isMobile ? "bg-[length:200%_auto] animate-gradient" : ""}`}
              >
                precisa vender com clareza
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto opacity-100">
            A Webyte Hub cria experiências web premium para marcas que querem atrair atenção, gerar confiança e tornar
            cada visita em oportunidade real de negócio.
          </p>

          <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Falar com a Webyte
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999"}?text=${encodeURIComponent(
                process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
                  "Olá! Vim pelo site da Webyte Hub e gostaria de saber mais sobre os serviços.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/60 hover:text-primary"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          {/* Countdown */}
          <div className="mb-12 opacity-100">
            <CountdownTimer targetDate={LAUNCH_DATE} />
          </div>

          {/* Subscribe Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8 opacity-100">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                required
                disabled={status === "loading"}
              />
            </div>
            <Button
              type="submit"
              className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground group"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Enviando...
                </>
              ) : status === "success" ? (
                "Inscrito!"
              ) : status === "error" ? (
                "Erro. Tente novamente"
              ) : (
                <>
                  Inscrever-se
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Trust Text */}
          <p className="text-sm text-muted-foreground opacity-100">
            Não enviamos spam. Seus dados estão seguros conosco.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3 max-w-2xl mx-auto text-center">
            {[
              { value: "+360h", label: "de estratégia e execução" },
              { value: "Premium", label: "design visual e UX" },
              { value: "100%", label: "foco em conversão" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-border/50 bg-secondary/20 px-4 py-3">
                <div className="text-lg font-bold text-foreground">{item.value}</div>
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3 text-left">
            {HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group rounded-2xl border border-border/60 bg-secondary/30 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-transform duration-300 hover:-translate-y-1 hover:border-primary/50"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mb-2 text-base font-semibold text-foreground">{title}</h2>
                <p className="text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
