# Course structure & arc — the hub source of truth (course scale)

**This file owns the hub page.** Per [[CONVENTIONS]] §1e the organization is fractal: this
course-scale `STRUCTURE.md` owns the **ordered module list + a high-level line per module + the
arc between them**; each module's own `STRUCTURE.md` (e.g. `uds-foundation/STRUCTURE.md`) owns its
card-level flow. The **course hub** (`index.html`, rendered by `_template/render-hub.js`) and its
render data (`course.yml`) are **derived from this file — never hand-organized**. To add / move /
re-scope a module, edit **here first**, then propagate to `course.yml` and re-render the hub.

Direction of authority: `COURSE.md` (roadmap + status) → **this file** (hub: module list + high-level
+ arc) → each module's `STRUCTURE.md` (card flow) → `content/*.md` → rendered `index.html`.

---

## The arc (one line)

Learn automotive diagnostics from zero and build toward **SOVD**. First understand **UDS**
(ISO 14229) — where it lives in an ECU, how one request is served, its message anatomy and its
services — then pivot from the CAN-era transport to **IP** and the **web** idioms SOVD is built on,
and finally reach **SOVD** (ISO 17978) itself. Each UDS module maps a UDS capability to the **SOVD
resource category** it later becomes, so the whole course is one continuous argument for why SOVD
looks the way it does.

## Dependency spine

```
Foundation ──▶ (M2 Data · M3 Faults) ──▶ M4 Security ──▶ M5 Routines/I-O ──▶ M6 Reprogramming
                                                                                   │  (UDS capstone:
                                                                                   │   composes sessions
                                                                                   │   + security + routines
                                                                                   │   + transfer)
   ┌───────────────────────────────────────────────────────────────────────────────┘
   ▼
M7 DoIP (CAN → IP)  +  M8 Web APIs   ──────▶   M9 SOVD  (the destination)
        └────────── the pivot ──────────┘
```

- **Foundation** is the substrate every UDS module stands on (built as a course-scale **T**: a 3-bar
  breadth spine H1–H3 over 11 depth drills V1–V6, V7a/b/c, V8, V9 — see `uds-foundation/STRUCTURE.md`).
- **M2 + M3** are independent siblings on top of the Foundation (read data · remember faults).
- **M4 → M5 → M6** stack: unlock, then act, then the reprogramming capstone that composes them all.
- **M7 (transport) + M8 (web)** are the pivot from the CAN/UDS world to the IP/REST world.
- **M9 (SOVD)** is the destination; it reuses every prior idea and names ODX's single home.

## Module list (ordered — the hub renders these top to bottom)

Status: ✅ built · 🚧 in progress · ⬜ not started. `slug` is the folder under `wiki/learn/`.

| # | Module | slug | → SOVD category | High level (one line) | Status |
|---|--------|------|-----------------|-----------------------|--------|
| 1 | **Foundation** | `uds-foundation` | substrate | What UDS is, the life of one request, and the service catalog + server — the bedrock for everything else. | 🚧 |
| 2 | **Data & Identification** | `uds-data` | `data` | Read and write an ECU's data by identifier — `$22` / `$2E`, DIDs, the VIN. | ⬜ |
| 3 | **Fault Memory & DTCs** | `uds-dtc` | `faults` | How an ECU records and reports faults — `$19` / `$14`, the DTC status byte, snapshots, the Dem lifecycle. | ⬜ |
| 4 | **Security & Access** | `uds-security` | auth | Proving you're allowed in — `$27` seed/key, `$29` Authentication, `$28` CommunicationControl. | ⬜ |
| 5 | **Routines & I/O Control** | `uds-routines` | `operations` | Making the ECU *do* something — `$31` RoutineControl and `$2F` InputOutputControlByIdentifier. | ⬜ |
| 6 | **Reprogramming / Flash** | `uds-flash` | software update | The flash sequence end to end — session · unlock · erase · `$34`/`$36`/`$37` download · `$35` upload · checksum. | ⬜ |
| 7 | **From CAN to IP: DoIP** | `doip` | transport / why-now | Why diagnostics moved onto Ethernet — DoIP (ISO 13400), IP addressing, DoIP vs DoCAN, zonal architecture. | ⬜ |
| 8 | **Web APIs in 20 min** | `web-api` | how to read SOVD | The web idioms SOVD borrows — HTTP verbs, REST resources & URIs, JSON, status codes, client/server over IP. | ⬜ |
| 9 | **SOVD** | `sovd` | SOVD itself | The destination — entity/resource model, the resource categories, discovery & self-description, the REST shape; classic-ECU proxy via DoIP (CDA), auth, remote/OTA, ODX's single home. | ⬜ |

> **Note on the Foundation slug.** `course.yml` currently carries the Foundation as `id: uds` with an
> explicit `href: uds-foundation/index.html`; the canonical folder/slug is **`uds-foundation`**. Keep
> the href until the id is reconciled.

## Hub render contract (what the hub shows per module)

Each module renders as one card (`render-hub.js`): the number, its **→ SOVD category**, the
bilingual title, and a **scope line** (the "High level" column above, in EN + JP). "Built" modules
link to their page; not-yet-built modules show a *soon* state but still link to their landing/stub.
`course.yml` holds the exact EN/JP strings; the **ordering, the module set, and the high-level intent
come from this file.**

## Adjacent / out of scope (named, deliberately not modules)

OTX (ISO 13209) · MVCI (ISO 22900) · legislated OBD (SAE J1979 / ISO 27145 WWH-OBD / J1939-73) ·
AUTOSAR Dlt · calibration XCP / ISO 26262 / ISO 21434. These earn at most a one-line landscape
mention inside Foundation H1 — see `COURSE.md` "Adjacent-out-of-scope".
