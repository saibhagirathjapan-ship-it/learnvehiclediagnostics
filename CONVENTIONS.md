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

## 1c. Concept cards are T-shaped (information architecture)

Every **concept** is a **T**: a broad, shallow **bar** (high level) over a narrow, deep **stem**.

- **Horizontal bar** = the high-level claim, self-sufficient alone, carrying the **one**
  canonical illustration. A reader who reads only bars still gets the whole module.
- **Vertical stem** = collapsible **detail legs** (`<details>`) stacked along a real left-hand
  rule so the layout *is* a T. Each leg = one nuance / mechanism / edge-case. **Collapsed by
  default** → reading view stays one-idea-per-screen (chunk-safe); depth is opt-in.
- **T-glyph wayfinding:** header glyph = bar lit ("high level"); each leg lights its own stem
  segment.
- **Illustrate depth too:** every leg carries its *own* supporting sketch — text-only depth is
  an IA failure (see [[PEDAGOGY]]).
- **Legs can nest cards.** A leg is a *container*: usually **one card**, but a deep leg may
  hold a short stack of up to **~4 cards** (each a single chunk). Depth grows by *adding cards
  inside a leg*, never by overstuffing one card.
- **The ~3–4 cap is per level** (legs on a T · cards inside a leg) — **not** per module, which
  may hold **many** concept-Ts and cards in total. If a level needs more than ~4, split it.

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

## 2. Phrasing (audience-facing)

- **Very, very simple English** — short words, short sentences, one idea per sentence.
- **Jargon only when the plain word won't do**, and **define it on first use**.
- **Bold** key terms; define a term the first time it appears.
- **No meta-framing.** Never write "this is a simple explanation of…" or leak how you were
  told to write. Give the substance directly. Provenance goes in a small footer, not a banner.
- **JP alongside EN**, natural teaching register (not machine-literal).

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
  - **Brief** — sets up / summarizes; header band + short body. Not teaching.
  - **Concept** (default) — the teaching, built as a **T** (§1c): title-block + high-level
    **bar** with **one** canonical illustration, then collapsible **detail legs**.
  - **Conclusion** — 1–2-sentence recap + bridge to next, at each section end.
- **One concept = one top-level illustration** (on the bar). Leg figures are *additional*
  depth sketches — required (illustrate depth), but they are not the top-level one.

## 5. Worked examples

- **Bake the example into each concept, in place** — an expandable
  `<details class="ex">` panel for substantial ones, or an inline callout for one-liners.
- Never split into "method" then "worked example." Idea + illustration in one breath.

## 6. Ordering & framing (sequence is the argument)

- **Order deliberately and state the rationale** — concrete/domain-closest first, then
  widen; concept → evidence → the ask.
- **Never open with negation.** Lead with what a thing *is*; contrast comes later.
- **Set up before you validate.** Explain what the thing is and does first.
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

> Sources: Google *Technical Writing — Illustrations*
> (developers.google.com/tech-writing/two/illustrations); Saylor *ENGL210 — Labels, Callouts,
> Captions, and Notes*; oXygen *DITA Style Guide — Callouts*.

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
- Reusable scripts per module: `verify.js`, `shots.js`, `navtest.js`.

---

## Module build recipe (apply to M2…M10)

1. Read [[COURSE]] → this file → the module's `NOTES.md` (create it if new).
2. Draft a **card scaffold** (nugget list) and show the user before auto-running.
3. Reuse the **shared Blueprint template + renderer** (do not restyle): author each concept as
   a **content MD file** (§1d) and render to the self-contained HTML page; keep the T-card
   taxonomy (§1c), bilingual EN/JP, bundled fonts, `.dgm` diagrams, accent-highlight, notation
   (`$xx`, byte-boxes, +0x40, 7F+NRC).
4. Build **unit by unit** (§8); pressure-test each concept's technical claims (double-derive
   against the standard) before moving on.
5. End each UDS module with a bridge card mapping the capability to its **SOVD resource
   category** (see [[COURSE]] roadmap).
6. Verify in-browser (§9). Update `NOTES.md`, append `wiki/log.md`, update [[COURSE]] Current
   Focus.

## Notation & shared facts

- Services written `$10`; bytes in byte-box diagrams. Positive response = SID + 0x40;
  negative = `7F <SID> <NRC>`. Hex values always converted before being read as numbers.
- **Sourcing philosophy (documents-first) — LOCKED 2026-07-04.** The build pipeline is:
  **analyse the primary standards → list all topics → scope which are foundation → present each
  topic horizontally *and* vertically (§1c-scale), not partition it** — under the bar-coverage
  invariant. The **primary standards are the source of truth**; the internet / domain knowledge is
  a **subordinate gap-filler** used only when a needed spec isn't in the vault or for pedagogy, and
  it is **always reconciled back to a cited clause**. Pressure-test each claim by double-deriving
  against the actual clause (not the TOC) before it ships.
- Sources present in `the source standards/`: **UDS ISO 14229** parts -1 (2020 + 2025 FDIS), -2, -3, -4,
  -5, -6, -7 · **AUTOSAR R25-11 CP** (Dcm, Dem, Dlt, DoIP, J1939 Dcm) · **transport: ISO 15765-2:2024**
  (`CAN/`) + **ISO 13400-2:2012** (`DoIP/`) · **SOVD** (ISO 17978/…) · **ODX** (22901) · **OTX**
  (13209). local source notes for grep/read live in `wiki/learn/local notes/` (`raw/`
  stays pristine). **Not in vault (fill from training + internet per user 2026-07-05, reconciled to
  the primary clause):** **ISO 11898-1** (CAN data-link), **ISO 15765-4** (CAN-ID assignment),
  **ISO 14229-4** (UDSonFR, unreadable `.doc`). Ground SOVD from `the source standards/ExVe SOVD/`.

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
- [ ] **Bilingual EN + JP** both present; JP natural register, upright emphasis (§2)
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
- [ ] `NOTES.md` + `wiki/log.md` + [[COURSE]] Current Focus updated

**(module exit, not per-card)** Every V drill has a bar in the H-spine — **bar-coverage invariant**
(§1c-scale); the module reads top-to-bottom as one story.
