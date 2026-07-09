# Glossary — the canonical term contract (EN / JP)

**One concept = one name, used verbatim everywhere.** This is the source of truth for
[[CONVENTIONS]] §2b rule 1 (canonical term, no synonym drift). Before naming a thing in a card,
check here; if it is new, **add it here first**, then use exactly that string (EN *and* JP) in the
prose and on figure labels. The "❌ never" column lists drifts caught in review — do not reintroduce.

Grows as the course grows (add M2+ terms when built). Auto-loaded? No — open it when authoring/reviewing.

| concept | EN canonical | JP canonical | notation | ❌ never (synonym drift) |
|---|---|---|---|---|
| the diagnostic tool that asks | **tester** (the *client*) | **テスター**（クライアント） | — | scanner / tool / you-as-device |
| the on-board computer that answers | **ECU** (the *server*) | **ECU**（サーバー） | — | the box / the unit / controller |
| a request the tester sends | **request** | **リクエスト** | — | command / query / message (alone) |
| what the ECU sends back | **reply** / **response** | **応答** | — | answer (in prose ok; label = "reply") |
| the first byte naming the service | **service identifier** (**SID**) | **サービス識別子**（SID） | `10h` | service number / service code / first-byte value |
| the OK answer | **positive response** | **肯定応答** | `SID+40h` | success msg / good reply (prose ok, not a term) |
| the refusal | **negative response** | **否定応答** | `7Fh <SID> <NRC>` | error msg / fail |
| the +0x40 rule | **+40h** ("bit 6 set") | **+40h**（ビット6を立てる） | `10h`→`50h` | plus-0x40 / 40 (decimal) |
| a request's variant selector | **sub-function** | **サブファンクション** | 1 byte, bits 6–0 = value | mode byte / second byte (as a *name*) |
| the top bit of the sub-function byte | **suppressPosRsp bit** (bit 7) | **suppressPosRsp ビット**（ビット7） | `&80h` | suppress flag (short form ok after first use) |
| a 16-bit data address | **data identifier** (**DID**) | **データ識別子**（DID） | `F1h 90h` | data ID (spell out first) |
| a 16-bit routine address | **routine identifier** (**RID**) | **ルーチン識別子**（RID） | — | routine ID |
| one complete application message | **A_PDU** | **A_PDU** | — | packet / frame (frame = transport, not this) |
| the control header | **A_PCI** | **A_PCI** | first byte = the key | header (alone) |
| the service's own data bytes | **parameters** | **パラメータ** | — | payload (payload = transport-ish; avoid here) |
| the ECU's operating mode | **session** | **セッション** | `01h`/`02h`/`03h`/`04h` | state (session is a state, but call it "session") |

**Actor rule (paired with §2b rule 4):** protocol verbs bind to the **tester** (sends the request) and the
**ECU** (serves the reply). "You" = the reader/operator only, present tense, and only where literally true.
Figure labels for the two message groups are **request** / **reply** (not "you send" / "you get").

**Hex-notation rule (LOCKED 2026-07-09 — user):** in LEARNER-FACING content, **every hex value carries an
`h` suffix, everywhere** — inline (`10h`, `50h`, `40h`, `7Fh`), inside byte-box cells, and in multi-byte
traces (`50h 03h 00h 32h 01h F4h`). Bit values (`0`/`1`) stay bare. The shared byte-box generator
(`_template/bytebox.js`) appends the `h`; figure labels and prose must match. (`$XX` in planning docs is
internal shorthand, rendered `XXh` in a card.)
