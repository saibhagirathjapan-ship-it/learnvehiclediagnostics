// Browser verification for UDS Foundations page.
// Drives system Chrome via puppeteer-core. Measures DOM + overflow, screenshots 3 themes.
const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FILE = 'file://' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
const OUT = path.resolve(__dirname, 'assets');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--force-color-profile=srgb']
  });
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => consoleErrors.push('PAGEERROR: ' + e.message));

  await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 1 });
  await page.goto(FILE, { waitUntil: 'networkidle0' });

  // ---- DOM structure ----
  const dom = await page.evaluate(() => {
    const q = s => [...document.querySelectorAll(s)];
    const counts = {
      dividers: q('.nugget.divider').length,
      briefs: q('.nugget.brief').length,
      conclusions: q('.nugget.concl').length,
      concepts: q('.nugget:not(.divider):not(.brief):not(.concl)').length,
      figures: q('figure.figure').length,
      svgs: q('figure.figure svg.dgm').length,
      tocLinks: q('#toc a').length,
    };
    // concept cards must each have exactly one figure
    const conceptsNoFig = q('.nugget:not(.divider):not(.brief):not(.concl)')
      .filter(c => c.querySelectorAll('figure.figure').length !== 1)
      .map(c => c.id || '(no id)');
    return { counts, conceptsNoFig };
  });

  // ---- overflow check (per theme) ----
  async function overflowReport(label) {
    return await page.evaluate((label) => {
      const docOverflowX = document.documentElement.scrollWidth > window.innerWidth + 1;
      const bad = [];
      document.querySelectorAll('.nugget, .figure, table, .bytes, p, h1, h2, h3, td, th').forEach(el => {
        if (el.scrollWidth > el.clientWidth + 2) {
          // ignore intentionally scrollable wrappers
          const cs = getComputedStyle(el);
          if (cs.overflowX === 'auto' || cs.overflowX === 'scroll') return;
          bad.push({ tag: el.tagName, cls: el.className.toString().slice(0, 40),
                     id: el.id || '', sw: el.scrollWidth, cw: el.clientWidth,
                     txt: (el.textContent || '').trim().slice(0, 40) });
        }
      });
      return { label, docOverflowX, overflowCount: bad.length, bad: bad.slice(0, 12) };
    }, label);
  }

  const results = {};
  // light
  results.light = await overflowReport('light-desktop');
  await page.screenshot({ path: path.join(OUT, 'shot-light.png'), fullPage: true });

  // dark
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  results.dark = await overflowReport('dark-desktop');
  await page.screenshot({ path: path.join(OUT, 'shot-dark.png'), fullPage: true });

  // mobile
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true });
  await page.goto(FILE, { waitUntil: 'networkidle0' });
  results.mobile = await overflowReport('light-mobile');
  await page.screenshot({ path: path.join(OUT, 'shot-mobile.png'), fullPage: true });

  // ---- language toggle: JP hides when EN-only, EN hides when JP-only ----
  const langTest = await page.evaluate(() => {
    const root = document.documentElement;
    const vis = sel => [...document.querySelectorAll(sel)].filter(e => e.offsetParent !== null).length;
    root.setAttribute('data-lang', 'en');
    const enMode = { en: vis('.en'), jp: vis('.jp') };
    root.setAttribute('data-lang', 'jp');
    const jpMode = { en: vis('.en'), jp: vis('.jp') };
    root.setAttribute('data-lang', 'both');
    const bothMode = { en: vis('.en'), jp: vis('.jp') };
    return { enMode, jpMode, bothMode };
  });

  console.log('=== DOM COUNTS ===');
  console.log(JSON.stringify(dom.counts, null, 0));
  console.log('concepts missing exactly-one-figure:', JSON.stringify(dom.conceptsNoFig));
  console.log('lang toggle (visible el counts):', JSON.stringify(langTest));
  console.log('\n=== CONSOLE ERRORS ===');
  console.log(consoleErrors.length ? JSON.stringify(consoleErrors, null, 1) : 'none');
  console.log('\n=== OVERFLOW ===');
  for (const k of ['light', 'dark', 'mobile']) {
    const r = results[k];
    console.log(`[${r.label}] docOverflowX=${r.docOverflowX} overflowElements=${r.overflowCount}`);
    if (r.bad.length) console.log('   ', JSON.stringify(r.bad));
  }
  await browser.close();
})().catch(e => { console.error('VERIFY FAILED:', e); process.exit(1); });
