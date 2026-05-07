# Respostas – Perguntas QA / Git

## Introdução

Este documento reúne respostas relacionadas ao fluxo de trabalho de QA utilizando Git, GitHub, pipelines e boas práticas de qualidade em ambientes ágeis.

As respostas foram elaboradas considerando:

* atuação de um QA Junior em squads ágeis;
* foco em qualidade e estabilidade das entregas;
* colaboração com desenvolvimento;
* utilização de Git/GitHub no dia a dia;
* validação de ambientes e pipelines;
* cultura de melhoria contínua.

---

# 1. Você recebeu um card para desenvolver uma automação de testes.

## Qual sequência de comandos você executa desde atualizar o projeto até começar a desenvolver?

Em um contexto de QA, normalmente o desenvolvimento está relacionado à automação de testes, criação de cenários E2E, integração, geração de massa de dados ou manutenção da estrutura de testes.

Testes unitários geralmente são responsabilidade do desenvolvedor, conforme as boas práticas de qualidade e divisão de responsabilidades dentro do fluxo ágil. O papel do QA está mais ligado à validação funcional, testes end-to-end, integração, regressão e garantia da qualidade da entrega como um todo.

Antes de iniciar qualquer automação ou validação, garanto que minha base local esteja sincronizada com a branch principal do projeto.

Fluxo utilizado:

```bash
# acessar branch principal
git checkout develop

# atualizar branch local
git pull origin develop

# criar branch da feature
git checkout -b feature/nome-da-feature
```

Durante esse processo também valido:

* critérios de aceitação do card;
* comportamento esperado;
* riscos da funcionalidade;
* impacto em regressão;
* necessidade de automação;
* ambiente local funcionando corretamente.

Também considero importante alinhar dúvidas com o time de desenvolvimento e produto antes de iniciar os testes, garantindo entendimento correto da regra de negócio e da entrega.

---

# 2. Você tentou fazer merge e houve conflito.

## Como você identifica os arquivos com conflito? Qual o processo que você segue para resolver?

Primeiro identifico os arquivos com conflito utilizando:

```bash
git status
```

Após identificar os arquivos:

1. Analiso as diferenças entre as alterações locais e remotas;
2. Entendo qual comportamento deve permanecer;
3. Converso com o desenvolvedor responsável caso exista dúvida funcional;
4. Resolvo os conflitos manualmente;
5. Executo testes para garantir que a integração não quebrou funcionalidades existentes.

Após resolver:

```bash
git add .
git commit -m "resolve merge conflicts"
```

Como QA, considero importante validar:

* impacto em funcionalidades críticas;
* comportamento esperado após integração;
* possíveis regressões;
* estabilidade dos testes automatizados.

---

# 3. Sua feature está pronta.

## Quais comandos você executa para enviar seu código?

Após validar a feature localmente:

```bash
git add .

git commit -m "feat: adiciona automação da feature X"

git push origin feature/nome-da-feature
```

Depois:

* abro Pull Request;
* reviso alterações enviadas;
* verifico pipeline;
* adiciono evidências quando necessário;
* valido se os testes automatizados passaram.

Também considero importante:

* manter commits organizados;
* utilizar mensagens claras;
* garantir rastreabilidade;
* facilitar revisão do time.

---

# 4. Um bug apareceu em produção e você precisa investigar.

## Como você encontra em qual commit o problema começou?

Primeiro tento reproduzir o problema e entender:

* impacto;
* severidade;
* frequência;
* fluxo afetado;
* impacto para o usuário.

Depois analiso:

```bash
git log
```

Também utilizo:

```bash
git diff
```

E quando necessário:

```bash
git bisect
```

Além da análise técnica, considero muito importante a comunicação com o time, principalmente com os desenvolvedores envolvidos na entrega.

A troca de informações ajuda a entender:

* alterações recentes;
* comportamento esperado;
* possíveis causas;
* dependências impactadas;
* riscos de regressão.

Também verifico:

* PRs recentes;
* deploys realizados;
* logs;
* diferenças entre ambientes;
* falhas em pipeline.

Como QA, acredito que investigação de problemas em produção deve ser feita de forma colaborativa, com boa comunicação entre QA, desenvolvimento e produto.

---

# 5. O time entregou uma feature na branch develop.

## O que você faz antes de iniciar os testes nessa branch?

Antes dos testes:

1. Atualizo minha branch local;
2. Analiso o card e critérios de aceite;
3. Entendo o impacto da entrega;
4. Verifico dependências;
5. Confirmo ambiente correto;
6. Valido se existem migrations ou configurações necessárias.

Também preparo:

* massa de testes;
* cenários de regressão;
* cenários exploratórios;
* validações de integração;
* possíveis automações.

---

# 6. Como você garante que sua base local está atualizada?

Utilizo:

```bash
git checkout develop
git pull origin develop
```

Também verifico:

```bash
git status
```

E confirmo:

* se não existem alterações pendentes;
* conflitos locais;
* branches desatualizadas;
* divergências entre ambientes.

Manter a base atualizada é importante para evitar conflitos e validar o comportamento mais próximo possível do ambiente utilizado pelo time.

---

# 7. Você identificou que o comportamento em beta está diferente do develop.

## Como você investiga se é problema de código ou de deploy? Quais evidências você coleta?

Primeiro tento reproduzir o comportamento nos dois ambientes para entender exatamente a diferença apresentada.

Depois comparo:

* versão da aplicação;
* commits publicados;
* variáveis de ambiente;
* pipelines executadas;
* logs;
* comportamento do frontend e backend.

Também considero muito importante a comunicação com o time durante a investigação.

Conversar com os desenvolvedores e responsáveis pelo deploy ajuda a entender:

* mudanças recentes;
* possíveis falhas de configuração;
* diferenças entre ambientes;
* dependências impactadas;
* comportamento esperado.

Além disso, verifico:

* falhas de build;
* inconsistências de banco de dados;
* problemas de cache;
* integrações externas;
* diferenças de configuração.

As evidências coletadas normalmente incluem:

* screenshots;
* vídeos;
* logs;
* payloads;
* respostas de API;
* prints de pipeline;
* passos para reprodução;
* ambiente afetado.

Acredito que uma investigação eficiente depende tanto da análise técnica quanto da colaboração entre QA e desenvolvimento.

---

# 8. Um deploy falhou na pipeline.

## O que você analisa primeiro? Você consegue identificar em qual etapa falhou (build, teste, deploy)? Qual sua ação após identificar a falha?

Primeiro verifico os logs da pipeline para identificar em qual etapa ocorreu a falha:

* build;
* testes automatizados;
* lint;
* deploy;
* integração.

Depois analiso:

* mensagem de erro;
* stack trace;
* testes quebrados;
* dependências;
* variáveis de ambiente;
* permissões;
* configurações do ambiente.

Como QA Junior, acredito que comunicação com o time é fundamental nesse processo.

Quando encontro uma falha, procuro alinhar com desenvolvedores e pessoas mais experientes para entender:

* causa raiz;
* impacto da falha;
* comportamento esperado;
* melhor forma de validar a correção.

Considero importante aprender com o time durante essas análises, porque pipelines, integração contínua e deploy fazem parte de um aprendizado constante.

Após identificar a causa:

1. Documento o problema;
2. Reproduzo localmente quando possível;
3. Alinho com o time responsável;
4. Valido a correção;
5. Reexecuto os testes;
6. Confirmo estabilidade antes de nova publicação.

---

# 9. Pensando no fluxo develop > beta > master

## Em qual momento você bloqueia uma subida para produção?

Uma entrega deve ser bloqueada quando existir risco relevante para:

* negócio;
* usuários;
* segurança;
* estabilidade;
* integridade dos dados.

Exemplos:

* bugs críticos;
* falhas em fluxos principais;
* regressões;
* testes automatizados quebrando;
* inconsistências entre ambientes;
* problemas de autenticação;
* deploy instável.

Também considero muito importante conversar com o time antes de qualquer decisão relacionada à publicação.

O alinhamento entre QA, desenvolvimento e produto ajuda a avaliar:

* impacto real do problema;
* prioridade;
* riscos para produção;
* necessidade de rollback;
* possibilidade de hotfix.

Como QA, entendo que bloquear uma entrega não é apenas uma decisão técnica, mas uma decisão colaborativa focada em proteger a qualidade e a estabilidade do produto.

---

# 10. O que define que uma entrega está pronta para produção?

Considero que uma entrega está pronta para produção quando:

* critérios de aceite foram atendidos;
* testes funcionais foram executados;
* regressão validada;
* bugs críticos resolvidos;
* pipeline aprovada;
* ambiente estável;
* evidências documentadas;
* time alinhado sobre riscos conhecidos.

Também considero importante:

* boa comunicação entre QA, desenvolvimento e produto;
* rastreabilidade;
* monitoramento pós deploy;
* confiança na estabilidade da entrega.

Qualidade não envolve apenas encontrar bugs, mas contribuir para entregas mais seguras, estáveis e alinhadas aos objetivos do produto.
