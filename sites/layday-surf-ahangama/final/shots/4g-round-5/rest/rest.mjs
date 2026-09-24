// 4g round 2: resting positions vs the phone foot bar (< 920 px).
// node rest.mjs <url> <out.jsonl> [heights=primary,568] [widths]
import { chromium } from 'playwright';
import { writeFileSync, appendFileSync } from 'node:fs';
const [url, out, hs = 'primary,568', ws] = process.argv.slice(2);
const widths = ws ? ws.split(',').map(Number)
  : [...Array.from({ length: 30 }, (_, i) => 320 + 20 * i), 390, 767, 768, 919].sort((a, b) => a - b);
const heights = hs.split(',');
writeFileSync(out, '');
const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });

const probe = () => {
  const dock = document.getElementById('dock');
  const cs = getComputedStyle(dock);
  const vis = cs.visibility === 'visible' && +cs.opacity > 0.01 && cs.display !== 'none';
  const bar = dock.getBoundingClientRect();
  const lines = [];
  let lastBottom = -1e9;
  if (vis) {
    const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const op = (el) => { let o = 1; for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const s = getComputedStyle(e); if (s.display === 'none') return 0; o *= +s.opacity; } return o; };
    for (let n; (n = tw.nextNode());) {
      if (!n.textContent.trim()) continue;
      const el = n.parentElement;
      if (el.closest('#dock,#drawer,.skip,script,style,noscript')) continue;
      const s = getComputedStyle(el);
      if (s.visibility !== 'visible' || op(el) < 0.05) continue;
      const rg = document.createRange(); rg.selectNodeContents(n);
      for (const r of rg.getClientRects()) {
        if (r.width < 1 || r.height < 1) continue;
        if (r.bottom <= 0 || r.top >= innerHeight) continue;
        if (r.bottom > lastBottom) lastBottom = r.bottom;
        if (r.bottom > bar.top + 0.5 && r.top < bar.bottom && r.right > bar.left && r.left < bar.right)
          lines.push(n.textContent.trim().slice(0, 40) + ` @${Math.round(r.top)}-${Math.round(r.bottom)}`);
      }
    }
  }
  const f = document.activeElement;
  let focusUnder = null;
  if (vis && f && f !== document.body && f.tagName !== 'MAIN' && !f.closest('#dock,#drawer')) {
    const r = f.getBoundingClientRect();
    if (r.bottom > bar.top + 0.5 && r.top < bar.bottom && r.height > 0) focusUnder = `${f.tagName}.${f.className} @${Math.round(r.top)}-${Math.round(r.bottom)}`;
  }
  return { y: Math.round(scrollY), max: Math.round(document.documentElement.scrollHeight - innerHeight), bar: vis ? [Math.round(bar.top), Math.round(bar.bottom), Math.round(bar.left), Math.round(bar.right)] : null, under: lines, gap: vis ? Math.round(bar.top - lastBottom) : null, focusUnder };
};
let NOJS = false;
const settle = (p, ms = 150) => NOJS ? p.waitForTimeout(ms + 40) : p.evaluate((ms) => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, ms)))), ms);

for (const w of widths) for (const hk of heights) for (const mode of ['js', 'reduce', 'nojs']) {
  const h = hk === 'primary' ? (w < 768 ? 844 : 1024) : +hk;
  const mob = w < 768; NOJS = mode === 'nojs';
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: mob, hasTouch: mob, javaScriptEnabled: mode !== 'nojs', reducedMotion: mode === 'reduce' ? 'reduce' : 'no-preference' });
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const p = await ctx.newPage();
  await p.goto(url); await p.waitForTimeout(mode === 'js' ? 1200 : 400);
  const rec = { w, h, mode, checks: [] };
  const add = async (name, extra = {}) => rec.checks.push({ name, ...(await p.evaluate(probe)), ...extra });

  await add('top');
  await p.evaluate(() => scrollTo(0, 1e7)); await settle(p, 300); await add('end');
  // the skip link (the page's only in-page anchor)
  await p.evaluate(() => scrollTo(0, 0)); await settle(p);
  await p.keyboard.press('Tab'); await p.keyboard.press('Enter'); await settle(p, 300);
  await add('skip #main', { hash: await p.evaluate(() => location.hash) });
  // keyboard walk: every focusable on the page, in order
  await p.evaluate(() => { history.replaceState(null, '', location.pathname); scrollTo(0, 0); document.activeElement?.blur(); }); await settle(p);
  const tabs = [];
  for (let i = 0; i < 90; i++) {
    await p.keyboard.press('Tab'); await settle(p, 60);
    const r = await p.evaluate(probe);
    const inDock = await p.evaluate(() => !!document.activeElement.closest('#dock'));
    if (inDock) break;
    tabs.push({ y: r.y, under: r.under.length, focusUnder: r.focusUnder });
  }
  rec.tabs = { n: tabs.length, focusUnder: tabs.filter((t) => t.focusUnder).map((t) => t.focusUnder), withLinesUnder: tabs.filter((t) => t.under).length };
  // drawer / dock open and close, from each opener, at the position the keyboard brings it to
  if (mode !== 'nojs') {
    const n = await p.evaluate(() => document.querySelectorAll('[data-drawer]').length);
    const ways = ['Escape', 'close', 'outside'];
    for (let i = 0; i <= n; i++) for (const way of ways) {
      const isDock = i === n;
      if (!isDock && i > 0 && way !== 'Escape') continue;
      const pre = await p.evaluate(async ([i, isDock]) => {
        const el = isDock ? document.querySelector('.dock summary') : document.querySelectorAll('[data-drawer]')[i];
        if (isDock) { scrollTo(0, document.documentElement.scrollHeight / 2); await new Promise((r) => setTimeout(r, 200)); }
        else { document.activeElement?.blur(); scrollTo(0, 0); await new Promise((r) => setTimeout(r, 100)); el.focus(); }
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, 150))));
        return scrollY;
      }, [i, isDock]);
      await p.evaluate(([i, isDock]) => (isDock ? document.querySelector('.dock summary') : document.querySelectorAll('[data-drawer]')[i]).click(), [i, isDock]);
      await p.waitForTimeout(450);
      if (way === 'Escape') await p.keyboard.press('Escape');
      else if (way === 'close') await p.click('.drawer .x');
      else await p.mouse.click(10, 80);
      await p.waitForTimeout(450);
      await add(`drawer ${isDock ? 'dock' : 'opener ' + i} ${way}`, { pre, moved: (await p.evaluate(() => Math.round(scrollY))) - Math.round(pre), open: await p.evaluate(() => !document.getElementById('drawer').hidden) });
    }
  } else {
    await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight / 2)); await settle(p);
    const pre = await p.evaluate(() => scrollY);
    await p.click('.dock summary'); await settle(p, 200); await p.click('.dock summary'); await settle(p, 200);
    await add('details dock toggle', { pre, moved: (await p.evaluate(() => Math.round(scrollY))) - Math.round(pre) });
  }
  appendFileSync(out, JSON.stringify(rec) + '\n');
  const bad = rec.checks.filter((c) => c.under.length || c.focusUnder || c.moved);
  process.stdout.write(`${w}x${h} ${mode}: ${bad.length ? bad.map((c) => c.name + '[' + c.under.length + (c.focusUnder ? ' F' : '') + (c.moved ? ' mv' + c.moved : '') + ']').join(' ') : 'ok'} | tab focusUnder ${rec.tabs.focusUnder.length}/${rec.tabs.n}, end gap ${rec.checks[1].gap}\n`);
  await ctx.close();
}
await b.close();
