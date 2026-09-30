import { chromium } from 'playwright';
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +process.argv[3] || 390, height: 844 }, isMobile: true });
const t0 = Date.now(); const L = [];
p.on('requestfinished', async (r) => { const s = await r.sizes().catch(() => ({})); L.push([Date.now() - t0, r.resourceType(), r.url().split('/').slice(-2).join('/').slice(0, 70), s.responseBodySize]); });
await p.goto(process.argv[2]); await p.waitForTimeout(3000);
L.sort((a, b) => a[0] - b[0]).forEach((x) => console.log(x.join('  ')));
await b.close();
