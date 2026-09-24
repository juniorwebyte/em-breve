import { ArrowRight, BadgeCheck, Gauge, MessageSquareText, Sparkles } from "lucide-react"

const proofPoints = [
  {
    value: "3x",
    label: "mais clareza na primeira impressão",
    icon: Sparkles,
  },
  {
    value: "1:1",
    label: "atenção estratégica em cada etapa",
    icon: MessageSquareText,
  },
  {
    value: "7 dias",
    label: "para validar ideia, proposta e posicionamento",
    icon: Gauge,
  },
]

const benefits = [
  "Posicionamento que comunica valor logo no topo da página",
  "Experiência pensada para reduzir atrito e aumentar confiança",
  "Estrutura visual alinhada à proposta real do seu negócio",
]

export function ValueProofSection() {
  return (
    <section id="resultado" className="relative px-4 py-20 md:py-28">
      <div className="container mx-auto relative z-10">
        <div className="rounded-[2rem] border border-border/60 bg-secondary/20 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] md:p-10">
          <div className="mb-8 text-center md:mb-10">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-primary">Prova de valor</p>
            <h2 className="text-2xl font-bold text-foreground md:text-5xl">
              Seu site precisa vender <span className="text-primary">antes de convencer</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              A diferença entre um projeto bonito e um projeto que gera demanda está na clareza da mensagem, no fluxo da
              experiência e no foco em conversão.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {proofPoints.map(({ value, label, icon: Icon }) => (
              <div key={value} className="rounded-2xl border border-border/60 bg-background/40 p-5 text-center md:p-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-3xl font-black text-foreground md:text-4xl">{value}</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-base">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-border/60 bg-background/40 p-5 md:p-6">
              <h3 className="mb-4 text-xl font-semibold text-foreground md:text-2xl">O que você ganha com uma presença mais forte</h3>
              <div className="space-y-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 rounded-xl border border-border/50 bg-secondary/20 p-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <p className="text-sm leading-6 text-muted-foreground md:text-base">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-primary/20 bg-primary/5 p-5 md:p-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Foco</p>
                <h3 className="mt-3 text-2xl font-bold text-foreground">Mais confiança. Mais conversão.</h3>
              </div>

              <a
                href="#contato"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Solicitar proposta
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
