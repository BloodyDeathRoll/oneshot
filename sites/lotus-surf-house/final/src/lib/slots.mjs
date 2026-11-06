/**
 * Where each photograph sits in the design, and the shapes the build cuts it to. Template-owned.
 *
 * photos[] (schemas/site-content.md) is the owner's ordered gallery: row n fills slot n, so an owner who
 * replaces a photograph keeps the layout (the build crops whatever they upload to the slot's shapes).
 * There is no heroVideo, so photos[0] is the hero photo (schema v0.8).
 *
 * Shape: [ratio h/w | null = the photograph's own ratio, widths, { q, fx, fy, zoom, lift, tag }]
 *   q       WebP quality (default 76)
 *   fx, fy  crop centre, 0..1 (default .5). Ratios, widths, qualities and centres are the picked mockup's
 *           (mockups/calm/src/make-media.sh: `rc W H rw rh fx fy` puts the largest box at fx/fy of the slack;
 *           the centres here are the same boxes written as centres), so the port looks the same.
 *   zoom    the crop box as a share of the largest box (the porch print is cut below the ceiling line)
 *   lift    the hero's light lift of the leaf shadows (mockup: curves 0/0.03 0.5/0.52 1/1; here linear 0.97, +0.03)
 * Widths are maxima: a source smaller than a width is written at its own size, never enlarged.
 * When the owner sets a focal point on a photo (media focalX / focalY, schema v0.10, anything but 50/50), that
 * point is the crop centre instead of fx / fy.
 */
const r = (w, h) => h / w

export const SLOTS = [
  /* 0  */ { use: 'first screen: the gate (img-019), whole frame, desktop right half / phone full-bleed', shapes: [[null, [800, 1200], { q: 70, lift: true }]] },
  /* 1  */ { use: 'the King Rooms full-bleed band (img-002), whole frame, drawn at most 1440 wide', shapes: [[null, [960, 1600], { q: 72 }]] },
  /* 2  */ { use: 'the King Room beside its facts, 4:5 (img-025)', shapes: [[r(4, 5), [840], { q: 70, fy: 0.508 }]] },
  /* 3  */ { use: 'King strip 1, 3:2 (img-010)', shapes: [[r(3, 2), [640], { q: 70 }]] },
  /* 4  */ { use: 'King strip 2, 3:2 (img-015)', shapes: [[r(3, 2), [640], { q: 70 }]] },
  /* 5  */ { use: 'King strip 3, 3:2 (img-034)', shapes: [[r(3, 2), [640], { q: 70 }]] },
  /* 6  */ { use: 'King strip 4, 3:2 (img-008)', shapes: [[r(3, 2), [640], { q: 70 }]] },
  /* 7  */ { use: 'the roof, large 4:5 (img-021)', shapes: [[r(4, 5), [840], { q: 66 }]] },
  /* 8  */ { use: 'the roof, small 4:5 one (img-022)', shapes: [[r(4, 5), [560], { q: 70, fy: 0.503 }]] },
  /* 9  */ { use: 'the roof, small 4:5 two (img-004)', shapes: [[r(4, 5), [560], { q: 70 }]] },
  /* 10 */ { use: 'the garden, wide 16:9 (img-020; drawn 21:9 at 1440, 4:3 on the phone)', shapes: [[r(16, 9), [960, 1600], { q: 72, fy: 0.53 }]] },
  /* 11 */ { use: 'garden rooms slideshow 1, 4:5 (img-029)', shapes: [[r(4, 5), [960], { q: 72 }]] },
  /* 12 */ { use: 'garden rooms slideshow 2, 4:5 (img-043)', shapes: [[r(4, 5), [960], { q: 72 }]] },
  /* 13 */ { use: 'garden rooms slideshow 3, 4:5 (img-030)', shapes: [[r(4, 5), [960], { q: 72 }]] },
  /* 14 */ { use: 'garden rooms slideshow 4, 4:5 (img-009)', shapes: [[r(4, 5), [960], { q: 72, fx: 0.48 }]] },
  /* 15 */ { use: 'garden rooms slideshow 5, 4:5 (img-028)', shapes: [[r(4, 5), [960], { q: 72 }]] },
  /* 16 */ { use: 'garden rooms slideshow 6, 4:5 (img-044)', shapes: [[r(4, 5), [960], { q: 72 }]] },
  /* 17 */ { use: 'the porch, 4:5 below the ceiling line (img-032)', shapes: [[r(4, 5), [840], { q: 74, zoom: 0.9366, fx: 0.619, fy: 0.532 }]] },
]
/* the slots each section reads; a section whose slots are empty renders without its photographs */
export const S = { hero: 0, kingBand: 1, kingPic: 2, strip: [3, 4, 5, 6], roofBig: 7, roofTwo: [8, 9], gardenWide: 10, gardenShow: [11, 12, 13, 14, 15, 16], porch: 17 }

/* heroVideoPoster (none today; when the owner uploads a hero video it replaces the gate, schema v0.8) */
export const HERO_POSTER_SHAPES = [[null, [800, 1200], { q: 72 }]]
