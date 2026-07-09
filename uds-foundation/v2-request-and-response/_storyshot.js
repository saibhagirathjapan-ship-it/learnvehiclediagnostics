// Screenshot a story card + measure viewport-fit. Usage: node _storyshot.js [cardId]
const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const card = process.argv[2] || 'c1';
const FILE = 'file://' + path.resolve('uds-foundation/v2-request-and-response/index.html').replace(/\\/g, '/');
const OUT = 'uds-foundation/v2-request-and-response/assets/_check';
const wait = ms => new Promise(r => setTimeout(r, ms));
const gotoStep = (p, i) => p.evaluate(n => { const d = document.querySelectorAll('.page.on .story .st-dot'); if (d[n - 1]) d[n - 1].click(); }, i);
const scrollInfo = p => p.evaluate(() => ({ doc: document.documentElement.scrollHeight, vp: window.innerHeight, scrollable: document.documentElement.scrollHeight - window.innerHeight }));
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  const errors = [];
  // ---- desktop ----
  const p = await b.newPage();
  p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  p.on('pageerror', e => errors.push('PAGEERR: ' + e.message));
  await p.setViewport({ width: 1300, height: 820, deviceScaleFactor: 1.4 });
  await p.goto(FILE + '#' + card, { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { await document.fonts.ready; });
  await wait(400);
  const N = await p.$eval('.page.on .story', el => +el.getAttribute('data-steps'));
  console.log('steps:', N);
  for (const theme of ['light', 'dark']) {
    await p.evaluate(t => document.querySelector('.stage').setAttribute('data-theme', t), theme);
    for (const s of [1, Math.ceil(N / 2), N]) { await gotoStep(p, s); await wait(450); await p.screenshot({ path: `${OUT}/app-${card}-s${s}-${theme}.png` }); }
  }
  await p.evaluate(t => document.querySelector('.stage').setAttribute('data-theme', t), 'light');
  await gotoStep(p, 1); await wait(300);
  console.log('desktop scroll (px beyond viewport):', (await scrollInfo(p)).scrollable, '@1300x820');

  // ---- mobile ----
  const p2 = await b.newPage();
  p2.on('console', m => { if (m.type() === 'error') errors.push('MOB:' + m.text()); });
  await p2.setViewport({ width: 390, height: 780, deviceScaleFactor: 2 });
  await p2.goto(FILE + '#' + card, { waitUntil: 'networkidle0' });
  await wait(250);
  await p2.screenshot({ path: `${OUT}/app-${card}-mobile-firstpaint.png` });
  await p2.evaluate(async () => { await document.fonts.ready; });
  for (const s of [1, N]) { await gotoStep(p2, s); await wait(400); await p2.screenshot({ path: `${OUT}/app-${card}-mobile-s${s}.png` }); }
  console.log('mobile scroll (px beyond viewport):', (await scrollInfo(p2)).scrollable, '@390x780');
  console.log('console errors:', errors.length ? errors : 'none');
  await b.close();
})();
