// critic station 5 r1: Rosa block geometry at 390 before/after the forecast JSON arrives (live and JSON blocked); lines that changed. usage: node probe-rosa-shift.mjs <scratch-dir-for-png>
import { chromium } from '/home/shahar/.superset/worktrees/oneshot/nine-gruyere-2605b615/node_modules/playwright/index.mjs';
const b = await chromium.launch();
for (const block of [false, true]) {
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const p = await ctx.newPage();
if (block) await p.route(/rosa-data.*\.json/, (r) => r.abort());
await p.goto('http://127.0.0.1:8764/'); await p.waitForTimeout(1500);
const snap = () => p.evaluate(() => { const w = document.querySelector('#waves'); const top = w.getBoundingClientRect().top; return [...w.querySelectorAll(':scope > * , :scope > * > *, :scope > * > * > *')].map(e => { const r = e.getBoundingClientRect(); return `${e.tagName}.${(e.className||'').toString().split(' ')[0]} y=${Math.round(r.top-top)} h=${Math.round(r.height)}${e.hidden?' [hidden]':''}`; }).slice(0, 30); });
const before = await snap();
await p.evaluate(() => document.querySelector('#waves').scrollIntoView()); await p.waitForTimeout(5000);
const after = await snap();
console.log('BLOCK', block); for (let i = 0; i < Math.max(before.length, after.length); i++) if (before[i] !== after[i]) console.log('  ', before[i], '  ->  ', after[i]);
const cover = await p.evaluate(() => { const a = [...document.querySelectorAll('#waves a')].find(a => a.getBoundingClientRect().height > 50); if (!a) return null; a.scrollIntoView({block:'center'}); const r = a.getBoundingClientRect(); const top = document.elementFromPoint(r.left + r.width/2, r.top + r.height/2); return { cls: a.className, parent: a.parentElement.className, topEl: top && top.tagName + '.' + top.className, same: !!top && (top === a) }; });
console.log('  visible link', JSON.stringify(cover));
await p.screenshot({ path: `${process.argv[2]}/rosa-${block ? 'blocked' : 'live'}.png` });
await ctx.close();
}
await b.close();
