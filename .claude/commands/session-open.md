---
description: Open a course session — git state, read NEXT.md, pick the work-type, walk the Session Proposal, ask the execution mode
argument-hint: [work-type or page, e.g. B-PAGE V3]
---

You are running the course's **session-open ritual** (the ritualized form of the resume protocol in
`wiki/learn/COURSE.md`). Present options inline as text to pick/rewrite — never AskUserQuestion
pop-ups. **Idempotency:** if a session-open already ran in this conversation, say so and skip to
the unfinished step — never re-run from the top.

## Step 1 — Git state (git root = `wiki/learn/`)

Report current branch + working-tree state. `git fetch origin` and compare `main` to
`origin/main`: in sync → move on · behind → fast-forward (`--ff-only`) · ahead (leftover unpushed
work) → flag it and **offer** to push (outbound — only on explicit confirmation) · diverged →
**stop and surface, never auto-merge**.

## Step 2 — Pick the work

Read `wiki/learn/NEXT.md` (Suggested next session + Queue). Offer the suggestion as the default;
present alternatives inline and **pause for the user to choose**. If an argument was passed, that
is the candidate — still confirm. If the user has no task yet, stop after Step 1's report.

## Step 3 — Identify the work-type + walk the Session Proposal

From `wiki/learn/work-types.md`, name the session's **work-type** and read its JD. Then fill the
proposal — **Work-type · Name · Goal · Inputs (the JD's, made concrete: which STRUCTURE.md §,
which NOTES.md, which clauses) · Gates that bite (from the JD) · Steps · Execution mode**:

- Goal comes from NEXT.md / the user — crisp, distinct from background (it is the done-signal).
- **Steps are ALWAYS yours** (the queue gives *what*, never *how*).
- **Execution mode is ALWAYS asked, never defaulted** — Autopilot · Checkpoint *(typical)* ·
  Lockstep · Glassbox (definitions in `work-types.md`). Recommend **Glassbox** when the session
  contains a crux (load-bearing) card.
- For a `B-PAGE`: confirm the module's `STRUCTURE.md` § is final — if not, this session is a
  **D-HV first**; say so and re-propose.

## Step 4 — Propose the session name

Propose a name for the user to `/rename` (you cannot invoke it): **`[<TYPE>] <plain name>`** —
e.g. `[B-PAGE] V3 — negative responses & the NRC catalog`, `[X-GOV] Stop-hook install`.

## Step 5 — Plan-mode prompt

Recommend per family (Shift+Tab is the user's): **D / S / G-REV → ON** (design/derivation) ·
**B-PAGE → ON** for the story design, OFF to author · **R → light/OFF** · **X-GOV → per task**.

## Step 6 — Stop and wait

Present (proposal · proposed name · plan-mode prompt) inline and **pause**. Never run past the
proposal into the work without explicit confirmation.
