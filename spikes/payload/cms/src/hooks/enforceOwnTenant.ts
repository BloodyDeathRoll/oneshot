import type { CollectionBeforeValidateHook } from 'payload'
import { Forbidden } from 'payload'

import { isOwner, userTenantIDs } from '../access/roles'
import { isMultiTenant } from '../lib/profile'

/**
 * Belt and braces on top of the plugin: an owner can only ever write documents for their own
 * tenant. Missing tenant on create is filled in (so REST clients need not send it); any other
 * tenant value is rejected rather than silently rewritten.
 */
export const enforceOwnTenant: CollectionBeforeValidateHook = ({ data, operation, req }) => {
  if (!isMultiTenant) return data // single-tenant profile: there is no tenant field
  if (!data || !isOwner(req.user)) return data
  const [own] = userTenantIDs(req.user)
  if (own === undefined) throw new Forbidden(req.t)

  const incoming = data.tenant
  const incomingID =
    typeof incoming === 'object' && incoming !== null ? (incoming as { id?: unknown }).id : incoming

  if (incomingID === undefined || incomingID === null || incomingID === '') {
    // on update `data` is partial: only fill when creating
    if (operation === 'create') data.tenant = own
    return data
  }
  if (String(incomingID) !== String(own)) throw new Forbidden(req.t)
  return data
}
