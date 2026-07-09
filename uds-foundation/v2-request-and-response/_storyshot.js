// Screenshot a story card across steps + themes + mobile. Usage: node _storyshot.js [cardId]
const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const card = process.argv[2] || 'c1';
const FILE = 'file://' + path.resolve('uds-foundation/v2-request-and-response/index.html').replace(/\\/g, '/');
const OUT = 'uds-foundation/v2-request-and-response/assets/_check';
const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  const p = await b.newPage();
  const errors = [];
  p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  p.on('pageerror', e => errors.push('PAGEERR: ' + e.message));

  // ---- desktop: full page + story at steps 1/3/6, light + dark ----
  await p.setViewport({ width: 900, height: 1100, deviceScaleFactor: 1.6 });
  await p.goto(FILE, { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { await document.fonts.ready; });
  await p.evaluate(cid => { const a = document.querySelector('.cardmap a[href="#' + cid + '"]'); if (a) a.click(); }, card);
  await wait(350);
  const N = await p.$eval('.page.on .story', el => +el.getAttribute('data-steps'));
  console.log('story steps:', N);
  for (const theme of ['light', 'dark']) {
    await p.evaluate(t => document.querySelector('.stage').setAttribute('data-theme', t), theme);
    for (const s of [1, 3, N]) {
      await p.evaluate(i => { const bns = document.querySelectorAll('.page.on .story .st-num'); if (bns[i - 1]) bns[i - 1].click(); }, s);
      await wait(500);
      const el = await p.$('.page.on .card');
      await el.screenshot({ path: `${OUT}/story-${card}-s${s}-${theme}.png` });
    }
  }
  // full page (light, step 1) to see chrome + T-glyph + no overflow
  await p.evaluate(t => document.querySelector('.stage').setAttribute('data-theme', t), 'light');
  await p.evaluate(() => { const b = document.querySelector('.page.on .story .st-num'); if (b) b.click(); });
  await wait(300);
  await p.screenshot({ path: `${OUT}/story-${card}-fullpage.png` });

  // ---- mobile first-paint (FB2): fresh load at 380px, screenshot immediately (no refresh) ----
  const p2 = await b.newPage();
  const err2 = [];
  p2.on('console', m => { if (m.type() === 'error') err2.push(m.text()); });
  await p2.setViewport({ width: 380, height: 780, deviceScaleFactor: 2 });
  await p2.goto(FILE + '#' + card, { waitUntil: 'networkidle0' });
  await wait(250);           // deliberately NOT waiting for fonts — the FB2 race window
  await p2.screenshot({ path: `${OUT}/story-${card}-mobile-firstpaint.png` });
  await p2.evaluate(async () => { await document.fonts.ready; });
  await wait(300);
  await p2.screenshot({ path: `${OUT}/story-${card}-mobile-settled.png` });

  // ---- overflow probe: any element wider than the card? ----
  const overflow = await p.evaluate(() => {
    const bad = [];
    document.querySelectorAll('.page.on .card *').forEach(el => {
      if (el.scrollWidth - el.clientWidth > 2 && getComputedStyle(el).overflowX !== 'auto') bad.push(el.className + ' sw=' + el.scrollWidth + ' cw=' + el.clientWidth);
    });
    return bad.slice(0, 8);
  });
  console.log('console errors:', errors.length ? errors : 'none');
  console.log('mobile console errors:', err2.length ? err2 : 'none');
  console.log('overflow offenders:', overflow.length ? overflow : 'none');
  await b.close();
})();
