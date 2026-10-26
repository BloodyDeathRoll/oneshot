# copy sources — cheeky-monkey · en

Copywriter 0.4.0 · run 2026-10-midigama-01 (test) · 2026-10-26. Facts come from `dossier/cheeky-monkey/dossier.json` only (harvest 2026-10-26T19:40Z plus the follow-up of 20:45Z). `audit.json` `recommended` is used for how to sell (the action label, the order of the offer, the closing intent), never as a fact.

**This is the owner-prose case.** The owner's site carries English prose: `business.description` (home page, 2025), `.description_about` (About page, 2025), `.description_shop` (home page), the taglines and the 2021 service and package pages. I use it where it works. Two parts of it are left out on purpose (see "Contradictions held open").

Index keys: `reviews.quotes[n]`: 0 Tomas (excluded) · 1 Sofie (excluded) · 2 Jimmy · 3 Serkan · 4 Ligaya · 5 Jenny · 6 Lukas · 7 Hannah · 8 Mihrican · 9 Veronika · 10 Yunus · 11 Sienna · 12 Christina. `offers[n]` and `facilities[n]` follow the dossier's order. "2021 orphan page" means a page of the owner's site that the menu no longer links to, last edited in 2021 (`offers_note`). The dossier says the owner must confirm anything from those pages before go-live.

## Contradictions held open (not resolved in the copy)

| Contradiction | How the copy handles it |
|---|---|
| **Status: open or closed?** (`status_flag`, `contradictions[2]` rooms bookable, `facebook_hours`, `gaps[]` business status) | Nothing in the copy says the place is open, closed, seasonal, being renovated, or in Arugam Bay. There is no "now open" line and no "closed" line. The primary action sends people to Booking.com, which shows live availability itself, and the copy asks people to **call to check** that lessons are running when they come (lessons block ¶2) and to confirm the packages (packages block ¶6). `openingHours[]` is empty and `hoursNote` is null (see below). |
| **Surf school running** (`contradictions[1]`; guests in Dec 2025 say it wasn't) | Lessons are given as what the business publishes, without the word "daily" and with no claim that they run now. The "call before you come to check … that lessons are running" line is the honest limit. The guests' complaints are not site content (`critical_themes_note`). |
| **Owner / family name** (`contradictions[0]`: Baba Pasindu Delgodage / Dodangoda family / Chulanga) | The resolution in the dossier is "the site uses only 'Baba' until the owner confirms". The copy names only **Baba**, and only as the **founder** (About page: "founded by Baba"). He is never called the current owner, because a 2026 guest names another shop owner. "Pasindu", "Delgodage", "Dodangoda" and "Chulanga" appear nowhere. The owner's About prose ("proudly run by the Dodangoda family") is **not used** for that reason. Testimonial `quotes[0]` (Tomas) is **excluded** because it names "Chulanga" as the shop owner, and a testimonial can't be trimmed. |
| **Restaurant** (`contradictions[6]`: press release and site vs. guests "Restaurant was closed") | No restaurant or café amenity. No line says meals are served outside the packages. The restaurant appears only as history, in the 2009 opening ("a tiny surf shop and a restaurant"), and the five dinners appear only as a 2021 package item. |
| **Non-A/C double B&B rate** (`contradictions[8]`: USD 20 on /booking-surf-camp/ vs 22$ on the packages page) | **Neither** is shown. I also left out the agreeing A/C double (25) and A/C triple (27), because their unit is unstated (`offers[12–14]`, `[22–24]` note "per night? per room?") and `audit.recommended.offer_framing` says rooms appear "with no nightly rate, linked to live dates". The PayHere "Extra room" buttons (`booking.payhere_links[16–18]`, same 22/25/27) are left out for the same reasons. Owner item. |
| **Shop hours** (`contradictions[3]`, `hours_note`: 7am–6pm / Monday 8–7 / Always open) | `openingHours[] = []` and `hoursNote = null`. No hours anywhere in the copy. |
| **Town** (`contradictions[5]`: Ahangama vs Weligama) | Google's address, Ahangama 80650 (playbook §6). |

## Top-level fields

| Field | Copy | Rests on |
|---|---|---|
| `businessName` | "Cheeky Monkey Surf Camp" | `business.name.value` (Booking.com property name). Google has "Cheeky Monkey" and the site title is "Cheeky Monkey" (`.note`). Owner to choose. |
| `businessType` | `surf_camp` | `businessType`, `business.businessType_note`. Alon's gate note: "popular spot surf store, you can also buy or rent boards here" (ledger, gate a). Shop facts sit in the kit modules `rentals[]` / `brands[]`, as the note flags. |
| `tagline` | "Surf shop, rooms and lessons on the main road in Midigama, with 400 boards to rent." (84/140) | "surf shop": `facilities[0]`, `business.description_shop`. "rooms": `room_types[]`. "lessons": `lessons[0–5]`, `business.description`. "main road": `location.address` "Galle - Matara Main Road", `business.sister_shop` "at the main road located". "Midigama": address. "400 boards to rent": `rentals[0].raw` "one of our 400 boards for rent". The shop leads, per Alon's gate note. |
| `closing` | "See the rooms and live dates on Booking.com. For lessons and surf weeks, call us first." (87/140) | Task: `audit.recommended.closing_intent`, which is not a fact. Booking.com: `booking.engine_url`. Phone: `contact.phone`. "surf weeks": `packages[]` (7 nights). |
| `featureLine` | "Come as a stranger, leave as a friend." | `business.description_about`, the owner's words, verbatim. |
| `spot` | "Close to the main point breaks, with many more surf breaks a short walk away." (77/200) | `location.spot.value` "close to the main point breaks" (owner's older About page); `location.spot.note` Booking host "many surfbreaks in a short walking distance". No break is named, and nothing about break type or level fit: that's `gaps[]` location.spot. |
| `season` | "The best time is from October till March or April. The waves are nice and the beach is clean." (94/200) | `season.value`, the owner's own Booking.com Q&A answer (3 Oct 2019), near verbatim ("March/April" → "March or April"). The low-season note in `season.note` (Facebook) is **not** used (see status above). |
| `openingHours` / `hoursNote` | `[]` / null | `hours_note.gap`, `contradictions[3]`. Owner item. |
| `credentials` | `[]` | `credentials[0]` "ISA certified surf instructors … certified professional yoga instructors" is on a 2021 orphan page, and the dossier note says "the copy must not repeat it until the owner confirms". Owner item. |
| `languagesSpoken` | `["en"]` | `languages_spoken[0]` (Booking "Languages spoken: English"). |

## Copy blocks: one line per paragraph

| Block ¶ | Copy (short) | Rests on |
|---|---|---|
| [0] intro heading | "Catch waves, not worries" | `business.tagline_alt.value`, the owner's home-page headline, verbatim. |
| [0] intro ¶1 | a surf and yoga camp on the main road through Midigama, close to the main point breaks | "surf and yoga camp": `business.tagline` "Your Surf and Yoga Camp in Midigama" (owner). "main road": `location.address`. "close to the main point breaks": `location.spot.value` (owner). The camp's name and self-description are the owner's, not a claim that a camp runs now. |
| [0] intro ¶2 | Baba's Surf Shop right alongside the guesthouse: rent a board, buy one, or bring yours in for a repair | `business.description_about` "our Baba's Surf Shop sits right alongside the guesthouse". Rent: `rentals[0]`. Buy: `rentals[1]` "(sale and rent)", `contact.facebook_profile.intro` "boards for rent & sale", `rentals_note` (Google shop listing "renting or buying boards"). Repair: `rentals[2]` (2021 page) plus Instagram bio "Board Repair" (`contact.instagram_profile.bio`, current). |
| [1] about heading | "Three rooms in 2009" | `business.since` press release: "In late 2009 … a small guest house with just 3 rooms". |
| [1] about ¶1 | opened late 2009 as a small guesthouse with three rooms, a tiny surf shop and a restaurant; ten rooms by 2021 | `business.since.note` (Daily Mirror press release, 2 Feb 2021), verbatim sense. `room_count.value` "now a 10 roomed accommodation" (2021), dated as such. The founder's name in that sentence of the release is left out. |
| [1] about ¶2 | founded by Baba, who taught himself to surf at twelve like most kids in the area and worked as a surf instructor; the shop carries his name | "founded by Baba": `business.run_by.value` (owner's About page). The biography: `business.owner.note`, a press-release quote about "'Baba' Pasindu" ("taught himself to surf at the age of 12 … worked as a surf instructor"). The release itself identifies its subject as Baba, and only the name "Baba" is used (`contradictions[0]` resolution). "carries his name": `business.description_about` "Named after Baba, our Baba's Surf Shop". |
| [2] about heading | "Baba's Surf Shop" | `business.name.note` (signage "BABA'S SURF SHOP"), `business.description_about`. |
| [2] about ¶1 | 400 boards for rent, in different sizes, tails and colours | `rentals[0].raw` "one of our 400 boards for rent. You can choose between different sizes, Surfboard tails, and colors" (surf-shop-facilities page, linked from the menu). Board types are in `rentals[0].note`, not repeated here. |
| [2] about ¶2 | if your own board gets damaged, the shaper here can fix it fast | `rentals[2].raw` "If you're own board get damage, no problem our shaper in Cheeky Monkey can fix it fast" (2021 orphan page). Repairs are current per the Instagram bio "Board Repair". |
| [2] about ¶3 | wax, straps, bags and beachwear; run by surfers, for surfers | `business.description_shop` (home page): "beachwear … straps, bags, and, of course, wax … created and run by surfers, for surfers". Brand names live only in `brands[]`. |
| [3] offer heading | "Lessons for your level" | `levels[]`; `business.description` "surf lessons tailored to your skill level". |
| [3] offer ¶1 | from a total beginner to chasing your next big ride, lessons tailored to your skill level, your pace and your style | `business.description` (owner, 2025), verbatim apart from the voice ("our experienced instructors will guide you" is dropped: no instructor is named or evidenced, `gaps[]` instructors / team). |
| [3] offer ¶2 | the lesson price was published in 2021; call before you come to check the price and that lessons are running | `lessons[0].note` (2021 orphan page, owner must confirm); `offers_note`. "call": `contact.phone`. The call-to-check is the honest limit that holds `contradictions[1]` open. It is a request to the reader, not a claim. |
| [4] offer heading | "A week of surf" | `packages[]` (7 nights each). |
| [4] offer ¶1 | Full Surf Lesson Package: two lessons a day for six days, one rest day | `packages[0].includes[0]` "2 Surf lesson per day 6 days (1 Rest Day)". |
| [4] offer ¶2 | Moderate package: one lesson a day for six days, or one guided session at a surf spot | `packages[1].includes[0]` "1 Surf lesson Or 1 Surf spot guiding per day 6 days (1 Rest Day)". |
| [4] offer ¶3 | Yoga and Surf: one yoga lesson and one surf lesson a day for six days | `packages[2].includes[0]` "1 Yoga Lesson 1 Surf lesson per day 6 days (1 rest Day)". |
| [4] offer ¶4 | Surf Board Rental: any board for seven days, and a tuk-tuk driving lesson if you want one | `packages[3].includes[0]` "7 Days any Surf Board Rent", `[8]` "Free Tuk Tuk Driving lesson (if someone liked)". |
| [4] offer ¶5 S1 | every package: seven nights, seven breakfasts, five dinners, two or three yoga classes, a party night, the weekly BBQ night, free gym use | Items in all four `packages[0–3].includes`: "7 Night Accommodation", "7 Days Breakfast", "5 Dinners Include", "2 or 3 Yoga Classes", "1 Party Night", "Once a week BBQ Night", "Free Gym use". |
| [4] offer ¶5 S2 | the three lesson packages include your board during lessons and transport to the surf spot | `packages[0–2].includes` "Free use of surf board during surf lesson", "Free Transport for Surfing Spot". The rental package has neither, so neither is claimed for it. |
| [4] offer ¶5 S3 | one lake tour, for an extra USD 5 | all four `packages[].includes` "1 Lake Tour (additional Charge US$ 5)"; `offers[25]`. The amount appears here only, not in `priceList[]`, because its unit is not stated. |
| [4] offer ¶6 | price per person for the week, depends on the room (private, shared double, shared triple); published 2021, call to confirm before booking | `offers[0–11]` labels "PRIVATE ROOM / DOUBLE ROOM SHARED / TRIPPLE ROOM SHARED (1 Person)", unit "per week"; `.note` (2021 orphan page, owner must confirm). The numbers live only in `priceList[]`. |
| [5] about heading | "Up on the roof" | `facilities[3]` rooftop; `facilities[5]` yoga on the roof top. |
| [5] about ¶1 | the house looks out on a 180° sea view; one guest: "the ocean view is amazing from the rooftop" | `location.views.value` "a fantastic 180° sea view" (owner's older About page; "fantastic" dropped). The quote is `reviews.quotes[8]` (Mihrican, Booking, Dec 2025), a verbatim fragment attributed to a guest. |
| [5] about ¶2 | yoga up there, at sunrise and at sunset, facing the ocean | `facilities[5].note` "Experience both sunrise and sunset yoga on our roof top, facing the ocean!" (2021 orphan page). Yoga is current per `business.description_about` (2025) "unwind with yoga". No certification claimed. |
| [6] info heading | "Getting here" | framing |
| [6] info ¶1 | on the Galle–Matara main road; Booking.com: Midigama Beach 350 m, Midigama station 800 m, Ahangama Beach 2 km, Weligama Beach 3.3 km, Koggala Airport 10 km | `location.address` (Google). `location.distance_to_beach.value`, `location.nearby.value` (Booking.com), attributed to Booking.com. Google's "8-minute walk" is not used, so there's only one distance per place. No airport is named for the transfer (`offers[15–17]` don't say which). |
| [7] info heading | "Good to know" | framing |
| [7] info ¶1 | no generator for power cuts | `facilities[15]`, the owner's Booking Q&A answer of 31 Mar 2026: "we don't have generator at the property". An honest limit. |
| [7] info ¶2 | the team can book you a taxi and organise a safari or a cooking class | `rentals[3].raw` "Book Taxi"; `facilities[17]` "tours: safari, cooking class, tuk tuk driving lesson, lake tour". The lake tour and the tuk-tuk lesson are already in [4] and are not repeated. Scooters are in `rentals[]`. |

## `lessons[]`

| Row | Copy | Rests on |
|---|---|---|
| [0] | "Surf lesson", 90 min, beginner/intermediate/advanced, USD 20 `per_person` | `lessons[0]` "Price Per Person – USD 20 (1 and Half Hours)" (2021 orphan page; the date is in block [3] ¶2, since `lessons[]` has no note field). Levels: `levels[0–2]` (home page "total beginner or chasing your next big ride"). `first_time` not set: not separately stated. |
| [1] | "Private lesson" | `lessons[3]` "book a private lesson with one of our instructors"; home page "private coaching" (`lessons[4]`). No price published. |
| [2] | "Group lesson", `groupSize` "Maximum 6", **no price** | `lessons[1]` "Group – Maximum 6 – USD100". The price is left out: `.note` "the unit is not stated (per group or per person unclear)", and the schema needs a unit. Owner item. |
| [3] | "Stand-up paddleboarding (SUP)" | `lessons[4]` (current home page). |
| [4] | "Surf spot tour" | `lessons[5]` (surf-shop-facilities page). |
| not a row | "7-day Learn-to-Surf program" | `lessons[2]` contradicts itself ("7-day … During the five days") and overlaps the Full package. Left out; owner item. |

## `priceList[]` (all USD; every note says "Price published in 2021")

| Rows | Copy | Rests on |
|---|---|---|
| [0–2] | Full Surf Lesson Package: private 400, shared double 300, shared triple 300, `per_week`, note "Per person, 7 nights" | `offers[0–2]`; `booking.payhere_links[0,4,8]` agree |
| [3–5] | Moderate Surf Lesson or Surf Spot Guiding Package: 350 / 295 / 280 | `offers[3–5]`; `payhere_links[1,5,9]` agree |
| [6–8] | Yoga and Surf Lesson Package: 300 / 280 / 280 | `offers[6–8]`; `payhere_links[2,6,10]` agree |
| [9–11] | Surf Board Rental Package: 290 / 250 / 250 | `offers[9–11]`; `payhere_links[3,7,11]` agree |
| [12–14] | Airport drop 65, pick-up 65, drop and pick-up 130, `flat` | `offers[15–17]` (unit "flat"). Also fits `facilities[8]` "airport shuttle (additional charge)". |
| not rows | Single lesson USD 20 | in `lessons[0]` (no duplication) |
| not rows | B&B / extra-room rates 20, 22, 25, 27; group lesson 100; lake tour 5 | See contradictions table, `lessons[2]` and block [4] ¶5 S3 |

`unit` "per_week" carries "per week". "Per person, 7 nights" is in `note` because the schema has no combined unit. TRIPPLE is spelled "triple".

## `rooms[]`, `stayInfo`, `amenities[]`

| Field | Copy | Rests on |
|---|---|---|
| `rooms[0]` | Small Double Room · 1 double bed · sleeps 2 · "8 m² on the top floor, with a small desk. You can see the ocean from the private entrance" | `room_types[0]` (Booking.com) |
| `rooms[1]` | Superior Double Room · 1 large double bed · 2 · "9 m² with a desk, a seating area and a garden view" | `room_types[1]` |
| `rooms[2]` | Double Room · 1 large double bed · 2 · "9 m² with a garden view" | `room_types[3]` |
| `rooms[3]` | Classic Triple Room · 3 single beds · 3 · "12 m² with a sea view" | `room_types[2]`. The 2021 packages page describes its A/C triple as "One Kingsize bed, one single bed" (`offers[24].raw`); the Booking.com 2026 room is used. Owner to confirm. |
| `rooms[4]` | Small Twin Room · 2 single beds · 2 · "8 m²" | `room_types[4]` |
| rooms, no rate | — | `room_types_note`, the schema rule "Live prices are not content", `audit.recommended.offer_framing`. A/C, private bathroom and private entrance are in `amenities[0–2]`, not in each note. |
| `stayInfo` check-in 14:00–19:00, check-out 06:00–11:00 | | `stay_info.check_in`, `.check_out` (Booking); Google agrees (`contradictions[4]` "compatible") |
| `stayInfo.note` | "Adults only. No pets, no smoking, no extra beds. Cash only. Quiet from 23:00 to 06:00. Bring photo ID and a credit card for check-in." (133/200) | `stay_info.house_rules` (Booking): "Children are not allowed" → "Adults only"; pets; smoking; "Cots and extra beds are not available"; "Accepted payment methods: Cash"; quiet 23:00–06:00; photo ID and credit card at check-in. "Parties/events are not allowed" left out of the note (house rule for Booking.com guests; the 2021 packages list a party night; owner to reconcile). |
| `amenities[0–2]` | A/C in every room; private bathroom in every room; private entrance to every room | `room_types_note` (Booking facilities) |
| `[3]` | Surf shop on site | `facilities[0]` |
| `[4]` | Gym | `facilities[1]` |
| `[5]` | Rooftop bar with a pool table | `facilities[3]` (Booking). Guests also mention the pool table (`quotes[3,5,6]`). The bar was closed for some guests in the 2025–26 season (`quotes[9].negative_text`). It is listed as a facility, with no opening times claimed. |
| `[6]` | Yoga on the rooftop | `facilities[5]` |
| `[7]` | Sun terrace | `facilities[13]` |
| `[8]` | Free WiFi · "57 Mbps" | `facilities[6]` (Booking speed test) |
| `[9]` | Free private parking · "reservation needed" | `facilities[7]` |
| `[10]` | Airport shuttle · "additional charge" | `facilities[8]` |
| `[11–15]` | Laundry; Daily housekeeping; Luggage storage; Currency exchange; CCTV in common areas and outside | `facilities[9,11,10,12,14]` |
| not rows | Restaurant / café; events (Wednesday party, reggae, movie nights); tours | Restaurant: `facilities[4]`, `contradictions[6]`. Events: `facilities[16].note` "no 2026 event evidence", `gaps[]` events. Tours: in block [7] ¶2. |

## `rentals[]`, `brands[]`

| Field | Copy | Rests on |
|---|---|---|
| `rentals[0]` | Surfboards · "Shortboards, longboards and fish" | `rentals[0].raw` "Shortboards, Longboard, fishtail". No price or deposit: `gaps[]` rentals prices. |
| `rentals[1]` | Cheeky Monkey boards · "Our own brand, shaped in Bali" | `rentals[1].raw` "our own branded Cheeky Monkey surfboards, shaped in Bali" |
| `rentals[2]` | Scooters | `rentals[3].raw` "rent scooter"; guest `rentals_note` "Boards und Roller … ausleihen" |
| `brands[]` | Cheeky Monkey; Creatures of Leisure; Shapers | `brands[5]`, `[0]`, `[1]`: the owner's site, current pages. **Not listed:** Quiksilver, Billabong, Rip Curl (`brands[2–4]`), which come only from the 2021 press release, so current stock is unconfirmed. Owner item. |

## `ratings[]`, `testimonials[]`

| Field | Copy | Rests on |
|---|---|---|
| `ratings[0]` | Google 4.5/5, 467 reviews, captured 2026-10-26 | `reviews.google` |
| `ratings[1]` | Booking.com 8.3/10, 45 reviews, captured 2026-10-26 | `reviews.booking` |
| not rows | Tripadvisor 4.5/5 (160); Google shop listing 3.2/5 (11) | Tripadvisor: read only through Google and "not verified on Tripadvisor" (403), so not shown. Shop listing: a second Google entity ("Clothing store"), and the schema's `platform` holds one Google row; the lodging listing is the one with the reviews behind it. **Flagged so the human can see the lower shop score was not shown.** |
| `testimonials[]` | 11 rows, verbatim from the dossier and pulled by script, not retyped: Christina (`site`, undated), Sienna, Jimmy, Serkan, Ligaya, Jenny, Lukas, Mihrican, Veronika, Hannah, Yunus (`booking`, `date` YYYY-MM) | `reviews.quotes[12,11,2,3,4,5,6,8,9,7,10].text`. Only the published positive text is quoted. Negative texts are separate Booking fields and are not merged in. |
| excluded | Tomas (`quotes[0]`) | Names "Chulanga" as the shop owner (`contradictions[0]`) |
| excluded | Sofie (`quotes[1]`) | 838 characters, over the 600 limit; a quote is never trimmed |

## `contact`, `bookingLinks[]`

| Field | Copy | Rests on |
|---|---|---|
| `contact.phone` | +94719248686 | `contact.phone.value` (Google, site, Facebook) |
| `contact.whatsapp` | "" | `contact.whatsapp.gap`: none published; a pitch point |
| `contact.email` | cheekymonkeymidi@gmail.com | `contact.email.value` |
| `contact.address` | "Galle - Matara Main Road, Midigama East Midigama, Ahangama 80650, Sri Lanka" | `location.address.value`, the Google listing with the postcode, in the site form the dossier note gives (the leading "Cheeky Monkey," business name dropped; words otherwise unchanged and already capitalised). Booking's "Weligama" not used. |
| `contact.mapUrl` | Google Maps place URL | `location.map_url.value` |
| `bookingLinks[0]` | "Check dates on Booking.com" → Booking.com listing | `booking.engine_url.value`; `audit.recommended.primary_action` "engine" (F1). The audit's label "See rooms and live dates on Booking.com" was shortened to a CTA of a few words, following the house preference for short buttons (Shahar, 2026-09-29, Global Surf gate). The full sense is kept in `closing`. |
| `bookingLinks[1]` | "Message us on Instagram" → instagram.com/cheekymonkeysrilanka/ | `booking.direct_channels` "Instagram DM"; owner's site: "write as a message in Instagram or via Mail" (`booking.path.note`). An existing channel the owner monitors (playbook §5). |
| not rows | PayHere "Book Now" payment links (16) | `booking.payhere_links.note`: unverified whether they work or what they charge, JS-only, on a 2021 orphan page from before the renovation. A payment link to a possibly stale price is not shipped. Owner item. |

## Deliberately not written: owner items

- **Current status**: open, closed for low season, or in Arugam Bay. Nothing stated (see above).
- **Opening hours** of the shop and café.
- **Current prices** for lessons, packages, transfers and the A/C add-on (all 2021), the group lesson's unit, the non-A/C double (20 vs 22), the B&B unit, and board-rental prices and deposit.
- **Whether the A/C add-on still exists**, given that every room now has A/C on Booking.com.
- **Whether the PayHere links still work**, and whether to use them.
- **Instructors**: names, ratio, ISA certification. Also yoga teachers and their certification.
- **Who runs the place today**, and whether to name the family.
- **The break(s)**: name, type, level fit.
- **Restaurant / café and bar**: open, and when.
- **Events**: the party, reggae and movie nights.
- **Brands stocked now**: Quiksilver / Billabong / Rip Curl.
- **WhatsApp** number, if any.
- **"One of the biggest surf shops down south"** and **"oldest surf guesthouse in town"** (`business.claims`): not used. They're superlatives from a 2021 page and a press release, with no current evidence.
