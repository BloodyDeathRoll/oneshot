/* Sea You Surfers Nest, calm: cross-fading dot slideshows, the reviews, the header, the phone bar and the
   desktop hero parallax. Everything on the page works without it: slideshows are scroll-snap rows and every
   button is a link. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // one control for both slideshow kinds: the active dot gets aria-current and the wood pill slides under it
  const wire = (root, items, onGo) => {
    const ctrl = root.querySelector('.ctrl'), dots = [...ctrl.querySelectorAll('.dot')], pill = ctrl.querySelector('.pill');
    ctrl.hidden = false;
    let cur = 0;
    const go = (i) => {
      const was = items[cur];
      cur = (i + items.length) % items.length;
      // the photo being left stays drawn under the new one for the length of the cross-fade
      if (was !== items[cur]) { was.classList.add('leaving'); setTimeout(() => was.classList.remove('leaving'), 300); }
      items.forEach((it, j) => { it.classList.toggle('on', j === cur); it.setAttribute('aria-hidden', j === cur ? 'false' : 'true'); });
      dots.forEach((d, j) => d.setAttribute('aria-current', j === cur ? 'true' : 'false'));
      pill.style.transform = `translateX(${dots[cur].offsetLeft}px)`;
      onGo && onGo(cur);
    };
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    ctrl.querySelector('.prev').addEventListener('click', () => go(cur - 1));
    ctrl.querySelector('.next').addEventListener('click', () => go(cur + 1));
    root.addEventListener('keydown', (e) => {
      if (e.target.closest('.dot, .arw') || e.target.matches('.track')) {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); }
      }
    });
    // a horizontal swipe on a phone steps once; vertical scrolling is left alone (touch-action: pan-y)
    let x0 = null, y0 = 0;
    root.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse' && !e.target.closest('.ctrl')) { x0 = e.clientX; y0 = e.clientY; } });
    root.addEventListener('pointerup', (e) => {
      if (x0 === null) return;
      const dx = e.clientX - x0, dy = e.clientY - y0; x0 = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(cur + (dx < 0 ? 1 : -1));
    });
    root.addEventListener('pointercancel', () => { x0 = null; });
    go(0);
  };

  for (const show of document.querySelectorAll('[data-show]')) {
    const slides = [...show.querySelectorAll('.slide')];
    // the next photo is fetched as soon as one is shown, so a tap never waits on a blank frame
    wire(show, slides, (i) => { const n = slides[(i + 1) % slides.length].querySelector('img'); if (n.loading === 'lazy') n.loading = 'eager'; });
  }
  for (const box of document.querySelectorAll('[data-quotes]')) wire(box, [...box.querySelectorAll('.q')]);

  // the header turns solid and the phone bar slides up once the hero's own button has left the screen
  const top = document.querySelector('.top'), bar = document.getElementById('bar');
  const heroBtn = document.querySelector('.btn-hero'), hero = document.querySelector('.hero');
  new IntersectionObserver(([e]) => top.classList.toggle('solid', !e.isIntersecting), { rootMargin: '-72px 0px 0px 0px' }).observe(hero);
  // ...and steps aside again once the closing's own buttons are on screen, so it never covers the footer
  let past = false, atEnd = false;
  const sync = () => { const on = past && !atEnd; bar.classList.toggle('on', on); if (!on) close(); };
  new IntersectionObserver(([e]) => { past = !e.isIntersecting && e.boundingClientRect.top < 0; sync(); }).observe(heroBtn);
  new IntersectionObserver(([e]) => { atEnd = e.isIntersecting || e.boundingClientRect.top < 0; sync(); }).observe(document.querySelector('.close-actions'));

  // the bar's chevron opens the at-a-glance summary above it (a disclosure, not a modal); Esc closes it
  const more = bar.querySelector('.bar-more'), panel = document.getElementById('bar-panel');
  const close = (refocus) => {
    if (panel.hidden || panel.classList.contains('out')) return;
    const done = () => { panel.classList.remove('out'); panel.hidden = true; };
    if (reduce) done(); else { panel.classList.add('out'); setTimeout(done, 180); }
    more.setAttribute('aria-expanded', 'false'); more.setAttribute('aria-label', 'At a glance');
    if (refocus) more.focus();
  };
  more.addEventListener('click', () => {
    if (!panel.hidden && !panel.classList.contains('out')) return close();
    panel.classList.remove('out'); panel.hidden = false; more.setAttribute('aria-expanded', 'true'); more.setAttribute('aria-label', 'Close the summary');
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(true); });

  // desktop only: the Kube parallax, the hero photo drifts up by 4 rem as the hero leaves (off on phones)
  const img = document.querySelector('.hero-media img');
  const wide = matchMedia('(min-width: 700px)');
  if (!reduce) {
    let ticking = false;
    const step = () => {
      ticking = false;
      if (!wide.matches) { img.style.transform = ''; return; }
      const h = hero.offsetHeight, y = Math.min(Math.max(scrollY, 0), h);
      img.style.transform = `translate3d(0, ${(-64 * y / h).toFixed(2)}px, 0)`;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(step); } }, { passive: true });
    wide.addEventListener('change', step);
  }
})();
