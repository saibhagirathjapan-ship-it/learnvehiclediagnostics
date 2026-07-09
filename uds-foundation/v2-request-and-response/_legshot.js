// screenshot a card's expanded leg figures. Usage: node _legshot.js <cardId>
const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const card = process.argv[2] || 'c1';
const FILE = 'file://' + path.resolve('uds-foundation/v2-request-and-response/index.html').replace(/\\/g, '/');
const OUT = 'uds-foundation/v2-request-and-response/assets/_check';
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  const p = await b.newPage();
  await p.setViewport({ width: 940, height: 1200, deviceScaleFactor: 1.7 });
  await p.goto(FILE, { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { await document.fonts.ready; });
  await p.evaluate(cid => { const a = document.querySelector('.cardmap a[href="#' + cid + '"]'); if (a) a.click(); }, card);
  await new Promise(r => setTimeout(r, 300));
  await p.evaluate(() => { document.querySelectorAll('.page.on .leg').forEach(d => d.open = true); });
  await new Promise(r => setTimeout(r, 300));
  for (const theme of ['light', 'dark']) {
    await p.evaluate(t => document.querySelector('.stage').setAttribute('data-theme', t), theme);
    const figs = await p.$$('.page.on .leg .fig');
    for (let i = 0; i < figs.length; i++) await figs[i].screenshot({ path: `${OUT}/${card}-leg${i + 1}-${theme}.png` });
  }
  console.log('leg figs shot');
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
