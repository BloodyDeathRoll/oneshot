import type { CollectionConfig } from 'payload'

import { isSuperAdmin, superAdminOnly } from '../access/roles'

/**
 * Machine identities for the static-site build. API key only (no password login, no admin
 * access). Tenant-scoped collections grant builders READ and nothing else.
 * Header: `Authorization: builders API-Key <key>`.
 */
export const Builders: CollectionConfig = {
  slug: 'builders',
  admin: { useAsTitle: 'name', group: 'Admin', hidden: ({ user }) => !isSuperAdmin(user as never) },
  auth: { useAPIKey: true, disableLocalStrategy: true },
  access: {
    create: superAdminOnly,
    read: superAdminOnly,
    update: superAdminOnly,
    delete: superAdminOnly,
  },
  fields: [{ name: 'name', type: 'text', required: true, unique: true }],
}
