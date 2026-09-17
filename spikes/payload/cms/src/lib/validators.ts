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
