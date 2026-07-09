// checkmod.js — verify a rendered module: concept count, one-figure-per-concept, no overflow,
// no console errors, EN-on-load + lang isolation; screenshot named cards (light+dark) for a
// figure close-up. Usage: NODE_PATH=uds/node_modules node _template/checkmod.js <module-dir> <expectConcepts> <cardId,cardId,...>
const puppeteer = require('puppeteer-core');
const path = require('path'); const fs = require('fs');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const dir = process.argv[2];
const expect = parseInt(process.argv[3] || '0', 10);
const shots = (process.argv[4] || '').split(',').filter(Boolean);
const FILE = 'file://' + path.resolve(path.join(dir, 'index.html')).replace(/\\/g, '/');
const SHOT = path.join(dir, 'assets', '_check'); fs.mkdirSync(SHOT, { recursive: true });

(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  const p = await b.newPage();
  const errs = [];
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  p.on('pageerror', e => errs.push('PAGEERR: ' + e.message));
  await p.setViewport({ width: 1000, height: 900, deviceScaleFactor: 1.4 });
  await p.goto(FILE, { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { await document.fonts.ready; });
  await new Promise(r => setTimeout(r, 300));

  // measure: concept pages, figure-per-concept, EN on load
  const m = await p.evaluate(() => {
    const pages = [...document.querySelectorAll('.stream.pager > .page')];
    const concept = pages.filter(pg => pg.querySelector('.card .barzone'));
    const noFig = concept.filter(pg => !pg.querySelector('.card .barzone .fig svg')).map(pg => pg.getAttribute('data-id'));
    const jpVisibleOnEn = [...document.querySelectorAll('.stage[data-lang="en"] .jp')].some(el => el.offsetParent !== null);
    return { pages: pages.length, concept: concept.length, noFig, jpVisibleOnEn,
      lang: document.querySelector('.stage').getAttribute('data-lang') };
  });
  const log = [];
  let fail = 0; const N = (ok, s) => { if (!ok) { fail++; log.push('✗ ' + s); } else log.push('✓ ' + s); };
  N(m.concept === expect, `concept cards = ${expect} (got ${m.concept})`);
  N(m.noFig.length === 0, 'every concept has a bar figure' + (m.noFig.length ? ' — missing: ' + m.noFig.join(',') : ''));
  N(m.lang === 'en' && !m.jpVisibleOnEn, 'EN on load, JP hidden');

  // walk every pager page: overflow + svg-internal overflow
  const bad = await p.evaluate(() => {
    const out = [];
    const pages = [...document.querySelectorAll('.stream.pager > .page')];
    pages.forEach(pg => { pg.classList.add('on'); });
    document.querySelectorAll('.stream.pager > .page .card, .fig, table, .bytes, .leg').forEach(el => {
      if (el.scrollWidth > el.clientWidth + 2) { const cs = getComputedStyle(el); if (cs.overflowX === 'auto' || cs.overflowX === 'scroll') return; out.push((el.className || el.tagName).split(' ')[0] + ':' + el.scrollWidth + '/' + el.clientWidth); }
    });
    pages.forEach((pg, i) => pg.classList.toggle('on', i === 0));
    return { out, docX: document.documentElement.scrollWidth > innerWidth + 1 };
  });
  N(!bad.docX, 'no horizontal page overflow');
  N(bad.out.length === 0, 'no element overflow' + (bad.out.length ? ': ' + JSON.stringify(bad.out.slice(0, 8)) : ''));

  // lang toggle isolation: JP-only then EN-only
  const iso = await p.evaluate(() => {
    const stage = document.querySelector('.stage');
    stage.setAttribute('data-lang', 'jp');
    const enVis = [...document.querySelectorAll('.en')].some(el => el.offsetParent !== null);
    stage.setAttribute('data-lang', 'en');
    return { enVisibleOnJp: enVis };
  });
  N(!iso.enVisibleOnJp, 'JP mode hides EN');
  N(errs.length === 0, 'no console errors' + (errs.length ? ': ' + JSON.stringify(errs) : ''));

  // §7d-7 cast lint: an actor box must carry its OWN token, never a semantic hue. Fail if any
  // figure element combines an actor class (ecu/tester) with grn/red — the ECU-as-olive collision.
  const figDir = path.join(dir, 'assets', 'figures');
  const castViol = [];
  if (fs.existsSync(figDir)) {
    for (const f of fs.readdirSync(figDir).filter(x => x.endsWith('.svg'))) {
      const svg = fs.readFileSync(path.join(figDir, f), 'utf8');
      for (const c of (svg.match(/class="[^"]*"/g) || [])) {
        if (/\b(ecu|tester)\b/.test(c) && /\b(grn|grn-s|red|red-s)\b/.test(c)) castViol.push(f + ' → ' + c);
      }
    }
  }
  N(castViol.length === 0, '§7d cast lint: no actor painted a semantic hue' + (castViol.length ? ': ' + JSON.stringify(castViol.slice(0, 5)) : ''));

  // screenshots of named cards (navigate the pager by clicking the strip link), light + dark
  for (const id of shots) {
    for (const theme of ['light', 'dark']) {
      await p.evaluate((cid, th) => {
        document.querySelector('.stage').setAttribute('data-theme', th);
        const a = document.querySelector('.cardmap a[href="#' + cid + '"]'); if (a) a.click();
      }, id, theme);
      await new Promise(r => setTimeout(r, 500));
      const el = await p.$('.page.on .card');
      if (el) await el.screenshot({ path: path.join(SHOT, id + '-' + theme + '.png') });
    }
  }

  console.log(log.join('\n'));
  console.log(fail ? `\n❌ ${fail} failed` : '\n✅ module checks passed');
  await b.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FAILED:', e); process.exit(1); });
