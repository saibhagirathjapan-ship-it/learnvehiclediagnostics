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

## Card inventory (status ✅ done · restructured to 7 concept cards 2026-07-07, FB3)

Figures renamed to the §7c convention `h2-<card>-f<k>_<title>.svg` (register in `../STRUCTURE.md`).

| order | file | type | id | figure(s) | V-bar / → |
|-------|------|------|----|-----------|-----------|
| 00 | `00-divider.md` | divider | h2 | — | — |
| 10 | `10-brief.md` | brief | brief | brief-f1 one-beat (animated) | — |
| 20 | `20-c1-request-is-bytes.md` | concept | c1 | c1-f1 request-shape · c1-f2 anatomy · c1-f3 subfn-byte | V2 (subfn flag → V4, deferred) |
| 30 | `30-c2-two-answers.md` | concept | c2 | c2-f1 two-answers · c2-f2 negative-shape | V2, V3 |
| 40 | `40-c3-one-real-request.md` | concept | c3 | c3-f1 one-real-request (animated) · c3-f2 reply-bytes · c3-f3 timing-decode | V2, V6 (trace moved here, right after pos/neg) |
| 50 | `50-c4-two-invariants.md` | concept | c4 | c4-f1 addressing | V8 (per-beat invariants) |
| 60 | `60-c5-keep-alive.md` | concept | c5 | c5-f1 keep-alive | V6 (S3), V7c ($3E) |
| 70 | `70-c6-reset.md` | concept | c6 | c6-f1 reset (11 01 → 51 01 trace) | V7b, V5 · Dem → M3 (bare) |
| 80 | `80-c7-session-life.md` | concept | c7 | c7-f1 session-life | V5, V6, V7a/b/c |
| 90 | `90-conclusion.md` | conclusion | concl | — | — |

**DOM (checkmod.js):** **7 concept** · 1 brief · 1 concl · 1 divider · **13 figures** · 1 recall ·
12 legs · EN on load. Zero console errors; zero element/page h-overflow light/dark; lang isolation exact
(JP-mode hides EN). Every concept has exactly one bar figure. Verify: `NODE_PATH=../../uds/node_modules
node ../../_template/checkmod.js . 7`.

## FB3 restructure (2026-07-07) — the "four-rules" split + trace-first re-sequence
The shipped 4-concept H2 was re-authored to the 7-concept STRUCTURE.md flow: the real trace (old C4)
**moved up to C3**, right after pos/neg; the "four rules hold" **bucket card was split** into per-beat
invariants (C4) + `$3E` keep-alive (C5) + `$11` reset (C6, now carrying the `11 01 → 51 01` trace) +
the life of a session (C7). C1's sub-function leg was **trimmed to defer suppression** (reserved flag
→ V4, no mechanic taught before the positive reply is defined); C2's inline "security" definition was
**cut to a bare NRC + →M4**. Two new figures authored — `c5-f1 keep-alive` (idle clock + `$3E`) and
`c6-f1 reset` (reboot arc + trace + unlocked→locked padlocks). Orphans `c3-four-rules.svg` deleted.

## H2-K bridge → 3-stop (2026-07-07, for the H3 service primer)
`90-conclusion.md`'s forward bridge to H3 re-authored from a **2-stop** promise (catalogue + how-it-
decides) to **3 stops** — first *what a service IS* (the fixed shape behind the traced beat), then the
catalogue, then how the ECU decides — so H3's new **service primer** (H3-C1) isn't an unannounced
detour. EN+JP, same register; text-only (no card-count/figure change). H2 re-rendered + re-verified
clean (7 concepts, no overflow, EN-on-load + JP isolation, zero console errors).

## Figures (`assets/figures/`, 13)
Byte-boxes travel the wire in **brief-f1 one-beat** and **c3-f1 one-real-request** (packets travel and
PAUSE mid-wire so the strings read; response all-green as the positive message; dot lands on the wire
terminus, no overshoot). **c5-f1 keep-alive** animates the idle-clock fill resetting on each `$3E`.
All theme-aware `.dgm`, semantic colours (accent=request, green=positive, red=negative, amber=caution),
geometry anchored (§7a verified via figure close-ups light+dark).

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
