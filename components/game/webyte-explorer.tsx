"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { companies } from "@/lib/companies-data"
import {
  Shrub as Hub,
  ShoppingCart,
  CreditCard,
  Gamepad2,
  Music,
  Film,
  Truck,
  BookOpen,
  GraduationCap,
  Brain,
  Shield,
  X,
  Trophy,
  Zap,
  ArrowRight,
  Keyboard,
  CheckCircle2,
  Sparkles,
  Lightbulb,
  PartyPopper,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

const iconMap: Record<string, React.ElementType> = {
  Hub,
  ShoppingCart,
  CreditCard,
  Gamepad2,
  Music,
  Film,
  Truck,
  BookOpen,
  GraduationCap,
  Brain,
  Shield,
}

// Posições dos nós no jogo
const nodePositions: Record<string, { x: number; y: number }> = {
  "webyte-hub": { x: 50, y: 50 },
  "vendi-aqui": { x: 20, y: 25 },
  "webyte-pay": { x: 80, y: 25 },
  "webyte-play": { x: 15, y: 55 },
  "webyte-music": { x: 35, y: 80 },
  "webyte-studios": { x: 10, y: 80 },
  "12aqui": { x: 85, y: 55 },
  "ploutos-ledger": { x: 90, y: 80 },
  "edupaz-academy": { x: 65, y: 85 },
  sigma: { x: 40, y: 15 },
  "add-proxy": { x: 60, y: 15 },
}

// Combinações de conexões que geram resultados especiais
const specialConnections: Array<{
  from: string
  to: string
  result: string
  description: string
  points: number
}> = [
  {
    from: "webyte-pay",
    to: "ploutos-ledger",
    result: "Fluxo Financeiro Completo",
    description: "Pagamentos integrados com gestão contábil automatizada",
    points: 100,
  },
  {
    from: "webyte-play",
    to: "webyte-music",
    result: "Experiência Multimídia",
    description: "Streaming de jogos e música em uma única plataforma",
    points: 80,
  },
  {
    from: "vendi-aqui",
    to: "12aqui",
    result: "E-commerce Completo",
    description: "Marketplace com logística de entrega integrada",
    points: 90,
  },
  {
    from: "sigma",
    to: "edupaz-academy",
    result: "Educação Inteligente",
    description: "IA aplicada ao ensino personalizado",
    points: 120,
  },
  {
    from: "webyte-studios",
    to: "webyte-play",
    result: "Conteúdo Exclusivo",
    description: "Produção e distribuição de jogos originais",
    points: 85,
  },
  {
    from: "add-proxy",
    to: "sigma",
    result: "Infraestrutura IA",
    description: "Cloud computing otimizada para machine learning",
    points: 110,
  },
  {
    from: "webyte-hub",
    to: "webyte-pay",
    result: "Core Financeiro",
    description: "Central de coordenação do sistema de pagamentos",
    points: 75,
  },
]

interface GameState {
  isPlaying: boolean
  isUnlocked: boolean
  selectedNodes: string[]
  discoveredConnections: Array<{ from: string; to: string; result: string }>
  score: number
  inputValue: string
  typingPhrase: string
  showResult: boolean
  lastResult: (typeof specialConnections)[0] | null
  failedAttempts: number
  showHint: boolean
  currentHint: { from: string; to: string } | null
}

const UNLOCK_PHRASES = [
  "WEBYTE",
  "WEBYTE EXPLORER",
  "INICIAR JOGO",
  "EXPLORAR ECOSSISTEMA",
  "WEBYTE HUB",
  "CONECTAR EMPRESAS",
]

interface WebyteExplorerProps {
  skipUnlock?: boolean
}

const getRandomUnlockPhrase = () => UNLOCK_PHRASES[Math.floor(Math.random() * UNLOCK_PHRASES.length)]

export function WebyteExplorer({ skipUnlock = false }: WebyteExplorerProps) {
  const router = useRouter()

  const [gameState, setGameState] = useState<GameState>(() => ({
    isPlaying: skipUnlock,
    isUnlocked: skipUnlock,
    selectedNodes: [],
    discoveredConnections: [],
    score: 0,
    inputValue: "",
    typingPhrase: getRandomUnlockPhrase(),
    showResult: false,
    lastResult: null,
    failedAttempts: 0,
    showHint: false,
    currentHint: null,
  }))

  const inputRef = useRef<HTMLInputElement>(null)
  const [showTutorial, setShowTutorial] = useState(true)

  const totalConnections = specialConnections.length
  const discoveredSpecial = gameState.discoveredConnections.filter((c) =>
    specialConnections.some((s) => (s.from === c.from && s.to === c.to) || (s.from === c.to && s.to === c.from)),
  ).length
  const gameCompleted = discoveredSpecial === totalConnections && gameState.isPlaying

  const getHint = useCallback(() => {
    const undiscovered = specialConnections.filter(
      (s) =>
        !gameState.discoveredConnections.some(
          (c) => (c.from === s.from && c.to === s.to) || (c.from === s.to && c.to === s.from),
        ),
    )

    if (undiscovered.length > 0) {
      const hint = undiscovered[Math.floor(Math.random() * undiscovered.length)]
      setGameState((prev) => ({
        ...prev,
        showHint: true,
        currentHint: { from: hint.from, to: hint.to },
      }))
    }
  }, [gameState.discoveredConnections])

  const handleNodeClick = useCallback(
    (companyId: string) => {
      if (!gameState.isPlaying || gameState.showResult || gameCompleted) return

      setGameState((prev) => {
        const newSelected = [...prev.selectedNodes]

        if (newSelected.includes(companyId)) {
          return { ...prev, selectedNodes: newSelected.filter((id) => id !== companyId) }
        }

        if (newSelected.length < 2) {
          newSelected.push(companyId)
        }

        if (newSelected.length === 2) {
          const [from, to] = newSelected

          const alreadyDiscovered = prev.discoveredConnections.some(
            (c) => (c.from === from && c.to === to) || (c.from === to && c.to === from),
          )

          if (!alreadyDiscovered) {
            const special = specialConnections.find(
              (c) => (c.from === from && c.to === to) || (c.from === to && c.to === from),
            )

            if (special) {
              return {
                ...prev,
                selectedNodes: [],
                discoveredConnections: [...prev.discoveredConnections, { from, to, result: special.result }],
                score: prev.score + special.points,
                showResult: true,
                lastResult: special,
                failedAttempts: 0,
                showHint: false,
                currentHint: null,
              }
            }

            const fromCompany = companies.find((c) => c.id === from)
            const isValidConnection = fromCompany?.connections.includes(to)

            if (isValidConnection) {
              return {
                ...prev,
                selectedNodes: [],
                discoveredConnections: [...prev.discoveredConnections, { from, to, result: "Conexão Descoberta" }],
                score: prev.score + 25,
                showResult: true,
                lastResult: {
                  from,
                  to,
                  result: "Conexão Válida",
                  description: `${fromCompany?.name} se conecta com ${companies.find((c) => c.id === to)?.name}`,
                  points: 25,
                },
                failedAttempts: 0,
              }
            }
          }

          return {
            ...prev,
            selectedNodes: [],
            failedAttempts: prev.failedAttempts + 1,
          }
        }

        return { ...prev, selectedNodes: newSelected }
      })
    },
    [gameState.isPlaying, gameState.showResult, gameCompleted],
  )

  const closeResult = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      showResult: false,
      lastResult: null,
    }))
  }, [])

  const resetGame = useCallback(() => {
    setGameState({
      isPlaying: false,
      isUnlocked: false,
      selectedNodes: [],
      discoveredConnections: [],
      score: 0,
      inputValue: "",
      typingPhrase: getRandomUnlockPhrase(),
      showResult: false,
      lastResult: null,
      failedAttempts: 0,
      showHint: false,
      currentHint: null,
    })
    setShowTutorial(true)
  }, [])

  const goToHub = useCallback(() => {
    router.push("/hub")
  }, [router])

  return (
    <div className="relative w-full">
      <AnimatePresence>
        {!gameState.isUnlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass rounded-2xl p-8 text-center"
          >
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6">
                <Keyboard className="w-10 h-10 text-primary" />
              </div>

              <h3 className="text-2xl font-bold mb-2">Webyte Explorer</h3>
              <p className="text-muted-foreground mb-6">Para desbloquear o jogo, digite a frase abaixo:</p>

              <div className="bg-secondary/50 rounded-xl p-4 mb-6">
                <p className="text-xl font-mono font-bold tracking-wider text-primary">{gameState.typingPhrase}</p>
              </div>

              <Input
                ref={inputRef}
                type="text"
                value={gameState.inputValue}
                onChange={(e) => {
                  const nextValue = e.target.value
                  setGameState((prev) => ({
                    ...prev,
                    inputValue: nextValue,
                    ...(nextValue.toUpperCase() === prev.typingPhrase
                      ? { isUnlocked: true, isPlaying: true, inputValue: "" }
                      : {}),
                  }))
                }}
                placeholder="Digite aqui..."
                className="text-center text-lg font-mono uppercase tracking-wider"
                autoFocus
              />

              <div className="mt-4 flex justify-center gap-1">
                {gameState.typingPhrase.split("").map((char, i) => {
                  const typed = gameState.inputValue.toUpperCase()[i]
                  const isCorrect = typed === char
                  const isTyped = i < gameState.inputValue.length

                  return (
                    <span
                      key={i}
                      className={`w-3 h-1 rounded-full transition-colors ${
                        isTyped ? (isCorrect ? "bg-green-500" : "bg-red-500") : "bg-muted"
                      }`}
                    />
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gameState.isUnlocked && !gameCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold">{gameState.score} pts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {discoveredSpecial}/{totalConnections} conexões especiais
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={resetGame}>
                <X className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>

            <AnimatePresence>
              {showTutorial && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-primary/10 p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <p className="text-sm">
                      <strong>Como jogar:</strong> Clique em duas empresas para descobrir conexões ocultas. Encontre
                      todas as combinações especiais!
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setShowTutorial(false)}>
                    Entendi
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {gameState.failedAttempts >= 3 && !gameState.showHint && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-yellow-500/10 p-4 flex items-center justify-between border-b border-yellow-500/20"
                >
                  <div className="flex items-center gap-3">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    <p className="text-sm text-yellow-200">Parece que você está com dificuldades. Quer uma dica?</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={getHint}
                    className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 bg-transparent"
                  >
                    Receber Palpite
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {gameState.showHint && gameState.currentHint && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-green-500/10 p-4 flex items-center justify-center gap-3 border-b border-green-500/20"
                >
                  <Lightbulb className="w-5 h-5 text-green-500" />
                  <p className="text-sm text-green-200">
                    <strong>Dica:</strong> Tente conectar{" "}
                    <span className="text-green-400 font-bold">
                      {companies.find((c) => c.id === gameState.currentHint!.from)?.name}
                    </span>{" "}
                    com{" "}
                    <span className="text-green-400 font-bold">
                      {companies.find((c) => c.id === gameState.currentHint!.to)?.name}
                    </span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative aspect-[16/10] min-h-[400px]">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {gameState.discoveredConnections.map((conn, i) => {
                  const fromPos = nodePositions[conn.from]
                  const toPos = nodePositions[conn.to]
                  if (!fromPos || !toPos) return null

                  const special = specialConnections.find(
                    (s) => (s.from === conn.from && s.to === conn.to) || (s.from === conn.to && s.to === conn.from),
                  )

                  return (
                    <motion.line
                      key={`${conn.from}-${conn.to}`}
                      x1={fromPos.x}
                      y1={fromPos.y}
                      x2={toPos.x}
                      y2={toPos.y}
                      stroke={special ? "#00d4ff" : "rgba(255,255,255,0.3)"}
                      strokeWidth={special ? 0.4 : 0.2}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )
                })}

                {gameState.selectedNodes.length === 1 && (
                  <motion.circle
                    cx={nodePositions[gameState.selectedNodes[0]]?.x}
                    cy={nodePositions[gameState.selectedNodes[0]]?.y}
                    r="3"
                    fill="none"
                    stroke="#00d4ff"
                    strokeWidth="0.2"
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </svg>

              {companies.map((company) => {
                const Icon = iconMap[company.icon] || Hub
                const pos = nodePositions[company.id]
                const isSelected = gameState.selectedNodes.includes(company.id)
                const isDiscovered = gameState.discoveredConnections.some(
                  (c) => c.from === company.id || c.to === company.id,
                )
                const isHinted =
                  gameState.currentHint &&
                  (gameState.currentHint.from === company.id || gameState.currentHint.to === company.id)

                return (
                  <motion.button
                    key={company.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNodeClick(company.id)}
                  >
                    <motion.div
                      className={`relative p-3 md:p-4 rounded-xl transition-all duration-200 ${
                        isHinted ? "ring-2 ring-green-500 ring-offset-2 ring-offset-background" : ""
                      }`}
                      style={{
                        backgroundColor: isSelected
                          ? company.color
                          : isDiscovered
                            ? `${company.color}50`
                            : `${company.color}20`,
                        boxShadow: isSelected ? `0 0 20px ${company.color}80, 0 0 40px ${company.color}40` : "none",
                      }}
                      animate={{
                        scale: isSelected ? 1.1 : isHinted ? [1, 1.1, 1] : 1,
                      }}
                      transition={isHinted ? { duration: 1, repeat: Number.POSITIVE_INFINITY } : undefined}
                    >
                      <Icon
                        className="w-5 h-5 md:w-6 md:h-6"
                        style={{
                          color: isSelected ? "#fff" : company.color,
                        }}
                      />

                      {isDiscovered && !isSelected && (
                        <CheckCircle2 className="absolute -top-1 -right-1 w-4 h-4 text-green-500" fill="currentColor" />
                      )}
                    </motion.div>

                    <span
                      className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs whitespace-nowrap font-medium ${
                        isHinted ? "text-green-400" : ""
                      }`}
                      style={{ color: isSelected ? company.color : isHinted ? undefined : "inherit" }}
                    >
                      {company.name}
                    </span>
                  </motion.button>
                )
              })}
            </div>

            {gameState.discoveredConnections.length > 0 && (
              <div className="p-4 border-t border-border/50">
                <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Conexões Descobertas</h4>
                <div className="flex flex-wrap gap-2">
                  {gameState.discoveredConnections.map((conn, i) => {
                    const fromCompany = companies.find((c) => c.id === conn.from)
                    const toCompany = companies.find((c) => c.id === conn.to)
                    const isSpecial = specialConnections.some(
                      (s) => (s.from === conn.from && s.to === conn.to) || (s.from === conn.to && s.to === conn.from),
                    )

                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs ${
                          isSpecial
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        <span>{fromCompany?.name}</span>
                        <ArrowRight className="w-3 h-3" />
                        <span>{toCompany?.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gameCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass rounded-2xl p-8 max-w-md w-full text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500/30 to-primary/30 mb-6"
              >
                <PartyPopper className="w-12 h-12 text-yellow-500" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-500 to-primary bg-clip-text text-transparent"
              >
                Parabéns!
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground mb-4"
              >
                Você descobriu todas as conexões especiais do ecossistema Webyte Hub!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-2 text-primary font-bold text-2xl mb-6"
              >
                <Trophy className="w-8 h-8 text-yellow-500" />
                {gameState.score} pontos
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col gap-3"
              >
                <Button onClick={goToHub} className="w-full gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Explorar o Hub
                </Button>
                <Button variant="outline" onClick={resetGame} className="w-full bg-transparent">
                  Jogar Novamente
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gameState.showResult && gameState.lastResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeResult}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl p-8 max-w-md w-full text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6"
              >
                <Sparkles className="w-10 h-10 text-primary" />
              </motion.div>

              <h3 className="text-2xl font-bold mb-2">{gameState.lastResult.result}</h3>
              <p className="text-muted-foreground mb-4">{gameState.lastResult.description}</p>

              <div className="flex items-center justify-center gap-2 text-primary font-bold text-xl mb-6">
                <Trophy className="w-6 h-6" />+{gameState.lastResult.points} pontos
              </div>

              <Button onClick={closeResult} className="w-full">
                Continuar Explorando
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
