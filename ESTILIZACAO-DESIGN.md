# Documentação de Estilização, Design e Animações - Projeto Em Breve

Esta documentação descreve o sistema de design, estilos e animações do projeto **em-breve** (Webyte Hub), desenvolvidos com tecnologias modernas para proporcionar uma experiência premium e tecnológica. Este guia foi adaptado para facilitar a portabilidade para projetos PHP (como Laravel ou PHP puro).

---

## 1. Visão Geral do Design

O projeto segue uma estética **moderna, tecnológica e futurista** ("Tech/Cyberpunk-soft"), caracterizada por:
- **Tema Escuro Padrão**: Uso de tons profundos de cinza e azul escuro.
- **Transparência e Blur**: Efeito glassmorphism em badges e containers.
- **Tipografia Minimalista**: Foco na legibilidade e ar tecnológico com fontes modernas.
- **Interações Fluídas**: Micro-animações em botões e entradas de dados.

---

## 2. Paleta de Cores (OKLCH)

O projeto utiliza o espaço de cores **OKLCH**, que oferece cores mais vibrantes e consistentes entre navegadores modernos. No PHP/Tailwind, você pode definir essas variáveis no seu arquivo de estilos global.

### Variáveis CSS (Adicione ao seu `globals.css` ou `app.css`)

```css
:root {
  --background: oklch(0.145 0 0);          /* Fundo Escuro */
  --foreground: oklch(0.985 0 0);          /* Texto Claro */
  --primary: oklch(0.5 0.25 250);          /* Ciano/Azul Vibrante */
  --primary-foreground: oklch(0.985 0 0);  /* Texto sobre Primary */
  --accent: oklch(0.6 0.2 300);            /* Roxo/Acento */
  --card: oklch(0.18 0.01 250 / 0.5);      /* Cards Semi-transparentes */
  --border: oklch(0.25 0.02 250 / 0.5);    /* Bordas Sutis */
}
```

> [!TIP]
> Se o seu projeto PHP não usar Tailwind 4 ou OKLCH nativamente, você pode converter esses valores para HEX ou RGB, mas manterá o "feeling" se usar as mesmas proporções de contraste.

---

## 3. Tipografia

O projeto utiliza a família **Geist**, otimizada para legibilidade em ambientes de desenvolvimento e interfaces modernas.

- **Sans-Serif**: `Geist` (Inter ou Roboto como fallback).
- **Monospace**: `Geist Mono` (Fira Code ou JetBrains Mono como fallback).

No seu arquivo PHP/HTML:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/geist@1.3.0/dist/fonts/geist.css">
<style>
  body { font-family: 'Geist Sans', sans-serif; }
  code { font-family: 'Geist Mono', monospace; }
</style>
```

---

## 4. Animações de Scroll (Reveal)

Para portar as animações de surgimento (scroll-reveal) para PHP sem React, use o `IntersectionObserver` nativo do JavaScript.

### Implementação JS

```javascript
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-8');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-8');
        observer.observe(el);
    });
});
```

### Uso no HTML/PHP

```php
<section class="reveal">
    <h1>Bem-vindo à Webyte Hub</h1>
</section>
```

---

## 5. Fundo de Partículas (Canvas)

O efeito de partículas conectadas é feito via HTML5 Canvas. Ideal para hero sections em desktop.

### Snippet de Lógica (Background.js)

```javascript
/* Lógica simplificada para PHP/JS puro */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
// ... configurar redimensionamento e animação de partículas com ctx.arc e ctx.lineTo ...
// (Consulte o arquivo components/particle-background.tsx para a lógica completa)
```

> [!IMPORTANT]
> Desative o canvas em dispositivos móveis (Mobile) para economizar processamento e bateria, conforme feito no projeto original.

---

## 6. Componentes Premium (Tailwind)

### Botões com Efeito de Hover
```html
<button class="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105 active:scale-95 duration-200">
    Inscrever-se
</button>
```

### Cards com Glassmorphism
```html
<div class="bg-secondary/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-colors">
    <h3 class="text-xl font-bold">Design Moderno</h3>
    <p class="text-muted-foreground">Interfaces elegantes e intuitivas.</p>
</div>
```

---

## 7. Bibliotecas de Terceiros Recomendadas (para PHP)

Para manter a fidelidade ao design original:
1.  **Iconografia**: [Lucide Icons](https://lucide.dev/guide/packages/lucide) (carregar via CDN ou NPM).
2.  **Animações CSS**: [Tailwind CSS Animate](https://github.com/jamiebuilds/tailwindcss-animate).
3.  **Componentes**: Se usar Laravel, considere o [Livewire](https://livewire.laravel.com/) com Tailwind para manter a reatividade sem sair do PHP.

---

*Documentação gerada pela Antigravity para o projeto Webyte Hub.*
