/**
 * Portable tenant export/import over Payload's REST API. Works against both profiles, which is
 * what lets a managed client move from our multi-tenant server to their own single-tenant box.
 *
 * Export directory format (version 1) — also the format of seed/fixtures/*:
 *   manifest.json  { format, version, exportedAt, source: { profile }, tenant: { slug, name } }
 *   site.json      the `sites` document with EVERY locale (localized fields are { en, si } objects);
 *                  ids/timestamps/tenant removed; photos[].image is a media FILENAME
 *   media.json     [{ filename, mimeType, alt: { en, si } }]
 *   media/<filename>
 *
 * Zero dependencies (Node >= 22: global fetch, FormData, Blob).
 */
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

export const FORMAT = 'oneshot-tenant-export'
export const LOCALES = ['en', 'si']
const DEFAULT_LOCALE = 'en'

/** Localized field paths of schema v0.7 (keep in sync with cms/app/src/collections/Sites.ts). */
const LOCALIZED = {
  top: ['tagline', 'featureLine', 'closing', 'hoursNote', 'spot', 'season'],
  arrays: {
    copyBlocks: ['heading', 'body'],
    priceList: ['label', 'note'],
    photos: ['caption'],
    bookingLinks: ['label'],
    amenities: ['label', 'note'],
    rooms: ['label', 'beds', 'note'],
    lessons: ['label', 'groupSize', 'includes'],
    credentials: ['label'],
    rentals: ['label', 'note'],
  },
  groups: { contact: ['address'], stayInfo: ['note'], shaping: ['boardTypes', 'leadTime', 'customOrder'] },
}
const ARRAYS = [
  'copyBlocks', 'openingHours', 'priceList', 'photos', 'bookingLinks', 'amenities', 'ratings', 'testimonials',
  'rooms', 'lessons', 'credentials', 'rentals', 'brands',
]
/** Upload fields holding a media FILENAME in the export format: [array, field]. */
const UPLOADS = [['photos', 'image'], ['rooms', 'photo']]

/** Locales that actually carry a value somewhere in the export (a site may be English only). */
const localesIn = (content, media) => {
  const found = new Set([DEFAULT_LOCALE])
  const add = (v) => {
    if (v && typeof v === 'object' && !Array.isArray(v)) for (const k of Object.keys(v)) if (LOCALES.includes(k) && v[k] != null) found.add(k)
  }
  for (const f of LOCALIZED.top) add(content[f])
  for (const [g, fields] of Object.entries(LOCALIZED.groups)) for (const f of fields) add(content[g]?.[f])
  for (const [a, fields] of Object.entries(LOCALIZED.arrays)) for (const row of content[a] ?? []) for (const f of fields) add(row[f])
  for (const m of media) add(m.alt)
  return LOCALES.filter((l) => found.has(l))
}

export class Rest {
  constructor(baseUrl, authHeader) {
    this.baseUrl = baseUrl
    this.auth = authHeader
  }
  static async login(baseUrl, email, password) {
    const res = await fetch(new URL('/api/users/login', baseUrl), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const body = await res.json()
    if (!res.ok || !body.token) throw new Error(`login failed for ${email}: ${res.status} ${JSON.stringify(body.errors ?? body)}`)
    return Object.assign(new Rest(baseUrl, `JWT ${body.token}`), { user: body.user })
  }
  static withBuilderKey(baseUrl, key) {
    return new Rest(baseUrl, `builders API-Key ${key}`)
  }
  async raw(method, p, { json, form } = {}) {
    return fetch(new URL(p, this.baseUrl), {
      method,
      headers: { Authorization: this.auth, ...(json ? { 'content-type': 'application/json' } : {}) },
      body: json ? JSON.stringify(json) : form,
    })
  }
  async call(method, p, opts) {
    const res = await this.raw(method, p, opts)
    const text = await res.text()
    if (!res.ok) throw new Error(`${method} ${p} → ${res.status}: ${text.slice(0, 600)}`)
    return text ? JSON.parse(text) : null
  }
  get(p) { return this.call('GET', p) }
  post(p, json) { return this.call('POST', p, { json }) }
  patch(p, json) { return this.call('PATCH', p, { json }) }
}

const strip = (row) => {
  const { id, ...rest } = row
  return rest
}

// ---------------------------------------------------------------- export

export const exportTenant = async ({ rest, profile, tenantSlug, dir }) => {
  let tenant = { slug: tenantSlug, name: tenantSlug }
  let filter = ''
  if (profile === 'multi-tenant') {
    const found = (await rest.get(`/api/tenants?where[slug][equals]=${tenantSlug}&depth=0&limit=1`)).docs[0]
    if (!found) throw new Error(`no tenant "${tenantSlug}"`)
    tenant = found
    filter = `where[tenant][equals]=${found.id}&`
  }
  const site = (await rest.get(`/api/sites?${filter}locale=all&depth=1&limit=1`)).docs[0]
  if (!site) throw new Error(`tenant "${tenantSlug}" has no site document`)

  await mkdir(path.join(dir, 'media'), { recursive: true })
  const media = []
  for (const [array, field] of UPLOADS) {
    for (const row of site[array] ?? []) {
      const m = row[field]
      if (!m || typeof m !== 'object') continue
      if (!media.some((x) => x.filename === m.filename)) {
        const res = await rest.raw('GET', new URL(m.url, rest.baseUrl).pathname) // url is absolute (SERVER_URL)
        if (!res.ok) throw new Error(`download ${m.url} → ${res.status}`)
        await writeFile(path.join(dir, 'media', path.basename(m.filename)), Buffer.from(await res.arrayBuffer()))
        media.push({ filename: m.filename, mimeType: m.mimeType, alt: m.alt })
      }
      row[field] = m.filename
    }
  }

  const { id, tenant: _t, createdAt, updatedAt, ...content } = site
  for (const key of ARRAYS) if (Array.isArray(content[key])) content[key] = content[key].map(strip)

  await writeFile(path.join(dir, 'site.json'), JSON.stringify(content, null, 2) + '\n')
  await writeFile(path.join(dir, 'media.json'), JSON.stringify(media, null, 2) + '\n')
  await writeFile(
    path.join(dir, 'manifest.json'),
    JSON.stringify({ format: FORMAT, version: 1, exportedAt: new Date().toISOString(), source: { profile }, tenant: { slug: tenant.slug, name: tenant.name } }, null, 2) + '\n',
  )
  return { tenant, photos: media.length, dir }
}

// ---------------------------------------------------------------- import

const pick = (value, locale) =>
  value && typeof value === 'object' && !Array.isArray(value) ? (value[locale] ?? null) : value

/** Project the all-locales document onto one locale. `rowIds` re-attaches array row ids. */
const forLocale = (content, locale, rowIds = {}) => {
  const out = structuredClone(content)
  for (const f of LOCALIZED.top) if (f in out) out[f] = pick(out[f], locale)
  for (const [group, fields] of Object.entries(LOCALIZED.groups)) {
    if (out[group]) for (const f of fields) if (f in out[group]) out[group][f] = pick(out[group][f], locale)
  }
  for (const key of ARRAYS) {
    if (!Array.isArray(out[key])) continue
    out[key] = out[key].map((row, i) => {
      const next = { ...row }
      for (const f of LOCALIZED.arrays[key] ?? []) if (f in next) next[f] = pick(next[f], locale)
      if (rowIds[key]?.[i]) next.id = rowIds[key][i]
      return next
    })
  }
  return out
}

export const readExport = async (dir) => {
  const manifest = JSON.parse(await readFile(path.join(dir, 'manifest.json'), 'utf8'))
  if (manifest.format !== FORMAT || manifest.version !== 1) throw new Error(`${dir}: not a ${FORMAT} v1 directory`)
  const content = JSON.parse(await readFile(path.join(dir, 'site.json'), 'utf8'))
  const media = JSON.parse(await readFile(path.join(dir, 'media.json'), 'utf8'))
  const files = await readdir(path.join(dir, 'media')).catch(() => [])
  for (const m of media) if (!files.includes(m.filename)) throw new Error(`${dir}: media/${m.filename} missing`)
  return { manifest, content, media }
}

/**
 * @param rest      authenticated as someone allowed to write (multi: super-admin; single: the owner)
 * @param tenantId  multi-tenant target only: id of an existing tenant; omit for single-tenant
 */
export const importTenant = async ({ rest, dir, tenantId }) => {
  const { manifest, content, media } = await readExport(dir)
  const locales = localesIn(content, media)
  const scope = tenantId === undefined ? {} : { tenant: tenantId }
  const filter = tenantId === undefined ? '' : `where[tenant][equals]=${tenantId}&`

  // 1. media (default locale on create, then the other locales)
  const mediaIds = {}
  const renamed = []
  for (const m of media) {
    const form = new FormData()
    const bytes = await readFile(path.join(dir, 'media', m.filename))
    form.append('file', new Blob([bytes], { type: m.mimeType }), m.filename)
    form.append('_payload', JSON.stringify({ ...scope, alt: pick(m.alt, DEFAULT_LOCALE) ?? m.filename }))
    const created = (await rest.call('POST', `/api/media?locale=${DEFAULT_LOCALE}`, { form })).doc
    mediaIds[m.filename] = created.id
    if (created.filename !== m.filename) renamed.push({ from: m.filename, to: created.filename })
    for (const locale of locales.filter((l) => l !== DEFAULT_LOCALE)) {
      const alt = pick(m.alt, locale)
      if (alt) await rest.patch(`/api/media/${created.id}?locale=${locale}`, { alt })
    }
  }

  // 2. site document: default locale first (create or overwrite) …
  const resolved = structuredClone(content)
  for (const [array, field] of UPLOADS) {
    if (!Array.isArray(resolved[array])) continue
    resolved[array] = resolved[array].map((row) => ({ ...row, [field]: row[field] == null ? null : mediaIds[row[field]] }))
  }
  const existing = (await rest.get(`/api/sites?${filter}depth=0&limit=1`)).docs[0]
  const base = forLocale(resolved, DEFAULT_LOCALE)
  const saved = existing
    ? (await rest.patch(`/api/sites/${existing.id}?locale=${DEFAULT_LOCALE}&depth=0`, base)).doc
    : (await rest.post(`/api/sites?locale=${DEFAULT_LOCALE}&depth=0`, { ...scope, ...base })).doc

  // … then every other locale, re-using the row ids Payload assigned so rows line up
  const rowIds = Object.fromEntries(ARRAYS.map((k) => [k, (saved[k] ?? []).map((r) => r.id)]))
  for (const locale of locales.filter((l) => l !== DEFAULT_LOCALE)) {
    await rest.patch(`/api/sites/${saved.id}?locale=${locale}&depth=0`, forLocale(resolved, locale, rowIds))
  }
  return { siteId: saved.id, replacedExisting: Boolean(existing), photos: media.length, renamed, locales, mediaIds, tenant: manifest.tenant }
}
