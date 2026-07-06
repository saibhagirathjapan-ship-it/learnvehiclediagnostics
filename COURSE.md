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
H-spine. H/V are *altitudes of the same topic*, not two buckets — `$10`/`$11` appear in the breadth
sweep **and** as their own drill. **Sizing = 3 H + 9 V = 12 modules** (user-confirmed 2026-07-05;
collapse seams → 3H+6V if ever pruned).

> **Re-derivation provenance (2026-07-05, session 4).** A 31-agent documents-first workflow
> (`wiki/learn/_derive/foundation-derivation.workflow.js`; full result JSON
> `wiki/learn/_derive/foundation-derivation.result.json`) inventoried **327 topics** across all 12
> standards — now incl. **ISO 15765-2:2024** + **ISO 13400-2:2012** — drew the foundation boundary
> (90 foundation / 69 per-service-deep / 6 contested), generated **3 independent architectures**, then
> **adversarially double-derived every module against the clauses** (6 of 12 needed fixes → ~20
> citation/framing corrections applied). Outcome: **structurally identical to this block** (zero
> module-boundary changes); the corrections are folded in below and the V-numbering is refined
> (**SPRMIB promoted to its own drill V4; `$10`+`$11` merged into one archetype drill V7** —
> user-confirmed).

**Depth-of-foundation boundary — one token: `DSD accepts → DSP executes`.** Everything up to the
server's validity gate handing a *validated* request to processing is foundation; the instant the
server fetches data / runs a routine / reads the fault store for **one specific SID**, it is
per-service-deep. (Honest caveat: the format/length/sub-fn check straddles DSD & DSP — taught as a
one-line T-leg, not a crisp spec line.)

**Horizontal — breadth spine (read only these = a complete high-level picture)**

| id | module | covers | gives the learner | source (clause-verified) |
|----|--------|--------|-------------------|--------------------------|
| **H1** | The diagnostics landscape — what UDS is, who talks | V1, V8 | UDS = 14229-1 app-layer services, transport-independent; client(tester)↔server(ECU); the 14229 family (-1 app · -2 session · -3/-5/-6/-7 transport bindings) + where Dcm/Dem·ODX·SOVD·J1939·Dlt sit; OSI map at a glance; Dem↔Dcm split as a placement bar | 14229-1 cl.1, Intro Table 1, cl.6, cl.3 · -5/-6/-7 §7.1 · Dcm/Dem/J1939/Dlt cl.1 |
| **H2** | The life of one request — one exchange, end to end | V2–V8 | the whole beat traced once: `SID` → serve → `+0x40` **or** `7F+SID+NRC`; **+ four bar one-liners:** physical-vs-functional addressing (responses always physical) · `$3E` keep-alive · fault-logging (separate Dem store) · `$11` returns-to-default & re-locks; `$10` as the one concrete round trip (encodes P2/P2\*) | 14229-1 cl.7.1, 8.4/8.5/8.6, 8.1, 10.2/10.3/10.7 |
| **H3** | What UDS can do + how the ECU decides — catalog + server at a glance | V5, V9 | the **6 functional units (cl.10–15) + 1 security sub-layer (cl.16)** — not a 7th unit; what needs session/security; the 16-bit DID + RID coordinate spaces; the one-screen "inside the server" bar (PduR→DSL→DSD→DSP); FDIS renumbers **down**, only ResponseOnEvent changed | 14229-1 cl.10–16, Annex C.1/F.1, cl.8.7.2 Fig 5 · Dcm cl.7.1.1 · FDIS Foreword |

**Vertical — depth drills (teaching order: message → sub-fn → sessions/timing → archetype → zoom out → zoom in)**

| id | module | bar | drills into | source (clause-verified) |
|----|--------|-----|-------------|--------------------------|
| **V1** | The service model | H1 | primitives (req/ind/rsp/conf; confirmed=6, unconfirmed=3); req_confirm=client-side / rsp_confirm=server-side; SAP mandatory params `A_Mtype/A_SA/A_TA`; L5 exposes only `S_Data.req/.ind/.conf` | 14229-1 cl.5, 7.1, 7.4 · 14229-2 cl.6, 7 |
| **V2** | Request & positive response, byte by byte | H2 | `A_PDU = A_SDU+A_PCI+params+Length`; A_PCI keyed on first byte; **pos = `SID+0x40`** (bit 6 = type), sub-fn echoed with bit7=0 | 14229-1 cl.8.2/8.3/8.4, 9.3 |
| **V3** | Negative responses & the NRC catalog | H2 | fixed `7F+SID+NRC`; the **single global Annex A.1 catalog** (3 ranges) + always-supported set; **`0x78` RCRRP** (final resp always sent, opens P2\*) | 14229-1 cl.8.5/8.6, Annex A.1, 9.4 |
| **V4** | **Sub-functions & the suppressPosRsp bit** | H2 | sub-fn byte: bit 7 SPRMIB (`&0x80`), bits 6–0 value (`&0x7F`); **suppresses the positive reply ONLY — physical negatives always sent, service still fully executes** (cl.9.2.2 Table 11 note) | 14229-1 cl.9.2.2, 8.7.3.2, 8.7.5 |
| **V5** | Sessions & the session state machine | H2 (+H3) | one active session (`01` default at power-up / `02` prog / `03` ext / `04` safety); Fig 7 machine; non-default **re-locks security**; two return-to-default causes (explicit DSC/reset vs S3 timeout) | 14229-1 cl.10.2 Table 25/Fig 7 · Dcm 7.2.4.11 |
| **V6** | Timing & keep-alive — P2 / P2\* / S3 | H2 | the whole 14229-2 timing family: `tP2_Server` (rec 50 ms) + `tP2*_Server` (rec 5000 ms, unlocked by `0x78`); `tP4_Server`; client tP2/tP6/tP3; **S3 keep-alive** (`tS3_Client` 2000 < `tS3_Server` 5000) via `$3E`; only the owning connection resets S3 | 14229-2 cl.9.1, **9.5** · 14229-1 cl.10.7 |
| **V7** | **The archetype exchanges — `$10` + `$11` as one beat** | H2 | two concrete traces: `$10` positive resp **encodes P2/P2\*** (`00 32 01 F4` = 50/5000 ms); `$11` reset types 01–05, reboot → default → security LOCKED (causal chain) | 14229-1 cl.10.2 Tables 28/29, 10.3 Table 34 · Dcm 7.4.2 |
| **V8** | Addressing & the transport / OSI descent | H1 (+H2) | physical (1:1) vs functional (1:n, SF-only, NRC-suppressed) — responses always physical; OSI descent, invariant middle; CAN 0–8B vs FD 0–64B; ISO-TP SF/FF/CF/FC + FlowStatus + the six **`tTL_*`** timers; 11-/29-bit IDs; USDT/UUDT; DoIP 8-byte header + `0x8001`; K-Line/LIN/FR as thin adapters | 14229-1 cl.7.4.1.4, 8.7.1 · **15765-2:2024** cl.6, 9 · **13400-2:2012** cl.6, 7 · 14229-3 cl.13.3/13.4 |
| **V9** | Inside the server — Dcm pipeline & the NRC-origin gate | H3 | 14229-1 cl.8.7.2 Fig 5 behaviour realized as Dcm DSL→DSD→DSP; the **ordered 7-step DSD gate** (`SWS_Dcm_01535`, stop on first failure) where every NRC is born; `0x78` at the P2/P2\* boundary; security state (LOCKED init) | 14229-1 cl.8.7 · Dcm cl.7.1.1, **7.3.4.3 SWS_Dcm_01535** |

**Pressure-test outcomes (re-confirmed 2026-07-05):** (1) **Dem stays out of the foundation → M3
(Faults)** — only a placement bar in H1/H3, not universal substrate; foundation keeps **Dcm** only.
(2) **Order is concrete-first** — message → sub-fn → sessions/timing → archetype (`$10`+`$11`) → zoom
out (transport, V8) → zoom in (Dcm, V9). (3) **Bar-coverage holds airtight:** H1={V1,V8} · H2={V2–V8}
· H3={V5,V9}; V2/V5/V8 double-touched; zero orphans, zero overclaims. **Collapse seams** (if pruning
to 3H+6V): V2+V3, V5+V6, and fold V8.

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

**As of 2026-07-06 (session 9 — H2 built + a user-driven template UX overhaul)**

- **DONE — H2 "The life of one request" COMPLETE & pressure-tested** (`uds-foundation/h2-life-of-a-request/`):
  divider · brief · **C1** bytes/SID · **C2** two answers (`+0x40` / `7F+SID+NRC`) · **C3** four rules
  (addressing · `$3E` · faults→Dem · `$11`) · **C4** the concrete `$10` round trip · conclusion. 12 figures
  (brief + C4 **animate travelling byte-boxes**). Bar-coverage V2–V8 all covered. Ran a **7-agent
  adversarial pressure-test to convergence** (5 rounds; R4 0 blockers / 6 minors, R5 confirming) — every
  claim clause-grounded, every blocker/minor fixed. NOTES has the full history.
- **Template UX overhaul (user-driven; shared → H1 + hub inherit).** Card-to-card flow was unclear, so:
  an **overview strip** + **card-level left rail** (scroll-spy), **distinct cards**, **real forward-pointer
  links** (+ **17 stub pages** for V1–V9/M2–M9/H3 so they resolve), a **much more visible "Go Deeper"**
  (accent banner + solid `+/−` buttons), a **prominent `:::recall`**, and **byte-box travel animation**.
  Renderer bug fixed (code-span `*` no longer breaks emphasis). A11y: `--chip` lightened for WCAG,
  several `--ink-faint`→`--ink-soft`. Mobile topbar overflow + a scroll-stuck bug fixed.
- **NEXT (session order set by user 2026-07-06):** (1) a **feedback** session (user has more UX/content
  feedback to give); (2) a **governance** session (fold the session-9 template UX + shell decisions into
  [[CONVENTIONS]]/[[PEDAGOGY]] as locked rules — overview strip · card rail · Go-Deeper affordance ·
  recall prominence · real forward-links + stub pages · byte-box animation · the ≤2-class lang-selector
  rule incl. leg/nav/pill isolation); (3) a **short GitHub-upload** session (publish the vault to a
  website — clean scratch scripts per H2 NOTES, add `.gitignore` for `node_modules/` + `assets/*.png`);
  **then** (4) **H3 "What UDS can do & how the ECU decides"** — `uds-foundation/h3-catalog-and-server/`
  (stub exists). Same recipe + the now-stronger template; then V1–V9. Reuse H2 figures where they fit.
- **H2 open item:** re-run the H2 pressure-test (round 6) to confirm clean — it was stopped at session
  close with 0 known blockers + all round-5 findings fixed & re-verified.
- **Deferred (optional):** a one-time attention pulse on the Go-Deeper `+` buttons (offered to user, held
  off to avoid constant motion); `--ink-faint` UI chrome (nav numbers / PREV·NEXT / table `th`) still at
  the accepted H1 value.

---

**As of 2026-07-05 (session 7 — H1 "Start Here" + C1 rebuilt to the new card bar; illustration
approach + UI-hygiene rules hardened per user)**

- **Session 7 — card craft leveled up (user-driven).** "Start Here" (brief) and **C1** ("What UDS is,
  and who talks") rebuilt to a new, higher bar and **signed off** (Start Here). New standing rules
  (all in [[CONVENTIONS]], auto-loaded):
  - **Conscious bullets** — paragraphs where a few lines suffice; **numbered** for sequences,
    **unnumbered** otherwise; **semantic markers** (`{key}` accent diamond · `{warn}` amber triangle ·
    normal bar). Compact **`:::reading`** Further-reading on every card (concept cards use a `## footer`).
  - **Illustration = a schematic storyboard I draw myself** (theme-aware `.dgm` SVG + subtle SMIL
    animation) that depicts the section's **key teaching**. Brief = *check-engine light → connect
    tester → ask ECUs*; C1 = *client asks → server answers* (sequenced pulses, ECU never first).
    If a hard element (a car) is needed, user supplies just that asset; I compose. **User: "loved
    this — carry to all."**
  - **UI hygiene HARDENED** ([[CONVENTIONS]] §7a + §8.7): named-anchor geometry (connectors touch,
    motion traces the drawn path), **padding is mandatory** (nothing touches; soft/gradient glow not
    hard halos), **draw the real thing sharply** (recognisable glyphs), and a **per-element
    self-critique gate** (goal reached? looks good? conveys? anything off?).
  - Pipeline gained: bullet/numbered/semantic lists, italics (`*..*`, upright in JP), `:::reading`,
    concept-card `## footer` slot, **bar-figure `caption:`**.
  - **More rules hardened (session 7 cont.):** §7b figure text (labels/callouts/**caption-below**,
    researched from Google/Saylor/oXygen), §7a **layout framework** (paired components via a shared
    function + constants → symmetric by construction), §8.7 **Element Completion Checklist** (run per
    element, verify with a close-up).
  - **Forward pointers (spiral signpost) added** — `{{→ V9 · …}}` inline pill ([[CONVENTIONS]] §6 +
    `.fwd`) for substantial *named-but-deferred* topics (Dcm→V9, Dem→M3). T-map already signals depth
    *exists*; the pill says *which* drill. Use sparingly.
  - **DONE — H1 "the diagnostics landscape" module COMPLETE:** divider · brief · **C1 · C2 · C3** ·
    conclusion, all to the new bar (conscious bullets · bar `caption:` · `:::reading` footer · framework
    figures · checklist-verified). C2 = job-grouped family map; C3 = OSI 3-layer stack (kept visually
    distinct from C2) + physical/functional addressing leg. 8 figures, verified light/dark/mobile.
  - **NEXT: H2 "the life of one request"** — new module folder `uds-foundation/h2-life-of-a-request/`;
    then H3, then V1–V9. Same bar + checklist, one card at a time.

**As of 2026-07-05 (session 6 — H1 built card-by-card + documents-first re-derivation; pipeline `:::recall` + EN-on-load; template lang-toggle bug fixed)**

- **Sibling nodes derived & pressure-tested** (20-agent workflow; see the Module-roadmap "Sibling
  nodes derived" note + `wiki/learn/_derive/sibling-nodes.result.json`). The Foundation's siblings =
  **8 pillars (M2–M9)**, roadmap validated, every per-service-deep SID homed 1:1. **User decisions
  2026-07-05:** **merge M9+M10 → one SOVD pillar** (core = its breadth, in-practice = its depth);
  **ignore `$84`** (minor advanced service, don't track); record it all. `course.yml` updated, hub
  re-rendered → **9 top-level modules** (Foundation + M2–M9).
- **Working principle set by user:** each pillar is itself a **T** and gets its **own H/V derivation**
  (like the Foundation) when we build it — "dive deeper for each pillar in separate sections/modules."

- **Foundation re-derived, documents-first** (31-agent workflow; see the Foundation block's
  re-derivation provenance). Result **structurally confirms 3H+9V** with ~20 clause-citation
  corrections applied and the V-numbering refined. **User decisions 2026-07-05:** adopt the corrected
  V-numbering (**V4 = SPRMIB own drill; V7 = `$10`+`$11` combined**); **keep 3H+9V**; for the three
  not-in-vault standards fill from **training + internet** (see the V8 gap-fill policy note).

- **Transport standards resolved:** **ISO 15765-2:2024** (`the source standards/CAN/`) and **ISO 13400-2:2012**
  (`the source standards/DoIP/`) are now in the vault and fully cited by V8 — the prior "still missing" items
  are closed. Text sidecars for all standards live in `wiki/learn/local notes/` (working artifacts,
  `raw/` untouched).

- **Legacy M1** (`uds/index.html`, 27 flat cards) is now a **content + figure donor** for the
  Foundation modules — its prose/SVGs get redistributed into H1–H3 + V1–V9 (the earlier "migrate S0–S6
  as-is" plan is superseded by the H/V build). S4 (`$10`) MD already migrated as the pipeline reference.

- **DONE 2026-07-05 — Foundation nav scaffolding built.** Foundation lives in
  `wiki/learn/uds-foundation/`; the hub's Foundation card (`course.yml` M1 `href`) now opens a
  **T-shaped map** (`uds-foundation/index.html`, scaffolding built & verified light/dark, no console
  errors) — **H1–H3 breadth bar across the top, V1–V9 depth stem descending**, a "how to learn"
  guidance banner (breadth → / depth ↓), bar-coverage tags on V cards, **EN on load**. Each card is
  clickable to its module (empty stubs for now). Slugs: `h1-landscape` · `h2-life-of-a-request` ·
  `h3-catalog-and-server` · `v1-service-model` · `v2-request-and-response` · `v3-negative-responses` ·
  `v4-subfunctions` · `v5-sessions` · `v6-timing` · `v7-archetypes` · `v8-addressing-transport` ·
  `v9-inside-the-server`.

- **BUILD CADENCE (user, 2026-07-05):** build the Foundation **one card at a time, slowly** — author
  a card, show it, iterate, then the next. Not a bulk auto-run. Each concept stays clause-grounded +
  pressure-tested.

- **DONE (session 6) — H1 built, verified & re-derived.** Module `wiki/learn/uds-foundation/h1-landscape/`
  (`index.html` rendered; the map's H1 card opens it). 6 cards + 5 figures + 1 `:::recall`, browser-verified
  (EN on load · lang toggle isolates · zero overflow/console errors in light/dark/mobile). A 9-agent
  documents-first workflow (`_derive/`… `rederive-h1`) grounded all 25 claims against the clauses →
  **factually sound**; two minor fixes applied (Part 4 FlexRay restored in C2; recall softened re
  ResponseOnEvent `$86`). Full detail in `uds-foundation/h1-landscape/NOTES.md`. **The scaffold as
  built** (breadth module; covers the V1 + V8 bars):
  1. **Divider** — H1 · The diagnostics landscape (the one-screen map).
  2. **Brief** (hook) — warning light → a car is many computers → diagnostics = asking each one → UDS
     is the shared language.
  3. **C1 What UDS is, and who talks** (V1 bar) — UDS = shared request/response language (ISO 14229);
     tester=client (asks), ECU=server (answers, never speaks first). Fig: client↔server (reuse legacy
     `uds/` c3); leg: shared-dictionary/SID (reuse legacy c2). Src: 14229-1 cl.1, cl.3, cl.5/7.1.
  4. **C2 The ISO 14229 family & the neighbours** (the map) — -1 services · -2 session/timing ·
     -3/-5/-6/-7 transport bindings; Dcm runs UDS · Dem stores faults · ODX describes · SOVD is the
     web-API future · J1939 heavy-duty · Dlt dev-logging. Fig: family map (NEW SVG); legs: "-x = thin
     adapters", Dem↔Dcm split (→ H3/V9). Src: 14229-1 Table 1; -5/-6/-7 §7.1; Dcm/Dem cl.1.
  5. **C3 UDS is the top of the stack** (V8 bar) — UDS = meaning (top); transport carries it; same UDS
     over CAN/DoIP/K-Line/LIN/FlexRay. Fig: OSI 3-layer + swap-bottom (reuse legacy c6); leg:
     physical vs functional addressing (responses always physical). Src: 14229-1 cl.6/Table 1,
     cl.7.4.1.4.
  6. **Conclusion** — recap + competence beat ("place any UDS doc on the map, name the two roles") +
     first **retrieval beat** (hidden-answer recall) + bridge → H2.
  - **Pipeline tweaks DONE:** `render.js` default → **EN on load**; new **`:::recall`** directive
     (bilingual `q_en/q_jp` + hidden `<details>` `a_en/a_jp`) + `.recall` styles; `.dgm` helpers
     `w7 w8 amb amb-s` added for ported legacy SVGs. (`:::table` still deferred to M2/M3.)
  - **Template bug fixed (all modules):** language toggle didn't hide the other language for **leg
     summaries** + **modnav label** (3-class `display:block` tied+beat `.stage[data-lang] .jp`);
     reduced to ≤2-class. Verified EN→0 JP, JP→0 EN. Keep new lang selectors ≤2-class.
  - **NEXT — resume here: build H2, card by card** (`uds-foundation/h2-life-of-a-request/`). Same
     recipe: author → render → verify light/dark → show → iterate. Then H3, then V1…V9. Reuse legacy
     `uds/` SVGs (timeline c4, pipeline c7) where they fit. Optional: add a back-to-map link in H1.

- **Still open (build-phase decisions):** **V8 density** (keep the 5-card stack incl. DoIP, vs spin
  the IP/DoIP half out to M7) · `:::table` directive (for M2/M3) · **bundle EN fonts** base64 (map +
  modules still use the Google-fonts link) · per-pillar T derivations for M2–M9 (each its own H/V,
  when built).

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
