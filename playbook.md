version: 0.1.0

# playbook.md — what a great surf-business site is; shared by all agents.

About the site and the business's customer. Not about visual taste (that lives in `agents/designer/custom.md`) and not about scoring (that lives in `rubric.md`). Scout uses it to judge what is missing, harvester to know what to collect, designer to build, critic to check, writer to explain what was fixed.

Targets marked **(v0.1 target)** are starting numbers, to be tuned by the learning loop. Pass/fail thresholds belong in `rubric.md`.

---

## 1. The customer

A travelling surfer (or a would-be one), on a phone, on hostel Wi-Fi or a local SIM, often already in the country or arriving within days. They found the business on Google Maps, Instagram or a friend's message. They compare 3–5 businesses in a few minutes and message the one that answers their questions fastest.

Secondary readers: a local customer reading Sinhala; the owner, who must recognise their own business in it.

This persona is a v0.1 assumption, not research; correct it from pitch outcomes and owner feedback.

The site has one job: get that person from "who are these people" to a sent booking message, without them having to ask for anything the site could have told them.

## 2. What they need to decide

Every item is a question the visitor has. If the dossier has the answer, the site shows it. If not, it is a gap (§7), never a guess.

| Question | What the site shows |
|---|---|
| What is this and where? | Business type + place in one line, above the fold ("Surf lessons in Mirissa"). |
| Is it for my level? | Levels served, stated plainly: first-timer / beginner / intermediate / advanced. For rentals: board types and sizes. |
| What does it cost? | Prices with currency and unit (per lesson, per hour, per day, per night), and the date the price was captured. No "contact us for prices" when the price is known. |
| What's included? | Board, rash vest, instructor ratio, lesson length, transport, photos/video, meals, insurance — only what the dossier confirms. |
| Where exactly, and which wave? | The spot: name, break type (beach/reef/point), bottom, how far from the business, who it suits. Map pin, nearest landmark, how to get there. |
| When is it good? | The business's own season and daily timing (tide/wind-dependent lesson times). Closed months stated. |
| Can I trust them? | Rating + review count with source and date, a few verbatim reviews with links, real photos of real people and place, instructor names, certifications only if sourced, years operating. |
| Will we understand each other? | Languages spoken by staff. |
| How do I book, and how fast will they answer? | One primary action (§5), hours, expected reply time if known. |

By business type (`run.yaml` `types`), what leads:

| Type | Lead with |
|---|---|
| surf_school | levels, lesson price/length/ratio, what's included, instructors, reviews |
| board_rental | board list with sizes, price per hour/day, deposit/ID rules, distance to the water |
| surf_shop | what's stocked, brands, repairs, hours, location |
| surf_camp | package contents, price per week/night, room types, daily schedule, level fit |
| beach_lodging | rooms, price per night, distance to the break, board storage/rental, what's nearby |
| shaper | boards made, lead time, price range, repairs, how to order |

## 3. Content hierarchy

Order on the home page, mobile first. One page can carry all of it for a small business; split into pages only when a section outgrows a screen or two.

1. **First screen:** what + where, primary booking action, one proof point (rating with count and source). Nothing else has to load for this to be usable.
2. Offers with prices (lessons by level / rentals / packages / rooms).
3. What's included, and who it's for.
4. The spot and the season.
5. People: owner, instructors, languages.
6. Reviews (verbatim, sourced).
7. Location: map, landmark, directions, hours.
8. FAQ: only questions the dossier can answer.
9. Contact block repeated in the footer: WhatsApp, phone, address, hours, socials.

The booking action is reachable from every screen without scrolling back (persistent on mobile).

## 4. Mobile on bad connections

Assume a mid-range Android, slow 4G dropping to 3G, metered data.

- Text and the booking action are usable before images, fonts or scripts arrive. Core content is in the HTML, not injected by JS.
- Images: responsive `srcset`, AVIF/WebP with JPEG fallback, explicit dimensions, lazy below the fold.
- No video autoplay on mobile unless tiny, muted, poster-first, and outside the first-load budget.
- Fonts: self-hosted, `font-display: swap`, subset; system fallback that doesn't reflow the page.
- No third-party trackers, chat widgets, cookie walls, newsletter or promo pop-ups. Nothing may cover the content or the booking action on load.
- Map is a static image linking to Google Maps, not an embedded map on load.
- All assets self-hosted; the site must work when a CDN doesn't.
- Tap targets ≥ 44px; phone and WhatsApp are tap-to-act links.

**Performance budget, mobile home page (v0.1 target):**

| Item | Target |
|---|---|
| First-load transfer (no scroll) | ≤ 1.5 MB |
| JS, compressed | ≤ 300 KB |
| Largest above-the-fold image | ≤ 200 KB |
| Fonts | ≤ 2 families (+ Sinhala face on `si` pages), ≤ 150 KB on `en` pages |
| LCP (Lighthouse mobile, throttled) | ≤ 2.5 s |
| CLS | < 0.1 |
| Third-party requests on load | 0 |

Context: of the six resort sites measured for `agents/designer/references.md`, five shipped 3.5–14.4 MB on first mobile load (single headless run, no scroll). That is what we must not deliver.

## 5. Booking path

- Use the path the owner already answers: WhatsApp first where it exists, then phone, then the owner's existing third-party engine. The site does not introduce a channel the owner doesn't monitor.
- WhatsApp link uses the full international number from the dossier (`+94…`) and a prefilled message naming the business and what the visitor chose (offer, date, people, level) so the owner gets a usable first message.
- The link is a real link: it works with JS off, on desktop (WhatsApp Web) and on mobile (app).
- Phone as `tel:` fallback next to it. Hours and expected reply time beside the action when known.
- No payment capture on the site. No form that posts nowhere. A form → email path is an open question (PLAN.md §9); do not assume it.
- "Works end to end" means: a tester on a phone taps the action and lands in a chat/call/engine with the right business, with the chosen details carried over.
- If the dossier has no verified booking contact, that is a blocking gap: report it, don't ship a guessed number.

## 6. Trust signals

- Real photos of this business, its people, its beach. Image license notes from the dossier are respected; an image of unknown ownership is not used as if it were theirs.
- Reviews quoted verbatim, with reviewer first name, source, date and link. Rating shown with count, source and capture date. Never edited, never invented, never cherry-picked into a claim ("best school in Mirissa") the sources don't make.
- Named humans: owner, instructors. Certifications and safety claims only if sourced.
- Exact location and hours. A site that hides where it is reads as a scam to a traveller.

## 7. Honesty of facts

- Every fact on the site traces to a dossier entry with `source_url` + `fetched_at`. No dossier entry, no claim.
- Gaps are flagged, not filled: no invented prices, hours, seasons, certifications, review text, team names or history. Gaps become pitch talking points for the writer ("we couldn't find your prices anywhere online").
- Generic surf knowledge (coast seasons, swell directions, water temperature) is a fact like any other: sourced or omitted.
- Prices carry their capture date; the owner is told to confirm them before go-live.
- Marketing copy may be warm; it may not assert anything checkable that the dossier doesn't hold.
- Placeholder content is never shipped silently: any placeholder is visibly marked and listed for the owner.

## 8. Languages (`run.yaml`: `en`, `si`)

- `en` is the default for the travelling customer; `si` is a full second language, not a token page. Language switch is visible on every page; each language has its own URL and correct `lang` attribute, with `hreflang` links between them.
- Sinhala copy is written or checked by someone who reads Sinhala before go-live. Machine-translated text is marked for owner review, never shipped as final.
- Sinhala script needs a font that covers it (self-hosted, loaded only on `si` pages), more line-height than Latin, and no uppercase, letter-spacing or faux-italic styling. Text effects must not split Sinhala by code point — conjuncts and vowel signs break; split by word or grapheme cluster, or not at all.
- Layout tolerates both languages: Sinhala strings run longer/taller; nothing depends on an English word's width.
- Business name, place names, prices and phone numbers stay identical across languages.
- The outreach message (writer) is in the owner's language; the site's default is the customer's.

## 9. What the owner must be able to edit alone

From the CMS admin (ideally usable on a phone), without touching code, and without being able to break the layout:

- Prices and the offer list (add/remove/reorder lessons, rentals, packages, rooms).
- Opening hours, season dates, a "closed / away until" notice, a short announcement line.
- WhatsApp number, phone, email, address, social links.
- Photos: hero and gallery (upload from phone; the site crops, resizes and compresses — the owner never has to).
- Text blocks in each language: intro, about, what's included, FAQ entries.
- Reviews shown (add/remove, with source link).
- Team members (name, photo, role, languages).

Not owner-editable: layout, styles, scripts, fonts, SEO plumbing. Those stay fixed so an edit can't break the site.

## 10. Accessibility and findability

- WCAG 2.1 AA as the floor: contrast, keyboard operation, visible focus, alt text on meaningful images, real headings in order, labelled controls, `prefers-reduced-motion` honoured.
- Content that matters exists as text in the DOM — not only inside images, video or canvas.
- Title and description per page and language; `LocalBusiness` structured data built only from dossier facts; canonical + `hreflang`.
- An Open Graph image, title and description: when the link is pasted into WhatsApp or Instagram, the preview is the first impression.

## 11. Delivery constraints every agent should know

Static HTML/CSS/JS + flat-file PHP CMS, no database, uploaded as one folder to GoDaddy shared hosting (PLAN.md §1, §6). No server-side build, no Node at runtime. Security baseline: `cms-hardening.md`.
