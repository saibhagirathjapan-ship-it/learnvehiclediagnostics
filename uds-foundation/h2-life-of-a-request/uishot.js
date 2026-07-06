const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FILE = 'file://' + path.join(__dirname, 'index.html').replace(/\\/g, '/');
const A = path.join(__dirname, 'assets');
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  const p = await b.newPage();
  await p.setViewport({ width: 1120, height: 900, deviceScaleFactor: 1.6 });
  await p.goto(FILE, { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { await document.fonts.ready; });
  // top: hero + overview strip
  await p.screenshot({ path: path.join(A, 'ui-top.png'), clip: { x: 0, y: 0, width: 1120, height: 560 } });
  // a concept card with its legs (collapsed)
  const c3 = await p.$('#c3');
  await c3.screenshot({ path: path.join(A, 'ui-card-c3.png') });
  // hover a leg to show affordance? just capture legs region by expanding none
  // recall in conclusion
  await p.evaluate(() => document.querySelector('.recall').scrollIntoView());
  const rc = await p.$('.recall');
  await rc.screenshot({ path: path.join(A, 'ui-recall.png') });
  // mobile top (sticky strip)
  await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 200));
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.screenshot({ path: path.join(A, 'ui-mobile-top.png'), clip: { x: 0, y: 0, width: 390, height: 620 } });
  console.log('ui shots done');
  await b.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
