---
id: c3
type: concept
order: 40
section: { n: "V3", en: "Negative responses", jp: "否定応答" }
title:
  en: "Is this a real request?"
  jp: "これは本物のリクエストか？"
short: { en: "Real request?", jp: "本物か？" }
load_bearing: >
  The ECU checks a request in a fixed order and stops at the first check that fails, so the NRC names
  which check failed; the structural checks ask "is this a real, well-formed request?" — unknown
  service → 11h, unknown sub-function → 12h, wrong length/format → 13h.
derivation:
  - claim: "checks run in a fixed order; the first to fail names the NRC, and processing stops"
    why: "Dcm SWS_Dcm_01535 'shall only accept a request if the verifications have passed in the following order'; 14229-1 server-behaviour pseudo-code is ordered IF/ELSE stopping at the first failure — on-card: the gauntlet, first failing gate emits the code. Exact order/pipeline deferred to V9"
    clause: "ISO 14229-1:2020 cl.8.7.2 (Fig 5 / pseudo-code); AUTOSAR Dcm SWS_Dcm_01535"
  - claim: "unknown service → 11h, unknown sub-function → 12h, wrong length/format → 13h"
    why: "Annex A.1: 11h serviceNotSupported, 12h subFunctionNotSupported, 13h incorrectMessageLengthOrInvalidFormat — on-card: each structural gate labelled with its fail code"
    clause: "ISO 14229-1:2020 Annex A.1"
---

## story
fig: figures/v3-c3-f1_structural-gate.svg
en: A request reaches the ECU. Before it acts, the ECU runs the request past a line of checks, one after another, in a fixed order. It stops at the **first check that fails** — and that check picks the reason code.

So the `NRC` that comes back tells you exactly which check tripped.
jp: リクエストが ECU に届きます。動く前に、ECU はそのリクエストを一連のチェックに、決まった順で、次々と通します。**最初に失敗したチェック**で止まり ― そのチェックが理由コードを選びます。

だから返ってくる `NRC` は、どのチェックで引っかかったかを正確に教えます。
--
en: The first check is the most basic: is the `SID` a service this ECU actually has? If the number matches no service it supports, the ECU stops right there and answers `11h` — *serviceNotSupported*.

Nothing after this is even looked at.
jp: 最初のチェックは最も基本的です：その `SID` は、この ECU が実際に持つサービスか？　どのサービスにも一致しない番号なら、ECU はそこで止まり `11h` ― *serviceNotSupported*（サービス非対応）と答えます。

これより後は、見られることすらありません。
--
en: If the service is real, two more checks make sure the request is well-formed:

- Does the service's **sub-function** match one it knows? If not → `12h` *subFunctionNotSupported*.
- Is the message the right **length and shape** for that service? If not → `13h` *incorrectMessageLengthOrInvalidFormat*.

Each check runs only when the one before it has passed.
jp: サービスが本物なら、さらに2つのチェックがリクエストの形を確かめます：

- サービスの**サブファンクション**は、ECU が知るものと一致するか？　しなければ → `12h` *subFunctionNotSupported*。
- メッセージは、そのサービスにとって正しい**長さと形**か？　違えば → `13h` *incorrectMessageLengthOrInvalidFormat*。

各チェックは、前のチェックが通ったときだけ走ります。
--
en: Pass all three and the request is **real and well-formed** — the ECU understands exactly what is being asked.

But understanding a request is not the same as agreeing to do it. It can still be refused for *when*, or *whether*, it is allowed — the next gate. {{→ C4 · the permission gate}} *(The exact order of these checks inside the ECU is its own topic. {{→ V9 · inside the server}})*
jp: 3つすべてを通れば、リクエストは**本物で、正しい形**です ― ECU は何を求められているかを正確に理解します。

しかし、理解することと、実行に同意することは別です。*いつ*・*そもそも許されるか*で、まだ拒否され得ます ― それが次のゲートです。{{→ C4 · 許可のゲート}} *（これらのチェックの ECU 内部での正確な順序は、別の話題です。{{→ V9 · サーバーの内側}}）*

## footer
:::reading
ISO 14229-1:2020 | cl.8.7.2 (Fig 5) | General server response behaviour — the ordered request analysis, first failure returns its NRC
ISO 14229-1:2020 | Annex A.1 | 11h serviceNotSupported · 12h subFunctionNotSupported · 13h incorrectMessageLengthOrInvalidFormat
AUTOSAR Dcm | SWS_Dcm_01535 | The Dcm accepts a request only if the verifications pass in a defined order (the exact pipeline → V9)
:::
