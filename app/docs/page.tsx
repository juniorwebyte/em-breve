import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Book,
  Code,
  Palette,
  Rocket,
  Server,
  Smartphone,
  Globe,
  Zap,
  Shield,
  Terminal,
  Database,
  Settings,
  CheckCircle,
  Lock,
  RefreshCw,
  HardDrive,
  Cpu,
  Network,
  History,
  GitBranch,
  Bug,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Documentação Técnica | Webyte Hub",
  description:
    "Documentação técnica completa da Webyte Hub - Guia de instalação, configuração e deploy para qualquer ambiente",
}

const services = [
  {
    icon: Code,
    title: "Desenvolvimento Web",
    description: "Criamos sites e aplicações web modernas utilizando as tecnologias mais avançadas do mercado.",
    features: ["React & Next.js", "TypeScript", "APIs RESTful", "Integração com bancos de dados"],
  },
  {
    icon: Smartphone,
    title: "Aplicativos Mobile",
    description: "Desenvolvemos aplicativos nativos e híbridos para iOS e Android.",
    features: ["React Native", "Flutter", "Apps nativos", "PWA (Progressive Web Apps)"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Design centrado no usuário para criar experiências digitais memoráveis.",
    features: ["Prototipagem", "Design System", "Testes de usabilidade", "Acessibilidade"],
  },
  {
    icon: Server,
    title: "Infraestrutura & DevOps",
    description: "Soluções de infraestrutura escaláveis e automatizadas.",
    features: ["Cloud (AWS, GCP, Azure)", "CI/CD", "Docker & Kubernetes", "Monitoramento"],
  },
  {
    icon: Globe,
    title: "SEO & Performance",
    description: "Otimização para mecanismos de busca e performance web.",
    features: ["Core Web Vitals", "SEO técnico", "Análise de dados", "Otimização de conversão"],
  },
  {
    icon: Shield,
    title: "Segurança Digital",
    description: "Protegemos seus sistemas e dados contra ameaças cibernéticas.",
    features: ["Auditorias de segurança", "LGPD compliance", "SSL/TLS", "Backup & Recovery"],
  },
]

const technologies = [
  { name: "Next.js 16", category: "Frontend" },
  { name: "React 19", category: "Frontend" },
  { name: "TypeScript", category: "Linguagem" },
  { name: "Tailwind CSS v4", category: "Estilização" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Banco de Dados" },
  { name: "Prisma", category: "ORM" },
  { name: "Vercel", category: "Deploy" },
  { name: "AWS", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
]

const changelog = [
  {
    version: "1.2.0",
    date: "2026-01-11",
    type: "feature" as const,
    title: "Jogos Interativos",
    changes: [
      "Adicionado jogo Webyte Explorer com sistema de conexões",
      "Adicionado Dev Quiz para desenvolvedores (digite 'DEV')",
      "Sistema de palpites para jogadores com dificuldade",
      "Tela de parabéns com redirecionamento para HUB",
      "Botões de acesso direto aos jogos no mobile",
    ],
  },
  {
    version: "1.1.0",
    date: "2026-01-10",
    type: "improvement" as const,
    title: "Otimização de Performance",
    changes: [
      "Partículas desabilitadas no mobile para melhor desempenho",
      "Animações simplificadas em dispositivos móveis",
      "Redução de blur effects e glow no mobile",
      "Componentes do HUB otimizados (Timeline, Ecosystem Map)",
      "Lazy loading implementado em componentes pesados",
    ],
  },
  {
    version: "1.0.5",
    date: "2026-01-09",
    type: "fix" as const,
    title: "Correções de Navegação",
    changes: [
      "Corrigido scroll suave para links âncora",
      "Corrigido link 'Início' no rodapé",
      "Melhorado comportamento do header no scroll",
      "Corrigido erro de build com Resend API",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-01-08",
    type: "feature" as const,
    title: "Lançamento Inicial",
    changes: [
      "Landing page completa com countdown",
      "Página HUB com ecossistema de empresas",
      "Timeline interativa das empresas",
      "Mapa do ecossistema com conexões",
      "Formulário de contato funcional",
      "Newsletter com Resend",
      "Documentação técnica completa",
    ],
  },
]

const typeIcons = {
  feature: Sparkles,
  improvement: Zap,
  fix: Bug,
}

const typeColors = {
  feature: "text-green-500 bg-green-500/10",
  improvement: "text-blue-500 bg-blue-500/10",
  fix: "text-orange-500 bg-orange-500/10",
}

const typeLabels = {
  feature: "Novidade",
  improvement: "Melhoria",
  fix: "Correção",
}

function CodeBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="relative">
      {title && (
        <div className="flex items-center justify-between px-3 md:px-4 py-2 bg-background/60 border-b border-border/50 rounded-t-lg">
          <span className="text-xs text-muted-foreground font-medium">{title}</span>
        </div>
      )}
      <div
        className={`bg-background/80 p-3 md:p-4 font-mono text-xs md:text-sm overflow-x-auto ${title ? "rounded-b-lg" : "rounded-lg"}`}
      >
        <pre className="text-foreground whitespace-pre">{children}</pre>
      </div>
    </div>
  )
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo-white.png"
              alt="Webyte Hub"
              width={150}
              height={40}
              className="h-7 md:h-8 w-auto object-contain"
            />
          </Link>
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-sm">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Voltar ao site</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-12 md:py-20 px-4 overflow-hidden">
        <div className="hidden md:block absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
        <div className="hidden md:block absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px]" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-secondary/50 border border-border/50 mb-4 md:mb-6">
              <Book className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
              <span className="text-xs md:text-sm text-muted-foreground">Documentação Técnica Oficial</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 md:mb-6 text-balance">
              Documentação{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Webyte Hub</span>
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground">
              Guia completo de instalação, configuração e deploy para qualquer ambiente.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-6 md:py-8 px-4 border-t border-border/30">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {[
              { href: "#changelog", label: "Changelog" },
              { href: "#requisitos", label: "Requisitos" },
              { href: "#instalacao-local", label: "Instalação" },
              { href: "#variaveis-ambiente", label: "Variáveis" },
              { href: "#deploy-vps", label: "Deploy VPS" },
              { href: "#nginx", label: "Nginx" },
              { href: "#ssl", label: "SSL" },
              { href: "#docker", label: "Docker" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-xs md:text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="changelog" className="py-12 md:py-16 px-4 border-t border-border/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-3xl font-bold text-foreground mb-6 md:mb-8 flex items-center gap-3">
              <History className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              Changelog
            </h2>

            <div className="space-y-6 md:space-y-8">
              {changelog.map((release, index) => {
                const TypeIcon = typeIcons[release.type]
                return (
                  <div key={release.version} className="relative pl-6 md:pl-8 border-l-2 border-border/50">
                    {/* Dot */}
                    <div className="absolute left-0 top-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary -translate-x-1/2 md:-translate-x-1/2" />

                    <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/20 md:bg-secondary/30 border border-border/50">
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
                        <div className="flex items-center gap-2">
                          <GitBranch className="w-4 h-4 text-primary" />
                          <span className="font-bold text-base md:text-lg">v{release.version}</span>
                        </div>
                        <span className="text-xs md:text-sm text-muted-foreground">{release.date}</span>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${typeColors[release.type]}`}
                        >
                          <TypeIcon className="w-3 h-3" />
                          {typeLabels[release.type]}
                        </span>
                      </div>

                      <h3 className="font-semibold text-sm md:text-base mb-2 md:mb-3">{release.title}</h3>

                      <ul className="space-y-1.5 md:space-y-2">
                        {release.changes.map((change, changeIndex) => (
                          <li
                            key={changeIndex}
                            className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground"
                          >
                            <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section id="requisitos" className="py-12 md:py-16 px-4 border-t border-border/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-3xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-3">
              <Cpu className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              Requisitos do Sistema
            </h2>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/20 md:bg-secondary/30 border border-border/50">
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 md:mb-4 flex items-center gap-2">
                  <HardDrive className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  Desenvolvimento Local
                </h3>
                <ul className="space-y-2 md:space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Node.js 18.17 ou superior
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    npm, pnpm ou yarn
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Git 2.0+
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    VS Code (recomendado)
                  </li>
                </ul>
              </div>

              <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/20 md:bg-secondary/30 border border-border/50">
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 md:mb-4 flex items-center gap-2">
                  <Server className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  Servidor VPS
                </h3>
                <ul className="space-y-2 md:space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Ubuntu 20.04+ ou Debian 11+
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    1GB RAM (2GB recomendado)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Nginx 1.18+
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Domínio configurado (DNS)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Installation Section */}
      <section id="instalacao-local" className="py-12 md:py-16 px-4 border-t border-border/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-3xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-3">
              <Terminal className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              Instalação Local
            </h2>

            <div className="space-y-4 md:space-y-6">
              <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/20 md:bg-secondary/30 border border-border/50">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">
                  1. Clonar o Repositório
                </h3>
                <CodeBlock>{`git clone https://github.com/juniorwebyte/webyte-hub.git
cd webyte-hub`}</CodeBlock>
              </div>

              <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/20 md:bg-secondary/30 border border-border/50">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">
                  2. Instalar Dependências
                </h3>
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">Com npm:</p>
                    <CodeBlock>npm install</CodeBlock>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">Com pnpm (recomendado):</p>
                    <CodeBlock>pnpm install</CodeBlock>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/20 md:bg-secondary/30 border border-border/50">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">
                  3. Configurar Variáveis de Ambiente
                </h3>
                <CodeBlock>{`cp .env.example .env.local
nano .env.local`}</CodeBlock>
              </div>

              <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/20 md:bg-secondary/30 border border-border/50">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">
                  4. Executar o Projeto
                </h3>
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">Modo desenvolvimento:</p>
                    <CodeBlock>npm run dev</CodeBlock>
                    <p className="text-xs text-muted-foreground mt-2">Acesse: http://localhost:3000</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">Build de produção:</p>
                    <CodeBlock>{`npm run build
npm run start`}</CodeBlock>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environment Variables Section */}
      <section id="variaveis-ambiente" className="py-12 md:py-16 px-4 border-t border-border/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-3xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-3">
              <Settings className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              Variáveis de Ambiente
            </h2>

            <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/20 md:bg-secondary/30 border border-border/50">
              <p className="text-sm text-muted-foreground mb-4">
                Crie um arquivo{" "}
                <code className="px-2 py-1 bg-background/80 rounded text-primary text-xs">.env.local</code> na raiz do
                projeto:
              </p>
              <CodeBlock title=".env.local">{`# EMAIL (RESEND)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev
CONTACT_EMAIL=seu@email.com

# SITE
NEXT_PUBLIC_SITE_URL=https://seudominio.com

# ANALYTICS (OPCIONAL)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`}</CodeBlock>

              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-500 text-xs md:text-sm flex items-start gap-2">
                  <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Importante:</strong> Nunca commite o arquivo .env.local no Git.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VPS Deploy Section */}
      <section id="deploy-vps" className="py-12 md:py-16 px-4 border-t border-border/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-3xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-3">
              <Server className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              Deploy em VPS
            </h2>

            <div className="space-y-4 md:space-y-6">
              <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/20 md:bg-secondary/30 border border-border/50">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/20 text-primary text-xs md:text-sm flex items-center justify-center">
                    1
                  </span>
                  Preparar o Servidor
                </h3>
                <CodeBlock>{`sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git build-essential`}</CodeBlock>
              </div>

              <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/20 md:bg-secondary/30 border border-border/50">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/20 text-primary text-xs md:text-sm flex items-center justify-center">
                    2
                  </span>
                  Instalar Node.js 20
                </h3>
                <CodeBlock>{`curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version`}</CodeBlock>
              </div>

              <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/20 md:bg-secondary/30 border border-border/50">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/20 text-primary text-xs md:text-sm flex items-center justify-center">
                    3
                  </span>
                  Instalar PM2
                </h3>
                <CodeBlock>{`sudo npm install -g pm2
pm2 --version`}</CodeBlock>
              </div>

              <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/20 md:bg-secondary/30 border border-border/50">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/20 text-primary text-xs md:text-sm flex items-center justify-center">
                    4
                  </span>
                  Clonar e Configurar
                </h3>
                <CodeBlock>{`mkdir -p ~/apps && cd ~/apps
git clone https://github.com/juniorwebyte/webyte-hub.git
cd webyte-hub
npm install
nano .env.local`}</CodeBlock>
              </div>

              <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/20 md:bg-secondary/30 border border-border/50">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/20 text-primary text-xs md:text-sm flex items-center justify-center">
                    5
                  </span>
                  Build e Iniciar
                </h3>
                <CodeBlock>{`npm run build
pm2 start npm --name "webyte-hub" -- start
pm2 save
pm2 startup`}</CodeBlock>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nginx Section */}
      <section id="nginx" className="py-12 md:py-16 px-4 border-t border-border/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-3xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-3">
              <Network className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              Configuração do Nginx
            </h2>

            <div className="space-y-4 md:space-y-6">
              <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/20 md:bg-secondary/30 border border-border/50">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">1. Instalar Nginx</h3>
                <CodeBlock>sudo apt install -y nginx</CodeBlock>
              </div>

              <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/20 md:bg-secondary/30 border border-border/50">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">
                  2. Criar Configuração
                </h3>
                <CodeBlock>sudo nano /etc/nginx/sites-available/seusite.com</CodeBlock>
                <p className="text-xs md:text-sm text-muted-foreground mt-3 mb-3">Cole a configuração:</p>
                <CodeBlock title="nginx.conf">{`server {
    listen 80;
    server_name seusite.com www.seusite.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}`}</CodeBlock>
              </div>

              <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/20 md:bg-secondary/30 border border-border/50">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">3. Ativar o Site</h3>
                <CodeBlock>{`sudo ln -s /etc/nginx/sites-available/seusite.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx`}</CodeBlock>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SSL Section */}
      <section id="ssl" className="py-12 md:py-16 px-4 border-t border-border/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-3xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-3">
              <Lock className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              SSL/HTTPS
            </h2>

            <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/20 md:bg-secondary/30 border border-border/50">
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">Certbot</h3>
              <CodeBlock>{`sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d seusite.com -d www.seusite.com
sudo certbot renew --dry-run`}</CodeBlock>

              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-500 text-xs md:text-sm flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>O Certbot renova automaticamente a cada 90 dias.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PM2 Section */}
      <section id="pm2" className="py-12 md:py-16 px-4 border-t border-border/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-3xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-3">
              <RefreshCw className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              PM2 - Comandos Úteis
            </h2>

            <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/20 md:bg-secondary/30 border border-border/50">
              <CodeBlock>{`pm2 status          # Ver status
pm2 logs webyte-hub # Ver logs
pm2 restart webyte-hub
pm2 stop webyte-hub
pm2 monit           # Monitoramento`}</CodeBlock>
            </div>
          </div>
        </div>
      </section>

      {/* Docker Section */}
      <section id="docker" className="py-12 md:py-16 px-4 border-t border-border/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-3xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-3">
              <Database className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              Deploy com Docker
            </h2>

            <div className="space-y-4 md:space-y-6">
              <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/20 md:bg-secondary/30 border border-border/50">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">Dockerfile</h3>
                <CodeBlock title="Dockerfile">{`FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]`}</CodeBlock>
              </div>

              <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/20 md:bg-secondary/30 border border-border/50">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">Comandos</h3>
                <CodeBlock>{`docker build -t webyte-hub .
docker run -d -p 3000:3000 --name webyte-hub webyte-hub
docker logs -f webyte-hub`}</CodeBlock>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicos" className="py-12 md:py-16 px-4 border-t border-border/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto mb-8 md:mb-12">
            <h2 className="text-xl md:text-3xl font-bold text-foreground mb-3 md:mb-4 flex items-center gap-3">
              <Rocket className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              Nossos Serviços
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground">
              Oferecemos uma gama completa de serviços para atender todas as suas necessidades digitais.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-secondary/20 md:bg-secondary/30 border border-border/50"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-4">
                  <service.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">{service.description}</p>
                <ul className="space-y-1.5 md:space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
                      <Zap className="w-3 h-3 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-12 md:py-16 px-4 border-t border-border/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto mb-8 md:mb-12">
            <h2 className="text-xl md:text-3xl font-bold text-foreground mb-3 md:mb-4 flex items-center gap-3">
              <Code className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              Tecnologias
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3 justify-center max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-secondary/50 border border-border/50"
              >
                <span className="text-xs md:text-sm text-foreground font-medium">{tech.name}</span>
                <span className="text-[10px] md:text-xs text-muted-foreground ml-1.5 md:ml-2">({tech.category})</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-20 px-4 border-t border-border/30">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">Precisa de ajuda?</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">Entre em contato pelo WhatsApp.</p>
            <a
              href="https://wa.me/5511999999999?text=Olá!%20Preciso%20de%20ajuda%20com%20o%20deploy."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Falar no WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 px-4 border-t border-border/30">
        <div className="container mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-3 md:mb-4">
            <a
              href="https://www.instagram.com/webytehub/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://github.com/juniorwebyte"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/j%C3%BAnior-alves-6a625049/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/juniorwebyte"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Twitter
            </a>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            © {new Date().getFullYear()} Webyte Hub. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
