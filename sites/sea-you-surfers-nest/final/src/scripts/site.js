/* Sea You Surfers Nest — the page's interactions, ported unchanged from mockups/interactive/src/page.js (round 3):
   the header turning solid, the phone bar, the "Who's coming?" tiles, the room pill, the slideshows, the momentum
   shelf and the quote row. The palm shader is its own file, src/scripts/palms.js. No library. */
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData === true;
  const q = new URLSearchParams(location.search);
  const force = q.has('palms');                       // ?palms : run the shader even on a software renderer (headless checks)
  function chrome() {
    const top = $('[data-top]'), bar = $('[data-bar]'), hero = $('.hero'), cta = $('.hero .btn');
    new IntersectionObserver(([e]) => top.classList.toggle('solid', !e.isIntersecting), { rootMargin: '-72px 0px 0px 0px' }).observe(hero);
    new IntersectionObserver(([e]) => bar.classList.toggle('on', !e.isIntersecting && e.boundingClientRect.top < 0)).observe(cta);
  }

  /* ---------------------------------------------------------- "Who's coming?" tiles */
  function who() {
    for (const w of $$('[data-who]')) {
      const tiles = $$('.tile', w), ans = $$('.ans', w);
      tiles.forEach(t => t.addEventListener('click', () => {
        tiles.forEach(x => x.setAttribute('aria-pressed', String(x === t)));
        ans.forEach(a => a.classList.toggle('is-on', a.dataset.ans === t.dataset.for));
      }));
    }
  }

  /* ---------------------------------------------------------- the room pill */
  function pill() {
    const p = $('.pill'); if (!p) return;
    const thumb = $('.pill-thumb', p), tabs = $$('[role=tab]', p);
    const place = b => { thumb.style.width = b.offsetWidth + 'px'; thumb.style.transform = `translateX(${b.offsetLeft}px)`; };
    const select = (b, focus) => {
      tabs.forEach(x => { const on = x === b; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute('aria-controls')).classList.toggle('is-on', on); });
      place(b); if (focus) b.focus();
    };
    tabs.forEach((b, i) => {
      b.addEventListener('click', () => {
        select(b);
        const stage = $('.stage'); if (matchMedia('(max-width: 767px)').matches && stage.getBoundingClientRect().top < 0) stage.scrollIntoView({ block: 'start', behavior: calm ? 'auto' : 'smooth' });
      });
      b.addEventListener('keydown', e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); select(tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length], true); } });
    });
    const init = () => place(tabs.find(b => b.getAttribute('aria-selected') === 'true'));
    init(); requestAnimationFrame(() => p.classList.add('ready'));
    document.fonts && document.fonts.ready.then(init);
    addEventListener('resize', init);
  }

  /* ---------------------------------------------------------- slideshows: cross-fade, dots, arrows, swipe, keys */
  function shows() {
    for (const s of $$('[data-show]')) {
      const slides = $$('.slide', s), dots = $$('.dot', s); let i = 0;
      const go = n => {
        i = (n + slides.length) % slides.length;
        slides.forEach((x, k) => { x.classList.toggle('is-on', k === i); x.setAttribute('aria-hidden', String(k !== i)); });
        dots.forEach((d, k) => d.setAttribute('aria-current', String(k === i)));
        const nx = slides[(i + 1) % slides.length].querySelector('img'); if (nx) nx.loading = 'eager';   // the next one is ready
      };
      $('.prev', s).addEventListener('click', () => go(i - 1));
      $('.next', s).addEventListener('click', () => go(i + 1));
      dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
      const tr = $('.track', s); let x0 = null;
      tr.addEventListener('pointerdown', e => { x0 = e.clientX; });
      tr.addEventListener('pointerup', e => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 36) go(i + (dx < 0 ? 1 : -1)); });
      tr.addEventListener('keydown', e => { if (e.key === 'ArrowRight') go(i + 1); if (e.key === 'ArrowLeft') go(i - 1); });
      slides.forEach((x, k) => x.setAttribute('aria-hidden', String(k !== 0)));
    }
  }

  /* ---------------------------------------------------------- drag with momentum, snap and edge resistance (mouse); native on touch */
  function drag(track, onSettle) {
    let down = false, sx = 0, ss = 0, lx = 0, lt = 0, v = 0, raf = 0, moved = false;
    const max = () => track.scrollWidth - track.clientWidth;
    const snap = () => {
      track.classList.remove('dragging');
      const items = [...track.children], pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
      let best = 0, bd = 1e9; for (const it of items) { const d = Math.abs(it.offsetLeft - pad - track.scrollLeft); if (d < bd) { bd = d; best = it.offsetLeft - pad; } }
      track.scrollTo({ left: Math.max(0, Math.min(max(), best)), behavior: calm ? 'auto' : 'smooth' });
      onSettle && onSettle();
    };
    track.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      cancelAnimationFrame(raf); down = true; moved = false; sx = lx = e.clientX; ss = track.scrollLeft; lt = performance.now(); v = 0;
      track.setPointerCapture(e.pointerId);
    });
    track.addEventListener('pointermove', e => {
      if (!down) return;
      const now = performance.now(), dx = e.clientX - sx;
      if (!moved && Math.abs(dx) > 4) { moved = true; track.classList.add('dragging'); }
      if (!moved) return;
      const want = ss - dx, m = max(), over = want < 0 ? want : want > m ? want - m : 0;
      track.scrollLeft = Math.max(0, Math.min(m, want));
      track.style.transform = over ? `translateX(${(-over * .3).toFixed(1)}px)` : '';
      v = .8 * v + .2 * ((e.clientX - lx) / Math.max(1, now - lt)); lx = e.clientX; lt = now;
    });
    const up = () => {
      if (!down) return; down = false;
      if (track.style.transform) { track.style.transition = 'transform .45s cubic-bezier(.22,1,.36,1)'; track.style.transform = ''; setTimeout(() => { track.style.transition = ''; }, 460); }
      if (!moved) { track.classList.remove('dragging'); return; }
      let vel = -v * 16;
      const step = () => { if (Math.abs(vel) < .6 || calm) return snap(); const before = track.scrollLeft; track.scrollLeft += vel; vel *= .93; if (track.scrollLeft === before) return snap(); raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    };
    track.addEventListener('pointerup', up); track.addEventListener('pointercancel', up);
    track.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  }

  function shelf() {
    const s = $('[data-shelf]'); if (!s) return;
    const tr = $('.shelf-track', s); drag(tr);
    const by = d => { const c = tr.children[0]; tr.scrollBy({ left: d * (c.offsetWidth + 18) * 2, behavior: calm ? 'auto' : 'smooth' }); };
    $('.prev', s).addEventListener('click', () => by(-1));
    $('.next', s).addEventListener('click', () => by(1));
  }

  function quotes() {
    const r = $('[data-qrow]'); if (!r) return;
    const tr = $('.qtrack', r), cards = [...tr.children], dots = $$('.dot', r);
    const mark = () => {
      let best = 0, bd = 1e9; cards.forEach((c, k) => { const d = Math.abs(c.offsetLeft - tr.scrollLeft); if (d < bd) { bd = d; best = k; } });
      cards.forEach((c, k) => c.classList.toggle('is-on', k === best));
      dots.forEach((d, k) => d.setAttribute('aria-current', String(k === best)));
    };
    let tm = 0; tr.addEventListener('scroll', () => { cancelAnimationFrame(tm); tm = requestAnimationFrame(mark); }, { passive: true });
    dots.forEach((d, k) => d.addEventListener('click', () => tr.scrollTo({ left: cards[k].offsetLeft, behavior: calm ? 'auto' : 'smooth' })));
    drag(tr, mark);
  }

  chrome(); who(); pill(); shows(); shelf(); quotes();
})();
