# H3 — What UDS can do, and how the ECU decides · build notes

> **✅ 9→6 RESTRUCTURE DONE 2026-07-07 (session 14).** User rejected C4/C5/C6 as standalone cards.
> Executed: dropped `50-c4-did-rid.md`, `60-c5-server-pipeline.md`, `70-c6-comms-family.md` (+ their figs);
> rewrote C2 (six families + comms-placement leg →V7a/b/c + DID/RID one-liner + security leg); replaced the
> old gating card with a new C3 "The ECU decides what it will serve" (vet → serve/refuse; legs = two gates
> →V5/M4 and where-a-no-is-born →V9); trimmed K; renumbered 00/10/20/30/40/50. Full plan + 6-card table:
> `../STRUCTURE.md` H3 §. **NOT yet user-read** (C2/C3/K) — expect a wording pass.

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
| 10 | `10-brief.md` | brief | brief | b-f1 a-whole-menu *(placeholder)* | ✅ authored |
| 20 | `20-c1-primer.md` | concept | c1 | c1-f1 service-shape · c1-f2 diagnostic-scene · c1-f3 provide-vs-use *(placeholder)* | ✅ authored + **user-approved** |
| 30 | `30-c2-functional-units.md` | concept | c2 | c2-f1 six-families · c2-f2 comms-family · c2-f3 security-gate *(placeholder)* | ✅ rewritten (restructure) |
| 40 | `40-c3-decides.md` | concept | c3 | c3-f1 decide-serve-or-refuse · c3-f2 two-gates · c3-f3 no-is-born *(placeholder)* | ✅ new (restructure) |
| 50 | `50-conclusion.md` | conclusion | concl | — | ✅ trimmed (restructure) |

**Status:** 6-card build rendered + `checkmod . 3` green (3 concepts, all bars present, EN-on-load, JP
isolation, zero overflow, 0 console errors). Grep confirms **no stale pipeline terms** (four-stages /
PduR / DSD / DSP) and DID/RID lives only in C2. Forward-pointers verified in the DOM: V7a/b/c (C2 comms
leg), V5 (C3 gates leg), V9 (C3 refusal leg), M2/M5 (DID/RID + primitives). Primer trio user-approved;
**C2/C3/K adversarially self-checked but NOT yet user-read** — expect a wording pass.

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

## Figures — ALL PLACEHOLDER (real SVGs are the next H3 task)
`assets/figures/` (10): `h3-b-f1_a-whole-menu` · `h3-c1-f1_service-shape` · `h3-c1-f2_diagnostic-scene` ·
`h3-c1-f3_provide-vs-use` · `h3-c2-f1_six-families` · `h3-c2-f2_comms-family` · `h3-c2-f3_security-gate` ·
`h3-c3-f1_decide-serve-or-refuse` · `h3-c3-f2_two-gates` · `h3-c3-f3_no-is-born`. Each a labelled
dashed-box `.dgm` placeholder. Replace with real schematics (register in `../STRUCTURE.md` §7c) next, then
geometry-audit (light + dark close-ups).
