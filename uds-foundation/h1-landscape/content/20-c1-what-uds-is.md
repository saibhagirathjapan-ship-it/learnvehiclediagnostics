---
id: c1
type: concept
order: 20
section: { n: "H1", en: "The diagnostics landscape", jp: "診断の全体像" }
title:
  en: "What UDS is, and who talks"
  jp: "UDSとは何か、そして誰が話すのか"
illustration: figures/h1-c1-f1_client-server.svg
caption:
  en: "**One language, two fixed roles.** The tester (client) always asks; the ECU (server) only answers — never the other way round."
  jp: "**1つの言語、2つの固定役割。** テスター（クライアント）が必ず尋ね、ECU（サーバー）は答えるだけ ― 逆はありません。"
legs:
  - id: dictionary
    title: { en: "One shared dictionary of services", jp: "サービスの共通辞書" }
  - id: server
    title: { en: "\"Server\" means the ECU — not a big machine", jp: "「サーバー」＝ECU、大きな機械ではない" }
---

## bar
:::en
**UDS** is the shared request-and-answer language a tester and an ECU both speak. It always runs the same way — **one request, one response** — between two fixed roles:
:::
:::jp
**UDS** は、テスターとECUがともに話す「要求と応答」の共通言語です。動き方はいつも同じ ― **1つの要求、1つの応答** ― そして役割は2つに固定されています：
:::

:::en
- {key} **Client — the tester.** It always speaks first; it sends the request.
- {key} **Server — the ECU.** It waits, and answers only when asked — it never starts the conversation.
:::
:::jp
- {key} **クライアント ― テスター。** いつも先に話し、要求を送ります。
- {key} **サーバー ― ECU。** 待っていて、尋ねられたときだけ答えます ― 自分から会話を始めることはありません。
:::

## leg:dictionary
:::en
- UDS is written down as one international standard, **ISO 14229**.
- It defines a set of **services** — each is one thing the tester can ask: read a fault, reset, unlock a function, reprogram.
- Every service has a **number** so both sides mean the same thing; any compliant tool can talk to any compliant ECU. You'll read those numbers, byte by byte, in the next chapter {{→ H2}}.
:::
:::jp
- UDSは1つの国際規格 **ISO 14229** として文書化されています。
- **サービス**の集合を定義します ― 各サービスは「テスターが頼める1つの動作」：故障を読む、再起動、機能の解除、再書込み。
- 各サービスには**番号**があり、双方が同じ意味を指します。規格に沿ったどのツールも、どのECUとでも話せます。その番号は次章でバイト単位に読みます {{→ H2}}。
:::
:::figure src=figures/h1-c1-f2_shared-dictionary.svg
en: **One dictionary, looked up from both ends.** Tester and ECU agree on the same numbered services.
jp: **一つの辞書を、両端から引く。** テスターとECUが同じ番号のサービスで一致します。
:::

## leg:server
:::en
"Server" here is **not** a big machine in a data centre.

- {key} **Server = the ECU being asked.** A matchbox-sized brake controller is a "server."
- The word is only about **who answers** — never about size or power.
:::
:::jp
ここでの「サーバー」は、データセンターの大きな機械では**ありません**。

- {key} **サーバー＝尋ねられる側のECU。** マッチ箱ほどのブレーキ制御ユニットも「サーバー」です。
- この語は「**答えるのは誰か**」を言うだけ ― 大きさや性能とは無関係です。
:::

## footer
:::reading
ISO 14229-1:2020 | cl.7 Application layer services | The client–server model — six service primitives, one request → one response
ISO 14229-1:2020 | cl.1 Scope; cl.3 Terms & definitions | "client", "server", "ECU"
:::
