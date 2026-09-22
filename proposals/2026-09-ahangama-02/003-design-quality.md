# 003 — Design quality: why the mockups plateau, and what changed

Filed 2026-09-21 for run `2026-09-ahangama-02`, from a design spike on The Lavish Haven made
outside the pipeline. This file is the evidence and the reasoning. The changes themselves are
already made in the files that came with it; `003-APPLY.md` lists them and what is still to do.

## 1. Evidence

**The spike.** One business (Lavish), the same copy (`copy/en.json`), the same 79 photographs, the
same model. No `base.md`, no schema, no Astro, no audit. One HTML file. Shahar on the result:
"this is great." Shahar on the pipeline's pick for the same business: "good enough for now." The
model and the material are not the limit. The pipeline is.

**Finding 1 — the generic look was written into the brief.**
`sites/the-lavish-haven/concepts.md` §4 specifies for calm: cream `#F4F0E8`, Instrument Serif,
Inter, petrol accent. For interactive: cream, Fraunces, Inter Tight, teal. All three carry small
all-caps labels over every heading. That set is the most common look a language model produces
when asked for "tasteful". The creative director was built to stop businesses looking like each
other, and made them look like every other generated site instead. Both `base.md` files listed
"cream, sand, plaster, paper" as the examples of a light ground, which primes exactly this.

**Finding 2 — nothing in the pipeline looked at the page for quality.**
The designer reviewed screenshots "for overflow, overlap and unreadable text". The critic is barred
from taste. `evals.md` is empty for all three agents. `check-design`, `check-places` and
`audit-mockup` measure "not broken". The only aesthetic signal was the human pick, once per
business, after three full builds. In the spike, round 1 of the water looked like sci-fi plasma
and would have failed the gate; it was caught by looking at a screenshot.

**Finding 3 — station 4e was a production build.**
Three Astro projects with schema-bound content, booking, performance audit, accessibility pass,
facts table and licence notes, per variant. About 45 KB of `base.md` + `references.md` plus
playbook, rubric and two schemas, against 715 bytes of Shahar's taste.

**Finding 4 — Shahar's colour and type taste is in no file.** See `003-custom-md-draft.md`.

**Finding 5 — the critic scored half-empty pages.** `interactive-desktop.jpg` is 9,928 px tall and
mostly blank: scroll-triggered content never fires in one full-page capture.

**Finding 6 — every fix so far was a prohibition.** Dark, orange, captions, padded boxes, shared
skeletons. Each is right; each removes a bad output; none produces a good one. The divergence
table makes sites different, not better.

## 2. What changed, and why

| File | Change | Answers |
|---|---|---|
| `agents/creative-director/base.md` 0.2.0 | "The one thing"; colour sampled from photographs with hex + asset id; type reasoned from the business; hard constraint 15 "never brief the default look"; light grounds no longer exemplified by cream | 1, 6 |
| `agents/designer/base.md` 0.3.0 | 4e is one HTML file per variant with a mandatory look loop (build, shoot, look, write what is wrong, revise, ≥3 rounds); hard constraints scoped by station; 4g ports without redesigning | 2, 3 |
| `agents/critic/base.md` 0.3.0 | scrolled per-viewport screenshots; default-look findings reported as facts; fails a hollow look loop; still no taste calls | 2, 5 |
| `tools/shoot.mjs` (new) | the scrolled capture + contact sheet both agents use; starts Chromium with software GL so WebGL renders | 2, 5 |
| `agents/designer/gold/` (new) | the approved Lavish page and how it was made; a bar, not a template | 2, 6 |
| `agents/designer/references.md` | #26 portrait centre-crop, #27 generative first screen, #28 one shape, #29 headless WebGL artefact | 6 |
| `playbook.md` 0.2.0 | §4 exception for the Rosa forecast | below |

The output path stays `mockups/<variant>/dist/index.html` so tools and the critic that serve
`dist/` keep working. `agents/wiring.json` is untouched: no prompt layer was added or removed.

**Cost moved, not added.** 4g now ports one HTML file into Astro. That is real work, done once for
the picked variant, instead of three full builds of which two are thrown away.

**Deferred.** An art-director pass comparing mockups pairwise against `gold/`. One spike is one
data point; revisit after the next run.

## 3. The Rosa forecast — an optional block

The 02 mockups already placed a Rosa forecast in "The wave", but no agent file mentioned it. It is
now an explicit option, never a default.

- **When:** the business sells proximity to a wave; Rosa has *that* spot, with the mapping written
  down (the nearest other spot is never shown as this one, the same false claim `check-places`
  exists to stop); the concept says where it sits. Creative director decides; "no" is an answer.
- **How it looks:** drawn by each site from Rosa's per-spot JSON in its own type and colour. Rosa's
  stock white card, identical on every site, is a cookie-cutter element by construction and was
  the one thing on the Lavish mockups that visibly belonged to another product. The stock card is
  a 4e-only shortcut.
- **How it loads:** playbook §4 exception. One lazy request for data, reserved space, plain link
  when JavaScript is off, the request fails or the data is stale. No script from Rosa.
- **Facts:** exempt from the dossier rule when labelled as Rosa's and tied to the dossier's spot;
  never restated in the copy.
- **Owner:** an on/off switch in the content schema (to add, see `003-APPLY.md`).
- **Credit:** "Forecast for <spot> by Rosa", linked, on every site that carries it.

Not known from outside the Rosa repo, and not invented here: the JSON's public URL pattern, field
names and units, CORS headers, cache lifetime.

## 4. Open question for Shahar — house rule 1

The approved Lavish page has a pinned full-screen field of night-blue water holding one sentence,
and a night-blue closing panel holding a headline, the booking button and the footer's contact
links. `check-design.mjs` will probably fail it on "large dark panel". Either:

- clarify the rule — "a colour field that holds a headline is a picture, not a theme; body copy and
  lists never sit on dark" — and move the footer's contact block onto the white ground; or
- keep the rule as written and relight the closing panel in the noon blue.

**Resolved 2026-09-21 (Shahar): rule unchanged, closing panel relit.** House rule 1 stays as
written. The closing panel on the gold page is now the cool white ground (`#F5F8FA`, night-blue
ink) instead of night blue; the pinned night-blue water moment stays, as a picture. The page passes
`tools/check-design.mjs` at 1440 and 390 px.

## 5. How to tell whether this worked

Re-run 4d → 4f on **KA Surf Hostel** only: all three of its mockups were rejected and its best
photograph is 576×768, so it is the hard case. It worked if Shahar picks one without "good enough
for now". Two regressions to watch for: a second site shaped like Lavish (remove the HTML from
`gold/`, keep the notes), and a `look-log` whose rounds change nothing between sheets.
