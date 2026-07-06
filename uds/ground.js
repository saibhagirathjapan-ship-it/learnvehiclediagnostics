// One-off grounding screenshots: viewport-level views to judge overall design.
const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FILE = 'file://' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
const OUT = path.resolve(__dirname, 'assets');

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 860, deviceScaleFactor: 1 });

  for (const theme of ['light', 'dark']) {
    await page.goto(FILE, { waitUntil: 'networkidle0' });
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    // top of page: topbar + hero + TOC sidebar
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: path.join(OUT, `g-top-${theme}.png`) });
    // a concept section mid-page (scroll to c7 pipeline)
    await page.evaluate(() => document.getElementById('c7').scrollIntoView());
    await page.screenshot({ path: path.join(OUT, `g-mid-${theme}.png`) });
    // a $10 worked section
    await page.evaluate(() => document.getElementById('c19').scrollIntoView());
    await page.screenshot({ path: path.join(OUT, `g-svc-${theme}.png`) });
  }

  // mobile
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true });
  await page.goto(FILE, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(OUT, 'g-mobile-top.png') });
  await page.evaluate(() => document.getElementById('c9').scrollIntoView());
  await page.screenshot({ path: path.join(OUT, 'g-mobile-card.png') });

  await browser.close();
  console.log('ground shots done');
})().catch(e => { console.error('FAILED:', e); process.exit(1); });
