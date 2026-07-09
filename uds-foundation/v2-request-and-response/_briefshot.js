// Verify the brief/conclusion side card-nav arrows render + work. Usage: node _briefshot.js
const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FILE = 'file://' + path.resolve('uds-foundation/v2-request-and-response/index.html').replace(/\\/g, '/');
const OUT = 'uds-foundation/v2-request-and-response/assets/_check';
const wait = ms => new Promise(r => setTimeout(r, ms));
const arrows = p => p.evaluate(() => {
  const pg = document.querySelector('.page.on');
  const vis = s => { const e = pg.querySelector(s); return e ? getComputedStyle(e).visibility : 'absent'; };
  return { prev: vis('.pg-prev'), next: vis('.pg-fwd') };
});
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--force-color-profile=srgb'] });
  const p = await b.newPage();
  await p.setViewport({ width: 1300, height: 820, deviceScaleFactor: 1.3 });
  await p.goto(FILE + '#brief', { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { await document.fonts.ready; });
  await wait(400);
  console.log('BRIEF arrows (prev should be hidden):', JSON.stringify(await arrows(p)));
  await p.screenshot({ path: `${OUT}/brief-arrows.png` });
  await p.evaluate(() => document.querySelector('.page.on .pg-fwd').click());
  await wait(500);
  console.log('after clicking brief >:', await p.evaluate(() => document.querySelector('.page.on').getAttribute('data-id')));
  // conclusion needs a FRESH page load (a same-doc hash change does not re-run the pager)
  const p2 = await b.newPage();
  await p2.setViewport({ width: 1300, height: 820, deviceScaleFactor: 1.3 });
  await p2.goto(FILE + '#concl', { waitUntil: 'networkidle0' });
  await p2.evaluate(async () => { await document.fonts.ready; });
  await wait(400);
  console.log('CONCL active id:', await p2.evaluate(() => document.querySelector('.page.on').getAttribute('data-id')));
  console.log('CONCL arrows (next should be hidden):', JSON.stringify(await arrows(p2)));
  await p2.screenshot({ path: `${OUT}/concl-arrows.png` });
  await b.close();
})();
