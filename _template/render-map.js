// _template/render-map.js — render the Foundation map (the T-shaped module chooser) →
// uds-foundation/index.html. Uses the shared topbar/fonts (partials.js) + the shared design
// system (blueprint.css, inlined) so the map can never drift from the modules (FB1). The map
// data lives in MODS below; cards are rendered server-side (no client JS to build them).
const fs = require('fs');
const path = require('path');
const { esc, FONTS, topbar, TOPBAR_SCRIPT } = require('./partials.js');

const CSS = fs.readFileSync(path.join(__dirname, 'blueprint.css'), 'utf8');
const OUT = path.join(__dirname, '..', 'uds-foundation', 'index.html');

// The Foundation T: 3 breadth bars (H1–H3) over 11 depth drills (V1–V6, V7a/b/c, V8, V9).
// `bar` = which H-bar covers this drill (bar-coverage invariant). `built:true` = a real page
// exists; others resolve to a "coming soon" stub. V7 is split into three service homes (2026-07-07).
const MODS = [
  { id:'H1', kind:'H', slug:'h1-landscape', built:true,
    t_en:'The diagnostics landscape', t_jp:'診断の全体像',
    l_en:'What UDS is, who talks (tester ↔ ECU), and where it sits among the standards.',
    l_jp:'UDSとは何か、誰が話すのか（テスター↔ECU）、標準の中での位置づけ。' },
  { id:'H2', kind:'H', slug:'h2-life-of-a-request', built:true,
    t_en:'The life of one request', t_jp:'1つのリクエストの一生',
    l_en:'Follow one request in and one answer out — then the whole life of a session.',
    l_jp:'1つの要求と1つの応答を追い、続けてセッションの一生をたどる。' },
  { id:'H3', kind:'H', slug:'h3-catalog-and-server',
    t_en:'What UDS can do & how the ECU decides', t_jp:'できること／ECUの判断',
    l_en:'The service catalog (6 units + security), the server, and the comms-management family that holds $10/$11/$3E.',
    l_jp:'サービス一覧（6ユニット＋セキュリティ）、サーバー、そして $10/$11/$3E を束ねる通信管理ファミリ。' },

  { id:'V1', kind:'V', bar:'H1', slug:'v1-service-model',
    t_en:'The service model', t_jp:'サービスモデル',
    l_en:'Primitives, confirmed vs unconfirmed, and the client/server access point.',
    l_jp:'プリミティブ、確認応答の有無、クライアント/サーバーのアクセス点。' },
  { id:'V2', kind:'V', bar:'H2', slug:'v2-request-and-response',
    t_en:'Request & positive response', t_jp:'リクエストと肯定応答',
    l_en:'Byte by byte: the A_PDU, the SID, and the SID + 0x40 rule.',
    l_jp:'バイト単位：A_PDU、SID、そして SID + 0x40 の規則。' },
  { id:'V3', kind:'V', bar:'H2', slug:'v3-negative-responses',
    t_en:'Negative responses & the NRC catalog', t_jp:'否定応答とNRC一覧',
    l_en:'7F + SID + NRC, the single global NRC catalog, and 0x78 responsePending.',
    l_jp:'7F + SID + NRC、共通のNRC一覧、そして 0x78（応答保留）。' },
  { id:'V4', kind:'V', bar:'H2', slug:'v4-subfunctions',
    t_en:'Sub-functions & the suppress bit', t_jp:'サブファンクションと抑制ビット',
    l_en:'The sub-function byte and the suppressPositiveResponse bit (0x80).',
    l_jp:'サブファンクションバイトと、肯定応答抑制ビット（0x80）。' },
  { id:'V5', kind:'V', bar:'H2', slug:'v5-sessions',
    t_en:'Sessions & the state machine', t_jp:'セッションと状態機械',
    l_en:'Default / programming / extended / safety — how sessions gate access.',
    l_jp:'デフォルト/プログラミング/拡張/安全 — セッションによる許可制御。' },
  { id:'V6', kind:'V', bar:'H2', slug:'v6-timing',
    t_en:'Timing & keep-alive', t_jp:'タイミングとキープアライブ',
    l_en:'P2 / P2* / S3 — the deadlines and the session-idle clock.',
    l_jp:'P2 / P2* / S3 — 応答期限とセッションのアイドル時計。' },
  { id:'V7a', kind:'V', bar:'H2', slug:'v7a-session-control',
    t_en:'$10 DiagnosticSessionControl', t_jp:'$10 診断セッション制御',
    l_en:'The service that opens a session, whole — its trace, types, and couplings.',
    l_jp:'セッションを開くサービスの全体 ― トレース・種類・結合。' },
  { id:'V7b', kind:'V', bar:'H2', slug:'v7b-ecu-reset',
    t_en:'$11 ECUReset', t_jp:'$11 ECUリセット',
    l_en:'The service that reboots the ECU — reset types, memory effects, and timing.',
    l_jp:'ECUを再起動するサービス ― リセット種別・メモリ影響・タイミング。' },
  { id:'V7c', kind:'V', bar:'H2', slug:'v7c-tester-present',
    t_en:'$3E TesterPresent', t_jp:'$3E テスタープレゼント',
    l_en:'Why you keep a session alive — presence, the broadcast keep-alive, what lapses lose.',
    l_jp:'なぜセッションを保つのか ― 存在通知、ブロードキャスト保持、失効時に失うもの。' },
  { id:'V8', kind:'V', bar:'H1', slug:'v8-addressing-transport',
    t_en:'Addressing & the transport descent', t_jp:'アドレスと搬送層への降下',
    l_en:'Physical vs functional; ISO-TP frames; DoIP — how the bytes travel.',
    l_jp:'物理/機能アドレス、ISO-TPフレーム、DoIP — バイトの通り道。' },
  { id:'V9', kind:'V', bar:'H3', slug:'v9-inside-the-server',
    t_en:'Inside the server — the Dcm pipeline', t_jp:'サーバーの内部 — Dcmパイプライン',
    l_en:'DSL → DSD → DSP, and the gate where every NRC is born.',
    l_jp:'DSL → DSD → DSP、そして全NRCが生まれる関門。' },
];

function card(m){
  const isV = m.kind === 'V';
  const barTag = isV ? `<span class="tc-bar">bar &uarr; ${esc(m.bar)}</span>` : '';
  const go = m.built
    ? 'read <span class="ar">&rarr;</span>'
    : 'open <span class="ar">&rarr;</span><span class="tc-stub">(content coming)</span>';
  return `<a class="fcard ${isV?'vcard':'hcard'}" href="${esc(m.slug)}/index.html">`+
    `<div class="tc-top"><span class="tc-id">${esc(m.id)}</span>`+
    `<span class="tc-kind">${isV?'DEEP DIVE':'OVERVIEW'}</span>${barTag}</div>`+
    `<h3 class="tc-title"><span class="en">${esc(m.t_en)}</span><span class="jp">${esc(m.t_jp)}</span></h3>`+
    `<p class="tc-line en">${esc(m.l_en)}</p><p class="tc-line jp">${esc(m.l_jp)}</p>`+
    `<span class="tc-go">${go}</span></a>`;
}

const hCards = MODS.filter(m=>m.kind==='H').map(card).join('');
const vCards = MODS.filter(m=>m.kind==='V').map(card).join('');
const nH = MODS.filter(m=>m.kind==='H').length, nV = MODS.filter(m=>m.kind==='V').length;

const crumbs = `<nav class="crumbs" aria-label="Breadcrumb"><div class="crumbs-in"><div class="cr-trail">`+
  `<a href="../index.html">Course</a><span class="cr-sep" aria-hidden="true">›</span>`+
  `<span class="cr-cur" aria-current="page"><span class="en">Foundation</span><span class="jp">基盤</span></span>`+
  `</div></div></nav>`;

const fhero = `<section class="fhero"><div class="kicker">Foundation · 基盤</div>`+
  `<h1><span class="en">The UDS Foundation</span><span class="jp">UDSの基盤</span></h1>`+
  `<p class="ftag en">${nH+nV} single-sitting modules. Read the three across the top for the whole picture; open any of the ${nV} below to go deeper. Pick any card.</p>`+
  `<p class="ftag jp">1回で読み切れる${nH+nV}モジュール。上段の3つを横に読めば全体像、下の${nV}を開けばさらに深く。どのカードからでもどうぞ。</p>`+
  `</section>`;

const guide = `<div class="guide">`+
  `<div class="g-h en">How to learn this map</div><div class="g-h jp">この地図の歩き方</div>`+
  `<div class="g-row">`+
    `<span class="g en"><span class="ar">→</span><span>The three cards across the top are the <b>whole story</b>. Read <b>H1 → H3</b> and you understand the subject at a high level.</span></span>`+
    `<span class="g jp"><span class="ar">→</span><span>上段の3枚が<b>話の全体</b>です。<b>H1 → H3</b> を読めば、高い視点で全体をつかめます。</span></span>`+
  `</div><div class="g-row">`+
    `<span class="g en"><span class="ar">↓</span><span>Each card down the stem <b>goes deeper into one topic</b>. Open any that interest you — they're optional.</span></span>`+
    `<span class="g jp"><span class="ar">↓</span><span>縦の各カードは<b>1つの話題を深く掘り下げます</b>。気になるものを開いてください（任意）。</span></span>`+
  `</div></div>`;

const fmap = `<div class="fmap">${guide}`+
  `<div class="axis breadth"><span class="n">H</span><span class="en">The whole picture · read across →</span><span class="jp">全体像 · 横に読む →</span></div>`+
  `<div class="hbar">${hCards}</div>`+
  `<div class="trunk"></div>`+
  `<div class="axis depth"><span class="n">V</span><span class="en">Go deeper · one topic at a time ↓</span><span class="jp">深掘り · 1つずつ ↓</span></div>`+
  `<div class="vstem">${vCards}</div>`+
  `</div>`;

const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">`+
  `<meta name="viewport" content="width=device-width, initial-scale=1">`+
  `<title>UDS Foundation — the learning map</title>${FONTS}<style>${CSS}</style></head><body>`+
  `<div class="stage" data-theme="light" data-lang="en">`+
  topbar({ home: '../index.html' })+crumbs+fhero+fmap+
  `</div>${TOPBAR_SCRIPT}</body></html>`;

fs.writeFileSync(OUT, html);
console.log('map →', OUT, '·', nH, 'H +', nV, 'V');
