# Pitch notes: sanjee-surf-school (run 2026-10-midigama-01, writer 0.5.1, 2026-11-05 UTC)

**For the sender only. This file holds the legal operator's name and is not served** (`.assetsignore`, `*.md`). Don't paste from it into a message.

Channels: the business publishes two direct channels, WhatsApp/phone +94 77 400 4422 and email sanjee@sanjee-surf.com, so there are two messages: `message.en.whatsapp.md` and `message.en.email.md`. The run file names no channel. Language: English (base.md rule 5, `markets/lk`). Run `mode: test`: nothing sent, no owner contact. Shape follows `sites/lotus-surf-house/pitch/` (same run, same writer version); every claim below is this business's own.

Short names: D = `dossier/sanjee-surf-school/dossier.json`; A = `dossier/sanjee-surf-school/audit.json` and `audit.md` (findings F1–F14); W = `dossier/sanjee-surf-school/funnel/walk-hand.json` + `funnel/walk/`; S = `reports/2026-10-midigama-01/sanjee-surf-school.md` "Round 1, full (station 5)"; V = `.visual.md` and X = `.experience.md` in the same folder, full rounds; FN = `sites/sanjee-surf-school/final/notes.md`; AI = `sites/sanjee-surf-school/aiseo-report.md`; SEO = `sites/sanjee-surf-school/seo-report.md`; CR = `sites/sanjee-surf-school/copy/review.md`; NB = `notes/sanjee-surf-school.md`; ACT = `activity.jsonl`; DIST = `sites/sanjee-surf-school/final/dist/index.html` (= the deployed preview: fetched, byte-identical); L = the `passed -> previewed` ledger line (2026-11-05T21:26:43Z, version 33a046eb); P = `PLAN.md`. H = index.html, WA = WhatsApp message, E = email.

## Claims → sources

| # | Claim | Where | Source |
|---|---|---|---|
| 1 | sanjee-surf.com has 67 pages | H, E | D `existing_site.last_updated_hint`; D `flags_for_operator[1]` |
| 2 | Tours added as recently as October 2026 | H | D `existing_site.last_updated_hint` (tour rows created 2026-10-22) |
| 3 | Home page dialog sells a lesson with live dates, named times and a deposit | H, E | A "What already works"; D `booking.engine_url.flow`; `before-wizard-date.jpg`, `before-wizard-pay.jpg` |
| 4 | Walked on a phone on 5 November 2026 | H, E | W `walked_at`, `viewport` (390x844, iPhone UA) |
| 5 | Preview built from the school's published facts and photographs | H, E | S facts table (0 mismatches); FN images (8 business-owned) |
| 6 | Preview URL https://sanjee-surf-school.os1.workers.dev | H, WA, E | L; fetched: 200, byte-identical to DIST |
| 7 | Search engines told not to list the preview | H, E | L (noindex,nofollow; robots Disallow; no sitemap) |
| 8 | sanjee-surf.com and the Google listing stay as they are | H, E | Nothing of ours touches them: only Workers `sanjee-surf-school` and `-proposal` exist; L |
| 9 | "Pay $8 Now" on a $40 lesson, $32 cash on the day | H | A F1; `before-wizard-pay.jpg` (`walk/11-wizard-5-slot.png`) |
| 10 | We stopped before paying; no payment seen | H | A "Not measured"; W steps |
| 11 | The dialog holds a time | H, E | Inferred from the flow (date, slot, deposit) and the brief; no booking was completed, A "Not measured". H says so in the same row |
| 12 | Preview ends in a WhatsApp message; nothing held or paid until a reply | H, WA, E | S funnel + tap log; playbook §5 (no payment capture); DIST |
| 13 | Old flow: calendar, then the day's times | H | `walk/11-wizard-3-offer.png`, `walk/11-wizard-4-date.png` |
| 14 | Preview's date goes into the message, unchecked against availability | H | S tap log, typed-date table; DIST (static, no engine) |
| 15 | Five named times 6:00, 8:00, 10:00 AM, 2:00, 4:00 PM | H | D `booking.engine_url.flow`; A "What already works" |
| 16 | Preview doesn't currently offer a time of day | H, WA, E | S message sample; X "the new message can't say one"; `after-390-message.jpg` |
| 17 | Deposit by card through Stripe | H | D `booking.payment_on_the_day`, `booking.deposit` |
| 18 | No deposit on the preview; decision is the owner's | H, WA, E | DIST; FN gaps; CR open items |
| 19 | The dialog takes it at any hour | H | Inferred: automated flow in the page, D `booking.engine_url`. Not tested at night. The site also says it confirms by WhatsApp (D `booking.path.note`) |
| 20 | +94 77 400 4422 is the number on Google and on the site | H, E | D `contact.phone.verified`, `contact.whatsapp` |
| 21 | No message sent; whether answered, how fast unknown | H, E | D `contact.whatsapp.verified`; A "Not measured"; S "Not checked" |
| 22 | Current site's blog, FAQ answers, surf report, spot finder, contact form | H, E | D `existing_site`; A F2, F4, intro (spot finder); W |
| 23 | Preview is one page without those, or Terms, Privacy, Imprint | H, E | DIST (no such links, no forecast); FN gaps; S funnel (1 page) |
| 24 | Search visitors could be lost if it replaced the old site; no figures | H | SEO + AI "the old site competes for the brand query"; A "Not measured" (no analytics). Stated as a risk, not measured |
| 25 | No claim of more bookings; no visit or booking figures | H, E | base.md constraint 1; A "Not measured" |
| 26 | The dialog can stay if the old site stays up at its own address, since it has no deep link | H | A "For the human, not decided here"; D `booking.engine_url.kind` |
| 27 | What works today: button on first screen, prices on home, live dates and named times, split stated before paying | H | A "What already works" |
| 28 | First load 1.18 MB, LCP 2.1 s, CLS 0, one unthrottled run | H | D `existing_site` (1179410 B, 2148 ms, 0); `measure_note`; A "What already works" |
| 29 | Old first screen's words; no name or Weligama on it (tab has them); top line hard to read; infinity pool, nobody in it | H | A F6; `before-home-first.jpg` (`walk/01-home-fold-settled.png`, whole) |
| 30 | Preview first screen: name, "Surf lessons in Weligama", "Ask on WhatsApp", sunset surf photo from the site | H | DIST; D `img-018` (own site); `after-390-top.jpg`, `after-1440-top.jpg` |
| 31 | Water in that photo moves on the live page | H | FN swell; L "swell runs over https"; ACT 2026-11-05T19:29:27Z |
| 32 | 5 taps, 3 typed fields, tick, "Pay $8 Now"; four-step dialog; no WhatsApp/phone link; only an email on the date step | H, E | A F1 (the hand walk; **not** `measured.clicks_to_book`, see Conflicts) |
| 33 | "Ask on WhatsApp" on first screen and in a persistent phone bar | H, WA, E | S funnel (`clicks_to_book` 1, hero whatsapp, CTA above fold); S tap log; `after-390-lessons.jpg` |
| 34 | One tap opens a chat with a message started; choices are carried | H | S funnel, tap log ("Date, lesson, level and people reach the message"); hrefs read only |
| 35 | Links work with JavaScript off | H | S "JS off: 22 wa.me and 3 tel: in the HTML" |
| 36 | Every link's number and words read; WhatsApp not opened | H | S "Tap log, hrefs read, nothing opened"; S "Not checked"; L |
| 37 | Filled message for the Beginner Lesson, 11 November 2026, one person | H | `make-pitch-media.sh` log of `#bubble`; `after-390-message.jpg` |
| 38 | Red box about 6 s after load, about 5 s long, runs off the right edge; surf report "Live data temporarily unavailable" | H, E | A F4; W `extra_loads[2].toast_seen_ms_after_load` [6046, 10870]; `before-home-toast.jpg` (crop y 0–240 of `walk/01-home-toast.png`) |
| 39 | All 3 fresh loads, 09:05, 09:10, 09:24 UTC; one machine and network, automated browser; not elsewhere or on a real phone | H, E | A F4 and notes; A "Not measured"; W `extra_loads` |
| 40 | Cause in code: about every 130 ms after each good answer until refused; 41 and 32 good answers; refusal brings up the box; later on slower connections | H | A "Two things…"; A F4 notes; W `surf_loop_cause`, `extra_loads` |
| 41 | Fetch callback depends on data state; effect runs on callback change | H | W `surf_loop_cause` (`assets/index-Dqm5eYLp.js`) |
| 42 | Preview has no surf report and no live data | H, E | FN gaps ("No … forecast"); S ("0 embeds and no forecast") |
| 43 | Home page 30,387 px; "please leave us a message"; no tel or WhatsApp link | H, WA, E | A F2 |
| 44 | Other pages have WhatsApp links | H | A F2 notes; D `contact.whatsapp.verified` |
| 45 | "Tropical Beach, Paradise Coast"; prints sanjee@sanjeesurf.com | H, E | A F2; `before-contact.jpg` (crop y 180–1130 of `walk/07-home-contact-block.png`) |
| 46 | That domain had no MX or A record on 5 November; mail can't arrive | H, E | D `existing_site.notes`, `contradictions` email |
| 47 | sanjee@sanjee-surf.com can receive mail, on FAQ and dialog | H | D `contact.email.verified`, `contradictions` email ("MX exists"). Delivery itself not tested |
| 48 | Form 28,823 px down, not submitted | H | A F2; A "Not measured" |
| 49 | Preview: bar with WhatsApp and call; "Finding us" with Google address, plus code, map link, phone, email | H | DIST; S facts table; `after-390-finding.jpg` |
| 50 | No header/menu at phone width on the home page; inner pages have one; rental, FAQ, About only in the footer, about 29,700 px down; next action is a card button | H | A F3; `before-footer.jpg` (crop y 650–1355 of `walk/08-home-footer.png`) |
| 51 | Preview: Menu stays at top; all sections on one page; 12,985 px on a phone | H | FN port comparison; `after-390-lessons.jpg` |
| 52 | Home $40 and $50, all private; FAQ around 25 USD group of 2–4, around 45 USD private; answer points to the home page | H, E | A F7; `before-price-home.jpg`, `before-price-faq.jpg` |
| 53 | Preview: home prices "as of 5 November 2026"; "For group bookings, please leave us a message" | H | DIST; S facts table; `after-390-lessons.jpg` |
| 54 | Terms: full beyond 48 h, 50% at 24–48 h; FAQ: 24 h or more full; 30-hour example | H, E | A F8; `before-cancel-terms.jpg` (crop y 490–1170 of `walk/24-terms-cancellation.png`: **no party named**), `before-cancel-faq.jpg` |
| 55 | Preview says nothing on cancellation | H | FN gaps; DIST |
| 56 | 500+, more than 2,000, 3,000+; 15+, 20+ and 12+ years | H | A F9; `before-numbers-home.jpg`, `before-numbers-about.jpg` |
| 57 | Preview has no counts or years | H | S facts ("Founder and years dropped"); A funnel item 7; DIST |
| 58 | Review block: no names, most "1 week ago"; on Google nearly the same words from a named reviewer at 10 months; badge has no count | H | A F10; `before-reviews.jpg` (crop has no reviewer name) |
| 59 | Preview: 4 quotes word for word with name and Google; 5/5 from 13, as of 5 November 2026; no per-quote date because Google gives only relative dates | H | S facts table (byte-identical); D `reviews.google`; CR R9 |
| 60 | Instagram "Sorry, this page isn't available", Facebook login, YouTube "This page isn't available", logged out; accounts may exist elsewhere | H, E | A F11 and notes; `before-social.jpg` (stack of `walk/31`, `32`, `33`) |
| 61 | Rental page "or message us on Instagram" | H | A F11; `before-rental-line.jpg` (crop y 620–940 of `walk/20-rental-instagram-line.png`) |
| 62 | Preview has no social links | H | SEO `sameAs` note; FN gaps; DIST |
| 63 | Finished one-page build, temporary address, no editor, login or domain | H, E | base.md 2a; L; P §1 |
| 64 | Not tested on a real iPhone or a range of Android phones | H, E | S "Not checked" ("No real phone, iPhone, Android or Safari, and no real GPU"); brief |
| 65 | Browser imitating a phone with software graphics; one of us looked at the design on one phone at mockup stage | H | S; ACT 2026-11-05T19:29:27Z (Alon, foam); brief |
| 66 | 373 KB, 0 outside requests, main photograph in about 2 s on the imitated slow phone | H | S budget (373 KB; hero 2,020–2,208 ms uncompressed, 1,684–1,696 gzipped; 1.6 Mbps, 150 ms, 4x CPU) |
| 67 | Current site not run under the same conditions | H | D `existing_site.measure_note` (unthrottled) |
| 68 | Left out on purpose: hours, cancellation, reply time, rental deposit amount, video | H | FN gaps; DIST; CR; D `gaps` |
| 69 | Every fact traces to the site or the listing; 0 mismatches; not the same as correct | H | S d1 |
| 70 | 8 photographs, the school's own, from site and Google listing; none stock | H | S images ("All 8 used are business-owned; 0 stock"); FN images |
| 71 | Google 9–5; home 6AM–6PM; rental 06:00–18:30; dialog 6:00 AM Sunrise Session; someone on Maps would not expect it | H | A F14; D `hours_candidates` |
| 72 | Advice: set Google hours; reopen accounts or remove links and the Instagram line | H | A `recommended.off_site[0–1]` |
| 73 | No login today; with managed/self-hosted: own login, this school only, fields not code, Publish rebuilds | H, E | L; P §1 (tenant-scoped login, publish flow) |
| 74 | Editable list: basics, text, lessons, rentals, tours and shop, photos, Sanjee, spot and season, contact, reviews (remove; we add) | H | FN "editable (owner, after a CMS sale)"; playbook §9 |
| 75 | Fixed: layout, colours, fonts, button words, message sentences | H | FN "Not owner-editable"; playbook §9 |
| 76 | Replacing the first photo stops the moving water | H | FN "The swell runs only on img-018"; FN schema gaps |
| 77 | No place for opening hours yet | H | FN editable, closing line |
| 78 | Offer: managed (recommended; monthly fee agreed; hosting, updates, backups ours); self-hosted (one-time fee, fully theirs, ~$6–12/month to their host, updates and backups theirs); files only (no editor, changes need a developer). Nothing set up | H, E | base.md constraint 2; P §1; run file `hosting.default_mode: managed`. No amounts exist (`market.md`) |
| 79 | sanjee-surf.com connected once chosen; would replace what is there, including the dialog | H | base.md constraint 3; A "For the human" |
| 80 | FAQ says replies "within a few hours"; preview doesn't repeat it | H | D `booking.reply_time_hint`; S fix-list item 7 (held back by copy review) |
| 81 | Rental deposit pages disagree; preview says "Ask us how much it is" | H | A F12; D `contradictions` rental deposit; DIST |
| 82 | Three sets of hours; preview shows none | H | D `hours_candidates`; FN |
| 83 | Tour party size: up to 2 and up to 3; preview's sentence | H | D `contradictions` tuk-tuk; CR R7; DIST |
| 84 | img-007 provenance; another photographer's watermark on listing photos | H | D img-007 `provenance_flag`, gaps "images: rights" (photographer's name deliberately not on the page) |
| 85 | "Total beginner" picture (img-005): instructor and student, from a clip on the listing; Terms promise explicit consent | H | D img-005 `description`; D `images_note`; S images |
| 86 | "30 seconds from the sand" from the rental page; pin 105 m from shore, may not mark the shop | H | D `location.shop`; D `contradictions` coordinates; CR R4; AI |
| 87 | Coco Beach and Coconut Beach both used | H | D `location.spot.note`; SEO recommendation 6 |
| 88 | ISA Level 1, Certified Surf Lifeguard printed; no certificate or registry entry found | H | D `credentials[0–1].status`; CR R2 |
| 89 | Preview shortens the About story and says head instructor | H | S facts ("Founder and years dropped"); CR R3; D `business.owner_voice` |
| 90 | AI assistants: keep, or block training crawlers and keep live-answer ones | H | AI "Crawler policy" |
| 91 | No video; two clips on Google could not be downloaded | H | D `videos[0–1].fetch_status`, `videos_note`; FN gaps |
| 92 | No large photo of a lesson; no names for other instructors | H | D `images_note`, gaps "hero media", "team" |
| 93 | Proposal URL https://sanjee-surf-school-proposal.os1.workers.dev | WA, E | `wrangler deploy`, version 588e553e-ef91-4c1f-a778-1792c42a77a4; checks below |
| 94 | Screenshots: old site and socials 5 November 2026 (ours); typed nothing, paid nothing, sent nothing | H | W `walked_at`; A (hand walk "nothing typed, nothing submitted") |
| 95 | Preview screenshots 5 November 2026 | H | `make-pitch-media.sh`, run 2026-11-05 UTC (2026-11-06 01:37 IST on this machine for the last run, byte-identical to the earlier runs) |

**95 claims, 95 with a named source.** Three lean on inference rather than a measurement, and the row says so: #11, #19, #24.

**Not a fact from a file:** "If you would rather we took it down, tell us and we will" (H, E) is an offer I added, not a sourced claim. See "For the human" item 4.

Not claimed on purpose: more bookings or any conversion or money figure; that the page is faster (no like-for-like run, and the old site's one run is fine); that a failed feed shows a top rating (the 5/5 beside "unavailable"; corrected in A, so `walk/04-home-surf-report.png` is not shown); the sideways scroll (A F5: smaller than first scored, not a pitch point); "1 tap" as a comparison or a lead (see Conflicts); the old site's structured-data count of 150 (not something a visitor meets); the blog art that looks generated (a guess about how it was made); that "every visitor" gets the red box (it rests on the code); who built, owns or runs anything; any device testing. F5, F12, F13 and F14 are not pitch points: F12 and F14 appear only as owner questions and off-site advice, F13 only as the party-size question.

## Conflicts with the prompt, and what I followed

- **Taps before.** `base.md` says take them from `audit.json.measured`, which says 1. That is the funnel tool's false positive (A F1), so the page uses the hand walk's 5 taps, per the brief.
- **Deploy credentials.** `base.md` says `CLOUDFLARE_API_TOKEN=$(cat ~/.oneshot/cf-token)`. That file doesn't exist. Used OAuth with `CLOUDFLARE_ACCOUNT_ID`, per the brief and as Lotus did.
- **"What was fixed".** `base.md` frames the page that way. Here the preview often says nothing instead of fixing, so the section reads "what the preview does instead", and says so where it is silent.
- **Standing decisions checked** (earlier `pitch/notes.md`, human ledger lines): no fee amounts, English, no domain promise, no other business named, no number on "every fact checked" unless fresh (S is fresh for this page). None conflicts. The rating markup decision (Shahar, 2026-09-22) concerns JSON-LD, not this page.

## Images

20, all made by `make-pitch-media.sh` (`# media:` headers). Git-ignored as in the Lotus precedent. **`media/sanjee-surf-school.tsv` has 0 rows for them: they need adding (`node tools/media.mjs save`), outside this agent's lane.** Before (15): JPEG crops of the auditor's 2026-11-05 captures; the recipe opens nothing on sanjee-surf.com. After (5): the live preview, wa.me blocked in the browser context. img-005 and img-007 are not in any after-shot. The last full recipe run came out byte-identical to the deployed files.

## Checks before handoff (2026-11-05 UTC)

- `npx wrangler whoami` (wrangler 4.158.0, OAuth): one account, e42421b29f42b84081a1e9be362397eb. `wrangler deployments list --name sanjee-surf-school-proposal` before the first deploy: "This Worker does not exist on your account" [code 10007].
- Preview → 200, 110,134 bytes, sha256 a69b660c205a6564, identical to DIST and to L.
- Messages: WhatsApp **498 characters** (≤ 600), email 2,908, both English, both with both links.
- Static check, wheel scroll at 390×844, 1440×900, 360×640, local (own server on 9480, stopped) and live: 21 requests (page + 20 images), 0 external, 0 console errors, 0 failed, 0 broken images, 0 missing alt, 0 px overflow, every `<img>` width/height equal to the file's, 0 scripts. Inline CSS, system fonts.
- Proposal live: Worker `sanjee-surf-school-proposal`, version 588e553e-ef91-4c1f-a778-1792c42a77a4. `/` → 200, byte-identical, sha256 548655cb818951ca; `robots.txt` → 200, identical, `Disallow: /`; 20 of 20 JPEGs 200 and identical; `<meta name="robots" content="noindex, nofollow">` present (no `X-Robots-Tag` header); `/message.en.whatsapp.md`, `/message.en.email.md`, `/make-pitch-media.sh`, `/wrangler.jsonc`, `/.assetsignore` → 404.
- Grep of page and messages for the operator's name, Berlin and the review question: 0 hits.

## For the human before sending

1. **Who gets it, and the name.** Unresolved (D `flags_for_operator[0]`). Terms, Privacy and Imprint name Marcel Panzer of Berlin as the provider "operating as Sanjee Surf". The site calls Sanjee "Head Instructor & Founder", first name only. So the reader may be Sanjee, that operator, or someone else, and may have built the site. Both messages say "Hello" and the page is written to the school. Don't add a name unless you can show that person decides. The operator's street address and personal email are published on those pages: don't use them unless you decide to approach him directly, which would be a different message.
2. **Channel.** Nobody has seen +94 77 400 4422 answered, or knows who holds it. It is also the school's customer line. sanjee@sanjee-surf.com has an MX record, but delivery is untested. Don't use the home page's address (sanjeesurf.com) or the contact form.
3. **Gate c and the run mode.** This run is `mode: test`, no owner contact. Sending needs your decision. Both messages carry no sender name: sign them, as on earlier pitches.
4. **The take-down offer** is my addition (page and email). Keep it only if you will honour it. If not, remove it and redeploy.
5. **Unasked use of their material.** The preview reuses the site's text and photographs, and the reader may be who wrote them. The page says "Nobody asked us". Decide whether you're comfortable with img-007 and img-005 being reachable on the preview before they're cleared (noindexed, but public by link).
6. **The review question, not on the page.** One of the 13 Google reviews is by "Dr. Marcel Panzer", the same name as the operator, not proven to be the same person. Its quote is `do_not_use` and absent, but the count of 13 includes it, and the page and preview show 5/5 from 13. Is that review independent? Ask only if it comes up, and decide how you want to raise it.
7. **Findings can go stale.** All dated 5 November. Have a person open sanjee-surf.com once on their own phone before sending. If the red box, the placeholder or the email has changed, edit the page. This also gets the real-phone check nobody has done. Don't load it repeatedly: the page's loop hits its server.
8. **The name of the school.** Preview uses "Sanjee Surf School" (Google, tee); the site says "Sanjee Surf" (D `contradictions` name). Not on the page's list, worth raising in conversation. "Basic Tamil" is also left out of the languages (CR R6).
9. **Legal pages.** The preview has no Terms, Privacy or Imprint, and the page says so. Whether a live site needs them, especially with a German operator, is a question I have not researched. Answer it before go-live.
10. **Preview polish still open** (not gating): `/favicon.ico` 404, one console error on a first visit (L); possible jump on a very slow font load (S: 0.0966); 228 px of chips and bar after a two-lesson tile on a phone (S); no date or link on quotes (S); hover pill contrast (S). The post-critique defect patch was not re-scored (`run.md`).
11. **No fee amounts anywhere.** You agree them in conversation (`market.md`).
12. **Budget.** Business cap as last set by Alon: 14M tokens through pitch (ACT). I have not computed this station's share.
