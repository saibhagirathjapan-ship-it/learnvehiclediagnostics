---
id: c5
type: concept
order: 60
section: { n: "H3", en: "What UDS can do, and how the ECU decides", jp: "UDSに何ができ、ECUがどう決めるか" }
title:
  en: "Inside the ECU — four stages to an answer"
  jp: "ECUの中 ― 答えまでの4段階"
short: { en: "The 4 stages", jp: "4つの段階" }
illustration: figures/h3-c5-f1_four-stages.svg
caption:
  en: "**A request crosses four stages before the ECU acts.** Route it, check the link and session, decide accept-or-reject, then do the job. The first three are checks; only the last does the work."
  jp: "**要求は、ECUが動く前に4つの段階を越えます。** 経路を定め、接続とセッションを確かめ、受理か拒否かを決め、そして仕事をする。最初の3つは確認で、実際に動くのは最後だけです。"
legs:
  - id: names
    title: { en: "The plain stages, and their real names", jp: "平易な段階と、その正式名" }
  - id: boundary
    title: { en: "Where accept ends and doing begins", jp: "受理が終わり、実行が始まる境目" }
---

## bar
:::en
We have the menu and its address spaces. The last part of the picture is how the ECU **decides**. When a request arrives, its software runs it through **four stages**, in order:
:::
:::jp
メニューと、そのアドレス空間は揃いました。全体像の最後は、ECUがどう**決める**かです。要求が届くと、ECUのソフトウェアはそれを**4つの段階**に、順に通します：
:::

:::en
1. **Route** — get the message to the part of the software that handles diagnostics.
2. **Check the link** — is the connection and session in order?
3. **Decide** — is this request allowed and well-formed right now? **Accept or reject.**
4. **Do the job** — carry the request out, and build the answer.
:::
:::jp
1. **経路** ― メッセージを、診断を扱うソフトウェア部分へ届けます。
2. **接続を確認** ― 接続とセッションは整っているか？
3. **判断** ― この要求は今、許され、正しい形をしているか？ **受理か拒否か。**
4. **仕事** ― 要求を実行し、答えを組み立てます。
:::

:::en
The first three stages are checks. The ECU does no real work until stage four. Stages two and three are where the two gates from earlier — the right session, the unlock — are enforced. A rejection here is where a **negative** answer comes from — the "no, and here is why" you already know.
:::
:::jp
最初の3段階は確認です。ECUは4段階目まで、実際の作業をしません。2段階目と3段階目こそ、先ほどの2つの門 ― 正しいセッション、ロック解除 ― が課される場所です。ここでの拒否が、**否定**応答の生まれる場所です ― すでに知っている「いいえ、理由はこれです」です。
:::

## leg:names
:::en
Those plain names have real ones. The routing is done by a **PduR** (a router); the link and session checks by the **DSL**; the accept-or-reject decision by the **DSD**; the work by the **DSP**. Together they are the ECU's diagnostic software, the **Dcm**.
:::
:::jp
これらの平易な名前には、正式名があります。経路は **PduR**（ルーター）、接続とセッションの確認は **DSL**、受理・拒否の判断は **DSD**、作業は **DSP** が担います。まとめて、ECUの診断ソフトウェア、**Dcm** です。
:::

:::figure src=figures/h3-c5-f2_pipeline-names.svg
en: **The four stages, with their real names.** PduR routes → DSL checks the link → DSD accepts or rejects → DSP does the job. You do not need the names yet — just the order.
jp: **4つの段階と、その正式名。** PduRが経路 → DSLが接続確認 → DSDが受理・拒否 → DSPが仕事。名前はまだ覚えなくてよく ― 順序だけで十分です。
:::

:::en
- {key} You do not need these names yet — the order is the point. Their inner workings are a card of their own. {{→ V9 · inside the server}}
:::
:::jp
- {key} これらの名前はまだ覚えなくてよく ― 順序が要点です。その内部は、専用のカードにあります。{{→ V9 · サーバーの内部}}
:::

## leg:boundary
:::en
There is one line that matters most: the line between **decide** and **do**. Up to the third stage, the ECU only checks. The moment it accepts, it hands the request on to be carried out. Everything before that line is common to every service; what happens after depends on the service you asked for.
:::
:::jp
最も大事な線が1つあります ― **判断**と**実行**の間の線です。3段階目までは、ECUは確認するだけ。受理した瞬間、要求は実行へ引き渡されます。その線より前はどのサービスも共通で、その後に起きることは、頼んだサービス次第です。
:::

:::figure src=figures/h3-c5-f3_accept-boundary.svg
en: **Accept, then execute.** The checks (route · link · decide) are the same for every service; only after "accept" does the work differ by service.
jp: **受理してから実行。** 確認（経路・接続・判断）はどのサービスも同じ。「受理」の後で初めて、作業がサービスごとに分かれます。
:::

## footer
:::reading
ISO 14229-1:2020 | cl.8.7.2, Figure 5 | Server behaviour: a request is validated before the service is executed
AUTOSAR Dcm (R25-11) | cl.7.1.1 | The Dcm realizes this as DSL (link) → DSD (dispatch/decide) → DSP (process/do)
:::
