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
  assert.match(pkg.scripts.build, /tsc\\s+--noEmit\\s*&&\\s*vite\\s+build/);
  assert.match(pkg.scripts['test:regression'], /npm run test\\s*&&\\s*npm run build/);
});

test('missing Supabase credentials do not crash the admin screen', () => {
  const client = readFileSync(new URL('../src/supabase.ts', import.meta.url), 'utf8');
  assert.match(client, /:\\s*null\\s*;/);
  assert.match(app, /!supabase\\?<p>/);
});

test('all portfolio content types remain supported', () => {
  for (const kind of ['experiences','projects','achievements','skills']) {
    assert.ok(app.includes(kind), kind);
  }
});
