/**
 * The design's photo slots: what scripts/photos.mjs makes from each upload, and what the page asks for.
 * A shape is [ratio (h/w) | null for the photo's own ratio, widths[], opts]. The crops are the picked mockup's
 * (mockups/interactive/src/make-media.sh): crop the largest box of the ratio, centred (or on the owner's focal point
 * when set, schema v0.10), scale down only. photos[n] fills slot n; a row past the last slot is not shown.
 */
export const SLOTS = [
  { name: 'ring', shapes: [[null, [1000, 2000]]] },                        // 0 the ring of roofs under the room cards
  { name: 'pool', shapes: [[1000 / 1800, [900, 1800]]] },                  // 1 the pool, full-bleed
  { name: 'menu-a', shapes: [[1.25, [480, 960]]] },                        // 2 restaurant tab 1
  { name: 'menu-b', shapes: [[1.25, [480, 960, ], { fy: 0.55 }]] },        // 3 restaurant tab 2
  { name: 'surf', shapes: [[null, [675, 1350]]] },                         // 4 after the surf, full-bleed
  { name: 'group', shapes: [[2 / 3, [600, 1200], { fy: 0.45 }]] },          // 5 groups
  { name: 'closing', shapes: [[0.5625, [960, 1920]]] },                    // 6 the closing, full-bleed
]
/* rooms[].photo: the 4:5 card (and its 52 px chip in the drawer) + the 3:2 first gallery slide; the gallery photos (gap) 3:2 */
export const ROOM_SHAPES = [[1.25, [120, 360, 720]], [2 / 3, [600, 1200]]]
export const GALLERY_SHAPES = [[2 / 3, [600, 1200]]]
/* heroVideoPoster: the whole 16:9 frame for landscape screens, a 9:16 column at full height for portrait phones */
export const HERO_POSTER_SHAPES = [[null, [960, 1920]], [16 / 9, [304, 608], { tag: 'p', q: 70 }], [null, [32], { tag: 'lq', q: 50 }], [16 / 9, [18], { tag: 'plq', q: 50 }]]
/* videos[].poster: the 4:5 frames the clips play in (Welcome, Fitness) */
export const CLIP_POSTER_SHAPES = [[1.25, [360, 720]], [1.25, [24], { tag: 'lq', q: 50 }]]
/* the lq tags: tiny frames inlined as data URIs (painted at first paint, and the <video> posters) */
