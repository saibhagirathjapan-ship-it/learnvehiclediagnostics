// make-stubs.js — create lightweight "coming soon" placeholder pages for the drill/pillar
// modules that aren't built yet, so forward-pointer links ({{→ V2 …}}) resolve instead of 404.
// Never overwrites an existing index.html. Run: node _template/make-stubs.js
const fs = require('fs');
const path = require('path');
const { FONTS, topbar, TOPBAR_SCRIPT } = require('./partials.js');   // shared page chrome (FB1)
const ROOT = path.join(__dirname, '..');                       // wiki/learn
const FDN = path.join(ROOT, 'uds-foundation');

// Foundation depth drills (siblings of h1/h2 under uds-foundation/). V7 is split into three
// service-home drills — V7a $10 · V7b $11 · V7c $3E (service-axis restructure, 2026-07-07).
const V = [
  ['v1-service-model','The service model','サービスモデル'],
  ['v2-request-and-response','Request & positive response','リクエストと肯定応答'],
  ['v3-negative-responses','Negative responses & the NRC catalogue','否定応答とNRC一覧'],
  ['v4-subfunctions','Sub-functions & the suppress bit','サブファンクションと抑制ビット'],
  ['v5-sessions','Sessions & the state machine','セッションと状態機械'],
  ['v6-timing','Timing & keep-alive','タイミングとキープアライブ'],
  ['v7a-session-control','$10 DiagnosticSessionControl — the service, whole','$10 診断セッション制御 ― サービスの全体'],
  ['v7b-ecu-reset','$11 ECUReset — the service, whole','$11 ECUリセット ― サービスの全体'],
  ['v7c-tester-present','$3E TesterPresent — keeping a session alive','$3E テスタープレゼント ― セッションを保つ'],
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

function stub(title, jp, cssRel, homeRel, backRel, backLabel){
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
  topbar({ home: homeRel })+
  `<div class="stub"><span class="tag">Coming soon · 準備中</span>`+
  `<h1>${title}</h1><div class="jp">${jp}</div>`+
  `<p>This drill isn't written yet. It's part of the course roadmap and will be built out card by card — check back soon.</p>`+
  `<a class="back" href="${backRel}">← ${backLabel}</a></div></div>`+
  TOPBAR_SCRIPT+
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
// args: (title, jp, cssRel, homeRel [course hub], backRel, backLabel)
H.forEach(([slug,en,jp])=> ensure(path.join(FDN,slug), stub(en,jp,'../../_template/blueprint.css','../../index.html','../index.html','Back to the Foundation map')));
V.forEach(([slug,en,jp])=> ensure(path.join(FDN,slug), stub(en,jp,'../../_template/blueprint.css','../../index.html','../index.html','Back to the Foundation map')));
M.forEach(([slug,en,jp])=> ensure(path.join(ROOT,slug), stub(en,jp,'../_template/blueprint.css','../index.html','../index.html','Back to the course hub')));
console.log(`done: ${made} stub(s) created, ${skipped} existing left untouched.`);
