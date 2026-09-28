#!/usr/bin/env node
// tools/funnel.mjs — measure a site's booking funnel from a phone: how many taps from the landing
// page to a real booking action, and whether that action is visible before the first scroll.
//
//   node tools/funnel.mjs <http(s)://url | file.html> [--out <dir>] [--depth 3] [--pages 30] [--shots]
//
// Why: the scout and the auditor (proposal 007) both need "clicks to book" as a number a human can
// verify, not an opinion. Every action found carries its page URL, its label, its position and
// the class it landed in, so a finding built on it can be checked by opening the link.
//
// What it does: mobile viewport (390×844), breadth-first crawl of same-site links from the landing
// page up to --depth taps and --pages pages. On every page it lists the booking actions (WhatsApp,
// tel:, mailto:, a known booking engine, a form with a date field, or a link whose text reads like
// "book" in the run's languages). clicks_to_book = the shallowest page carrying a *terminal* action
// (whatsapp / tel / engine / dated form); an inquiry page or an email link is recorded but does not
// count as terminal — a traveller who has to write an email and wait has not booked.
//
// Output in <out> (default ./funnel): funnel.json, landing-mobile.png (+ per-page shots with --shots).
// It never submits a form, never follows an engine off-site, never logs in.

import { chromium } from 'playwright';
import { mkdir, writeFile, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
if (!args.length || args[0].startsWith('--')) {
  console.error('usage: node tools/funnel.mjs <url|file.html> [--out dir] [--depth 3] [--pages 30] [--shots]');
  process.exit(2);
}
const opt = (name, dflt) => { const i = args.indexOf('--' + name); return i > -1 ? args[i + 1] : dflt; };
const flag = (name) => args.includes('--' + name);
const out = resolve(opt('out', 'funnel'));
const maxDepth = Number(opt('depth', 3));
const maxPages = Number(opt('pages', 30));
const shots = flag('shots');

let start = args[0];
if (!/^https?:\/\//.test(start)) {
  let p = resolve(start);
  if ((await stat(p)).isDirectory()) p = join(p, 'index.html');
  start = pathToFileURL(p).href;
}

const VIEWPORT = { width: 390, height: 844 };
const ENGINES = [
  'booking.com', 'agoda.com', 'airbnb.', 'hostelworld.com', 'expedia.', 'hotels.com', 'tripadvisor.',
  'cloudbeds.com', 'littlehotelier.com', 'siteminder.com', 'freetobook.com', 'hotelonia.com', 'beds24.com',
  'bookeo.com', 'fareharbor.com', 'checkfront.com', 'peek.com', 'rezdy.com', 'calendly.com', 'setmore.com',
  'simplybook.', 'acuityscheduling.com', 'bokun.io', 'viator.com', 'getyourguide.', 'trekksoft.com',
  'lodgify.com', 'guesty.com', 'hostaway.com', 'eviivo.com', 'sirvoy.com', 'octorate.com', 'wubook.net',
  'mews.com', 'surfbookings', 'bookwhen.com',
];
// "book" in the languages a Sri Lankan surf site is likely to carry; extend per run when needed.
const BOOK_WORDS = /\b(book|booking|reserve|reservation|check availability|availability|enquire|enquiry|inquire|inquiry|contact us|get in touch|buchen|reservieren|anfrage|reservar|reserva|réserver|prenota|boka|забронировать)\b/i;
const CONTACT_WORDS = /\b(contact|enquir|inquir|get in touch|anfrage|kontakt|contacto)\b/i;

const norm = (u) => { try { const x = new URL(u); x.hash = ''; return x.href.replace(/\/$/, ''); } catch { return null; } };
const host = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } };

function classify(href, text, sameSite) {
  const h = (href || '').toLowerCase();
  const t = (text || '').trim();
  if (/wa\.me\/|api\.whatsapp\.com|whatsapp:\/\//.test(h)) return 'whatsapp';
  if (h.startsWith('tel:')) return 'tel';
  if (h.startsWith('mailto:')) return 'email';
  // An engine is a hand-off to another host. On a white-label engine site (the business's "site"
  // *is* hotelonia / cloudbeds), internal links are navigation, and the dated form is the terminal.
  if (!sameSite && ENGINES.some((e) => h.includes(e))) return /review|bewertung|opinion/i.test(t) || /\/reviews?\b/i.test(h) ? 'review_link' : 'engine';
  if (/whatsapp/i.test(t)) return 'whatsapp';
  if (BOOK_WORDS.test(t) && !CONTACT_WORDS.test(t)) return 'book_link';
  if (CONTACT_WORDS.test(t)) return 'contact_link';
  return null;
}
const TERMINAL = new Set(['whatsapp', 'tel', 'engine', 'dated_form']);

await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2, isMobile: true, hasTouch: true, ignoreHTTPSErrors: true });
const page = await ctx.newPage();
const consoleErrors = [];
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 200)); });

const startHost = host(start);
const whitelabelEngine = ENGINES.some((e) => startHost.includes(e.replace(/\.$/, '')));
const queue = [{ url: start, depth: 0, via: null }];
const seen = new Set([norm(start)]);
const pages = [];
let landing = null;

while (queue.length && pages.length < maxPages) {
  const { url, depth, via } = queue.shift();
  const rec = { url, depth, via, status: null, final_url: null, title: null, viewport_meta: false, text_chars: 0, actions: [], internal_links: 0, error: null };
  try {
    const resp = await page.goto(url, { waitUntil: 'load', timeout: 30000 });
    await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(1500); // JS-rendered builders (Wix, Squarespace) paint after load
    rec.status = resp ? resp.status() : null;
    rec.final_url = page.url();
    if (host(rec.final_url) !== startHost && depth > 0) {
      // The tap led off the business's site (e.g. /book → booking.com). That is the terminal action
      // itself: a hand-off to an engine or somewhere else. Do not inventory the other site's links.
      const cls = ENGINES.some((e) => rec.final_url.toLowerCase().includes(e)) ? 'engine' : 'offsite';
      rec.actions.push({ class: cls, terminal: cls === 'engine', href: rec.final_url, label: `redirect from ${url}`, tag: 'redirect', top: 0, above_fold: true });
      rec.handoff = rec.final_url;
      pages.push(rec);
      continue;
    }
    rec.title = (await page.title()).slice(0, 120);
    rec.viewport_meta = (await page.locator('meta[name="viewport"]').count()) > 0;
    rec.text_chars = (await page.evaluate(() => document.body?.innerText?.length ?? 0));

    const raw = await page.evaluate(({ vh }) => {
      const vis = (el) => {
        const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && cs.opacity !== '0';
      };
      const items = [];
      for (const el of document.querySelectorAll('a[href], button, [role=button], input[type=submit]')) {
        if (!vis(el)) continue;
        const r = el.getBoundingClientRect();
        items.push({
          href: el.getAttribute('href') ? el.href || el.getAttribute('href') : null,
          text: (el.innerText || el.value || el.getAttribute('aria-label') || '').trim().slice(0, 80),
          top: Math.round(r.top + scrollY), height: Math.round(r.height), width: Math.round(r.width),
          above_fold: r.top >= 0 && r.top + r.height <= vh,
          tag: el.tagName.toLowerCase(),
        });
      }
      const forms = [...document.querySelectorAll('form')].filter(vis).map((f) => ({
        action: f.getAttribute('action') || null,
        dated: !!f.querySelector('input[type=date], input[name*=date i], input[placeholder*=date i], input[name*=checkin i], input[name*=check-in i], input[name*=arrival i]'),
        fields: f.querySelectorAll('input:not([type=hidden]), select, textarea').length,
        top: Math.round(f.getBoundingClientRect().top + scrollY),
        above_fold: f.getBoundingClientRect().top + f.getBoundingClientRect().height <= vh,
      }));
      const links = [...document.querySelectorAll('a[href]')].map((a) => a.href);
      return { items, forms, links };
    }, { vh: VIEWPORT.height });

    for (const it of raw.items) {
      const cls = classify(it.href, it.text, host(it.href || '') === startHost);
      if (cls) rec.actions.push({ class: cls, terminal: TERMINAL.has(cls), href: it.href, label: it.text, tag: it.tag, top: it.top, height: it.height, width: it.width, above_fold: it.above_fold, tap_target_ok: it.height >= 44 && it.width >= 44 });
    }
    for (const f of raw.forms) {
      rec.actions.push({ class: f.dated ? 'dated_form' : 'form', terminal: f.dated, href: f.action, label: `form (${f.fields} fields)`, tag: 'form', top: f.top, above_fold: f.above_fold });
    }

    const internal = [];
    for (const l of raw.links) {
      const n = norm(l);
      if (!n || !/^https?:/.test(n)) continue;
      if (host(n) !== startHost) continue;
      if (/\.(pdf|jpe?g|png|gif|webp|svg|zip|mp4|mov)$/i.test(n)) continue;
      internal.push(n);
      if (!seen.has(n) && depth < maxDepth) { seen.add(n); queue.push({ url: n, depth: depth + 1, via: url }); }
    }
    rec.internal_links = new Set(internal).size;

    if (depth === 0 || shots) {
      const name = depth === 0 ? 'landing-mobile.png' : `page-${String(pages.length).padStart(2, '0')}.png`;
      await page.screenshot({ path: join(out, name), fullPage: depth === 0 });
      rec.screenshot = name;
    }
    if (depth === 0) {
      landing = rec;
      await page.screenshot({ path: join(out, 'landing-fold.png'), fullPage: false });
      rec.fold_screenshot = 'landing-fold.png';
    }
  } catch (e) {
    rec.error = String(e.message || e).slice(0, 200);
  }
  pages.push(rec);
}
await browser.close();

// Summary: shallowest terminal action, and what the landing page shows before a scroll.
let clicksToBook = null; let firstTerminal = null;
for (const p of pages) {
  const t = p.actions.find((a) => a.terminal);
  if (t && (clicksToBook === null || p.depth < clicksToBook)) { clicksToBook = p.depth; firstTerminal = { page: p.url, ...t }; }
}
// Tapping an action on the landing page is itself one tap: clicks_to_book = depth + 1.
const summary = {
  tool: 'funnel.mjs', version: '0.1.0', measured_at: new Date().toISOString(),
  start_url: start, whitelabel_engine: whitelabelEngine, final_landing_url: landing?.final_url ?? null, landing_status: landing?.status ?? null,
  landing_error: landing?.error ?? null,
  viewport: VIEWPORT, viewport_meta: landing?.viewport_meta ?? false, landing_text_chars: landing?.text_chars ?? 0,
  clicks_to_book: clicksToBook === null ? null : clicksToBook + 1,
  primary_action: firstTerminal ? { class: firstTerminal.class, href: firstTerminal.href, label: firstTerminal.label, page: firstTerminal.page } : null,
  cta_above_fold: !!landing?.actions.some((a) => (a.terminal || a.class === 'book_link') && a.above_fold),
  terminal_above_fold: !!landing?.actions.some((a) => a.terminal && a.above_fold),
  any_action_above_fold: !!landing?.actions.some((a) => a.above_fold),
  landing_actions: landing?.actions ?? [],
  action_classes_seen: [...new Set(pages.flatMap((p) => p.actions.map((a) => a.class)))],
  pages_crawled: pages.length, pages_with_errors: pages.filter((p) => p.error || (p.status && p.status >= 400)).map((p) => ({ url: p.url, status: p.status, error: p.error })),
  console_errors: consoleErrors.slice(0, 20),
  pages,
};
await writeFile(join(out, 'funnel.json'), JSON.stringify(summary, null, 2));
const line = `${summary.final_landing_url ?? start} — status ${summary.landing_status}, clicks_to_book ${summary.clicks_to_book ?? 'none found'}, primary ${summary.primary_action?.class ?? '-'} (${summary.primary_action?.label ?? '-'}), CTA above fold ${summary.cta_above_fold}, pages ${summary.pages_crawled}, broken ${summary.pages_with_errors.length}`;
console.log(line);
console.log(`→ ${join(out, 'funnel.json')}`);
