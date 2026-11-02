#!/usr/bin/env node
// dossier/talouloren/funnel/walk.mjs — the auditor's hand walk (station 3b) of talouloren.com as a phone sees it,
// and the recipe for every screenshot under funnel/ (tools/funnel.mjs writes landing-*.png and page-*.png).
// screenshots: recipe dossier/talouloren/make-funnel.sh
// Why: tools/funnel.mjs crawls only what the home menu links to; the paid session (/winning-personal-brand/)
// and the course (/course/) are reached from elsewhere, "קבעו עכשיו" leads to /meet-tal/ and its three quizzes, and the session's booking buttons open a JS popup.
// Read-only: opens pages, opens the menu, taps "קבעו עכשיו" and "הזמן שיחה עם טל" (popups, never filled or
// submitted); no login, no form submission, no contact.
// Run from the repo root:
//   node tools/funnel.mjs https://talouloren.com/ --out dossier/talouloren/funnel --depth 3 --pages 30 --shots
//   node dossier/talouloren/funnel/walk.mjs dossier/talouloren/funnel/walk
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const OUT = process.argv[2];
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1, locale: 'he-IL', userAgent: IPHONE });
const res = [];
const info = (p) => p.evaluate(() => ({
  title: document.title,
  links: [...document.querySelectorAll('a')].filter(a => a.offsetParent).map(a => ({ text: a.innerText.trim().slice(0, 60), href: a.getAttribute('href'), top: Math.round(a.getBoundingClientRect().top + scrollY) })).filter(l => l.text || /whatsapp|tel:|mailto/.test(l.href || '')),
  forms: [...document.querySelectorAll('form')].map(f => ({ action: f.getAttribute('action'), fields: [...f.querySelectorAll('input,textarea,select')].filter(i => i.type !== 'hidden').map(i => i.name || i.type), top: Math.round(f.getBoundingClientRect().top + scrollY) })),
  links_to_session: [...document.querySelectorAll('a[href*="winning-personal-brand"]')].length,
  links_to_course: [...document.querySelectorAll('a[href*="/course"]')].length,
  height: document.documentElement.scrollHeight,
}));
async function visit(i, path, extra) {
  const p = await ctx.newPage(); const url = 'https://talouloren.com' + path;
  let status = null; try { status = (await p.goto(url, { waitUntil: 'load', timeout: 90000 }))?.status(); } catch (e) { status = String(e).slice(0, 120); }
  await p.waitForTimeout(3000);
  const name = String(i).padStart(2, '0') + '-' + (path === '/' ? 'home' : path.replace(/\W/g, '').slice(0, 30));
  await p.screenshot({ path: `${OUT}/${name}-fold.png` });
  for (let y = 0; y < 20; y++) { await p.mouse.wheel(0, 900); await p.waitForTimeout(120); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(800);
  await p.screenshot({ path: `${OUT}/${name}-full.png`, fullPage: true });
  const r = { url, status, shots: [`${name}-fold.png`, `${name}-full.png`], ...(await info(p)) };
  if (extra) r.extra = await extra(p, name);
  res.push(r); await p.close();
}
await visit(1, '/', async (p, name) => {
  const out = {};
  const btn = p.locator('a:has-text("קבעו עכשיו")').first();
  out.hero_button = await btn.count() ? { href: await btn.getAttribute('href'), cls: await btn.getAttribute('class') } : null;
  try { await p.locator('.mobile-menu-button, .menu-button, button[aria-label*="menu" i], .uncode-menu-toggle, #mobile-menu-button').first().click({ timeout: 5000 }); await p.waitForTimeout(1200); await p.screenshot({ path: `${OUT}/${name}-menu.png` }); out.menu_shot = `${name}-menu.png`; } catch (e) { out.menu_error = String(e).slice(0, 100); }
  out.menu = await p.evaluate(() => [...document.querySelectorAll('nav a, .menu-container a, .menu-smart a')].map(a => [a.innerText.trim(), a.getAttribute('href')]).filter(x => x[0]));
  return out;
});
await visit(2, '/winning-personal-brand/', async (p, name) => {
  const out = {};
  out.buttons = await p.evaluate(() => [...document.querySelectorAll('a')].filter(a => a.innerText.includes('הזמן שיחה')).map(a => ({ href: a.getAttribute('href'), cls: a.className, visible: !!a.offsetParent })));
  const btn = p.locator('a:has-text("הזמן שיחה עם טל"):visible').first();
  await btn.scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
  await btn.tap(); await p.waitForTimeout(2000);
  await p.screenshot({ path: `${OUT}/${name}-popup.png` }); out.popup_shot = `${name}-popup.png`;
  out.popup = await p.evaluate(() => { const v = [...document.querySelectorAll('.pum')].find(x => getComputedStyle(x).display !== 'none'); return v ? { id: v.id, text: v.innerText.slice(0, 400), fields: [...v.querySelectorAll('input,textarea')].filter(i => i.type !== 'hidden').map(i => i.name || i.type) } : null; });
  out.url_after_tap = p.url();
  return out;
});
await visit(3, '/course/');
await visit(4, '/meet-tal/');
await visit(5, '/services/');
await visit(6, '/entrepreneur-quiz/');
await visit(7, '/organization-quiz/');
await visit(8, '/brand-quiz/');
writeFileSync(`${OUT}/../walk.json`, JSON.stringify(res, null, 1));
await b.close();
console.log(res.map(r => `${r.status} ${r.url} session-links:${r.links_to_session} course-links:${r.links_to_course}`).join('\n'));
