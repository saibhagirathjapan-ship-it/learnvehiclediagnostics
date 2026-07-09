---
id: c3
type: concept
order: 40
section: { n: "V2", en: "Request & positive response", jp: "リクエストと肯定応答" }
title:
  en: "The sub-function comes back echoed"
  jp: "サブファンクションは反射されて返る"
short: { en: "The echo", jp: "エコー" }
legs:
  - id: topbit
    title: { en: "The one thing that changes: the top bit", jp: "唯一変わるもの ― 上位ビット" }
    figure: figures/v2-c3-f2_subfn-byte.svg
  - id: why
    title: { en: "Why echo it back at all", jp: "そもそもなぜ返すのか" }
---

## bar
:::panel src=figures/v2-c3-f1_echoed-subfn.svg
en: In H2 you sent `10 03` — service `10`, and a second byte `03` that picks *which* session (Extended). Two bytes went out. What comes back?
jp: H2 では `10 03` を送りました ― サービス `10` と、*どの*セッションかを選ぶ2バイト目 `03`（拡張）。2バイトが出て行きました。何が返るでしょう？
--
en: The service byte you already know: `10` comes back as `50` — that is **+0x40**, the move from the last card.
jp: サービスバイトはもう分かります：`10` は `50` になって返ります ― これは前のカードの一手、**+0x40**。
--
en: And the sub-function? The ECU hands your `03` **straight back, unchanged** — an **echo**. It is confirming *which* variant it acted on: you asked for session `03`, and `50 03` says "done — session `03`."
jp: では、サブファンクションは？　ECUはあなたの `03` を**そのまま、変えずに返します** ― **エコー**です。*どの*種類を実行したかを確認しています：セッション `03` を頼み、`50 03` が「完了 ― セッション `03`」と告げます。
--
en: One detail: the sub-function's **top bit is forced to 0** on the way back. That bit is a separate control flag — you meet it, and why it matters, in the next drill.
jp: 1つだけ細部：戻り道でサブファンクションの**上位ビットは0に強制**されます。そのビットは別の制御フラグ ― それが何で、なぜ重要かは、次の章で出会います。
:::

## leg:topbit
:::en
The sub-function byte does two jobs at once. Its **top bit** (bit 7) is a separate flag; its **lower seven bits** (bits 6–0) hold the value — here `03`. The positive response echoes the value and forces that top flag to `0`.
:::
:::jp
サブファンクションバイトは一度に2つの仕事をします。**上位ビット**（ビット7）は独立したフラグ、**下位7ビット**（ビット6〜0）が値 ― ここでは `03` ― を持ちます。肯定応答は値を反射し、その上位フラグを `0` に強制します。
:::

:::figure src=figures/v2-c3-f2_subfn-byte.svg
en: **One byte, two jobs.** Split the sub-function byte and the top bit is a flag, the lower seven are the value. The echo returns the value with the flag cleared.
jp: **1バイト、2つの仕事。** サブファンクションバイトを分けると、上位ビットはフラグ、下位7ビットが値。エコーはフラグを0にして値を返します。
:::

:::en
- {key} That top-bit flag is the **suppressPosRsp** bit — it can tell the ECU to stay silent on success. {{→ V4 · sub-functions & the suppress bit}}
:::
:::jp
- {key} その上位ビットのフラグが **suppressPosRsp**（肯定応答抑制）ビットです ― 成功時に黙るようECUに指示できます。{{→ V4 · サブファンクションと抑制ビット}}
:::

## leg:why
:::en
Why bother sending the sub-function back at all? Because a bare `50` would only say "some session change worked." The echoed `03` says *exactly which one*. The tester never has to assume — it reads the confirmation and knows the ECU is now in the Extended session, not some other one.
:::
:::jp
そもそも、なぜサブファンクションを返すのでしょう？　`50` だけなら「何らかのセッション変更が成功した」としか言えません。反射された `03` は*まさにどれか*を告げます。テスターは推測する必要がなく ― 確認を読めば、ECUが今、他のどれでもなく拡張セッションにいると分かります。
:::

## footer
:::reading
ISO 14229-1:2020 | cl.9.3.1, Table 16 | Positive response A_PDU: the SubFunction parameter is echoed in the response
ISO 14229-1:2020 | cl.9.2.2, Table 14 | SubFunction byte = suppressPosRspMsgIndicationBit (bit 7) + SubFunction value (bits 6–0); reads back with bit 7 = 0
:::
