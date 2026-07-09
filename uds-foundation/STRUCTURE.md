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

- **Breadth-only (bars read alone = whole picture):** **H1 → H2 → H3.** H3 is now built to the bar
  (6 cards). Every bar term (security, S3, P2, DID/RID, the six units) is glossed inline at bar altitude
  or carries a `{{→}}` pointer — no bar leans on a collapsed leg or an unbuilt drill. (The server-pipeline
  acronyms PduR/DSL/DSD/DSP are **no longer** at H3 bar altitude — they moved to V9 depth in the 9→6
  restructure.)
- **Full drill order (opt-in depth):** H1 → V1 → H2 → V2 → V3 → V4 → **V8** → V5 → V6 → V7a → V7b →
  V7c → H3 → V9. **⚠ open decision:** this moves **V8 to after V4** (V8 leans on a concrete message +
  the negative/suppress concepts). This *differs from COURSE.md's locked order* (V8 as the late
  "zoom-out" after the service homes). See Open decisions #1.
- **Bar-coverage (every V has a bar):** V1←H1-C2 · V8←H1-C3 + H2-C4 · V2,V3←H2-C2 · V4←H2-C1 ·
  V6,V7a←H2-C3 · V5,V7c←H2-C5/C7 · V7b←H2-C6 · V5←H3-C3 · V9←H3-C3 · V7a/b/c←H3-C2. No orphans.
  *(H3-C1 primer = an additional breadth touchpoint for the service concept; V1's bar remains H1-C2 — do not re-home it.)*

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
| H2-K | Conclusion | recap beat + session + retrieval + **3-stop bridge to H3** (first *what a service IS*, then the whole catalog of them, then how the ECU decides yes/no) — lands on a **built** H3 | — |

## V2 — Request & positive response, byte by byte
*Enters:* SID; pos = SID+0x40; sub-fn; 10 03→50 03. *Leaves:* can lay out SDU+PCI+params+length, explain the first-byte PCI key, decode +0x40 and the echoed sub-fn.

| card | type | covers | go-deeper |
|---|---|---|---|
| V2-B | Brief | inside the good reply | — |
| V2-C1 | Concept | a PDU = SDU + PCI + params + length | story steps: naked bytes → A_PCI (first byte = key) → parameters → Length/A_PDU |
| V2-C2 | Concept | positive response sets bit 6 of the SID (adds 0x40) | story steps: read a SID in binary → **bit 6 = 0 on every request** (10/22/3E/85) → **why bit 6 not bit 7** (bit 7 used by 85 ControlDTCSetting) → set bit 6 = +0x40, same every service → computed rule, not a stored field |
| V2-C3 | Concept | sub-fn services echo the sub-fn value with top bit cleared | story steps: 10→50 (+0x40) → 03 echoed (why: exactly-which) → top bit forced 0 (→V4) → the byte split (flag + value) |
| V2-K | Conclusion | recap + bridge to the negative case | — |

> **Card model — REBUILT on the app-slide stepped-story ([[CONVENTIONS]] §1c/§1f, session 22).** Every
> V2 concept card is one `## story` of steps (no `:::panel`, no go-deeper legs). C1 shipped this way; C2/C3
> rebuilt to match. Each card's former "bar + legs" becomes an ordered step flow whose single figure
> **evolves** (its `data-stage`/`data-until` elements advance with the narration) or **swaps** to a new
> figure. The figure headline tracks **each step's** point, never the card's conclusion. `:::elaborate` /
> `:::reading` are separate `## footer` sections, not woven into the steps.

**V2 is the session-20 exemplar-rigor PILOT (see [[CONVENTIONS]] §7d, §6 motivate-first, §4 retrieval).**
V2 is chosen because it is pure byte-mechanics with a positive-response semantic at its core — the exact
place the animation/colour/reveal rigors bite. Apply, per card:

- **V2-B (Brief):** built in the LOCKED 3-part advance-organizer format (§4) — why-this (recall V1's
  abstract primitives → "now the actual bytes of a good reply") · what's-inside (C1/C2/C3) · what-you'll-
  be-able-to-do (lay out a PDU, decode `+0x40`, read an echoed sub-fn). Close with `:::key` "By the end."
- **V2-C1 (PDU = SDU+PCI+params+length):** figure **`v2-c1-f1`** is the pilot **staged reveal** — the PDU
  **assembles field-by-field** (SDU → PCI → params → Length), each field lighting as the prose names it,
  **click-to-advance**. Motivate-first opener (what a reply *is* underneath, before naming PCI). Byte-boxes
  from the **shared generator** (§7d-4).
- **V2-C2 (positive = SID+0x40):** figure **`v2-c2-f1`** is the pilot **"animate the consequence"** — `10`
  visibly **sets bit 6 → `50`** (a bit toggling = a computed transform, §7d motion grammar), click-to-
  advance. Opener uses the **"you could have invented +0x40"** discovery framing (§6). **`:::elaborate`
  beat** lives here ("why a constant, not a field?"). On-image labels = `$50` / `+0x40` verbatim (§7d-2
  parity).
- **V2-C3 (echoed sub-fn, bit7 cleared):** reuse the **same `50 03` byte-box** from C1/C2 (object
  constancy, §7d-4) — the reader sees the *identical* sprite, reinforcing "session byte `03` everywhere."
- **V2-K:** `:::recall` is **generative** (§4) — "decode `62 F1 90`" / "what does `50 03` tell the tester?",
  never a recognition check. Competence beat + bridge to the negative case (V3).
- **Colour:** all V2 figures are the **first drawn under §7d** — tester = `--actor-tester`, ECU =
  `--actor-ecu` (distinct from olive `--ok`); positive reply marked by a **✓ glyph + stroke**, not green.

**V2 figure register (§7c) — REBUILT 2026-07-09 (app-slide stepped-story).** All from `_template/bytebox.js`
(object constancy); source = `gen-figures.js`. Each concept card's figure **evolves in lockstep with the
story steps** (`data-stage`/`data-until`); the headline text is itself stage-gated so it tracks the step.

| ID | title | card | filename | reveal / motion |
|----|-------|------|----------|-----------------|
| V2-B-F1 | a reply that worked, still sealed | brief | `v2-b-f1_good-reply.svg` | static (orienting) |
| V2-C1-F1 | naked bytes → A_PCI → parameters → Length = one A_PDU | C1 (evolves, 4 steps) | `v2-c1-f1_pdu-layout.svg` | stage-gated headline + seams build |
| V2-C1-F2 | the recipe: A_PDU = A_SDU + A_PCI | C1 (retired leg fig — unused) | `v2-c1-f2_pdu-recipe.svg` | static |
| V2-C1-F3 | the first byte routes everything (≠7F vs 7F) | C1 (retired leg fig — unused) | `v2-c1-f3_first-byte-key.svg` | static |
| V2-C2-F1 | SIDs in binary — bit 6 = 0 on all (10/22/3E/85), bit 7 used by 85 | C2 (evolves, steps 1–3) | `v2-c2-f1_sid-bit6-free.svg` | rows reveal; bit-6 column band; red outline on 85's set bit 7 |
| V2-C2-F2 | set bit 6: `10`→`50` = +0x40, same every service (`85`→`C5`) | C2 (step 4) | `v2-c2-f2_plus-0x40-bitflip.svg` | static; bit 6 highlighted set; `50` pos sprite |
| V2-C2-F3 | computed rule vs a stored type-field (the trade-off) | C2 (steps 5–6) | `v2-c2-f3_rule-not-field.svg` | static contrast (✓/✕) |
| V2-C3-F1 | `10 03` → `50 03`: +0x40 on the SID, sub-fn echoed, top bit 0 | C3 (evolves, steps 1–4) | `v2-c3-f1_echoed-subfn.svg` | **horizontal** request→reply (fills the wide box); shared `50`/`03` sprites; stage-gated headline |
| V2-C3-F2 | one byte, two jobs (top-bit flag · value) | C3 (swap, step 5) | `v2-c3-f2_subfn-byte.svg` | static split |

*(Object constancy holds: the `50`/`03` sprites are pixel-identical across C1/C2/C3. C1's F2/F3 were the old
go-deeper leg sketches; the story rebuild folds their content into steps/footer, so those two SVGs are no
longer referenced — kept on disk, not rendered.)*

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
*Enters:* the beat, session life, addressing; a service is a numbered thing you can ask (H1). *Leaves:* can say what a diagnostic service **IS** (a named capability offered under a fixed shape — one request, one of a fixed set of replies, only if the ECU is in the right state — that reads and/or changes a live installed ECU from outside), name the 6 units + security sub-layer, say what needs a session/security, name DID/RID (the 16-bit coordinate for data/routine), place $10/$11/$3E in the comms-management family, and say **how the ECU decides** — it vets every request (session? unlock? valid?) then serves it or refuses with a negative, decided **inside** the server (→V9 for the step-by-step gate).

> **Service-primer insert (LOCKED 2026-07-07, user-approved).** Before the catalog, H3 opens with a
> Brief + a Concept **primer** that makes the word "service" concrete (derivation: `_derive`
> workflow `h3-service-primer-derivation`, 17 agents, ISO-grounded + adversarially checked). In the final 6-card layout (post 9→6 restructure) the primer is **C1**, the catalog **C2**, the
> decide-card **C3** (K = conclusion). The primer is a **breadth spiral**, NOT a
> V1 duplication (H1 *names* services · H2 *traces* one · **H3 primer *abstracts* to what a service
> IS** · V1 *formalizes* primitives/SAP). **Lint fence on the primer content** (any hit = it slid
> into V1, pull back): `primitive · indication · confirmation · SAP · access point · A_Mtype · A_SA ·
> A_TA · S_Data · confirmed/unconfirmed service`. The SID / +0x40 / 7F+NRC facts are H2's — the primer
> **re-uses** them as the shape's parts, never re-derives.

> **✅ H3 9→6 RESTRUCTURE DONE 2026-07-07 (session 14).** The old C4 (DID/RID), C5 (4-stage pipeline) and
> C6 (comms family) were rejected as standalone cards (OK/NG gate) and removed. DID/RID → a one-liner in
> C2 (→M2/M5); the pipeline → V9 depth (only the *decision* survives, in C3); the comms family → a leg in
> C2. **C2** rewritten (six families + comms-placement leg →V7a/b/c + DID/RID one-liner + security leg;
> carries the V7a/b/c bars). **C3** is new — "The ECU decides what it will serve" (vet → serve/refuse;
> legs = two gates →V5/M4 and where-a-no-is-born →V9; carries the V5 AND V9 bars). K trimmed to the leaner
> arc; orders renumbered 00/10/20/30/40/50. Content browser-verified (`checkmod . 3` green, no stale
> pipeline terms). The 6-card build is the table below.

| card | type | covers | go-deeper |
|---|---|---|---|
| H3-D0 | Divider | the arc: what a service **IS** → the catalog of them → how the ECU decides yes/no | — |
| H3-B | Brief | advance organizer (sets up, no teaching): you traced ONE request in H2 — but what is the ECU offering a whole *list* of? 3 stops (what a service is · the catalog · how it decides). Carries the hook + sealed-box + **menu** image so the primer stays one clean idea | — |
| H3-C1 | Concept | **THE PRIMER:** a UDS **service** = a **named job the ECU offers under one fixed shape** (send one request → get one reply from a fixed set: a "done", or a "no+reason" from a known list — **only if** the ECU is in the right state); it is **diagnostic** by **purpose** — the services are the **primitives you diagnose the vehicle with**. Bar states the shape as a **generalization** ("*every* service, whatever it does, uses this one shape you already saw in H2") — it does **NOT** re-decode bytes (H2 owns that). Names **functional unit** once at the end (hands off to C2). *(Leg on "the fixed shape, byte-by-byte" DROPPED 2026-07-07 per user FB — redundant with H2-C1/C2/C3; nothing to relocate.)* | **2 legs.** *what makes it diagnostic* — the **primitives** you diagnose with: read faults (→M3) · read live data (→M2) · test an actuator (→M5) · check ECU software is healthy · update ECU software (→M6); done from **outside**, no teardown; tester = scan tool / EOL station / OTA (→M7); *purpose, not the bytes* (cl.3.6/7.1/1) · *what it means to **provide** (two roles)* — tester *uses* (asks, waits); ECU-side **server** *provides* — offers the service, then does the job + replies, or refuses with a reason; server = a **function**, not the box (cl.3.18 Note 1) → the same service can come from any ECU. Enter from H1's server role, don't re-teach it (→V9 · the Dcm, →V1 · the formal model) |
| H3-C2 | Concept | UDS services group into **exactly six** functional units (ISO 14229-1 cl.10–15) + a security sub-layer (not a 7th). **Bar** = the six (provide-voice), each named with real SIDs; **+ a DID/RID one-liner** (data/routine name a target by a 16-bit id, not a memory address →M2/M5). **Carries the V7a/b/c bars** (via the comms leg). | *comms family* (leg): $10/$11/$3E act on the conversation → placed in family #1, drilled $10(→V7a)/$11(→V7b)/$3E(→V7c); same unit also holds $27/$28/$29(→M4) + $85(→M3) · *security* (leg): SecurityAccess ($27) guards the risky ones across all six — read always, unlock to change; a guard, **not** a 7th unit (→M4) |
| H3-C3 | Concept | **"The ECU decides what it will serve"** — the ECU vets every request against its state (right session? unlocked? valid?) → serves it, or **refuses** with the **negative** (7F+SID+reason) from H2; the "no" is decided **inside** the server, not a wire glitch. **Carries the V5 AND V9 bars.** | *two gates* (leg): session (→V5) + security ($27, →M4), why = safety · *where a "no" is born* (leg): the ECU checks **before** it works; a failed check emits the reason — the full ordered gate is V9 depth (→V9) |
| H3-K | Conclusion | recap (service = a named capability with a fixed shape · six families + security guard · DID/RID · the ECU decides → serve/refuse) + retrieval (which family is $22? reprogram = which family + what gates it?) + bridge onward to M2 | — |

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

4. **H3 built (2026-07-07); V9 remains an unbuilt stub.** The breadth-reads-alone path now holds (H1→H2→H3
   all built to the bar). V9's bar is carried by H3-C3 (the decide card). Remaining before the spine signs
   off: draw the real H3 SVGs (placeholders now) and build the V-drills, V9 included.
5. **Asset check — RESOLVED 2026-07-07.** The `c3-addressing.svg` collision is gone: H1-C3's addressing
   leg was cut (H1's copy deleted), and all H1/H2 figures were renamed to the globally-unique §7c
   convention `<h#>-<card>-f<k>_<title>.svg` (see the Figure register below), so no two figures can
   share a filename. The old orphan `c3-four-rules.svg` (superseded bucket card) was also deleted.

---

## Figure register (§7c) — the built modules

Figure ID = `<CARD>-F<k>` (card-scoped: `F1` = the card's bar figure, `F2…` = its go-deeper leg
sketches in reading order). Filename = `<card>-f<k>_<kebab-title>.svg` in `<module>/assets/figures/`,
globally unique by the `h1-/h2-` prefix. Kept 1:1 with the on-disk SVGs (verified by `checkmod.js`).
**H3 fully built** (6 cards, 10 figures — real SVGs drawn + geometry-audited 2026-07-08). **V1 fully built
2026-07-08** (5 cards, 10 figures — all animated where motion teaches, geometry-audited light + dark; §7a clean).
**V2 fully built 2026-07-09** (5 cards, 8 figures — exemplar-rigor pilot: staged reveal + the synced
`:::panel`; register in the "V2 figure register" table above). V3–V9 unbuilt — registers authored when built.

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

### H3 — What UDS can do & how the ECU decides *(6-card build; all 10 figures drawn + audited 2026-07-08)*

| ID | Title (takeaway) | Card / leg | Filename |
|----|------------------|------------|----------|
| H3-B-F1 | One request, a whole menu behind it — the sealed box offered a way in | brief · bar | `h3-b-f1_a-whole-menu.svg` |
| H3-C1-F1 | A service is a capability the ECU provides | C1 · bar | `h3-c1-f1_capability.svg` |
| H3-C1-F2 | Atomic primitives combine into the diagnosis | C1 · leg *diagnostic* | `h3-c1-f2_primitives-to-diagnosis.svg` |
| H3-C1-F3 | One asks; the other does the work — “server” is a role, not a box | C1 · leg *provide* | `h3-c1-f3_provide-vs-use.svg` |
| H3-C2-F1 | Every service belongs to one of six families | C2 · bar | `h3-c2-f1_six-families.svg` |
| H3-C2-F2 | The three you know live in the first family (`$10`/`$11`/`$3E`) | C2 · leg *comms* | `h3-c2-f2_comms-family.svg` |
| H3-C2-F3 | Security gates the risky services (`$27`) | C2 · leg *security* | `h3-c2-f3_security-gate.svg` |
| H3-C3-F1 | The ECU vets a request, then serves or refuses | C3 · bar | `h3-c3-f1_decide-serve-or-refuse.svg` |
| H3-C3-F2 | Two gates — the gate matches the risk | C3 · leg *gates* | `h3-c3-f2_two-gates.svg` |
| H3-C3-F3 | Check first, work second — where a "no" is born | C3 · leg *refusal* | `h3-c3-f3_no-is-born.svg` |

### V1 — The service model *(5-card build; 10 figures, all animated where motion teaches; geometry-audited 2026-07-08)*

| ID | Title (takeaway) | Card / leg | Filename |
|----|------------------|------------|----------|
| V1-B-F1 | One exchange, about to be slowed down and named | brief · bar | `v1-b-f1_one-exchange.svg` |
| V1-C1-F1 | One exchange, four steps — same message at its two ends | C1 · bar | `v1-c1-f1_four-steps.svg` |
| V1-C1-F2 | Six steps for a reply, three for none | C1 · leg *count* | `v1-c1-f2_six-and-three.svg` |
| V1-C1-F3 | One arrow, three facts (tail acts · head told · down = time) | C1 · leg *arrows* | `v1-c1-f3_reading-arrows.svg` |
| V1-C2-F1 | The tester brackets; the ECU serves the middle | C2 · bar | `v1-c2-f1_owners.svg` |
| V1-C2-F2 | Three steps each, no overlap | C2 · leg *sides* | `v1-c2-f2_by-side.svg` |
| V1-C2-F3 | The names mirror; the roles do not | C2 · leg *symmetry* | `v1-c2-f3_symmetry.svg` |
| V1-C3-F1 | Every call crosses a SAP with a label; the reply swaps from/to | C3 · bar | `v1-c3-f1_sap.svg` |
| V1-C3-F2 | The label, with its real names (A_Mtype / A_SA / A_TA) | C3 · leg *names* | `v1-c3-f2_param-names.svg` |
| V1-C3-F3 | Rich on top, plain below — the call becomes S_Data | C3 · leg *sessionlayer* | `v1-c3-f3_session-layer.svg` |
