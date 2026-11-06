/**
 * Where each photograph sits in the design, and the shapes the build cuts it to. Template-owned.
 *
 * photos[] (schemas/site-content.md) is the owner's ordered gallery: row n fills slot n, so an owner who replaces
 * a photograph keeps the layout (the build crops whatever they upload to the slot's shapes). There is no heroVideo,
 * so photos[0] is the hero photo (schema v0.8). rooms[].photo is each room's first slide (ROOM_SHAPES); the room's
 * other slides are a SCHEMA GAP (src/gaps/gaps.json roomGalleries), cut to the same shape.
 *
 * Shape: [ratio h/w | null = the photograph's own ratio, widths, { q, qw, sx, sy, fx, fy, zoom, grade, blur, inline, tag }]
 *   q        WebP quality (default 76); qw = { width: quality } per width
 *   zoom     the crop box as a share of the largest box of that ratio
 *   sx, sy   where the box sits in the slack (0..1), as the mockup's make-media.sh `rc` places it; the boxes below
 *            are the mockup's own crops (mockups/unique/src/make-media.sh), so the port looks the same
 *   fx, fy   crop centre (0..1) instead of sx / sy
 *   grade    the hero's grade, as calm's and the unique mockup's ffmpeg `eq=contrast=1.06:saturation=1.10` +
 *            `curves 0/0.02 0.35/0.37 1/1`, here sharp modulate + linear
 *   blur     gaussian sigma (the hero's 40 px loading placeholder)
 *   inline   also keep the file as a data: URI in the manifest (the placeholder is inlined in the CSS)
 * Widths are maxima: a source smaller than a width is written at its own size, never enlarged.
 * When the owner sets a focal point on a photo (media focalX / focalY, schema v0.10, anything but 50/50), that point
 * is the crop centre instead, and on the clock frames it is also the horizon the wipe opens from (`hz`).
 */
const r = (w, h) => h / w

/* the first screen, img-009 as calm cuts and grades it (Alon at gate b: "take the one from Calm and put it as the
   top image for Unique"): desktop 1440x810 from (380, 290), phone 560x1100 from (800, 0), each with a 40 px blurred
   copy painted under it while it loads */
const HERO = { zoom: 0.75, sx: 0.791667, sy: 0.460317, grade: true }
const HERO_M = { zoom: 0.763984, sx: 0.588235, sy: 0, grade: true }
const HERO_RATIO_M = 1100 / 560
/* the clock frames: 14:15, the largest box at the mockup's slack fractions, 760 and 1280 wide */
const CLOCK = (sx, more = {}) => ({ use: 'clock frame', shapes: [[r(14, 15), [760, 1280], { qw: { 760: 68, 1280: 70 }, q: 70, sx, sy: 0.5, ...more }]] })

export const SLOTS = [
  /* 0  */ { use: 'first screen (img-009): 16:9 desktop, tall phone crop, and their blurred placeholders', shapes: [
    [r(16, 9), [1280, 1440], { qw: { 1280: 72, 1440: 74 }, ...HERO }],
    [HERO_RATIO_M, [560], { q: 74, tag: 'm', ...HERO_M }],
    [r(16, 9), [40], { q: 40, blur: 1, inline: true, tag: 'lq', ...HERO }],
    [HERO_RATIO_M, [40], { q: 40, blur: 1, inline: true, tag: 'm-lq', ...HERO_M }],
  ] },
  /* 1  */ { ...CLOCK(0.30), hz: 0.40, use: 'clock: the afternoon (img-103)' },
  /* 2  */ { ...CLOCK(0.50), hz: 0.84, use: 'clock: sunset (img-008)' },
  /* 3  */ { ...CLOCK(0.40), hz: 0.45, use: 'clock: until 22:00 (img-099)' },
  /* 4  */ { ...CLOCK(0.62), hz: 0.46, use: 'clock: from 7:30 (img-105)' },
  /* 5  */ { ...CLOCK(0.613208, { zoom: 0.797619, sy: 0 }), hz: 0.67, use: 'clock: the break (img-009, 1072 x 1150 from (520, 0), above the roofs)' },
  /* 6  */ { use: 'inside the house, column 1 top (img-006), whole frame', shapes: [[null, [720], { q: 72 }]] },
  /* 7  */ { use: 'inside the house, column 1 bottom (img-007)', shapes: [[null, [720], { q: 72 }]] },
  /* 8  */ { use: 'inside the house, column 2 top (img-019)', shapes: [[null, [720], { q: 72 }]] },
  /* 9  */ { use: 'inside the house, column 2 bottom (img-011)', shapes: [[null, [720], { q: 72 }]] },
  /* 10 */ { use: 'inside the house, column 3 top (img-016), 2:3 so the columns end flush; not shown on phones', shapes: [[r(2, 3), [720], { q: 72, sx: 0.5 }]] },
  /* 11 */ { use: 'inside the house, column 3 bottom (img-030)', shapes: [[null, [720], { q: 72 }]] },
  /* 12 */ { use: 'getting here: the sign (img-002), 4:3, 840 x 630 from (322, 252)', shapes: [[r(4, 3), [840], { q: 74, zoom: 0.609137, sx: 0.423684, sy: 0.623762 }]] },
]
/* the slots each section reads; a section whose slots are empty renders without its photographs */
export const S = { hero: 0, clock: [1, 2, 3, 4, 5], house: [[6, 7], [8, 9], [10, 11]], houseHideOnPhone: 10, sign: 12 }

/* rooms[].photo and each room's other slides (SCHEMA GAP): every slide 3:2 (house rule 2: one ratio) */
export const ROOM_SHAPES = [[r(3, 2), [1200], { q: 70, sx: 0.5, sy: 0.55 }]]

/* heroVideoPoster (none today; when the owner uploads a hero video it replaces the photograph, schema v0.8) */
export const HERO_POSTER_SHAPES = [[null, [1280, 1920], { q: 72 }]]
