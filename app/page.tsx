import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ParticleBackground } from "@/components/particle-background"
import { GameSection } from "@/components/game/game-section"
import { ValueProofSection } from "@/components/value-proof-section"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <ParticleBackground />
      <Header />
      <HeroSection />
      <GameSection />
      <ValueProofSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
