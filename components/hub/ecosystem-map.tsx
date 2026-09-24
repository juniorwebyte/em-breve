"use client"

import type React from "react"

import { useState, useCallback, useMemo } from "react"
import { companies, categoryColors, categoryLabels, type Company } from "@/lib/companies-data"
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
} from "lucide-react"

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

const positions: Record<string, { x: number; y: number }> = {
  "webyte-hub": { x: 50, y: 50 },
  "vendi-aqui": { x: 25, y: 30 },
  "webyte-pay": { x: 75, y: 30 },
  "webyte-play": { x: 20, y: 60 },
  "webyte-music": { x: 35, y: 75 },
  "webyte-studios": { x: 15, y: 85 },
  "12aqui": { x: 80, y: 55 },
  "ploutos-ledger": { x: 85, y: 75 },
  "edupaz-academy": { x: 60, y: 85 },
  sigma: { x: 45, y: 20 },
  "add-proxy": { x: 65, y: 15 },
}

export function EcosystemMap() {
  const [activeCompany, setActiveCompany] = useState<Company | null>(null)
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null)
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  const activeConnections = useMemo(() => {
    if (!hoveredCompany) return []
    const company = companies.find((c) => c.id === hoveredCompany)
    return company?.connections || []
  }, [hoveredCompany])

  const getConnectionPath = useCallback((from: string, to: string) => {
    const fromPos = positions[from]
    const toPos = positions[to]
    if (!fromPos || !toPos) return ""

    const midX = (fromPos.x + toPos.x) / 2
    const midY = (fromPos.y + toPos.y) / 2 - 10

    return `M ${fromPos.x} ${fromPos.y} Q ${midX} ${midY} ${toPos.x} ${toPos.y}`
  }, [])

  if (isMobile) {
    return (
      <section className="py-12 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-3">
              Mapa do <span className="text-primary">Ecossistema</span>
            </h2>
            <p className="text-sm text-muted-foreground">Toque em uma empresa para ver detalhes</p>
          </div>

          {/* Legenda de categorias */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: categoryColors[key as keyof typeof categoryColors] }}
                />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>

          {/* Lista de empresas mobile */}
          <div className="grid grid-cols-2 gap-3">
            {companies.map((company) => {
              const Icon = iconMap[company.icon] || Hub
              return (
                <button
                  key={company.id}
                  onClick={() => setActiveCompany(activeCompany?.id === company.id ? null : company)}
                  className={`p-3 rounded-xl border transition-all text-left ${
                    activeCompany?.id === company.id
                      ? "bg-secondary/50 border-primary/50"
                      : "bg-secondary/20 border-border/50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${company.color}20` }}>
                      <Icon className="w-4 h-4" style={{ color: company.color }} />
                    </div>
                    <span className="text-sm font-medium truncate">{company.name}</span>
                  </div>
                  {activeCompany?.id === company.id && (
                    <p className="text-xs text-muted-foreground line-clamp-3">{company.description}</p>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mapa do <span className="text-primary">Ecossistema</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore as conexões entre as empresas do grupo. Passe o mouse sobre os nós para ver as integrações.
          </p>
        </div>

        {/* Legenda de categorias */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: categoryColors[key as keyof typeof categoryColors] }}
              />
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        {/* Mapa interativo */}
        <div className="relative w-full aspect-[16/9] max-h-[600px] bg-secondary/20 rounded-2xl overflow-hidden border border-border/50">
          {/* SVG para as conexões */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {companies.map((company) =>
              company.connections.map((connId) => {
                const isActive = hoveredCompany === company.id || hoveredCompany === connId

                return (
                  <path
                    key={`${company.id}-${connId}`}
                    d={getConnectionPath(company.id, connId)}
                    fill="none"
                    stroke={isActive ? company.color : "rgba(255,255,255,0.1)"}
                    strokeWidth={isActive ? 0.3 : 0.15}
                    className="transition-all duration-300"
                  />
                )
              }),
            )}
          </svg>

          {/* Nós das empresas */}
          {companies.map((company) => {
            const Icon = iconMap[company.icon] || Hub
            const pos = positions[company.id]
            const isHovered = hoveredCompany === company.id
            const isConnected = activeConnections.includes(company.id)
            const isActive = isHovered || isConnected || activeCompany?.id === company.id

            return (
              <div
                key={company.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: `translate(-50%, -50%) scale(${isActive ? 1.2 : 1})`,
                }}
                onMouseEnter={() => setHoveredCompany(company.id)}
                onMouseLeave={() => setHoveredCompany(null)}
                onClick={() => setActiveCompany(company)}
              >
                <div
                  className="p-3 md:p-4 rounded-xl transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? company.color : `${company.color}30`,
                    boxShadow: isActive ? `0 0 30px ${company.color}80` : "none",
                  }}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: isActive ? "#fff" : company.color }} />
                </div>

                {/* Nome da empresa */}
                {isActive && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap">
                    <div
                      className="px-3 py-1 rounded-lg text-xs font-medium"
                      style={{
                        backgroundColor: company.color,
                        color: "#fff",
                      }}
                    >
                      {company.name}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Info card quando clica em uma empresa */}
        {activeCompany && (
          <div className="mt-8 bg-secondary/30 border border-border/50 rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              {(() => {
                const Icon = iconMap[activeCompany.icon] || Hub
                return (
                  <div className="p-3 rounded-lg shrink-0" style={{ backgroundColor: `${activeCompany.color}20` }}>
                    <Icon className="w-6 h-6" style={{ color: activeCompany.color }} />
                  </div>
                )
              })()}
              <div>
                <h3 className="text-xl font-bold mb-1">{activeCompany.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{activeCompany.longDescription}</p>
                <div className="flex flex-wrap gap-2">
                  {activeCompany.connections.map((connId) => {
                    const conn = companies.find((c) => c.id === connId)
                    if (!conn) return null
                    return (
                      <span
                        key={connId}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: `${conn.color}20`,
                          color: conn.color,
                        }}
                      >
                        {conn.name}
                      </span>
                    )
                  })}
                </div>
              </div>
              <button
                onClick={() => setActiveCompany(null)}
                className="text-muted-foreground hover:text-foreground transition-colors ml-auto"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
