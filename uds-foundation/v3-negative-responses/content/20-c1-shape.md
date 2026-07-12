---
id: c1
type: concept
order: 20
section: { n: "V3", en: "Negative responses", jp: "否定応答" }
title:
  en: "The shape of a no — marker, which, why"
  jp: "「いいえ」の形 ― 印・どれ・なぜ"
short: { en: "The shape of a no", jp: "「いいえ」の形" }
load_bearing: >
  A refusal starts with 7Fh — not the request's SID+40h — so the very first byte tells you the
  answer is no; the SID is then echoed to say which request, and one NRC byte says why.
derivation:
  - claim: "byte 1 = 7Fh marks a refusal, not a service"
    why: "A_PCI format is identified by the first byte; 7F16 selects the negative-response format; A_NR_SI is a fixed reserved 7F16 — on-card: byte 1 read first, 7F vs 50"
    clause: "ISO 14229-1:2020 cl.8.3, cl.8.5"
  - claim: "byte 2 = echoed request SID → which"
    why: "cl.8.6: the second byte is a copy of the SID from the request — on-card: 10h reappears from the request"
    clause: "ISO 14229-1:2020 cl.8.6"
  - claim: "byte 3 = NRC → why"
    why: "cl.8.6: responseCode indicates why the service failed; values in Annex A.1 — on-card: 22h = conditionsNotCorrect"
    clause: "ISO 14229-1:2020 cl.8.6, Annex A.1"
  - claim: "a yes packs type+which via +40h; a no uses a fixed 7Fh marker + echoed SID + NRC"
    why: "DESCRIPTIVE, not causal: 7Fh is a single reserved value meaning negative for every service (cl.8.5); it doesn't name the service, so SID echoed (cl.8.6) + NRC (A.1). Grounded payoff = any refusal is readable from byte 1 (cl.8.3). The 'three facts REQUIRE three bytes' rationale is NOT claimed — no cited design rationale exists (web-checked 2026-07-11); the user's bit-6-exhaustion synthesis is also uncited, so both dropped."
    clause: "cl.8.3, cl.8.5, cl.8.6, Annex A.1 (facts only; no rationale claim)"
---

## story
fig: figures/v3-c1-f1_shape-of-no.svg
en: A positive answer had to say two things at once — *yes*, and *which* service. It packed both into one byte: the request `10h` came back as `50h`.

A refusal has more to say. It must carry three things: **no**, *which* request, and *why*.
jp: 肯定の答えは、2つのことを同時に言う必要がありました ― *はい*、そして*どの*サービスか。それを1バイトにまとめました：リクエストの `10h` は `50h` になって返りました。

拒否には、もっと言うことがあります。**いいえ**・*どの*リクエストか・*なぜ* の3つを運ばねばなりません。
--
en: Can one clever byte still do that? No — and the first byte shows why. Every refusal, for every service, begins with the very same byte: **`7Fh`**.

`7Fh` is not a service number. It is one reserved value that means only *this reply is a no*. So the first byte alone tells you the answer is negative — before you read anything else.
jp: それでも、1つの巧いバイトでできるでしょうか？　いいえ ― そして先頭バイトがその理由を示します。どのサービスでも、拒否は必ず同じバイトで始まります：**`7Fh`**。

`7Fh` はサービス番号ではありません。ただ*この応答はノー*を意味する、予約された1つの値です。だから先頭バイトを見るだけで、ほかを読む前に、答えが否定だと分かります。
--
en: But `7Fh` says *no* without saying *no to what*. So the second byte fills that in: it is the request's own **service identifier**, copied straight back.

Here that is `10h` — the session-change request. The echo names **which** request the ECU is turning down.
jp: しかし `7Fh` は*ノー*とは言っても、*何に対するノーか*は言いません。そこで2バイト目がそれを補います：リクエスト自身の**サービス識別子**を、そのまま返したものです。

ここでは `10h` ― セッション変更のリクエストです。このエコーが、ECU が断っている**どの**リクエストかを示します。
--
en: The third byte is the reason: a **negative response code (NRC)** — a single number that says *why*.

Here it is `22h`, *conditionsNotCorrect* — the ECU will not switch right now because a required condition is not met (for instance, it is busy with a critical task). One byte, one reason. The full list of these codes is presented next. {{→ C2 · the one catalog of reasons}}
jp: 3バイト目は理由です ― **否定応答コード（NRC）**、*なぜ*を表す1つの数値です。

ここでは `22h`、*conditionsNotCorrect*（条件不成立）― 必要な条件が今は満たされていないため、ECU は切り替えません（例：重要な処理で手がふさがっている）。1バイトで1つの理由。これらのコードの全リストは次で示します。{{→ C2 · 理由の唯一のカタログ}}
--
fig: figures/v3-c1-f2_three-vs-one.svg
en: A *yes* and a *no* are put together differently. A *yes* packs both its facts into one byte: `+40h` marks it *positive*, and the service is still there underneath — subtract `40h` and the request comes back.

A *no* uses one fixed value instead: **`7Fh`** means only *negative*, the same for every service. It does not name the service, so the **SID is echoed** for *which* and the **NRC** added for *why* — and every refusal ends up the same shape, spotted from the first byte alone.
jp: *はい*と*いいえ*は、組み立て方が違います。*はい*は2つの事実を1バイトに詰めます：`+40h` が*肯定*だと示し、サービスはその下にそのまま残ります ― `40h` を引けばリクエストが戻ります。

*いいえ*は、代わりに1つの固定値を使います：**`7Fh`** はただ*否定*を意味し、どのサービスでも同じです。サービスを名指ししないので、*どれ*のために **SID がエコーされ**、*なぜ*のために **NRC** が足されます ― こうしてどの拒否も同じ形になり、先頭バイトだけで見分けられます。

## footer
:::reading
ISO 14229-1:2020 | cl.8.3 | A_PCI format is identified by the first byte; first byte = 7F16 selects the negative-response format
ISO 14229-1:2020 | cl.8.5 | A_NR_SI — the negative response service identifier, a fixed 7F16
ISO 14229-1:2020 | cl.8.6, Table 3 | Negative response = 7F + a copy of the request SID + the responseCode (NRC)
ISO 14229-1:2020 | Annex A.1 | NRC values (22h = conditionsNotCorrect)
:::
