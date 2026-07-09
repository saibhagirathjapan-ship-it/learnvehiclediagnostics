# V2 — Request & positive response, byte by byte · build notes

**Status (session 23, 2026-07-09): FULLY BUILT on the stepped-story / app-slide model** (locked
[[CONVENTIONS]] §1c + §1f). All 5 cards now on `## story` (concepts) / brief / conclusion. The
session-21 `:::panel`/`continuous:true` build is fully superseded.
- **C1 — DONE + pushed** (session 22): `## story` of **4 steps** (naked bytes → A_PCI → parameters →
  Length/A_PDU), one evolving figure (`v2-c1-f1`), text bulleted, Sources collapsed.
- **C2 (+0x40) — DONE (session 23):** `## story` of **6 steps** — bit-6-free → set it (+0x40, named on
  the spot) → one rule every service (+$2A carve-out) → *computed rule, not a stored field* (2 steps).
  Figure `v2-c2-f1` **evolves** (stage-gated headline + bit `0→1` + `10`→`50`, steps 1–4), then **swaps**
  to `v2-c2-f2` (a rebuilt **rule-vs-field** ✓/✕ contrast, steps 5–6). Footer = the pilot `:::elaborate`
  ("why a rule not a field") + `:::reading`. The long final step was split 5→6 to keep the story
  viewport-fit; residual scroll (desktop 136 / mobile 212 px) is the below-story `:::elaborate` beat.
- **C3 (the echo) — DONE (session 23):** `## story` of **5 steps** — `10`→`50` (+0x40) → `03` echoed +
  *why* (bare `50` ambiguous) → top bit forced 0 (→V4) → the byte split (flag + value, →V4). Figure
  `v2-c3-f1` **evolves** (stage-gated headline; object-constant `50`/`03` sprites), then **swaps** to
  `v2-c3-f2` (byte split). Fits viewport (0 px). "sub-function" named on the spot in step 1 (FB fold).
- **Brief + Conclusion** — reviewed, continuity clean with the rebuilt concepts; already in the LOCKED
  formats (3-part advance-organizer brief; generative `:::recall` conclusion, `62 F1 90` / `50 03`).
- **Verified:** `checkmod . 3` green (3 concepts, EN-on-load, full lang isolation, zero overflow
  light/dark/mobile, no console errors, §7d cast lint) · `_storyshot.js` fit (C1 ≈8 / C2 136 / C3 0 px) ·
  geometry close-ups light+dark for all four concept figures (connectors touch, ✓/✕ semantic glyphs,
  spacing clear). Both **pressure-test gates** ([[feedback-build-pressure-tests]]) run in-persona — fixes
  folded (C3 "sub-function" naming; C2 step split; c2-f2 consequence-column spacing).
- Interaction: plain `‹ ›` arrows + dots · **swipe drag-pan** · **FAB** "Jump to card" · module
  **T-glyph = V** (`kind: V`).

---

**Session-21 record (superseded model — kept for history).** BUILT 2026-07-09 as the **exemplar-rigor
pilot** (§7d visual cast · staged reveal · the synced `:::panel` · §6 motivate-first + name-on-the-spot ·
§4 generative recall + `:::elaborate`). Reading-order slot: V1 ✅ → **V2** → V3.

## Feedback round — bigger figures, prose breaks, brief/concl arrows (session 23, 2026-07-09)

Three user-FB items, all applied + verified:
1. **Illustrations are big / box margins cut a lot.** Template (`blueprint.css`): `.st-stage` padding
   **14→6px**; `.st-fig svg` height cap **31vh→40vh** (mobile 29→37). At the height cap a figure only
   fills the box if its aspect ≥ ~2.33, so figures were widened/tightened: `v2-c1-f1` (x0 66→40, viewBox
   540→488w · 216→194h), `v2-c2-f1` (summary pulled up, 254→226h), and **`v2-c3-f1` REDRAWN horizontal**
   (`10 03 → 50 03` left-to-right; 540×268 vertical → **408×176** wide) so it fills the box instead of
   floating in a tall canvas. All four concept figures now fill the box width; residual dead space is only
   the evolving figures' reserved later-stage band.
2. **Newlines + emphasis.** Added paragraph breaks at natural beats (after a question, between setup and
   payoff) and bolded key parts across C1/C2/C3 story steps (EN + JP).
3. **Side nav arrows on brief + conclusion.** `render.js pageArrows()` adds the same flanking `‹ ›` to the
   brief and conclusion (fixed on desktop, inline on mobile); they move between CARDS. The pager
   (`show()`) hides the end with no card. Verified: brief hides `‹`, conclusion hides `›`, brief `›`→C1.
   New scratch check: `_briefshot.js`.

Fit after the change (`_storyshot.js`): C1 31/16 · **C2 154/237** (residual = the below-story `:::elaborate`
beat) · C3 0/0. checkmod green.

## Card scaffold (matches content/ 1:1 — checked by checkmod)

| # | file | id | type | story | figure(s) |
|---|------|----|------|-------|-----------|
| 1 | 10-brief.md | brief | brief | — (3-part advance-organizer) | v2-b-f1 |
| 2 | 20-c1-pdu.md | c1 | concept | 4 steps | v2-c1-f1 (evolves) |
| 3 | 30-c2-plus40.md | c2 | concept | 6 steps | v2-c2-f1 (evolves, 1–4) → v2-c2-f2 (swap, 5–6) · footer `:::elaborate` |
| 4 | 40-c3-echo.md | c3 | concept | 5 steps | v2-c3-f1 (evolves, 1–4) → v2-c3-f2 (swap, 5) |
| 5 | 50-conclusion.md | concl | conclusion | — | — · 2× generative `:::recall` |

checkmod: 3 concept cards · every concept has a bar figure (`.st-fig svg` counts) · EN-on-load +
lang isolation · zero overflow (light/dark + **mobile 390px**) · zero console errors · **§7d cast
lint green**. Reduced-motion / Show-all: each concept figure freezes at its END stage (figMax) — the
end frame teaches the whole idea (c2-f1 → `50` + summary; c3-f1 → `50 03` + top-bit note).

## Pilot decisions (this module proved the rigors)

- **`:::panel` (NEW, session 21, user-requested).** The two-region synced widget: narration (top) +
  illustration (below) + one control, stepping **together** — the "video beat" on static material.
  `data-stage` = show from step N; `data-until` = hide after step N (toggles, e.g. `10`→`50`).
  **Degrades to scannable prose + end-frame figure** (Show-all / no-JS / reduced-motion) → scanning
  preserved. Piloted on **C2** (bit-flip) + **C3** (echo). Template: `render.js renderPanel` +
  controller · `blueprint.css .panel`. If it reads well, promote to the card contract + retrofit.
- **Staged build-order reveal** piloted on **C1-F1** (PDU assembles field-by-field, click-to-advance).
- **Object constancy:** all byte-boxes from `_template/bytebox.js`; the `50` (pos ✓) and `03` (sub,
  steel-blue) sprites are pixel-identical across C1/C2/C3. Figures are (re)generated by `gen-figures.js`.
- **§7d cast:** tester=ochre object, ECU=`--actor-ecu` steel-blue (≠ olive `--ok`); positive marked by
  a **✓ glyph + olive stroke**, never a hue-fill.
- **Name-on-the-spot** (CONVENTIONS §6, from user FB): A_PCI/A_PDU/A_SDU/+0x40/echo each named the
  instant its plain idea lands (C1 reworked from a deferred-naming draft).
- **4 reveal stages of C1-F1 = the true cl.8.2 decomposition** (address label · A_PCI · parameters ·
  Length), not STRUCTURE's looser "SDU+PCI+params+length" (SDU/params overlap). SDU taught in a leg.

## ISO grounding (all in :::reading footers)
cl.8.2 (A_PDU=A_SDU+A_PCI+params+Length) · cl.8.3 (A_PCI = first byte identifies format, ≠7F) ·
cl.8.4 + Table 2 (SI ranges) · cl.9.3 NOTE (bit 6 = service type; req 0 / pos-rsp 1) ·
cl.9.3.1 Table 16 (SubFunction echoed) · cl.9.2.2 Table 14 (SubFunction byte = SPRMIB bit7 + value).

## Scratch/verify scripts (module-local)
`gen-figures.js` (figure source — reproducible), `_shotstage.js` (staged-fig close-ups),
`_panelshot.js` (panel step shots), `_legshot.js` (leg figures), `_mobilecheck.js` (mobile +
reduced-motion). `assets/_check/*.png` gitignored.

## Round-2 revisions (user feedback 2026-07-09)

- **`:::panel` nav redesigned** — dropped the "Step N/M" wording (wrong mental model) and the ‹ ›
  buttons/counter; now a **dots position-indicator** (clickable) + **tap-the-figure to advance** +
  swipe on mobile. "Show all" kept.
- **Figure no longer jumps** — the panel text region's height is **fixed by JS to the tallest step**
  (re-fit on fonts-ready / resize / language change), so the illustration stays put and elements just
  add/emphasize on a stable canvas. Verified: figure top offset identical at step 1 vs step 4.
- **Byte-box ✓/✕ hygiene fixed (global, `bytebox.js`)** — the positive-tick badge was crowding the hex
  digit; now a small corner badge clear of the digit (HEX_SIZE 21→20, GLYPH_R 9→6). C2 examples: `+0x40`
  moved **above** each arrow (was on the line). Regenerate: `node gen-figures.js`.
- **Continuous-story pilot (no go-deeper legs)** — C1/C2/C3 carry `continuous: true`; former legs render
  as inline `.flowsec` sections (subheading + body + figure), no `<details>`. One continuous read; the
  `:::elaborate` flows inline. See CONVENTIONS §1c PILOT note. **If it lands → default + retrofit backlog.**

## Open / follow-ups
- Judge (with user) whether the **4-beat bar** + **`:::elaborate`** + **`:::panel`** earn a
  MASTER-CHECKLIST lock + a course-wide retrofit of shipped figures/cards.
- If panel is locked: retrofit C1 (currently staged-reveal, not a panel) to a panel? (C1's build-up
  is arguably fine as-is; decide.)
