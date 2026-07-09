// gen-figures.js — builds every V2 figure from the shared byte-box generator (§7d-4 object
// constancy): the `50` and `03` sprites are pixel-identical across C1/C2/C3 because they all
// come from bytebox.js with the same constants. Run: node gen-figures.js  (writes assets/figures/*).
const fs = require('fs');
const path = require('path');
const { byteBox, byteRow, BOX_W, BOX_H, GAP } = require('../../_template/bytebox.js');
const OUT = path.join(__dirname, 'assets', 'figures');
const wr = (name, svg) => { fs.writeFileSync(path.join(OUT, name), svg); console.log('wrote', name); };
const svg = (vb, body, label) => `<svg class="dgm" viewBox="0 0 ${vb}" role="img" aria-label="${label}">\n${body}\n</svg>`;

// ---------- V2-C1-F1 — a reply is a PDU: SDU + PCI + params + length (staged, 4 stages) ----------
(function c1f1() {
  // Step 1's KEY POINT is: the raw bytes have NO SEAMS. So stage 1 headlines that (not "a wrapped
  // unit" — that is the CONCLUSION, saved for stage 4). Bytes are naked from stage 1; the labels then
  // build the seams: A_PCI (2), parameters (3), Length + "one A_PDU" (4). Tight margins → a big figure.
  const y = 92, x0 = 66;
  const first = byteBox({ hex: '50', x: x0, y, role: 'data' });
  const rest = byteRow(
    [{ hex: '03', role: 'data' }, { hex: '00', role: 'data' }, { hex: '32', role: 'data' },
     { hex: '01', role: 'data' }, { hex: 'F4', role: 'data' }],
    x0 + BOX_W + GAP, y);
  const rowEnd = rest.endX;
  const cx = (x0 + rowEnd) / 2;
  const pciCx = x0 + BOX_W / 2;
  const parCx = (x0 + BOX_W + GAP + rowEnd) / 2;
  const body =
    // stage 1 — the naked stream + the "no seams" point (the whole message of this step)
    `<g data-until="1"><text x="${cx}" y="36" text-anchor="middle" class="ink w7" font-size="16">Just a stream — no seams marked</text>` +
    `<text x="${cx}" y="${y + BOX_H + 32}" text-anchor="middle" class="mut" font-size="12.5">where does the service end?   ·   how long is it?</text></g>` +
    first + rest.svg +
    // stage 2 — A_PCI (first byte = the key)
    `<g data-stage="2"><text x="${pciCx}" y="${y - 14}" text-anchor="middle" class="acc mono-t w7" font-size="12">A_PCI</text>` +
    `<text x="${pciCx}" y="${y + BOX_H + 20}" text-anchor="middle" class="acc" font-size="11.5">first byte = the key</text></g>` +
    // stage 3 — the parameters
    `<g data-stage="3"><text x="${parCx}" y="${y - 14}" text-anchor="middle" class="mut mono-t w7" font-size="12">parameters</text></g>` +
    // stage 4 — the Length brace + the wrapped-unit conclusion (now it earns the name)
    `<g data-stage="4"><path d="M ${x0} ${y + BOX_H + 26} V ${y + BOX_H + 34} H ${rowEnd} V ${y + BOX_H + 26}" class="ln" stroke-width="1.5" fill="none"/>` +
    `<text x="${cx}" y="${y + BOX_H + 54}" text-anchor="middle" class="ink mono-t" font-size="13">Length = 6 bytes</text>` +
    `<text x="${cx}" y="36" text-anchor="middle" class="acc w7" font-size="16">= one A_PDU (a wrapped unit)</text></g>`;
  const w = rowEnd + x0;   // symmetric margins
  wr('v2-c1-f1_pdu-layout.svg', svg(`${w} ${y + BOX_H + 74}`, body, 'The reply bytes have no seams at first; a control header A_PCI (first byte = the key), the parameters, and a Length build the seams — together one A_PDU.'));
})();

// ---------- V2-C1-F2 — the recipe: A_PDU = A_SDU + A_PCI (static) ----------
(function c1f2() {
  const y = 66, h = 52;
  const blk = (x, w, cls, big, sub) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${cls}" stroke-width="2" fill="none"/>` +
    `<text x="${x + w / 2}" y="${y + 24}" text-anchor="middle" class="mono-t ink w7" font-size="14">${big}</text>` +
    `<text x="${x + w / 2}" y="${y + 41}" text-anchor="middle" class="mut" font-size="10.5">${sub}</text>`;
  const op = (x, s) => `<text x="${x}" y="${y + 32}" text-anchor="middle" class="acc mono-t w8" font-size="20">${s}</text>`;
  const body =
    `<text x="315" y="34" text-anchor="middle" class="ink w7" font-size="15">Two ingredients make the unit</text>` +
    blk(28, 150, 'ln', 'A_SDU', 'the data handed down') +
    op(196, '+') +
    blk(214, 122, 'acc-s', 'A_PCI', 'the control byte') +
    op(354, '=') +
    blk(372, 214, 'acc-s', 'A_PDU', 'A_PCI + parameters + length') +
    `<rect x="372" y="${y}" width="214" height="4" class="acc"/>`;
  wr('v2-c1-f2_pdu-recipe.svg', svg('614 148', body, 'A_PDU equals A_SDU plus A_PCI: the data handed down, plus the control byte, make one protocol data unit.'));
})();

// ---------- V2-C1-F3 — why the first byte is the key: 7F branches (static) ----------
(function c1f3() {
  // first-byte box on the left; its right edge is the branch anchor.
  const bx = 40, by = 78, bw = 92, bh = 54, ax = bx + bw, ay = by + bh / 2;  // anchor = right-centre
  const outB = (x, y2, cls, t1, t2) =>
    `<rect x="${x}" y="${y2}" width="238" height="46" class="${cls}" stroke-width="1.8" fill="none"/>` +
    `<text x="${x + 14}" y="${y2 + 20}" class="ink mono-t w7" font-size="12">${t1}</text>` +
    `<text x="${x + 14}" y="${y2 + 37}" class="mut" font-size="10.5">${t2}</text>`;
  const topY = 44, botY = 130, ox = 300;
  const topAnchorY = topY + 23, botAnchorY = botY + 23;
  const body =
    `<text x="310" y="26" text-anchor="middle" class="ink w7" font-size="15">Read the first byte first</text>` +
    `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" class="acc-s" stroke-width="2.2" fill="none"/>` +
    `<text x="${bx + bw / 2}" y="${by + 26}" text-anchor="middle" class="acc mono-t w8" font-size="17">1st</text>` +
    `<text x="${bx + bw / 2}" y="${by + 44}" text-anchor="middle" class="mut" font-size="10">byte</text>` +
    // connectors from the anchor to each outcome (touch anchors exactly)
    `<path d="M ${ax} ${ay} H ${(ax + ox) / 2} V ${topAnchorY} H ${ox} M ${ox - 6} ${topAnchorY - 5} L ${ox} ${topAnchorY} L ${ox - 6} ${topAnchorY + 5}" class="ln" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="M ${ax} ${ay} H ${(ax + ox) / 2} V ${botAnchorY} H ${ox} M ${ox - 6} ${botAnchorY - 5} L ${ox} ${botAnchorY} L ${ox - 6} ${botAnchorY + 5}" class="red-s" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<text x="${(ax + ox) / 2 + 6}" y="${topAnchorY - 8}" class="mut mono-t" font-size="10.5">≠ 7F</text>` +
    `<text x="${(ax + ox) / 2 + 6}" y="${botAnchorY + 20}" class="red mono-t" font-size="10.5">= 7F</text>` +
    outB(ox, topY, 'ln', 'normal message', 'read as a service + its data') +
    outB(ox, botY, 'red-s', 'negative response', 'a refusal → V3');
  wr('v2-c1-f3_first-byte-key.svg', svg('578 190', body, 'The first byte decides the format: any value other than 7F is a normal message, 7F alone flags a negative response.'));
})();

// ---------- V2-C2-F1 — positive response flips bit 6: 10 → 50 (panel, 4 steps) ----------
// data-until = hide after step N; data-stage = show from step N. The 10 box gives way to 50; bit 6
// toggles 0→1; step 4 names +0x40 and generalises.
(function c2f1() {
  const cw = 40, gap = 6, y = 66, h = 44, x0 = 44, bx = 452;   // 8 bit cells, then "=", then the hex box
  const bitsOf10 = [0, 0, 0, 1, 0, 0, 0, 0];                    // b7..b0 for 0x10 (bit 4 set)
  const cx = i => x0 + i * (cw + gap);
  let cells = '';
  for (let i = 0; i < 8; i++) {
    const bitNo = 7 - i, x = cx(i), isFlip = (bitNo === 6);
    cells += `<rect x="${x}" y="${y}" width="${cw}" height="${h}" class="${isFlip ? 'acc-s' : 'ln'}" stroke-width="${isFlip ? 2.4 : 1.6}" fill="none"/>`;
    if (!isFlip) {
      cells += `<text x="${x + cw / 2}" y="${y + h / 2 + 6}" text-anchor="middle" class="${bitsOf10[i] ? 'ink' : 'mut'} mono-t" font-size="18">${bitsOf10[i]}</text>`;
    } else {
      cells += `<g data-until="2"><text x="${x + cw / 2}" y="${y + h / 2 + 6}" text-anchor="middle" class="mut mono-t" font-size="18">0</text></g>`;
      cells += `<g data-stage="3"><rect x="${x + 2}" y="${y + 2}" width="${cw - 4}" height="${h - 4}" class="acc" opacity="0.16"/>` +
        `<text x="${x + cw / 2}" y="${y + h / 2 + 6}" text-anchor="middle" class="acc mono-t w8" font-size="18">1</text></g>`;
    }
    cells += `<text x="${x + cw / 2}" y="${y + h + 15}" text-anchor="middle" class="mut" font-size="9.5">bit ${bitNo}</text>`;
  }
  // bit-6 callout: "unused / free" (steps 2) then "set → +0x40" (step 3), on a padded lane below
  const b6cx = cx(1) + cw / 2, calY = y + h + 42;
  const callout =
    `<g data-stage="2" data-until="2"><path d="M ${b6cx} ${y + h + 22} V ${calY - 12}" class="acc-s" stroke-width="1.4"/>` +
    `<text x="${b6cx}" y="${calY}" text-anchor="middle" class="acc mono-t" font-size="11">unused — free</text></g>` +
    `<g data-stage="3"><path d="M ${b6cx} ${y + h + 22} V ${calY - 12}" class="acc-s" stroke-width="1.4"/>` +
    `<text x="${b6cx}" y="${calY}" text-anchor="middle" class="acc mono-t w7" font-size="11">set it</text></g>`;
  // the hex box: 10 (until step 2) becomes 50 (from step 3), same spot
  const hy = y + (h - 50) / 2;
  const box10 = `<g data-until="2">${byteBox({ hex: '10', x: bx, y: hy, role: 'data' })}</g>`;
  const box50 = `<g data-stage="3">${byteBox({ hex: '50', x: bx, y: hy, role: 'pos' })}</g>` +
    `<g data-stage="3"><text x="${bx + 29}" y="${hy + 50 + 17}" text-anchor="middle" class="acc mono-t w7" font-size="12">= 10 + 0x40</text></g>`;   // name it, on the spot
  const eq = `<text x="430" y="${y + h / 2 + 7}" text-anchor="middle" class="mut mono-t w8" font-size="20">=</text>`;
  // step 4 — generalise: how to READ any first byte, plus the worked pairs
  const sumY = y + h + 96;
  const summary =
    `<g data-stage="4"><path d="M 44 ${sumY - 28} H 520" class="ln" stroke-width="1"/>` +
    `<text x="282" y="${sumY}" text-anchor="middle" class="ink w7" font-size="13.5">bit 6 = 0 → a request      bit 6 = 1 → its positive reply</text>` +
    `<text x="282" y="${sumY + 22}" text-anchor="middle" class="acc mono-t w7" font-size="12.5">22 → 62   ·   3E → 7E   ·   27 → 67</text></g>`;
  // stage-gated headline: tracks THIS step's point, never the card conclusion (§1c)
  const hd = (stg, txt) => `<g data-stage="${stg}" data-until="${stg}"><text x="282" y="30" text-anchor="middle" class="ink w7" font-size="15">${txt}</text></g>`;
  const hd4 = `<g data-stage="4"><text x="282" y="30" text-anchor="middle" class="ink w7" font-size="15">One rule, every service</text></g>`;
  const headline = hd(1, 'Make 10 into its own answer — for free') + hd(2, 'Bit 6 is never used — it is free') + hd(3, 'Set bit 6: 10 becomes 50') + hd4;
  const body = headline + cells + eq + box10 + box50 + callout + summary;
  wr('v2-c2-f1_plus-0x40-bitflip.svg', svg('564 254', body, 'The request byte 10 in bits has bit 6 unused; setting bit 6 makes the byte 50 — that fixed step is +0x40, and it works for every service.'));
})();

// ---------- V2-C2-F2 — a computed RULE vs a stored type FIELD (static contrast, step 5) ----------
// The deeper why: +0x40 is derived from the request, not a byte the ECU stores. Contrast the two designs
// so the consequences (free · unambiguous · can't lie) are visible, using ✓/✕ glyphs (§7d-2), not hue.
(function c2f2() {
  const arrow = (x0, x1, y, cls) => `<path d="M ${x0} ${y} H ${x1} M ${x1 - 6} ${y - 5} L ${x1} ${y} L ${x1 - 6} ${y + 5}" class="${cls}" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const mark = (x, y, ok, txt) => {
    const c = ok ? 'tick' : 'cross';
    let g = `<circle cx="${x}" cy="${y - 4}" r="7" class="plate ${c}" stroke-width="1.3"/>`;
    g += ok
      ? `<path d="M ${x - 3.1} ${y - 4} l 1.9 2.1 L ${x + 3.4} ${y - 7}" class="${c}" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
      : `<path d="M ${x - 2.7} ${y - 6.7} l 5.4 5.4 M ${x + 2.7} ${y - 6.7} l -5.4 5.4" class="${c}" stroke-width="1.6" stroke-linecap="round"/>`;
    g += `<text x="${x + 13}" y="${y}" class="ink" font-size="12">${txt}</text>`;
    return g;
  };
  const rowLbl = (y, t) => `<text x="30" y="${y}" class="mut mono-t w7" font-size="10.5">${t}</text>`;
  const txX = 320;   // consequences column — clear of the 50 box's right edge (300) + its corner glyph
  // Row A — THE RULE: 10 --set bit 6--> 50, derived
  const ay = 66, aMid = ay + BOX_H / 2;
  const rowA =
    rowLbl(ay - 14, 'THE RULE — UDS') +
    byteBox({ hex: '10', x: 118, y: ay, role: 'data' }) +
    arrow(118 + BOX_W + 6, 236, aMid, 'ln') +
    `<text x="${(118 + BOX_W + 6 + 236) / 2}" y="${aMid - 9}" text-anchor="middle" class="acc mono-t" font-size="10.5">set bit 6</text>` +
    byteBox({ hex: '50', x: 242, y: ay, role: 'pos' }) +
    mark(txX, ay + 12, true, 'costs no extra byte') +
    mark(txX, ay + 40, true, 'always agrees with the SID');
  // Row B — A TYPE FIELD: 10 + [type] --> 50, stored
  const by = 168, bMid = by + BOX_H / 2;
  const typeX = 132;
  const rowB =
    rowLbl(by - 14, 'A STORED FIELD') +
    byteBox({ hex: '10', x: 44, y: by, role: 'data' }) +
    `<text x="${44 + BOX_W + 11}" y="${bMid + 6}" text-anchor="middle" class="mut mono-t w8" font-size="18">+</text>` +
    `<rect x="${typeX}" y="${by}" width="${BOX_W}" height="${BOX_H}" class="plate cross" stroke-width="2.2" stroke-dasharray="5 4"/>` +
    `<text x="${typeX + BOX_W / 2}" y="${by + BOX_H / 2 + 5}" text-anchor="middle" class="mut mono-t" font-size="12">type</text>` +
    arrow(typeX + BOX_W + 6, 236, bMid, 'ln') +
    byteBox({ hex: '50', x: 242, y: by, role: 'data' }) +
    mark(txX, by + 12, false, 'one extra byte, every message') +
    mark(txX, by + 40, false, 'could disagree with the SID');
  const body =
    `<text x="280" y="30" text-anchor="middle" class="ink w7" font-size="15">Computed each time — not stored as a byte</text>` +
    rowA + rowB;
  wr('v2-c2-f2_rule-not-field.svg', svg('586 244', body, 'A computed +0x40 rule derives the answer SID from the request for free and can never contradict it; a stored type field would cost one byte per message and could disagree with the SID.'));
})();

// ---------- V2-C3-F1 — 10 03 comes back as 50 03 (panel, 4 steps) ----------
(function c3f1() {
  const svcX = 214, subX = svcX + BOX_W + GAP, reqY = 66, rspY = 172;
  const svcCx = svcX + BOX_W / 2, subCx = subX + BOX_W / 2, midY = (reqY + BOX_H + rspY) / 2;
  const req = byteBox({ hex: '10', x: svcX, y: reqY, role: 'data', stage: 1 }) + byteBox({ hex: '03', x: subX, y: reqY, role: 'sub', stage: 1 });
  const rsp = byteBox({ hex: '50', x: svcX, y: rspY, role: 'pos', stage: 2 }) + byteBox({ hex: '03', x: subX, y: rspY, role: 'sub', stage: 3 });
  const dArrow = (cx, cls) => `<path d="M ${cx} ${reqY + BOX_H + 4} V ${rspY - 5} M ${cx - 5} ${rspY - 11} L ${cx} ${rspY - 5} L ${cx + 5} ${rspY - 11}" class="${cls}" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const svcArrow = `<g data-stage="2">${dArrow(svcCx, 'acc-s')}<text x="${svcCx - 9}" y="${midY + 4}" text-anchor="end" class="acc mono-t" font-size="11">+0x40</text></g>`;
  const subArrow = `<g data-stage="3">${dArrow(subCx, 'ecu-s')}<text x="${subCx + 9}" y="${midY + 4}" class="ecu mono-t" font-size="11">echoed</text></g>`;
  const labels =
    `<text x="${svcX - 16}" y="${reqY + 30}" text-anchor="end" class="mut mono-t" font-size="11">you send</text>` +
    `<text x="${svcX - 16}" y="${rspY + 30}" text-anchor="end" class="mut mono-t" font-size="11">you get</text>` +
    `<text x="${svcCx}" y="${reqY - 12}" text-anchor="middle" class="mut" font-size="10">service</text>` +
    `<text x="${subCx}" y="${reqY - 12}" text-anchor="middle" class="mut" font-size="10">sub-function</text>`;
  const s4 = `<g data-stage="4"><path d="M ${subCx} ${rspY + BOX_H + 4} V ${rspY + BOX_H + 12}" class="acc-s" stroke-width="1.3"/>` +
    `<text x="${subCx}" y="${rspY + BOX_H + 26}" text-anchor="middle" class="acc mono-t" font-size="10.5">top bit forced to 0 — a flag → V4</text></g>`;
  // stage-gated headline — tracks each step's point, not the conclusion (§1c)
  const hd = (stg, txt) => `<g data-stage="${stg}" data-until="${stg}"><text x="270" y="30" text-anchor="middle" class="ink w7" font-size="15">${txt}</text></g>`;
  const headline = hd(1, 'You send 10 03 — what comes back?') + hd(2, '10 returns as 50   (+0x40)') + hd(3, '03 comes straight back — echoed') + hd(4, 'The top bit comes back 0');
  const body = headline + labels + req + rsp + svcArrow + subArrow + s4;
  wr('v2-c3-f1_echoed-subfn.svg', svg('540 268', body, 'The request 10 03 returns as 50 03: service 10 becomes 50 by +0x40, and the sub-function 03 is echoed back unchanged except its top bit forced to 0.'));
})();

// ---------- V2-C3-F2 — the sub-function byte split: top-bit flag + value (static) ----------
(function c3f2() {
  const y = 54, h = 52, x0 = 70, w1 = 96, w2 = 236;
  const body =
    `<text x="252" y="30" text-anchor="middle" class="ink w7" font-size="14">One byte, two jobs</text>` +
    `<rect x="${x0}" y="${y}" width="${w1}" height="${h}" class="acc-s" stroke-width="2" fill="none"/>` +
    `<text x="${x0 + w1 / 2}" y="${y + 22}" text-anchor="middle" class="acc mono-t w7" font-size="12">bit 7</text>` +
    `<text x="${x0 + w1 / 2}" y="${y + 40}" text-anchor="middle" class="mut" font-size="10.5">a flag</text>` +
    `<rect x="${x0 + w1}" y="${y}" width="${w2}" height="${h}" class="ecu-s" stroke-width="2" fill="none"/>` +
    `<text x="${x0 + w1 + w2 / 2}" y="${y + 22}" text-anchor="middle" class="ecu mono-t w7" font-size="12">bits 6–0</text>` +
    `<text x="${x0 + w1 + w2 / 2}" y="${y + 40}" text-anchor="middle" class="mut" font-size="10.5">the value (here 03)</text>` +
    `<text x="252" y="${y + h + 26}" text-anchor="middle" class="mut" font-size="11.5">On the echo the flag is 0; what it means when set is V4's story.</text>`;
  wr('v2-c3-f2_subfn-byte.svg', svg('504 156', body, 'The sub-function byte splits into a top-bit flag and the lower seven value bits; on the echoed reply the flag is 0.'));
})();
