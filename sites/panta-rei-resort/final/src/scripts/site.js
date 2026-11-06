(() => {
  const d = document, root = d.documentElement;
  const $ = (s, el = d) => el.querySelector(s), $$ = (s, el = d) => [...el.querySelectorAll(s)];
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData === true;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const DATA = JSON.parse($('#rooms-data').textContent);

  /* ---------- video: sources attached after first paint, never under reduced motion / Save-Data */
  const attach = (v) => {
    if (!v || v.dataset.done) return; v.dataset.done = 1;
    for (const s of $$('source[data-src]', v)) {
      if (s.media && !matchMedia(s.media).matches) s.remove(); else s.src = s.dataset.src;
    }
    v.addEventListener('playing', () => v.classList.add('on'), { once: true });
    v.load(); v.play().catch(() => {});
  };
  if (!calm && !saveData) {
    const later = () => requestAnimationFrame(() => setTimeout(() => attach($('#hero-video')), 0));
    d.readyState === 'complete' ? later() : addEventListener('load', later, { once: true });
    const clips = $$('video[data-lazy]');
    const io = new IntersectionObserver((es) => {
      for (const e of es) {
        const v = e.target;
        if (e.isIntersecting) { if (!v.dataset.done) attach(v); else v.play().catch(() => {}); }
        else if (v.dataset.done) v.pause();
      }
    }, { rootMargin: '0px 0px -20% 0px' }); // 4g: a clip loads when a fifth of the screen is past its top, never with the hero
    clips.forEach((v) => io.observe(v));
  }

  /* ---------- header + persistent bar */
  const hdr = $('.hdr'), bar = $('.bar'), fwa = $('.fwa');
  new IntersectionObserver(([e]) => hdr.classList.toggle('solid', !e.isIntersecting), { rootMargin: '-80px 0px 0px 0px' }).observe($('#hero-sentinel'));
  new IntersectionObserver(([e]) => {
    const show = !e.isIntersecting && e.boundingClientRect.top < 0;
    bar.classList.toggle('show', show); fwa.classList.toggle('show', show);
  }).observe($('.hero .btn'));

  /* ---------- parallax (desktop only, Kube recipe: ±4rem inside overflow-hidden) */
  if (!calm && matchMedia('(min-width: 768px)').matches) {
    const items = $$('[data-par]');
    let ticking = false;
    const run = () => {
      ticking = false;
      for (const el of items) {
        const r = el.parentElement.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height)));
        el.style.transform = `translate3d(0,${(0.5 - p) * 2 * 64 * (+el.dataset.par || 1)}px,0)`;
      }
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
    run();
  }

  /* ---------- room cards tilt toward the pointer */
  if (fine && !calm) {
    for (const c of $$('.card')) {
      c.addEventListener('pointermove', (e) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty('--ry', ((e.clientX - r.left) / r.width - 0.5) * 4 + 'deg');
        c.style.setProperty('--rx', -((e.clientY - r.top) / r.height - 0.5) * 4 + 'deg');
      });
      c.addEventListener('pointerleave', () => { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); });
    }
  }

  /* ---------- slideshow helper: dots + prev/next on a scroll-snap track */
  const slideshow = (track, dotsEl, prev, next, counter) => {
    const items = () => [...track.children];
    const idx = () => {
      const w = items()[0]?.getBoundingClientRect().width || 1;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return Math.round(track.scrollLeft / (w + gap));
    };
    const go = (i) => {
      const it = items(); i = Math.max(0, Math.min(it.length - 1, i));
      track.scrollTo({ left: it[i].offsetLeft - it[0].offsetLeft, behavior: calm ? 'auto' : 'smooth' });
    };
    const draw = () => {
      dotsEl.innerHTML = '';
      items().forEach((_, i) => {
        const b = d.createElement('button'); b.className = 'dot'; b.type = 'button';
        b.setAttribute('aria-label', `Show ${i + 1} of ${items().length}`);
        b.addEventListener('click', () => go(i)); dotsEl.appendChild(b);
      });
      mark();
    };
    const mark = () => { const i = idx(); $$('.dot', dotsEl).forEach((b, j) => b.setAttribute('aria-current', i === j)); if (counter) counter.textContent = `${Math.min(i + 1, items().length)} / ${items().length}`; };
    track.addEventListener('scroll', () => requestAnimationFrame(mark), { passive: true });
    prev && prev.addEventListener('click', () => go(idx() - 1));
    next && next.addEventListener('click', () => go(idx() + 1));
    draw();
    return { draw, go };
  };

  /* ---------- guests: draggable cards with momentum, snapping */
  const q = $('.quotes');
  if (q) {
    slideshow(q, $('#qdots'), $('#qprev'), $('#qnext'), $('#qcount'));
    // the row is as tall as the quotes in view, not as the longest quote off-screen
    const fit = () => {
      const r = q.getBoundingClientRect(); let h = 0;
      for (const c of q.children) { const b = c.getBoundingClientRect(); if (b.right > r.left + 8 && b.left < r.right - 8) h = Math.max(h, c.offsetHeight); }
      if (h) q.style.height = h + 24 + 'px';
    };
    let ft; q.addEventListener('scroll', () => { clearTimeout(ft); ft = setTimeout(fit, 90); }, { passive: true });
    addEventListener('resize', fit); d.fonts && d.fonts.ready.then(fit); fit();
    let down = false, sx = 0, sl = 0, v = 0, lx = 0, lt = 0, moved = false;
    q.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false; sx = lx = e.clientX; sl = q.scrollLeft; lt = performance.now(); v = 0;
    });
    addEventListener('pointermove', (e) => {
      if (!down) return;
      if (!moved && Math.abs(e.clientX - sx) > 4) { moved = true; q.classList.add('drag'); }
      if (!moved) return;
      q.scrollLeft = sl - (e.clientX - sx);
      const t = performance.now(); v = (e.clientX - lx) / Math.max(1, t - lt); lx = e.clientX; lt = t;
    });
    addEventListener('pointerup', () => {
      if (!down) return; down = false;
      if (!moved) return;
      const target = q.scrollLeft - v * (calm ? 0 : 260);
      q.classList.remove('drag');
      q.scrollTo({ left: target, behavior: calm ? 'auto' : 'smooth' });
    });
    q.addEventListener('click', (e) => { if (moved) { e.preventDefault(); moved = false; } }, true);
  }

  /* ---------- menu tabs with a sliding pill */
  const tabs = $('.tabs');
  if (tabs) {
    const pill = $('.pill', tabs), btns = $$('.tab', tabs), panels = $$('.menu-panel'), pics = $$('.plates img');
    const place = (b) => { pill.style.width = b.offsetWidth + 'px'; pill.style.transform = `translateX(${b.offsetLeft}px)`; };
    const sel = (i, focus) => {
      btns.forEach((b, j) => { b.setAttribute('aria-selected', i === j); b.tabIndex = i === j ? 0 : -1; });
      panels.forEach((p, j) => { p.hidden = i !== j; });
      pics.forEach((p, j) => p.classList.toggle('on', i === j));
      place(btns[i]); if (focus) btns[i].focus();
    };
    btns.forEach((b, i) => {
      b.addEventListener('click', () => sel(i));
      b.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') sel((i + 1) % btns.length, true);
        if (e.key === 'ArrowLeft') sel((i - 1 + btns.length) % btns.length, true);
      });
    });
    sel(0);
    addEventListener('resize', () => place(btns.find((b) => b.getAttribute('aria-selected') === 'true')));
    d.fonts && d.fonts.ready.then(() => place(btns.find((b) => b.getAttribute('aria-selected') === 'true')));
  }

  /* ---------- booking drawer */
  const dr = $('#drawer'), scrim = $('#scrim'), go = $('#dr-go'), wa = $('#dr-wa');
  const arr = $('#f-arr'), dep = $('#f-dep'), gst = $('#f-gst');
  const slides = $('.slides', dr);
  let room = null, opener = null, shows = null;
  const iso = (t) => new Date(t - new Date(t).getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
  const today = iso(Date.now());
  arr.min = today; dep.min = iso(Date.now() + 864e5);
  const nice = (s) => new Date(s + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  const update = () => {
    const R = room && DATA.rooms.find((r) => r.key === room);
    let url = DATA.engine;
    const okDates = arr.value && dep.value && dep.value > arr.value;
    if (R) {
      url = R.url;
      if (okDates) url += `?start=${arr.value}&end=${dep.value}&numberOfGuests=${gst.value}`;
    }
    go.href = url;
    let msg = DATA.waText;
    if (R) msg += ` for the ${R.label}`;
    if (okDates) msg += `, ${nice(arr.value)} to ${nice(dep.value)}`;
    if (R || okDates) msg += `, ${gst.value} guest${gst.value === '1' ? '' : 's'}`;
    wa.href = DATA.wa + '?text=' + encodeURIComponent(msg + '.');
  };

  const pickRoom = (key) => {
    room = key;
    const R = DATA.rooms.find((r) => r.key === key);
    $$('.rchip', dr).forEach((c) => c.setAttribute('aria-pressed', c.dataset.room === key));
    const esc = (x) => String(x).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    slides.innerHTML = R.photos.map((p, i) => `<img src="${esc(p.src)}" srcset="${esc(p.srcset)}" sizes="(max-width:640px) 100vw, 512px" width="1200" height="800" alt="${esc(p.alt)}" ${i ? 'loading="lazy"' : ''} draggable="false">`).join('');
    slides.scrollLeft = 0;
    shows ? shows.draw() : (shows = slideshow(slides, $('.gal .dots', dr), $('.gal .prev', dr), $('.gal .next', dr)));
    $('.rd h3', dr).textContent = R.label;
    $('.rd .facts', dr).textContent = R.facts;
    $('.rd .beds', dr).textContent = R.beds;
    $('.rd .note', dr).textContent = R.note;
    const keep = gst.value;
    gst.innerHTML = Array.from({ length: R.sleeps }, (_, i) => `<option value="${i + 1}">${i + 1} guest${i ? 's' : ''}</option>`).join('');
    gst.value = Math.min(+keep || 2, R.sleeps);
    update();
  };

  const focusables = () => $$('a[href],button:not([disabled]),input,select,[tabindex]:not([tabindex="-1"])', dr).filter((el) => el.offsetParent !== null || el === d.activeElement);
  const open = (key, from) => {
    opener = from || d.activeElement;
    dr.hidden = false; scrim.hidden = false;
    root.classList.add('lock');
    pickRoom(key || room || DATA.rooms[0].key); // always a room: the hand-off is a room page that keeps the typed dates
    requestAnimationFrame(() => requestAnimationFrame(() => { dr.classList.add('open'); scrim.classList.add('open'); }));
    setTimeout(() => $('.rchip[aria-pressed=true]', dr).focus({ preventScroll: true }), calm ? 0 : 60);
  };
  const close = () => {
    dr.classList.remove('open'); scrim.classList.remove('open');
    const done = () => { dr.hidden = true; scrim.hidden = true; root.classList.remove('lock'); };
    calm ? done() : setTimeout(done, 480);
    opener && opener.focus({ preventScroll: true });
  };
  $$('[data-book]').forEach((a) => a.addEventListener('click', (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault(); open(a.dataset.room || null, a);
  }));
  $$('.rchip', dr).forEach((c) => c.addEventListener('click', () => pickRoom(c.dataset.room)));
  [arr, dep, gst].forEach((el) => el.addEventListener('input', () => {
    if (el === arr && arr.value) { const n = iso(new Date(arr.value + 'T12:00:00').getTime() + 864e5); dep.min = n; if (!dep.value || dep.value <= arr.value) dep.value = n; }
    update();
  }));
  $('.x', dr).addEventListener('click', close);
  scrim.addEventListener('click', close);
  dr.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    const f = focusables(); if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
  });
})();
