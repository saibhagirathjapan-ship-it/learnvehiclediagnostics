const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FILE = 'file://' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
const OUT = path.resolve(__dirname, 'assets');
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  const p = await b.newPage();
  await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await p.goto(FILE, { waitUntil: 'networkidle0' });
  await p.screenshot({ path: path.join(OUT, 'mobile-top.png') });
  const fab = await p.evaluate(() => getComputedStyle(document.getElementById('tocfab')).display);
  await p.setViewport({ width: 1200, height: 900, deviceScaleFactor: 1 });
  await p.goto(FILE, { waitUntil: 'networkidle0' });
  const land = await p.evaluate(async () => {
    const a = [...document.querySelectorAll('#toc a')].find(x => x.getAttribute('href') === '#s4');
    a.click();
    await new Promise(r => setTimeout(r, 2500));
    const top = document.getElementById('s4').getBoundingClientRect().top;
    const active = document.querySelector('#toc a.active');
    return { s4Top: Math.round(top), activeHref: active ? active.getAttribute('href') : null, scrollY: Math.round(window.scrollY) };
  });
  console.log('mobile FAB display:', fab);
  console.log('nav landing:', JSON.stringify(land), '(s4Top ~74 = lands under sticky bar; active should be #s4)');
  await b.close();
})();
