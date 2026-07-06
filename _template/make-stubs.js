// make-stubs.js — create lightweight "coming soon" placeholder pages for the drill/pillar
// modules that aren't built yet, so forward-pointer links ({{→ V2 …}}) resolve instead of 404.
// Never overwrites an existing index.html. Run: node _template/make-stubs.js
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');                       // wiki/learn
const FDN = path.join(ROOT, 'uds-foundation');

// Foundation depth drills (siblings of h1/h2 under uds-foundation/)
const V = [
  ['v1-service-model','The service model','サービスモデル'],
  ['v2-request-and-response','Request & positive response','リクエストと肯定応答'],
  ['v3-negative-responses','Negative responses & the NRC catalogue','否定応答とNRC一覧'],
  ['v4-subfunctions','Sub-functions & the suppress bit','サブファンクションと抑制ビット'],
  ['v5-sessions','Sessions & the state machine','セッションと状態機械'],
  ['v6-timing','Timing & keep-alive','タイミングとキープアライブ'],
  ['v7-archetypes','The archetype exchanges — $10 & $11','原型のやり取り — $10・$11'],
  ['v8-addressing-transport','Addressing & the transport descent','アドレスと搬送層への降下'],
  ['v9-inside-the-server','Inside the server — the Dcm pipeline','サーバーの内部 — Dcmパイプライン'],
];
// Pillar modules (M2..M9) live one level up, under wiki/learn/
const M = [
  ['uds-data','Data & Identification','データと識別'],
  ['uds-dtc','Fault Memory & DTCs','故障メモリとDTC'],
  ['uds-security','Security & Access','セキュリティとアクセス'],
  ['uds-routines','Routines & I/O Control','ルーチンとI/O制御'],
  ['uds-flash','Reprogramming / Flash','再プログラミング／フラッシュ'],
  ['doip','From CAN to IP: DoIP','CANからIPへ：DoIP'],
  ['web-api','Web APIs in 20 min','20分でWeb API'],
  ['sovd','SOVD — Service-Oriented Vehicle Diagnostics','SOVD ― サービス指向車両診断'],
];

const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600;700&family=Space+Grotesk:wght@500;600;700&family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">';

function stub(title, jp, cssRel, backRel, backLabel){
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">`+
  `<title>${title} — coming soon</title>${FONTS}<link rel="stylesheet" href="${cssRel}">`+
  `<style>.stub{max-width:640px;margin:0 auto;padding:70px 20px 90px;text-align:center}`+
  `.stub .tag{display:inline-block;font-family:var(--f-mono);font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);background:var(--chip);padding:5px 12px;margin-bottom:20px}`+
  `.stub h1{font-family:var(--f-display);font-weight:700;font-size:30px;line-height:1.15;margin:0 0 6px;color:var(--ink)}`+
  `.stub .jp{font-family:var(--f-jp);font-size:17px;color:var(--ink-soft);font-weight:600;margin-bottom:22px}`+
  `.stub p{color:var(--ink-soft);font-size:15.5px;line-height:1.6;margin:0 auto 28px;max-width:52ch}`+
  `.stub a.back{display:inline-flex;align-items:center;gap:8px;text-decoration:none;font-family:var(--f-mono);font-size:13px;font-weight:600;color:var(--on-accent);background:var(--accent);padding:10px 18px}`+
  `.stub a.back:hover{filter:brightness(1.07)}</style></head><body>`+
  `<div class="stage" data-theme="light" data-lang="en">`+
  `<div class="topbar"><div class="topbar-in"><div class="brand"><span class="dot"></span>${title}<span class="std">Automotive Diagnostics</span></div>`+
  `<div class="tb-spacer"></div><div class="tb-ctl"><div class="tb-seg" id="themeseg"><button class="on" data-v="light">Light</button><button data-v="dark">Dark</button></div></div></div></div>`+
  `<div class="stub"><span class="tag">Coming soon · 準備中</span>`+
  `<h1>${title}</h1><div class="jp">${jp}</div>`+
  `<p>This drill isn't written yet. It's part of the course roadmap and will be built out card by card — check back soon.</p>`+
  `<a class="back" href="${backRel}">← ${backLabel}</a></div></div>`+
  `<script>var s=document.getElementById('themeseg'),r=document.querySelector('.stage');s.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;[].forEach.call(s.children,function(x){x.classList.toggle('on',x===b)});r.setAttribute('data-theme',b.dataset.v)});</script>`+
  `</body></html>`;
}

let made=0, skipped=0;
function ensure(dir, html){
  const idx = path.join(dir,'index.html');
  if(fs.existsSync(idx)){ skipped++; return; }
  fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(idx, html);
  made++; console.log('stub →', path.relative(ROOT,idx));
}

// Remaining breadth module (H3) — H1/H2 are built and will be skipped automatically.
const H = [
  ['h3-catalog-and-server','What UDS can do & how the ECU decides','できること／ECUの判断'],
];
H.forEach(([slug,en,jp])=> ensure(path.join(FDN,slug), stub(en,jp,'../../_template/blueprint.css','../index.html','Back to the Foundation map')));
V.forEach(([slug,en,jp])=> ensure(path.join(FDN,slug), stub(en,jp,'../../_template/blueprint.css','../index.html','Back to the Foundation map')));
M.forEach(([slug,en,jp])=> ensure(path.join(ROOT,slug), stub(en,jp,'../_template/blueprint.css','../index.html','Back to the course hub')));
console.log(`done: ${made} stub(s) created, ${skipped} existing left untouched.`);
