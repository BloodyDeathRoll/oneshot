#!/usr/bin/env node
/**
 * Seed a running CMS from seed/fixtures/* (same format as scripts/export-tenant.mjs output).
 *
 *   multi-tenant  (default)   node --env-file=.env seed/seed.mjs
 *       logs in as the bootstrapped super-admin, creates one tenant + one owner per fixture,
 *       imports content + photos. Owner passwords are generated HERE and written only to
 *       seed/credentials.json (git-ignored, mode 600).
 *
 *   single-tenant             node --env-file=.env.self-hosted seed/seed.mjs --fixture wobbly-pelican
 *       logs in as THE owner (created at first boot from OWNER_EMAIL/OWNER_PASSWORD) and imports
 *       one fixture. No users are created — there is exactly one.
 */
import { randomBytes } from 'node:crypto'
import { chmod, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { importTenant, Rest } from '../scripts/lib/tenant-io.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const env = process.env
const profile = env.ONESHOT_PROFILE || 'multi-tenant'
const cms = env.CMS_URL || env.SERVER_URL || `http://localhost:${env.CMS_PORT || 3100}`
const args = process.argv.slice(2)
const only = args.includes('--fixture') ? args[args.indexOf('--fixture') + 1] : null
const fixturesDir = path.join(here, 'fixtures')

if (profile === 'single-tenant') {
  if (!only) throw new Error('single-tenant seed needs --fixture <slug>')
  const rest = await Rest.login(cms, env.OWNER_EMAIL, env.OWNER_PASSWORD)
  const result = await importTenant({ rest, dir: path.join(fixturesDir, only) })
  console.log(`seeded single-tenant site from fixture "${only}":`, JSON.stringify(result))
  process.exit(0)
}

const rest = await Rest.login(cms, env.SUPERADMIN_EMAIL, env.SUPERADMIN_PASSWORD)
const credentials = { cms, generatedAt: new Date().toISOString(), owners: [] }

for (const slug of (await readdir(fixturesDir)).sort()) {
  if (only && slug !== only) continue
  const dir = path.join(fixturesDir, slug)
  const { tenant } = JSON.parse(await readFile(path.join(dir, 'manifest.json'), 'utf8'))

  const exists = (await rest.get(`/api/tenants?where[slug][equals]=${tenant.slug}&limit=1`)).docs[0]
  if (exists) {
    console.log(`tenant ${tenant.slug} already exists — skipping`)
    continue
  }
  const created = (await rest.post('/api/tenants', { name: tenant.name, slug: tenant.slug })).doc
  const email = `owner@${tenant.slug}.example`
  const password = randomBytes(15).toString('base64url')
  await rest.post('/api/users', { email, password, role: 'owner', name: `${tenant.name} owner`, tenants: [{ tenant: created.id }] })
  const result = await importTenant({ rest, dir, tenantId: created.id })
  credentials.owners.push({ tenant: tenant.slug, tenantId: created.id, email, password })
  console.log(`seeded ${tenant.slug}: tenant #${created.id}, owner ${email}, site #${result.siteId}, ${result.photos} photos`)
}

if (credentials.owners.length) {
  const file = path.join(here, 'credentials.json')
  await writeFile(file, JSON.stringify(credentials, null, 2) + '\n', { mode: 0o600 })
  await chmod(file, 0o600)
  console.log(`owner logins written to ${file} (git-ignored)`)
}
