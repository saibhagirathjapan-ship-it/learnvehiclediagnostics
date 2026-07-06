const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const target = process.argv[2];
const FILE = 'file://' + path.resolve(target).replace(/\\/g, '/');
const OUT = path.dirname(path.resolve(target));
const click = (p, s) => p.evaluate(x => document.querySelector(x).click(), s);

(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  const p = await b.newPage();
  const errs = [];
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  p.on('pageerror', e => errs.push('PAGEERR: ' + e.message));
  await p.setViewport({ width: 980, height: 900, deviceScaleFactor: 1.5 });
  await p.goto(FILE, { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { await document.fonts.ready; });
  await new Promise(r => setTimeout(r, 500));

  await p.screenshot({ path: path.join(OUT, 'pv-collapsed-light.png'), fullPage: true });
  await click(p, '#allseg [data-a="open"]');
  await new Promise(r => setTimeout(r, 250));
  await p.screenshot({ path: path.join(OUT, 'pv-open-light.png'), fullPage: true });
  await click(p, '#themeseg [data-v="dark"]');
  await new Promise(r => setTimeout(r, 250));
  await p.screenshot({ path: path.join(OUT, 'pv-open-dark.png'), fullPage: true });

  const of = await p.evaluate(() => {
    const bad = [];
    document.querySelectorAll('.card,.fig,table,.bytes,.leg,.subcard,p,h3').forEach(el => {
      if (el.scrollWidth > el.clientWidth + 2) { const cs = getComputedStyle(el); if (cs.overflowX==='auto'||cs.overflowX==='scroll') return; bad.push((el.className||el.tagName)+':'+el.scrollWidth+'/'+el.clientWidth); }
    });
    const q = s => document.querySelectorAll(s).length;
    return { docX: document.documentElement.scrollWidth > innerWidth + 1, bad,
      cards:q('.card'), legs:q('.leg'), subcards:q('.subcard'), figs:q('.fig'), bytes:q('.byte') };
  });
  console.log('console errors:', errs.length ? JSON.stringify(errs) : 'none');
  console.log('overflow docX:', of.docX, '| bad:', of.bad.length ? JSON.stringify(of.bad) : 'none');
  console.log('counts:', JSON.stringify({cards:of.cards,legs:of.legs,subcards:of.subcards,figs:of.figs,bytes:of.bytes}));
  await b.close();
})().catch(e => { console.error('FAILED:', e); process.exit(1); });
