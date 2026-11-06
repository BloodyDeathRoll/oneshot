# humanizer notes: the-sandhya, en

Humanizer 0.2.1, 2026-11-06, run `2026-11-ahangama-01`, `mode: test`. Input: copywriter 0.5.0 round 1, kept unchanged as `en.draft.json`.

## How this pass was scoped

Most of this page is the hotel's own prose, and base.md says the owner is the author and asks for the owner's register. So there are two rules here, and the difference between them is deliberate:

- **Copy the copywriter wrote** (`closing`, `spot`, notes, the room-kit paragraph) got a normal pass.
- **The owner's sentences** stayed word for word, with four exceptions: a word on the tell list that could go without touching a fact (2), a verb on the tell list (1), and a grammar slip (1). I did not make the owner's prose plainer than the owner writes. It is ornate on purpose ("cotton candy-clouded sky", "beach bunnies", "what your tummy desires"), and that is the voice a nine-room hotel would recognise as its own.

## What changed (nine lines)

| Field | Draft | Now | Why |
|---|---|---|---|
| `spot` | "Kabalana Beach: a mile long, white sandy beach …" | "Kabalana is a mile long, white sandy beach …" | Tell 10, a keyword label with a colon in front of the owner's words. "Beach" no longer comes twice |
| `closing` | "… booking page, or call or email us first with any question." | "… booking page. If you have a question first, call or email us." | "or call or email" stumbled aloud. Long then short. Same two actions, in the order `closing_intent` gives |
| `priceList[0].note` | "From this price, plus “++” as the hotel publishes it." | "The hotel publishes this as a “from” price, plus “++”." | "From this price" read as a translation. "From", "++" and the date are all still there |
| `rooms[3].note` | "… top floor: living area, walk-in wardrobe, soaking tub, ocean-view balconies, 55-inch TV." | "… top floor, with a living area, walk-in wardrobe, soaking tub, ocean-view balconies and a 55-inch TV." | Tell 10, the colon reflex. Same five items |
| Rooms ¶3 | One sentence of thirteen items | Three sentences, the last a fragment ("High speed WiFi too, …") | Tell 2. "Every room" carries through as "Each one also has", so no item loses its scope. Same items, same order |
| Looking after ¶1 | "the vibrant local community" | "the local community" | Tell 3, by name. The block was already the copywriter's recast |
| Exclusive ¶1 | "nestled in a secluded nook" | "in a secluded nook" | Tell 3, by name. "Secluded nook" is the fact and stays |
| Kabalana ¶1 | "a consistent swell has nurtured" | "a consistent swell have nurtured" | Grammar, the subject is three things. Same footing as the spelling fixes in audit F15. Not a voice change |
| Kabalana ¶3 S1 | "Discover amazing surf points, … at the nearby beaches of …" | "The nearby beaches of … have amazing surf points, …" | Tell 5. Same five places, same three things, and "amazing" and "dizzying" stay |

`en.json` also gains `humanizer_version`, as the other sites have. `sources.md` is updated on the rows above; no fact moved between fields, so its "each fact once" list stands.

## Patterns found, and how often

Counted over everything except testimonials and data fields.

| Pattern | Found | Fixed | Left |
|---|---|---|---|
| Colon label or colon list (tell 10) | 6 | 2 | 4, the room booking labels, see below |
| Tell-list padding words (tell 3) | 4 | 2 | "Elevated" and "Whether", see below |
| Marketing verb (tell 5) | 1 | 1 | 0 |
| One overlong even sentence (tell 2) | 1 | 1 | 0 |
| Triads (tell 1) | 8 | 0 | 8, all the owner's, see below |
| Em dashes | 0 | | |

Fences checked after the edit: testimonials, `ratings`, `contact`, `bookingLinks`, `amenities`, `stayInfo` and `socialLinks` are byte-identical to the draft, and the set of numbers across the file is identical. No pool length, no Michelin, no untraced press quote, no nightly price, no WhatsApp, no claim about who runs the surf lessons. The tagline still says beachfront boutique hotel, and no surf wording was added.

## Left alone on purpose

For the copy reviewer: these will show up in a voice audit. They are the owner's and they were kept for that reason, not missed.

- **"Elevated Comfort Food"** (Dining ¶1). The name of the brief, capitalised, and it is `dining.concept`. Not the verb the tell list means.
- **"Whether you are enjoying the sunshine …"** (intro ¶3). Three places leading to the owner's best line, "the sea is always your view". It is not the "beginner or experienced" hedge, and any form without it either loses a place or ends in a colon slogan.
- **The eight triads**: "understated design, thoughtful form and practical function"; "warm, kind, attentive"; "orange, pink and blue"; "surfers, families, and digital nomads"; "Pristine sand, stunning sunsets and a consistent swell"; "surf points, whale-watching boat rides and … dining options"; the national parks, forest and waterfalls; and the three-place sentence above. Most carry facts, so cutting one item would lose something (hard constraint 2).
- **"the epitome of quiet elegance, design excellence, thoughtful detail and home comforts"** (Rooms ¶1). The most brochure-like line on the page, verbatim. If the reviewer sends one sentence back, I expect this one. It asserts nothing checkable, so it is a voice call for the owner or Alon, not a fact problem.
- **The owner's repeated words.** "array" four times (Dining ¶1, ¶2, Kabalana ¶2, ¶3), "thoughtful" three times, "eclectic" and "stunning" twice each. A habit a real writer has. Random synonyms are forbidden anyway.
- **`bookingLinks[1–4]`, "Studio King: check live dates".** A colon, but on a button, and the copywriter chose the wording so that it does not promise `?rid=` preselects the room, which is unverified. "Check live dates for the Studio King" would promise more.
- **Amenity labels** such as "Celebratory arrangements" and "Tours and activities assistance". Category words, but they are the hotel's own list.
- **The tagline.** Plain what and where. Nothing to fix.

The honest limits stay and are the plainest lines on the page: `stayInfo.note`, the two "ask who runs them" amenity notes, and the train station at 1.4 km.

## Stayed clumsy: needs the owner

Fixing these would take a fact I do not have, or would rewrite what the owner wrote.

1. **The pool** (intro ¶4). "our swimming pool" is flat next to the rest of that sentence because the 30 m is held back. Once the owner settles 30 m against 15 m, it goes back in.
2. **"++" on the Exclusive Use price.** The note can only say the hotel publishes it, because no source says what "++" adds.
3. **The triple in the Studio King** (Rooms ¶4). "with a supplement" has no amount, and only this room's text says it, though the engine lists a maximum of 3 for all four rooms.
4. **`stayInfo.note`.** Sends the reader to ask about the minimum age and the check-in time. It goes once the owner settles both.
5. **"Yoga and surf lessons" and "Surfboard hire" notes.** Awkward for a luxury hotel's page, and they stay awkward until the owner says who runs them and what they cost.
6. **"We strive for sustainable tourism."** (Looking after ¶1). Sits bare since the shipping-container clause was cut for the pool contradiction. The owner may want to say more.
7. **Two owner sentences that do not parse cleanly**, kept verbatim for the owner to decide: "Designed to feel like an exclusive private beach house …, your relaxation starts …" (intro ¶1, it is the house that is designed, not the relaxation), and "From our signature Sri Lankan rice & curry, … we truly believe …" (Dining ¶2, the "From" never lands).
