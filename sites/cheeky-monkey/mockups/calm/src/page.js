(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  const smooth = reduce ? 'auto' : 'smooth';

  // header bar (desktop) and phone booking bar appear once the hero has left the screen
  const hero = document.querySelector('.hero');
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => root.classList.toggle('past-hero', !e.isIntersecting && e.boundingClientRect.top < 0),
      { rootMargin: '-64px 0px 0px 0px' }).observe(hero);
  }

  // surf-week tabs: a white pill slides under the active tab
  document.querySelectorAll('[data-tabs]').forEach(box => {
    const tabs = [...box.querySelectorAll('[role=tab]')];
    const pill = box.querySelector('.pill');
    const place = (t, animate) => {
      if (!pill) return;
      if (!animate) pill.style.transition = 'none';
      pill.style.width = t.offsetWidth + 'px';
      pill.style.transform = `translateX(${t.offsetLeft}px)`;
      pill.classList.add('on');
      if (!animate) { pill.offsetWidth; pill.style.transition = ''; }
    };
    const select = (t, focus) => {
      tabs.forEach(x => {
        const on = x === t;
        x.setAttribute('aria-selected', on);
        x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute('aria-controls')).classList.toggle('on', on);
      });
      place(t, true);
      if (focus) t.focus();
      t.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: smooth });
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', e => {
        const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (k) { e.preventDefault(); select(tabs[(i + k + tabs.length) % tabs.length], true); }
        if (e.key === 'Home') { e.preventDefault(); select(tabs[0], true); }
        if (e.key === 'End') { e.preventDefault(); select(tabs[tabs.length - 1], true); }
      });
    });
    const first = tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0];
    const init = () => place(first, false);
    document.fonts ? document.fonts.ready.then(init) : init();
    addEventListener('resize', () => place(tabs.find(t => t.getAttribute('aria-selected') === 'true'), false));
  });

  // slideshows: native scroll-snap rows; dots and arrows drive them
  document.querySelectorAll('[data-ss]').forEach(ss => {
    const track = ss.querySelector('.ss-track');
    const slides = [...track.children];
    const dots = [...ss.querySelectorAll('.dot')];
    const prev = ss.querySelector('.arrow.prev'), next = ss.querySelector('.arrow.next');
    let cur = 0;
    const go = i => {
      i = Math.max(0, Math.min(slides.length - 1, i));
      track.scrollTo({ left: slides[i].offsetLeft - slides[0].offsetLeft, behavior: smooth });
    };
    const mark = i => {
      cur = i;
      dots.forEach((d, j) => d.setAttribute('aria-current', j === i));
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === slides.length - 1;
      slides.forEach((s, j) => s.setAttribute('aria-hidden', j !== i));
    };
    let raf = 0;
    track.addEventListener('scroll', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => mark(Math.round(track.scrollLeft / track.clientWidth)));
    }, { passive: true });
    dots.forEach((d, j) => d.addEventListener('click', () => go(j)));
    prev && prev.addEventListener('click', () => go(cur - 1));
    next && next.addEventListener('click', () => go(cur + 1));
    track.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); }
    });
    mark(0);
  });

  // the shop's reel: sources attached only when the card nears the screen; plays only in view
  document.querySelectorAll('[data-reel]').forEach(card => {
    const v = card.querySelector('video');
    const btn = card.querySelector('.play');
    let attached = false, userPaused = reduce || saveData, inView = false;
    const attach = () => {
      if (attached) return; attached = true;
      v.querySelectorAll('source[data-src]').forEach(s => { s.src = s.dataset.src; });
      v.load();
    };
    const sync = () => {
      if (inView && !userPaused) { attach(); v.play().catch(() => {}); }
      else v.pause();
    };
    v.addEventListener('playing', () => card.classList.add('playing'));
    v.addEventListener('pause', () => card.classList.remove('playing'));
    btn.addEventListener('click', () => {
      userPaused = !userPaused ? true : false;
      if (!userPaused) { attach(); v.play().catch(() => {}); } else v.pause();
      btn.setAttribute('aria-label', userPaused ? 'Play the video' : 'Pause the video');
      card.classList.toggle('paused', userPaused);
    });
    btn.setAttribute('aria-label', userPaused ? 'Play the video' : 'Pause the video');
    card.classList.toggle('paused', userPaused);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => { inView = e.isIntersecting; sync(); }, { threshold: 0.35 }).observe(card);
    }
  });
})();
