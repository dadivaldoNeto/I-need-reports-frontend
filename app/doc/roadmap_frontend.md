# Mapa de Ação — Frontend separado para Spring Boot com HTML, Tailwind CSS e TypeScript

## 1. Validação da ideia

A ideia é válida e recomendada para uma aplicação Spring Boot que já expõe uma API REST.

Em vez de renderizar páginas no servidor com Thymeleaf, o Spring Boot fica responsável por autenticação, regras de negócio, banco de dados e endpoints REST. O frontend fica separado, construído com HTML, Tailwind CSS e TypeScript, e é publicado como site estático no GitHub Pages.

### Decisão técnica recomendada

- **Backend:** Spring Boot REST API.
- **Frontend:** Vite + TypeScript + Tailwind CSS.
- **Hospedagem do frontend:** GitHub Pages.
- **Hospedagem do backend:** outro serviço, por exemplo Render, Railway, Fly.io, VPS, Azure, AWS, Oracle Cloud ou servidor próprio.
- **Comunicação:** `fetch()` do frontend para a API Spring Boot.
- **Ambientes:** `.env.development` para API local e `.env.production` para API publicada.

### Pontos importantes

O GitHub Pages hospeda arquivos estáticos: HTML, CSS e JavaScript. Ele não hospeda aplicações Java/Spring Boot. Por isso, o frontend pode ficar no GitHub Pages, mas o backend Spring Boot precisa estar rodando em outro local.

Se o frontend publicado em `https://usuario.github.io/repositorio/` tentar acessar uma API em `http://localhost:8080`, isso só funcionará no teu próprio computador, não para outros utilizadores. Para produção, a API deve ter uma URL pública, preferencialmente HTTPS.

## 2. Escopo da API observado no Swagger enviado

Pelo Swagger anexado, a API aparenta ter estes grupos principais:

### Autenticação / usuário

- `POST /api/register`
- `POST /api/login`

### Dashboard

- `GET /api/dashboard`

### Transações

- `GET /api/v1/transactions/{id}`
- `POST /api/v1/transactions`
- `PUT /api/v1/transactions/{id}`
- `DELETE /api/v1/transactions/{id}`
- `POST /api/v1/transactions/execute`

### Relatórios

- `GET /api/reports/pdf`

Este mapa assume que esses endpoints estão disponíveis e que o backend já está funcional ou em fase final de implementação.

## 3. Pré-requisitos no Windows 11

Instalar:

1. Node.js LTS.
2. Git for Windows.
3. Visual Studio Code ou IntelliJ IDEA.
4. Backend Spring Boot a correr localmente em `http://localhost:8080`.

Depois confirmar no PowerShell:

```powershell
node -v
npm -v
git --version
```

## 4. Criar o frontend com Vite, TypeScript e Tailwind CSS

### 4.1. Criar a pasta do projeto

No PowerShell:

```powershell
mkdir spring-finance-frontend
cd spring-finance-frontend
```

### 4.2. Criar projeto Vite com TypeScript

```powershell
npm create vite@latest . -- --template vanilla-ts
npm install
```

### 4.3. Instalar Tailwind CSS

```powershell
npm install tailwindcss @tailwindcss/vite
```

### 4.4. Configurar `vite.config.ts`

Arquivo: `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  // Para GitHub Pages em repositório do tipo projeto:
  // exemplo: https://usuario.github.io/spring-finance-frontend/
  base: '/spring-finance-frontend/',
})
```

Se o repositório for `usuario.github.io`, usar:

```ts
base: '/',
```

### 4.5. Configurar CSS

Arquivo: `src/style.css`

```css
@import "tailwindcss";
```

### 4.6. Criar Hello World

Arquivo: `src/main.ts`

```ts
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main class="min-h-screen flex items-center justify-center bg-slate-950 px-6 text-white">
    <section class="max-w-xl rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-xl">
      <p class="text-sm font-semibold uppercase tracking-widest text-cyan-300">
        Spring Boot + Vite + Tailwind
      </p>
      <h1 class="mt-4 text-4xl font-bold">Hello, World 👋</h1>
      <p class="mt-4 text-slate-300">
        Frontend separado, feito com HTML, Tailwind CSS e TypeScript.
      </p>
      <button
        id="helloButton"
        class="mt-6 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
      >
        Testar TypeScript
      </button>
      <p id="message" class="mt-4 text-sm text-slate-400"></p>
    </section>
  </main>
`

const button = document.querySelector<HTMLButtonElement>('#helloButton')
const message = document.querySelector<HTMLParagraphElement>('#message')

button?.addEventListener('click', () => {
  if (message) {
    message.textContent = 'Funcionou! TypeScript está ativo.'
  }
})
```

### 4.7. Rodar localmente

```powershell
npm run dev
```

Abrir o endereço indicado no terminal, normalmente:

```text
http://localhost:5173
```

### 4.8. Gerar build de produção

```powershell
npm run build
npm run preview
```

O build final ficará na pasta:

```text
dist/
```

## 5. Integração com a API Spring Boot

### 5.1. Criar variáveis de ambiente

Arquivo: `.env.development`

```env
VITE_API_URL=http://localhost:8080
```

Arquivo: `.env.production`

```env
VITE_API_URL=https://sua-api-publica.com
```

Nunca colocar senhas, tokens privados ou segredos no frontend. Tudo que está no frontend pode ser visto no navegador.

### 5.2. Criar cliente HTTP

Arquivo: `src/api/http.ts`

```ts
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message)
  }
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('accessToken')
  const headers = new Headers(options.headers)

  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json')
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => '')
    throw new ApiError(errorText || `Erro HTTP ${response.status}`, response.status)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export async function apiBlob(path: string, options: RequestInit = {}): Promise<Blob> {
  const token = localStorage.getItem('accessToken')
  const headers = new Headers(options.headers)

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new ApiError(`Erro HTTP ${response.status}`, response.status)
  }

  return response.blob()
}
```

### 5.3. Serviços da API

Arquivo: `src/api/auth.ts`

```ts
import { api } from './http'

export type LoginRequest = {
  email: string
  password: string
}

export type RegisterRequest = {
  name: string
  email: string
  password: string
}

export type LoginResponse = {
  token?: string
  accessToken?: string
  message?: string
}

export function login(data: LoginRequest) {
  return api<LoginResponse>('/api/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function register(data: RegisterRequest) {
  return api('/api/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
```

Arquivo: `src/api/dashboard.ts`

```ts
import { api } from './http'

export type DashboardResponse = Record<string, unknown>

export function getDashboard() {
  return api<DashboardResponse>('/api/dashboard')
}
```

Arquivo: `src/api/transactions.ts`

```ts
import { api } from './http'

export type TransactionRequest = {
  fromAccountId?: number
  toAccountId?: number
  type?: string
  amount: number
  description?: string
}

export type TransactionResponse = Record<string, unknown>

export function getTransaction(id: number) {
  return api<TransactionResponse>(`/api/v1/transactions/${id}`)
}

export function createTransaction(data: TransactionRequest) {
  return api<TransactionResponse>('/api/v1/transactions', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateTransaction(id: number, data: TransactionRequest) {
  return api<TransactionResponse>(`/api/v1/transactions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteTransaction(id: number) {
  return api<void>(`/api/v1/transactions/${id}`, {
    method: 'DELETE',
  })
}

export function executeTransaction(data: TransactionRequest) {
  return api<TransactionResponse>('/api/v1/transactions/execute', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
```

Arquivo: `src/api/reports.ts`

```ts
import { apiBlob } from './http'

export async function downloadPdfReport() {
  const blob = await apiBlob('/api/reports/pdf')
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = 'relatorio.pdf'
  link.click()

  URL.revokeObjectURL(url)
}
```

## 6. Configurar CORS no Spring Boot

Criar uma configuração global no backend.

Arquivo sugerido: `src/main/java/.../config/CorsConfig.java`

```java
package com.seuprojeto.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(
                                "http://localhost:5173",
                                "https://SEU_USUARIO.github.io"
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }
}
```

Se usares cookies/sessão entre domínios, será necessário configurar credenciais, cookies seguros, `SameSite=None`, HTTPS e CSRF corretamente. Para MVP, é mais simples usar autenticação com token Bearer retornado pelo login.

## 7. Estrutura recomendada do frontend

```text
spring-finance-frontend/
├─ .github/
│  └─ workflows/
│     └─ deploy.yml
├─ public/
├─ src/
│  ├─ api/
│  │  ├─ auth.ts
│  │  ├─ dashboard.ts
│  │  ├─ http.ts
│  │  ├─ reports.ts
│  │  └─ transactions.ts
│  ├─ components/
│  │  ├─ Button.ts
│  │  ├─ Card.ts
│  │  ├─ Input.ts
│  │  └─ Navbar.ts
│  ├─ pages/
│  │  ├─ dashboard.ts
│  │  ├─ login.ts
│  │  ├─ register.ts
│  │  ├─ reports.ts
│  │  └─ transactions.ts
│  ├─ router.ts
│  ├─ style.css
│  └─ main.ts
├─ .env.development
├─ .env.production
├─ index.html
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

## 8. Roteamento simples sem framework

Para evitar erro 404 no GitHub Pages, usar rotas por hash:

```text
/#/login
/#/register
/#/dashboard
/#/transactions
/#/reports
```

Arquivo: `src/router.ts`

```ts
import { renderDashboardPage } from './pages/dashboard'
import { renderLoginPage } from './pages/login'
import { renderRegisterPage } from './pages/register'
import { renderReportsPage } from './pages/reports'
import { renderTransactionsPage } from './pages/transactions'

const routes: Record<string, () => void> = {
  '#/login': renderLoginPage,
  '#/register': renderRegisterPage,
  '#/dashboard': renderDashboardPage,
  '#/transactions': renderTransactionsPage,
  '#/reports': renderReportsPage,
}

export function router() {
  const path = window.location.hash || '#/login'
  const page = routes[path] ?? renderLoginPage
  page()
}

window.addEventListener('hashchange', router)
```

Arquivo: `src/main.ts`

```ts
import './style.css'
import { router } from './router'

router()
```

## 9. Deploy no GitHub Pages com GitHub Actions

### 9.1. Criar workflow

Arquivo: `.github/workflows/deploy.yml`

```yml
name: Deploy Frontend to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 9.2. Configurar no GitHub

No repositório:

1. Ir em **Settings**.
2. Entrar em **Pages**.
3. Em **Build and deployment**, selecionar **GitHub Actions**.
4. Fazer push na branch `main`.
5. Aguardar o workflow terminar.

## 10. Plano de implementação em até 5 dias

### Dia 1 — Ambiente e Hello World

Objetivo: deixar o frontend a correr localmente com Tailwind e TypeScript.

Tarefas:

- Instalar Node.js LTS, Git e editor.
- Criar projeto Vite com template `vanilla-ts`.
- Instalar Tailwind CSS.
- Criar tela Hello World.
- Configurar `base` do Vite para GitHub Pages.
- Confirmar que `npm run dev` funciona.

Validação:

- `node -v` funciona.
- `npm run dev` abre o site.
- Tailwind aplica estilos.
- Botão do Hello World responde ao clique.
- `npm run build` gera a pasta `dist` sem erro.

### Dia 2 — Conexão com backend e autenticação

Objetivo: conectar o frontend ao Spring Boot.

Tarefas:

- Criar `.env.development` e `.env.production`.
- Criar `src/api/http.ts`.
- Criar serviços `auth.ts`, `dashboard.ts`, `transactions.ts`, `reports.ts`.
- Configurar CORS no Spring Boot.
- Criar telas simples de login e registro.
- Guardar token retornado pelo login.

Validação:

- `POST /api/login` responde no frontend.
- `POST /api/register` responde no frontend.
- Não existem erros de CORS no console do navegador.
- Token é guardado após login, se a API retornar token.

### Dia 3 — Dashboard e transações

Objetivo: implementar o fluxo principal da aplicação.

Tarefas:

- Criar layout base com navbar.
- Criar página dashboard consumindo `GET /api/dashboard`.
- Criar página de transações.
- Implementar criar transação com `POST /api/v1/transactions`.
- Implementar executar transação com `POST /api/v1/transactions/execute`.
- Implementar visualizar, editar e remover transação por ID.

Validação:

- Dashboard carrega dados reais ou mensagem de vazio.
- Criação de transação funciona.
- Execução de transação funciona.
- Edição e remoção por ID funcionam.
- Erros da API são mostrados na tela.

### Dia 4 — Relatórios, UX e responsividade

Objetivo: melhorar usabilidade e finalizar funcionalidades essenciais.

Tarefas:

- Implementar download de PDF em `GET /api/reports/pdf`.
- Adicionar estados de loading.
- Adicionar mensagens de sucesso e erro.
- Melhorar formulários com validação básica.
- Ajustar responsividade com Tailwind.
- Criar proteção simples para páginas privadas.

Validação:

- PDF baixa corretamente.
- App funciona em desktop e mobile.
- Usuário sem login é redirecionado para login.
- Campos obrigatórios bloqueiam submissão inválida.
- Console do navegador não mostra erros críticos.

### Dia 5 — Deploy, testes finais e documentação

Objetivo: publicar no GitHub Pages.

Tarefas:

- Criar repositório GitHub.
- Configurar workflow de GitHub Pages.
- Configurar `VITE_API_URL` de produção.
- Publicar o frontend.
- Testar frontend publicado com backend publicado.
- Corrigir problemas de `base`, CORS ou HTTPS.
- Atualizar README com instruções de instalação e deploy.

Validação:

- Site abre no GitHub Pages.
- Login funciona no site publicado.
- Dashboard e transações funcionam no site publicado.
- Download do PDF funciona no site publicado.
- Build e deploy ficam automatizados via GitHub Actions.

## 11. Critérios de conclusão do MVP

O MVP estará pronto quando:

- Frontend estiver separado do backend.
- Projeto compilar com `npm run build`.
- Site estiver publicado no GitHub Pages.
- API estiver acessível por URL pública HTTPS.
- CORS estiver configurado corretamente.
- Login/registro funcionarem.
- Dashboard carregar.
- Transações principais funcionarem.
- Relatório PDF baixar.
- README explicar instalação, execução e deploy.

## 12. Checklist rápido de validação

### Local

```powershell
npm install
npm run dev
npm run build
npm run preview
```

### Backend

```text
http://localhost:8080/swagger-ui/index.html
http://localhost:8080/api/dashboard
```

### Navegador

Verificar:

- Aba Console sem erros críticos.
- Aba Network mostrando chamadas para a API.
- Respostas HTTP esperadas: 200, 201, 204 ou erro controlado.
- Sem erro de CORS.
- Sem erro de Mixed Content.

## 13. Riscos e soluções

### Risco 1: CORS

Problema: frontend em `localhost:5173` ou GitHub Pages não consegue chamar API Spring Boot.

Solução: configurar CORS no backend para permitir as origens corretas.

### Risco 2: GitHub Pages com caminho errado

Problema: tela branca após deploy.

Solução: configurar `base` no `vite.config.ts` com o nome do repositório.

### Risco 3: Backend local em produção

Problema: site publicado tenta chamar `localhost:8080`.

Solução: configurar `.env.production` com URL pública da API.

### Risco 4: HTTP vs HTTPS

Problema: GitHub Pages usa HTTPS e pode bloquear chamadas para API HTTP.

Solução: publicar a API com HTTPS.

### Risco 5: Rotas 404 no GitHub Pages

Problema: reload em `/dashboard` dá 404.

Solução: usar hash routing, por exemplo `/#/dashboard`, ou configurar fallback corretamente.

## 14. Próximos passos depois do MVP

Depois dos 5 dias:

- Melhorar autenticação e expiração de sessão.
- Trocar `Record<string, unknown>` por tipos reais conforme DTOs do backend.
- Adicionar testes com Vitest.
- Adicionar lint e formatação com ESLint/Prettier.
- Criar componentes reutilizáveis.
- Melhorar design system.
- Criar tratamento global de erros.
- Implementar refresh token, se necessário.
- Criar pipeline separado para backend.

## 15. Resumo executivo

A melhor abordagem é separar o frontend do Spring Boot. O frontend com Vite, TypeScript e Tailwind CSS é leve, rápido, simples de publicar no GitHub Pages e combina bem com uma API REST documentada por Swagger.

O ponto crítico não é o frontend. O ponto crítico é garantir que a API Spring Boot esteja disponível publicamente, com HTTPS e CORS configurado corretamente.

Com disciplina, o MVP é viável em até 5 dias.
