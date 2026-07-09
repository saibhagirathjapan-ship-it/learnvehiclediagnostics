---
id: c3
type: concept
order: 40
section: { n: "V2", en: "Request & positive response", jp: "リクエストと肯定応答" }
title:
  en: "The sub-function comes back echoed"
  jp: "サブファンクションは反射されて返る"
short: { en: "The echo", jp: "エコー" }
---

## story
fig: figures/v2-c3-f1_echoed-subfn.svg
en: In H2 you sent `10 03` — service `10`, and a second byte `03` that picks *which* session (Extended). That second byte has a name: the **sub-function**. Two bytes went out. What comes back?
jp: H2 では `10 03` を送りました ― サービス `10` と、*どの*セッションかを選ぶ2バイト目 `03`（拡張）。この2バイト目には名前があります ― **サブファンクション**です。2バイトが出て行きました。何が返るでしょう？
--
en: The service byte you already know: `10` comes back as `50` — that is **+0x40**, the move from the last card.
jp: サービスバイトはもう分かります：`10` は `50` になって返ります ― これは前のカードの一手、**+0x40**。
--
en: And the sub-function? The ECU hands your `03` **straight back, unchanged** — an **echo**. And that is the whole point of it: a bare `50` would only say "some session change worked"; `50 03` says *exactly which one*. You asked for session `03`, and `50 03` answers "done — you are in session `03`." The tester never has to assume.
jp: では2バイト目は？　ECUはあなたの `03` を**そのまま、変えずに返します** ― **エコー**です。そしてこれこそが要点：`50` だけなら「何らかのセッション変更が成功した」としか言えませんが、`50 03` は*まさにどれか*を告げます。セッション `03` を頼み、`50 03` が「完了 ― 今あなたはセッション `03` にいる」と答えます。テスターは推測する必要がありません。
--
en: One detail on the way back: the sub-function's **top bit is forced to 0**. That bit is a separate control flag — you meet it, and why it matters, in the next drill. {{→ V4 · sub-functions & the suppress bit}}
jp: 戻り道で1つだけ細部：サブファンクションの**上位ビットは0に強制**されます。そのビットは別の制御フラグ ― それが何で、なぜ重要かは、次の章で出会います。{{→ V4 · サブファンクションと抑制ビット}}
--
fig: figures/v2-c3-f2_subfn-byte.svg
en: So that one byte is really doing two jobs. Its **top bit** (bit 7) is a flag; its **lower seven bits** (bits 6–0) hold the value — here `03`. The positive response echoes the value and clears the flag. What that flag does when it *is* set is the whole story of the next drill. {{→ V4 · the suppress bit}}
jp: つまり、この1バイトは実は2つの仕事をしています。**上位ビット**（ビット7）はフラグ、**下位7ビット**（ビット6〜0）が値 ― ここでは `03` ― を持ちます。肯定応答は値を反射し、フラグを0にします。そのフラグが*立っている*ときに何をするのかは、次の章まるごとの話です。{{→ V4 · 抑制ビット}}

## footer
:::reading
ISO 14229-1:2020 | cl.9.3.1, Table 16 | Positive response A_PDU: the SubFunction parameter is echoed — "an echo of the 7-bit SubFunction value … with bit 7 set to zero; the suppressPosRspMsgIndicationBit is not echoed"
ISO 14229-1:2020 | cl.9.2.2, Table 14 | SubFunction byte = suppressPosRspMsgIndicationBit (bit 7) + SubFunction value (bits 6–0)
:::
