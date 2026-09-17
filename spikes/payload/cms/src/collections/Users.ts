import type { CollectionConfig } from 'payload'
import { ValidationError } from 'payload'

import { isSuperAdmin, superAdminOnly, superAdminOnlyField } from '../access/roles'
import { isMultiTenant } from '../lib/profile'

/**
 * Human logins. Two roles:
 *  - super-admin: us. Sees every tenant.
 *  - owner: a business owner. Assigned to exactly ONE tenant (the `tenants` array field is added
 *    by the multi-tenant plugin and is writable by super-admins only).
 */
export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email', group: 'Admin' },
  auth: {
    tokenExpiration: 60 * 60 * 8,
    // Payload's built-in brute-force protection: per-account lockout (not per-IP throttling).
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    cookies: {
      sameSite: 'Lax',
      secure: process.env.COOKIE_SECURE === 'true',
    },
  },
  access: {
    admin: ({ req }) => Boolean(req.user && req.user.collection === 'users'),
    // single-tenant profile: nobody is a super-admin, so the one bootstrapped owner stays the
    // only user — no create, no delete, no role change through any API.
    create: superAdminOnly,
    delete: superAdminOnly,
    // An owner can read and update only their own user document. (The plugin would also let
    // them see other users of the same tenant; this narrower base rule is ANDed with it.)
    read: ({ req }) => {
      if (!req.user || req.user.collection !== 'users') return false
      if (isSuperAdmin(req.user)) return true
      return { id: { equals: req.user.id } }
    },
    update: ({ req }) => {
      if (!req.user || req.user.collection !== 'users') return false
      if (isSuperAdmin(req.user)) return true
      return { id: { equals: req.user.id } }
    },
    unlock: superAdminOnly,
  },
  hooks: {
    beforeValidate: [
      ({ data, originalDoc, req }) => {
        const role = data?.role ?? originalDoc?.role
        const tenants = data?.tenants ?? originalDoc?.tenants ?? []
        if (isMultiTenant && role === 'owner' && (!Array.isArray(tenants) || tenants.length !== 1)) {
          throw new ValidationError(
            {
              collection: 'users',
              errors: [{ message: 'An owner must be assigned to exactly one business.', path: 'tenants' }],
            },
            req.t,
          )
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'owner',
      options: [
        { label: 'Super admin', value: 'super-admin' },
        { label: 'Owner', value: 'owner' },
      ],
      saveToJWT: true,
      access: { create: superAdminOnlyField, update: superAdminOnlyField },
      admin: { position: 'sidebar' },
    },
    { name: 'name', type: 'text' },
  ],
}
