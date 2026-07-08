# V1 — The service model · build notes

**Slug:** `v1-service-model` · **Bar-coverage:** V1 ← H1-C2 (client/server + catalog).
**Reading order:** drilled after H1, before H2 (STRUCTURE.md full drill order). Physical nav chain:
H3 → **V1** → V2.

**Altitude fence (do not cross):** V1 is the **formal** service model — it owns the terms the H3
primer is fenced *away* from (`primitive · indication · confirmation · SAP · A_Mtype/A_SA/A_TA ·
S_Data · confirmed/unconfirmed`). It is **byte-free** (no hex) — H2 puts real bytes on this skeleton.
Enters with H1 only (tester=client, ECU=server, UDS=catalog); must not lean on H2.

## Card inventory (scaffold — checked by checkmod: 3 concepts)

| card | id | type | teaching | legs (go-deeper) |
|---|---|---|---|---|
| V1-B | brief | brief | the 3-part advance organizer (why · what's inside · what you'll be able to do); no hex | — |
| V1-C1 | c1 | concept | one exchange = 4 ordered **primitives** (request/indication/response/confirmation) | count (6 & 3) · reading a sequence arrow |
| V1-C2 | c2 | concept | who owns each — tester brackets (request/confirmation), ECU serves the middle (indication/response) | all six sorted by side · symmetric shape, asymmetric roles |
| V1-C3 | c3 | concept | every call crosses a **SAP** carrying an address label (type/source/target); reply swaps from/to | the three names A_Mtype/A_SA/A_TA (+A_TAtype) · one layer down → S_Data.* |
| V1-K | concl | conclusion | recap · you-can-now · retrieval · bridge to H2 | — |

## Figure register (§7c) — 10 figures, all animated where motion teaches

| ID | Title (takeaway) | Card / leg | Filename |
|----|------------------|------------|----------|
| V1-B-F1 | One exchange, about to be slowed down and named | brief · bar | `v1-b-f1_one-exchange.svg` |
| V1-C1-F1 | One exchange, four steps — same message at its two ends | C1 · bar | `v1-c1-f1_four-steps.svg` |
| V1-C1-F2 | Six for a reply, three for none | C1 · leg *count* | `v1-c1-f2_six-and-three.svg` |
| V1-C1-F3 | One arrow, three facts (tail acts · head told · down = time) | C1 · leg *arrows* | `v1-c1-f3_reading-arrows.svg` |
| V1-C2-F1 | The tester brackets; the ECU serves the middle | C2 · bar | `v1-c2-f1_owners.svg` |
| V1-C2-F2 | Three steps each, no overlap | C2 · leg *sides* | `v1-c2-f2_by-side.svg` |
| V1-C2-F3 | The names mirror; the roles do not | C2 · leg *symmetry* | `v1-c2-f3_symmetry.svg` |
| V1-C3-F1 | Every call crosses a SAP with a label; the reply swaps from/to | C3 · bar | `v1-c3-f1_sap.svg` |
| V1-C3-F2 | The label, with its real names (A_Mtype/A_SA/A_TA) | C3 · leg *names* | `v1-c3-f2_param-names.svg` |
| V1-C3-F3 | Rich on top, plain below — the call becomes S_Data | C3 · leg *sessionlayer* | `v1-c3-f3_session-layer.svg` |

## Sources (clause-verified)

- ISO 14229-1:2020 cl.5 (services described by service primitives), cl.7.1, **cl.7.3.1–7.3.4**
  (request/indication/response/confirm + the two confirm-of-send primitives; **Fig 3 confirmed = 6,
  Fig 4 unconfirmed = 3**), **cl.7.4.1.1–7.4.1.5** (three mandatory params A_Mtype/A_SA/A_TA + A_TAtype).
- ISO 14229-2:2021 cl.6.3, cl.7 (session-layer interface: **S_Data.request / .indication / .confirm**).

## Verification status — ✅ COMPLETE (2026-07-08)

- [x] `checkmod . 3` — concept count = 3, one-fig-per-concept, EN-on-load, lang isolation (EN→0 JP, JP→0 EN),
      zero overflow (light/dark/mobile), no console errors. **Green.**
- [x] Figure geometry close-ups (10 figs × light + dark, `shots.js`) — §7a audited by eye. One fix landed
      (C1-F3 sub-labels were crossing the descending arrow → moved off the line). All 10 clean, theme-aware.
- [x] **Adversarial review (4 independent lenses + a re-run pedagogy pass):**
  - *Technical* vs ISO 14229-1/-2 — all 8 target claims hold against a cited clause; fixed 1 mis-located
    figure citation (Fig 3&4 → cl.5/cl.7.1, not cl.7.3) and tightened the 14229-2 cite to cl.6.1/7.1.
  - *Pedagogy/continuity* — byte-free confirmed, H1-only prior knowledge, brief is a real 3-part organizer,
    terms defined on first use, recall + competence beats present, no "beat" in content. Fixes: C1 opener
    now leads positive ("…a sequence of named steps — not a single event"); conclusion params set in **bold**
    not mono-backticks (holds the pre-byte register); `A_TAtype`/physical/functional glossed as "named later
    →V8"; C2 symmetry hook de-condescended.
  - *Bilingual* — every EN block has a JP twin; natural teaching register. Fixes: C1 JP 片側/両者 tension,
    確認応答↔確認 bridge, C3 bar sentence split, session-layer caption register.
  - *Figures/captions* — captions state takeaways; aria-labels accurate. Fixes: C3-F3 dropped untaught
    `A_Length/A_Data`; C3-F1 moving card now shows the message-kind (`diag`) so all three label facts are
    visible at the bar.
