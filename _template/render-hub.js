// _template/render-hub.js — render the course hub (all modules as cards) → <learn-dir>/index.html
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { FONTS, topbar, TOPBAR_SCRIPT } = require('./partials.js');   // shared page chrome (FB1)
const CSS = fs.readFileSync(path.join(__dirname, 'blueprint.css'), 'utf8');
const LEARN = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(__dirname, '..');
const c = yaml.load(fs.readFileSync(path.join(LEARN, 'course.yml'), 'utf8'));

const esc = s => String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function inline(s){ s=esc(s); s=s.replace(/`([^`]+)`/g,(m,x)=>'<span class="mono">'+x+'</span>'); return s.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>'); }
let uidc = 0;
const namespaceSvg = (svg,uid)=> svg.replace(/<\?xml[\s\S]*?\?>/,'').trim()
  .replace(/id="([^"]+)"/g,(m,id)=>`id="${uid}_${id}"`)
  .replace(/url\(#([^)]+)\)/g,(m,id)=>`url(#${uid}_${id})`);
function thumb(m){
  if(!m.thumb) return '';
  const svg = namespaceSvg(fs.readFileSync(path.join(LEARN,m.thumb),'utf8'),'h'+(uidc++));
  return `<div class="mc-thumb">${svg}</div>`;
}
function card(m){
  const href = m.href || (m.id + '/index.html'); const up = m.status !== 'done';
  return `<a class="modcard${up?' upcoming':''}" href="${esc(href)}">`+
    `<div class="mc-top"><span class="mc-n">M${esc(m.n)}</span><span class="mc-sovd">→ ${esc(m.sovd||'')}</span></div>`+
    `<h3>${inline(m.title.en)}<span class="jp">${inline(m.title.jp)}</span></h3>`+
    `<p class="mc-scope en">${inline(m.scope.en)}</p><p class="mc-scope jp">${inline(m.scope.jp)}</p>`+
    thumb(m)+
    `<div class="mc-status">${up?'soon':'✓ ready'}</div></a>`;
}
// the hub IS the course home, so the brand links to itself (index.html)
const topbarHtml = topbar({ home: 'index.html' });
const hero=`<section class="hero"><div class="kicker">Automotive Diagnostics · 自動車診断</div>`+
  `<h1>${inline(c.subtitle.en)}</h1><div class="jp">${inline(c.subtitle.jp)}</div>`+
  `<p class="tagline en">${inline(c.tagline.en)}</p><p class="tagline jp">${inline(c.tagline.jp)}</p></section>`;
const grid=`<div class="hub"><div class="hub-h4">${c.modules.length} modules · 全${c.modules.length}モジュール</div><div class="grid">${c.modules.map(card).join('')}</div></div>`;
const html=`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(c.title.en)} — ${esc(c.subtitle.en)}</title>${FONTS}<style>${CSS}</style></head><body>`+
  `<div class="stage" data-theme="light" data-lang="en">${topbarHtml}${hero}${grid}</div>${TOPBAR_SCRIPT}</body></html>`;
fs.writeFileSync(path.join(LEARN,'index.html'), html);
console.log('hub →', path.join(LEARN,'index.html'), '·', c.modules.length, 'modules');
