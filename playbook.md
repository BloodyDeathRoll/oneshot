version: 0.6.5

# playbook.md — what a great surf-business site is; shared by all agents.

About the site and the business's customer. Not about visual taste (that lives in `agents/designer/custom.md`) and not about scoring (that lives in `rubric.md`). Scout uses it to judge what is missing, harvester to know what to collect, designer to build, critic to check, writer to explain what was fixed.

Targets marked **(v0.1 target)** are starting numbers, to be tuned by the learning loop. Pass/fail thresholds belong in `rubric.md`.

## 0. The bar (Shahar, 2026-09-28 — read this first)

Every site we deliver must be **visually top level**, not only factually right. On 2026-09-28 three mockups for Global Surf were rejected because they were far worse than the business's own ageing site: ruled price tables and line drawings, while the business had hours of surf video and fifty photographs at 1920 px or more. Shahar: *"I dont ever want to see such low quality designs, for any reason."* So:

- **Better than the current site, visibly, at a glance.** If the business has a site, the new one must beat it side by side on the first screen and on the whole page — more beautiful, more engaging, clearer to book. A mockup that does not is not shown to a human.
- **At the level of the best surf and hospitality sites.** `agents/designer/references.md` and `agents/designer/gold/` are the bar. Ask of every page: would a top studio put this in its portfolio?
- **Lead with the business's strongest media.** A surf business sells a feeling: water, light, people surfing. Video first, then the best photographs, big. Type and data support the imagery; they do not replace it when the imagery is good.
- **The funnel lives inside a beautiful page, not instead of it.** One clear booking action is always visible (first screen and a persistent bar on mobile); prices and packages are one scroll or one tap away. A price table is never the first screen of a business that has strong media.
- **Two visual critics judge every mockup and every final site** (rubric.md). Either one below the bar blocks it.
- **The standard, set 2026-09-30:** the three Global Surf mockups (`agents/designer/gold/global-surf-notes.md`). Shahar: *"This is how you design a website! I don't want to see anything less for any target!"* Every business gets three designs at that level or better.

## 1a. Media: video leads, big photography follows

- **Use video whenever the business has any.** Their site's hero video, their YouTube/Vimeo channel, their public Instagram/Facebook reels: the harvester collects them (`dossier.videos[]`, `tools/fetch-video.mjs`) and the site uses the best of them. Video is more engaging than any still; not using a good video the business already made is a failure, not a style choice.
- **Hero video:** muted, looped, `playsinline`, no controls, a real poster image that is itself a great frame. The poster paints first; the video starts after first paint. Under `prefers-reduced-motion`, with `Save-Data`, or on a failed load, the poster stays and nothing moves. Renditions per `tools/fetch-video.mjs`: desktop ≤ 4 MB, mobile ≤ 2 MB, 6–20 s (6 s floor since 2026-09-30: a clean two-shot loop of the business's best footage beats a longer one padded with weaker shots), faststart.
- **Full-bleed photography is the preferred first screen whenever the material is strong enough** — a business-owned photograph at ≥ 1920 px (≥ 1200 px is the hard floor for anything drawn full-width). The pixel floor exists to stop upscaled phone photos; it is never a reason to avoid big imagery when big imagery exists.
- **More video later.** When a business has no video, say so as a pitch point; producing video for businesses that lack it is a planned service.

---

## 1. The customer

A travelling surfer (or a would-be one), on a phone, on hostel Wi-Fi or a local SIM, often already in the country or arriving within days. They found the business on Google Maps, Instagram or a friend's message. They compare 3–5 businesses in a few minutes and message the one that answers their questions fastest.

Secondary reader: the owner, who must recognise their own business in it.

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

1. **First screen:** the business's strongest media (video, else a great photograph) with what + where, the primary booking action, and one proof point (rating with count and source). The text and the booking action are usable before the media arrives.
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
- Video: muted, looped, poster-first, started after first paint (§1a). The poster counts in the first-load budget; the video file is loaded after first paint and counts in its own line below. Poster only under `prefers-reduced-motion`, `Save-Data`, or a failed load.
- Fonts: self-hosted, `font-display: swap`, subset; system fallback that doesn't reflow the page.
- No third-party trackers, chat widgets, cookie walls, newsletter or promo pop-ups. Nothing may cover the content or the booking action on load.
- A map is either a static image linking to Google Maps, or one of the page's embeds under the rule below.

- **Third-party embeds — at most two per page** (rule of 2026-09-22, Shahar; it was one until then). An embed is any iframe or script from another origin: Rosa's forecast widget, a map, anything else. All of these hold, for each one:
  - it loads only when its own block scrolls near the viewport — **zero third-party requests on load**, so the count below stays 0;
  - its space is reserved, so nothing shifts when it arrives, fails, or is refused;
  - it has a plain-link fallback with JavaScript off and when the request fails;
  - with **both** embeds loaded the page still meets every budget line below.
  Nothing else changes: no trackers, no chat widgets, no cookie walls, no pop-ups, and nothing that covers the content or the booking action.
- All assets self-hosted; the site must work when a CDN doesn't.
- Tap targets ≥ 44px; phone and WhatsApp are tap-to-act links.
- **Exception — the Rosa forecast** (optional block; the creative director decides per concept; rule of 2026-09-21, Shahar). The block has two halves:
  - **Left — the headline, drawn by the site:** wave height now, the time it is for, the swell (period and direction) and the wind (speed, on/cross/offshore), in the site's own type and colour, from Rosa's static per-spot JSON. Nothing day-by-day: no boxes, no row of days, no chart.
  - **Right — Rosa's own widget,** embedded exactly as Rosa ships it (an iframe of `https://rosa.surf/widget/`, see `agents/designer/tools.md`), in its light or dark theme, whichever fits the design. It is a promotion for Rosa and must stay recognisable as Rosa's: never restyled, cropped, covered or recoloured.
  - **Loading:** the widget is one of the page's at most two third-party embeds (§4). It and the headline's one request to the JSON are made only when the block scrolls near the viewport, never on first load, and are outside the first-load budget and the third-party-requests-on-load count below. Both halves have their space reserved with fixed dimensions, so nothing shifts when they arrive.
  - **Fallback:** with JavaScript off, with a request failed, or with data older than 24 h, the block shows a plain link — "See today's forecast for <spot> on Rosa" — never an empty box, never stale numbers shown as current.
  - One credit line, "Forecast for <spot> by Rosa", linking to the spot on Rosa. No cookies or trackers set by the site.

- **Booking-engine data (2026-09-29, pending Shahar's confirmation; treated like the Rosa exception):** a site whose owner sells through an engine with a public, CORS-open API (Bookinglayer: `docs/bookinglayer.md`) may call it **only after the visitor interacts** with the booking section (chooses a level, dates or guests) — never on first load — to show live dates, rooms and totals. A build-time snapshot ("prices as of <date>") is always the fallback, and the hand-off is a plain link / GET form to the engine's deepest documented step, so everything works with JavaScript off. No guest data, holds or payment on our pages.

**Performance budget, mobile home page (v0.1 target):**

| Item | Target |
|---|---|
| First-load transfer (no scroll, video excluded) | ≤ 1.5 MB |
| Hero video after first paint | ≤ 2 MB mobile · ≤ 4 MB desktop |
| JS, compressed | ≤ 300 KB |
| Largest above-the-fold image (poster or hero photo, AVIF/WebP) | ≤ 300 KB |
| Fonts | ≤ 2 families, ≤ 150 KB |
| LCP (measured on a throttled phone) | ≤ 2.5 s |
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
- Reviews quoted verbatim, with reviewer first name, source, date and link. Rating shown with count, source and capture date. The capture date is required on the headline rating blocks (platform score + count); a score quoted inside body copy needs no date of its own (Shahar, 2026-09-23). Never edited, never invented, never cherry-picked into a claim ("best school in Mirissa") the sources don't make.
- Named humans: owner, instructors. Certifications and safety claims only if sourced.
- Exact location and hours. A site that hides where it is reads as a scam to a traveller.
- **The address is the business's Google listing address, with its postcode** (standing rule of 2026-09-23, Shahar; refined the same day). Google's words, not Booking's, Hostelworld's or the owner's own spelling. Three refinements: (1) when Google shows no postcode, take it from another platform and note that source in `copy/sources.md`; (2) capitalise place names (street, village, town) even where Google writes them in lower case — no other change to the words; (3) order: street, town postcode, country — e.g. `207/A Welahangoda, Ahangama 80650, Sri Lanka`. Local search matches the site against that listing. If the dossier does not carry the Google listing address, that is a gap: flagged, never filled from another platform.

## 7. Honesty of facts

- Every fact on the site traces to a dossier entry with `source_url` + `fetched_at`. No dossier entry, no claim.
- Gaps are flagged, not filled: no invented prices, hours, seasons, certifications, review text, team names or history. Gaps become pitch talking points for the writer ("we couldn't find your prices anywhere online").
- Generic surf knowledge (coast seasons, swell directions, water temperature) is a fact like any other: sourced or omitted.
- Prices carry their capture date; the owner is told to confirm them before go-live.
- Marketing copy may be warm; it may not assert anything checkable that the dossier doesn't hold.
- Placeholder content is never shipped silently: any placeholder is visibly marked and listed for the owner.

## 8. Languages (`run.yaml`: `en`)

- Sites are **English only** for now (decided 2026-09-18). One language, one URL per page, `lang="en"`.
- Multilingual may come later, targeting the travelling audience (German, Spanish, Portuguese, Russian…), not the local language. Until then: no language switch, no half-translated pages.
- Keep the door open: all visible text comes through the content schema, so adding a language later is a content change, not a template rewrite. Nothing in the layout may depend on an English word's width.
- Business name, place names, prices and phone numbers are never translated.
- The pitch (writer: message and page) is always in English (Shahar, 2026-10-05); the site's language is the customer's.

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

Static Astro build per site, served from Cloudflare Workers static assets; no server code and no admin on the site itself. Until a sale the site is a demo built from its own content file in the schema's shape, previewed on `*.workers.dev`. After a sale the client chooses the product (PLAN.md §4 station 8): with a CMS, content comes from Payload at build time and owners edit there and the site rebuilds (PLAN.md §1, §6). The built output is plain static files, so it can also be exported as a zip that runs on any host. Server baseline: `server-hardening.md`.
