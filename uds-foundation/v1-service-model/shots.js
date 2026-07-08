// shots.js — close-up every figure (bar + leg) in light and dark for the §7a geometry audit.
// Forces all pager pages visible and all <details> legs open so leg figures render, then
// screenshots each .fig in DOM order (matches the NOTES figure register 00..09).
// Usage: NODE_PATH=uds/node_modules node uds-foundation/v1-service-model/shots.js
const puppeteer = require('puppeteer-core');
const path = require('path'); const fs = require('fs');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const dir = __dirname;
const FILE = 'file://' + path.resolve(path.join(dir, 'index.html')).replace(/\\/g, '/');
const OUT = path.join(dir, 'assets', '_shots'); fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  const p = await b.newPage();
  await p.setViewport({ width: 900, height: 700, deviceScaleFactor: 2 });
  await p.goto(FILE, { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { await document.fonts.ready; });
  await p.evaluate(() => {
    document.querySelectorAll('.stream.pager > .page').forEach(pg => pg.classList.add('on'));
    document.querySelectorAll('details').forEach(d => d.open = true);
  });
  await new Promise(r => setTimeout(r, 400));
  const n = await p.evaluate(() => document.querySelectorAll('.fig').length);
  for (const theme of ['light', 'dark']) {
    await p.evaluate(t => document.querySelector('.stage').setAttribute('data-theme', t), theme);
    await new Promise(r => setTimeout(r, 500));   // let a mid-animation frame land
    const figs = await p.$$('.fig');
    for (let i = 0; i < figs.length; i++) {
      await figs[i].screenshot({ path: path.join(OUT, String(i).padStart(2, '0') + '-' + theme + '.png') });
    }
  }
  console.log('shot', n, 'figures × 2 themes →', OUT);
  await b.close();
})().catch(e => { console.error('FAILED:', e); process.exit(1); });
