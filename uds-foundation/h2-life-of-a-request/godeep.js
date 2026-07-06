const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FILE = 'file://' + path.join(__dirname, 'index.html').replace(/\\/g, '/');
const A = path.join(__dirname, 'assets');
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  const p = await b.newPage();
  await p.setViewport({ width: 900, height: 1000, deviceScaleFactor: 2 });
  await p.goto(FILE, { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { await document.fonts.ready; });
  // collapsed: the Go Deeper section of C1
  const stem = await p.$('#c1 .stem');
  await stem.evaluate(el => el.scrollIntoView({ block: 'center' }));
  await new Promise(r => setTimeout(r, 150));
  await stem.screenshot({ path: path.join(A, 'godeep-collapsed.png') });
  // one leg open
  await p.evaluate(() => { const l = document.querySelector('#c1 .leg'); if (l) l.open = true; });
  await new Promise(r => setTimeout(r, 150));
  await stem.screenshot({ path: path.join(A, 'godeep-open.png') });
  // dark collapsed
  await p.evaluate(() => { document.querySelector('#c1 .leg').open = false; document.querySelector('.stage').setAttribute('data-theme', 'dark'); });
  await new Promise(r => setTimeout(r, 200));
  await stem.screenshot({ path: path.join(A, 'godeep-dark.png') });
  console.log('godeep shots done');
  await b.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
