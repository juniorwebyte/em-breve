"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gamepad2, ChevronDown, ChevronUp, Sparkles, Code2, Smartphone } from "lucide-react"
import { WebyteExplorer } from "./webyte-explorer"
import { DevQuiz } from "./dev-quiz"
import { Button } from "@/components/ui/button"

const SECRET_WORD = "WEBYTE"
const DEV_WORD = "DEV"

export function GameSection() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isUnlockedByTyping, setIsUnlockedByTyping] = useState(false)
  const [showDevQuiz, setShowDevQuiz] = useState(false)
  const [devUnlocked, setDevUnlocked] = useState(false)
  const [typedKeys, setTypedKeys] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        setTypedKeys((prev) => {
          const newTyped = (prev + e.key.toUpperCase()).slice(-Math.max(SECRET_WORD.length, DEV_WORD.length))

          if (newTyped.endsWith(SECRET_WORD) && !isUnlockedByTyping) {
            setIsUnlockedByTyping(true)
            setTimeout(() => {
              sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
            }, 100)
            return ""
          }

          if (newTyped.endsWith(DEV_WORD) && !devUnlocked) {
            setDevUnlocked(true)
            setShowDevQuiz(true)
            return ""
          }

          return newTyped
        })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isUnlockedByTyping, devUnlocked])

  return (
    <section ref={sectionRef} className="py-16 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Gamepad2 className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Mini Game</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Explore nosso <span className="text-primary">Ecossistema</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Descubra como as empresas do grupo Webyte Hub se conectam neste jogo interativo
          </p>

          {isMobile && (
            <p className="text-xs text-muted-foreground/70 mt-2 flex items-center justify-center gap-1">
              <Smartphone className="w-3 h-3" />
              Dica: No celular, clique diretamente nos botões para jogar
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {!isExpanded ? (
            <motion.div
              className={`glass rounded-2xl p-6 md:p-8 text-center cursor-pointer hover:bg-secondary/10 transition-colors relative overflow-hidden ${
                isUnlockedByTyping ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
              }`}
              onClick={() => setIsExpanded(true)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {isUnlockedByTyping && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium"
                >
                  <Sparkles className="w-3 h-3" />
                  Desbloqueado!
                </motion.div>
              )}

              {devUnlocked && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-xs font-medium cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowDevQuiz(true)
                  }}
                >
                  <Code2 className="w-3 h-3" />
                  Dev Quiz
                </motion.div>
              )}

              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  isUnlockedByTyping ? "bg-primary/30" : "bg-primary/20"
                }`}
              >
                <Gamepad2 className={`w-8 h-8 ${isUnlockedByTyping ? "text-primary animate-pulse" : "text-primary"}`} />
              </div>
              <h3 className="text-xl font-bold mb-2">Webyte Explorer</h3>
              <p className="text-muted-foreground mb-4">
                {isUnlockedByTyping
                  ? "Jogo desbloqueado! Clique para jogar agora"
                  : "Clique para abrir o jogo e descobrir as conexões entre as empresas"}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className={`gap-2 ${isUnlockedByTyping ? "animate-pulse" : ""}`}>
                  {isUnlockedByTyping ? "Jogar Agora!" : "Jogar Agora"}
                  <ChevronDown className="w-4 h-4" />
                </Button>

                {isMobile && !devUnlocked && (
                  <Button
                    variant="outline"
                    className="gap-2 border-green-500/50 text-green-500 hover:bg-green-500/10 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation()
                      setDevUnlocked(true)
                      setShowDevQuiz(true)
                    }}
                  >
                    <Code2 className="w-4 h-4" />
                    Dev Quiz
                  </Button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex flex-wrap justify-between gap-2 mb-4">
                {devUnlocked && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDevQuiz(true)}
                    className="gap-2 border-green-500/50 text-green-500 hover:bg-green-500/10 bg-transparent"
                  >
                    <Code2 className="w-4 h-4" />
                    Dev Quiz
                  </Button>
                )}

                {isMobile && !devUnlocked && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setDevUnlocked(true)
                      setShowDevQuiz(true)
                    }}
                    className="gap-2 border-green-500/50 text-green-500 hover:bg-green-500/10 bg-transparent"
                  >
                    <Code2 className="w-4 h-4" />
                    Dev Quiz
                  </Button>
                )}

                <div className="flex-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsExpanded(false)
                  }}
                  className="gap-2"
                >
                  <ChevronUp className="w-4 h-4" />
                  Minimizar
                </Button>
              </div>
              <WebyteExplorer />
            </motion.div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>{showDevQuiz && <DevQuiz onClose={() => setShowDevQuiz(false)} />}</AnimatePresence>
    </section>
  )
}
