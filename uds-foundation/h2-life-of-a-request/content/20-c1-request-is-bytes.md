---
id: c1
type: concept
order: 20
section: { n: "H2", en: "The life of one request", jp: "1つのリクエストの一生" }
title:
  en: "A request is just bytes — and byte 1 is the service"
  jp: "要求はただのバイト列 ― そして先頭バイトがサービス"
short: { en: "Bytes & the SID", jp: "バイトとSID" }
illustration: figures/h2-c1-f1_request-shape.svg
caption:
  en: "**`10 03` = \"switch to the Extended session\".** The first byte names the service (`$10`); the next byte is its option (`03`)."
  jp: "**`10 03` ＝「拡張セッションに切り替えて」。** 先頭バイトがサービス（`$10`）、次のバイトがその選択肢（`03`）。"
legs:
  - id: anatomy
    title: { en: "The shape of any request — SID, then parameters", jp: "どの要求も同じ形 ― SID、そして引数" }
  - id: subfn
    title: { en: "That second byte hides a flag", jp: "その2バイト目には旗が隠れている" }
---

## bar
:::en
The tester just sent something down the wire — but what *is* a request, underneath? Strip everything away and it's just a **short string of bytes**. The tester reads them **left to right**, and the **very first byte** decides everything that follows: it names **which service** the tester wants. That first byte is the **Service Identifier (SID)**.
:::
:::jp
テスターがワイヤに何かを送りました ― でも要求とは、突き詰めれば*何*でしょう？ すべてを削ぎ落とすと、それはただの**短いバイト列**です。テスターは**左から右へ**読み、**いちばん最初のバイト**がその後すべてを決めます ― それは「**どのサービス**か」を名指します。この先頭バイトが **サービス識別子（SID）** です。
:::

:::en
- {key} **Byte 1 — the SID.** Which service to run. `$10` = "switch **session**" (the *mode the ECU is in*), `$22` = "read data", `$19` = "read faults".
- **The bytes after it — parameters.** They fine-tune the request. In `10 03`, the `03` picks *which* session — the **Extended** session, a mode past the plain power-up default that unlocks more services.
:::
:::jp
- {key} **バイト1 ― SID。** どのサービスを実行するか。`$10`＝「**セッション**切替」（ECUの*動作モード*）、`$22`＝「データ読取」、`$19`＝「故障読取」。
- **その後のバイト ― 引数。** 要求を細かく調整します。`10 03` の `03` は「*どの*セッションか」を選びます ― 電源投入時のデフォルトより先の、より多くのサービスを解放する**拡張**セッション。
:::

:::en
*Throughout this module we follow one example — `$10`, switch session — because it's easy to picture. Every other service is read the very same way: the SID first, then its parameters.*
:::
:::jp
*この章では、思い描きやすい `$10`（セッション切替）という1つの例を通して使います。他のどのサービスも読み方はまったく同じ ― まずSID、続いて引数です。*
:::

## leg:anatomy
:::en
Every request follows the **same shape**, no matter which service it is:
:::
:::jp
どの要求も、サービスが何であれ**同じ形**に従います：
:::

:::figure src=figures/h2-c1-f2_request-anatomy.svg
en: **One byte of service, then its parameters.** The SID is always a single byte; most request services fall in the range `$10`–`$3E`, and zero or more parameter bytes follow.
jp: **1バイトのサービス、続いて引数。** SIDは常に1バイト。ほとんどの要求サービスは `$10`–`$3E` の範囲に収まり、その後に0個以上の引数バイトが続きます。
:::

:::en
- The SID is always **one byte**. Most request services live between `$10` and `$3E` — a few advanced ones sit higher (like `$85`, `$86`).
- After it come the **parameters**: sometimes a one-byte **sub-function** (an option), sometimes **data**, sometimes both — it depends on the service.
:::
:::jp
- SIDは常に**1バイト**。ほとんどの要求サービスは `$10`〜`$3E` に収まります ― 一部の上級サービスはそれより上（`$85`、`$86` など）。
- その後に**引数**が続きます ― 1バイトの**サブファンクション**（選択肢）だったり、**データ**だったり、その両方だったり ― サービス次第です。
:::

:::bytes
10 | SID · $10 | sid
03 | sub-function | sub
:::

## leg:subfn
:::en
When the second byte is a **sub-function**, it isn't a plain number. Its **top bit** is set aside as a **reserved flag** — a one-bit switch the tester *could* raise — while the **lower 7 bits** carry the actual value (here, `03`). Notice the flag exists; what it does comes later.
:::
:::jp
2バイト目が**サブファンクション**のとき、それは単なる数値ではありません。**最上位ビット**は**予約された旗**として取り分けられ（テスターが立て*得る*1ビットのスイッチ）、**下位7ビット**が実際の値（ここでは `03`）を運びます。旗の存在に気づくだけ ― その働きは後ほど。
:::

:::figure src=figures/h2-c1-f3_subfunction-byte.svg
en: **The sub-function byte, split.** The top bit (`0x80`) is a reserved flag; the lower 7 bits are the value.
jp: **サブファンクション・バイトの内訳。** 最上位ビット（`0x80`）は予約された旗、下位7ビットが値です。
:::

:::key
en: What that reserved flag does — and the rule around it — is a drill of its own {{→ V4 · the suppress bit}}. For now: byte 1 is the service, the rest are parameters.
jp: その予約ビットの働き ― そしてそれをめぐる規則 ― は専用ドリルで {{→ V4 · 抑制ビット}}。今は「バイト1がサービス、残りは引数」で十分です。
:::

## footer
:::reading
ISO 14229-1:2020 | cl.8.2 A_PDU; cl.8.3 A_PCI; cl.8.4 SI | A request is a byte string; the first byte is the service identifier (SID)
ISO 14229-1:2020 | cl.8.4, Table 2 | The main request SID range (`$10`–`$3E`; some advanced services sit higher)
ISO 14229-1:2020 | cl.8.2 A_PDU; cl.9.2.2 SubFunction | Parameters after the SID: sub-function and/or data
:::
