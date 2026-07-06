# H1 — The diagnostics landscape · build notes

**Module:** `wiki/learn/uds-foundation/h1-landscape/` · breadth spine card 1 of 3 (covers the
**V1** and **V8** bars). Source of truth = `content/*.md`, rendered by `_template/render.js` →
`index.html`. The Foundation map's H1 card links here.

Run: `NODE_PATH="../../uds/node_modules" node ../../_template/render.js . index.html`
Verify: `NODE_PATH="../../uds/node_modules" node verify.js`

## Card inventory (status ✅ done)

| order | file | type | figure(s) | status |
|-------|------|------|-----------|--------|
| 00 | `00-divider.md` | divider | — | ✅ |
| 10 | `10-brief.md` | brief | brief-hero (NEW storyboard) | ✅ **signed off (s7)** · paras+numbered steps+key+reading; dashboard→tester→ECUs |
| 20 | `20-c1-what-uds-is.md` | concept | c1-client-server (NEW anim); c1-shared-dictionary (rebuilt) | ✅ **rebuilt (s7)** · V1 bar · key bullets + footer reading |
| 30 | `30-c2-family.md` | concept | c2-family-map (job-grouped, NEW s7); c2-adapters (NEW s7); c2-neighbours (rebuilt s7) | ✅ **rebuilt to s7 bar** · bar caption + reading footer |
| 40 | `40-c3-top-of-stack.md` | concept | c3-osi-stack (rebuilt s7); c3-addressing (NEW s7) | ✅ **rebuilt to s7 bar** · V8 bar · OSI stack (distinct from C2) + addressing leg + forward-pointer `{{→ V8}}` |
| 50 | `50-conclusion.md` | conclusion | — | ✅ recap + "you can now…" + `:::recall` + →H2 |

**s7 bar = the new card standard** (conscious bullets · semantic markers · compact `:::reading` in a
concept `## footer` · self-drawn storyboard figure representing the key teaching · §7a geometry + padding).
C2/C3 were built before s7 and should be brought up to it when revisited.

## Figures (`assets/figures/`)
- `brief-hero.svg` — NEW (s7). Storyboard: instrument cluster + glowing check-engine glyph (gradient
  glow) → tester → OBD-II → ECU chips (engine flagged); request pulse rides cable→port→bus (SMIL).
- `c1-client-server.svg` — NEW (s7). CLIENT↔SERVER exchange; **sequenced** pulses (request 0–45%,
  response 50–95%) so the ECU is seen to answer *after* — never first.
- `c1-shared-dictionary.svg` — rebuilt (s7) to named-anchor geometry (arrows touch box→panel).
- `c3-osi-stack.svg` — adapted from legacy (pre-s7).
- `c2-family-map.svg` — NEW (s6). Part 1/2 + continuous **−3…−7** transport chips.
- `c2-neighbours.svg` — NEW (s6). UDS centre; Dcm/Dem · ODX/SOVD/J1939/Dlt.
- (`brief-car.webp` = user-supplied car photo, now UNUSED after the storyboard replaced it — safe to delete.)

## Verification (browser-driven, `verify.js`)
- 3 concept + 1 brief + 1 conclusion + 1 divider; 5 figures (all with rendered text); 1 recall; 5 legs.
- EN on load; lang toggle isolates (EN→0 JP, JP→0 EN); zero overflow + zero console errors in
  light / dark / EN+JP / mobile. Screenshots in `assets/verify-*.png`.

## Clause grounding (documents-first re-derivation, session 6 — workflow `rederive-h1`)
All 25 claims verified against `local notes/`. Key anchors:
- UDS = ISO 14229-1 application layer / OSI layer 7; client=tester, server=ECU — **the standard's
  own wording** (14229-1 Intro; "diagnostic tester (client) … ECU, server").
- Family/OSI map = 14229-1 Introduction **Table 1** (lines ~209–217): -1 app · -2 session (layer 5)
  · **-3 CAN / -4 FR / -5 IP(DoIP) / -6 K-Line / -7 LIN** transport · transport/net = 15765-2 &
  13400-2 · data-link/phys = 11898-1 (CAN) / IEEE 802.3 (Ethernet).
- Addressing (14229-1 A_TA, cl.~7.4.1.4/8.7.1): physical = point-to-point (1 ECU); functional =
  broadcast (1..n); **A_SA of response = A_TA of request when physical** → responses always physical.
- Dcm = Diagnostic Communication Manager (runs UDS); Dem = Diagnostic Event Manager (fault memory)
  — AUTOSAR `AUTOSAR Dcm` / `AUTOSAR Dem`. ODX (ISO 22901) / SOVD (ISO 17978) are
  **out-of-vault** (no txt sidecar) → training-grounded, flagged.

Corrections applied this session: (1) Part 4 FlexRay restored in C2 (prose + figure); (2) recall
softened re **ResponseOnEvent ($86)**.

## Open / deferred
- Recap in `50-conclusion.md` lists 4 example wires ("CAN, IP, K-Line or LIN") under the complete
  range "Parts 3–7" — intentional (illustrative examples, no number gap). Leave.
- Pedagogy note (non-blocking): C3 bar "transport" already distinguishes transport layer vs physical
  bus in prose; no change needed.
- H1 has **no back-to-map / footer provenance** link yet (modnav prev = disabled). Consider a
  map link when wiring the breadth spine H1→H2→H3.
