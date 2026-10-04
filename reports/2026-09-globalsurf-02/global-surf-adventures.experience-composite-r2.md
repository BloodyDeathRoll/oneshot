# Global Surf: experience-critic, station 4f, picked composite, round 2

experience-critic 0.1.0 · run `2026-09-globalsurf-02` · 2026-10-04 · after the designer's fix round (commit 2c7a17e) · independent: no critic or visual-critic report opened

Pages: `sites/global-surf-adventures/mockups/picked/dist/` (home + `book/`), served on http://127.0.0.1:8971/picked/dist/.
Frames and logs: `reports/2026-09-globalsurf-02/experience-composite-r2/`. The folders are:
- `phone/` and `laptop/`: home, cold load, hero loop and scroll;
- `book-phone-live-hero/`, `book-laptop-live-hero/`: booking walked from the hero CTA with the live engine API;
- `book-phone-live-card/`: walked from a "Choose Level 2" card;
- `book-phone-apifail-hero/`, `book-laptop-apifail-card/`: the same walks with `api.bookinglayer.io` blocked;
- `calm/`: JS off, reduced motion, a clock set to 25 Oct, and behaviour probes;
- `current/`: the live globalsurf.com home on phone and laptop.

The step logs are the `log-*.txt` files.

Walk setup:
- Phone: 390×844, touch, DPR 2. The cold home load was throttled with CDP to 1.6 Mbps, 150 ms RTT and 4× CPU.
- Laptop: 1440×900.
- Also walked with JS off and with reduced motion.
- The engine hand-off (`globalsurfadventures.bookinglayer.com`) was intercepted and aborted every time: no engine page opened, nothing submitted. Only the site's own lazy `api.bookinglayer.io/public` calls ran.

Settled, and not judged on taste: the Dancing Script titles, the Lora hero title and the #1 "The sign" palette.

## Result

**Dimension 8 (experience): 8 / 10 · PASS · better than the current site: yes**

Taps from home to the engine hand-off (Level 2, 20 Feb 2027, one couple, twin room), counting the first tap on home:

| Entry | Round 1 | Round 2 |
|---|---|---|
| Hero "Book package now" | 9 | **8** (a level tap now advances to Room) |
| "Choose Level 2" card | 7 | **7** |

## Round-1 fixes: fixed or not

| # | Round-1 fix | Status | Evidence (this round) |
|---|---|---|---|
| 1 | "Continue booking" hidden on the Total step | **Fixed** | The coral "Continue booking" plus total now sit in the bar: phone y 786–834 of 844, laptop y 834–886 of 900. `elementFromPoint` at its centre hits the button at both widths. Frames `book-phone-live-hero/08-total.jpg` and `book-laptop-live-hero/sheet.jpg` |
| 2 | Room step sold the surf, not the room | **Fixed** | On the phone the media band is gone on Room (height 0). The pills, gallery, name, price and coral "Choose this room" fill the first screen (`03-room.jpg`). On the laptop the media half is the chosen room's gallery (`book-laptop-live-hero/sheet.jpg`). No room is pre-chosen. A soft Next scrolls to "Choose this room" and focuses it (`03b-…jpg`) |
| 3 | Totals shown before any choice; supplements in cents | **Fixed** | The bar reads "From $1,466 pp" on Level, Room and Dates. It becomes "Total $3,092" only once guests and a date are set. Whole dollars everywhere: "+$80", "$1,546", "$3,092" (logs `book-*`) |
| 4a | Past Saturdays offered | **Fixed** | Today (4 Oct) the first offer is 24 Oct, with JS on and off. With the clock set to 25 Oct and the API blocked, 24 Oct is dropped at runtime (`log-calm-probes.txt`, `calm/clock-1025-dates.jpg`) |
| 4b | JS off: `end=` could be sent empty | **Fixed** | `start` and `end` are `required`. A submit without a check-out is blocked ("Please select an item in the list."), and no request is sent. Residual issue: see new issue 5 |
| 5a | Guest quotes: 9 dots wrapped onto two rows | **Fixed** | The phone shows "‹ 1 / 9 ›" (`phone/scroll-10.jpg`). Laptop keeps one row of dots. Residual issue: see new issue 3 |
| 5b | A level tap did not advance | **Fixed** | Tapping the Level 2 card goes to `#room` |
| 5c | "Freestylers – B&B only" repeated | **Fixed** | The name appears once on home and once in booking |
| 5d | Trailing " \| " after the Rosa time | **Fixed** | On the phone the credit has its own line. On a settled page I found no line-end separator at 390 or 1440, home or booking. They do show with JS off (welcome details), which is trivial |

All 5 fixes (9 sub-items) are in.

## Nothing broke: booking regression checks

| Check | Result |
|---|---|
| Engine calls on booking load | 0, phone and laptop |
| Live path | After the guests: `GET …/availabilities`, `GET /accommodations/availabilities`, `POST /packages/…/items`. Result: **$3,092**, "Live price from the booking engine". 19 Dec is struck through for a couple |
| API blocked | Same walk, same $3,092 from the snapshot, with "Live prices didn't load. These are the booking engine's prices from 29 Sep 2026." No dead end |
| Back / forward | Back from Total goes to Dates; forward returns to Total |
| Hand-off, JS on (phone, laptop, live, API blocked, hero and card) | `…/en/product/level-2-rollers?start=2027-02-20&couple=1&end=2027-02-27`. Start and end are present and `duration` is never sent (`docs/bookinglayer.md` §3) ✓ |
| Hand-off, JS off (phone, laptop) | `…/level-2-rollers?start=2027-02-20&end=2027-02-27&female=0&male=0&couple=1` ✓ |
| Reduced motion | 0 video requests on home (scrolled to the end) and on booking, phone and laptop |
| JS off, home | Poster with no native controls. All images load and the rooms stack (`calm/sheet-nojs-phone-home.jpg`) |
| Console errors | None (live). With the API blocked, only the 4 aborted requests |

## Shahar's pick note: still met

I re-walked it, and every instruction from round 1 still holds:
- Hero: the four-shot loop, centred Lora title, one coral "Book package now", no rating, no overlay. Frames: `phone/sheet-hero-loop.jpg`, `laptop/sheet-hero.jpg`.
- Next set → levels without the Booking rating → included + week → #2 rooms → pool, guests, waves → Instagram → closing → #1 footer.
- Booking is standalone, one step per screen, with the #2 pill selector and a clear "Choose this room".
- One font pair and one palette from home through booking.

The guests band is now set in the ink colour over the toast photograph (img-023). It reads as an evening moment between the pool and the waves, not as a dark theme (`phone/scroll-10.jpg`, `laptop/sheet-scroll-07.jpg`).

## Timeline (phone, throttled, cold)

| t | What the traveller sees |
|---|---|
| 0.5 s | Inline poster (pool deck), header, "Your surf week starts here", "Book package now". A complete first screen (`phone/cold-500ms.jpg`) |
| 1.5 s | Same. Fonts settled, no reflow |
| 3 s | `hero-m608.webm` attached and starting |
| 6 s | Playing, at the stand-up shot (`phone/cold-6000ms.jpg`) |

Measurements:
- LCP 0.48 s, CLS 0.003 on the phone. On the laptop, LCP 0.08 s and CLS 0.005.
- 12 requests before scroll. Hosts: self, plus Google Fonts (the 4g self-hosting item, unchanged).
- No horizontal overflow at 390 or 1440.

## The walk

**Phone.**
- One scroll in, I know what this is, where it is and what it costs: "12 rooms | Saturday check-in | ISA-certified surf guides" and the persistent "From $1,466 pp | 7 nights · Book now" bar.
- The page is told through media: living level clips, the theory photo with its icon list, the week slideshow, the room galleries and the pool line.
- The moment that makes me want to go is still the guide's arms-up cheer in the hero.
- The new ink guests band gives the long page a needed change of light before the waves.

Where attention dips:
- The guests control moves as the quotes change (new issue 3).
- The Instagram tiles are still small after the big imagery.
- The phone hero is a 608 px crop shown at 2×, so it is a little soft. The designer notes no larger source exists.

**Laptop.**
- Editorial throughout: splits, three level clips playing side by side, the big room viewer, the full-bleed pool, the ink guests band, the Rosa two-column and a four-column footer (`laptop/sheet-scroll-01.jpg`, `-07.jpg`).
- The hero title still crosses the riders in two shots. The shade keeps it legible (`laptop/sheet-hero.jpg`).

**Booking.** Each step now gives its own screen to the choice:
- Level: three cards with the tick.
- Room: the gallery, the price, then "Choose this room", which becomes "✓ Chosen".
- Dates: Saturday chips by month, nights, and floating-label steppers.
- Total: the summary, with the hand-off in the bar.

It feels like the site, and it is faster and clearer than in round 1. The step I hesitated on most was Dates: the chips come before the guests, but the guest mix is what decides which chips stay valid (new issue 1).

**Against the current site** (`current/sheet-phone.jpg`, `current/sheet-laptop.jpg`, `log-current.txt`):

The current home has:
- a YouTube embed as its hero;
- a Messenger bubble on every screen;
- 20 third-party hosts on load (doubleclick, Facebook, Elfsight and others);
- no price anywhere;
- "Book Your Stay", which goes to `/contact/`.

It is still better on two points:
- its brush lettering has more grit than Dancing Script;
- its Instagram strip shows real posts, where ours shows lodge photographs.

The composite beats it at a glance, on the whole page and decisively on booking.

## New issues found this round

1. **A date the live calendar invalidates stays chosen, and the hand-off loses `start`.** (`log-calm-probes.txt`, `book-phone-live-hero/sheet-unavailable.jpg`)
   - Steps: on Dates, tap Sat 19 Dec first, then add a couple. The live calendar strikes 19 Dec, but it stays selected, with no message, and the bar still offers Next.
   - The Total step then shows "Room, per person: Not free on these dates" and "Total —", while the bar still shows an active "Continue booking".
   - The hand-off is `…/level-2-rollers?couple=1&end=2026-12-26`: `start` is dropped and `end` is kept.
   - This is the one path that sends a traveller to the engine with broken dates.
2. **The home rooms' "Choose this room" assumes Level 1 without asking.**
   - `book/?room=double#room` opens on Room with Level already marked done.
   - Next goes straight to Dates, and the Total summary reads "Level 1 – Fomies" (`calm/home-room-to-book.jpg`, `log-calm-probes.txt`).
   - A Level 3 surfer who starts from a room hands off to the Level 1 product unless they read the summary.
3. **On the phone, the guest-quote control jumps.** The section height follows each quote (627–795 px across the 9 quotes), so the › button moves by up to 168 px between taps.
4. **The summary dates wrap badly at 390.** "20 Feb 2027 – 27 Feb 2027 | 7" sits on one line and "nights" on the next (`book-phone-live-hero/08-total.jpg`).
5. **JS off accepts a check-out before the check-in.** start 2027-02-20 + end 2026-10-31 submits as-is. The end list offers every start's check-outs, grouped "From Sat …".

## Fix list (biggest effect first)

1. **Dates: keep the chosen date valid.**
   - Fix: when the live calendar drops the chosen Saturday, clear it and say so in place ("Sat 19 Dec isn't available for 1 couple. Choose another Saturday."), and keep Next soft until a valid date is chosen.
   - Fix: on Total, when the room or date is not free, swap "Continue booking" for "Change dates" (back to `#dates`).
   - Fix: never send `end` without `start`.
   - Better still: put the guest steppers **above** the chips, so the calendar is right before the traveller taps a date.
2. **A room chosen on home must not skip the level choice.**
   - Fix: land on the Level step with the room pre-chosen (or show "Level 1 – Fomies · Change" on the Room step), and never mark Level done before the traveller has chosen one.
3. **Pin the guest-quote control.**
   - Fix: give the quote area the height of the tallest quote on phones and centre each quote in it, or put "‹ n / 9 ›" above the quote beside the score.
   - Either way, the › button must not move under the thumb.
4. **Summary polish (390).** Set the dates as two lines ("20 Feb – 27 Feb 2027" / "7 nights"), or keep "7 nights" together with a no-break space.
5. **JS off: only matching check-outs.**
   - Fix: list check-outs as "7 / 14 / 21 / 28 nights" radios whose values the engine can read, or validate that end > start.
   - Also hide line-end " | " in CSS without needing JS.
   - Pause the hero video once it is scrolled out of view: it plays to the end of the page today, which costs battery and data.

**Keep:**
- the hero exactly as cut;
- Shahar's section order;
- the living level clips;
- the ink guests band over the toast photograph;
- the room galleries on home and in booking;
- the persistent "From $1,466 pp" bar;
- standalone, history-backed steps;
- the level tap that advances;
- the room step as it is now (no default, "✓ Chosen", tick on the pill, soft Next that points to the button);
- "From … pp" until everything is chosen, then whole-dollar live totals;
- the hand-off in the bar on Total;
- the snapshot fallback with its honest note;
- start + end hand-offs with JS on and off;
- the footer buttons.
