---
id: c2
type: concept
order: 30
section: { n: "V3", en: "Negative responses", jp: "否定応答" }
title:
  en: "One shared catalog of reason codes"
  jp: "理由コードの共通カタログ"
short: { en: "One catalog", jp: "共通カタログ" }
crux: true
load_bearing: >
  Every service draws its refusal reasons from one shared catalog of NRCs — the codes are not
  invented per service — and where a code falls in the 00h…FFh number line tells you the kind of reason.
derivation:
  - claim: "one shared catalog; the number is universal, but a code's exact reason can vary by service/ECU"
    why: "Table A.1 'defines all NRCs'; a service selects applicable codes + 'may utilise additional … as defined by the vehicle manufacturer'. So 22h=conditionsNotCorrect everywhere (number fixed), but WHICH condition is per-service/per-manufacturer (22h def = context-specific 'prerequisite conditions') — on-card: '22h is conditionsNotCorrect on every service — even if which condition failed can differ' (nuance added per user 2026-07-12)"
    clause: "ISO 14229-1:2020 Annex A.1 (Table A.1 intro; 22h def)"
  - claim: "the code's range tells the kind of reason (00 / 01-7F / 80-FF)"
    why: "Table A.1: the 00-FF range is divided into three — 00 positiveResponse/server-internal; 01-7F communication-related; 80-FF specific conditions (a more specific 22h) — on-card: the three banded segments"
    clause: "ISO 14229-1:2020 Annex A.1 (three-range definition)"
  - claim: "some NRCs are generally supported by every service; no rigid mandatory set"
    why: "A.1 busyRepeatRequest note: 'in general supported by each diagnostic service … therefore not listed in the applicable response codes' — honest 'generally supported', NOT a mandated set (COURSE.md wording: 'generic set')"
    clause: "ISO 14229-1:2020 Annex A.1 (0x21 note)"
---

## story
fig: figures/v3-c2-f1_one-catalog.svg
en: A refusal's third byte is its reason — a code like `22h` (*conditionsNotCorrect*). But a request can fail in many ways: an unknown service, a wrong length, a locked ECU, a bad value.

Does every service keep its own private list of codes? No — they all draw from **one shared catalog**: one table for the whole protocol. A service marks which ones it can send; it never invents its own. So `22h` is *conditionsNotCorrect* everywhere — even if which condition failed differs by service or ECU.
jp: 拒否の3バイト目は理由 ― `22h`（*conditionsNotCorrect*：必要な条件が満たされていない）のようなコードです。しかしリクエストは、さまざまに失敗し得ます：未対応のサービス、長さ違い、ロック中の ECU、値の誤り。

サービスごとに専用のコード一覧を持つのでしょうか？　いいえ ― すべては**共通の1つのカタログ**から引きます：プロトコル全体で1枚の表です。各サービスは自分が送れるものに印を付けるだけで、独自に作り出しません。だから*番号*は共通です ― `22h` はどのサービスでも *conditionsNotCorrect*。ただし、どの条件が満たされなかったかは、サービスや ECU によって異なり得ます。
--
en: The catalog is not a flat list. The code is one byte, `00h`–`FFh`, split into three bands — the band tells you what *kind* of reason it is:

- `00h` — not a refusal at all: it is the *all-clear* value, reserved so no refusal uses it.
- `01h–7Fh` — **communication-related**: something about the request or the exchange is wrong.
- `80h–FFh` — a **specific condition**: a more exact reason than `22h` (e.g. `92h`, voltage too high).
jp: カタログは平坦な一覧ではありません。コードは `00h`〜`FFh` の1バイトで、その範囲は3つの帯に分かれます ― 帯が理由の*種類*を教えます：

- `00h` ― 拒否ではない：「異常なし」を表す値で、拒否に使われないよう予約されている。
- `01h–7Fh` ― **通信関連**：リクエストややり取りのどこかが正しくない。
- `80h–FFh` ― **特定の条件**：`22h` より正確な理由（例：`92h`、電圧が高すぎる）。
--
en: Some reasons are so basic that nearly every service can return them — `11h` unknown service, `13h` wrong length, `78h` still working. The standard calls these **generally supported by every service**.

Others are specific to what a service does. There is no rigid "every service must support exactly these" list — but a core of general codes turns up again and again.
jp: 一部の理由はとても基本的で、ほぼどのサービスも返せます ― `11h` 未対応サービス、`13h` 長さ違い、`78h` まだ処理中。規格はこれらを**どのサービスでも概ねサポートされる**と述べます。

ほかは、そのサービスの働きに固有です。「すべてのサービスがちょうどこれらを持たねばならない」という厳密な一覧はありません ― けれども、共通コードの中核が繰り返し現れます。
--
en: So you never learn a separate table per service. Any refusal code reads the same way: the **band** tells you what kind of problem it is, then the number tells you exactly which — all from one shared catalog.

Next: which check inside the ECU produces which code. {{→ C3 · the structural gate}}
jp: だから、サービスごとに別の表を覚えることはありません。どの拒否コードも読み方は同じです：**帯**がどんな種類の問題かを教え、番号がどれかを正確に示します ― すべては1つの共通カタログから。

次は、ECU 内のどのチェックがどのコードを生むのか。{{→ C3 · 構造のゲート}}

## footer
:::reading
ISO 14229-1:2020 | Annex A.1, Table A.1 | The single catalogue defining all NRCs; range split 00h (positiveResponse, server-internal) · 01h–7Fh (communication-related) · 80h–FFh (specific conditions, a more precise 22h)
ISO 14229-1:2020 | Annex A.1 (NRC 21h note) | Some NRCs are "in general supported by each diagnostic service" — the honest basis for a generic set (no formally mandated set)
ISO 14229-1:2020 | Annex A.1 | Key codes — 10h generalReject · 11h serviceNotSupported · 12h subFunctionNotSupported · 13h incorrectMessageLengthOrInvalidFormat · 14h responseTooLong · 22h conditionsNotCorrect · 31h requestOutOfRange · 33h securityAccessDenied · 78h responsePending · 7Eh/7Fh …InActiveSession · 92h/93h voltageTooHigh/Low (23h is reserved, not an NRC)
:::
