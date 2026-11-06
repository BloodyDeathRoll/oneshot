# the-sandhya — notes

Run `2026-11-ahangama-01`, owner alon, branch `alon/the-sandhya`, `mode: test` (no owner contact). Set `ONESHOT_RUN=2026-11-ahangama-01` on repo tools.

## State

`copy_failed`, round 1 of at most 2. Stopped at 86 of 90 minutes and 1.28M of 2M tokens (`reports/2026-11-ahangama-01/run.md`).

## Before anything else, Alon decides

1. Budget: recommended 10M tokens and 600 minutes, to reach the mockup pick.
2. Ruling on the hotel's own verbatim sentences against the review's "no triads, no padding" (`sites/the-sandhya/copy/review.md`). Without a ruling, round 2 repeats the voice result.
3. Whether testimonials may be excerpted with a visible ellipsis. Default: stay at 2.

## Copy round 2

- Copywriter: the 4 unsourced lines, the breakfast line (drops "for two adults"), the 2 duplicate facts.
- Humanizer: the 5 third-person lines (`stayInfo.note`, `amenities[6].note`, `amenities[7].note`, `priceList[0].note`).

## Do not lose

- Positioning (Alon): a beachfront boutique hotel, not a surf stay. The site lists surf lessons and board hire; who runs them is unknown.
- Never: "Michelin Key" or any Michelin distinction; the untraced press quotes, including both Wallpaper* quotes on the hotel's site (one fragment from the real Wallpaper* page is fine); aggregator rates in `rooms[]`; a WhatsApp claim; Kabalana captions on the `/locale` surf, stilt-fisher and aerial shots.
- No usable video: the first screen leads with a photograph unless someone finds reels on Instagram.
- A person must still open the Cloudbeds engine and its `?rid=` links in a real browser, and read Kayak's 9.4 from 159 on the page before go-live.
- `tools/funnel.mjs` cannot see an `<a>` with no `href`. A build needs a real link so the critic's tool counts it. Worth a proposal.
- `dossier.json` still says picked dates are untested; the audit settled that (dates reach the URL, adults count is never sent).

## This worktree

`/Users/alonlavi/oneshot/.claude/worktrees/the-sandhya`. `dossier/mutag-meitiv/assets` is deliberately unlinked here so the regenerated Mutag screenshots stay out of these commits. Do not re-run `tools/setup.sh` here: its recipes overwrite the shared store.
