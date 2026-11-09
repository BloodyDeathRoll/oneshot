// sites/the-sandhya/final/src/lib/layout.mjs — where each photograph goes and how the build cuts it.
// Template, not content: shared by scripts/photos.mjs (which writes the renditions) and
// src/pages/index.astro (which places them). Ported from the calm mockup's src/make-media.sh.
//
// photos[] has no placement field (schemas/site-content.md: "first row is the hero photo; order is the
// owner's order"), so the design places photos[] by position, in the groups below. Every crop is a
// ratio cut around the photograph's own focalX / focalY (schema v0.10), never coordinates written for
// one picture, so a replaced photograph is still cut sensibly.

// A variant: key (name in photos.generated.json), ratio (w/h; omitted = the photograph's own),
// w (target width, never above the source unless `upscale`), q (WebP quality).
export const ROLES = {
  hero: [
    { key: 'd', w: 2000, q: 88 },
    // The phone hero: a full-height cut on the window's axis, scaled 1.5x with Lanczos and a light
    // unsharp, as the mockup did (its notes.md, conflicts 3: 616 source px; an original fixes it).
    { key: 'phone', ratio: 616 / 1334, w: 924, q: 84, upscale: true, sharpen: true },
  ],
  bleed: [
    { key: 'd', w: 2000, q: 84 },
    { key: 'm', w: 1200, q: 82 },
    { key: 'phone', ratio: 4 / 5, w: 900, q: 82 },
  ],
  door: [{ key: 'door', ratio: 4 / 5, w: 1000, q: 84 }],
  slide: [
    { key: 'l', w: 1400, q: 82 },
    { key: 's', w: 1000, q: 82 },
  ],
  tall: [{ key: 'tall', ratio: 4 / 5, w: 900, q: 82 }],
  square: [{ key: 'sq', ratio: 1, w: 850, q: 82 }],
  dish: [{ key: 'w', w: 900, q: 82 }],
  detail: [{ key: 'd45', ratio: 4 / 5, w: 680, q: 82 }],
  staff: [{ key: 'w', w: 480, q: 82 }],
  print: [{ key: 'w', w: 1200, q: 86 }],
  map: [{ key: 'w', w: 730, q: 86 }],
  portrait: [{ key: 'w', w: 1100, q: 82 }],
  wide: [
    { key: 'l', w: 1800, q: 82 },
    { key: 's', w: 1000, q: 82 },
  ],
}

// Roles drawn full-bleed: tools/build-mockup.mjs's rule, kept here: refused under 1200 px.
export const BLEED_ROLES = new Set(['hero', 'bleed'])
export const MIN_BLEED_WIDTH = 1200

// photos[] by position: [group, role]. Rows past the end of this list are not shown.
export const PHOTO_ROWS = [
  ['hero', 'hero'],
  ['arrival', 'door'],
  ['feature', 'bleed'],
  ['dining', 'tall'], ['dining', 'square'], ['dining', 'dish'], ['dining', 'dish'],
  ['house', 'bleed'],
  ['details', 'detail'], ['details', 'detail'], ['details', 'detail'], ['details', 'detail'], ['details', 'detail'], ['details', 'detail'],
  ['service', 'staff'], ['service', 'staff'], ['service', 'staff'],
  ['kabalana', 'portrait'],
  ['map', 'map'],
  ['exclusive', 'wide'],
  ['twilight', 'print'], ['twilight', 'print'],
]

// Crop box for a ratio inside a w x h photograph, centred on the focal point (percent), clamped.
export function cropBox(w, h, ratio, fx = 50, fy = 50) {
  if (!ratio) return { left: 0, top: 0, width: w, height: h }
  if (w / h > ratio) {
    const cw = Math.round(h * ratio)
    const left = Math.min(Math.max(Math.round((fx / 100) * w - cw / 2), 0), w - cw)
    return { left, top: 0, width: cw, height: h }
  }
  const ch = Math.round(w / ratio)
  const top = Math.min(Math.max(Math.round((fy / 100) * h - ch / 2), 0), h - ch)
  return { left: 0, top, width: w, height: ch }
}

export const stem = (filename) => filename.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9-]/g, '-')
