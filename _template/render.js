// _template/render.js — render a module's per-concept MD into a self-contained Blueprint page.
// Usage: node render.js <module-dir>   →  <module-dir>/index.html
// Reads <module-dir>/module.yml (module meta + nav) and <module-dir>/content/*.md (cards).
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { FONTS, topbar, TOPBAR_SCRIPT } = require('./partials.js');   // shared page chrome (FB1)

const CSS = fs.readFileSync(path.join(__dirname, 'blueprint.css'), 'utf8');
let uidc = 0;

// Forward-pointer targets: map a drill/module ID (V1..V9, H1..H3, M2..M9) to its page,
// so {{→ V9 · …}} renders as a real link. Foundation drills are siblings (../vx/); the
// pillar modules M2..M9 live one level up (../../slug/). Unknown IDs render as a plain pill.
const LINKS = {
  H1:'../h1-landscape/', H2:'../h2-life-of-a-request/', H3:'../h3-catalog-and-server/',
  V1:'../v1-service-model/', V2:'../v2-request-and-response/', V3:'../v3-negative-responses/',
  V4:'../v4-subfunctions/', V5:'../v5-sessions/', V6:'../v6-timing/',
  V7a:'../v7a-session-control/', V7b:'../v7b-ecu-reset/', V7c:'../v7c-tester-present/',
  V8:'../v8-addressing-transport/', V9:'../v9-inside-the-server/',
  M2:'../../uds-data/', M3:'../../uds-dtc/', M4:'../../uds-security/', M5:'../../uds-routines/',
  M6:'../../uds-flash/', M7:'../../doip/', M8:'../../web-api/', M9:'../../sovd/',
};
function fwd(inner){
  const t = inner.trim();
  // match H1..H3 / V1..V9 (incl. the split service homes V7a/V7b/V7c) / M2..M9
  const idm = t.match(/\b([VMH]\d+[a-c]?)\b/);
  const href = idm && LINKS[idm[1]] ? LINKS[idm[1]] + 'index.html' : null;
  return href ? `<a class="fwd" href="${href}">${t}<span class="fwd-go">↗</span></a>`
              : `<span class="fwd">${t}</span>`;
}

// small inline label icons — inherit the label's colour via currentColor.
// HIGH echoes the T-bar (top emphasized); DEEP echoes the T-stem (stem + down).
const IC_START='<svg class="lbl-ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 14V2.4"/><path d="M4 3.1h7l-1.6 2.4L11 8H4"/></svg>';
const IC_HIGH='<svg class="lbl-ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.4 8h11.2"/><path d="M5 5.3 2.3 8 5 10.7"/><path d="M11 5.3 13.7 8 11 10.7"/></svg>';
const IC_DEEP='<svg class="lbl-ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 3.5h12" stroke-opacity=".36"/><path d="M8 3.5v6.8"/><path d="M5.4 8.2 8 10.8l2.6-2.6"/></svg>';
const IC_RECAP='<svg class="lbl-ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8.4 6.4 11.3 12.5 4.8"/></svg>';

const esc = s => String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function inline(s){
  s = esc(s);
  // Protect inline-code spans FIRST: their contents may contain * or {{ }} (e.g. `P2*`) that
  // must not be treated as emphasis / forward-pointer delimiters. Stash them, run the emphasis
  // passes on the rest, then restore the code spans as mono.
  const code=[];
  s = s.replace(/`([^`]+)`/g, (m,x)=>{ code.push(x); return '@%CODE'+(code.length-1)+'%@'; });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');   // bold (accent) — must run before italic
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');               // italic (upright in JP, see CSS)
  s = s.replace(/\{\{([^}]+)\}\}/g, (m, inner) => fwd(inner));  // {{→ V9 · …}} forward-pointer → real link
  s = s.replace(/@%CODE(\d+)%@/g, (m,i)=>'<span class="mono">'+code[+i]+'</span>');
  return s;
}
function parseFile(txt){
  txt = txt.replace(/\r\n/g,'\n');
  const m = txt.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if(!m) throw new Error('missing frontmatter');
  const meta = yaml.load(m[1]) || {};
  const sections = {};
  m[2].split(/^##\s+/m).forEach(part=>{
    if(!part.trim()) return;
    const nl = part.indexOf('\n');
    sections[(nl<0?part:part.slice(0,nl)).trim()] = nl<0?'':part.slice(nl+1);
  });
  return { meta, sections };
}
function parseBlocks(content){
  const blocks=[]; const re=/:::(\w+)([^\n]*)\n([\s\S]*?)\n:::/g; let m;
  while((m=re.exec(content))) blocks.push({type:m[1],args:m[2].trim(),raw:m[3]});
  return blocks;
}
function kv(raw){
  const o={};
  raw.trim().split('\n').forEach(l=>{ const m=l.match(/^(\w+):\s*(.*)$/); if(m) o[m[1]]=m[2]; });
  return o;
}
// prose block: blank-line-separated paragraphs. A paragraph is rendered as:
//  · an ORDERED list (numbered steps) if every line starts with "1. " — use for sequences.
//  · a BULLET list if every line starts with "- "/"* ". A leading "{key}"/"{warn}" tags the
//    item so it gets a distinct marker (normal · key point · caution) — a conscious icon choice.
//  · otherwise a paragraph. The .en/.jp class rides the list too, so the lang toggle works.
function renderProse(raw,cls,lead){
  return raw.trim().split(/\n\s*\n/).map(par=>{
    const lines = par.split('\n').map(l=>l.trim()).filter(Boolean);
    if(lines.length>0 && lines.every(l=>/^\d+\.\s+/.test(l))){
      return `<ol class="steps ${cls}">`+lines.map(l=>`<li>${inline(l.replace(/^\d+\.\s+/,''))}</li>`).join('')+`</ol>`;
    }
    if(lines.length>0 && lines.every(l=>/^[-*]\s+/.test(l))){
      return `<ul class="blist ${cls}">`+lines.map(l=>{
        let t=l.replace(/^[-*]\s+/,''); const m=t.match(/^\{(\w+)\}\s*([\s\S]*)$/);
        const liCls=m?' bl-'+m[1]:''; if(m) t=m[2];
        return `<li${liCls?` class="${liCls.trim()}"`:''}>${inline(t)}</li>`;
      }).join('')+`</ul>`;
    }
    return `<p class="${cls}${lead?' lead':''}">${inline(par.replace(/\n/g,' ').trim())}</p>`;
  }).join('');
}
// :::reading — a "Further reading" panel. One source per line: `doc | section(s) | note`.
// For standards, put the document name in col 1 and the clause/table numbers in col 2.
function renderReading(raw){
  const items = raw.trim().split('\n').map(l=>l.trim()).filter(Boolean).map(l=>{
    const c=l.split('|').map(x=>x.trim());
    const doc=c[0]||'', sec=c[1]||'', note=c[2]||'';
    return `<li><span class="rd-doc">${inline(doc)}</span>`+
      (sec?`<span class="rd-sec">${inline(sec)}</span>`:'')+
      (note?`<span class="rd-note">${inline(note)}</span>`:'')+`</li>`;
  }).join('');
  return `<div class="reading"><div class="rd-h">Further reading · 参考文献</div><ul class="rd-list">${items}</ul></div>`;
}
function renderBytes(raw){
  const rows = raw.trim().split('\n').map(l=>l.trim()).filter(Boolean).map(l=>{
    const c=l.split('|').map(x=>x.trim());
    return `<div class="byte ${c[2]||''}"><div class="hex">${esc(c[0])}</div><div class="cap">${esc(c[1]||'')}</div></div>`;
  }).join('');
  return `<div class="bytes">${rows}</div>`;
}
const CALLOUT_LBL = { key:'Key · 要点', warn:'Watch out · 注意' };
function renderCallout(type,raw){
  const o=kv(raw); const lbl=o.label||CALLOUT_LBL[type]||type;
  let inner='';
  if(o.en) inner+=`<span class="en">${inline(o.en)}</span>`;
  if(o.jp) inner+=`<span class="jp">${inline(o.jp)}</span>`;
  return `<div class="callout ${type}"><span class="lbl">${esc(lbl)}</span>${inner}</div>`;
}
// :::recall — a retrieval-practice beat: a question shown, its answer hidden in <details>.
// keys: q_en / q_jp (the prompt) · a_en / a_jp (the hidden answer). Both languages present.
function renderRecall(raw){
  const o=kv(raw);
  const q=(o.q_en?`<span class="en">${inline(o.q_en)}</span>`:'')+(o.q_jp?`<span class="jp">${inline(o.q_jp)}</span>`:'');
  const a=(o.a_en?`<span class="en">${inline(o.a_en)}</span>`:'')+(o.a_jp?`<span class="jp">${inline(o.a_jp)}</span>`:'');
  return `<div class="recall"><div class="rc-q"><span class="lbl">Your turn · あなたの番</span>${q}</div>`+
    `<details class="rc-a"><summary><span class="en">Show answer</span><span class="jp">答えを見る</span></summary>`+
    `<div class="rc-body">${a}</div></details></div>`;
}
// :::elaborate — a divergent, learner-GENERATED retrieval beat (§4, piloted in V2). Same shape as
// :::recall (q_en/q_jp prompt · a_en/a_jp a MODEL answer in <details>) but framed "in your own words".
function renderElaborate(raw){
  const o=kv(raw);
  const q=(o.q_en?`<span class="en">${inline(o.q_en)}</span>`:'')+(o.q_jp?`<span class="jp">${inline(o.q_jp)}</span>`:'');
  const a=(o.a_en?`<span class="en">${inline(o.a_en)}</span>`:'')+(o.a_jp?`<span class="jp">${inline(o.a_jp)}</span>`:'');
  return `<div class="recall elaborate"><div class="rc-q"><span class="lbl">In your own words · 自分の言葉で</span>${q}</div>`+
    `<details class="rc-a"><summary><span class="en">Show a model answer</span><span class="jp">模範解答を見る</span></summary>`+
    `<div class="rc-body">${a}</div></details></div>`;
}
const namespaceSvg = (svg,uid)=> svg.replace(/<\?xml[\s\S]*?\?>/,'').trim()
  .replace(/id="([^"]+)"/g,(m,id)=>`id="${uid}_${id}"`)
  .replace(/url\(#([^)]+)\)/g,(m,id)=>`url(#${uid}_${id})`);
// A figure marked `build-order` (§7d-5) is a STAGED reveal: the SVG tags elements with
// data-stage="1..N"; the controller (SCRIPT below) hides future stages so the reader steps
// through, click-to-advance. Raw SVG (no JS) shows all stages, so it degrades gracefully.
function revealCtl(){
  return `<div class="rv-ctl"><button class="rv-btn" type="button">`+
    `<span class="rv-lead"><span class="en">Build it up</span><span class="jp">組み立てる</span></span>`+
    `<span class="rv-ar" aria-hidden="true">▸</span></button><span class="rv-lbl"></span>`+
    `<span class="rv-hint"><span class="en">click to advance</span><span class="jp">クリックで進む</span></span></div>`;
}
// :::panel — synced narration + staged illustration, stepped together (§7d panel, the "video beat"
// on static material). Steps are separated by a line of "--"; each step is kv (en:/jp:). The SVG's
// data-stage / data-until elements advance in lockstep with the narration (step i → stage i).
function renderPanel(args,raw,assetsDir){
  const src=(args.match(/src=(\S+)/)||[])[1];
  const uid='u'+(uidc++);
  const svg = src ? namespaceSvg(fs.readFileSync(path.join(assetsDir,src),'utf8'),uid) : '';
  const steps = raw.split(/\n-{2,}\s*\n/).map(s=>kv(s)).filter(o=>o.en||o.jp);
  const N = steps.length;
  const stepsHtml = steps.map((o,i)=>
    `<div class="pn-step${i===0?' pn-on':''}" data-step="${i+1}">`+
    (o.en?`<span class="en">${inline(o.en)}</span>`:'')+(o.jp?`<span class="jp">${inline(o.jp)}</span>`:'')+`</div>`).join('');
  const dots = steps.map((_,i)=>`<button class="pn-dot${i===0?' on':''}" type="button" data-i="${i+1}" aria-label="Go to part ${i+1}"></button>`).join('');
  return `<figure class="panel" data-steps="${N}">`+
    `<div class="pn-text">${stepsHtml}</div>`+
    `<div class="pn-stage">${svg}</div>`+
    `<div class="pn-ctl"><div class="pn-dots" role="tablist">${dots}</div>`+
    `<button class="pn-all" type="button"><span class="en">Show all</span><span class="jp">全て表示</span></button></div>`+
    `</figure>`;
}
function renderFigure(args,raw,assetsDir){
  const src=(args.match(/src=(\S+)/)||[])[1];
  const staged=/\bbuild-order\b/.test(args);
  const o=kv(raw); const uid='u'+(uidc++);
  const svg = src ? namespaceSvg(fs.readFileSync(path.join(assetsDir,src),'utf8'),uid) : '';
  let cap='';
  if(o.en||o.jp) cap=`<figcaption>${o.en?`<span class="en">${inline(o.en)}</span>`:''}${o.jp?`<span class="jp">${inline(o.jp)}</span>`:''}</figcaption>`;
  return `<div class="fig${staged?' staged':''}">${svg}${staged?revealCtl():''}${cap}</div>`;
}
const renderBlocks = (blocks,assetsDir,lead)=> blocks.map(b=>{
  if(b.type==='en'||b.type==='jp') return renderProse(b.raw,b.type,lead);
  if(b.type==='bytes') return renderBytes(b.raw);
  if(b.type==='key'||b.type==='warn') return renderCallout(b.type,b.raw);
  if(b.type==='recall') return renderRecall(b.raw);
  if(b.type==='elaborate') return renderElaborate(b.raw);
  if(b.type==='panel') return renderPanel(b.args,b.raw,assetsDir);
  if(b.type==='reading') return renderReading(b.raw);
  if(b.type==='figure') return renderFigure(b.args,b.raw,assetsDir);
  return '';
}).join('');
function tglyph(n,active,mini){
  const cls='tg'+(mini?' tgmini':'')+(active===0?' barlit':' s'+active);
  const top=13,bottom=33,gap=1.6,h=(bottom-top-(n-1)*gap)/n; let segs='';
  for(let i=0;i<n;i++){ const y=(top+i*(h+gap)).toFixed(1);
    segs+=`<rect class="seg g${i+1}" x="16.5" y="${y}" width="7" height="${h.toFixed(1)}" rx="1.4"/>`; }
  return `<svg class="${cls}" viewBox="0 0 40 34" aria-hidden="true"><rect class="bar" x="3" y="3" width="34" height="7" rx="1.6"/>${segs}</svg>`;
}
function renderConcept(meta,sections,assetsDir){
  const legs=meta.legs||[]; const n=legs.length||1;
  const sid = meta.sid?`<div class="tf sid"><span class="chip">${esc(meta.sid)}</span></div>`:'';
  const tblock=`<div class="tblock"><div class="tf idx"><small>Card</small>${esc(String(meta.id).toUpperCase())}</div>`+
    `<div class="tf grow"><h3>${inline(meta.title.en)}</h3><div class="jp">${inline(meta.title.jp)}</div></div>`+
    `${sid}<div class="tf tgcell">${tglyph(n,0,false)}</div></div>`;
  let bar=`<div class="barzone"><p class="kicker">${IC_HIGH}High level · 概要</p>`+
    renderBlocks(parseBlocks(sections['bar']||''),assetsDir,true);
  if(meta.illustration){
    let cap='';
    if(meta.caption) cap=(meta.caption.en?`en: ${meta.caption.en}\n`:'')+(meta.caption.jp?`jp: ${meta.caption.jp}`:'');
    bar+=renderFigure('src='+meta.illustration+(meta.reveal?' '+meta.reveal:''),cap,assetsDir);
  }
  bar+=`</div>`;
  let stem='';
  // CONTINUOUS mode (pilot 2026-07-09): no collapsible go-deeper legs — the "legs" render as
  // inline flowing sections, so the card reads as one continuous story (H and V cards alike).
  if(legs.length && meta.continuous){
    stem=`<div class="flow">`;
    legs.forEach(leg=>{
      let body=renderBlocks(parseBlocks(sections['leg:'+leg.id]||''),assetsDir,false);
      (leg.cards||[]).forEach(card=>{
        const cbody=renderBlocks(parseBlocks(sections['leg:'+leg.id+'/card:'+card.id]||''),assetsDir,false);
        body+=`<div class="subcard"><div class="sc-h"><span class="sc-n">${esc(String(card.id).toUpperCase())}</span><span class="sc-t">${inline(card.title.en)}</span></div><div class="sc-jp jp">${inline(card.title.jp)}</div>${cbody}</div>`;
      });
      stem+=`<section class="flowsec"><div class="fs-h"><span class="en">${inline(leg.title.en)}</span><span class="jp">${inline(leg.title.jp)}</span></div><div class="fs-body">${body}</div></section>`;
    });
    stem+=`</div>`;
  } else if(legs.length){
    stem=`<div class="stem"><div class="stem-h">${IC_DEEP}<span class="sh-t"><span class="en">Go deeper</span><span class="jp">もっと詳しく</span></span>`+
      `<span class="stem-n"><span class="en">${legs.length} more</span><span class="jp">あと${legs.length}</span></span>`+
      `<span class="stem-hint"><span class="en">tap a row to expand ↓</span><span class="jp">各行をタップで展開 ↓</span></span></div><div class="legs">`;
    legs.forEach((leg,i)=>{
      let body=renderBlocks(parseBlocks(sections['leg:'+leg.id]||''),assetsDir,false);
      (leg.cards||[]).forEach(card=>{
        const cbody=renderBlocks(parseBlocks(sections['leg:'+leg.id+'/card:'+card.id]||''),assetsDir,false);
        body+=`<div class="subcard"><div class="sc-h"><span class="sc-n">${esc(String(card.id).toUpperCase())}</span><span class="sc-t">${inline(card.title.en)}</span></div><div class="sc-jp jp">${inline(card.title.jp)}</div>${cbody}</div>`;
      });
      const sum=`<summary>${tglyph(n,i+1,true)}<span class="lg-txt"><span class="lg-en en">${inline(leg.title.en)}</span><span class="lg-jp jp">${inline(leg.title.jp)}</span></span><span class="lg-cue" aria-hidden="true"></span></summary>`;
      stem+=`<details class="leg">${sum}<div class="lg-body">${body}</div></details>`;
    });
    stem+=`</div></div>`;
  }
  let footer='';
  if((sections['footer']||'').trim()) footer=`<div class="card-footer">${renderBlocks(parseBlocks(sections['footer']),assetsDir,false)}</div>`;
  return `<article class="card" id="${esc(meta.id)}"><div class="card-in">${tblock}${bar}${stem}${footer}</div></article>`;
}
function renderDivider(meta){
  const s=meta.section||{};
  const sub = meta.sub?`<p class="sub en">${inline(meta.sub.en)}</p><p class="sub jp">${inline(meta.sub.jp)}</p>`:'';
  return `<section class="divider" id="${esc(meta.id)}" data-secn="${esc(s.n)}"><div class="sec">SECTION ${esc(s.n)}</div>`+
    `<h2>${inline(s.en)}<span class="jp">${inline(s.jp)}</span></h2>${sub}</section>`;
}
function renderBrief(meta,sections,assetsDir){
  const eb=meta.eyebrow||'Start here · まずここから';
  return `<section class="brief" id="${esc(meta.id||'brief')}"><div class="eyebrow">${IC_START}${esc(eb)}</div>${renderBlocks(parseBlocks(sections['body']||''),assetsDir,false)}</section>`;
}
function renderConclusion(meta,sections,assetsDir){
  const eb=meta.eyebrow||'Section recap · まとめ';
  return `<section class="concl" id="${esc(meta.id||'concl')}"><div class="eyebrow">${IC_RECAP}${esc(eb)}</div>${renderBlocks(parseBlocks(sections['body']||''),assetsDir,false)}</section>`;
}
function renderCard(meta,sections,assetsDir){
  switch(meta.type){
    case 'divider': return renderDivider(meta);
    case 'brief': return renderBrief(meta,sections,assetsDir);
    case 'conclusion': return renderConclusion(meta,sections,assetsDir);
    default: return renderConcept(meta,sections,assetsDir);
  }
}
function renderHero(mod){
  return `<section class="hero"><div class="kicker">Automotive Diagnostics · 自動車診断</div>`+
    `<h1>${inline(mod.title.en)}</h1><div class="jp">${inline(mod.title.jp)}</div>`+
    (mod.tagline?`<p class="tagline en">${inline(mod.tagline.en)}</p><p class="tagline jp">${inline(mod.tagline.jp)}</p>`:'')+
    `</section>`;
}
// Topbar comes from the shared partial (partials.topbar) — see FB1. Identical on every surface
// (no page-specific segments); home is the course hub two levels up.
// breadcrumb: Course › Foundation › <module> (trail only — no module-to-module nav inside an H/V).
function renderCrumbs(mod){
  const p = mod.parent || { label:'Foundation', href:'../index.html' };
  return `<nav class="crumbs" aria-label="Breadcrumb"><div class="crumbs-in"><div class="cr-trail">`+
    `<a href="../../index.html">Course</a><span class="cr-sep" aria-hidden="true">›</span>`+
    `<a href="${esc(p.href)}">${esc(p.label)}</a><span class="cr-sep" aria-hidden="true">›</span>`+
    `<span class="cr-cur" aria-current="page"><span class="en">${inline(mod.title.en)}</span><span class="jp">${inline(mod.title.jp)}</span></span>`+
    `</div></div></nav>`;
}
// card-level nav: prev/next between adjacent teaching cards (stops), appended under each card.
function cardNav(prev,next){
  if(!prev && !next) return '';
  const side=(s,dir)=> s
    ? `<a class="cln ${dir}" href="#${esc(s.id)}"><span class="cln-d">${dir==='prev'?'← Prev card':'Next card →'}</span>`+
      `<span class="cln-t"><span class="en">${inline(s.en)}</span><span class="jp">${inline(s.jp)}</span></span></a>`
    : `<span class="cln ${dir} disabled" aria-hidden="true"></span>`;
  return `<nav class="cardnav">${side(prev,'prev')}${side(next,'next')}</nav>`;
}
// ---- card-level navigation: an ordered list of "stops" (one per teaching card) ----
// Drives both the top overview strip and the left rail, so a reader always sees how many
// cards there are and where they are in the flow. Dividers are section headers, not stops.
function stopMeta(meta){
  if(meta.type==='divider') return null;
  let en,jp;
  if(meta.short){ en=meta.short.en; jp=meta.short.jp; }
  else if(meta.type==='brief'){ en='Start here'; jp='まずここから'; }
  else if(meta.type==='conclusion'){ en='Recap'; jp='まとめ'; }
  else { en=(meta.title||{}).en||String(meta.id); jp=(meta.title||{}).jp||''; }
  return { id:String(meta.id), role:meta.type, en, jp };
}
function buildStops(items){
  const stops=[]; let n=0;
  items.forEach(it=>{ const s=stopMeta(it.meta); if(!s) return;
    if(s.role==='concept'){ n++; s.num=String(n).padStart(2,'0'); } stops.push(s); });
  return stops;
}
function stopBadge(s){
  if(s.role==='concept') return `<span class="st-n">${s.num}</span>`;
  // crisp text glyphs read better than a flag icon at small badge size: ▸ start · ✓ recap
  const g = s.role==='brief' ? '▸' : '✓';
  return `<span class="st-n st-ic">${g}</span>`;
}
function renderCardMap(stops){
  if(!stops.length) return '';
  const node = s => `<a class="cm-stop cm-${s.role}" href="#${esc(s.id)}">${stopBadge(s)}`+
    `<span class="cm-t"><span class="en">${inline(s.en)}</span><span class="jp">${inline(s.jp)}</span></span></a>`;
  const inner = stops.map((s,i)=>(i?'<span class="cm-arr" aria-hidden="true">→</span>':'')+node(s)).join('');
  return `<div class="cardmap-wrap"><nav class="cardmap" aria-label="Cards in this module"><div class="cardmap-in">`+
    `<span class="cm-lead"><span class="en">In this module</span><span class="jp">この章</span></span>${inner}</div></nav></div>`;
}
function renderRail(stops){
  const links = stops.map(s=>`<a href="#${esc(s.id)}">${stopBadge(s)}`+
    `<span class="rl-t"><span class="en">${inline(s.en)}</span><span class="jp">${inline(s.jp)}</span></span></a>`).join('');
  return `<nav class="toc rail"><h4><span class="en">This module</span><span class="jp">この章</span></h4>${links}</nav>`;
}
function navcard(dir,m){
  if(!m) return `<span class="${dir} disabled"><div class="dir">${dir==='prev'?'← start':'end →'}</div><div class="t">—</div></span>`;
  const arrow = dir==='prev' ? '← Prev module' : 'Next module →';
  return `<a class="${dir}" href="../${esc(m.id)}/index.html"><div class="dir">${arrow}</div>`+
    `<div class="t"><span class="en">${inline(m.label.en)}</span><span class="jp">${inline(m.label.jp)}</span></div></a>`;
}
function renderModNav(mod){
  const nav=mod.nav||{};
  return `<nav class="modnav">${navcard('prev',nav.prev)}${navcard('next',nav.next)}</nav>`;
}
// Page-specific behaviour only (chrome behaviour is in partials.TOPBAR_SCRIPT). This block owns
// the one-card-at-a-time pager. (Legs are expanded individually via each Go-Deeper <details>.)
const SCRIPT=`<script>
// PAGER — one card at a time; the top strip is the always-on progress + jump nav
var pages=[].slice.call(document.querySelectorAll('.stream.pager > .page'));
var strip=document.querySelector('.cardmap'),links=[].slice.call(document.querySelectorAll('.cardmap a'));
var pr=document.getElementById('progress'),wrap=document.querySelector('.cardmap-wrap'),idx=-1;
function show(i,scroll){
  i=Math.max(0,Math.min(pages.length-1,i));if(i===idx||!pages.length)return;idx=i;
  pages.forEach(function(p,k){p.classList.toggle('on',k===i)});
  var id=pages[i].getAttribute('data-id');
  links.forEach(function(a){var on=a.getAttribute('href')==='#'+id;a.classList.toggle('on',on);
    if(on&&strip){var ar=a.getBoundingClientRect(),cr=strip.getBoundingClientRect();strip.scrollLeft+=(ar.left-cr.left)-(cr.width-ar.width)/2;}});
  if(pr)pr.style.width=(pages.length>1?i/(pages.length-1)*100:100)+'%';
  if(scroll){
    if(history.replaceState)history.replaceState(null,'','#'+id);
    if(wrap){var off=parseInt(getComputedStyle(document.documentElement).getPropertyValue('--stick'))||44;var top=wrap.getBoundingClientRect().top+window.pageYOffset-off;window.scrollTo(0,Math.max(0,top));}
  }
}
function jump(id){for(var k=0;k<pages.length;k++){if(pages[k].getAttribute('data-id')===id){show(k,true);return true}}return false;}
document.addEventListener('click',function(e){var a=e.target.closest('.cardmap a, .cardnav a');if(!a)return;var h=a.getAttribute('href')||'';if(h.charAt(0)==='#'&&jump(h.slice(1)))e.preventDefault();});
addEventListener('keydown',function(e){var t=e.target.tagName;if(t==='INPUT'||t==='TEXTAREA')return;if(e.key==='ArrowRight')show(idx+1,true);else if(e.key==='ArrowLeft')show(idx-1,true);});
var start=(location.hash||'').slice(1),si=0,deep=!!start;
if(start)for(var k=0;k<pages.length;k++){if(pages[k].getAttribute('data-id')===start){si=k;break}}
show(si,deep);
if(!deep)window.scrollTo(0,0);

// STAGED FIGURES — click-to-advance reveal (§7d-5). Raw SVG shows all stages; here we hide the
// future ones and step through. Reduced-motion → leave everything shown (the end frame must teach).
var mqReduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
[].forEach.call(document.querySelectorAll('.fig.staged'),function(fig){
  var els=[].slice.call(fig.querySelectorAll('[data-stage]')),max=0;
  els.forEach(function(el){max=Math.max(max,+el.getAttribute('data-stage')||0)});
  var ctl=fig.querySelector('.rv-ctl'),btn=fig.querySelector('.rv-btn'),lbl=fig.querySelector('.rv-lbl');
  if(mqReduce||max<2){fig.classList.add('rv-done');if(ctl)ctl.style.display='none';return;}
  fig.classList.add('can-step');
  var lead=btn&&btn.querySelector('.rv-lead'),ar=btn&&btn.querySelector('.rv-ar'),shown=1;
  function paint(){
    els.forEach(function(el){el.classList.toggle('rv-hide',(+el.getAttribute('data-stage'))>shown)});
    if(lbl)lbl.textContent=shown+' / '+max;
    var done=shown>=max;fig.classList.toggle('rv-done',done);
    if(ar)ar.textContent=done?'↺':'▸';
    if(lead){var e=lead.querySelector('.en'),j=lead.querySelector('.jp');
      if(e)e.textContent=done?'Replay':(shown===1?'Build it up':'Next');
      if(j)j.textContent=done?'もう一度':(shown===1?'組み立てる':'次へ');}
  }
  function adv(){shown=shown>=max?1:shown+1;paint();}
  paint();
  if(btn)btn.addEventListener('click',function(e){e.preventDefault();adv();});
  var svg=fig.querySelector('svg');if(svg)svg.addEventListener('click',adv);
});

// PANELS — synced narration + staged illustration stepped together (§7d panel). data-stage = show
// from step N; data-until = hide after step N (a toggle, e.g. the byte 10 gives way to 50).
function paintStages(root,cur){
  [].forEach.call(root.querySelectorAll('[data-stage],[data-until]'),function(el){
    var mn=+el.getAttribute('data-stage')||1,u=el.getAttribute('data-until'),mx=u?+u:1e9;
    el.classList.toggle('rv-hide',cur<mn||cur>mx);
  });
}
var panelFits=[];
[].forEach.call(document.querySelectorAll('.panel'),function(pn){
  var N=+pn.getAttribute('data-steps')||1;
  var steps=[].slice.call(pn.querySelectorAll('.pn-step')),stg=pn.querySelector('.pn-stage');
  var txt=pn.querySelector('.pn-text'),dots=[].slice.call(pn.querySelectorAll('.pn-dot')),allb=pn.querySelector('.pn-all');
  var cur=1,allOn=false;
  // FIX the text region to its tallest step so the figure below never jumps as steps change.
  function fit(){ if(allOn){txt.style.height='';return;} var m=0;
    steps.forEach(function(s){ if(s.offsetHeight>m)m=s.offsetHeight; }); if(m)txt.style.height=m+'px'; }
  function render(){
    steps.forEach(function(s,i){s.classList.toggle('pn-on',(i+1)===cur)});
    dots.forEach(function(d,i){d.classList.toggle('on',(i+1)===cur)});
    if(stg)paintStages(stg,cur);
  }
  function setAll(on){allOn=on;pn.classList.toggle('pn-all-on',on);
    if(on){if(stg)paintStages(stg,N);txt.style.height='';}else{render();fit();}
    if(allb){var e=allb.querySelector('.en'),j=allb.querySelector('.jp');
      if(e)e.textContent=on?'Step through':'Show all';if(j)j.textContent=on?'順に見る':'全て表示';}}
  function go(to){if(allOn)setAll(false);cur=Math.max(1,Math.min(N,to));render();}
  render();fit();
  dots.forEach(function(d){d.addEventListener('click',function(){go(+d.getAttribute('data-i'))})});
  if(allb)allb.addEventListener('click',function(){setAll(!allOn)});
  if(stg)stg.addEventListener('click',function(){if(!allOn)go(cur>=N?1:cur+1)});   // tap the figure to advance
  var x0=null;
  pn.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
  pn.addEventListener('touchend',function(e){if(x0==null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)go(dx<0?cur+1:cur-1);x0=null},{passive:true});
  panelFits.push(fit);
  if(mqReduce)setAll(true);
});
// re-fit panel heights after fonts load, on resize, and on language change (EN/JP differ in height)
if(panelFits.length){
  var refit=function(){panelFits.forEach(function(f){f()})};
  addEventListener('resize',refit);addEventListener('load',refit);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(refit);
  var st=document.querySelector('.stage');
  if(st&&window.MutationObserver)new MutationObserver(function(){setTimeout(refit,0)}).observe(st,{attributes:true,attributeFilter:['data-lang']});
}
</script>`;
function page(mod,cards,stops){
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">`+
    `<title>${esc(mod.title.en)} — ${esc(mod.standard||'')}</title>${FONTS}<style>${CSS}</style></head><body>`+
    `<div class="stage" data-theme="light" data-lang="en"><div class="progress" id="progress"></div>`+
    topbar({home: mod.home || '../../index.html'})+renderCrumbs(mod)+renderHero(mod)+renderCardMap(stops)+
    `<div class="layout"><main class="stream pager">${cards}</main></div>`+
    `</div>${TOPBAR_SCRIPT}${SCRIPT}</body></html>`;
}

const moduleDir = process.argv[2];
if(!moduleDir){ console.error('usage: node render.js <module-dir>'); process.exit(1); }
const modYmlPath = path.join(moduleDir,'module.yml');
const mod = fs.existsSync(modYmlPath) ? yaml.load(fs.readFileSync(modYmlPath,'utf8')) : { title:{en:path.basename(moduleDir),jp:''}, arc:{pos:1,total:1} };
const assetsDir = path.join(moduleDir,'assets');
const items = fs.readdirSync(path.join(moduleDir,'content')).filter(f=>f.endsWith('.md'))
  .map(f=>({f, ...parseFile(fs.readFileSync(path.join(moduleDir,'content',f),'utf8'))}))
  .sort((a,b)=>((a.meta.order??999)-(b.meta.order??999)) || a.f.localeCompare(b.f));
const stops = buildStops(items);
const stopIx = {}; stops.forEach((s,i)=>{ stopIx[s.id]=i; });
// PAGER: each stop is one page (a card + its prev/next). Dividers are dropped on module pages —
// the hero + breadcrumb already carry the section identity.
const cards = items.map(it=>{
  const i = stopIx[String(it.meta.id)];
  if(i===undefined) return '';                       // skip dividers (not a pager page)
  const html = renderCard(it.meta,it.sections,assetsDir);
  const nav = cardNav(stops[i-1]||null, stops[i+1]||null);
  return `<div class="page" data-id="${esc(it.meta.id)}">${html}${nav}</div>`;
}).filter(Boolean).join('\n');
const outName = process.argv[3] || '_preview.html';   // pass 'index.html' when migration is complete
fs.writeFileSync(path.join(moduleDir,outName), page(mod,cards,stops));
console.log('rendered', items.length, 'card(s),', stops.length, 'stop(s) →', path.join(moduleDir,outName));
