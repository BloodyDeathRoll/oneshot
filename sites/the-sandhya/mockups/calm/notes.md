# The Sandhya, calm: "The Artwork" (designer 0.7.1, station 4e)

Run `2026-11-ahangama-01`, operator alon, `mode: test`, 2026-11-06. Brief: `sites/the-sandhya/concepts.md`, concept 1. One business in this run; the sibling variants `interactive` and `unique` were built at the same time by other sessions and were not opened from here.

Made by: `src/make-media.sh` (every file in `dist/img/`, `# media:` header) and `src/build.mjs`, which writes `dist/index.html` from `src/page.html` and `copy/en.json`, so the copy is read and not retyped. Run them in that order to remake the page. `build.mjs` and `page.html` are a convenience at 4e, not a build system: 4g starts from `dist/index.html`.

## look-log

Each round's sheets replaced the last in `shots/round-1/`. The old site is `dossier/the-sandhya/assets/old-site-first-screen-desktop.png`, `old-site-first-screen-mobile.png` and `old-site-desktop.png`.

**First screen, round 1.** Shot at 1440 and 390. The composition already works: the palm on the centre line, words on the linen, nothing laid over the view. Wrong as design: "Dining" twice in the header at desktop; the button nearly touches the pillows; on the phone a sliver of curtain runs down the left edge and "Kabalana / Beach" breaks across a line. Changed: the header links, the block raised by about 24 px, the phone crop moved 16 source px right, no break inside "Kabalana Beach," or "Ahangama, Sri Lanka." Beside the old first screen (a soft figure, a dictionary entry, a 70x30 px RESERVE) it is clearly better at a glance: a sharp room and the sea, and it says what and where.

**First screen, round 2.** The two standard sizes hold, so I added the sizes people really have. At 1366x650 and 1280x640 the h1 sits on the window frame and the logo sits on the black frame; at 360x640 the logo and links are unreadable on the frame, and the h1 runs over the terrace. iPhone Safari with its bars up is about 390x664, so this is a real phone and not an edge case. Changed: `object-position` by aspect ratio, so the photograph gives up its ceiling and never the bed; h1 19.5 to 21 px by width. Still clearly better than the old screen.

**First screen, round 3.** Checked at 1366x650, 1920x1080, 390x664, 390x740 and 360x640: the words stay on the linen and clear of the frame at each. Remaining: "Dining" touched the right window bar at 390x664, so the phone links went to 14 px. Phone softness in the palm fronds is visible at 2x if you look for it, from the 616 px crop, which a 1.5x Lanczos scale and a light unsharp help but do not cure (see `conflicts`). Beats the old screen: it answers what and where, and the link is live from the first byte.

**Whole page, round 4.** Flaws from the sheets and the checks: `.rest` clashed between the page wrapper and a rating span, which wrecked the layout; "read 2026-11-\n06" and "+94 765\n700 007" broke mid-value on the phone; the feature line ran over the slit window and, measured, ink on that wall is only 3.4:1; the map print was small and faint and misaligned with the photograph beside it; the sticky Dining column could slide; `tools/check-design.mjs` failed the hero's paint colour as a dark ground. Changed: renamed the class; no breaks inside values; the feature line is white, 4.7:1 or better on every band of the wall, and narrower so it stays left of the slit; the map re-cut to the drawing and enlarged, the Kabalana photograph stretched to the column; Dining unstuck; the paint resampled from the photograph's ceiling, `#CBCEC5`.

**Whole page, round 5.** First load was 1,035 KB on a phone, because every strip's photographs were inside Chrome's lazy distance. Slides after the first now wake when the room comes within 500 px, with a `<noscript>` image: 574 KB. Added an ease-in on lazy photographs against their tinted frames. That round's sheets showed every photograph blank: `load` does not reach `window`, even in capture. Moved the listener to `document` and reshot. At 768 px the 8+4 room rows pushed long room buttons out of their column, so rooms stack below 1024; Map overflowed by 18 px, fixed; Kabalana's two columns went to one below 1024. At 320 px the bar's call button overflowed by 4 px, fixed. Broken-image alt text no longer collides with the header.

**Last sheets, against the old site.** Looked at for overflow, overlap and unreadable text at 1440 and 390. The old page is tasteful and quiet, and it should be respected: pale ground, small prints, a pool close-up. It wins nothing on the first screen. Its captured home page has no room-by-room offer, and across its 10 pages it shows no room rate, no rating and no check-in time (audit F5, F6, F7). This page shows the four room types with galleries and a link each, both ratings, the stay facts and the three big views, and it ends on the hour the hotel is named for. It is clearly better at a glance and on the whole page. The honest weak spot is the old page's blue-hour tile and pool close-up, which have more atmosphere than our Guests and Booking sections.

**Inspector** (`design-taste-frontend/scripts/inspect.mjs`), final run: 5 FAIL, 6 WARN, none of them a real defect after the fixes above. Kept, with why:
- `headline-lines`, `statement-length`: the feature line, and a tagline of 11 words, are the copy's words and may not be cut.
- `shadow`: gentle shadow on matted prints only; `custom.md` allows it where it helps, and they read as prints because of it.
- `lopsided`: false positive. The feature line sits on the photograph's wall; the Why Sandhya prints are absolutely positioned in the other half.
- `eyebrow`: the price label is the price row's own label, not a kicker.
- `hero-words`, `small-title`: the concept's 26 px on the bed, on purpose (references calibration: much smaller than a giant word).
- `size-count`: 15 sizes, mostly fluid `clamp` values at one width. Worth tightening at 4g.
- `no-footage`: no usable video (`concepts.md` section 2).
- `side-scroll`: the swipe row with peek is the brief (references #14).

**Motion, as built.** Hero 1.00 to 1.04 over 20 s, once, transform only. ±4rem parallax on framed photographs, off under 768 px. Crossfade 0.45 s and a widening dot under a mouse; native snap strip with dots that follow under a finger. Drag with momentum on the details row. Button press 0.97 in 120 ms, arrow nudges on hover. Photographs ease in over 0.6 s. Bottom bar rises in 0.25 s once the hero's button has left. Amenities plus rotates and the panel opens by height where the browser supports it. No heading animates. Reduced motion: no settle, no parallax, no fades; looked at in one small full-page render at 1440. JS off: looked at in small full-page renders at 1440 only, photographs present; the strips' native scroll with JS off was not exercised. No-WebGL does not apply: calm has no canvas.

## images

All `license: business-owned` in `dossier/the-sandhya/assets/index.json`: published on the hotel's own site or its Cloudbeds page, "no credit shown, so the photographer's terms are not known". Alt text was written from the photographs, on contact sheets for the small room and detail shots and at full size for img-071, img-068, img-032, img-038, img-013.

| Where | Assets | Note |
|---|---|---|
| First screen | img-071 | 2000 px desktop; phone a 616x1334 crop scaled 1.5x |
| Arrival | img-038 | 4:5 crop to the doors |
| Studio King | img-077, 061, 062, 070, 079 | 3:2 |
| Studio Twin | img-043, 080, 165, 167, 083 | 3:2; 165, 167 from Cloudbeds uploads at 1501, 083 at 1280; none upscaled |
| Studio+ King | img-042, 066, 067, 074, 076, 073 | 3:2 |
| Director's Suite | img-087, 171, 172, 058, 059, 055 | 3:2; 171, 172 from Cloudbeds uploads at 1501 |
| Feature line | img-068 | full-bleed from 2000 px; phone a 4:5 crop |
| Dining | img-118, 113, 112, 115 | real masonry; 118 and 113 cropped |
| The house | img-032 | full-bleed from 2000 px; phone a 4:5 crop |
| Details | img-131, 125, 139, 140, 130, 135 | one ratio, 4:5 |
| Service | img-141, 142, 143 | staff unnamed, small prints, never leading, as `concepts.md` says; owner should confirm before go-live |
| Kabalana | img-034, img-013 | img-013 cropped to the drawing |
| Exclusive Use | img-039 | |
| Twilight | img-027, img-022 | prints at or under native size. img-022 has no stated location, so it sits only beside "Why Sandhya", as `concepts.md` rules |
| Logos | logo-white, logo-footer | turned to ink in CSS |

Not used, as `concepts.md` rules: img-025, 144 to 150, 036, 012, 057, 151. No stock.

**Originals not re-fetched.** A plain request to an upload URL answered 406. Trying again with a browser's identity would be getting round a wall, so I did not; everything is cut from `dossier/the-sandhya/assets/`.

## gaps

- **Video:** none usable (`vid-001` is a third party's vlog). Stills carry the page. Pitch point.
- **Instagram feed:** no post could be read, so a button only.
- **Nightly rate:** none on the page, by decision; the page says rates are on the booking page and links there.
- **Season, owner's name, staff names:** not in the copy, omitted.
- **WhatsApp:** unconfirmed, left out; Call and Email instead.
- **Stay facts:** the copy's disclosed contradiction is printed as written, beside check-in and check-out.

## conflicts

1. **No date picker (decided, for the pick).** `custom.md` says "pick dates" inside the site. Nobody has seen the engine honour dates (audit F2, "not measurable"), so showing fields whose values may be dropped would be a false promise. The page hands off with a plain link. Room is left for it: in the booking section, two fields go directly above the primary link, in the same centred stack, marked by a comment in the HTML. Alon is raising this at the pick. Cost of the alternative: an unverified promise on every first booking.
2. **`custom.md` "the Instagram feed" against the facts rule.** Button only, as above.
3. **Phone hero softness (not blocking, for the critics to judge).** `concepts.md` asks for a re-cut from the 8080 px original. It could not be fetched (see `images`), so the phone hero is a 616 px crop scaled 1.5x, soft on a sharp phone if you look at the fronds. No other frame carries the idea as well, so I kept it. An original from the owner fixes it. This is the concept's own stated failure risk, so it is flagged here and not smoothed over.
4. **Feature line colour.** `concepts.md` puts the line on "the pale wall", which suggests ink. Measured, the wall is rgb(122,113,96): ink 3.4:1, white 4.7:1 or better. I used white. Phone: ink on the ground, as the concept says.
5. **Intro ¶3 and ¶4.** `concepts.md` places ¶1 and ¶2 beside the door and gives the rest no place. All four are in that column, because a copy field with no place is a flaw.
6. **Rooms ¶3 as a list.** As the concept asks. The connecting words ("Each one also has", "too, with") drop out when the sentence is cut into list rows, and the facts are unchanged. The copyeditor may want to see it.
7. **Fields the concept did not place.** `amenities[]` is a compact list under the rooms, closed by default on a phone. `stayInfo` is beside rooms ¶4 and ¶5. The email and printed phone number are in the footer. `languagesSpoken` (`en`) is not printed: the only way to print it is a new sentence, and the copy has none.
8. **Google Fonts at 4e.** Allowed at this station and loaded without blocking first paint, but `concepts.md` says zero third-party requests and the audit counts two hosts. 4g self-hosts.
9. **Tap targets.** Slideshow dots are 34x44 px, under the rubric's 44 px wide; wider would read as loose. Not gating at this station.
10. **Weight.** First load is 574 KB against the concept's 0.5 MB target, under the playbook's 1.5 MB.

None of these is blocking.
