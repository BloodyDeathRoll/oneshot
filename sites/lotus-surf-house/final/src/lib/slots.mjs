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
 *   tone    a colour correction for one photograph ({ only: filename prefix, recomb, saturation, gamma }); see slot 17
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
  /* 11 */ { use: 'garden rooms slideshow 1, 4:5 (img-043, the room with the surfboard; 2026-11-09)', shapes: [[r(4, 5), [960], { q: 72 }]] },
  /* 12 */ { use: 'garden rooms slideshow 2, 4:5 (img-029)', shapes: [[r(4, 5), [960], { q: 72 }]] },
  /* 13 */ { use: 'garden rooms slideshow 3, 4:5 (img-030)', shapes: [[r(4, 5), [960], { q: 72 }]] },
  /* 14 */ { use: 'garden rooms slideshow 4, 4:5 (img-009)', shapes: [[r(4, 5), [960], { q: 72, fx: 0.48 }]] },
  /* 15 */ { use: 'garden rooms slideshow 5, 4:5 (img-028)', shapes: [[r(4, 5), [960], { q: 72 }]] },
  /* 16 */ { use: 'garden rooms slideshow 6, 4:5 (img-044)', shapes: [[r(4, 5), [960], { q: 72 }]] },
  /* 17: 2026-11-09 (verification 1, visual fix 3): img-032 carries a white print border (rows 0–91 and 1296–1388)
     and the 4g crop ended in it, so the print's bottom corners read square, with the pillar as a white tab at the
     bottom left. The box is now inside the photograph (zoom 0.84 → 932 × 1165 at 505, 112: clear of both bands and
     the pillar), and `tone` pulls the lilac wall to a warm white and the orange floor to a calmer terracotta. The tone
     is a correction for that one photograph, so it applies only to a source whose name starts with `tone.only`; an
     owner's upload gets the crop and no colour change. */
  /* 17 */ { use: 'the porch, 4:5 inside the print border (img-032)', shapes: [[r(4, 5), [840], { q: 74, zoom: 0.84, fx: 0.607, fy: 0.5004,
    tone: { only: 'img-032', recomb: [[0.97, 0.03, 0], [0, 1, 0.03], [0, 0.04, 0.9]], saturation: 0.66, gamma: 1.1 } }]] },
]
/* the slots each section reads; a section whose slots are empty renders without its photographs */
export const S = { hero: 0, kingBand: 1, kingPic: 2, strip: [3, 4, 5, 6], roofBig: 7, roofTwo: [8, 9], gardenWide: 10, gardenShow: [11, 12, 13, 14, 15, 16], porch: 17 }

/* heroVideoPoster (none today; when the owner uploads a hero video it replaces the gate, schema v0.8) */
export const HERO_POSTER_SHAPES = [[null, [800, 1200], { q: 72 }]]
