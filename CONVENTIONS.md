# Learning-course conventions & rigor

**How we build every learning module.** This is the "how" bible; the "what/where/status"
lives in [[COURSE]] (`wiki/learn/COURSE.md`). Auto-loaded each session via a `@`-import in
the project `CLAUDE.md`. Edit this file to change how modules are built.

---

## 0. Persona to draft from

- Wear the **OEM systems-engineer** hat; that persona is the real reader/judge. Judge what
  matters, what ordering is logical, and how a sentence should read for an industry peer.
- Write for a **no-context reader** — assume zero prior knowledge; every line stands alone.
- **Reader-perspective exit gate, per phrase:** does this make sense to the reader, and is
  it useful *to them*? If it only makes sense to the author (or restates the prompt), cut it.

## 1. Design philosophy before any UI

- Before building/restyling a surface, write down: (1) the one-sentence purpose of the
  page/view, (2) what question each element answers, (3) the visual-language rules.
- Get a **live reference example** before building a novel UI pattern.
- Define element **behaviour contracts** before tuning aesthetics — never tune look & feel
  reactively off prompts (that yields accidental coherence).

## 1b. Design language — LOCKED 2026-07-04 ("Blueprint")

The visual system is locked; **do not restyle per module.** Canonical CSS + component markup
live in the shared template; the reference prototype is `wiki/learn/_designlab/tcard.html`.

- **Identity:** **"Ochre & Olive"** (re-themed 2026-07-05) — **white canvas** with **near-black
  dark-grey chrome** (`--chrome`: the topbar, buttons and section-divider bars) and cool greys; an
  **ochre** key accent and an **olive-green** positive; schematic / engineering-drawing, editorial.
  Never generic-SaaS or "AI-styled". (Was "Blueprint" graphite+orange. User rejected a *warm* cream
  bg — wants clean white + dark-grey chrome.)
- **Palette (semantic — one hue = one meaning; SEMANTIC OVERRIDES THEMATIC):** **ochre** = key
  emphasis + focus (the accent) · **white bg + dark-grey `--chrome` bars + cool grey** = neutrals /
  chrome / disabled / less-important · **olive-green** = positive / OK / pass · **brick-red** =
  negative / NG / danger · **burnt-amber** = warn (distinct from the ochre accent). Never encode
  meaning by colour alone — always pair with a label/shape. Light + dark both first-class; WCAG ≥
  4.5:1 body. Token values in the template `.stage[data-theme]` (accent light `#96650f`, dark
  `#dea945`; ok `#4f6a24`/`#a7bd61`; chrome `#23262c`/`#262a31`).
- **Type:** display **Space Grotesk** · body **IBM Plex Sans** · mono **IBM Plex Mono** · JP
  **Noto Sans JP**. Fonts **bundled** (base64 `@font-face`) → every page self-contained.
- **Card style:** engineering **title-block header** (mono `CARD` field · title · `$xx` chip ·
  T-glyph), 2px accent top-rule, **sharp rectangular corners** (schematic sheet — `border-radius:0`),
  hairline borders, flat shadow, mono labels.
- **Emphasis:** **key terms in body text are set in the accent colour** (semibold), not just
  bold — the prose self-signals what matters. (Warn-callout emphasis stays burnt-amber.)
- **Diagrams:** `.dgm` theme-aware class system (base set + `.red .plate .lnf`).

## 1c. A concept card is one STEPPED STORY (information architecture) — LOCKED 2026-07-09

> **This supersedes the old "card = a T with collapsible go-deeper legs" and the 2026-07-09
> `continuous:true` pilot.** User feedback (session 22): dropping in-card legs must trigger a *rethink
> of how the card is told*, not a mechanical delete. The T-with-legs and the titled-flowsec pilot are
> **both retired at the card scale.** The T survives only at the **course scale** (§1c-scale: the
> breadth H-spine + depth V-drills) — a *card* no longer has its own horizontal/vertical.

**A concept card is one continuous, stepped story.** What used to be the "bar" + "legs" is now a single
ordered sequence of **steps**, each carrying **one modest screenful** of narration + its illustration,
told as one flowing argument (no `<details>`, no "Go deeper" banner, no titled sub-sections).

- **Authoring:** a `## story` section of `:::step` blocks (separated by a `--` line). Each step:
  optional `fig: <path>` (the figure shown from here on) + an `en:` and `jp:` body (**each may span
  multiple lines**, so a step can carry a **bullet list** — bullet where prose gets paragraphy;
  see [[SCHEMA]] / `render.js parseSteps`).
- **One figure, teaching-driven.** A step either **evolves** the current figure (its `data-stage` /
  `data-until` elements build in lockstep with the narration) or **swaps** to a new figure when the
  teaching needs a different picture. *Teaching drives the figure, never the figure driving the
  teaching* (user 2026-07-09). A card that makes one clean point may keep **one** evolving figure and
  never swap — don't force a swap.
- **The figure headlines the STEP's key point, not the card's conclusion.** (Rigor caught in V2-C1:
  step 1's point was "raw bytes have no seams", but the figure headlined "a wrapped unit" — the
  *conclusion*. Align each figure's headline to the point of the step it sits in; save the conclusion
  for the step that earns it.)
- **Separate (non-story) sections**, after the story: **In your own words** (`:::elaborate`),
  **Further reading** (`:::reading`, now a collapsed `<details>`), and the **`:::recall`** retrieval
  beat (on the Conclusion card). These are *not* woven into the step flow.
- **"Show all"** renders every step stacked as scannable prose with each figure frozen — the
  no-JS / reduced-motion / scanning fallback.
- **One idea per card still holds.** Grow depth by **adding steps** (each a single screenful), never by
  cramming a step. "I like the amount of information per screen — increase the *scrolls*, don't reduce
  the content" (user 2026-07-09).
- **The module T-glyph** by the card title now marks the **module's** role: **H → the bar lights, V →
  the stem lights** (a card no longer has its own bar/leg glyph). Set `kind: H|V` in `module.yml`.

## 1c-scale. Horizontal / Vertical is an *altitude*, applied at every scale (LOCKED 2026-07-04)

The T is **fractal**: it applies to the whole **course**, to each **module**, and to each **card**.
"Horizontal" and "vertical" are **not two buckets you sort topics into** — they are two *altitudes*
of the **same** topic.

- **Horizontal = breadth** (the *bar*): wide, shallow, self-sufficient. At course scale this is a
  **breadth spine** of overview modules — read them alone and you have a complete high-level picture,
  nothing downstream is context-free.
- **Vertical = depth** (the *stem*): narrow, deep, opt-in drills.
- **The same topic appears at both altitudes.** `$10` gets a one-screen mention in the breadth sweep
  **and** its own depth drill. "General communication" is sketched in breadth and drilled across
  several depth modules.
- **Bar-coverage invariant (binding, and a lint check):** **every vertical MUST have a bar somewhere
  in the horizontal spine** at the same scale. This is the course-scale form of §1c's "a reader who
  reads only the bars still gets the whole module." A depth drill with no breadth touchpoint = a gap
  to fix (either add the bar, or the drill is mis-scoped).

## 1d. Content architecture — content in MD, rendered to HTML

**Source of truth = per-concept Markdown files**, refinable independently of design. The
shipped page is **rendered** from those MD files through the shared Blueprint template into a
**self-contained HTML** deliverable. This *revises* the earlier "design system + content in one
file" rule: the deliverable is still one self-contained HTML page, but it is a **build output**,
not the authoring surface. Layout: `wiki/learn/<module>/content/<id>.md` (one concept per file)
+ a shared template + renderer + verification in a shared tooling folder. (Concept-MD schema is
proposed at content-build time.)

## 1e. `STRUCTURE.md` is the organization source of truth, at two scales (LOCKED 2026-07-07)

**The `STRUCTURE.md` rule is fractal (mirrors §1c-scale — the course is a T, each module is a T):**

- **Course scale — `wiki/learn/STRUCTURE.md`** owns the **hub page** structure: the full ordered
  module list (Foundation, M2…M9), a **high-level line on what each module contains**, and the arc /
  dependency spine between them. It is the source of truth the **course hub page** (and `course.yml`,
  the render data) derive from — the home page is never hand-organized.
- **Module scale — `wiki/learn/<module>/STRUCTURE.md`** owns that module's **card-level** organization
  and flow: the ordered card list (type · what each card covers · its go-deeper legs) with explicit
  **flows-from / sets-up** links, the module's *enters-with / leaves-with*, bar-coverage, and the
  **figure register** (§7c).

Content is **derived from these, never hand-organized**:

- **Direction of authority:** `COURSE.md` (build roadmap + status) → **course `STRUCTURE.md`** (hub: the
  module list + high-level of each + the arc) → the module's **`STRUCTURE.md`** (card-level flow) →
  `content/<id>.md` (the prose/figures for each card) → rendered `index.html`. Each layer derives from
  the one above; you never reorganize by editing the content MD or the HTML directly.
- **Any change starts in `STRUCTURE.md`.** To add / move / merge / delete a card or a go-deeper leg,
  **edit `STRUCTURE.md` first**, then propagate to the content MD and re-render. A reorder that lives
  only in the content folder is a process violation (it reintroduces hand-organized drift).
- **It is the continuity contract.** `STRUCTURE.md` is what the continuity audit (H↔H, H↔V, card↔card,
  card↔go-deeper, prior-knowledge) is run against, and what a reviewer reads to critique flow without
  opening the HTML. The reference example is `wiki/learn/uds-foundation/STRUCTURE.md`.
- **Build gate:** a module's `content/` cards must match its `STRUCTURE.md` card list 1:1 (checked in
  `verify.js` / `NOTES.md`), the same way DOM card counts are checked against the scaffold.

## 1f. Module shell & reading UX — the APP-LIKE SLIDE model, LOCKED 2026-07-09 (session 22)

> **This supersedes the session-9 "scroll + overview-strip + rail + bottom Prev/Next" shell.** User
> steer: *design a card like an app UI — content centred, vertical scroll ≈ 0; think slides, not a
> scroll.* Proven on V2-C1 (desktop ≈ 8px / mobile ≈ 15px beyond the viewport). Verified with
> `_storyshot.js` (a scroll-height probe) + `checkmod.js`.

The page **chrome + reading UX** are a shared locked system (like §1b's visuals) — **do not re-invent
per module.** All of it lives in `_template/` (`partials.js` chrome · `render.js` · the hub/map/stub
renderers · `blueprint.css`); change a behaviour in **one** place and every surface inherits. The
contract (source of truth = those files):

- **Each card is a viewport-fit SLIDE.** A story card page (`.page-story`) is `min-height:calc(100dvh -
  --chrome)`, flex-**centred** vertically, so it fits with ~no scroll. If a step can't fit, it becomes
  **two steps** — never a scroll. `--chrome` (topbar + compact header) is *measured* in `TOPBAR_SCRIPT`,
  never hard-coded (also `--tbh`/`--crh`/`--stick` for any legacy sticky). *(Viewport-fit centring is
  scoped to `.page-story`; a not-yet-migrated card renders normally.)*
- **Minimal chrome on module pages** (hub/map/stubs keep the full identity): a **slim top bar** —
  `topbar({compact:true})` → a home **icon** only (no "Automotive Diagnostics" wordmark) + the globe +
  theme toggles; and a **compact one-line header** (`renderModHead` — a tiny `Course › Foundation`
  breadcrumb + a **small** module title, no hero/tagline block). The big hero + the sticky overview
  strip + the left rail are **gone** (they ate the vertical budget).
- **Step nav = plain `‹ ›` arrows** flanking the content (`.st-arw`): desktop = **fixed, vertically
  centred on the viewport**, just outside the column; below ~960px they drop **inline** beside the
  dots so they never overlap text. **No counts** — a row of **dots** (`.st-dot`) carries position.
  **Brief + conclusion carry the same flanking arrows** (`.pg-prev`/`.pg-fwd`, `render.js pageArrows()`)
  — there they move between **cards**, and the pager hides the end that has no card (2026-07-09 FB: every
  card navigates the same way).
- **Illustrations are LARGE and drive the narration (2026-07-09 FB).** The figure box (`.st-stage`) uses
  **tight padding (6px)** and the SVG fills the box width with a **generous height cap (~40vh desktop /
  37vh mobile)**. A figure only fills the box at that cap if its **aspect ratio ≳ box-width∶cap (~2.3)** —
  so **author figures WIDE** (a tall/narrow layout floats with big side margins; e.g. C3's echo was redrawn
  from a vertical 2×2 grid to a horizontal `10 03 → 50 03`). Keep the viewBox tight to the content.
- **Swipe = a DRAG-pan** (the content tracks the finger 1:1, transition off mid-drag; release **snaps
  to the nearest step**). The slide is **full-width** (`.past`/`.future` = `±100%`) so a committed drag
  *continues* in the swipe direction (old exits left / new enters from right) — it must **never snap
  backwards** (the 2026-07-09 bug: `.past` was `-30px`, so a dragged step animated the wrong way).
  Arrow keys + the arrows drive the same. At a story's **ends the swipe/arrow rolls into the adjacent
  CARD** — one continuous gesture walks the whole module.
- **Card nav = a FAB** (`.fab`, fixed bottom-right): `‹ n/N ›`, and the **label opens a "Jump to card"
  menu** of card titles (badges, current marked). The bottom Prev/Next-card bar is **removed**.
- **Further reading collapses** (`:::reading` → a collapsed `<details class="reading">`) so citations
  never force a scroll. **Retrieval** (`:::recall`) stays a visible "Your turn" block (answer in
  `<details>`) on the Conclusion.
- **Forward pointers are real links:** `{{→ where}}` → `.fwd`, resolving to the target page; every
  deferred target has at least a **stub page**. Plain-text or 404 = defect (§6).
- **Language isolation — the ≤2-class rule:** visibility = `.stage[data-lang]` (`en`/`jp`/`both`)
  toggling **at most two** hooks (`.en`/`.jp`); steps, nav, figure captions, the FAB menu all obey the
  **same** two. `checkmod.js` enforces EN-on-load + full isolation (EN→0 JP, JP→0 EN) + zero overflow +
  the §7d cast lint.

## 2. Phrasing (audience-facing)

- **Very, very simple English** — short words, short sentences, one idea per sentence.
- **Jargon only when the plain word won't do**, and **define it on first use**.
- **Bold** key terms; define a term the first time it appears.
- **No meta-framing.** Never write "this is a simple explanation of…" or leak how you were
  told to write. Give the substance directly. Provenance goes in a small footer, not a banner.
- **JP alongside EN**, natural teaching register (not machine-literal).

### 2b. Prose-&-term rigor — the per-sentence lint (LOCKED 2026-07-09, from user FB)

**The recurring failure is careless prose that "reads fine" but is imprecise, term-drifting, or leans on
the reader's memory. Run this lint on EVERY teaching sentence, in the reader's persona.** It is a
MASTER-CHECKLIST item and a pressure-test gate ([[feedback-build-pressure-tests]]). The checks (this
list GROWS each session as new recurring failures surface — 1–5 original, +6 plain, +others folded in):

1. **Canonical term, every time.** Each concept has exactly ONE name, used verbatim throughout — from the
   **[[GLOSSARY]]** (the EN/JP term contract). Never let a synonym drift in ("**service identifier / SID**",
   never "service number / service code / the first-byte value"). A new term is defined on first use, then
   reused unchanged. Lint: scan a finished card for two words that mean the same thing.
2. **Precise, not vague.** No hand-wavy quantifier for a technical fact. "the low ones / some bits / a few"
   → name them: **bits 0–5**, `10`–`3E`, "the top bit (bit 7)". If you reference a field/bit/range, say
   *which*. Vague-but-true is still a defect.
3. **Say the actual claim.** Each teaching sentence must state the real technical point, not a proxy for
   it. Ask: *what exact fact am I asserting, and does the sentence say THAT?* ("it only uses the low ones"
   fails — the real claim is "**bit 6 is 0 on every request**"). This is also the guard against a
   **plausible-but-wrong** claim: double-derive the fact against the clause before it ships (the C2 catch —
   "all SIDs are small" was false; `85` ControlDTCSetting has bit 7 set).
   **Scope + accuracy discipline (LOCKED 2026-07-12 — recurred: `22h`="busy" was wrong · `22h`="means the
   same thing everywhere" over-claimed · the C4 column headers were inaccurate · a 3-item column read as
   exhaustive).** Double-derivation applies to **figure labels, captions, and headings, and to every
   *reasoning / "why"* statement — not just body prose.** Pressure-test each label/heading for literal
   accuracy across **all** the items it covers (a header true for 2 of 3 rows is a defect). **Don't imply
   exhaustiveness:** a label over N examples must not read as "the complete set" unless it is. **Never ship
   synthesized or guessed reasoning as grounded fact** (tie to §2c): verify it in the sources, or mark it a
   lens. When the accurate framing is genuinely **uncertain or subjective** (especially a heading/label),
   **propose 2–4 pressure-tested options to the user before committing** — do not ship a guess.
4. **Right actor; no false agency — and NO course-structure agency or meta-framing.** Protocol actions
   belong to the **tester** (sends) and the **ECU** (replies), not to the reader. Never attribute a past
   action *or past learning* to the reader ("**you sent** `10 03`", "you saw in H2"). Present-tense
   operator "you" is allowed only where it reads literally true; when in doubt name the real actor.
   **Additionally (LOCKED 2026-07-12 — recurred ≥3×, "same fb previously"): a chapter / card / step /
   section is NOT an actor and NOT part of the story.** Never write "**the last chapter read** the yes",
   "the card sends", "the figure shows you" as narration, and never meta-narrate the course's own
   scaffolding inside teaching prose — "**this is the next step**", "the next card covers…", "in this
   section we…". Say the **substance** directly (state the fact / name the mechanism); a real forward/back
   reference rides ONLY as a `{{→}}` pointer (§2b-5), never as prose about the course's sequence.
5. **Self-contained; prior modules are optional pointers, never load-bearing.** A card must teach without
   the reader recalling a *named* earlier module. Do **not** open a beat with "In H2 …" / "as you learned
   in V1 …". State the fact the card needs directly; a back-reference may ride as a `{{→}}` pointer, and the
   concept must still land if the reader never followed it.
6. **Plain, not compressed (LOCKED 2026-07-12, INC-005 — recurred despite 1–5).** Simple *words* are not
   enough; a phrase can be **compressed** — a nominalised proxy the reader can't unpack on first read.
   Banned: obscure words ("**folded** by +40h" → "packs into one byte") **and** telescoped constructions
   — **"its band gives the kind"** → "the band tells you what kind of problem it is"; **"which check is the
   next step"** → "Next: which check produces which code". **Mechanical guard (don't trust self-judgement —
   curse of knowledge, §2c):** read each sentence *literally, as a first-timer*; any **"X gives / carries /
   rides / gates the Y"** nominalisation is a red flag → rewrite as "the X tells/shows you <the actual
   thing>". Running ban-list grows per session ([[feedback-avoid-obscure-words]]).

### 2c. Convey the CORE — the derivation gate (THE CENTRAL CREATION DISCIPLINE, LOCKED 2026-07-10)

**This is the primary quality gate — above every surface check.** §2b catches *prose* defects (a
term, a vague word, an actor). §2c catches the deeper failure the user is most exacting about: **the card
reads fine but does not actually convey the core idea — the reader can *recognise* it but not *reconstruct*
it.** Both misses that triggered this (SIDs: "uses the low bits" instead of "bit 6 = 0 on every request";
`+40h`: asserting "set bit 6 = add 40h" without the place-value rung) have the SAME shape: **a conclusion
or a label stated without the derivation under it.**

> **Root cause — the curse of knowledge.** Once I know the answer I cannot un-know it, so my own
> "is this conveyed?" self-check *always passes* — I fill the missing rung from my head. That is why the
> abstract directives ("be the learner", "is it giving the message?") **do not work**: they ask me to
> simulate ignorance I cannot simulate. The fixes below **do not rely on my judgement** — they are
> mechanical, or they hand the judging to someone who genuinely lacks the knowledge.

**"Conveyed well" ≡ a no-context reader could RECONSTRUCT the idea and its WHY, not merely accept it.**
Three moves make that checkable — the first two on **every** concept card, the third for **load-bearing**
cards:

1. **Load-bearing sentence FIRST.** Before authoring, write the single sentence the reader must end up able
   to say — the *insight*, not a label ("bit 6 is `0` on every request, so it is free to repurpose"). It
   fixes the target *before* I can fool myself that a weaker proxy hit it. Then check the finished card
   delivers **that** sentence, not an adjacent/surface one. (Catches the SID-proxy miss.)
2. **Derivation gate — no unearned claims.** For every "X is Y" / "X = Y" / named term / asserted
   equivalence, interrogate the **card, not myself**: *Why is that true? How do I know? — is the answer ON
   the card, or only in my head?* If a reader would have to **accept it on faith**, a rung is missing → add
   the step. Run mechanically it catches the `40h` gap automatically (equivalence claimed, "why" absent →
   insert the place-value step). A named term/notation with no on-card derivation of *why it works* is a
   defect, same standing as text overflow.
3. **Externalise the judge — a no-context teach-back (the curse-of-knowledge breaker; reserved for
   load-bearing cards).** Because my judgement is compromised, hand it to a reader who lacks the knowledge:
   spawn a fresh subagent primed with **zero** UDS/domain knowledge, give it **only** the rendered card, and
   have it (a) explain the core idea back in its own words, (b) list **what it had to take on faith / could
   not derive**, (c) say where it got lost. Its *faith list* is the gap list — fix each rung. An agent that
   genuinely lacks the knowledge cannot paper over the hole the way I do. **Size to stakes** (§10): run it
   on the cards a module hinges on (a service's core mechanism, the crux card), not every card; moves 1–2
   are the every-card floor.

Run §2c inside the STORY pressure-test gate (build-recipe step 3), *before* prose polish — a missing rung
is a **blocker**, not a nit. Keep §2b/§2c growing each session as new failure modes surface.

## 3. Structure & content position

- Structure for scanning: bullets, **tables**, short labelled sub-sections. Prefer a small
  table/list over a wall of prose when it carries the same content.
- **Three-tier content position:** narrative inline · illustration anchored to the specific
  claim it illustrates · reference-depth in opt-in `<details>`.
- **Anchor each illustration to its claim** (proximity / same field of view) — never batch
  figures after a table.

## 4. Nugget / card taxonomy (one idea per card)

- A module is a **sequence of nuggets**, each carrying exactly one idea. Card types:
  - **Divider** — chapter/section marker: title only.
  - **Brief** — sets up; header band + short body. **Not teaching.** A brief is a **3-part advance
    organizer** (LOCKED 2026-07-08, user-approved): **(1) why this** — recall the prior card + open the
    gap; **(2) what's inside** — the concept cards as a short list + the optional depth areas; **(3) what
    you'll be able to do** — 2–3 competence outcomes. Derive parts 2–3 from the module's `STRUCTURE.md`
    card list + its *Leaves:* line so the brief can't drift. Keep it to one screen; close with a `:::key`
    (label `By the end · この章を終えると`). Plain, clear language — never cryptic. *(H1/H2/H3 briefs
    predate this format and are to be retrofitted.)*
  - **Concept** (default) — the teaching, built as a **stepped story** (§1c LOCKED 2026-07-09): a
    title-block + a `## story` of `:::step`s, each one modest screenful of narration + its figure
    (which evolves or swaps as the teaching needs). No collapsible legs. Grow depth by adding steps.
  - **Conclusion** — 1–2-sentence recap + bridge to next, at each section end.
- **One idea per card**, told across as many steps as the idea needs (each step a single screenful).
  Bullet a step where the prose gets paragraphy (steps accept `- ` lists).

**Retrieval beats — generative, not recognition (ADOPTED 2026-07-09, session 20; from Coursera LHTL's
illusion-of-competence finding).** A section's `:::recall` must make the reader **produce** an answer
(decode this byte string · which session re-locks security · what does `50 03` tell you), **never** one
answerable by mere recognition ("does this look right? ✓") — recognizing familiar material is the trap,
not the goal. In a rigidly-sequenced course, a later recall may **interleave a prior card's/module's fact**
("this is `$22`-land — but which byte told the ECU it was a *read*?") to teach selection, not just recap.
- **`:::elaborate` — a learner-generated beat (NEW directive · piloted in V2).** A second, *divergent*
  retrieval mode alongside the convergent `:::recall`: prompt the reader to build their own explanation /
  analogy / example ("In your own words, why is `+0x40` a fixed constant and not a field the ECU fills
  in?"), with a **model answer** in `<details>`. Elaboration is a distinct memory route (LHTL). Needs a
  `render.js` directive; **pilot exactly one in V2**, then decide whether to lock it into the card contract.

## 5. Worked examples

- **Bake the example into each concept, in place** — an expandable
  `<details class="ex">` panel for substantial ones, or an inline callout for one-liners.
- Never split into "method" then "worked example." Idea + illustration in one breath.

## 6. Ordering & framing (sequence is the argument)

- **Order deliberately and state the rationale** — concrete/domain-closest first, then
  widen; concept → evidence → the ask.
- **Never open with negation.** Lead with what a thing *is*; contrast comes later.
- **Set up before you validate.** Explain what the thing is and does first.
- **Motivate the problem before you define the answer (ADOPTED 2026-07-09 · piloted in V2).** A concept
  bar opens on the *design tension* the mechanism resolves, and reaches the definition as its answer — the
  term/notation is named **last**, not first. Discovery framing ("you could have invented this"): pose the
  constraint, let the answer feel inevitable, then name it. *E.g. before naming `+0x40`:* "The service
  number only uses the low bits — bit 6 is free. Set it, and `$10` becomes `$50`: reversible, unambiguous,
  free." The checkable shape is a **4-beat bar — Tension → invite a guess → Reveal → Name** (term last).
  **Piloted on V2's C1/C2/C3; lock into the MASTER CHECKLIST only after V2 proves it reads well** (do not
  yet mandate course-wide).
  - **Keep the invite-a-guess question and its Reveal in the SAME step/screen (LOCKED 2026-07-12 —
    flagged a "repeated failure").** Never end a step on the setup question and answer it at the top of the
    *next* step — that splits the beat across a slide change, so the reader reads the question, advances,
    then gets the payoff. If a step closes on a rhetorical question, **move that question to OPEN the step
    that answers it** (question + reveal on one slide, per §1f's app-slide model).
- **Name on the spot — plain idea, then its term, ADJACENT (LOCKED 2026-07-09, user feedback).** The moment
  a plain-language explanation lands, name it **right there** — never explain several parts plainly and then
  batch all the real terms into a later summary paragraph. *"A short control header goes first — it is the
  **A_PCI**"* etches far better than defining A_PCI three sentences on. This **refines** "name it last"
  above: the *card* still opens on tension before any term (the 4-beat), but *inside* the teaching each plain
  idea is christened the instant it is understood. And **do not avoid jargon** — give the dumbed-down
  explanation *plus* the real term openly; don't hide it or paraphrase it away.
- **Story continuity** — each unit flows from the one before and into the next; read the
  whole top-to-bottom as one story before shipping.
- **Forward pointers (spiral signposting).** When a card *names* a substantial topic it does **not**
  drill (e.g. Dcm, Dem, or a service that becomes its own module), append a small **`{{→ where}}`**
  deep-dive pointer to where it's drilled — e.g. `{{→ V9 · the Dcm pipeline}}`, `{{→ M3 · Fault
  memory}}`. The T-map already tells the reader depth drills exist; the pointer says *which* one, so
  a one-line mention reads as *deliberately deferred*, not shallow. Use **only** for topics worth
  pursuing — don't tag every term (that's clutter). (Renders as an accent pill; see `.fwd`.)

## 7. UI / scroll / diagram hygiene

- Identify the **real scroll container** first (mobile: `body`, not `html`).
- `min-width:0` down the flex/grid chain or a horizontal row blows out the column.
- `touch-action: pan-x pinch-zoom`; correct scroll-snap; don't double-count sticky offsets.
- **Responsive diagrams:** split wide two-panel SVGs into stacked full-width panels on
  mobile; figcaptions in readable sans + measure, not monospace.
- **Theme-aware diagrams:** author with the `.dgm` class system so they invert in dark mode.

### 7a. SVG geometry hygiene — nothing floats, nothing is off-grid (HARDENED 2026-07-05)

Loose geometry is the #1 tell of an amateur diagram. These are **binding, checkable** rules;
author coordinates from shared constants (a generator), never nudge shapes "by eye".

- **Connectors must touch both endpoints — exactly.** Every line / arrow / cable / leader
  **starts and ends on the anchor point of the shape it connects** (share the literal x,y with
  that shape's edge or a named anchor). A connector may **never** stop in empty space near a
  shape. If two things are related, their connector's coordinates equal their anchors — no gap,
  no overshoot.
- **Give shapes named anchors.** A node/port/box exposes explicit connection points (e.g.
  `in = left-centre`, `out = right-centre`). Every connector references those anchors; the
  drawn line and anything attaching to it use the **same** coordinates.
- **Animated motion MUST trace the drawn path.** A moving element (pulse/dot) follows the
  **same path data as the visible line** — build the `animateMotion path` (or offset-path) from
  the *same string/points* as the drawn `<path>`, concatenated across segments it traverses
  (e.g. cable → through the port → bus-line). The dot must sit *on* the line at every frame,
  never cut a chord across a corner. Verify at a mid-animation frame.
- **Align to a grid / shared lines.** Elements that belong together share a **baseline,
  centre-line, or column**. Panels in a sequence share one vertical mid-line; a flow arrow sits
  **on** that mid-line, centred in the gap and sized to span it (not a tiny mark adrift).
- **Composite icons: flush + centred + one scale.** Sub-shapes of an icon **share edges**
  (a top piece's bottom = the body's top), sit on a **single visual centre**, use **consistent
  stroke widths**, and are proportioned to a **common unit**. No sub-shape is accidentally
  bigger, offset, or hanging off.
- **Labels are anchored, not adrift.** A text label is **centred on / baseline-aligned with**
  its target (or leader-connected to it). A caption inside an icon (e.g. `!` in a warning
  triangle) is centred on that icon's centre, not its edge.
- **Consistent sizing.** Repeated elements (chips, nodes, gauges) use one size; related
  elements use a deliberate size scale. Nothing dominates by accident.
- **Padding / breathing room is mandatory — nothing touches.** Every element keeps a clear
  inset from its container's border and from its neighbours: **text never starts flush against a
  box edge**, an **icon never touches its enclosing shape / halo**, a label never crowds the next
  panel. Budget an explicit padding constant and place content inside it. Prefer a **soft /
  gradient glow** over a hard-edged circle so a "lit" element has no border to collide with. When
  two panels sit side by side, the divider/label between them gets its **own padded lane**.
- **Draw the real thing, sharply.** A domain glyph (e.g. a check-engine lamp) must be
  **recognisable as that object**, not a vague blob — use its distinctive features (an engine =
  blocky body + valve-cover step + pulley + gear teeth), crisp/angular where the real object is,
  and verify it reads at rendered size via a close-up. "Looks like something else" is a fail.
- **Place via a layout framework, never by eye.** Repeated or paired components (boxes, rows,
  chips, list items) are emitted by a **shared function** driven by **named spacing constants**
  (`PAD`, `GAP`, `ICON_W`, box width, column x…). Paired elements — a CLIENT box and a SERVER box,
  every card, every chip — are then **symmetric by construction**: same function + same constants =
  identical insets. "Equal padding" must mean *literally the same constant*, not a similar-looking
  hand number. An icon column is a fixed slot; icons **share a left edge** so their box-edge→icon
  gap is identical. Verify by measuring box-edge→content on both in a close-up.

### 7b. Figure text — labels, callouts, captions (professional practice, researched 2026-07-05)

Grounded in technical-writing / information-design practice. Three deliberate kinds of figure text:

- **Label** — *names* an element; short, self-explanatory, sits **on or beside** the thing. Use to
  name parts (e.g. `OBD-II`, `SERVER`).
- **Callout** — a label **plus a leader line/arrow** to a feature that needs outside explanation.
  With many, use **keyed callouts** (numbers/letters on the art + a small legend). **Directional
  labels** ride arrows (`request →`) to show flow.
- **Caption — BELOW the figure** (convention), stating the **takeaway** (what to remember), *not* a
  restatement of the labels. Standalone, brief; it carries the **small explanation + provenance**.
  **Move prose off the image into the caption** — a callout beats a paragraph drawn on the image.

Rules:
- **Write the caption first** — naming the takeaway fixes the figure's one goal before you draw.
- **One paragraph of complexity, max.** If more is needed, split into subsystems (more legs/figures).
- **Text hierarchy:** on-image labels are small/functional; **one focal point** is emphasized (accent
  or a shape that breaks the pattern); explanation sits **below**, at reduced size. Never clutter.
- **Leader lines** are short, straight or gently curved, and **never cross** each other or other art.
- **Reduce, don't decorate:** minimize on-image color/text to what teaches (semantic only).
- **Dual-channel term parity (ADOPTED 2026-07-09 · piloted in V2).** A figure's on-image label = the
  **same string** as the ochre key term beside it in the prose, verbatim (`$50` / `+0x40` / `SID`, not a
  paraphrase like "session control"). The label and the bold token are two routes to one memory, so they
  must read identically. Apply first on V2's byte-box figures.

> Sources: Google *Technical Writing — Illustrations*
> (developers.google.com/tech-writing/two/illustrations); Saylor *ENGL210 — Labels, Callouts,
> Captions, and Notes*; oXygen *DITA Style Guide — Callouts*.

### 7c. Figure IDs, titles & filenames — the figure register (LOCKED 2026-07-07)

Every figure gets a **stable ID + a human title**, recorded in the module's `STRUCTURE.md` **figure
register**, so a reviewer can point at a figure and give feedback without opening the HTML.

- **Figure ID = `<CARD>-F<k>`**, card-scoped: `<card-id>` + `-F` + the figure's index within that card
  (`F1` = the card's canonical bar figure; `F2, F3…` = its go-deeper leg sketches, in reading order).
  E.g. `H2-C3-F1`. Card-scoped (not a flat per-module counter) so inserting a figure never renumbers
  the others, and the ID says exactly where the figure lives.
- **Title** = a short human title = the figure's *takeaway* (matches the caption intent, §7b).
- **Filename = `<card>-f<k>_<kebab-title>.svg`**, lowercase, in `<module>/assets/figures/`.
  E.g. `h2-c3-f1_one-real-request.svg`. The `id_title` filename is the "figure_title.extension"
  handle for feedback; filenames are globally unique (card-scoped prefix prevents collisions like the
  old shared `c3-addressing.svg`).
- **The figure register lives in `STRUCTURE.md`** (one table per module: ID · title · card/leg ·
  filename), authored as part of the flow spec (§1e) and kept 1:1 with the actual SVGs.

### 7d. Visual-cast lexicon, motion grammar & staged reveal (ADOPTED 2026-07-09, session 20)

From the exemplar study (`_derive/exemplar-rigors.md` — TLDR · Jigsaw · 3Blue1Brown + Coursera LHTL).
**§1b defines the palette by *role* (accent/positive/negative), never by *domain object*** — so across
40+ unbuilt figures the recurring cast (client, ECU, request, reply, byte-box) would drift and, worse,
already **collides**: the ECU/server is painted olive `grn-s`, the *same* hue that means "positive / OK."
This section binds each recurring object and each meaning-of-motion once, so a figure can't drift and a
lint can catch a violation. **First authored under this system: V2** (its 3 byte-figures pilot the whole
block); shipped V1/H1–H3 figures are repainted to it later (parked backlog).

**(1) Visual-cast lexicon — one object = one class + glyph, everywhere.** Each recurring domain object
gets a stable `.dgm` class + token + glyph; a figure names an object by that class, never by an ad-hoc
colour. Bind in `blueprint.css` (`--actor-tester` / `--actor-ecu` tokens, added to the `.dgm` block) and
list in every module's figure register header:

| object | role in the story | class / token | glyph |
|--------|-------------------|---------------|-------|
| **client / tester** | asks | `--actor-tester` (ochre family, *as object identity*) | laptop / hand-unit |
| **server / ECU** | answers | `--actor-ecu` (a **distinct** hue, NOT the olive `--ok`) | chip / ECU box |
| **request** | message client→server | direction class `.req` (→, warm) | right-arrow |
| **reply** | message server→client | direction class `.rsp` (←, cool) | left-arrow |
| **byte-box** | one byte of a message | the shared generator (see (4)) | boxed hex pair |
| **bus / wire** | the medium | `.bus` neutral grey | line |

**(2) Semantic overrides thematic — encode pos/neg by GLYPH + STROKE, not by re-using a hue (fixes the
live §1b violation).** Positive vs negative response is signalled by a **✓ / ✕ glyph + stroke-weight +
solid-vs-hatched fill**, so the *reply channel's* colour (olive = "the answering side") no longer
double-encodes "OK." Green `--ok` is reserved for genuine pass/OK states only; red `--ng` for genuine
danger/NG only. Never-meaning-by-colour-alone still holds (§1b) — the glyph is the label.

**(3) Motion grammar — a fixed vocabulary of meanings-of-motion** (a layer §7a/§1f don't cover; §7a only
says a dot must *ride the path*). One kind of motion = one meaning, course-wide:

- **left→right travel along the bus** = a message on the wire (§1f byte-box travel).
- **a token settling into a node** = a state change (session enters; a lock snaps).
- **a piece lifting out and resolving** = a decode (`00 32` lifts → "50 ms").
- **a token deflecting/bouncing off a gate** = a rejection (`7F+NRC` born at the failing check).
- **a bit visibly toggling** = a computed transform (`10` sets bit 6 → `50`).

Emit motions from a shared animation helper so the vocabulary stays literal, not per-figure improvised.

**(4) Object constancy — one shared byte-box generator.** Byte-boxes are drawn by **one** shared SVG
helper (named constants `BOX_W`, `RADIUS`, role-stroke, gap — per §7a's layout-framework rule), so a given
byte renders **pixel-identical** across every figure in which it appears. No figure hand-draws its own
byte-boxes. (Today `renderBytes` in `render.js` handles the `:::bytes` HTML directive only; the SVG
generator is the figure-side twin.) **First consumer: V2's three `50 03` / `+0x40` figures.**

**(5) Staged / progressive figure reveal — click-to-advance (the strongest cross-exemplar signal; 3 of 4
exemplars converge).** A high-load static diagram is **built up one element at a time**, each element
lighting as the prose names it (Mayer segmenting + spatial contiguity). Our medium is silent + self-paced,
so a reveal is **reader-driven click-to-advance**, never an auto-loop — it obeys the same pace as the
one-card pager. Mechanism: a `:::figure` **`build-order`** capability in `render.js`; the reveal order is
recorded in the module's §7c figure register. **Reveal ≠ decoration:** each stage must correspond to one
naming beat in the prose.

- **Animate the *consequence*, not just the path (3B1B).** Where a figure's whole point is a
  transformation or a coupled state-change, *show the change at the transition instant* — the bit flips,
  the lock snaps, the token deflects — not merely a dot travelling a finished line.

**(6) `prefers-reduced-motion` + "the static end-frame must teach" (ADOPTED — a11y gate, prereq for (5)).**
`blueprint.css` carries `@media (prefers-reduced-motion: reduce)` freezing every `.dgm` animation at its
**end state**. Binding rule: **the frozen end-frame must teach the whole idea on its own** — animation is
an accelerant, never the only channel. Verify the frozen frame in §9.

**(7) Lint.** `_template/checkmod.js` grows a cast check: a client box drawn in the ECU's token (or vice
versa), or pos/neg encoded by hue with no ✓/✕ glyph, is a **lint fail** — same standing as text overflow.

## 8. Artifact craft — build unit by unit, never by eye

For each unit (slide · panel · figure), in order: (1) state the unit's objective,
(2) choose visual + textual elements, (3) lay out where each sits **on a coordinate grid with
named anchors** (§7a) — not by eye, (4) check UI hygiene (alignment · fit · margins · spacing ·
**no text overflow** · palette · fonts · emphasis · placement · **§7a geometry: connectors touch
anchors, motion traces the drawn path, icon sub-shapes flush & centred, labels anchored**),
(5) build SVG/illustration to **professional grade** (regenerate if not), (6) place everything,
(7) **run the Element Completion Checklist (below)**, (8) next unit. **Iterate each unit until its
goal is met.** Result must read **professional, never generic or "AI-styled."**

### 8.7 Element Completion Checklist (RUN after every element — write-up *or* drawing)

After finishing **any** element — a sentence, a bullet, a figure, a caption, a card — run this and
answer honestly; **fix before moving on** if any answer is no/uncertain. This is the per-element exit
gate for the whole course.

1. **Goal reached?** — does this element achieve its one purpose?
2. **Does it look good?** — professional, on-brand, not generic/"AI-styled"?
3. **Is it conveying the message?** — would a no-context reader get it?
4. **Is anything off?** — check concretely (these are the recurring failures):
   - **Alignment** — shared baselines/centres; an icon and its text are **co-centred**; list items
     and text-block left edges line up; nothing sits visually crooked.
   - **Padding** — nothing touches a border or a neighbour; content sits inside a consistent inset;
     the **longest** text line fits with margin to spare (**no overflow**, even in JP).
   - **Geometry** — every connector touches its anchors; any animated element rides the drawn path (§7a).
   - **Sizing / proportion** — one consistent scale; nothing dominates by accident.

When driving a figure in-browser, **verify these with a close-up** (light + dark, and a frozen
animation frame) — don't judge from the source.

## 9. Verification — don't declare done from theory

- **Verify by driving a real browser** (`puppeteer-core` + system Chrome, installed
  `--no-save`, package.json untouched): measure the DOM — card counts/types, one-card-per-
  view, **zero text overflow**, no console errors, nav landing — and screenshot **light /
  dark / mobile**, in **every theme**.
- **Layout-bug evidence ceiling:** if a render bug isn't fixed in 2 iterations, stop and get
  browser evidence (computed styles, offsets, screenshot) before a third attempt.
- **Geometry / attachment audit (per figure with connectors or motion):** close-up screenshot
  each illustration (light + dark) and confirm §7a: every connector endpoint sits **on** its
  node (no gap/overshoot), the animated dot rides **on** the line (capture a mid-animation
  frame), icon sub-shapes are flush & centred, labels are anchored. Treat a floating line, a
  chord-cutting dot, or an off-centre glyph label as a **fail**, same as text overflow.
- **Reduced-motion + static-end-frame audit (per animated figure, ADOPTED 2026-07-09):** confirm
  `@media (prefers-reduced-motion: reduce)` freezes the figure at its **end state** and that the frozen
  frame **teaches the whole idea alone** (§7d-6). A figure whose meaning only exists mid-animation is a fail.
- Reusable scripts per module: `verify.js`, `shots.js`, `navtest.js`.

---

## Module build recipe — the GATE LADDER G0–G5 (restructured 2026-07-10, governance session)

> **Gates fire in this order, per card, regardless of prompt order.** Which gates bite for a given
> session is *curated by its work-type* (`work-types.md` — e.g. `B-PAGE` runs all; `R-FIG` runs only
> G2–G5). Enforcement is 3-layered (work-types.md §Enforcement): **L1** mechanical (`checkmod`),
> **L2** adversarial fresh-context (`/teach-back`, figure judge), **L3** the human sign-off.
> This ladder *supersedes* the older 7-step recipe; the two 2026-07-09 pressure-tests
> ([[feedback-build-pressure-tests]]) live on as G1 and G3.

**Pre-work (before any card):** read [[COURSE]] → `NEXT.md` → this file → the module's
`STRUCTURE.md` + `NOTES.md` (create if new). If the module's `STRUCTURE.md` § is missing or stale,
that is a **`D-HV` session first** (§1e — the card scaffold is derived, never improvised), shown to
the user before building.

- **G0 — Structure (pre-flight).** The card exists in `STRUCTURE.md` with its flow links; its
  **load-bearing sentence is written FIRST** (§2c move 1) into the card's `load_bearing:`
  front-matter — the one sentence the reader must end up able to say, fixed *before* authoring can
  substitute a weaker proxy. **Title-directness check (LOCKED 2026-07-12 — recurred ≥4×, "same fb again
  and again"): the card `title` MUST pass the OK/NG title bar** ([[feedback-prose-and-wording]]) *before*
  authoring — it names the **one idea, concretely and specifically** (a reader knows what they'll learn
  from the title alone), **couldn't be swapped onto another card** (not generic), and is **declarative**
  (not a vague label). Write the title, then hold it to that bar; a vague/generic/label title is a G0
  blocker, not a nit. *(Candidate `rigor.js` flag: generic/label titles.)*
- **G1 — Story pressure-test** (after writing the story, before prose polish/figures).
  **FIRST the §2c derivation gate (the CENTRAL check):** interrogate every claim/label — *why true?
  how known? is the WHY on the card or only in my head?* — add any missing rung (the `40h`
  place-value miss); a load-bearing claim's `derivation:` note is recorded in the front-matter. For
  a **load-bearing card, externalise the judge — the `/teach-back` no-context subagent** (§2c move
  3); its faith-list is the gap list, fix every rung. **Then the §2b prose-&-term lint per sentence**
  (canonical term · precise not vague · REAL claim double-derived against the clause · right actor ·
  self-contained). **Then gaps · continuity** (each card/step flows from the last into the next; a
  necessary break is *stated* and the return signposted; hand-offs clean). Exit question, in the
  learner persona: *"am I understanding this card?"* An unearned claim, missing rung, conveyed
  proxy, term drift, vague quantifier, false agency, or load-bearing "in H2 …" is a **blocker**.
- **G2 — Figure plan** (per figure, before drawing). State the figure's **objective** and write the
  **caption first** (§7b — the takeaway fixes the goal); choose the elements; lay them out **on a
  grid with named anchors** (§7a, layout framework + named constants); assign the **§7d cast**
  (actor tokens, glyphs, motion vocabulary); fix the **reveal order** if staged (recorded in the
  figure register). Drawing before planning is the "by eye" failure §8 exists to prevent.
- **G3 — Figure audit** (after drawing — the old DIAGRAM pressure-test). §7a geometry via
  **close-up, light + dark (+ a mid-motion frame)**: connectors touch anchors, motion rides the
  drawn path, labels anchored, nothing floats/touches. §7d cast + motion-grammar lint; the
  `prefers-reduced-motion` **end-frame teaches alone**; the figure **headlines its step's point**,
  not the card's conclusion (§1c). Then the same gaps/continuity/persona interrogation as G1,
  applied to the figures. *(Optional L2: a fresh-eyes agent reads the figure cold — "what does this
  teach?" — a mismatch with the intended takeaway is a finding.)*
- **G4 — Verify (whole page, in-browser, §9).** `checkmod` green: card list matches `STRUCTURE.md`
  1:1, `load_bearing:` present, EN-on-load + lang isolation, **zero overflow**, **zero console
  errors**, cast lint; storyshot viewport-fit. Update the **gate scorecard in `NOTES.md`** (per
  card: G0–G4 ✅/❌ + whether teach-back ran and its faith-list closed).
- **G5 — Publish.** Append `wiki/log.md`; refresh `NEXT.md`; **`git add -A && git commit && git
  push`** (git root = `wiki/learn/`, branch `main`) — the live site is the deliverable, **not done
  until pushed**; confirm the push landed ([[reference-github-repo]]). Local working artifacts +
  screenshots stay untracked (local ignore rules; not committed).

**Standing build rules (inside G1–G3):** reuse the shared template + renderer, never restyle (§1d/
§1f); author each concept as a `## story` of `:::step`s (§1c); bilingual EN/JP; notation per
[[COURSE]] (hex `h`-suffix); build **unit by unit** (§8); **teaching drives the figure** (§1c).
**Module exit (the last page's G5):** every V has an H bar (bar-coverage); the module reads
top-to-bottom as one story; UDS modules end with the **SOVD-bridge card** ([[COURSE]] roadmap).

## Notation & shared facts

- Services written `$10`; bytes in byte-box diagrams. Positive response = SID + 0x40;
  negative = `7F <SID> <NRC>`. Hex values always converted before being read as numbers.
- **Sourcing philosophy (documents-first) — LOCKED 2026-07-04.** The build pipeline is:
  **analyse the primary standards → list all topics → scope which are foundation → present each
  topic horizontally *and* vertically (§1c-scale), not partition it** — under the bar-coverage
  invariant. The **primary standards are the source of truth**; the internet / domain knowledge is
  a **subordinate gap-filler** used only when a needed spec isn't available locally or for pedagogy, and
  it is **always reconciled back to a cited clause**. Pressure-test each claim by double-deriving
  against the actual clause (not the TOC) before it ships.
- Sourcing is **documents-first**: ground every claim in the governing standard (the **UDS ISO
  14229** family, transport **ISO 15765-2** / **ISO 13400-2**, **SOVD** ISO 17978, **ODX** 22901,
  **OTX** 13209, **AUTOSAR CP**) and **cite the clause**. A few points (**ISO 11898-1** CAN
  data-link, **ISO 15765-4** CAN-ID assignment, **ISO 14229-4** UDSonFR) are filled from training +
  internet and reconciled to the primary clause. *(Operational sourcing notes — the reference set +
  how to search it — are kept locally and untracked; see `_derive/SOURCES.local.md`.)*

---

## 10. Working economically — token discipline (LOCKED 2026-07-06)

**Principle: use the heavy tools *judiciously*, not less capably.** Match the cost of a step to what
it is for. (Set by user 2026-07-06 — sessions had been burning the weekly token budget fast.) None of
these ban a capability; they say *when* it earns its cost.

- **Multi-agent workflows / pressure-tests — reserve for where they pay.**
  - A **single card**: a self-review pass (§8.7 + the master checklist, run *silently*) plus at most
    one small targeted check. No fleet.
  - A **milestone** (a whole module done) or a **genuinely uncertain / high-stakes claim**: a
    pressure-test is warranted — but **size the fleet to the task** (a few agents, not dozens) and
    **cap rounds**: stop at the first round that returns 0 blockers; never iterate-to-zero over many
    rounds. State an explicit agent budget when launching.
- **Documents — grep, don't graze.** Search the **local source set** for the specific clause, not
  whole-file reads; open a source document only when a quick search is garbled for a needed
  table/figure (and note it). Load a standard only to ground a specific claim — not "just in case."
  *(Where the local set lives + how to search it: `_derive/SOURCES.local.md`.)*
- **Checklists run silently.** The master checklist and §8.7 are an **internal** per-card gate; do not
  paste them into chat.
- **Verify by measuring before screenshotting.** Prefer DOM/text measures (card counts, overflow,
  console errors, lang isolation). Read an **image into context only** for the figure/geometry audit
  that genuinely needs eyes (§9), and only that close-up — not full-page light/dark/mobile as images.
- **Keep the auto-loaded floor lean.** Auto-loaded docs (`COURSE.md`, this file, `PEDAGOGY.md`) carry
  only durable roadmap / rules. **Volatile state → `NEXT.md`** (the dashboard, not auto-loaded; read
  at open, refreshed at wrap); **session-by-session narrative → `wiki/log.md` + git history**; long
  derivations stay in `_derive/` and are *referenced*, never inlined.
- **Tool hygiene.** Redirect noisy output (`2>/dev/null`), read only the lines/regions needed, and do
  not re-read a file already in context unless a tool requires it.

---

## ✅ MASTER CARD CHECKLIST — the single run-list (ship nothing that fails)

Run this for **every card** before calling it done. It consolidates §1–§9 + [[PEDAGOGY]] into one
place. **Verify visual items with an in-browser close-up (light + dark + mobile) — not from source.**
Any ❌/uncertain = fix before shipping.

**A · Content & language** *(B/C apply to Concept cards; A/D/E to all)*
- [ ] **Card type correct for its role** (Divider = title only · Brief = sets up, not teaching ·
      Concept = T · Conclusion = recap+bridge) (§4)
- [ ] One idea per card = **one teachable chunk** (= §8.7 Q1 at card scale) (§4, PEDAGOGY 2)
- [ ] Very simple English; **jargon defined on first use**; key terms **bold → accent (ochre)** (§2)
- [ ] **Prose-&-term lint (§2b), run per sentence in persona:** (1) canonical term every time (from
      [[GLOSSARY]] — no synonym drift, e.g. always "service identifier / SID") · (2) precise not vague
      (name the bits/range, not "the low ones") · (3) the sentence states the REAL claim, double-derived
      against the clause (no plausible-but-wrong) · (4) right actor, no false agency ("**you sent**"→ the
      tester sends) · (5) self-contained, no load-bearing "in H2 …" recall
- [ ] **Bilingual EN + JP** both present; JP natural register, upright emphasis (§2)
- [ ] **Hex `h`-suffix everywhere** ([[GLOSSARY]] hex rule): every hex value `NNh` — inline, byte-box
      cells, and traces (`50h 03h …`); positive = SID+`40h`, negative `7Fh …`; bit values `0`/`1` bare
- [ ] **No meta-framing** in the body (provenance → the `:::reading` footer, see B) (§2)
- [ ] **Bullets used consciously** — prose where ≤~3 lines suffice · **numbered** only for a real
      sequence · unnumbered else · **marker matches meaning** (`{key}`/`{warn}`/normal, per SCHEMA.md)
- [ ] **Hook / curiosity gap before the definition**; concrete before abstract; never open on negation (§6)

**B · Structure (concept cards)**
- [ ] **T-shape**: one high-level bar + **one** canonical illustration; depth in collapsed legs, each
      with its own sketch (§1c)
- [ ] **Chunk cap respected** — ≤~4 detail legs on the T; a deep leg holds ≤~4 nested cards; if a
      level needs more, split it (§1c)
- [ ] Worked example **baked in place** (§5)
- [ ] **Continuity** — the card flows from the previous and into the next; back/forward nav present at
      module edges (§6, PEDAGOGY 10)
- [ ] **Forward-pointer `{{→ where}}`** on substantial *named-but-deferred* topics; not on every term (§6)
- [ ] Section ends with **recap + a retrieval beat** (`:::recall`) **+ a competence beat** ("you can
      now X"); visible progress / opt-in depth intact; SOVD **bridge** on module end (§6, PEDAGOGY 9/12)
- [ ] **`:::recall` is generative, not recognition** — the reader *produces* the answer, never confirms a
      shown one; later beats may interleave a prior fact (§4, LHTL)
- [ ] **Compact `:::reading` footer** — provenance/citations here (not the body); standards get
      **document + clause numbers** (§7b)

**C · Figures (every illustration)**
- [ ] Depicts the section's **KEY TEACHING**; visual form matches meaning (sequence→timeline,
      structure→blocks, comparison→split, message→byte-boxes) (§3, PEDAGOGY)
- [ ] **Anchored to its claim** — in the same field of view as the sentence it illustrates, never
      batched after a table (§3, PEDAGOGY 3)
- [ ] **Coherence** — every element (word, bullet, figure, colour) teaches; cut decoration, tangents,
      duplicate channels (§7b, PEDAGOGY 4)
- [ ] Schematic, **theme-aware `.dgm`**, self-drawn (or a *flagged* user-supplied hard element);
      **animation only if it teaches**
- [ ] **Visual-cast lexicon obeyed** — each recurring object in its locked class/token/glyph; **pos/neg by
      ✓/✕ glyph + stroke, not by re-using a hue**; on-image label = the bolded prose token verbatim (§7d)
- [ ] **If animated:** obeys the **motion grammar** + is **click-to-advance** (not auto-loop); has a
      `prefers-reduced-motion` freeze whose **static end-frame teaches the whole idea** (§7d)
- [ ] **Caption BELOW = the takeaway**; prose moved off the image; **labels** name parts, **callouts**
      use leaders, **directional labels** on arrows (§7b)
- [ ] Built from a **layout framework** (shared fn + named constants) → paired elements **symmetric
      by construction**; "equal padding" = the *same constant*, measured (§7a)
- [ ] **Geometry**: every connector touches its anchors **exactly**; animated dot **rides the drawn
      path**; nothing floats (§7a)
- [ ] **Padding**: nothing touches a border/neighbour; **longest** text fits with margin; soft/gradient
      glow over hard halos (§7a)
- [ ] **Alignment**: icon **co-centred** with its text; shared baselines/centres; one consistent scale (§7a)
- [ ] Domain glyphs **recognisable as the real object**, sharp; verified at rendered size (§7a)

**D · Palette & signal ("Ochre & Olive", §1b)**
- [ ] White canvas · **dark-grey `--chrome`** bars/buttons/dividers · **ochre** accent · **olive-green**
      positive · cool greys
- [ ] **Semantic overrides thematic**: **red** = NG/danger · **olive-green** = OK/pass · **grey** =
      neutral/disabled — and **never by colour alone** (pair with label/shape)
- [ ] **One focal point** per view; **WCAG ≥ 4.5:1** body; **no stray hardcoded colours** (use tokens)

**E · Verification (never declare done from theory, §9)**
- [ ] Rendered; driven in **Chrome**; **DOM card count/types match the module scaffold in `NOTES.md`**;
      **EN on load**; lang toggle isolates (EN→0 JP, JP→0 EN)
- [ ] **Zero text overflow + zero console errors** in **light / dark / mobile**
- [ ] **Per-element self-critique** run (§8.7): goal? looks good? conveys? anything off
      (align/pad/geometry/size)? — judged from a **close-up**, not source
- [ ] **SVG-internal overflow / floating connectors** checked via close-up (the DOM check can't see them)
- [ ] `NOTES.md` (incl. the gate scorecard) + `wiki/log.md` + `NEXT.md` updated

**(module exit, not per-card)** Every V drill has a bar in the H-spine — **bar-coverage invariant**
(§1c-scale); the module reads top-to-bottom as one story.
