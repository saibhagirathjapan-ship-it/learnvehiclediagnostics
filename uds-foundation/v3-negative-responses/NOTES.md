# V3 — Negative responses & the NRC catalog · build notes

**Status: G0 (scaffold) — build opened `[B-PAGE]` 2026-07-11.** Fresh build, first fully under the
governance gate ladder G0→G5. `STRUCTURE.md` §V3 (lines 150–207) is FINAL (re-derived `[D-HV]`
2026-07-10, 3→6 concepts). Model = locked stepped-story / app-slide (§1c/§1f). Exemplar to mirror =
`v2-request-and-response/`. Execution mode: **Checkpoint** overall, **Glassbox** on C1/C2/C5.
`governed: true` (module.yml) — governed from V3 on.

---

## Card scaffold (must match content/ 1:1 — checked by checkmod)

| # | file | id | type | covers | load-bearing |
|---|------|----|------|--------|--------------|
| 1 | 10-brief.md | brief | brief | when the answer is no (3-part advance-organizer) | — |
| 2 | 20-c1-shape.md | c1 | concept | a negative = 7F + echoed SID + one NRC; **7F marks the refusal** | **yes** (§2c derivation gate) |
| 3 | 30-c2-catalog.md | c2 | concept | **one global NRC table**; range → kind of reason | **YES — crux / teach-back target** |
| 4 | 40-c3-structural.md | c3 | concept | structural gate "is this a real request?" → 11/12/13 | — |
| 5 | 50-c4-state.md | c4 | concept | state & permission gate "will I do it now?" → 7F/7E/33/24/31/22 | — |
| 6 | 60-c5-effect.md | c5 | concept | what a "no" does inside the ECU (usually nothing — except the security counter) | **yes** (secondary teach-back — subtle) |
| 7 | 70-c6-retrial.md | c6 | concept | reacting to a "no" — 0x78 wait · 0x21 repeat · security back-off | — |
| 8 | 80-conclusion.md | concl | conclusion | recap + generative recall + bridge to V4 (the suppress bit) | — |

**Brief FB fold (2026-07-11, user):** (1) dropped "the last chapter read…" / "read last chapter"
anthropomorphizing (§2b actor rule — recurring FB, [[feedback-prose-and-wording]]) → state the
positive-response fact directly; (2) hook de-paragraphed — short lines + a 3-bullet refusal-reasons
list (foreshadows C3/C4 gates); (3) figure V3-B-F1 positive row **faded to 0.42** (colours kept) so
the `7Fh` row is the focal point / in-scope answer.

Figure register skeleton: STRUCTURE.md lines 194–204. One evolving figure per concept; C3-F1 & C4-F1
may be two states of ONE shared "gauntlet" figure (object constancy — decide at G2).

**C1 FB fold (2026-07-11, user):** (1) **f1 rebuilt progressive** — bytes appear one at a time
(s1 = facts as words → s2 `7F` only → s3 `+10` → s4 `+22`), faint highlight tracks the newest box
(was: all three present + labels revealed). (2) **NRC accuracy** — `22h` conditionsNotCorrect reasoning
fixed from "the ECU was busy" to the grounded *"a required condition is not met (e.g. busy with a
critical task)"* (Annex A.1: "prerequisite conditions not met" / general gloss "critical normal-mode
activity"). (3) "the whole list is the next step" → "presented next" (no course-mechanics-as-actor).
(4) **step 5 rationale RESOLVED (a §2c catch, option A):** the "3 facts REQUIRE 3 bytes" causal
story was **my synthesis, not a stated ISO rationale** (web-checked 2026-07-11 — no documented
rationale exists; user's bit-6-exhaustion synthesis also uncited). Rewrote step 5 **descriptive +
grounded**: a *yes* folds type+which via `+40h`; a *no* uses the fixed `7Fh` marker + echoed SID +
NRC; the only asserted "why" is the **grounded payoff** (any refusal is the same shape, readable from
byte 1 — cl.8.3). No necessity claim. (5) **question-move (repeated failure):** "Can one clever byte
still do that?" moved from the END of step 1 to OPEN step 2 (setup+payoff on one screen). f1 vertical
footprint compressed to hold the app-slide fit (desktop 0 / mobile 16px).

**C4 built (2026-07-12):** title "Real — but allowed now?" (direct). Covers all 6 state/permission
codes + the 3 confused pairs. 4-step story: permission-gate setup → session pairs (`7F`/`7E` vs
`11`/`12`) → value pair (`31` vs `22`) → security (`33`/`24` → M4). **G2 figure decision — DEPARTED
from the shared C3 gauntlet** (the STRUCTURE "continues C3's figure" note): built `v3-c4-f1` as a
**two-kinds-of-no contrast** (left "won't work as asked" `11/12/31` ≠ right "not now — change the
state" `7F/7E/22`, each row a confused pair; + a security band `33/24 → M4`). Rationale: the confused
pairs are C4's crux ([[feedback-nrc-error-content-depth]]) and read far clearer as a left↔right straddle
than a 7-gate gauntlet. Grounded verbatim to Annex A.1 (7F/7E InActiveSession, 31 ROOR, 22 CNC, 33 SAD,
24 RSE seed/key). Fit 0/0; light+dark audited (a headline-ghost at 350ms settle was a shot artifact,
clean at 800ms). Not crux → no teach-back.
**FB fold (user 2026-07-12):** (a) 7F/7E captions made explicit: "service/sub-function exists, but wrong
session" (figure widened W 560→628 → fit improved to 0/0); kept "exists" over "supported" (concrete for
the persona; the precise mnemonic stays in prose/reading). (b) **Column headers pressure-tested & fixed**
— old "won't work as asked" / "not now — change the state" were inaccurate (weak for `31h`; "not now" is
temporal but 7F/7E are *session*, not time) → now **"the request itself is the problem"** vs **"the
current ECU state is the problem"** (accurate for all 6; "ECU state" covers session + conditions).
**Honest caveat surfaced to user:** the LEFT column = the 3 *confused-pair* left-halves (11/12/31), NOT
an exhaustive "request-side" category and NOT the C3 structural set (11/12/**13**) — 13h absent (no pair),
31h present (pairs with 22h). Offered a "(look-alikes, not the full list)" cue — pending user call.

**C3 built (2026-07-12):** title "Is this a real request?" (direct). 4-step story: ordered gauntlet +
first-fail → then SID→`11h`, sub-fn→`12h`, length/format→`13h`, then seam to C4. Figure `v3-c3-f1` =
a **3-gate gauntlet** (request → service/sub-function/length gates, each with its red fail-exit; olive
pass-through → "real request → C4"). Grounded: Dcm SWS_Dcm_01535 ordered gate + 14229-1 pseudo-code;
**altitude fence honored** — exact pipeline `{{→ V9}}`, C3 teaches only which-check→which-code + first-fail.
**G2 figure decision:** C3 owns the 3 structural gates; C4 will *extend the same gauntlet* with its
state/permission gates (object constancy). Fit 0/0 desktop+mobile; light+dark audited. Not crux → no teach-back.

**C2 FB fold (2026-07-12, user):** (1) title "One catalog of reasons" → **"One shared catalog of reason
codes"** (direct — recurring title FB). (2) **accuracy nuance** (verified vs Table A.1 + 22h def):
the *number* is universal but a code's *exact* reason can vary by service/ECU ("`22h` is
conditionsNotCorrect everywhere — even if which condition failed differs by service or ECU") — was
over-claiming "same thing everywhere". (3) **"generally supported"** bolded (ochre) AND shown in the
figure (● dots on 11h/22h/78h + legend; 92h unmarked = specific) — the phrase now links to the diagram.
(4) **cryptic phrasing** ("band gives the kind" → "the band tells you what kind of problem it is"; "which
check … is the next step" → "Next: which check … produces which code") → memory hardened
[[feedback-avoid-obscure-words]] with the nominalised-proxy mechanical guard. Fit desktop 0 / mobile 26.

**C2 teach-back (crux · L2, 2026-07-11):** no-context agent **reconstructed the core** ("one shared
catalog · one byte · three bands · read band-then-number") — crux insight lands. Faith-list triaged:
*prior-knowledge/persona* (ECU, service, hex/byte, 3-byte refusal from C1, session) = **not C2's job**
(rigid sequence). *Real gaps fixed:* (1) `22h` glossed on first use *(conditionsNotCorrect)* — was the
running anchor, undefined; (2) figure `31h` removed (shown but never in prose → dangling); (3) band
`01–7Fh` gloss broadened to ISO's "communication-related" umbrella (old "message wrong" didn't fit
`78h`/`22h`); (4) `00h` given its reason (the all-clear value, reserved). Fit held (desktop 0 / mobile 24).

## Load-bearing sentences (G0 move 1 — written FIRST, before authoring; go into each card's `load_bearing:` front-matter)

- **C1:** *"A refusal starts with `7Fh` — not the request's SID+40h — so the very first byte tells you
  the answer is no; the SID is then echoed to say **which** request, and one NRC byte says **why**."*
  (The insight is that `7Fh` is a distinct type-marker in byte 1, and the three bytes split which/why
  so no single byte is overloaded — contrast the `+40h` trick of V2.)
- **C2 (crux):** *"Every service in the whole protocol draws its refusal reasons from **one shared
  catalog** of NRCs — the codes are not invented per service — and where a code falls in the `00h…FFh`
  number line tells you the **kind** of reason."* (Reader must reconstruct: one dictionary, not N; range
  = category. Teach-back target.)
- **C5:** *"A negative almost always means the requested action did **not** happen and nothing in the
  ECU changed — the session stays, no reset — with the one biting exception that a wrong SecurityAccess
  key leaves the ECU locked **and** increments its failed-attempt counter."*

## Parked B-PAGE research handoff (from the `[D-HV]` 2026-07-10 re-derivation — reconstruct/verify at build)

> The D-HV grounded four research passes but the artifacts lived in the (now-gone) session plan; the
> tracked repo keeps no sourcing detail (repo hygiene). **Re-ground each of these against the local
> `_derive/txt/` sidecars at the card that needs it — documents-first, cite the clause.** Sidecars:
> `uds-14229-1_2025fdis.txt` (+ `_2020` for clause-number cross-check), `autosar-dcm.txt`.

1. **The NRC catalog (C2 + the `:::reading` table).** Ground verbatim against **ISO 14229-1 Annex A.1**
   (the single global NRC table) in the sidecar. Three ranges: `00h` (positiveResponse — never on the
   wire) · `01h–7Fh` (ISO-reserved: communication / protocol reasons) · `80h–FFh` (a specific
   condition — "be more specific than 22h"). **Honest framing: "generic set" (any service may emit),
   NOT a "mandatory/always-supported set" claim** (COURSE.md wording reconciled 2026-07-10). Generic
   codes to name: `10h 11h 12h 13h 14h 22h 31h 78h 7Eh 7Fh`.
2. **The check→NRC gate (C3/C4).** Grouped by the service-processing check that raises each — recovered
   from Dcm `SWS_Dcm_01535` / `SWS_Dcm_00827` (the ordered gate, **stop on first failure**). Structural:
   SID unknown → `11h` · sub-fn unknown → `12h` · wrong length/format → `13h`. State/permission:
   not-in-session → `7Fh` (svc) / `7Eh` (sub-fn) · locked → `33h` · wrong order (key before seed) →
   `24h` · bad value/ID or wrong conditions → `31h` / `22h`. **Confused pairs to teach:** `11h`-vs-`7Fh`
   (not-at-all vs not-in-this-session) · `12h`-vs-`7Eh` · `31h`-vs-`22h` ("not that" vs "not now").
   **Altitude fence: V3 = which-check→which-code + "ordered, first-fail-wins"; the exact Dcm pipeline
   order/mechanism is V9 — V3 must not present itself as the definitive gate (→V9).**
3. **State-effects (C5).** Ground the quote: a rejected `$10` → *"the current session shall continue"*
   (ISO 14229-1 **cl.10.2**); rejected `$11` → no reset. Exception: wrong key `35h` → stays locked +
   failed-attempt counter++ (→M4). Caveat: whether a reset clears a security lockout is **ECU-config**
   — don't assert power-cycling helps.
4. **Retrial framework (C6).** `0x78` RCRRP "still working" → final answer will come; reload timer to
   **P2\*** (no numbers here — →V6), **do NOT resend**; canonical use = flash (→M6). `0x21`
   busyRepeatRequest → repeat after a short delay. Security back-off: `37h` requiredTimeDelayNotExpired
   ("too soon, wait") · `36h` exceededNumberOfAttempts ("locked out, stop hammering") (→M4). Honest
   note: the *reaction* is standardized; exact delays/counts are ECU-configured (footer, not tooling).

## ⚠️ 3 FLAGS — verify before shipping prose (from the D-HV)

1. **`0x23` is NOT a UDS NRC.** The transient/temporary-condition-style code people misremember is
   **`0x94`**-family (or `0x78`). Do not put `0x23` in the catalog. Verify against Annex A.1.
2. **Security-lockout reset-persistence is OEM-config.** Whether an ECU reset / power-cycle clears a
   `36h` lockout is **not** UDS-mandated — teach it as ECU-configured, never "reset to recover".
3. **Verify Annex A.1 verbatim vs the source** before publishing the NRC table prose (code values +
   mnemonics + ranges). Grep the sidecar, don't trust memory.

## Altitude fences (reference-don't-re-teach — lint; STRUCTURE lines 182–190)
V3↔V9 (vocabulary vs the ordered-gate mechanism — →V9) · V3↔V4 (C1 only plants "a physical request is
always answered" →V4) · V3↔V6 (0x78 reloads to P2*, **no numbers** →V6) · V3↔M4/M6 (security 33/35/36/37
& flash 70/72/73 are *examples*; mechanisms →M4/M6). Tooling (D-PDU/ODX) = footer citation only.

## Gate scorecard (per card — G0 ✅ once its file+load_bearing exist; fill G1–G5 as built)

| card | G0 | G1 | G2 | G3 | G4 | G5 | teach-back |
|------|----|----|----|----|----|----|------------|
| brief | ✅ | — | ✅ | ✅ | ✅ | ⬜ | — |
| c1 | ✅ | ✅ | ✅ | ✅ | ✅ | ⬜ | §2c gate (moves 1–2, shown Glassbox) |
| c2 | ✅ | ✅ | ✅ | ✅ | ✅ | ⬜ | **✅ done (crux)** |
| c3 | ✅ | ✅ | ✅ | ✅ | ✅ | ⬜ | — |
| c4 | ✅ | ✅ | ✅ | ✅ | ✅ | ⬜ | — |
| c5 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | yes (2ndary) |
| c6 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | — |
| concl | ⬜ | — | ⬜ | — | ⬜ | ⬜ | — |
