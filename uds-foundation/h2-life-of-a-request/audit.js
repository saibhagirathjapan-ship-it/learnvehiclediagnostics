const puppeteer = require('D:/Bhagirath/Automotive/autodiag_athenaeum/wiki/learn/uds/node_modules/puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const DIR = 'D:/Bhagirath/Automotive/autodiag_athenaeum/wiki/learn/uds-foundation/h2-life-of-a-request';
const URL = 'file:///' + path.join(DIR, 'index.html').replace(/\\/g, '/');
const OUT = path.join(DIR, 'assets');

// ---- WCAG contrast helpers ----
function parseColor(s){
  if(!s) return null;
  let m = s.match(/rgba?\(([^)]+)\)/);
  if(!m) return null;
  const p = m[1].split(',').map(x=>parseFloat(x.trim()));
  return {r:p[0], g:p[1], b:p[2], a:p.length>3?p[3]:1};
}
function lin(c){ c/=255; return c<=0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055,2.4); }
function lum(col){ return 0.2126*lin(col.r)+0.7152*lin(col.g)+0.0722*lin(col.b); }
function blend(fg,bg){ // composite fg over bg using fg.a
  const a = fg.a==null?1:fg.a;
  return {r: fg.r*a+bg.r*(1-a), g: fg.g*a+bg.g*(1-a), b: fg.b*a+bg.b*(1-a), a:1};
}
function ratio(fg,bg){
  const f = blend(fg, bg);
  const L1 = lum(f), L2 = lum(bg);
  const hi = Math.max(L1,L2), lo = Math.min(L1,L2);
  return (hi+0.05)/(lo+0.05);
}

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args:['--no-sandbox','--force-color-profile=srgb'] });
  const report = {};

  for (const theme of ['light','dark']) {
    for (const [wname,w] of [['desktop',1200],['w900',900],['mobile',390]]) {
      const page = await browser.newPage();
      await page.setViewport({ width:w, height:900, deviceScaleFactor:1 });
      const consoleErrors = [];
      page.on('console', m => { if(m.type()==='error') consoleErrors.push(m.text()); });
      page.on('pageerror', e => consoleErrors.push('PAGEERR '+e.message));
      await page.goto(URL, { waitUntil:'networkidle0' });
      await page.evaluate((t)=>{ document.querySelector('.stage').setAttribute('data-theme', t); }, theme);
      await new Promise(r=>setTimeout(r,150));

      const m = await page.evaluate(()=>{
        const de = document.documentElement;
        return {
          scrollWidth: de.scrollWidth, clientWidth: de.clientWidth,
          bodyScrollWidth: document.body.scrollWidth,
          winInner: window.innerWidth,
        };
      });
      const key = `${theme}/${wname}`;
      report[key] = { viewport:w, overflow: m.scrollWidth > m.clientWidth+1, ...m, consoleErrors:[...consoleErrors] };
      await page.close();
    }
  }

  // ---- LINK RESOLUTION (desktop light) ----
  const page = await browser.newPage();
  await page.setViewport({ width:1200, height:900 });
  await page.goto(URL, { waitUntil:'networkidle0' });

  const links = await page.evaluate(()=>{
    const out = [];
    document.querySelectorAll('a[href]').forEach(a=>{
      out.push({ href: a.getAttribute('href'), cls: a.className, text: (a.textContent||'').trim().slice(0,40) });
    });
    return out;
  });
  // resolve each href
  const linkCheck = [];
  for(const l of links){
    const h = l.href;
    if(h.startsWith('#')){
      const id = h.slice(1);
      const exists = await page.evaluate((id)=>!!document.getElementById(id), id);
      linkCheck.push({...l, kind:'anchor', ok:exists, target:'#'+id});
    } else if(h.startsWith('http')){
      linkCheck.push({...l, kind:'external', ok:true, target:h});
    } else {
      // relative file
      const abs = path.resolve(DIR, h);
      const exists = fs.existsSync(abs);
      linkCheck.push({...l, kind:'file', ok:exists, target:abs});
    }
  }
  report.linkCheck = linkCheck;

  // ---- OVERVIEW STRIP + RAIL correctness ----
  const nav = await page.evaluate(()=>{
    const strip = [...document.querySelectorAll('.cardmap .cm-stop')].map(a=>({
      href:a.getAttribute('href'),
      cls:a.className,
      badge: a.querySelector('.st-n') ? (a.querySelector('.st-n').classList.contains('st-ic') ? 'ICON' : a.querySelector('.st-n').textContent.trim()) : null,
      label_en: (a.querySelector('.cm-t .en')||{}).textContent,
      label_jp: (a.querySelector('.cm-t .jp')||{}).textContent,
    }));
    const rail = [...document.querySelectorAll('.rail a')].map(a=>({
      href:a.getAttribute('href'),
      badge: a.querySelector('.st-n') ? (a.querySelector('.st-n').classList.contains('st-ic') ? 'ICON' : a.querySelector('.st-n').textContent.trim()) : null,
      label_en: (a.querySelector('.rl-t .en')||{}).textContent,
      label_jp: (a.querySelector('.rl-t .jp')||{}).textContent,
    }));
    const arrows = document.querySelectorAll('.cardmap .cm-arr').length;
    return { strip, rail, arrows };
  });
  report.nav = nav;

  // ---- scroll-margin landing: click each strip chip, measure card top ----
  const landing = [];
  for(const stop of nav.strip){
    const id = stop.href.replace('#','');
    const res = await page.evaluate((id)=>{
      const el = document.getElementById(id);
      if(!el) return {id, missing:true};
      el.scrollIntoView();
      // account for scroll-margin-top by reading computed
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      // top bar height
      const tb = document.querySelector('.topbar');
      const tbh = tb ? tb.getBoundingClientRect().height : 0;
      return { id, top: Math.round(rect.top), scrollMarginTop: cs.scrollMarginTop, topbarH: Math.round(tbh) };
    }, id);
    landing.push(res);
    await new Promise(r=>setTimeout(r,60));
  }
  report.landing = landing;

  // ---- WCAG on new chrome (both themes) ----
  const wcag = {};
  for(const theme of ['light','dark']){
    await page.evaluate((t)=>{ document.querySelector('.stage').setAttribute('data-theme', t); }, theme);
    await new Promise(r=>setTimeout(r,120));
    const pairs = await page.evaluate(()=>{
      function bgOf(el){
        let e = el;
        while(e){
          const c = getComputedStyle(e).backgroundColor;
          if(c && c!=='rgba(0, 0, 0, 0)' && c!=='transparent') return c;
          e = e.parentElement;
        }
        return getComputedStyle(document.body).backgroundColor;
      }
      const samples = [];
      function grab(sel, note){
        const el = document.querySelector(sel);
        if(!el) { samples.push({note, sel, missing:true}); return; }
        const cs = getComputedStyle(el);
        samples.push({ note, sel, color: cs.color, bg: bgOf(el), fontSize: cs.fontSize, fontWeight: cs.fontWeight });
      }
      grab('.cm-stop .cm-t .en', 'cardmap chip title (ink)');
      grab('.cm-lead .en', 'cardmap lead label (ink-soft)');
      grab('.cm-stop .st-n', 'cardmap number badge (on-accent/accent)');
      grab('.cm-stop.cm-brief .cm-t .en', 'cardmap brief title (ink-soft)');
      grab('.cm-arr', 'cardmap arrow (ink-soft)');
      grab('.rail a .rl-t .en', 'rail link (ink-soft)');
      grab('.stem-n', 'stem-n count pill (accent on chip)');
      grab('.lg-cue', 'lg-cue +/- pill (accent border)');
      grab('.recall .rc-q', 'recall question (ink on chip)');
      grab('.recall .rc-a>summary', 'recall Show-answer button (on-accent/accent)');
      grab('a.fwd', 'fwd pointer (accent on chip)');
      return samples;
    });
    wcag[theme] = pairs;
  }
  // compute ratios in node
  for(const theme of Object.keys(wcag)){
    for(const s of wcag[theme]){
      if(s.missing) continue;
      const fg = parseColor(s.color), bg = parseColor(s.bg);
      if(fg&&bg){ s.ratio = +ratio(fg,bg).toFixed(2); }
      s.bold = parseInt(s.fontWeight)>=600;
      s.px = parseFloat(s.fontSize);
      const large = s.px>=24 || (s.px>=18.66 && s.bold);
      s.threshold = large?3.0:(s.bold&&s.px>=18.66?3.0:4.5);
    }
  }
  report.wcag = wcag;

  // reset to light
  await page.evaluate(()=>{ document.querySelector('.stage').setAttribute('data-theme','light'); });

  // ---- LANG isolation ----
  const langCheck = {};
  for(const lang of ['en','jp']){
    await page.evaluate((l)=>{ document.querySelector('.stage').setAttribute('data-lang', l); }, lang);
    await new Promise(r=>setTimeout(r,80));
    const vis = await page.evaluate((l)=>{
      // count visible en and jp inside new chrome components
      function visCount(sel){
        let en=0, jp=0;
        document.querySelectorAll(sel+' .en').forEach(e=>{ if(e.offsetParent!==null || (e.getClientRects().length)) en++; });
        document.querySelectorAll(sel+' .jp').forEach(e=>{ if(e.offsetParent!==null || (e.getClientRects().length)) jp++; });
        return {en, jp};
      }
      return {
        cardmap: visCount('.cardmap'),
        rail: visCount('.rail'),
        stem: visCount('.stem-h'),
        recall: visCount('.recall'),
      };
    }, lang);
    langCheck[lang] = vis;
  }
  report.langCheck = langCheck;
  await page.evaluate(()=>{ document.querySelector('.stage').setAttribute('data-lang','en'); });

  fs.writeFileSync(path.join(DIR,'audit-report.json'), JSON.stringify(report,null,2));
  console.log('WROTE audit-report.json');
  await browser.close();
})().catch(e=>{ console.error('FATAL', e); process.exit(1); });
