# the-sandhya — notes

Run `2026-11-ahangama-01`, owner alon, branch `alon/the-sandhya`, `mode: test` (no owner contact). Set `ONESHOT_RUN=2026-11-ahangama-01` on repo tools.

## State

`packaged` (2026-11-09), waiting at **gate c**: a human decides whether to send the pitch. `mode: test`, so nothing goes to the owner unless the run changes.

- Preview: https://the-sandhya.os1.workers.dev (Worker `the-sandhya`, noindex, byte-identical to `final/dist/` at 49b5001).
- Proposal page: https://the-sandhya-proposal.os1.workers.dev (Worker `the-sandhya-proposal`). The drafts are `sites/the-sandhya/pitch/message.en.email.md` (to reservations@thesandhya.com) and `message.en.short.md`; claims and sources are in `pitch/notes.md`.
- Score: critique round 1 PASS 85.1/100. After the fix pass, the critic's verification 1 gave PASS 89.0/100 (d1–7 73.5/80, d8 8).
- Built from calm only (Alon at gate b), with date fields: both dates valid add `#checkin=…&checkout=…` to every engine link, the buttons name the dates, and `sessionStorage` keeps them.
- Budget: 10.77M of 12M tokens and about 606 of 850 agent-minutes. Alon raised the limits on 2026-11-09, from 10M and 600.

**Before sending (gate c), a person must:**
1. Open the Cloudbeds link with dates, and each `?rid=` link, in a real browser. If the engine ignores the dates, remove the date fields.
2. Verify Kayak's 9.4 from 159 on Kayak, or remove it from the site. It appears in three places on the preview plus the JSON-LD `sameAs`; the pitch never mentions it.
3. Choose the channel. Email is verified; WhatsApp is not confirmed for that number.
4. Check that the MICHELIN Guide page still shows its "not taking reservations" bar, or drop that bullet.
5. Check the date on the old-site numbers (6 Nov), and re-run `dossier/the-sandhya/make-old-site.sh` if sending much later.
6. Agree fees before replying to a price question.
7. Decide whether the hotel's name goes in the h1. It now appears in no sentence on the page, only in the logo alt text, the title and the JSON-LD.
8. Also from the critic: the Director's Suite says "King" where the dossier says "Super King"; img-167's room; the staff photos.

## Decided 2026-11-06 (Alon: "you decide")

- The hotel's own sentences are exempt from "no triads" and "no padding vocabulary" on this business only: verbatim, trimmed, clauses moved, or a word or two changed for grammar or to drop a claim, with no other words added (widened by Alon after round 2). Facts are still audited. The general rule change is `proposals/2026-11-ahangama-01/001-copyeditor-owner-prose-voice.md`, gate d, not merged.
- Testimonials are not excerpted: `schemas/site-content.md` says a quote is never trimmed to fit. The page keeps 2.

## Copy round 3

Done. Dining ¶2 S2 and S3 are the wording Alon approved. `copy/sources.md` and `humanizer-notes.md` keep small stale rows on the older Dining sentence and the draft diff; `copy/en.json` and `copy/review.md` are right. For a person before go-live: `copy/review.md`, "For a person".

## Settled at gate b

- Calm only; date fields added at the build (Alon, 2026-11-09). Unique's rulings are moot.

## Do not lose

- Positioning (Alon): a beachfront boutique hotel, not a surf stay. The site lists surf lessons and board hire; who runs them is unknown.
- Never: "Michelin Key" or any Michelin distinction; the untraced press quotes, including both Wallpaper* quotes on the hotel's site (one fragment from the real Wallpaper* page is fine); aggregator rates in `rooms[]`; a WhatsApp claim; Kabalana captions on the `/locale` surf, stilt-fisher and aerial shots.
- No usable video: the first screen leads with a photograph unless someone finds reels on Instagram.
- A person must still open the Cloudbeds engine and its `?rid=` links in a real browser, and read Kayak's 9.4 from 159 on the page before go-live.
- `tools/funnel.mjs` cannot see an `<a>` with no `href`. A build needs a real link so the critic's tool counts it. Worth a proposal.
- `dossier.json` still says picked dates are untested; the audit settled that (dates reach the URL, adults count is never sent).

## This worktree

`/Users/alonlavi/oneshot/.claude/worktrees/the-sandhya`. `dossier/mutag-meitiv/assets` is deliberately unlinked here so the regenerated Mutag screenshots stay out of these commits. Do not re-run `tools/setup.sh` here: its recipes overwrite the shared store.
