# Overview, round 3, option A: notes

Built from Shahar's own words in the round-3 amendment of `dashboard/BRIEF-overview-03.md` (option A), on the
round-2 code: the top from `r2/b`, the site table and "Also waiting on you" list from `r2/a`. `index.html` is
written by `node dashboard/overview-03/r3/a/build.mjs` (from the repo root; run `node dashboard/data.mjs` first)
from `template.html`. The build embeds the Overview's fields from `dashboard/data.json` (`generated_at`
2026-10-05T20:51:09Z), the real drafts from `sites/<slug>/pitch/` (round-1 A's parser, unchanged) and Manrope as
base64. Thumbnails are referenced at `../../../mockups/soft-cards/dist/img/<slug>.jpg`; nothing is copied.

## His points, and how each is met

| His words (option A) | On the page |
|---|---|
| "Use option B's top section (revenue/expenses + 5 others)" | r2/b's white band, same surfaces, hairlines and money type ($0 at 48 px, "in total", "This month", the how-to-record hint). |
| "Make the 5 others bigger" | Values 32 px / 600 (r2/b: 16 px), labels above them, Stripe metric style. 28 px below 1200, 24 px on a phone. |
| "keep the structure: Three columns (revenue/expenses/others)" | One band in three equal columns: Revenues \| Expenses \| counts, hairline between each. |
| "the 'others' can be arranged in two inner columns (3 rows)" | 2 × 3 grid in reading order: Being built, Ready to send / Pitched, Replies / Clients, (empty). The sixth cell is left empty. Ready to send 4 is a button to the list; other non-zero counts open their view. |
| "Sites & Also waiting for you on the same row, sites as the lead" | One row: Sites (wide) \| Also waiting on you (360 px at 1600+, 280 px below). Below 1400 px the list keeps the full width and "Also waiting on you" goes under it, with its items side by side. |
| "Remove handoffs" | No Handoffs block anywhere. After Hand off, the popup shows the request in plain words with the full prompt collapsed, and the row gets a quiet "Handed off to Alon" line that reopens it (Copy prompt again). A handoff *to* you would be listed in "Also waiting on you", as it counts in Needs you. |
| "WAY bigger thumbs for the websites" | 224×140 at 1920, 210×131 at 1440, 216×135 at 1024 (r2/b: 110×68, r2/a: 62×38). The headline of each site is readable ("Five minutes from Kabalana Beach", "A two-minute walk from Kabalana"). 136×85 on a phone. |
| "two rows for status/website/messages column" | Status (badge / age), Website (Preview website / Pitch) and Messages (the two Suggested buttons) are each two rows, aligned on the same two lines across the row. Update status / Hand off are the actions: a two-row column at 1920; at 1440 and 1024 they sit at the right end of the name line. |

Held from the brief: full width, sidebar order Overview, Needs you, Ledger, Pipeline, Sites, Agents, Decisions;
the locked purple; Manrope embedded; exact CTA labels; popups over `rgba(255,255,255,.8)`; waiting count 7
everywhere (sidebar, sentence, 4 sites + 3); nothing under 14 px; skip link; visible focus ring.

## Data, as embedded

- Revenues and Expenses $0, no entries. Counts with the live dashboard's rules: Being built 0, Ready to send 4,
  Pitched 0, Replies 0, Clients 0.
- 4 sites (`packaged`), all "by Shahar"; age from `gates[].since`, computed in the browser. The shots (6 Oct,
  00:55 local, 5 Oct 21:55 UTC) read KA and Layday 10 days, Lavish 7, Global Surf "since today"; the numbers grow
  as time passes.
- Global Surf's Pitch is "not online yet" (brief §3); the other three link to `pitch.proposal_url`.
- Drafts: Global Surf email + WhatsApp; the other three WhatsApp + in-person script. Global Surf's email shows
  the warning for its "[LINK TO THE PROPOSAL PAGE]" gap (it is in the real draft).
- Three pending suggested agent tweaks (`proposals[]`), titles verbatim; "Designer (your custom.md)" is shown as
  "Designer (your own notes)", no file name.
- Waiting on you = 7 = 4 sites ready + 3 tweaks (+ 0 other gates, 0 handoffs to Shahar). After Save as pitched:
  3 ready + 1 waiting for an answer + 3 = 7, counts Ready 3 · Pitched 1, list "3 ready to send · 1 pitched";
  the Sites count stays 4 = the rows shown (the round-2 critic's B deduction).
- Fixed from r2/b: the Update status date defaults to the local day (r2/b used the UTC day: "Pitched 5 Oct" on
  6 Oct).

## look-log

Shots (not in the repo): `scratchpad/r3-a/round-N/` at 1920×1080, 1440×1000, 1024×800, 390×844, first screen and
full page, with a popup open at each width: Hand off typed, submitted, Copy prompt read back, Done (1920);
Suggested WhatsApp + Copy read back + Esc (1440); Suggested email + Esc (1024); Update status as a bottom sheet,
Save as pitched (390). Overflow checked at 20 widths from 1920 to 360.

**Round 1.** One table form for all widths with a name column. What was worse:
1. **1440 and 1024 overflowed**: the table needs ~1000 px, the Sites card had 764 / 848; Update status and Hand off
   were cut at the card edge.
2. **Band 287 px tall** at every width, the money hints 100 px below "This month".
3. **1920 rows 190 px** with a 238×149 thumb: 2.7 sites on the first screen.
4. Phone: Update status squeezed into a 34 px column.

**Round 2.** Changes: a container query on the list. At 1180 px of list width and up, the name is a column; below
it, the name gets a line of its own with Update status · Hand off at its right end, and the three two-row columns
sit under it. Thumb 224 px max, row padding 16. "Also waiting on you" 280 px below 1600 and under the list below
1400 (at 1366 the thumbnail had dropped to 144 px). Found the band's cause: the count value class `.kv` clashed
with the popup's `.kv` (12 px margin); renamed `.kn`, band now 233 px. What was still worse:
1. **Global Surf's "by Shahar" wrapped** to a second line at 1440 (the name line reserved 290 px for the actions).
2. Phone actions placed wrong (a `grid-row:auto` overrode the grid area).
3. 720–800 px overflowed by ~17 px.

**Round 3.** Changes: name line reserves 248 px and "by …" never wraps; phone actions back in their area;
the phone form starts at 700 px of list width and the 740 px form lets the thumbnail go to 128 px. Checked:
- `scrollWidth` = viewport and no element outside its card at 1920, 1680, 1600, 1536, 1440, 1366, 1300, 1281, 1280,
  1200, 1100, 1024, 900, 800, 721, 720, 600, 390, 360.
- Page height 1227 (1920), 1192 (1440), 1493 (1024), 2865 (390). Update status of all four sites on the first
  screen at 1920 (last at y 1055); three of four at 1440 (fourth at y 999, the row under the fold) and two at 1024.
- No text under 14 px; lowest contrast pair `#6B7280` on white, 4.83:1; no console errors or failed requests.
- Tab walk: skip link, sidebar, Ready to send 4, then per site Preview website, Pitch, Suggested…, Update status,
  Hand off, then Review ×3; every stop shows the ring. Esc, × and veil click close the popup; focus returns to the
  opener (and to the new Hand off button after a handoff).
- WhatsApp copy = 512 characters (the real draft); handoff Copy prompt = 436 characters, prompt collapsed.

## Not fixed, raised

- **The 1440 first screen holds three of four sites.** The bigger thumbnails are what he asked for; they make each
  row 164 px (r2/b: 95). The fourth row starts at y 979.
- **Tab order at 1440 / 1024**: Update status and Hand off are drawn on the name line, but they come after the
  Suggested buttons in the Tab order (the order is "send, then record", and matches the 1920 layout).
- **Two layouts of the row.** At 1920 the name is a column and the actions a two-row column; at 1440 and 1024 the
  name and actions share the top line. Same parts, same order of columns; the switch is at 1180 px of list width.
- **Phone length** 2865 px: four sites at ~380 px each.

## Blocking

None.
