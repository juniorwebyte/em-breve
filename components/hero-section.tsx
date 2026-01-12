"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowRight, Mail, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CountdownTimer } from "@/components/countdown-timer"

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
  const [mounted, setMounted] = useState(false)
  const [showHint, setShowHint] = useState(HINT_CONFIG.enabled)
  const [showDevHint, setShowDevHint] = useState(DEV_HINT_CONFIG.enabled)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)

    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      )
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    if (HINT_CONFIG.enabled && !HINT_CONFIG.alwaysVisible) {
      const hintTimer = setTimeout(() => {
        setShowHint(false)
      }, HINT_CONFIG.timeout)
      return () => {
        clearTimeout(hintTimer)
        window.removeEventListener("resize", checkMobile)
      }
    }

    if (DEV_HINT_CONFIG.enabled && !DEV_HINT_CONFIG.alwaysVisible) {
      const devHintTimer = setTimeout(() => {
        setShowDevHint(false)
      }, DEV_HINT_CONFIG.timeout)
      return () => {
        clearTimeout(devHintTimer)
        window.removeEventListener("resize", checkMobile)
      }
    }

    return () => window.removeEventListener("resize", checkMobile)
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
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm border border-border/50 mb-8 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Em breve algo incrível</span>
          </div>

          {(HINT_CONFIG.enabled || DEV_HINT_CONFIG.enabled) && (
            <div
              className={`mb-8 min-h-[1.5rem] flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 ${
                mounted ? "opacity-100" : "opacity-0"
              }`}
            >
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
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="text-balance">
              Estamos construindo
              <br />
              <span
                className={`bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent ${!isMobile ? "bg-[length:200%_auto] animate-gradient" : ""}`}
              >
                algo extraordinário
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            A Webyte Hub está chegando com soluções inovadoras em desenvolvimento web. Inscreva-se para ser notificado
            quando lançarmos!
          </p>

          {/* Countdown */}
          <div className={`mb-12 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <CountdownTimer targetDate={LAUNCH_DATE} />
          </div>

          {/* Subscribe Form */}
          <form
            onSubmit={handleSubmit}
            className={`flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8 ${mounted ? "opacity-100" : "opacity-0"}`}
          >
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
          <p className={`text-sm text-muted-foreground ${mounted ? "opacity-100" : "opacity-0"}`}>
            Não enviamos spam. Seus dados estão seguros conosco.
          </p>
        </div>
      </div>
    </section>
  )
}
