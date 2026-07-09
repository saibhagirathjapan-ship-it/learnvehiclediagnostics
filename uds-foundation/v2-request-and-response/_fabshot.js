const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FILE = 'file://' + path.resolve('uds-foundation/v2-request-and-response/index.html').replace(/\\/g, '/');
const OUT = 'uds-foundation/v2-request-and-response/assets/_check';
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const p = await b.newPage();
  await p.setViewport({ width: 390, height: 780, deviceScaleFactor: 2 });
  await p.goto(FILE + '#c1', { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { await document.fonts.ready; });
  await new Promise(r => setTimeout(r, 300));
  await p.evaluate(() => document.querySelector('.fab-lbl').click());
  await new Promise(r => setTimeout(r, 300));
  await p.screenshot({ path: OUT + '/fabmenu-mobile.png' });
  await b.close();
})();
