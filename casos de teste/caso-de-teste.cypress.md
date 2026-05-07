# 🧪 Casos de Teste — GitHub E2E

---

## CT-01 — Login com credenciais válidas

| Campo                      | Descrição                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------- |
| **ID**                     | CT-01                                                                                                   |
| **Tipo**                   | Positivo                                                                                                |
| **Objetivo**               | Validar autenticação com usuário válido                                                                 |
| **Pré-condição**           | Usuário GitHub válido                                                                                   |
| **Passos**                 | 1. Acessar github.com<br>2. Ir para login<br>3. Preencher email e senha válidos<br>4. Clicar em Sign In |
| **Resultado Esperado**     | Usuário autenticado com sucesso                                                                         |
| **Critérios de Validação** | Redirecionamento correto após login e nome do usuário visível                                           |

---

## CT-02 — Login com senha inválida

| Campo                      | Descrição                                                                                                  |
| -------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **ID**                     | CT-02                                                                                                      |
| **Tipo**                   | Negativo                                                                                                   |
| **Objetivo**               | Validar bloqueio de autenticação com senha inválida                                                        |
| **Pré-condição**           | Usuário existente                                                                                          |
| **Passos**                 | 1. Acessar tela de login<br>2. Informar email válido<br>3. Informar senha inválida<br>4. Clicar em Sign In |
| **Resultado Esperado**     | Sistema deve impedir autenticação                                                                          |
| **Critérios de Validação** | Exibição de mensagem de erro                                                                               |

---

## CT-03 — Login com campos vazios

| Campo                      | Descrição                                                           |
| -------------------------- | ------------------------------------------------------------------- |
| **ID**                     | CT-03                                                               |
| **Tipo**                   | Negativo                                                            |
| **Objetivo**               | Validar obrigatoriedade dos campos                                  |
| **Pré-condição**           | Nenhuma                                                             |
| **Passos**                 | 1. Acessar login<br>2. Não preencher campos<br>3. Clicar em Sign In |
| **Resultado Esperado**     | Sistema não deve autenticar                                         |
| **Critérios de Validação** | Permanecer na tela de login                                         |

---

## CT-04 — Navegação para aba Repositories

| Campo                      | Descrição                                                           |
| -------------------------- | ------------------------------------------------------------------- |
| **ID**                     | CT-04                                                               |
| **Tipo**                   | Positivo                                                            |
| **Objetivo**               | Validar acesso à aba de repositórios                                |
| **Pré-condição**           | Usuário autenticado                                                 |
| **Passos**                 | 1. Realizar login<br>2. Acessar perfil<br>3. Clicar em Repositories |
| **Resultado Esperado**     | Lista de repositórios exibida                                       |
| **Critérios de Validação** | URL da aba repositories carregada corretamente                      |

---

## CT-05 — Acesso a repositório existente

| Campo                      | Descrição                                                |
| -------------------------- | -------------------------------------------------------- |
| **ID**                     | CT-05                                                    |
| **Tipo**                   | Positivo                                                 |
| **Objetivo**               | Validar abertura de repositório                          |
| **Pré-condição**           | Usuário possuir repositórios                             |
| **Passos**                 | 1. Acessar aba repositories<br>2. Selecionar repositório |
| **Resultado Esperado**     | Tela do repositório exibida                              |
| **Critérios de Validação** | Nome do repositório visível                              |

---

## CT-06 — Navegação para aba Pull Requests

| Campo                      | Descrição                              |
| -------------------------- | -------------------------------------- |
| **ID**                     | CT-06                                  |
| **Tipo**                   | Positivo                               |
| **Objetivo**               | Validar navegação até Pull Requests    |
| **Pré-condição**           | Usuário autenticado                    |
| **Passos**                 | 1. Acessar menu Pull Requests          |
| **Resultado Esperado**     | Tela de Pull Requests exibida          |
| **Critérios de Validação** | URL e conteúdo carregados corretamente |

---

## CT-07 — Criação de novo repositório

| Campo                      | Descrição                                                               |
| -------------------------- | ----------------------------------------------------------------------- |
| **ID**                     | CT-07                                                                   |
| **Tipo**                   | Positivo                                                                |
| **Objetivo**               | Validar criação de repositório                                          |
| **Pré-condição**           | Usuário autenticado                                                     |
| **Passos**                 | 1. Clicar em New Repository<br>2. Informar nome<br>3. Confirmar criação |
| **Resultado Esperado**     | Repositório criado com sucesso                                          |
| **Critérios de Validação** | Página do novo repositório carregada                                    |

---

## CT-08 — Criação de repositório com nome duplicado

| Campo                      | Descrição                                                  |
| -------------------------- | ---------------------------------------------------------- |
| **ID**                     | CT-08                                                      |
| **Tipo**                   | Negativo                                                   |
| **Objetivo**               | Validar tratamento de repositório duplicado                |
| **Pré-condição**           | Repositório já existente                                   |
| **Passos**                 | 1. Criar novo repositório<br>2. Informar nome já utilizado |
| **Resultado Esperado**     | Sistema deve impedir criação                               |
| **Critérios de Validação** | Mensagem de erro exibida                                   |

---

## CT-09 — Logout do sistema

| Campo                      | Descrição                                        |
| -------------------------- | ------------------------------------------------ |
| **ID**                     | CT-09                                            |
| **Tipo**                   | Positivo                                         |
| **Objetivo**               | Validar logout do usuário                        |
| **Pré-condição**           | Usuário autenticado                              |
| **Passos**                 | 1. Abrir menu do perfil<br>2. Clicar em Sign out |
| **Resultado Esperado**     | Sessão encerrada                                 |
| **Critérios de Validação** | Redirecionamento para página pública             |

---

## CT-10 — Acesso a rota autenticada após logout

| Campo                  | Descrição                                    |
| ---------------------- | -------------------------------------------- |
| **ID**                 | CT-10                                        |
| **Tipo**               | Alternativo                                  |
| **Objetivo**           | Validar bloqueio de sessão após logout       |
| **Pré-condição**       | Logout realizado                             |
| **Passos**             | 1. Tentar acessar página privada após logout |
| **Resultado Esperado** | Sistema deve solicitar autenticação          |
