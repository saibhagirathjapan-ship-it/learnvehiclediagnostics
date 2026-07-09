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

Ask: *did this session surface a generic, reusable rigor worth locking?* If yes → the **owning**
doc, as a deliberate edit: a content/figure/JP/course-derivation standard → its [[CONVENTIONS]]
section (via the owning S-type's mechanic) · a session-kind step → its JD in
`wiki/learn/work-types.md`. One-off, phase-specific steps stay out. Reconcile mirrors same-session.

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
