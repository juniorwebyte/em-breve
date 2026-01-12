"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: string
}

interface TimeLeft {
  dias: number
  horas: number
  minutos: number
  segundos: number
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutos: Math.floor((difference / 1000 / 60) % 60),
          segundos: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const timeUnits = [
    { label: "Dias", value: timeLeft.dias },
    { label: "Horas", value: timeLeft.horas },
    { label: "Min", value: timeLeft.minutos },
    { label: "Seg", value: timeLeft.segundos },
  ]

  return (
    <div className="flex items-center justify-center gap-2 md:gap-6">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex items-center gap-2 md:gap-6">
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative w-14 h-14 md:w-24 md:h-24 bg-secondary/50 border border-border/50 rounded-xl md:rounded-2xl flex items-center justify-center md:group-hover:border-primary/50 transition-colors">
                <span className="text-xl md:text-4xl font-bold text-foreground tabular-nums">
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
            </div>
            <span className="mt-1 md:mt-2 text-[10px] md:text-sm text-muted-foreground uppercase tracking-wider">
              {unit.label}
            </span>
          </div>
          {index < timeUnits.length - 1 && (
            <span className="text-xl md:text-4xl text-primary font-bold md:animate-pulse">:</span>
          )}
        </div>
      ))}
    </div>
  )
}
