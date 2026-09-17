import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  PayloadRequest,
} from 'payload'

/**
 * Publish trigger. Tells the publisher which tenant changed; the publisher rebuilds and
 * deploys only that tenant's site.
 *
 * Deliberately fire-and-forget: the owner's save must never wait for (or fail because of) a
 * build. The publisher debounces, so the build starts after this request's DB transaction has
 * committed.
 */
import { isMultiTenant, SITE_SLUG } from '../lib/profile'

const PUBLISHER_URL = process.env.PUBLISHER_URL || ''
const PUBLISH_SECRET = process.env.PUBLISH_SECRET || ''

const tenantSlugOf = async (req: PayloadRequest, tenant: unknown): Promise<string | null> => {
  if (!isMultiTenant) return SITE_SLUG
  if (!tenant) return null
  if (typeof tenant === 'object' && 'slug' in (tenant as object)) {
    return (tenant as { slug: string }).slug
  }
  const id = typeof tenant === 'object' ? (tenant as { id: number | string }).id : tenant
  // no `req`: read outside the save's transaction, which may already be closed by now
  const doc = await req.payload.findByID({
    collection: 'tenants',
    id: id as number | string,
    depth: 0,
    overrideAccess: true,
  })
  return (doc as { slug?: string })?.slug ?? null
}

const notify = (req: PayloadRequest, tenant: unknown, trigger: string): void => {
  if (!PUBLISHER_URL || !PUBLISH_SECRET) {
    req.payload.logger.warn(`publish skipped (${trigger}): PUBLISHER_URL / PUBLISH_SECRET not set`)
    return
  }
  if (req.context?.skipPublish) return

  void (async () => {
    try {
      const slug = await tenantSlugOf(req, tenant)
      if (!slug) return
      const res = await fetch(PUBLISHER_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${PUBLISH_SECRET}`,
        },
        body: JSON.stringify({ tenant: slug, trigger }),
        signal: AbortSignal.timeout(5000),
      })
      if (!res.ok) req.payload.logger.error(`publisher answered ${res.status} for ${slug}`)
      else req.payload.logger.info(`publish requested: tenant=${slug} trigger=${trigger}`)
    } catch (err) {
      req.payload.logger.error(`publish request failed (${trigger}): ${(err as Error).message}`)
    }
  })()
}

export const publishAfterChange =
  (collection: string): CollectionAfterChangeHook =>
  ({ doc, operation, req }) => {
    notify(req, doc?.tenant, `${collection}.${operation}`)
    return doc
  }

export const publishAfterDelete =
  (collection: string): CollectionAfterDeleteHook =>
  ({ doc, req }) => {
    notify(req, doc?.tenant, `${collection}.delete`)
    return doc
  }
