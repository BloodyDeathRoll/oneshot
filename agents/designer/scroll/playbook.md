# Scroll playbook — scroll-driven set-pieces in plain JS

Source: scrollcraft playbook @ e317644 (BloodyDeathRoll/scrollcraft). A later scrollcraft change is a new proposal, never a silent edit.
Opened by the designer only when the unique concept names a scroll set-piece (designer base.md 4e).

Ported for Oneshot: one self-contained HTML file at 4e, an Astro site at 4g. Stack: GSAP + ScrollTrigger (+ SplitText) + Lenis + plain three.js. No React, no React Three Fiber, no Next.js; where the source used them, this file gives the plain equivalent. Facts, numbers and UNVERIFIED markers are the source's; run ids (cloud-NNx) refer to scrollcraft's test runs.

**Numbering:** sections keep the source's chapter numbers so references resolve: §0 principles and the ten rules, §1 wiring (plain-JS translation of the source's ch. 1 essentials), §2 ScrollTrigger and the pattern catalogue, §3 three.js, §4 video and image sequences, §5 design and motion, §6 performance (§6.2 loading order and **the JS budget**, §6.3 **device tiers**), §7 assets. Source ch. 8 (prompting Claude Code) and ch. 9 (RTL) are not ported.

## CDN at 4e, vendored at 4g

- **4e (mockup):** the libraries may load from a CDN, pinned versions only (cdnjs or jsdelivr, e.g. `gsap@3.15.0`, `lenis@1.3.26`, `three@0.186.1`), like fonts.
- **4g (build):** vendored and self-hosted, loaded after first paint, inside Oneshot `playbook.md` §4's JS budget (≤ 300 KB compressed). One library stack per set-piece.

---

## 0. Principles

### What "smooth and high-end" means

1. **Nothing stutters.** Every frame lands inside the refresh budget (16.6 ms at 60 Hz, 8.3 ms at 120 Hz; web.dev's practical figure is 10 ms of your own work at 60 Hz). Scroll and render share one clock so WebGL never paints a frame behind the DOM.
2. **Motion has intent.** Scroll reveals structure (a product turning, a camera moving through a space, a story in frames). Decorative motion is rare and consistent. Easing is the same family everywhere.
3. **It degrades honestly.** A phone in low-power mode, a reader with reduced motion on, a crawler, a user with JavaScript blocked: each gets the full content and a calmer presentation, never a blank page or a spinner.

### The ten rules

1. **One clock.** Lenis runs inside GSAP's ticker, ScrollTrigger is updated on every Lenis scroll event, `lagSmoothing(0)`. Nothing else owns scroll.
2. **Native scroll position.** Lenis moves the real `scrollY`. No transformed wrappers, no `window.scrollTo`, no CSS `scroll-behavior: smooth`, no CSS scroll-snap.
3. **Every tween is scoped and killable.** Create triggers inside one setup function (a `gsap.context()` or `gsap.matchMedia()` branch) so a re-run or teardown reverts them all. *(Source: `useGSAP` with a scope.)*
4. **One fixed canvas behind the DOM.** 3D reads a scroll progress value inside its frame loop and damps it. Nothing is re-measured per frame.
5. **Measure after everything loads.** `ScrollTrigger.refresh()` after fonts, images, and models. Set `data-ready="1"` on `<html>` when that happens.
6. **Text is HTML first.** Headlines are in the HTML and visible with JavaScript off. The canvas is decoration with `aria-hidden`.
7. **Reduced motion is tier 0, not shorter durations.** `gsap.matchMedia` branches; content lands in its final state; no pins, no parallax, no sequences fetched.
8. **Compositor-only animation.** `transform` and `opacity` on the DOM; everything else is a measured exception.
9. **Budget before beauty.** Hero 3D under 3 MB, image sequences under 20 MB, first-load JS under 250 KB gzipped, LCP under 2.5 s on mobile, no frame over 16 ms during scroll on a mid-range phone.
10. **One idea per section, one memorable moment per page.** Fade-up on everything is the cheapest way to look cheap.

### Architecture

```
<html data-ready="1">              ← set after fonts + models load, then ScrollTrigger.refresh()
<body>
  <main>                           ← HTML text, scrolls natively (Lenis lerps scrollY)
    <section data-pin="hero"> …    ← each pinned/scrubbed section: ScrollTrigger in a gsap.context
  </main>
  <div class="scene" aria-hidden>  ← ONE fixed full-viewport <canvas>, z-index 0, pointer-events none
     └ the frame loop reads scroll.progress (or per-section progress), damps it, moves camera/objects
</body>

Every frame, in this order:
  gsap.ticker ─► lenis.raf(t) ─► native scrollY moves ─► lenis 'scroll' event
                                                           ├─► ScrollTrigger.update()   (DOM tweens, pins)
                                                           └─► scroll.progress = …      (3D reads it in the loop)
```

Lenis moves the **real** scroll position, so ScrollTrigger needs no `scrollerProxy`, `position: fixed` keeps working, find-in-page and scroll restoration keep working, and the WebGL layer reads one number. One canvas = one GL context, one set of compiled shaders; DOM text above it stays selectable and crawlable.

### Which technique for which moment

```
Video or photographic sequence?
├─ yes → must it scrub with scroll?
│        ├─ yes → canvas image sequence (§4). <video>.currentTime only for short clips, all-intra, blob-loaded.
│        └─ no  → <video autoplay muted loop playsinline> with poster as LCP (§4).
└─ no  → real 3D object or space?
         ├─ yes → three.js on the shared canvas; scroll → progress → damp in the loop (§3).
         │        Camera through a space: CatmullRomCurve3 path. Product: rotation/explode keyed to section progress.
         └─ no  → text or layout moving?
                  ├─ pin / scrub / snap / horizontal / stacking → ScrollTrigger (§2)
                  ├─ simple reveal / progress bar / parallax  → CSS scroll-driven animation behind @supports, or ScrollTrigger.batch
                  └─ UI micro-interaction (hover, press)       → CSS; not GSAP's job
```

Do not smooth-scroll content pages, forms, or anything with heavy nested scrolling. Lenis is for narrative pages.

### Pick the look before the motion

1. **Subject and one concept.** The one thing the page is about and the one visual idea.
2. **The memorable moment.** Which single section gets the 3D or video budget. The rest is typography and layout.
3. **Type and palette**, chosen by name, before motion.
4. **Section list with scroll lengths**, each with its pattern (§2.3) and length in viewport heights. Total under about 15 viewport heights of pinned scroll.
5. **Device tiers** (§6.3). Reduced motion is designed, not patched.

### Definitions

- **Pin**: section held while scroll drives a timeline. `pin: true`; CSS `position: sticky` for simple cases.
- **Scrub**: playhead bound to scroll. `scrub: true` is locked; `scrub: 0.5` takes half a second to catch up and reads as expensive.
- **Progress**: 0 to 1. Page progress from Lenis (`lenis.progress`), section progress from `self.progress`.
- **Tier**: device capability 0 to 3 (§6.3). Tier 0 is reduced motion or no WebGL.
- **Damp**: frame-rate-independent interpolation: `THREE.MathUtils.damp(current, target, 6, dt)`. Lenis lerp 0.1 to 0.15.

## 1. Wiring (plain JS)

```js
import gsap from 'gsap'                       // 4e: pinned CDN ESM; 4g: vendored
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'                     // include lenis.css
gsap.registerPlugin(ScrollTrigger)

export const scroll = { progress: 0, velocity: 0, sections: {} }   // plain object, read by the 3D loop
const lenis = new Lenis({ autoRaf: false, lerp: 0.12, wheelMultiplier: 1, anchors: true })
lenis.on('scroll', ScrollTrigger.update)
lenis.on('scroll', (l) => { scroll.progress = l.progress; scroll.velocity = l.velocity })
gsap.ticker.add((t) => lenis.raf(t * 1000))   // ticker gives seconds, Lenis wants ms
gsap.ticker.lagSmoothing(0)
```

- `autoRaf: false` + `gsap.ticker.add`: one frame loop; two loops give double updates and jitter.
- `lagSmoothing(0)`: GSAP's default pretends only 33 ms passed after a hitch over 500 ms, which desyncs scrubbed tweens from the real scroll.
- `lerp: 0.12`: 0.1 to 0.15 feels smooth without feeling hijacked. Below 0.08 users say the page fights them.
- No `syncTouch`: touch stays native.
- **Refresh after** `document.fonts.ready`, images without intrinsic size, the model/texture load, anything that changes height. Create triggers in page order or call `ScrollTrigger.sort()`. Each full refresh re-measures every pin (100 to 250 ms main thread each on a throttled mobile run, landing in TBT): create pins once after setup, and attach triggers to timelines (`gsap.timeline({ scrollTrigger }).to(...)`) rather than bare `gsap.to(el, { scrollTrigger })`, which forces a layout per trigger.
- **Phones:** `100svh` for full-bleed sections, `dvh` only for sticky UI.
- **Nested scrollers:** `data-lenis-prevent`.
- **Never combine** Lenis with ScrollSmoother, `ScrollTrigger.normalizeScroll(true)`, CSS `scroll-snap` or `scroll-behavior: smooth`.
- **CSS scroll-driven animations** (`animation-timeline: view()`): progress bars, reveals, simple parallax behind `@supports` and `(prefers-reduced-motion: no-preference)`, final state as fallback. Firefox stable lacks them; they cannot pin, snap or scrub video.

## 2. ScrollTrigger mechanics and the section catalogue

### 2.1 ScrollTrigger in twelve lines

| Option | What it does | Use |
|---|---|---|
| `start` / `end` | `"<trigger pos> <viewport pos>"`, e.g. `"top top"`, `"bottom 80%"`, `"+=200%"`, functions, `"clamp(top bottom)"` | Functions for anything that reads sizes; `clamp()` to keep triggers inside the page |
| `scrub` | `true` locks the playhead; a number is seconds to catch up | `0.5` to `1` for the expensive feel; ≤ 0.5 if Lenis already smooths the same motion |
| `pin` | holds the trigger while active, inserts a `pin-spacer` | `pinSpacing: false` to stack; never animate the pinned element itself, animate its children; `anticipatePin: 1` hides the flash on fast scroll |
| `snap` | `0.25`, array, `"labels"`, `"labelsDirectional"`, or `{ snapTo, duration: {min,max}, delay, ease, directional }` | Steps that matter. Not with Lenis `syncTouch`. |
| `invalidateOnRefresh` | re-evaluate function values on refresh | Every tween that reads `innerWidth`, `scrollWidth`, element sizes |
| `markers` | dev visual | strip before hand-off |
| `onUpdate(self)` | `self.progress`, `self.direction`, `self.velocity` | Push section progress for 3D; never measure DOM here |
| `toggleActions` | `"play none none reverse"` | One-shot reveals that are not scrubbed |
| `once: true` | fire once, kill | Entrance reveals |
| `containerAnimation` | triggers inside a horizontal track | No pin/snap inside |
| `ScrollTrigger.batch()` | one trigger per element, grouped callbacks | Grids; the only acceptable fade-up |
| `gsap.matchMedia()` | conditions → setup with cleanup | Responsive values and reduced motion |

`position: fixed` breaks under any transformed or `will-change: transform` ancestor; that is why the canvas lives outside every wrapper and `will-change` is never global.

### 2.2 SplitText reveal (free since GSAP 3.13)

```js
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(SplitText)
document.fonts.ready.then(() => {
  SplitText.create(el, {
    type: 'lines', mask: 'lines', autoSplit: true,
    onSplit: (self) => gsap.from(self.lines, {
      yPercent: 100, stagger: 0.08, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%', once: true },
    }),
  })
})
```

Wait for fonts; `font-kerning: none` on split text; `aria: 'auto'` (default) keeps the parent readable. Links inside split text lose semantics: disable `aria` there and add a visually hidden copy. Split the heading element itself (`h1`, `h2`), never a `span`/`div` inside it: SplitText puts `aria-label` on the split element, and without a role Lighthouse fails `aria-prohibited-attr` (cloud-03d, accessibility 96). For a `<p>`, split the paragraph itself with `aria: 'none'` (cloud-05i, accessibility 96).

### 2.3 The pattern catalogue

Lengths are in viewport heights of scroll (vh), working conventions from the cited demos, not standards.

**1. Hero: 3D object + text reveal.** Headline lines reveal on load (y 100% → 0 in masks, 0.9 s, `power3.out`, stagger 0.06); the object idles with a slow float; on scroll the camera drifts and the object rotates while the headline leaves at 2× scroll speed. Pinned: nothing (or 100 vh). Length 100 to 150 vh. Refs: Oryzo AI (Lusion), Lando Norris (OFF+BRAND).

**2. Pinned product rotation / exploded view.** `rotation.y = progress × 2π`; parts `position.lerp(exploded, eased progress)`; captions at timeline labels. Pinned 200 to 400 vh, scrub 0.5 to 1, `snap: "labels"` if captions must rest. Wiring: `onUpdate: (self) => scroll.sections.product = self.progress`, read in the frame loop.

**3. Scroll-scrubbed video with captions.** Canvas image sequence (§4) scrubs; each caption fades in and out over ~15 to 20 percent of the pin. Pinned 300 to 500 vh for 150 to 300 frames (about 10 px per frame). Scrub 0.5, `ease: 'none'`, `snap: 'frame'`. Refs: Apple product pages, Santioni Spirits.

**4. Horizontal gallery.** Track translates `xPercent: -100 × (n-1)` (or `x: -(scrollWidth - innerWidth)`); 1 px vertical = 1 px horizontal. Pin the viewport-high container; `end: () => '+=' + track.scrollWidth`; scrub `true` or ≤ 0.5; `snap: 1/(n-1)` optional; `containerAnimation` for per-panel reveals. A fixed-canvas object behind the track: move it clear of the track for the pin's duration (cloud-06c, 06d to 06f); hiding it is the other option (UNVERIFIED).

```js
const panels = gsap.utils.toArray('.panel')
gsap.to(panels, { xPercent: -100 * (panels.length - 1), ease: 'none',
  scrollTrigger: { trigger: '.track', pin: true, scrub: 0.3, snap: 1 / (panels.length - 1),
    end: () => '+=' + document.querySelector('.track').scrollWidth, invalidateOnRefresh: true } })
```

**5. Stacking cards.** Each card pins at `top top` with `pinSpacing: false`; the previous scales to 0.92 and dims (`filter: brightness(.6)` in Chromium, test Safari; or an overlay's opacity). 100 vh per card, `end: () => '+=' + (n - i) * innerHeight`. CSS alternative: `position: sticky; top: 0`, GSAP only for the scale.

**6. Sticky split (text scrolls, media pinned).** Media pinned for the text column's height; media crossfades (0.6 s) when a text block crosses centre (`start: 'top center', end: 'bottom center'`). 100 vh per text block.

**7. Parallax layers.** Background 0.2 to 0.4× scroll, mid 0.6×, foreground 1 to 1.2×; offsets within ±10 to 15 percent of layer height; `transform` only; scrub `true`; CSS `animation-timeline: view()` behind `@supports`. Drawn silhouettes: `preserveAspectRatio="xMidYMax slice"`, never `"none"` (needles on phones; cloud-02i, 02m). Every layer bleeds past the section's bottom edge and the near layer is tallest (UNVERIFIED), so no layer ends in a flat cut (cloud-02e to 02m); fading the near layer into the ground reads better than a cut (cloud-02k).

**8. Text mask / clip reveal.** Lines in `overflow: hidden` wrappers translate `y: 100% → 0` (0.8 to 1 s, `cubic-bezier(0.76, 0, 0.24, 1)` or `power3.out`); or `clip-path: inset()` scrubbed; or per-word opacity from rest to 1. Rest at 0.4 on dark, 0.55 on light (lower fails Lighthouse contrast for large text). Descenders: about 0.2em bottom padding inside the line mask at large display sizes (UNVERIFIED; 0.08 to 0.1em clipped the "g", cloud-02h, 02k); no matching negative margin (masks overlap mid-scrub). Word-by-word: set every word's resting opacity before the scrubbed tween (cloud-04l, 04m left all but the first at full ink):

```js
const words = gsap.utils.toArray('[data-word]', section)
gsap.matchMedia().add({ motion: '(prefers-reduced-motion: no-preference)', reduce: '(prefers-reduced-motion: reduce)' }, ({ conditions }) => {
  if (conditions.reduce) return void gsap.set(words, { opacity: 1 })
  gsap.set(words, { opacity: 0.55 })
  gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 75%', end: 'bottom 40%', scrub: 0.5 } })
    .to(words, { opacity: 1, ease: 'none', stagger: 0.1 })
})
```

Check one mid-scroll shot: words ahead of the reading point dim, words behind at full ink.

**9. Image zoom-through.** A centred image scales 1 → 4 to 8 while the next section appears inside it. Pinned 200 to 300 vh, scrub `true`. The heading inside reads at 4.5:1 against the pixels behind it at every visible frame: bring it in only once the image covers the viewport; colour from the image's centre, never a tint of its own hue (cloud-03d). Exit: hide the zoomed image or word once it has passed (`autoAlpha: 0` at timeline end; UNVERIFIED), or it sits as a slab over the next section (cloud-05m, 05p).

**10. Marquee.** Duplicated track loops via `translateX`, 40 to 80 px/s; optionally follows `lenis.velocity`.

**11. Infinite / looping section.** Lenis `infinite: true` + duplicated content. Rare; test keyboard access.

**12. Footer reveal.** Footer `position: fixed; bottom: 0; z-index: 0`; body `margin-bottom: footerHeight`. Zero JS.

**13. Page transitions and preloader.** Curved SVG wipe 0.75 s `[0.76, 0, 0.24, 1]`. Preloader under 2 s total; never gate HTML text; never on every route.

**14. Cursor follower and magnetic buttons.** Dot lerps toward the pointer (0.1 to 0.15); buttons translate 0.2 to 0.35× the offset and spring back. `@media (pointer: fine)` only; visible focus state always.

**15. Hover distortion image (shader).** Fragment shader mixes two textures through a displacement map; `progress` 0 → 1 over 0.6 to 1 s `expo.out`. A `ShaderMaterial` plane per image on the shared canvas.

### 2.4 Composing a page

| # | Pattern | Length | Budget owner |
|---|---|---|---|
| 1 | Hero 3D + text reveal | 120 vh | the 3D asset |
| 2 | Sticky split (three blocks) | 300 vh | copy |
| 3 | Pinned product rotation or scrubbed sequence | 300 vh | the memorable moment |
| 4 | Horizontal gallery (four panels) | 400 vh equivalent | images |
| 5 | Text clip statement | 150 vh | type |
| 6 | Footer reveal | 0 | none |

About 13 vh-equivalents of pinning. More than 15 and people feel trapped. In Oneshot a set-piece is **one** of these inside the unique concept; the rest of the page follows the concept.

### 2.5 Common mistakes

- Creating triggers out of DOM order without `ScrollTrigger.sort()`.
- Nesting ScrollTriggers inside a timeline that has its own trigger.
- Animating the pinned element itself (pin the wrapper, animate children).
- `scrub` plus Lenis lerp on the same motion until it feels drunk; keep one small.
- Reading `getBoundingClientRect` inside `onUpdate`.
- Forgetting `invalidateOnRefresh` on function-based values.
- `will-change: transform` on an ancestor of a pinned element.
- Bare tweens with their own triggers at load: each forces a layout; use timelines (§1).

## 3. three.js driven by scroll

### 3.1 The canvas

One `WebGLRenderer`, one `<canvas>` in a wrapper `position: fixed; inset: 0; z-index: 0; pointer-events: none`, `aria-hidden`, outside every transformed ancestor. The DOM scrolls over it.

```js
import * as THREE from 'three'
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' })
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))        // 1.5 is the sweet spot for full-screen scenes
renderer.outputColorSpace = THREE.SRGBColorSpace
const clock = new THREE.Clock()
let smooth = 0, dirty = true
gsap.ticker.add(() => {                                        // same clock as Lenis
  const dt = clock.getDelta()
  const target = scroll.sections.journey ?? scroll.progress     // read, never measure
  const next = THREE.MathUtils.damp(smooth, target, 6, dt)
  if (Math.abs(next - smooth) < 1e-4 && !dirty) return          // render on demand
  smooth = next; dirty = false
  rig(smooth)                                                   // move camera / objects
  renderer.render(scene, camera)
})
```

- Render on demand for static scenes; anything continuous (a float, a time uniform) sets `dirty = true`. A continuous loop left on after its section halved the desktop frame rate (cloud-03c).
- Compile before the first scroll: `renderer.compile(scene, camera)` after the assets load.
- Hover through the DOM: the canvas never takes pointer events; raycast from a `pointermove` listener on `document`. An object that moves under a still cursor will not re-hover.
- A canvas fixed **above** the page must keep `pointer-events: none`, or it swallows every click and link under it (cloud-03c).
- No WebGL, or a load error: show the poster (§6.3).

### 3.2 Driving the scene from scroll

Progress in a plain object (§1), damped in the frame loop. Per-section progress: the section's ScrollTrigger `onUpdate: (self) => { scroll.sections.journey = self.progress }`, so DOM and 3D share identical trigger geometry. A GSAP timeline tweening `mesh.rotation` directly also works when 3D beats must line up with DOM beats in one timeline.

`damp` with lambda 6 feels like `scrub: 0.5`; 3 is dreamier, 10 tight. Lenis lerp, scrub and damp on the same motion: two of the three at most.

### 3.3 Camera choreography

- **Path:** `new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5)`; `curve.getPointAt(t, camera.position)` is arc-length parameterised (even speed); a second curve for look-at targets. Points can come from Blender as JSON.
- **Keyframes:** `{ at, pos, look, fov }` stops; find the two around `t`, ease the local progress, lerp. Easier to art-direct per section than a spline.
- **Mouse parallax:** `group.rotation.y = damp(rot, pointerX * 0.2, 4, dt)`. Small amplitudes; off on touch.
- Theatre.js: last public release 2024; not for production.

### 3.4 Asset pipeline

```bash
npm i -g @gltf-transform/cli
gltf-transform optimize in.glb out.glb --compress meshopt --texture-compress webp --texture-size 1024
gltf-transform inspect out.glb
```

- **Meshopt** is the default: tiny synchronous decoder (`GLTFLoader.setMeshoptDecoder`). **Draco** wins on raw bytes with a ~300 KB wasm decoder and slower decode. Self-host decoders.
- **KTX2/Basis** is about VRAM and upload time, not download size; for anything over 1024² on mobile.
- **Budgets** (practitioner heuristics): hero model 10 to 50k triangles, scene under 100k; textures 1024 (2048 only for the desktop hero); under 50 draw calls; total 3D payload 3 to 5 MB; first WebGL frame under 3 s on 4G.
- **Loading:** never block first paint on the model: the DOM renders, the canvas appears when ready, `data-ready="1"` and `ScrollTrigger.refresh()` follow.
- **Disposal:** `geometry.dispose()`, `material.dispose()`, `texture.dispose()` on teardown.

### 3.5 Materials and the premium look

- **Environment:** ship your own 1k HDR (`RGBELoader` + `PMREMGenerator`), or build one from emissive panels rendered once into a `PMREMGenerator.fromScene` (the source's Lightformer rig). Never a CDN preset.
- **Glass:** `MeshPhysicalMaterial` with `transmission` costs an extra render pass; on a software renderer or weak GPU every covered pixel is shaded again on top of the scene: cap the canvas (§6.3), drop it on tier 2, and set `material.visible = false` while the object is hidden.
- **Glass that reads as glass:** the light layout decides the look more than the material (near-identical settings gave frosted, cream and amber in cloud-05h to 05j). What worked: material `color` white with the tint in `attenuationColor`; the environment over a neutral or light backdrop, never brown; bright bands behind the object for the refraction to catch, small bright highlights in front (one bright overhead, one warm, one dark umber). Check one shot: facets at clearly different brightness, at least one specular highlight, a tinted edge, never a flat beige polygon. Tune lights, `thickness` and `roughness` first.
- **Baked lighting:** Blender-baked AO/lightmaps on `MeshStandardMaterial` is the cheapest expensive look. Static shadow maps: `renderer.shadowMap.autoUpdate = false` after one render.
- **Postprocessing** (three `EffectComposer`): vignette, noise, tone mapping near free; bloom moderate; depth of field, SSAO expensive (tier 3 only).
- **Idle life:** one floating thing (sin-wave y and small rotation), not five.
- **Reduced motion, object tied to a pinned section:** without the pin the section passes in one viewport while the fixed canvas stays put, so an object reusing the pinned timings drifts off its text and is sliced by the next opaque section (cloud-05c to 05i). Give it its own window: offset it by the section's offset from the viewport centre in viewport heights, positive below (`group.position.y = -offset * viewportHeightInWorldUnits`), hide it beyond about 0.85 viewport, render on demand, stop the float without rebuilding the object (worked in 05j to 05m).
- **Colour:** `texture.colorSpace = THREE.SRGBColorSpace` on colour maps; `outputColorSpace`, never `outputEncoding`.

### 3.6 GPU performance

- Watch frame time; on sustained decline drop pixel ratio to 1, recover to 1.5 later; drop resolution while `Math.abs(scroll.velocity) > 20`.
- `InstancedMesh` for repeated geometry; `LOD` for distance.
- Never allocate in the loop; reuse vectors; toggle `visible` instead of adding/removing.
- Weak GPUs: tier from hard signals and the renderer's own context (§6.3); tier ≤ 1 gets the video or poster.
- On a software rasteriser, merging draw calls moved desktop p95 from 83.2 to 66.7 ms (cloud-04j); fog off, one light off and front-to-back sorting changed nothing (cloud-04i).

### 3.7 Pitfalls

1. `ScrollTrigger.refresh()` after the model resolves; `invalidateOnRefresh` on size-dependent tweens.
2. Canvas fixed, `pointer-events: none`, outside every transformed ancestor.
3. Current three APIs only: `outputColorSpace` (r152), plain `BoxGeometry` (the `*BufferGeometry` aliases went in r145), no `useLegacyLights` (r155), `TextGeometry` from `three/addons`.

## 4. Video: scrubbed sequences, hero loops, video in WebGL

### 4.1 Choose the technique

| | Canvas image sequence | `<video>.currentTime` | WebCodecs → canvas |
|---|---|---|---|
| Smoothness | Deterministic, synchronous draw | Async seek, nearest keyframe, 50 to 150 ms lag | Deterministic once decoded |
| Bytes | Largest (300 WebP frames ≈ 18 MB) | All-intra 1280 px/30 fps ≈ 8 MB MP4 | Smallest |
| Decode | Up front; parallel decodes can kill iOS Safari | Per seek, hardware | Up front |
| Safari | Fine within the canvas memory cap | Good seeker; dead in Low Power Mode | UNVERIFIED |
| Spread | Everywhere | Everywhere | Chrome only in practice |

**Default: canvas image sequence** for a scrub (Apple: 148 JPGs on the 2020 AirPods page). `currentTime` only for short clips where a 5 to 15 MB all-intra file is acceptable, blob-loaded first. WebCodecs is a Chrome-only enhancement.

### 4.2 Image sequence pipeline

```bash
# 300 frames from a 10 s master at 30 fps, desktop and mobile sizes
ffmpeg -i hero.mov -vf "fps=30,scale=1600:-2" -c:v libwebp -quality 72 seq/hero/%04d.webp
ffmpeg -i hero.mov -vf "fps=30,scale=960:-2"  -c:v libwebp -quality 68 seq/hero-m/%04d.webp
```

- WebP q65 to 75: about 20 percent smaller than JPEG, fastest decode. AVIF decodes about 2× slower. Export from the best source, not a compressed MP4 (in Oneshot: the business's own original video file).
- One frame per 8 to 12 px of scroll reads as continuous; under 5 wastes bytes, over 20 steps.
- First ~10 frames `fetch(url, { priority: 'high' })`, the rest `'low'` in batches of 4 to 6. Never all at once: WebKit bug 190280, iOS Safari kills the tab at 20 parallel decodes.
- `createImageBitmap(blob)`; draw only decoded bitmaps; `bitmap.close()` on teardown.
- Below the fold: start from an `IntersectionObserver` with `rootMargin: '800px'`.
- A decoded 1600×900 frame is 5.8 MB RGBA; 300 is 1.7 GB. Keep bitmaps at display size, DPR ≤ 1.5; on mobile decoded set under about 150 MB (or a sliding window of ±40 frames). iOS has had a 256 MB canvas memory ceiling.
- Reduced motion: a single still; fetch no sequence.

```js
function scrollSequence(wrap, urls, { scrollLength = 3000 } = {}) {
  const c = wrap.querySelector('canvas'), ctx = c.getContext('2d'), frames = [], ph = { frame: 0 }
  let drawn = -1
  const draw = (i) => {
    const bmp = frames[i]; if (!bmp) return
    const dpr = Math.min(devicePixelRatio || 1, 1.5), w = c.clientWidth, h = c.clientHeight
    if (c.width !== w * dpr || c.height !== h * dpr) { c.width = w * dpr; c.height = h * dpr }
    const s = Math.max((w * dpr) / bmp.width, (h * dpr) / bmp.height)       // cover
    ctx.drawImage(bmp, (w * dpr - bmp.width * s) / 2, (h * dpr - bmp.height * s) / 2, bmp.width * s, bmp.height * s)
    drawn = i
  }
  const load = async (i, priority) => {
    const bmp = await createImageBitmap(await (await fetch(urls[i], { priority })).blob())
    frames[i] = bmp; if (i === Math.round(ph.frame)) draw(i)
  }
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    const io = new IntersectionObserver(async ([e]) => {
      if (!e.isIntersecting) return; io.disconnect()
      await Promise.all(urls.slice(0, 10).map((_, i) => load(i, 'high')))
      for (let i = 10; i < urls.length; i += 4) await Promise.all(urls.slice(i, i + 4).map((_, j) => load(i + j, 'low')))
    }, { rootMargin: '800px' })
    io.observe(wrap)
    gsap.timeline({ scrollTrigger: { trigger: wrap, start: 'top top', end: `+=${scrollLength}`, pin: true, scrub: 0.5 } })
      .to(ph, { frame: urls.length - 1, ease: 'none', snap: 'frame',
        onUpdate: () => { const i = Math.round(ph.frame); if (i !== drawn) draw(i) } })
    return () => { io.disconnect(); frames.forEach((b) => b?.close()) }
  })
}
```

Markup: `<div data-pin="sequence" style="height:100svh;position:relative"><img src="poster" alt="…"><canvas aria-hidden></canvas></div>`, both absolutely filling it. The poster `<img>` under the canvas is the LCP candidate, the reduced-motion view and the no-JS view. Captions are DOM elements on the same trigger (fade in and out over 15 to 20 percent of the pin each).

### 4.3 Video scrubbing (when you must)

```bash
ffmpeg -i in.mov -vf scale=1280:-2 -r 30 -c:v libx264 -profile:v main -crf 23 -g 1 -pix_fmt yuv420p -movflags +faststart -an out.mp4
ffmpeg -i in.mov -vf scale=1280:-2 -r 30 -c:v libvpx-vp9 -crf 32 -b:v 0 -g 1 -pix_fmt yuv420p -row-mt 1 -an out.webm
```

`-g 1` makes every frame a keyframe (5× the bytes). `-an` always. `<video muted playsinline preload="auto">`, never `.play()`. Fetch the whole file to a blob URL before wiring ScrollTrigger: seeks to unbuffered ranges arrive late or never. Gate seeks with `requestVideoFrameCallback`, fallback `seeked`. iOS stops in Low Power Mode; the canvas path is the mobile default.

### 4.4 Hero and background video

```html
<link rel="preload" as="image" href="/hero-poster.avif" fetchpriority="high" />
<video autoplay muted loop playsinline poster="/hero-poster.avif" preload="metadata" aria-hidden="true">
  <source src="/hero.av1.webm" type="video/webm; codecs=av01.0.05M.08" />
  <source src="/hero.vp9.webm" type="video/webm; codecs=vp9" />
  <source src="/hero.h265.mp4" type="video/mp4; codecs=hvc1" />
  <source src="/hero.h264.mp4" type="video/mp4" />
</video>
```

- Autoplay needs `muted` + `playsinline`. Smallest first, H.264 last.
- The poster is the LCP element: real first frame, preloaded `fetchpriority="high"`, a 20 px blurred LQIP behind it.
- Budget (rule of thumb): 2 to 3 MB per codec at 1280 to 1600 px, 24 to 30 fps, 5 to 8 s, `-crf 28` to `32`.
- Below the fold: `preload="none"`, pause off-screen (`IntersectionObserver`) and on `document.hidden`.
- Reduced motion: the poster `<img>` instead of the `<video>`, decided before any video bytes are fetched.

### 4.5 Video inside WebGL

- `new THREE.VideoTexture(videoEl)`, `colorSpace = SRGBColorSpace`.
- A sequence canvas can feed a `CanvasTexture` (`needsUpdate = true` after each draw).
- Reveal masks: `clip-path: inset(... round ...)` or `circle()` scrubbed on the wrapper, or a progress uniform.
- `mix-blend-mode` over the WebGL canvas forces readbacks; avoid.
- One persistent canvas; cross-fade textures in the shader, never swap canvases.

### 4.6 Hosting

With a sequence or a blob-loaded video, range support is irrelevant; what matters is immutable caching (`Cache-Control: public, max-age=31536000, immutable`) and HTTP/2 so 300 small requests multiplex. Oneshot hosts on Cloudflare Workers static assets (CLAUDE.md).

### 4.7 Checklist for a 300-frame sequence

- [ ] Master 10 s at 30 fps from the best source.
- [ ] 1600×900 desktop and 960×540 mobile sets; DPR ≤ 1.5.
- [ ] WebP q68 to 72; ≤ 60 kB per desktop frame (≈ 18 MB), ≤ 25 kB mobile (≈ 7.5 MB).
- [ ] `end: '+=3000'`, `scrub: 0.5`, `snap: 'frame'`, `ease: 'none'`.
- [ ] First 10 frames high priority, rest in batches of 4; draw as soon as frame 0 decodes.
- [ ] Below-fold start at 800 px.
- [ ] Poster `<img>` under the canvas; reduced motion fetches nothing.
- [ ] Decoded memory under 150 MB on mobile.

## 5. Design language and motion

Rules tagged **(T)**, **(I)**, **(E)** come from three design skills (taste-skill, impeccable, Emil Kowalski's skills) and are UNVERIFIED until a run confirms them. Precedence: the brief (in Oneshot: the concept, `custom.md`, the house rules) wins over this chapter; a rule backed by a run id wins over a skill rule.

### 5.1 Easing: one family per site

| Context | GSAP | CSS |
|---|---|---|
| Reveals, entrances | `power3.out`, `power4.out`, `expo.out` | `cubic-bezier(0.23, 1, 0.32, 1)` |
| Wipes, menus, transitions | `power4.inOut` | `cubic-bezier(0.76, 0, 0.24, 1)` |
| On-screen movement | — | `cubic-bezier(0.77, 0, 0.175, 1)` |
| Scrubbed timelines | `ease: 'none'` | — |
| UI feedback | `power2.out` 100 to 300 ms | same |

Ease-out by default, ease-in-out only for travel across the viewport, never ease-in for content, no overshoot on scroll. One reveal curve, one wipe curve. Hover/colour: plain `ease`; marquees and progress bars: `linear` (E). Exit at about 70 percent of the entrance's duration (T, I), leaving the way it came (E).

### 5.2 Durations and smoothing

| Thing | Value |
|---|---|
| Text or image reveal | 0.5 to 0.9 s; the one focal entrance up to 1.2 s (T, I) |
| Stagger per character | 0.02 to 0.05 s |
| Stagger per line or card | 0.06 to 0.1 s (T) |
| UI feedback | press 100 to 160 ms, hover 150 to 200 ms, menu 150 to 250 ms (T, E) |
| Page wipe | 0.7 to 1 s |
| Preloader, total | under 2 s, hard ceiling |
| Lenis lerp | 0.1 to 0.15 (0.12 default) |
| ScrollTrigger scrub | 0.5 to 1 |
| 3D damp lambda | 6 (3 dreamy, 10 tight) |
| Marquee | 40 to 80 px/s |

### 5.3 Choreography

- **One thing at a time.** Entrance, hold, exit per section.
- **Hierarchy.** Headline moves first and most; supporting copy half the distance; decoration barely.
- **Restraint.** One memorable moment where 3D or video carries the brand; every other section is typography and layout with at most one reveal.
- **Informative over decorative.** Scrubbed motion earns its place when it reveals structure.
- **The idea comes from the subject (T).** "On this page, [subject thing] becomes [device]"; if it still works with a competitor's name in it, find another.
- **Content is visible by default (I).** A failed or late script never leaves a blank band.
- **Text is readable at rest.** Reveals complete within the first 20 percent of a section's visibility.

### 5.7 Anti-patterns that make a page feel cheap

Fade-up on every element; scroll-jacking under readable text or any hijack on mobile; preloaders over 2 s; blurry or stepped sequences (ship ≥ 1.5× display resolution, 10 px of scroll per frame); mobile at 20 fps because desktop shaders are still on; mixed easings; copy unreadable mid-tween; 3D with no narrative role; ignoring `prefers-reduced-motion`; Lighthouse mobile under 90.

### 5.8 Motion craft (E unless tagged)

- Never animate from `scale(0)`; start at `scale(0.9 to 0.97)` with `opacity: 0`.
- Hover motion only under `(hover: hover) and (pointer: fine)`.
- Anything that can fire twice in a second retargets: `overwrite: 'auto'` or `gsap.quickTo`.
- Animate `transform` and `opacity`; never `transition: all`. Animated `blur()` under 20 px, desktop only.
- GSAP runs on the main thread, so motion overlapping load or the canvas mount can stutter; CSS/WAAPI can run off it.
- Reduced motion means fewer and gentler, not none: keep short meaning-carrying fades, drop travel, scale, parallax and autoplay.

(Source §5.4 typography/layout, §5.5 award sites, §5.6 tools and §5.9 critique pass are not ported: Oneshot's `references.md`, house rules, concept and look loop own those.)

## 6. Performance, resilience, accessibility

### 6.1 Frame budget

- 16.6 ms at 60 Hz, 8.3 ms at 120 Hz; about 10 ms of your own work at 60 Hz, 5 ms at 120 Hz.
- Only `transform` and `opacity` are compositor-only everywhere; `filter` is accelerated in Chromium, test Safari.
- `will-change`: set from JS just before a change and reset after; never global; `will-change: transform` breaks `position: fixed` descendants.
- `onUpdate` callbacks only write; reads after writes force synchronous layout.
- `content-visibility: auto` only far below the fold, never on measured sections.
- Frames land on 16.7 ms steps; one step between runs can be noise (cloud-04p: 50.1 then 66.6 ms at 0.35 MP); compare medians.

### 6.2 Loading order and the JS budget

Critical path: HTML headline and nav → fonts (no CLS) → poster image (the LCP element, `fetchpriority="high"`) → page JS → three.js (dynamic `import()`) → models and textures → first WebGL frame, cross-fading over the poster. Never a black canvas.

**The JS budget.** Sizes (min/gzip): three 736/185 KB whole (tree-shakes well; addons can pull it back), gsap core 71/27, lenis 19/5.5. Source budget: first-load JS under 250 KB gzipped on the hero route, three.js lazy. Oneshot's hard limit at 4g is `playbook.md` §4: JS ≤ 300 KB compressed for the page, so the set-piece gets one library stack, not two.

Mount the canvas after the window `load` event plus one `requestIdleCallback` (timeout 1.5 s): three's module evaluation and context creation then fall outside Lighthouse's blocking window (performance 68 → 73 median of 5, TBT about 1.7 s → 1.0 s; waiting 2 s longer bought nothing). Never gate the canvas behind an interaction; keep a poster under a 3D hero until the first frame.

`<canvas>` is never an LCP candidate. A poster that fills the whole viewport may be skipped as LCP (observed once: insetting the hero media by about 10 percent of the viewport height moved LCP from the headline to the poster and performance from 62 to 89; the Chrome heuristic is UNVERIFIED). A preloader hiding the headline pushes LCP to "poor". Any preloader: 2 s ceiling; a failed request drops a tier, never hangs.

Core Web Vitals: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at p75. Reserve media boxes with `aspect-ratio`.

### 6.3 Device tiers

| Tier | Gets | Trigger |
|---|---|---|
| 3 | Full scene, DPR ≤ 2, postprocessing | desktop with a hardware renderer |
| 2 | Scene, DPR 1 to 1.5, no post, KTX2 textures, no transmission | `pointer: coarse`, a software renderer, or no renderer string |
| 1 | Muted video or image sequence, no WebGL | WebGL missing; ≤ 2 cores or ≤ 2 GB (Chromium only) on a hardware renderer |
| 0 | Poster image and text | `prefers-reduced-motion: reduce`, no JS, crawler |

Hard signals only; read the renderer string from the real renderer's context, never a probe context (a second context costs about as much as the real one on a software renderer, cloud-04b, and is easy to leak, cloud-04f).

```js
const SOFTWARE = /swiftshader|llvmpipe|software/i
export function preTier() {                       // before the canvas mounts: poster (0, 1) vs canvas (2, 3)
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return 0
  if (!('WebGLRenderingContext' in window)) return 1
  return matchMedia('(pointer: coarse)').matches ? 2 : 3
}
export function refineTier(gl, tier) {            // gl = renderer.getContext()
  const ext = gl.getExtension('WEBGL_debug_renderer_info')
  const r = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : ''
  if (!r || SOFTWARE.test(r)) return 2            // software renderers stay on tier 2
  const cores = navigator.hardwareConcurrency ?? 4, mem = navigator.deviceMemory ?? 4
  return cores <= 2 || mem <= 2 ? 1 : tier
}
```

On a software rasteriser (headless shots): pixel ratio 1 and the canvas capped near 0.4 MP (`renderer.setPixelRatio(Math.min(1, Math.sqrt(400_000 / (innerWidth * innerHeight))))`, recomputed on resize). A tier that drops to 1 after mount swaps the canvas for the poster. Mobile GPU memory kills are silent: assume `MAX_TEXTURE_SIZE` 4096, compressed textures, render smaller and upscale.

### 6.4 Resilience

- **Context loss:** `preventDefault()` on `webglcontextlost`, stop the loop, rebuild on `webglcontextrestored`; poster meanwhile.
- **Reload mid-pin:** `history.scrollRestoration = 'manual'`, save `scrollY` on `pagehide`, restore after `refresh()`. `html { scroll-behavior: auto }` always.
- **bfcache:** no `unload` listener; on `pageshow` with `persisted`, restart the loop.
- **Missing assets:** drop to tier 1, never hang.

### 6.5 Accessibility

- Reduced motion is tier 0: a `gsap.matchMedia` branch with opacity-only reveals, no pins, no parallax, no sequences fetched. WCAG 2.3.3 names parallax as motion that must be disableable.
- Real `<a>` and `<button>` in DOM order; pinned content focusable and visible at `start`; skip link past the hero; never trap wheel or touch.
- Canvas wrapper `aria-hidden`; the poster carries the `alt`.
- Text over media 4.5:1 (3:1 large) with a scrim measured on the brightest frame.
- 3 to 5 viewport heights per pinned sequence, under about 15 total; a progress indicator on any pin over two viewports.

### 6.6 Text in the DOM

All copy is HTML beneath the canvas. Never start real text at `opacity: 0` in CSS; GSAP sets it at runtime so no-JS and LCP see it.

### 6.8 Checks before hand-off

| Metric | Target |
|---|---|
| LCP | ≤ 2.5 s p75 mobile |
| INP | ≤ 200 ms |
| CLS | ≤ 0.1, 0 during scroll |
| Frame time while scrolling | < 10 ms at 60 Hz, < 5 ms at 120 Hz |
| Non-composited animations | 0 |
| GPU | < 100 draw calls |
| Textures | compressed, ≤ 2048² |
| 3D payload | hero < 3 MB, total < 5 MB |
| Image sequence | < 20 MB desktop, < 8 MB mobile, decoded < 150 MB |
| No WebGL / tier 0 | poster + text, zero errors |
| Reduced motion | no pins/parallax, content readable |
| Keyboard | every link reachable, focus visible with pins active |
| Contrast over media | ≥ 4.5:1 on the brightest frame |
| Lighthouse mobile | performance ≥ 90, accessibility ≥ 90 (a software-rendered headless run scores lower: the scrollcraft harness floor is 65) |

## 7. Assets

### 7.1 The rule

A missing asset never blocks a build and is never a hallucinated URL. In Oneshot the set-piece is built from the business's **own** material (dossier video or photographs, concept's asset ids); a procedural placeholder stands in only for what is being made from it (a sequence not yet cut), in the same shape and size, and is listed in the look-log.

### 7.2 Models

Blender → GLB → `gltf-transform optimize --compress meshopt --texture-compress webp --texture-size 1024`. Hero under 3 MB, 10 to 50k triangles. CC0 sources: Poly Haven (models, HDRIs, textures), Sketchfab with Downloadable + CC0. Procedural placeholder: a `TorusKnotGeometry(1, 0.35, 220, 32)` or `IcosahedronGeometry` with a matcap; `MeshStandardMaterial` instead of transmission on tier 2.

### 7.3 Textures and environment

Colour maps WebP 1024, `SRGBColorSpace`; data maps (normal, roughness) linear. KTX2 on mobile: UASTC for normals, ETC1S for colour. Environment: own 1k HDR or the emissive-panel rig (§3.5), rendered once.

### 7.4 Video and image sequences

Real: from the best source at 30 fps (§4 has the ffmpeg lines and budgets). Placeholder video:

```bash
# gradients outputs RGBA: convert with format=yuv420p before noise, or the noise lands in alpha and frames go near white.
# Never noise=alls=8:allf=t unblurred: temporal noise is incompressible (100 MB+).
ffmpeg -f lavfi -i "gradients=s=1600x900:d=8:speed=0.02:r=30,format=yuv420p,noise=alls=4:allf=t,gblur=sigma=1.5" \
  -c:v libx264 -pix_fmt yuv420p -crf 30 -movflags +faststart -an placeholder.mp4
```

About 130 KB for 8 s at 1600 px. Sequence from it: `ffmpeg -i placeholder.mp4 -vf "fps=24,scale=1280:-2" -c:v libwebp -quality 70 seq/%04d.webp`.

In Oneshot every made image or video comes from a committed recipe with a `# media:` header (designer base.md, CLAUDE.md rule 6).
