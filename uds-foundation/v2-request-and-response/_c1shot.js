const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FILE = 'file://' + path.resolve('uds-foundation/v2-request-and-response/index.html').replace(/\\/g, '/');
const OUT = 'uds-foundation/v2-request-and-response/assets/_check';
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  const p = await b.newPage();
  await p.setViewport({ width: 900, height: 1500, deviceScaleFactor: 1.4 });
  await p.goto(FILE, { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { await document.fonts.ready; });
  await p.evaluate(() => { const a = document.querySelector('.cardmap a[href="#c1"]'); if (a) a.click(); });
  await new Promise(r => setTimeout(r, 400));
  await p.evaluate(() => { const f = document.querySelector('.page.on .fig.staged svg'); for (let i = 0; i < 5; i++) if (f) f.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
  await new Promise(r => setTimeout(r, 600));
  await (await p.$('.page.on .card')).screenshot({ path: OUT + '/c1-continuous-full.png' });
  console.log('c1 shot done');
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
