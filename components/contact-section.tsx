"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Send, User, Mail, MessageSquare, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
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
    <section id="contato" ref={sectionRef} className="relative py-20 md:py-32 px-4">
      <div className="container mx-auto relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2
              className={`text-2xl md:text-5xl font-bold text-foreground mb-4 ${
                isMobile
                  ? "opacity-100"
                  : `transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`
              }`}
            >
              Entre em <span className="text-primary">Contato</span>
            </h2>
            <p
              className={`text-base md:text-lg text-muted-foreground ${
                isMobile
                  ? "opacity-100"
                  : `transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`
              }`}
            >
              Tem alguma dúvida ou quer dizer olá? Ficaremos felizes em ouvir você!
            </p>
          </div>

          <div
            className={`relative p-5 md:p-8 rounded-2xl md:rounded-3xl bg-secondary/20 md:bg-secondary/30 border border-border/50 ${
              isMobile
                ? "opacity-100"
                : `transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`
            }`}
          >
            <div className="hidden md:block absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="hidden md:block absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />

            {status === "success" ? (
              <div className="relative text-center py-8 md:py-12">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 md:w-8 md:h-8 text-green-500" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Mensagem Enviada!</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Obrigado pelo contato. Responderemos em breve!
                </p>
              </div>
            ) : status === "error" ? (
              <div className="relative text-center py-8 md:py-12">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertCircle className="w-7 h-7 md:w-8 md:h-8 text-red-500" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Erro ao enviar</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Ocorreu um erro. Tente novamente ou entre em contato pelo WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Seu Nome</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Como podemos te chamar?"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-9 md:pl-10 h-11 md:h-12 bg-background/50 border-border/50 focus:border-primary transition-colors"
                      required
                      disabled={status === "loading"}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Seu E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-9 md:pl-10 h-11 md:h-12 bg-background/50 border-border/50 focus:border-primary transition-colors"
                      required
                      disabled={status === "loading"}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Sua Mensagem</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                    <Textarea
                      placeholder="Conte-nos sobre seu projeto..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="pl-9 md:pl-10 min-h-[100px] md:min-h-[120px] bg-background/50 border-border/50 focus:border-primary transition-colors resize-none"
                      required
                      disabled={status === "loading"}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 md:h-12 bg-primary hover:bg-primary/90 text-primary-foreground group"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send className="ml-2 w-4 h-4 md:group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
