(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  const desktop = matchMedia('(min-width: 900px)');
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // header shadow once the page moves
  const head = $('.site-head');
  const onScroll = () => head.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // video: attach sources after first paint; poster only under reduced motion / Save-Data / failure
  const attach = (v) => {
    if (v.dataset.on) return; v.dataset.on = 1;
    for (const [k, t] of [['webm', 'video/webm'], ['mp4', 'video/mp4']]) {
      const s = document.createElement('source'); s.src = v.dataset[k]; s.type = t; v.appendChild(s);
    }
    v.load();
  };
  const play = (v) => { attach(v); const p = v.play(); if (p) p.catch(() => {}); };
  const canPlay = !reduce && !saveData;
  const heroVid = $('video.table');
  if (canPlay && heroVid) {
    const go = () => requestAnimationFrame(() => setTimeout(() => play(heroVid), 60));
    if (document.readyState === 'complete') go(); else addEventListener('load', go, { once: true });
    new IntersectionObserver(([en]) => { if (!heroVid.dataset.on) return; en.isIntersecting ? heroVid.play().catch(() => {}) : heroVid.pause(); }).observe(heroVid);
  }

  // persistent phone bar: shows once the hero button has scrolled away
  const bar = $('[data-mbar]'), heroCta = $('#hero-cta');
  if (bar && heroCta) new IntersectionObserver(([en]) => bar.classList.toggle('show', !en.isIntersecting && en.boundingClientRect.top < 0)).observe(heroCta);

  // set-piece: the board fills, one piece per stage (native scroll + IntersectionObserver)
  const sp = $('[data-sp]');
  if (sp) {
    const board = $('.sp-board', sp);
    const stages = $$('.stage', sp);
    const pieces = $$('.sp-board .piece', sp), slots = $$('.sp-prog li', sp);
    const leavesAll = $$('video.leaves', sp);
    let current = -1, armed = false;
    const apply = () => {
      stages.forEach((s, i) => s.classList.toggle('active', i === current));
      pieces.forEach((p, i) => p.classList.toggle('landed', i <= current));
      slots.forEach((s, i) => s.classList.toggle('on', i <= current));
      // MAKING (stage 3) plays only while its stage is in view
      leavesAll.forEach((v) => {
        const inStage = current === 2;
        const visible = desktop.matches ? v.closest('.sp-board') : v.closest('.stage');
        if (canPlay && inStage && visible) play(v); else if (v.dataset.on) v.pause();
      });
    };
    const io = new IntersectionObserver((ens) => {
      for (const en of ens) if (en.isIntersecting) current = stages.indexOf(en.target);
      // above the first stage: nothing on the board yet
      if (stages[0].getBoundingClientRect().top > innerHeight * 0.55) current = -1;
      apply();
    }, { rootMargin: '-45% 0px -45% 0px' });
    stages.forEach((s) => io.observe(s));
    // loading state: the full board (poster) shows until every piece has decoded, then it arms
    const ready = () => {
      board.dataset.loading = 'false';
      if (reduce || !desktop.matches) return;
      armed = true; board.classList.add('armed'); apply();
    };
    const load = () => Promise.all($$('img', board).map((im) => {
      im.loading = 'eager'; return im.decode ? im.decode().catch(() => {}) : Promise.resolve();
    })).then(ready);
    new IntersectionObserver(([en], o) => { if (en.isIntersecting) { o.disconnect(); load(); } }, { rootMargin: '1200px 0px' }).observe(sp);
  }

  // slideshow with dots (native scroll-snap; arrows + dots + keyboard)
  $$('[data-slider]').forEach((sl) => {
    const track = $('.slides', sl), slides = $$('.slide', sl), dots = $$('.dot', sl);
    const idx = () => Math.round(Math.abs(track.scrollLeft) / track.clientWidth);
    const mark = () => { const i = idx(); dots.forEach((d, j) => d.setAttribute('aria-current', i === j)); };
    const go = (i) => { i = (i + slides.length) % slides.length; slides[i].scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest', inline: 'center' }); };
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    $('.next', sl).addEventListener('click', () => go(idx() + 1));
    $('.prev', sl).addEventListener('click', () => go(idx() - 1));
    track.addEventListener('keydown', (ev) => { if (ev.key === 'ArrowLeft') go(idx() + 1); if (ev.key === 'ArrowRight') go(idx() - 1); });
    track.addEventListener('scroll', () => requestAnimationFrame(mark), { passive: true });
    mark();
  });

  // team bios: "read more"
  $$('.more').forEach((b) => b.addEventListener('click', () => {
    const bio = document.getElementById(b.getAttribute('aria-controls'));
    const fig = b.closest('.q');
    const open = fig ? fig.classList.toggle('open') : bio.classList.toggle('open'); b.setAttribute('aria-expanded', open); b.textContent = open ? 'פחות' : 'קראו עוד';
  }));
  $$('.bio').forEach((bio) => { const b = bio.nextElementSibling; if (b && b.matches('.more') && bio.scrollHeight <= bio.clientHeight + 2 && !bio.closest('.founder')) b.hidden = true; });

  // phone menu closes when a link in it is tapped
  $$('.mnav a').forEach((a) => a.addEventListener('click', () => { a.closest('details').open = false; }));

  // :target sheets: focus in, Esc closes, focus returns
  let opener = null;
  const sheetOpen = () => {
    const t = location.hash && document.getElementById(location.hash.slice(1));
    if (t && t.classList.contains('sheet')) { document.body.style.overflow = 'hidden'; t.focus(); }
    else { document.body.style.overflow = ''; if (opener) { opener.focus(); opener = null; } }
  };
  document.addEventListener('click', (ev) => { const a = ev.target.closest('a[href^="#"]'); if (a) { const t = document.getElementById(a.getAttribute('href').slice(1)); if (t && t.classList.contains('sheet')) opener = a; } });
  addEventListener('hashchange', sheetOpen); sheetOpen();
  document.addEventListener('keydown', (ev) => {
    const open = $('.sheet:target'); if (!open) return;
    if (ev.key === 'Escape') { location.hash = $('.sheet-close', open).getAttribute('href'); return; }
    if (ev.key === 'Tab') {
      const f = $$('a,button,[tabindex="0"]', open); const first = f[0], last = f[f.length - 1];
      if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
      else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
    }
  });
})();
