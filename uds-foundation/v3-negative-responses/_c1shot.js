// scratch — screenshot C1's story figure at chosen steps, light+dark. Gitignored.
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
  // go to the c1 page
  await p.evaluate(() => {
    const pages = [...document.querySelectorAll('.stream.pager > .page')];
    pages.forEach((pg, i) => pg.classList.toggle('on', pg.getAttribute('data-id') === 'c1'));
  });
  await new Promise(r => setTimeout(r, 200));
  const shot = async (step, theme, name) => {
    await p.evaluate((s, th) => {
      document.querySelector('.stage').setAttribute('data-theme', th);
      const pg = document.querySelector('.page[data-id="c1"]');
      const dot = pg.querySelector('.st-dot[data-i="' + s + '"]');
      if (dot) dot.click();
    }, step, theme);
    await new Promise(r => setTimeout(r, 350));
    const fig = await p.$('.page[data-id="c1"] .st-stage');
    if (fig) await fig.screenshot({ path: path.join(SHOT, name + '.png') });
  };
  await shot(2, 'light', 'c1-f1-s2-light');
  await shot(4, 'light', 'c1-f1-s4-light');
  await shot(4, 'dark', 'c1-f1-s4-dark');
  await shot(5, 'light', 'c1-f2-light');
  await shot(5, 'dark', 'c1-f2-dark');
  // full-page compositions (text + figure together)
  for (const [step, name] of [[1, 'c1-page-s1'], [2, 'c1-page-s2'], [5, 'c1-page-s5']]) {
    await p.evaluate((s) => { document.querySelector('.stage').setAttribute('data-theme', 'light'); const d = document.querySelector('.page[data-id="c1"] .st-dot[data-i="' + s + '"]'); if (d) d.click(); }, step);
    await new Promise(r => setTimeout(r, 350));
    const pg = await p.$('.page[data-id="c1"]');
    if (pg) await pg.screenshot({ path: path.join(SHOT, name + '.png') });
  }
  await b.close();
  console.log('shot c1 figures');
})();
