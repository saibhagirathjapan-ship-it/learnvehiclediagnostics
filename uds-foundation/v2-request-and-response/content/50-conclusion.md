---
id: concl
type: conclusion
order: 50
eyebrow: "Section recap · まとめ"
---

## body
:::en
You can now open a positive reply and read it. Three things hold for every one:

- A message is a **wrapped unit** — an **A_PCI** control header (its first byte the key), the **parameters**, and a length. One message = one **A_PDU**.
- The reply's first byte is the request's **+0x40** — bit 6 set. `10`→`50`, `22`→`62`, every time.
- A sub-function is **echoed** back, with its top bit forced to `0`.
:::
:::jp
これで、肯定応答を開いて読めます。どの応答にも3つのことが当てはまります：

- メッセージは**包まれた1単位** ― **A_PCI** 制御ヘッダ（その先頭バイトが鍵）、**パラメータ**、そして長さ。1メッセージ = 1つの **A_PDU**。
- 応答の先頭バイトはリクエストの **+0x40** ― ビット6を立てたもの。`10`→`50`、`22`→`62`、いつでも。
- サブファンクションは上位ビットを `0` に強制されて**反射**されます。
:::

:::recall
q_en: A reply begins `62 F1 90`. Decode those three bytes — what happened, and how do you know? (`$22` is ReadDataByIdentifier; `F1 90` names the VIN.)
q_jp: 応答が `62 F1 90` で始まります。この3バイトを解読してください ― 何が起きて、なぜ分かりますか？（`$22` は ReadDataByIdentifier、`F1 90` は VIN を指します。）
a_en: `62` = `22 + 0x40` (bit 6 set), so it is the **positive response to ReadDataByIdentifier** — the read worked. `F1 90` is the DID echoed back, naming *which* item was read (the VIN). The VIN's bytes follow. In one glance: "here is DID F190, read successfully."
a_jp: `62` = `22 + 0x40`（ビット6が立つ）なので、**ReadDataByIdentifier への肯定応答** ― 読み取り成功です。`F1 90` は反射された DID で、*どの*項目を読んだか（VIN）を示します。続いて VIN のバイト。ひと目で「DID F190、読み取り成功」です。
:::

:::recall
q_en: And what does `50 03` alone tell the tester?
q_jp: では `50 03` だけで、テスターに何が分かりますか？
a_en: `50` = `10 + 0x40` → the **positive response to DiagnosticSessionControl**; `03` is the echoed sub-function → the ECU is now in the **Extended session**. So: "session change done — you are in Extended."
a_jp: `50` = `10 + 0x40` → **DiagnosticSessionControl への肯定応答**、`03` は反射されたサブファンクション → ECU は今**拡張セッション**にいます。つまり「セッション変更完了 ― 拡張です」。
:::

:::key
label: You can now · できるようになったこと
en: Read the first bytes of any positive reply — name the service, confirm it succeeded, and read the echoed sub-function — without a lookup table.
jp: どんな肯定応答でも先頭バイトを読め ― サービスを言い当て、成功を確認し、反射されたサブファンクションを読めます ― 参照表なしで。
:::

:::en
But not every request gets a positive reply. Sometimes the ECU has to say **no** — and it says it in a fixed shape, `7F` first, with a reason code. That is the next drill. {{→ V3 · negative responses & the NRC catalog}}
:::
:::jp
しかし、すべてのリクエストが肯定応答を得るわけではありません。時に ECU は**ノー**と言わねばならず ― それを決まった形、先頭 `7F` と理由コードで告げます。それが次の章です。{{→ V3 · 否定応答とNRCカタログ}}
:::
