# 🧪 K6 Browser Test Report — GitHub Flow

> **Script:** `tests/browser-script.js` · **Execution:** local · **Engine:** Chromium (k6/browser)

---

## ✅ Checks

| Check | Result | Threshold |
|---|---|---|
| login under 5s | ✅ Passed | < 5000ms |
| repositories under 5s | ✅ Passed | < 5000ms |
| logout under 5s | ✅ Passed | < 5000ms |

**checks_total:** 3 · **checks_succeeded:** 100% (3/3) · **checks_failed:** 0%

---

## ⏱️ Response Times

| Step | Time |
|---|---|
| Login | 1145ms |
| Repositories | 1479ms |
| Logout | 2631ms |

---

## 🔁 Execution

| Metric | Value |
|---|---|
| Scenario | 1 VU · 1 iteration · max 10m30s |
| iteration_duration | avg=5.45s · min=5.45s · med=5.45s · max=5.45s |
| iterations | 1 (0.161354/s) |
| VUs | 1 (min=1 · max=1) |

---

## 🌐 Browser Metrics

| Metric | avg | min | med | max | p(90) | p(95) |
|---|---|---|---|---|---|---|
| browser_http_req_duration | 76.16ms | 26µs | 26.17ms | 501.93ms | 255.39ms | 258.92ms |
| browser_http_req_failed | 0.00% (0/341) | — | — | — | — | — |
| browser_data_received | 23 MB (3.7 MB/s) | — | — | — | — | — |
| browser_data_sent | 175 kB (28 kB/s) | — | — | — | — | — |

---

## 💡 Web Vitals

| Metric | avg | min | med | max | p(90) | p(95) |
|---|---|---|---|---|---|---|
| CLS | 0 | 0 | 0 | 0 | 0 | 0 |
| FCP | 696ms | 472ms | 804ms | 812ms | 810.4ms | 811.2ms |
| FID | 500µs | 500µs | 500µs | 500µs | 500µs | 500µs |
| LCP | 808ms | 804ms | 808ms | 812ms | 811.2ms | 811.6ms |
| TTFB | 334.69ms | 199.5ms | 303.5ms | 501.09ms | 461.57ms | 481.33ms |

> **CLS (Cumulative Layout Shift)** = 0 indica ausência de instabilidade visual.  
> **FCP (First Contentful Paint)** e **LCP (Largest Contentful Paint)** dentro de limites aceitáveis para páginas autenticadas.

---

## 📋 Resumo

Todos os **3 testes passaram (100%)**, sem falhas de requisições HTTP durante as **341 requisições no navegador**. Os tempos de resposta ficaram dentro do limite de 5s em todas as etapas, sendo o logout a etapa mais lenta com aproximadamente **2,6s**, devido ao encerramento da sessão. Os Web Vitals indicam uma renderização estável, sem ocorrência de layout shift durante todo o fluxo.
