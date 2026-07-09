# Work-types — the session JDs

> **What this is.** Every session runs exactly **one work-type** — a kind of job with a full
> profile (a "JD"): what it's for, what it reads first, what it produces, and **which gates bite**.
> The JD is the single source a session reads to *know its job*, so even a thin or out-of-order
> prompt still gets guided. `/session-open` picks the work-type; the session name carries it:
> **`[<TYPE>] <plain-English name>`** (e.g. `[B-PAGE] V3 — negative responses & the NRC catalog`).
>
> **Audience — both human and LLM.** Written in complete sentences, plain and tight. A future
> contributor (person + their Claude) taking a module reads this file + [[CONVENTIONS]] +
> [[PEDAGOGY]] and knows how to work.
>
> **Revisit-before-execute.** Before a work-type is next run, its JD must be at the current
> standard. If a session discovers the JD is stale or missing a step, harden it first (an `X-GOV`
> act, or the wrap's hardening-ask) — don't run a known-stale JD.
>
> **Rigor content is owned elsewhere — this file only** ***curates*** **it.** The gate ladder
> **G0–G5** and every rigor's full spec live in [[CONVENTIONS]] (§2b · §2c · §7a–§7d · the build
> recipe · the MASTER CHECKLIST) and [[PEDAGOGY]]. A JD says *which* gates bite and with what
> emphasis — never re-states their content (single-source).

## Execution modes (asked at `/session-open`, never defaulted)

- **Autopilot** — proceed through anything unambiguous; surface at the end or at a real decision.
- **Checkpoint** *(typical)* — show each bigger step, get confirmation, execute that step whole.
- **Lockstep** — stop at every small action for review.
- **Glassbox** — before each step, show the full reasoning: the derivation, a pressure-test, and a
  double-derivation — then act. The natural mode for **load-bearing cards** and standards claims.
- Typing **`glassbox`** mid-session expands the current step to full reasoning without switching modes.

## The JD fields

**Purpose** (one line) · **Trigger** (when this session is queued) · **Inputs** (read first) ·
**Outputs** (concrete deliverables) · **Gates** (which of G0–G5 bite, with the curated emphasis) ·
**Done** (exit criteria). Shared mechanics are stated once per family, not repeated per JD.

---

# Family S — Set a standard *(rare, high-leverage)*

**Shared mechanic (applies to every S-type):** a governance edit is a **deliberate, instructed
act** — never a side effect of build work; a standard reached mid-build is *captured* (NEXT.md
deferral or the wrap's hardening-ask), then applied in its own S-session. **Single-source:** each
standard has exactly one owning doc/section; every other mention is a pointer; **mirrors reconcile
in the same session** (COURSE ↔ CONVENTIONS ↔ memory ↔ this file). The edit closes with **G5**
(log + NEXT + commit/push). Standards **evolve through the two loops**: `INCIDENTS.md` (a miss →
which rule would have caught it → harden it) and the wrap's hardening-ask (a discovered generic
step → into the owning doc).

| Type | Owns (the single source it edits) |
|---|---|
| **S-PER — Define/evolve the persona** | [[COURSE]] §Learner persona (+ the hub `whoFor`). The learner baseline + the instructor voice ([[PEDAGOGY]] §Who we write for). Every card is judged *from* this persona, so a change here ripples into every gate — flag the blast radius. |
| **S-CRS — Course-derivation rigor** | How course → modules → H/V pages are derived, at every scale: the T/altitude model ([[CONVENTIONS]] §1c-scale), the **bar-coverage invariant**, the STRUCTURE.md authority chain (§1e), the documents-first sourcing philosophy. Applies to modules *and* to Hs/Vs within one. |
| **S-CON — Content-derivation rigor** | The teaching/prose laws: §2 phrasing · **§2b per-sentence lint** · **§2c convey-the-core** (the central discipline) · §4 card taxonomy/retrieval · §5 worked examples · §6 ordering — plus their [[PEDAGOGY]] grounding, and `GLOSSARY.md` once it exists (trigger: before M2). |
| **S-FIG — Illustration rigor** | The figure laws: §7a geometry · §7b figure text · §7c the figure register · **§7d cast lexicon / motion grammar / staged reveal** · §8 artifact craft — and the `.dgm` design system + shared generators they bind to. |
| **S-JP — Bilingual rigor** | The EN/JP standard: natural teaching register, dual-channel term parity (§7b), the JP side of the term contract. *Currently under-specified — the first S-JP session's job is to author the standard properly (register rules, JP typography, the JP half of GLOSSARY).* |

---

# Family D — Derive structure *(skeleton, no prose)*

**Shared mechanic:** documents-first (grep the `local notes/` sidecars, cite clauses); the result
is **pressure-tested + double-derived** (a second independent route; agreement = confidence,
disagreement = a gap); heavyweight multi-agent derivation is reserved for genuine scale per
[[CONVENTIONS]] §10; the output is a **STRUCTURE.md / roadmap change, never content**; content is
derived *from* it afterwards (§1e — a reorder living only in content is a process violation).
Any change to already-locked structure is **raised, never silently edited** — the locked blocks in
[[COURSE]] change only with user sign-off. Plan mode ON to think, OFF to write. Closes with G5.

## D-MOD — Course module-set change

- **Purpose:** add / modify / delete / re-sequence a **module** in the roadmap (the course-scale T).
- **Trigger:** a scope discovery (a pillar missing/oversized), a user call, or an M-pillar's build
  revealing the roadmap needs a cut. *(The 2026-07-05 sibling-nodes derivation was this type.)*
- **Inputs:** [[COURSE]] roadmap + its locked notes; course `STRUCTURE.md`; the standards inventory.
- **Outputs:** the roadmap table + course `STRUCTURE.md` + `course.yml`/hub updated **together**
  (mirrors, same session); orphan/overlap check re-run (every deep-treated topic keeps exactly one
  findable home — the service-axis lesson).
- **Gates:** the D-mechanic above + **G5**. **Done:** roadmap/STRUCTURE/hub agree; no orphan topics;
  user signed off.

## D-HV — Module H/V derivation

- **Purpose:** derive **one module's** `STRUCTURE.md`: its H-spine + V-drills, card-level flow,
  enters-with/leaves-with, and the figure register skeleton (the module-scale T).
- **Trigger:** a pillar (M2–M9) is next to build; or a Foundation-style re-derivation is warranted.
- **Inputs:** the module's row + locked notes in [[COURSE]]; the governing standard's clauses (via
  sidecars); `uds-foundation/STRUCTURE.md` as the reference exemplar; the persona.
- **Outputs:** `<module>/STRUCTURE.md` — ordered card list (type · covers · flows-from/sets-up),
  **bar-coverage map** (every V has an H bar — the invariant, checked bidirectionally), figure
  register skeleton; stub pages regenerated if numbering changes.
- **Gates:** the D-mechanic + the **bar-coverage invariant shown, not asserted** + **G5**.
  **Done:** STRUCTURE.md complete, continuity-audited seam by seam, user signed off — *then*
  B-PAGE sessions may begin.

---

# Family B — Build *(shipped content, through the full ladder)*

## B-PAGE — Develop one H or V page

- **Purpose:** build **one module page** (an H or a V) card-by-card on the locked stepped-story
  app-slide model — the only work-type that ships new teaching content.
- **Trigger:** the page is next in `NEXT.md`'s queue and its module's `STRUCTURE.md` § is final.
- **Inputs:** [[NEXT]] · the module's `STRUCTURE.md` (this page's §, the build spec) + `NOTES.md` ·
  [[CONVENTIONS]] + [[PEDAGOGY]] · the cited clauses (sidecars) · the persona.
- **Outputs:** `content/<id>.md` per card (with the **`load_bearing:`** front-matter, and
  `derivation:` notes on load-bearing cards) · figures per the register · rendered `index.html` ·
  the updated figure register · the NOTES.md **gate scorecard**.
- **Gates: ALL — G0 → G1 → G2 → G3 → G4 → G5, in order, per card** ([[CONVENTIONS]] build recipe).
  §2c runs FIRST inside G1; **`/teach-back` (L2) on the load-bearing card(s)** — the cards the
  module hinges on, sized to stakes (§10).
- **Curated emphasis by page kind:**
  - **H (breadth):** self-sufficiency — the bar alone gives the complete high-level picture;
    every V it covers gets its one-screen bar + `drilled-in →` pointer; nothing leans on a drill.
  - **V (depth):** **reference-don't-re-teach** — a mechanism owned by another drill is
    `{{→}}`-referenced, never re-decoded/re-drawn (the V7a/b/c lint rule); each fact TAUGHT once.
- **Done:** every card passed its scorecard; user sign-off; pushed (G5). A module's last B-PAGE
  also runs the **module exit checks** (bar-coverage; reads top-to-bottom as one story; SOVD
  bridge card present).

---

# Family R — Revisit *(refine shipped material; run only the gates that bite)*

**Shared mechanic:** a revisit **starts from the owning source** (`STRUCTURE.md` → content MD →
re-render), never by patching HTML; what it improves must not regress the other dimensions —
**G4 (verify) always re-runs**, and G5 closes. A revisit that finds a *structural* problem
escalates to D-HV rather than absorbing it.

| Type | Purpose | Gates that bite |
|---|---|---|
| **R-CON — Content revisit** | A prose/wording pass over shipped cards: §2b per-sentence lint (canonical term · precise · real claim · actor · self-contained), the OK/NG bar, title grammar. *E.g. the 3-part Brief retrofit.* | **G1** (§2b emphasis; §2c re-runs only where meaning changed) + **G4 + G5** |
| **R-EXP — Explanation revisit** | The **convey-the-core pass** (§2c) on existing cards: re-write the load-bearing sentence, run the derivation gate over every claim, **`/teach-back`** the crux cards; fix every faith-list rung. *The deepest revisit — use when a card "reads fine" but the user or a teach-back shows the core doesn't land.* | **G0** (load-bearing sentence re-derived) + **G1 full incl. L2** + **G4 + G5** |
| **R-FIG — SVG/illustration revisit** | Figure rework: repaint to §7d cast tokens, retrofit-animate static bars, geometry fixes, redraw-to-wide. *E.g. the parked shipped-figure repaint.* | **G2 + G3** (per figure) + **G4 + G5** |
| **R-JP — Japanese pass** | Author/verify the JP text of a card or module against the S-JP standard: natural register, term parity with the EN ochre terms, JP overflow. | JP checks per S-JP + **G4** (lang isolation: EN→0 JP, JP→0 EN; JP overflow) + **G5** |

---

# Family X — Meta

## X-GOV — Governance / tooling / shell change

*(Family letter is **X**, not M — `M` is taken by the module codes M2–M9.)*

- **Purpose:** change **how we work or what we work with**: this file, the rituals/commands, hooks,
  `checkmod.js`/verify tooling, the shared `_template` (renderer/CSS/partials), the hub.
- **Trigger:** a governance decision, a recurring miss (via INCIDENTS), a shell/template need.
- **Inputs:** the owning file(s), read from disk first; [[CONVENTIONS]] §10 (token discipline);
  for template work, the §1f shell contract.
- **Outputs:** the deliberate edit + **all mirrors reconciled same-session**; template changes
  **re-render every affected surface** and verify on all page types (the shell rule: change once,
  every surface inherits).
- **Gates:** deliberate-edit mechanic (as Family S) + **G4 when anything rendered changed** + G5.
- **Done:** edit landed, mirrors clean, affected pages re-verified, pushed.

---

# The review gate (not a build type)

## G-REV — Module review / audit

- **Purpose:** the **merge gate a finished module passes before it counts as live course material**
  — essential once a second author builds modules in parallel; also runnable on our own milestones.
- **Trigger:** a module's last page is built (all B-PAGE scorecards green); or a periodic audit.
- **Inputs:** the rendered module + its `STRUCTURE.md` + `NOTES.md` scorecards; [[PEDAGOGY]]'s
  validation checklist; the MASTER CHECKLIST.
- **Method (3 layers, audit-grade):** **L1** — re-run `checkmod`/verify fresh (don't trust the
  scorecard's word). **L2** — adversarial fresh-context passes: `/teach-back` on each load-bearing
  card + the 4-lens review (ISO accuracy vs the cited clauses · pedagogy/continuity · bilingual ·
  figures §7a/§7d). **L3** — the human ruling. Findings are **raised with evidence, graded
  blocker/nit**; a blocker holds the merge — the gate freezes nothing itself, it protects the trunk.
- **Outputs:** a review note in the module's `NOTES.md` (pass / fix-list, with evidence); INCIDENTS
  entries for any process miss the audit reveals.
- **Done:** ruling recorded; blockers closed or the module held.

---

# Enforcement — the 3-layer forcing function

> **Why it exists:** rigor that relies on the author's self-check fails — the **curse of
> knowledge** means "is this conveyed?" always passes from the inside ([[CONVENTIONS]] §2c). So
> enforcement is **mechanical where possible, externalized where not**, and human where it counts.

- **Layer 1 — mechanical (`checkmod.js`, per-build + Stop hook).** Structural checks **block**:
  card list matches STRUCTURE.md · `load_bearing:` present on every concept card · EN-on-load +
  lang isolation · zero overflow · zero console errors · §7d cast lint. Prose checks **flag,
  never block** (they can false-positive — e.g. legitimate operator-"you"): hex missing the `h`
  suffix · false-agency phrases ("you sent", "in H2 you…") · term drift vs GLOSSARY (once it
  exists). A flag is triage input for the human gate, so the gate never trains us to ignore it.
- **Layer 2 — adversarial, fresh-context (deliberate, sized to stakes §10).**
  **`/teach-back`** — a zero-domain-knowledge subagent gets ONLY the rendered card and returns
  (a) the core explained back, (b) the **faith-list** (what it had to accept unproven — the gap
  list), (c) where it got lost. Run on **load-bearing cards** (G1) and at G-REV — not every card.
  The **figure fresh-eyes judge** (G3, optional): a fresh agent reads the figure cold — "what does
  this teach?" — mismatch with the intended takeaway = a finding.
- **Layer 3 — human.** Your per-card/per-module sign-off; **G-REV** for modules from other authors.

**Status (2026-07-10):** the gate ladder + JDs are **in force as process now**; the L1 `checkmod`
extensions (`load_bearing` check, prose flags), the `/teach-back` + ritual commands, and the Stop
hook are **built in the follow-on of the same governance session** — see `wiki/log.md`. Until a
mechanical piece lands, its check runs manually per this file (process first, tooling follows).
