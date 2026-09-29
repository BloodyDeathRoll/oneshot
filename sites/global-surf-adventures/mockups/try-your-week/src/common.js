(function(){
var d=document, root=d.documentElement;
root.classList.remove('no-js'); root.classList.add('js');
d.querySelectorAll('video[hidden]').forEach(function(v){v.hidden=false;v.style.opacity=0;});
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var SD=!!(navigator.connection&&navigator.connection.saveData);
var GS=window.GS={RM:RM,SD:SD,calm:RM||SD};

/* attach a <video>'s data-src sources (only those whose data-media matches), then play */
GS.attach=function(v,play){
  if(!v||GS.calm) return false;
  if(!v.dataset.ready){
    v.querySelectorAll('source[data-src]').forEach(function(s){
      var m=s.getAttribute('data-media');
      if(m&&!matchMedia(m).matches){s.remove();return;}
      s.src=s.dataset.src; s.removeAttribute('data-src');
    });
    v.dataset.ready='1'; v.addEventListener('playing',function(){v.style.transition='opacity .4s';v.style.opacity='';},{once:true}); v.load();
  }
  if(play!==false){var p=v.play(); if(p&&p.catch)p.catch(function(){});}
  return true;
};

/* slideshow: .slides > .vp > .track > items, optional .prev/.next/.dots; --per sets items per page */
GS.slides=function(el){
  if(el._s) return el._s;
  var vp=el.querySelector('.vp'), tr=el.querySelector('.track'), items=[].slice.call(tr.children);
  var dots=el.querySelector('.dots'), i=0, lastPer=0;
  function per(){return parseFloat(getComputedStyle(el).getPropertyValue('--per'))||1;}
  function pages(){return Math.max(1,Math.ceil(items.length/per()));}
  function drawDots(){
    if(!dots) return; dots.innerHTML='';
    var n=pages(); dots.hidden=n<2;
    for(var k=0;k<n;k++){(function(k){var b=d.createElement('button');b.type='button';
      b.setAttribute('aria-label',(el.dataset.label||'Photo')+' '+(k+1)+' of '+n);
      b.addEventListener('click',function(){go(k);});dots.appendChild(b);})(k);}
  }
  function mark(user){
    if(dots)[].forEach.call(dots.children,function(b,k){b.setAttribute('aria-current',k===i?'true':'false');});
    var p=per();
    items.forEach(function(it,k){var pg=Math.floor(k/p), vis=pg===i;
      it.setAttribute('aria-hidden',vis?'false':'true');
      it.querySelectorAll('a,button').forEach(function(a){a.tabIndex=vis?0:-1;});
      if(user&&Math.abs(pg-i)<=1) it.querySelectorAll('img[loading="lazy"]').forEach(function(im){im.loading='eager';});
    });
  }
  function go(k,user){if(user===undefined)user=true;var n=pages(); i=((k%n)+n)%n; tr.style.transform='translateX('+(-i*100)+'%)'; mark(user); if(el.onslide)el.onslide(i);}
  var pv=el.querySelector('.prev'), nx=el.querySelector('.next');
  if(pv)pv.addEventListener('click',function(){go(i-1);});
  if(nx)nx.addEventListener('click',function(){go(i+1);});
  el.addEventListener('keydown',function(e){
    if(e.target.closest('[role=tablist]'))return;
    if(e.key==='ArrowLeft'){go(i-1);e.preventDefault();} if(e.key==='ArrowRight'){go(i+1);e.preventDefault();}
  });
  var x0=null,y0=0,dx=0,w=1,lock=null;
  vp.addEventListener('pointerdown',function(e){if(e.pointerType==='mouse')return;x0=e.clientX;y0=e.clientY;dx=0;lock=null;w=vp.offsetWidth;});
  vp.addEventListener('pointermove',function(e){
    if(x0===null)return; dx=e.clientX-x0; var dy=e.clientY-y0;
    if(lock===null&&(Math.abs(dx)>6||Math.abs(dy)>6)) lock=Math.abs(dx)>Math.abs(dy)?'x':'y';
    if(lock!=='x')return;
    tr.style.transition='none'; tr.style.transform='translateX(calc('+(-i*100)+'% + '+dx+'px))';
  });
  function end(){if(x0===null)return;tr.style.transition='';x0=null;
    if(lock==='x'&&Math.abs(dx)>w*0.12)go(i+(dx<0?1:-1));else go(i);}
  vp.addEventListener('pointerup',end); vp.addEventListener('pointercancel',end);
  function relayout(){var p=per(); if(p!==lastPer){lastPer=p;drawDots();go(Math.min(i,pages()-1),false);}}
  addEventListener('resize',relayout); relayout();
  el._s={go:go,get i(){return i;}};
  return el._s;
};
d.querySelectorAll('.slides').forEach(GS.slides);

/* tabs helper: buttons [role=tab] with aria-controls; arrow keys move */
GS.tabs=function(list,onchange){
  var tabs=[].slice.call(list.querySelectorAll('[role=tab]'));
  function sel(t,focus){
    var prev=tabs.findIndex(function(x){return x.getAttribute('aria-selected')==='true';});
    var idx=tabs.indexOf(t);
    tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;});
    if(focus)t.focus();
    if(onchange&&idx!==prev)onchange(idx,prev);
  }
  tabs.forEach(function(t){
    t.addEventListener('click',function(){sel(t);});
    t.addEventListener('keydown',function(e){var k=tabs.indexOf(t);
      if(e.key==='ArrowRight'){sel(tabs[(k+1)%tabs.length],true);e.preventDefault();}
      if(e.key==='ArrowLeft'){sel(tabs[(k-1+tabs.length)%tabs.length],true);e.preventDefault();}});
  });
  tabs.forEach(function(x){x.tabIndex=x.getAttribute('aria-selected')==='true'?0:-1;});
  return {select:function(k){sel(tabs[k]);},tabs:tabs};
};

/* room viewer (home and booking page) */
GS.roomViewer=function(box,onchange){
  var list=box.querySelector('[role=tablist]'); if(!list) return null;
  var panels=[].slice.call(box.querySelectorAll('.room-panel'));
  return GS.tabs(list,function(k,prev){
    panels.forEach(function(p,j){p.hidden=j!==k; p.classList.remove('enter','back');});
    var p=panels[k]; void p.offsetWidth; p.classList.add('enter'); if(prev>k)p.classList.add('back');
    GS.slides(p.querySelector('.slides'));
    if(onchange)onchange(k);
  });
};

/* header + menu */
var hdr=d.querySelector('.hdr'), sheet=d.getElementById('menu');
var mb=d.querySelector('.menu-btn');
if(mb&&sheet){
  var closeBtn=sheet.querySelector('.close');
  function open(){sheet.classList.add('open');sheet.removeAttribute('aria-hidden');mb.setAttribute('aria-expanded','true');closeBtn.focus();d.body.style.overflow='hidden';}
  function close(){sheet.classList.remove('open');sheet.setAttribute('aria-hidden','true');mb.setAttribute('aria-expanded','false');d.body.style.overflow='';mb.focus();}
  mb.addEventListener('click',open); closeBtn.addEventListener('click',close);
  sheet.addEventListener('keydown',function(e){if(e.key==='Escape')close();
    if(e.key==='Tab'){var f=sheet.querySelectorAll('a,button'),a=f[0],z=f[f.length-1];
      if(e.shiftKey&&d.activeElement===a){z.focus();e.preventDefault();}else if(!e.shiftKey&&d.activeElement===z){a.focus();e.preventDefault();}}});
  sheet.querySelectorAll('nav a').forEach(function(a){a.addEventListener('click',function(){sheet.classList.remove('open');d.body.style.overflow='';});});
}
})();
