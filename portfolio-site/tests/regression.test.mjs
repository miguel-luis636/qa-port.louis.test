import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const sql = readFileSync(new URL('../supabase/schema.sql', import.meta.url), 'utf8');
const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));

test('admin route remains available', () => {
  assert.match(app, /location\.pathname\.startsWith\('\/admin'\)/);
  assert.match(app, /ENTRAR COM GOOGLE/);
});

test('Google login returns to admin', () => {
  assert.match(app, /provider:'google'/);
  assert.match(app, /redirectTo:location\.origin\+'\/admin'/);
});

test('admin operations require authorization', () => {
  assert.match(app, /if\(!supabase\|\|!allowed\|\|!form\.title\.trim\(\)\)return/);
  assert.match(app, /if\(!supabase\|\|!allowed\|\|!confirm\(/);
});

test('public portfolio filters unpublished entries', () => {
  assert.match(app, /x\.kind===k&&x\.published/);
});

test('database enforces row level security and owner access', () => {
  assert.match(sql, /enable row level security/i);
  assert.match(sql, /is_portfolio_admin/i);
});

test('SPA routes rewrite to index.html', () => {
  assert.ok(vercel.rewrites.some(({source,destination}) => source === '/(.*)' && destination === '/index.html'));
});

test('admin auth callbacks handle optional Supabase client', () => {
  assert.doesNotMatch(app, /onClick=\{\(\)=>void supabase\.auth\./);
});

test('production build typechecks before bundling', () => {
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.match(pkg.scripts.build, /tsc\s+--noEmit\s*&&\s*vite\s+build/);
  assert.match(pkg.scripts['test:regression'], /npm run test\s*&&\s*npm run build/);
});

test('missing Supabase credentials do not crash the admin screen', () => {
  const client = readFileSync(new URL('../src/supabase.ts', import.meta.url), 'utf8');
  assert.match(client, /:\s*null\s*;/);
  assert.match(app, /!supabase\?<p>/);
});

test('all portfolio content types remain supported', () => {
  for (const kind of ['experiences','projects','achievements','skills']) {
    assert.ok(app.includes(kind), kind);
  }
});

const css = readFileSync(new URL('../src/style.css', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const e2e = readFileSync(new URL('./e2e/portfolio.spec.ts', import.meta.url), 'utf8');

test('intro is shown every visit, not hidden by stale session storage', () => {
  assert.match(app, /useState\(!location\.pathname\.startsWith\('\/admin'\)\)/);
  assert.doesNotMatch(app, /intro-seen-v[0-9]+/);
  assert.match(app, /data-testid="boot-intro"/);
  assert.match(app, /PULAR INTRO/);
});

test('replay button actually toggles intro state, and automatic timer is cleaned up', () => {
  assert.match(app, /replayIntro=\(\)=>\{[^}]*setIntro\(true\)/);
  assert.match(app, /onClick=\{replayIntro\}/);
  assert.match(app, /window\.setTimeout\(\(\)=>setIntro\(false\)/);
  assert.match(app, /window\.clearTimeout\(t\)/);
});

test('scroll animation is observed and visible styles exist', () => {
  assert.match(app, /new IntersectionObserver/);
  assert.match(app, /classList\.add\('is-visible'\)/);
  assert.match(css, /\.section\.is-visible\s*\{animation:riseIn/);
  assert.match(css, /\.section\.is-visible \.cards \.panel/);
});

test('circuits animate without intercepting input', () => {
  assert.match(app, /data-testid="circuit-overlay"/);
  assert.match(css, /\.circuit-overlay\s*\{[^}]*pointer-events:none/s);
  assert.match(css, /@keyframes circuitCurrent/);
});

test('reduced motion keeps the interface usable', () => {
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /\.boot-circuits path[^}]*animation:none!important/s);
  assert.doesNotMatch(app, /matchMedia\([^)]*prefers-reduced-motion/);
});

test('photo and browser icon are configured', () => {
  assert.match(app, /src="\/miguel-portrait\.webp"/);
  assert.match(css, /\.profile-frame \.profile-photo\{position:absolute/);
  assert.match(html, /rel="icon" type="image\/svg\+xml" href="\/favicon\.svg"/);
});

test('real-browser regression includes desktop, mobile, interactions and viewport checks', () => {
  const config = readFileSync(new URL('../playwright.config.ts', import.meta.url), 'utf8');
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.match(config, /Desktop Chrome/);
  assert.match(config, /Pixel 7/);
  for(const phrase of ['reinicia a abertura','recarregar a página','movimento reduzido','circuitos aparecem','scroll revela','foto carrega','responsividade']) {
    assert.ok(e2e.includes(phrase), phrase);
  }
  assert.match(pkg.scripts['test:regression'], /npm run test:e2e/);
});
