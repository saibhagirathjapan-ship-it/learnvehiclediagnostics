// stage-aware close-ups of a staged bar figure. Usage: node _shotstage.js <cardId>
const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const card = process.argv[2] || 'c1';
const FILE = 'file://' + path.resolve('uds-foundation/v2-request-and-response/index.html').replace(/\\/g, '/');
const OUT = 'uds-foundation/v2-request-and-response/assets/_check';
require('fs').mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  const p = await b.newPage();
  await p.setViewport({ width: 940, height: 900, deviceScaleFactor: 1.7 });
  await p.goto(FILE, { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { await document.fonts.ready; });
  await new Promise(r => setTimeout(r, 300));
  await p.evaluate(cid => { const a = document.querySelector('.cardmap a[href="#' + cid + '"]'); if (a) a.click(); }, card);
  await new Promise(r => setTimeout(r, 400));
  const stages = await p.$eval('.page.on .fig.staged', f => { let m = 0; f.querySelectorAll('[data-stage]').forEach(e => m = Math.max(m, +e.getAttribute('data-stage'))); return m; });
  for (const theme of ['light', 'dark']) {
    await p.evaluate(t => document.querySelector('.stage').setAttribute('data-theme', t), theme);
    // reset to stage 1 by reloading the figure controller state: click Replay until 1/ N, or just re-goto
    for (let s = 1; s <= stages; s++) {
      const fig = await p.$('.page.on .fig.staged');
      await fig.screenshot({ path: `${OUT}/${card}-f1-s${s}-${theme}.png` });
      await p.click('.page.on .fig.staged .rv-btn');
      await new Promise(r => setTimeout(r, 550));
    }
    await p.click('.page.on .fig.staged .rv-btn'); // wrap back to 1
    await new Promise(r => setTimeout(r, 400));
  }
  // whole card (dark) after full reveal
  await p.evaluate(() => document.querySelector('.stage').setAttribute('data-theme', 'dark'));
  const c = await p.$('.page.on .card');
  await c.screenshot({ path: `${OUT}/${card}-card-dark.png` });
  console.log('stages=', stages, 'shots in', OUT);
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
