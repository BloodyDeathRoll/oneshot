// critic station 5 round 1: axe-core (wcag2a, wcag2aa, wcag21a, wcag21aa) on home and every booking step,
// and the delivery baseline: both pages with every non-local request blocked, load + full scroll, attempted hosts logged.
// usage: node probe-axe-offline.mjs <base-url/> <out-dir> <axe.min.js>
import { chromium } from '/home/shahar/.superset/worktrees/oneshot/nine-gruyere-2605b615/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const [base, out, axePath] = process.argv.slice(2);
const b = await chromium.launch(); const res = { axe: {}, offline: {} };
const local = new URL(base).host;
const runAxe = async (p) => {
  await p.addScriptTag({ path: axePath });
  return p.evaluate(async () => { const r = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }, resultTypes: ['violations', 'incomplete'] }); return { violations: r.violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, nodes: v.nodes.slice(0, 6).map((n) => ({ t: n.target.join(' '), s: (n.failureSummary || '').slice(0, 220) })) })), incomplete: r.incomplete.map((v) => ({ id: v.id, n: v.nodes.length })) }; });
};
for (const [vk, vp, mob] of [['390', { width: 390, height: 844 }, true], ['1440', { width: 1440, height: 900 }, false]]) {
  const ctx = await b.newContext({ viewport: vp, isMobile: mob, hasTouch: mob, reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  await p.route('**/*', (r) => (/bookinglayer|rosa/.test(r.request().url()) ? r.abort() : r.continue()));
  await p.goto(base); await p.waitForTimeout(1500);
  res.axe['home_' + vk] = await runAxe(p);
  await p.goto(base + 'book/'); await p.waitForTimeout(1200);
  res.axe['book_level_' + vk] = await runAxe(p);
  await p.click('.pick:nth-child(2)'); await p.waitForTimeout(900);
  res.axe['book_room_' + vk] = await runAxe(p);
  await p.click('#room [role=tab]:nth-child(2)'); await p.click('#b-room-twin .choose .btn'); await p.waitForTimeout(900);
  res.axe['book_dates_' + vk] = await runAxe(p);
  await p.click('#f-couple ~ .sb[data-d="1"]'); await p.waitForTimeout(1200);
  await p.click('.chip[data-v="2027-02-20"]'); await p.click('[data-next]'); await p.waitForTimeout(1200);
  res.axe['book_total_' + vk] = await runAxe(p);
  await ctx.close();
}
for (const page of ['', 'book/']) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const p = await ctx.newPage(); const attempted = {}; const failed = [];
  await p.route('**/*', (r) => { const h = new URL(r.request().url()).host; if (h !== local) { attempted[h] = (attempted[h] || 0) + 1; return r.abort(); } return r.continue(); });
  p.on('requestfailed', (r) => { if (new URL(r.url()).host === local) failed.push(r.url()); });
  const resp = await p.goto(base + page); await p.waitForTimeout(1500);
  const onLoad = { ...attempted };
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 500) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(200); }
  await p.waitForTimeout(2500);
  res.offline[page || 'home'] = { status: resp.status(), third_party_attempted_on_load: onLoad, third_party_attempted_after_scroll: attempted, local_failed: failed, text_chars: await p.evaluate(() => document.body.innerText.length), rosa_text: await p.evaluate(() => document.querySelector('#waves')?.innerText.replace(/\s+/g, ' ').slice(0, 200) || null) };
  await ctx.close();
}
fs.writeFileSync(`${out}/axe-offline.json`, JSON.stringify(res, null, 1));
await b.close(); console.log('ok');
