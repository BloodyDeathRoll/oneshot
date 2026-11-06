# the-sandhya — notes

Run `2026-11-ahangama-01`, owner alon, branch `alon/the-sandhya`, `mode: test` (no owner contact). Set `ONESHOT_RUN=2026-11-ahangama-01` on repo tools.

## State

`copy_passed`, fourth pass. Next: 4d concept, 4e mockups, 4f pre-score, then gate b. The pass rests on rulings and says so in `copy/review.md`: 42 sentences are exempt from "no triads" and "no padding", and on this pass voice could fail only for what a reader would get wrong or stumble over. The session proposed that condition in the option Alon chose on 2026-11-06. Budget raised by Alon on 2026-11-06 to 10M tokens and 600 minutes, at 1.28M and 86 minutes used; 1.81M and 109 minutes used now; review it again at gate b.

## Decided 2026-11-06 (Alon: "you decide")

- The hotel's own sentences are exempt from "no triads" and "no padding vocabulary" on this business only: verbatim, trimmed, clauses moved, or a word or two changed for grammar or to drop a claim, with no other words added (widened by Alon after round 2). Facts are still audited. The general rule change is `proposals/2026-11-ahangama-01/001-copyeditor-owner-prose-voice.md`, gate d, not merged.
- Testimonials are not excerpted: `schemas/site-content.md` says a quote is never trimmed to fit. The page keeps 2.

## Copy round 3

Done. Dining ¶2 S2 and S3 are the wording Alon approved. `copy/sources.md` and `humanizer-notes.md` keep small stale rows on the older Dining sentence and the draft diff; `copy/en.json` and `copy/review.md` are right. For a person before go-live: `copy/review.md`, "For a person".

## Do not lose

- Positioning (Alon): a beachfront boutique hotel, not a surf stay. The site lists surf lessons and board hire; who runs them is unknown.
- Never: "Michelin Key" or any Michelin distinction; the untraced press quotes, including both Wallpaper* quotes on the hotel's site (one fragment from the real Wallpaper* page is fine); aggregator rates in `rooms[]`; a WhatsApp claim; Kabalana captions on the `/locale` surf, stilt-fisher and aerial shots.
- No usable video: the first screen leads with a photograph unless someone finds reels on Instagram.
- A person must still open the Cloudbeds engine and its `?rid=` links in a real browser, and read Kayak's 9.4 from 159 on the page before go-live.
- `tools/funnel.mjs` cannot see an `<a>` with no `href`. A build needs a real link so the critic's tool counts it. Worth a proposal.
- `dossier.json` still says picked dates are untested; the audit settled that (dates reach the URL, adults count is never sent).

## This worktree

`/Users/alonlavi/oneshot/.claude/worktrees/the-sandhya`. `dossier/mutag-meitiv/assets` is deliberately unlinked here so the regenerated Mutag screenshots stay out of these commits. Do not re-run `tools/setup.sh` here: its recipes overwrite the shared store.
