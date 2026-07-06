---
id: c4
type: concept
order: 50
section: { n: "H2", en: "The life of one request", jp: "1つのリクエストの一生" }
sid: "$10"
title:
  en: "Watch one real request, byte for byte"
  jp: "本物の要求を1つ、バイトまで見る"
short: { en: "One real $10", jp: "本物の $10" }
illustration: figures/c4-roundtrip.svg
caption:
  en: "**`10 03` out, `50 03 00 32 01 F4` back.** A positive reply — and its extra bytes are the ECU's promise about how long its answers may take."
  jp: "**`10 03` を送り、`50 03 00 32 01 F4` が返る。** 肯定応答 ― その追加バイトは「答えにどれだけ時間がかかり得るか」というECUの約束です。"
legs:
  - id: reply
    title: { en: "Read the reply, byte by byte", jp: "応答をバイト単位で読む" }
  - id: timing
    title: { en: "Decode the two numbers — the timing promise", jp: "2つの数を解く ― タイミングの約束" }
---

## bar
:::en
Time to put every piece together on **one real exchange** — the `$10` we've been previewing. The tester sends **two** bytes; the ECU sends **six** back. Nothing new here — just the beat, made concrete.
:::
:::jp
すべてを**1つの本物のやり取り**にまとめましょう ― ずっと予告してきた `$10` です。テスターが**2**バイトを送り、ECUが**6**バイトを返します。新しいことは何もありません ― ただ、あの1拍を具体にしただけです。
:::

:::en
- {key} **`50` = `10 + 0x40`** — a **positive** reply — and **`03`** echoes the session you asked for. It worked.
- The four bytes **`00 32 01 F4`** aren't data to read out — they are the ECU's **timing promise** (two values, `P2` and `P2*`): how long you may wait for its answers before assuming it's gone.
:::
:::jp
- {key} **`50` ＝ `10 + 0x40`** ― **肯定**応答 ― そして **`03`** は要求したセッションの反射。成功です。
- 4バイト **`00 32 01 F4`** は読み出すデータではありません ― ECUの**タイミングの約束**（`P2` と `P2*` の2つの値）です：答えを待ってよい時間、つまり「応答なし」と見なすまでの猶予。
:::

## leg:reply
:::en
Every byte in the reply has a job. Read them left to right:
:::
:::jp
応答のどのバイトにも役目があります。左から右へ読みます：
:::

:::figure src=figures/c4-response-bytes.svg
en: **Six bytes, four jobs.** `50` = positive; `03` = the session now active; the pairs `00 32` and `01 F4` are the two timing values, `P2` and `P2*`.
jp: **6バイト、4つの役目。** `50`＝肯定、`03`＝現在有効なセッション、対になった `00 32` と `01 F4` が2つのタイミング値 `P2` と `P2*`。
:::

:::bytes
50 | positive SID | pos
03 | session | sub
00 32 | P2 |
01 F4 | P2* |
:::

## leg:timing
:::en
Those two pairs are the reason the reply is longer than a plain "yes". Convert each from hex, then apply its **resolution** (how much time one count is worth):
:::
:::jp
この2つの対こそ、応答が単なる「はい」より長い理由です。各対を16進から変換し、その**分解能**（1カウントが表す時間）を掛けます：
:::

:::figure src=figures/c4-timing-decode.svg
en: **From bytes to milliseconds.** `00 32` = 50 counts × 1 ms = **50 ms** (`P2`). `01 F4` = 500 counts × 10 ms = **5000 ms** (`P2*`).
jp: **バイトからミリ秒へ。** `00 32`＝50カウント×1 ms＝**50 ms**（`P2`）。`01 F4`＝500カウント×10 ms＝**5000 ms**（`P2*`）。
:::

:::en
- **`P2` = 50 ms** — how long a *normal* answer may take. Wait longer than this with no reply, and something is wrong.
- **`P2*` = 5000 ms** — the *extended* ceiling the ECU may use after it first sends an interim **"still working"** reply (a `7F` negative carrying code `0x78`, the one "no" that means "wait") {{→ V3 · negative responses}}.
- {key} The ECU reports **its own** values here; `50 ms` / `5000 ms` are the common **recommended defaults**. {{→ V6 · timing}}
:::
:::jp
- **`P2` ＝ 50 ms** ― *通常*の答えにかかってよい時間。これを超えて無応答なら、異常です。
- **`P2*` ＝ 5000 ms** ― ECUがまず「**まだ作業中**」という中間応答（コード `0x78` を運ぶ `7F` 否定 ― 「待て」を意味する唯一の「いいえ」）を送ったあとに使える*延長*の上限 {{→ V3 · 否定応答}}。
- {key} ここでECUは**自分の**値を報告します ― `50 ms` / `5000 ms` はよくある**推奨デフォルト**です。{{→ V6 · タイミング}}
:::

## footer
:::reading
ISO 14229-1:2020 | cl.10.2, Tables 28 & 29 | `$10` positive response = `P2Server_max` (2 B) + `P2*Server_max` (2 B); resolutions 1 ms / 10 ms
ISO 14229-1:2020 | cl.8.4, Table 2 | Positive response SID = request SID + `0x40` (`50` = `10` + `40`)
ISO 14229-2:2021 | Table 4 (defaultSession timing) | Recommended defaults: `P2Server` 50 ms, `P2*Server` 5000 ms (server-specific)
:::
