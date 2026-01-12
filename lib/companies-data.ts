export interface Company {
  id: string
  name: string
  description: string
  longDescription: string
  category: "technology" | "finance" | "education" | "entertainment" | "services"
  year: number
  color: string
  icon: string
  connections: string[]
  status: "active" | "development" | "planned"
}

export const companies: Company[] = [
  {
    id: "webyte-hub",
    name: "Webyte Hub",
    description: "Holding tecnológica do grupo",
    longDescription:
      "A Webyte Hub é a empresa-mãe que coordena e integra todas as soluções do ecossistema, fornecendo infraestrutura tecnológica e direcionamento estratégico para as subsidiárias.",
    category: "technology",
    year: 2020,
    color: "#00d4ff",
    icon: "Hub",
    connections: ["webyte-pay", "webyte-play", "webyte-studios", "vendi-aqui"],
    status: "active",
  },
  {
    id: "vendi-aqui",
    name: "Vendi Aqui",
    description: "Marketplace integrado",
    longDescription:
      "Plataforma de marketplace que conecta vendedores e compradores com soluções de pagamento integradas via WebytePay e logística otimizada.",
    category: "services",
    year: 2021,
    color: "#10b981",
    icon: "ShoppingCart",
    connections: ["webyte-pay", "ploutos-ledger"],
    status: "active",
  },
  {
    id: "webyte-pay",
    name: "WebytePay",
    description: "Soluções de pagamento digital",
    longDescription:
      "Fintech especializada em processamento de pagamentos, oferecendo gateway de pagamento, carteiras digitais e soluções B2B para empresas do ecossistema.",
    category: "finance",
    year: 2021,
    color: "#8b5cf6",
    icon: "CreditCard",
    connections: ["ploutos-ledger", "vendi-aqui", "12aqui"],
    status: "active",
  },
  {
    id: "webyte-play",
    name: "WebytePlay",
    description: "Plataforma de streaming e games",
    longDescription:
      "Plataforma de entretenimento digital que oferece streaming de conteúdo, jogos e experiências interativas integradas com Webyte Music.",
    category: "entertainment",
    year: 2022,
    color: "#f43f5e",
    icon: "Gamepad2",
    connections: ["webyte-music", "webyte-studios"],
    status: "active",
  },
  {
    id: "webyte-music",
    name: "Webyte Music",
    description: "Streaming de música",
    longDescription:
      "Serviço de streaming musical com curadoria inteligente, suporte a artistas independentes e integração com WebytePlay para experiências imersivas.",
    category: "entertainment",
    year: 2022,
    color: "#ec4899",
    icon: "Music",
    connections: ["webyte-play", "webyte-studios"],
    status: "active",
  },
  {
    id: "webyte-studios",
    name: "Webyte Studios",
    description: "Produção de conteúdo digital",
    longDescription:
      "Estúdio de produção de conteúdo audiovisual, jogos e experiências digitais. Fornece conteúdo exclusivo para WebytePlay e Webyte Music.",
    category: "entertainment",
    year: 2022,
    color: "#f97316",
    icon: "Film",
    connections: ["webyte-play", "webyte-music"],
    status: "active",
  },
  {
    id: "12aqui",
    name: "12Aqui",
    description: "Delivery e logística",
    longDescription:
      "Plataforma de delivery e logística urbana com integração de pagamentos via WebytePay e rastreamento em tempo real.",
    category: "services",
    year: 2023,
    color: "#eab308",
    icon: "Truck",
    connections: ["webyte-pay", "vendi-aqui"],
    status: "active",
  },
  {
    id: "ploutos-ledger",
    name: "PloutosLedger",
    description: "Gestão financeira e contábil",
    longDescription:
      "Sistema de gestão financeira e contabilidade baseado em blockchain para empresas, com integração nativa ao WebytePay para conciliação automática.",
    category: "finance",
    year: 2023,
    color: "#06b6d4",
    icon: "BookOpen",
    connections: ["webyte-pay", "vendi-aqui"],
    status: "active",
  },
  {
    id: "edupaz-academy",
    name: "EduPaz Academy",
    description: "Educação e capacitação",
    longDescription:
      "Plataforma educacional com cursos de tecnologia, empreendedorismo e desenvolvimento pessoal. Certificações reconhecidas pelo mercado.",
    category: "education",
    year: 2024,
    color: "#22c55e",
    icon: "GraduationCap",
    connections: ["sigma", "webyte-hub"],
    status: "active",
  },
  {
    id: "sigma",
    name: "Sigma",
    description: "Inteligência artificial e automação",
    longDescription:
      "Divisão de IA e machine learning que desenvolve soluções de automação inteligente para todo o ecossistema Webyte.",
    category: "technology",
    year: 2024,
    color: "#6366f1",
    icon: "Brain",
    connections: ["webyte-hub", "edupaz-academy", "add-proxy"],
    status: "development",
  },
  {
    id: "add-proxy",
    name: "ADDProxy",
    description: "Infraestrutura e segurança",
    longDescription:
      "Serviços de infraestrutura cloud, CDN e segurança cibernética. Fornece a espinha dorsal tecnológica para todas as empresas do grupo.",
    category: "technology",
    year: 2025,
    color: "#64748b",
    icon: "Shield",
    connections: ["webyte-hub", "sigma"],
    status: "planned",
  },
]

export const categoryColors = {
  technology: "#00d4ff",
  finance: "#8b5cf6",
  education: "#22c55e",
  entertainment: "#f43f5e",
  services: "#eab308",
}

export const categoryLabels = {
  technology: "Tecnologia",
  finance: "Finanças",
  education: "Educação",
  entertainment: "Entretenimento",
  services: "Serviços",
}
