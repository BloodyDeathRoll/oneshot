# panta-rei-resort — run 2026-11-lk-surf-01 (test)

State: **packaged** (2026-11-07). Waiting at gate c: Alon and Shahar send the pitch when everything is ready. Picked at gate b by Alon: interactive "Morning swim". Critique PASS 91.1/100 in round 2. Preview https://panta-rei-resort.os1.workers.dev (version 4b5dc11e), proposal https://panta-rei-resort-proposal.os1.workers.dev (version 4b75d552), message in `sites/panta-rei-resort/pitch/message.en.whatsapp.md` (to +94 72 800 3022). Sessions on this run set `ONESHOT_RUN=2026-11-lk-surf-01` (Alon also has 2026-10-midigama-01 active).

- Panta Rei Resort, back to life road, Kabalana Rd, Ahangama 80650 (Google). +94 72 800 3022 (WhatsApp too), hello@pantareiresort.com. 16 bungalows, pool, restaurant + bar open to outside guests, yoga/Pilates "Panta Fitness Club", group retreats. 366 m from the Kabalana shore.
- Chosen by name by Alon (2026-11-06) as "an upscale hotel this time", from a quick look at upscale Ahangama hotels with weak sites. Ratings: Google 4.7 (213), Booking.com 9.2 (468). OTA price from ₪339 (Nov 10–12): upper mid-range rather than luxury.
- Presence **4/5**: a mobile Wix site that books in one tap (WhatsApp; HolidayFuture engine at pantareiresort.holidayfuture.com behind "CHECK AVAILABILITY"). Weak on content: 140-word home, room cards copied from Booking.com, empty Explore page, template `info@mysite.com`, no room prices. The pitch is a redesign that must beat a working site.
- Surf: `beach_lodging`, confidence 0.5. Own site says "surfing the waves of Kabalana" / "perfect base for surfing" and hosts surf/yoga groups; no lessons, rental or board storage found. Excluded in 2026-09-ahangama-02 from its Google listing alone.

Harvest (`dossier/panta-rei-resort/dossier.json` + `sources.md`, media recipe `make-media.sh`):
- 4 room types from the engine (Double 22 m², Triple 30 m², Family Villa 50 m² with outdoor bath, Suite 40 m² with private plunge pool); 16 rooms; check-in 2 pm / out 11 am; 100% refund up to 14 days.
- Two full menus with LKR prices (PDFs), fitness classes 2,500/3,000/3,500 LKR (Vinyasa 8:30 daily but Friday), Surf Therapy Massage 20,000/17,000 LKR, pool day pass 3,500 LKR.
- 42 business-owned photos (professional; 13 landscape ≥ 1920 px), 2 stock flagged (img-026 Buddha headland, img-027 string lights: never as the business).
- 4 business-owned videos. Hero cuts: vid-001 (aerial ring of red roofs → sea), vid-004 (own YouTube film's opening: surf beach, place not named on screen), vid-002.
- No room prices anywhere public without dates (engine needs dates). No owner/staff names. Off season the restaurant closes (one guest, July 2026).

Audit (`dossier/panta-rei-resort/audit.json`): 11 findings; lead with identical room cards (F2), ratings not shown (F5), no price before the engine (F1). Primary action = own engine, WhatsApp secondary.
Copy (`sites/panta-rei-resort/copy/`): passed 4c in round 2 (round 1 failed on 4 sentences; the harvester added the business's PDF text to the dossier).
Concepts (`sites/panta-rei-resort/concepts.md`): archetype "the guest booklet", one thing = the ring of red roofs around the pool.
Mockups (`sites/panta-rei-resort/mockups/{calm,interactive,unique}/`): calm "Welcome to Panta Rei" (pool-level hero), interactive "Morning swim" (vid-002 aerial hero, room chooser), unique "From the pool to the sea" (scroll-scrubbed drone film, 72 frames 2.9/1.5 MB after first scroll). View over http: `node tools/serve-mockups.mjs`.
Engine: holidayfuture accepts `?start=&end=&numberOfGuests=`; it silently clears dates when the room is full (owner item).

Open (human decisions):
- Gate c: Alon + Shahar send when ready (nothing sent).
- The proposal page's one dollar figure: "roughly $6–12 a month" to a hosting company under the self-hosted option; delete if "no price amount" is strict, then redeploy the proposal Worker.
- Guest Wi-Fi password is public in the guest-guide PDF linked from their home page: tell the owner privately (suggested line in `sites/panta-rei-resort/pitch/notes.md`), never in the pitch.
- Owner items: room prices, real beach distance, breakfast end time (12:00 vs 11:30), which inbox they read, season/off-season closures, how to book a massage, engine silently clearing dates when a room is full.
- `tools/funnel.mjs` gained holidayfuture.com + hostaway.com as engines (commit 717724d), done without a proposal, following the Bookinglayer precedent: tell Shahar.
- Contacts conflict: Facebook lists +94 74 209 5135 and pantareiresort@gmail.com; the site uses +94 72 800 3022 and hello@ (the Google listing agrees with the site).

Files: `reports/2026-11-lk-surf-01/candidates.json`, `scout-log.md`, `area.geojson`, `funnel/panta-rei-resort/funnel.json` (screenshots local only).
