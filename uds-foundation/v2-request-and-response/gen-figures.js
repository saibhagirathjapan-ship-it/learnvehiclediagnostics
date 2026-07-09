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
  const y = 104, x0 = 146;
  // one continuous row of the real reply 50 03 00 32 01 F4. 50 = A_PCI (stage 2); the rest = parameters (stage 3).
  const first = byteBox({ hex: '50', x: x0, y, role: 'data', stage: 2 });
  const rest = byteRow(
    [{ hex: '03', role: 'data', stage: 3 }, { hex: '00', role: 'data', stage: 3 }, { hex: '32', role: 'data', stage: 3 },
     { hex: '01', role: 'data', stage: 3 }, { hex: 'F4', role: 'data', stage: 3 }],
    x0 + BOX_W + GAP, y);
  const rowEnd = rest.endX;          // right edge of the last box
  const cx = (x0 + rowEnd) / 2;
  const pciCx = x0 + BOX_W / 2;
  const parCx = (x0 + BOX_W + GAP + rowEnd) / 2;
  const body =
    `<text x="${cx}" y="34" text-anchor="middle" class="ink w7" font-size="15">A reply is one wrapped unit</text>` +
    // stage 1 — the address label (from V1), riding along
    `<g data-stage="1"><rect x="${cx - 140}" y="52" width="280" height="26" class="tester-s" stroke-width="1.5" fill="none"/>` +
    `<text x="${cx}" y="69" text-anchor="middle" class="mut mono-t" font-size="10.5">Mtype · SA · TA — who ↔ who (from V1)</text></g>` +
    // stage 2 — A_PCI (first byte = the key)
    `<g data-stage="2"><text x="${pciCx}" y="96" text-anchor="middle" class="acc mono-t w7" font-size="11">A_PCI</text></g>` +
    first +
    `<g data-stage="2"><text x="${pciCx}" y="${y + BOX_H + 18}" text-anchor="middle" class="acc" font-size="10.5">first byte = the key</text></g>` +
    // stage 3 — the parameters
    `<g data-stage="3"><text x="${parCx}" y="96" text-anchor="middle" class="mut mono-t w7" font-size="11">parameters</text></g>` +
    rest.svg +
    // stage 4 — the Length brace + the name
    `<g data-stage="4"><path d="M ${x0} ${y + BOX_H + 26} V ${y + BOX_H + 34} H ${rowEnd} V ${y + BOX_H + 26}" class="ln" stroke-width="1.5" fill="none"/>` +
    `<text x="${cx}" y="${y + BOX_H + 52}" text-anchor="middle" class="ink mono-t" font-size="12">Length = 6 bytes</text>` +
    `<text x="${cx}" y="${y + BOX_H + 72}" text-anchor="middle" class="acc w7" font-size="13">= one A_PDU (protocol data unit)</text></g>`;
  const w = rowEnd + x0;   // symmetric margins
  wr('v2-c1-f1_pdu-layout.svg', svg(`${w} 246`, body, 'A reply built up as a PDU: an address label, a control header A_PCI whose first byte is the key, the service parameters, and a Length — together one A_PDU.'));
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
