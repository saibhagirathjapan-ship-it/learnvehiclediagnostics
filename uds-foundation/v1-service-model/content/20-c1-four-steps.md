---
id: c1
type: concept
order: 20
section: { n: "V1", en: "The service model", jp: "サービスモデル" }
title:
  en: "The four steps of one exchange"
  jp: "1回のやり取りの4つのステップ"
short: { en: "The four steps", jp: "4つのステップ" }
illustration: figures/v1-c1-f1_four-steps.svg
caption:
  en: "**One exchange, four steps.** The request leaves the tester and arrives at the ECU (request → indication); the answer leaves the ECU and arrives at the tester (response → confirmation). Time runs down the page."
  jp: "**1回のやり取り、4つのステップ。** リクエストはテスターを出てECUに届き（リクエスト → 通知）、答えはECUを出てテスターに届きます（応答 → 確認）。時間はページの下へ流れます。"
legs:
  - id: count
    title: { en: "The full count — six steps, or three", jp: "本当の数 ― 6ステップ、あるいは3ステップ" }
    figure: figures/v1-c1-f2_six-and-three.svg
  - id: arrows
    title: { en: "How to read a sequence arrow", jp: "シーケンス矢印の読み方" }
    figure: figures/v1-c1-f3_reading-arrows.svg
---

## bar
:::en
One exchange is a short, ordered sequence of named steps — not a single event. Each step is called a **primitive** — one hand-off between a side and the wire that connects them.

The clean round trip has four steps, in this order:
:::
:::jp
1回のやり取りは、名前のついたステップの、短く順序だった並びです ― 単一の出来事ではありません。各ステップは**プリミティブ**と呼ばれます ― 一方の側と、両側をつなぐ線との間で起きる、1回の受け渡しです。

きれいな往復は、この順で4ステップです：
:::

:::en
1. **request** — the tester starts the exchange and sends the call out.
2. **indication** — the call reaches the ECU, which is told that a request has arrived.
3. **response** — the ECU sends its answer back.
4. **confirmation** — the answer reaches the tester.
:::
:::jp
1. **リクエスト（request）** ― テスターがやり取りを始め、呼び出しを送り出す。
2. **通知（indication）** ― 呼び出しがECUに届き、ECUは「リクエストが来た」と知らされる。
3. **応答（response）** ― ECUが答えを返す。
4. **確認（confirmation）** ― 答えがテスターに届く。
:::

:::en
Read them top to bottom and you have the whole shape: **out, arrives, back, arrives**. Notice that steps 1 and 2 are the *same message* seen at its two ends — the request leaving the tester is the indication arriving at the ECU. The same is true of steps 3 and 4 for the answer.
:::
:::jp
上から下へ読めば、形の全体がわかります：**出る、届く、戻る、届く**。ステップ1と2は、*同じメッセージ*をその両端で見たものだと気づいてください ― テスターを出る「リクエスト」は、ECUに届く「通知」です。答えについても、ステップ3と4は同じです。
:::

## leg:count
:::en
The four steps are the ones you can follow end to end. The standard actually names **six** for a full exchange. The two extra steps are local "it went out" signals.
:::
:::jp
4つのステップは、端から端まで追えるものです。標準は、完全なやり取りには実は**6つ**を名付けています。追加の2ステップは、ローカルな「送り出した」という合図です。
:::

:::figure src=figures/v1-c1-f2_six-and-three.svg
en: **Six for a reply, three for none.** Each side gets a short local "sent" signal after it transmits (dashed). A confirmed service uses all six; an unconfirmed service — one that expects no reply — stops after three.
jp: **返答ありは6、なしは3。** 各側は送信の直後に、短いローカルな「送信済み」合図を受け取ります（破線）。確認応答つきサービスは6すべてを使い、確認応答なしサービス ― 返答を期待しないもの ― は3で止まります。
:::

:::en
Right after the tester sends, its own side confirms the request left the wire — the **request-confirmation**. Right after the ECU sends its answer, its side confirms the reply left too — the **response-confirmation**. Neither crosses to the other side; each just tells its own sender "sent."
:::
:::jp
テスターが送った直後、テスター側は「リクエストが線を出た」と確認します ― **リクエスト確認（request-confirmation）**。ECUが答えを送った直後、ECU側は「応答も出た」と確認します ― **応答確認（response-confirmation）**。どちらも相手側へは渡りません。それぞれ、自分の送信側に「送った」と伝えるだけです。
:::

:::en
So a **confirmed service** — one that draws a reply — has six steps. A service that expects **no reply** is an **unconfirmed service**, and it has only three: request, request-confirmation, indication. The call goes out and arrives; nothing comes back.
:::
:::jp
つまり、**確認応答つきサービス（confirmed service）** ― 4つ目の「確認」まで返る、返答を引き出すもの ― は6ステップです。**返答を期待しない**サービスは**確認応答なしサービス（unconfirmed service）**で、3ステップだけです：リクエスト、リクエスト確認、通知。呼び出しは出て届き、何も戻りません。
:::

## leg:arrows
:::en
Every arrow in the picture reads the same way, so learn it once.
:::
:::jp
図の中のどの矢印も同じ読み方です。一度覚えてしまいましょう。
:::

:::figure src=figures/v1-c1-f3_reading-arrows.svg
en: **One arrow, three facts.** The tail is the side that acts; the head is the side that is told; going down the page is going forward in time. That is why request sits above indication — same message, leaving then arriving.
jp: **1本の矢印、3つの事実。** 尾は動く側、頭は知らされる側、ページを下へ進むことは時間を先へ進めること。だからリクエストは通知の上にあります ― 同じメッセージが、出て、そして届く。
:::

:::en
- {key} The **tail** of an arrow is the side that acts. The **head** is the side that is told. Moving **down** the page moves forward in time.
- So a downward arrow from tester to ECU means the tester acted first, and the ECU learns of it a moment later — request above, indication below.
:::
:::jp
- {key} 矢印の**尾**は動く側。**頭**は知らされる側。ページを**下へ**進むことは、時間を先へ進めること。
- だから、テスターからECUへ下向きの矢印は、テスターが先に動き、ECUが少し後にそれを知る、という意味です ― 上にリクエスト、下に通知。
:::

## footer
:::reading
ISO 14229-1:2020 | cl.7.3.1–7.3.4 | The service primitives: request, indication, response, confirm, and the two confirm-of-send primitives
ISO 14229-1:2020 | cl.5 & cl.7.1, Fig. 3 & Fig. 4 | Confirmed service (six primitives) vs unconfirmed service (three: request, request-confirmation, indication)
:::
