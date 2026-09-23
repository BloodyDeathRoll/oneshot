#!/usr/bin/env node
/**
 * Pre-build step: pull ONE tenant's content and photos out of Payload into src/tenant/.
 * Copied from spikes/payload/site/scripts/fetch-tenant.mjs (the reference consumer); only the
 * locale list differs. Run with `npm run fetch` once The Lavish Haven has a tenant; it exits 2 without credentials
 * and never runs as part of `npm run build`, so the checked-in seed stays in place until then.
 *
 *   TENANT_SLUG       which tenant to build                      (required)
 *   CMS_URL           Payload base URL, e.g. http://cms:3000     (required)
 *   BUILDER_API_KEY   read-only key of the `builders` collection (required)
 *   ONESHOT_PROFILE   multi-tenant (default) | single-tenant
 *
 * The ONLY profile-dependent code of the whole site is `resolveScope()` below: on the shared
 * multi-tenant CMS the `sites` query is filtered by tenant; on a single-tenant CMS there is no
 * tenants collection and the one `sites` document is the site. Everything downstream (the JSON
 * on disk, the template) is identical.
 *
 * After this step the Astro build is fully offline: content is JSON on disk and photos are
 * local files that scripts/photos.mjs crops and resizes. The deployed site never calls the CMS.
 */
import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const LOCALES = ['en'] // run.yaml languages; add a locale here and in the page when the site gains one
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'src', 'tenant')

const { TENANT_SLUG, CMS_URL, BUILDER_API_KEY } = process.env
for (const [k, v] of Object.entries({ TENANT_SLUG, CMS_URL, BUILDER_API_KEY })) {
  if (!v) {
    console.error(`fetch-tenant: ${k} is required`)
    process.exit(2)
  }
}
if (!/^[a-z0-9-]+$/.test(TENANT_SLUG)) {
  console.error('fetch-tenant: TENANT_SLUG must be [a-z0-9-]+')
  process.exit(2)
}

const headers = { Authorization: `builders API-Key ${BUILDER_API_KEY}` }
const api = async (pathAndQuery) => {
  const res = await fetch(new URL(pathAndQuery, CMS_URL), { headers })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${pathAndQuery}`)
  return res.json()
}

const PROFILE = process.env.ONESHOT_PROFILE || 'multi-tenant'

/** → { tenant: {id, slug, name}, filter: '<query-string fragment for /api/sites>' } */
const resolveScope = async () => {
  if (PROFILE === 'single-tenant') {
    return { tenant: { id: null, slug: TENANT_SLUG, name: TENANT_SLUG }, filter: '' }
  }
  const tenants = await api(`/api/tenants?where[slug][equals]=${TENANT_SLUG}&depth=0&limit=1`)
  const found = tenants.docs[0]
  if (!found) throw new Error(`no tenant with slug "${TENANT_SLUG}"`)
  return { tenant: found, filter: `where[tenant][equals]=${found.id}&` }
}
const { tenant, filter } = await resolveScope()

const locales = {}
for (const locale of LOCALES) {
  const res = await api(
    `/api/sites?${filter}locale=${locale}&fallback-locale=en&depth=1&limit=1`,
  )
  if (!res.docs[0]) throw new Error(`tenant "${TENANT_SLUG}" has no site content document`)
  locales[locale] = res.docs[0]
}

await rm(outDir, { recursive: true, force: true })
await mkdir(path.join(outDir, 'media'), { recursive: true })

// Photos: same files in every locale, so walk the default locale only.
const files = new Map()
for (const row of locales.en.photos ?? []) {
  const m = row.image
  if (!m || typeof m !== 'object') continue // depth=0 or a deleted upload
  if (tenant.id !== null && String(m.tenant?.id ?? m.tenant) !== String(tenant.id)) {
    throw new Error(`media ${m.id} does not belong to tenant ${TENANT_SLUG}`) // never expected
  }
  files.set(m.filename, m.url)
}
for (const [filename, url] of files) {
  const safe = path.basename(filename)
  // Payload returns absolute URLs built from its public SERVER_URL; inside the compose network
  // the CMS is reached under another origin, so keep only the path.
  const { pathname } = new URL(url, CMS_URL)
  const res = await fetch(new URL(pathname, CMS_URL), { headers })
  if (!res.ok) throw new Error(`${res.status} downloading ${pathname}`)
  await writeFile(path.join(outDir, 'media', safe), Buffer.from(await res.arrayBuffer()))
}

await writeFile(
  path.join(outDir, 'content.json'),
  JSON.stringify({ tenant: { id: tenant.id, slug: tenant.slug, name: tenant.name }, locales }, null, 2),
)
console.log(`fetch-tenant: ${TENANT_SLUG} — ${LOCALES.length} locales, ${files.size} photos → src/tenant/`)
