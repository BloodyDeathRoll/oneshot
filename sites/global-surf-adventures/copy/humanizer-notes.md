# humanizer notes — global-surf-adventures · en

## Pass of 2026-09-28 · humanizer 0.2.0 · run 2026-09-globalsurf-02

Input: copywriter 0.3.3 draft, kept unchanged as `en.draft.json`. `en.json` rewritten in place; `humanizer_version` added (0.2.0). The draft was already plain, so this is a light pass: four sentences in three blocks. Fact set identical, field by field. No quote, heading, data field, `tagline`, `closing`, `featureLine`, `spot`, `stayInfo`, `contact.*`, `bookingLinks[]` or `lessons[]` touched.

Left alone on purpose:
- **Owner prose** stays the owner's: intro ¶1 ("We are surfing obsessed…"), `featureLine`, the day block, rooms ¶1 S2 ("…and, of course, a board rack") and rooms ¶2.
- **The price block ("One price, three levels")** is untouched. Its wording on the base price, the Saturday start ("start on a Saturday", never "every Saturday"), the room supplement and the inclusions is narrow on purpose (`sources.md` contradictions 1–2, Payment). Nothing about payment was added.

### Patterns found

- Symmetrical structure (1): all three level paragraphs opened the same way ("Level N – X is for …").
- Colon habit (1): rooms ¶1 S1.
- Awkward phrasing (1): "sits in the green of the jungle".
- No padding words, marketing verbs with no object or category nouns in the draft.

### Changes

1. **intro ¶2 S1.** "The lodge sits in the green of the jungle, on the beach at Kabalana." → "The lodge is on the beach at Kabalana, in the green of the jungle." Same two facts. `sources.md` row updated to the new text.
2. **"Pick your level" ¶1–¶3.** The openings now differ:
   - L1: "…is for your first time on a board. You don't need any surfing experience." → "Level 1 – Fomies is your first time on a board, and you don't need any surfing experience."
   - L2: "…is for surfers who can stand up but still struggle to paddle out to the line-up and catch green waves." → "Level 2 – Rollers is for when you can stand up, but paddling out to the line-up and catching green waves is still a struggle."
   - L3: "…is for surfers who are already carving and want to sharpen their skills." → "Level 3 – Riders: you're already carving, and you want to sharpen your skills."
   Second sentences (soft boards, breaks, Galle to Matara) and ¶4 (Freestylers) are unchanged.
3. **rooms ¶1 S1.** "There are just twelve rooms, which keeps a stay here personal: part of one big happy family." → "There are just twelve rooms. That keeps a stay here personal, part of one big happy family."

`sources.md`: only the intro ¶2 S1 row quotes the text word for word; it now matches. The other rows are summaries and are still accurate.

### For the copy editor (not changed)

- "In their reviews they write about the pool area, the open-air bathroom and the breakfast bowls" is a list of three, but each item comes from a quote (Fanny). Rewording it to "keep mentioning" would claim how often, so it stays.
- "Between sessions" lists yoga, meditation and sound healing because those are the three sessions the source gives. A place ("in the yoga chalet") or a frequency would read better, but the dossier has neither (`contradictions[4]`).

### Could not fix without a fact

- The page has no honest limit other than the price caveat. The obvious ones would be season, reply time and the distance to the named breaks, and none of them is in the dossier. This goes to the owner.

## Round 2 · 2026-09-28 · humanizer 0.2.0 · after copywriter round 2

Input: `en.json` with the copywriter's fixes for copyeditor round 1 (`review.md` F1–F7, D1, V1). I re-read the whole file once. Facts unchanged. The location wording (intro ¶2 S1, `spot`), the Freestylers wording (intro ¶2 S2, levels ¶4, `lessons[3].includes`) and the day schedule (day ¶1) are narrow on purpose, so I left them as they arrived.

### Changes

1. **levels ¶1 S1.** "Level 1 – Fomies is for your first time on a board: you don't need any surfing experience." → "Level 1 – Fomies is for your first time on a board, no surfing experience needed." With ¶3's "Level 3 – Riders: …" the block had two colons, which is the colon habit. The fact and V1's fix ("is *for* your first time") are kept. I updated the `sources.md` levels ¶1 quote to match.

### Left as is

- intro ¶2 S1 "The lodge sits in the green of the jungle." It is short after F1's cut, but plain. Any reword would bring location back into it.
- day ¶1 "Head out with your group for a morning surf.": it reads naturally and says nothing about what comes first.
- levels ¶4, `spot`, rooms block: these have no tells.

### Could not fix without a fact

Same as round 1: no honest limit on the page except the price caveat (season, reply time, distance to the breaks). Owner item.
