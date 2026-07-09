// step-shot a :::panel card. Usage: node _panelshot.js <cardId>
const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const card = process.argv[2] || 'c2';
const FILE = 'file://' + path.resolve('uds-foundation/v2-request-and-response/index.html').replace(/\\/g, '/');
const OUT = 'uds-foundation/v2-request-and-response/assets/_check';
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  const p = await b.newPage();
  await p.setViewport({ width: 900, height: 1000, deviceScaleFactor: 1.7 });
  await p.goto(FILE, { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { await document.fonts.ready; });
  await p.evaluate(cid => { const a = document.querySelector('.cardmap a[href="#' + cid + '"]'); if (a) a.click(); }, card);
  await new Promise(r => setTimeout(r, 300));
  const N = await p.$eval('.page.on .panel', el => +el.getAttribute('data-steps'));
  for (const theme of ['light', 'dark']) {
    await p.evaluate(t => document.querySelector('.stage').setAttribute('data-theme', t), theme);
    // reset to step 1
    await p.evaluate(() => { let g; while ((g = document.querySelector('.page.on .panel .pn-prev')) && !g.disabled) g.click(); });
    await new Promise(r => setTimeout(r, 250));
    for (let s = 1; s <= N; s++) {
      const el = await p.$('.page.on .panel');
      await el.screenshot({ path: `${OUT}/${card}-panel-s${s}-${theme}.png` });
      const nx = await p.$('.page.on .panel .pn-next');
      if (nx) await nx.evaluate(b => b.click());
      await new Promise(r => setTimeout(r, 550));
    }
  }
  // show-all (scannable) in light
  await p.evaluate(t => document.querySelector('.stage').setAttribute('data-theme', t), 'light');
  await p.click('.page.on .panel .pn-all');
  await new Promise(r => setTimeout(r, 300));
  const el = await p.$('.page.on .panel');
  await el.screenshot({ path: `${OUT}/${card}-panel-showall.png` });
  console.log('panel steps=', N);
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
