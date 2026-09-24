"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, CheckCircle2, Code2, Palette, Rocket, Shield, Zap, Globe } from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "Código Limpo",
    description:
      "Desenvolvemos com as melhores práticas e padrões de código para garantir manutenibilidade e escalabilidade.",
  },
  {
    icon: Palette,
    title: "Design Moderno",
    description: "Interfaces elegantes e intuitivas que proporcionam a melhor experiência para seus usuários.",
  },
  {
    icon: Rocket,
    title: "Alta Performance",
    description: "Sites otimizados para carregar rapidamente e oferecer a melhor experiência de navegação.",
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Implementamos as melhores práticas de segurança para proteger seus dados e aplicações.",
  },
  {
    icon: Zap,
    title: "Tecnologia Avançada",
    description: "Utilizamos as tecnologias mais recentes do mercado para criar soluções inovadoras.",
  },
  {
    icon: Globe,
    title: "Suporte Global",
    description: "Atendimento dedicado em português, inglês e espanhol para clientes em todo o mundo.",
  },
]

const processSteps = [
  {
    title: "Diagnóstico",
    text: "Entendemos o seu nicho, público e objetivos para formar a base da estratégia digital.",
  },
  {
    title: "Prototipagem",
    text: "Estruturamos a proposta visual, a narrativa e a experiência para comunicar valor com clareza.",
  },
  {
    title: "Entrega",
    text: "Desenvolvemos, otimizamos e validamos a solução para que ela esteja pronta para conversão.",
  },
]

const faqItems = [
  {
    question: "Qual tipo de projeto você desenvolve?",
    answer:
      "Trabalhamos com sites institucionais, landing pages, portais, experiências de marca e projetos focados em conversão, presença digital e crescimento de demanda.",
  },
  {
    question: "O processo é personalizado?",
    answer:
      "Sim. Cada projeto começa com diagnóstico e estratégia para garantir que a solução reflita sua proposta de valor, público e objetivos reais.",
  },
  {
    question: "Vocês cuidam de design e desenvolvimento?",
    answer:
      "Sim. Nossa execução combina estratégia, design, UX e desenvolvimento em uma mesma linha, para reduzir fricção e entregar uma experiência mais coesa.",
  },
  {
    question: "Como funciona a primeira conversa?",
    answer:
      "A conversa inicial serve para entender sua necessidade, seu contexto e o que você quer alcançar. A partir daí, definimos a melhor direção para o projeto.",
  },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <section id="sobre" ref={sectionRef} className="relative py-20 md:py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 md:via-secondary/30 to-transparent" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2
            className={`text-2xl md:text-5xl font-bold text-foreground mb-4 ${
              isMobile
                ? "opacity-100"
                : `transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`
            }`}
          >
            Sobre a <span className="text-primary">Webyte Hub</span>
          </h2>
          <p
            className={`text-base md:text-lg text-muted-foreground max-w-2xl mx-auto ${
              isMobile
                ? "opacity-100"
                : `transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`
            }`}
          >
            Somos uma agência digital focada em criar experiências web extraordinárias que impulsionam o crescimento do
            seu negócio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/20 md:bg-secondary/30 border border-border/50 hover:border-primary/50 ${
                isMobile
                  ? "opacity-100"
                  : `transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`
              }`}
              style={{ transitionDelay: isMobile ? "0ms" : `${150 + index * 100}ms` }}
            >
              <div className="hidden md:block absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-4 md:group-hover:scale-110 transition-transform">
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16">
          <div className="rounded-3xl border border-border/60 bg-secondary/20 p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <div className="mb-6 text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Como trabalhamos</p>
              <h3 className="mt-3 text-2xl md:text-3xl font-bold text-foreground">Estratégia clara, execução precisa</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {processSteps.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-border/50 bg-background/40 p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    0{index + 1}
                  </div>
                  <h4 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h4>
                  <p className="text-sm leading-6 text-muted-foreground">{step.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-border/50 bg-background/40 p-5">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Foco</p>
                <h4 className="mt-3 text-lg font-semibold text-foreground">Presença que comunica valor</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Sua marca precisa ser vista com clareza e gerar confiança antes mesmo do primeiro contato.
                </p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-background/40 p-5">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Experiência</p>
                <h4 className="mt-3 text-lg font-semibold text-foreground">Fluxo mais simples e envolvente</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Melhoramos a jornada para facilitar a decisão, reduzir atrito e aumentar a percepção de qualidade.
                </p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-background/40 p-5">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Entrega</p>
                <h4 className="mt-3 text-lg font-semibold text-foreground">Produto pronto para crescer</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Desenvolvemos soluções pensadas para manter a marca consistente, profissional e competitiva.
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-border/50 bg-background/40 p-5 md:p-6">
              <div className="mb-6 text-center">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Perguntas frequentes</p>
                <h4 className="mt-3 text-xl md:text-2xl font-bold text-foreground">Tudo que você precisa saber antes do primeiro passo</h4>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {faqItems.map((item) => (
                  <div key={item.question} className="rounded-2xl border border-border/50 bg-secondary/20 p-4 md:p-5">
                    <h5 className="text-base font-semibold text-foreground">{item.question}</h5>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-4 md:flex-row md:p-5">
              <p className="text-center text-base text-foreground md:text-left">
                Pronto para transformar sua presença digital em uma experiência que converte?
              </p>
              <a
                href="#contato"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Falar com a Webyte
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
