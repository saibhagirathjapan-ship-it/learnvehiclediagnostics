---
id: c1
type: concept
order: 20
section: { n: "V2", en: "Request & positive response", jp: "リクエストと肯定応答" }
title:
  en: "A reply is a wrapped unit, not naked bytes"
  jp: "応答は「包まれた1単位」― むき出しのバイトではない"
short: { en: "A wrapped unit", jp: "包まれた1単位" }
continuous: true
illustration: figures/v2-c1-f1_pdu-layout.svg
reveal: build-order
caption:
  en: "**Click to build it up.** An address label rides along; the first byte is the control header (**A_PCI**) — the key to reading the rest; then the parameters; then a length. Together: one **A_PDU**."
  jp: "**クリックで組み立て。** 宛先ラベルが一緒に運ばれ、先頭バイトが制御ヘッダ（**A_PCI**）― 残りを読む鍵。続いてパラメータ、そして長さ。合わせて1つの **A_PDU**。"
legs:
  - id: layout
    title: { en: "The exact recipe: A_PDU = A_SDU + A_PCI", jp: "正確なレシピ：A_PDU = A_SDU + A_PCI" }
    figure: figures/v2-c1-f2_pdu-recipe.svg
  - id: pcikey
    title: { en: "Why the first byte is the key", jp: "なぜ先頭バイトが鍵なのか" }
    figure: figures/v2-c1-f3_first-byte-key.svg
---

## bar
:::en
Up close, the reply from V1 is a run of bytes: `50 03 00 32 01 F4`. But bytes on a wire are just a stream. Nothing in the stream itself says where the "which service" part stops and the data begins, or how long the whole message runs.

So how does the receiver find the seams? Picture handing someone a bare pile of bytes and asking them to make sense of it — what would you *add* to the pile to make it self-describing?
:::
:::jp
近くで見ると、V1の応答はバイトの並びです：`50 03 00 32 01 F4`。でも線の上のバイトは、ただの流れ。流れそのものには、「どのサービスか」の部分がどこで終わり、データがどこから始まるか、メッセージ全体が何バイトか ― どれも書かれていません。

では受け手はどうやって「継ぎ目」を見つけるのでしょう？　むき出しのバイトの山を誰かに渡して「意味を読み取って」と頼む場面を思い浮かべてください ― 山に何を*足せば*、自分で自分を説明できるようになるでしょう？
:::

:::en
You would put a small header on the front — one that says *how to read what follows* — and you would note *how long* the whole thing is. That is exactly what a UDS message does. The content never travels naked. It travels **wrapped**:

- A short control header goes first. It has a name: the **A_PCI** (*protocol control information*). Its very **first byte is the key** — that value tells the receiver how to read everything after it.
- Then the service's own **parameters** — the data bytes that header introduces.
- And the whole thing carries a **length** — how many bytes in all.
:::
:::jp
先頭に小さなヘッダを付けるでしょう ― *続きの読み方*を示すヘッダを ― そして全体が*何バイト*かを記すでしょう。UDSのメッセージがまさにそれをします。中身がむき出しで運ばれることはありません。**包まれて**運ばれます：

- 先頭に短い制御ヘッダが来ます。これには名前があります ― **A_PCI**（プロトコル制御情報）。その**先頭バイトこそ鍵** ― その値が、後続をどう読むかを受け手に伝えます。
- 続いてサービス自身の**パラメータ** ― ヘッダが導くデータバイト。
- そして全体が**長さ**を運びます ― 全部で何バイトか。
:::

:::en
Put those three together and you have one complete message. That wrapped unit is the **A_PDU** (*application protocol data unit*), and the meaningful data riding inside it is the **A_SDU** (*service data unit*). From here on, "a message" means exactly this shape.
:::
:::jp
この3つを合わせると、1つの完全なメッセージになります。この包まれた単位が **A_PDU**（アプリケーション層プロトコルデータユニット）、その中を運ばれる意味のあるデータが **A_SDU**（サービスデータユニット）です。これ以降、「メッセージ」とはまさにこの形を指します。
:::

## leg:layout
:::en
The standard writes the recipe out exactly. An A_PDU is built from the data the service hands down (the **A_SDU**) plus the layer's own control byte (the **A_PCI**):
:::
:::jp
標準はレシピをそのまま書き出しています。A_PDUは、サービスが渡すデータ（**A_SDU**）と、層自身の制御バイト（**A_PCI**）から組み立てられます：
:::

:::figure src=figures/v2-c1-f2_pdu-recipe.svg
en: **One recipe, two ingredients.** The service hands down its data (A_SDU); the application layer adds the control header (A_PCI). Laid out on the wire, the A_Data is *A_PCI followed by the parameters*, carried with the addressing and a length.
jp: **1つのレシピ、2つの材料。** サービスがデータ（A_SDU）を渡し、アプリケーション層が制御ヘッダ（A_PCI）を足す。線上では、A_Dataは*A_PCIに続いてパラメータ*で、宛先情報と長さとともに運ばれます。
:::

:::en
On the wire, the carried data (called the **A_Data**) is simply the A_PCI followed by the parameters. That whole thing rides inside the addressing you met in V1 (`Mtype`, `SA`, `TA`) with a `Length`. So the full shape is: **address label · A_PCI + parameters · length**.
:::
:::jp
線上では、運ばれるデータ（**A_Data** と呼ばれます）は、単に A_PCI に続いてパラメータです。それ全体が、V1で出会った宛先情報（`Mtype`・`SA`・`TA`）と `Length` の中に乗ります。だから完全な形はこうです：**宛先ラベル・A_PCI＋パラメータ・長さ**。
:::

## leg:pcikey
:::en
Why does the *first* byte matter so much? Because the receiver reads it before anything else, and its value decides how the rest is read. One value says "this is a normal message — read the next bytes as a service and its data." One special value, `7F`, says "this is a refusal — read it as a negative response instead."
:::
:::jp
なぜ*先頭*バイトがそんなに重要なのでしょう？　受け手が何より先にそれを読み、その値が残りの読み方を決めるからです。ある値は「これは普通のメッセージ ― 続くバイトをサービスとそのデータとして読め」と言い、`7F` という特別な値だけは「これは拒否 ― 否定応答として読め」と言います。
:::

:::figure src=figures/v2-c1-f3_first-byte-key.svg
en: **The first byte routes everything.** Read it first: any value other than `7F` means a normal request or positive response; `7F` alone flags a negative response. The one byte tells the receiver which format follows.
jp: **先頭バイトがすべてを振り分ける。** まずそれを読む：`7F` 以外のどの値も通常のリクエストか肯定応答、`7F` だけが否定応答の合図。この1バイトが、続く書式を受け手に伝えます。
:::

:::en
- {key} For a request or a positive response, that first byte *is* the **service identifier** — you will meet it as `50` in the very next card.
- The negative case (first byte `7F`) is its own card. {{→ V3 · negative responses}}
:::
:::jp
- {key} リクエストや肯定応答では、その先頭バイトが**サービス識別子**そのものです ― 次のカードで `50` として出会います。
- 否定のケース（先頭バイト `7F`）は独立したカードです。{{→ V3 · 否定応答}}
:::

## footer
:::reading
ISO 14229-1:2020 | cl.8.2 | A_PDU = ( Mtype, SA, TA, TA_type, [RA,] A_Data = A_PCI + [parameters], Length ) — the A_PDU is constructed from the A_SDU and the A_PCI
ISO 14229-1:2020 | cl.8.3 | A_PCI: "the format is identified by the value of the first byte of the A_PDU parameter"; first byte ≠ 7F for requests and positive responses
:::
