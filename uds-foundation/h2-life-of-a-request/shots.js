// shots.js — close-up frozen-frame screenshots of figures, light + dark.
// Usage: node shots.js [selectorIndex] — screenshots each .fig svg at a frozen mid-animation frame.
const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DIR = __dirname;
const FILE = 'file://' + path.join(DIR, 'index.html').replace(/\\/g, '/');
const ASSETS = path.join(DIR, 'assets');

(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  const p = await b.newPage();
  await p.setViewport({ width: 900, height: 1000, deviceScaleFactor: 2 });
  await p.goto(FILE, { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { await document.fonts.ready; });
  // expand all legs so leg figures are visible
  await p.evaluate(() => document.querySelectorAll('.leg').forEach(l => l.open = true));

  const freeze = (t) => p.evaluate((t) => {
    document.querySelectorAll('svg').forEach(s => { try { s.pauseAnimations(); s.setCurrentTime(t); } catch (e) {} });
  }, t);

  const shoot = async (theme, t) => {
    await p.evaluate((th) => document.querySelector('.stage').setAttribute('data-theme', th), theme);
    await new Promise(r => setTimeout(r, 200));
    await freeze(t);
    await new Promise(r => setTimeout(r, 120));
    const figs = await p.$$('.fig');
    for (let i = 0; i < figs.length; i++) {
      // scroll the figure into view + settle before capturing, so the element-screenshot
      // bounding box is correct (the sticky strip + animations otherwise mis-crop some).
      await figs[i].evaluate(el => el.scrollIntoView({ block: 'center' }));
      await new Promise(r => setTimeout(r, 140));
      await freeze(t);
      await figs[i].screenshot({ path: path.join(ASSETS, `fig${i}-${theme}.png`) });
    }
  };
  // t chosen to catch the request pulse mid-flight (~0.3 of 2.6s cycle) in dark, response (~1.9s) in light
  await shoot('light', 1.95);
  await shoot('dark', 0.8);
  const n = (await p.$$('.fig')).length;
  console.log('shot', n, 'figures (light@1.95s, dark@0.8s) →', ASSETS);
  await b.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
