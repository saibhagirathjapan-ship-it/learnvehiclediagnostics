// _template/bytebox.js — the ONE shared byte-box SVG generator (§7d-4, object constancy).
// A given byte renders PIXEL-IDENTICAL wherever it appears because every figure builds its boxes
// from THIS function with THESE constants — no figure hand-draws its own. It is a Node authoring
// module: emit the <g> markup and paste it into the hand-authored .svg, so render.js keeps reading
// static figure files. Roles map to the §7d visual-cast classes (blueprint.css .dgm block).
//
//   const {byteRow, byteBox} = require('../_template/bytebox.js');
//   byteRow([{hex:'50',role:'pos',cap:'positive',stage:2},{hex:'03',role:'sub',cap:'session',stage:2}], 120, 60)
//
const BOX_W = 58, BOX_H = 50, RADIUS = 0, GAP = 12, STROKE = 2.4;
const HEX_SIZE = 20, CAP_SIZE = 11, CAP_GAP = 16, GLYPH_R = 6;

// role → dgm classes (stroke of the box · hex-text colour · fill) + optional corner glyph.
// Positive/negative are signalled by a ✓/✕ glyph + stroke, NEVER by re-using a hue (§7d-2).
const ROLE = {
  sid:  { stroke: 'acc-s',    hex: 'acc' },   // service id — the ochre accent
  pos:  { stroke: 'tick',     hex: 'ink', glyph: 'pos' },   // positive response — ✓ + olive stroke
  neg:  { stroke: 'cross',    hex: 'ink', glyph: 'neg' },   // negative — ✕ + red stroke
  sub:  { stroke: 'ecu-s',    hex: 'ecu' },   // sub-function value (echoed by the ECU)
  data: { stroke: 'ln',       hex: 'ink' },   // plain payload byte
  mut:  { stroke: 'ln',       hex: 'mut' },   // muted / placeholder
};
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// one byte box, top-left at (x,y). cap = a small centred label below. stage = data-stage index
// (for the click-to-advance reveal, §7d-5). Returns a <g> string.
function byteBox({ hex, x, y, role = 'data', cap = '', stage }) {
  const r = ROLE[role] || ROLE.data;
  const cx = x + BOX_W / 2;
  const st = stage != null ? ` data-stage="${stage}"` : '';
  let g = `<g${st}>`;
  g += `<rect x="${x}" y="${y}" width="${BOX_W}" height="${BOX_H}" rx="${RADIUS}" class="plate ${r.stroke}" stroke-width="${STROKE}"/>`;
  g += `<text x="${cx}" y="${y + BOX_H / 2 + HEX_SIZE * 0.34}" text-anchor="middle" class="${r.hex} mono-t" font-size="${HEX_SIZE}">${esc(hex)}</text>`;
  // pos/neg glyph: a SMALL badge tucked into the top-right corner, sized + placed to clear the
  // centred hex digit (§7a: nothing touches — verified by close-up). One shared placement for both.
  const gx = x + BOX_W - GLYPH_R - 3, gy = y + GLYPH_R + 3;
  if (r.glyph === 'pos') {
    g += `<circle cx="${gx}" cy="${gy}" r="${GLYPH_R}" class="plate tick" stroke-width="1.3"/>`;
    g += `<path d="M ${gx - 2.7} ${gy} l 1.7 1.9 L ${gx + 3} ${gy - 2.6}" class="tick" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  } else if (r.glyph === 'neg') {
    g += `<circle cx="${gx}" cy="${gy}" r="${GLYPH_R}" class="plate cross" stroke-width="1.3"/>`;
    g += `<path d="M ${gx - 2.4} ${gy - 2.4} l 4.8 4.8 M ${gx + 2.4} ${gy - 2.4} l -4.8 4.8" class="cross" stroke-width="1.5" stroke-linecap="round"/>`;
  }
  if (cap) g += `<text x="${cx}" y="${y + BOX_H + CAP_GAP}" text-anchor="middle" class="mut" font-size="${CAP_SIZE}">${esc(cap)}</text>`;
  g += `</g>`;
  return g;
}

// a left→right row of boxes from (x,y). bytes: [{hex,role,cap,stage}]. Returns {svg,width,endX}.
function byteRow(bytes, x, y) {
  let g = '', cx = x;
  bytes.forEach(b => { g += byteBox({ ...b, x: cx, y }); cx += BOX_W + GAP; });
  return { svg: g, width: cx - GAP - x, endX: cx - GAP };
}

module.exports = { BOX_W, BOX_H, RADIUS, GAP, STROKE, HEX_SIZE, byteBox, byteRow };
