import { chromium } from 'playwright';
const b = await chromium.launch();
const out = process.argv[2];
for (const w of [1525, 1600, 1612, 1613, 1614, 1620]) for (const mode of ["nojs"]) {
  const buf = {};
  for (const port of [8750, 8751]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, javaScriptEnabled: mode !== 'nojs', reducedMotion: mode === 'reduce' ? 'reduce' : 'no-preference' });
    await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
    const p = await ctx.newPage(); await p.goto(`http://127.0.0.1:${port}/`); await p.waitForTimeout(700);
    await p.evaluate(async () => { for (const i of document.images) { i.loading = 'eager'; } await Promise.all([...document.images].map((i) => i.decode().catch(() => {}))); });
    buf[port] = await p.screenshot({ fullPage: true });
    if (mode === 'reduce' && [1024, 1440].includes(w)) await p.screenshot({ path: `${out}/${w}-${port === 8750 ? 'before' : 'after'}.png`, fullPage: true });
    await ctx.close();
  }
  for (const port of [8750, 8751]) (await import('node:fs')).writeFileSync(`/tmp/claude-1000/-home-shahar-Projects-oneshot/0b1bb6a1-6e43-4c61-a933-ea631d20b2e4/scratchpad/pix/${w}-${mode}-${port}.png`, buf[port]);
}
await b.close();
