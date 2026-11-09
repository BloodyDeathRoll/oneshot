# the-sandhya — notes

Run `2026-11-ahangama-01`, owner alon, branch `alon/the-sandhya`, `mode: test` (no owner contact). Set `ONESHOT_RUN=2026-11-ahangama-01` on repo tools.

## State

`picked` (2026-11-09): Alon kept **calm** ("The Artwork") only; interactive and unique are not built. Next is 4g, the build of `sites/the-sandhya/mockups/calm/` into `sites/the-sandhya/final/`. Alon also chose **date fields**: the build adds check-in and check-out fields that pass the dates to the Cloudbeds engine URL, which meets `agents/designer/custom.md`'s "pick dates". A person still has to confirm the engine honours those dates before go-live. Budget: 7.72M of 10M tokens used, so about 2.28M remain for the build through to the pitch (`sanjee-surf-school` used about 2.4M on those stations). Review the budget if the critique loop needs a second round. Preview the mockups locally: `python3 -m http.server 8790 --directory sites/the-sandhya/mockups`, then `/calm/dist/index.html`. Use http, because WebGL won't load images from `file://`. Copy passed on its fourth pass, resting on the rulings stated in `copy/review.md`.

## Decided 2026-11-06 (Alon: "you decide")

- The hotel's own sentences are exempt from "no triads" and "no padding vocabulary" on this business only: verbatim, trimmed, clauses moved, or a word or two changed for grammar or to drop a claim, with no other words added (widened by Alon after round 2). Facts are still audited. The general rule change is `proposals/2026-11-ahangama-01/001-copyeditor-owner-prose-voice.md`, gate d, not merged.
- Testimonials are not excerpted: `schemas/site-content.md` says a quote is never trimmed to fit. The page keeps 2.

## Copy round 3

Done. Dining ¶2 S2 and S3 are the wording Alon approved. `copy/sources.md` and `humanizer-notes.md` keep small stale rows on the older Dining sentence and the draft diff; `copy/en.json` and `copy/review.md` are right. For a person before go-live: `copy/review.md`, "For a person".

## Settled at gate b

- Date picker: add working date fields at the build (Alon, 2026-11-09).
- Unique's grade and sea strip: moot, because unique was not kept.
- The experience critic's point that booking must feel part of the site: the date fields address it. The critic checks it again at 4h.

## Do not lose

- Positioning (Alon): a beachfront boutique hotel, not a surf stay. The site lists surf lessons and board hire; who runs them is unknown.
- Never: "Michelin Key" or any Michelin distinction; the untraced press quotes, including both Wallpaper* quotes on the hotel's site (one fragment from the real Wallpaper* page is fine); aggregator rates in `rooms[]`; a WhatsApp claim; Kabalana captions on the `/locale` surf, stilt-fisher and aerial shots.
- No usable video: the first screen leads with a photograph unless someone finds reels on Instagram.
- A person must still open the Cloudbeds engine and its `?rid=` links in a real browser, and read Kayak's 9.4 from 159 on the page before go-live.
- `tools/funnel.mjs` cannot see an `<a>` with no `href`. A build needs a real link so the critic's tool counts it. Worth a proposal.
- `dossier.json` still says picked dates are untested; the audit settled that (dates reach the URL, adults count is never sent).

## This worktree

`/Users/alonlavi/oneshot/.claude/worktrees/the-sandhya`. `dossier/mutag-meitiv/assets` is deliberately unlinked here so the regenerated Mutag screenshots stay out of these commits. Do not re-run `tools/setup.sh` here: its recipes overwrite the shared store.
