const WT = process.env.WT;
const { chromium, devices } = require(WT + '/node_modules/playwright');
const R = WT + '/reports/2026-10-midigama-01/experience/lotus-surf-house/verify-1/';
const OUT = R + 'states/', LAP = R + 'laptop/', PR = R + 'presence/';
const U = 'https://lotus-surf-house.os1.workers.dev/';
const L = (...a) => console.log(...a);
const phone = { ...devices['iPhone 13'], viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
const step = async (n, f) => { L('== ' + n); try { await f(); } catch (e) { L('STEP ERROR', n, e.message.slice(0, 200)); } };
const toFc = async (p) => {
  await p.evaluate(() => { const r = document.querySelector('.fc').getBoundingClientRect(); window.scrollTo(0, scrollY + r.top - 90); });
  await p.waitForTimeout(2500);
};
const fcState = (p) => p.evaluate(() => {
  const f = document.querySelector('.fc'), n = f.querySelector('.fc-now'), l = f.querySelector('.fc-link'), i = f.querySelector('iframe');
  const vis = (e) => { const c = getComputedStyle(e); return c.display !== 'none' && c.visibility !== 'hidden'; };
  return { cls: f.className, nowVisible: vis(n), head: (n.querySelector('.nh') || {}).innerText, linkVisible: vis(l), linkText: l.innerText, iframeSrc: i.getAttribute('src'), iframeVisible: vis(i), h: document.documentElement.scrollHeight, y: Math.round(scrollY), fcTop: Math.round(f.getBoundingClientRect().top) };
});

(async () => {
  const b = await chromium.launch();

  await step('JS off', async () => {
    const c = await b.newContext({ ...phone, javaScriptEnabled: false });
    const p = await c.newPage();
    const hosts = new Set();
    p.on('request', (r) => hosts.add(new URL(r.url()).host));
    await p.goto(U, { waitUntil: 'load' });
    await p.screenshot({ path: OUT + 'jsoff-top.png' });
    await p.screenshot({ path: OUT + 'jsoff-full.png', fullPage: true });
    L('hosts', [...hosts]);
    await c.close();
  });

  await step('Reduced motion', async () => {
    const c = await b.newContext({ ...phone, reducedMotion: 'reduce' });
    const p = await c.newPage();
    await p.goto(U, { waitUntil: 'load' });
    await p.waitForTimeout(500);
    await p.screenshot({ path: OUT + 'reduced-top.png' });
    L(await p.evaluate(() => ({ anims: document.getAnimations().map((x) => x.animationName || x.transitionProperty) })));
    await c.close();
  });

  const failures = [
    ['JSON blocked', 'json-blocked.png', async (c) => { await c.route('**/rosa-data-opal.vercel.app/**', (r) => r.abort()); }],
    ['Widget blocked', 'widget-blocked.png', async (c) => { await c.route('**/rosa.surf/widget/**', (r) => r.abort()); }],
    ['JSON stale (2 days)', 'json-stale.png', async (c) => {
      await c.route('**/rosa-data-opal.vercel.app/data/spots/**', async (r) => {
        const res = await r.fetch();
        const j = await res.json();
        j.generated_at = new Date(Date.now() - 48 * 3600e3).toISOString();
        await r.fulfill({ response: res, json: j });
      });
    }],
  ];
  for (const [name, file, setup] of failures) {
    await step(name, async () => {
      const c = await b.newContext(phone);
      await setup(c);
      const p = await c.newPage();
      await p.goto(U, { waitUntil: 'load' });
      const before = await p.evaluate(() => document.documentElement.scrollHeight);
      await toFc(p);
      L('heightBefore', before, JSON.stringify(await fcState(p)));
      await p.screenshot({ path: OUT + file });
      await c.close();
    });
  }

  await step('Interactions phone', async () => {
    const c = await b.newContext(phone);
    const p = await c.newPage();
    await p.goto(U, { waitUntil: 'load' });
    await p.waitForTimeout(800);
    L('bar at top', await p.evaluate(() => { const e = document.getElementById('bar'); return { cls: e.className, top: Math.round(e.getBoundingClientRect().top) }; }));
    L('hero', JSON.stringify(await p.evaluate(() => {
      const h = document.querySelector('.hero');
      return { h1: h.querySelector('h1').innerText, text: h.innerText.slice(0, 200), btns: [...h.querySelectorAll('a')].map((a) => { const r = a.getBoundingClientRect(); return { t: a.innerText.trim(), h: Math.round(r.height), w: Math.round(r.width), bottom: Math.round(r.bottom), href: a.getAttribute('href'), target: a.target }; }) };
    })));
    L('small targets', JSON.stringify(await p.evaluate(() => [...document.querySelectorAll('a,button')].filter((e) => e.offsetParent).map((e) => { const r = e.getBoundingClientRect(); return { t: (e.innerText || e.getAttribute('aria-label') || e.className).trim().slice(0, 30), w: Math.round(r.width), h: Math.round(r.height) }; }).filter((x) => x.h < 44 || x.w < 44))));
    L('links', JSON.stringify(await p.evaluate(() => { const o = {}; for (const a of document.querySelectorAll('a[href]')) { const h = a.getAttribute('href'); o[h] = (o[h] || 0) + 1; } return o; })));
    const shows = await p.$$('[data-show]');
    L('shows', shows.length);
    const s = shows[0];
    await s.scrollIntoViewIfNeeded();
    await p.waitForTimeout(300);
    const next = await s.$('.next');
    const st = () => s.evaluate((e) => ({ left: Math.round(e.querySelector('.track').scrollLeft), cur: [...e.querySelectorAll('.dot')].findIndex((d) => d.getAttribute('aria-current') === 'true') }));
    L('before', await st());
    await next.tap();
    await p.waitForTimeout(120);
    await p.screenshot({ path: OUT + 'slide-mid.png' });
    await p.waitForTimeout(600);
    L('after next', await st());
    await p.screenshot({ path: OUT + 'slide-after.png' });
    const box = await (await s.$('.track')).boundingBox();
    const cdp = await c.newCDPSession(p);
    await cdp.send('Input.synthesizeScrollGesture', { x: box.x + box.width * 0.7, y: box.y + box.height / 2, xDistance: -250, yDistance: 0, speed: 900, gestureSourceType: 'touch' });
    await p.waitForTimeout(600);
    L('after swipe', await st());
    const q = await p.$('[data-quotes]');
    await q.scrollIntoViewIfNeeded();
    await p.waitForTimeout(300);
    await p.screenshot({ path: OUT + 'quote-0.png' });
    const h0 = await q.evaluate((e) => Math.round(e.getBoundingClientRect().height));
    await (await q.$('.next')).tap();
    await p.waitForTimeout(120);
    await p.screenshot({ path: OUT + 'quote-mid.png' });
    await p.waitForTimeout(500);
    await p.screenshot({ path: OUT + 'quote-1.png' });
    L('quote box h', h0, await q.evaluate((e) => Math.round(e.getBoundingClientRect().height)), 'quotes', await q.evaluate((e) => e.querySelectorAll('.q').length));
    L('headings', JSON.stringify(await p.evaluate(() => [...document.querySelectorAll('h2,h3')].map((e) => e.tagName + ':' + e.innerText.slice(0, 40)))));
    await c.close();
  });

  // Opens the listing only: no dates, no sign-in, no form. The tel: links are read, never tapped.
  await step('Booking tap', async () => {
    const c = await b.newContext(phone);
    const p = await c.newPage();
    await p.goto(U, { waitUntil: 'load' });
    await p.waitForTimeout(800);
    const pop = c.waitForEvent('page', { timeout: 6000 }).catch(() => null);
    const a = p.locator('.hero a[href*="booking.com"]').first();
    const t = Date.now();
    await a.tap();
    const np = await Promise.race([pop, p.waitForURL(/booking\.com/, { timeout: 20000 }).then(() => null).catch(() => null)]);
    const land = np || p;
    await land.waitForLoadState('domcontentloaded', { timeout: 25000 }).catch(() => {});
    await land.waitForTimeout(3000);
    L('landed', land.url(), 'newTab', !!np, 'ms', Date.now() - t);
    L('title', await land.title());
    const rej = land.locator('#onetrust-reject-all-handler, button:has-text("Decline"), button:has-text("Reject")').first();
    if (await rej.count()) { await rej.tap().catch(() => {}); L('declined cookies'); await land.waitForTimeout(800); }
    await land.screenshot({ path: PR + 'booking-fold.png' });
    L('body', (await land.evaluate(() => document.body.innerText.slice(0, 500))).replace(/\n+/g, ' | '));
    await c.close();
  });

  await step('Google listing', async () => {
    const c = await b.newContext(phone);
    const p = await c.newPage();
    await p.goto('https://www.google.com/maps/search/?api=1&query=Lotus+Surf+House+Midigama&hl=en', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await p.waitForTimeout(4000);
    const rej = p.locator('button:has-text("Reject all")').first();
    if (await rej.count()) { await rej.tap().catch(() => {}); L('rejected cookies'); await p.waitForTimeout(3000); }
    L(p.url().slice(0, 120));
    await p.screenshot({ path: PR + 'google-fold.png' });
    L((await p.evaluate(() => document.body.innerText.slice(0, 300))).replace(/\n+/g, ' | '));
    await c.close();
  });

  await step('Laptop', async () => {
    const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await c.newPage();
    const cons = [];
    p.on('console', (m) => { if (m.type() === 'error') cons.push(m.text().slice(0, 120)); });
    await p.goto(U, { waitUntil: 'load' });
    await p.waitForTimeout(100);
    await p.screenshot({ path: LAP + 'cold.png' });
    await p.waitForTimeout(1500);
    await p.screenshot({ path: LAP + 'settled.png' });
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    L('H', H);
    let y = 0, i = 0;
    while (y < H - 900 && i < 16) {
      y += 720;
      await p.mouse.wheel(0, 720);
      await p.waitForTimeout(900);
      await p.screenshot({ path: LAP + `scroll-${String(++i).padStart(2, '0')}.png` });
    }
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.waitForTimeout(600);
    await p.locator('.hero a[href*="booking.com"]').first().hover();
    await p.waitForTimeout(250);
    await p.screenshot({ path: LAP + 'hover-cta.png' });
    await p.mouse.move(5, 5);
    for (let k = 0; k < 3; k++) await p.keyboard.press('Tab');
    await p.waitForTimeout(150);
    await p.screenshot({ path: LAP + 'focus.png' });
    L('focus', await p.evaluate(() => { const e = document.activeElement; const c = getComputedStyle(e); return { t: e.innerText.slice(0, 30), outline: c.outlineStyle + ' ' + c.outlineWidth + ' ' + c.outlineColor }; }));
    await toFc(p);
    await p.waitForTimeout(1500);
    await p.screenshot({ path: LAP + 'forecast.png' });
    L(JSON.stringify(await fcState(p)));
    L('console', cons);
    await c.close();
  });

  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
