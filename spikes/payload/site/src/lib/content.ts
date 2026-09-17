/**
 * Typed view of what scripts/fetch-tenant.mjs wrote. The shape is the REST shape documented in
 * /schemas/site-content.md (one locale, depth=1).
 */
import type { ImageMetadata } from 'astro'

export type Locale = 'en' | 'si'
export type Day = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
export type Unit = 'per_hour' | 'per_lesson' | 'per_day' | 'per_week' | 'per_person' | 'flat'

export interface MediaDoc {
  id: number
  alt: string
  filename: string
  url: string
  width: number
  height: number
  mimeType: string
}
export interface SiteContent {
  id: number
  businessName: string
  tagline?: string | null
  languages: Locale[]
  copyBlocks?: { slot: 'intro' | 'about' | 'offer' | 'info'; heading?: string | null; body: string }[]
  openingHours?: { days: Day[]; opens: string; closes: string }[]
  hoursNote?: string | null
  priceList?: { label: string; price: number; currency: 'LKR' | 'USD' | 'EUR'; unit: Unit; note?: string | null }[]
  photos?: { image: MediaDoc | number; caption?: string | null }[]
  contact: { phone?: string | null; whatsapp: string; email?: string | null; address?: string | null; mapUrl?: string | null }
  bookingLinks?: { label: string; url: string }[]
  updatedAt: string
}
interface TenantFile {
  tenant: { id: number; slug: string; name: string }
  locales: Record<Locale, SiteContent>
}

// glob (not a plain import) so a missing file gives a clear error instead of a resolve failure
const files = import.meta.glob<{ default: TenantFile }>('/src/tenant/content.json', { eager: true })
export const tenantFile = (): TenantFile => {
  const mod = files['/src/tenant/content.json']
  if (!mod) throw new Error('src/tenant/content.json is missing — run `npm run fetch` (scripts/fetch-tenant.mjs) first')
  return mod.default
}

const images = import.meta.glob<{ default: ImageMetadata }>('/src/tenant/media/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}')
export const localImage = async (media: MediaDoc): Promise<ImageMetadata> => {
  const loader = images[`/src/tenant/media/${media.filename}`]
  if (!loader) throw new Error(`photo ${media.filename} was not downloaded into src/tenant/media/`)
  return (await loader()).default
}

/** Only https: links and wa.me/tel:/mailto: built by the template itself ever reach an href. */
export const safeHttps = (url?: string | null): string | null => {
  if (!url) return null
  try {
    return new URL(url).protocol === 'https:' ? url : null
  } catch {
    return null
  }
}
