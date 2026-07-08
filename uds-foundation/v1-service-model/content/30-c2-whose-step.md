---
id: c2
type: concept
order: 30
section: { n: "V1", en: "The service model", jp: "サービスモデル" }
title:
  en: "Who does each step"
  jp: "各ステップを誰が行うか"
short: { en: "Who does each", jp: "誰が行うか" }
illustration: figures/v1-c2-f1_owners.svg
caption:
  en: "**The tester brackets; the ECU serves.** The tester owns the opening (request) and the closing (confirmation). The ECU owns the middle — it hears the request (indication) and sends the answer (response). One side always asks first."
  jp: "**テスターが挟み、ECUが応える。** テスターは開始（リクエスト）と終了（確認）を担い、ECUは中間 ― リクエストを聞き（通知）、答えを送る（応答）― を担います。片側が必ず先に尋ねます。"
legs:
  - id: sides
    title: { en: "All six steps, sorted by side", jp: "6ステップすべてを、側ごとに分ける" }
    figure: figures/v1-c2-f2_by-side.svg
  - id: symmetry
    title: { en: "A symmetric shape, but not symmetric roles", jp: "形は対称、でも役割は非対称" }
    figure: figures/v1-c2-f3_symmetry.svg
---

## bar
:::en
The four steps have the same shape on both sides, but the two sides do very different jobs. Sort the steps by who owns them:
:::
:::jp
4つのステップは両側で同じ形をしていますが、2つの側が担う仕事はまるで違います。ステップを、誰のものかで分けてみます：
:::

:::en
- The **tester** owns **request** and **confirmation** — it opens the exchange, and it receives the final answer.
- The **ECU** owns **indication** and **response** — it is told of the request, and it sends the answer.
:::
:::jp
- **テスター**は**リクエスト**と**確認**を担います ― やり取りを開き、最後の答えを受け取ります。
- **ECU**は**通知**と**応答**を担います ― リクエストを知らされ、答えを送ります。
:::

:::en
There is a clear pattern. The tester **brackets** the exchange: it opens it (request) and closes it (confirmation). The ECU sits in the **middle**: it hears the request (indication), then serves it (response). One side always **asks first**; the other always **answers**. The ECU never speaks first.
:::
:::jp
はっきりした型があります。テスターはやり取りを**挟みます**：開いて（リクエスト）、閉じます（確認）。ECUは**中間**にいます：リクエストを聞き（通知）、それに応じます（応答）。片側は必ず**先に尋ね**、もう片側は必ず**答えます**。ECUが先に話すことはありません。
:::

## leg:sides
:::en
Add the two local "sent" signals from the last card and every step still belongs to exactly one side — each stays with whichever side just sent.
:::
:::jp
前のカードの、ローカルな2つの「送信済み」合図を加えても、どのステップもきっかり片側に属します ― それぞれ、ちょうど送った側にとどまります。
:::

:::figure src=figures/v1-c2-f2_by-side.svg
en: **Three each, no overlap.** The tester's side owns request, request-confirmation, and confirmation. The ECU's side owns indication, response, and response-confirmation. Every step has one home.
jp: **各3つ、重なりなし。** テスター側はリクエスト・リクエスト確認・確認を担い、ECU側は通知・応答・応答確認を担います。どのステップにも居場所は1つ。
:::

:::en
- The **tester's side**: request, request-confirmation, confirmation.
- The **ECU's side**: indication, response, response-confirmation.
:::
:::jp
- **テスター側**：リクエスト、リクエスト確認、確認。
- **ECU側**：通知、応答、応答確認。
:::

## leg:symmetry
:::en
Why give both sides matching, mirror-image steps, when only the tester ever starts and only the ECU ever does the work?
:::
:::jp
始めるのはいつもテスターだけ、仕事をするのはいつもECUだけなのに、なぜ両側に、鏡映しの対応するステップを与えるのでしょう？
:::

:::figure src=figures/v1-c2-f3_symmetry.svg
en: **The names mirror; the roles do not.** A general template gives both ends matching steps. UDS fills it in one way: the client (tester) always starts, the server (ECU) always serves — the real work sits on the serving side.
jp: **名前は鏡映し、でも役割は違う。** 一般的なひな型は、両端に対応するステップを与えます。UDSはそれを一方向に埋めます：クライアント（テスター）が必ず始め、サーバー（ECU）が必ず応じる ― 実際の仕事は応じる側にあります。
:::

:::en
Because this is a **general template**, borrowed from the way all layered communication is described: give both ends matching steps, then let each protocol decide who uses which. UDS fills the template one way — the **client always starts**, the **server always serves**. The names mirror; the roles do not. {{→ H3 · one asks, the other does the work}}
:::
:::jp
これが**一般的なひな型**だからです ― 階層型通信すべての記述の仕方から借りたものです：両端に対応するステップを与え、どちらがどれを使うかは各プロトコルに委ねる。UDSはこのひな型を一方向に埋めます ― **クライアントが必ず始め**、**サーバーが必ず応じます**。名前は鏡映し、役割はそうではありません。{{→ H3 · 片方が頼み、もう片方が担う}}
:::

## footer
:::reading
ISO 14229-1:2020 | cl.7.3.2 | request & indication — the client starts; the server is notified
ISO 14229-1:2020 | cl.7.3.3–7.3.4 | response & confirm, and the confirm-of-send steps, split by side
ISO 14229-1:2020 | cl.7.1 | The client function and server function, and their fixed roles
:::
