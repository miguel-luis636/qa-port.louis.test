import { browser } from "k6/browser";
import { check } from "k6";

const BASE_URL = "https://github.com";
const THRESHOLDS = { login: 5000, repositories: 5000, logout: 5000 };

export const options = {
  scenarios: {
    ui: {
      executor: "shared-iterations",
      vus: 1,
      iterations: 1,
      options: { browser: { type: "chromium" } },
    },
  },
};

async function login(page) {
  const start = Date.now();

  await page.goto(`${BASE_URL}/login`);
  await page.locator("#login_field").type(__ENV.LOGIN_GITHUB_EMAIL);
  await page.locator("#password").type(__ENV.LOGIN_GITHUB_PASSWORD);
  await page.locator('input[type="submit"]').click();
  await page.waitForURL(/github.com/);

  const elapsed = Date.now() - start;
  console.log(`Login response time: ${elapsed}ms`);
  check(elapsed, { "login under 5s": (t) => t < THRESHOLDS.login });
}

async function visitRepositories(page) {
  const start = Date.now();

  await page.goto(`${BASE_URL}/miguel-testes?tab=repositories`);
  await page.waitForLoadState("networkidle");

  const elapsed = Date.now() - start;
  console.log(`Repositories response time: ${elapsed}ms`);
  check(elapsed, {
    "repositories under 5s": (t) => t < THRESHOLDS.repositories,
  });
}

async function logout(page) {
  const start = Date.now();

  await page.goto(`${BASE_URL}/logout`);
  await page.waitForLoadState("networkidle");

  const elapsed = Date.now() - start;
  console.log(`Logout response time: ${elapsed}ms`);
  check(elapsed, { "logout under 5s": (t) => t < THRESHOLDS.logout });
}

export default async function () {
  const page = await browser.newPage();

  try {
    await login(page);
    await visitRepositories(page);
    await logout(page);
  } finally {
    await page.close();
  }
}
