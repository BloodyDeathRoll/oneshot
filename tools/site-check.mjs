#!/usr/bin/env node
// tools/site-check.mjs — post-CMS acceptance suite and scheduled smoke check for a live client site
// (Shahar, 2026-10-05: "We need to set up tests post CMS build to make sure everything is running
// smoothly"). One tool, three depths:
//
//   node tools/site-check.mjs <slug|url> --smoke     HTTP only, read-only, no secrets: pages + assets 200,
//                                                    booking hand-off URLs well formed, forecast data
//                                                    reachable and < 24 h old, SEO plumbing
//   node tools/site-check.mjs <slug|url>             acceptance: smoke + Playwright at 390 and 1440 —
//                                                    console errors, third-party requests on first load,
//                                                    mixed content, horizontal overflow, hero CTA → booking
//                                                    page → hand-off (JS on and off, nothing sent to the
//                                                    engine), funnel vs audit.json, Rosa block, video
//                                                    renditions + reduced motion, playbook §4 budgets
//   node tools/site-check.mjs <slug|url> --full      acceptance + the CMS (managed / self_hosted_docker):
//                                                    health, parity (CMS build vs a local build of the
//                                                    repo's content.json), the owner path (login, one edit
//                                                    → publish → live → restored), tenant isolation,
//                                                    anonymous reads and writes 403. Needs CMS_SSH + the
//                                                    sealed owner credentials. --no-parity skips parity
//                                                    (expected to differ once the owner has edited).
//   node tools/site-check.mjs --all [--smoke]        every live target (tools/site-check-lib.mjs
//                                                    collectTargets) + each CMS's public health; the
//                                                    scheduled monitor (.github/workflows/site-monitor.yml)
//   node tools/site-check.mjs --targets              list those targets
//
// Options: --url <url> (check this address for <slug>), --report <file.json>, --json (JSON on stdout).
// Output: a JSON report (default: $TMPDIR/oneshot-site-check/<slug>-<time>.json) and a short summary.
// Exit 1 on any failure, 2 on usage errors.
//
// Never: a write to the booking engine (engine hosts are never requested — links are parsed, forms are
// submitted only into a route that aborts the navigation and records its URL), a login outside --full,
// a change it does not put back (--full's one edit is restored and the live HTML compared before/after).

import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync, symlinkSync, cpSync, appendFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  checkHandoff, checkContactLink, checkFormHandoff, collectTargets, cssUrls, extractRefs, forecastFreshness,
  formHandoff, hostOf, isEngineUrl, isPreviewUrl, robotsInfo, sitemapLocs, sniffVideo, videoKindOfPath, videoRenditions, ENGINE_HOSTS,
} from './site-check-lib.mjs'

const VERSION = '0.1.0'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const UA = `oneshot-site-check/${VERSION} (+monitor of our own sites)`
const SLOW_4G = { offline: false, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8, latency: 150 }
const BUDGET = { lcp_ms: 2500, cls: 0.1, first_load_bytes: 1.5e6, js_bytes: 300e3, third_party_on_load: 0 } // playbook §4
const VIEWPORTS = [
  { name: '390', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  { name: '1440', viewport: { width: 1440, height: 900 }, isMobile: false, hasTouch: false, deviceScaleFactor: 1 },
]

// ------------------------------------------------------------------ repo context

const readJson = (p) => { try { return JSON.parse(readFileSync(p, 'utf8')) } catch { return null } }
const readJsonc = (p) => { try { return JSON.parse(readFileSync(p, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')) } catch { return null } }
const siteSlugs = () => readdirSync(path.join(ROOT, 'sites'), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
const ledgerLines = () => {
  try { return readFileSync(path.join(ROOT, 'ledger.jsonl'), 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l) } catch { return null } }).filter(Boolean) } catch { return [] }
}
export function targets() {
  const deploys = {}, wrangler = {}
  for (const s of siteSlugs()) {
    const d = readJson(path.join(ROOT, 'sites', s, 'deploy.json')); if (d) deploys[s] = d
    const w = readJsonc(path.join(ROOT, 'sites', s, 'final', 'wrangler.jsonc')); if (w?.name) wrangler[s] = w.name
  }
  return collectTargets({ ledger: ledgerLines(), deploys, wrangler })
}
const siteContext = (slug) => {
  if (!slug) return { videoManifests: [] }
  const final = path.join(ROOT, 'sites', slug, 'final')
  const content = readJson(path.join(final, 'src', 'tenant', 'content.json'))
  const manifests = ['videos.generated.json', 'videos.portrait.json'].map((f) => path.join(final, 'src', 'tenant', f)).filter(existsSync)
  return {
    final, site: content?.locales?.en ?? null,
    deploy: readJson(path.join(ROOT, 'sites', slug, 'deploy.json')),
    audit: readJson(path.join(ROOT, 'dossier', slug, 'audit.json')),
    worker: readJsonc(path.join(final, 'wrangler.jsonc'))?.name ?? null,
    videoManifests: manifests.map((p) => ({ file: path.relative(ROOT, p), data: readJson(p) })),
  }
}

// ------------------------------------------------------------------ http helpers

const pool = async (items, n, fn) => {
  const out = new Array(items.length); let i = 0
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => { while (i < items.length) { const k = i++; out[k] = await fn(items[k], k) } }))
  return out
}
const get = async (url, opts = {}) => {
  const t0 = Date.now()
  try {
    const res = await fetch(url, { redirect: 'follow', cache: 'no-store', ...opts, headers: { 'user-agent': UA, 'cache-control': 'no-cache', ...(opts.headers ?? {}) }, signal: AbortSignal.timeout(opts.timeoutMs ?? 30_000) })
    return { url, status: res.status, finalUrl: res.url, type: res.headers.get('content-type') ?? '', res, ms: Date.now() - t0 }
  } catch (e) { return { url, status: `error: ${e.cause?.code ?? e.message}`, type: '', res: null, ms: Date.now() - t0 } }
}
const getText = async (url, opts) => { const r = await get(url, opts); r.text = r.res ? await r.res.text().catch(() => '') : ''; return r }
const head = async (url) => {
  let r = await get(url, { method: 'HEAD' })
  if (r.status === 405 || r.status === 501) { r = await get(url, { headers: { range: 'bytes=0-0' } }); await r.res?.body?.cancel() }
  return r
}
const ok2xx = (s) => s === 200 || s === 206 || s === 304
const stripQH = (u) => { const x = new URL(u); x.hash = ''; x.search = ''; return x.href }

// ------------------------------------------------------------------ report plumbing

function newReport({ slug, url, kind, mode }) {
  return { tool: 'site-check.mjs', version: VERSION, mode, slug: slug ?? null, url, kind: kind ?? null, preview: isPreviewUrl(url), started: new Date().toISOString(), ms: 0, ok: false, checks: [], failures: [] }
}
async function check(report, id, fn) {
  const t0 = Date.now()
  const c = { id, ok: false }
  try {
    const r = (await fn()) ?? {}
    Object.assign(c, r)
    c.failures = r.failures ?? []
    c.ok = !r.skipped ? c.failures.length === 0 : true
  } catch (e) {
    c.failures = [`error: ${e.message}`]
    c.ok = false
  }
  c.ms = Date.now() - t0
  report.checks.push(c)
  for (const f of c.failures) report.failures.push(`${id}: ${f}`)
  return c
}

// ------------------------------------------------------------------ smoke (HTTP only)

async function crawl(start, { maxPages = 60 } = {}) {
  const host = hostOf(start)
  const queue = [stripQH(start)], seen = new Set(queue), pages = [], files = new Map()
  while (queue.length && pages.length < maxPages) {
    const url = queue.shift()
    const r = await getText(url)
    const page = { url, status: r.status, finalUrl: r.finalUrl ?? null, type: r.type, bytes: r.text?.length ?? 0 }
    pages.push(page)
    if (!/text\/html/.test(r.type) || !r.text) continue
    page.refs = extractRefs(r.text, r.finalUrl || url)
    page.html = r.text
    for (const l of page.refs.links) {
      if (hostOf(l.url) !== host || !/^https?:/.test(l.url)) continue
      const n = stripQH(l.url)
      const ext = path.extname(new URL(n).pathname)
      if (ext && !/^\.html?$/.test(ext)) { files.set(n, { url: n, from: url, attr: 'a[href]' }); continue }
      if (!seen.has(n)) { seen.add(n); queue.push(n) }
    }
  }
  return { pages, files: [...files.values()], truncated: queue.length > 0 }
}

async function smokePages(ctx) {
  const { pages, truncated } = ctx.crawl
  const failures = pages.filter((p) => p.status !== 200).map((p) => `${p.url} → ${p.status}`)
  if (!pages.some((p) => p.refs)) failures.push('no HTML page served')
  return { failures, pages: pages.map((p) => ({ url: p.url, status: p.status, bytes: p.bytes })), truncated }
}

async function smokeAssets(ctx) {
  const host = hostOf(ctx.url)
  const failures = []
  const assets = new Map()
  const third = [], mixed = []
  for (const p of ctx.crawl.pages) for (const a of p.refs?.assets ?? []) {
    if (ctx.url.startsWith('https:') && a.url.startsWith('http:')) mixed.push(`${a.url} (${a.tag}[${a.attr}] on ${p.url})`)
    if (hostOf(a.url) !== host) { third.push(`${a.url} (${a.tag}[${a.attr}] on ${p.url})`); continue }
    if (!assets.has(a.url)) assets.set(a.url, { url: a.url, from: p.url, attr: `${a.tag}[${a.attr}]` })
  }
  for (const f of ctx.crawl.files) if (!assets.has(f.url)) assets.set(f.url, f)
  // same-origin CSS: its url() references (fonts, images) too
  const css = [...assets.values()].filter((a) => /\.css(\?|$)/.test(a.url))
  for (const c of css) {
    const r = await getText(c.url)
    for (const u of cssUrls(r.text ?? '')) {
      let abs; try { abs = new URL(u, c.url).href } catch { continue }
      if (hostOf(abs) !== host) { third.push(`${abs} (url() in ${c.url})`); continue }
      if (!assets.has(abs)) assets.set(abs, { url: abs, from: c.url, attr: 'css url()' })
    }
  }
  for (const p of ctx.crawl.pages) if (p.html) for (const m of p.html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    for (const u of cssUrls(m[1])) { let abs; try { abs = new URL(u, p.finalUrl || p.url).href } catch { continue } if (hostOf(abs) === host && !assets.has(abs)) assets.set(abs, { url: abs, from: p.url, attr: 'style url()' }) }
  }
  const list = [...assets.values()]
  const res = await pool(list, 8, async (a) => ({ ...a, status: (await head(a.url)).status }))
  for (const r of res) if (!ok2xx(r.status)) failures.push(`${r.url} → ${r.status} (${r.attr} on ${r.from})`)
  for (const m of mixed) failures.push(`mixed content: ${m}`)
  for (const t of third) failures.push(`third-party asset in the HTML: ${t}`)
  const byType = {}
  for (const r of res) { const e = (path.extname(new URL(r.url).pathname) || '(none)').toLowerCase(); byType[e] = (byType[e] ?? 0) + 1 }
  return { failures, assetsChecked: res.length, byType }
}

async function smokeHandoff(ctx) {
  const failures = [], links = new Map(), contact = new Map(), forms = []
  for (const p of ctx.crawl.pages) {
    for (const l of p.refs?.links ?? []) {
      if (isEngineUrl(l.url)) links.set(l.url, p.url)
      else if (/^(tel:|https:\/\/(wa\.me|api\.whatsapp\.com))/i.test(l.url)) contact.set(l.url, p.url)
    }
    for (const f of p.refs?.forms ?? []) {
      const fh = formHandoff(f)
      if (fh.engine) forms.push({ page: p.url, ...fh, problems: checkFormHandoff(fh) })
    }
  }
  const engineLinks = [...links].map(([u, page]) => ({ page, ...checkHandoff(u) }))
  for (const l of engineLinks) for (const pr of l.problems) failures.push(`${l.url}: ${pr} (on ${l.page})`)
  const contacts = [...contact].map(([u, page]) => ({ page, ...checkContactLink(u) }))
  for (const c of contacts) if (!c.ok) failures.push(`malformed ${c.kind} link ${c.href} (on ${c.page})`)
  for (const f of forms) for (const pr of f.problems) failures.push(`booking form on ${f.page}: ${pr}`)
  if (!engineLinks.length && !forms.length && !contacts.length) failures.push('no booking hand-off on any page (no engine link, engine form, WhatsApp or tel)')
  return { failures, engineLinks: engineLinks.map(({ url, ok, problems, start, end, duration }) => ({ url, ok, problems, start, end, duration })), forms: forms.map(({ page, targets, start, end, duration, problems }) => ({ page, targets, start: start && { name: start.name, options: start.options.length, first: start.options[0] ?? null, last: start.options.at(-1) ?? null }, end, duration: duration && duration.options, problems })), contacts }
}

const forecastConfig = (ctx) => {
  const f = ctx.site?.forecast
  const fromHtml = ctx.crawl.pages.flatMap((p) => p.refs?.forecastJson ?? [])
  if (f && !(f.enabled && f.rosaSpotId)) return { enabled: false, source: 'content.json' }
  const json = fromHtml[0] ?? (f ? `https://rosa-data-opal.vercel.app/data/spots/${f.rosaSpotId}.json` : null)
  if (!json) return { enabled: false, source: ctx.site ? 'content.json' : 'html' }
  const spot = f?.rosaSpotId ?? json.match(/spots\/([a-z0-9-]+)\.json/)?.[1]
  return { enabled: true, spot, json, inHtml: fromHtml.length > 0, source: f ? 'content.json' : 'html' }
}

async function smokeForecast(ctx) {
  const fc = forecastConfig(ctx)
  if (!fc.enabled) return { skipped: 'forecast not enabled', source: fc.source }
  const failures = []
  if (!fc.inHtml) failures.push(`forecast.enabled in content.json but no forecast block (data-json) in the live HTML`)
  const r = await getText(fc.json)
  let fresh = null
  if (r.status !== 200) failures.push(`${fc.json} → ${r.status}`)
  else {
    try { fresh = forecastFreshness(JSON.parse(r.text)) } catch { failures.push(`${fc.json}: not JSON`) }
    if (fresh && !fresh.ok) failures.push(`${fc.json}: ${fresh.problem}`)
  }
  const widget = `https://rosa.surf/widget/?spot=${fc.spot}&theme=light&units=metric`
  const w = await get(widget); await w.res?.body?.cancel()
  if (w.status !== 200) failures.push(`${widget} → ${w.status}`)
  return { failures, spot: fc.spot, json: fc.json, status: r.status, freshness: fresh, widget: { url: widget, status: w.status } }
}

async function smokeSeo(ctx) {
  const failures = []
  const origin = new URL(ctx.url).origin
  const htmlPages = ctx.crawl.pages.filter((p) => p.refs)
  const robots = await getText(`${origin}/robots.txt`)
  const ri = robotsInfo(robots.text)
  const sm = await getText(`${origin}/sitemap.xml`)
  const smi = await get(`${origin}/sitemap-index.xml`); await smi.res?.body?.cancel()
  const noindex = htmlPages.map((p) => ({ url: p.url, robots: p.refs.robots }))
  const ev = { expect: ctx.preview ? 'preview: noindex, robots Disallow, no sitemap' : 'production: indexable, sitemap', robotsStatus: robots.status, robots: ri, sitemapStatus: sm.status, sitemapIndexStatus: smi.status, pages: noindex }
  if (robots.status !== 200) failures.push(`robots.txt → ${robots.status}`)
  if (ctx.preview) {
    for (const p of noindex) if (!/noindex/i.test(p.robots ?? '')) failures.push(`${p.url}: no noindex meta on a preview`)
    if (!ri.disallowAll) failures.push('robots.txt does not disallow everything on a preview')
    if (sm.status === 200) failures.push('/sitemap.xml served on a preview')
    if (smi.status === 200) failures.push('/sitemap-index.xml served on a preview')
  } else {
    for (const p of noindex) if (/noindex/i.test(p.robots ?? '')) failures.push(`${p.url}: noindex on the production site`)
    if (ri.disallowAll) failures.push('robots.txt disallows everything on the production site')
    if (!ri.sitemaps.length) failures.push('robots.txt names no sitemap')
    for (const s of ri.sitemaps) if (new URL(s, origin).origin !== origin) failures.push(`robots.txt sitemap on another origin: ${s}`)
    const smUrl = ri.sitemaps[0] ? new URL(ri.sitemaps[0], origin).href : `${origin}/sitemap.xml`
    const smr = smUrl === `${origin}/sitemap.xml` ? sm : await getText(smUrl)
    if (smr.status !== 200) failures.push(`${smUrl} → ${smr.status}`)
    const locs = sitemapLocs(smr.text)
    ev.sitemapLocs = locs.length
    if (smr.status === 200 && !locs.length) failures.push('sitemap lists no URL')
    for (const l of locs) if (new URL(l).origin !== origin) failures.push(`sitemap URL on another origin: ${l}`)
    for (const p of htmlPages) if (p.refs.canonical && new URL(p.refs.canonical).origin !== origin) failures.push(`${p.url}: canonical on another origin (${p.refs.canonical})`)
  }
  return { failures, ...ev }
}

async function cmsHealthCheck(cmsUrl) {
  const { cmsHealth } = await import('../deploy/managed/lib/cms.mjs')
  const h = await cmsHealth(cmsUrl)
  const failures = []
  if (h.admin !== 200) failures.push(`${cmsUrl}/admin → ${h.admin}`)
  if (h.api.status !== 200 || !h.api.json) failures.push(`${cmsUrl}/api/users/me → ${h.api.status}${h.api.json ? '' : ' (not JSON)'}`)
  return { failures, ...h }
}

// ------------------------------------------------------------------ acceptance (Playwright)

let _browser = null
const browser = async () => {
  if (_browser) return _browser
  const { chromium } = await import('playwright')
  _browser = await chromium.launch()
  return _browser
}
const engineAbort = async (target, onEngine) => {
  await target.route((u) => isEngineUrl(u.href), (route) => { onEngine?.(route.request()); return route.abort() })
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = Math.max(200, innerHeight * 0.8)
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 250)) }
    scrollTo(0, document.documentElement.scrollHeight); await new Promise((r) => setTimeout(r, 800))
  })
}

async function browserPages(ctx) {
  const host = hostOf(ctx.url)
  const failures = []
  const rows = []
  const b = await browser()
  for (const vp of VIEWPORTS) {
    for (const p of ctx.crawl.pages.filter((x) => x.refs)) {
      const bc = await b.newContext({ viewport: vp.viewport, isMobile: vp.isMobile, hasTouch: vp.hasTouch, deviceScaleFactor: vp.deviceScaleFactor, locale: 'en-US' })
      const page = await bc.newPage()
      const row = { page: p.url, viewport: vp.name, console: [], pageErrors: [], httpErrors: [], thirdPartyOnLoad: [], mixed: [], engineRequests: [] }
      let phase = 'load'
      await engineAbort(bc, (r) => row.engineRequests.push(`${phase}: ${r.method()} ${r.url().slice(0, 160)}`))
      page.on('console', (m) => { if (m.type() === 'error') row.console.push(`${phase}: ${m.text().slice(0, 200)}`) })
      page.on('pageerror', (e) => row.pageErrors.push(`${phase}: ${String(e).slice(0, 200)}`))
      page.on('request', (r) => {
        const u = r.url()
        if (ctx.url.startsWith('https:') && u.startsWith('http:')) row.mixed.push(u)
        if (phase === 'load' && /^https?:/.test(u) && hostOf(u) !== host) row.thirdPartyOnLoad.push(u.slice(0, 160))
      })
      page.on('response', (r) => { if (r.status() >= 400) row.httpErrors.push(`${phase}: ${r.status()} ${r.url().slice(0, 160)}`) })
      try {
        await page.goto(p.url, { waitUntil: 'load', timeout: 60_000 })
        await page.waitForTimeout(2000)
        row.overflowLoad = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
        phase = 'scroll'
        await scrollThrough(page)
        row.overflowScroll = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      } catch (e) { row.pageErrors.push(`goto: ${e.message.split('\n')[0]}`) }
      await bc.close()
      const tag = `${p.url} @${vp.name}`
      for (const c of row.console) failures.push(`${tag} console error: ${c}`)
      for (const e of row.pageErrors) failures.push(`${tag} page error: ${e}`)
      for (const e of row.httpErrors) failures.push(`${tag} HTTP ${e}`)
      for (const t of row.thirdPartyOnLoad) failures.push(`${tag} third-party request on first load: ${t}`)
      for (const m of row.mixed) failures.push(`${tag} mixed content: ${m}`)
      for (const e of row.engineRequests) failures.push(`${tag} booking-engine request without interaction (aborted): ${e}`)
      if (row.overflowLoad > 1 || row.overflowScroll > 1) failures.push(`${tag} horizontal overflow ${Math.max(row.overflowLoad, row.overflowScroll)} px`)
      rows.push(row)
    }
  }
  return { failures, runs: rows.map((r) => ({ page: r.page, viewport: r.viewport, console: r.console.length, pageErrors: r.pageErrors.length, httpErrors: r.httpErrors.length, thirdPartyOnLoad: r.thirdPartyOnLoad.length, overflow: Math.max(r.overflowLoad ?? 0, r.overflowScroll ?? 0) })) }
}

/**
 * Fill a booking form the way a visitor would, with the first choice everywhere, and submit it into a
 * route that aborts every request off the site (the engine's API included — the site then works from
 * its own snapshot) and records the navigation to the engine. Nothing reaches the engine.
 */
async function walkHandoff(b, url, { js, vp }) {
  const host = hostOf(url)
  const bc = await b.newContext({ viewport: vp.viewport, isMobile: vp.isMobile, hasTouch: vp.hasTouch, deviceScaleFactor: vp.deviceScaleFactor, javaScriptEnabled: js, locale: 'en-US' })
  const handoffs = [], blocked = []
  await bc.route((u) => u.hostname !== host, (route) => {
    const r = route.request()
    if (r.isNavigationRequest() && isEngineUrl(r.url())) handoffs.push(r.url())
    else blocked.push(`${r.method()} ${hostOf(r.url())}`)
    return route.abort()
  })
  const page = await bc.newPage()
  const out = { js, viewport: vp.name, url }
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60_000 })
    await page.waitForTimeout(1200)
    const filled = await page.evaluate(({ engines, js }) => {
      const isEngine = (u) => { try { const h = new URL(u, location.href).hostname; return engines.some((e) => h.includes(e.replace(/\.$/, ''))) } catch { return false } }
      const form = [...document.forms].find((f) => isEngine(f.action) || [...f.querySelectorAll('[formaction]')].some((x) => isEngine(x.formAction)))
      if (!form) return null
      const done = []
      const fire = (el) => { el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })) }
      const groups = {}
      for (const r of form.querySelectorAll('input[type=radio]')) (groups[r.name] ??= []).push(r)
      for (const [name, rs] of Object.entries(groups)) if (!rs.some((r) => r.checked)) { const r = rs.find((x) => !x.disabled); if (r) { r.checked = true; fire(r); done.push(`radio ${name}=${r.value}`) } }
      for (const s of form.querySelectorAll('select')) {
        if (s.value) continue
        const o = [...s.options].find((x) => x.value && !x.disabled)
        if (o) { s.value = o.value; fire(s); done.push(`select ${s.name}=${o.value}`) }
      }
      const guests = [...form.querySelectorAll('input[type=number]')].filter((i) => /adult|guest|pax|female|male|couple|people|person/i.test(i.name))
      if (guests.length && guests.every((i) => !+i.value)) { const g = guests.find((i) => !i.max || +i.max >= 1); g.value = '1'; fire(g); done.push(`guests ${g.name}=1`) }
      for (const d of form.querySelectorAll('input[type=date]')) if (!d.value) { const t = new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10); d.value = t; fire(d); done.push(`date ${d.name}=${t}`) }
      const submitter = form.querySelector('button[type=submit], input[type=submit], button:not([type])')
      form.setAttribute('data-sc-form', '1')
      submitter?.setAttribute('data-sc-submit', '1')
      return { action: form.action, done, submitter: submitter ? (submitter.formAction || form.action) : null }
    }, { engines: ENGINE_HOSTS, js })
    out.form = filled
    if (filled) {
      if (js) await page.evaluate(() => { const f = document.querySelector('[data-sc-form]'); const s = document.querySelector('[data-sc-submit]'); f.requestSubmit(s ?? undefined) }).catch((e) => { out.error = e.message })
      else await page.click('[data-sc-submit]', { force: true, timeout: 8000, noWaitAfter: true }).catch((e) => { out.error = e.message.split('\n')[0] })
      await page.waitForTimeout(2500)
    }
  } catch (e) { out.error = e.message.split('\n')[0] }
  out.handoff = handoffs[0] ?? null
  out.offSiteBlocked = [...new Set(blocked)]
  await bc.close()
  return out
}

async function booking(ctx) {
  const failures = []
  const rec = ctx.audit?.recommended ?? null
  const flow = rec?.booking_flow ?? null
  // 1. funnel (tools/funnel.mjs, the critic's and auditor's measure)
  const dir = mkdtempSync(path.join(os.tmpdir(), 'site-check-funnel-'))
  let funnel = null
  try {
    const r = spawnSync(process.execPath, [path.join(ROOT, 'tools', 'funnel.mjs'), ctx.url, '--depth', '1', '--pages', '12', '--out', dir], { encoding: 'utf8', timeout: 300_000 })
    funnel = readJson(path.join(dir, 'funnel.json'))
    if (!funnel) failures.push(`funnel.mjs produced no funnel.json: ${(r.stderr || r.stdout || '').slice(-300)}`)
  } finally { rmSync(dir, { recursive: true, force: true }) }
  const hero = funnel?.hero_action ?? null
  const ev = { recommended: rec ? { primary_action: rec.primary_action, clicks_to_book: rec.clicks_to_book, booking_flow: flow } : null, hero_action: hero, clicks_to_book: funnel?.clicks_to_book ?? null, primary_action: funnel?.primary_action ?? null }
  if (funnel) {
    if (funnel.clicks_to_book == null) failures.push('no terminal booking action found within one tap of the home page')
    if (flow) {
      if (hero?.class !== rec.primary_action) failures.push(`hero CTA leads to "${hero?.class ?? 'nothing'}", audit.json.recommended.primary_action is "${rec.primary_action}"`)
      if (hero?.clicks_to_flow == null || hero.clicks_to_flow > flow.clicks_to_flow) failures.push(`hero CTA → booking flow in ${hero?.clicks_to_flow ?? 'no'} taps, target ≤ ${flow.clicks_to_flow}`)
    } else if (rec?.clicks_to_book != null && funnel.clicks_to_book != null && funnel.clicks_to_book > rec.clicks_to_book) {
      failures.push(`clicks_to_book ${funnel.clicks_to_book}, audit.json.recommended target ≤ ${rec.clicks_to_book}`)
    }
  }
  // 2. hero CTA → booking page → hand-off, at 390, JavaScript on and off; nothing is sent to the engine
  const b = await browser()
  const walks = []
  const flowPage = hero?.flow_page && hostOf(hero.flow_page) === hostOf(ctx.url) && stripQH(hero.flow_page) !== stripQH(ctx.url) ? hero.flow_page : null
  if (hero && !flowPage && hero.href && isEngineUrl(hero.href)) {
    const c = checkHandoff(hero.href, { requireDates: !!flow })
    ev.heroHandoff = c
    for (const p of c.problems) failures.push(`hero hand-off ${hero.href}: ${p}`)
  }
  if (flowPage) {
    // the tap itself: the hero CTA on the home page opens the booking page
    const bc = await b.newContext({ viewport: VIEWPORTS[0].viewport, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })
    await bc.route((u) => u.hostname !== hostOf(ctx.url), (r) => r.abort())
    const page = await bc.newPage()
    await page.goto(ctx.url, { waitUntil: 'load', timeout: 60_000 })
    await page.waitForTimeout(800)
    const marked = await page.evaluate((target) => {
      const norm = (u) => { const x = new URL(u, location.href); x.hash = ''; x.search = ''; return x.href.replace(/\/$/, '') }
      const a = [...document.querySelectorAll('a[href]')].find((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.top < innerHeight && norm(el.href) === norm(target) })
      if (a) a.setAttribute('data-sc-hero', '1')
      return a ? a.textContent.trim().slice(0, 60) : null
    }, flowPage)
    ev.heroTap = { label: marked }
    if (!marked) failures.push(`no visible link to ${flowPage} on the first screen at 390`)
    else {
      await page.click('[data-sc-hero]')
      await page.waitForLoadState('load').catch(() => {})
      ev.heroTap.landed = page.url()
      if (stripQH(page.url()).replace(/\/$/, '') !== stripQH(flowPage).replace(/\/$/, '')) failures.push(`hero CTA landed on ${page.url()}, expected ${flowPage}`)
    }
    await bc.close()
    const walkUrl = ev.heroTap.landed ?? flowPage // the page the tap really opened (Workers add the trailing slash)
    for (const js of [true, false]) walks.push(await walkHandoff(b, walkUrl, { js, vp: VIEWPORTS[0] }))
    walks.push(await walkHandoff(b, walkUrl, { js: true, vp: VIEWPORTS[1] }))
    for (const w of walks) {
      const tag = `hand-off @${w.viewport} JS ${w.js ? 'on' : 'off'}`
      if (!w.form) { failures.push(`${tag}: no form to an engine on ${w.url}`); continue }
      if (!w.handoff) { failures.push(`${tag}: the filled form did not hand off (${w.error ?? 'blocked by the page'}; filled: ${w.form.done.join(', ') || 'nothing'})`); continue }
      w.check = checkHandoff(w.handoff, { requireDates: true })
      for (const p of w.check.problems) failures.push(`${tag}: ${w.handoff}: ${p}`)
    }
  }
  if (!flowPage && !ev.heroHandoff && hero) ev.note = 'hero CTA is a direct action (WhatsApp/tel/listing); its links are checked by the hand-off smoke check'
  if (flow) ev.max_taps_to_engine = `not measured here (target ${flow.max_taps_to_engine}): the critic's site-specific walk counts it`
  return { failures, ...ev, walks: walks.map(({ js, viewport, form, handoff, check: c, offSiteBlocked, error }) => ({ js, viewport, filled: form?.done ?? null, handoff, ok: c?.ok ?? false, problems: c?.problems ?? [], offSiteBlocked, error: error ?? null })) }
}

async function forecastBlock(ctx) {
  const fc = forecastConfig(ctx)
  if (!fc.enabled) return { skipped: 'forecast not enabled' }
  const failures = []
  const b = await browser()
  const runs = []
  const fresh = ctx.checks.find((c) => c.id === 'forecast-data')?.freshness ?? null
  for (const vp of VIEWPORTS) {
    const bc = await b.newContext({ viewport: vp.viewport, isMobile: vp.isMobile, hasTouch: vp.hasTouch, deviceScaleFactor: vp.deviceScaleFactor })
    await engineAbort(bc)
    const page = await bc.newPage()
    await page.addInitScript(() => { window.__sc_shift = []; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__sc_shift.push(e.value) }).observe({ type: 'layout-shift', buffered: true }) })
    const jsonReqs = []
    page.on('response', (r) => { if (r.url().startsWith(fc.json.split('?')[0])) jsonReqs.push(r.status()) })
    await page.goto(ctx.url, { waitUntil: 'load', timeout: 60_000 })
    await page.waitForTimeout(1500)
    const measure = () => page.evaluate(() => {
      const el = document.querySelector('[data-json*="rosa"]')
      if (!el) return null
      const block = el.closest('section') ?? el.parentElement
      const frame = document.querySelector('iframe[src*="rosa.surf/widget"]')
      return { block: Math.round(block.getBoundingClientRect().height), head: Math.round(el.getBoundingClientRect().height), text: el.innerText.replace(/\s+/g, ' ').trim().slice(0, 160), iframe: frame?.src ?? null, frameBox: frame ? Math.round(frame.getBoundingClientRect().height) : null, loading: block.querySelectorAll('[data-loading]').length }
    })
    const before = await measure()
    const run = { viewport: vp.name, before }
    const n0 = await page.evaluate(() => window.__sc_shift.length)
    if (before) {
      await page.evaluate(() => document.querySelector('[data-json*="rosa"]').scrollIntoView({ block: 'center' }))
      await page.waitForFunction(() => { const b = document.querySelector('[data-json*="rosa"]'); return !(b.closest('section') ?? b.parentElement).querySelector('[data-loading]') }, null, { timeout: 10_000 }).catch(() => {})
      await page.waitForTimeout(1500)
      run.after = await measure()
      run.jsonStatus = jsonReqs
      // layout shift while the block loads (scrolling here is programmatic, so nothing is excluded as input)
      run.shiftWhileLoading = +(await page.evaluate((n) => window.__sc_shift.slice(n).reduce((a, b) => a + b, 0), n0)).toFixed(4)
      const tag = `@${vp.name}`
      if (!before.block) failures.push(`${tag}: forecast block has no height before it loads (space not reserved)`)
      if (Math.abs(run.after.block - before.block) > 1) failures.push(`${tag}: forecast block height ${before.block} → ${run.after.block} px when it loads`)
      if (run.shiftWhileLoading >= 0.01) failures.push(`${tag}: layout shift ${run.shiftWhileLoading} while the forecast loads`)
      if (!run.after.block) failures.push(`${tag}: forecast block collapsed`)
      if (!run.after.iframe) failures.push(`${tag}: no Rosa widget iframe after scrolling to the block`)
      if (!jsonReqs.includes(200)) failures.push(`${tag}: forecast JSON not loaded (${jsonReqs.join(',') || 'no request'})`)
      const drawn = run.after.text !== before.text && /[1-9]/.test(run.after.text)
      run.headlineDrawn = drawn
      if (fresh?.ok && !drawn) failures.push(`${tag}: forecast headline not drawn from fresh data ("${run.after.text.slice(0, 80)}")`)
      if (fresh && !fresh.ok && drawn) failures.push(`${tag}: headline drawn from stale data (${fresh.problem})`)
    } else failures.push(`@${vp.name}: no forecast block ([data-json*=rosa]) on ${ctx.url}`)
    runs.push(run)
    await bc.close()
  }
  return { failures, spot: fc.spot, runs }
}

async function video(ctx) {
  const host = hostOf(ctx.url)
  const origin = new URL(ctx.url).origin
  const failures = []
  const fromManifest = ctx.videoManifests.flatMap((m) => videoRenditions(m.data).map((r) => ({ ...r, url: new URL(r.src, origin + '/').href, manifest: m.file })))
  const fromHtml = ctx.crawl.pages.flatMap((p) => (p.refs?.assets ?? []).filter((a) => hostOf(a.url) === host && videoKindOfPath(a.url)).map((a) => ({ url: a.url, type: a.type, from: p.url })))
  const all = new Map()
  for (const v of [...fromManifest, ...fromHtml]) if (!all.has(v.url)) all.set(v.url, v); else all.set(v.url, { ...v, ...all.get(v.url) })
  const list = [...all.values()]
  if (!list.length && !ctx.site?.heroVideo && !(ctx.site?.videos ?? []).length) return { skipped: 'no video on this site' }
  if (!list.length) failures.push('content.json has video but no rendition is referenced or listed')
  const res = await pool(list, 6, async (v) => {
    const r = await get(v.url, { headers: { range: 'bytes=0-63' } })
    const buf = r.res ? Buffer.from(await r.res.arrayBuffer()) : Buffer.alloc(0)
    const kind = videoKindOfPath(v.url), sniff = sniffVideo(buf)
    const declared = v.type ? v.type.split(';')[0].trim() : null
    const row = { url: v.url, status: r.status, contentType: r.type, kind, sniff, declared, width: v.width ?? null, height: v.height ?? null }
    if (!ok2xx(r.status)) failures.push(`${v.url} → ${r.status}${v.manifest ? ` (listed in ${v.manifest})` : ''}`)
    else {
      if (sniff !== kind) failures.push(`${v.url}: file is ${sniff ?? 'not a video'}, name says ${kind}`)
      if (!r.type.startsWith(`video/${kind}`)) failures.push(`${v.url}: served as ${r.type || 'no content-type'}`)
      if (declared && declared !== `video/${kind}`) failures.push(`${v.url}: declared type ${declared}, file is ${kind}`)
    }
    return row
  })
  // play: load each rendition's metadata in Chromium (where it can decode the codec)
  const b = await browser()
  const bc = await b.newContext()
  const page = await bc.newPage()
  await page.goto(ctx.url, { waitUntil: 'domcontentloaded' })
  for (const row of res.filter((r) => ok2xx(r.status))) {
    const v = all.get(row.url)
    row.play = await page.evaluate(async ({ src, type }) => {
      const el = document.createElement('video')
      const can = type ? el.canPlayType(type) : el.canPlayType(src.endsWith('.webm') ? 'video/webm' : 'video/mp4')
      if (!can) return { canPlayType: '', note: 'this Chromium build cannot decode it; container and type checked above' }
      el.muted = true; el.preload = 'metadata'; el.src = src
      return await new Promise((res) => {
        const t = setTimeout(() => res({ canPlayType: can, error: 'timeout' }), 20000)
        el.onloadedmetadata = () => { clearTimeout(t); res({ canPlayType: can, width: el.videoWidth, height: el.videoHeight, duration: +el.duration.toFixed(2) }) }
        el.onerror = () => { clearTimeout(t); res({ canPlayType: can, error: `MediaError ${el.error?.code}` }) }
      })
    }, { src: row.url, type: v.type ?? null })
    if (row.play.error) failures.push(`${row.url}: does not play (${row.play.error})`)
    else if (row.play.width && v.width && (row.play.width !== v.width || row.play.height !== v.height)) {
      // a pixel or two is the encoder's sample aspect ratio, not a wrong file
      const note = `${row.play.width}x${row.play.height}, manifest says ${v.width}x${v.height}`
      if (Math.abs(row.play.width - v.width) > 2 || Math.abs(row.play.height - v.height) > 2) failures.push(`${row.url}: ${note}`)
      else row.note = note
    }
  }
  await bc.close()
  // reduced motion: no video file is requested on any page
  const reduced = []
  for (const vp of VIEWPORTS) for (const p of ctx.crawl.pages.filter((x) => x.refs)) {
    const rc = await b.newContext({ viewport: vp.viewport, isMobile: vp.isMobile, hasTouch: vp.hasTouch, reducedMotion: 'reduce' })
    await engineAbort(rc)
    const pg = await rc.newPage()
    const vids = []
    pg.on('request', (r) => { if (r.resourceType() === 'media' || videoKindOfPath(r.url())) vids.push(r.url()) })
    await pg.goto(p.url, { waitUntil: 'load', timeout: 60_000 }).catch(() => {})
    await scrollThrough(pg).catch(() => {})
    await pg.waitForTimeout(1000)
    reduced.push({ page: p.url, viewport: vp.name, videoRequests: vids.length })
    for (const u of vids) failures.push(`reduced motion @${vp.name} ${p.url}: requested ${u}`)
    await rc.close()
  }
  return { failures, renditions: res, manifests: ctx.videoManifests.map((m) => m.file), reducedMotion: reduced }
}

async function performance(ctx) {
  const host = hostOf(ctx.url)
  const b = await browser()
  const bc = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
  await engineAbort(bc)
  const page = await bc.newPage()
  await page.addInitScript(() => {
    window.__lcp = 0; window.__cls = 0
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime }).observe({ type: 'largest-contentful-paint', buffered: true })
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value }).observe({ type: 'layout-shift', buffered: true })
  })
  const cdp = await bc.newCDPSession(page)
  await cdp.send('Network.enable')
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true })
  await cdp.send('Network.emulateNetworkConditions', SLOW_4G)
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
  const reqs = new Map()
  cdp.on('Network.responseReceived', (e) => reqs.set(e.requestId, { url: e.response.url, mime: e.response.mimeType, type: e.type, bytes: 0 }))
  cdp.on('Network.loadingFinished', (e) => { const r = reqs.get(e.requestId); if (r) r.bytes = e.encodedDataLength })
  await page.goto(ctx.url, { waitUntil: 'load', timeout: 120_000 })
  await page.waitForTimeout(4000)
  const v = await page.evaluate(() => ({ lcp: Math.round(window.__lcp), cls: +window.__cls.toFixed(4) }))
  await bc.close()
  const rows = [...reqs.values()].filter((r) => /^https?:/.test(r.url))
  const isVideo = (r) => r.type === 'Media' || /^video\//.test(r.mime)
  const m = {
    lcp_ms: v.lcp, cls: v.cls,
    first_load_bytes: rows.filter((r) => !isVideo(r)).reduce((s, r) => s + r.bytes, 0),
    video_bytes_on_load: rows.filter(isVideo).reduce((s, r) => s + r.bytes, 0),
    js_bytes: rows.filter((r) => /javascript/.test(r.mime) || r.type === 'Script').reduce((s, r) => s + r.bytes, 0),
    third_party_on_load: rows.filter((r) => hostOf(r.url) !== host).length,
    requests: rows.length,
  }
  const failures = []
  if (!m.lcp_ms) failures.push('LCP not measured')
  else if (m.lcp_ms > BUDGET.lcp_ms) failures.push(`LCP ${m.lcp_ms} ms > ${BUDGET.lcp_ms}`)
  if (m.cls >= BUDGET.cls) failures.push(`CLS ${m.cls} ≥ ${BUDGET.cls}`)
  if (m.first_load_bytes > BUDGET.first_load_bytes) failures.push(`first load ${(m.first_load_bytes / 1e6).toFixed(2)} MB > ${BUDGET.first_load_bytes / 1e6} MB (video excluded)`)
  if (m.js_bytes > BUDGET.js_bytes) failures.push(`JS ${Math.round(m.js_bytes / 1e3)} KB > ${BUDGET.js_bytes / 1e3} KB`)
  if (m.third_party_on_load > BUDGET.third_party_on_load) failures.push(`${m.third_party_on_load} third-party requests on load`)
  return { failures, throttling: 'playbook §4: 390×844, 1.6 Mbps down, 150 ms, 4x CPU, cache off, no scroll', budget: BUDGET, measured: m }
}

// ------------------------------------------------------------------ --full (the CMS)

async function siteDepsModules() {
  const dir = path.join(ROOT, 'cms', 'publisher', 'site-deps')
  const nm = process.env.SITE_DEPS_MODULES || path.join(dir, 'node_modules')
  if (!existsSync(path.join(nm, '.bin', 'astro'))) {
    const r = spawnSync('npm', ['ci', '--no-audit', '--no-fund'], { cwd: dir, encoding: 'utf8' })
    if (r.status !== 0) throw new Error(`npm ci in cms/publisher/site-deps: ${r.stderr.slice(-500)}`)
  }
  return nm
}

/** Every { filename } upload in a content document (photos, hero image/video, posters, video rows). */
const uploads = (o, out = new Set()) => {
  if (Array.isArray(o)) o.forEach((x) => uploads(x, out))
  else if (o && typeof o === 'object') { if (typeof o.filename === 'string' && o.mimeType) out.add(o.filename); Object.values(o).forEach((x) => uploads(x, out)) }
  return out
}

/** Parity: the CMS build (over SSH) against a local build of the repo's content.json, the way the publisher builds. */
async function parityCheck(ctx, { owner }) {
  const { cmsBuiltHtml } = await import('../deploy/managed/lib/cms.mjs')
  const { parity, stripSeedPrefix } = await import('../deploy/managed/lib/parity.mjs')
  const failures = []
  if (ctx.site?.heroVideo || (ctx.site?.videos ?? []).length) return { skipped: 'site has video: the local build would need the publisher\'s renditions (not built here yet)' }
  const cmsHtml = cmsBuiltHtml(ctx.slug)
  const live = await getText(ctx.url)
  const liveIsCmsBuild = live.text === cmsHtml
  if (!liveIsCmsBuild) failures.push('the live index.html is not the CMS build (a static deploy over the CMS Worker, or a publish in flight)')
  const work = mkdtempSync(path.join(os.tmpdir(), `site-check-parity-${ctx.slug}-`))
  try {
    const skip = /[\\/](node_modules|dist|\.astro|shots|photos|video|media)$|photos\.generated\.json$|videos\.generated\.json$|audit\.json$|notes\.md$|package-lock\.json$/
    cpSync(ctx.final, work, { recursive: true, filter: (s) => !skip.test(s) })
    symlinkSync(await siteDepsModules(), path.join(work, 'node_modules'))
    // media: the stored originals from the CMS (the seed's own bytes; names carry their sha256:8)
    const mediaDir = path.join(work, 'src', 'tenant', 'media')
    mkdirSync(mediaDir, { recursive: true })
    const docs = (await owner.get('/api/media?depth=0&limit=500')).docs
    const media = []
    for (const f of uploads(ctx.site)) {
      const d = docs.find((m) => stripSeedPrefix(m.filename, ctx.slug) === f)
      if (!d) { failures.push(`media ${f} of content.json is not in the CMS`); continue }
      const res = await owner.raw('GET', d.url)
      const buf = Buffer.from(await res.arrayBuffer())
      const sha8 = createHash('sha256').update(buf).digest('hex').slice(0, 8)
      const named = d.filename.slice(ctx.slug.length + 1, ctx.slug.length + 9)
      media.push({ file: f, status: res.status, sha8, nameMatches: sha8 === named })
      writeFileSync(path.join(mediaDir, f), buf)
    }
    const env = { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' }
    delete env.SITE_URL
    for (const [cmd, a] of [[process.execPath, ['scripts/photos.mjs']], [path.join(work, 'node_modules', '.bin', 'astro'), ['build']]]) {
      const r = spawnSync(cmd, a, { cwd: work, env, encoding: 'utf8', maxBuffer: 64 << 20 })
      if (r.status !== 0) throw new Error(`local build (${a.join(' ')}): ${(r.stderr || r.stdout).slice(-800)}`)
    }
    const local = readFileSync(path.join(work, 'dist', 'index.html'), 'utf8')
    const p = parity(local, cmsHtml, ctx.slug)
    if (!p.identical) failures.push(`CMS build differs from a local build of content.json in ${p.differingCount} line(s), e.g. line ${p.differingLines[0].line}: local "${p.differingLines[0].local.slice(0, 80)}" / cms "${p.differingLines[0].cms.slice(0, 80)}"`)
    return { failures, liveIsCmsBuild, parity: p, media }
  } finally { rmSync(work, { recursive: true, force: true }) }
}

async function full(ctx, report) {
  const cmsLib = await import('../deploy/managed/lib/cms.mjs')
  const adapter = ctx.deploy?.adapter
  if (!ctx.deploy || !['managed', 'self_hosted_docker'].includes(adapter)) {
    await check(report, 'cms', async () => ({ failures: [`--full needs a CMS: sites/${ctx.slug}/deploy.json adapter is ${adapter ?? 'missing'}`] }))
    return
  }
  if (adapter !== 'managed') { await check(report, 'cms', async () => ({ failures: [`--full for ${adapter} is not built yet (only managed)`] })); return }
  const cmsUrl = ctx.deploy.cms || cmsLib.CMS_URL
  await check(report, 'cms-health', () => cmsHealthCheck(cmsUrl))
  const creds = cmsLib.readSealed(ctx.slug)
  if (!creds) { await check(report, 'owner-path', async () => ({ failures: [`no sealed owner credentials for ${ctx.slug} on this machine`] })); return }
  const { Rest } = await import('../cms/scripts/lib/tenant-io.mjs')
  const owner = await Rest.login(cmsUrl, creds.email, creds.password)
  if (!ctx.noParity) await check(report, 'parity', () => parityCheck(ctx, { owner }))
  const before = await getText(ctx.url)
  await check(report, 'owner-path', async () => {
    const ev = {}
    const failures = []
    try { await cmsLib.ownerPath({ cmsUrl, slug: ctx.slug, liveUrl: ctx.url, creds, sa: await cmsLib.superAdmin(), ev }) } catch (e) { failures.push(e.message) }
    // restored means the live page is the one we started from, byte for byte
    const after = await cmsLib.waitFor(async () => (await getText(ctx.url)).text === before.text, { timeoutMs: 120_000, everyMs: 3000 })
    ev.liveRestoredByteIdentical = after !== null
    if (after === null) failures.push('RESTORE: the live index.html differs from before the owner-path check')
    return { failures, ...ev }
  })
}

// ------------------------------------------------------------------ run one target

async function runOne({ slug, url, kind, mode, noParity }) {
  const report = newReport({ slug, url, kind, mode })
  const t0 = Date.now()
  const ctx = { slug, url, preview: report.preview, noParity, checks: report.checks, ...siteContext(slug) }
  ctx.crawl = await crawl(url)
  await check(report, 'pages', () => smokePages(ctx))
  await check(report, 'assets', () => smokeAssets(ctx))
  await check(report, 'handoff', () => smokeHandoff(ctx))
  await check(report, 'forecast-data', () => smokeForecast(ctx))
  await check(report, 'seo', () => smokeSeo(ctx))
  if (mode !== 'smoke') {
    await check(report, 'browser', () => browserPages(ctx))
    await check(report, 'booking', () => booking(ctx))
    await check(report, 'forecast-block', () => forecastBlock(ctx))
    await check(report, 'video', () => video(ctx))
    await check(report, 'performance', () => performance(ctx))
  }
  if (mode === 'full') await full(ctx, report)
  report.ms = Date.now() - t0
  report.ok = report.failures.length === 0
  return report
}

const summary = (r) => {
  const lines = [`${r.ok ? 'PASS' : 'FAIL'} ${r.slug ?? ''} ${r.url} [${r.mode}${r.kind ? `, ${r.kind}` : ''}] ${(r.ms / 1000).toFixed(0)} s`]
  for (const c of r.checks) lines.push(`  ${c.skipped ? 'skip' : c.ok ? ' ok ' : 'FAIL'} ${c.id}${c.skipped ? ` (${c.skipped})` : c.ok ? '' : ` — ${c.failures.length} failure(s)`}`)
  for (const f of r.failures.slice(0, 40)) lines.push(`    - ${f}`)
  if (r.failures.length > 40) lines.push(`    … ${r.failures.length - 40} more in the report`)
  return lines.join('\n')
}

// ------------------------------------------------------------------ CLI

async function main() {
  const args = process.argv.slice(2)
  const flag = (n) => args.includes(`--${n}`)
  const opt = (n) => { const i = args.indexOf(`--${n}`); return i > -1 ? args[i + 1] : null }
  const positional = args.filter((a, i) => !a.startsWith('--') && !['--url', '--report'].includes(args[i - 1]))
  const mode = flag('full') ? 'full' : flag('smoke') ? 'smoke' : 'acceptance'

  if (flag('targets')) { console.log(JSON.stringify(targets(), null, 2)); return 0 }

  if (flag('all')) {
    if (mode === 'full') { console.error('--all runs no --full (it would log in and edit every tenant)'); return 2 }
    const t = targets()
    const reports = []
    for (const s of t.sites) reports.push(await runOne({ ...s, mode }))
    for (const c of t.cms) {
      const r = newReport({ slug: null, url: c, kind: 'cms', mode })
      await check(r, 'cms-health', () => cmsHealthCheck(c))
      r.ok = r.failures.length === 0
      reports.push(r)
    }
    const all = { tool: 'site-check.mjs', version: VERSION, mode, at: new Date().toISOString(), ok: reports.every((r) => r.ok), targets: reports.length, failed: reports.filter((r) => !r.ok).map((r) => r.url), reports }
    const file = opt('report') ?? path.join(os.tmpdir(), 'oneshot-site-check', `all-${Date.now()}.json`)
    mkdirSync(path.dirname(file), { recursive: true })
    writeFileSync(file, JSON.stringify(all, null, 2) + '\n')
    const text = reports.map(summary).join('\n')
    if (flag('json')) console.log(JSON.stringify(all, null, 2)); else console.log(`${text}\n\n${all.ok ? 'ALL PASS' : `${all.failed.length} of ${reports.length} FAILED`} — report: ${file}`)
    if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `## Site monitor (${mode})\n\n${all.ok ? 'All targets pass.' : `**${all.failed.length} of ${reports.length} targets failed.**`}\n\n\`\`\`\n${text}\n\`\`\`\n`)
    if (_browser) await _browser.close()
    return all.ok ? 0 : 1
  }

  const arg = positional[0]
  if (!arg) { console.error('usage: node tools/site-check.mjs <slug|url> [--smoke|--full] [--no-parity] [--url u] [--report f] [--json]  |  --all [--smoke]  |  --targets'); return 2 }
  let slug = null, url = opt('url'), kind = null
  if (/^https?:\/\//.test(arg)) {
    url = arg
    const t = targets().sites.find((s) => s.url === (arg.endsWith('/') ? arg : arg + '/'))
    slug = t?.slug ?? siteSlugs().find((s) => { const w = readJsonc(path.join(ROOT, 'sites', s, 'final', 'wrangler.jsonc'))?.name; return w && hostOf(arg).startsWith(`${w}.`) }) ?? null
    kind = t?.kind ?? null
  } else {
    slug = arg
    if (!existsSync(path.join(ROOT, 'sites', slug))) { console.error(`no sites/${slug}`); return 2 }
    const rows = targets().sites.filter((s) => s.slug === slug)
    const best = rows.find((r) => r.kind === 'production') ?? rows.find((r) => r.kind === 'cms-built') ?? rows.find((r) => r.kind === 'delivered') ?? rows[0]
    if (!url) {
      const w = siteContext(slug).worker
      url = best?.url ?? (w ? `https://${w}.os1.workers.dev/` : null)
    }
    kind = rows.find((r) => r.url === url)?.kind ?? best?.kind ?? null
    if (!url) { console.error(`no live URL known for ${slug}`); return 2 }
  }
  if (!url.endsWith('/') && !path.extname(new URL(url).pathname)) url += '/'
  if (mode === 'full' && !slug) { console.error('--full needs a site in sites/ (its deploy.json and sealed credentials)'); return 2 }
  const report = await runOne({ slug, url, kind, mode, noParity: flag('no-parity') })
  if (_browser) await _browser.close()
  const file = opt('report') ?? path.join(os.tmpdir(), 'oneshot-site-check', `${slug ?? hostOf(url)}-${Date.now()}.json`)
  mkdirSync(path.dirname(file), { recursive: true })
  writeFileSync(file, JSON.stringify(report, null, 2) + '\n')
  if (flag('json')) console.log(JSON.stringify(report, null, 2)); else console.log(`${summary(report)}\nreport: ${file}`)
  return report.ok ? 0 : 1
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().then((code) => process.exit(code), (e) => { console.error(e.stack || e.message); if (_browser) _browser.close(); process.exit(1) })
}
