# Bookinglayer — reference for the designer and the deployer

Business: `global-surf-adventures` (Bookinglayer business id 1291, engine
`https://globalsurfadventures.bookinglayer.com`). Researched 2026-09-29, read only: nothing was
booked, no guest data was entered or submitted, no login, no payment endpoint called. The
engine's own guest step (`/guests`) was opened but left empty.

Raw evidence (request/response captures, screenshots, JS bundle, doc copies) is in the session
scratchpad `/tmp/claude-1000/-home-shahar--superset-worktrees-oneshot-verbose-sunset/947e8c6c-e64d-4014-bdb2-86380c1a4003/scratchpad/bookinglayer/`.
It is temporary and not committed. Useful files there: `samples/*.json` (one file per endpoint),
`run8-traffic.json` (the full browse, product to guest form), `deeplinks*.json`,
`cors-browser-test.json`, `sweep-accommodations-l1-female-7n.json`, `docs/*.md`.

Decision this serves (Shahar): the site has **its own booking pages**. The visitor picks the level,
sees what's included, sees the rooms, picks dates and guests. Only guest details and payment
happen in Bookinglayer.

---

## 1. Summary

| Question | Answer |
|---|---|
| Can a static site read live dates, rooms and prices? | **Yes.** The engine's own `https://api.bookinglayer.io/public/*` endpoints need no auth and send `access-control-allow-origin: *`, including a CORS preflight that allows `POST`. They were called from a browser page on another origin and all returned 200. |
| Are those endpoints documented? | **No.** Official docs cover only the **private** API (`/private/*`, Bearer API key from the owner's backoffice, not safe in browser code). `/public/*` is the engine's internal storefront API. It can change without notice. |
| Deep link with product, dates and guests? | **Yes, officially documented.** `…/en/product/<slug>?start=YYYY-MM-DD&end=YYYY-MM-DD&female=N&male=N&couple=N` |
| Latest step we can land on? | **The accommodation step** (`/en/product/<slug>/accommodation`), with guests, dates, duration and base price already filled in. |
| Pre-select the room? | **No.** There is no URL parameter for it, and the engine keeps its state in `sessionStorage` on its own origin. If only one room type is free for those dates, the engine assigns it automatically. Otherwise the visitor taps their room again and then presses Continue twice (add-ons, then the guest form). |
| Room photos from the API? | Weak: **one photo per room type**, and none for "Deluxe double room". The dossier has about 30 better room photos. |
| Rate limits? | None advertised (no `X-RateLimit-*` headers). `Retry-After` is in `access-control-expose-headers`, so 429s probably exist. About 40 calls spaced 1 s apart were never throttled. |

---

## 2. The engine's flow and the calls it makes

The engine is a React SPA (`app-cdn.bookinglayer.io/booking_engine/…`, Sentry release
`prod-2026-09-25__12-03-55`). Every API call carries
`business_domain=globalsurfadventures.bookinglayer.com` (below: `BD`). The engine also sends
`bookinglayer-app: bookingengine` and `x-new-guest-format: 1`. Calls without those headers
(curl, or a plain `fetch` from another origin) worked the same.

| Engine step (URL) | What the visitor does | Calls made |
|---|---|---|
| `/en/product/level-1-fomies` | page load | `GET /public/settings?app=frontoffice&BD`, `GET /public/translations?…`, `GET /public/products/level-1-fomies?new_pax_picker=1&expand[]=linkable_contents&BD`, `GET /public/guest_form/<productId>?BD` |
| same page | picks guests (Couples / Females / Males) | `GET /public/products/<productId>/availabilities?format=choosable&show_available_only=1&mode=checkin&start=<today>&end=<+2 months>&female=0&male=0&couple=1&BD` |
| same page | picks a check-in date | `GET …/availabilities?…mode=checkout&start=<checkin>&end=<+4 weeks>…` · `GET /public/accommodations/availabilities?product=<productId>&start=<in>&end=<out>&currency=USD&female=&male=&couple=&BD` · `GET /public/products/<productId>/capacities?start=<in>&end=<in>&BD` · `POST /public/packages/<productId>/items?BD` (price quote) |
| `/accommodation` | picks a room (URL changes here) | `POST /public/packages/<productId>/items` again, now with the room in `items` |
| `/configure/1` ("Upgrade your package") | sees inclusions and add-ons | none new |
| `/guests` | the guest form: age, gender, first/last name, level per guest | **We stopped here.** Nothing was typed or submitted. |

Product booking steps from the API: `["accommodations","package_items","guest_form","summary"]`.
After `summary` comes checkout and payment, which we did not reach.

### 2.1 Endpoints (all `GET` unless marked, all anonymous, all `access-control-allow-origin: *`)

**Product** (`/public/products/<slug or uuid>?new_pax_picker=1&expand[]=linkable_contents&BD`)
returns `id`, `translations.en.title`, `description`,
**`extended_description`** (HTML inclusion list: "7 nights accommodation · 7 breakfasts · 5 dinners · 5
guided surf sessions…"), `main_image`/`images` (1 each), `pax.picker` (type `gender`, options
female/male/couple, max 6), `duration` (`variants: [8,15,22,29]` **days** = 7/14/21/28 nights,
`is_flexible: false`), `currencies` (USD only), `price_from: null`.
The same endpoint with an **accommodation uuid** returns that room's record (title, description,
images). `/public/accommodations/<id>` is 404.

| Product | slug | id |
|---|---|---|
| LEVEL 1 - Fomies | `level-1-fomies` | `877aef3d-86ed-4b60-8932-03e49c613af8` |
| LEVEL 2 - Rollers | `level-2-rollers` | `4b58b491-24fc-4fb8-a40d-2705df961db4` |
| LEVEL 3 - Riders | `level-3-riders` | `54ec3447-2efb-4677-8685-f272e00d32e8` |
| Freestylers - B&B only | `freestylers-bb-only-package` | `b8ab9bc2-8041-41d6-807c-249838eeb086` (flexible 4+ nights; **no choosable dates** on 2026-09-29 for 1 male through Apr 2027) |

**Category / listing**: `/public/widgets?BD` and `/public/widgets/sri-lanka?BD` list the category
and its products. `/public/products?BD` returns 422 ("id field is required").

**Check-in / check-out calendar** (`/public/products/<id>/availabilities?format=choosable&show_available_only=1&mode=checkin|checkout&start=&end=&female=&male=&couple=&BD`):
```json
{"data":{"first_available":"2026-10-03","dates":{"2026-10-03":{"choosable":true},"2026-10-04":{"choosable":false}, …}}}
```
One call covers a whole season. For 1 female, the choosable Saturdays through 2027-09-30 were:
2026-10-03, 10-24, 10-31, 12-19, 2027-01-23, 01-30, 02-13, 02-20, 02-27, 03-06, 03-13, 03-20, 03-27, 04-03.
The response depends on the guest mix.

**Capacities** (`/public/products/<id>/capacities?start=&end=&BD`) gives the pax maximums for that
date (female ≤ 6, male ≤ 6, couple ≤ 3).

**Rooms for a stay** (`/public/accommodations/availabilities?product=<id>&start=<in>&end=<out>&currency=USD&female=&male=&couple=&BD`)
returns one entry per room type that is free. The engine shows one entry per title. Each entry has
`id` (a **physical room**: backoffice "Twin room - 5", "Double room - 11"…), `translations.en.title` and
`description`, `images`, `capacity`, `pax.availability` (spots left, e.g. "4 spots available"),
`price.from` (supplement **per person** for the whole stay; `null` = included). Observed, Level 1,
7 nights:

| Room type (engine title) | Supplement, 1 female | Couple (per person / total) | Notes |
|---|---|---|---|
| Mixed dorm room - 4 beds | $0 | $0 | "private outdoor bathroom" |
| Shared Twin Room - 2 Beds | $140.04 | $80.025 / $160.05 | "Privately reserve … for an additional $350" (`single_room_supplement`) |
| Deluxe double room | $418.46 | $418.46 / $836.92 | no photo in Bookinglayer |

Which rooms are offered changes by date. On 3 Oct 2026 and 13 Feb 2027 only one room type was
offered, and the engine assigned it without asking.

**Price quote** (`POST /public/packages/<productId>/items?BD`, `content-type: application/json`):
```json
{"start":"2027-02-20","end":"2027-02-27","currency":"USD",
 "guests":[{"id":"<client uuid>","index":1},{"id":"<client uuid>","index":2}],
 "items":[{"id":"<accommodation id>","guest_id":"<guest uuid>","value":["2027-02-20", …,"2027-02-27"],"variant_id":null}, …one per guest]}
```
It returns `totals` (`{"base":2932,"accommodations":160.05,"total":3092.05}`),
`accommodations[].price.current`, `single_room_supplement.value`, and `items[]`: the package
inclusions, each with title, description, 1 image and a price (0 = included). The only paid
add-on is "Airport pickup / drop off", from $220 per person. With `"items": []` it returns the base
price only. The response has **no cart id, token or cookie**, so it looks like a stateless quote. It
does not hold availability. That is inferred from the response: we cannot see the server side.

Observed totals (USD, base = package price, supplements on top):

| Sample | Base | Room | Total |
|---|---|---|---|
| L1, 1 female, 3 Oct 2026, 7 n, dorm | 1466 | 0 | 1466 |
| L1, couple, 3 Oct 2026, 7 n, dorm | 2932 | 0 | 2932 |
| L1, 1 female, 13 Feb 2027, 7 n, twin (auto-assigned) | 1466 | 140.04 | 1606.04 |
| L1, couple, 20 Feb 2027, 7 n, twin / double | 2932 | 160.05 / 836.92 | 3092.05 / 3768.92 |
| L1, 1 female + 2 males, 20 Feb 2027, 7 n, no room yet | 4398 | — | 4398 |
| L2, couple, 13 Feb 2027, 14 n, twin (auto) | 5278 | 320.10 | 5598.10 |

The API returns floats such as `140.03999999999996`. Round to 2 decimals and hide `.00`, as the
engine does (`frontoffice_currency_hide_cents_when_0: true`).

**Settings** (`/public/settings?app=frontoffice&BD`) exposes the engine's config: theme and custom
CSS (`frontoffice_v2_custom_css` is in use), Google font, head/body injection, logo, the tracking
the engine loads (Facebook pixel, Google Ads, GA), minimum guest age 16 (the guest form requires
18), and `frontoffice_deeplink: false`. The deep links below work even though that setting is false,
so the setting controls something else (unknown what).

### 2.2 CORS, auth and limits (tested)

- Preflight `OPTIONS /public/packages/…/items` with `Origin: https://example.com` returned `204`,
  `access-control-allow-origin: *`, `access-control-allow-methods: POST`,
  `access-control-allow-headers: content-type,accept-language`, `access-control-max-age: 600`.
- From a real Chromium page at `https://site.oneshot-test.example`, every call (the season
  calendar, the rooms list, 4 quotes) returned 200. Each took 480–790 ms (`cors-browser-test.json`).
- No auth, cookies or API key. `cache-control: no-cache, private`, so responses can't be cached at
  the edge as they are.
- No rate-limit headers. `Retry-After` is exposed, so expect 429s under load. We did not probe the
  limit.

---

## 3. Deep links (handoff)

Official help article: "Pre-setting language, start date, and number of guests via URL query
parameters" (support.bookinglayer.com/en/articles/2033219, updated 2024-10-01). Parameters:
`start`, `end` (YYYY-MM-DD), `duration` (**days**, so 7 nights = 8), `male`, `female`, `couple`,
`genderless`/`guest` (only when the engine uses the genderless picker, which this one doesn't),
`currency`. The language goes in the path (`/en/`). The engine's code (`product.*.chunk.js`)
parses exactly `start, end, duration, female, male, couple, genderless, guest` and nothing else.

Tested, each in a fresh browser:

| URL (base `https://globalsurfadventures.bookinglayer.com/en/product/`) | Landed on | Filled in |
|---|---|---|
| `level-1-fomies?start=2026-10-03&end=2026-10-10&couple=1` | `/accommodation` | guests 2, 3→10 Oct, 7 nights, base $2932, dorm auto-assigned, **Continue** active |
| `level-1-fomies?start=2027-02-13&end=2027-02-20&female=1` | `/accommodation` | 1 female, twin auto-assigned (+$140.04), total $1606.04 |
| `level-1-fomies?start=2027-02-20&end=2027-02-27&couple=1` | `/accommodation` | guests and dates. Three room types listed "from $X / person", **none selected** |
| `level-1-fomies?start=2027-02-20&end=2027-02-27&female=1&male=2` | `/accommodation` | 3 guests, base $4398, rooms listed, none selected |
| `level-2-rollers?start=2027-02-13&end=2027-02-27&couple=1` | `/accommodation` | 14 nights, total $5598.10 |
| `level-1-fomies?start=2026-10-03&duration=7&couple=1` | `/accommodation` | the engine read 7 days (end 9 Oct), then silently corrected it to 10 Oct. **Use `end`, not `duration`.** |
| `level-1-fomies?start=2026-10-04&end=2026-10-11&female=1` (not a check-in day) | product page | guests only; the date was dropped and "Choose dates" shown |
| `level-1-fomies?couple=1` | product page | guests only; "Choose dates" |
| `level-1-fomies?…&guest=2` | product page | dates only; guests 0 (ignored with the gender picker) |
| `level-1-fomies?…&couple=1&currency=EUR` | `/accommodation` | still USD (only USD enabled) |
| `…/accommodation?…`, `…/configure/1?…`, `…/guests?…` | `/accommodation` | same as the plain URL. Deeper paths fall back. |
| `level-1-fomies?…&accommodation=<id>` | `/accommodation` | the room param was ignored |
| `level-1-fomies#start=…&couple=1` | product page | nothing (hash ignored) |

The engine then removes the query string from the address bar.

**The furthest landing is the accommodation step.** From there to payment the visitor does:
tap their room (only when more than one type is offered) → Continue (inclusions and add-ons, e.g.
airport pickup) → Continue (guest form) → checkout/payment. We can't land deeper:

- The engine keeps the flow in `sessionStorage["frontoffice_stepsProductState"]` on its own
  origin. Our site can't write it.
- The private API has `POST /private/carts` (holds availability) + `POST /private/bookings`. That
  needs the owner's secret API key, so it needs server code, which our static sites don't have
  (PLAN.md §1). It also creates real holds and bookings, which is outside what the site should do.
- No public cart or session endpoint showed up in the traffic before the guest form. We didn't go
  looking past it (that would mean submitting guest data).

A plain HTML `<form method="get" action="…/en/product/level-1-fomies">` with inputs `start`,
`end`, `female`, `male` and `couple` builds exactly this URL **with JavaScript off**. That meets
playbook §5 ("a real link, works JS off").

---

## 4. Room photos

| Source | Dorm | Twin | Deluxe double | Sizes |
|---|---|---|---|---|
| Bookinglayer API | 1: `…/1291/2019/10/26/20190913-_DSC8048-HDRroom%206.jpg` | 1: `…/1291/images/c4a-1662954204.png` | **none** | Dorm JPG: original 2400×1600 (338 KB), `960_` 960×640 (130 KB), `320_` 320×214, `100_` 100×67. Twin: original PNG 800×533 (669 KB); variants are WebP `32_/320_/960_…webp` (the `960_…png` paths return an XML error). CDN `bookinglayer-cdn.ams3.cdn.digitaloceanspaces.com`, `max-age=3600` |
| Dossier, globalsurf.com originals (2000 px, `license: business-owned`) | img-063 (same shot as the API dorm photo, DSC8048), img-064 (bathroom) | img-013, img-068 | img-015, img-066, img-067, img-069 | 2000×1333 (from 6000×4000 originals) |
| Dossier, Booking.com listing (`license: business-owned`: property-uploaded, OTA photos usable per Shahar) | img-078 | img-042, img-095 | img-028, img-029, img-041, img-043, img-045, img-048, img-080–img-084 | mostly 2000×1333 / 1333×2000 |

The table maps photos to rooms from the harvester's one-line descriptions only. **Which photo
shows which bookable room type is a gap: the owner has to confirm it.** Booking.com uses other names
for the rooms ("Deluxe Double", "Superior Twin", "Bed in Dormitory"), and the site says "4 twin, 4
double/triple, 4 family" (`dossier.json → rooms`).

Recommendation: galleries use the dossier photos, self-hosted and optimised (playbook §4: all
assets self-hosted). The API images are not needed and should not be hot-linked.

---

## 5. Official docs, summarised

- **API** (docs.bookinglayer.com/api): "Bookinglayer's **Private** API". Base
  `https://api.bookinglayer.io/private`. Auth is a Bearer API key made in the backoffice (Settings →
  API → Tokens). The docs warn: never put it in "not secured client-side code". CORS is supported.
  Resources: persons, guests, bookers, carts, bookings, booking lines, invoices, payments, refunds,
  products, product categories, discounts, custom fields, webhooks. Nothing on availability or
  pricing search, no rate limits, and nothing on `/public`.
- **Carts** (`/private/carts`): creating one holds availability until `expire_at`.
  `POST /private/bookings` with `cart_id` confirms it. Custom prices are "only honored on
  authenticated requests; ignored on public storefront calls". So a public storefront cart exists,
  but it is undocumented.
- **Webhooks**: minimal payloads announcing booking events. We would need them only if the CMS had
  to react to bookings. It doesn't today.
- **Deep links**: see §3 (article 2033219). "How to link a website to the Booking Engine" (4687635)
  covers the same links plus buttons.
- **Custom engine domain** (2033220, updated 2025-09-17): CNAME `bookings.<client-domain>` →
  `globalsurfadventures.bookinglayer.com`. Bookinglayer support then issues SSL. **With Cloudflare
  the record must be DNS-only (grey cloud).** This is what lets the handoff stay on the client's
  own domain.
- **Booking Widget** (10053779, updated 2025-08-18): an **iframe** list or calendar of live
  availability. It is an "Advanced Feature" enabled through Bookinglayer sales, and it works
  **only for packages with pre-set dates and durations**. GSA's packages are "check-in on choosable
  Saturdays" (`is_on_bookable_dates: false`), so it probably doesn't apply. It would also be a
  third-party embed in Bookinglayer's styling. Not recommended.
- **Engine theming**: the backoffice has theme, custom CSS, Google fonts, logo and head/body
  injection (`/public/settings`). The owner already uses custom CSS. Making the engine match the
  new site is a backoffice job for the owner (or us with their access). We have no access now.

---

## 6. Recommendation

**Build time (Astro, no request from the visitor's browser):**
1. Fetch the 4 products: titles, descriptions, the `extended_description` inclusion list, and the
   `items` from one quote (inclusions and add-ons with descriptions).
2. Fetch the season calendar per product. One `mode=checkin` call per guest mix, for female=1 and
   couple=1.
3. Build a small **price snapshot**: for each product × duration (7/14/21/28) × a sample check-in
   per season, the base price per person and each room type's supplement per person (single and
   couple). Prices so far were flat per person across Oct and Feb, so this is a few dozen calls.
   Ship it as static JSON inside the page, labelled "prices as of <build date>".
4. Room types, copy and galleries come from **Payload** (owner-editable, dossier photos). Each
   room type is keyed by its **engine title** ("Shared Twin Room - 2 Beds"), because the API ids
   are physical rooms and several share a title.

**On interaction only (lazy; 0 third-party requests on first load):**
5. When the visitor has picked a level and a guest mix, make one `GET …/availabilities?mode=checkin`
   to grey out full Saturdays.
6. When they pick a date and duration: one `GET /public/accommodations/availabilities` (which room
   types are free, spots left, supplement), then one `POST /public/packages/<id>/items` per room
   type shown (exact totals). All CORS-allowed, about 0.5–0.8 s each.
   Reserve the space and show the snapshot price while loading. If a call fails or times out, keep
   the snapshot price marked "from", never an empty box. This follows the Rosa JSON rule
   (playbook §4): a data fetch, not an embed.
7. **Handoff**: a plain link or GET form to
   `https://globalsurfadventures.bookinglayer.com/en/product/<slug>?start=<in>&end=<out>&female=&male=&couple=`
   (always `end`, never `duration`). The visitor lands on the accommodation step with everything but
   the room filled in. Say this on our page beside the button, e.g. "Next: confirm your room, add
   airport pickup if you want it, then your details and payment." With a custom engine domain,
   this becomes `bookings.globalsurf.com/…`.

**What it cannot do:**
- Pre-select the room in the engine (unless it's the only room type free), or land on the add-ons
  or guest-form step.
- Hold a room. The visitor can see "2 spots left" on our page and find it gone in the engine.
- Show the engine's per-guest level or age rules. Those stay in the engine's guest form.
- Show prices in any currency but USD, or promise the live price without JavaScript (JS-off users
  get the snapshot and the link).

### 6.1 Risks

| Risk | Likelihood / impact | Mitigation |
|---|---|---|
| `/public/*` is undocumented; field names or paths change (the SPA deploys roughly weekly; `new_pax_picker=1` and `x-new-guest-format` show migrations under way) | medium / live prices break | Validate the response shape. On any mismatch, fall back to the snapshot plus link. The build fails loudly if the build-time fetch changes shape. |
| CORS tightened to Bookinglayer origins | low–medium / live layer dead | Same fallback. Deep links are documented and much more stable. |
| Rate limiting (429; `Retry-After` exposed) | low at this site's traffic | Debounce: at most one rooms call per date change and quotes only for rooms shown. Honour `Retry-After`. Nothing on first load. |
| Terms of use for the storefront API from another origin: unknown | unknown | Ask the owner or Bookinglayer support before launch. Their API docs endorse client-side use only for the private API. |
| Snapshot goes stale (seasonal pricing: `has_seasonal_pricing: true`) | medium / wrong "from" price | Label it with the date. Rebuild on a schedule (see open decision). The live quote corrects it on interaction. |
| Availability race between our page and the engine | certain, occasionally | The copy never promises a hold. The engine is the truth. |
| Owner changes slugs or products in the backoffice | low / broken links | The build checks each slug returns 200 and fails otherwise. |
| Float noise in prices (`140.03999…`) | certain | Round to cents; hide `.00`. |
| Freestylers currently has no dates | now | Show it as "ask us" (WhatsApp) until the calendar returns dates. |

### 6.2 Fallback (no live calls at all)

Build-time snapshot (§6 steps 1–3) plus the GET-form deep link, with WhatsApp as a secondary
action (playbook §5). The visitor still sees levels, inclusions, rooms, choosable Saturdays and
"from" prices, and still lands on the engine's accommodation step with dates and guests filled in.
This is also the JS-off path of the recommended design, so both ship together.

### 6.3 Open decisions for Shahar (not in PLAN.md)

1. **Scheduled rebuilds.** Today the site rebuilds only on Payload Publish (PLAN.md §1). A snapshot
   of dates and prices needs a timed rebuild (e.g. daily) for this tenant. Is that allowed?
2. **Live calls after interaction.** Do lazy `fetch` calls to `api.bookinglayer.io` count under the
   Rosa JSON precedent (a data request after interaction, outside the first-load count), or does
   this need its own playbook rule?
3. **Custom engine domain** `bookings.globalsurf.com` (the owner asks Bookinglayer support; a
   DNS-only CNAME in Cloudflare).
4. **Room-photo mapping**: the owner confirms which dossier photos show the dorm, twin and deluxe
   double.
