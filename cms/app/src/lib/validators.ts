/** Field validators shared by the content schema. Keep in sync with schemas/site-content.md. */

const ok = (value: unknown): value is string => typeof value === 'string' && value.length > 0

/** Only https:// links may be stored — blocks javascript:/data: URLs reaching a template's href. */
export const httpsUrl = (value: unknown, { required }: { required?: boolean } = {}) => {
  if (!ok(value)) return required ? 'Required.' : true
  try {
    return new URL(value).protocol === 'https:' || 'Must be a full https:// link.'
  } catch {
    return 'Must be a full https:// link.'
  }
}

/** International format, digits only after the +, e.g. +94771234567. */
export const e164 = (value: unknown, { required }: { required?: boolean } = {}) => {
  if (!ok(value)) return required ? 'Required.' : true
  return /^\+[1-9]\d{6,14}$/.test(value) || 'Use international format without spaces, e.g. +94771234567.'
}

/** 24h clock, HH:MM. */
export const hhmm = (value: unknown, { required }: { required?: boolean } = {}) => {
  if (!ok(value)) return required ? 'Required.' : true
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value) || 'Use 24-hour time, e.g. 07:30.'
}

/** Calendar date, YYYY-MM-DD (ratings[].capturedAt). */
export const isoDate = (value: unknown, { required }: { required?: boolean } = {}) => {
  if (!ok(value)) return required ? 'Required.' : true
  return (/^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value))) || 'Use YYYY-MM-DD.'
}

/** Year and month, YYYY-MM (testimonials[].date). */
export const yearMonth = (value: unknown, { required }: { required?: boolean } = {}) => {
  if (!ok(value)) return required ? 'Required.' : true
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(value) || 'Use YYYY-MM.'
}

/** Lowercase id, e.g. a Rosa spot id. */
export const slugId = (value: unknown, { required }: { required?: boolean } = {}) => {
  if (!ok(value)) return required ? 'Required.' : true
  return /^[a-z0-9-]+$/.test(value) || 'Lowercase letters, digits and dashes only.'
}
