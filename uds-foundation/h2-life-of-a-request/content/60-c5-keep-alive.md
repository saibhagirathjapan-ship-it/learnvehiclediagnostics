---
id: c5
type: concept
order: 60
section: { n: "H2", en: "The life of one request", jp: "1つのリクエストの一生" }
sid: "$3E"
title:
  en: "A session won't stay open by itself"
  jp: "セッションは放っておくと閉じる"
short: { en: "Keep-alive $3E", jp: "$3E で保つ" }
illustration: figures/h2-c5-f1_keep-alive.svg
caption:
  en: "**A non-default session runs an idle clock.** Each `$3E` the tester sends resets it; if `$3E` stops, the clock runs out and the ECU drops back to the default session, locked."
  jp: "**非デフォルトのセッションには待機時計が動く。** テスターが送る `$3E` ごとにリセットされ、`$3E` が止まると時計が切れてデフォルトへ戻り、ロックされます。"
legs:
  - id: clock
    title: { en: "The idle clock — why a session expires", jp: "待機時計 ― なぜセッションは切れるのか" }
  - id: broadcast
    title: { en: "One $3E for many ECUs at once", jp: "1つの $3E で多数のECUを同時に" }
---

## bar
:::en
The **Extended** session you just opened is not permanent. A **non-default session** — any mode past the plain power-up default — **times out** if the tester goes quiet. To hold it open, the tester sends a small **`$3E` TesterPresent** message now and then: a heartbeat that says "I'm still here." Each one resets the clock.
:::
:::jp
いま開いた**拡張**セッションは、ずっとは続きません。**非デフォルトのセッション** ― 電源投入時のデフォルトより先のモード ― は、テスターが黙ると**タイムアウト**します。開いたままにするには、テスターが小さな **`$3E` TesterPresent** メッセージをときどき送ります ― 「まだここにいる」という心拍です。1回ごとに時計がリセットされます。
:::

:::en
- {key} **`$3E` = "I'm still here."** It carries no real work — its only job is to reset the session's idle clock.
- Stop sending it and the session lapses on its own, back to the safe **default** — with anything you unlocked **re-locked**. {{→ V7c · why you keep a session alive}}
:::
:::jp
- {key} **`$3E` ＝「まだhere」。** 実際の作業は運びません ― 唯一の役目はセッションの待機時計をリセットすることです。
- 送るのをやめると、セッションは自然に安全な**デフォルト**へ戻り ― 解除したものは**再ロック**されます。{{→ V7c · なぜセッションを保つのか}}
:::

## leg:clock
:::en
Only **non-default** sessions run this clock; the default session never times out — it is the resting state. The clock has a name, **S3**, and a fixed budget of idle time. Any request on the session resets it, but if you're between requests, `$3E` is the cheapest way to keep feeding it.
:::
:::jp
この時計が動くのは**非デフォルト**のセッションだけです。デフォルトセッションはタイムアウトしません ― それが静止状態です。時計には **S3** という名前と、決まった待機時間の予算があります。セッション上のどの要求もそれをリセットしますが、要求の合間なら `$3E` が最も安く与え続ける手段です。
:::

:::key
en: The exact numbers — how long S3 is, client vs server — are a timing drill of their own {{→ V6 · timing & keep-alive}}.
jp: 具体的な数値 ― S3の長さ、クライアント対サーバー ― は専用のタイミングドリルで {{→ V6 · タイミングとキープアライブ}}。
:::

## leg:broadcast
:::en
A tester often has **many** ECUs in a non-default session at once — during a workshop job or a reflash. Rather than ping each one, it can send a single **broadcast** `$3E` that every ECU hears, keeping them all alive with one message. That broadcast form (and why it stays silent) is the subject of its own drill.
:::
:::jp
テスターはしばしば**多数**のECUを同時に非デフォルトのセッションに保ちます ― 整備作業や再書き込みの間など。1台ずつ突くのではなく、すべてのECUが聞く1つの**ブロードキャスト** `$3E` を送り、1メッセージで全員を生かせます。そのブロードキャスト形（そしてなぜ沈黙するか）は専用ドリルの主題です。
:::

:::key
en: The broadcast keep-alive and its use during a flash live in its service drill {{→ V7c · $3E TesterPresent}}.
jp: ブロードキャストのキープアライブと、フラッシュ中の使い方はサービスドリルで {{→ V7c · $3E テスタープレゼント}}。
:::

## footer
:::reading
ISO 14229-1:2020 | cl.10.7 TesterPresent (`$3E`) | Keeping a non-default session alive with a periodic message
ISO 14229-2:2021 | cl.9.5 (S3 timing) | The session-idle timer (S3): only non-default sessions time out
:::
