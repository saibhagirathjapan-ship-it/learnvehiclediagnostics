// scratch — C2 figure stages + full pages, light/dark. Gitignored.
const puppeteer = require('puppeteer-core');
const path = require('path'); const fs = require('fs');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const dir = __dirname;
const FILE = 'file://' + path.resolve(path.join(dir, 'index.html')).replace(/\\/g, '/');
const SHOT = path.join(dir, 'assets', '_check'); fs.mkdirSync(SHOT, { recursive: true });
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  const p = await b.newPage();
  await p.setViewport({ width: 1000, height: 900, deviceScaleFactor: 2 });
  await p.goto(FILE, { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { await document.fonts.ready; });
  await p.evaluate(() => { const pages = [...document.querySelectorAll('.stream.pager > .page')]; pages.forEach(pg => pg.classList.toggle('on', pg.getAttribute('data-id') === 'c2')); });
  const go = async (s, th) => { await p.evaluate((step, t) => { document.querySelector('.stage').setAttribute('data-theme', t); const d = document.querySelector('.page[data-id="c2"] .st-dot[data-i="' + step + '"]'); if (d) d.click(); }, s, th); await new Promise(r => setTimeout(r, 350)); };
  const figShot = async (s, th, name) => { await go(s, th); const f = await p.$('.page[data-id="c2"] .st-stage'); if (f) await f.screenshot({ path: path.join(SHOT, name + '.png') }); };
  const pageShot = async (s, name) => { await go(s, 'light'); const pg = await p.$('.page[data-id="c2"]'); if (pg) await pg.screenshot({ path: path.join(SHOT, name + '.png') }); };
  await figShot(1, 'light', 'c2-f1-s1');
  await figShot(2, 'light', 'c2-f1-s2');
  await figShot(3, 'light', 'c2-f1-s3-light');
  await figShot(3, 'dark', 'c2-f1-s3-dark');
  await pageShot(1, 'c2-page-s1');
  await pageShot(2, 'c2-page-s2');
  await b.close();
  console.log('shot c2');
})();
