# designer / references.md — curated examples (URLs + what we like about each), cached notes.

- https://ranchosantana.com
- https://malibupopoyo.com
- https://morgansrock.com
- https://tandjungsarihotel.com
- https://white-desert.com
- https://kubehotel-saint-tropez.com/en

Cached analysis so the designer prompt never depends on a live fetch. Home pages only. Captured 2026-09-17.

## How this was verified

- **HTML:** `curl` of each home page (all six returned 200). Scripts, stylesheets, font links, inline JS, booking URLs read from source.
- **CSS/JS:** linked bundles downloaded and string-searched for White Desert (30 files linked from the HTML) and Tandjung Sari (96 files). Lazy-loaded chunks not linked from the HTML were not inspected. For the other four, script/style URLs and inline code were read; external bundles were not opened.
- **Rendered probe:** headless Chrome 153 via playwright-core, desktop 1440×900 and mobile 390×844 (iPhone UA, touch). Read from the live DOM: loaded fonts, computed font/size/weight of h1/h2/h3/body, `display:grid` containers and their column templates, `<canvas>`/`<video>`/`<iframe>` counts, JS globals, third-party hosts.
- **Screenshots:** top of page + 8 scroll stops per viewport, overlays dismissed where possible, plus one shot after clicking the booking CTA. Stills only.
- **Weight:** CDP transfer size of first mobile load, no scroll, no consent given, one run each. Order of magnitude, not a benchmark.

Limits that apply to every site below:

- **Motion was never seen moving.** Anything about easing, speed or feel is **inferred** from libraries, code or differences between consecutive stills, and is marked so.
- Hover states were not exercised. Inner pages were not visited. Booking engines were opened at most to their first screen; no search or booking was submitted.
- Headless, software GL, no cookies. Two video embeds were blocked for this client by a Cloudflare challenge (noted per site); real visitors probably see them — **not observed**.
- **No `<canvas>` element was present on any of the six home pages, and no three.js/WebGL code was found in any HTML or inspected bundle.** None of these references demonstrates canvas or WebGL work. Their immersion comes from photography, video, type scale, grid and scroll-linked DOM animation.

Tags used below: **[obs]** observed directly (source, DOM or screenshot) · **[inf]** inferred · **[n/o]** not observed.

---

## 1. ranchosantana.com — Rancho Santana, Nicaragua (resort + real estate)

**Verified:** HTML, rendered probe, screenshots (desktop + mobile), booking CTA clicked in both viewports. External CSS/JS bundles not opened.
**Not observed:** hover states; what the booking search does after submit (target read from HTML only); hero video motion.

Stack [obs]: WordPress, custom theme `rancho-wp`, WPML (en/es), WP Rocket (delay JS, lazy images/iframes, local fonts). jQuery, Flickity, Magnific Popup, Zebra datepicker, nice-select. No scroll-animation library found.

- **Layout** [obs]: White page, generous margins. Full-viewport hero video with headline set low-left, one paragraph, one outline button, phone number bottom-right. Below: 3-column photo-tile grids where the label sits *on* the photo (white serif, bottom-left) and the centre tile is taller than its neighbours, breaking the row line. Alternating 50/50 media-text blocks (`wp-block-media-text`, 720/720 px). One full-bleed dark photo section with text over it (Wellness). A numbered slider ("02 —— Retreats") with round prev/next buttons. 3-column blog tiles. Dark footer with newsletter. Mobile: grids become swipe carousels with the next card peeking (`mobile-slider`); sticky header = logo + outlined "Reserve Now" + hamburger.
- **Motion** [inf]: Flickity carousels; hero `<video>` (mp4, separate desktop file) — different frames across two captures suggest it plays. No evidence of scroll-linked animation. Overall a nearly static site.
- **Typography** [obs]: Display serif **IvyMode** (Adobe Fonts; h1 80 px/600, h2 50 px/400, h3 40 px/400), sentence case, tight leading. Body **Lexend** 300, 16 px. Text `#2F323D` on white; sand/gold accent for links and buttons. Two families total.
- **Booking UX** [obs]: "Reserve Now" in the header does not navigate: on desktop it drops a one-row bar under the header (check-in – check-out · guests · Search); on mobile it opens a full-screen white sheet with the same three controls and a close ×. Search hands off to the Preferred Hotels IBE (`phgsecure.com/IBE/bookingRedirect.ashx`, from HTML) [target n/o]. Phone number is persistent in the hero.
- **Imagery** [obs]: Professional, warm, people-in-place (dancers, a father and child on the beach, a masseuse, a surfer carrying a board), aerial coast shots. Photos carry the labels; almost no icons or illustration.
- **Reuse:** label-on-photo tiles with one tall tile to break the grid — cheap, static, works with few images. Two-family type system with a characterful serif at large size. Booking CTA that reveals a tiny inline panel instead of navigating; full-screen sheet on mobile. Grid → swipe-with-peek on mobile. First mobile load measured 0.5 MB/44 requests (JS deferred until interaction, images lazy) — the delay-until-interaction idea is reusable without the plugin.
- **Wouldn't reuse:** a chat widget that covers the lower-left quarter of the mobile viewport on every screen [obs]; 51 third-party hosts contacted on one desktop load (Triptease, Zapier chatbot, collect.chat, CrazyEgg, Clarity, Quantcast, TikTok, Pinterest, Bing, CallRail, accessiBe…) [obs]; mega-menu IA for a business with five things to say; depends on a deep library of professional photos our businesses don't have.

## 2. malibupopoyo.com — Malibu Popoyo, Nicaragua (surf + yoga resort)

**Verified:** HTML, rendered probe, screenshots (desktop + mobile, after dismissing a pop-up), booking CTA clicked on desktop.
**Not observed:** the Vimeo embed (blocked for this client by a Cloudflare challenge); the booking engine (returned **403 Forbidden** to this client — may be bot-blocking, may be broken); slider transitions.

Stack [obs]: WordPress, Bridge (Qode) theme, Elementor, LayerSlider 6.7.6 (bundles GreenSock 1.19), Revolution Slider 5.4.8, Contact Form 7, Hustle pop-ups, Mailchimp embed, full jQuery UI. Zero CSS-grid containers on the home page.

- **Layout** [obs]: Conventional. Full-width hero slider (mp4 inside RevSlider) with a big white uppercase name and a script "Welcome to" overlapping it. Centred container sections: heading + paragraph beside two overlapping photos (one offset over the other); two cards (Rooms / The Experience); a full-bleed 5-image mosaic (one large + four small); "What to expect" text with bullet list of what the surf package includes, beside a static map image; contact form laid over a surf photo; teal newsletter band; dark teal footer. **Mobile is broken in places**: two text columns stay side-by-side and collapse to ~130 px wide, headings ("Questions?" / "CONTACT US") overprint each other.
- **Motion** [inf]: slider transitions via LayerSlider/RevSlider. Nothing else indicated.
- **Typography** [obs]: Headings DIN Condensed bold, uppercase, 50–55 px, two-colour headings (dark teal + turquoise line). Body Avenir Next 16 px; nav Dosis 14 px. Also loaded: Open Sans, DINPro, Roboto, Roboto Condensed, Satisfy, FontAwesome — eight families. Palette: turquoise, dark teal, coral accent on white.
- **Booking UX** [obs]: "BOOK NOW" outline button top-right on desktop → full-page navigation away to SabeeApp (`ibe.sabeeapp.com/...`), with **hard-coded dates `checkin=14-01-2019`** in the link. On mobile the header shows only hamburger + logo; Book Now is inside the menu. First thing a visitor sees on load is a **full-screen promo pop-up** ("Surf coaching Nov 2–8") that must be dismissed; on mobile it fills the whole viewport. Contact = form + email + phone in footer. The only WhatsApp link is a share button, not a contact.
- **Imagery** [obs]: Saturated turquoise/green, barrel shots, sunset surfer silhouette, pool, tiles and textiles. Mix of pro surf photography and ordinary property photos. Closest of the six to what a good Sri Lankan surf camp could realistically supply.
- **Reuse:** the content, not the design — it is the only reference that speaks to surfers: "more than 10 surf breaks", a bullet list of exactly what the package includes (meals, daily yoga, surf guiding vs lessons, boat trip conditions), how far from two airports, one condensed-uppercase + one humanist type voice, two-colour headings, two-photo overlap collage (static CSS, two images).
- **Wouldn't reuse:** entry pop-up; booking link that leaves the site with stale parameters and fails; mobile layout that breaks; 14.4 MB first mobile load, 12.4 MB of it images, many PNG [obs]; slider-plugin stack; eight font families; Book Now hidden in the mobile menu.

## 3. morgansrock.com — Morgan's Rock, Nicaragua (ecolodge)

**Verified:** HTML, rendered probe, screenshots (desktop + mobile).
**Not observed:** the booking engine (desktop CTA click did not register in automation; target read from HTML); carousel transitions; what triggers the "Book direct" pop-up (seen once on mobile — on click or on timer, unknown).

Stack [obs]: TravelClick/Amadeus hotel web platform (`tc.galaxy.tf`, `reservations.travelclick.com`), jQuery, slick. en/es. Skip link present.

- **Layout** [obs]: A well-executed template. Hero photo slider (1/6) with a **booking bar docked directly under it** (check-in, check-out, rooms, guests, Book Now). Text/photo intro. **Topographic contour-line pattern** used as section dividers and backgrounds, in brand colours. Four room cards in a row, each with description, "View room details →" and its own Book Now. Full-bleed dark-green section: 3-photo mosaic + text + pill button. 50/50 culinary block. Dark-brown specials band. Review carousel (1/5). **FAQ accordion with 10+ real questions** (location, transfers, Wi-Fi, what's included, best time to visit, accessibility). Closing full-bleed photo "Begin your journey" + button. Footer: contact, WhatsApp number, phone, email, accolade logos. Mobile: sticky header with a **full-width "BOOK NOW" bar under it on every screen**, floating WhatsApp bubble bottom-right, single-column cards.
- **Motion** [inf]: slick carousels only. Essentially static.
- **Typography** [obs]: h2 in **Kaushan Script** (brush script, 46 px) against **Roboto** 300 body 16 px; h1 is small letter-spaced uppercase Roboto (20 px) — the script h2 is the visual headline. Pill buttons, uppercase letter-spaced labels. Warm paper background `#F5F3F0`, dark green, brown, teal CTA. Montserrat and Lora are also requested but not seen in use on the home page.
- **Booking UX** [obs]: Booking is never more than one tap away (docked bar, sticky bar, per-room buttons, closing CTA) and always hands off to `reservations.travelclick.com/9883378?...` with room/adults prefilled, room-specific links carry `roomtypeid` [from HTML; engine n/o]. **WhatsApp bubble on every screen** and the WhatsApp number printed in the footer. A "Book direct and enjoy more" modal lists what direct booking includes.
- **Imagery** [obs]: Professional but documentary: thatch and timber interiors open to jungle, a farmer and a boy milking a cow, hikers on a trail, horses on the beach, aerials. Activity and people over architecture.
- **Reuse:** the information architecture nearly as-is — it matches the playbook: what/where → offers each with its own book button → experiences → reviews → FAQ → closing CTA → full contact. Persistent mobile booking bar + WhatsApp bubble. A single brand pattern (contour lines; ours could be swell lines, a bathymetry chart, a local textile) as the cheapest possible identity device: one SVG, no photos needed. FAQ as the place where dossier facts live. "Book direct, get X" framing where the dossier supports it.
- **Wouldn't reuse:** brush-script headings (dated); four equal cards in a row as the default answer; 8.9 MB first mobile load, 6.7 MB images, no `srcset` [obs]; timed/interrupting modals.

## 4. tandjungsarihotel.com — Tandjung Sari, Sanur, Bali (heritage hotel)

**Verified:** HTML, 96 bundle files string-searched, rendered probe, screenshots (desktop incl. 8 wheel steps, mobile), booking CTA clicked in both viewports.
**Not observed:** transition feel; the menu; the engine after "Check rates"; whether horizontal travel is pinned-vertical or native horizontal scroll (document height equals viewport height, so likely a transformed track) [inf].

Stack [obs]: Nuxt. Bundle contains gsap, ScrollTrigger, lenis, Swiper, Splide strings; one `prefers-reduced-motion` reference. Hero `<video autoplay>` from S3. No hreflang.

- **Layout** [obs]: **Desktop scrolls sideways.** Mouse wheel moves the page horizontally through a continuous editorial strip: full-height photo → cream panel with logo and a 176 px serif "1960's," → a **timeline drawn as one thin horizontal rule with diamond markers**, small archive photos above and below it, each matted like a print, short captions → full-height colour photographs alternating with narrow text columns whose lead sentence is set large → an oxblood colour-block panel with the logo mark overlapping the photo edge. Fixed narrow left rail: logo, menu handle, vertical "WHATSAPP" label. Top-right: two small buttons, "BOOK ROOM" / "BOOK TABLE". Mobile: same content stacked vertically, the timeline rule turns vertical, header bar + hamburger, bottom bar "BOOK ROOM | BOOK TABLE" on the hero. The home page *is* the story ("Our Story"); selling happens elsewhere.
- **Motion** [inf]: wheel-to-horizontal travel with smooth scrolling (lenis) and scroll-triggered reveals (gsap/ScrollTrigger present). Consecutive stills show content sliding laterally at different rates — parallax likely, not confirmed.
- **Typography** [obs]: **Adobe Caslon Pro** for display and pull-quotes (35–176 px, regular weight, sentence case), **Helvetica** for body (15–18 px) and for 13 px uppercase letter-spaced buttons/nav. Optima loaded (use not identified). Cream `#F1ECDE`, warm brown text `#544F45`, taupe rail, oxblood accent. Extremely restrained.
- **Booking UX** [obs]: **The closest match to `custom.md`'s drawer.** "BOOK ROOM" slides a cream panel down over the top of the page (desktop) or opens a full-screen sheet (mobile): four underlined selects — arrival, departure, adults, children — prefilled with today/tomorrow, one "CHECK RATES" button, a "Close" control. The page stays visible beneath on desktop. Only on submit does the visitor leave for the engine (`thebookingbutton.com` / SiteMinder, from HTML) [n/o]. WhatsApp: persistent vertical label in the rail → `wa.me/+62…`.
- **Imagery** [obs]: Archive black-and-white and faded 1960s–70s colour prints, presented as objects (mats, soft shadows), beside rich contemporary full-bleed photos. Imperfect old photos are made precious by framing and scale contrast.
- **Reuse:** the booking sheet, almost literally — four plain fields and one button in a slide-over, handing off only at the end; for us the hand-off is a prefilled WhatsApp message. Treating **imperfect photos as matted prints** at small size next to large type — directly applicable to phone photos and old family-business pictures. Timeline rule with markers for a founder's story. Large serif lead sentence + small sans paragraph. Colour-block panels that need no image. Two typefaces, one of them a system face (zero font cost). Persistent WhatsApp label.
- **Wouldn't reuse:** horizontal scroll-jacking as the main navigation (keyboard, trackpad and screen-reader behaviour unverified; nothing here for a visitor who wants a price in ten seconds); a home page with no offer, price or proof on it; 11.7 MB first mobile load, 10.2 MB images, 12 of 22 images without alt [obs]; cookie modal blocking the whole first screen.

## 5. white-desert.com — White Desert, Antarctica (expedition operator)

**Verified:** HTML, 30 linked JS/CSS chunks string-searched, rendered probe, screenshots (desktop + mobile), Enquire CTA clicked, enquiry page captured full-length.
**Not observed:** all motion in motion; hover/expand behaviour of the trip cards; the film overlay; lazy chunks.

Stack [obs]: Next.js (Turbopack build). gsap, ScrollTrigger and lenis present in bundles; `html.lenis` at runtime. CSS uses `clip-path` (11×), `mix-blend-mode` (6×), `position: sticky` (4×). No `prefers-reduced-motion` string in the inspected files. Hero video from Cloudflare Stream. HubSpot forms/tracking.

- **Layout** [obs]: The strongest editorial grid of the six. A **12-column grid is used everywhere and its hairline column guides are left visible** as a design motif over photos and white space. Hero: full-viewport video of a penguin with the single word "ANTARCTICA" at **256 px** condensed caps, bottom-anchored and **overlapping the subject**; a two-line italic tagline small at left; "Watch Film ▸" small at right; nav as small boxed buttons split left/right around a centred logo, with one orange "Enquire". Then: a statement heading in serif caps set off-centre across ~5 columns; a small "OUR SEASON" text block parked in a narrow column with a lot of air; trip cards as tall photo panels with italic serif titles, **price and season printed on the card** ("US $75,250 | Early Season") and "Learn more +" — on desktop one panel is wide and the rest are narrow slivers [expanding-accordion behaviour inf]. "OUR CAMPS" full-bleed title → **a horizontally travelling row of camp cards over an ice-texture background** while scrolling vertically (seen across three consecutive stills), each card with its coordinates as a caption. Pull-quote with press logo over a full-bleed photo. Giant ghost text "CPT — WFR" fading over ice, then a dark map with a drawn route line. Orange vertical "How it works +" tab pinned to the right edge throughout. Mobile: same order, stacked cards, header = Menu | logo | orange Enquire; founder quote with signature.
- **Motion** [inf]: smooth scroll (lenis), pinned horizontal section and scroll-scrubbed type/opacity (ScrollTrigger), clip-path reveals. No canvas/WebGL found in the inspected files.
- **Typography** [obs]: Three voices with clear jobs: **Oswald** condensed caps for the one giant word; **Cardinal Classic Long** serif — uppercase for section titles (60 px), *italic* for card titles, quotes, tagline; **Inter Tight** 16 px for UI and body. Navy `#1F2A44` on white; orange only for the enquiry actions.
- **Booking UX** [obs]: No engine — **enquiry**, which is our situation too. "Enquire" → `/enquire`: "Start planning", a promise ("our team will be in touch within 24 hours"), then questions answered by **tapping big tiles instead of typing**: season → month (incl. "Not sure") → interest (incl. "Not sure") → contact fields → free text → submit. Rates are public on a separate "Rates" page and on the cards. It is a page, not a drawer.
- **Imagery** [obs]: Extraordinary professional photo/video; scale contrast (tiny orange figure on an ice wall); textures (blue ice) as backgrounds; map as image.
- **Reuse:** one huge word overlapping the hero subject (static CSS; works with one good photo); visible grid hairlines as identity; narrow text column with air; **price + season on the offer card**; coordinates/spot data as captions (for us: break name, distance, tide); tile-tap enquiry flow with "Not sure" options and a stated reply time — maps straight onto a WhatsApp prefill (level → lesson type → date → people); single accent colour reserved for the booking action; pinned side tab.
- **Wouldn't reuse:** dependence on world-class footage — with phone photos this layout has nowhere to hide; 4.2 MB of video on first mobile load (6.5 MB total) [obs]; 20,000 px of scroll; Next.js runtime — we ship static files; a pinned horizontal section without a verified reduced-motion/keyboard path.

## 6. kubehotel-saint-tropez.com/en — Kube, Saint-Tropez (5-star hotel)

**Verified:** HTML including inline JS (exact animation and booking code), rendered probe, screenshots (desktop + mobile, after closing consent and a promo modal), booking overlay opened in both viewports.
**Not observed:** desktop hero video (Vimeo background embed blocked for this client by a Cloudflare challenge; on mobile a hero visual did render); hover behaviour of the activities list; booking steps 2–5.

Stack [obs]: Webflow. GSAP 3.15 + ScrollTrigger, Lenis 1.1.18, Swiper 8, jQuery. fr/en/it/ru. Cookiebot, Triptease, Clarity, Meta. Skip link present.

- **Layout** [obs]: Calm luxury, centred. Header: language left, logo centre, "RESERVE" text link + round lime hamburger right. Full-viewport hero, headline bottom-centre with a tiny eyebrow ("WELLNESS · POOL · ROOFTOP") and a small lime "Book now". Sections open with the same device: **eyebrow label + uppercase display heading + two short paragraphs + underlined text link**, centred, joined to the previous section by a **thin vertical hairline**. Rooms: two full-bleed photos side by side, then one full-width, room name overlaid with "Explore". Four-panel strip (Spa / Rooftop / Beach / Pools), which becomes a Swiper with dots on mobile. Activities: a plain text list of names on the right, one photo on the left [photo swaps with hovered item — inf]. 50/50 private-events block. FAQ accordion with "+" icons, real questions ("How much does a night cost?", "When is the hotel open?"). Closing CTA "Live the experience now". 12-column grid (`repeat(12, minmax(0,1fr))`) with named full/content lines. Mobile: **full-width lime "Book now" bar at the bottom of the hero**.
- **Motion** [obs in code, feel inf]: Lenis `lerp: 0.08, wheelMultiplier: 0.9`. Image parallax: each image is 4 rem taller than its `overflow:hidden` wrapper and is scrubbed `y: 0 → -4rem` between "top 70%" and "bottom 30%"; **switched off at ≤ 767 px**. Modal open/close is a 0.3 s `power1.inOut` timeline. That is the entire motion system: small, cheap, and enough to make the page feel alive.
- **Typography** [obs]: **Saphion** display, weight 300, uppercase, only 43 px for h1/h2; **Inter Variable** 300, 14–15 px body. Cream `#FDF9F4`, black text, **lime** as the single accent, used only for booking actions and the menu button.
- **Booking UX** [obs]: **Second strong match to `custom.md`.** Every booking trigger carries `data-mews`; Mews Distributor opens **as an in-page full-viewport overlay** without leaving the site — header with language/currency/close, a 5-step indicator (Dates → Categories → Rates → Summary → Details & payment), first step is a small card: date picker, adults/teens steppers, promo code, "Next". On mobile the hotel photo stays visible behind the card. **The engine script is not loaded until the first user interaction** (mousemove/touchstart/scroll/keydown/click, or 10 s) — the booking weight is off the critical path. Restaurant booking is a separate vendor (Zenchef).
- **Imagery** [obs]: Warm, styled, professional: interiors in wood and linen, blue pool/sea, close-up spa detail. AVIF served; 35 of 46 images lazy.
- **Reuse:** the section-opener device (eyebrow + heading + short text + text link + hairline) — all type, no assets; the **parallax recipe exactly as written above**, including turning it off on mobile; **lazy-booting the booking UI on first interaction**; single accent colour reserved for booking; bottom-of-hero full-width mobile CTA; hover-list + single image (needs few photos); FAQ with price and opening questions answered; small display type done with confidence instead of size.
- **Wouldn't reuse:** consent wall + promo modal stacked over the first screen (on mobile they cover 100% of it) [obs]; 2.1 MB of script on first mobile load [obs]; Webflow/jQuery runtime; four-language scope; the look leans on interiors photography our businesses won't have.

---

## Cross-site synthesis — what carries over to small Sri Lankan surf businesses

Context check first: all six are resorts or operators with professional photo/video, third-party booking engines and agency budgets. Our businesses have phone photos, a WhatsApp number and an owner who edits from a simple admin. Copy the structures, not the dependence on imagery.

**Booking**
1. CTA reveals a small panel; it never navigates on first tap. Three working models seen: inline bar/full-screen sheet (Rancho), slide-down panel → hand-off on submit (Tandjung Sari), in-page overlay (Kube).
2. Keep the first step tiny: 3–4 fields, one button. Tile-tap answers with a "Not sure" option beat typing (White Desert).
3. For us the hand-off is a prefilled WhatsApp message built from those answers; the underlying element stays a plain `wa.me` link so it works with JS off.
4. Booking is persistent on mobile: sticky bar under the header (Morgan's Rock) or bottom-of-hero full-width button (Kube), plus a WhatsApp bubble/label on every screen (Morgan's Rock, Tandjung Sari).
5. Load booking UI code on first interaction, not on page load (Kube).
6. One accent colour, reserved for booking actions only (Kube lime, White Desert orange, Morgan's Rock teal).
7. Offer cards carry price + season/unit on the card, each with its own book action (White Desert, Morgan's Rock).

**Layout that survives few, imperfect photos**
8. Type does the heavy lifting: one giant word overlapping one good photo (White Desert); large serif lead sentence + small sans paragraph (Tandjung Sari); eyebrow + heading + short text + text link (Kube).
9. Small photos presented as matted prints beside large type turn weak images into artefacts (Tandjung Sari).
10. Grid-breaking with no assets: one tall tile in a row (Rancho), two photos overlapped (Malibu), narrow text column with lots of air, visible grid hairlines (White Desert), colour-block panels (Tandjung Sari).
11. One brand pattern as SVG — contour/swell lines — for dividers and backgrounds (Morgan's Rock).
12. Data as caption: coordinates under camps (White Desert) → break name, distance, tide, board sizes.
13. 12-column CSS grid with named full/content lines (Kube, White Desert) is plain CSS and costs nothing.
14. Mobile: grids → swipe with next-card peek (Rancho, Kube).

**Content**
15. Morgan's Rock order = playbook order: what/where → offers with actions → experiences → reviews → FAQ → closing CTA → full contact.
16. FAQ accordion is where dossier facts go (Morgan's Rock, Kube); say exactly what's included, in a list (Malibu).

**Motion, as evidenced**
17. Everything seen is DOM animation: smooth scroll (Lenis) + scroll-scrubbed transforms (GSAP ScrollTrigger) + carousels. The cheapest convincing recipe is Kube's: ±4 rem image parallax inside an overflow-hidden wrapper, off on mobile, 0.3 s modal eases.
18. One pinned horizontal run inside a vertical page (White Desert camps) is the most "interactive" pattern seen that stays navigable; whole-page horizontal scroll (Tandjung Sari) is not something to copy for a booking site.
19. None of the six uses canvas or WebGL on its home page. Any canvas/WebGL work asked for in `custom.md` has no precedent in this set; the designer has nothing cached here to lean on for it.

**Anti-patterns seen (do not reproduce)**
20. Overlays on load: promo pop-ups (Malibu, Kube), cookie walls (Tandjung Sari, Kube), chat widgets covering content (Rancho). On a phone they hid 25–100% of the first screen.
21. First mobile load of 3.5–14.4 MB on five of six sites, mostly unoptimised images or video. Only Rancho (0.5 MB, deferred JS, lazy images) was near our budget.
22. Booking links that leave the site for a generic engine with stale parameters (Malibu: dates from 2019; 403 for our client). Book action hidden inside the mobile menu (Malibu).
23. Font sprawl (Malibu: eight families). The best-looking sites use two or three, each with one job.
24. Brush-script and ultra-thin uppercase Latin display faces rarely survive a second language — choose type systems that still work if a non-Latin script is added later (sites are English only for now).
25. Heavy runtimes (WordPress + slider plugins, Webflow + jQuery, Next.js) — none of it transfers to plain static files; take the patterns, write them by hand.

**From the Lavish Haven design spike, 2026-09-21** (`agents/designer/gold/the-lavish-haven-notes.md`)
26. Portrait centre-crop. Wide-angle phone photographs stretch at the edges. Cropping a 4:3 landscape frame to 4:5 portrait from near the centre removes the stretch and makes a weak photograph look composed. Crop every picture in a run of pictures to the same ratio (house rule 2).
27. A generative first screen instead of an upscaled photograph. When no photograph clears 1200 px, the large moment is drawn — canvas, WebGL or SVG — in colours sampled from the photographs, and the best photograph appears inside it as a print at or below its native size. This is the precedent #19 says the reference set lacks.
28. One shape. Take one shape from the place itself (Lavish: the pool's cut corner) and use it for the first-screen device, the booking button's corner and at most two panels. Nowhere else.
29. Headless WebGL captures lie in one specific way: an opaque element layered over a WebGL canvas can punch a black or blank rectangle in the canvas in headless Chromium with software GL. It is the compositor, not the page. Confirm with `document.elementsFromPoint`; work around it with `opacity:.999` on the overlapping element.
