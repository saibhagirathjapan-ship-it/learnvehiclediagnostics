# M1 — UDS Foundations · build notes

Module deliverable: `index.html` (self-contained). Parent plan: `../COURSE.md`.
Status legend: ✅ built & verified · 🚧 in progress · ⬜ todo · ✏️ revise

**Overall status (2026-07-04, session 2):** being **re-authored via the content-MD pipeline**
(`../_template/` + `../COURSE.md` Current Focus). The legacy hand-authored `index.html` is
preserved as the content source-of-truth until the swap. **Migrated so far:** Section 4 (`$10`)
→ `content/s4-divider.md · s4-brief.md · s4-c19.md · s4-concl.md` + `module.yml` +
`assets/figures/c19-*.svg`, rendered to `_preview.html` and browser-verified. **Pending:**
S0, S1, S2, S3, S5, S6 (extract their inline SVGs from legacy `index.html`). The card inventory
below is the content spec to migrate, card by card.

---

## Card inventory (order = reading order)

| ID | Type | Title | Illustration | Status |
|----|------|-------|--------------|--------|
| — | Hero | Understanding UDS | path chips (1 UDS → 2 SOVD) | ✅ |
| S0 | Divider | Why diagnostics exist | — | ✅ |
| — | Brief | the warning-light question | — | ✅ |
| C1 | Concept | Workshop scene: two parties, one cable | tester–cable–car SVG | ✅ |
| C2 | Concept | What UDS is, in one breath | shared-dictionary SVG | ✅ |
| — | Conclusion | recap S0 | — | ✅ |
| S1 | Divider | Big picture: where UDS lives | — | ✅ |
| C3 | Concept | Client & server | roles SVG | ✅ |
| C4 | Concept | One exchange: request/response | timeline + P2 SVG | ✅ |
| C5 | Concept | Inside the ECU: DCM & DEM | ECU block-stack SVG | ✅ |
| C6 | Concept | OSI map: UDS top, CAN bottom | 3-layer OSI SVG | ✅ |
| C7 | Concept | How a request is served end-to-end | pipeline SVG + table | ✅ |
| — | Conclusion | recap S1 | — | ✅ |
| S2 | Divider | Anatomy of a UDS message | — | ✅ |
| C8 | Concept | First byte: the SID | SID byte SVG | ✅ |
| C9 | Concept | Request shape: SID + params | byte-box figure | ✅ |
| C10 | Concept | Positive response: SID + 0x40 | +0x40 map SVG | ✅ |
| C11 | Concept | Negative response: 7F+SID+NRC | byte-box figure + NRC table | ✅ |
| C12 | Concept | Sub-functions & suppress bit | 8-bit field SVG | ✅ |
| C13 | Concept | Service catalog: six families | families SVG + table | ✅ |
| — | Conclusion | recap S2 | — | ✅ |
| S3 | Divider | Sessions: ECU as state machine | — | ✅ |
| C14 | Concept | ECU has states | session state-machine SVG | ✅ |
| C15 | Concept | What a session unlocks | session-gates SVG + table | ✅ |
| C16 | Concept | Timing: P2, S3, TesterPresent | timeline SVG | ✅ |
| — | Conclusion | recap S3 | — | ✅ |
| S4 | Divider | $10 Diagnostic Session Control | — | ✅ |
| C17 | Concept | What $10 is for | procedure-flow SVG | ✅ |
| C18 | Concept | Request byte by byte | byte-box + subfn table | ✅ |
| C19 | Concept | Positive response + P2/P2* timing | 6-byte-box figure | ✅ |
| C20 | Concept | Three sessions side by side | 3-exchange SVG | ✅ |
| C21 | Concept | Worked: success then refusal | 2-exchange timeline + details | ✅ |
| — | Conclusion | recap $10 | — | ✅ |
| S5 | Divider | $11 ECU Reset | — | ✅ |
| C22 | Concept | What $11 is for | three-reasons SVG | ✅ |
| C23 | Concept | Request byte by byte | byte-box figure | ✅ |
| C24 | Concept | Reset types (soft vs hard) | reset-depth SVG + table | ✅ |
| C25 | Concept | Positive response + returns-to-Default | return-to-default SVG (byte strip inline) | ✅ |
| C26 | Concept | Worked: accepted vs refused | 2-exchange timeline + details table | ✅ |
| — | Conclusion | recap $11 | — | ✅ |
| S6 | Divider | Bridge to SOVD | — | ✅ |
| — | Brief | where UDS shines | — | ✅ |
| C27 | Concept | SOVD teaser (web-API vs hex) | UDS-vs-SOVD compare SVG | ✅ |
| — | Conclusion | you are here / M2 next | — | ✅ |

Verified counts: 7 dividers · 2 briefs · 27 concepts · 27 figures · 7 conclusions.

---

## Technical facts locked (double-derived against ISO 14229)

- Positive resp = request SID + 0x40 → `$10`→`50`, `$11`→`51`.
- `$10` positive resp = `50 <session> P2hi P2lo P2*hi P2*lo`. P2 res = 1 ms, P2* res =
  10 ms. Example `50 03 00 32 01 F4` → P2=50 ms, P2*=5000 ms.
- Sessions: `01` default · `02` programming · `03` extended · `04` safetySystem.
- Negative resp = `7F <SID> <NRC>`. NRCs used: 12,13,22,33,7E,7F; 78=responsePending.
- suppressPosRsp = bit 7 (0x80) of sub-function; e.g. `03`→`83`, TesterPresent `3E 80`.
- S3 timeout ≈ 5 s → drops to Default. TesterPresent SID = `3E`; its response SID = `7E`.
- `$11` reset types: 01 hardReset · 02 keyOffOnReset · 03 softReset · 04 enableRapid
  PowerShutDown (resp adds powerDownTime byte) · 05 disableRapidPowerShutDown.
- After reset → Default session, security re-locked.
- Corrected during build: `7E` is TesterPresent's *response* SID (3E+40), NOT its SID.

---

## TODO / possible revisions (if reworking)

- ⬜ Await user's "start from the beginning" intent — could mean re-scoping M1, changing
  reading model (carousel vs scroll), or adjusting depth/pacing.
- ⬜ Consider an interactive "byte decoder" widget (type bytes → plain-English) as an
  optional enhancement.
- ⬜ Optional: add a printable / single-scroll mode.
- ⬜ If the source standard becomes available, replace public-reference citations with clause refs.

## Known-good verification commands
```
cd wiki/learn/uds
node verify.js     # DOM + overflow + lang toggle, all themes
node shots.js      # close-up card screenshots -> assets/
node navtest.js    # mobile capture + TOC nav-landing
```
