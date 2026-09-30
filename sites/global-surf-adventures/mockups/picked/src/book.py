# Booking page, exec'd by build.py (shares its namespace). #1's booking design, one step per screen.
def book():
    pre = '../'
    B = X['booking']; CT = X['ctas']; ST = X['section_titles']
    steps = ['level', 'room', 'dates', 'total']
    # media half [sign]
    layers = ''
    for k, L in enumerate(LEVELS):
        v = L['vid']; po = a('s', f'{v}-poster.jpg', 'video'); wb = a('s', f'{v}.webm', 'video'); mp = a('s', f'{v}.mp4', 'video')
        layers += f'<div class="m{" on" if k == 0 else ""}" data-m="{L["slug"]}" style="background:url({pre}{po}) center/cover"><video muted loop playsinline preload="none" poster="{pre}{po}" data-webm="{pre}{wb}" data-mp4="{pre}{mp}"></video></div>'
    d1 = a('s', 'img-001-1600.webp'); t1 = a('s', 'img-093-1536.webp')
    layers += (               f'<div class="m" data-m="dates"><img data-src="{pre}{d1}" width="1600" height="1066" alt=""></div>'
               f'<div class="m" data-m="total"><img data-src="{pre}{t1}" width="1536" height="1023" alt=""></div>')

    prog = '<ol class="prog" aria-label="Booking steps">' + ''.join(
        f'<li><a href="#{s}" data-go="{s}"><span class="pn">{i+1}</span><span class="pt">{e(t)}</span></a></li>'
        for i, (s, t) in enumerate(zip(steps, B['step_pills']))) + '</ol>'
    stepn = lambda n: f'<p class="step-n">{e(B["step_counter"].format(n=n, total=4))}</p>'

    picks = ''
    for k, L in enumerate(LEVELS):
        po = a('s', f'{L["vid"]}-poster.jpg', 'video')
        picks += f'''<label class="pick"><input type="radio" name="level" value="{L['slug']}" form="none"{' checked' if k == 0 else ''}>
  <img class="pick-th" src="{pre}{po}" width="864" height="1080" alt="" loading="lazy"><span class="pick-t"><strong>{e(L['name'])}</strong><span>{e(L['one'])}</span><span class="detail">{detail(X['detail_lines']['level_price'])}</span></span><span class="tick">{ic('i-check')}</span></label>'''
    inc = X['inclusions']
    def ilist(k, hidden):
        return f'<ul class="ilist bk" data-incl-list="{k}"{" hidden" if hidden else ""}>' + ''.join(f'<li>{ic("ic-" + i["icon"])}{e(i["text"])}</li>' for i in inc[f'level_{k}']) + '</ul>'
    s_level = f'''<section class="step" id="level" data-media="level" aria-labelledby="t-level">
  {stepn(1)}
  <h1 class="script" id="t-level" tabindex="-1">{e(ST['book_level'])}</h1>
  <div class="picks" role="radiogroup" aria-labelledby="t-level">{picks}</div>
  <div class="free-s">
    <p><strong>{detail(X['detail_lines']['freestylers'])}</strong><br><span class="small">{e(FREE['one'])}</span></p>
    <a class="btn btn-soft" href="{e(WA)}">{ic('i-wa', 'wa')}{e(CT['freestylers'])}</a>
  </div>
  <h2 class="script sub">{e(ST['book_included'])}</h2>
  {ilist(1, False)}{ilist(2, True)}{ilist(3, True)}
  <p class="small">{e(inc['optional_extra'])}</p>
</section>'''

    def choose(r, k):
        return (f'<label class="choose"><input type="radio" name="room" value="{r["key"]}" form="none"{" checked" if k == 0 else ""}>'
                f'<span class="btn">{ic("i-check")}{e(CT["room"])}</span></label>')
    s_room = f'''<section class="step" id="room" data-media="room" aria-labelledby="t-room">
  {stepn(2)}
  <h2 class="script" id="t-room" tabindex="-1">{e(ST['book_room'])}</h2>
  {room_viewer(pre, choose, 'b-')}
  <p class="small rooms-note" data-rooms-note>{e(X['rooms_note'])}</p>
</section>'''

    sats = ['2026-10-03', '2026-10-24', '2026-10-31', '2026-12-19', '2027-01-23', '2027-01-30', '2027-02-13',
            '2027-02-20', '2027-02-27', '2027-03-06', '2027-03-13', '2027-03-20', '2027-03-27', '2027-04-03']  # docs/bookinglayer.md §2.1 snapshot
    f = lambda d: d.strftime('%a %-d %b %Y')
    opts = ''.join(f'<option value="{s}">{f(dt.date.fromisoformat(s))}</option>' for s in sats)
    groups = ''
    for s in sats:
        d0 = dt.date.fromisoformat(s)
        o = ''.join(f'<option value="{(d0 + dt.timedelta(days=n)).isoformat()}">{n} nights, to {f(d0 + dt.timedelta(days=n))}</option>' for n in (7, 14, 21, 28))
        groups += f'<optgroup label="From {f(d0)}">{o}</optgroup>'
    nojs_end = ('<noscript><div class="fl has nojs-end"><select id="f-end" name="end"><option value="">Choose your check-out</option>'
                + groups + '</select><label for="f-end">Check-out</label><svg class="chev"><use href="#i-chev"/></svg></div></noscript>')  # TEMPLATE-LABEL [sign]
    nights = ''.join(f'<label><input type="radio" name="nights" form="none" value="{n}"{" checked" if n == "7" else ""}><span>{n}</span></label>' for n in B['nights_options'])
    def stp(nm, lab, mx):
        return (f'<div class="fl has stp"><input id="f-{nm}" name="{nm}" type="number" inputmode="numeric" min="0" max="{mx}" value="0"><label for="f-{nm}">{e(lab)}</label>'
                f'<button type="button" class="sb" data-d="-1" aria-label="{e(B["stepper_less"])}, {e(lab)}">−</button><button type="button" class="sb" data-d="1" aria-label="{e(B["stepper_more"])}, {e(lab)}">+</button></div>')
    s_dates = f'''<section class="step" id="dates" data-media="dates" aria-labelledby="t-dates">
  {stepn(3)}
  <h2 class="script" id="t-dates" tabindex="-1">{e(ST['book_dates'])}</h2>
  <p class="chips-l" id="l-chips" hidden>{e(B['field_checkin'])}</p>
  <div class="chips" data-chips role="group" aria-labelledby="l-chips" hidden></div>
  <div class="fl has" id="w-start">
    <select id="f-start" name="start"><option value="">{e(B['field_checkin_nojs_placeholder'])}</option>{opts}</select>
    <label for="f-start">{e(B['field_checkin'])}</label>
    <svg class="chev"><use href="#i-chev"/></svg>
  </div>
  <p class="help small" id="h-start">{e(B['field_checkin_help'])}</p>
  <fieldset class="seg"><legend>{e(B['field_nights'])}</legend><div class="seg-r">{nights}</div></fieldset>
  {nojs_end}
  <div class="guests">{stp('female', B['field_women'], 6)}{stp('male', B['field_men'], 6)}{stp('couple', B['field_couples'], 3)}</div>
  <p class="help small">{e(B['guests_help'])}</p>
</section>'''

    SL = B['summary_labels']
    nojs_go = ''.join(f'<button class="btn btn-book btn-lg" type="submit" formaction="{ENGINE}{L["slug"]}">Continue with Level {L["n"]}</button>' for L in LEVELS)  # TEMPLATE-LABEL [sign]
    s_total = f'''<section class="step" id="total" data-media="total" aria-labelledby="t-total">
  {stepn(4)}
  <h2 class="script" id="t-total" tabindex="-1">{e(ST['book_total'])}</h2>
  <div class="sum" aria-live="polite">
    <dl class="sum-g">
      <div><dt>{e(SL['level'])}</dt><dd data-s="level">{e(LEVELS[0]['name'])}</dd></div>
      <div><dt>{e(SL['dates'])}</dt><dd data-s="dates">{e(B['field_checkin_nojs_placeholder'])}</dd></div>
      <div><dt>{e(SL['guests'])}</dt><dd data-s="guests">—</dd></div>
      <div><dt>{e(SL['room'])}</dt><dd data-s="room">{e(ROOMS[0]['label'])}</dd></div>
    </dl>
    <dl class="sum-p">
      <div><dt>{e(B['total_package'])}</dt><dd data-s="base">$1,466</dd></div>
      <div><dt>{e(B['total_room'])}</dt><dd data-s="supp">{e(B['room_included'])}</dd></div>
      <div><dt>{e(B['total_per_person'])}</dt><dd data-s="pp">$1,466</dd></div>
      <div class="big"><dt data-s="alllabel">Total for 1 guest</dt><dd data-s="all">$1,466</dd></div>
    </dl>
    <p class="small" data-s="note">{e(B['currency_note'])} | {e(B['prices_snapshot'].format(date='29 Sep 2026'))}</p>
    <p class="small">{e(B['deposit'])}</p>
  </div>
  <div class="js-only"><button class="btn btn-book btn-lg go" type="submit">{e(CT['handoff'])}</button></div>
  <noscript><div class="nojs-go">{nojs_go}</div></noscript>
  <p class="handoff">{e(B['handoff'])}</p>
  <p class="small">{e(B['handoff_nothing_booked'])}</p>
  <a class="btn btn-soft" data-wa href="{e(WA)}">{ic('i-wa', 'wa')}{e(CT['whatsapp_footer'])}</a>
</section>'''

    snav = f'''<div class="snav js-only" id="snav">
  <button type="button" class="btn btn-soft back" data-back aria-label="Back">{ic('i-l')}<span>Back</span></button>
  <p class="snav-t"><span>{e(SL['total'])}</span> <strong data-s="bartotal">$1,466</strong></p>
  <button type="button" class="btn btn-book next" data-next>{e(CT['step_next'])}{ic('i-r')}</button>
</div>'''  # "Back": TEMPLATE-LABEL

    main = f'''<main id="main" class="bk">
  <div class="bk-media" aria-hidden="true">{layers}</div>
  <div class="bk-col">
  {prog}
  <form class="bk-steps" id="bk" method="get" action="{ENGINE}{LEVELS[0]['slug']}">
    {s_level}
    {s_room}
    {s_dates}
    {s_total}
  </form>
  {snav}
  </div>
</main>'''
    css = rd('site.css') + rd('home.css').split('/* ---------- welcome')[0].split('/* ---------- hero')[0] + rd('book.css')
    # room viewer + slideshow rules live in home.css; pull just the room block across
    hc = rd('home.css')
    room_css = hc[hc.index('.room{display:grid'):hc.index('.rooms-note')]
    out = (head(pre, 'Book your surf week | ' + C['businessName'], 'Choose your level, your room, your dates and guests. Prices from the booking engine.', css + room_css)
           + f'\n<body class="book">\n{SPRITE}\n{header(pre, False)}\n{main}\n{footer(pre)}\n<script>\n{rd("common.js")}\n{rd("book.js")}\n</script>\n</body>\n</html>\n')
    os.makedirs(os.path.join(DIST, 'book'), exist_ok=True)
    open(os.path.join(DIST, 'book', 'index.html'), 'w').write(out)

book()
