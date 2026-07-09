# Course: Automotive Diagnostics — from UDS to SOVD

**This file is the single source of truth for the learning-course build.**
Read it first, every session. It holds the roadmap, the locked conventions, and the
current focus. Granular per-card status lives in each module's `NOTES.md`.

---

## Resume protocol (do this at the start / end of every session)

**At session start**
1. Read this file (`wiki/learn/COURSE.md`) — roadmap, conventions, Current Focus.
2. Read the active module's `NOTES.md` (see Current Focus for which module).
3. Seed the task list from "Current Focus → Next up."
4. If anything in Conventions is unclear or seems stale, confirm with the user before building.

**At session end**
1. Update the active module's `NOTES.md` (card statuses, TODOs, verification state).
2. Append a dated entry to `wiki/log.md` (what changed).
3. Update "Current Focus" below (what's done, what's next).
4. Save any durable, cross-session fact to memory (user prefs, locked decisions).
5. **Commit + push** (git root = `wiki/learn/`, branch `main`) — the live GitHub Pages site is the
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

**Notation** — hex services written `$10`; bytes shown in byte-box diagrams; positive
response = SID + 0x40; negative = `7F <SID> <NRC>`.

**Verification (never declare done from theory)** — drive real Chrome via
`puppeteer-core` (installed `--no-save`; do not commit package.json). Scripts live in the
module folder: `verify.js` (DOM measure: card counts/types, one-figure-per-concept,
zero overflow in light/dark/mobile, no console errors, lang toggle), `shots.js`
(close-up card screenshots), `navtest.js` (mobile + TOC nav-landing). Screenshots →
`assets/`.

**Sources (documents-first — see [[CONVENTIONS]] "Sourcing philosophy")** — `the source standards/`
now has **UDS ISO 14229** (-1 2020 **and** 2025 FDIS, -2, -3, -4, -5, -6, -7), **AUTOSAR R25-11
CP** (Dcm, Dem, Dlt, DoIP, J1939 Dcm), **transport: ISO 15765-2:2024** (`CAN/`, DoCAN/ISO-TP) +
**ISO 13400-2:2012** (`DoIP/`), **SOVD** (ISO 17978/20077/20078/20080), **ODX** (22901),
**OTX** (13209). Standards are the **source of truth**; internet/domain knowledge is a subordinate
gap-filler, always reconciled to a cited clause. **Not in vault (fill from training + internet per
user 2026-07-05):** **ISO 11898-1** (CAN data-link), **ISO 15765-4** (CAN-ID assignment),
**ISO 14229-4** (UDSonFR — held only as an unreadable `.doc`).

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
| **V3** | Negative responses & the NRC catalog | H2 | fixed `7F+SID+NRC`; the **single global Annex A.1 catalog** (3 ranges) + always-supported set; **`0x78` RCRRP** (final resp always sent, opens P2\*) | 14229-1 cl.8.5/8.6, Annex A.1, 9.4 |
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
> assignment) and ISO 14229-4 (UDSonFR — unreadable `.doc`) are **not** in the vault; per user
> direction, fill those specific points from **training + internet**, reconciled to the primary
> clauses. `15765-2:2024` + `13400-2:2012` are now present and fully cited.
> SOVD specifics get grounded from `the source standards/ExVe SOVD/` (ISO 17978 incl. the OpenAPI spec) at
> build time.

---

## Current Focus

**Current status (updated 2026-07-07)**

- **Built & pressure-tested:** Foundation **H1** (3 concept cards) and **H2** (**7 concept cards** after
  the FB3 re-author) — clause-grounded, browser-verified light/dark/mobile. The hub + the Foundation
  T-map are live (map now rendered through the pipeline). Legacy **M1** (`uds/`) remains a figure donor.
- **Shared template overhauled (session 9):** overview strip · card-level left rail (scroll-spy) ·
  distinct cards · real forward-pointer links (+ stub pages for V1–V9 / M2–M9 / H3) · a prominent
  Go-Deeper affordance (accent banner + solid `+/−`) · prominent `:::recall` · byte-box travel
  animation. All in `_template/render.js` + `blueprint.css`; H1 + hub inherit.
- **Published to GitHub (2026-07-06):** git root = `wiki/learn/`, branch `main`, public repo. Publish
  a change with `git add -A && commit && push`. See memory `reference-github-repo`.
- **Done 2026-07-06 — governance + Foundation shell (2 feedback rounds).** Token-discipline →
  [[CONVENTIONS]] §10; Current Focus trimmed (history → `wiki/log.md` + git). **Shell** (shared
  `render.js` + `blueprint.css`, re-rendered H1/H2; the hand-authored map patched to match): constant
  **"Automotive Diagnostics"** home-link brand · `Course › Foundation › module` breadcrumb (trail only)
  · **single globe** toggle (EN→日本語→EN+JP) + **single theme** toggle (sun↔moon) · **pager — one card
  at a time** (top strip = always-on, de-boxed, sticky, highlights the current card; Prev/Next + strip +
  arrow keys drive it; dividers dropped on module pages) · Foundation **map CSS fixed** (self-contained).
  *Debt:* the V1–V9 / M2–M9 **stub pages** are hand-authored and don't inherit the shell (they get it when
  built); the map's inlined CSS can drift on future theme edits — best long-term fix is to render the map
  through the pipeline.
- **✅ Shell round SIGNED OFF 2026-07-07.** All five build items (FB1 · FB4 · Task4 · Task5 · FB3) done +
  browser-verified; then one **post-review feedback round** landed and was resolved: **topbar parity +
  Expand/Collapse removed** — the only home-vs-module bar difference was an Expand/Collapse-all segment
  `render.js` appended (`topbar({expand:true})`); deleting it made every topbar byte-identical *and*
  dropped the unwanted control (dead `.tb-seg`/`#allseg` markup + CSS gone; H1/H2/map/hub re-rendered;
  `verify_shell.js` green on all 5 page types + mobile; topbar close-up confirms hub==module). User: "none
  on the shell feedback." Full write-ups in `wiki/log.md` (2026-07-07 ×2). Build-item status (each was the
  "to-do" below, now **done**):
  - **FB1 — topbar is NOT a shared component (HELD as a shell build-item).** The top bar diverges across
    levels because it lives in 3 code paths (`render.js` module shell · `render-hub.js` hub, still on the
    OLD text `EN/日本語/EN+JP` seg + non-link brand · `make-stubs.js` stubs, Light/Dark only) **plus** a
    hand-copy in the Foundation map (`uds-foundation/index.html`). **Fix (when doing the shell round):**
    extract one shared `topbar()` partial all three renderers call, and render the map through the pipeline
    so the hand-copy dies. **✅ DONE** — `_template/partials.js` `topbar()`/`TOPBAR_SCRIPT`/`FONTS` used by
    `render.js` + `render-hub.js` + `make-stubs.js`; map now renders via `_template/render-map.js` (map CSS
    moved into `blueprint.css`; hand-copied topbar + inline-CSS drift gone).
  - **FB2 — `$10`/`$11`/`$3E` service-axis restructure: RESOLVED & LOCKED 2026-07-07** (see the
    "Service-axis restructure" note in the Foundation H/V block). Plan updated to **3H + 11V**
    (V7→V7a `$10`+V7b `$11`, new V7c `$3E` use-case drill, + H3 comms-family bar). This is a *content-plan*
    change; the V-stub pages must be regenerated for the new numbering when the shell work happens.
  - **FB3 — continuity pass: full card-level flow speced + shipped-H1/H2 random fitments found
    (2026-07-07).** After confirming the learner baseline (persona → open item), an 8-agent continuity
    workflow designed the ideal card-level flow for all 14 modules FRESH and audited every seam. Result
    in [`uds-foundation/STRUCTURE.md`](uds-foundation/STRUCTURE.md) (the build spec). **Decisions:** (1)
    **V8 moves after V4**; (2) **fold the shipped-H1/H2 continuity re-author into THIS shell round** (one
    pass — re-order H2, split the "four-rules" card into C4–C7, add the `11 01 → 51 01` trace, trim the
    subfn/security legs, cut H1-C3's addressing dup); (3) **H2 = 7 concept cards** (one idea each). The
    worst shipped fitments: H2's "four rules" bucket-card, addressing taught twice (H1+H2), suppression
    explained before the positive reply is defined, `security` inline-defined in a breadth leg.
  - **FB4 — sticky breadcrumb. ✅ DONE** — `.crumbs` `position:sticky` at `--tbh`; overview strip stacks at
    `--stick` (= topbar+crumbs, measured in `TOPBAR_SCRIPT`); pager scroll-offset uses `--stick`. Verified
    on hub/map/stub/H1/H2 + mobile.
  - **Task4 — V-renumber. ✅ DONE** — V7→V7a/V7b/V7c (stub slugs + `render.js` LINKS + `fwd` `[VMH]\d+[a-c]?`);
    orphan `v7-archetypes/` removed; stubs regenerated; map V-stem = V1–V6,V7a/b/c,V8,V9 + H3 comms-family line.
  - **Task5 — STRUCTURE + figure register. ✅ DONE** — course-level `wiki/learn/STRUCTURE.md` authored (hub
    source of truth, §1e); all H1/H2 figures renamed to §7c `h#-<card>-f<k>_<title>.svg` (collision resolved
    by construction); figure registers populated in `uds-foundation/STRUCTURE.md`.
  - **FB3 — H1/H2 re-author (structure/flow). ✅ DONE** — H2 → **7 concept cards** (trace→C3; four-rules
    split into C4–C7; `11 01 → 51 01` trace in C6; subfn/security legs trimmed). H1 = the 3 Decision-#2
    trims (cut C3 addressing dup · soften C1 SID pre-empt · cut C2 SOVD teaser). **Deferred (future H1
    rebuild, per STRUCTURE scoping):** the larger H1 **3→4 re-split** (new "why diagnostics" C1 +
    neighbours→C4) is NOT shell-round scope.

**H3 — 6-card build DONE (restructured 2026-07-07, session 14).** `uds-foundation/h3-catalog-and-server/`.
- ✅ **9→6 restructure executed + browser-verified.** Cards: divider · brief · **C1 primer** (user-approved)
  · **C2** the six functional units (+ a comms-family leg placing `$10`/`$11`/`$3E` →V7a/b/c · a DID/RID
  one-liner →M2/M5 · the security-guard leg) · **C3** "The ECU decides what it will serve" (vet →
  serve/refuse; legs = two gates →V5/M4 and where-a-no-is-born →V9) · **K** conclusion. Dropped the old
  standalone C4 (DID/RID), C5 (4-stage pipeline → V9 depth, only the *decision* kept), C6 (comms family →
  folded into C2), per the OK/NG gate. `checkmod . 3` green; grep confirms **no stale pipeline terms**;
  forward-pointers verified in DOM. Bar-coverage now **V7a/b/c←C2 · V5←C3 · V9←C3**. Record:
  `uds-foundation/STRUCTURE.md` H3 § + `h3-catalog-and-server/NOTES.md`.
- **✅ All 6 H3 cards USER-APPROVED 2026-07-07** ("H3 looks good") — prose is final. **✅ All 10 real SVGs
  DRAWN + geometry-audited (session 15, 2026-07-08):** §7a clean (connectors touch anchors; icons recognizable
  — warning-triangle/dial/gear/shield-check/download/padlocks; zero overflow), theme-aware light + dark,
  `checkmod . 3` green, 0 console errors. One fix landed (`h3-c1-f2` wiring-label overrun + sun-like actuator
  glyph → shortened label, redrew the gear). **H3 is fully complete — the whole breadth spine H1·H2·H3 is now
  built to the bar with real figures.** Register: `uds-foundation/STRUCTURE.md` §7c H3.

- **✅ H3 figure review pass — CLOSED session 16, 2026-07-08 ("H3 review is okay").** Redesigned all three **C1**
  figures with the user (source prose/captions updated, files renamed): **f1 → `capability`** ("a service = a
  capability the ECU provides"; you-ask→ECU→provides, 3 varied capabilities; caption off "one fixed shape") ·
  **f2 → `primitives-to-diagnosis`** (3 atomic primitives converge → "The Diagnosis", pieces fused = "made sense
  of") · **f3** recast to carry the **asymmetry** (tiny asker vs loaded provider) + **"server = a role, not a
  box"** in *both* text and image. **C3-C1 polish:** title → "The ECU decides: serve or refuse"; cut a filler
  paragraph; flipped a negation-first line positive; anchored c3-f1's two floating labels. c3-f2/c3-f3 left as-is.
  **Doctor↔patient = a SPINE analogy → deferred to the H1 rebuild** (see Next-up #1), not sprung at a C1 leg.

**Done this session (2026-07-08, session 15):** drew all 10 H3 SVGs from the STRUCTURE.md §7c register (brief 1
· primer 3 · C2 3 · C3 3) through the `.dgm` design system, geometry-audited via per-figure light/dark close-ups.
**Session 16:** the C1 redesign + C3 polish above; "lead positive / no negative framing" added to memory.

**✅ V1 (service model) BUILT + SIGNED-OFF-PENDING 2026-07-08 (session 17).** 5 cards (Brief + C1–C3 + Conclusion),
byte-free abstract skeleton; 10 `.dgm` figures **all animated where motion teaches** (per-user directive) —
sequence-diagram of the 4 primitives, the 6-vs-3 count, reading-an-arrow, the owner zig-zag, by-side sort,
symmetry, the SAP address-label swap, the param-name label, the layer hand-down. Verified: `checkmod` green
(3 concepts, EN-on-load, lang isolation, zero overflow, no console errors); all 10 figures geometry-audited
light+dark; **4-lens adversarial review** (ISO accuracy vs 14229-1/-2 — all 8 target claims hold; pedagogy/
continuity; bilingual; figures) + a re-run pedagogy pass — all findings folded (citation fixes, C1 opener
leads positive, conclusion params **bold** not mono, `A_TAtype`/physical-functional glossed "→V8", C3-F1 now
shows all 3 label facts, C3-F3 dropped untaught params). Record: `v1-service-model/NOTES.md` + STRUCTURE §7c.
**New locked convention:** the **Brief = 3-part advance organizer** (why-this / what's-inside / what-you'll-be-
able-to-do) — see [[CONVENTIONS]] §4; **H1/H2/H3 briefs predate it and need retrofitting** (follow-up).

**Next up**

> **Session-20 DONE (2026-07-09) — the exemplar⇄course comparison pass; adopted set locked, all pilot in V2.**
> The four exemplar studies (`_derive/exemplar-rigors.md` TLDR·Jigsaw·3B1B + `…-learning-how-to-learn.md`)
> were analyzed against the shipped course and decided with the user **item-by-item**. **ADOPTED → pilot in
> V2 (session 21)**, all now written into [[CONVENTIONS]]: (1) **§7d visual-cast lexicon + actor tokens** —
> fixes the live ochre/olive collision, encodes pos/neg by ✓/✕ glyph+stroke not hue; (2) **§7d staged/
> progressive figure reveal, click-to-advance** (the 3-of-4-exemplar signal) — pilot on V2-C1 (PDU builds
> field-by-field) + V2-C2 (`10` sets bit 6 → `50`, "animate the consequence"); (3) **§7d motion grammar +
> shared byte-box generator** (object constancy); (4) **§7d-6 `prefers-reduced-motion` + static-end-frame
> teaches** (a11y gate); (5) **§6 motivate-before-define + "you-could-have-invented" + the 4-beat bar**
> (Tension→guess→Reveal→Name, term last) — piloted, not yet checklist-locked; (6) **§4 generative recall
> (not recognition)** + the new **`:::elaborate`** learner beat (pilot one in V2); (7) **§7b dual-channel
> term parity**. Per-card V2 scope + figure register: `uds-foundation/STRUCTURE.md` V2 §. **PARKED / REJECTED**
> sets are in the backlog below. User steer: *make V2 a visible upgrade — apply everything needed to prove
> the research.* **The V2 build is session 21** (applies all the above).

1. **✅ V2 (request & positive response) BUILT — session 21, 2026-07-09 (the exemplar-rigor PILOT).** 5 cards,
   browser-verified (checkmod incl. cast lint · light/dark/mobile · reduced-motion end-frame teaches), pushed.
   All §7d infra landed template-side (`bytebox.js` · staged reveal · cast lint · reduced-motion); §6
   motivate-first + **name-on-the-spot** (new §6 rule from user FB); §4 generative recall + one `:::elaborate`;
   3-part Brief. **NEW `:::panel`** (user idea, adopted): synced narration+illustration stepper (the "video beat"
   on static material), degrading to scannable prose; piloted on **C2** (bit-flip) + **C3** (echo). One
   adversarial pass, 3 fixes folded (C2 `+0x40` `$2A` carve-out; brief formula; C3 "control flag"). Records:
   `v2-request-and-response/NOTES.md` + STRUCTURE V2 register. **Continue the V drills in STRUCTURE reading
   order: V1 ✅ → V2 ✅ → V3 → V4 → V8 → V5 → V6 → V7a → V7b → V7c → V9**, same per-drill cadence (confirm plan →
   build w/ user review → checkmod + close-ups → adversarial pass → NOTES/STRUCTURE/log → **commit + push**).
   **Round-2 user FB folded 2026-07-09 (V2 re-verified):** SVG hygiene praised as a step-change (credit the
   `bytebox.js` generator + layout-framework). Fixes: `:::panel` nav → **dots + tap-to-advance + swipe** (no
   "Step N/M", no ‹ › buttons); **figure position fixed** (text region height locked to the tallest step → no
   jump); byte-box ✓/✕ badge de-collided + `+0x40` moved above the arrow (global `bytebox.js` fix).
   **Continuous-story pilot ADOPTED (no go-deeper legs):** per user, pilot in V2 (H+V), and **if it lands →
   default + retrofit all built modules & backlog**; `continuous: true` renders legs as inline `.flowsec`
   sections (CONVENTIONS §1c PILOT note). **`:::elaborate` → adopt for future sections** (user).
   **OPEN (sign-off before rolling out):** does the continuous-story model + panel land well? and do the
   **4-beat bar** / **`:::elaborate`** / **`:::panel`** earn a MASTER-CHECKLIST lock + course-wide retrofit?
2. **Then the H1 rebuild — the 3→4 re-split** (deferred, bigger design pass): add a "why diagnostics / cars are
   many ECUs" **C1** (workshop/EOL/OTA), split the current C2 into **C3** (14229 family + OSI) + **C4**
   (neighbours: Dcm/Dem, ODX, SOVD, J1939) — to match STRUCTURE.md's 4-card H1.
   - **Plant the doctor↔patient SPINE analogy in this opener** and carry it as a light through-line:
     "you can't open the patient up, so you interrogate it" → **consultation = session `$10` · symptoms =
     stored faults `$19` · vitals = live data `$22` · provoked tests = routines/actuator `$2F`/`$31` ·
     treatment = reprogram `$34`.** It's a *spine* analogy (structures the whole subject), so it MUST be
     seeded early, not sprung mid-course; **H3-C1's primitive leg then nods back to it.** (Decided session 15:
     a spine analogy introduced cold at a C1 leg reads as off — so it was **deferred out of the H3-C1 `f2`
     redraw**, which now stands alone [atoms → "The Diagnosis"] without the doctor.)
3. **Then** the pillar modules M2–M9, each its own H/V.

**Open points / backlog (tracked, not blocking the active build):**
- **OP — 3-part Brief retrofit.** H1/H2/H3 briefs predate the locked **3-part advance-organizer** Brief format
  ([[CONVENTIONS]] §4) and read as hook-only. Retrofit them (why-this / what's-inside / what-you'll-be-able-to-do,
  derived from each module's STRUCTURE.md card list + *Leaves:* line, `:::key` "By the end"). A small pass; do
  opportunistically, not before V2 (user 2026-07-08).
- **OP — exemplar-rigor PARKED backlog (triaged & signed off session 20, 2026-07-09).** The *adopted* set is
  now in [[CONVENTIONS]] §7d/§6/§4/§7b + `uds-foundation/STRUCTURE.md` V2 § (all pilot in V2). **PARKED ≠
  undecided: the user's intent (confirmed 2026-07-09) is that ALL these learnings are applied eventually** —
  the V2/park split was only *sequencing* (V2 pilots what byte-mechanics can prove; the rest waits for its
  natural trigger: the shipped-figure repaint after the V2 pilot validates §7d, the hub pass, the H1 rebuild,
  before-M2 for GLOSSARY, per-module for service beats, M9 for change-of-basis). Work them at their triggers;
  don't re-litigate. Only the REJECTED list at the bottom is actually dropped. Full detail in
  `_derive/exemplar-rigors.md`:
  - **Repaint / retrofit shipped figures** to §7d actor tokens (V1/H1–H3) + **retrofit-animate** the shipped
    static bars (`h2-c7` session-life, `h2-c3` decode, `h2-c4` addressing, `h2-c6` reset, `h3-c3`, `h3-c2-f3`).
  - **Hub package:** road-to-SOVD **spine strip** + "you are here → SOVD" · **F0-style "How this course works"**
    orientation panel · per-module **level chips** · LHTL's honest **"space it / sleep on it"** line (the one
    thing our one-sitting framing under-serves) — all in `render-hub.js` + `course.yml`.
  - **The "Essence" through-line** ("a diagnostic request is a typed message a state machine agrees to serve —
    and SOVD is that same conversation re-dressed as web resources") on hub + course `STRUCTURE.md`, + a "grows
    the essence by:" per-module field.
  - **Doctor↔patient spine** as standalone H1-C1 (already Next-up #2, the H1 rebuild) · **`GLOSSARY.md`** EN+JP
    canonical-term contract (before M2) · **between-module bridges + cross-module/interleaved recall** (from M2)
    · **"what breaks without this"** beat on *service* cards (V7a/b/c, M2–M6) · per-module **size budget** ·
    **"why now" bridge** before SOVD (M9) · **M8-placement** note · **voice-exemplar set** in PEDAGOGY ·
    **title-grammar** normalization + hooky-title nudge · **motion-grammar** full alignment of V1's 9 figures ·
    **spatial reification** (NRC address-space strip, V3/V9/M4) · **zoom-continuity** (leg = zoom of bar region)
    · **3B1B change-of-basis M9** signature animation · **B-roll ≠ schematic** (H1) · **analogy-as-retired-beat**
    directive · **3-part-Brief retrofit** of H1/H2/H3 (already the OP above).
  - **REJECTED (session 20):** embodied green-screen instructor / vary-position / bigger-than-life persona /
    teleprompter voice (all presuppose a talking-head video — we are silent self-paced HTML; LHTL itself flags
    them non-adoptable) · "graded visual complexity per altitude" (restates the T-model) · "let the reader sit
    with the crux" (already the pager) · a hub visual-grammar **KEY card** (leverage is the §7d lexicon+lint) ·
    "practice what you preach" as new machinery (already the MASTER CHECKLIST).

**Open build-phase decisions (unchanged):** V8 density (keep the 5-card stack incl. DoIP vs spin the
IP/DoIP half to M7) · a `:::table` directive (for M2/M3) · bundle EN fonts base64 (map + modules still
use the Google-fonts link) · per-pillar T derivations for M2–M9 (each its own H/V, when built).

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
  _derive/                <- Foundation derivation (working artifacts; raw/ stays pristine):
    txt/*.txt               local source notes (grep/read source)
    foundation-derivation.workflow.js   the 31-agent derivation workflow
    foundation-derivation.result.json   full clause-verified H/V result (provenance)
wiki/log.md · wiki/index.md   <- append-only history + wiki TOC
```
