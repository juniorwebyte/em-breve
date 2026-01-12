"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { companies, categoryLabels, type Company } from "@/lib/companies-data"
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
  Calendar,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

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

const statusLabels = {
  active: "Ativo",
  development: "Em Desenvolvimento",
  planned: "Planejado",
}

const statusColors = {
  active: "bg-green-500",
  development: "bg-yellow-500",
  planned: "bg-blue-500",
}

export function Timeline() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const sortedCompanies = [...companies].sort((a, b) => a.year - b.year)
  const years = [...new Set(sortedCompanies.map((c) => c.year))]

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
            Nossa <span className="text-primary">Jornada</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Conheça a evolução do ecossistema Webyte Hub através dos anos
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Linha central - apenas desktop */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-primary/50 rounded-full hidden md:block" />

          {years.map((year) => {
            const yearCompanies = sortedCompanies.filter((c) => c.year === year)

            return (
              <div key={year} className="mb-10 md:mb-16">
                {/* Ano */}
                <div className="flex justify-center mb-6 md:mb-8">
                  <div className="bg-primary text-primary-foreground px-4 md:px-6 py-1.5 md:py-2 rounded-full font-bold text-sm md:text-lg flex items-center gap-2 z-10">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                    {year}
                  </div>
                </div>

                {/* Empresas do ano */}
                <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                  {yearCompanies.map((company, index) => {
                    const Icon = iconMap[company.icon] || Hub
                    const isLeft = index % 2 === 0

                    return (
                      <div
                        key={company.id}
                        className={`${!isMobile && (isLeft ? "md:pr-12" : "md:pl-12 md:col-start-2")}`}
                      >
                        <div
                          onClick={() => setSelectedCompany(company)}
                          className="bg-secondary/20 md:bg-secondary/30 border border-border/50 rounded-xl p-4 md:p-6 cursor-pointer group relative overflow-hidden hover:border-primary/30 transition-colors"
                        >
                          <div className="relative z-10">
                            <div className="flex items-start gap-3 md:gap-4">
                              <div className="p-2 md:p-3 rounded-lg" style={{ backgroundColor: `${company.color}20` }}>
                                <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: company.color }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-bold text-base md:text-lg truncate">{company.name}</h3>
                                  <span
                                    className={`w-2 h-2 rounded-full flex-shrink-0 ${statusColors[company.status]}`}
                                  />
                                </div>
                                <p className="text-xs md:text-sm text-muted-foreground mb-2 line-clamp-2">
                                  {company.description}
                                </p>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span
                                    className="text-[10px] md:text-xs px-2 py-0.5 rounded-full"
                                    style={{
                                      backgroundColor: `${company.color}20`,
                                      color: company.color,
                                    }}
                                  >
                                    {categoryLabels[company.category]}
                                  </span>
                                  <span className="text-[10px] md:text-xs text-muted-foreground">
                                    {statusLabels[company.status]}
                                  </span>
                                </div>
                              </div>
                              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground flex-shrink-0" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal de detalhes */}
      {selectedCompany && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCompany(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-background border border-border rounded-2xl p-6 md:p-8 max-w-lg w-full relative max-h-[80vh] overflow-y-auto"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 md:top-4 md:right-4"
              onClick={() => setSelectedCompany(null)}
            >
              <X className="w-5 h-5" />
            </Button>

            {(() => {
              const Icon = iconMap[selectedCompany.icon] || Hub
              return (
                <>
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-4 md:mb-6"
                    style={{ backgroundColor: `${selectedCompany.color}20` }}
                  >
                    <Icon className="w-7 h-7 md:w-8 md:h-8" style={{ color: selectedCompany.color }} />
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold mb-2">{selectedCompany.name}</h3>

                  <div className="flex items-center gap-2 md:gap-3 mb-4 flex-wrap">
                    <span
                      className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${selectedCompany.color}20`,
                        color: selectedCompany.color,
                      }}
                    >
                      {categoryLabels[selectedCompany.category]}
                    </span>
                    <span className="text-xs md:text-sm text-muted-foreground flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${statusColors[selectedCompany.status]}`} />
                      {statusLabels[selectedCompany.status]}
                    </span>
                    <span className="text-xs md:text-sm text-muted-foreground">Desde {selectedCompany.year}</span>
                  </div>

                  <p className="text-sm md:text-base text-muted-foreground mb-6">{selectedCompany.longDescription}</p>

                  {selectedCompany.connections.length > 0 && (
                    <div>
                      <h4 className="text-xs md:text-sm font-semibold mb-3 text-muted-foreground">Integrações</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCompany.connections.map((connId) => {
                          const conn = companies.find((c) => c.id === connId)
                          if (!conn) return null
                          const ConnIcon = iconMap[conn.icon] || Hub
                          return (
                            <button
                              key={connId}
                              onClick={() => setSelectedCompany(conn)}
                              className="flex items-center gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-xs md:text-sm"
                            >
                              <ConnIcon className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: conn.color }} />
                              {conn.name}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </>
              )
            })()}
          </div>
        </div>
      )}
    </section>
  )
}
