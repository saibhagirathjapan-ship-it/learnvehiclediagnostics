# Pedagogy — the learning-science laws every module MUST follow

**This is the "why it works" layer.** [[COURSE]] is *what/where/status*; [[CONVENTIONS]]
is *how we build* (mechanics, UI hygiene, verification); **this file is the binding set of
learning-science principles those mechanics serve.** Auto-loaded each session via a
`@`-import in the project `CLAUDE.md`. If a build decision conflicts with a rule here, the
rule wins unless the user signs off on an exception.

Every rule is grounded in an established framework (named in §Frameworks) so it is
checkable, not opinion. Each module is graded against the **Validation checklist** (§end)
before it can be called done — that checklist is the audit rubric.

> **When authoring or reviewing content, open [[pedagogy-research]]**
> (`wiki/learn/pedagogy-research.md`) — the *verbatim* long-form research: the framework
> tables and the concrete "→ for our course" mappings. This file is the condensed binding
> layer; that one holds the full reasoning, so consult it to draw on the pedagogy faithfully.

---

## The 12 golden principles (binding)

1. **Start from what they know.** Anchor every new idea to a familiar one; concrete
   before abstract; never open with negation. *(Ausubel; concreteness)*
2. **One idea per chunk.** Protect the ~4-slot working memory — one nugget = one idea, one
   illustration. *(Sweller — Cognitive Load Theory; Miller)*
3. **Show and tell in the same breath.** Words sit *beside* the picture that explains them;
   never batch figures away from their claim. *(Mayer — multimedia + spatial contiguity)*
4. **Cut everything that doesn't teach.** Every element justifies its cognitive cost;
   decoration, tangents, and duplicate channels are load, not value. *(Mayer — coherence; Tufte)*
5. **Open the question before the answer.** Create a felt gap, then close it — curiosity is
   the pull. *(Loewenstein — information-gap theory)*
6. **Name it, then use it.** Define a term the first time it appears; teach vocabulary
   before the process that needs it. *(Mayer — pre-training; bold-on-first-use)*
7. **Model the work in place.** A worked example lives *inside* the concept, not in a
   separate "examples" section. *(worked-example effect)*
8. **Talk like a person to a person.** Warm, direct, second person, plain words — and **no
   meta-framing** (provenance goes in a footer). *(Mayer — personalization + voice)*
9. **Repeat to remember; retrieve to keep.** Recap *and* make the reader recall — a recap
   alone is the weaker half. *(Ebbinghaus — forgetting curve; testing effect / retrieval practice)*
10. **Every part connects to the next.** One continuous story; each module reachable looking
    back and pointing forward; revisit concepts at growing depth. *(narrative; Bruner — spiral)*
11. **Signal what matters.** Clear hierarchy, one focal point per view, consistent
    *semantic* color, never meaning-by-color-alone. *(Mayer — signaling; Gestalt; WCAG)*
12. **Respect their autonomy.** Self-pacing, visible progress, opt-in depth, and frequent
    "you can now do X" competence beats. *(Deci & Ryan — Self-Determination Theory)*

---

## Who we write for / as

**The learner** — a motivated professional with *zero* prior context, time-boxed to one
sitting, reading on laptop **and** phone, bilingual (may lean on either language), who
**scans before reading** and has **no instructor in the room** — so the page must answer
every "wait, what's that?" itself. Design for limited working memory, prior-knowledge
hooks, and the running question *"why should I care, and can I do this?"*
*(Knowles — andragogy; SDT; CLT)*

**The instructor voice** — an **OEM systems engineer** explaining to a respected peer who
happens not to know this yet: credible, precise, generous; never talks down, never pads.
The permanent discipline is beating the **curse of knowledge** — never skip the step the
novice needs. *(Feynman; Heath & Heath; cognitive apprenticeship — model → coach →
scaffold → fade)*

---

## Applied rules by area (what the principles demand)

### Structure & load
- Segment into single-idea nuggets; keep opt-in depth in `<details>` (progressive disclosure).
- Front each section with an **advance organizer** (divider + brief) before detail.
- A card that carries a table *and* a diagram *and* three long paragraphs is doing too much
  — split it (Principle 2/4).

### Story & framing
- Order is the argument: concrete/domain-closest first, then widen; concept → evidence → ask.
- Every concept card earns a **hook** — the question or tension it answers — before its
  definition, not only the section divider (Principle 5).
- Use analogy to map unknown onto known, then **retire the analogy** before it misleads.

### Illustration & dual coding
- One concept = one top-level illustration, anchored in the same field of view as its claim.
- Match the visual form to the meaning: sequence → **timeline**; structure → **block
  diagram**; a message → **byte-boxes**; states/choices → **state machine**; comparison →
  **split panel / table**; proportion → bar. Every diagram gives a second (visual) memory
  route alongside the sentence (Paivio — dual coding).
- Maximize data-ink; no chartjunk, no decorative clip-art (Tufte).
- **Illustrate depth too, not just the headline.** Opt-in detail (the T-stem legs, §T-model)
  must carry its *own* supporting sketches/diagrams — a mechanism explained in a leg gets a
  small figure, not a wall of text or a bare list. Depth is where the learner does the
  hardest work, so it needs the *most* visual support, within chunk limits. Text-only depth
  sections are an information-architecture failure, not an acceptable shortcut.

### Retention (the most under-served principle — see Principle 9)
- End each section with a recap **and** a lightweight **retrieval** beat — a "your turn"
  (decode this byte / which session unlocks X?) with the answer in a `<details>`. Retrieval,
  not rereading, is what survives to tomorrow.
- Exploit primacy/recency: invest most in the hook and the recap.
- Spiral: reintroduce sessions/security/etc. at greater depth across modules, not once.

### Connection & transfer
- Each UDS module ends with a **bridge card** mapping the capability to its SOVD resource
  category (near-transfer scaffold). Modules must also link backward/forward as navigation,
  not just prose.

---

## Design language — this is pedagogy, not taste (Principle 3, 4, 11)

Visual choices are learning choices. The bar is **professional and distinctive — never
generic or "AI-styled."** Concretely:

- **Color must be semantic and consistent** — one hue = one meaning everywhere (e.g. client
  vs server vs request vs positive vs negative). Obey a dominant/secondary/accent balance
  (~60-30-10). Meet **WCAG ≥ 4.5:1** on body text. **Never encode meaning by color alone** —
  always pair with a label or shape (color-blind safety). Dark mode is a first-class theme,
  not an inverted afterthought. A palette must have a **point of view**; default framework
  blues read as generic and fail the "not AI-styled" bar.
- **Typography carries hierarchy and personality.** Establish a real type system with
  contrast between display and body (a characterful/editorial pairing, not one system-sans
  at several weights). Readable **measure ~45–75 characters** per line. Bundle/authorize the
  chosen faces so they actually render (a font that falls back to the OS default defeats the
  choice). JP needs a deliberate, refined stack with looser line-height.
- **Gestalt does the grouping**: proximity, similarity, common region (card borders),
  continuity. Layout should make relationships visible without a caption.

> Rule of thumb: if the page could be mistaken for a default Bootstrap/Tailwind SaaS-docs
> template, it has failed Principles 4 and 11. Distinctiveness is a teaching asset — it
> aids memory and signals care.

---

## Validation checklist (grade every module before "done")

Score each ✅ / ⚠️ / ❌ with evidence. A ⚠️ or ❌ needs a fix or an explicit user-signed
exception.

| # | Rule | Pass test |
|---|------|-----------|
| 1 | Prior-knowledge anchor | Each new idea hooks to something familiar; concrete leads |
| 2 | One idea per chunk | No card carries two teachable ideas or two top illustrations |
| 3 | Show + tell together | Every concept has exactly one illustration, beside its claim |
| 4 | Coherence | No element present that doesn't teach; no needless duplicate channel |
| 5 | Curiosity gap | Each concept opens on the question/tension it resolves |
| 6 | Define on first use | Every term bolded + defined before it's used |
| 7 | Worked example in place | Example baked into the concept, not a separate section |
| 8 | Human voice, no meta | Second person, plain; zero meta-framing; provenance in footer |
| 9 | Recap **and** retrieval | Section ends with a summary *and* a recall beat |
| 10 | Continuity & bridges | Flows top-to-bottom; links back/forward; SOVD bridge present |
| 11 | Signal / hierarchy / color | One focal point per view; semantic color; WCAG; not color-alone |
| 12 | Autonomy | Self-pacing, visible progress, opt-in depth, "you can now…" beats |
| D | Design language | Distinctive, not generic; real type system that renders; POV palette |
| V | In-browser verification | Driven in Chrome: DOM counts, zero overflow, light/dark/mobile, no errors |

---

## Frameworks (named sources, for credibility)

- **Cognitive Load Theory** — Sweller (intrinsic/extraneous/germane load; worked-example,
  split-attention effects).
- **Multimedia Learning** — Mayer (coherence, signaling, redundancy, spatial/temporal
  contiguity, segmenting, pre-training, multimedia, personalization, voice principles).
- **Dual Coding** — Paivio (verbal + visual = two retrieval routes).
- **Working memory / chunking** — Miller (7±2, really ~4).
- **Meaningful learning & advance organizers** — Ausubel ("what the learner already knows").
- **Zone of Proximal Development / scaffolding** — Vygotsky.
- **Spiral curriculum** — Bruner.
- **Nine Events of Instruction** — Gagné.
- **Andragogy** — Knowles (adult learning).
- **Self-Determination Theory** — Deci & Ryan (autonomy, competence, relatedness).
- **Information-gap / curiosity** — Loewenstein.
- **Forgetting curve / spacing / testing effect** — Ebbinghaus; Roediger & Karpicke
  (retrieval practice).
- **Curse of knowledge / stickiness** — Heath & Heath; **Feynman technique**.
- **Information design** — Tufte (data-ink, chartjunk); **Gestalt** grouping laws;
  **WCAG** contrast/accessibility.
