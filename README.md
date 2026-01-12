# Webyte Hub

![Webyte Hub Logo](public/logo-white.png)

## Visão Geral

**Webyte Hub** é uma plataforma moderna de desenvolvimento web construída com Next.js 16, React 19 e Tailwind CSS v4.

- **Website:** [webytehub.com](https://webytehub.com)
- **Repositório:** [github.com/juniorwebyte/webyte-hub](https://github.com/juniorwebyte/webyte-hub)

---

## Índice

1. [Requisitos do Sistema](#requisitos-do-sistema)
2. [Instalação Local](#instalação-local)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Configuração de Variáveis de Ambiente](#configuração-de-variáveis-de-ambiente)
5. [Configuração do Countdown de Lançamento](#configuração-do-countdown-de-lançamento)
6. [Deploy em VPS (Ubuntu/Debian)](#deploy-em-vps-ubuntudebian)
7. [Configuração do Nginx](#configuração-do-nginx)
8. [Certificado SSL (HTTPS)](#certificado-ssl-https)
9. [PM2 - Gerenciador de Processos](#pm2---gerenciador-de-processos)
10. [Deploy com Docker](#deploy-com-docker)
11. [Deploy na Vercel](#deploy-na-vercel)
12. [Solução de Problemas](#solução-de-problemas)
13. [Contato](#contato)

---

## Requisitos do Sistema

| Requisito | Versão Mínima |
|-----------|---------------|
| Node.js | 18.17+ |
| npm/pnpm/yarn | Mais recente |
| Git | 2.0+ |
| Ubuntu/Debian | 20.04+ |
| Nginx | 1.18+ |

---

## Instalação Local

```bash
# 1. Clonar o repositório
git clone https://github.com/juniorwebyte/webyte-hub.git
cd webyte-hub

# 2. Instalar dependências
npm install

# 3. Criar arquivo de variáveis de ambiente
cp .env.example .env.local
# Edite o arquivo .env.local com suas configurações

# 4. Executar em modo desenvolvimento
npm run dev

# 5. Acessar no navegador
# http://localhost:3000
```

---

## Estrutura do Projeto

```
webyte-hub/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── contact/route.ts      # Endpoint de contato
│   │   ├── subscribe/route.ts    # Endpoint de newsletter
│   │   └── health/route.ts       # Health check para monitoramento
│   ├── docs/page.tsx             # Página de documentação
│   ├── globals.css               # Estilos globais (Tailwind v4)
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página inicial
├── components/                   # Componentes React
│   ├── ui/                       # Componentes shadcn/ui
│   ├── header.tsx                # Cabeçalho com navegação
│   ├── footer.tsx                # Rodapé com redes sociais
│   ├── hero-section.tsx          # Seção hero com countdown
│   ├── about-section.tsx         # Seção sobre nós
│   ├── contact-section.tsx       # Formulário de contato
│   ├── countdown-timer.tsx       # Timer regressivo
│   └── particle-background.tsx   # Animação de partículas
├── public/                       # Assets estáticos
├── .env.example                  # Exemplo de variáveis de ambiente
├── .env.local                    # Variáveis de ambiente (não commitado)
├── Dockerfile                    # Configuração Docker
├── docker-compose.yml            # Orquestração Docker
├── next.config.mjs               # Configuração do Next.js
└── README.md                     # Esta documentação
```

---

## Configuração de Variáveis de Ambiente

### Variáveis Obrigatórias

Crie um arquivo `.env.local` na raiz do projeto (copie de `.env.example`):

```env
# OBRIGATÓRIO - Configuração de Email
RESEND_API_KEY=re_XXXXXXXXXXXXXXXXXXXXXXXX    # Sua API Key do Resend
CONTACT_EMAIL=seu-email@dominio.com           # Email para receber contatos

# OBRIGATÓRIO - URL do Site
NEXT_PUBLIC_SITE_URL=https://seudominio.com
```

### Variáveis Opcionais

```env
# Email remetente (padrão: onboarding@resend.dev)
RESEND_FROM_EMAIL=contato@seudominio.com

# Data de lançamento para o countdown (padrão: 2026-03-01T00:00:00)
NEXT_PUBLIC_LAUNCH_DATE=2026-06-15T00:00:00

# WhatsApp (padrão: 5511999999999)
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
NEXT_PUBLIC_WHATSAPP_MESSAGE=Olá! Vim pelo site...

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Configuração do Countdown de Lançamento

O countdown é configurado através da variável de ambiente `NEXT_PUBLIC_LAUNCH_DATE`.

### Formato da Data

Use o formato ISO 8601: `YYYY-MM-DDTHH:mm:ss`

| Parte | Descrição | Exemplo |
|-------|-----------|---------|
| YYYY | Ano com 4 dígitos | 2026 |
| MM | Mês com 2 dígitos | 03 (março) |
| DD | Dia com 2 dígitos | 01 |
| HH | Hora (24h) | 00 |
| mm | Minutos | 00 |
| ss | Segundos | 00 |

### Exemplos de Configuração

```env
# Lançamento em 1 de Março de 2026 à meia-noite
NEXT_PUBLIC_LAUNCH_DATE=2026-03-01T00:00:00

# Lançamento em 15 de Junho de 2026 às 10h da manhã
NEXT_PUBLIC_LAUNCH_DATE=2026-06-15T10:00:00

# Lançamento em 31 de Dezembro de 2025 às 23:59
NEXT_PUBLIC_LAUNCH_DATE=2025-12-31T23:59:00
```

### Como Alterar a Data

1. Edite o arquivo `.env.local`
2. Altere o valor de `NEXT_PUBLIC_LAUNCH_DATE`
3. Reinicie a aplicação:
   ```bash
   # Em desenvolvimento
   npm run dev
   
   # Em produção (PM2)
   pm2 restart webyte-hub
   
   # Em produção (Docker)
   docker-compose restart
   ```

---

## Deploy em VPS (Ubuntu/Debian)

### Passo 1: Preparar o Servidor

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git build-essential
```

### Passo 2: Instalar Node.js 20 LTS

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # Deve mostrar v20.x.x
```

### Passo 3: Instalar PM2

```bash
sudo npm install -g pm2
```

### Passo 4: Clonar e Configurar

```bash
mkdir -p ~/apps && cd ~/apps
git clone https://github.com/juniorwebyte/webyte-hub.git
cd webyte-hub
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
nano .env.local  # Edite com suas configurações
```

### Passo 5: Build e Iniciar

```bash
npm run build
pm2 start npm --name "webyte-hub" -- start
pm2 save
pm2 startup  # Execute o comando que aparecer
```

---

## Configuração do Nginx

```bash
sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/webytehub.com
```

Configuração completa:

```nginx
server {
    listen 80;
    server_name webytehub.com www.webytehub.com;
    return 301 https://webytehub.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name webytehub.com;

    ssl_certificate /etc/letsencrypt/live/webytehub.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/webytehub.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

Ativar o site:

```bash
sudo ln -s /etc/nginx/sites-available/webytehub.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Certificado SSL (HTTPS)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d webytehub.com -d www.webytehub.com
sudo certbot renew --dry-run  # Testar renovação automática
```

---

## PM2 - Gerenciador de Processos

### Comandos Úteis

```bash
pm2 status              # Ver status
pm2 logs webyte-hub     # Ver logs
pm2 restart webyte-hub  # Reiniciar
pm2 stop webyte-hub     # Parar
pm2 monit               # Monitoramento em tempo real
```

### Configuração Avançada (ecosystem.config.js)

```javascript
module.exports = {
  apps: [{
    name: 'webyte-hub',
    script: 'npm',
    args: 'start',
    cwd: '/home/webyte/apps/webyte-hub',
    instances: 'max',
    exec_mode: 'cluster',
    autorestart: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

---

## Deploy com Docker

### Build e Execução

```bash
# Build da imagem
docker build -t webyte-hub .

# Executar com Docker Compose
docker-compose up -d

# Ver logs
docker logs -f webyte-hub
```

### Health Check

O endpoint `/api/health` retorna o status da aplicação:

```bash
curl http://localhost:3000/api/health
# {"status":"ok","timestamp":"...","env":{"resend":true,"contactEmail":true}}
```

---

## Deploy na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Conecte sua conta GitHub
3. Importe o repositório `webyte-hub`
4. Configure as variáveis de ambiente:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_LAUNCH_DATE`
5. Clique em **Deploy**

---

## Solução de Problemas

### Erro: "Port 3000 already in use"

```bash
sudo lsof -i :3000
sudo kill -9 PID
pm2 restart webyte-hub
```

### Erro: "502 Bad Gateway"

```bash
pm2 status
pm2 logs webyte-hub
sudo tail -f /var/log/nginx/webytehub.error.log
```

### Atualizar o Projeto

```bash
cd ~/apps/webyte-hub
pm2 stop webyte-hub
git pull origin main
npm install
npm run build
pm2 restart webyte-hub
```

---

## Contato

- **Website:** [webytehub.com](https://webytehub.com)
- **E-mail:** juniorwci70@gmail.com
- **Instagram:** [@webytehub](https://www.instagram.com/webytehub/)
- **GitHub:** [juniorwebyte](https://github.com/juniorwebyte)
- **LinkedIn:** [Júnior Alves](https://www.linkedin.com/in/j%C3%BAnior-alves-6a625049/)

---

Desenvolvido com dedicação pela equipe **Webyte Hub**
