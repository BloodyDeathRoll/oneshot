/**
 * Where each photograph sits in the design, and the crops the build cuts it to. Template-owned.
 *
 * photos[] (schemas/site-content.md) is the owner's ordered gallery: row n fills slot n, so an owner who replaces a
 * photograph keeps the layout (the build crops whatever they upload to the slot's shapes).
 *
 * Each cut: { id, crop: [w, h, x, y] on `file`, w: max width, q: WebP quality, name, grade, jpeg }.
 * The numbers are the picked mockup's (mockups/interactive/src/make-media.sh), so the port looks the same. For any other
 * photograph the crop's ratio is kept and the largest box is centred on the owner's focal point (media focalX / focalY).
 * `grade` is the mockup's light grade on img-009, for that photograph only.
 * `{s}` in a name is the photograph's own stem.
 */
export const SLOTS = [
  { use: 'hero: full-bleed, under the shader', file: 'img-018.webp', cuts: [
    { id: 'hero-wide', crop: [1440, 1100, 0, 400], w: 1440, q: 76, name: 'hero-{s}-wide-1440' },
    { id: 'hero-tall', crop: [1040, 1920, 110, 0], w: 1000, q: 74, name: 'hero-{s}-tall-1000' },
    { id: 'og', crop: [1440, 756, 0, 500], w: 1200, jpeg: true, name: 'og-{s}-1200' },
  ] },
  { use: 'tile: total beginner', file: 'img-005.jpg', cuts: [
    { id: 'tile-first-1', crop: [380, 464, 230, 0], w: 240, q: 74, name: 'tile-{s}-240' },
    { id: 'tile-first-2', crop: [380, 464, 230, 0], w: 380, q: 78, name: 'tile-{s}-380' },
  ] },
  { use: 'tiles: I can stand up, and advanced (the wave alone); the print in Waves', file: 'img-006.jpg', cuts: [
    { id: 'tile-stand-1', crop: [384, 480, 280, 0], w: 240, q: 74, name: 'tile-{s}-240' },
    { id: 'tile-stand-2', crop: [384, 480, 280, 0], w: 384, q: 78, name: 'tile-{s}-384' },
    { id: 'tile-adv-1', crop: [384, 480, 16, 0], w: 240, q: 74, name: 'tile-{s}-wave-240' },
    { id: 'tile-adv-2', crop: [384, 480, 16, 0], w: 384, q: 78, name: 'tile-{s}-wave-384' },
    { id: 'print-wave', crop: null, w: 848, q: 78, name: 'print-{s}-848' },
  ] },
  { use: 'tile: intermediate; the feature band', file: 'img-009.webp', cuts: [
    { id: 'tile-mid-1', crop: [640, 800, 450, 160], w: 260, q: 74, grade: true, name: 'tile-{s}-260' },
    { id: 'tile-mid-2', crop: [640, 800, 450, 160], w: 520, q: 74, grade: true, name: 'tile-{s}-520' },
    { id: 'feature-wide', crop: [1500, 560, 80, 60], w: 1500, q: 80, grade: true, name: 'feature-{s}-wide-1500' },
    { id: 'feature-near', crop: [1040, 800, 250, 130], w: 1040, q: 80, grade: true, name: 'feature-{s}-near-1040' },
  ] },
  { use: 'tile: not sure', file: 'img-012.webp', cuts: [
    { id: 'tile-unsure-tall', crop: [446, 558, 210, 0], w: 300, q: 72, name: 'tile-{s}-tall-300' },
    { id: 'tile-unsure-1', crop: [750, 375, 0, 170], w: 400, q: 70, name: 'tile-{s}-wide-400' },
    { id: 'tile-unsure-2', crop: [750, 375, 0, 170], w: 700, q: 70, name: 'tile-{s}-wide-700' },
  ] },
  { use: 'Sanjee', file: 'img-007.webp', cuts: [
    { id: 'sanjee-1', crop: null, w: 640, q: 74, name: 'print-{s}-640' },
    { id: 'sanjee-2', crop: null, w: 962, q: 76, name: 'print-{s}-962' },
  ] },
  { use: 'the print beside the other waves', file: 'img-014.webp', cuts: [
    { id: 'print-beach', crop: null, w: 1000, q: 72, name: 'print-{s}-1000' },
  ] },
  { use: 'the closing band', file: 'img-002.jpg', cuts: [
    { id: 'back-wide', crop: [2000, 1250, 0, 250], w: 2000, q: 70, name: 'back-{s}-wide-2000' },
    { id: 'back-tall', crop: [800, 1500, 760, 0], w: 800, q: 72, name: 'back-{s}-tall-900' },
  ] },
]

/* The shader's horizon and shoreline are measured on this one photograph (src/scripts/swell.js). Its two crops, as
   fractions of the whole picture: x y w h. Any other hero photo stays a still: a set-piece never runs on coordinates
   written for another photograph (schema v0.10). */
export const SWELL = { file: 'img-018.webp', wide: [0, 400 / 1920, 1, 1100 / 1920], tall: [110 / 1440, 0, 1040 / 1440, 1] }
