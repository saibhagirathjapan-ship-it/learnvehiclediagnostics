// gen-figures.js — builds every V3 figure from the shared byte-box generator (§7d-4 object
// constancy): the 7F/50/03 sprites are pixel-identical with V1/V2 because they all come from
// bytebox.js with the same constants. Run: node gen-figures.js  (writes assets/figures/*).
const fs = require('fs');
const path = require('path');
const { byteBox, byteRow, BOX_W, BOX_H, GAP } = require('../../_template/bytebox.js');
const OUT = path.join(__dirname, 'assets', 'figures');
const wr = (name, svg) => { fs.writeFileSync(path.join(OUT, name), svg); console.log('wrote', name); };
const svg = (vb, body, label) => `<svg class="dgm" viewBox="0 0 ${vb}" role="img" aria-label="${label}">\n${body}\n</svg>`;
// a right-pointing arrowhead-terminated elbow from (x0,y0) → (x1,y1) via a mid vertical (static).
const elbow = (x0, y0, x1, y1, cls) => {
  const xm = (x0 + x1) / 2;
  return `<path d="M ${x0} ${y0} H ${xm} V ${y1} H ${x1} M ${x1 - 6} ${y1 - 5} L ${x1} ${y1} L ${x1 - 6} ${y1 + 5}" class="${cls}" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
};

// ---------- V3-B-F1 — one request, two possible answers (orienting, static) ----------
// The brief's advance-organizer figure: a request forks to a positive reply (read in V2, muted) and
// a negative reply (this chapter, the FOCAL point — accent band + tag). pos/neg by ✓/✕ glyph, never
// hue (§7d-2). Byte sprites from bytebox.js so 50/03/7F match every other figure.
(function bf1() {
  const reqX = 36, topX = 306, y_top = 46, y_bot = 134;
  const midTop = y_top + BOX_H / 2, midBot = y_bot + BOX_H / 2;
  const jy = (midTop + midBot) / 2;                 // junction sits between the two rows
  const reqY = jy - BOX_H / 2;                       // request row centred on the junction line
  const jx = 250;
  // rows
  const req = byteRow([{ hex: '10', role: 'data' }, { hex: '03', role: 'sub' }], reqX, reqY);
  const pos = byteRow([{ hex: '50', role: 'pos' }, { hex: '03', role: 'sub' }], topX, y_top);
  const neg = byteRow([{ hex: '7F', role: 'neg' }, { hex: '10', role: 'data' }, { hex: '22', role: 'data' }], topX, y_bot);
  const reqMid = reqX + req.width / 2, posMid = topX + pos.width / 2, negMid = topX + neg.width / 2;
  const W = neg.endX + reqX;                          // symmetric right margin
  // focal accent band behind the negative row (the "this chapter" answer)
  const band = `<rect x="${topX - 8}" y="${y_bot - 8}" width="${neg.width + 16}" height="${BOX_H + 16}" class="acc" opacity="0.10"/>`;
  // the POSITIVE branch is FADED (already covered, out of V3's scope) — colours kept, opacity dropped
  // so the eye lands on the negative row below (user 2026-07-11). pos/neg still read by ✓/✕ + band.
  const posBranch = `<g opacity="0.42">` +
    elbow(jx, jy, topX - 6, midTop, 'ln') + pos.svg +
    `<text x="${posMid}" y="${y_top + BOX_H + 20}" text-anchor="middle" class="mut" font-size="11">positive — yes</text>` +
    `</g>`;
  const negBranch =
    elbow(jx, jy, topX - 6, midBot, 'ln') + neg.svg +
    `<text x="${negMid}" y="${y_bot + BOX_H + 22}" text-anchor="middle" class="acc w7" font-size="12">negative — no</text>`;
  const body =
    `<text x="${(reqX + neg.endX) / 2}" y="26" text-anchor="middle" class="ink w7" font-size="15.5">One request, two possible answers</text>` +
    band +
    // request → junction (full weight — the shared input), then fork up (faded) and down (focus)
    `<path d="M ${req.endX + 8} ${jy} H ${jx}" class="ln" stroke-width="1.7" fill="none"/>` +
    `<circle cx="${jx}" cy="${jy}" r="3.2" class="ln plate" stroke-width="1.4"/>` +
    req.svg +
    `<text x="${reqMid}" y="${reqY + BOX_H + 20}" text-anchor="middle" class="mut mono-t" font-size="11">a request</text>` +
    posBranch + negBranch;
  const H = y_bot + BOX_H + 34;
  wr('v3-b-f1_two-answers.svg', svg(`${W} ${H}`, body,
    'One request forks to two possible answers: a faded positive reply 50 03 (already covered) and the negative reply 7F 10 22 (this chapter focus), which carries a reason code.'));
})();

// ---------- V3-C1-F1 — the three bytes of a no, revealed role by role (evolves, 4 stages) ----------
// 7F 10 22 present from stage 1 (object constancy with the brief); each stage lights one byte's role.
// End frame (stage 4 / reduced-motion / Show-all) shows all three role labels → teaches the whole shape.
(function c1f1() {
  // PROGRESSIVE build (user 2026-07-11): stage 1 = the three facts as words; then one byte-box
  // appears per stage (7F → +10 → +22), a faint highlight on the newest box, its labels with it.
  // End frame (stage 4 / reduced-motion) = all three boxes + labels → teaches the whole shape.
  const y = 54, x0 = 96;
  const bx = i => x0 + i * (BOX_W + GAP), bcx = i => bx(i) + BOX_W / 2;
  const endX = bx(2) + BOX_W, W = endX + x0, midX = (x0 + endX) / 2, bottom = y + BOX_H;
  const hd = (s, t) => `<g data-stage="${s}" data-until="${s}"><text x="${midX}" y="22" text-anchor="middle" class="ink w7" font-size="15">${t}</text></g>`;
  const band = (s, i) => `<g data-stage="${s}" data-until="${s}"><rect x="${bx(i) - 6}" y="${y - 6}" width="${BOX_W + 12}" height="${BOX_H + 12}" class="acc" opacity="0.12"/></g>`;
  const box = (s, i, hex, role) => byteBox({ hex, role, x: bx(i), y, stage: s });
  // per-box labels appear WITH the box (its stage) and persist: plain fact word + technical name
  const lbl = (s, i, word, tech, cls) => `<g data-stage="${s}">` +
    `<text x="${bcx(i)}" y="${bottom + 18}" text-anchor="middle" class="mut mono-t" font-size="12">${word}</text>` +
    `<text x="${bcx(i)}" y="${bottom + 34}" text-anchor="middle" class="${cls} mono-t" font-size="10.5">${tech}</text></g>`;
  const body =
    hd(1, 'A refusal must carry three things') +
    hd(2, "7Fh — the 'no' marker") +
    hd(3, 'byte 2 — which (the echoed SID)') +
    hd(4, 'no · which · why — three bytes, one each') +
    // stage 1: the three facts as a single faint line where the boxes will build
    `<g data-stage="1" data-until="1"><text x="${midX}" y="${y + BOX_H / 2 + 6}" text-anchor="middle" class="mut mono-t" font-size="15">no  ·  which  ·  why</text></g>` +
    band(2, 0) + band(3, 1) + band(4, 2) +
    box(2, 0, '7F', 'neg') + box(3, 1, '10', 'data') + box(4, 2, '22', 'data') +
    lbl(2, 0, 'no', 'the marker', 'red') + lbl(3, 1, 'which', 'echoed SID', 'acc') + lbl(4, 2, 'why', 'NRC', 'ink');
  wr('v3-c1-f1_shape-of-no.svg', svg(`${W} ${bottom + 46}`, body,
    'A negative response builds up one byte at a time: 7F the no-marker, then 10 the echoed service identifier saying which request, then 22 the negative response code saying why.'));
})();

// ---------- V3-C1-F2 — three facts don't pack into one byte the way two do (static contrast) ----------
// The load-bearing insight: a yes (50) packs type+which into one byte via +40h; a no keeps no/which/why
// in three separate bytes. Same start x → the 1-box vs 3-box contrast is visible by construction.
// NB: avoid "fold(ed)" in learner-facing text — not universally understood (user 2026-07-12).
(function c1f2() {
  const xBox = 176, yA = 58, yB = 146;
  const pos = byteBox({ hex: '50', x: xBox, y: yA, role: 'pos' });
  const neg = byteRow([{ hex: '7F', role: 'neg' }, { hex: '10', role: 'data' }, { hex: '22', role: 'data' }], xBox, yB);
  const yAc = yA + BOX_H / 2, yBc = yB + BOX_H / 2;
  const yAnn = xBox + BOX_W + 26, nAnn = neg.endX + 26;   // right-side annotation columns (wide layout)
  const W = Math.max(yAnn + 150, nAnn + 172);
  const rowLbl = (y, t) => `<text x="42" y="${y + 5}" class="mut mono-t w7" font-size="11.5">${t}</text>`;
  const dividerY = (yA + BOX_H + yB) / 2 + 2;
  const body =
    `<text x="${W / 2}" y="26" text-anchor="middle" class="ink w7" font-size="15">A yes packs two facts into one byte — a no keeps three apart</text>` +
    // YES — one byte carries two facts (✓ on the box carries "positive"; annotation to the right)
    rowLbl(yAc, 'a yes') + pos +
    `<text x="${yAnn}" y="${yAc - 3}" class="ink mono-t w7" font-size="12">= yes + which</text>` +
    `<text x="${yAnn}" y="${yAc + 16}" class="mut" font-size="10.5">one byte · via +40h</text>` +
    `<path d="M 42 ${dividerY} H ${neg.endX}" class="ln" stroke-width="1" opacity="0.45"/>` +
    // NO — three facts, one byte each (colour-code the three roles inline, paired with the ✕ marker)
    rowLbl(yBc, 'a no') + neg.svg +
    `<text x="${nAnn}" y="${yBc - 3}" class="ink mono-t w7" font-size="12">= <tspan class="red">no</tspan> + <tspan class="acc">which</tspan> + why</text>` +
    `<text x="${nAnn}" y="${yBc + 16}" class="mut" font-size="10.5">three bytes · one each</text>`;
  wr('v3-c1-f2_three-vs-one.svg', svg(`${W} ${yB + BOX_H + 24}`, body,
    'A positive reply 50 packs two facts (positive, and which service) into one byte via +40h; a negative reply 7F 10 22 keeps its three facts — no, which, why — in three separate bytes.'));
})();

// ---------- V3-C2-F1 — the NRC catalog as one 00h..FFh number line, 3 bands (evolves, 3 stages) ------
// Stage 1 = one bar (one shared catalog). Stage 2 = split into 3 bands (00 internal · 01-7F comms ·
// 80-FF specific), grounded in Table A.1's three-range definition. Stage 3 = example codes on the line.
(function c2f1() {
  const x0 = 60, x1 = 524, ybar = 78, hbar = 30, d1 = 88, d2 = 302;   // band dividers
  const bot = ybar + hbar, W = x1 + 40, H = bot + 64;
  const mid00 = (x0 + d1) / 2, midComm = (d1 + d2) / 2, midSpec = (d2 + x1) / 2;
  const codeX = (v, lo, hi, xlo, xhi) => xlo + (v - lo) / (hi - lo) * (xhi - xlo);
  const x11 = codeX(0x11, 1, 0x7F, d1, d2), x22 = codeX(0x22, 1, 0x7F, d1, d2),
        x78 = codeX(0x78, 1, 0x7F, d1, d2), x92 = codeX(0x92, 0x80, 0xFF, d2, x1);
  const div = x => `<line x1="${x}" y1="${ybar}" x2="${x}" y2="${bot}" class="ln" stroke-width="1.6"/>`;
  const bandLbl = (x, l1, l2) => `<text x="${x}" y="${bot + 18}" text-anchor="middle" class="ink mono-t w7" font-size="11">${l1}</text>` +
    `<text x="${x}" y="${bot + 34}" text-anchor="middle" class="mut" font-size="10">${l2}</text>`;
  const chip = (x, hex) => `<line x1="${x}" y1="${ybar}" x2="${x}" y2="${bot}" class="acc-s" stroke-width="1.6"/>` +
    `<text x="${x}" y="${ybar - 8}" text-anchor="middle" class="acc mono-t w7" font-size="10.5">${hex}</text>`;
  const dot = x => `<circle cx="${x}" cy="${ybar - 22}" r="3.1" class="acc"/>`;   // marks a generally-supported code
  const hd = (s, t) => `<g data-stage="${s}" data-until="${s}"><text x="${W / 2}" y="30" text-anchor="middle" class="ink w7" font-size="15">${t}</text></g>`;
  const body =
    hd(1, 'One catalog — every reason lives here') + hd(2, 'Three bands, and every code sits in one') +
    hd(3, 'Some codes work for every service') + hd(4, 'Read the band, then the code') +
    `<rect x="${x0}" y="${ybar}" width="${x1 - x0}" height="${hbar}" class="ln" stroke-width="1.8" fill="none"/>` +
    // stage 1 — the whole range, one strip
    `<g data-stage="1"><text x="${x0}" y="${ybar - 8}" text-anchor="middle" class="mut mono-t" font-size="11">00h</text>` +
    `<text x="${x1}" y="${ybar - 8}" text-anchor="middle" class="mut mono-t" font-size="11">FFh</text></g>` +
    // stage 2 — split into 3 bands (00 shaded faint = never on the wire) + example codes in their bands
    `<g data-stage="2"><rect x="${x0}" y="${ybar}" width="${d1 - x0}" height="${hbar}" class="mut" opacity="0.18"/>` +
    div(d1) + div(d2) + bandLbl(mid00, '00h', 'internal') +
    bandLbl(midComm, '01h–7Fh', 'communication') + bandLbl(midSpec, '80h–FFh', 'specific condition') +
    chip(x11, '11h') + chip(x22, '22h') + chip(x78, '78h') + chip(x92, '92h') + `</g>` +
    // stage 3 — mark which codes are generally supported (a dot on each) + a legend
    `<g data-stage="3">` + dot(x11) + dot(x22) + dot(x78) +
    `<circle cx="${x0 + 6}" cy="${bot + 52}" r="3.1" class="acc"/>` +
    `<text x="${x0 + 15}" y="${bot + 56}" class="acc mono-t w7" font-size="10.5">generally supported by every service</text>` + `</g>`;
  wr('v3-c2-f1_one-catalog.svg', svg(`${W} ${H}`, body,
    'The NRC catalog as one 00h to FFh number line split into three bands (00h internal, 01h to 7Fh communication, 80h to FFh specific conditions), with example codes 11h 22h 78h and 92h placed on the line; 11h, 22h and 78h are marked as generally supported by every service.'));
})();

// ---------- V3-C3-F1 — the structural gate: a request runs a line of checks (evolves, 4 stages) ------
// A gauntlet of ordered gates; the first check to fail deflects the request out with its NRC (§7d: a
// token bouncing off a gate = a rejection). Structural checks only (11/12/13); C4 extends the line.
(function c3f1() {
  const GW = 118, GH = 50, GAPX = 34, y = 56, x0 = 70;
  const gx = i => x0 + i * (GW + GAPX), gmid = i => gx(i) + GW / 2, ymid = y + GH / 2, gb = y + GH;
  const lastR = gx(2) + GW, W = lastR + 162, H = gb + 72;
  const gate = (i, q1, q2) => `<rect x="${gx(i)}" y="${y}" width="${GW}" height="${GH}" class="ln" stroke-width="1.8" fill="none"/>` +
    `<text x="${gmid(i)}" y="${y + 21}" text-anchor="middle" class="ink w7" font-size="12.5">${q1}</text>` +
    `<text x="${gmid(i)}" y="${y + 38}" text-anchor="middle" class="ink w7" font-size="12.5">${q2}</text>`;
  const arrow = (xa, xb, ya, cls) => `<path d="M ${xa} ${ya} H ${xb} M ${xb - 6} ${ya - 5} L ${xb} ${ya} L ${xb - 6} ${ya + 5}" class="${cls}" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const fail = (i, code, reason) => { const x = gmid(i); return `<path d="M ${x} ${gb} V ${gb + 22} M ${x - 5} ${gb + 17} L ${x} ${gb + 22} L ${x + 5} ${gb + 17}" class="red-s" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<text x="${x}" y="${gb + 39}" text-anchor="middle" class="red mono-t w7" font-size="12">${code}</text>` +
    `<text x="${x}" y="${gb + 52}" text-anchor="middle" class="mut" font-size="9">${reason}</text>`; };
  const hd = (s, t) => `<g data-stage="${s}" data-until="${s}"><text x="${W / 2}" y="28" text-anchor="middle" class="ink w7" font-size="15">${t}</text></g>`;
  const body =
    hd(1, 'The ECU checks in a fixed order') + hd(2, 'No such service → stop → 11h') +
    hd(3, 'Wrong sub-function or shape → 12h, 13h') + hd(4, 'Passed all → a real request') +
    // the three structural gates + the ordered flow (stage 1)
    gate(0, 'service', 'known?') + gate(1, 'sub-function', 'known?') + gate(2, 'length &', 'format ok?') +
    `<text x="${(18 + x0 - 2) / 2}" y="${ymid - 10}" text-anchor="middle" class="mut mono-t" font-size="10">request</text>` +
    arrow(18, x0 - 2, ymid, 'ln') + arrow(gx(0) + GW + 2, gx(1) - 2, ymid, 'ln') + arrow(gx(1) + GW + 2, gx(2) - 2, ymid, 'ln') +
    // fail exits — first failing gate emits its code (revealed per step)
    `<g data-stage="2">${fail(0, '11h', 'no such service')}</g>` +
    `<g data-stage="3">${fail(1, '12h', 'no such sub-function')}${fail(2, '13h', 'wrong length/format')}</g>` +
    // pass-through: cleared all three → real & well-formed → the next gate (C4)
    `<g data-stage="4">` + arrow(lastR + 2, lastR + 40, ymid, 'tick') +
    `<circle cx="${lastR + 52}" cy="${ymid}" r="6.5" class="plate tick" stroke-width="1.3"/>` +
    `<path d="M ${lastR + 48.7} ${ymid} l 1.9 2.1 L ${lastR + 55.4} ${ymid - 3}" class="tick" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<text x="${lastR + 64}" y="${ymid - 2}" class="ink w7" font-size="11">real request</text>` +
    `<text x="${lastR + 64}" y="${ymid + 13}" class="mut" font-size="9.5">next gate → C4</text>` + `</g>`;
  wr('v3-c3-f1_structural-gate.svg', svg(`${W} ${H}`, body,
    'A request runs a line of ordered checks: is the service known (fail 11h), is the sub-function known (fail 12h), is the length and format right (fail 13h). The first check to fail stops processing and returns its code; passing all three means a real, well-formed request that moves to the next gate.'));
})();

// ---------- V3-C4-F1 — two kinds of no: the confused pairs, side by side (evolves, 4 stages) ---------
// Left column = "won't work as asked" (11/12/31); right = "not now — change the state" (7F/7E/22). Each
// row is a confused pair (11↔7F, 12↔7E, 31↔22) linked by ≠. A security band (33/24 → M4) closes it.
(function c4f1() {
  const xL = 50, xR = 322, neqX = 292, W = 628;
  const rowY = [80, 118, 156], hy = 40, divY = 180, secY = 200, H = secY + 20;
  const cell = (x, y, hex, cap) =>
    `<rect x="${x}" y="${y - 14}" width="42" height="28" class="ln" stroke-width="1.5" fill="none"/>` +
    `<text x="${x + 21}" y="${y + 5}" text-anchor="middle" class="ink mono-t w7" font-size="13">${hex}</text>` +
    `<text x="${x + 50}" y="${y + 4}" class="mut" font-size="10.5">${cap}</text>`;
  const neq = y => `<text x="${neqX}" y="${y + 5}" text-anchor="middle" class="mut mono-t w7" font-size="15">≠</text>`;
  const rows = [['11h', 'no such service', '7Fh', 'service exists, but wrong session'],
                ['12h', 'no such sub-function', '7Eh', 'sub-function exists, but wrong session'],
                ['31h', 'not that value / ID', '22h', 'right value, wrong moment']];
  const hd = (s, t) => `<g data-stage="${s}" data-until="${s}"><text x="${W / 2}" y="24" text-anchor="middle" class="ink w7" font-size="15">${t}</text></g>`;
  const rowG = (i, s) => `<g data-stage="${s}">${cell(xL, rowY[i], rows[i][0], rows[i][1])}${neq(rowY[i])}${cell(xR, rowY[i], rows[i][2], rows[i][3])}</g>`;
  const body =
    hd(1, 'Understood — but will I do it now?') + hd(2, 'Exists, or not there at all?') +
    hd(3, 'Not that value, or not this moment?') + hd(4, '…and two more: security') +
    // column headers + a faint divider between the two kinds (stage 1)
    `<g data-stage="1"><text x="${xL + 90}" y="${hy}" text-anchor="middle" class="ink w7" font-size="11.5">the request itself is the problem</text>` +
    `<text x="${xR + 138}" y="${hy}" text-anchor="middle" class="acc w7" font-size="11.5">the current ECU state is the problem</text>` +
    `<line x1="${neqX}" y1="${hy + 8}" x2="${neqX}" y2="${rowY[2] + 16}" class="ln" stroke-width="1" opacity="0.4"/></g>` +
    rowG(0, 2) + rowG(1, 2) + rowG(2, 3) +
    // security band (stage 4) — the state refusals that point to M4
    `<g data-stage="4"><path d="M ${xL} ${divY} H ${W - 40}" class="ln" stroke-width="1" opacity="0.5"/>` +
    `<text x="${xL}" y="${secY + 4}" class="mut mono-t w7" font-size="10.5">security:  <tspan class="ink">33h</tspan> locked   ·   <tspan class="ink">24h</tspan> wrong order</text>` +
    `<text x="${W - 40}" y="${secY + 4}" text-anchor="end" class="acc mono-t w7" font-size="10.5">→ M4</text></g>`;
  wr('v3-c4-f1_permission-gate.svg', svg(`${W} ${H}`, body,
    'Two kinds of no shown as confused pairs: left column (won\'t work as asked) 11h no such service, 12h no such sub-function, 31h not that value; right column (not now, change the state) 7Fh and 7Eh exist but wrong session, 22h right value wrong moment; plus a security band with 33h locked and 24h wrong order pointing to M4.'));
})();
