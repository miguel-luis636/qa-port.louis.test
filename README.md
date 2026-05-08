# 🧪 QA Port Louis Test

> Projeto de automação de testes **E2E (Cypress)** e **Performance (K6 Browser)** aplicado sobre o fluxo de autenticação e navegação do GitHub.

---

## 📌 Índice

- [Objetivo](#-objetivo)
- [Tecnologias](#-tecnologias)
- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Configuração de Variáveis de Ambiente](#-configuração-de-variáveis-de-ambiente)
- [Testes E2E — Cypress](#-testes-e2e--cypress)
- [Testes de Performance — K6](#-testes-de-performance--k6)
- [CI/CD](#-cicd)
- [Relatório de Execução](#-relatório-de-execução-k6)
- [Limitações Conhecidas](#-limitações-conhecidas--importante)
- [Observações Profissionais](#-observações-profissionais)

---

## 🎯 Objetivo

Demonstrar capacidade prática de:

- Automação E2E com **Cypress** cobrindo login, navegação, criação de repositório e logout
- Testes de performance com **K6 Browser** medindo tempo de resposta por etapa
- Uso de variáveis de ambiente com **dotenv** para segurança de credenciais
- Geração de relatórios com **Mochawesome**
- Estruturação de projeto de QA com boas práticas

---

## 🧰 Tecnologias

| Tecnologia | Versão | Finalidade |
|---|---|---|
| Node.js | v18+ (LTS recomendado) | Runtime |
| Cypress | ^15.14.2 | Testes E2E |
| cypress-xpath | ^2.0.1 | Seletores XPath no Cypress |
| Mochawesome | ^7.1.4 | Relatórios visuais Cypress |
| mochawesome-merge | ^5.1.1 | Merge de relatórios JSON |
| mochawesome-report-generator | ^6.3.2 | Geração do HTML final |
| K6 (Grafana) | latest | Testes de performance |
| dotenv | ^17.4.2 | Variáveis de ambiente |
| TypeScript | ^6.0.3 | Tipagem (suporte) |

---

## 📁 Arquitetura do Projeto

```
qa-port.louis.test/
│
├── .github/                          # Configurações GitHub Actions (CI/CD)
│
├── casas de teste/                   # Casos de teste documentados manualmente
│
├── cypress-e2e/                      # Módulo de testes E2E
│   ├── cypress/
│   │   ├── e2e/                      # Arquivos de spec (cenários de teste)
│   │   ├── fixtures/                 # Dados estáticos usados nos testes
│   │   ├── reports/                  # Relatórios Mochawesome gerados
│   │   │   ├── mochawesome/          # JSONs individuais por spec
│   │   │   └── final/                # Relatório HTML final consolidado
│   │   ├── screenshots/              # Capturas automáticas em falha
│   │   └── support/                  # Comandos customizados e hooks globais
│   ├── .env                          # Variáveis sensíveis (NÃO versionar)
│   ├── .env.example                  # Modelo de variáveis sem dados reais
│   ├── cypress.config.js             # Configuração global do Cypress
│   ├── package.json                  # Dependências e scripts E2E
│   └── tsconfig.json                 # Configuração TypeScript
│
├── k6/                               # Módulo de testes de performance
│   ├── data/                         # Dados externos usados nos testes K6
│   ├── services/                     # Abstrações de chamadas/fluxos reutilizáveis
│   ├── support/                      # Helpers e utilitários K6
│   └── tests/
│       └── browser-script.js         # Script principal K6 Browser
│   ├── .env                          # Variáveis K6 (NÃO versionar)
│   └── .env.example                  # Modelo de variáveis K6
│
├── relatorios/                       # Relatórios de execução documentados
│   ├── relatorio.cypress.tests.md    # Relatório dos testes E2E
│   └── relatorio.k6.tests.md        # Relatório dos testes de performance
│
├── .gitignore                        # Arquivos ignorados pelo Git
├── Perguntas.Qa.Git.md               # Perguntas e respostas técnicas de QA
└── README.md                         # Este arquivo
```

### Fluxo de execução

```
 ┌──────────────┐     ┌─────────────────────┐     ┌───────────────────┐
 │   .env file  │────▶│  Cypress / K6 Runner │────▶│  GitHub (target)  │
 └──────────────┘     └─────────────────────┘     └───────────────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
             ┌──────▼──────┐      ┌───────▼──────┐
             │  Mochawesome │      │  K6 Terminal  │
             │   Report     │      │   Output      │
             └─────────────┘      └──────────────┘
```

---

## ⚙️ Pré-requisitos

### 1. Node.js

```bash
node -v   # recomendado: v18 ou v20 LTS
npm -v    # recomendado: v9+
```

Download: [https://nodejs.org/](https://nodejs.org/)

### 2. K6

**Windows (Chocolatey):**
```bash
choco install k6
```

**Instalação manual (fallback recomendado):**
[https://github.com/grafana/k6/releases](https://github.com/grafana/k6/releases)

### 3. Google Chrome

Obrigatório para o módulo `k6/browser` (utiliza Chromium):
[https://www.google.com/chrome/](https://www.google.com/chrome/)

---

## 🔐 Configuração de Variáveis de Ambiente

Crie um arquivo `.env` dentro de `cypress-e2e/` e outro dentro de `k6/`:

```env
LOGIN_GITHUB_EMAIL=seu-email@exemplo.com
LOGIN_GITHUB_PASSWORD=sua-senha
```

> ⚠️ **Nunca versione o arquivo `.env`.**  
> Um `.env.example` está disponível em cada módulo como modelo.  
> O `.gitignore` já está configurado para ignorar `.env`.

---

## 🧪 Testes E2E — Cypress

### Cenários cobertos

| Módulo | Ação | Validação |
|---|---|---|
| **Login** | Acessa `github.com`, preenche email/senha, submete | URL pós-login, nome de usuário visível |
| **Repositories** | Navega até aba de repositórios, seleciona repo aleatório, abre PRs | Elementos carregados corretamente |
| **Criar Repositório** | Cria novo repositório via UI (XPath para elementos específicos) | Repositório criado e acessível |
| **Logout** | Finaliza sessão | Retorno à tela pública, sessão encerrada |

### Scripts disponíveis

```bash
# Dentro de cypress-e2e/

npm install           # instala dependências

npm run test          # executa Cypress em modo headless (CI)
npx cypress open      # abre interface visual interativa

npm run merge         # consolida relatórios JSON do Mochawesome
npm run generate      # gera relatório HTML final
npm run report        # merge + generate (atalho completo)
```

### Relatório Mochawesome

Após execução, o relatório HTML final é gerado em:

```
cypress/reports/final/
```

Abra o arquivo `index.html` no navegador para visualizar os resultados.

---

## ⚡ Testes de Performance — K6

### Cenários medidos

| Etapa | Threshold | Resultado |
|---|---|---|
| Login | < 5000ms | ✅ 1145ms |
| Repositories | < 5000ms | ✅ 1479ms |
| Logout | < 5000ms | ✅ 2631ms |

### Executar

```bash
# Dentro de k6/

k6 run tests/browser-script.js \
  --env LOGIN_GITHUB_EMAIL=seu@email.com \
  --env LOGIN_GITHUB_PASSWORD=suasenha
```

Ou via script no `package.json`:

```bash
npm run k6
```

---

## 🔄 CI/CD

> ⚠️ **Nota importante:** O CI/CD presente neste projeto (`.github/workflows/`) é um pipeline **simples e demonstrativo**. Em projetos reais, a responsabilidade de configurar, manter e evoluir pipelines de CI/CD é da equipe de **DevOps/Platform Engineering**, não de QA.
>
> O papel do QA no contexto de CI é garantir que os testes estejam preparados para rodar em ambientes automatizados — não construir a infraestrutura do pipeline.

O pipeline configurado realiza:

1. Checkout do repositório
2. Instalação do Node.js e dependências
3. Execução dos testes Cypress em modo headless
4. Geração e upload do relatório Mochawesome como artefato

Para pipelines de performance com K6, o ideal é integrá-los a ferramentas de observabilidade como **Grafana + InfluxDB** em ambientes dedicados de staging.

---

## 📊 Relatório de Execução K6

```
INFO[0001] Login response time: 1145ms
INFO[0003] Repositories response time: 1479ms
INFO[0005] Logout response time: 2631ms
```

| Métrica | Valor |
|---|---|
| checks_total | 3 |
| checks_succeeded | 100% (3/3) |
| checks_failed | 0% |
| browser_http_req_duration (avg) | 76.16ms |
| browser_http_req_failed | 0.00% (0 de 341) |
| browser_data_received | 23 MB |
| iteration_duration | 5.45s |

### Web Vitals

| Métrica | avg | p(90) | p(95) |
|---|---|---|---|
| CLS | 0 | 0 | 0 |
| FCP | 696ms | 810ms | 811ms |
| FID | 500µs | 500µs | 500µs |
| LCP | 808ms | 811ms | 812ms |
| TTFB | 334ms | 461ms | 481ms |

---

## ⚠️ Limitações Conhecidas — IMPORTANTE

### 🚫 O GitHub pode bloquear os testes

O GitHub implementa proteções ativas contra automação e ataques de força bruta. Ao rodar os testes — especialmente o fluxo de login automatizado — **o GitHub pode identificar a requisição como suspeita e bloquear o acesso temporariamente**, resultando em erros como:

- `cy.visit() — page load timed out`
- Página de login não carregando
- Redirecionamento para verificação de segurança (CAPTCHA ou 2FA inesperado)
- K6 Browser não conseguindo avançar após o login

**Isso não é um bug no código.** É um comportamento esperado de uma plataforma que se protege contra bots.

#### ✅ O que fazer nesses casos

1. **Aguarde alguns minutos** e rode o teste novamente
2. Se o erro persistir, **acesse o GitHub manualmente** pelo mesmo IP e conclua qualquer verificação pendente (email, 2FA, CAPTCHA)
3. Evite rodar os testes repetidamente em sequência no mesmo IP
4. Prefira executar em **horários de baixo tráfego**

> 💡 Em ambientes profissionais de QA, testes de login são executados contra **aplicações próprias em staging**, nunca contra plataformas de terceiros em produção. O GitHub não é — e nunca foi — um ambiente adequado para testes de performance ou automação de login.

### 🏗️ GitHub não é um ambiente de teste adequado

| Problema | Impacto |
|---|---|
| Proteção anti-bot ativa | Testes falham intermitentemente sem alteração de código |
| Sem controle de estado do servidor | Impossível garantir consistência entre execuções |
| Latência variável por região/horário | Métricas de performance não são confiáveis |
| Risco de bloqueio de conta | Automação excessiva pode triggar lockout temporário |
| Ausência de ambiente de staging | Não há separação entre teste e produção |

> Este projeto usa o GitHub como alvo **exclusivamente para fins demonstrativos** de automação de fluxos de UI. Em contexto profissional, os testes seriam executados contra uma aplicação controlada em ambiente de staging com dados de teste isolados.

---

## 🏆 Observações Profissionais

### Sobre K6 neste projeto

O K6 foi mantido em escopo básico intencionalmente. Um teste de performance profissional exige:

- Ambiente isolado (staging/perf dedicado)
- Monitoramento contínuo com **Grafana + InfluxDB/Prometheus**
- Logs centralizados
- Métricas de infraestrutura (CPU, memória, rede)
- Definição de baseline e controle de variância
- Execução em pipeline CI/CD com gates de qualidade

### Sobre CI/CD neste projeto

O pipeline incluído é simples e serve para demonstrar integração com GitHub Actions. A configuração e manutenção de pipelines de produção é responsabilidade de **DevOps**, não de QA. O QA entrega testes prontos para rodar em qualquer ambiente — a infraestrutura de execução é papel de outra disciplina.

---

## 📁 Documentação adicional

| Arquivo | Conteúdo |
|---|---|
| `relatorios/relatorio.cypress.tests.md` | Resultado detalhado dos testes E2E |
| `relatorios/relatorio.k6.tests.md` | Resultado detalhado dos testes de performance |
| `Perguntas.Qa.Git.md` | Perguntas e respostas técnicas sobre QA e Git |
| `casas de teste/` | Casos de teste documentados manualmente |

---

*Desenvolvido por miguel-luis636 · [github.com/miguel-luis636/qa-port.louis.test](https://github.com/miguel-luis636/qa-port.louis.test)*
