---
description: Layer-2 rigor — no-context teach-back on a card (the curse-of-knowledge breaker, CONVENTIONS §2c move 3)
argument-hint: <module-dir> <card-id ...> (none = the crux card(s) just authored)
---

You are running the **no-context teach-back** — Layer 2 of the rigor forcing function
(`work-types.md` §Enforcement). Your own "is this conveyed?" self-check always passes (curse of
knowledge), so the judging is handed to a reader who genuinely lacks the knowledge. Deliberate,
sized to stakes ([[CONVENTIONS]] §10): run it on **crux / load-bearing cards** (G1 and G-REV), not
every card.

## Step 1 — Pick the target(s)

Use the argument if given; otherwise the crux card(s) (`crux: true`) authored/edited in the current
work. If you can't identify one, ask.

## Step 2 — Build the reader packet (what the reader actually has)

From the module's `content/`, in reading order:

1. **Prior context** — for each card *before* the target: its `load_bearing:` sentence only (that
   is what a reader who read those cards carries). Plus the module's *Enters with* line from its
   `STRUCTURE.md` §, if present.
2. **The card under test, as the reader sees it** — the full EN narration of every step, in order,
   plus each figure's caption and on-image text (read the SVG for its visible `<text>` labels).
3. **NEVER include:** the front-matter (`load_bearing:` / `derivation:` are the answer key), the
   JP text, your own commentary, or any hint of what the card is "supposed" to teach.

## Step 3 — Spawn the judge (a fresh, zero-knowledge subagent)

One Agent call. The prompt must (a) give the persona — *a motivated professional engineer with
ZERO automotive-diagnostics/UDS knowledge* (knows hex/bytes/state machines per the [[COURSE]]
persona) — (b) paste the packet inline, and (c) forbid outside sources: *use ONLY the text
provided; do not search, read files, or draw on any UDS/automotive knowledge you may have.* Ask it
to return exactly:

1. **Teach-back** — explain the card's core idea in your own words, as to a colleague.
2. **Faith-list** — every claim you had to accept WITHOUT the card (or the prior sentences) giving
   you the why. Default to listing it if uncertain.
3. **Lost-points** — where you got lost, re-read, or guessed.

## Step 4 — Grade and act

- **Core delivered?** Compare the teach-back against the card's `load_bearing:` sentence. An
  adjacent/surface restatement = the card conveyed a **proxy** → blocker.
- **Faith-list = the gap list.** Each item is either (a) genuinely owned by a prior card — verify
  that card actually teaches it, don't assume — or (b) a **missing rung → add the step to the
  card** (§2c move 2). A missing rung is a **blocker at G1**, not a nit.
- **Lost-points** → continuity fixes (G1's gaps/continuity pass).

Report the verdict honestly (found gaps are the tool working, not a failure), fix the rungs, and —
if fixes were substantive — **re-run once** on the fixed card. Record in `NOTES.md`'s scorecard:
teach-back run · faith-list size · closed.
