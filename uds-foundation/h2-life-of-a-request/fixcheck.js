const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FILE = 'file://' + path.join(__dirname, 'index.html').replace(/\\/g, '/');
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const p = await b.newPage();
  await p.setViewport({ width: 1100, height: 800 });
  await p.goto(FILE, { waitUntil: 'networkidle0' });
  await p.evaluate(() => document.querySelectorAll('.leg').forEach(l => l.open = true));

  // 1) P2* markdown: no leaked literal asterisk in the timing leg; P2* is mono
  const p2 = await p.evaluate(() => {
    const el = [...document.querySelectorAll('.lg-body')].find(e => /extended ceiling/.test(e.textContent));
    if (!el) return { found: false };
    const html = el.innerHTML;
    const txt = el.textContent;
    return { found: true, leakedStar: /(^|[^;])\*/.test(txt), hasMono: /class="mono">P2\*/.test(html), sample: txt.slice(0, 90) };
  });

  // 2) rail language isolation
  const railEN = await p.evaluate(() => {
    const vis = sel => [...document.querySelectorAll('.rail ' + sel)].filter(e => e.offsetParent !== null).length;
    return { en: vis('.rl-t .en'), jp: vis('.rl-t .jp') };
  });
  await p.evaluate(() => document.querySelector('.stage').setAttribute('data-lang', 'jp'));
  const railJP = await p.evaluate(() => {
    const vis = sel => [...document.querySelectorAll('.rail ' + sel)].filter(e => e.offsetParent !== null).length;
    return { en: vis('.rl-t .en'), jp: vis('.rl-t .jp') };
  });
  await p.evaluate(() => document.querySelector('.stage').setAttribute('data-lang', 'en'));

  // 3) scroll not stuck: scroll to bottom-ish, confirm scrollY holds after observer settles
  await p.evaluate(() => window.scrollTo(0, 2600));
  await new Promise(r => setTimeout(r, 500));
  const y1 = await p.evaluate(() => window.scrollY);
  await p.evaluate(() => window.scrollBy(0, 400));
  await new Promise(r => setTimeout(r, 600));
  const y2 = await p.evaluate(() => window.scrollY);

  // 2b) leg-title + nav + stem-pill isolation (the R5 blocker was leg titles doubling in JP)
  await p.evaluate(() => document.querySelectorAll('.leg').forEach(l => l.open = false));
  const iso = {};
  for (const lang of ['en', 'jp']) {
    await p.evaluate(l => document.querySelector('.stage').setAttribute('data-lang', l), lang);
    iso[lang] = await p.evaluate(() => {
      const v = s => [...document.querySelectorAll(s)].filter(e => e.offsetParent !== null).length;
      return { lgEn: v('.lg-en'), lgJp: v('.lg-jp'), modEn: v('.modnav .t .en'), modJp: v('.modnav .jp'), stemEn: v('.stem-n .en'), stemJp: v('.stem-n .jp') };
    });
  }
  await p.evaluate(() => document.querySelector('.stage').setAttribute('data-lang', 'en'));

  console.log('leg/nav/stem iso:', JSON.stringify(iso), '(EN: lgJp/modJp/stemJp=0; JP: lgEn/modEn/stemEn=0)');
  console.log('P2* :', JSON.stringify(p2));
  console.log('rail EN mode:', JSON.stringify(railEN), '(want jp:0)');
  console.log('rail JP mode:', JSON.stringify(railJP), '(want en:0)');
  console.log('scroll held: y1=' + y1, 'y2=' + y2, y2 > y1 ? 'OK (advanced, not yanked)' : 'STUCK?');
  await b.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
