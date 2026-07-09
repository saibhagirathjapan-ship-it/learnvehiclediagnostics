const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FILE = 'file://' + path.resolve('uds-foundation/v2-request-and-response/index.html').replace(/\\/g, '/');
const OUT = 'uds-foundation/v2-request-and-response/assets/_check';
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  // MOBILE overflow, all cards
  const p = await b.newPage();
  await p.setViewport({ width: 380, height: 780, deviceScaleFactor: 2 });
  await p.goto(FILE, { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { await document.fonts.ready; });
  const over = await p.evaluate(() => {
    const pages = [...document.querySelectorAll('.stream.pager > .page')]; const bad = [];
    pages.forEach(pg => { pg.classList.add('on'); });
    document.querySelectorAll('.page .card,.fig,.panel,.bytes,.leg,table').forEach(el => {
      if (el.scrollWidth > el.clientWidth + 2) bad.push((el.className || '').split(' ')[0] + ':' + el.scrollWidth + '/' + el.clientWidth);
    });
    pages.forEach((pg, i) => pg.classList.toggle('on', i === 1));
    return { bad, docX: document.documentElement.scrollWidth > innerWidth + 1 };
  });
  console.log('MOBILE docX-overflow:', over.docX, ' element-overflow:', over.bad.length ? over.bad : 'none');
  await p.evaluate(cid => { const a = document.querySelector('.cardmap a[href="#' + cid + '"]'); if (a) a.click(); }, 'c2');
  await new Promise(r => setTimeout(r, 300));
  const m = await p.$('.page.on .card'); if (m) await m.screenshot({ path: OUT + '/c2-mobile.png' });
  // REDUCED MOTION: C1 staged figure — end-frame must show all stages
  const p2 = await b.newPage();
  await p2.setViewport({ width: 900, height: 900, deviceScaleFactor: 1.6 });
  await p2.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await p2.goto(FILE, { waitUntil: 'networkidle0' });
  await p2.evaluate(async () => { await document.fonts.ready; });
  await p2.evaluate(() => { const a = document.querySelector('.cardmap a[href="#c1"]'); if (a) a.click(); });
  await new Promise(r => setTimeout(r, 300));
  const rm = await p2.evaluate(() => {
    const fig = document.querySelector('.page.on .fig.staged');
    const hidden = [...fig.querySelectorAll('[data-stage]')].filter(e => getComputedStyle(e).opacity === '0').length;
    const ctl = fig.querySelector('.rv-ctl'); return { hidden, ctlDisplay: ctl ? getComputedStyle(ctl).display : 'none' };
  });
  console.log('REDUCED-MOTION C1: stages hidden =', rm.hidden, '(want 0), control display =', rm.ctlDisplay);
  const f = await p2.$('.page.on .fig.staged'); if (f) await f.screenshot({ path: OUT + '/c1-reducedmotion.png' });
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
