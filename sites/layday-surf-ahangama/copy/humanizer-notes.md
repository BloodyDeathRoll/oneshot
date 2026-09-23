# humanizer notes — layday-surf-ahangama · en

## 2026-09-23 · humanizer 0.2.0 · over copywriter 0.3.0 draft (en.draft.json)

Only `copyBlocks[].body` changed, plus `humanizer_version` → 0.2.0. Headings, tagline, spot, rooms, stayInfo, amenities, ratings, testimonials, contact (address included) and bookingLinks are byte-identical to the draft (checked by diff). Sentence counts per paragraph kept, so `copy/sources.md` still lines up paragraph by paragraph and sentence by sentence; no fact moved between paragraphs.

Patterns found: choppy fragments left by clause cuts (4), "in one guest's words" tacked on after the quote (2), a heading restated as the first sentence (1), list-shaped sentences with no verb (2), a three-quote triad in one colon list (1).

| Block | Change | Why |
|---|---|---|
| intro ¶1 | "Small and new, and Kabalana Beach…" → "Layday is small and new, with Kabalana Beach a few steps away." / "One dorm, a garden, and the family who own it." → "It is one dorm and a garden, owned by a family." | Subjectless fragment and a triad. Same facts: small, new, few steps, one dorm, garden, family-owned. |
| intro ¶2 | "It is quiet: "…", in one guest's words." → "It is quiet, too. One guest called it "…"." | Attribution moved in front of the quote; claim unchanged. |
| about (dorm) ¶1 | "There is a single dormitory here. Guests write about how clean it is: "super clean", "very clean", "absolutely spotless"." → "There is only the one dormitory. One guest wrote "super clean", another "very clean", a third "absolutely spotless"." | Heading was repeated word for word; colon triad broken up. Attribution now names each quote as one guest's — no count or frequency added ("three guests" avoided on purpose). |
| about (dorm) ¶2 | Two sentences → one: "On Hostelworld it scores 10 out of 10 in every category (…), though that is from ten reviews." | Same seven categories, same ten reviews; the review count now reads as the honest limit it is. |
| about (kept) ¶1 | "Housekeeping is daily." → "There is housekeeping every day." / quote attribution moved in front / "stayed longer than they meant to; one was…" → "stayed on longer than they had planned, and one was…" | Rhythm. Still two guests, still one night → a week, quote verbatim. |
| offer ¶1 S2 | "There is a shared kitchen with…, plus a dining area, a terrace and a garden." → "The shared kitchen has…, and there is a dining area as well as the terrace and the garden." | Less list-like. Did not write "eat outside on the terrace or in the garden": the dossier's "garden and terrace with outdoor dining" doesn't say both are for eating. |
| offer ¶2 | "Rates move with the dates — the booking links show…" → "Rates change with the dates. The booking links show…" | Em-dash reflex removed. |
| info (door) | "A guest found…" → "One guest found…"; "There is a large black gate — open it." → "You will come to a large black gate; open it."; "…a wooden platform, with a door…" → "…a wooden platform with a door…" | Reads as directions rather than bullet fragments. Route order and the ambiguity of "to the right of the house" kept as the guest wrote it. |
| info (practical) ¶1 | "Check in between…, check out by…" → "Check-in is between…, and check-out is by…"; the three short facts reordered into two sentences | Choppy. Same facts: times, no credit cards, taxes included, non-smoking. Did not add "bring cash" (no source for payment method). |
| info (practical) ¶2 | Verbless list → "WiFi is free, and so is the private parking. There is laundry, daily housekeeping, bicycles to rent and an airport shuttle, and pets can come at no extra charge." | Same six facilities and pets; laundry still not called free. |

## Left as is
- Tagline (owner's own words), spot line, rooms note, stayInfo.note and amenity labels: data-shaped fields, not prose.
- All testimonials verbatim.

## Could not fix without a fact
- Intro is thin on concrete nouns (no named room detail, view or neighbourhood feature). The dossier has none the copy may use in the business's voice; ask the owner for one or two.

## Noticed, not changed
- `copywriter_version` in en.json is 0.3.0; run.yaml pins copywriter 0.3.1.
