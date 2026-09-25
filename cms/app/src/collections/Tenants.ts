import type { CollectionConfig } from 'payload'

import { isSuperAdmin, superAdminOnly } from '../access/roles'

/**
 * One tenant per business. Only super-admins create/rename/delete tenants; the plugin limits
 * an owner's read to their own tenant row. Deleting a tenant deletes its content and media
 * (plugin `cleanupAfterTenantDelete`), hence super-admin only.
 */
export const Tenants: CollectionConfig = {
  slug: 'tenants',
  labels: { singular: 'Business', plural: 'Businesses' },
  // owners never need this screen; REST access is restricted separately below
  admin: { useAsTitle: 'name', group: 'Admin', hidden: ({ user }) => !isSuperAdmin(user as never) },
  access: {
    create: superAdminOnly,
    read: ({ req }) => Boolean(req.user),
    update: superAdminOnly,
    delete: superAdminOnly,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          'Lowercase letters, digits and dashes. Used for TENANT_SLUG at build time and the Worker name.',
      },
      validate: (value: unknown) =>
        (typeof value === 'string' && /^[a-z0-9](?:[a-z0-9-]{0,40}[a-z0-9])?$/.test(value)) ||
        'Use 1–42 lowercase letters, digits or dashes (no leading/trailing dash).',
    },
  ],
}
