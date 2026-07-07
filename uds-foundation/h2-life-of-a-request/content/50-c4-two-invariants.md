---
id: c4
type: concept
order: 50
section: { n: "H2", en: "The life of one request", jp: "1つのリクエストの一生" }
title:
  en: "Two things hold for every beat"
  jp: "どの1拍にも成り立つ2つのこと"
short: { en: "Every beat", jp: "どの拍も" }
illustration: figures/h2-c4-f1_addressing.svg
caption:
  en: "**However a request is aimed — at one ECU, or broadcast to all — its answer always comes back from a single ECU.**"
  jp: "**要求をどう宛てても ― 1台へでも全員へブロードキャストでも ― 答えは常に1台のECUから返ります。**"
legs:
  - id: aim
    title: { en: "Physical or functional — one ECU, or all of them", jp: "物理か機能か ― 1台か、全員か" }
---

## bar
:::en
You just followed one exchange all the way through. Now zoom out: whatever a request *asks for*, **two things are always true of the beat itself**.
:::
:::jp
1つのやり取りを最後まで追いました。では引いて見ましょう ― 要求が何を*頼もう*と、**その1拍そのものには常に2つのことが成り立ちます**。
:::

:::en
- {key} **Aim — one ECU, or all of them.** A request can go to a **single** ECU (*physical*), or be **broadcast** to many at once (*functional*) — yet every answer comes back from **one** ECU alone.
- **Reply — always positive or negative.** Whatever you asked, the ECU that answers replies in exactly one of the two shapes you just met: `SID + 0x40`, or `7F + SID + NRC`. Never a third kind.
:::
:::jp
- {key} **宛先 ― 1台か、全員か。** 要求は**1台**のECUへ（*物理*）も、多数へ同時に**ブロードキャスト**（*機能*）もできます ― それでも答えは**1台**だけから返ります。
- **応答 ― 常に肯定か否定。** 何を頼んでも、答えるECUは今見た2つの形のちょうど1つで返します ― `SID + 0x40` か `7F + SID + NRC`。3つ目はありません。
:::

## leg:aim
:::en
The first invariant surprises people, so look closer. A request can fan out to **many** ECUs at once, but a response is **always** one-to-one:
:::
:::jp
最初の不変則は意外なので、もう少し詳しく。要求は**多数**のECUに一度に広がり得ますが、応答は**常に**1対1です：
:::

:::en
- **Physical** — point-to-point, to one specific ECU.
- **Functional** — a broadcast, to one *or more* ECUs at once (used when you don't yet know which ECU owns a function).
- On a **functional** broadcast, an ECU that *can't* serve the request just **stays silent** — it holds back its "no" so the shared bus isn't flooded with refusals. Only the ECUs that *can* answer do.
- {key} However a request is aimed, the ECU's answer is **always sent physically**, from the one ECU that replied. The wire that carries all this is its own drill {{→ V8 · addressing & transport}}.
:::
:::jp
- **物理** ― 1対1、特定の1台のECUへ。
- **機能** ― ブロードキャスト、1台*以上*へ同時に（どのECUが担うかまだ分からないときに使う）。
- **機能**ブロードキャストでは、要求を*処理できない*ECUはただ**黙ります** ― 共有バスが拒否で溢れないよう「いいえ」を控えます。*処理できる*ECUだけが答えます。
- {key} どう宛てても、ECUの答えは**常に物理的に**送られます ― 応答した1台から。これらを運ぶワイヤは専用ドリルで {{→ V8 · アドレスと搬送層}}。
:::

## footer
:::reading
ISO 14229-1:2020 | cl.7.4.1.4 A_TA; cl.8.7.1 | Physical (1:1) vs functional (1:n) addressing; responses are always physical
:::
