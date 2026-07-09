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
en: A request can carry a second byte. Take a session-change request — `10 03`: the **service identifier** `10`, then `03` to select *which* session (here, Extended). That second byte has a name: the **sub-function**.

The request goes to the ECU. What comes back?
jp: リクエストは2バイト目を運べます。セッション変更のリクエストを例に ― `10 03`：**サービス識別子** `10`、続いて*どの*セッションかを選ぶ `03`（ここでは拡張）。この2バイト目には名前があります ― **サブファンクション**です。

リクエストが ECU へ届きます。何が返るでしょう？
--
en: The service identifier is the straightforward half: `10` comes back as `50` — that is **+0x40**, the rule from the last card.
jp: サービス識別子は分かりやすい方です：`10` は `50` になって返ります ― 前のカードの規則、**+0x40** です。
--
en: And the sub-function? The ECU hands the request's `03` **straight back, unchanged** — an **echo**.

And that is the whole point of it: a bare `50` would only say "some session change worked"; `50 03` says *exactly which one*. You asked for session `03`, and `50 03` answers "done — you are in session `03`."

The tester never has to assume.
jp: では、サブファンクションは？　ECUはリクエストの `03` を**そのまま、変えずに返します** ― **エコー**です。

そしてこれこそが要点：`50` だけなら「何らかのセッション変更が成功した」としか言えませんが、`50 03` は*まさにどれか*を告げます。セッション `03` を頼み、`50 03` が「完了 ― 今あなたはセッション `03` にいる」と答えます。

テスターは推測する必要がありません。
--
en: One detail on the way back: the sub-function's **top bit is forced to 0**.

That bit is a separate control flag — you meet it, and why it matters, in the next drill. {{→ V4 · sub-functions & the suppress bit}}
jp: 戻り道で1つだけ細部：サブファンクションの**上位ビットは0に強制**されます。

そのビットは別の制御フラグ ― それが何で、なぜ重要かは、次の章で出会います。{{→ V4 · サブファンクションと抑制ビット}}
--
fig: figures/v2-c3-f2_subfn-byte.svg
en: So that one byte is really doing two jobs. Its **top bit** (bit 7) is a flag; its **lower seven bits** (bits 6–0) hold the value — here `03`.

The positive response echoes the value and clears the flag. What that flag does when it *is* set is the whole story of the next drill. {{→ V4 · the suppress bit}}
jp: つまり、この1バイトは実は2つの仕事をしています。**上位ビット**（ビット7）はフラグ、**下位7ビット**（ビット6〜0）が値 ― ここでは `03` ― を持ちます。

肯定応答は値を反射し、フラグを0にします。そのフラグが*立っている*ときに何をするのかは、次の章まるごとの話です。{{→ V4 · 抑制ビット}}

## footer
:::reading
ISO 14229-1:2020 | cl.9.3.1, Table 16 | Positive response A_PDU: the SubFunction parameter is echoed — "an echo of the 7-bit SubFunction value … with bit 7 set to zero; the suppressPosRspMsgIndicationBit is not echoed"
ISO 14229-1:2020 | cl.9.2.2, Table 14 | SubFunction byte = suppressPosRspMsgIndicationBit (bit 7) + SubFunction value (bits 6–0)
:::
