// Walk the booking steps like a visitor and screenshot each screen at 1440 and 390.
// usage: node book-shots.mjs <base-url> <out-dir> [--live]   (without --live, engine calls are aborted → snapshot path)
import { chromium } from 'playwright';
import fs from 'fs';
const [base, out] = process.argv.slice(2); const LIVE = process.argv.includes('--live');
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const log = [];
for (const [name, vp, mob] of [['1440', { width: 1440, height: 900 }, false], ['390', { width: 390, height: 844 }, true]]) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: mob ? 2 : 1, isMobile: mob, hasTouch: mob });
  const p = await ctx.newPage();
  const engine = []; const errors = [];
  p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  p.on('pageerror', (e) => errors.push(String(e)));
  await p.route('**/*', (r) => {
    const u = r.request().url();
    if (/bookinglayer/.test(u)) { engine.push({ t: Date.now(), m: r.request().method(), u }); if (!LIVE || /globalsurfadventures\.bookinglayer\.com\/en\/product/.test(u)) return r.abort(); }
    return r.continue();
  });
  await p.goto(base + 'book/?level=level-2-rollers'); await p.waitForTimeout(1200);
  const onLoad = engine.length;
  const shot = async (k) => { await p.waitForTimeout(700); await p.screenshot({ path: `${out}/${name}-${k}.png` }); };
  await shot('1-level');
  await p.click('[data-next]'); await shot('2-room');
  await p.click('#room [role=tab]:nth-child(2)'); await p.waitForTimeout(500); await shot('2b-room-twin');
  await p.click('#b-room-twin .choose'); await p.waitForTimeout(600); await shot('3-dates');
  await p.click('[data-next]'); await shot('3b-dates-missing');
  await p.click('.chip[data-v="2027-02-20"]'); await p.click('#f-couple ~ .sb[data-d="1"]');
  await p.waitForTimeout(LIVE ? 4000 : 900); await shot('3c-dates-filled');
  await p.click('[data-next]'); await p.waitForTimeout(LIVE ? 2500 : 300); await shot('4-total');
  await p.goBack(); await p.waitForTimeout(400); const afterBack = await p.evaluate(() => location.hash + ' ' + document.querySelector('.step.cur').id);
  await p.goForward(); await p.waitForTimeout(400);
  const total = await p.evaluate(() => document.querySelector('[data-s=all]').textContent + ' | ' + document.querySelector('[data-s=note]').textContent);
  let handoff = '';
  p.on('request', (r) => { if (/bookinglayer\.com\/en\/product/.test(r.url())) handoff = r.url(); });
  await p.click('.go'); await p.waitForTimeout(1200);
  log.push({ name, engineCallsOnLoad: onLoad, engineCalls: engine.map((x) => x.m + ' ' + x.u.split('?')[0]), afterBack, total, handoff, url: p.url(), errors });
  await ctx.close();
}
// JS off
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
const p = await ctx.newPage(); let handoff = '';
await p.route('**/*', (r) => { if (/bookinglayer/.test(r.request().url())) { handoff = r.request().url(); return r.abort(); } return r.continue(); });
await p.goto(base + 'book/'); await p.screenshot({ path: `${out}/nojs-1440-full.png`, fullPage: true });
await p.check('input[name=level][value=level-3-riders]', { force: true }).catch(() => {});
await p.selectOption('#f-start', '2027-02-20'); await p.selectOption('#f-end', '2027-02-27'); await p.fill('#f-couple', '1');
await p.click('button[formaction$="level-2-rollers"]'); await p.waitForTimeout(800);
log.push({ name: 'nojs', handoff });
await b.close();
fs.writeFileSync(`${out}/walk.json`, JSON.stringify(log, null, 1));
console.log(JSON.stringify(log, null, 1));
