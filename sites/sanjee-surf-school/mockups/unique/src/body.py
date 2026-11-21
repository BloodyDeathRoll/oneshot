# Everything below the first screen, exec'd by build.py in its namespace. Words from copy/en.json only.
B = {b['heading']: [p.strip() for p in b['body'].split('\n\n')] for b in C['copyBlocks']}
L = C['lessons']
PHONE = C['contact']['phone']
PHONE_SHOWN = '+94 77 400 4422'
assert PHONE_SHOWN.replace(' ', '') == PHONE
EMAIL = C['contact']['email']
TEL, MAILTO = f'tel:{PHONE}', f'mailto:{EMAIL}'
MAP = C['contact']['mapUrl']
ADDRESS = C['contact']['address']
assert len(C['priceList']) == 14
TOURS, BUY = C['priceList'][:12], C['priceList'][12:]         # by position (concepts.md §6, schema gap)
PRICES_AS_OF = B['Before you book'][2].split('. ')[1]         # "All prices are as of 5 November 2026."
assert PRICES_AS_OF.startswith('All prices are as of')

UNIT = {'per_lesson': 'per lesson', 'per_hour': 'per hour', 'per_day': 'per day', 'flat': ''}
LEVEL = {'first_time': 'Total beginner', 'beginner': 'Beginner', 'intermediate': 'Intermediate', 'advanced': 'Advanced'}

def paras(ps): return ''.join(f'<p>{E(p)}</p>' for p in ps)
def money(n, cur='USD'): return f'{cur} {n}'

def pic(name, w, alt, cls='pr', sizes=None):
    iw, ih = webp_size(name)
    return f'<img class="{cls}" src="img/{name}.webp" width="{iw}" height="{ih}" alt="{E(alt)}" loading="lazy" decoding="async"' + (f' sizes="{sizes}"' if sizes else '') + f' style="--w:{w}px">'

ICON_TEL = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5h2.600l1.500 4.200-2 1.500a12 12 0 0 0 6.100 6.100l1.500-2 4.200 1.500v2.600c0 1.100-.9 2-2 2A15.900 15.900 0 0 1 4.600 5.500c0-1.100.9-2 2-2Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>'
ICON_MAIL = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.500" y="5.500" width="17" height="13" rx="2.500" fill="none" stroke="currentColor" stroke-width="2"/><path d="m4.500 7.500 7.500 6 7.500-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>'
ICON_PIN = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.300 7-11.500a7 7 0 1 0-14 0C5 14.700 12 21 12 21Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="9.500" r="2.400" fill="currentColor"/></svg>'

def btn2(href, icon, label, extra=''):
    return f'<a class="btn2" href="{E(href)}"{extra}>{icon}<span>{E(label)}</span></a>'

def rate_full():
    return f'<a class="rate-full" href="{E(R["url"])}" rel="noopener"><b>{E(R_SCORE)}</b><span>{E(R_COUNT)}<br>{E(R_ASOF)}</span></a>'

# ---------------------------------------------------------------- B. the shallows: lessons
def details(l):
    if l['label'] == 'Beginner Lesson':   # no group-size row on this card (N7)
        parts = [', '.join(LEVEL[x] for x in l['level']).replace('Total beginner, Beginner', 'Total beginner, beginner')]
    elif l['label'] == 'Private Coaching':
        parts = [l['groupSize'], ', '.join(LEVEL[x] for x in l['level']).replace('Beginner, Intermediate, Advanced', 'Beginner, intermediate, advanced')]
    else:                                 # Week Intensive: level is null, so no level words; sessions and hours stay together
        parts = [l['groupSize']]
    hours = f"{l['durationMin'] // 60} hours"
    # "each" is the one template word outside en.json (coordinator, round 2): dossier lessons[2] says 5 private 2-hour sessions
    parts.append(hours + ' each' if l['label'] == 'Week Intensive' else hours)
    return ' | '.join(parts)

def lesson(i, l):
    unit = UNIT[l['unit']]
    unit_html = f'<span class="unit">{E(unit)}</span>' if unit else ''
    the = '' if l['label'] == 'Private Coaching' else 'the '
    href = wa(HELLO + f"I'd like to ask about {the}{l['label']}.")
    extra = f'<p class="week-note">{E(B["Lessons"][1])}</p>' if l['label'] == 'Week Intensive' else ''
    return f'''<article class="lesson l{i}">
   <p class="price"><span class="cur">{E(l['currency'])}</span> {l['price']}{unit_html}</p>
   <h3>{E(l['label'])}</h3>
   <p class="det">{E(details(l))}</p>
   <p class="inc">{E(l['includes'])}</p>
   {extra}
   <a class="btn" href="{E(href)}" data-open-drawer data-lesson="{i}"><span class="btn-t">Ask about this lesson</span></a>
  </article>'''

shallows = f'''<section class="shallows" id="book">
 <div class="sh-top">
  <p class="lead">{E(C['tagline'])}</p>
  <div class="who">
   <h2>{E(C['copyBlocks'][0]['heading'])}</h2>
   {paras(B['Who we teach'])}
  </div>
  <div class="les" id="lessons">
   <h2>Lessons</h2>
   <p>{E(B['Lessons'][0])}</p>
  </div>
 </div>
 <div class="steps">
  {''.join(lesson(i, l) for i, l in enumerate(L))}
 </div>
 <div class="sh-foot">
  <p class="group">{E(B['Lessons'][2])}</p>
  {rate_full()}
  {btn(WA_GENERAL, E(CTA))}
 </div>
</section>'''

# ---------------------------------------------------------------- before you book, with two prints
before = f'''<section class="before">
 <div class="b-prints">
  {pic('print-img-005', 500, 'An instructor and a student standing in pop-up stance on the sand, on a red and a blue soft-top board.', 'pr b5')}
  {pic('set-img-006', 380, 'A surfer in a dark top turning a white board on a green wave, with white water breaking behind.', 'pr b6')}
 </div>
 <div class="b-words">
  <h2>Before you book</h2>
  {paras(B['Before you book'])}
 </div>
</section>'''

# ---------------------------------------------------------------- C. boards: a swipe strip by duration
ORDER, ROWS = [], {}
for r in C['rentals']:
    if ', ' not in r['label']: continue          # Bodyboard is its own card
    kind, dur = r['label'].split(', ', 1)
    if dur not in ROWS: ORDER.append(dur); ROWS[dur] = {}
    ROWS[dur][kind] = r
def rate_row(name, r):
    unit = UNIT[r['unit']]
    return f'<div class="rr"><span>{E(name)}</span><b>{E(money(r["price"], r["currency"]))}</b>' + (f'<i>{E(unit)}</i>' if unit else '') + '</div>'
cards = ''
for dur in ORDER:
    s, h = ROWS[dur]['Soft-top'], ROWS[dur]['Hardboard']
    assert s['note'] == h['note']
    note = f'<p class="note">{E(s["note"])}</p>' if s['note'] else ''
    cards += f'<li class="card"><h3>{E(dur)}</h3>{rate_row("Soft-top", s)}{rate_row("Hardboard", h)}{note}</li>'
bb = next(r for r in C['rentals'] if r['label'] == 'Bodyboard')
cards += f'<li class="card"><h3>{E(bb["label"])}</h3>{rate_row("", bb)}</li>'
buy = ''.join(f'<div class="rr buy"><span>{E(r["label"])}</span><b>{E(money(r["price"], r["currency"]))}</b></div>' for r in BUY)
cards += f'<li class="card">{buy}</li>'

boards = f'''<section class="boards" id="boards">
 <div class="bd-top">
  <h2>{E('Board rental')}</h2>
  <div class="two">{paras(B['Board rental'])}</div>
 </div>
 <ul class="strip" id="strip" tabindex="0" aria-label="Board rental prices by duration">{cards}</ul>
 <div class="bd-foot">
  <p class="asof">{E(PRICES_AS_OF)}</p>
  {btn(wa(HELLO + "I'd like to ask about renting a board."), E(CTA))}
 </div>
</section>'''

# ---------------------------------------------------------------- the silver band
band = f'''<section class="band" aria-label="{E(C['featureLine'])}">
 <picture>
  <source media="(max-width: 759px)" srcset="img/band-img-018-phone.webp" width="{webp_size('band-img-018-phone')[0]}" height="{webp_size('band-img-018-phone')[1]}">
  <img src="img/band-img-018.webp" width="{webp_size('band-img-018')[0]}" height="{webp_size('band-img-018')[1]}" alt="An orange sunset over lines of breaking waves, with the small figures of surfers in the water." loading="lazy" decoding="async">
 </picture>
 <p>{E(C['featureLine'])}</p>
</section>'''

# ---------------------------------------------------------------- D. Sanjee and what people say
LANG = {'en': 'English', 'si': 'Sinhala'}
creds = ' | '.join(f"{c['label']}, {c['issuer']}" for c in C['credentials'])
langs = 'Languages: ' + ', '.join(LANG[x] for x in C['languagesSpoken'])
quotes = ''.join(f'<figure class="q"><blockquote>{E(t["quote"])}</blockquote><figcaption>{E(t["author"])} | Google</figcaption></figure>' for t in C['testimonials'])
dots = ''.join(f'<button class="dot" type="button" aria-label="Review {i + 1}"></button>' for i in range(len(C['testimonials'])))
sanjee = f'''<section class="sanjee" id="sanjee">
 <div class="sj">
  <div class="sj-words">
   <h2>{E(C['copyBlocks'][1]['heading'])}</h2>
   <div class="big">{paras(B['Sanjee, head instructor'])}</div>
   <p class="det">{E(creds)}</p>
   <p class="det">{E(langs)}</p>
  </div>
  {pic('print-img-008', 480, 'Sanjee walking out of the shallows, smiling, with a board with a pink rail under his arm and a rust-red cliff behind. The horizon runs at a tilt.', 'pr sj-pic')}
 </div>
 <div class="says">
  <div class="says-head">{rate_full()}</div>
  <div class="masonry" id="quotes" tabindex="0" role="group" aria-label="Google reviews">{quotes}</div>
  <div class="dots" id="qdots">{dots}</div>
 </div>
</section>'''

# ---------------------------------------------------------------- E. outside
waves = f'''<section class="outside" id="waves">
 <div class="o-top">
  <div class="o-words">
   <p class="big">{E(C['spot'])}</p>
   <p class="season">{E(C['season'])}</p>
  </div>
  <div class="o-prints">
   {pic('print-img-012', 500, 'Tall palms and a sandy path along a green, with beach stalls and clean lines of swell on a blue sea behind.', 'pr o12')}
   {pic('print-img-014', 440, 'Thatched beach parasols on pale sand in front of lines of white water, under a grey sky.', 'pr o14')}
   {pic('print-img-009', 340, 'A surfer seen from behind, paddling a white board towards a low aqua wave under a pale sky.', 'pr o09')}
  </div>
 </div>
 <h2>{E(C['copyBlocks'][6]['heading'])}</h2>
 <div class="three">{paras(B['Other waves, as we rate them'])}</div>
</section>'''

# ---------------------------------------------------------------- F. along the coast: the block and the rows stay together
def tour(r, i):
    name = r['label'].split(' (')[0]
    href = wa(HELLO + f"I'd like to ask about the tuk-tuk tour: {name}.")
    return f'''<li class="tour{' gap' if i == 3 else ''}">
    <div class="t-w"><h3>{E(r['label'])}</h3><p>{E(r['note'])}</p></div>
    <p class="t-p">{E(money(r['price'], r['currency']))}</p>
    <a class="ib" href="{E(href)}" aria-label="{E(CTA)}: {E(name)}">{ICON_WA}</a>
   </li>'''
tuktuk = f'''<section class="coast" id="tuktuk">
 <div class="c-words">
  <h2>{E(C['copyBlocks'][4]['heading'])}</h2>
  {paras(B['By tuk-tuk'])}
  <p class="asof">{E(PRICES_AS_OF)}</p>
 </div>
 <ol class="tours">{''.join(tour(r, i) for i, r in enumerate(TOURS))}</ol>
</section>'''

# ---------------------------------------------------------------- G. back on the sand
sand = f'''<section class="sand">
 {pic('print-img-017', 560, 'Three beach dogs on footprinted sand, watching an orange sun go down over the waves, with palms in silhouette on the left.', 'pr sand-pic')}
 <div class="sand-w">
  <p class="big">{E(C['closing'])}</p>
  <div class="acts">
   {btn(WA_GENERAL, E(CTA))}
   {btn2(TEL, ICON_TEL, 'Call')}
   {btn2(MAILTO, ICON_MAIL, 'Email')}
  </div>
 </div>
</section>'''

finding = f'''<section class="finding" id="finding">
 <div class="f-w">
  <h2>{E(C['copyBlocks'][7]['heading'])}</h2>
  {paras(B['Finding us'])}
  <p class="addr">{E(ADDRESS)}</p>
  {btn2(MAP, ICON_PIN, 'Open in Google Maps', ' rel="noopener"')}
 </div>
 <footer class="foot">
  <p class="brand-f">{E(NAME)}</p>
  <div class="acts">
   {btn(WA_GENERAL, E(CTA))}
   {btn2(TEL, ICON_TEL, PHONE_SHOWN)}
   {btn2(MAILTO, ICON_MAIL, EMAIL)}
  </div>
 </footer>
</section>'''

# ---------------------------------------------------------------- persistent bar + the bottom sheet
bar = f'''<div class="bar" id="bar">
 {btn(WA_GENERAL, E(CTA))}
 <a class="ib ib-bar" href="{E(TEL)}" aria-label="Call">{ICON_TEL}</a>
</div>'''

def tiles(group, opts, checked=None):
    out = ''
    for i, (val, label) in enumerate(opts):
        c = ' checked' if checked == i else ''
        out += f'<label class="tile"><input type="radio" name="{group}" value="{E(val)}"{c}><span>{label}</span></label>'
    return out

lesson_tiles = tiles('lesson', [(l['label'], f"{E(l['label'])}<small>{E(money(l['price'], l['currency']))}</small>") for l in L], 0)
level_tiles = tiles('level', [(v, v) for v in ['Total beginner', 'Beginner', 'Intermediate', 'Advanced', 'Not sure']])
people_tiles = tiles('people', [(v, v) for v in ['1', '2', '3+', 'Not sure']])
sheet = f'''<dialog class="sheet" id="sheet" data-drawer aria-labelledby="sheet-t">
 <form method="dialog" class="sh-in" id="sheet-form">
  <div class="sh-drag">
  <div class="sh-grab" aria-hidden="true"></div>
  <div class="sh-head">
   <h2 id="sheet-t">Your message</h2>
   <button class="sh-x" type="submit" value="close" aria-label="Close"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2.400" stroke-linecap="round"/></svg></button>
  </div>
  </div>
  <fieldset><legend>Lesson</legend><div class="tiles t3">{lesson_tiles}</div></fieldset>
  <fieldset><legend>Your level</legend><div class="tiles">{level_tiles}</div></fieldset>
  <fieldset><legend>Date</legend><div class="tiles">
   <label class="tile tile-date"><span class="sr">Choose a date</span><input type="date" name="date" id="sheet-date"></label>
   <label class="tile"><input type="radio" name="dateNS" value="Not sure"><span>Not sure</span></label>
  </div></fieldset>
  <fieldset><legend>People</legend><div class="tiles">{people_tiles}</div></fieldset>
  <p class="bubble" id="bubble" aria-live="polite"></p>
  <a class="btn btn-send" id="sheet-send" href="{E(WA_GENERAL)}"><span class="btn-t">{E(CTA)}</span></a>
 </form>
</dialog>'''

BODY = shallows + before + boards + band + sanjee + waves + tuktuk + sand + finding + bar + sheet
