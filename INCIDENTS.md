# INCIDENTS — Claude-side misses worth learning from

> **What this is.** The course's incident log: a numbered record of each **Claude-side mistake the
> user had to catch**, its root cause, and the rule/gate that now catches it. Written at
> `/session-wrap` (the incident-ask), only for real lessons — never invented to fill the slot.
>
> **Why it exists.** A recorded miss is **evidence**: it justifies hardening a rule or pulling a
> mechanical check forward (a miss that recurs *after* its rule exists means the rule needs teeth,
> not repetition). Format per entry: what happened · root cause · **now caught by**. Newest last.

---

## INC-001 — The conveyed proxy: "uses the low bits" (2026-07-09, V2-C2)

**What happened.** Teaching why bit 6 is free for the `+40h` rule, the card said the SID "only uses
the low ones" — a hand-wavy proxy — and an earlier draft asserted "all SIDs are small, fit in 6
bits," which is **factually wrong** (`85h` ControlDTCSetting has bit 7 set). The real,
standard-stated claim is "**bit 6 = 0 on every request SID**" (ISO 14229-1 cl.9.3 NOTE). The user
caught both.

**Root cause.** Two stacked failures: (a) a **plausible-but-unverified claim** shipped without
double-deriving against the clause; (b) the **curse of knowledge** — the author knew the real fact,
so the vague sentence "read fine" from the inside.

**Now caught by.** §2b check 2 (precise, not vague) + check 3 (say the REAL claim, double-derived) —
run per sentence at **G1**; §2c move 1 (the load-bearing sentence names the exact fact before
authoring, so a proxy can't silently substitute); L1 prose flags assist.

## INC-002 — The unearned equivalence: `+40h` without the place-value rung (2026-07-09/10, V2-C2)

**What happened.** The card asserted "set bit 6 = add `40h`" as if self-evident. The missing rung —
**bit 6's place value IS `40h`** (`0100 0000` = `40h`) — lived only in the author's head; a
no-context reader had to take the equivalence on faith. The user caught it and named the general
failure: *a conclusion or label stated without the derivation under it.*

**Root cause.** Curse of knowledge — the author's "is this conveyed?" self-check always passes
because they fill the missing rung mentally. Abstract directives ("be the learner") cannot fix
this; the check must be mechanical or externalized.

**Now caught by.** §2c move 2 (the **derivation gate**: for every "X = Y", is the WHY *on the card*?)
at **G1**; §2c move 3 (**`/teach-back`** — the zero-knowledge subagent's *faith-list* exposes
exactly these rungs) on load-bearing cards. This incident is why §2c exists and is the central
discipline.

## INC-003 — Detour cards shipped as standalone (2026-07-07, H3 C4/C5/C6)

**What happened.** H3 shipped 9 cards; three (C4 DID/RID, C5 the 4-stage pipeline, C6 the comms
family) were **detours or re-covers of material owned elsewhere**, built as standalone concept
cards. The user rejected them; the module was restructured 9→6 (C4 → a one-liner leg, C5 → V9's
depth with only the *decision* kept, C6 → folded into C2).

**Root cause.** "Detour" and "should be a leg of another card" were under-weighted as nits instead
of blockers; cards were grown from the content rather than derived from a reviewed structure.

**Now caught by.** The **OK/NG gate** ([[feedback-prose-and-wording]] — "earns its place" +
"answers a promise" are blockers); **G0** (a card must exist in `STRUCTURE.md` first — §1e, the
scaffold is derived, never improvised); the V-drill "reference-don't-re-teach" lint
(`work-types.md` B-PAGE).

## INC-004 — Re-derivation inherited the old thin scope (2026-07-10, V3 D-HV)

**What happened.** Asked to re-derive V3 (negative responses) "with all rigors," the first pass
reproduced the *existing* thin skeleton (3 cards: shape · catalog · `0x78`) — faithful to the prior
`STRUCTURE.md` but under-scoped for the learning goal. The user had to push for the real depth: all
key NRCs explained and grouped by the check that raises them, the ECU state-effects of a negative,
and the retrial strategies. Only then did V3 grow 3 → 6 cards.

**Root cause.** A re-derivation anchored on "is the prior structure faithfully reproduced?" instead
of "is the prior *scope* sufficient for what this card must teach?" — the double-derivation checked
internal consistency but not ambition. Faithfulness to a thin skeleton read as correctness.

**Now caught by.** D-HV should, for a card flagged load-bearing/important, run a scope-sufficiency
check against the learning goal (does the leaves-with demand more than the prior skeleton delivers?)
*before* the card-flow derivation — not just reproduce the existing §. Captured as a D-HV habit; the
[[feedback-nrc-error-content-depth]] memory records the specific depth bar for service/NRC content.

---

*Next entry: INC-005 (via `/session-wrap`).*
