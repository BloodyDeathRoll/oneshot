// before (8750 = round 5 + 4h dist) vs after (8751): full-page captures at six widths, reduced motion
import { chromium } from 'playwright';
const out = process.argv[2];
const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
for (const w of [390, 768, 1024, 1440, 1525, 1920]) {
  const row = [w];
  for (const [tag, port] of [['before', 8750], ['after', 8751]]) {
    const mob = w < 768;
    const ctx = await b.newContext({ viewport: { width: w, height: mob ? 844 : 900 }, isMobile: mob, hasTouch: mob, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
    const p = await ctx.newPage(); await p.goto(`http://127.0.0.1:${port}/`); await p.waitForTimeout(800);
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    const sx = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    await p.screenshot({ path: `${out}/${w}-${tag}.png`, fullPage: true });
    row.push(`${tag} h=${h} hscroll=${sx}`);
    await ctx.close();
  }
  console.log(row.join('  '));
}
await b.close();
