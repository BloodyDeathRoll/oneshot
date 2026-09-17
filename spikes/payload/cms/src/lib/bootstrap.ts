import type { Payload } from 'payload'

import { isMultiTenant, PROFILE } from './profile'

/**
 * First-boot provisioning from environment variables, so an instance is never left in Payload's
 * "anyone may register the first user" state:
 *  - multi-tenant:  one super-admin      (SUPERADMIN_EMAIL / SUPERADMIN_PASSWORD)
 *  - single-tenant: THE owner, the only user there will ever be (OWNER_EMAIL / OWNER_PASSWORD)
 *  - both: one read-only builder API key (BUILDER_API_KEY) for the static-site build
 * Idempotent. Refuses to start without credentials while the users table is empty.
 */
export const bootstrap = async (payload: Payload): Promise<void> => {
  const env = process.env
  const email = isMultiTenant ? env.SUPERADMIN_EMAIL : env.OWNER_EMAIL
  const password = isMultiTenant ? env.SUPERADMIN_PASSWORD : env.OWNER_PASSWORD
  const role = isMultiTenant ? 'super-admin' : 'owner'

  const { totalDocs } = await payload.count({ collection: 'users' })
  if (totalDocs === 0) {
    if (!email || !password) {
      throw new Error(`bootstrap (${PROFILE}): no users exist and no first-user credentials were provided`)
    }
    await payload.create({
      collection: 'users',
      data: { email, password, role, name: isMultiTenant ? 'Super admin' : 'Owner' },
    })
    payload.logger.info(`bootstrap (${PROFILE}): created ${role} ${email}`)
  }

  if (env.BUILDER_API_KEY) {
    const existing = await payload.find({ collection: 'builders', where: { name: { equals: 'site-builder' } }, limit: 1 })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'builders',
        data: { name: 'site-builder', enableAPIKey: true, apiKey: env.BUILDER_API_KEY },
      })
      payload.logger.info(`bootstrap (${PROFILE}): created builder API key "site-builder"`)
    }
  }
}
