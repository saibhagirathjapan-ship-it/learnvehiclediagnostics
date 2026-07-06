# H2 — The life of one request · build notes

**Module:** `wiki/learn/uds-foundation/h2-life-of-a-request/` · breadth spine card 2 of 3.
Traces ONE request end to end; carries the bars for drills **V2–V8**. Source of truth =
`content/*.md`, rendered by `_template/render.js` → `index.html`. The Foundation map's H2 card
links here (map marks H1+H2 `built:true` → "read →").

Run:    `NODE_PATH="../../uds/node_modules" node ../../_template/render.js . index.html`
Verify: `node verify.js` (DOM counts, overflow, console) · `node shots.js` (frozen figure close-ups)
        `node fixcheck.js` (scroll-holds, rail+leg+nav lang-isolation, P2* render) · `node ofcheck.js` (no page h-overflow)

**Scripts** — canonical (keep): `verify.js`, `shots.js`. Useful reusable checks: `fixcheck.js`,
`ofcheck.js`. Scratch (safe to delete before GitHub upload): `langcheck.js`, `uishot.js`, `pick.js`,
`godeep.js`. `node_modules/` is installed `--no-save` under `wiki/learn/uds/node_modules` — **git-ignore it**.
`assets/*.png` are verification screenshots (fig*, ui-*, verify-*, godeep-*, pick-*) — regenerable; the
committed deliverable is `index.html` + `content/*.md` + `assets/figures/*.svg`.

## Card inventory (status ✅ done)

| order | file | type | figure(s) | V-bar |
|-------|------|------|-----------|-------|
| 00 | `00-divider.md` | divider | — | — |
| 10 | `10-brief.md` | brief | brief-beat (animated 3-beat storyboard) | — |
| 20 | `20-c1-request-is-bytes.md` | concept | c1-request-bytes · c1-pdu-shape · c1-subfn-bit | V2 (+V4) |
| 30 | `30-c2-two-answers.md` | concept | c2-two-answers · c2-negative-shape | V2, V3 |
| 40 | `40-c3-always-true.md` | concept | c3-four-rules · c3-addressing · c3-session-life | V8, V6, V5 |
| 50 | `50-c4-one-real-request.md` | concept | c4-roundtrip (animated) · c4-response-bytes · c4-timing-decode | V7, V6, V5 |
| 60 | `60-conclusion.md` | conclusion | — | — |

**DOM (verify.js):** 4 concept · 1 brief · 1 concl · 1 divider · **12 figures** · 1 recall · 8 legs · EN
on load. Zero console errors; zero overflow light/dark/both/mobile; zero page h-overflow at 1200/900/390.
Lang isolation exact (incl. the rail). **Bar-coverage V2–V8 all covered** (see the audit summaries).

## Figures (`assets/figures/`, 12)
Byte-boxes travel the wire in **brief-beat** (request `10 03` out → response `50 03 …` back, looping,
dots + boxes) and **c4-roundtrip** (packets travel and PAUSE mid-wire so the strings read; response is
all-green as the positive message; leading dot lands on the wire terminus, no overshoot). All other
figures are static schematics; all theme-aware `.dgm`, semantic colours (accent=request, green=positive,
red=negative, amber=caution), geometry anchored. c3-addressing answer = a clean return-bus (crosses
nothing; fixed in H1's copy too).

## Template changes made in H2 (shared — affect H1 + hub)
This module drove a set of **shared-template** upgrades (`_template/render.js` + `blueprint.css`):
- **Overview strip** (`.cardmap`) after the hero + a **card-level left rail** (`.toc.rail`) with
  scroll-spy — so the reader always sees how many cards and where they are. Each concept card carries a
  `short:` frontmatter label for the chips. Cards got `id` anchors + stronger outline/shadow/spacing.
- **Forward-pointers are real links** — `{{→ V6 · timing}}` resolves via `render.js` LINKS to the module
  page (with a `↗`). **17 stub pages** created (`_template/make-stubs.js`) for V1–V9, M2–M9, and H3 so
  links resolve; H1/H2 are built and skipped.
- **"Go Deeper" made obvious** — accent banner header (`▼ GO DEEPER` + "N more" pill + "tap to expand"
  hint), accent stem + per-leg accent stripe, **solid accent `+/−` buttons**.
- **`:::recall` made prominent** — accent panel, `?` badge, solid "Show answer" button.
- **Renderer bug fixed**: inline code spans are now protected before emphasis passes, so a `*` inside a
  code span (e.g. `` `P2*` ``) no longer breaks bold/italic (was leaking literal `**`).
- **Mobile**: overview strip is sticky + scrolls internally; topbar overflow fixed (title ellipsizes,
  Expand/Collapse hidden ≤860px); `.fwd` may wrap on narrow.
- **WCAG**: `--chip` lightened `#f0e6cf`→`#f9f3e1` so accent-on-chip pills clear 4.5:1; figcaption,
  `.rd-note`, `.rd-h`, `.cm-lead`, `.cm-arr` moved off `--ink-faint` to `--ink-soft`.

## Pressure-test history (6→7-agent adversarial workflow `h2-pressure-test`)
- **R1:** 3 blockers (addressing-arrow overshoot · over-strict SID range · undefined "session") → fixed.
- **R2:** 2 blockers (`cl.8.2.2`→`cl.9.2.2` mis-cite · echoed-SID colour red↔accent) + minors → fixed.
- **R3:** 4 blockers (P2* markdown bug · mobile pill overflow · rail lang-leak · dead H3 link) + the
  user-reported **scroll-stuck** bug (scroll-spy `scrollIntoView` yanked the page) → all fixed.
- **R4:** **0 blockers**; 6 minors (negative-bullet amber→plain · define "Extended" · lifecycle
  dependency · P2* 0x78 gloss · roundtrip packet overshoot · V9 forward-pointer for "how ECU decides")
  → all fixed.
- **R5:** **1 blocker** — leg-title `lg-en` span lacked `.en`, so JP-mode showed **both** languages
  (my `.en`/`.jp`-count langcheck missed it; the auditor's DOM check caught it). Fixed in the template
  (`lg-en en`; same latent bug fixed in `.modnav`; count pill made bilingual). + 6 minors (C1 hook ·
  "Extended" casing/anchor · brief boxes fl→plate for WCAG · P2* tied to `7F`/`0x78` · lifecycle "the
  `$3E`+`$11` story, not faults" · "Start here" flag badge → crisp `▸`). All fixed; leg/nav/pill
  isolation re-verified (EN→0 JP, JP→0 EN).
- **R6:** launched as the confirmation pass, **stopped at session close** (user closing) — module is at
  **0 known blockers** with all R5 findings fixed & re-verified. Re-run R6 next session to confirm clean.

## Consciously accepted (documented, not defects)
- **c4 response-byte colour** (raised across R2–R5): the round-trip figure (`c4-roundtrip`) shows the
  travelling response **all-green** = the positive message on the wire (reinforces C2's "positive =
  green"); the decode legs (`c4-response-bytes`, `c4-timing-decode`) render the timing bytes **accent**
  because they're the leg's focus. This whole-message→dissection recolour is deliberate; making them
  identical would either paint a green positive reply mostly-ochre or strip the leg's focus cue.
- decorative `.ln` leader/brace strokes (below 3:1 as "non-text graphics") and `--ink-faint` UI chrome
  (nav numbers / PREV·NEXT / table `th`) stay at the accepted H1 values.
- brief-beat device-screen hardcodes `#0d1013`/`#dea945` (matches H1's brief-hero; a fixed dark LCD).
- C3 addressing leg reuses the H1 addressing figure (it's the V8 breadth touchpoint) + adds one depth
  beat (functional broadcast → non-supporting ECUs stay silent).
- four-rules fault triangle is neutral grey (a fault *record* pictogram; amber reserved for the $11
  caution); icons are slot-centred (symmetric by slot).
- `--ink-faint` UI chrome (nav numbers, PREV/NEXT, table `th`) stays as the accepted H1 value.
