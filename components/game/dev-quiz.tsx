"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code2, Trophy, X, PartyPopper, ArrowRight, CheckCircle2, XCircle, Timer, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Question {
  id: number
  question: string
  code?: string
  options: string[]
  correct: number
  hint: string
  language: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "Qual é a saída deste código JavaScript?",
    code: `console.log(typeof null)`,
    options: ["null", "undefined", "object", "number"],
    correct: 2,
    hint: "É um bug histórico do JavaScript que nunca foi corrigido.",
    language: "JavaScript",
  },
  {
    id: 2,
    question: "Em Python, qual é a diferença entre '==' e 'is'?",
    options: [
      "Não há diferença",
      "'==' compara valores, 'is' compara identidade",
      "'is' compara valores, '==' compara identidade",
      "'is' é mais rápido que '=='",
    ],
    correct: 1,
    hint: "Pense em objetos na memória.",
    language: "Python",
  },
  {
    id: 3,
    question: "Qual hook do React é usado para efeitos colaterais?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correct: 1,
    hint: "É usado para operações como fetch de dados, subscriptions, etc.",
    language: "React",
  },
  {
    id: 4,
    question: "O que significa CSS?",
    options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
    correct: 2,
    hint: "A primeira palavra descreve como os estilos são aplicados em hierarquia.",
    language: "CSS",
  },
  {
    id: 5,
    question: "Qual é a saída deste código TypeScript?",
    code: `const arr = [1, 2, 3];
console.log([...arr].reverse() === arr)`,
    options: ["true", "false", "undefined", "Error"],
    correct: 1,
    hint: "Spread operator cria uma nova referência.",
    language: "TypeScript",
  },
  {
    id: 6,
    question: "Em SQL, qual comando é usado para remover duplicatas?",
    options: ["UNIQUE", "DISTINCT", "REMOVE DUPLICATES", "FILTER"],
    correct: 1,
    hint: "É usado após SELECT.",
    language: "SQL",
  },
  {
    id: 7,
    question: "O que faz o operador '??' em JavaScript?",
    options: ["Operador ternário", "Nullish coalescing", "Optional chaining", "Spread operator"],
    correct: 1,
    hint: "Retorna o lado direito quando o esquerdo é null ou undefined.",
    language: "JavaScript",
  },
  {
    id: 8,
    question: "Qual método HTTP é idempotente?",
    options: ["POST", "PUT", "PATCH", "Nenhum"],
    correct: 1,
    hint: "Múltiplas requisições idênticas produzem o mesmo resultado.",
    language: "REST API",
  },
  {
    id: 9,
    question: "Em Git, qual comando desfaz o último commit mantendo as alterações?",
    options: ["git revert HEAD", "git reset --soft HEAD~1", "git reset --hard HEAD~1", "git checkout HEAD~1"],
    correct: 1,
    hint: "Soft mantém as alterações no staging area.",
    language: "Git",
  },
  {
    id: 10,
    question: "Qual é a complexidade de tempo do algoritmo de busca binária?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correct: 1,
    hint: "Divide o array pela metade a cada iteração.",
    language: "Algoritmos",
  },
]

interface DevQuizProps {
  onClose: () => void
}

export function DevQuiz({ onClose }: DevQuizProps) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [wrongAttempts, setWrongAttempts] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [usedHint, setUsedHint] = useState(false)

  // Timer para cada pergunta
  useEffect(() => {
    if (showResult || gameCompleted) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAnswer(-1) // Tempo esgotado
          return 30
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuestion, showResult, gameCompleted])

  const handleAnswer = useCallback(
    (answerIndex: number) => {
      const question = questions[currentQuestion]
      const correct = answerIndex === question.correct

      setSelectedAnswer(answerIndex)
      setIsCorrect(correct)
      setShowResult(true)

      if (correct) {
        // Mais pontos se não usou dica e foi rápido
        const basePoints = 100
        const timeBonus = Math.floor(timeLeft * 2)
        const hintPenalty = usedHint ? 30 : 0
        setScore((prev) => prev + basePoints + timeBonus - hintPenalty)
      } else {
        setWrongAttempts((prev) => prev + 1)
      }
    },
    [currentQuestion, timeLeft, usedHint],
  )

  const nextQuestion = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setShowHint(false)
      setUsedHint(false)
      setTimeLeft(30)
    } else {
      setGameCompleted(true)
    }
  }, [currentQuestion])

  const goToHub = useCallback(() => {
    router.push("/hub")
  }, [router])

  const restartGame = useCallback(() => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameCompleted(false)
    setShowHint(false)
    setWrongAttempts(0)
    setTimeLeft(30)
    setUsedHint(false)
  }, [])

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
    >
      <AnimatePresence mode="wait">
        {!gameCompleted ? (
          <motion.div
            key="quiz"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass rounded-2xl p-6 max-w-2xl w-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  <span className="font-bold">Dev Quiz</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">{score} pts</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>
                  Pergunta {currentQuestion + 1} de {questions.length}
                </span>
                <span className={`flex items-center gap-1 ${timeLeft <= 10 ? "text-red-500" : ""}`}>
                  <Timer className="w-4 h-4" />
                  {timeLeft}s
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 rounded-md bg-primary/20 text-primary text-xs font-medium">
                  {question.language}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-4">{question.question}</h3>

              {question.code && (
                <pre className="bg-secondary/50 rounded-lg p-4 mb-4 overflow-x-auto">
                  <code className="text-sm font-mono text-primary">{question.code}</code>
                </pre>
              )}

              {/* Hint button */}
              {!showResult && wrongAttempts >= 1 && !showHint && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowHint(true)
                    setUsedHint(true)
                  }}
                  className="mb-4 gap-2 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10"
                >
                  <Lightbulb className="w-4 h-4" />
                  Preciso de uma dica
                </Button>
              )}

              {/* Hint display */}
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-4"
                  >
                    <div className="flex items-center gap-2 text-yellow-500">
                      <Lightbulb className="w-4 h-4" />
                      <span className="text-sm">{question.hint}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Options */}
            <div className="grid gap-3 mb-6">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrectAnswer = index === question.correct
                const showCorrect = showResult && isCorrectAnswer
                const showWrong = showResult && isSelected && !isCorrectAnswer

                return (
                  <motion.button
                    key={index}
                    onClick={() => !showResult && handleAnswer(index)}
                    disabled={showResult}
                    className={`p-4 rounded-xl text-left transition-all ${
                      showCorrect
                        ? "bg-green-500/20 border-2 border-green-500"
                        : showWrong
                          ? "bg-red-500/20 border-2 border-red-500"
                          : isSelected
                            ? "bg-primary/20 border-2 border-primary"
                            : "bg-secondary/50 border-2 border-transparent hover:bg-secondary"
                    }`}
                    whileHover={!showResult ? { scale: 1.02 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center justify-between">
                      <span className={showCorrect ? "text-green-400" : showWrong ? "text-red-400" : ""}>{option}</span>
                      {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                      {showWrong && <XCircle className="w-5 h-5 text-red-500" />}
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Result and Next */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between"
                >
                  <div className={`flex items-center gap-2 ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-medium">Correto!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5" />
                        <span className="font-medium">Incorreto</span>
                      </>
                    )}
                  </div>
                  <Button onClick={nextQuestion} className="gap-2">
                    {currentQuestion < questions.length - 1 ? "Próxima" : "Ver Resultado"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="completed"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="glass rounded-2xl p-8 max-w-md w-full text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500/30 to-primary/30 mb-6"
            >
              <PartyPopper className="w-12 h-12 text-green-500" />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-500 to-primary bg-clip-text text-transparent"
            >
              Parabéns, Dev!
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground mb-4"
            >
              Você completou o quiz e testou seus conhecimentos em desenvolvimento!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 text-primary font-bold text-2xl mb-6"
            >
              <Trophy className="w-8 h-8 text-yellow-500" />
              {score} pontos
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-muted-foreground mb-6"
            >
              {score >= 800
                ? "Excelente! Você é um dev experiente!"
                : score >= 500
                  ? "Muito bom! Continue estudando!"
                  : "Continue praticando para melhorar!"}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-3"
            >
              <Button onClick={goToHub} className="w-full gap-2">
                <ArrowRight className="w-4 h-4" />
                Explorar o Hub
              </Button>
              <Button variant="outline" onClick={restartGame} className="w-full bg-transparent">
                Jogar Novamente
              </Button>
              <Button variant="ghost" onClick={onClose} className="w-full">
                Fechar
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
