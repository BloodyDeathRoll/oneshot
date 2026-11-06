const WT=process.env.WT; const {chromium,devices}=require(WT+'/node_modules/playwright');
const OUT=WT+'/reports/2026-10-midigama-01/experience/lotus-surf-house/verify-1/phone/';
const U='https://lotus-surf-house.os1.workers.dev/';
const host=u=>{try{return new URL(u).host}catch{return u}};
const L=(...a)=>console.log(...a);
(async()=>{
 const b=await chromium.launch();
 const ctx=await b.newContext({...devices['iPhone 13'],viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
 await ctx.addInitScript(()=>{window.__cls=0;window.__shifts=[];window.__lcp=0;
  new PerformanceObserver(l=>{for(const e of l.getEntries()){if(!e.hadRecentInput){window.__cls+=e.value;window.__shifts.push({v:+e.value.toFixed(4),t:Math.round(e.startTime),y:Math.round(scrollY)})}}}).observe({type:'layout-shift',buffered:true});
  new PerformanceObserver(l=>{for(const e of l.getEntries())window.__lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});});
 const p=await ctx.newPage(); const c=await ctx.newCDPSession(p);
 await c.send('Network.enable');
 await c.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:2e5,uploadThroughput:93750});
 await c.send('Emulation.setCPUThrottlingRate',{rate:4});
 const reqs={};let t0;
 c.on('Network.requestWillBeSent',e=>{reqs[e.requestId]={url:e.request.url,t:Date.now()-t0}});
 c.on('Network.loadingFinished',e=>{if(reqs[e.requestId]){reqs[e.requestId].bytes=e.encodedDataLength;reqs[e.requestId].end=Date.now()-t0}});
 c.on('Network.loadingFailed',e=>{if(reqs[e.requestId])reqs[e.requestId].failed=e.errorText});
 const cons=[];p.on('console',m=>{if(['error','warning'].includes(m.type()))cons.push(m.type()+': '+m.text().slice(0,160))});p.on('pageerror',e=>cons.push('pageerror '+e.message));
 t0=Date.now();
 const nav=p.goto(U,{waitUntil:'commit'});
 const at=async(ms,n)=>{const w=t0+ms-Date.now();if(w>0)await new Promise(r=>setTimeout(r,w));const s=Date.now()-t0;await p.screenshot({path:OUT+n,timeout:20000}).catch(e=>L('shotfail',n));L(n,'start',s,'done',Date.now()-t0)};
 await at(500,'cold-0.5s.png');await at(1500,'cold-1.5s.png');await at(3000,'cold-3s.png');await at(6000,'cold-6s.png');
 await nav;await p.waitForLoadState('load').catch(()=>{});await p.waitForTimeout(1500);
 const first=Object.values(reqs).map(r=>({...r}));
 const m=await p.evaluate(()=>({lcp:Math.round(window.__lcp),cls:window.__cls,sw:document.documentElement.scrollWidth,h:document.documentElement.scrollHeight}));
 L('FIRSTLOAD',JSON.stringify(m),'bytes',first.reduce((a,r)=>a+(r.bytes||0),0),'n',first.length,'hosts',[...new Set(first.map(r=>host(r.url)))].join(','),'failed',first.filter(r=>r.failed).length);
 await c.send('Emulation.setCPUThrottlingRate',{rate:1});
 const firstN=first.length;let i=0,lastY=-1,same=0,prev=firstN;
 let fcSeen=false;
 while(i<45){
  const s=await p.evaluate(()=>{const els=[...document.querySelectorAll('h1,h2,h3,.credit-rosa')];let best='';for(const e of els){const r=e.getBoundingClientRect();if(r.top<innerHeight*0.6)best=(e.innerText||'').slice(0,40)}
    const fc=document.querySelector('.fc'),rosa=document.querySelector('.fc-rosa');const fr=fc.getBoundingClientRect();
    const imgs=[...document.images].filter(g=>{const r=g.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight});
    return {y:Math.round(scrollY),H:document.documentElement.scrollHeight,sec:best,fcTop:Math.round(fr.top),fcH:Math.round(fr.height),live:fc.classList.contains('live'),on:rosa.classList.contains('on'),cls:fc.className,blank:imgs.filter(g=>!g.complete||!g.naturalWidth).length,inView:imgs.length}});
  const ii=String(i).padStart(2,'0');
  await p.screenshot({path:OUT+`scroll-${ii}.png`,timeout:15000}).catch(()=>L('shotfail',ii));
  const all=Object.values(reqs);const fresh=all.slice(prev).map(r=>host(r.url)+':'+r.url.split('/').pop().slice(0,28));prev=all.length;
  L(ii,JSON.stringify(s),fresh.join(' '));
  if(!fcSeen&&s.fcTop<1200){fcSeen=true;L('FC near at',Date.now()-t0)}
  if(s.y===lastY){if(++same>=2)break}else same=0;
  lastY=s.y;
  await c.send('Input.synthesizeScrollGesture',{x:195,y:620,yDistance:-560,speed:900,gestureSourceType:'touch'}).catch(e=>L('gesture',e.message));
  await p.waitForTimeout(900);i++;
 }
 const after=await p.evaluate(()=>({cls:window.__cls,shifts:window.__shifts,h:document.documentElement.scrollHeight}));
 L('AFTER',JSON.stringify(after));
 // forecast block in detail
 const toFc=await p.evaluate(()=>{const r=document.querySelector('.fc').getBoundingClientRect();window.scrollTo(0,scrollY+r.top-70);return Math.round(scrollY)});
 await p.waitForTimeout(3000);
 await p.screenshot({path:OUT+'fc-card.png'});
 const r2=await p.evaluate(()=>{const f=document.querySelector('.fc-rosa iframe').getBoundingClientRect();window.scrollTo(0,scrollY+f.top-80);const b=document.getElementById('bar');return {bar:b&&b.getBoundingClientRect().top}});
 await p.waitForTimeout(2500);
 await p.screenshot({path:OUT+'fc-widget.png'});
 const fr=p.frames().find(f=>/rosa\.surf/.test(f.url()));
 L('FRAME',fr&&fr.url());
 if(fr){const t=await fr.evaluate(()=>document.body.innerText.slice(0,500)).catch(e=>'frame eval: '+e.message);L('WIDGET TEXT',JSON.stringify(t));}
 const h=await p.evaluate(()=>{const n=document.querySelector('.fc-now');const q=s=>[...n.querySelectorAll(s)].map(e=>e.innerText);return {head:q('.nh'),nd:q('.nd span'),upd:q('.upd span'),ifr:(()=>{const r=document.querySelector('.fc-rosa iframe').getBoundingClientRect();return{top:Math.round(r.top),h:Math.round(r.height),w:Math.round(r.width)}})(),bar:Math.round(document.getElementById('bar').getBoundingClientRect().top),y:Math.round(scrollY)}});
 L('HEADLINE',JSON.stringify(h),JSON.stringify(r2));
 // vertical swipe starting inside the widget: does the page still scroll?
 const y0=await p.evaluate(()=>scrollY);
 await c.send('Input.synthesizeScrollGesture',{x:195,y:Math.max(h.ifr.top+380,300),yDistance:-300,speed:800,gestureSourceType:'touch'});
 await p.waitForTimeout(600);
 const y1=await p.evaluate(()=>scrollY);L('SWIPE UP INSIDE WIDGET page moved',Math.round(y1-y0));
 const y2a=await p.evaluate(()=>{window.scrollTo(0,scrollY-(scrollY-0)*0);return scrollY});
 await p.evaluate(v=>window.scrollTo(0,v),y0);await p.waitForTimeout(500);
 const pagesBefore=ctx.pages().length;
 await c.send('Input.synthesizeScrollGesture',{x:300,y:h.ifr.top+250,xDistance:-200,yDistance:0,speed:800,gestureSourceType:'touch'});
 await p.waitForTimeout(1200);await p.screenshot({path:OUT+'fc-widget-swiped.png'});
 L('pages after sideways swipe',ctx.pages().length-pagesBefore);
 const all=Object.values(reqs),later=all.slice(firstN),hh={};
 later.forEach(r=>{const k=host(r.url);hh[k]=hh[k]||[0,0];hh[k][0]++;hh[k][1]+=r.bytes||0});
 L('LATER by host',JSON.stringify(hh));
 later.filter(r=>/rosa/.test(r.url)).slice(0,6).forEach(r=>L(r.t,r.end,r.bytes,r.failed||'',r.url.slice(0,90)));
 L('FAILED',later.filter(r=>r.failed).map(r=>r.failed+' '+r.url.slice(0,80)));
 L('CONSOLE',cons);
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
