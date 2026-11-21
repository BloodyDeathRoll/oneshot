# sources — sanjee-surf-school (run 2026-10-midigama-01, harvester 0.5.0)

Fetched 2026-11-05 (UTC, 08:28–08:54), headless Chromium (playwright), fresh contexts, en-GB locale. Nothing was logged in to and no cookies of ours were passed: only what a site sets on a first-time visitor in that context. No message was sent to anyone (`mode: test`). The booking wizard was walked to its last step with nothing typed and nothing submitted.

## The business's own site: https://sanjee-surf.com/

`robots.txt` allows everything but `/admin`. The static HTML is an empty 2,435-byte shell, so every page was rendered in the browser and scrolled. All 67 URLs in `sitemap.xml` answered 200.

| URL | Yielded | Did not yield |
|---|---|---|
| `/` | Lessons and tours with prices (the page's own read of its data, from its `lessons` and `tours` tables), levels, spots, bio, stats, review block, FAQ, contact block, structured data (`LocalBusiness`, `FAQPage`, ...). 14 photos | Phone or WhatsApp in the visible page. Location is a placeholder, "Tropical Beach, Paradise Coast" |
| `/` booking dialog ("Book Now") | 4 steps: type, offer, date and slot (6:00, 8:00, 10:00 AM, 2:00, 4:00 PM), details. "Pay $8 Now" on a $40 lesson, $32 cash on site. Availability read returned `{"bookedSlots":[]}` for the day looked at | Anything past the unfilled details step |
| `/about` | Sanjee's first-person story, credentials, languages, stats. Photo | Surname, founding year |
| `/surfboard-rental-weligama` | Full rental table, quiver, deposit, damage scale, rules, hours, shop location, WhatsApp | A photo of the shop |
| `/tuktuk` | Tour stops, drive times, what to bring, priced cards as on `/` | |
| `/surfing-weligama` | Season table, spots with levels and break type, three unattributed testimonials | |
| `/surfing-sri-lanka` | Seasons, spots, water temperature | |
| `/faq` and its 30 pages under `/faq/...` | Answers on booking (20% deposit), cancellation, kids, group lessons, prices, deposit. The pages used directly: `/faq/how-much-does-a-surf-lesson-cost-in-weligama`, `/faq/how-to-book-a-surf-lesson-with-sanjee-surf`, `/faq/cancellation-and-refund-policy`, `/faq/can-kids-take-surf-lessons-in-weligama`, `/faq/private-vs-group-surf-lessons`, `/faq/how-much-does-a-tuk-tuk-safari-cost`, `/faq/is-there-a-deposit-for-board-rental` | |
| `/terms`, `/privacy`, `/imprint` | Legal operator (Marcel Panzer, operating as "Sanjee Surf", Berlin), cancellation terms, 50 m swim requirement, under-18 rule. His street address and personal email are not copied into the dossier | |
| `/blog` and the posts in the sitemap, `/blog/hidden-spots-weligama-ahangama` used directly | Long general surf guides, first-person ("28 years"). Art for the monthly posts | Facts about the business beyond those noted |
| `/assets/index-Dqm5eYLp.js` (script bundle) | The full image list (26 assets), links to Instagram, Facebook, YouTube, WhatsApp, no video files or embeds | |
| `/og-image.jpg`, `/apple-touch-icon.png`, `/favicon.png` | Not kept: crops of photos already held | |
| `/lovable-uploads/sanjee-hero.jpg` | 404, though the structured data names it | |
| `https://wa.me/94774004422` | Public page reads "Chat on WhatsApp with +94 77 400 4422". No message sent | Whether it is answered |

DNS, 2026-11-05: `sanjee-surf.com` has MX `smtpin.rzone.de`. `sanjeesurf.com` (the address printed in the home page's contact block) has no MX and no A record, and did not answer over HTTPS.

## Platforms

| URL | Yielded | Did not yield |
|---|---|---|
| https://www.google.com/maps/place/Sanjee+Surf+School/data=!4m7!3m6!1s0x3ae1156e4b0b7fab:0x3e8ea0f911f62414!8m2!3d5.9603113!4d80.4039507!16s%2Fg%2F11ybcfd3tx!19sChIJq38LS24V4ToRFCT2Efmgjj4?hl=en (scout link) | 5.0 (13), category Surf school, address, phone, website, plus code XC63+4H, hours 9 am–5 pm daily. 5 reviews in full. 10 of 59 gallery items with their uploader: 6 by the account "Sanjee Surf School" (4 photos, 2 videos), 3 by Andrea Guenster, 1 by Tim St | 8 reviews and 49 gallery items: "See more photos" raises a sign-in prompt ("limited view of Google Maps"). Not bypassed |
| https://www.tripadvisor.com/Search?q=Sanjee%20Surf%20Weligama | 403 to a headless browser, not retried | Whether a listing exists |

## Socials: all dead or absent

| URL | Result |
|---|---|
| https://www.instagram.com/sanjeesurf/ (linked from the site) | "Profile isn't available" |
| https://www.facebook.com/sanjeesurf (linked from the site) | "This content isn't available at the moment", logged out |
| https://www.youtube.com/@sanjeesurf (linked from the site) | 404 |
| https://www.instagram.com/sanjee_surf/, /sanjeesurfschool/, /sanjee_surf_school/, /sanjee.surf/ (guesses) | "Profile isn't available" |
| https://www.facebook.com/sanjeesurfschool (guess) | "This content isn't available at the moment" |
| https://www.tiktok.com/@sanjeesurf (guess) | "Couldn't find this account" |
| X `@SanjeeSurf` (named in the page head only) | Not checked: needs a login |

"Unavailable" logged out does not prove an account does not exist under another name; these are the ones the site links to and the obvious variants.

## Video hunt (constraint 6)

| Surface | Result |
|---|---|
| Own site | None: no `<video>` or iframe on any of the 67 pages, none in the script bundle |
| YouTube | The linked channel @sanjeesurf: 404. `ytsearch` "sanjee surf school weligama" and "sanjee surf sri lanka": other businesses and unrelated channels only (Kima Surf Camp, Surf's Up, others), not fetched |
| Vimeo | https://vimeo.com/sanjeesurf: 404 |
| Instagram | No reachable account, so no reels |
| Facebook | No reachable account, so no reels |
| Google listing | **Four clips found, none fetched.** vid-001 (23 s, 832×464) and vid-002 (30 s, 848×480) by the account "Sanjee Surf School"; vid-003 (5 s) and vid-004 (14 s) on reviews |

Why none was fetched: the player's direct URL answers 403 to a plain GET with no cookies or referer, with or without changes to the URL, and `tools/fetch-video.mjs` answers "Unsupported URL" for the page. I treated that as a wall and stopped: no copied player headers, no capture of bytes from playback. Two attempts to watch them in the page left them on the opening frame, so `shows` describes that frame only. Direct URLs expire and are bound to the requesting IP, so none is kept here.

## Web searches (WebSearch)
"Sanjee Surf" Weligama surf school instagram OR facebook OR tripadvisor · Sanjee surf instructor Weligama Coco Beach lessons reviews youtube · "Sanjee Surf School" Coconut Beach Weligama · "sanjee-surf.com" OR "sanjeesurf" OR "+94 77 400 4422" OR "94774004422" surf. None returned this business: other Weligama schools and filler pages. So the business has no third-party listing that those searches could find.

## Media
Images: `dossier/sanjee-surf-school/make-media.sh` (recipe, `# media: dossier/sanjee-surf-school/assets/img-*`) downloads every `images[].photo_url` and checks sha256; `--write` re-records sha256 and size and writes `assets/index.json`. Old site: `dossier/sanjee-surf-school/make-old-site.sh` (`# media: dossier/sanjee-surf-school/assets/old-site-*.png`), also writes `assets/old-site.json`. No video files exist.

## Not attempted / blocked
- Google: 8 review texts and 49 gallery items behind the sign-in prompt. Not bypassed.
- Google videos: 403 on direct fetch, unsupported by the tool. Not bypassed.
- Tripadvisor: 403. Not bypassed.
- X: needs a login. Not attempted.
- No reverse-image search was available, so the provenance of the site's photos rests on what the site publishes and what the files look like. No file carried useful metadata beyond an Adobe XMP tag on the `sanjee-real` image.
- No owner contact (test mode).
