// _template/shot.js <file.html> — full-page screenshots light+dark, + console check. No clicks.
const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const target = process.argv[2];
const FILE = 'file://' + path.resolve(target).replace(/\\/g, '/');
const OUT = path.dirname(path.resolve(target));
const base = path.basename(target, '.html');
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  const p = await b.newPage();
  const errs = [];
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  p.on('pageerror', e => errs.push('PE:' + e.message));
  await p.setViewport({ width: 1100, height: 900, deviceScaleFactor: 1.4 });
  await p.goto(FILE, { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { await document.fonts.ready; });
  await new Promise(r => setTimeout(r, 500));
  await p.screenshot({ path: path.join(OUT, base + '-light.png'), fullPage: true });
  await p.evaluate(() => document.querySelector('.stage').setAttribute('data-theme', 'dark'));
  await new Promise(r => setTimeout(r, 220));
  await p.screenshot({ path: path.join(OUT, base + '-dark.png'), fullPage: true });
  const of = await p.evaluate(() => ({ docX: document.documentElement.scrollWidth > innerWidth + 1 }));
  console.log('shot', base, '· console:', errs.length ? JSON.stringify(errs) : 'none', '· docOverflowX:', of.docX);
  await b.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
