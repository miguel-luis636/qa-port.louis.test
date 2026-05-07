# ⚡ Casos de Teste de Performance — k6 

---

## CT-PF-01 — Performance do Login

| Campo                  | Descrição                                                 |
| ---------------------- | --------------------------------------------------------- |
| **ID**                 | CT-PF-01                                                  |
| **Tipo**               | Performance                                               |
| **Objetivo**           | Medir o tempo de resposta da requisição de login          |
| **Endpoint/Fluxo**     | Autenticação GitHub (login)                               |
| **Pré-condição**       | Usuário válido e sistema acessível                        |
| **Cenário k6**         | Simular usuários realizando login simultaneamente         |
| **Métricas Avaliadas** | http_req_duration (tempo de resposta)                     |
| **Critério de Aceite** | Tempo médio de resposta ≤ 2s (ou SLA definido)            |
| **Resultado Esperado** | Login executado dentro do limite aceitável de performance |

---

## CT-PF-02 — Performance ao acessar Repositories

| Campo                  | Descrição                                                |
| ---------------------- | -------------------------------------------------------- |
| **ID**                 | CT-PF-02                                                 |
| **Tipo**               | Performance                                              |
| **Objetivo**           | Validar tempo de resposta ao carregar a aba Repositories |
| **Endpoint/Fluxo**     | GitHub / User Repositories Page                          |
| **Pré-condição**       | Usuário autenticado                                      |
| **Cenário k6**         | Simular acesso concorrente à página de repositórios      |
| **Métricas Avaliadas** | http_req_duration, http_reqs                             |
| **Critério de Aceite** | Tempo médio ≤ 3s                                         |
| **Resultado Esperado** | Lista de repositórios carregada dentro do SLA            |

---

## CT-PF-03 — Performance no Logout

| Campo                  | Descrição                                                    |
| ---------------------- | ------------------------------------------------------------ |
| **ID**                 | CT-PF-03                                                     |
| **Tipo**               | Performance                                                  |
| **Objetivo**           | Medir tempo de resposta ao realizar logout                   |
| **Endpoint/Fluxo**     | GitHub Sign out                                              |
| **Pré-condição**       | Usuário autenticado                                          |
| **Cenário k6**         | Simular múltiplos usuários realizando logout simultaneamente |
| **Métricas Avaliadas** | http_req_duration                                            |
| **Critério de Aceite** | Tempo médio ≤ 1.5s                                           |
| **Resultado Esperado** | Sessão encerrada rapidamente sem delay perceptível           |

