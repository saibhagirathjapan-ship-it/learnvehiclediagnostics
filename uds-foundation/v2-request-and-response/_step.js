// grab a specific story step screenshot. Usage: node _step.js <cardId> <stepN>
const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const F = 'file://' + path.resolve('uds-foundation/v2-request-and-response/index.html').replace(/\\/g, '/');
const O = 'uds-foundation/v2-request-and-response/assets/_check';
const card = process.argv[2] || 'c2', step = +(process.argv[3] || 4);
const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const p = await b.newPage();
  await p.setViewport({ width: 1300, height: 820, deviceScaleFactor: 1.3 });
  await p.goto(F + '#' + card, { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { await document.fonts.ready; });
  await wait(300);
  await p.evaluate(n => { const d = document.querySelectorAll('.page.on .story .st-dot'); if (d[n - 1]) d[n - 1].click(); }, step);
  await wait(450);
  await p.screenshot({ path: `${O}/app-${card}-s${step}-light.png` });
  await b.close();
})();
