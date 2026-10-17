#!/usr/bin/env node
// tools/audit-mockup.mjs — collect the evidence rubric.md demands, per mockup.
//
// The rubric says a score without evidence is invalid, and lists what the critic
// must produce: a first-load network log, the playbook §4 budget table filled
// with actuals, a tap-through log for the booking CTA, screenshots, and a facts
// table. This measures all of it and writes JSON the critic scores from.
//
// Performance is measured, not estimated: LCP and CLS are read in Chromium over
// CDP with the network and CPU throttled to a mid-range phone on slow 4G, which
// is what playbook §4 assumes, together with the first-load transfer broken down
// by type. Those are the numbers the budget names.
//
//   node tools/audit-mockup.mjs <slug> <variant>     -> writes audit.json
//   node tools/audit-mockup.mjs --all

import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { serve } from './_serve.mjs';

const root = process.cwd();

/* playbook §4: a mid-range Android on slow 4G, metered. */
const SLOW_4G = { offline: false, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8, latency: 150 };

async function auditOne(browser, slug, variant, port) {
  const proj = path.join(root, 'sites', slug, 'mockups', variant);
  const dist = path.join(proj, 'dist');
  const srv = await serve(dist, port);
  const url = `http://localhost:${port}/`;
  const out = { slug, variant, measured_at: new Date().toISOString() };

  // ---------- first load on a throttled phone, no scroll ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', SLOW_4G);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });

    const reqs = [];
    page.on('response', async (r) => {
      const u = new URL(r.url());
      let bytes = 0;
      try { bytes = (await r.body()).length; } catch {}
      reqs.push({ host: u.host, ext: path.extname(u.pathname) || '.html', bytes, status: r.status() });
    });

    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(3500);   // let LCP settle without scrolling

    const vitals = await page.evaluate(() => new Promise((res) => {
      let lcp = 0, cls = 0;
      try {
        new PerformanceObserver((l) => { for (const e of l.getEntries()) lcp = e.startTime; })
          .observe({ type: 'largest-contentful-paint', buffered: true });
        new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) cls += e.value; })
          .observe({ type: 'layout-shift', buffered: true });
      } catch {}
      const nav = performance.getEntriesByType('navigation')[0];
      setTimeout(() => res({
        lcp_ms: Math.round(lcp),
        cls: +cls.toFixed(4),
        dcl_ms: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
      }), 900);
    }));

    const sum = (f) => reqs.filter(f).reduce((n, r) => n + r.bytes, 0);
    const hosts = [...new Set(reqs.map((r) => r.host))];
    out.first_load = {
      requests: reqs.length,
      hosts,
      third_party_hosts: hosts.filter((h) => !h.startsWith('localhost')),
      bytes_total: sum(() => true),
      bytes_html: sum((r) => r.ext === '.html'),
      bytes_js: sum((r) => r.ext === '.js' || r.ext === '.mjs'),
      bytes_css: sum((r) => r.ext === '.css'),
      bytes_fonts: sum((r) => r.ext === '.woff2' || r.ext === '.woff'),
      bytes_images: sum((r) => ['.webp', '.jpg', '.jpeg', '.png', '.svg', '.avif'].includes(r.ext)),
      largest_image_bytes: Math.max(0, ...reqs.filter((r) => ['.webp', '.jpg', '.png'].includes(r.ext)).map((r) => r.bytes)),
      ...vitals,
    };
    await ctx.close();
  }

  // ---------- layout shift while scrolling (the page must never jump) ----------
  /* "early": the visitor scrolls from DOMContentLoaded on, on the throttled phone, so
     anything that sets itself up late (a pin spacer, a library-built section, a font
     swap) is reached before it is ready. "settled": the same scroll after everything
     has loaded. Scrolling here is programmatic, so no shift is excluded as input. */
  out.scroll = {};
  for (const pass of ['early', 'settled']) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', SLOW_4G);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await page.addInitScript(() => {
      window.__shifts = [];
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) {
          const src = (e.sources || []).map((s) => {
            const n = s.node;
            if (!n || n.nodeType !== 1) return '#text';
            return n.tagName.toLowerCase() + (n.id ? '#' + n.id : '') + (n.classList.length ? '.' + [...n.classList].slice(0, 2).join('.') : '');
          });
          window.__shifts.push({ value: e.value, at_ms: Math.round(e.startTime), y: Math.round(scrollY), sources: src });
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.goto(url, { waitUntil: pass === 'early' ? 'domcontentloaded' : 'load' });
    if (pass === 'settled') {
      await page.waitForTimeout(3500);
      await page.evaluate(() => { window.__shifts = []; });
    }
    for (let i = 0; i < 80; i++) {
      const done = await page.evaluate(() => {
        if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) return true;
        scrollBy(0, Math.round(innerHeight * 0.8));
        return false;
      });
      if (done) break;
      await page.waitForTimeout(250);
    }
    await page.waitForTimeout(1500);
    const shifts = await page.evaluate(() => window.__shifts);
    out.scroll[pass] = {
      cls: +shifts.reduce((n, s) => n + s.value, 0).toFixed(4),
      shifts: shifts.filter((s) => s.value >= 0.001).slice(0, 12).map((s) => ({ ...s, value: +s.value.toFixed(4) })),
    };
    await ctx.close();
  }

  // ---------- booking tap-through, keyboard, alt text, tap targets ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });

    out.booking = await page.evaluate(() => {
      const links = [...document.querySelectorAll('a[href]')];
      const ext = links.filter((a) => /^https?:/.test(a.getAttribute('href')));
      const tel = links.filter((a) => a.getAttribute('href').startsWith('tel:'));
      const triggers = [...document.querySelectorAll('[data-open-drawer]')];
      return {
        external_booking_hrefs: [...new Set(ext.map((a) => a.href))],
        tel_hrefs: [...new Set(tel.map((a) => a.getAttribute('href')))],
        drawer_triggers: triggers.length,
        triggers_are_links: triggers.every((t) => t.tagName === 'A' && t.getAttribute('href') === '#book'),
        primary_above_fold: !!links.find((a) => {
          const r = a.getBoundingClientRect();
          return r.top < innerHeight && r.height > 0 && (/^https?:/.test(a.getAttribute('href')) || a.hasAttribute('data-open-drawer'));
        }),
      };
    });

    // tap the first booking action and record where it would land
    const primary = page.locator('a[href^="http"], [data-open-drawer]').first();
    out.booking.tapped = await primary.evaluate((el) => el.getAttribute('href'));

    // keyboard: drawer opens, Esc closes, focus returns
    if (out.booking.drawer_triggers) {
      await page.locator('[data-open-drawer]').first().click();
      await page.waitForTimeout(400);
      const opened = await page.evaluate(() => document.querySelector('[data-drawer]')?.open === true);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      const after = await page.evaluate(() => ({
        closed: document.querySelector('[data-drawer]')?.open === false,
        focus_returned: document.activeElement?.hasAttribute('data-open-drawer') === true,
      }));
      out.keyboard = { drawer_opens: opened, ...after };
    } else {
      out.keyboard = { drawer_opens: null, closed: null, focus_returned: null, note: 'no drawer; every action is a plain link' };
    }

    out.a11y = await page.evaluate(() => {
      const imgs = [...document.images];
      const tapables = [...document.querySelectorAll('a[href], button, [role="button"]')]
        .filter((e) => {
          const r = e.getBoundingClientRect();
          if (r.height <= 1 || r.width <= 1) return false;   // visually-hidden skip links
          const s = getComputedStyle(e);
          return s.visibility !== 'hidden' && s.display !== 'none';
        });
      /* playbook §10 / rubric: a tap target must be at least 44x44. Until 2026-09-23 this
         flagged only targets small on BOTH sides, which no text link can fail — KA shipped 15
         targets under 44 px high and the audit reported 0. Either side is now enough. */
      const small = tapables.filter((e) => { const r = e.getBoundingClientRect(); return r.height < 44 || r.width < 44; });
      return {
        images: imgs.length,
        images_without_alt: imgs.filter((i) => i.getAttribute("alt") === null).length,
        images_alt_empty_decorative: imgs.filter((i) => i.getAttribute('alt') === '').length,
        tapables: tapables.length,
        tapables_under_44px: small.length,
        tapables_under_44px_examples: small.slice(0, 6).map((e) => { const r = e.getBoundingClientRect(); return `${(e.textContent || '').trim().slice(0, 24)} ${Math.round(r.width)}x${Math.round(r.height)}`; }),
        headings: [...document.querySelectorAll('h1,h2,h3')].map((h) => h.tagName),
        has_skip_link: !!document.querySelector('a[href^="#"]'),
        lang: document.documentElement.lang,
      };
    });
    await ctx.close();
  }

  // ---------- JavaScript off ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(600);
    out.no_js = await page.evaluate(() => {
      const foot = document.querySelector('#book');
      return {
        text_length: document.body.innerText.trim().length,
        booking_links_reachable: foot ? foot.querySelectorAll('a[href^="http"], a[href^="tel:"]').length : 0,
        visible_images: [...document.images].filter((i) => i.getBoundingClientRect().height > 0).length,
      };
    });
    await ctx.close();
  }

  // ---------- reduced motion ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(900);
    out.reduced_motion = await page.evaluate(() => ({
      canvases: document.querySelectorAll('canvas').length,
      canvases_hidden: [...document.querySelectorAll('canvas')].filter((c) => +getComputedStyle(c).opacity === 0).length,
      photograph_visible: [...document.images].some((i) => i.getBoundingClientRect().height > 100),
    }));
    await ctx.close();
  }

  // ---------- every visible number and name traces to the passed copy ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    const text = await page.evaluate(() => document.body.innerText);
    const copy = JSON.parse(fs.readFileSync(path.join(root, 'sites', slug, 'copy', 'en.json'), 'utf8'));
    const copyText = JSON.stringify(copy);
    /* the checkable claims are the numbers: prices, scores, counts, times, distances */
    const nums = [...new Set((text.match(/\d+[\d.,:]*/g) || []))].filter((n) => n.length > 0);
    const unmatched = nums.filter((n) => !copyText.includes(n.replace(/,$/, '')));
    out.facts = {
      numbers_on_page: nums.length,
      numbers_not_in_passed_copy: unmatched,
      note: 'copy/en.json passed station 4c with 0 unsourced and 0 contradicted claims; copy/sources.md maps each paragraph to its dossier fields. A number here that is not in the copy is either an interface label (01, 02…) or a claim to chase.',
    };
    await ctx.close();
  }

  srv.close();
  fs.writeFileSync(path.join(proj, 'audit.json'), JSON.stringify(out, null, 1));
  return out;
}

const args = process.argv.slice(2);
const b = await chromium.launch();
let port = 8980;
const targets = [];
if (args.includes('--all') || args.length === 0) {
  for (const slug of fs.readdirSync(path.join(root, 'sites')).sort()) {
    const m = path.join(root, 'sites', slug, 'mockups');
    if (!fs.existsSync(m)) continue;
    for (const v of ['calm', 'interactive', 'unique']) if (fs.existsSync(path.join(m, v, 'dist'))) targets.push([slug, v]);
  }
} else targets.push([args[0], args[1]]);

const rows = [];
for (const [slug, variant] of targets) {
  const o = await auditOne(b, slug, variant, port++);
  const kb = (n) => Math.round(n / 1024);
  rows.push({
    slug: slug.slice(0, 22), variant,
    'first KB': kb(o.first_load.bytes_total), 'JS KB': kb(o.first_load.bytes_js),
    'LCP ms': o.first_load.lcp_ms, CLS: o.first_load.cls,
    'scroll CLS': Math.max(o.scroll.early.cls, o.scroll.settled.cls),
    '3rd party': o.first_load.third_party_hosts.length,
    'noJS links': o.no_js.booking_links_reachable,
    'kbd ok': o.keyboard.focus_returned ?? 'n/a',
    'alt miss': o.a11y.images_without_alt,
  });
  console.log(`audited ${slug}/${variant}`);
}
await b.close();
console.table(rows);
