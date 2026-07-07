---
id: c7
type: concept
order: 80
section: { n: "H2", en: "The life of one request", jp: "1つのリクエストの一生" }
title:
  en: "The life of a session — open, hold, close"
  jp: "セッションの一生 ― 開き、保ち、閉じる"
short: { en: "Session life", jp: "セッションの一生" }
illustration: figures/h2-c7-f1_session-life.svg
caption:
  en: "**Open · hold · close.** A non-default session must be fed `$3E` to stay alive; it ends either by an `$11` reset or by falling silent (timeout) — both return to the default session with security re-locked."
  jp: "**開く・保つ・閉じる。** 非デフォルトのセッションは `$3E` を与えて生かす必要があり、`$11` リセットか沈黙（タイムアウト）で終わる ― どちらもデフォルトへ戻り、セキュリティは再ロック。"
legs:
  - id: ends
    title: { en: "Two ways it ends — both land at default", jp: "終わり方は2通り ― どちらもデフォルトへ" }
---

## bar
:::en
The last two cards — `$3E` and `$11` — are really two moments in **one story**: the **life of a session**. It opens, it must be **held open**, and it ends — always back at the safe **default**.
:::
:::jp
直前の2枚 ― `$3E` と `$11` ― は、実は**1つの物語**の2つの場面です：**セッションの一生**。開き、**保ち続け**ねばならず、そして終わる ― いつも安全な**デフォルト**へ戻って。
:::

:::en
- **Open** — `$10` switches to a non-default session (the round trip we traced earlier).
- **Hold** — feed it `$3E` before the clock runs out, or it lapses back to default on its own.
- {key} **Close** — an `$11` reset, or a silent timeout. Either way: **default session, security locked.**
:::
:::jp
- **開く** ― `$10` が非デフォルトのセッションに切り替える（先に追った往復がそれ）。
- **保つ** ― 時計が切れる前に `$3E` を与える。さもないと自然にデフォルトへ戻る。
- {key} **閉じる** ― `$11` リセット、または無言のタイムアウト。いずれも：**デフォルトセッション、セキュリティはロック。**
:::

## leg:ends
:::en
There are exactly two ways a session ends, and they arrive at the **same** place:
:::
:::jp
セッションの終わり方はちょうど2通りで、どちらも**同じ**場所に着きます：
:::

:::en
- **Explicit** — the tester asks for it: an `$11` reset, or a `$10` back to default.
- **Implicit** — the tester simply falls silent and the idle clock runs out (a timeout).
- {key} Both leave the ECU in the **default** session with **security re-locked**. The states themselves are a drill of their own {{→ V5 · sessions}}, and the clock behind the timeout is another {{→ V6 · timing}}.
:::
:::jp
- **明示的** ― テスターが求める：`$11` リセット、または `$10` でデフォルトへ。
- **暗黙的** ― テスターが黙るだけで、待機時計が切れる（タイムアウト）。
- {key} どちらもECUを**デフォルト**セッション・**セキュリティ再ロック**の状態に残します。状態そのものは専用ドリルで {{→ V5 · セッション}}、タイムアウトの裏の時計はまた別で {{→ V6 · タイミング}}。
:::

## footer
:::reading
ISO 14229-1:2020 | cl.10.2 DiagnosticSessionControl (Fig 7) | Session lifecycle; two returns to default (explicit vs timeout)
ISO 14229-1:2020 | cl.10.3 ECUReset; cl.10.7 TesterPresent | The `$11` and `$3E` roles in a session's life
:::
