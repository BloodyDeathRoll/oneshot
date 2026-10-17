/* <head> pieces both pages share: self-hosted fonts (4g; the mockup used Google Fonts), preloads, and the
   inline script that decides the drop's tier before first paint. */
export const fontFaces = (pre) => `@font-face{font-family:'Literata';font-style:normal;font-weight:400 500;font-display:swap;src:url(${pre}fonts/literata-latin-wght-normal.woff2) format('woff2')}
@font-face{font-family:'Literata';font-style:italic;font-weight:400;font-display:swap;src:url(${pre}fonts/literata-latin-400-italic.woff2) format('woff2')}
@font-face{font-family:'Parisienne';font-style:normal;font-weight:400;font-display:swap;src:url(${pre}fonts/parisienne-latin-400-normal.woff2) format('woff2')}`

export const fontPreloads = (pre) => `<link rel="preload" href="${pre}fonts/literata-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${pre}fonts/parisienne-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>`

/* A <base> fixed to the page's own URL: the drawer pushes book/ to history, and the page's relative URLs (lazy
   photos, clips, the drawer's band) must keep resolving against home. html.js always; html.drop-live when the drop's motion tier applies (not reduced motion, not Save-Data, not a
   weak device). Decided here, before first paint, and never changed afterwards: the section's height is fixed
   from the first frame (designer 0.5.1 loading state). */
export const TIER = `(function(){var h=document.documentElement,m=function(q){return matchMedia(q).matches},c=navigator.connection;h.classList.add('js');var b=document.createElement('base');b.href=location.href.split('#')[0];document.head.appendChild(b);if(!m('(prefers-reduced-motion: reduce)')&&!(c&&c.saveData)&&(navigator.hardwareConcurrency||4)>2&&(navigator.deviceMemory||4)>2)h.classList.add('drop-live')})()`
