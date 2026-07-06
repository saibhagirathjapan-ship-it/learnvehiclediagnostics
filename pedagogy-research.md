# The science of teaching, applied to this course — long-form reference

**Status:** the full, verbatim research. [[PEDAGOGY]] (`wiki/learn/PEDAGOGY.md`) is the
*condensed, binding* distillation of this (auto-loaded each session); **this file is the
depth** — the framework tables and the concrete "→ so what for us" mappings. **Read this
when authoring or reviewing content**, so the reasoning behind each rule is reconstructed
faithfully rather than paraphrased. Not auto-loaded (kept out of the per-session context
budget on purpose).

This is a synthesis of established, stable learning science + instructional design +
information design. Every rule names its framework so it is checkable, not opinion.
Everything is tied back to *our* course (bilingual, self-paced, web-based UDS→SOVD).

---

## 1 · The learner — who you're actually writing for

A learner is not an empty cup you pour into. They arrive with limited working memory,
existing knowledge, and a running question: *"why should I care, and can I do this?"*

| Framework | What it says | For our learner |
|---|---|---|
| **Andragogy** (Knowles) | Adults are self-directed, problem-centered, need to know *why* before *what*, and learn through their own experience | Our reader is a professional. Lead each module with the problem it solves, not the taxonomy. Respect that they'll skip. |
| **Self-Determination Theory** (Deci & Ryan) | Motivation needs **autonomy** (I choose), **competence** (I'm getting it), **relatedness** (this connects to me) | Self-pacing, visible progress, opt-in depth (`<details>`), and "you can now do X" moments feed all three |
| **Cognitive Load Theory** (Sweller) | Working memory holds only ~**4 chunks**; overload kills learning. Load is *intrinsic* (the material) + *extraneous* (bad design) + *germane* (real thinking) | Our whole job is to cut extraneous load so the budget goes to the UDS itself |
| **Zone of Proximal Development** (Vygotsky) | Teach just *beyond* current ability, with support (scaffolding) that's removed as they grow | Sequence so each card is reachable from the last; scaffold heavily early, fade later |
| **Meaningful learning** (Ausubel) | *"The most important single factor influencing learning is what the learner already knows."* New knowledge sticks only when hooked to old | Anchor every new idea to something they already have (tester ≈ web browser, ECU ≈ server) |

**Our learner, concretely:** no prior context · motivated but time-boxed (single-sitting) ·
reads on a laptop *and* a phone · **bilingual**, may lean on either language · **scans
first, reads second** · has no instructor in the room, so the page must answer every "wait,
what's that?" itself.

## 2 · The instructor — the voice that teaches

| Framework | What it says | For our voice |
|---|---|---|
| **The Curse of Knowledge** (Heath & Heath) | The #1 failure mode: experts forget what it's like not to know, and skip the step the novice needs | The single most important discipline. Every line passes the "does a no-context reader survive this?" gate |
| **Feynman Technique** | If you can't explain it simply, you don't understand it. Simplify until a beginner gets it | Very simple English; jargon only when the plain word won't do, defined on first use |
| **Gagné's Nine Events** | Teaching has a choreography: gain attention → state objective → recall prior → present → guide → practice → feedback → assess → aid retention/transfer | A blueprint for a *module's* shape (hero hook → brief → concepts → worked example → recap → bridge) |
| **Cognitive Apprenticeship** (Collins) | Expert **models** the work, **coaches**, **scaffolds**, then **fades** | Show the byte-decode worked in place; later modules assume the skill |
| **Personalization principle** (Mayer) | Conversational voice beats formal voice for learning | Warm expert peer, second person, no institutional stiffness — and **no meta-framing** |

**Our instructor persona:** an OEM systems engineer explaining to a respected peer who
happens not to know this yet. Credible, precise, generous — never talks down, never pads.

## 3 · Material & delivery quality

### a. Chunking & structure — *protect the 4-chunk budget*
- **Segmenting** (Mayer): break content into learner-paced units → **our nugget/card model is exactly this.** One idea per card.
- **Miller's 7±2 / chunking**: group related bits so they count as one chunk (a byte-box row *is* a chunk).
- **Progressive disclosure**: default view stays simple; depth is opt-in → our `<details>` panels (the T-stem legs).
- **Advance organizers** (Ausubel): a framing scaffold *before* detail → our **divider + brief** cards.

### b. Storytelling & framing — *sequence is the argument*
- **Curiosity gap** (Loewenstein): open the question before giving the answer; a felt gap in knowledge is what pulls a reader forward. → warning-light hook before "what UDS is."
- **Concrete before abstract**: domain-closest example first, then widen → the workshop scene before the OSI model.
- **Analogy/metaphor**: map the unknown onto the known (tester=browser, session=phone lock state). Powerful *and* dangerous — retire the analogy before it misleads.
- **Story spine**: each unit flows out of the last and into the next; the whole reads top-to-bottom as one arc, not a pile of facts.

### c. Multimedia & illustration — *show and tell, together* (Mayer's principles, the most directly applicable body of work)

| Principle | Rule | In our template |
|---|---|---|
| **Multimedia** | Words + picture beat words alone | One illustration per concept — locked |
| **Spatial contiguity** | Put words *next to* the graphic they explain | "Anchor illustration to its claim" — same field of view |
| **Coherence** | Cut anything that doesn't teach (decoration, tangents) | Signal-over-noise; no chartjunk |
| **Signaling** | Cue what matters (bold, arrows, color) | Bold key terms (accent-colored); byte-box color coding |
| **Redundancy** | Don't duplicate the *same* words in two channels | Note for us: on-screen EN **and** JP is a redundancy tradeoff — the always-on bilingual doubling |
| **Pre-training** | Teach the key terms *before* the process that uses them | Define SID before decoding a message |
| **Dual coding** (Paivio) | Verbal + visual are stored separately → two retrieval routes | Every concept gets both a sentence and a diagram |
| **Data-ink / chartjunk** (Tufte) | Maximize the ink that carries meaning; delete the rest | Our clean `.dgm` diagrams, not clip-art |

### d. The visual system — *colors, fonts, how to show*
- **Color:** use it **semantically and consistently** — a color must mean one thing everywhere (accent/client, green/server-positive, red/negative, gold/warn). Obey **60-30-10** (dominant/secondary/accent). Meet **WCAG contrast** (≥4.5:1 body). **Never encode meaning by color alone** (color-blind safety — pair color with label/shape). Support **dark mode** as a first-class theme, not an inversion afterthought.
- **Typography:** readable **measure of ~45–75 characters** per line; clear **hierarchy** (size/weight/color do the work); sans-serif for screen; a proper **JP font stack** with looser line-height. Bundle the chosen faces so they actually render.
- **Gestalt principles** — how the eye groups things: **proximity** (near = related), **similarity** (same style = same kind), **common region** (a card border = "these belong together"), **continuity/flow**. Our card + header-band system is Gestalt applied.
- **How to visually show** (pick the form to the meaning): sequence/timing → **timeline**; structure/containment → **block diagram**; a message → **byte-boxes**; choices/states → **state machine**; comparison → **side-by-side table or split panel**; proportion → bar, not pie.

### e. Tone & voice
Plain words, short sentences, one idea per sentence · second person · **bold on first use,
define on first use** · confidence without hedging · **no meta-framing** (provenance lives
in a footer). Warmth is a teaching tool, not decoration (personalization principle).

### f. Recap & retention — *learning is what survives tomorrow*
- **Forgetting curve** (Ebbinghaus): memory decays fast without reinforcement.
- **Retrieval practice / testing effect**: *recalling* beats *rereading* — the single most robust finding in the science. → we must ask the reader to retrieve, not only recap (a tiny "can you read this byte?" self-check per section).
- **Spacing & interleaving**: revisiting across time and mixing problem types beats massed repetition.
- **Primacy/recency**: openings and closings are remembered best → invest in the hook and the recap.
- **Recaps**: our **conclusion cards** — summarize + bridge, with a "you can now…" competence beat.

### g. Modularization & connecting modules
- **Spiral curriculum** (Bruner): revisit the same concept at increasing depth across the course, not once-and-done → sessions appear in M1, deepen in M4/M6.
- **Scaffolding & fading**: heavy hand-holding early, assume-the-skill later.
- **Sequencing by prerequisite**: teach A before B needs it → our dependency spine (M1 → M2/M3 → M4 …).
- **Bridging for transfer**: explicitly connect old → new so knowledge *transfers* → our **"→ SOVD category" bridge cards** are textbook near-transfer scaffolds.

## 4 · The golden principles (the distilled laws)

The whole science above compresses to about a dozen rules. These are what the template
enforces (the binding copy lives in [[PEDAGOGY]]):

1. **Start from what they know.** Anchor every new idea to a familiar one; concrete before abstract. *(Ausubel)*
2. **One idea per chunk.** Protect the ~4-slot working memory. *(Sweller, Miller)* → our nuggets.
3. **Show and tell in the same breath.** Words beside their picture, never a figure batched elsewhere. *(Mayer: multimedia + spatial contiguity)*
4. **Cut everything that doesn't teach.** Every element justifies its cognitive cost. *(Mayer: coherence; Tufte)*
5. **Open the question before the answer.** Create the curiosity gap, then close it. *(Loewenstein)*
6. **Name it, then use it.** Define a term on first appearance; teach vocabulary before process. *(Mayer: pre-training)*
7. **Model the work in place.** A worked example inside the concept, not a separate section. *(worked-example effect)*
8. **Talk like a person to a person.** Warm, direct, second person, no meta. *(Mayer: personalization)*
9. **Repeat to remember; retrieve to keep.** Recap *and* make them recall. *(Ebbinghaus; testing effect)*
10. **Every part connects to the next.** One continuous story; explicit bridges between modules. *(narrative; Bruner's spiral)*
11. **Signal what matters.** Clear hierarchy, one focal point per view, consistent semantic color. *(Mayer: signaling; Gestalt)*
12. **Respect their autonomy.** Self-pacing, visible progress, opt-in depth, and frequent "you can now do X." *(Self-Determination Theory)*

---

## Related
- [[PEDAGOGY]] — the condensed binding rules + per-module validation checklist (auto-loaded).
- [[CONVENTIONS]] — how we build (mechanics, the T-card model, design language, verification).
- [[COURSE]] — roadmap, status, locked decisions.
