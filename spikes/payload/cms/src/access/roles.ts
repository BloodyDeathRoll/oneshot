import type { Access, FieldAccess, PayloadRequest } from 'payload'

type AnyUser = PayloadRequest['user']

/** Human editors live in `users`; the build machine lives in `builders` (API key only). */
export const isSuperAdmin = (user: AnyUser): boolean =>
  Boolean(user && user.collection === 'users' && (user as { role?: string }).role === 'super-admin')

export const isOwner = (user: AnyUser): boolean =>
  Boolean(user && user.collection === 'users' && (user as { role?: string }).role === 'owner')

export const isBuilder = (user: AnyUser): boolean =>
  Boolean(user && user.collection === 'builders')

/** IDs of the tenants a `users` document is assigned to (owners: exactly one). */
export const userTenantIDs = (user: AnyUser): (number | string)[] => {
  const rows = (user as { tenants?: { tenant?: unknown }[] } | null)?.tenants
  if (!Array.isArray(rows)) return []
  return rows
    .map((row) => {
      const t = row?.tenant as { id?: number | string } | number | string | undefined
      return typeof t === 'object' && t !== null ? t.id : t
    })
    .filter((id): id is number | string => id !== undefined && id !== null)
}

export const superAdminOnly: Access = ({ req }) => isSuperAdmin(req.user)
export const superAdminOnlyField: FieldAccess = ({ req }) => isSuperAdmin(req.user)

/**
 * Base access for tenant-scoped collections. The multi-tenant plugin wraps this and ANDs in
 * `tenant in [the user's tenants]` for every non-super-admin in `users`.
 */
export const editors: Access = ({ req }) => isSuperAdmin(req.user) || isOwner(req.user)

/** Read: editors (tenant-scoped by the plugin) + the read-only builder key (all tenants). */
export const editorsOrBuilder: Access = ({ req }) =>
  isSuperAdmin(req.user) || isOwner(req.user) || isBuilder(req.user)
