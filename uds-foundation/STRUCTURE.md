# UDS Foundation — card-level structure & flow (continuity-checked)

**Status:** build spec for the whole Foundation (H1–H3 + V1–V9 incl. V7a/b/c). Derived 2026-07-07
(session 13) by the `foundation-continuity-structure` workflow (8 agents: fresh ideal scaffold →
6 adversarial continuity auditors [H↔H, H↔V, card↔card, card↔go-deeper, prior-knowledge,
authored-vs-ideal] → synthesis). Designed **fresh**, not anchored to the current H1/H2 authoring.
Full raw result: workflow task `wvazzd2dc`.

Learner baseline = the confirmed persona (see COURSE.md "Open items → learner persona"): a
professional **engineer, zero automotive-diagnostics background**. Knows hex/bytes/flag-bits,
request↔response, state machines, volatile/non-volatile memory, "bus/layers" abstractly, "ECU = a
small computer, a car has many", locked/unlocked. Everything domain-specific is taught from zero.

---

## The through-line (one story)

An engineer who already knows request/response, bitmasks, state machines, layered buses and volatile
memory learns that a car is many small computers an outside **tester** must interrogate — and that
**UDS (ISO 14229) is the standard service catalog** for that conversation. The spine walks:
**why diagnostics + who talks + where UDS sits (H1) → one request/reply beat, then one session's life,
opened by watching the ONE real exchange before generalizing any rule (H2) → the full menu of what UDS
can ask and how the ECU decides (H3).** Depth drills descend the same topics in teaching order: the
abstract service model (V1), the bytes of a good reply (V2) and a bad one (V3), the bit that mutes a
reply (V4), the transport that carries it (V8), the session state machine (V5) and its clock (V6), the
three archetype services that open/hold/close a session (V7a/b/c), and finally inside the ECU where
every answer and every error code is born (V9). **Every H bar is self-sufficient** — a reader who stops
after the bars has a complete, honest high-level picture.

## Reading paths

- **Breadth-only (bars read alone = whole picture):** **H1 → H2 → H3.** Holds literally *once H3 is
  built to the bar* (it is currently a stub). Every bar term (security, S3, P2, DID/RID, the pipeline
  acronyms, the six units) is glossed inline at bar altitude or carries a `{{→}}` pointer — no bar leans
  on a collapsed leg or an unbuilt drill.
- **Full drill order (opt-in depth):** H1 → V1 → H2 → V2 → V3 → V4 → **V8** → V5 → V6 → V7a → V7b →
  V7c → H3 → V9. **⚠ open decision:** this moves **V8 to after V4** (V8 leans on a concrete message +
  the negative/suppress concepts). This *differs from COURSE.md's locked order* (V8 as the late
  "zoom-out" after the service homes). See Open decisions #1.
- **Bar-coverage (every V has a bar):** V1←H1-C2 · V8←H1-C3 + H2-C4 · V2,V3←H2-C2 · V4←H2-C1 ·
  V6,V7a←H2-C3 · V5,V7c←H2-C5/C7 · V7b←H2-C6 · V5,V9←H3-C4 · V7a/b/c←H3-C5. No orphans.

---

## H1 — The diagnostics landscape (what UDS is and who talks)
*Enters:* zero domain context. *Leaves:* can say what diagnostics is for + its 3 contexts, name
tester↔ECU, state UDS = ISO 14229 (application-layer catalog, transport-independent), and place the
14229 family / Dcm-Dem / ODX / SOVD / J1939 / OSI.

| card | type | covers | go-deeper |
|---|---|---|---|
| H1-D0 | Divider | the opening map | — |
| H1-B | Brief | advance organizer: the 3 stops (why/who · what UDS is · where it sits). No teaching. | — |
| H1-C1 | Concept | cars are many networked ECUs; outsiders must interrogate them to repair/build/update | 3 contexts (workshop/EOL/OTA) · why not just read a gauge |
| H1-C2 | Concept | diagnostics = client/server (tester asks, ECU answers) **and** UDS is the standardized service catalog | tester is a role not a box · one-vs-group (→V8) · "application-layer / service catalog" (→V8,→H3) |
| H1-C3 | Concept | the 14229 family splits by OSI layer (-1 services / -2 session / -3,5,6,7 transports); **owns** transport-independence | OSI map at a glance · why split · the -2 session/timing layer (timers named P2/S3 later →V6) |
| H1-C4 | Concept | the neighbours: Dcm/Dem (answer vs remember), ODX (description), SOVD (successor), J1939 (profile) | Dcm vs Dem · ODX (→M9) · SOVD (→M9) · J1939/WWH-OBD named not drilled |
| H1-K | Conclusion | recap map + retrieval beat + bridge to "watch one request" | — |

## V1 — The service model (how a request is described)
*Enters:* UDS is a catalog; tester=client, ECU=server. *Leaves:* can describe a service as primitives, tell sides apart, name the SAP params.

| card | type | covers | go-deeper |
|---|---|---|---|
| V1-B | Brief | below the menu: what "a service" means abstractly | — |
| V1-C1 | Concept | a service exchange = up to 4 primitives (request/indication/response/confirmation) | confirmed(6) vs unconfirmed(3) · reading the arrows |
| V1-C2 | Concept | req/confirm = client's events, indication/response = server's | client- vs server-side · symmetric model, asymmetric roles |
| V1-C3 | Concept | every service crosses a SAP carrying mandatory params (msg type, source/target address) | A_Mtype/A_SA/A_TA · session layer exposes only S_Data.* (OSI layer numbering drawn in V8 →V8) |
| V1-K | Conclusion | recap + bridge to the concrete beat | — |

## H2 — The life of one request
*Enters:* tester↔ECU, catalog, transport-independence, Dem store. *Leaves:* can trace a full beat, read
+0x40 / 7F+NRC, explain addressing/keep-alive/reset at bar level, narrate a session's open/hold/close.

| card | type | covers | go-deeper |
|---|---|---|---|
| H2-D0 | Divider | the single end-to-end exchange (reframed: per-beat truth = addressing + pos/neg; session context is named honestly, not "4 rules") | — |
| H2-C1 | Concept | every request starts with a 1-byte **SID**, then parameters; `10 03` = enter Extended (defined here) | request shape SID+params · advanced SIDs sit higher · 2nd byte can be a sub-function; its top bit is a reserved flag met later (→V4) — **do NOT explain suppression yet** |
| H2-C2 | Concept | the ECU answers **positive** (SID+0x40, then data) or **negative** (7F+SID+NRC); positive first | pos = SID+0x40 (→V2) · neg = 7F+SID+NRC, e.g. 33 (→M4, bare pointer) · 0x78 = busy-wait (→V3,V6) · the suppress flag can mute the success reply, never the negative (→V4) |
| H2-C3 | Concept | **watch one real exchange:** `10 03 → 50 03 00 32 01 F4` — the reply's 4 trailing bytes are the P2/P2* timing promise (50/5000 ms). (Moved to run right after C2 — payoff first, concrete-before-abstract) | read the reply byte by byte · decode 00 32 = 50 ms P2, 01 F4 = 5000 ms P2* (→V6) · P2* = extended ceiling after 0x78 (→V3) |
| H2-C4 | Concept | **two things true of every beat:** (1) aiming — physical (1 ECU) vs functional (group), answers always physical; (2) reply is always pos or neg | full physical-vs-functional teaching lives **once here** (→V8) · positive-or-negative always |
| H2-C5 | Concept | non-default sessions time out; the tester sends **`$3E`** to keep alive while busy | why sessions expire (clock named S3 →V6) · purpose + broadcast form of $3E (→V7c) |
| H2-C6 | Concept | **`$11`** reset reboots → default session → **re-locks security** (glossed inline at bar altitude); `11 01 → 51 01` shown | reboot→default→locked causal chain (→V7b,V5) · the 11 01→51 01 trace (→V7b) · faults survive in the Dem store (→M3) |
| H2-C7 | Concept | **the life of a session:** open (`$10`) · hold (`$3E`) · close (`$11`/timeout) — both endings land at default, security re-locked | open/hold/close (→V5,V7a/b/c) · two ways it ends: reset vs silent timeout (→V5,V6) |
| H2-K | Conclusion | recap beat + session + retrieval + bridge to the catalog (lands on a **built** H3) | — |

## V2 — Request & positive response, byte by byte
*Enters:* SID; pos = SID+0x40; sub-fn; 10 03→50 03. *Leaves:* can lay out SDU+PCI+params+length, explain the first-byte PCI key, decode +0x40 and the echoed sub-fn.

| card | type | covers | go-deeper |
|---|---|---|---|
| V2-B | Brief | inside the good reply | — |
| V2-C1 | Concept | a PDU = SDU + PCI + params + length | A_PDU layout · first byte = PCI key |
| V2-C2 | Concept | positive response sets bit 6 of the SID (adds 0x40) | bit 6 = response-type; 10→50, 22→62 · why a constant not a field |
| V2-C3 | Concept | sub-fn services echo the sub-fn value with top bit cleared | bit7=0 on echo (→V4) · reading 10 03→50 03 (session byte 03 everywhere) |
| V2-K | Conclusion | recap + bridge to the negative case | — |

## V3 — Negative responses & the NRC catalog
*Enters:* neg = 7F+SID+NRC; 0x78 = busy. *Leaves:* can decode the fixed shape, navigate the global catalog + always-supported set, explain 0x78.

| card | type | covers | go-deeper |
|---|---|---|---|
| V3-B | Brief | when the answer is no | — |
| V3-C1 | Concept | a negative is always 3 bytes: 7F, requested SID, one NRC | why 7F not SID+0x40 · SID echoed so tester knows what failed |
| V3-C2 | Concept | one global NRC catalog (3 ranges) + an always-supported set | the 3 ranges · common codes (SNS/SFNS/CNC) |
| V3-C3 | Concept | 0x78 (RCRRP) = still working, real answer still comes | 0x78 opens the extended P2* window (→V6) · final response still sent |
| V3-K | Conclusion | recap + bridge to the suppress bit | — |

## V4 — Sub-functions & the suppressPosRsp bit
*Enters:* the sub-fn top bit is a reserved flag (H2-C1); echo clears it (V2); negatives always sent (V3). *Leaves:* can split the byte into suppress bit + value and explain suppression mutes only the positive.

| card | type | covers | go-deeper |
|---|---|---|---|
| V4-B | Brief | the bit that hides a reply (leads with the surprise) | — |
| V4-C1 | Concept | the suppress bit mutes **only** the positive reply; the service still runs, negatives still fire | negatives always sent · service runs regardless (wire, not work) · recall the bit-split &0x80/&0x7F from H2-C1 (do NOT re-draw) |
| V4-K | Conclusion | recap + bridge to transport | — |

## V8 — Addressing & the transport / OSI descent (what carries the message)
*Enters:* physical/functional exists, answers always physical (H2-C4); a UDS message has fields/negatives/suppress. *Leaves:* can explain why functional is single-frame/silent, follow the OSI descent, name CAN/CAN-FD/ISO-TP/DoIP.

| card | type | covers | go-deeper |
|---|---|---|---|
| V8-B | Brief | the wire under the words | — |
| V8-C1 | Concept | functional (1:n) is single-frame-only and non-serving ECUs stay silent (**deepens** the addressing rule, doesn't restate it) | why single-frame only (no flow control on a broadcast) · why negatives suppressed on a broadcast (→V3,V4) · 11/29-bit IDs |
| V8-C2 | Concept | the service descends the OSI stack unchanged in meaning | the invariant middle · the numbered OSI map (V1 pointed here) |
| V8-C3 | Concept | CAN carries 0–8 B (FD ≤64), 11/29-bit IDs — too small for many messages | CAN vs CAN-FD · 11 vs 29-bit |
| V8-C4 | Concept | ISO-TP segments a long message into SF/FF/CF with flow control | SF/FF/CF/FC + FlowStatus · six tTL_* timers · USDT vs UUDT |
| V8-C5 | Concept | over IP the same UDS rides DoIP (8-byte header); K-Line/LIN/FR are thin adapters | DoIP header + diag-message payload (→M7) · thin adapters |
| V8-K | Conclusion | recap + bridge to sessions | — |

## V5 — Sessions & the session state machine
*Enters:* sessions open/hold/close, non-default unlocks more, reset→default, Extended defined (H2-C1). *Leaves:* can name the states, describe transitions in general terms (features toggle, security re-locks), state the two returns to default.

| card | type | covers | go-deeper |
|---|---|---|---|
| V5-B | Brief | what a session really is (a state machine) | — |
| V5-C1 | Concept | an ECU is always in exactly one session; these are **states in a machine** (treats "sessions exist/default baseline" as prior knowledge) | 01 default/02 prog/03 ext/04 safety · default = power-up baseline |
| V5-C2 | Concept | entering a non-default session reconfigures the ECU; **taught abstractly** — some features toggle, security re-locks | Fig 7 transitions · **the ONE place** ResponseOnEvent/CommunicationControl/ControlDTCSetting (DTC = diagnostic trouble code) are named, flagged deferred (→M3,M4) · non-default re-locks security (→V7a,M4) |
| V5-C3 | Concept | two ways back to default: explicit ($10 / reset) or idle timeout | explicit vs timeout (clock S3 next →V6,V7b) · return-to-default always re-locks |
| V5-K | Conclusion | recap + bridge to timing | — |

## V6 — Timing & keep-alive (P2 / P2* / S3)
*Enters:* sessions time out; P2/P2* = 50/5000 ms (H2-C3); 0x78 = wait (V3). *Leaves:* can name the full deadline family, state 0x78 unlocks P2*, give the S3 keep-alive model.

| card | type | covers | go-deeper |
|---|---|---|---|
| V6-B | Brief | the clocks of a conversation (two families) | — |
| V6-C1 | Concept | the **deadline family**: tP2/tP2* (the 50/5000 you saw), tP4, client tP2/tP6/tP3; 0x78 switches P2→P2* (does NOT re-derive the numbers) | tP4 + client timers · 0x78 as the single P2* trigger (→V3) |
| V6-C2 | Concept | **S3** = the session-idle timer; expiry drops to default (S3 numbers live here) | tS3_Client 2000 < tS3_Server 5000 · non-default only; default disables it · only owning connection resets; any final response refreshes |
| V6-K | Conclusion | recap + bridge to the archetype services | — |

## V7a — `$10` DiagnosticSessionControl (the service, whole) — RICH
*Enters:* sub-fn bytes, session states, P2/P2* family; 10 03→50 03 00 32 01 F4 decoded (H2-C3). *Leaves:* can explain the full $10 exchange using the H2/V6 decode as prior knowledge.

| card | type | covers | go-deeper |
|---|---|---|---|
| V7a-B | Brief | the service that opens a session (references the decode as done) | — |
| V7a-C1 | Concept | $10's sub-function is the target session type | four types map to V5 states · programmingSession may enter boot SW (→M6) |
| V7a-C2 | Concept | ordering/gating/relock: response-before-switch, 0x22 CNC gate, non-default re-locks security (**replaces** a 3rd byte re-decode) | timing bytes already decoded in H2 — no re-derivation (→V6) · response-first ordering · 0x22 gating (→V3) · relock+S3 couplings (→V5,V6) |
| V7a-K | Conclusion | recap + bridge to reset | — |

## V7b — `$11` ECUReset (the service, whole) — moderate, ~3 legs
*Enters:* 11 01→51 01 decoded (H2-C6); reset→default+relock; $10 opened the session; volatile vs non-volatile memory. *Leaves:* can decode $11, name reset types + memory effects, explain rapid-power-shutdown and the response-before-reset rule.

| card | type | covers | go-deeper |
|---|---|---|---|
| V7b-B | Brief | the service that reboots the ECU (picks up the built H2 trace) | — |
| V7b-C1 | Concept | $11's sub-fn picks the reset type: hard/keyOffOn/soft/enable-disable rapid-power-shutdown | 01–05 types · volatile vs non-volatile: what a reboot clears/keeps (→M3) |
| V7b-C2 | Concept | enable-rapid-power-shutdown carries a powerDownTime byte + sleep semantics | the powerDownTime byte · sleep vs full reset |
| V7b-C3 | Concept | $11 sends its positive response **before** the reset, leaving an undefined dead time | response-before-reset (why) · the dead-time window · after reboot: default + locked (→V5) |
| V7b-K | Conclusion | recap + bridge to keep-alive | — |

## V7c — `$3E` TesterPresent (why you keep a session alive) — USE-CASE drill
*Enters:* $3E keeps alive, S3 timeout drops to default (H2/V6); suppress bit (V4); functional addressing (V8). *Leaves:* can explain WHY $3E, the 3E 80 broadcast keep-alive, and what is lost if it lapses.

| card | type | covers | go-deeper |
|---|---|---|---|
| V7c-B | Brief | why say "I'm still here" (purpose, not the clock) | — |
| V7c-C1 | Concept | a tester sends $3E to hold a non-default session open while busy/mid-operation | the presence purpose · why only non-default needs it (→V5) |
| V7c-C2 | Concept | `3E 80` = functional broadcast + suppress bit — keeps many ECUs alive at once, no replies | SPRMIB=1 so silence on a group (→V4) · used during a flash/long routine (→M6) |
| V7c-C3 | Concept | if $3E stops: S3 expires → default → security re-locks (same end-state as an $11 reset) | S3 timeout→default→locked (→V6,V5) · same end-state as $11 (→V7b) |
| V7c-K | Conclusion | recap + bridge to the service catalog | — |

## H3 — What UDS can do & how the ECU decides *(must build first — see Open decisions #2)*
*Enters:* the beat, session life, addressing. *Leaves:* can name the 6 units + security sub-layer, say what needs a session/security, describe DID/RID, sketch the PduR→DSL→DSD→DSP pipeline, place $10/$11/$3E in the comms-management family.

| card | type | covers | go-deeper |
|---|---|---|---|
| H3-D0 | Divider | catalog + server overview | — |
| H3-C1 | Concept | UDS services group into **exactly six** functional units + a security sub-layer (not a 7th) | all six enumerated (no "etc."): comms mgmt · read/write data · fault memory (DTCs →M3) · routines & I/O · data transfer/reflash (→M6) · upload/download · security is a sub-layer (→M4) |
| H3-C2 | Concept | many services need a non-default session and/or a security unlock first | session-gated vs security-gated (→V5,M4) · why gate (safety) |
| H3-C3 | Concept | data lives at 16-bit **DIDs**, routines at 16-bit **RIDs** — huge coordinate spaces | DID space (→M2) · RID space (→M5) |
| H3-C4 | Concept | inside the ECU a request flows through 4 stages: route → link/session → dispatch (accept/reject) → process (plain words first, PduR/DSL/DSD/DSP as secondary labels) | each stage's job · the AUTOSAR names (→V9) · the "DSD accepts → DSP executes" boundary (→V9) |
| H3-C5 | Concept | $10/$11/$3E are members of the **communication-management** unit (same term as C1 — files into a family already met) | same unit holds $27/$28/$29→M4, $85→M3 (caveat) · the three drilled: $10(→V7a)/$11(→V7b)/$3E(→V7c) |
| H3-K | Conclusion | recap + retrieval + bridge onward | — |

## V9 — Inside the server (the Dcm pipeline & the NRC-origin gate)
*Enters:* request flows route/link/dispatch/process (H3-C4); NRCs exist (V3); 0x78 at the P2 boundary (V6). *Leaves:* can walk the pipeline, describe the ordered validation gate where NRCs originate, place 0x78, state security starts locked.

| card | type | covers | go-deeper |
|---|---|---|---|
| V9-B | Brief | where every answer is born | — |
| V9-C1 | Concept | Dcm realizes the pipeline: PduR routes, DSL links/session, DSD dispatches, DSP processes | each stage's concrete job · standard is abstract, Dcm is one build (clause/Fig cite in :::reading, not body) |
| V9-C2 | Concept | DSD runs an ordered validation gate, stops on first failure, emits the matching NRC | the ordered check sequence · each check maps to one NRC (→V3) · the accept→execute boundary (→H3) |
| V9-C3 | Concept | 0x78 emitted at the P2/P2* boundary when processing runs long; security starts locked | 0x78 at accept→execute (→V6,V3) · security init LOCKED (→M4) |
| V9-K | Conclusion | recap + bridge out of the Foundation | — |

---

## Random fitments found (the "random content" — mostly in the SHIPPED H1/H2)

1. **Shipped H1-C3** bolts a full **addressing** teaching (bar+rule+figure) onto an OSI-**layering**
   card — addressing is orthogonal to layering. → Cut; addressing lives once in H2-C4, drilled in V8.
2. That addressing leg is **duplicated near-verbatim** in shipped H1-C3 **and** H2-C3 (same
   `c3-addressing.svg`, same bullets). → Keep the H2 instance; delete the H1 copy.
3. **Shipped H2-C3 "Four rules hold around every beat"** packs **four unrelated ideas** (addressing /
   $3E / Dem / $11) into one bar with no single focal point, and rule 3 (Dem) has no leg. → Split into
   per-beat invariants (new H2-C4) + session-context cards (H2-C5/C6/C7); Dem → a bare pointer.
4. **Shipped H2-C1** explains "suppress the positive reply" **before the positive reply is defined**
   (H2-C2). → Trim to "a reserved flag met later (→V4)"; suppression first appears after positive.
5. **Shipped H2-C2** inline-defines **"security"** inside an NRC example — drags a whole downstream
   module in. → Bare NRC + (→M4); "security" first glossed at bar altitude in H2-C6.
6. **Shipped H1-C2** restates transport-independence a **second time** + a dangling SOVD teaser with no
   pointer. → Own it once in H1-C3; cut the teaser (SOVD is placed in H1-C4).
7. **Shipped H1-C1** front-loads **SID + the $10 byte example**, pre-empting H2-C1. → Soften to "each
   service has a number (→H2)"; the SID-as-first-byte teaching stays in H2-C1.
8. **Draft V5-C2** enumerated ResponseOnEvent/CommunicationControl/ControlDTCSetting (+ undefined
   "DTC") as if self-evident — the worst curse-of-knowledge break. → Abstract in the bar; the concrete
   names confined to one deferred leg, DTC spelled out.
9. **Draft H3-C1** put spec provenance ("FDIS renumbers…only ResponseOnEvent changed") in a teaching
   bar. → Moved to the :::reading footer.
10. **Draft V7a-C2** was a **third** byte-decode of 00 32 / 01 F4. → Cut; reference H2's decode, carry
    only the synthesis (ordering, gating, couplings).
11. **Draft V1-C3** used "Layer 5" before the numbered OSI stack is drawn (V8). → Plain "session layer"
    + (→V8).
12. **Draft V9-C1** used an author-facing "Dcm realization of Fig 5" cross-ref. → Reader-side reframe;
    citation to the footer.

## Key continuity fixes (folded into the structure above)

- **H2 re-sequenced:** the one real trace (H2-C3) now runs **right after** pos/neg (C2), *before* the
  always-true material — so the hook "you've just watched one full beat" is finally true.
- **"Four rules" card split** into per-beat invariants + session-context cards (one idea per card).
- **Added the `11 01 → 51 01` trace** in H2-C6 so V7b has a real bar to pick up (was cold-starting $11).
- **Triple P2/P2* coverage collapsed:** decode once in H2-C3; V6 adds the *family*; V7a adds the
  *couplings* — each altitude adds, never repeats.
- **Addressing taught once** (H2-C4); H1 and V8 point to / deepen it, never restate.
- **Bars made self-sufficient:** "security", "session", "S3/P2" glossed at bar altitude or deferred
  with a pointer, so the breadth-only path never leans on a collapsed leg or unbuilt drill.
- **V5-C2 curse-of-knowledge cluster defused** (see fitment #8).
- **Session byte aligned to `03`/Extended** across H2-C3, V2-C3, V7a (draft mixed in `02`).

## Decisions (RESOLVED 2026-07-07)

1. **V8 placement — DECIDED: move V8 to after V4.** Drill order is now
   `H1 → V1 → H2 → V2 → V3 → V4 → V8 → V5 → V6 → V7a → V7b → V7c → H3 → V9`. This **supersedes**
   COURSE.md's earlier "V8 as the late zoom-out" order (updated there too). Rationale: V8 leans on a
   concrete message + the negative/suppress concepts, so reading it after V4 removes every
   term-before-definition leap; the new narrative is outside-in then inside (bytes → the wire that
   carries them → session/service semantics → inside the server).
2. **Apply timing — DECIDED: fold the shipped-H1/H2 content fixes into the pending shell round.** Do
   the continuity re-author (re-order H2, split the four-rules card into C4–C7, add the `11 01 → 51 01`
   trace, trim the subfn/security legs, cut H1-C3's addressing dup) **together with** the shell feedback
   + topbar consolidation — one re-author pass, so H1/H2 are not edited twice.
3. **H2 granularity — DECIDED: keep 7 concept cards** (C1–C7), one idea each; do NOT merge
   keep-alive + reset.

## Still open / build-time

4. **H3 + V9 are unbuilt stubs.** Breadth-reads-alone and V9's bar both require H3 to exist — build H3
   to the bar (COURSE.md Current Focus already plans this) before signing off the spine.
5. **Asset check — RESOLVED 2026-07-07.** The `c3-addressing.svg` collision is gone: H1-C3's addressing
   leg was cut (H1's copy deleted), and all H1/H2 figures were renamed to the globally-unique §7c
   convention `<h#>-<card>-f<k>_<title>.svg` (see the Figure register below), so no two figures can
   share a filename. The old orphan `c3-four-rules.svg` (superseded bucket card) was also deleted.

---

## Figure register (§7c) — the built modules

Figure ID = `<CARD>-F<k>` (card-scoped: `F1` = the card's bar figure, `F2…` = its go-deeper leg
sketches in reading order). Filename = `<card>-f<k>_<kebab-title>.svg` in `<module>/assets/figures/`,
globally unique by the `h1-/h2-` prefix. Kept 1:1 with the on-disk SVGs (verified by `checkmod.js`).
V-drills and H3 are unbuilt — their registers are authored when each module is built.

### H1 — The diagnostics landscape

| ID | Title (takeaway) | Card / leg | Filename |
|----|------------------|------------|----------|
| H1-BRIEF-F1 | One request, one answer — who talks | brief · bar | `h1-brief-f1_who-talks.svg` |
| H1-C1-F1 | One language, two fixed roles (client ↔ server) | C1 · bar | `h1-c1-f1_client-server.svg` |
| H1-C1-F2 | One shared dictionary, looked up from both ends | C1 · leg *dictionary* | `h1-c1-f2_shared-dictionary.svg` |
| H1-C2-F1 | The ISO 14229 family, split by job (-1 / -2 / -3…-7) | C2 · bar | `h1-c2-f1_family-map.svg` |
| H1-C2-F2 | Same `$10`, different wires — thin adapters | C2 · leg *adapters* | `h1-c2-f2_thin-adapters.svg` |
| H1-C2-F3 | The neighbours: Dcm · Dem · ODX · SOVD | C2 · leg *neighbours* | `h1-c2-f3_neighbours.svg` |
| H1-C3-F1 | Meaning on top, wires at the bottom (OSI stack) | C3 · bar | `h1-c3-f1_osi-stack.svg` |

### H2 — The life of one request

| ID | Title (takeaway) | Card / leg | Filename |
|----|------------------|------------|----------|
| H2-BRIEF-F1 | One request, one answer — the beat we trace | brief · bar | `h2-brief-f1_one-beat.svg` |
| H2-C1-F1 | `10 03` = "switch to the Extended session" | C1 · bar | `h2-c1-f1_request-shape.svg` |
| H2-C1-F2 | One byte of service, then its parameters | C1 · leg *anatomy* | `h2-c1-f2_request-anatomy.svg` |
| H2-C1-F3 | The sub-function byte, split (reserved flag + value) | C1 · leg *subfn* | `h2-c1-f3_subfunction-byte.svg` |
| H2-C2-F1 | Same question, two possible replies | C2 · bar | `h2-c2-f1_two-answers.svg` |
| H2-C2-F2 | A negative is always three bytes (`7F` + SID + NRC) | C2 · leg *negative* | `h2-c2-f2_negative-shape.svg` |
| H2-C3-F1 | One real round trip (`10 03 → 50 03 00 32 01 F4`) | C3 · bar | `h2-c3-f1_one-real-request.svg` |
| H2-C3-F2 | Six bytes, four jobs — the reply decoded | C3 · leg *reply* | `h2-c3-f2_reply-bytes.svg` |
| H2-C3-F3 | From bytes to milliseconds (`P2` / `P2*`) | C3 · leg *timing* | `h2-c3-f3_timing-decode.svg` |
| H2-C4-F1 | Requests fan out; answers come back from one | C4 · bar | `h2-c4-f1_addressing.svg` |
| H2-C5-F1 | Keeping a session alive — idle clock + `$3E` | C5 · bar | `h2-c5-f1_keep-alive.svg` |
| H2-C6-F1 | `$11` reset — reboot to default, re-locked | C6 · bar | `h2-c6-f1_reset.svg` |
| H2-C7-F1 | A session's life — open · hold · close | C7 · bar | `h2-c7-f1_session-life.svg` |
