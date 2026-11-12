import { test, expect } from '@playwright/test';

async function skipIntro(page) {
  await expect(page.getByTestId('boot-intro')).toBeVisible();
  await page.getByRole('button', { name: /PULAR INTRO/i }).click();
  await expect(page.locator('#home')).toBeVisible();
}

test('abertura exibe intro, status READY, mensagens e circuitos', async ({ page }) => {
  await page.goto('/');
  const boot = page.getByTestId('boot-intro');
  await expect(boot).toBeVisible();
  await expect(boot).toContainText('initializing_quality_protocol');
  await expect(boot).toContainText('scanning_systems');
  await expect(boot).toContainText('detecting_hidden_defects');
  await expect(boot).toContainText('READY');
  await expect(boot.locator('.boot-circuits svg path')).toHaveCount(1);
  await expect(page.locator('#home')).toHaveCount(0);
});

test('pular intro abre o site e remove a tela de abertura', async ({ page }) => {
  await page.goto('/');
  await skipIntro(page);
  await expect(page.getByTestId('boot-intro')).toHaveCount(0);
  await expect(page.getByTestId('replay-intro')).toBeVisible();
});

test('intro encerra automaticamente', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('boot-intro')).toBeVisible();
  await expect(page.locator('#home')).toBeVisible({ timeout: 7000 });
  await expect(page.getByTestId('boot-intro')).toHaveCount(0);
});

test('botão INTRO reinicia a abertura após pular', async ({ page }) => {
  await page.goto('/');
  await skipIntro(page);
  await page.getByTestId('replay-intro').click();
  await expect(page.getByTestId('boot-intro')).toBeVisible();
  await page.getByRole('button', { name: /PULAR INTRO/i }).click();
  await expect(page.locator('#home')).toBeVisible();
});

test('recarregar a página exibe intro novamente', async ({ page }) => {
  await page.goto('/');
  await skipIntro(page);
  await page.reload();
  await expect(page.getByTestId('boot-intro')).toBeVisible();
});

test('movimento reduzido mantém intro, replay e opção de pular', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByTestId('boot-intro')).toBeVisible();
  await expect(page.locator('.boot-circuits path')).toHaveCSS('animation-name', 'none');
  await skipIntro(page);
  await page.getByTestId('replay-intro').click();
  await expect(page.getByTestId('boot-intro')).toBeVisible();
  await page.getByRole('button', { name: /PULAR INTRO/i }).click();
  await expect(page.locator('#home')).toBeVisible();
});

test('circuitos aparecem sem bloquear a navegação', async ({ page }) => {
  await page.goto('/');
  await skipIntro(page);
  const layer = page.getByTestId('circuit-overlay');
  await expect(layer).toBeVisible();
  await expect(layer.locator('svg path')).toHaveCount(1);
  await expect(layer).toHaveCSS('pointer-events', 'none');
  const opacity = await layer.evaluate(el => Number(getComputedStyle(el).opacity));
  expect(opacity).toBeGreaterThan(0);
});

test('scroll revela a seção de missões com animação', async ({ page }) => {
  await page.goto('/');
  await skipIntro(page);
  const section = page.locator('#missions');
  await section.scrollIntoViewIfNeeded();
  await expect(section).toHaveClass(/is-visible/);
  await expect(section.locator('.panel').first()).toBeVisible();
});

test('foto carrega e ocupa toda a moldura', async ({ page }) => {
  await page.goto('/');
  await skipIntro(page);
  const photo = page.getByTestId('profile-photo');
  await expect(photo).toBeVisible();
  await expect.poll(() => photo.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  await expect(photo).toHaveCSS('object-fit', 'cover');
  const delta = await page.evaluate(() => {
    const image = document.querySelector('.profile-photo').getBoundingClientRect();
    const frame = document.querySelector('.profile-frame').getBoundingClientRect();
    return [Math.abs(frame.width - image.width), Math.abs(frame.height - image.height)];
  });
  expect(Math.max(...delta)).toBeLessThan(2);
});

test('favicon existe e está declarado na página', async ({ page, request }) => {
  const res = await request.get('/favicon.svg');
  expect(res.ok()).toBeTruthy();
  expect(await res.text()).toContain('<svg');
  await page.goto('/');
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', '/favicon.svg');
});

test('links dos projetos e do LinkedIn permanecem visíveis', async ({ page }) => {
  await page.goto('/');
  await skipIntro(page);
  await expect(page.locator('#missions a[href*="qa-manual-testing-ecommerce"]')).toHaveCount(1);
  await expect(page.locator('#missions a[href*="qa.k6.workshop"]')).toHaveCount(1);
  await expect(page.locator('#contact a[href*="linkedin.com/in/miguel-luisatf"]')).toHaveCount(1);
});

for (const width of [320, 375, 768, 1280]) {
  test('responsividade em ' + width + 'px sem rolagem horizontal na página', async ({ page }) => {
    await page.setViewportSize({ width, height: 850 });
    await page.goto('/');
    await skipIntro(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(overflow).toBeLessThanOrEqual(2);
    await expect(page.locator('.profile-frame')).toBeVisible();
    const columns = await page.locator('#missions .cards').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length);
    expect(columns).toBe(width <= 600 ? 1 : width <= 900 ? 2 : 3);
  });
}

test('admin não exibe intro pública', async ({ page }) => {
  await page.goto('/admin');
  await expect(page.getByTestId('boot-intro')).toHaveCount(0);
  await expect(page.locator('.admin')).toBeVisible();
});

test('Brave-like reduced motion can be explicitly overridden by the visitor', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await skipIntro(page);
  const toggle = page.getByTestId('motion-toggle');
  await expect(toggle).toContainText('OFF');
  await toggle.click();
  await expect(toggle).toContainText('ON');
  await expect(toggle).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('html')).toHaveClass(/motion-on/);
  await page.getByTestId('replay-intro').click();
  await expect(page.locator('.boot-circuits path')).not.toHaveCSS('animation-name','none');
  await page.getByRole('button',{name:/PULAR INTRO/i}).click();
  await expect(page.getByTestId('circuit-overlay').locator('path')).not.toHaveCSS('animation-name','none');
  await page.reload();
  await skipIntro(page);
  await expect(page.getByTestId('motion-toggle')).toContainText('ON');
  await page.getByTestId('motion-toggle').click();
  await expect(page.locator('html')).not.toHaveClass(/motion-on/);
  await expect(page.getByTestId('circuit-overlay').locator('path')).toHaveCSS('animation-name','none');
});

test('manual animations switch can turn motion OFF even without OS reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await skipIntro(page);
  const toggle = page.getByTestId('motion-toggle');
  await expect(toggle).toContainText('ON');
  await toggle.click();
  await expect(toggle).toContainText('OFF');
  await expect(page.getByTestId('circuit-overlay').locator('path')).toHaveCSS('animation-name','none');
});
