"use client"

import { useEffect, useRef, useState } from "react"
import { Code2, Palette, Rocket, Shield, Zap, Globe } from "lucide-react"

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

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detectar mobile
    setIsMobile(window.innerWidth < 768)

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
      </div>
    </section>
  )
}
