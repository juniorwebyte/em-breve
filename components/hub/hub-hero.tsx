"use client"

import { ArrowDown, Network } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HubHero() {
  return (
    <section className="min-h-[80vh] md:min-h-screen flex items-center justify-center relative pt-16 md:pt-20">
      <div className="container mx-auto px-4 text-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-secondary/30 border border-border/50 mb-6 md:mb-8">
            <Network className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
            <span className="text-xs md:text-sm text-muted-foreground">Ecossistema Integrado</span>
          </div>

          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
            Conheça o{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
              Webyte Hub
            </span>
          </h1>

          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 md:mb-12">
            Um ecossistema de empresas integradas, oferecendo soluções completas em tecnologia, finanças, educação e
            entretenimento.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <Button size="lg" className="gap-2 w-full sm:w-auto" asChild>
              <a href="#timeline">
                Explorar Timeline
                <ArrowDown className="w-4 h-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 bg-transparent w-full sm:w-auto" asChild>
              <a href="#ecosystem">Ver Mapa</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/5 md:bg-primary/10 rounded-full blur-3xl md:blur-[150px] pointer-events-none" />
    </section>
  )
}
