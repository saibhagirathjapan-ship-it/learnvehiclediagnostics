# H3 — What UDS can do, and how the ECU decides · build notes

**Module:** `wiki/learn/uds-foundation/h3-catalog-and-server/` · breadth spine card 3 of 3.
Answers *what a service is + what makes it diagnostic* (primer), then the catalog (six functional
units), then how the ECU decides. Source of truth = `content/*.md`, rendered by
`_template/render.js` → `index.html`. Design + card flow: `../STRUCTURE.md` (H3 §, LOCKED 2026-07-07).

Run:    `NODE_PATH="../../uds/node_modules" node ../../_template/render.js . index.html`
Verify: `node ../../_template/checkmod.js . <expectConcepts>` (DOM counts, overflow, lang, console)

## Card inventory (9 planned; 3 built — divider + brief + primer)

| order | file | type | id | figure(s) | status |
|-------|------|------|----|-----------|--------|
| 00 | `00-divider.md` | divider | h3 | — | ✅ authored |
| 10 | `10-brief.md` | brief | brief | b-f1 a-whole-menu *(placeholder)* | ✅ authored |
| 20 | `20-c1-primer.md` | concept | c1 | c1-f1 service-shape · c1-f2 diagnostic-scene · c1-f3 provide-vs-use *(all placeholder)* | ✅ authored + approved |
| — | C2 six functional units | concept | c2 | tbd | ⬜ next |
| — | C3 session/security gating | concept | c3 | tbd | ⬜ |
| — | C4 DID/RID coordinate spaces | concept | c4 | tbd | ⬜ |
| — | C5 the server pipeline (route→link→dispatch→process) | concept | c5 | tbd | ⬜ |
| — | C6 comms-management family ($10/$11/$3E) | concept | c6 | tbd | ⬜ |
| — | K conclusion | conclusion | concl | — | ⬜ |

**DOM now (checkmod . 1):** 1 concept · 1 brief · 1 divider · EN on load · JP isolation · no overflow ·
0 console errors · lists render indented.

## Key decisions (primer, 2026-07-07)
- **Primer = the keystone** (derivation `_derive/h3-service-primer-derivation`, 17 agents). Teaches: a
  service = a **named job under one fixed shape**; **diagnostic by purpose** = the *primitives you
  diagnose with* (read faults →M3 · read live data →M2 · test an actuator →M5 · check ECU SW · update ECU
  SW →M6). Non-dup-with-V1: grep lint fence (no primitive-in-ISO-sense/indication/confirmation/SAP/A_*).
- **Leg A ("fixed shape byte-by-byte") DROPPED** — re-taught H2 (H2-C1/C2/C3 own byte anatomy). Primer is
  **2 legs**: diagnostic primitives · what it means to *provide* (two roles). The bar states the shape as
  a **generalisation** ("every service, one shape") and **references** H2's SID/±reply, never re-derives.
- **Wording:** authored to `feedback-prose-and-wording` (active voice · no false agency · declarative ·
  concrete answers · reference-don't-re-teach · nothing cryptic). Catalog cards C2–C6 to be written in the
  "what it means to provide `$XX`" voice (`feedback-service-home-and-usecases`).
- **Verification:** a 4-agent holistic check (`h3-primer-holistic-check`) run before showing the user
  found 1 blocker (re-derived SID) + 3 nits → all fixed pre-review.

## Figures — ALL PLACEHOLDER (real SVGs deferred per user, next session)
`assets/figures/`: `h3-b-f1_a-whole-menu.svg` · `h3-c1-f1_service-shape.svg` ·
`h3-c1-f2_diagnostic-scene.svg` · `h3-c1-f3_provide-vs-use.svg` — each a labelled dashed-box `.dgm`
placeholder. Replace with real schematics (register in `../STRUCTURE.md` §7c) next session, then geometry-audit.
