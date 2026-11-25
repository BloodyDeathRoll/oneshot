/**
 * Where each photograph sits in the design, and the shapes the build cuts it to. Template-owned.
 *
 * photos[] (schemas/site-content.md) is the owner's ordered gallery: row n fills slot n, so an owner who replaces
 * a photograph keeps the layout (the build crops whatever they upload to the slot's shapes). There is no
 * heroVideo, so photos[0] is the hero photo (schema v0.8).
 *
 * Shape: [ratio h/w | null = the photograph's own ratio, widths, { q, sx, sy, zoom, tag, mask }]
 *   q       WebP quality (default 72)
 *   sx, sy  where the crop box sits in the slack, 0..1 (default .5): left = sx·(W − w), top = sy·(H − h). This is
 *           the picked mockup's own recipe (mockups/interactive/src/make-media.sh `rc W H rw rh fx fy`), so every
 *           crop is the mockup's box, pixel for pixel, on these photographs.
 *   zoom    the crop box as a share of the largest box of that ratio (the hero's tighter frames)
 *   tag     names one of several shapes of the same ratio
 *   mask    the palm mask is cut with the same box (src/palms/<photo>.png → public/palms/), for the shader
 * Widths are maxima: a source smaller than a width is written at its own size, never enlarged.
 * When the owner sets a focal point (media focalX / focalY, schema v0.10, anything but 50/50), that point is the
 * crop centre instead of sx / sy.
 */
const r = (w, h) => h / w

export const SLOTS = [
  /* 0  */ { use: 'first screen and closing band: the balcony table in the palms (img-003, graded, see make-media.sh)', shapes: [
    [r(1400, 788), [1000, 1400], { q: 72, zoom: 0.7, sx: 0.5, sy: 0, tag: 'wide', mask: true }],
    [r(600, 860), [600], { q: 74, zoom: 0.645, sx: 0.4643, sy: 0, tag: 'tall', mask: true }],
    [r(2000, 856), [1280, 1920], { q: 68, sy: 0, tag: 'band' }],
  ] },
  /* 1  */ { use: 'the carved-door band under the glance (img-051)', shapes: [
    [r(2, 1), [1280, 1920], { q: 70, sy: 0.25, tag: 'wide' }],
    [r(4, 5), [800], { q: 72, zoom: 0.9766, sx: 0.1304, sy: 1, tag: 'tall' }],
  ] },
  /* 2–7  Deluxe Double Room stage, 4:5 */
  { use: 'Deluxe 1 (img-002)', shapes: [[r(4, 5), [880], { q: 70, sx: 0.62 }]] },
  { use: 'Deluxe 2 (img-015)', shapes: [[r(4, 5), [880], { q: 70, sx: 0.45 }]] },
  { use: 'Deluxe 3 (img-012)', shapes: [[r(4, 5), [880], { q: 70 }]] },
  { use: 'Deluxe 4 (img-022)', shapes: [[r(4, 5), [880], { q: 70, sx: 0.6 }]] },
  { use: 'Deluxe 5 (img-013)', shapes: [[r(4, 5), [880], { q: 70 }]] },
  { use: 'Deluxe 6 (img-033)', shapes: [[r(4, 5), [880], { q: 70, sy: 0.6 }]] },
  /* 8–11  Standard Double Room stage, 4:5 (img-010, the WC door, dropped at 4g: the room has no bathroom) */
  { use: 'Standard 1 (img-005)', shapes: [[r(4, 5), [880], { q: 70, sy: 0.6 }]] },
  { use: 'Standard 2 (img-026)', shapes: [[r(4, 5), [880], { q: 70, sy: 0.6 }]] },
  { use: 'Standard 3 (img-009)', shapes: [[r(4, 5), [880], { q: 70 }]] },
  { use: 'Standard 4 (img-025)', shapes: [[r(4, 5), [880], { q: 70, sy: 0.55 }]] },
  /* 12–20  the courtyard shelf, 4:5 cards */
  { use: 'shelf 1 (img-071)', shapes: [[r(4, 5), [640], { q: 70, sx: 0.42 }]] },
  { use: 'shelf 2 (img-006, the extinguishers out of frame)', shapes: [[r(4, 5), [640], { q: 70, sx: 0 }]] },
  { use: 'shelf 3 (img-007)', shapes: [[r(4, 5), [640], { q: 70 }]] },
  { use: 'shelf 4 (img-039)', shapes: [[r(4, 5), [640], { q: 70, sx: 0.45 }]] },
  { use: 'shelf 5 (img-041)', shapes: [[r(4, 5), [640], { q: 70, sx: 0.25 }]] },
  { use: 'shelf 6 (img-045)', shapes: [[r(4, 5), [640], { q: 70, sx: 0.2 }]] },
  { use: 'shelf 7 (img-037)', shapes: [[r(4, 5), [640], { q: 70, sy: 0.62 }]] },
  { use: 'shelf 8 (img-038)', shapes: [[r(4, 5), [640], { q: 70, sy: 0.55 }]] },
  { use: 'shelf 9 (img-077)', shapes: [[r(4, 5), [640], { q: 70, sx: 0.3 }]] },
  /* 21 */ { use: 'the board shower, whole frame as a print (img-036)', shapes: [[null, [1000], { q: 72 }]] },
  /* 22 */ { use: 'the masks, 4:5 print (img-069)', shapes: [[r(4, 5), [600], { q: 72, sy: 0.5 }]] },
  /* 23 */ { use: 'the sign, 4:5 print (img-001)', shapes: [[r(4, 5), [840], { q: 72, sy: 0.479 }]] },
]
/* the slots each section reads; a section whose slots are empty renders without its photographs.
   rooms[n] gets ROOM_SLOTS[n] (rooms[].photo holds one photo; the galleries are a schema gap, notes.md) */
export const S = { hero: 0, court: 1, rooms: [[2, 3, 4, 5, 6, 7], [8, 9, 10, 11]], shelf: [12, 13, 14, 15, 16, 17, 18, 19, 20], shower: 21, masks: 22, sign: 23 }

/* heroVideoPoster (none today; when the owner uploads a hero video it replaces the photo, schema v0.8) */
export const HERO_POSTER_SHAPES = [[null, [1000, 1400], { q: 72 }]]
