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
en: Here are the six bytes of the good reply from the start of this drill: `50h 03h 00h 32h 01h F4h`.

On the wire they are just a stream. An address label rides along — who is talking to whom — but the bytes themselves have **no seams** — nothing marks:

- where "which service" stops,
- where the data begins,
- or how long the whole thing runs.
jp: この章の冒頭で見た、うまくいった応答の6バイトです：`50h 03h 00h 32h 01h F4h`。

線の上では、ただの流れ。宛先ラベル ― 誰と誰か ― は一緒に運ばれますが、バイト自体には**継ぎ目がありません** ― 何も示していません：

- 「どのサービスか」がどこで終わるか、
- データがどこから始まるか、
- 全体が何バイトなのか。
--
en: So what would you *add* to a bare pile of bytes to make it describe itself?

You would put a small **control header** on the front — one that says *how to read what follows*. It has a name: the **A_PCI**. Its very **first byte is the key**: read it, and its value tells you how to read everything after.
jp: では、むき出しのバイトの山に何を*足せば*、自分を説明できるでしょう？

先頭に小さな**制御ヘッダ**を付けるでしょう ― *続きの読み方*を告げるヘッダを。これには名前があります ― **A_PCI**。その**先頭バイトこそ鍵**：それを読めば、後続すべての読み方が分かります。
--
en: After the header come the service's own **parameters** — the data bytes that header introduces. Here that is `03h 00h 32h 01h F4h`.
jp: ヘッダの後には、サービス自身の**パラメータ** ― ヘッダが導くデータバイト ― が続きます。ここでは `03h 00h 32h 01h F4h` です。
--
en: Finally the whole thing carries a **length** — six bytes in all. Now the stream has seams.

Header, parameters, length: together they make one complete, self-describing message — an **A_PDU**.

And that first byte? For a reply that worked, it is the **service identifier** — you meet it as `50h` in the very next card.
jp: 最後に、全体が**長さ**を運びます ― 全部で6バイト。これで流れに継ぎ目ができました。

ヘッダ・パラメータ・長さ、この3つで、自分を説明できる1つの完全なメッセージ ― **A_PDU** ― になります。

そしてその先頭バイトは？　うまくいった応答では、それが**サービス識別子**です ― 次のカードで `50h` として出会います。

## footer
:::reading
ISO 14229-1:2020 | cl.8.2 | A_PDU = ( Mtype, SA, TA, TA_type, [RA,] A_Data = A_PCI + [parameters], Length ) — the A_PDU is constructed from the A_SDU and the A_PCI
ISO 14229-1:2020 | cl.8.3 | A_PCI: "the format is identified by the value of the first byte of the A_PDU parameter"; first byte ≠ 7Fh for requests and positive responses
:::
