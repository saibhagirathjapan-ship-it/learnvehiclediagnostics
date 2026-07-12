// scratch — per-step viewport overflow for a story card, desktop + mobile. Gitignored.
const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FILE = 'file://' + path.resolve(path.join(__dirname, 'index.html')).replace(/\\/g, '/');
const CARD = process.argv[2] || 'c1';
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const p = await b.newPage();
  for (const [w, h, tag] of [[1000, 820, 'desktop'], [390, 780, 'mobile']]) {
    await p.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    await p.goto(FILE, { waitUntil: 'networkidle0' });
    await p.evaluate(async () => { await document.fonts.ready; });
    await p.evaluate((cid) => { const pages = [...document.querySelectorAll('.stream.pager > .page')]; pages.forEach(pg => pg.classList.toggle('on', pg.getAttribute('data-id') === cid)); }, CARD);
    const N = await p.evaluate((cid) => +document.querySelector('.page[data-id="' + cid + '"] .story').getAttribute('data-steps'), CARD);
    const over = [];
    for (let s = 1; s <= N; s++) {
      await p.evaluate((step, cid) => { const d = document.querySelector('.page[data-id="' + cid + '"] .st-dot[data-i="' + step + '"]'); if (d) d.click(); }, s, CARD);
      await new Promise(r => setTimeout(r, 250));
      const o = await p.evaluate(() => Math.max(0, document.documentElement.scrollHeight - window.innerHeight));
      over.push('s' + s + ':' + o);
    }
    console.log(tag + ' (' + w + 'x' + h + ') overflow px → ' + over.join('  '));
  }
  await b.close();
})();
