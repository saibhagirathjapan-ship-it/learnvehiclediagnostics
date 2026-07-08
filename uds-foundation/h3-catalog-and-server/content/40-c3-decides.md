---
id: c3
type: concept
order: 40
section: { n: "H3", en: "What UDS can do, and how the ECU decides", jp: "UDSに何ができ、ECUがどう決めるか" }
title:
  en: "The ECU decides: serve or refuse"
  jp: "ECUが決める ― 実行するか、断るか"
short: { en: "Serve or refuse", jp: "実行か、拒否か" }
illustration: figures/h3-c3-f1_decide-serve-or-refuse.svg
caption:
  en: "**The ECU vets every request before it acts.** Right session? Unlocked, if the service needs it? A request it supports? Every check passes → it serves. One fails → it refuses, with a negative reply."
  jp: "**ECUは動く前に、どの要求も吟味します。** 正しいセッションか？サービスが要るならロック解除済みか？対応する要求か？すべて通れば実行。1つ外れれば ― 否定応答で ― 断ります。"
legs:
  - id: gates
    title: { en: "The two gates — session and security", jp: "2つの門 ― セッションとセキュリティ" }
  - id: refusal
    title: { en: "Where a “no” is born", jp: "「いいえ」が生まれる場所" }
---

## bar
:::en
An ECU does not carry out every request it receives. Before it acts, it **decides** — it holds the request up against its own state and checks three things:

- Is it in the **right session** for this service?
- Is it **unlocked**, if the service is a protected one?
- Is the request **valid** — a service the ECU supports, in the right form?
:::
:::jp
ECUは、受け取った要求を何でも実行するわけではありません。動く前に**決めます** ― 要求を自分の状態に照らし、3つを確かめます：

- このサービスに**正しいセッション**か？
- サービスが保護されているなら、**ロック解除**済みか？
- 要求は**妥当**か ― ECUが対応するサービスで、正しい形か？
:::

:::en
If every check passes, the ECU serves the request and sends the positive reply. If any check fails, it **refuses** — and a refusal is exactly the **negative response** from H2: `7F`, the requested SID, and one reason code. The "no" is a decision the ECU makes inside itself — not a glitch on the wire.
:::
:::jp
すべての確認が通れば、ECUは要求を実行し、肯定応答を送ります。1つでも外れれば**断ります** ― その拒否こそ、H2で見た**否定応答**です：`7F`、要求されたSID、そして理由コード1つ。「いいえ」は、ECUが自分の中で下す決定です ― 回線上の不具合ではありません。
:::

## leg:gates
:::en
Two of those checks are **gates** — deliberate barriers a service can sit behind. You have met both: sessions in H2, security a moment ago.

- **Session** — the ECU starts in its everyday **default session**. Some services open only after the tester switches it to a non-default session, such as *extended* or *programming*. {{→ V5 · sessions}}
- **Security** — the guard from the last card. The most dangerous services need its **unlock** (`$27`) on top of the right session — the ECU sets a puzzle, and opens only on the right answer. {{→ M4 · security & access}}
:::
:::jp
そのうち2つの確認は**門**です ― サービスが控える、意図的な関門。どちらも出会っています：セッションはH2で、セキュリティはついさきほど。

- **セッション** ― ECUはふだんの**デフォルトセッション**で始まります。一部のサービスは、テスターが*拡張*や*プログラミング*などの非デフォルトセッションに切り替えて初めて開きます。{{→ V5 · セッション}}
- **セキュリティ** ― 前カードの門番です。最も危険なサービスは、正しいセッションに加えてその**ロック解除**（`$27`）が要ります ― ECUは問題を出し、正しい答えのときだけ開きます。{{→ M4 · セキュリティとアクセス}}
:::

:::figure src=figures/h3-c3-f2_two-gates.svg
en: **The gate matches the risk.** Reading a value is harmless and open to all. Reprogramming needs a non-default session *and* an unlock — so it can only happen on purpose.
jp: **門は危険度に見合っています。** 値を読むのは無害で、誰にでも開いています。再プログラミングは非デフォルトセッション*と*ロック解除が要り ― 意図したときにしか起きません。
:::

:::en
Why gate at all? **Safety.** A car on the road must not have its software rewritten, or a part forced to move, by accident. Harmless jobs — reading a value or a fault — stay open in the everyday session; risky jobs sit behind one or both gates, so they only happen on purpose.
:::
:::jp
そもそも、なぜ門を設けるのか。**安全**のためです。走行中の車が、うっかりソフトを書き換えられたり、部品を無理に動かされたりしてはなりません。無害な仕事 ― 値や故障を読む ― はふだんのセッションで開いており、危険な仕事は片方または両方の門の内側にあって、意図したときにしか起きません。
:::

## leg:refusal
:::en
The ECU always checks **before** it works. It validates the request first — supported? right session? unlocked? — and only if every check passes does it run the job. If a check fails, the ECU stops there and answers with the reason for that failure. So every "no" is settled before any real work, inside the server. What that check sequence looks like, step by step, is its own drill. {{→ V9 · inside the server}}
:::
:::jp
ECUは、働く**前に**必ず確かめます。まず要求を検証し ― 対応しているか？正しいセッションか？解錠済みか？ ― すべて通ったときだけ仕事を実行します。確認が外れれば、ECUはそこで止まり、外れた理由を返します。だから、どの「いいえ」も、実際の作業の前に、サーバーの中で決着します。その確認の手順を1段ずつ見るのは、専用のドリルです。{{→ V9 · サーバーの内部}}
:::

:::figure src=figures/h3-c3-f3_no-is-born.svg
en: **Check first, work second.** The ECU validates a request before it acts. A failed check is where the negative reply — the "no, and here is why" — is born, never on the wire.
jp: **まず確認、それから作業。** ECUは動く前に要求を検証します。確認が外れた場所こそ、否定応答 ― 「いいえ、理由はこれです」 ― が生まれる場所で、回線上ではありません。
:::

:::en
- {key} The ECU's answer is a decision, not a reflex: it checks first, then serves or refuses — and every "no" carries the reason with it.
:::
:::jp
- {key} ECUの答えは反射ではなく、決定です：まず確かめ、それから実行するか断る ― そしてどの「いいえ」も、理由を連れて返ります。
:::

## footer
:::reading
ISO 14229-1:2020 | cl.10.2 | DiagnosticSessionControl — a service may require a non-default session
ISO 14229-1:2020 | cl.10.4 | SecurityAccess — a service may require the server to be unlocked
ISO 14229-1:2020 | cl.8.7.2, Figure 5 | The server validates a request before executing the service; a failed check yields a negative response
:::
