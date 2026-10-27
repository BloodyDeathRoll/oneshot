/**
 * Where each photograph sits in the design, and the shapes the build cuts it to. Template-owned.
 *
 * photos[] (schemas/site-content.md) is the owner's ordered gallery: row n fills slot n, so an owner who
 * replaces a photograph keeps the layout (the build crops whatever they upload to the slot's shapes).
 * heroVideo is set, so photos[0] is not a hero photo (schema v0.8): it is the first of "Down at the water".
 *
 * Shape: [ratio h/w | null = the photograph's own ratio, widths, { q, fx, fy, tag }]
 *   q       WebP quality (default 76)        fx, fy  crop centre, 0..1 (default .5); `focal: true` = the
 *   tag     a second rendition of the same ratio for another use      photo's focalX / focalY (schema v0.10)
 * Ratios, widths, qualities and crop centres are the picked mockup's (mockups/unique/src/make-media.sh,
 * `img <id> <out> <ratio w:h> <max width> <quality> [fx] [fy]`), so the port looks the same. Widths are
 * maxima: a source smaller than a width is written at its own size, never enlarged.
 */
const r = (w, h) => h / w

export const SLOTS = [
  /* 0  */ { use: 'Down at the water: the tall photo (img-100, 5:8)', shapes: [[r(5, 8), [1000], { q: 76, fx: 0.47, fy: 0.6 }]] },
  /* 1  */ { use: 'Down at the water: 3:2 (img-103)', shapes: [[r(3, 2), [1400], { q: 76, fx: 0.55 }]] },
  /* 2  */ { use: 'Down at the water: the wide one, whole (img-155)', shapes: [[null, [1600], { q: 76 }]] },
  /* 3  */ { use: 'surf week card 1 (board crop, 3:5)', shapes: [[r(3, 5), [560], { q: 76 }]] },
  /* 4  */ { use: 'surf week card 2', shapes: [[r(3, 5), [560], { q: 76 }]] },
  /* 5  */ { use: 'surf week card 3', shapes: [[r(3, 5), [560], { q: 76, fx: 0.55 }]] },
  /* 6  */ { use: 'surf week card 4', shapes: [[r(3, 5), [560], { q: 76 }]] },
  /* 7  */ { use: 'shop masonry 1 (own shape)', shapes: [[null, [900], { q: 74 }]] },
  /* 8  */ { use: 'shop masonry 2', shapes: [[null, [700], { q: 74 }]] },
  /* 9  */ { use: 'shop masonry 3 (1035:1180 from the top: the seeded img-112 has an avatar badge in its bottom corner)', shapes: [[r(1035, 1180), [640], { q: 74, fy: 0 }]] },
  /* 10 */ { use: 'shop masonry 4', shapes: [[null, [900], { q: 74 }]] },
  /* 11 */ { use: 'shop masonry 5', shapes: [[null, [700], { q: 74 }]] },
  /* 12 */ { use: 'shop masonry 6', shapes: [[null, [640], { q: 74 }]] },
  /* 13 */ { use: 'shop masonry 7', shapes: [[null, [700], { q: 74 }]] },
  /* 14 */ { use: 'the roof band: 16:9 desktop, 4:5 phone', shapes: [[r(16, 9), [1500], { q: 74, fy: 0.62 }], [r(4, 5), [900], { q: 74, fy: 0.6, tag: 'm' }]] },
  /* 15 */ { use: 'the roof, side photo 4:5', shapes: [[r(4, 5), [800], { q: 76 }]] },
  /* 16 */ { use: 'Baba, 4:5', shapes: [[r(4, 5), [900], { q: 76, fy: 0.45 }]] },
  /* 17 */ { use: 'Baba, the small print 3:2', shapes: [[r(3, 2), [640], { q: 76, fy: 0.6 }]] },
  /* 18 */ { use: 'Getting here, 4:5', shapes: [[r(4, 5), [900], { q: 76, fy: 0.6 }]] },
  /* 19 */ { use: 'the closing board (decorative, in the board mask)', shapes: [[null, [600], { q: 76 }]] },
  /* 20 */ { use: 'Instagram tile 1', shapes: [[1, [480], { q: 72 }]] },
  /* 21 */ { use: 'Instagram tile 2', shapes: [[1, [480], { q: 72 }]] },
  /* 22 */ { use: 'Instagram tile 3', shapes: [[1, [480], { q: 72 }]] },
  /* 23 */ { use: 'Instagram tile 4', shapes: [[1, [480], { q: 72 }]] },
  /* 24 */ { use: 'Instagram tile 5', shapes: [[1, [480], { q: 72 }]] },
]
export const S = { water: [0, 1, 2], cards: [3, 4, 5, 6], shop: [7, 8, 9, 10, 11, 12, 13], roofBand: 14, roofSide: 15, baba: 16, print: 17, road: 18, closing: 19, ig: [20, 21, 22, 23, 24] }

/* rooms[].photo (the first slide) and the rest of each room's slides (SCHEMA GAP, src/gaps/gaps.json): 3:2 */
export const ROOM_SHAPES = [[r(3, 2), [1100], { q: 72, fy: 0.55 }]]
/* heroVideoPoster: the board window's still (720 for phones and the window at rest, 1080 for the desktop zoom) */
export const HERO_POSTER_SHAPES = [[null, [720], { q: 74 }], [null, [1080], { q: 72, tag: 'd' }]]
