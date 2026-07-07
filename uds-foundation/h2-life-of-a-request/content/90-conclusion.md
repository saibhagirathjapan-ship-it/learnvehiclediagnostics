---
id: concl
type: conclusion
order: 90
eyebrow: "Section recap · まとめ"
---

## body
:::en
One request is a **string of bytes**, and its **first byte is the service (SID)**. The ECU serves it and returns **exactly one** of two answers: a **positive** one, echoing the SID **+ `0x40`**, or a **negative** one — the fixed `7F` + your SID + a reason code (**NRC**). We watched it for real: `10 03` → `50 03 00 32 01 F4`, a "yes" that even hands back the ECU's timing. Two things hold around **every** beat — a request aims at **one ECU or all** (but answers come from one), and the reply is **always positive or negative**. And that beat runs inside a **session** with a life of its own: `$10` opens it, `$3E` holds it open, and an `$11` reset or a timeout closes it — back to the default, re-locked. The one thing we passed over is the *middle* of the beat — how the ECU decides yes-or-no inside. That's a story of its own {{→ V9 · inside the server}}.
:::
:::jp
1つの要求は**バイト列**で、その**先頭バイトがサービス（SID）**です。ECUはそれを処理し、2つのうち**ちょうど1つ**の答えを返します ― SIDに **`0x40` を足して**反射する**肯定**か、固定の `7F` ＋あなたのSID＋理由コード（**NRC**）の**否定**。本物も見ました：`10 03` → `50 03 00 32 01 F4`、タイミングまで返す「はい」。**どの**1拍にも2つのことが成り立ちます ― 要求は**1台か全員**に宛て（でも答えは1台から）、応答は**常に肯定か否定**。そしてその拍は、独自の一生を持つ**セッション**の中で流れます：`$10` が開き、`$3E` が保ち、`$11` リセットかタイムアウトが閉じる ― デフォルトへ戻り、再ロック。通り過ぎたのは1拍の**真ん中**だけ ― ECUが内部で*どう*イエス・ノーを決めるか。それは独立した物語です {{→ V9 · サーバーの内部}}。
:::

:::key
label: You can now · できること
en: Read any UDS exchange: name the service from byte 1, tell a positive reply from a negative one at a glance, and decode a `$10` response into its session and timing. That is one whole request, end to end.
jp: どのUDSのやり取りも読めます ― 先頭バイトからサービスを言い、肯定と否定を一目で見分け、`$10` の応答をセッションとタイミングに解けます。これで1つの要求が、端から端まで揃いました。
:::

:::recall
q_en: You send `10 03`. **(a)** The ECU answers `50 03 00 C8 01 F4` — is it positive, which session is active, and what is `P2` in ms? **(b)** What would `7F 10 22` have meant instead?
q_jp: `10 03` を送ります。**(a)** ECUが `50 03 00 C8 01 F4` と答えたら ― 肯定か、どのセッションが有効か、`P2` は何ミリ秒か？ **(b)** もし代わりに `7F 10 22` だったら、何を意味したでしょう？
a_en: **(a) Positive** — `50` = `10` + `0x40`, answering `$10`; `03` = the **Extended** session is now active; `P2` = `00 C8` = `0x00C8` = 200 × 1 ms = **200 ms**. (The `01 F4` is `P2*` = 5000 ms.) **(b) Negative** — `7F` = "no", `10` = your SID echoed, `22` = conditionsNotCorrect: the ECU couldn't switch right now.
a_jp: **(a) 肯定** ― `50` ＝ `10` + `0x40` で `$10` への答え。`03` ＝ **拡張**セッションが有効。`P2` ＝ `00 C8` ＝ `0x00C8` ＝ 200 × 1 ms ＝ **200 ms**。（`01 F4` は `P2*` ＝ 5000 ms。）**(b) 否定** ― `7F` ＝「いいえ」、`10` ＝ あなたのSIDの反射、`22` ＝ conditionsNotCorrect：今は切り替えられなかった。
:::

:::en
Next, **H3** opens up the other side. If H2 followed one request through, H3 lays out the ECU's whole **catalogue** — every kind of thing it can be asked — and shows *how it decides* to say yes or no.
:::
:::jp
次の **H3** は、反対側を開きます。H2が1つの要求を追ったなら、H3はECUの**カタログ**全体 ― 頼める事のあらゆる種類 ― を広げ、*どうやって*イエス・ノーを決めるのかを見せます。
:::
