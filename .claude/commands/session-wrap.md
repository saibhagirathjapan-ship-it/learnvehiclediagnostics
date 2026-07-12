---
description: Wrap a course session — incident ask, hardening ask, scorecard + log + NEXT.md refresh, commit & push
---

You are running the course's **session-wrap ritual** — the mirror of `/session-open`. The user
invokes it; you may **propose** it once the session Goal is clearly met (soft signal — never push).

**Honesty kernel (governs every step):** report only what was actually PERFORMED — never describe
an action (especially a user ask or sign-off) as done when it wasn't. A skipped step is said plainly.

## Step 1 — Incident ask

Ask: *was anything this session a Claude-side mistake worth learning from?* If yes → a new entry in
`wiki/learn/INCIDENTS.md` (next INC number, the file's format: what happened · root cause · **now
caught by**). Only for a real lesson — never invented to fill the slot. If the miss recurred
*despite* an existing rule, say so — that is the evidence that the rule needs a mechanical check
(`_template/rigor.js`), not repetition.

## Step 2 — Hardening ask (the positive mirror)

**Double-derive EVERY feedback the user gave this session — do NOT rely on memory of "did something
surface" (LOCKED 2026-07-12, INC-006: fixing instances without hardening the rule made the same classes
recur — anthropomorphism ≥3×, direct titles ≥4×, question-split, label accuracy).** Scan the whole
conversation, list each distinct piece of user feedback, and for **each** decide: **one-off** (a
phase-specific application — stays out) or **generic rule** (would prevent a whole *class* of future
misses — must be hardened). A feedback the user marks recurring ("same fb again", "again and again") is
**by definition generic → harden it**, and if it recurred *despite* an existing rule, the rule needs
**teeth** (a G0/`rigor.js`/gate hook), not just repetition (→ an INCIDENT too).

Harden each generic one into its **owning** doc, as a deliberate edit: a content/figure/JP/prose or
course-derivation standard → its [[CONVENTIONS]] section (via the owning S-type's mechanic; the §2b lint
list GROWS) · a session-kind step → its JD in `wiki/learn/work-types.md` · a durable user preference →
memory. Reconcile mirrors same-session. Present the double-derive table to the user so nothing is missed.

## Step 3 — Scorecard + records

Update the active module's `NOTES.md`: per-card **gate scorecard** (G0–G4 ✅/❌; whether
`/teach-back` ran and its faith-list closed), TODOs, verification state. Run
`node _template/rigor.js --all` once and triage any findings honestly.

## Step 4 — Log + dashboard

Append a dated entry to `wiki/log.md` (what changed — narrative lives here, not in NEXT). Refresh
`wiki/learn/NEXT.md`: current state · suggested next session · queue · deferrals. **Dashboard, not
journal** — anything with a structured owner is linked, not copied.

## Step 5 — Memory

Save any durable, cross-session fact (user prefs, locked decisions) to memory; update, don't duplicate.

## Step 6 — Commit + push (user-confirmed)

From `wiki/learn/`: `git add -A && git commit && git push` — the live GitHub Pages site is the
deliverable; the session is **not done until the push landed** (confirm it). If the user skips the
push, fine — the next `/session-open`'s ahead-of-origin check catches it (designed self-heal).
