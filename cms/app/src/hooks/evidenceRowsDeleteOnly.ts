import type { CollectionBeforeChangeHook } from 'payload'
import { ValidationError } from 'payload'

import { isOwner } from '../access/roles'

/**
 * Ratings and guest quotes are evidence (schema: "deployer-edited rows are evidence"): seeded by
 * us from the dossier, each with a source. An owner may DELETE a row; an owner may not add one or
 * change one. Every incoming row must therefore be an unchanged row of the stored document.
 */
const comparable = (row: Record<string, unknown>) => {
  const { id: _id, ...rest } = row
  return JSON.stringify(Object.keys(rest).sort().map((k) => [k, rest[k] ?? null]))
}

export const evidenceRowsDeleteOnly =
  (fields: string[]): CollectionBeforeChangeHook =>
  ({ data, originalDoc, req }) => {
    if (!isOwner(req.user)) return data
    for (const field of fields) {
      const incoming = data?.[field]
      if (!Array.isArray(incoming)) continue
      const stored = new Map(
        ((originalDoc?.[field] ?? []) as Record<string, unknown>[]).map((r) => [String(r.id), comparable(r)]),
      )
      for (const row of incoming as Record<string, unknown>[]) {
        if (stored.get(String(row?.id)) !== comparable(row ?? {})) {
          throw new ValidationError(
            {
              collection: 'sites',
              errors: [{ message: 'Ratings and guest quotes can be deleted, not added or edited.', path: field }],
            },
            req.t,
          )
        }
      }
    }
    return data
  }
