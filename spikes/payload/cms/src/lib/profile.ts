/**
 * ONE codebase, two hosting profiles, selected by ONE env var:
 *
 *   ONESHOT_PROFILE=multi-tenant   (default) our server: many businesses, tenant-scoped owners,
 *                                  super-admins, the multi-tenant plugin.
 *   ONESHOT_PROFILE=single-tenant  a client's own box: plugin disabled, no tenants collection,
 *                                  exactly one admin user (the owner).
 *
 * Collections, content fields and the REST shape of `sites` / `media` are identical in both —
 * the only difference is the extra `tenant` key the plugin adds in multi-tenant mode.
 */
const raw = process.env.ONESHOT_PROFILE || 'multi-tenant'
if (raw !== 'multi-tenant' && raw !== 'single-tenant') {
  throw new Error(`ONESHOT_PROFILE must be "multi-tenant" or "single-tenant" (got "${raw}")`)
}
export const PROFILE: 'multi-tenant' | 'single-tenant' = raw
export const isMultiTenant = PROFILE === 'multi-tenant'

/** single-tenant only: the slug the publisher builds (there is no tenants collection to ask). */
export const SITE_SLUG = process.env.SITE_SLUG || 'site'
