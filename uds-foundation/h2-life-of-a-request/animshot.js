const puppeteer = require('D:/Bhagirath/Automotive/Diagnostic Learning/wiki/learn/uds/node_modules/puppeteer-core');
const path = require('path');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const DIR = 'D:/Bhagirath/Automotive/Diagnostic Learning/wiki/learn/uds-foundation/h2-life-of-a-request';
const URL = 'file:///' + path.join(DIR, 'index.html').replace(/\\/g, '/');
const OUT = path.join(DIR, 'assets');

// freeze an svg at time t and screenshot it; also measure packet-group bbox vs wire
async function freezeAndShot(page, figSel, t, name, theme){
  const info = await page.evaluate((figSel, t)=>{
    const fig = document.querySelector(figSel);
    if(!fig) return {missing:true};
    const svg = fig.querySelector('svg');
    svg.setCurrentTime(0);
    svg.pauseAnimations();
    svg.setCurrentTime(t);
    // measure the two animated <g> groups (packet carriers)
    const groups = [...svg.querySelectorAll('g')];
    const rows = groups.map((g,i)=>{
      const bb = g.getBBox();  // local coords (untransformed)
      const ctm = g.getCTM ? g.getCTM() : null;
      // apply current transform to bbox corners to get on-screen (svg-space) position
      const m = g.transform.baseVal.consolidate();
      let tx=0, ty=0;
      if(m){ tx=m.matrix.e; ty=m.matrix.f; }
      // opacity
      const op = getComputedStyle(g).opacity;
      // find text fills to check green
      const texts = [...g.querySelectorAll('text')].map(tn=>({t:tn.textContent, fill:getComputedStyle(tn).fill}));
      return { i, bbox:{x:bb.x+tx, y:bb.y+ty, w:bb.width, h:bb.height, yTop:bb.y+ty, yBot:bb.y+bb.height+ty}, tx, ty, opacity:+op, texts };
    });
    return { rows, vb: svg.getAttribute('viewBox') };
  }, figSel, t);
  const fig = await page.$(figSel);
  await fig.screenshot({ path: path.join(OUT, name) });
  return info;
}

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless:'new', args:['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width:1000, height:900, deviceScaleFactor:2 });
  await page.goto(URL, { waitUntil:'networkidle0' });

  const out = {};
  for(const theme of ['light','dark']){
    await page.evaluate(t=>document.querySelector('.stage').setAttribute('data-theme',t), theme);
    // BRIEF-BEAT figure: dur 2.6s. request opaque ~0.2*2.6=0.5s; response ~0.8*2.6=2.08s
    out['brief_req_'+theme]  = await freezeAndShot(page, '#brief .fig', 0.55, `anim-brief-req-${theme}.png`, theme);
    out['brief_rsp_'+theme]  = await freezeAndShot(page, '#brief .fig', 2.05, `anim-brief-rsp-${theme}.png`, theme);
    // C4-ROUNDTRIP: dur 3.4s. request pause t≈0.85s; response pause t≈2.2s
    out['c4_req_'+theme] = await freezeAndShot(page, '#c4 .fig', 0.85, `anim-c4-req-${theme}.png`, theme);
    out['c4_rsp_'+theme] = await freezeAndShot(page, '#c4 .fig', 2.2, `anim-c4-rsp-${theme}.png`, theme);
    // also a frame where BOTH might overlap (mid) to check mutual exclusion
    out['brief_mid_'+theme] = await freezeAndShot(page, '#brief .fig', 1.35, `anim-brief-mid-${theme}.png`, theme);
    out['c4_mid_'+theme] = await freezeAndShot(page, '#c4 .fig', 1.75, `anim-c4-mid-${theme}.png`, theme);
  }
  require('fs').writeFileSync(path.join(DIR,'anim-report.json'), JSON.stringify(out,null,2));
  console.log('done');
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
