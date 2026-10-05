// tools/site-check-lib.mjs — the pure parts of tools/site-check.mjs: HTML reference extraction,
// booking hand-off parsing, robots/SEO parsing, forecast freshness, video sniffing and the list of
// live targets the scheduled monitor checks. No network, no browser; unit-tested in
// tools/test/site-check.test.mjs.

// Booking engines and marketplaces (tools/funnel.mjs 0.2.0's list, plus the OTAs). A link or GET form
// to one of these is a hand-off; site-check never requests these hosts.
export const ENGINE_HOSTS = [
  'booking.com', 'agoda.com', 'airbnb.', 'hostelworld.com', 'expedia.', 'hotels.com', 'tripadvisor.',
  'cloudbeds.com', 'littlehotelier.com', 'siteminder.com', 'freetobook.com', 'hotelonia.com', 'beds24.com',
  'bookeo.com', 'fareharbor.com', 'checkfront.com', 'peek.com', 'rezdy.com', 'calendly.com', 'setmore.com',
  'simplybook.', 'acuityscheduling.com', 'bokun.io', 'viator.com', 'getyourguide.', 'trekksoft.com',
  'lodgify.com', 'guesty.com', 'hostaway.com', 'eviivo.com', 'sirvoy.com', 'octorate.com', 'wubook.net',
  'mews.com', 'surfbookings', 'bookwhen.com', 'bookinglayer.io', 'bookinglayer.com', 'booksurfcamps.com',
  'surfcamp-online', 'regiondo.', 'xola.com', 'rezgo.com', 'bokun.', 'palisis', 'tripworks', 'wetravel.com',
]
export const hostOf = (u) => { try { return new URL(u).hostname.toLowerCase() } catch { return '' } }
export const isEngineUrl = (u) => { const h = hostOf(u); return !!h && ENGINE_HOSTS.some((e) => h.includes(e.replace(/\.$/, ''))) }

// ------------------------------------------------------------------ booking hand-off

// The engine's own parameter names first (Bookinglayer: start, end, duration in days — docs/bookinglayer.md
// §3), then the common OTA spellings.
const START = ['start', 'checkin', 'check_in', 'arrival', 'date_from', 'from_date']
const END = ['end', 'checkout', 'check_out', 'departure', 'date_to', 'to_date']
const DURATION = ['duration', 'nights', 'los']
const pick = (sp, names) => { for (const n of names) if (sp.has(n)) return { name: n, value: sp.get(n) }; return null }

/** A real calendar date in YYYY-MM-DD, or null. */
export const parseISODate = (s) => {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return null
  const d = new Date(`${s}T00:00:00Z`)
  return Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== s ? null : d
}

/**
 * Check a booking hand-off URL without requesting it. Rules (Shahar, 2026-10-05): never `end` without
 * `start`; a `start` comes with an `end` or a `duration`; dates are real calendar dates, the end after
 * the start, the start not in the past. `requireDates` = the hand-off of a booking flow, which must
 * carry the stay (a plain listing link need not).
 */
export function checkHandoff(url, { requireDates = false, today = new Date() } = {}) {
  const problems = []
  let u
  try { u = new URL(url) } catch { return { url, ok: false, problems: ['not a valid URL'] } }
  if (u.protocol !== 'https:') problems.push(`not https (${u.protocol})`)
  const sp = u.searchParams
  const start = pick(sp, START), end = pick(sp, END), duration = pick(sp, DURATION)
  if (end && !start) problems.push(`${end.name} without a start`)
  if (start) {
    const s = parseISODate(start.value)
    if (!s) problems.push(`${start.name}=${start.value} is not a YYYY-MM-DD date`)
    else {
      const t0 = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
      if (s.getTime() < t0) problems.push(`${start.name}=${start.value} is in the past`)
    }
    if (!end && !duration) problems.push(`${start.name} without an end or a duration`)
    if (end) {
      const e = parseISODate(end.value)
      if (!e) problems.push(`${end.name}=${end.value} is not a YYYY-MM-DD date`)
      else if (s && e <= s) problems.push(`${end.name}=${end.value} is not after ${start.name}=${start.value}`)
    }
  } else if (requireDates) problems.push('no start date')
  if (duration && !/^[1-9]\d{0,2}$/.test(duration.value)) problems.push(`${duration.name}=${duration.value} is not a whole number of days/nights`)
  return {
    url, ok: problems.length === 0, problems, host: u.hostname,
    start: start?.value ?? null, end: end?.value ?? null, duration: duration?.value ?? null,
  }
}

/** wa.me / tel: links: digits only, a plausible length. */
export function checkContactLink(href) {
  if (/^tel:/i.test(href)) {
    const d = href.slice(4).replace(/[\s().-]/g, '')
    return { href, ok: /^\+?\d{7,15}$/.test(d), kind: 'tel' }
  }
  const m = href.match(/^https:\/\/(?:wa\.me|api\.whatsapp\.com\/send\?phone=)\/?(\+?\d+)/i)
  if (/wa\.me|whatsapp\.com/i.test(href)) return { href, ok: !!m && m[1].replace('+', '').length >= 7 && m[1].replace('+', '').length <= 15, kind: 'whatsapp' }
  return { href, ok: true, kind: 'other' }
}

// ------------------------------------------------------------------ HTML references

const ENTITIES = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', '#39': "'", '#x27': "'", '#34': '"' }
export const unescapeHtml = (s) => s.replace(/&(amp|quot|apos|lt|gt|#39|#x27|#34);/g, (_, e) => ENTITIES[e])

/** Attributes of one start tag's attribute string, names lowercased, values unescaped. */
export function parseAttrs(s) {
  const out = {}
  const re = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g
  let m
  while ((m = re.exec(s))) out[m[1].toLowerCase()] = unescapeHtml(m[2] ?? m[3] ?? m[4] ?? '')
  return out
}

/** URLs of a srcset value. */
export const parseSrcset = (s) => (s || '').split(/,(?=\s*\S)/).map((c) => c.trim().split(/\s+/)[0]).filter(Boolean)

/** url(...) references in CSS. */
export const cssUrls = (css) => [...css.matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g)].map((m) => m[2].trim()).filter((u) => !u.startsWith('data:') && !u.startsWith('#'))

const ASSET_EXT = /\.(mp4|webm|m4v|mov|jpe?g|png|webp|avif|gif|svg|ico|css|m?js|woff2?|ttf|otf|json|xml|txt|webmanifest|pdf)(\?|#|$)/i
const resolve = (u, base) => { try { return new URL(u, base).href } catch { return null } }

/**
 * Everything one HTML page references: links (a[href]) and assets (src, srcset, poster, link[href],
 * <source>, inline style url(), and data-* attributes that hold an asset path — the lazy video sources
 * and posters a script swaps in), each resolved against `base`; plus GET/POST forms with their fields.
 */
export function extractRefs(html, base) {
  const links = [], assets = [], forms = [], iframes = []
  const add = (list, raw, extra) => {
    if (!raw || /^(data:|blob:|javascript:|#)/i.test(raw.trim())) return
    const url = resolve(raw.trim(), base)
    if (url) list.push({ url, ...extra })
  }
  // strip comments and the bodies of scripts (their contents are not markup)
  const clean = html.replace(/<!--[\s\S]*?-->/g, '').replace(/(<script\b[^>]*>)[\s\S]*?(<\/script>)/gi, '$1$2')
  for (const m of clean.matchAll(/<([a-zA-Z][a-zA-Z0-9-]*)(\s[^>]*)?>/g)) {
    const tag = m[1].toLowerCase(), a = parseAttrs(m[2] ?? '')
    if (tag === 'a' && a.href) add(links, a.href, { text: null })
    if (tag === 'link' && a.href) {
      const rel = (a.rel || '').toLowerCase()
      if (/stylesheet|preload|modulepreload|icon|manifest|apple-touch-icon/.test(rel)) add(assets, a.href, { tag, attr: 'href', rel, as: a.as ?? null, type: a.type ?? null })
      else if (rel === 'canonical' || rel === 'alternate') add(links, a.href, { rel })
    }
    if (tag === 'iframe' && a.src) add(iframes, a.src, { tag })
    if (['img', 'script', 'source', 'video', 'audio', 'track', 'embed', 'input'].includes(tag) && a.src) add(assets, a.src, { tag, attr: 'src', type: a.type ?? null })
    if (a.srcset) for (const u of parseSrcset(a.srcset)) add(assets, u, { tag, attr: 'srcset', type: a.type ?? null })
    if (a.poster) add(assets, a.poster, { tag, attr: 'poster' })
    if (a.style) for (const u of cssUrls(a.style)) add(assets, u, { tag, attr: 'style' })
    for (const [k, v] of Object.entries(a)) {
      if (!k.startsWith('data-') || !v) continue
      if (k === 'data-srcset') { for (const u of parseSrcset(v)) add(assets, u, { tag, attr: k, type: a.type ?? null }); continue }
      // a relative or same-site path to a file; absolute third-party URLs in data-* (a forecast JSON,
      // a widget) are the scripts' business, not assets of the page
      if (/^(https?:)?\/\//i.test(v) || /\s/.test(v.trim())) continue
      if (ASSET_EXT.test(v)) add(assets, v, { tag, attr: k, type: a.type ?? null })
    }
  }
  for (const m of clean.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) for (const u of cssUrls(m[1])) add(assets, u, { tag: 'style', attr: 'url()' })
  for (const m of clean.matchAll(/<form\b([^>]*)>([\s\S]*?)<\/form>/gi)) {
    const fa = parseAttrs(m[1]), body = m[2]
    const fields = []
    for (const f of body.matchAll(/<(input|select|textarea)\b([^>]*)>/gi)) {
      const at = parseAttrs(f[2])
      if (!at.name || at.form === 'none' || at.disabled !== undefined) continue
      const field = { tag: f[1].toLowerCase(), name: at.name, type: at.type ?? null, value: at.value ?? null, required: at.required !== undefined }
      if (field.tag === 'select') {
        const sel = body.slice(f.index).match(/<select\b[^>]*>([\s\S]*?)<\/select>/i)
        field.options = sel ? [...sel[1].matchAll(/<option\b([^>]*)>([^<]*)/gi)].map((o) => parseAttrs(o[1]).value ?? o[2].trim()) : []
      }
      fields.push(field)
    }
    const submitters = [...body.matchAll(/<(button|input)\b([^>]*)>/gi)].map((b) => parseAttrs(b[2])).filter((b) => b.formaction).map((b) => resolve(b.formaction, base))
    forms.push({ action: fa.action ? resolve(fa.action, base) : base, method: (fa.method || 'get').toLowerCase(), id: fa.id ?? null, fields, submitters })
  }
  const robotsMeta = clean.match(/<meta\s[^>]*name=["']robots["'][^>]*>/i)
  const dedupe = (list) => [...new Map(list.map((x) => [x.url + '|' + (x.attr ?? ''), x])).values()]
  return {
    links: dedupe(links), assets: dedupe(assets), forms, iframes: dedupe(iframes),
    robots: robotsMeta ? (parseAttrs(robotsMeta[0].slice(5)).content ?? '') : null,
    canonical: links.find((l) => l.rel === 'canonical')?.url ?? null,
    forecastJson: [...clean.matchAll(/data-json=["']([^"']*rosa[^"']*\.json)["']/gi)].map((x) => unescapeHtml(x[1])),
  }
}

/** The stay a GET booking form would hand off: its date fields and the dates it offers. */
export function formHandoff(form) {
  const names = form.fields.map((f) => f.name)
  const has = (list) => form.fields.find((f) => list.includes(f.name))
  const start = has(START), end = has(END), duration = has(DURATION)
  const targets = [...new Set([form.action, ...form.submitters].filter(Boolean))]
  return {
    method: form.method, targets, engine: targets.some(isEngineUrl), fields: names,
    start: start ? { name: start.name, tag: start.tag, options: (start.options ?? []).filter(Boolean) } : null,
    end: end?.name ?? null, duration: duration ? { name: duration.name, options: (duration.options ?? []).filter(Boolean) } : null,
  }
}

/** Problems of a GET booking form's hand-off, read from its markup (JavaScript off). */
export function checkFormHandoff(fh, { today = new Date() } = {}) {
  const problems = []
  if (fh.method !== 'get') problems.push(`method ${fh.method} (a hand-off is a GET to the engine)`)
  for (const t of fh.targets) { const c = checkHandoff(t); if (!c.ok) problems.push(...c.problems.map((p) => `${t}: ${p}`)) }
  if (!fh.start) { if (fh.end) problems.push(`${fh.end} without a start field`); else problems.push('no start date field') }
  else {
    if (!fh.end && !fh.duration) problems.push(`${fh.start.name} without an end or a duration field`)
    if (fh.start.options.length) {
      const bad = fh.start.options.filter((o) => !parseISODate(o))
      if (bad.length) problems.push(`${fh.start.name} options not YYYY-MM-DD: ${bad.slice(0, 3).join(', ')}`)
      const t0 = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
      const future = fh.start.options.filter((o) => parseISODate(o) && parseISODate(o).getTime() >= t0)
      if (!future.length) problems.push(`every ${fh.start.name} option is in the past (stale snapshot)`)
    }
    if (fh.duration?.options.length && fh.duration.options.some((o) => !/^[1-9]\d{0,2}$/.test(o))) problems.push(`${fh.duration.name} options not whole numbers`)
  }
  return problems
}

// ------------------------------------------------------------------ SEO plumbing

/** Mirrors the sites' isPreviewUrl (src/lib/site.mjs): *.workers.dev and localhost are previews. */
export const isPreviewUrl = (url) => {
  const h = hostOf(url)
  return !h || h === 'workers.dev' || h.endsWith('.workers.dev') || h === 'localhost' || h.endsWith('.localhost') || h === '127.0.0.1' || h === '::1'
}

/** robots.txt: does the `*` group disallow everything, and which sitemaps does it name. */
export function robotsInfo(text) {
  const groups = []
  let cur = null, lastWasAgent = false
  for (const raw of (text || '').split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim()
    if (!line) continue
    const [k, ...rest] = line.split(':')
    const key = k.trim().toLowerCase(), val = rest.join(':').trim()
    if (key === 'user-agent') {
      if (!lastWasAgent) { cur = { agents: [], rules: [] }; groups.push(cur) }
      cur.agents.push(val.toLowerCase()); lastWasAgent = true
    } else {
      lastWasAgent = false
      if (cur && (key === 'disallow' || key === 'allow')) cur.rules.push({ key, val })
    }
  }
  const star = groups.filter((g) => g.agents.includes('*'))
  const disallowAll = star.some((g) => g.rules.some((r) => r.key === 'disallow' && r.val === '/') && !g.rules.some((r) => r.key === 'allow' && r.val === '/'))
  const sitemaps = [...(text || '').matchAll(/^\s*sitemap\s*:\s*(\S+)/gim)].map((m) => m[1])
  return { starGroup: star.length > 0, disallowAll, sitemaps }
}

/** <loc> URLs of a sitemap (or sitemap index). */
export const sitemapLocs = (xml) => [...(xml || '').matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => unescapeHtml(m[1]))

// ------------------------------------------------------------------ forecast, video

/** Rosa's per-spot JSON: fresh when generated_at is less than `maxH` hours old (playbook §4). */
export function forecastFreshness(json, { now = new Date(), maxH = 24 } = {}) {
  const t = Date.parse(json?.generated_at)
  if (Number.isNaN(t)) return { ok: false, problem: 'no generated_at' }
  const ageH = +((now.getTime() - t) / 3.6e6).toFixed(2)
  // current.h is the wave height now: [min, max] in metres (a single number in older files)
  const h = json?.current?.h
  const hasHeadline = typeof h === 'number' || (Array.isArray(h) && h.length > 0 && h.every((x) => typeof x === 'number'))
  return { ok: ageH < maxH && ageH > -1 && !!hasHeadline, generated_at: json.generated_at, ageH, hasHeadline: !!hasHeadline, problem: ageH >= maxH ? `stale: ${ageH} h old` : hasHeadline ? null : 'no current.h' }
}

/** Container of a video file from its first bytes. */
export function sniffVideo(buf) {
  const b = Buffer.from(buf)
  if (b.length >= 12 && b.toString('latin1', 4, 8) === 'ftyp') return 'mp4'
  if (b.length >= 4 && b[0] === 0x1a && b[1] === 0x45 && b[2] === 0xdf && b[3] === 0xa3) return 'webm'
  return null
}
export const videoKindOfPath = (p) => (/\.webm(\?|$)/i.test(p) ? 'webm' : /\.(mp4|m4v)(\?|$)/i.test(p) ? 'mp4' : null)

/** Every { src, type, width, height } in a videos.generated.json-shaped object (any depth). */
export function videoRenditions(manifest) {
  const out = []
  const walk = (o) => {
    if (!o || typeof o !== 'object') return
    if (typeof o.src === 'string' && videoKindOfPath(o.src)) out.push({ src: o.src, type: o.type ?? null, width: o.width ?? null, height: o.height ?? null, bytes: o.bytes ?? null })
    for (const v of Object.values(o)) if (v && typeof v === 'object') walk(v)
  }
  walk(manifest)
  return [...new Map(out.map((r) => [r.src, r])).values()]
}

// ------------------------------------------------------------------ targets

const WORKERS_URL = /https:\/\/[a-z0-9-]+\.os1\.workers\.dev\/?/g

/**
 * Every live site the monitor watches, from what is on disk:
 *   - sites/<slug>/deploy.json (station 8 / the CMS-built sites): the Worker, and the client's domain
 *     once attach_domain recorded one; their CMS;
 *   - ledger lines: `delivered`, `previewed`, and the deployer's/orchestrator's passed→passed
 *     PREVIEW DEPLOY lines (station 6 before `previewed` existed), last one per slug wins;
 * a slug whose last ledger line is `void` is skipped. `wrangler` maps slug → Worker name.
 */
export function collectTargets({ ledger = [], deploys = {}, wrangler = {} }) {
  const bySlug = new Map()
  const last = new Map()
  for (const l of ledger) if (l.slug) last.set(l.slug, l)
  const put = (slug, url, kind, extra = {}) => {
    if (!url) return
    const u = url.endsWith('/') ? url : url + '/'
    const t = bySlug.get(slug) ?? { slug, urls: new Map(), cms: null }
    t.urls.set(u, { url: u, kind })
    Object.assign(t, extra)
    bySlug.set(slug, t)
  }
  for (const l of ledger) {
    if (!l.slug || last.get(l.slug)?.to_state === 'void') continue
    const preview = l.to_state === 'previewed' || l.to_state === 'delivered' ||
      (l.from_state === 'passed' && l.to_state === 'passed' && ['deployer', 'orchestrator'].includes(l.agent) && /\bPREVIEW (RE)?DEPLOY\b/.test(l.note ?? ''))
    if (!preview) continue
    const urls = (l.note ?? '').match(WORKERS_URL) ?? []
    // the Worker this slug deploys to, when the note names several (e.g. old and new names)
    const own = wrangler[l.slug] ? urls.filter((u) => u.includes(`//${wrangler[l.slug]}.`)) : urls
    for (const u of (own.length ? own : urls.slice(0, 1))) put(l.slug, u, l.to_state === 'delivered' ? 'delivered' : 'preview')
  }
  for (const [slug, d] of Object.entries(deploys)) {
    if (last.get(slug)?.to_state === 'void') continue
    const live = [...(d.steps ?? [])].reverse().find((s) => s.step === 'deploy' && s.ok)
    const domain = [...(d.steps ?? [])].reverse().find((s) => s.step === 'attach_domain' && s.ok)?.evidence
    const domainUrl = domain?.url ?? (domain?.domain ? `https://${domain.domain}/` : null)
    if (domainUrl) put(slug, domainUrl, 'production', { cms: d.cms ?? null })
    const workerUrl = live?.evidence?.live?.url ?? live?.evidence?.url ?? (d.worker ? `https://${d.worker}.os1.workers.dev/` : null)
    put(slug, workerUrl, d.adapter === 'static_only' ? 'delivered' : 'cms-built', { cms: d.adapter === 'static_only' ? null : d.cms ?? null })
  }
  const sites = [...bySlug.values()].flatMap((t) => [...t.urls.values()].map((u) => ({ slug: t.slug, url: u.url, kind: u.kind, cms: t.cms })))
  // the same URL from a deploy.json and a ledger line: keep one row, the deploy.json kind
  const rank = { production: 0, 'cms-built': 1, delivered: 2, preview: 3 }
  const byUrl = new Map()
  for (const s of sites) if (!byUrl.has(s.url) || rank[s.kind] < rank[byUrl.get(s.url).kind]) byUrl.set(s.url, s)
  const cms = [...new Set(sites.map((s) => s.cms).filter(Boolean))]
  return { sites: [...byUrl.values()].sort((a, b) => a.slug.localeCompare(b.slug) || a.url.localeCompare(b.url)), cms }
}
