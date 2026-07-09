---
id: c1
type: concept
order: 20
section: { n: "V2", en: "Request & positive response", jp: "リクエストと肯定応答" }
title:
  en: "A reply is a wrapped unit, not naked bytes"
  jp: "応答は「包まれた1単位」― むき出しのバイトではない"
short: { en: "A wrapped unit", jp: "包まれた1単位" }
---

## story
fig: figures/v2-c1-f1_pdu-layout.svg
en: Here are the six bytes that came back in V1: `50 03 00 32 01 F4`. On the wire they are just a stream — nothing in them marks where "which service" stops, where the data begins, or how long the whole thing runs. An address label rides along (from V1: who is talking to whom), but the bytes themselves carry no seams. So what would you *add* to a bare pile of bytes to make it describe itself?
jp: V1 で返ってきた6バイトです：`50 03 00 32 01 F4`。線の上ではただの流れ ― 「どのサービスか」がどこで終わり、データがどこから始まり、全体が何バイトか、どれも書かれていません。宛先ラベル（V1の「誰と誰か」）は一緒に運ばれますが、バイト自体に継ぎ目はありません。では、むき出しのバイトの山に何を*足せば*、自分で自分を説明できるでしょう？
--
en: You would put a small control header on the front — one that says *how to read what follows*. UDS does exactly that, and the header has a name: the **A_PCI**. Its very **first byte is the key** — that one value tells the receiver how to read everything after it.
jp: 先頭に小さな制御ヘッダを付けるでしょう ― *続きの読み方*を告げるヘッダを。UDSはまさにそれをし、そのヘッダには名前があります ― **A_PCI**。その**先頭バイトこそ鍵** ― その1つの値が、後続すべての読み方を受け手に伝えます。
--
en: After the header come the service's own **parameters** — the data bytes that header introduces. Here that is `03 00 32 01 F4`.
jp: ヘッダの後には、サービス自身の**パラメータ** ― ヘッダが導くデータバイト ― が続きます。ここでは `03 00 32 01 F4` です。
--
en: Finally the whole thing carries a **length** — six bytes in all. Put the three together and you have one complete message: the wrapped unit is the **A_PDU**, and the meaningful data riding inside it is the **A_SDU**. From here on, "a message" means exactly this shape.
jp: 最後に、全体が**長さ**を運びます ― 全部で6バイト。この3つを合わせると、1つの完全なメッセージになります：包まれた単位が **A_PDU**、その中を運ばれる意味のあるデータが **A_SDU** です。これ以降、「メッセージ」とはこの形を指します。
--
fig: figures/v2-c1-f2_pdu-recipe.svg
en: The standard writes the recipe out exactly. An A_PDU is built from the data the service hands down (the **A_SDU**) plus the layer's own control byte (the **A_PCI**). On the wire, the carried data is simply the A_PCI followed by the parameters, riding inside V1's addressing (`Mtype`, `SA`, `TA`) with a `Length`.
jp: 標準はレシピをそのまま書き出しています。A_PDUは、サービスが渡すデータ（**A_SDU**）と、層自身の制御バイト（**A_PCI**）から組み立てられます。線上では、運ばれるデータは単に A_PCI に続いてパラメータで、V1の宛先情報（`Mtype`・`SA`・`TA`）と `Length` の中に乗ります。
--
fig: figures/v2-c1-f3_first-byte-key.svg
en: Why does the *first* byte matter so much? The receiver reads it before anything else, and its value decides how the rest is read. Any value other than `7F` means a normal message — and for a request or a positive response, that first byte *is* the **service identifier** (you meet it as `50` next). The one special value `7F` means "refusal — read this as a negative response instead." {{→ V3 · negative responses}}
jp: なぜ*先頭*バイトがそれほど重要なのでしょう？　受け手が何より先にそれを読み、その値が残りの読み方を決めます。`7F` 以外のどの値も通常のメッセージ ― リクエストや肯定応答では、その先頭バイトが**サービス識別子**そのもの（次に `50` として出会います）。唯一の特別な値 `7F` だけが「拒否 ― 否定応答として読め」を意味します。{{→ V3 · 否定応答}}

## footer
:::reading
ISO 14229-1:2020 | cl.8.2 | A_PDU = ( Mtype, SA, TA, TA_type, [RA,] A_Data = A_PCI + [parameters], Length ) — the A_PDU is constructed from the A_SDU and the A_PCI
ISO 14229-1:2020 | cl.8.3 | A_PCI: "the format is identified by the value of the first byte of the A_PDU parameter"; first byte ≠ 7F for requests and positive responses
:::
