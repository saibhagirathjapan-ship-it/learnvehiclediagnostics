# Course: Automotive Diagnostics — from UDS to SOVD

**This file is the single source of truth for the learning-course build** — the **standing**
material: roadmap, locked conventions, the Foundation H/V block. The **volatile** state (current
status · queue · deferred) lives in **`NEXT.md`** (the dashboard); granular per-card status in
each module's `NOTES.md`. Session kinds + their rigor curation: **`work-types.md`**.

---

## Resume protocol (do this at the start / end of every session)

**At session start** *(ritualized as `/session-open` — the command walks these steps)*
1. Read this file (`wiki/learn/COURSE.md`) — roadmap, conventions. *(Auto-loaded via CLAUDE.md.)*
2. **Read `NEXT.md`** — current state, suggested next session, the queue.
3. Read the active module's `NOTES.md`; identify the session's **work-type** (`work-types.md`)
   and confirm the proposal + execution mode with the user before building.
4. If anything in Conventions is unclear or seems stale, confirm with the user before building.

**At session end** *(ritualized as `/session-wrap`)*
1. **Incident ask + hardening ask** — a Claude-side miss worth learning from → `INCIDENTS.md`;
   a generic reusable rigor discovered → [[CONVENTIONS]] / the work-type (deliberate edit).
2. Update the active module's `NOTES.md` (card statuses, gate scorecard, TODOs).
3. Append a dated entry to `wiki/log.md` (what changed).
4. **Refresh `NEXT.md`** (current state, suggested next, queue, deferrals — dashboard, not journal).
5. Save any durable, cross-session fact to memory (user prefs, locked decisions).
6. **Commit + push** (git root = `wiki/learn/`, branch `main`) — the live GitHub Pages site is the
   deliverable, so a session/drill is **not done until it's pushed**. Confirm the push landed.

---

## Vision

Teach a **no-context learner** automotive diagnostics, building toward **SOVD**
(Service-Oriented Vehicle Diagnostics, ISO 17978). The learner must first understand
**UDS** (ISO 14229) — where it lives in the ECU, how a request is served, the OSI
mapping, message anatomy, and individual services — before SOVD makes sense.

Audience persona to draft from: an **OEM systems engineer** writing for a peer who has
zero prior knowledge. Every line must stand alone and be useful to the reader.

---

## Locked conventions (do not re-litigate without user sign-off)

**Deliverable format** (design language + card model LOCKED 2026-07-04 — full spec in [[CONVENTIONS]] §1b–1d)
- **Content authored as per-concept Markdown** (`wiki/learn/<module>/content/<id>.md`, source
  of truth, refinable), **rendered through the shared Blueprint template** into a
  **self-contained HTML page** (`index.html`, fonts bundled, no runtime deps).
- **Design language "Ochre & Olive"** (re-themed 2026-07-05, was "Blueprint"): **white canvas ·
  dark-grey (`--chrome`) bars/buttons/section-dividers · ochre key accent · olive-green positive ·
  cool greys**; semantic red/green/grey override thematic; schematic; Space Grotesk / IBM Plex Sans /
  IBM Plex Mono / Noto Sans JP; **key terms set in the accent (ochre)**. Full spec in [[CONVENTIONS]] §1b.
- **Concept cards are T-shaped:** high-level **bar** (one canonical illustration) + collapsible
  **detail legs** (each with its own sketch), collapsed by default, T-glyph wayfinding.
- **Card taxonomy:** Divider · Brief · Concept (T) · Conclusion.
- **Bilingual EN + JP**, both present; JP natural teaching register. Toggle EN / 日本語 / EN+JP.
- **Light + dark themes**, `.dgm` theme-aware diagrams.
- **No meta-framing.** Substance only; provenance in a small footer.

**Content craft** — follow the full rigor in [[CONVENTIONS]] (`wiki/learn/CONVENTIONS.md`,
auto-loaded via CLAUDE.md). Build unit-by-unit, anchor each illustration to its claim,
worked examples baked in place, order deliberately, story flows top-to-bottom.

**Notation (LEARNER-FACING, LOCKED 2026-07-09 — user)** — **every hex value carries an `h` suffix,
everywhere**: inline (`10h`, `50h`, `40h`, `7Fh`), in byte-box cells, and in multi-byte traces
(`50h 03h 00h 32h 01h F4h`). Positive response = SID + `40h`; negative = `7Fh <SID> <NRC>`. Bit values
(`0`/`1`) stay bare. *(`$XX` used in THIS roadmap / planning docs is internal service shorthand only —
it renders as `XXh` in a card.)*

**Verification (never declare done from theory)** — drive real Chrome via
`puppeteer-core` (installed `--no-save`; do not commit package.json). Scripts live in the
module folder: `verify.js` (DOM measure: card counts/types, one-figure-per-concept,
zero overflow in light/dark/mobile, no console errors, lang toggle), `shots.js`
(close-up card screenshots), `navtest.js` (mobile + TOC nav-landing). Screenshots →
`assets/`.

**Sources (documents-first — see [[CONVENTIONS]] "Sourcing philosophy")** — ground every claim in
the governing standard (the **UDS ISO 14229** family, the transport standards **ISO 15765-2** /
**ISO 13400-2**, **SOVD** ISO 17978, **ODX** 22901, **OTX** 13209, **AUTOSAR CP**) and **cite the
clause**; the standards are the **source of truth**, internet/domain knowledge a subordinate
gap-filler always reconciled to a cited clause. A few points (**ISO 11898-1** CAN data-link,
**ISO 15765-4** CAN-ID assignment, **ISO 14229-4** UDSonFR) are filled from training + internet and
reconciled to the primary clause. *(Operational sourcing notes — the reference set and how to search
it — are kept locally, untracked.)*

---

## Module roadmap

**Confirmed with user 2026-07-03:** deep UDS track (incl. reprogramming) · include a
web-API primer · many small single-sitting modules. Each module folder is
`wiki/learn/<slug>/` with its own `index.html`, `NOTES.md`, and verification scripts.
Each module maps a UDS capability to the SOVD resource category it later becomes.

Status legend: ✅ done · 🚧 in progress · ⬜ not started

| # | Module (slug) | Scope | → SOVD category | Status |
|---|---------------|-------|-----------------|--------|
| **F** | **Foundation** (H-spine + V-drills) | **superseded old "M1"** — expanded into the locked H/V block below | substrate | 🚧 |
| **M2** | Data & Identification (`uds-data`) | **$22** ReadDataByIdentifier · **$2E** Write · DIDs · VIN · (`$23`/`$3D` memory by address) | `data` | ⬜ |
| **M3** | Fault Memory & DTCs (`uds-dtc`) | **$19** ReadDTCInformation (sub-fns) · **$14** Clear · DTC status byte · snapshots/extended data · DEM lifecycle | `faults` | ⬜ |
| **M4** | Security & Access (`uds-security`) | **$27** SecurityAccess (seed/key) · **$29** Authentication · **$28** CommunicationControl | auth | ⬜ |
| **M5** | Routines & I/O Control (`uds-routines`) | **$31** RoutineControl · **$2F** InputOutputControlByIdentifier | `operations` | ⬜ |
| **M6** | Reprogramming / Flash (`uds-flash`) | the flash sequence: programming session · unlock · erase routine · **$34** RequestDownload · **$36** TransferData · **$37** TransferExit · **$35** Upload · checksum | software update | ⬜ |
| **M7** | From CAN to IP: DoIP (`doip`) | Ethernet · **DoIP** (ISO 13400) · IP addressing · DoIP vs DoCAN · gateways · software-defined / zonal architecture | transport / why-now | ⬜ |
| **M8** | Web APIs in 20 min (`web-api`) | HTTP verbs · REST resources & URIs · JSON · status codes · client/server over IP | how to read SOVD | ⬜ |
| **M9** | SOVD (`sovd`) — *core + in-practice merged 2026-07-05* | **core:** entity/resource model · resource categories (`/data`,`/faults`,`/operations`,`/modes`,`/updates`,`/logs`,`/locks`…) · discovery & self-description · the REST API shape · category-mapping (**ODX's single home**). **in-practice:** classic-ECU proxy via DoIP (**CDA**) · concrete service→resource map (§8) · auth (OAuth+TLS) · remote/OTA · legally-required (Annex A). Core = its breadth, in-practice = its depth. | SOVD itself | ⬜ |

**Dependency spine:** **Foundation** → (M2, M3) → M4 → M5 → M6 compose UDS; M7 (transport) + M8
(web) are the pivot; **M9 (SOVD)** is the destination. Reprogramming (M6) is the UDS capstone
because it composes sessions + security + routines + transfer.

**Sibling nodes derived & pressure-tested (2026-07-05, session 5).** A 20-agent documents-first
workflow (`wiki/learn/_derive/sibling-nodes-derivation.workflow.js`; result
`wiki/learn/_derive/sibling-nodes.result.json`) took the Foundation's 31 per-service-deep + 9
downstream topics and derived the sibling pillars at the Foundation altitude. Outcome: **the roadmap
is validated** — **8 sibling pillars** (M2–M9 after the SOVD merge), no split/add/drop beyond
M9+M10→**M9 SOVD**. **Every per-service-deep SID homed 1:1** (no orphan/overlap) against ISO
14229-1 functional-unit tables cl.10–15. Refinements: `$85`→M3 (flagged), `$2F`+`$31` merged in M5,
DoIP diag-message = payload **0x8000** (0x8001 = ack), M5 SOVD-bridge = `/operations` only,
Dem is M3's depth-stem (not a sibling), ODX's single home = M9. **`$84`** SecuredDataTransmission is
a minor advanced service — **not tracked** (park it in whatever advanced leg later; do not re-litigate).
**Each pillar is itself a T** and will get its own H/V derivation (like the Foundation) when built.

**Adjacent-out-of-scope (named, deliberately NOT siblings):** OTX (ISO 13209, orchestration above
the stack) · MVCI (ISO 22900, D-server plumbing SOVD routes around) · legislated OBD (SAE J1979 /
ISO 27145 WWH-OBD / J1939-73 — a legislated *profile over the same UDS*) · AUTOSAR Dlt (dev logging,
≠ SOVD `/logs`) · calibration XCP / ISO 26262 / ISO 21434. These get at most a one-line landscape
footnote in H1.

---

## Foundation — the H/V block (LOCKED 2026-07-04 · re-derived & clause-verified 2026-07-05)

Supersedes the old single "M1 UDS Foundations". Built as a **course-scale T** ([[CONVENTIONS]]
§1c-scale): a **horizontal breadth spine** (read these alone = a complete high-level overview) +
**vertical depth drills** (opt-in). **Bar-coverage invariant enforced:** every V has a bar in the
H-spine. H/V are *altitudes of the same topic*, not two buckets — `$10`/`$11`/`$3E` appear in the
breadth sweep **and** as their own drill. **Sizing = 3 H + 11 V = 14 modules** (V7-split +
`$3E`-vertical restructure, user-confirmed 2026-07-07 — see the restructure note below; collapse
seams → 3H+6V if ever pruned).

> **Service-axis restructure (LOCKED 2026-07-07, session 13) — the `$10`/`$11`/`$3E` home fix.**
> User FB: the Foundation is built on a **concept axis** (drills titled by mechanism) while M2–M6 are
> **service-axis** (one module = one SID group), so `$10`/`$11`/`$3E` were the *only* deep-treated
> services with **no findable single home + no H bar that names them** — a reference-layer
> inconsistency. Resolved by a grounded, adversarially-reviewed design pass (21-agent workflow
> `foundation-service-axis-restructure`; per-service ISO-14229-1 depth = `$10` **RICH** · `$11`
> **moderate** · `$3E` **thin-as-mechanism-but user wants a use-case drill**). **Decisions:**
> (1) **split old V7** ("`$10`+`$11` as one beat") into two SID-titled *synthesis homes* **V7a `$10`**
> + **V7b `$11`** — each a home page that *references* the mechanism drills (V4/V5/V6), never
> re-teaches them; (2) **`$3E` gets its own vertical V7c** — but framed by **use-cases** (why/when
> you reach for it: hold a non-default session open mid-operation, the functional-broadcast keep-alive
> during a flash, "I'm still here" presence, what you lose if it lapses → S3 timeout → re-lock) — the
> **S3 timer *mechanics* stay in V6**, V7c cross-links to them (no duplicate channel); (3) **add an H3
> comm-management-family naming bar** naming `$10`/`$11`/`$3E` as members of ISO 14229-1 cl.10 Table 22
> (the diagnostic-&-communication-management functional unit) — standards-native, with `drilled-in →`
> pointers + a caveat that the same unit's `$27`/`$28`/`$29`→M4 and `$85`→M3 (so it reads as a
> functional-unit map, **not** a 7th unit). **Reframe (supersedes the `sibling-nodes` bookkeeping):**
> `$10`/`$11`/`$3E` are **not** "deep-dived in the Foundation, homed 1:1" like M2–M6 — they are
> **cl.10 comms-management plumbing that never crosses the `DSD→DSP` boundary**, so they get
> *reference-layer parity* (single home + naming bar) but no fabricated DSP-side module. **Lint rule
> added:** a service-synthesis vertical (V7a/b/c) may not re-decode a byte string or re-draw a diagram
> owned by a mechanism drill — each fact TAUGHT once, REFERENCED elsewhere via `{{→}}`. **Parked
> (user 2026-07-07):** "comm-management as its own module" (cl.10 Table 22 is one ISO functional unit,
> split across Foundation + M4) — kept as a future refactor note only; the **8-pillar roadmap and M4
> are untouched**, not re-litigated.

> **Re-derivation provenance (2026-07-05, session 4).** A 31-agent documents-first workflow
> (`wiki/learn/_derive/foundation-derivation.workflow.js`; full result JSON
> `wiki/learn/_derive/foundation-derivation.result.json`) inventoried **327 topics** across all 12
> standards — now incl. **ISO 15765-2:2024** + **ISO 13400-2:2012** — drew the foundation boundary
> (90 foundation / 69 per-service-deep / 6 contested), generated **3 independent architectures**, then
> **adversarially double-derived every module against the clauses** (6 of 12 needed fixes → ~20
> citation/framing corrections applied). Outcome: **structurally identical to this block** (zero
> module-boundary changes); the corrections are folded in below and the V-numbering is refined
> (**SPRMIB promoted to its own drill V4; `$10`+`$11` merged into one archetype drill V7** —
> user-confirmed). *(V7 was later **split** into service homes V7a/V7b + a `$3E` home V7c on
> 2026-07-07 — see the "Service-axis restructure" note above; this session-4 record is historical.)*

**Depth-of-foundation boundary — one token: `DSD accepts → DSP executes`.** Everything up to the
server's validity gate handing a *validated* request to processing is foundation; the instant the
server fetches data / runs a routine / reads the fault store for **one specific SID**, it is
per-service-deep. (Honest caveat: the format/length/sub-fn check straddles DSD & DSP — taught as a
one-line T-leg, not a crisp spec line.)

**Horizontal — breadth spine (read only these = a complete high-level picture)**

| id | module | covers | gives the learner | source (clause-verified) |
|----|--------|--------|-------------------|--------------------------|
| **H1** | The diagnostics landscape — what UDS is, who talks | V1, V8 | UDS = 14229-1 app-layer services, transport-independent; client(tester)↔server(ECU); the 14229 family (-1 app · -2 session · -3/-5/-6/-7 transport bindings) + where Dcm/Dem·ODX·SOVD·J1939·Dlt sit; OSI map at a glance; Dem↔Dcm split as a placement bar | 14229-1 cl.1, Intro Table 1, cl.6, cl.3 · -5/-6/-7 §7.1 · Dcm/Dem/J1939/Dlt cl.1 |
| **H2** | The life of one request — one exchange, end to end | V2, V3, V4, V6, V8, **V7a (`$10` trace), V7b (`$11` trace)** | the whole beat traced once: `SID` → serve → `+0x40` **or** `7F+SID+NRC`; **+ bar one-liners:** physical-vs-functional addressing (responses always physical) · `$3E` keep-alive (→ V7c) · fault-logging (separate Dem store) · `$11` returns-to-default & re-locks; **the two concrete round trips** — `$10` (`10 02 → 50 02 00 32 01 F4`, encodes P2/P2\*) is V7a's bar, `$11` (`11 01 → 51 01`) is V7b's bar; life-of-a-session **open (`$10`) · hold (`$3E`) · close (`$11`/timeout)** | 14229-1 cl.7.1, 8.4/8.5/8.6, 8.1, 10.2/10.3/10.7 |
| **H3** | What UDS can do + how the ECU decides — catalog, server & the comms-management family | V5, V9, **V7a/V7b/V7c** (comms-family bar) | the **6 functional units (cl.10–15) + 1 security sub-layer (cl.16)** — not a 7th unit; what needs session/security; the 16-bit DID + RID coordinate spaces; the one-screen "inside the server" bar (PduR→DSL→DSD→DSP); FDIS renumbers **down**, only ResponseOnEvent changed. **+ comm-management-family naming bar:** `$10` DiagnosticSessionControl / `$11` ECUReset / `$3E` TesterPresent as members of cl.10 Table 22 (drilled in → V7a/V7b/V7c), caveat: same unit's `$27`/`$28`/`$29`→M4, `$85`→M3 | 14229-1 cl.10–16, **cl.10.2 Table 22**, Annex C.1/F.1, cl.8.7.2 Fig 5 · Dcm cl.7.1.1 · FDIS Foreword |

**Vertical — depth drills** — full **card-level flow + continuity spec** for every H/V now lives in
[`uds-foundation/STRUCTURE.md`](uds-foundation/STRUCTURE.md) (continuity-checked 2026-07-07).
**Drill order (DECIDED 2026-07-07, supersedes the old "V8 as late zoom-out"):**
`H1 → V1 → H2 → V2 → V3 → V4 → V8 → V5 → V6 → V7a → V7b → V7c → H3 → V9` — i.e. message → sub-fn →
**transport (V8, moved up)** → sessions/timing → the service homes `$10`/`$11`/`$3E` → server (V9).
V8 moved after V4 because it leans on a concrete message + the negative/suppress concepts.

| id | module | bar | drills into | source (clause-verified) |
|----|--------|-----|-------------|--------------------------|
| **V1** | The service model | H1 | primitives (req/ind/rsp/conf; confirmed=6, unconfirmed=3); req_confirm=client-side / rsp_confirm=server-side; SAP mandatory params `A_Mtype/A_SA/A_TA`; L5 exposes only `S_Data.req/.ind/.conf` | 14229-1 cl.5, 7.1, 7.4 · 14229-2 cl.6, 7 |
| **V2** | Request & positive response, byte by byte | H2 | `A_PDU = A_SDU+A_PCI+params+Length`; A_PCI keyed on first byte; **pos = `SID+0x40`** (bit 6 = type), sub-fn echoed with bit7=0 | 14229-1 cl.8.2/8.3/8.4, 9.3 |
| **V3** | Negative responses & the NRC catalog | H2 | fixed `7F+SID+NRC`; the **single global Annex A.1 catalog** (3 ranges) + the **generic** set (any service may emit); key NRCs **grouped by the check that raises them** (Dcm `SWS_Dcm_01535`); **state-effects** (rejected `$10` → session unchanged; wrong key → locked + counter++); **retrial** (`0x78`/`0x21`/`0x37`); **`0x78` RCRRP** (final resp always sent, opens P2\*). *(Re-derived & expanded 3→6 cards 2026-07-10 — see [uds-foundation/STRUCTURE.md](uds-foundation/STRUCTURE.md) V3 §.)* | 14229-1 cl.8.5/8.6, Annex A.1, 9.4 · Dcm 7.3.4.3 |
| **V4** | **Sub-functions & the suppressPosRsp bit** | H2 | sub-fn byte: bit 7 SPRMIB (`&0x80`), bits 6–0 value (`&0x7F`); **suppresses the positive reply ONLY — physical negatives always sent, service still fully executes** (cl.9.2.2 Table 11 note) | 14229-1 cl.9.2.2, 8.7.3.2, 8.7.5 |
| **V5** | Sessions & the session state machine | H2 (+H3) | **mechanism only:** one active session (`01` default at power-up / `02` prog / `03` ext / `04` safety); Fig 7 machine + its four transition cases (what each does to ResponseOnEvent / security-relock / scheduler / I-O-control / CommunicationControl / ControlDTCSetting); non-default **re-locks security**; two return-to-default causes (explicit DSC/reset vs S3 timeout). *The `$10`-the-service framing + byte trace live in V7a; cross-link `{{→ V7a}}` (enter) `{{→ V7b}}` (reset-close).* | 14229-1 cl.10.2 Table 25/Fig 7 · Dcm 7.2.4.11 |
| **V6** | Timing & keep-alive — P2 / P2\* / S3 | H2 | the whole 14229-2 timing family: `tP2_Server` (rec 50 ms) + `tP2*_Server` (rec 5000 ms, unlocked by `0x78`); `tP4_Server`; client tP2/tP6/tP3; **S3 machinery** (`tS3_Client` 2000 < `tS3_Server` 5000; non-default-only timeout; only the owning connection resets S3; any final response also refreshes S3; default disables `tS3_Server`). *The S3 **numbers/model** live here; `$3E`-as-a-service (its use-cases) is V7c, cross-linked `{{→ V7c}}`; `$10`'s "response carries P2/P2\*" byte-decode is V7a.* | 14229-2 cl.9.1, **9.5** · 14229-1 cl.10.7 |
| **V7a** | **`$10` DiagnosticSessionControl — the service, whole** | H2 (`$10` trace) + H3 (comms-family) | **RICH service-synthesis home.** One end-to-end trace decoded once (`10 02 → 50 02 00 32 01 F4`); legs (≤4): four session types + programmingSession boot-SW exit contract · the response record decoded (echo + P2/P2\* bytes, single source of truth for `00 32 01 F4`) · response-first switch ordering + `0x22` CNC gating + relock/S3 couplings as **summary** · `{{→ V5 state machine}} {{→ V6 timing}} {{→ V4 SPRMIB}}`. References the mechanism drills, never re-teaches | 14229-1 cl.10.2 Tables 25/28/29/30/31 · 14229-2 (P2 semantics) |
| **V7b** | **`$11` ECUReset — the service, whole** | H2 (`$11` trace) + H3 (comms-family) | **Moderate home — size to ~3 strong legs, don't pad to 4.** Trace `11 01 → 51 01`; legs: reset-type sub-fns `01`hard/`02`keyOffOn/`03`soft/`04`enableRapidPowerShutDown/`05`disable + the **volatile/non-volatile memory-effect** contrast · rapid-power-shutdown pair (conditional `powerDownTime` byte, sleep semantics, key-on termination) · the **unusual response-before-reset** timing rule (documented exception to cl.8) + undefined dead-time. Reboot→default→security-LOCKED stated as a **one-line summary** `{{→ V5}}`, not a padded leg | 14229-1 cl.10.3 Table 34 · Dcm 7.4.2 |
| **V7c** | **`$3E` TesterPresent — why you keep a session alive** | H2 (keep-alive bar) + H3 (comms-family) | **USE-CASE drill (not an S3 re-teach — user 2026-07-07).** The *purpose*: hold a non-default session open while the tester is between requests or mid-operation; the **functional-broadcast** keep-alive (`3E 80`, SPRMIB=1, no responses — feed many ECUs at once) esp. during a **flash/long routine**; "I'm still here" presence; **what you lose if it lapses** → S3 timeout → default → security re-locked (`{{→ V7b}}` same end-state as reset). Mechanics minimal (sub-fn `00`, 2 NRCs); the S3 **numbers** live in V6 `{{→ V6}}`, the state-end in V5 `{{→ V5}}` | 14229-1 `$3E` cl. · 14229-2 cl.9.5 (S3) |
| **V8** | Addressing & the transport / OSI descent | H1 (+H2) | physical (1:1) vs functional (1:n, SF-only, NRC-suppressed) — responses always physical; OSI descent, invariant middle; CAN 0–8B vs FD 0–64B; ISO-TP SF/FF/CF/FC + FlowStatus + the six **`tTL_*`** timers; 11-/29-bit IDs; USDT/UUDT; DoIP 8-byte header + `0x8001`; K-Line/LIN/FR as thin adapters | 14229-1 cl.7.4.1.4, 8.7.1 · **15765-2:2024** cl.6, 9 · **13400-2:2012** cl.6, 7 · 14229-3 cl.13.3/13.4 |
| **V9** | Inside the server — Dcm pipeline & the NRC-origin gate | H3 | 14229-1 cl.8.7.2 Fig 5 behaviour realized as Dcm DSL→DSD→DSP; the **ordered 7-step DSD gate** (`SWS_Dcm_01535`, stop on first failure) where every NRC is born; `0x78` at the P2/P2\* boundary; security state (LOCKED init) | 14229-1 cl.8.7 · Dcm cl.7.1.1, **7.3.4.3 SWS_Dcm_01535** |

**Pressure-test outcomes (re-confirmed 2026-07-05):** (1) **Dem stays out of the foundation → M3
(Faults)** — only a placement bar in H1/H3, not universal substrate; foundation keeps **Dcm** only.
(2) **Order is concrete-first** — message → sub-fn → **transport (V8, moved up 2026-07-07)** →
sessions/timing → the service homes (`$10`/`$11`/`$3E`, V7a/b/c) → zoom in (Dcm, V9). *(V8 was moved
ahead of sessions because it leans on a concrete message + negatives/suppress — see STRUCTURE.md.)* (3) **Bar-coverage holds
airtight (re-checked 2026-07-07):** H1={V1,V8} · H2={V2,V3,V4,V6,V8,**V7a,V7b**} · H3={V5,V9,**V7a,V7b,
V7c** via the comms-family bar}; V2/V5/V8/V7a/V7b double-touched; zero orphans (every V7a/b/c has an H
bar), zero overclaims. **Collapse seams** (if pruning to 3H+6V): re-merge **V7a+V7b+V7c** back into one
archetype drill, then V2+V3, V5+V6, and fold V8.

**Double-derived facts (Foundation) — clause-verified 2026-07-05:**
`pos = SID+0x40` · `neg = 7F+SID+NRC` (fixed `7F` + echoed request SID + one NRC) · `SPRMIB = bit 7
(0x80)` suppresses the **positive reply only** (physical negatives always sent; service still fully
executes — cl.9.2.2 Table 11 note) · sessions `01` default/`02` prog/`03` ext/`04` safety (one active;
non-default re-locks security) · reset `01` hardReset…`05` · **NRC** `10`GR `11`SNS `12`SFNS
`13`IMLOIF `22`CNC `24`RSE `33`SAD `36`ENOA `37`RTDNE `78`RCRRP `7E`SFNSIAS `7F`SNSIAS `F0–FE`VMSCNC
(single global Annex A.1 catalog) · **timing lives in 14229-2**: `tP2_Server` 50 ms / `tP2*_Server`
5000 ms unlocked by `0x78`; **S3 in cl.9.5** (`tS3_Client` 2000 < `tS3_Server` 5000; only the owning
connection resets it) · `$10` resp encodes P2 (1 ms res) + P2\* (10 ms res) → `00 32 01 F4` = 50 /
5000 ms · **ISO-TP timers = `tTL_As/Ar/Bs/Br/Cs/Cr`** (15765-2:2024 renamed the legacy `N_*`) ·
**Dcm** DSL→DSD→DSP; the ordered 7-step gate (`SWS_Dcm_01535`) is the Dcm *realization* of 14229-1
Fig 5, **not** a 14229-1-specified order · **FDIS renumbers clauses DOWN** (2020 cl.7 → 2025 cl.6),
only ResponseOnEvent changed.

> **V8 gap-fill policy (user decision 2026-07-05):** ISO 11898-1 (CAN data-link), ISO 15765-4 (CAN-ID
> assignment) and ISO 14229-4 (UDSonFR) are **not** available locally; per user direction, fill those
> specific points from **training + internet**, reconciled to the primary clauses. ISO 15765-2:2024 +
> ISO 13400-2:2012 are available and fully cited. SOVD specifics are grounded from the ISO 17978 set
> (incl. the OpenAPI spec) at build time.

---

## Current Focus → `NEXT.md`

The volatile dashboard — current status · suggested next session · the queue · deferred backlog —
**lives in `NEXT.md`** (moved at the 2026-07-10 governance meta-session: it was the
heaviest-churn content inside an auto-loaded file, against [[CONVENTIONS]] §10 token discipline).
**Read `NEXT.md` at every session start; refresh it at every wrap.** Per-session narrative:
`wiki/log.md` + this file's git history.

## Learner persona (authoring reference)

**Learner persona — PUBLISHED 2026-07-07** as a "Who this is for" note on the hub (`course.yml` `whoFor`).
The confirmed baseline, kept here as the **authoring reference** for every card: a *motivated professional
engineer with zero automotive-diagnostics background* (engineer, not technician).
- **Knows:** hex/bytes/flag-bits, request↔response + success/error, state machines, volatile vs
  non-volatile memory, "a message rides a bus / protocols are layered" (abstractly), "an ECU is a small
  computer, a car has many", locked-vs-unlocked/challenge-response.
- **Does NOT know (teach from zero, define on first use):** the *why* of vehicle diagnostics + the tester
  role + contexts (workshop/EOL/OTA); UDS itself (SID/sub-fn/DID/RID, +0x40, 7F+NRC, the services);
  sessions/security/timing; the transport stack (CAN/ISO-TP/DoIP/addressing) — taught from near-zero; ECU
  internals (boot vs app SW, Dcm/Dem); the standards landscape.

---

## File map

```
wiki/learn/
  COURSE.md · CONVENTIONS.md · PEDAGOGY.md   <- governing docs (auto-loaded; read first)
  NEXT.md                 <- the DASHBOARD (volatile state; read at open, refresh at wrap)
  work-types.md           <- session kinds (JDs) + curated gates + the 3-layer enforcement
  INCIDENTS.md            <- Claude-side misses worth learning from (via /session-wrap)
  pedagogy-research.md    <- verbatim long-form pedagogy (NOT auto-loaded; open for content work)
  course.yml              <- roadmap data for the hub
  index.html              <- COURSE HUB (rendered by _template/render-hub.js)
  _template/              <- the SHARED build system:
    blueprint.css           design system (LOCKED) + module shell + hub styles
    render.js               content MD -> module page  ·  render-hub.js -> hub
    SCHEMA.md               concept-MD authoring contract
    verify_preview.js · shot.js   in-browser verification
  uds/                    <- Module 1 (migrating to the pipeline):
    module.yml              module meta + prev/next nav
    content/*.md            per-concept source of truth (S4 done; S0–S3,S5,S6 pending)
    assets/figures/*.svg    extracted diagrams
    _preview.html           current render (becomes index.html after the swap)
    index.html              LEGACY hand-authored M1 (kept until swap)
    NOTES.md                M1 card inventory + migration status
    node_modules/           puppeteer-core + js-yaml (--no-save, not committed)
  _designlab/             <- design exploration (playground.html, tcard.html, comparisons)
  _derive/                <- local working artifacts (untracked; see _derive/SOURCES.local.md)
wiki/log.md · wiki/index.md   <- append-only history + wiki TOC
```
