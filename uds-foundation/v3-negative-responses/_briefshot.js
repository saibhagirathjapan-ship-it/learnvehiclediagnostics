// scratch — screenshot the brief page + its figure close-up, light + dark. Gitignored.
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
  await new Promise(r => setTimeout(r, 300));
  for (const theme of ['light', 'dark']) {
    await p.evaluate(t => document.querySelector('.stage').setAttribute('data-theme', t), theme);
    await new Promise(r => setTimeout(r, 250));
    const pg = await p.$('.page');
    if (pg) await pg.screenshot({ path: path.join(SHOT, 'brief-' + theme + '.png') });
    const fig = await p.$('.brief .fig');
    if (fig) await fig.screenshot({ path: path.join(SHOT, 'brief-fig-' + theme + '.png') });
  }
  await b.close();
  console.log('shot brief + figure, light + dark');
})();
