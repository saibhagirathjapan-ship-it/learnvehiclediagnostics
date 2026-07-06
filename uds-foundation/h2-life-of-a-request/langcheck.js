const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FILE = 'file://' + path.join(__dirname, 'index.html').replace(/\\/g, '/');
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const p = await b.newPage();
  await p.goto(FILE, { waitUntil: 'networkidle0' });
  await p.evaluate(() => document.querySelectorAll('.leg').forEach(l => l.open = true));
  const vis = () => p.evaluate(() => {
    const shown = sel => [...document.querySelectorAll(sel)].filter(e => e.offsetParent !== null && e.getClientRects().length).length;
    return { en: shown('.en'), jp: shown('.jp'), lang: document.querySelector('.stage').getAttribute('data-lang') };
  });
  const setLang = v => p.evaluate(v => document.querySelector('.stage').setAttribute('data-lang', v), v);
  const r = {};
  r.en = await vis();
  await setLang('jp'); r.jp = await vis();
  await setLang('both'); r.both = await vis();
  console.log(JSON.stringify(r));
  await b.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
