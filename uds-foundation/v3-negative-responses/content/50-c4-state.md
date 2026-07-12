---
id: c4
type: concept
order: 50
section: { n: "V3", en: "Negative responses", jp: "否定応答" }
title:
  en: "Real — but allowed now?"
  jp: "本物 ― でも今、許される？"
short: { en: "Allowed now?", jp: "今、許される？" }
load_bearing: >
  A real, well-formed request can still be refused by state or permission, and the code says which
  kind: 7Fh/7Eh mean the service/sub-function exists but not in this session (unlike 11h/12h = no such
  thing at all), 33h locked or 24h wrong order, and 31h "not that value" vs 22h "not now".
derivation:
  - claim: "7Fh/7Eh = exists but not in active session; contrast 11h/12h = no such thing at all"
    why: "A.1: 7Fh serviceNotSupportedInActiveSession / 7Eh subFunctionNotSupportedInActiveSession — the service/sub-fn is supported but not in the active session; 11h/12h = not supported at all — on-card: the left-vs-right confused-pair rows"
    clause: "ISO 14229-1:2020 Annex A.1 (7Fh/7Eh/11h/12h)"
  - claim: "31h 'not that' vs 22h 'not now'"
    why: "A.1: 31h requestOutOfRange = a parameter value beyond range OR an unsupported DID/RID ('not that'); 22h conditionsNotCorrect = prerequisite conditions not met ('not now') — on-card: the third confused-pair row"
    clause: "ISO 14229-1:2020 Annex A.1 (31h/22h)"
  - claim: "33h locked (security), 24h wrong order (key before seed) — both point to M4"
    why: "A.1: 33h securityAccessDenied = security strategy not satisfied; 24h requestSequenceError = wrong order, example given is SecurityAccess seed/key — on-card: the security row, {{→ M4}}"
    clause: "ISO 14229-1:2020 Annex A.1 (33h/24h)"
---

## story
fig: figures/v3-c4-f1_permission-gate.svg
en: The request passed the structural checks — the ECU understands exactly what is being asked. But understanding a request is not the same as agreeing to do it.

The ECU can still refuse: the service is not available in this state, you are not allowed yet, or this is not the moment. This is the second gate — **will I do it now?**
jp: リクエストは構造のチェックを通りました ― ECU は何を求められているかを正確に理解しています。しかし、理解することと、実行に同意することは別です。

ECU はまだ拒否できます：その状態ではサービスが使えない、まだ許可されていない、あるいは今はその時ではない。これが2つ目のゲート ― **今、それをやるか？** です。
--
en: The trickiest no's look like the structural ones — but mean something different.

- `7Fh` — the service **exists**, just not in the active session.
- `7Eh` — the same for the sub-function.

Compare: `11h`/`12h` mean "no such thing **at all**"; `7Fh`/`7Eh` mean "it is there — switch to the right session first."
jp: 最もまぎらわしい拒否は、構造のものに似ています ― けれど意味は違います。

- `7Fh` ― サービスは**存在する**、ただし今のセッションでは使えない。
- `7Eh` ― サブファンクションについて同じ。

比べてみましょう：`11h`/`12h` は「そんなものは**まったくない**」。`7Fh`/`7Eh` は「それはある ― まず正しいセッションに切り替えて」。
--
en: The same idea returns as a second pair — this time about the *value*, not the session.

- `31h` *requestOutOfRange* — **not that**: the value or ID is not one the ECU accepts.
- `22h` *conditionsNotCorrect* — **not now**: the request is fine, but the moment is not right.

One is about *what* you asked; the other about *when*.
jp: 同じ考えが2組目として戻ってきます ― 今度はセッションではなく*値*について。

- `31h` *requestOutOfRange* ― **それは違う**：その値や ID は、ECU が受け付けるものではない。
- `22h` *conditionsNotCorrect* ― **今はだめ**：リクエスト自体は正しいが、今はその時ではない。

一方は*何を*頼んだか、もう一方は*いつ*か、の話です。
--
en: Two more state refusals round out the gate, and both are about **security**:

- `33h` — the ECU is **locked**; its security has not been satisfied. Unlock it first.
- `24h` — the steps came in the **wrong order**, such as sending the key before asking for the seed.

You meet the unlock sequence itself later. {{→ M4 · security access}}
jp: あと2つの状態拒否がこのゲートを締めくくります。どちらも**セキュリティ**に関わります：

- `33h` ― ECU が**ロック**されている。セキュリティが満たされていない。まず解錠する。
- `24h` ― 手順の**順序が違う**。たとえばシードを要求する前にキーを送るなど。

解錠の手順そのものは、後で出会います。{{→ M4 · セキュリティアクセス}}

## footer
:::reading
ISO 14229-1:2020 | Annex A.1 | 7Fh serviceNotSupportedInActiveSession · 7Eh subFunctionNotSupportedInActiveSession (exists, not in active session) vs 11h/12h (not supported at all)
ISO 14229-1:2020 | Annex A.1 | 31h requestOutOfRange (value beyond range or unsupported DID/RID) · 22h conditionsNotCorrect (prerequisite conditions not met)
ISO 14229-1:2020 | Annex A.1 | 33h securityAccessDenied (security strategy not satisfied) · 24h requestSequenceError (wrong order, e.g. SecurityAccess seed/key) — the mechanism is M4
:::
