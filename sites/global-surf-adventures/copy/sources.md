# copy sources — global-surf-adventures · en

Copywriter 0.3.3 · run 2026-09-globalsurf-02 (test) · 2026-09-28. Round 2 (2026-09-28): fixes for copyeditor round 1 (`review.md` F1–F7, D1, V1) applied to the humanised `en.json`; the rows below describe the round-2 text. Facts from `dossier/global-surf-adventures/dossier.json` only; `audit.json` `recommended` used for how to sell (labels, order, closing intent), never as a fact.

**Owner prose case.** The lodge pages carry owner-written English (`business.description`, `.experiences`, `.day_at_the_camp`, `.staying_with_us`, level descriptions in `offers[].description`). It is used, trimmed, where it works; the rest is written from facts. The site is the lodge's (Global Surf Lodge Kabalana), per `business.businessType_note`; the agency's other destinations are not on it (`other_destinations_gap`, schema gap).

Index keys: `reviews.quotes[n]` = 0 Maryam · 1 Fanny · 2 Myrthe · 3 Abigail · 4 Agustin · 5 Sara · 6 Hannah · 7 Erez (excluded) · 8 Dana · 9 Seagallas. `offers[n]` = 0 Level 1 · 1 Level 2 · 2 Level 3 · 3 Freestylers. `facilities[n]` as in the dossier.

## Engine prices are the value fields — and the engine is not a tiebreaker

`offers[0–2].price` (1466 USD per person, 7 nights) is the Bookinglayer engine's "Base price" (`offers[].source_url` = engine product pages, fetched 2026-09-28). The site publishes no price (`gaps[]` "offers[].price on the site"). Taking the engine's price as the value means:

1. **Package inclusions (`contradictions[2]`, site vs engine).** The price buys the engine's package, but the site's level pages list different items. `lessons[].includes` therefore carries **only items both lists agree on** (7 nights, 7 breakfasts, 5 dinners, 5 two-hour sessions — "guided" for L1/L2, "coached"/"with our professional coach" for L3 in both —, 5 theory lessons, equipment, transport to the spots, a cultural or nature excursion; water, coffee and tea in the price block). Items only one side lists, or that the two count differently, are left out **for every level**, so no level reads as lacking them: yoga ×5, free Wi-Fi, full-day surf trip (site only); Ayurvedic spa treatment (engine only); filmed/photographed sessions (L1 site "a filming and photography day" vs engine 2; L2 2/2; L3 site 5 vs engine 4); feedback / video-analysis sessions (L1 site 2 vs engine 1; L2 site 2 vs engine 1; L3 site 5 vs engine 3). Owner to confirm one list per package before go-live (audit F9).
2. **Room mix (`contradictions[3]`) — `rooms[]` left empty (round 2, F6).** The engine's room options (`rooms[2]` mixed dorm, `rooms[3]` shared twin) are date-dependent package options (`rooms[2–3].note`), and the site (`rooms[0]` "4 twin, 4 double/triple, 4 family rooms") and Booking.com (`rooms[1]`) list other rooms; none of the three is resolved. Showing any one list as the lodge's rooms would state one side of an open contradiction, so `rooms[]` is `[]`. The rooms block keeps only the uncontested twelve-room count and the room features. The price block says the room choice can add to the base price, without naming rooms or amounts. **Consequence:** `surf_camp`'s must-have "≥ 1 `rooms[]` row" (`schemas/business-types.md`) is now unmet in the copy — owner item (which rooms exist and which the packages book).

**Ruling applied (copyeditor round 1, ruling 3):** an engine value is used where it is the dossier's value field and no contradiction covers it (prices, and inclusions only where both lists agree). Where a `contradictions[]` entry is open, the engine is one more side, never the resolution: the Freestylers board (`contradictions[1]`) and the room mix (`contradictions[3]`) are no longer stated on either side. Engine product **names** ("Freestylers – B&B only") are used as names only.

## Fields

| Field | Copy | Rests on |
|---|---|---|
| `businessName` | "Global Surf Lodge Kabalana" | `business.name.value` (site, Booking, ISA page). Google's "Global Surf Lodge" (`.note`) not used |
| `businessType` | `surf_camp` | `businessType`, `test_mode_verdict.type` |
| `tagline` | "Surf weeks for all levels on Sri Lanka's south coast, a few steps from the ocean." (81/140) | "surf weeks": `offers[0–2]` weekly packages, `business.type` "Weekly Surf & Wellness Retreats". "all levels": `business.description_packages` "weekly retreats, available for all levels"; `business.description` "great surfing for all levels". "south coast of Sri Lanka": `business.description_packages`, `location.area_name`. "a few steps from the ocean": `business.description` "Just a few steps from the ocean", `location.distance_to_beach.value`. Written to sit over the video; repeats no word of `businessName` ("lodge" and "Kabalana" are left to the name) |
| `closing` | "Book the week for your level. Not sure which one fits? Ask us on WhatsApp first." (80/140) | `audit.recommended.closing_intent` (the task, not a fact). "week for your level": `offers[0–2]`, `booking.engine_products`. WhatsApp: `contact.whatsapp`, `booking.whatsapp` (bookingLinks[5]) |
| `featureLine` | "Footwear is discouraged. Chilling out is inescapable." (53/140) | `business.description` "a wild oasis where footwear is discouraged, chilling out is inescapable" — owner's words, split into two sentences |
| `spot` | "The lodge overlooks two spots, The Rock and South Point. More waves are a few minutes away by tuk-tuk." (102/200) | `location.spot.value` (owner, ISA course page) "overlooking 2 great spots – The Rock & South point. With a few minutes Tuk Tuk ride u can find some of the best waves…". Round 2 (F2): "On the beach at Kabalana" removed — `contradictions[5]` (Kabalana/Kabbalah vs Kathaluwa/Ahangama) is open, and Booking puts Kabalana Beach 350 m away; the distance fact (Kathaluwa West Beach 40 m, attributed to Booking.com) is already printed in "Getting here", so it is not repeated here. "South point" capitalised as a spot name. "great" and "best waves which Sri Lanka has to offer" dropped (unverifiable superlatives). No break type, bottom or level fit: not in the dossier (`gaps[]` location.spot detail) |
| `season` | `null` | `season.value` null; gap "no Sri Lanka season published by the business". The owner's "year-round, perfect surf conditions for beginners" (`season.quote`) is a claim about the country, unsourced — not used. Pitch point |
| `languagesSpoken` | `[]` | `languages_spoken.value` null (gap). `languages.seen` (en, he) is what the business publishes in, not staff languages |
| `priceList` | `[]` | Prices live in `lessons[]` (no duplication rule) |
| `credentials[0]` | "ISA-certified surf guides" | `credentials[0]` "Our Professional team of Surf Guides, are ISA certified" (packages page) |

## `lessons[]`

| Row | Copy | Rests on |
|---|---|---|
| `[0]` label | "Level 1 – Fomies" | `booking.engine_products[0].label` "LEVEL 1 - Fomies", `offers[0].label`. Spelling kept as the engine's product name; the engine's own description says "Foamie" (`offers[0].description`) — owner question |
| `[0]` level | `first_time`, `beginner` | `levels[0]` "first_time / beginner (Level 1 - Fomies)" |
| `[1]` label / level | "Level 2 – Rollers" / `intermediate` | `booking.engine_products[1]`; `levels[1]` |
| `[2]` label / level | "Level 3 – Riders" / `advanced` | `booking.engine_products[2]`; `levels[2]` |
| `[0–2]` price / currency / unit | 1466 / USD / `per_person` | `offers[0–2].price`, `.currency`, `.unit` "per person, 7 nights (base price)". Engine value, captured 2026-09-28 (`offers[].fetched_at`), same on both sampled dates; not on the site — owner confirms before go-live. The 7 nights are in `includes`; the capture date is in the "One price, three levels" block (lessons[] has no note field) |
| `[0–1]` includes | "7 nights, 7 breakfasts, 5 dinners, 5 guided 2-hour surf sessions, 5 theory lessons, all equipment, transport to the spots, an excursion" (135/140) | Intersection of `offers[0/1].includes_engine` and `.includes_site` (see contradiction 1 above): nights, breakfasts ×7, dinners ×5, guided 2-hour sessions ×5, theory ×5, excursion ("Cultural or nature adventure (Half day excursion)" / "A cultural or nature excursion") in both. "all equipment": engine "7 days of unlimited equipment use"; site `business.concept` "all your surfing equipment". "transport to the spots": engine "Walk or transport (depending on surf location) to surf lessons"; site `facilities[9]` "tuk tuk transfers to surf spots (included in the package)" |
| `[2]` includes | same with "coached" (136/140) | `offers[2].includes_engine` "5 surf session with our professional coach ( 2 hours net water time each)"; `.includes_site` "2 hours coached surf sessions x 5"; rest as above |
| `[3]` label | "Freestylers – B&B only" | `booking.engine_products[3]` "Freestylers - B&B only package" |
| `[3]` includes | "From 4 nights" | `offers[3].gap` "flexible duration, min 4 nights" (engine, `offers[3].source_url`). Round 2 (F5): "Bed and breakfast" removed — the Freestylers board is `contradictions[1]` ("accommodation and breakfast only" vs "half board … breakfast and dinner"), open; the package is named (label) and neither board is stated |
| `[3]` level / price | none | `levels[3]` "independent (Freestylers, no surf program)" has no schema level; `offers[3].price` null (gap) |
| all | no `groupSize`, no `durationMin` | not in the dossier (group size / instructor ratio never published) |

## `rooms[]`, `stayInfo`, `amenities[]`

| Field | Copy | Rests on |
|---|---|---|
| `rooms[]` | `[]` | Round 2 (F6): see "Room mix" above. Round 1 carried `rooms[2]` (mixed dorm) and `rooms[3]` (shared twin) from the engine as the room list; removed |
| `stayInfo.checkInFrom` / `.checkInTo` | "14:00" / "20:00" | `stayInfo.checkIn.value` "From 14:00 to 20:00" (Booking); Google "14:00" agrees (`.others`) |
| `stayInfo.checkOutTo` | "11:00" | `stayInfo.checkOut.value` "Until 11:00"; Google agrees |
| `stayInfo.note` | "No pets and no extra beds; cots are free on request for children up to 5." (73/200) | `stayInfo.rules` (Booking house rules) "Pets are not allowed … No extra beds; cots free on request for 0–5 years". Child pricing ("6 and above charged as adults") and "Cash only" left out: they are Booking.com's terms for a Booking.com stay, and the priced packages here book on the engine (see Payment below). The Saturday start is said once, in the price block |
| `amenities[0]` | Outdoor swimming pool | `facilities[0]` |
| `[1]` | Yoga chalet | `facilities[1]` |
| `[2]` | Yoga, meditation and sound healing sessions | `facilities[7]` "daily yoga, meditation and sound healing sessions" — "daily" dropped: `contradictions[4]` (Freestylers page "yoga classes … on a two-day basis") |
| `[3]` | Ice baths | `facilities[6]` |
| `[4]` | Lookout terrace · "ocean view" | `facilities[2]` |
| `[5]` | Restaurant · "breakfast, lunch and dinner, daily" | `facilities[3]` "restaurant open daily for breakfast, lunch, and dinner" |
| `[6]` | Bar | `facilities[4]` |
| `[7]` | Gluten-free and vegan options | `facilities[11]` |
| `[8]` | Co-working space · "high-speed internet, coffee and fresh juices" | `facilities[5]` |
| `[9]` | Free WiFi | `facilities[12]` (Booking) |
| `[10]` | Airport shuttle | `facilities[13]` (Booking); no charge stated — none written |
| `[11]` | Free private parking on site | `facilities[14]` |
| `[12]` | Non-smoking rooms | `facilities[15]` |
| `[13]` | Garden | `facilities[16]` |
| `[14]` | Sun terrace | `facilities[17]` |
| not rows | `facilities[8]` video analysis / in-house photographer; `[9]` tuk-tuk transfers; `[10]` soft boards | `[8]`: filming/analysis counts contradict per level (contradiction 1) — left off so no level reads as lacking or having it. `[9]` is in `lessons[].includes`; `[10]` is in the "Pick your level" block |

## `ratings[]`, `testimonials[]`

| Field | Copy | Rests on |
|---|---|---|
| `ratings[0]` | Booking.com 8.6/10, 80 reviews, URL, captured 2026-09-28 | `reviews.booking.rating`, `.scale`, `.count`, `.source_url`, `.fetched_at` |
| not rows | Google 4.7/5; Facebook "98% recommend (54)"; TripAdvisor | Google: `reviews.google.count` null — no count, not shown (playbook §6). Facebook: the agency page, not the lodge, and not a score. TripAdvisor: 403 gap |
| `testimonials[0]` | Fanny, Germany | `reviews.quotes[1]` verbatim |
| `[1]` | Myrthe, Netherlands | `reviews.quotes[2]` verbatim |
| `[2]` | Seagallas | `reviews.quotes[9]` verbatim, source `other` (the business's own packages page). Names Ariel; the copy itself names no staff (`business.staff`: named only in this testimonial) |
| `[3]` | Abigail, Myanmar | `reviews.quotes[3]` verbatim (Booking truncates after it) |
| `[4]` | Maryam, Netherlands | `reviews.quotes[0]` verbatim, as the dossier holds it (first two sentences) |
| `[5]` | Dana Amsalem-Cohen | `reviews.quotes[8]` verbatim, source `other` (business's own page); "Kablana" is the guest's spelling, kept |
| `[6]` | Agustin, Chile | `reviews.quotes[4]` |
| `[7]` | Sara, Austria | `reviews.quotes[5]` |
| `[8]` | Hannah, Oman | `reviews.quotes[6]` |
| excluded | Erez, Israel | `reviews.quotes[7]` note "negative on location — recorded, not for the site". No `date` on any row: `reviews.quotes[].date` null (gap) |

## `contact`, `bookingLinks[]`

| Field | Copy | Rests on |
|---|---|---|
| `contact.phone` | "+97299733943" | `contact.phone.value` — the number the business's own site publishes (tel: link, contact page, footer, Facebook). It is the Israeli HQ line, not the lodge. The lodge's own number `contact.phone_lodge` +94770776747 is on Google only. Which one the owner wants on the site is an owner question (audit F5, `gaps[]` contact.whatsapp (lodge)) |
| `contact.whatsapp` | `""` (empty) | Left empty on purpose. The only WhatsApp is the Israeli HQ mobile (`contact.whatsapp.value` +972523593240), not a lodge number, and the site links a second, landline WhatsApp target too (`contradictions[0]`). Schema v0.7: when `contact.whatsapp` is set the template makes WhatsApp the primary booking action and `bookingLinks[]` secondary — but the audit's primary is the engine (`audit.recommended.primary_action` "engine", `booking.path` "engine"). So WhatsApp goes in as `bookingLinks[5]`, a secondary row, and the engine stays primary |
| `contact.email` | "info@globalsurf.com" | `contact.email.value` (terms page mailto, Facebook) |
| `contact.address` | "Henewatta Addara Gederawata, Ahangama 80650, Sri Lanka" | `location.address.value` — Google listing "Henewatta addara gederawata, Ahangama 80650, Sri Lanka", postcode included; "Addara Gederawata" capitalised (base.md constraint 9), nothing else changed. Booking's "Henewaththa Addara Gedarawaththa Kathaluwa" (`address_other_platforms[0]`) not used |
| `contact.mapUrl` | Google Maps place URL | `location.map_url.value` |
| `bookingLinks[0]` | "Book package now" → engine Sri Lanka category | label: Shahar's gate feedback 2026-09-29 (his words; he rejected the earlier "See the weekly surf packages and dates", from `audit.recommended.primary_label`, as far too long); URL `booking.engine_url.value` (one tap to all packages, audit F3). Never a `/tests/` URL (`booking.engine_url.note`, audit F1) |
| `bookingLinks[1–4]` | "Book Level 1" / "Book Level 2" / "Book Level 3" / "Book Freestylers" → `/en/product/<slug>` | `booking.engine_products[0–3].url` (audit F1: one product link per package). Labels shortened 2026-09-29 (Shahar's gate feedback: CTAs ≤ 3 words where possible); were "Book Level 1 – Fomies" / "… Level 2 – Rollers" / "… Level 3 – Riders" / "Book Freestylers – B&B only". Level names stay in `lessons[].label`; "Book Freestylers" also drops the disputed "B&B only" from the button |
| `bookingLinks[5]` | "Ask on WhatsApp" → `https://wa.me/972523593240?text=Hi Global Surf Lodge Kabalana, I have a question about the surf packages.` (encoded) | `booking.whatsapp.value`, `contact.whatsapp.value`; prefilled message names the business (playbook §5). A static link cannot carry the visitor's level or dates; the text asks about the packages generally. Booking.com (`booking.ota[0]`) not a row: six-row cap, and the engine is the direct path (audit `not_measurable`) |

## Copy blocks — headings

| Block | Heading | Rests on |
|---|---|---|
| `[0]` intro | "Next set is yours" | `business.description` "Next set is yours!" (owner's words) |
| `[1]` about | "Surf, breakfast, surf again" | `business.day_at_the_camp` morning surf, breakfast, afternoon surf |
| `[2]` offer | "Pick your level" | `levels[]`, `offers[]` (framing) |
| `[3]` offer | "One price, three levels" | `offers[0–2].price` all 1466 USD |
| `[4]` about | "Twelve rooms, one big family" | `business.staying_with_us` "just 12 suites … part of one big happy family"; `rooms[0].note` "12 spacious … rooms" |
| — | "Between sessions" block | Removed in round 2 (D1): it only restated `amenities[1–4]` (yoga chalet; yoga, meditation and sound healing sessions; ice baths; lookout terrace). Those facts now live only in `amenities[]` |
| `[5]` about | "What guests say" | framing |
| `[6]` info | "Getting here" | framing |

## Copy blocks — paragraphs

| Block ¶ | Copy | Rests on |
|---|---|---|
| intro ¶1 | "We are surfing obsessed, and we invite you to join us." | `business.description` "We are surfing obsessed, and we invite you to join us" (verbatim) |
| intro ¶2 S1 | "The lodge sits in the green of the jungle." | `business.experiences.note` Nature block "nestled in the lush green jungle". Round 2 (F1): "on the beach at Kabalana" removed — `contradictions[5]` open and Booking's Kabalana Beach 350 m (printed in "Getting here"); where the lodge is stays in the tagline (south coast), the address and the attributed Booking.com distances |
| intro ¶2 S2 | "We run surf weeks for three levels, from your first wave to carving, and a Freestylers package for independent travellers." | `offers[0–3]`, `levels[]`; "first wave": `offers[0].description` "Catch your first wave"; "carving": `offers[2].description` "already carving it up"; Freestylers: `booking.engine_products[3]` (name), `offers[3].description` "independent travelers". Round 2 (F3): "a bed-and-breakfast stay" replaced by the package's name — board is `contradictions[1]`, open |
| day ¶1 | "Head out with your group for a morning surf. Back at the lodge, a big, healthy breakfast is waiting." | `business.day_at_the_camp` "grab your board and head out with your group for a refreshing morning surf session. A big, healthy breakfast will be waiting for you when you get back." Round 2 (F7): round 1's "Mornings start with … a surf session" removed — the schedule (Levels 1–2) starts with yoga, then surf; only Level 3 drops yoga (`.note`). The copy no longer says what comes first. Yoga itself is not written: it is a site-vs-engine inclusion difference (contradiction 1), and naming it for Levels 1–2 only would make Level 3 read as lacking it. The heading "Surf, breakfast, surf again" is a true subsequence of the schedule |
| day ¶2 | relax at the lodge or explore, afternoon surf, dinner with the other guests | `business.day_at_the_camp` "relax at the lodge or explore the extraordinary surrounds before heading out for your afternoon surf. End your day with an epic dinner together with the other guests". Not "every evening": 5 dinners in 7 nights |
| levels ¶1 | "Level 1 – Fomies is for your first time on a board, no surfing experience needed. You learn on soft boards, on easy reef breaks and the sandy beaches around the lodge." | `offers[0].description` "It's your first time … You don't need any previous surfing experience"; `facilities[10]` "soft boards for first-timers and intermediates"; `location.spot.note` beginners on "easy reef breaks and waves on the surrounding sandy beaches". Round 2 (V1): S1 rewritten — the package is *for* your first time, it is not your first time |
| levels ¶2 | Level 2: can stand up, struggle to paddle out and catch green waves; easy reefs and beach breaks with deep-water channels, soft boards | `offers[1].description` (verbatim sense); `location.spot.note` intermediates "easy reefs and beach breaks with deep water channels"; `facilities[10]` |
| levels ¶3 | Level 3: already carving, sharpen skills; Galle to Matara, best spot of the day by conditions, wind, tide | `offers[2].description` "already carving it up, but you want to improve your skill set"; `location.spot.note` advanced "From Galle to Matara … the best spot to surf every day according to the surf conditions, winds & tide". No wave named as Kabalana's; "epic Kabalana conditions" not used |
| levels ¶4 | "Freestylers is the package for independent travellers who want to soak up the lodge's vibe." | `offers[3].description` "The package perfectly fit independent travelers who want to soak up the vibes of our Lodge". Round 2 (F4): "bed and breakfast only" removed — `contradictions[1]` open |
| price ¶1 S1–S2 | the three surf weeks cost the same, per person for seven nights; base price shown by the engine on 28 September 2026 | `offers[0–2].price` equal; `.unit`; `.fetched_at` 2026-09-28; `.note` "Engine 'Base price' for one guest, 7 nights". The number itself lives only in `lessons[].price` |
| price ¶1 S3 | room choice can add to it; the engine shows any supplement once dates are picked | `offers[0].note` "Room supplement on top when the dorm is full: Shared Twin Room +$140.04 … dorm +$0 on 3 Oct 2026"; the price appears after dates are picked (audit F2 describes the engine; fact from `offers[].evidence` screenshots). No amount written: date-dependent |
| price ¶2 S1 | packages start on a Saturday; 7, 14, 21 or 28 nights; up to six guests per booking | `offers[0–2].duration_options` "7, 14, 21 or 28 nights … Saturday check-in only on every sampled date"; `offers[].max_guests_per_booking` 6. "Start on a Saturday", never "every Saturday": the dossier samples dates, it does not state weekly departures |
| price ¶2 S2 | drinking water and local coffee and tea unlimited | engine "Unlimited drinking water", "Local Coffee & Tea all day"; site "Unlimited drinking water", "Unlimited local coffee & tea" — in both lists, all levels |
| rooms ¶1 S1 | just twelve rooms, personal, one big happy family | `business.staying_with_us` "We offer just 12 suites, making your stay personal … part of one big happy family"; `rooms[0].note` "12 … rooms". "Suites" not used: the engine's options include a 4-bed dorm (`contradictions[3]`) |
| rooms ¶1 S2 | every room: A/C, ceiling fan, safe box, private toilet and shower, socket next to each bed, board rack | `room_amenities.value` "All of our rooms have A/C, ceiling fan, safe box, en-suite private toilet & shower, electricity socket next to each bad, and a board rack of course!" "en-suite" written as "private": the engine's dorm has a private *outdoor* bathroom (`rooms[2]`) |
| rooms ¶2 | sunbed by the pool under the palms, common area, ice-cold drink from the bar, Sri Lankan produce from the lodge kitchen | `business.staying_with_us` "lie out on a sunbed by the swimming pool under the palms, hang out in our laid-back common area, take an ice-cold drink from the bar, and indulge in delicious Sri Lankan produce made with love in our abundant kitchen" |
| guests ¶1 | Booking.com: staff 9.5/10, facilities and cleanliness 9.2 each | `reviews.booking.categories` Staff 9.5, Facilities 9.2, Cleanliness 9.2 |
| guests ¶2 | reviews mention the pool area, the open-air bathroom and the breakfast bowls | `reviews.quotes[1]` Fanny "the open-air-bathroom, the relaxing pool area and especially the great breakfast bowls"; pool also `[3]`, `[5]`. Attributed to guests, not restated as the lodge's claim |
| getting here ¶1 | Booking.com: Kathaluwa West Beach 40 m, Kabalana Beach 350 m; Kathaluwa station 400 m, Ahangama Beach 4 km, Koggala Airport 3.9 km | `location.distance_to_beach.others[0]` (Booking "What's nearby", OSM-calculated), attributed to Booking.com |

## Payment

Not stated anywhere. The dossier has no `booking.payment_methods` key; "Cash only" is in `stayInfo.rules` / `booking.ota[0].note` as Booking.com's house rules for Booking.com stays, and the business's terms set a 40% deposit (`booking.deposit_terms`, currency NIS or USD in `business.legal.note`) for engine bookings. Stating either on a page whose booking path is the engine could mislead; left for the engine to show and the owner to confirm.

## Deliberately not written (owner items)

- **Season.** Not published (gap). Pitch point.
- **Spot detail.** The Rock and South Point named only; break type, bottom, level fit and distance unknown.
- **Surf in the videos is not called Kabalana's** (`gaps[]` videos spot identity); no copy names the wave in any clip.
- **Filming, photo and video analysis, feedback sessions, yoga, spa, Wi-Fi, full-day trip as package items** — see contradiction 1; owner to confirm one inclusion list per package.
- **Koggala Lake excursion** (`business.concept`, site only) — not in the engine's package; left out.
- **Freestylers price and board** (B&B vs half board) — gap / `contradictions[1]`; neither board stated on the page (round 2).
- **Room mix and count by type** — `contradictions[3]`; `rooms[]` empty (round 2), so the `surf_camp` must-have "≥ 1 rooms[] row" needs the owner.
- **Which phone and WhatsApp reach the lodge** — +972 HQ vs +94 lodge (`contact.phone_lodge`), two WhatsApp targets (`contradictions[0]`).
- **Staff names and languages** — only "Ariel" inside a testimonial; no language list.
- **Founding year** — gap; "2019" is a footer year, not a founding date.
- **Reply time** — not published.
- **Level 1 spelling** — engine "Fomies" vs description "Foamie".
- **"On the beach at Kabalana"** (owner, ISA page) — not stated (round 2, F1/F2): `contradictions[5]` open. Only Booking.com's attributed distances are printed.
- **The agency's other destinations** (Maldives, Morocco, Angola, Mozambique) — schema gap; not on the lodge site.

---

## `mockup_extras` — round-2 additions (2026-09-29, after the mockup gate)

Copywriter 0.3.3 · for `concepts.md` §6 (round 2). **Every passed field above is unchanged** except `bookingLinks[0–4].label`, shortened 2026-09-29 on the coordinator's instruction after Shahar's gate feedback (rows in the `bookingLinks` table above). `mockup_extras` is a separate object, not a schema field; each key is classed below as **schema gap** (the content has no field in `schemas/site-content.md` v0.9), **template label** (interface words the schema gives to the template; wording approved here), or **pending field** (a field exists but the passed ruling keeps it empty until the owner confirms). New dossier keys used: `rooms_engine` (fetched 2026-09-29T17:35:19Z), `room_photo_groups` (2026-09-29T17:37:04Z), `offers[0–2].includes_engine` (2026-09-29T17:35:03Z), `offers[0–2].package_items_engine` (2026-09-29T17:39:50Z), `business.logo` (2026-09-29T17:37:58Z), `contact.instagram_profiles` (2026-09-29T17:39:07/15Z).

### Schema gaps (no field today; each needs a schema proposal before the live site)

| Gap | Where in `mockup_extras` | Why no existing field fits |
|---|---|---|
| Short hero title (≤ 5 words) and subtitle | `hero.*` | `tagline` (passed, 81 chars) is the "what + where" line; a second, shorter hero line would overload it. `copyBlocks[0].heading` "Next set is yours" can serve C2 as is. |
| Per-level one-liner | `levels[].one_liner` | `lessons[]` has no description/note field (`includes` is taken). |
| Inclusions as a list | `inclusions.level_*` | `lessons[].includes` is one text ≤ 140 (passed, comma list). A list with icons needs `lessons[].includes[]` rows (or the template splits the passed text — fragile). |
| Room description longer than a note | `rooms[].description` | `rooms[]` has `label`, `beds`, `sleeps`, `note` (≤ 140), `photo`. `line` fits `note`; `description` does not. |
| Room gallery (5–7 photos per room) | `rooms[].gallery`, `.gallery_portrait` | `rooms[].photo` is one photo; "the gallery stays in `photos[]`" has no link from photo to room. |
| Logo | `logo.*` | Listed under "Not in v0.1" in the schema. |
| Instagram handle and line; footer socials | `instagram.*`, `socials.*` | "social links" listed under "Not in v0.1". |

### Pending fields and snapshot data (not schema gaps)

| Item | Status |
|---|---|
| `rooms[]` rows (label, beds, sleeps, note) | Field exists; the passed ruling (round 2, F6) keeps `rooms[]` `[]` while `contradictions[3]` (room mix) is open. `mockup_extras.rooms` holds the three **engine room types** for the mockups only; moving them into `rooms[]` needs the owner's confirmation of the rooms and a copyeditor ruling. |
| Room supplements | Build-time booking snapshot (`docs/bookinglayer.md`, playbook §4 booking-engine rule), **not content**: the schema's rule "Live prices are not content" keeps date-dependent room prices out of `rooms[]`. Given here only so the mockup shows the right numbers with their sample dates. |
| CTAs, section titles, booking microcopy, detail-line templates | **Template labels** (schema: "interface labels … belong to the template"). The numbers inside detail lines come from passed fields (`lessons[].price`, `ratings[0]`, `stayInfo`), composed by the template, never stored twice. |

### Lines

| Key | Copy | Rests on |
|---|---|---|
| `hero.title_c1` | "Surf weeks in Sri Lanka" (5 words) | `offers[0–2]` weekly packages; `business.type` "Weekly Surf & Wellness Retreats"; `business.description_packages` "South Coast of Sri Lanka" |
| `hero.title_c2` | "Next set is yours" (4) | `business.description` "Next set is yours!" (owner's words; = passed `copyBlocks[0].heading`) |
| `hero.title_c3` | "Your surf week starts here" (5) | `business.tagline.candidates[0]` "Your Surf Trip To Sri-Lanka Starts Here" (owner's lodge headline), shortened; "week" from `offers[0–2]` 7-night packages |
| `hero.subtitle` | "All levels, steps from the beach" (6) | "all levels": `business.description_packages` "available for all levels", `business.description` "great surfing for all levels"; "steps from the beach": `business.description` "Just a few steps from the ocean", `location.distance_to_beach.others[0]` (Booking: Kathaluwa West Beach 40 m). Shahar's example wording. The concept's "Surf weeks in Kabalana, Sri Lanka" **not used**: the place name is `contradictions[5]` (Kabalana vs Kathaluwa/Ahangama), open — the passed copy removed it for the same reason |
| `hero.subtitle_alt` | "Sri Lanka's south coast, all levels" (6) | `business.description_packages`; same as passed `tagline` |
| `ctas.*` | "Book package now", "Choose your level", "Book your week", "Book now", "Choose Level 1/2/3", "Continue booking", "Next", "Continue", "Ask about dates", "Questions? Ask us", "WhatsApp us", "Call us", "Email us", "Open in Maps", "Follow @globalsurf_kabalana", "What's included" — all ≤ 3 words | Template labels. Targets: engine products `booking.engine_products[0–3]`; WhatsApp `booking.whatsapp`; phone/email passed `contact.*`; map `location.map_url`; Instagram `contact.instagram_profiles[1].url`. "Book with this room" (concept, 4 words) → **"Choose this room"**: the engine cannot receive the room choice (`docs/bookinglayer.md` §3), so "book" would promise more than the button does |
| `section_titles.*` | "Next set is yours", "Choose your level", "What's included", "Surf, breakfast, surf again" (+ short "Your day here"), "Our rooms", "The lodge", "What guests say", "The waves", "Follow the lodge", "Getting here"; booking: "Your level", "What's included", "Your room", "Dates and guests", "Your total" | Template labels, generic. Existing headings reused where they exist (`copyBlocks[0,1,5,6].heading`). "Your day here": `business.day_at_the_camp` (a day's schedule). "The waves": `location.spot` (two spots overlooked; no wave named as the lodge's in any clip) |
| `levels[0].one_liner` | "Your first time on a board. No experience needed." (9) | `offers[0].description` "It's your first time grabbing a surfboard … You don't need any previous surfing experience"; passed levels ¶1 |
| `levels[1].one_liner` | "You can stand up. Now catch green waves." (8) | `offers[1].description` "can stand up on a board … Join LEVEL 2 to catch your first green waves"; passed levels ¶2 |
| `levels[2].one_liner` | "Already carving? Sharpen your skills on the day's best spot." (10) | `offers[2].description` "already carving it up, but you want to improve your skill set"; `location.spot.note` "the best spot to surf every day according to the surf conditions, winds & tide"; passed levels ¶3 |
| `levels[3].one_liner` | "For independent travellers who want the lodge's vibe." (8) | `offers[3].description` "perfectly fit independent travelers who want to soak up the vibes of our Lodge". Concept's "B&B only, for independent travellers" **not used**: board is `contradictions[1]`, open (passed F4/F5). "B&B only" stays only inside the engine product name |
| `detail_lines.welcome` | "12 rooms \| Saturday check-in \| ISA-certified surf guides" | `business.staying_with_us` "just 12 suites", `rooms[0].note`; `offers[0–2].duration_options` "Saturday check-in only on every sampled date"; `credentials[0]` |
| `detail_lines.level_price` | "From $1,466 pp \| 7 nights" | `offers[0–2].price` 1466 USD, `.unit` "per person, 7 nights (base price)". "From": room supplements add to it (`rooms_engine` samples) |
| `detail_lines.freestylers` | "Freestylers – B&B only \| from 4 nights" | engine product name `booking.engine_products[3]`; `offers[3].gap` "min 4 nights" |
| `detail_lines.trust` | "8.6 on Booking.com \| 80 reviews \| 28 Sep 2026" | `reviews.booking.rating`, `.count`, `.fetched_at` (passed `ratings[0]`) |
| `detail_lines.rating_categories` | "Staff 9.5 \| Facilities 9.2 \| Cleanliness 9.2" | `reviews.booking.categories` |
| `detail_lines.every_room` | "Every room: air conditioning \| ceiling fan \| safe box \| private toilet and shower \| board rack" | `room_amenities.value`; "private", not "en-suite", as in passed rooms ¶1 S2 |
| `detail_lines.stay` | "Check-in 14:00–20:00 \| check-out by 11:00" | `stayInfo.checkIn`, `.checkOut` (passed `stayInfo`) |

### Inclusions (`inclusions.level_1/2/3`)

**Rule applied (unchanged from the passed copy, contradiction 1):** only items that both the engine list (`offers[n].includes_engine`, the 13 lines the engine shows) and the site list (`offers[n].includes_site`) carry, and the same items for every level. So every level shows the same ten lines; the only difference is Level 3's **coached** sessions, which both lists state. The newly harvested third engine list, `package_items_engine` (the engine's "Upgrade your package" step), changes nothing below: it names "Massage" where `includes_engine` says "Ayurvedic spa treatment", and Level 1's has no surf-theory item — absence in an add-on step is not a contrary statement, and theory ×5 stays (both inclusion lists carry it).

| Line | Rests on (engine `includes_engine` / site `includes_site`) |
|---|---|
| "7 nights' accommodation" | "7 nights accommodation" / same |
| "7 breakfasts" | "7 breakfasts" / "Breakfasts x 7" |
| "5 dinners" | "5 dinners" / "Dinners x 5" |
| "5 guided surf sessions of 2 hours" (L1, L2) · "5 coached surf sessions of 2 hours" (L3) | "5 guided surf session of 2-hours net water time each" / "Guided surf session of 2 hours x 5"; L3 "5 surf session with our professional coach (2 hours net water time each)" / "2 hours coached surf sessions x 5". "Net water time" is engine-only; "2 hours" is common |
| "5 surf theory lessons" | "5 surf theory lesson" / "Surf theory lessons x 5" |
| "Surf equipment, unlimited all week" | "7 days of unlimited equipment use" / site `business.concept` "all your surfing equipment" (as passed `lessons[].includes` "all equipment") |
| "Walk or ride to the surf, depending on the spot" | "Walk or transport (depending on surf location) to surf lessons" / `facilities[9]` "tuk tuk transfers to surf spots (included in the package)" |
| "A cultural or nature excursion" | "Cultural or nature adventure (Half day excursion)" / "A cultural or nature excursion". "Half day" engine-only, left out |
| "Unlimited drinking water" | same in both |
| "Unlimited local coffee and tea" | "Local Coffee & Tea all day" / "Unlimited local coffee & tea" |
| `optional_extra` "Airport pickup, from $220 pp: add it on the booking page" | `offers[0–2].package_items_engine` "Airport pickup / drop off", `included: false`, `price_from` 220, pricing per person (fetched 2026-09-29) |
| `freestylers` `[]` | `gaps[]` "offers[Freestylers].rooms / inclusions": no engine list; board `contradictions[1]` |

**Left out for every level** (one side only, or counted differently): photographed/filmed sessions (L1 engine 2 / site "a filming and photography day"; L2 2/2 but kept out for parity; L3 engine 4 / site 5), feedback and video-analysis sessions (L1 engine 1 feedback / site 2 feedback; L2 engine 1 video analysis / site 2 analysis + 2 feedback; L3 engine 3 / site 5 analysis), Ayurvedic spa treatment / massage (engine only), yoga ×5, free Wi-Fi, full-day surf trip, "full access to all lodge facilities" (site only). **Conflict with the concept:** §3.2 asks for "Level 3: 4 filmed, 3 video analyses" to stay visible; that is the engine's side of an open contradiction (site says 5 and 5), so it is not written. Owner item: one inclusion list per package.

### Rooms (`rooms[]` in `mockup_extras`) — the three engine room types

Source: `rooms_engine.value[0–2]` (sample stay 20–27 Feb 2027, 7 nights, Level 1; the note says Levels 2 and 3 returned the same types and supplements). Which types are offered changes by date (`rooms_engine.note`), so the page never says the lodge has "three room types"; these are the types the engine books with the packages.

| Room · key | Copy | Rests on |
|---|---|---|
| Dorm · `label` | "Mixed dorm room – 4 beds" | `rooms_engine[0].engine_title` "Mixed dorm room - 4 beds" (en dash, as passed lesson labels) |
| Dorm · `line` | "Four single beds, a loft with a ladder, a private outdoor bathroom." (12 words) | `.description` "4 comfortable single beds … private outdoor bathroom"; loft with ladder: `room_photo_groups.groups[dorm]` img-063 (the engine's own dorm photo) and img-078 "loft with ladder visible" |
| Dorm · `description` | "Our new gallery room has four comfortable single beds and a private outdoor bathroom. It suits larger groups, and travellers on a budget." | `.description` verbatim in sense: "Our new gallery room is fitted with 4 comfortable single beds and features a private outdoor bathroom. The dorm is suitable for larger groups or travelers on a budget without compromising" — the engine text ends mid-sentence, so "without compromising" is dropped rather than completed |
| Dorm · `details` | "Sleeps 4 \| 4 single beds \| Private outdoor bathroom \| Shared" | `.capacity` 4; `.beds`; `.description`; `.is_private` false and "Mixed dorm" title. Beds uncontested: Booking sells the dorm per bed ("1 single bed" = one bed booked), the site's lodge page names "4 beds dorms" (`contradictions[3]` a) |
| Dorm · `supplement` | "Included in the package price" (sample 20–27 Feb 2027, as of 29 Sep 2026) | `.supplement_samples` per_person 0 for 1 guest and for a couple ("price.from null = included") |
| Twin · `label` | "Shared Twin Room – 2 Beds" | `rooms_engine[1].engine_title` |
| Twin · `line` | "Two beds, a private bathroom and a beach view all day." (11) | `.description` "a lovely private bathroom and all day beach view"; "two beds": engine title "2 Beds" |
| Twin · `description` | "Our twin rooms have two beds, a lovely private bathroom and a beach view all day. It is a shared room: to keep it to yourselves, choose private use when you check out on the booking page." | `.description` "Our twin rooms have one double bed and one single bed, a lovely private bathroom and all day beach view. Note - to privately reserve the room, please make sure you mark the section box above!"; `.is_private` false. **Bed configuration not stated**: contested three ways (`contradictions[7]`: engine 1 double + 1 single; Booking "Superior Twin Room" 2 single beds; site "4 twin rooms"). Only the count of two, which all three support, is written. "Beach view" is the owner's own engine text and no source contradicts it |
| Twin · `details` | "Sleeps 2 \| 2 beds \| Private bathroom \| Shared, or book it privately" | `.capacity` 2; title; `.description`; `.is_private` false + the private-reservation note |
| Twin · `supplement` | "+$140 pp for 7 nights, one guest" / "+$80 pp for 7 nights, two sharing" (exact 140.04 / 80.025 pp, 160.05 total) | `.supplement_samples` (1 female; 1 couple), 20–27 Feb 2027, fetched 2026-09-29. Rounded to whole dollars for display (concept §3.2: "rounded, .00 hidden"); exact values kept. The engine's `single_room_supplement` $350 pp (private use) is **not written**: what the figure is charged on is not stated anywhere — owner/engine question |
| Deluxe · `label` | "Deluxe double room" | `rooms_engine[2].engine_title` |
| Deluxe · `line` | "A queen-size bed for two, with its own private bathroom." (10) | `.description` "one queen-size bed"; `.capacity` 2; private bathroom: `room_amenities` "All of our rooms have … en-suite private toilet & shower" |
| Deluxe · `description` | "Our double rooms have one queen-size bed and a private bathroom. To keep the room to yourselves, choose private use when you check out on the booking page." | `.description` "Our double rooms have one queen-size bed and an optional additional single bed. Note - to privately reserve this room, please make sure you mark the selection box above upon proceeding to check out!"; `room_amenities`. **"Optional additional single bed" not written**: Booking's house rules say "No extra beds" (`stayInfo.rules`, and the passed `stayInfo.note`), and Booking's Deluxe Double lists "1 large double bed" (`rooms[1]`). Not yet a `contradictions[]` entry — reported to the harvester |
| Deluxe · `details` | "Sleeps 2 \| Queen-size bed \| Private bathroom" | `.capacity` 2 (the engine's own figure; with an extra single it would be 3 — one more reason to leave the extra bed out); `.beds`; `room_amenities`. Shared/private not stated: `.is_private` true, yet its description asks guests to tick private reservation — unclear, so neither is said |
| Deluxe · `supplement` | "+$418 pp for 7 nights" (exact 418.46) | `.supplement_samples`, same per person for 1 guest and a couple; rounded as above |
| `rooms_note` | "Room prices change with the dates. Sample for 20–27 Feb 2027; prices from the booking engine, 29 Sep 2026." | `rooms_engine.note` "Supplements are samples for these dates, not a price list"; `.fetched_at` |
| `gallery` lists | dorm img-063, 078, 095, 042, 068, 050 + shared bathroom img-064; twin img-080, 013, 084, 083 + shared img-069, 079; deluxe img-081, 082, 041, 043, 044, 071, 066 (portraits img-028, 029, 045, 048 separately) | `room_photo_groups.groups` and `.shared_all_types` (status: **proposal, owner to confirm**). Twin mapping is medium confidence; img-066 is medium (could be twin). No captions. This **replaces the grouping in `concepts.md` §2** (which put img-066/080/081 under twin and img-015/084 under deluxe): img-081 is Booking-labelled Deluxe, img-084 Booking-labelled Twin, img-015 unassigned. The designer should use this grouping |

### Booking microcopy (`booking.*`) — template labels

| Key | Copy | Rests on |
|---|---|---|
| `step_counter`, `step_pills`, `summary_labels` | "Step {n} of {total}"; "Level", "Room", "Dates & guests", "Total"; "Level", "Dates", "Guests", "Room", "Total" | concept §3.2 flow; interface words |
| `field_checkin`, `field_checkin_help`, `field_checkin_nojs_placeholder` | "Check-in (Saturdays)"; "Packages start on a Saturday."; "Choose a Saturday" | `offers[0–2].duration_options` "Saturday check-in only on every sampled date" — "start on a Saturday", never "every Saturday" (as passed price ¶2) |
| `field_nights`, `nights_options` | "Nights"; 7 / 14 / 21 / 28 | `offers[0–2].duration_options` |
| `field_women/men/couples`, `guests_help` | "Women", "Men", "Couples"; "Up to 6 guests per booking." | the engine's guest types (`rooms_engine` source URLs `female=`, `male=`, `couple=`; samples "1 female", "1 couple"); `offers[].max_guests_per_booking` 6 |
| `stepper_less/more` | "One less", "One more" | accessible names for − / + |
| `room_included`, `room_supplement`, `room_not_free`, `room_only_one_free` | "Included"; "+${amount} pp"; "Not free on these dates"; "Only the {room} is free on these dates" | `rooms_engine` supplements; `rooms_engine.note` "Which types are offered changes by date … only one type was free". Concept's "You'll be placed in the {room}" not used: it predicts the engine's allocation, which the dossier does not record |
| `total_*`, `currency_note` | "Package, per person", "Room, per person", "Total per person", "Total for {n} guests"; "Prices in USD" | `offers[].currency` USD, `rooms_engine` currency USD |
| `prices_snapshot`, `prices_live`, `prices_fallback` | "Prices from the booking engine, {date}"; "Live price from the booking engine"; "Live prices didn't load. These are the booking engine's prices from {date}." | Shahar's wording in the brief; playbook §4 booking-engine rule (snapshot fallback). For this snapshot `{date}` = 28 Sep 2026 for the base price (`offers[].fetched_at`), 29 Sep 2026 for rooms |
| `deposit` | "40% deposit to book, the rest 45 days before arrival. Booking less than 45 days ahead? You pay in full." | `booking.deposit_terms` "40% deposit; remaining 60% within 45 days before arrival; full payment when booked less than 45 days before arrival" (the business's terms page). **Note for the copyeditor:** the passed "Payment" section left payment terms for the engine to show; this line states the business's own deposit terms on our booking page, where the concept puts them. Currency (NIS or USD, `business.legal.note`) and Booking.com's "cash only" still not stated. Owner to confirm |
| `handoff`, `handoff_nothing_booked` | "Next, on our Bookinglayer booking page: confirm your room, add airport pickup if you want it, then enter your details and pay." · "Nothing is booked until you check out there." | `booking.path` (the business's own Bookinglayer engine); airport pickup add-on `package_items_engine` (not included, from $220 pp); "confirm your room": the engine cannot take the room choice from a link (`docs/bookinglayer.md` §3); playbook §4 "no guest data, holds or payment on our pages". Concept's "secure booking page" not used: an unverifiable claim |

### Logo, Instagram, socials

| Key | Copy | Rests on |
|---|---|---|
| `logo.file`, `.file_white` | `assets/logo-001.svg` (black globe + GLOBALSURF), `assets/logo-002.svg` (white wordmark) | `business.logo.value`, `.variants[0]`; `license: business-owned` |
| `logo.alt`, `.home_link_label` | "Global Surf"; "Global Surf Lodge Kabalana, home" | alt = the wordmark's text (GLOBALSURF). It is the **agency** logo; no lodge logo exists (`business.logo.note`) — owner item |
| `instagram.handle`, `.url` | "@globalsurf_kabalana" | `contact.instagram_profiles[1]` "Global Surf Lodge Kabalana" |
| `instagram.line` | "The home for all ocean lovers." | `contact.instagram_profiles[1].bio` "≈ the home for all ocean lovers" (owner's words, capitalised) |
| `instagram.tile_link_label` | "See @globalsurf_kabalana on Instagram" | tiles are the lodge's own photographs linking to the profile, not posts (`gaps[]` instagram posts behind login; concepts §2) — the label does not call them posts |
| `socials.*` | lodge Instagram; YouTube; Facebook `GlobalSURFltd` | `contact.socials` (site footer). YouTube and Facebook are the agency's channels, not the lodge's. Follower counts not written |

### Deliberately not written this round (owner items, added)

- **Twin bed configuration** — three-way contradiction (`contradictions[7]`).
- **Deluxe "optional additional single bed"** — vs Booking "No extra beds".
- **Private-use supplement $350 pp** — basis unclear.
- **Whether the Deluxe is private by default** — `is_private` true vs "to privately reserve this room … mark the selection box".
- **Level-specific filming / analysis / feedback counts, spa/massage** — see Inclusions.
- **"Kabalana" as a place in the hero subtitle** — `contradictions[5]`.
- **A lodge logo** — only the agency's.
