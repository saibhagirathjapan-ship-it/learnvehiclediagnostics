---
id: c2
type: concept
order: 30
section: { n: "H2", en: "The life of one request", jp: "1つのリクエストの一生" }
title:
  en: "One request, one of two answers"
  jp: "1つの要求に、2つのうち1つの答え"
short: { en: "Two answers", jp: "2つの答え" }
illustration: figures/c2-two-answers.svg
caption:
  en: "**Same question, two possible replies.** A positive `50 03` (yes), or a negative `7F 10 22` (no — with a reason). Never both, never neither."
  jp: "**同じ問い、返り得る答えは2つ。** 肯定 `50 03`（はい）か、否定 `7F 10 22`（いいえ ― 理由つき）。両方も、どちらもなしも、ありません。"
legs:
  - id: positive
    title: { en: "The positive reply — a \"yes\" that echoes you (+0x40)", jp: "肯定応答 ― あなたを反射する「はい」（+0x40）" }
  - id: negative
    title: { en: "The negative reply — a \"no\" with a reason code", jp: "否定応答 ― 理由コードつきの「いいえ」" }
---

## bar
:::en
How do you know your request even worked? The ECU tells you. It serves the request, then answers in **exactly one** of two ways — never a third, and never silence *(unless you asked it to stay quiet — the flag from C1)*.
:::
:::jp
要求が本当に通ったか、どう分かるのでしょう？ ECUが教えてくれます。要求を処理し、**ちょうど2通りのうち1つ**で答えます ― 3つ目はなく、沈黙もありません*（C1の旗で「黙って」と頼んだ場合を除く）*。
:::

:::en
- {key} **Positive — "yes, done."** The reply echoes the service, but with the SID **plus `0x40`**. So a request `$10` comes back as `$50`. That `+0x40` is how you know it worked.
- **Negative — "no, and here's why."** Always three bytes: **`7F`** (the "no" marker), then **your SID** echoed back, then one **Negative Response Code (NRC)** — a number that gives the reason.
:::
:::jp
- {key} **肯定 ―「はい、完了」。** 応答はサービスを反射しますが、SIDに **`0x40` を足します**。だから要求 `$10` は `$50` で返ります。この `+0x40` が「成功」の合図です。
- **否定 ―「いいえ、理由はこれ」。** 常に3バイト：**`7F`**（「いいえ」の印）、次に**あなたのSID**の反射、最後に1つの **否定応答コード（NRC）** ― 理由を表す数値。
:::

## leg:positive
:::en
Why `0x40`? The SID's **bit 6** is the "this is a response" flag. Adding `0x40` sets that one bit — nothing else moves. So the service number stays perfectly readable inside the reply:
:::
:::jp
なぜ `0x40`？ SIDの**ビット6**が「これは応答」の旗です。`0x40` を足すとそのビット1つだけが立ち、他は動きません。だからサービス番号は応答の中でもそのまま読めます：
:::

:::bytes
10 | request SID | sid
+ 40 | set bit 6 |
50 | positive SID | pos
:::

:::en
- Read it back the same way: see `0x50`? Subtract `0x40` → `$10`. It answered your session request.
- The rest of the reply is the **result** — for `$10`, the session it switched to, plus its timing.
:::
:::jp
- 逆も同じ読み方：`0x50` を見たら `0x40` を引く → `$10`。あなたのセッション要求への答えです。
- 応答の残りは**結果**です ― `$10` なら、切り替えたセッションと、そのタイミング。
:::

## leg:negative
:::en
A "no" is never just a refusal — it always carries a **reason**. Say you ask to switch session while the ECU is busy and can't right now: back comes `7F 10 22`. The shape never changes:
:::
:::jp
「いいえ」は単なる拒否ではありません ― 必ず**理由**を伴います。たとえばECUが忙しくて今は切り替えられないときにセッション切替を頼むと、`7F 10 22` が返ります。形は決して変わりません：
:::

:::figure src=figures/c2-negative-shape.svg
en: **Three bytes, always.** `7F` says "negative"; the middle byte echoes the service you asked for; the last byte is the reason code (NRC).
jp: **常に3バイト。** `7F` が「否定」、中央のバイトが要求したサービスの反射、最後のバイトが理由コード（NRC）。
:::

:::en
- Here `22` = **conditionsNotCorrect** ("not right now"). The NRC is drawn from **one shared list** used by every service — e.g. `11` serviceNotSupported, `33` securityAccessDenied (**security** = a lock that guards the most powerful services {{→ M4 · security access}}).
- Because your SID is echoed in the middle, you always know **which** request was refused.
- The full catalogue of reasons is its own drill {{→ V3 · the NRC catalogue}}.
:::
:::jp
- ここで `22` は **conditionsNotCorrect**（条件不成立＝「今はだめ」）。NRCは全サービス共通の**1つのリスト**から取られます ― 例：`11` サービス非対応、`33` セキュリティ拒否（**セキュリティ**＝最も強力なサービスを守る鍵 {{→ M4 · セキュリティアクセス}}）。
- SIDが中央に反射されるので、**どの**要求が断られたか常に分かります。
- 理由の全カタログは専用ドリルで {{→ V3 · NRCカタログ}}。
:::

## footer
:::reading
ISO 14229-1:2020 | cl.8.4, Table 2 | Positive response = request SID with bit 6 set (SID + 0x40)
ISO 14229-1:2020 | cl.8.5 A_NR_SI; cl.8.6, Table 3 | Negative response = `7F` + echoed SID + NRC
ISO 14229-1:2020 | Annex A.1 | The single shared catalogue of negative response codes (NRC)
:::
