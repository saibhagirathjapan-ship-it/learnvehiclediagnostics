// Close-up element screenshots of key cards, light + dark, to judge diagram quality.
const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FILE = 'file://' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
const OUT = path.resolve(__dirname, 'assets');
const CARDS = ['c1', 'c5', 'c6', 'c7', 'c12', 'c14', 'c16', 'c19', 'c21', 'c24', 'c26', 'c27'];

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 980, height: 900, deviceScaleFactor: 2 });
  for (const theme of ['light', 'dark']) {
    await page.goto(FILE, { waitUntil: 'networkidle0' });
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    for (const id of CARDS) {
      const el = await page.$('#' + id);
      if (el) await el.screenshot({ path: path.join(OUT, `card-${id}-${theme}.png`) });
    }
  }
  await browser.close();
  console.log('done');
})();
