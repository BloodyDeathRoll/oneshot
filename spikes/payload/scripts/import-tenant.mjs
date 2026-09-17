#!/usr/bin/env node
/**
 * Import an export directory (or a seed fixture) into a CMS.
 *   node scripts/import-tenant.mjs <dir> --cms <url> --email <e> [--tenant <slug>]
 * Password comes from IMPORT_PASSWORD (never argv). `--tenant` = existing tenant slug on a
 * multi-tenant target; omit it for a single-tenant target (log in as the owner).
 */
import { importTenant, Rest } from './lib/tenant-io.mjs'

const args = process.argv.slice(2)
const dir = args[0]
const opt = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined)
const cms = opt('--cms')
const email = opt('--email')
const tenantSlug = opt('--tenant')
const password = process.env.IMPORT_PASSWORD
if (!dir || !cms || !email || !password) {
  console.error('usage: IMPORT_PASSWORD=… import-tenant.mjs <dir> --cms <url> --email <e> [--tenant <slug>]')
  process.exit(2)
}
const rest = await Rest.login(cms, email, password)
let tenantId
if (tenantSlug) {
  const found = (await rest.get(`/api/tenants?where[slug][equals]=${tenantSlug}&depth=0&limit=1`)).docs[0]
  if (!found) throw new Error(`target has no tenant "${tenantSlug}"`)
  tenantId = found.id
}
console.log(JSON.stringify(await importTenant({ rest, dir, tenantId }), null, 2))
