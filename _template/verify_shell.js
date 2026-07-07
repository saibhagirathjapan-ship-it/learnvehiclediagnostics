// verify_shell.js — drive the shared chrome (topbar + sticky crumbs) across every page type.
// Checks: one shared topbar everywhere, sticky-stack geometry (crumbs pinned under topbar,
// overview strip under both), lang cycle (EN→日本語→EN+JP), theme toggle, no console errors,
// no horizontal overflow. Screenshots the stacked chrome scrolled (light+dark) + mobile.
// Run: NODE_PATH=uds/node_modules node _template/verify_shell.js
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const LEARN = path.resolve(__dirname, '..');
const SHOT = path.join(__dirname, '_shellshots');
fs.mkdirSync(SHOT, { recursive: true });
const url = rel => 'file://' + path.join(LEARN, rel).replace(/\\/g, '/');

const PAGES = [
  { name: 'hub',  rel: 'index.html',                              crumbs: false, strip: false },
  { name: 'map',  rel: 'uds-foundation/index.html',              crumbs: true,  strip: false },
  { name: 'stub', rel: 'uds-foundation/v7a-session-control/index.html', crumbs: false, strip: false },
  { name: 'H1',   rel: 'uds-foundation/h1-landscape/index.html', crumbs: true,  strip: true  },
  { name: 'H2',   rel: 'uds-foundation/h2-life-of-a-request/index.html', crumbs: true, strip: true },
];

(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  let fails = 0;
  const note = (ok, msg) => { if (!ok) { fails++; console.log('  ✗ ' + msg); } else console.log('  ✓ ' + msg); };

  for (const pg of PAGES) {
    console.log('\n=== ' + pg.name + ' (' + pg.rel + ') ===');
    const p = await b.newPage();
    const errs = [];
    p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    p.on('pageerror', e => errs.push('PAGEERR: ' + e.message));
    await p.setViewport({ width: 1000, height: 820, deviceScaleFactor: 1.25 });
    await p.goto(url(pg.rel), { waitUntil: 'networkidle0' });
    await p.evaluate(async () => { await document.fonts.ready; });
    await new Promise(r => setTimeout(r, 300));

    // 1 — one shared topbar: brand is a home link, both toggles present
    const chrome = await p.evaluate(() => {
      const tb = document.querySelectorAll('.topbar');
      const brand = document.querySelector('.topbar .brand');
      return {
        topbars: tb.length,
        brandIsLink: !!(brand && brand.tagName === 'A' && brand.getAttribute('href')),
        brandText: brand ? (brand.querySelector('.btxt') || {}).textContent : null,
        lang: !!document.getElementById('langbtn'),
        theme: !!document.getElementById('themebtn'),
        langDefault: document.querySelector('.stage').getAttribute('data-lang'),
      };
    });
    note(chrome.topbars === 1, 'exactly one .topbar (got ' + chrome.topbars + ')');
    note(chrome.brandIsLink, 'brand is a home <a href>');
    note(chrome.brandText === 'Automotive Diagnostics', 'brand text = "Automotive Diagnostics" (got ' + JSON.stringify(chrome.brandText) + ')');
    note(chrome.lang && chrome.theme, 'globe + theme buttons present');
    note(chrome.langDefault === 'en', 'default lang = EN on load (got ' + chrome.langDefault + ')');

    // 2 — sticky-stack vars set, crumbs sticky + pinned under the topbar after scroll
    const stack = await p.evaluate((expectCrumbs, expectStrip) => {
      const cs = getComputedStyle(document.documentElement);
      const tbh = parseFloat(cs.getPropertyValue('--tbh')) || 0;
      const crh = parseFloat(cs.getPropertyValue('--crh')) || 0;
      const stick = parseFloat(cs.getPropertyValue('--stick')) || 0;
      window.scrollTo(0, 1200);
      const r = {};
      const tb = document.querySelector('.topbar').getBoundingClientRect();
      r.topbarTop = Math.round(tb.top);
      const cr = document.querySelector('.crumbs');
      r.crumbsExists = !!cr;
      if (cr) { r.crumbsPos = getComputedStyle(cr).position; r.crumbsTop = Math.round(cr.getBoundingClientRect().top); }
      const st = document.querySelector('.cardmap-wrap');
      r.stripExists = !!st;
      if (st) { r.stripPos = getComputedStyle(st).position; r.stripTop = Math.round(st.getBoundingClientRect().top); }
      r.tbh = Math.round(tbh); r.crh = Math.round(crh); r.stick = Math.round(stick);
      r.expectCrumbs = expectCrumbs; r.expectStrip = expectStrip;
      window.scrollTo(0, 0);
      return r;
    }, pg.crumbs, pg.strip);
    note(stack.tbh > 0 && stack.stick === stack.tbh + stack.crh, `--stick = --tbh + --crh (${stack.stick} = ${stack.tbh} + ${stack.crh})`);
    note(stack.topbarTop === 0, 'topbar pinned at viewport top when scrolled');
    if (pg.crumbs) {
      note(stack.crumbsExists && stack.crumbsPos === 'sticky', 'crumbs position:sticky');
      note(Math.abs(stack.crumbsTop - stack.tbh) <= 1, `crumbs pinned directly under topbar (top ${stack.crumbsTop} ≈ tbh ${stack.tbh})`);
    } else {
      note(!stack.crumbsExists, 'no crumbs on this page type');
    }
    if (pg.strip) {
      note(stack.stripExists && stack.stripPos === 'sticky', 'overview strip position:sticky');
      note(Math.abs(stack.stripTop - stack.stick) <= 1, `strip pinned under crumbs (top ${stack.stripTop} ≈ stick ${stack.stick})`);
    }

    // 3 — lang cycle EN → 日本語 → EN+JP → EN
    const langCycle = await p.evaluate(() => {
      const stage = document.querySelector('.stage'); const seq = [];
      for (let i = 0; i < 3; i++) { document.getElementById('langbtn').click(); seq.push(stage.getAttribute('data-lang')); }
      return seq.join(',');
    });
    note(langCycle === 'jp,both,en', 'globe cycles en→jp→both→en (got ' + langCycle + ')');

    // 4 — theme toggle flips
    const themeFlip = await p.evaluate(() => {
      const stage = document.querySelector('.stage'); const a = stage.getAttribute('data-theme');
      document.getElementById('themebtn').click(); const bb = stage.getAttribute('data-theme');
      document.getElementById('themebtn').click(); const c = stage.getAttribute('data-theme');
      return a + '>' + bb + '>' + c;
    });
    note(themeFlip === 'light>dark>light', 'theme toggles light↔dark (got ' + themeFlip + ')');

    // 5 — no horizontal overflow, no console errors
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
    note(!overflow, 'no horizontal page overflow');
    note(errs.length === 0, 'no console errors' + (errs.length ? ': ' + JSON.stringify(errs) : ''));

    // screenshots: scrolled to show the sticky stack (light + dark)
    await p.evaluate(() => window.scrollTo(0, 700));
    await new Promise(r => setTimeout(r, 200));
    await p.screenshot({ path: path.join(SHOT, pg.name + '-scrolled-light.png') });
    await p.evaluate(() => { document.getElementById('themebtn').click(); window.scrollTo(0, 700); });
    await new Promise(r => setTimeout(r, 200));
    await p.screenshot({ path: path.join(SHOT, pg.name + '-scrolled-dark.png') });
    await p.close();
  }

  // mobile check for a module page (stacking must hold at 390px)
  const pm = await b.newPage();
  await pm.setViewport({ width: 390, height: 780, deviceScaleFactor: 2, isMobile: true });
  await pm.goto(url('uds-foundation/h2-life-of-a-request/index.html'), { waitUntil: 'networkidle0' });
  await pm.evaluate(async () => { await document.fonts.ready; });
  await new Promise(r => setTimeout(r, 300));
  const mob = await pm.evaluate(() => {
    window.scrollTo(0, 900);
    const cr = document.querySelector('.crumbs').getBoundingClientRect();
    const st = document.querySelector('.cardmap-wrap').getBoundingClientRect();
    const tbh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tbh')) || 0;
    return { crumbsTop: Math.round(cr.top), tbh: Math.round(tbh), stripTop: Math.round(st.top),
      overflow: document.documentElement.scrollWidth > innerWidth + 1 };
  });
  console.log('\n=== H2 mobile 390px ===');
  note(Math.abs(mob.crumbsTop - mob.tbh) <= 1, `crumbs pinned under topbar (${mob.crumbsTop} ≈ ${mob.tbh})`);
  note(mob.stripTop >= mob.crumbsTop, 'strip sits below crumbs');
  note(!mob.overflow, 'no horizontal overflow on mobile');
  await pm.screenshot({ path: path.join(SHOT, 'H2-mobile-scrolled.png') });
  await pm.close();

  await b.close();
  console.log('\n' + (fails ? '❌ ' + fails + ' check(s) failed' : '✅ all shell checks passed'));
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error('FAILED:', e); process.exit(1); });
