#!/usr/bin/env node
/**
 * Export one tenant (content in all locales + photos) to a directory.
 *   node --env-file=.env scripts/export-tenant.mjs <tenant-slug> <out-dir>
 * Uses the read-only builder key: CMS_URL (default http://localhost:$CMS_PORT), BUILDER_API_KEY,
 * ONESHOT_PROFILE (default multi-tenant).
 */
import { exportTenant, Rest } from './lib/tenant-io.mjs'

const [tenantSlug, dir] = process.argv.slice(2)
if (!tenantSlug || !dir) {
  console.error('usage: export-tenant.mjs <tenant-slug> <out-dir>')
  process.exit(2)
}
const { CMS_URL, CMS_PORT = '3100', BUILDER_API_KEY, ONESHOT_PROFILE = 'multi-tenant' } = process.env
if (!BUILDER_API_KEY) throw new Error('BUILDER_API_KEY is required')
const rest = Rest.withBuilderKey(CMS_URL || `http://localhost:${CMS_PORT}`, BUILDER_API_KEY)
const result = await exportTenant({ rest, profile: ONESHOT_PROFILE, tenantSlug, dir })
console.log(`exported ${result.tenant.slug}: site.json + ${result.photos} photos → ${dir}`)
