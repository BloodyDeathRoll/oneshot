/**
 * Where each photograph sits in the design, and the shapes the build cuts it to. Template-owned.
 *
 * photos[] (schemas/site-content.md) is the owner's ordered gallery: row n fills slot n below, so an
 * owner who replaces a photograph keeps the layout (the build crops whatever they upload to the slot's
 * shapes). heroVideo is set, so photos[0] is not a hero photo here (schema v0.8): it is the first
 * slot of the page.
 *
 * Shapes: [ratio h/w, widths]. ratio null = keep the photograph's own ratio. Each shape is a centre
 * crop at the largest size the source allows, written at every width that fits inside it (never
 * enlarged) as WebP + JPEG. The ratios and widths are the picked mockup's renditions (mockups/picked/
 * dist/img/), measured against the dossier originals: all are centre crops.
 */
export const P45 = 5 / 4
export const P32 = 2 / 3
export const P169 = 9 / 16

export const SLOTS = [
  /* 0  */ { use: 'welcome, the large photograph', shapes: [[P45, [640, 1066]]] },
  /* 1  */ { use: 'welcome, the small print over its corner; Instagram tile 2', shapes: [[P45, [640]], [null, [800, 1333]]] },
  /* 2  */ { use: "what's included, the half-width photograph", shapes: [[P45, [640, 1066]]] },
  /* 3  */ { use: 'the week slideshow, 1', shapes: [[P32, [800, 1200, 1600]]] },
  /* 4  */ { use: 'the week slideshow, 2', shapes: [[P32, [800, 1200, 1600]]] },
  /* 5  */ { use: 'the week slideshow, 3; the guests band behind the reviews', shapes: [[P32, [800, 1200, 1600]]] },
  /* 6  */ { use: 'the week slideshow, 4; Instagram tile 5', shapes: [[P32, [800, 1200, 1600]], [null, [800, 1400]]] },
  /* 7  */ { use: 'the week slideshow, 5; Instagram tile 3', shapes: [[P32, [800, 1200, 1600]], [null, [800, 1400]]] },
  /* 8  */ { use: 'the feature photograph under featureLine (16:9, 4:5 on phones)', shapes: [[P169, [1000, 2000]], [P45, [800]]] },
  /* 9  */ { use: 'the closing band', shapes: [[P45, [640, 1066]]] },
  /* 10 */ { use: 'booking, dates step (media half); Instagram tile 1', shapes: [[null, [800, 1400, 1600]]] },
  /* 11 */ { use: 'booking, total step (media half)', shapes: [[null, [1536]]] },
  /* 12 */ { use: 'Instagram tile 4', shapes: [[null, [800, 1400]]] },
  /* 13 */ { use: 'Instagram tile 6', shapes: [[null, [800, 1333]]] },
  /* 14 */ { use: 'Instagram tile 7', shapes: [[null, [800, 1400]]] },
  /* 15 */ { use: 'Instagram tile 8', shapes: [[null, [800, 1400]]] },
]

/* named slots, read by the pages */
export const S = { welcome: 0, welcomeSmall: 1, included: 2, week: [3, 4, 5, 6, 7], guests: 5, feature: 8, closing: 9, dates: 10, total: 11 }
/* the Instagram row, in the mockup's tile order */
export const INSTAGRAM = [10, 1, 7, 12, 6, 13, 14, 15]

/* Room galleries (SCHEMA GAP: rooms[] holds one photo per room and is kept empty by the copy
   ruling, see notes.md). The files sit in src/gaps/media/ and are cut to their own ratio, with a
   2000 px width for the booking page's media half (desktop), which draws a 3:2 photograph about
   1240 px wide. */
export const ROOM_SHAPES = [[null, [800, 1400, 2000]]]
