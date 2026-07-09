---
id: brief
type: brief
order: 10
eyebrow: "Start here · まずここから"
---

## body
:::en
In **V1** you slowed one exchange down to its shape: four named steps, two roles, and an address label riding along. That model had **no bytes in it** — it was the skeleton. Now we put the bytes back and read a reply that **worked**.
:::
:::jp
**V1** では、1回のやり取りをその形まで遅くして見ました ― 名前のついた4ステップ、2つの役割、そして一緒に運ばれる宛先ラベル。あのモデルには**バイトが1つもありません**でした ― 骨組みだったのです。ここでバイトを戻し、**うまくいった**応答を読みます。
:::

:::en
This drill opens up a good reply in three parts:

1. **A reply is a wrapped unit** — the meaningful content travels inside a small control header, with a length.
2. **`+40h` makes it positive** — the answer's first byte is just the request's first byte with one bit set.
3. **The sub-function comes back echoed** — the server hands your sub-function value straight back, with its top bit cleared.
:::
:::jp
この章では、うまくいった応答を3部構成で開きます：

1. **応答は「包まれた1単位」** ― 意味のある中身は、小さな制御ヘッダと長さとともに運ばれます。
2. **`+40h` が「肯定」にする** ― 答えの先頭バイトは、リクエストの先頭バイトに1ビット立てただけ。
3. **サブファンクションは反射されて返る** ― サーバはあなたのサブファンクション値をそのまま返します。上位ビットは0にして。
:::

:::figure src=figures/v2-b-f1_good-reply.svg
en: **A reply that worked, still sealed.** Six bytes came back and the request succeeded. By the end of this drill you can read every one of them.
jp: **うまくいった応答、まだ封をしたまま。** 6バイトが返り、リクエストは成功しました。この章を終える頃には、その1バイトずつを読めます。
:::

:::key
label: By the end · この章を終えると
en: You can lay out the parts of a reply (content, control header, length), decode `+40h` to turn a request SID into its positive-response SID (`10h`→`50h`, `22h`→`62h`), and read a sub-function echoed back in the answer.
jp: 応答の各部（中身・制御ヘッダ・長さ）を並べて示せ、`+40h` を解いてリクエストSIDを肯定応答SIDに変換でき（`10h`→`50h`、`22h`→`62h`）、答えに反射されて返るサブファンクションを読めます。
:::

:::reading
ISO 14229-1:2020 | cl.8.2 | The application protocol data unit A_PDU is constructed from the A_SDU and the control information A_PCI
ISO 14229-1:2020 | cl.8.4 & cl.9.3 | Service identifier (SI) and the positive response message
:::
