## 📊 📄 Relatório consolidado dos testes

### 🧪 Cenário 001 — Autenticação e navegação

**Arquivo:** `login.github.spec.ts`

✔️ Todos os testes passaram com sucesso (100%)

* [CT-01] Login com credenciais válidas → ✔️ passou
* [CT-02] Login com senha inválida → ✔️ passou
* [CT-03] Login com email inválido → ✔️ passou

📌 Resultado:

* 3 testes executados
* 3 passes
* 0 falhas
* 100% de sucesso

---

### 🧪 Cenário 002 — Interação com repositórios

**Arquivo:** `repositories-interaction.spec.ts`

✔️ Todos os testes passaram com sucesso (100%)

* [CT-04] Navegação para aba Repositories → ✔️ passou
* [CT-05] Criação de novo repositório → ✔️ passou
* [CT-06] Criação de repositório duplicado → ✔️ passou

📌 Resultado:

* 3 testes executados
* 3 passes
* 0 falhas
* 100% de sucesso

---

## ⚠️ Observação importante — teste de logout (falha)

Foi identificado um problema no cenário de logout:

> ❌ O teste de logout falhou porque o GitHub foi traduzido automaticamente para português (pt-BR) durante a execução.

### 🧠 Impacto técnico

* O Cypress está procurando um elemento com texto **em inglês**
* Exemplo esperado:

  * `"Sign out"` ou `"Log out"`
* Porém o navegador exibiu:

  * `"Sair"` (pt-BR)

---

## 🐞 Descrição do erro

Durante a execução do teste de logout, o navegador alterou automaticamente o idioma do GitHub para **português (pt-BR)**.

Como consequência, o Cypress não encontrou o seletor esperado, pois o botão de logout estava renderizado em **português**, enquanto o teste foi escrito com base no idioma **inglês**.

---

## 💥 Causa raiz

* Internacionalização automática do GitHub baseada em região/navegador
* Dependência de texto fixo no Cypress (`cy.contains("Sign out")`)
* Falta de seletor estável (data-testid ou aria-label)

---

## 📌 Conclusão geral

* ✔ Login: funcionando corretamente
* ✔ Repositórios: funcionando corretamente
* ⚠️ Logout: falhou devido à mudança de idioma (pt-BR vs EN)
* 📊 Taxa de sucesso geral (sem logout): 100%
