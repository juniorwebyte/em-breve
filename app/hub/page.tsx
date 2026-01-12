import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ParticleBackground } from "@/components/particle-background"
import { HubHero } from "@/components/hub/hub-hero"
import { Timeline } from "@/components/hub/timeline"
import { EcosystemMap } from "@/components/hub/ecosystem-map"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hub | Webyte Hub - Ecossistema de Empresas",
  description:
    "Conheça todas as empresas do grupo Webyte Hub: Vendi Aqui, WebytePay, WebytePlay, Webyte Music, Webyte Studios, 12Aqui, PloutosLedger, EduPaz Academy, Sigma e ADDProxy.",
}

export default function HubPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <ParticleBackground />
      <Header />
      <HubHero />
      <div id="timeline">
        <Timeline />
      </div>
      <div id="ecosystem">
        <EcosystemMap />
      </div>
      <Footer />
    </main>
  )
}
