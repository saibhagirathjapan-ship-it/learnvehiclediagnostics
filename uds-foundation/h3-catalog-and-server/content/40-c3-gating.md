---
id: c3
type: concept
order: 40
section: { n: "H3", en: "What UDS can do, and how the ECU decides", jp: "UDSに何ができ、ECUがどう決めるか" }
title:
  en: "Not everything is offered at once"
  jp: "すべてが一度に差し出されるわけではない"
short: { en: "What's gated", jp: "何が制限されるか" }
illustration: figures/h3-c3-f1_two-gates.svg
caption:
  en: "**Two gates stand in front of the risky services.** A service may need a non-default *session*, a security *unlock*, or both, before the ECU will provide it."
  jp: "**危険なサービスの前には、2つの門があります。** サービスによっては、非デフォルトの*セッション*、セキュリティの*ロック解除*、またはその両方が要ります。"
legs:
  - id: why
    title: { en: "Why gate at all — safety", jp: "なぜ制限するのか ― 安全" }
---

## bar
:::en
Earlier we saw that the ECU serves a request *only if it is in the right state*. Here is what that state is. Many services are **gated** — the ECU will not provide them in its everyday condition. Two gates stand in the way:
:::
:::jp
先ほど、ECUは*正しい状態にあるときだけ*要求を実行する、と見ました。その「状態」とは何かを、ここで見ます。多くのサービスは**制限**されています ― ふだんの状態では、ECUが差し出しません。前に立ちはだかる門は2つです：
:::

:::en
- **Session** — the ECU starts in its everyday **default session**. Some services open only after the tester switches it to a non-default session, such as *extended* or *programming*. You met sessions in H2. {{→ V5 · sessions}}
- **Security** — the most dangerous services need a security **unlock** on top of the session. The ECU sets a puzzle (a *challenge*); it unlocks only if the tester sends back the right answer (`$27`). {{→ M4 · security & access}}
:::
:::jp
- **セッション** ― ECUはふだんの**デフォルトセッション**で始まります。一部のサービスは、テスターが*拡張*や*プログラミング*などの非デフォルトセッションに切り替えて初めて開きます。セッションはH2で出会いました。{{→ V5 · セッション}}
- **セキュリティ** ― 最も危険なサービスは、セッションに加えて、セキュリティの**ロック解除**が要ります。ECUは問題（*チャレンジ*）を出し、テスターが正しい答えを返したときだけ解錠します（`$27`）。{{→ M4 · セキュリティとアクセス}}
:::

:::en
So "which services are on offer" is not fixed. It depends on where the ECU is: which session it holds, and whether it is unlocked.
:::
:::jp
つまり「どのサービスが差し出されているか」は固定ではありません。ECUがどこにいるか ― どのセッションを保ち、ロックが解かれているか ― で決まります。
:::

## leg:why
:::en
Why put gates in the way at all? **Safety.** A car on the road must not have its software rewritten, or a part forced to move, by accident or by a careless request.
:::
:::jp
そもそも、なぜ門を設けるのか。**安全**のためです。走行中の車が、うっかりした要求や不注意で、ソフトを書き換えられたり、部品を無理に動かされたりしてはなりません。
:::

:::figure src=figures/h3-c3-f2_why-gate.svg
en: **The gate matches the risk.** Reading a value is harmless and open to all. Reprogramming needs a non-default session *and* an unlock — so it can only happen on purpose.
jp: **門は危険度に見合っています。** 値を読むのは無害で、誰にでも開いています。再プログラミングは非デフォルトセッション*と*ロック解除が要り ― 意図したときにしか起きません。
:::

:::en
- Harmless jobs — reading a value, reading a fault — are open in the everyday session.
- Risky jobs — reprogramming, forcing an output — sit behind one or both gates, so they only happen on purpose.
:::
:::jp
- 無害な仕事 ― 値を読む、故障を読む ― は、ふだんのセッションで開いています。
- 危険な仕事 ― 再プログラミング、出力の強制 ― は、片方または両方の門の内側にあり、意図したときにしか起きません。
:::

## footer
:::reading
ISO 14229-1:2020 | cl.10.2 | DiagnosticSessionControl — services may require a non-default session
ISO 14229-1:2020 | cl.10.4 | SecurityAccess — services may require the server to be unlocked
:::
