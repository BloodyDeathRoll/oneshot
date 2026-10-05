# Global Surf: experience-critic, station 4f, picked composite

experience-critic 0.1.0 · run `2026-09-globalsurf-02` · 2026-10-04 · independent: no critic or visual-critic report opened

Pages: `sites/global-surf-adventures/mockups/picked/dist/` (home + `book/`), served on http://127.0.0.1:8971/picked/dist/.
Frames: `reports/2026-09-globalsurf-02/experience-composite/`. Folders: `phone/` and `laptop/` (home), `calm/` (reduced motion and JS off), `book-phone/` and `book-laptop/` (tapped booking walk), `book-phone-apifail/` (same walk with the engine API blocked), `book-nojs/`, and `current/` (live globalsurf.com home, Kabalana lodge page and packages page). The step-by-step logs are in `log-*.txt`.

Walk setup:
- Phone: 390×844, touch, DPR 2, throttled with CDP to 1.6 Mbps, 150 ms RTT and 4× CPU.
- Laptop: 1440×900.
- Also walked with reduced motion and with JavaScript off.
- The hand-off to the engine was intercepted, so the engine's pages were never opened and nothing was submitted. Only the site's own lazy `api.bookinglayer.io/public` calls ran.

Settled, and not judged on taste: the Dancing Script titles and the #1 "The sign" palette (approved by Shahar on 2026-10-04). The Lora hero title is Shahar's own edit from 2026-09-30 (commit 3f71fa6).

## Result

**Dimension 8 (experience): 8 / 10 · PASS · better than the current site: yes**

Taps from home to the engine hand-off (Level 2, 20 Feb 2027, one couple, twin room):
- **9** from the hero CTA.
- **7** from a "Choose Level n" card, which deep-links to `book/?level=…#room`.

## Shahar's pick note, checked one instruction at a time

| Instruction (ledger, `mocked → picked`) | Delivered | Evidence |
|---|---|---|
| Hero: #1's loop (pool + pro surfer), plus #3's beginner standing up while the guide cheers | ✓ Four shots in 10.3 s: pool deck → stand-up → guide with arms up → reef rider. All business footage, real speed, header only, centred title, one coral CTA, no rating, no overlay | `phone/sheet-hero-loop.jpg`, `laptop/sheet-hero.jpg` |
| Fonts: #3's text face; handwritten titles replaced (Caveat, then Dancing Script by the 10-04 decision) | ✓ Lora for text (the same as postcard's `dist`). Dancing Script on all 9 section titles and the booking step titles | font check in `log-home-phone.txt`, `phone/sheet-scroll-*.jpg` |
| "Next set is yours" from #3 | ✓ Asymmetric split with the inset photo | `phone/scroll-01.jpg`, `laptop/sheet-scroll-a.jpg` |
| Choose your level from #1, with the new fonts and **no booking rating** | ✓ Three living 4:5 clips. No "Booking"/"8.6" anywhere in `#levels` (checked in the DOM) | `phone/scroll-03.jpg`, `laptop/hover-level2.jpg` |
| What's included + "Surf, breakfast, surf again" from #3 | ✓ | `phone/scroll-05.jpg`, `phone/scroll-06.jpg` |
| Our rooms from #2 | ✓ Dorm / Twin / Deluxe pills, 5–6-photo galleries, " \| " details, "Choose this room" | `phone/scroll-08.jpg`, `phone/scroll-09.jpg` |
| Pool image, What guests say, The waves from #3 | ✓ Rosa headline live ("Sun 4 Oct 14:30"), widget lazy | `phone/scroll-10.jpg` to `phone/scroll-12.jpg` |
| Follow the lodge from #2 | ✓ | `phone/scroll-13.jpg` |
| "Book the week for your level." from #3 | ✓ | `phone/closing-settled.jpg`, `laptop/scroll-12.jpg` |
| Footer from #1 | ✓ Buttons and icons, no underlines | `phone/scroll-15.jpg` to `phone/scroll-17.jpg` |
| Booking: #1's flow, standalone, one step per screen | ✓ `book/#level → #room → #dates → #total`, history-backed (back from #total goes to #dates, forward returns) | `book-phone/`, `book-laptop/`, `log-book-*.txt` |
| Room step: #2's top selector + a clear CTA to choose the room | ✓ Full-width coral "Choose this room", which moves on to Dates | `book-phone/04-twin.jpg`, `book-phone/04b-twin-choose.jpg` |

Every instruction is met. The fonts and palette hold across home and booking, booking included.

## Timeline (phone, throttled, cold)

| t | What the traveller sees |
|---|---|
| 0.5 s | Inline poster (pool deck under palms), header, "Your surf week starts here", "Book package now". Already a complete first screen (`phone/cold-500ms.jpg`) |
| 1.5 s | Same. Web fonts settle without reflow |
| 3 s | Video source attached (`hero-m608.webm`) |
| 6 s | Clip playing, at the reef rider (`phone/cold-6000ms.jpg`) |

Measurements:
- LCP 0.44 s, CLS 0.004.
- First load, no scroll and video excluded: 493 KB, of which 105 KB is Google Fonts. Google Fonts on load is a third-party request; that is for the critic, and the designer's notes defer it to 4g.
- Reduced motion: 0 video requests on home and booking, poster only.
- JS off: poster with no native controls on home (`calm/sheet-phone.jpg`).
- No horizontal overflow at 390 or 1440.

## The walk (phone, then laptop)

**Phone.** One scroll in, I know what this is and where: a jungle lodge, three levels, "12 rooms | Saturday check-in | ISA-certified surf guides". The persistent bar "From $1,466 pp | 7 nights · Book now" gives the price from the first scroll onwards.

The page is told through media, not tables:
- the level clips, which loop on their own;
- the surf-theory photo beside an icon list;
- the week slideshow;
- room galleries;
- the pool feature line ("Footwear is discouraged. Chilling out is inescapable.").

Sections alternate white and light neutral, so each one reads as its own moment.

The moment that makes you want to go is the hero loop, specifically the guide's arms-up cheer after the stand-up. That shot sells "you'll be looked after" better than any copy on the current site.

Where attention dips:
- **What guests say.** The quote slideshow is as tall as its tallest quote (354 px), so short quotes leave up to ~200 px of empty grey. Its 9 dots wrap onto two rows (8 + 1) at 390 (`phone/scroll-11.jpg`).
- **Instagram row.** The 145 px tiles feel small after the big imagery above it.

**Laptop.** The laptop page is editorial throughout (`laptop/sheet-scroll-a.jpg`, `laptop/sheet-scroll-b.jpg`):
- photo/text splits;
- three level clips side by side, all playing;
- a large room viewer;
- a full-bleed pool moment;
- the Rosa two-column with no divider;
- a four-column footer.

The hero title crosses the subject in the stand-up and reef shots. This is a known compromise of the centring rule; the shade keeps it legible in every frame I sampled.

**Booking, phone** (`book-phone/sheet-a.jpg`, `book-phone/sheet-b.jpg`). Each step has:
- a 240 px media band (the level clip, then photographs);
- the four-bar progress indicator;
- the script step title;
- a fixed bar with Back, the running total and Next.

The flow:
- Level and room choices persist in the URL.
- 0 engine calls on load.
- Adding a couple triggers the live check-in calendar: full and past Saturdays are struck through.
- Choosing 20 Feb returns the live room availability and quote: **$3,092.05, "Live price from the booking engine"**.
- With the API blocked, the snapshot shows with an honest note: "Live prices didn't load. These are the booking engine's prices from 29 Sep 2026" (`book-phone-apifail/`).

The flow feels like the site, not like Bookinglayer.

**Hand-off:**
- **JS on:** `…/en/product/level-2-rollers?start=2027-02-20&couple=1&end=2027-02-27`. Phone and laptop identical, with start + end and never duration (✓ `docs/bookinglayer.md` §3).
- **JS off** (`book-nojs/`): all four steps stack into one GET form. The result is `…/level-2-rollers?start=2027-02-20&end=2027-02-27&female=0&male=0&couple=1` ✓.

**Against the current site** (`current/`):

Where globalsurf.com is still better:
- its brush lettering has more grit and character than Dancing Script;
- the earthy beige palette and the Wellness / Nature / Adventure image moments give it a lifestyle breadth the composite does not try to have.

Where it loses:
- its hero is a YouTube embed with a pause icon and a "Weitere Videos" bar;
- a Messenger bubble sits over every screen;
- it shows no price anywhere;
- the lodge page opens on a "Fill in your details" form;
- its rooms are a Kuula 360 player;
- booking means waiting for a reply.

The composite beats it on the first screen, on the whole page and on booking, at a glance.

## Fix list (biggest effect first)

1. **The final action is not visible when the Total step opens.**
   - Laptop 1440×900: "Continue booking" (y 832–888) sits behind the sticky step nav. `elementFromPoint` at its centre returns `div.snav`, so the screen shows only "Back" and "Total $3,092.05" (`book-laptop/08-total.jpg`).
   - Phone: the button is at y 1143 against an 844 viewport, the big total at y 911, and the fixed bar shows only Back + Total (`book-phone/08-total.jpg`, `book-phone/09-total-continue.jpg`).
   - Fix: on the Total step, put "Continue booking" into the fixed/sticky bar where Next was, and drop or shrink the media band on phone so the total sits on the first screen.
   - **Must be fixed in the build. This is the one thing stopping "easy to book".**
2. **The room step sells the surf, not the room.**
   - Phone: the 240 px band keeps the level clip, so the room gallery starts at y ≈ 545 and is mostly under the bar (`book-phone/03-room.jpg`).
   - Laptop: a full-height surf clip sits beside a ~545 px gallery (`book-laptop/04-twin.jpg`).
   - Fix: on phone, hide the band on the Room step so the pills, gallery and "Choose this room" fill the screen. On laptop, let the media half show the selected room's gallery and keep the column for text, price and the CTA.
3. **Numbers before the traveller has chosen anything.**
   - The bar reads "Total $1,606.04" on the Dates step before any guest or date is set (`book-phone/05-dates.jpg`).
   - The room supplement shows cents and drifts between runs ("+$80.03" on phone, "+$80.02" on laptop, same dates).
   - Fix: show "From $1,466 pp" until guests and a date are set, then the live total. Show whole dollars for supplements.
4. **Dates hygiene.**
   - "Sat 3 Oct 2026" (yesterday) is in the snapshot list. With JS on it shows struck through, which reads as "full"; with JS off it can be submitted.
   - Submitting the no-JS form without a check-out sends `end=` empty (logged in `log-book-nojs.txt`).
   - Fix: drop Saturdays before today, and make `start` and `end` `required` in the no-JS form.
5. **Phone polish.**
   - Give the guest-quote slideshow a height per slide, or set the dots as a counter ("1 / 9") so they never wrap.
   - Make tapping a level card advance to Room, as "Choose this room" advances to Dates. That saves one tap and makes the steps behave the same.
   - Stop repeating "Freestylers – B&B only" in its own detail line (home and booking).
   - Remove the trailing " | " after the Rosa timestamp where the credit wraps (`phone/scroll-12.jpg`).

**Keep:**
- the hero exactly as cut (four shots, poster = first frame, centred Lora title, one coral CTA);
- the section order Shahar dictated;
- the living level clips;
- #2's room viewer on home and in booking;
- the alternating white/neutral rhythm;
- the persistent price bar;
- standalone, history-backed steps with deep links from the home cards;
- the live calendar and quote after interaction, with the snapshot fallback and its honest note;
- the start/end hand-off with JS on and off;
- the footer buttons.
