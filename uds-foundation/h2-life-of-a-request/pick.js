const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FILE = 'file://' + path.join(__dirname, 'index.html').replace(/\\/g, '/');
const A = path.join(__dirname, 'assets');
const want = process.argv.slice(2); // list of figure src basenames
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  const p = await b.newPage();
  await p.setViewport({ width: 1000, height: 1000, deviceScaleFactor: 2 });
  await p.goto(FILE, { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { await document.fonts.ready; });
  await p.evaluate(() => document.querySelectorAll('.leg').forEach(l => l.open = true));
  await new Promise(r => setTimeout(r, 200));
  for (const name of want) {
    const h = await p.$(`.fig:has(svg[aria-label]) svg`); // fallback
    // find the .fig whose svg aria-label or nearby matches; simplest: match by figure containing a text with the name is hard.
  }
  // Instead: screenshot each .fig and name by its first <text> or index, but also match requested by aria-label substring.
  const figs = await p.$$('.fig');
  for (let i = 0; i < figs.length; i++) {
    const label = await figs[i].evaluate(el => { const s = el.querySelector('svg'); return s ? (s.getAttribute('aria-label')||'').slice(0,40) : ''; });
    const key = want.find(w => label.toLowerCase().includes(w.toLowerCase()));
    if (want.length === 0 || key) {
      await figs[i].screenshot({ path: path.join(A, `pick-${i}.png`) });
      console.log(i, '=>', label);
    }
  }
  await b.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
