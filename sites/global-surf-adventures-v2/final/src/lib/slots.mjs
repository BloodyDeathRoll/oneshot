/**
 * Where each photograph sits in the design, and the shapes the build cuts it to. Template-owned.
 *
 * photos[] (schemas/site-content.md) is the owner's ordered gallery: row n fills slot n, so an owner who
 * replaces a photograph keeps the layout (the build crops whatever they upload to the slot's shapes).
 * heroVideo is set, so photos[0] is not a hero photo (schema v0.8): it is the first plate of the drop.
 *
 * Shape: [ratio h/w | null = the photograph's own ratio, widths, { q, fx, fy, tag, tint }]
 *   q      WebP quality (default 76)          fx, fy  crop centre, 0..1 (default .5)
 *   tag    a second rendition of the same ratio at another quality (the phone plates)
 *   tint   also record the crop's dominant colour (the ground shown while it loads)
 * Ratios, widths and qualities are the picked mockup's renditions (mockups/unique/src/make-media.sh).
 */
export const P45 = 5 / 4, P32 = 2 / 3, P1610 = 10 / 16, SQ = 1, P219 = 9 / 21, P43 = 3 / 4

export const SLOTS = [
  /* 0  */ { use: 'the drop, plate 1 (aerial of the lodge); reduced-motion two-up; also the drop\'s loading poster',
    shapes: [[null, [2000], { q: 74, tint: true }], [null, [2000], { q: 60, tag: 'm' }], [P32, [1000], { q: 74, fx: 0.42, fy: 0.58 }]] },
  /* 1  */ { use: 'the drop, plate 2 (the pool from above); reduced-motion two-up',
    shapes: [[null, [2000], { q: 74 }], [null, [2000], { q: 60, tag: 'm' }], [P32, [1000], { q: 74 }]] },
  /* 2  */ { use: 'the drop, plate 3 (the pool at water level) under featureLine; reduced-motion water',
    shapes: [[null, [1100, 1800], { q: 76 }]] },
  /* 3  */ { use: 'the waves band (21:9, 4:5 on phones)', shapes: [[P219, [1200, 2000], { q: 74, tint: true }], [P45, [900], { q: 74, tint: true }]] },
  /* 4  */ { use: 'what\'s included, the overlapping card', shapes: [[P45, [800], { q: 76 }]] },
  /* 5  */ { use: 'what guests say', shapes: [[P45, [700, 1100], { q: 76 }]] },
  /* 6  */ { use: 'the closing (dinner), drawn at most at its own width', shapes: [[null, [900, 1536], { q: 78 }]] },
  /* 7  */ { use: 'the lodge slideshow, 1', shapes: [[P32, [800, 1400], { q: 74 }]] },
  /* 8  */ { use: 'the lodge slideshow, 2', shapes: [[P32, [800, 1400], { q: 74 }]] },
  /* 9  */ { use: 'the lodge slideshow, 3', shapes: [[P32, [800, 1400], { q: 74 }]] },
  /* 10 */ { use: 'the Freestylers card; Instagram tile 6', shapes: [[SQ, [520], { q: 72 }]] },
  /* 11 */ { use: 'Instagram tile 1', shapes: [[SQ, [520], { q: 72 }]] },
  /* 12 */ { use: 'Instagram tile 2', shapes: [[SQ, [520], { q: 72 }]] },
  /* 13 */ { use: 'Instagram tile 3', shapes: [[SQ, [520], { q: 72 }]] },
  /* 14 */ { use: 'Instagram tile 4', shapes: [[SQ, [520], { q: 72 }]] },
  /* 15 */ { use: 'Instagram tile 5', shapes: [[SQ, [520], { q: 72 }]] },
]
export const S = { plates: [0, 1, 2], waves: 3, breakfast: 4, guests: 5, dinner: 6, lodge: [7, 8, 9], freestylers: 10 }
export const INSTAGRAM = [11, 12, 13, 14, 15, 10]

/* Room galleries (SCHEMA GAP: rooms[] holds one photo per room and stays empty by the copy ruling). 16:10. */
export const ROOM_SHAPES = [[P1610, [800, 1400], { q: 72 }], [null, [240], { q: 70, tag: 'thumb' }]]

/* The hero poster (heroVideoPoster) and the clip posters (videos[].poster): WebP for the page. */
export const HERO_POSTER_SHAPES = [[null, [1280, 1920], { q: 72 }]]
export const CLIP_POSTER_SHAPES = [[null, [240], { q: 70, tag: 'thumb' }], [null, [800, 1280], { q: 74 }]]
