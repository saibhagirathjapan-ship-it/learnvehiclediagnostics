// verify.js — drive Chrome over index.html: DOM counts, overflow, console, lang toggle, shots.
const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DIR = __dirname;
const FILE = 'file://' + path.join(DIR, 'index.html').replace(/\\/g, '/');
const ASSETS = path.join(DIR, 'assets');

const overflow = () => {
  const bad = [];
  const stage = document.querySelector('.stage');
  const stageR = stage.getBoundingClientRect();
  document.querySelectorAll('.card, .brief, .concl, .divider, .fig, .fig svg, .recall, table, .bytes').forEach(el => {
    if (el.scrollWidth > el.clientWidth + 1) bad.push((el.className || el.tagName) + ' scrollW ' + el.scrollWidth + '>' + el.clientWidth);
    const r = el.getBoundingClientRect();
    if (r.right > stageR.right + 1) bad.push((el.className || el.tagName) + ' right ' + Math.round(r.right) + '>' + Math.round(stageR.right));
  });
  return bad;
};

(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  const p = await b.newPage();
  const errs = [];
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  p.on('pageerror', e => errs.push('PE:' + e.message));
  await p.goto(FILE, { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { await document.fonts.ready; });

  const counts = await p.evaluate(() => ({
    cards: document.querySelectorAll('.card').length,
    briefs: document.querySelectorAll('.brief').length,
    concl: document.querySelectorAll('.concl').length,
    dividers: document.querySelectorAll('.divider').length,
    figs: document.querySelectorAll('.fig').length,
    svgsWithNodes: [...document.querySelectorAll('.fig svg')].filter(s => s.querySelector('text')).length,
    recall: document.querySelectorAll('.recall').length,
    legs: document.querySelectorAll('.leg').length,
    lang: document.querySelector('.stage').getAttribute('data-lang'),
  }));

  // desktop light
  await p.setViewport({ width: 1120, height: 900, deviceScaleFactor: 1.35 });
  await new Promise(r => setTimeout(r, 300));
  const ofLight = await p.evaluate(overflow);
  await p.screenshot({ path: path.join(ASSETS, 'verify-light.png'), fullPage: true });

  // dark
  await p.evaluate(() => document.querySelector('.stage').setAttribute('data-theme', 'dark'));
  await new Promise(r => setTimeout(r, 250));
  const ofDark = await p.evaluate(overflow);
  await p.screenshot({ path: path.join(ASSETS, 'verify-dark.png'), fullPage: true });

  // EN+JP toggle (worst-case width) then back
  await p.evaluate(() => document.querySelector('.stage').setAttribute('data-lang', 'both'));
  await new Promise(r => setTimeout(r, 200));
  const ofBoth = await p.evaluate(overflow);
  await p.evaluate(() => { document.querySelector('.stage').setAttribute('data-theme', 'light'); document.querySelector('.stage').setAttribute('data-lang', 'en'); });

  // mobile
  await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 300));
  const ofMobile = await p.evaluate(overflow);
  await p.screenshot({ path: path.join(ASSETS, 'verify-mobile.png'), fullPage: true });

  console.log('counts:', JSON.stringify(counts));
  console.log('console errors:', errs.length ? JSON.stringify(errs) : 'none');
  console.log('overflow light:', ofLight.length ? JSON.stringify(ofLight) : 'none');
  console.log('overflow dark :', ofDark.length ? JSON.stringify(ofDark) : 'none');
  console.log('overflow both :', ofBoth.length ? JSON.stringify(ofBoth) : 'none');
  console.log('overflow mobile:', ofMobile.length ? JSON.stringify(ofMobile) : 'none');
  await b.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
