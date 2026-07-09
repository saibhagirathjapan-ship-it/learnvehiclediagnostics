const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FILE = 'file://' + path.resolve('uds-foundation/v2-request-and-response/index.html').replace(/\\/g, '/');
const OUT = 'uds-foundation/v2-request-and-response/assets/_check';
async function go(p, card) { await p.evaluate(cid => { const a = document.querySelector('.cardmap a[href="#' + cid + '"]'); if (a) a.click(); }, card); await new Promise(r => setTimeout(r, 350)); }
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  // DESKTOP full C2 card (continuous flow, no legs)
  const p = await b.newPage();
  await p.setViewport({ width: 900, height: 1400, deviceScaleFactor: 1.5 });
  await p.goto(FILE, { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { await document.fonts.ready; });
  await go(p, 'c2');
  await p.$eval('.page.on .card', el => el.scrollIntoView());
  const card = await p.$('.page.on .card');
  await card.screenshot({ path: OUT + '/c2-continuous-full.png' });
  // panel step 3 (tick + dots + fixed figure)
  await p.evaluate(() => { const d = document.querySelectorAll('.page.on .pn-dot')[2]; if (d) d.click(); });
  await new Promise(r => setTimeout(r, 500));
  await (await p.$('.page.on .panel')).screenshot({ path: OUT + '/c2-panel-dots-s3.png' });
  // the examples figure (now inline in a flowsec)
  const figs = await p.$$('.page.on .flowsec .fig');
  if (figs[0]) await figs[0].screenshot({ path: OUT + '/c2-examples-fixed.png' });
  // MOBILE panel
  const pm = await b.newPage();
  await pm.setViewport({ width: 380, height: 820, deviceScaleFactor: 2 });
  await pm.goto(FILE, { waitUntil: 'networkidle0' });
  await pm.evaluate(async () => { await document.fonts.ready; });
  await go(pm, 'c2');
  await new Promise(r => setTimeout(r, 300));
  await (await pm.$('.page.on .panel')).screenshot({ path: OUT + '/c2-panel-mobile-dots.png' });
  // fixed-figure proof: capture the pn-stage top offset at step 1 and step 4
  const off1 = await pm.$eval('.page.on .pn-stage', e => Math.round(e.getBoundingClientRect().top));
  await pm.evaluate(() => { const d = document.querySelectorAll('.page.on .pn-dot'); d[d.length - 1].click(); });
  await new Promise(r => setTimeout(r, 400));
  const off4 = await pm.$eval('.page.on .pn-stage', e => Math.round(e.getBoundingClientRect().top));
  console.log('figure top offset — step1:', off1, ' step4:', off4, off1 === off4 ? '(STABLE ✓)' : '(MOVED ✗)');
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
