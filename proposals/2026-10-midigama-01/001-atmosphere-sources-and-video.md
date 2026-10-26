# 001 — Atmosphere media: more sources than Wikimedia Commons, and atmosphere video

**Status:** awaiting Shahar · a change to the PLAN.md image-rights decision (line 392, "Amended 2026-09-20") and to `tools/fetch-atmosphere.mjs`; not a custom.md proposal
**Run:** 2026-10-midigama-01 · **Raised:** 2026-10-27 by Alon (written up by Claude)

## Why

Alon picked Cheeky Monkey's unique mockup and asked for more of the place on the page: *"i want to use video like we did in the "global surf" project, or maybe big photos of the beach and surf in midigama, from surf spots such as "lazy left" "lazy right" and "rams" all in midigama sri lanka"*.

Neither is possible under today's rule:

- **The business's own media has no water.** Cheeky Monkey's 156 business-owned photos are the shop, the rooms and the roof; its only usable video (vid-009) is a vertical reel inside the shop. The best footage of the place is a 2018 drone film of the breaks, uploaded by a friend of the owner, so its licence is unknown (harvester, 2026-10-26). In a test run there is no owner to ask.
- **Atmosphere is Wikimedia Commons only** (PLAN.md line 392, `tools/fetch-atmosphere.mjs`). A full search on 2026-10-27 (queries for Midigama, its breaks and spelling variants, plus a geosearch within 1.5 km of the village and of the business) found **one** verifiable Midigama photograph (stock-003, CC BY-SA 3.0, hazy, names no break). Nothing of Lazy Left, Lazy Right or Ram's. Commons has no `Category:Midigama`, and the Wikipedia articles carry no images. 21 files were rejected, mostly because "Ram's Right" matched Dodge Ram trucks. Two strong sunset photos are filed "Midigama" by filename only, with no coordinates, and one sits under "Unidentified locations in Sri Lanka".
- **Video isn't covered at all.** The 2026-09-20 amendment speaks of photography. Commons has no free video of Midigama.

Global Surf could lead with video because the business filmed its own. Most small businesses we target haven't, and those businesses are exactly who we pitch. The rule as it stands means their site can't show the wave they are next to.

## Proposed

Keep both hard lines unchanged: **never presented as the business**, and **never presented as a place it is not** (`place` / `place_ok`, `tools/check-places.mjs`). Widen only where atmosphere may come from:

1. **More photo sources, same place discipline.** Allow Unsplash and Pexels (their licences permit commercial use without attribution; we credit anyway) next to Commons. A file counts as `local` only with evidence a reviewer can open: GPS in the EXIF or the page, or a location the photographer gives *and* a visible match (the break, the headland, the road). A file with neither is `neutral` only if it shows open sea or sky with no landmark, as today. Every file is still looked at and described before use.
2. **Atmosphere video, same rules.** Allow freely-licensed video (Pexels, Commons; CC0 / CC BY / the Pexels licence; BY-SA display-only as for photos) of the business's own locality, through `tools/fetch-video.mjs` with `--license stock` and a `place` / `place_ok` entry. It may carry the hero only when the business has no usable video of its own. It is never cut together with the business's footage so as to read as theirs.
3. **Ask in live mode, flag in test mode.** In a live run the harvester asks the owner for footage and photos of the place (the drone film here). In a test run, a missing water shot is a `gaps[]` pitch point: "your site can't show the wave you're next to".

## What it costs

- `tools/fetch-atmosphere.mjs` gains an Unsplash/Pexels source (both have public APIs; a key would be needed, kept in `~/.oneshot/`, never in git), and `tools/fetch-video.mjs` gains the `stock` licence with the `place` fields.
- `tools/check-places.mjs` reads video entries too.
- PLAN.md line 392, designer base.md constraint 2 and creative-director base.md ("Atmosphere available") are updated to match, each with a version bump.

## Risk

The second hard line was written after a real mistake: Hikkaduwa and Weligama shown as Ahangama. Stock sites geotag less reliably than Commons, and "Midigama" in a title proves nothing. That is why `local` here needs evidence, not a caption, and why a file without it can only be open sea or sky.

## Decision

Shahar: approve all, approve some (e.g. 1 and 3 but not video), or reject. Cheeky Monkey isn't waiting on this: the unique mockup is getting the one Commons photo, shown whole and credited, plus the business's own sea and roof photos.
