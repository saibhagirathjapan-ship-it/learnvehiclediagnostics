---
id: c2
type: concept
order: 30
section: { n: "H1", en: "The diagnostics landscape", jp: "診断の全体像" }
title:
  en: "The ISO 14229 family, and its neighbours"
  jp: "ISO 14229 ファミリーと、その隣人たち"
illustration: figures/h1-c2-f1_family-map.svg
caption:
  en: "**One family, split by the job each part does** — say it (-1), keep the session (-2), carry it (-3…-7)."
  jp: "**役割で分けた一つの一族** ― 話す（-1）、セッションを保つ（-2）、運ぶ（-3…-7）。"
legs:
  - id: adapters
    title: { en: "The -x parts are thin adapters — the language doesn't change", jp: "-x は薄いアダプタ ― 言語は変わらない" }
  - id: neighbours
    title: { en: "Who runs UDS, and who lives next door", jp: "誰がUDSを動かし、誰が隣に住むか" }
---

## bar
:::en
"ISO 14229" is not one document but a **family of parts**, split by the **job** each one does:
:::
:::jp
「ISO 14229」は1つの文書ではなく、それぞれの**役割**で分けた**パーツの一族**です：
:::

:::en
- **Part 1 — the services.** The language itself: `$10`, `$22`, `$19` … *What to say.*
- **Part 2 — the session.** Sessions and timing (P2, S3). *Keeping the conversation open.*
- **Parts 3–7 — the transport bindings.** UDSon CAN · FlexRay · IP (DoIP) · K-Line · LIN. *How it travels.*
:::
:::jp
- **第1部 ― サービス。** 言語そのもの：`$10`、`$22`、`$19` … *何を言うか。*
- **第2部 ― セッション。** セッションとタイミング（P2、S3）。*会話を保ち続ける。*
- **第3〜7部 ― トランスポート・バインディング。** UDSon CAN・FlexRay・IP（DoIP）・K-Line・LIN。*どう運ぶか。*
:::

## leg:adapters
:::en
The transport parts are **thin adapters** — they change **nothing** about the language.

- The same service `$10` means "switch session" whether it rides over **CAN** today or **Ethernet (DoIP)** tomorrow.
- Each binding only handles one wire's mechanics: **split** a long message into frames, then **reassemble** it.
- {key} Swap the wire, keep the language. How the message actually descends the stack is its own drill {{→ V8 · transport descent}}.
:::
:::jp
トランスポートの各部は**薄いアダプタ**で、言語については**何も**変えません。

- サービス `$10`（セッション切替）は、今日 **CAN** を走ろうと明日 **Ethernet（DoIP）** を走ろうと同じ意味です。
- 各バインディングは1種類の配線の力学だけを扱います ― 長い電文を**分割**し、また**再結合**する。
- {key} 配線を替え、言語は保つ。電文が実際にどうスタックを降りるかは専用ドリルで {{→ V8 · 搬送層への降下}}。
:::
:::figure src=figures/h1-c2-f2_thin-adapters.svg
en: **Same `$10`, different wires.** The service is identical; only the carrier underneath changes.
jp: **同じ `$10`、違う配線。** サービスは同一で、下の運び手だけが変わります。
:::

## leg:neighbours
:::en
UDS does not live alone. Around it sit the software that runs it, and its relatives:

- {key} **Dcm** *runs* UDS inside the ECU {{→ V9 · the Dcm pipeline}}; **Dem** is the **fault memory** {{→ M3 · Fault memory}}.
- **ODX** is a file that **describes** an ECU's data; **SOVD** is the **web-API successor** this course heads toward {{→ M9 · SOVD}}.
- **J1939** is the heavy-duty (truck & bus) profile; **Dlt** is developer logging — not diagnostics.
:::
:::jp
UDSは単独では住んでいません。周りには、それを動かすソフトと、親戚たちがいます：

- {key} **Dcm** はECUの中でUDSを*動かし* {{→ V9 · Dcmパイプライン}}、**Dem** は不具合を保存する**故障メモリ**です {{→ M3 · 故障メモリ}}。
- **ODX** はECUのデータを**記述する**ファイル、**SOVD** はこのコースが目指す**Web APIの後継**です {{→ M9 · SOVD}}。
- **J1939** は商用車（トラック・バス）向けのプロファイル、**Dlt** は開発用ログ ― 診断ではありません。
:::
:::figure src=figures/h1-c2-f3_neighbours.svg
en: **Dcm speaks UDS · Dem remembers · ODX describes · SOVD is where we're going.**
jp: **Dcmが話し・Demが覚え・ODXが記述し・SOVDが行き先。**
:::

## footer
:::reading
ISO 14229-1:2020 | Introduction, Table 1 | The 14229 part family and its OSI-layer mapping
ISO 14229-2:2021 | cl.1 Scope | The session layer (Part 2) — sessions & timing
AUTOSAR CP R25-11 | Dcm cl.1 · Dem cl.1 | Dcm runs UDS · Dem is the fault memory
:::
