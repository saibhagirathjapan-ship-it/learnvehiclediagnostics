# H3 — What UDS can do, and how the ECU decides · build notes

> **✅ 9→6 RESTRUCTURE DONE 2026-07-07 (session 14).** User rejected C4/C5/C6 as standalone cards.
> Executed: dropped `50-c4-did-rid.md`, `60-c5-server-pipeline.md`, `70-c6-comms-family.md` (+ their figs);
> rewrote C2 (six families + comms-placement leg →V7a/b/c + DID/RID one-liner + security leg); replaced the
> old gating card with a new C3 "The ECU decides what it will serve" (vet → serve/refuse; legs = two gates
> →V5/M4 and where-a-no-is-born →V9); trimmed K; renumbered 00/10/20/30/40/50. Full plan + 6-card table:
> `../STRUCTURE.md` H3 §. **✅ USER-APPROVED 2026-07-07** ("H3 looks good") — all 6 cards signed off, prose
> final. **✅ H3 COMPLETE 2026-07-08** — all 10 real SVGs drawn + geometry-audited (see Figures section below).

**Module:** `wiki/learn/uds-foundation/h3-catalog-and-server/` · breadth spine card 3 of 3.
Answers *what a service is + what makes it diagnostic* (primer), then the catalog (six functional
units), then how the ECU decides. Source of truth = `content/*.md`, rendered by
`_template/render.js` → `index.html`. Design + card flow: `../STRUCTURE.md` (H3 §, 6-card build).

Run:    `NODE_PATH="../../uds/node_modules" node ../../_template/render.js . index.html`
Verify: `node ../../_template/checkmod.js . 3` (3 concepts; DOM counts, overflow, lang, console)

## Card inventory (6 cards — all built)

| order | file | type | id | figure(s) | status |
|-------|------|------|----|-----------|--------|
| 00 | `00-divider.md` | divider | h3 | — | ✅ authored |
| 10 | `10-brief.md` | brief | brief | b-f1 a-whole-menu | ✅ authored · ✅ figure drawn |
| 20 | `20-c1-primer.md` | concept | c1 | c1-f1 capability · c1-f2 primitives-to-diagnosis · c1-f3 provide-vs-use | ✅ user-approved · ✅ figures drawn + **redesigned (session 16)** |
| 30 | `30-c2-functional-units.md` | concept | c2 | c2-f1 six-families · c2-f2 comms-family · c2-f3 security-gate | ✅ user-approved · ✅ figures drawn |
| 40 | `40-c3-decides.md` | concept | c3 | c3-f1 decide-serve-or-refuse · c3-f2 two-gates · c3-f3 no-is-born | ✅ user-approved · ✅ figures drawn |
| 50 | `50-conclusion.md` | conclusion | concl | — | ✅ trimmed (restructure) |

**Status:** 6-card build rendered + `checkmod . 3` green (3 concepts, all bars present, EN-on-load, JP
isolation, zero overflow, 0 console errors). Grep confirms **no stale pipeline terms** (four-stages /
PduR / DSD / DSP) and DID/RID lives only in C2. Forward-pointers verified in the DOM: V7a/b/c (C2 comms
leg), V5 (C3 gates leg), V9 (C3 refusal leg), M2/M5 (DID/RID + primitives). **All 6 cards user-approved 2026-07-07** ("H3 looks good") — prose is
final; the only open H3 item is drawing the 10 real SVGs.

## Bar-coverage carried by H3 (post-restructure)
- **V7a/b/c** ← H3-C2 (comms-family leg: `$10`→V7a / `$11`→V7b / `$3E`→V7c).
- **V5** ← H3-C3 (two-gates leg: session).
- **V9** ← H3-C3 (where-a-no-is-born leg: the ordered gate inside the server).

## Key decisions
- **Primer = the keystone** (derivation `_derive/h3-service-primer-derivation`, 17 agents), user-approved.
  A service = a **named job under one fixed shape**; **diagnostic by purpose** = the *primitives you
  diagnose with* (read faults →M3 · read live data →M2 · test an actuator →M5 · check ECU SW · update ECU
  SW →M6). Non-dup-with-V1: grep lint fence (no primitive-in-ISO-sense/indication/confirmation/SAP/A_*).
- **Restructure (2026-07-07):** C4/C5/C6 failed the OK/NG gate (memory `feedback-prose-and-wording`:
  "earns its place" / detour). DID/RID → a C2 one-liner (→M2/M5); the 4-stage pipeline → V9 depth (only
  the *decision* survives, in C3); the comms family → a C2 leg. Pushback held: the "decide" stays in H3
  (not H2), and C3 now carries V9's breadth bar. C3 title fixed to a concrete declarative (old "Not
  everything is offered at once" was NG-vague).
- **Wording:** authored to `feedback-prose-and-wording` (active voice · no false agency · declarative ·
  concrete answers · reference-don't-re-teach · nothing cryptic). Catalog cards in the "what it means to
  provide `$XX`" voice (`feedback-service-home-and-usecases`).

## Figures — ✅ ALL 10 REAL SVGs DRAWN + GEOMETRY-AUDITED 2026-07-08 (session 15)
`assets/figures/` (10, all `viewBox 0 0 720 …`, `.dgm` theme-aware, no hardcoded colours):
- `h3-b-f1_a-whole-menu` — sealed ECU "holds up" a 5-row service menu; `$10` row highlighted as the one H2 traced.
- `h3-c1-f1_capability` — **(redesigned s16)** "a service = a capability the ECU provides": you ask in plain words → ECU (the provider) → it provides. 3 varied capabilities ("read me the faults" $19→fault list · "get me the engine speed" $22→2400 rpm · "lower the window" $2F→window drops). Caption reframed off "one fixed shape".
- `h3-c1-f2_primitives-to-diagnosis` — **(redesigned s16)** the *primitive* point: 3 atomic primitives (read a fault $19 · read live data $22 · actuator test $2F) converge → **The Diagnosis** (pieces shown fused = "made sense of"). Doctor analogy deferred to the H1 rebuild (spine analogy, not sprung here).
- `h3-c1-f3_provide-vs-use` — **(redesigned s16)** the asymmetry + role-not-box: a small TESTER (ask, then wait) vs a loaded SERVER (recognise → do the job → answer ✓/refuse ✕); bottom band = "'server' is a role, not a box" (one SERVER hat over a small + a large ECU). Leg prose recast to lead with the asymmetry + a {key} on role-not-box.
- `h3-c2-f1_six-families` — 3×2 grid of the six functional units, each with real SIDs + one-line role + footnote.
- `h3-c2-f2_comms-family` — Family #1 container: 3 accent chips ($10/$11/$3E →V7a/b/c) + 2 muted ($27-29→M4, $85→M3).
- `h3-c2-f3_security-gate` — two lanes: READ always-open (green), CHANGE locked behind a padlock unlocked by `$27`.
- `h3-c3-f1_decide-serve-or-refuse` — the gauntlet: 3 checks (session/security/request) → ✓ SERVE, any fail → ✕ REFUSE.
- `h3-c3-f2_two-gates` — risk↔gate: `$22` open anytime (no gate) vs `$34` through session + unlock gates.
- `h3-c3-f3_no-is-born` — inside-the-server flow: CHECK → pass→work→✓ / fail→the "no" is born here → `7F+SID+NRC`; wire decides nothing.

**Audit:** `checkmod . 3` green; per-figure close-ups (light + dark, legs expanded, pager defeated) confirmed §7a —
connectors touch anchors, icons recognizable (warning-triangle/dial/gear/shield-check/download/padlocks), zero overflow,
0 console errors. One fix landed: `h3-c1-f2` wiring label was overrunning the ECU box + actuator glyph read as a sun →
shortened label to "car's own wiring", redrew the gear (6 blocky teeth + hub). **H3 is now fully complete.**
