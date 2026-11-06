# 002 — Atmosphere media: more sources than Wikimedia Commons, and atmosphere video

**Status:** awaiting Shahar. Merging this file only files the proposal; nothing is approved or applied until a `proposal:approved` ledger line records the decision (`docs/ledger.md`, gate d).
**Changes:** the PLAN.md §9 image-rights decision, `rubric.md`, `tools/fetch-atmosphere.mjs`, `tools/fetch-video.mjs`, `tools/check-places.mjs`, and the designer and creative-director `base.md`. Not a custom.md proposal.
**Run:** 2026-10-midigama-01 · **Raised:** 2026-10-27 by Alon (written up by Claude) · **Revised:** 2026-11-06 after review on PR #44 (was numbered 001; that number is now the promo-footage proposal)

## Why

Alon picked Cheeky Monkey's unique mockup and asked for more of the place on the page: *"i want to use video like we did in the "global surf" project, or maybe big photos of the beach and surf in midigama, from surf spots such as "lazy left" "lazy right" and "rams" all in midigama sri lanka"*.

Neither was possible under the rule as written on 2026-10-27:

- **The business's own media has no water, apart from one film of unconfirmed rights.** Cheeky Monkey's 156 business-owned photos are the shop, the rooms and the roof, and vid-009 is a vertical reel inside the shop. The best footage of the place is vid-001, a 2018 drone film whose licence is unknown.
- **Atmosphere is Wikimedia Commons only** (PLAN.md §9, `tools/fetch-atmosphere.mjs`). A full search on 2026-10-27 (queries for Midigama, its breaks and spelling variants, plus a geosearch within 1.5 km of the village and of the business) found **one** verifiable Midigama photograph (stock-003, CC BY-SA 3.0, hazy, names no break). Nothing of Lazy Left, Lazy Right or Ram's. Commons has no `Category:Midigama`, and the Wikipedia articles carry no images. 21 files were rejected, mostly because "Ram's Right" matched Dodge Ram trucks. Two strong sunset photos are filed "Midigama" by filename only, with no coordinates, and one sits under "Unidentified locations in Sri Lanka".
- **Video isn't covered at all.** The 2026-09-20 amendment speaks of photography. Commons has no free video of Midigama.

Global Surf could lead with video because the business filmed its own. Most small businesses we target haven't, and those businesses are exactly who we pitch. The rule as it stands means their site can't show the wave they are next to.

**Since then:** Cheeky Monkey's hero became a loop cut from vid-001, under Alon's waiver for the workers.dev preview only (proposal 001). That solved one preview of one business whose own film happened to exist. It doesn't help a business with no film, and it doesn't carry past the preview. Cheeky Monkey isn't waiting on this proposal.

## Proposed

Keep both hard lines unchanged: **never presented as the business**, and **never presented as a place it is not** (`place` / `place_ok`, `tools/check-places.mjs`). Widen only where atmosphere may come from.

Each item can be approved alone, except that **item 2 needs item 1's evidence and people rules**, so "2 without 1" is not an option. Item 3 stands alone.

### 1. More photo sources, same place discipline

Add two sources next to Commons, under a new, named licence category:

| Source | How we get it | Licence recorded | What it obliges |
|---|---|---|---|
| Pexels | API, through `tools/fetch-atmosphere.mjs` | Pexels licence | A prominent link to Pexels and a photographer credit, in the page's credit line. No implied endorsement by people shown |
| Unsplash | **By hand from the website, never through the API**: the operator saves the file and records its page URL | Unsplash licence | We credit anyway, though the licence doesn't require it |

Unsplash stays out of the tool because its API terms require hotlinking the image URLs and sending download notices, and call a failure a material breach. Our media is stored in `dossier/<slug>/stock/`, optimised, and served from a static build that must also work as a zip on any host, so hotlinking can't work.

Every new entry records `source` (`pexels`, `unsplash`, `commons`), `license_name`, `license_url`, `source_url` and `fetched_at`, because custom licences can change and the dossier should show what applied on the day. Only an entry with no `source` is a Commons entry from before this change.

**Evidence.** New field `place_evidence`, required on every `local` entry with a `source` and on every video:

- `gps`: coordinates from the EXIF or the source page, or
- `location_and_landmark`: a location the photographer gives, the URL where they give it, *and* a note on the visible match (the break, the headland, the road).

`tools/check-places.mjs` fails a `local` entry without it. This is the part that does the work: today line 92 accepts `local` when a locality name appears in the credit or `place` text, so typing "Midigama" there is enough to pass, and the Pexels API has no location field to lean on. A file with no evidence can only be `neutral`: open sea or sky with no landmark, as today. Entries with no `source` are not re-checked, so builds that already passed stay valid.

**People.** No identifiable person in any new atmosphere photo or video, from any source. Neither licence mentions model releases, Pexels forbids implying endorsement by people shown, and a surfer on a hotel's hero reads as that hotel's guest, which is the first hard line. A distant surfer nobody could recognise is fine. New field `people`: `none` or `distant`, written by whoever looks at the file, required on every entry with a `source` and every video, and `tools/check-places.mjs` fails an entry without it. No tool can see a person, so this rests on the look-and-describe step below; the field makes that step leave a record.

Every file is still looked at and described before use.

### 2. Atmosphere video, same rules

Allow video of the business's own locality from Pexels (its licence covers video) and Commons, under the Pexels licence, CC0 or CC BY, through `tools/fetch-video.mjs` with `--license stock` and the same `place`, `place_ok`, `place_evidence`, `people` and licence fields.

- **Stored as atmosphere, never as the business's video.** A stock clip goes in `dossier/<slug>/stock/index.json` with `kind: "video"` and its files under `dossier/<slug>/stock/video/`, never in `dossier.videos[]` or `assets/`. So `usable` (set in `tools/fetch-video.mjs` to `license === 'business-owned'`) and the rule "if there is usable video, at least two of the three concepts open on it" keep meaning the business's own video, and a stock clip can't trigger them. On a page its files are named by stock id (`dist/video/stock-NNN-*`), so `tools/check-places.mjs` finds its use the way it finds a photo's: the id in `dist/index.html` or a filename under `dist/`.

- **CC BY-SA video is excluded.** Display-only means shown whole and never re-saved or cropped, and a web hero is transcoded and shown with `object-fit: cover`, which is both.
- **It may carry the hero only when none of the business's own clips can carry a first screen.** That is the creative director's judgment at 4d, not the `usable` field: a clip can be `usable: true` and still be unable to open a page (Cheeky Monkey's vid-009 is vertical and shot inside the shop). The concept names each of the business's clips and says why it can't carry the first screen, in `concepts.md`, where the critic can check it. This is the "third says why not" the existing rule already asks for, applied to every concept that opens on atmosphere video.
- **It never qualifies for a scroll set-piece.** That line in `agents/creative-director/base.md` stands.
- **It is never cut together with the business's footage so as to read as theirs.**

### 3. Ask in live mode, flag in test mode

- **Live run:** the harvester drafts a request to the owner for footage and photos of the place, and **an operator sends it**, or folds it into the pitch at gate c. This is contact with a prospect, so it never goes out unattended.
- **Test run:** a missing water shot is a `gaps[]` entry with `pitch_point: true`: "your site can't show the wave you're next to". Not blocking.

## Exact wording

Each block is labelled with the item it belongs to, so approving an item takes only its blocks. Version bumps and CHANGELOG entries come with the change.

**PLAN.md §9, appended to the "Image rights" bullet.**

Item 1:

> **Amended (Shahar, on approval): besides Commons under the licences above, atmosphere photography may also come from Pexels and from Unsplash (website download only, never its API, because the API requires hotlinking), under those sites' own licences, recorded per file with licence URL, source URL and fetch date. The earlier "Wikimedia Commons, CC0 and CC BY only" limit no longer applies to these two sources. A `local` entry from them needs `place_evidence`; without it a file can only be `neutral`. No identifiable person appears in new atmosphere, recorded per file as `people`. Both hard lines stand.**

Item 2, after item 1's text:

> **Atmosphere video is allowed from Pexels and Commons under the Pexels licence, CC0 or CC BY, never BY-SA, stored under `stock/`, and always with `place_evidence` and `people`. It may carry a hero only when the concept says why none of the business's own clips can, and it is never cut in with the business's footage.**

**`rubric.md` line 44, replacing "under a licence the policy excludes (share-alike, NC, ND)".**

Item 1:

> under a licence PLAN.md §9 does not allow for that use (NC and ND never; share-alike only for a photograph shown whole), or new atmosphere shows an identifiable person

Item 2 also changes "A freely-licensed atmosphere image" to "A freely-licensed atmosphere image or video" and adds after "shown whole": "and never for video".

Item 1 also settles a conflict flagged on PR #68: the rubric excludes BY-SA while PLAN §9 allows it for display only.

**`agents/designer/base.md`, constraint 2, after the sentence ending "treated as one."**

Item 1:

> No identifiable person appears in new atmosphere; each entry records `people`.

Item 2, after item 1's text:

> Atmosphere video follows the same rules (PLAN.md §9): it needs `place_evidence`, it is never BY-SA, it carries a hero only when the concept says why none of the business's own clips can, and it is never cut in with the business's footage.

**`agents/creative-director/base.md`, "Atmosphere available", replacing "`tools/fetch-atmosphere.mjs` will fetch more from Wikimedia Commons under CC0 and CC BY."**

Item 1:

> `tools/fetch-atmosphere.mjs` will fetch more from Wikimedia Commons (CC0, CC BY) and Pexels; an operator may add Unsplash files by hand.

Item 2, after item 1's text:

> Atmosphere video (`stock/`, `kind: "video"`) may open a concept only when `concepts.md` names each of the business's own clips and says why it can't carry the first screen.

**`agents/harvester/base.md`, constraint 8, appended.**

Item 3:

> A missing shot of the water or the place is a `gaps[]` entry with `pitch_point: true`. In `mode: live`, also draft a request to the owner for footage of the place; an operator sends it, you never do.

## What it costs

- `tools/fetch-atmosphere.mjs` gains a Pexels source. The API key is kept in `~/.oneshot/`, never in git. The default limit is 200 requests an hour and 20,000 a month, far above what we need.
- `tools/fetch-video.mjs` gains the `stock` licence (today it accepts only `business-owned` and `unknown`). With it, the tool writes to `stock/` instead of `assets/video/`, with the place and licence fields.
- `tools/check-places.mjs` reads `source`, `place_evidence` and `people`, and finds video use by stock id under `dist/`.
- A site using Pexels media carries a visible link to Pexels in its credit line.
- Unsplash files are added by hand, which takes an operator's time.

## Risk

The second hard line was written after a real mistake: Hikkaduwa and Weligama shown as Ahangama. Stock sites are a weaker source of location than Commons, and "Midigama" in a title proves nothing. That is why `local` here needs evidence, not a caption, and why a file without it can only be open sea or sky. Expect few files to qualify as `local` for a village this small: this may widen `neutral` water shots more than it finds Lazy Left.

Licence terms were read on 2026-11-06 from `unsplash.com/license`, `unsplash.com/api-terms`, `unsplash.com/documentation`, `pexels.com/license` and `pexels.com/api/documentation`. Unsplash's help-centre guidelines weren't read, and whether website downloads sit fully outside its API terms is our reading of those pages. None of this is legal advice.

## Decision

Shahar: approve all, approve some (1, 1 and 2, 1 and 3, or 3), or reject. Record it as a `proposal:approved` or `proposal:rejected` ledger line.
