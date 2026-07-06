const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FILE = 'file://' + path.join(__dirname, 'index.html').replace(/\\/g, '/');
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const p = await b.newPage();
  await p.goto(FILE, { waitUntil: 'networkidle0' });
  for (const w of [1200, 900, 390]) {
    await p.setViewport({ width: w, height: 900 });
    await new Promise(r => setTimeout(r, 150));
    const o = await p.evaluate(() => ({
      docOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      cmScrolls: (() => { const c = document.querySelector('.cardmap'); return c ? c.scrollWidth > c.clientWidth : null; })()
    }));
    console.log('w=' + w, JSON.stringify(o));
  }
  await b.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
