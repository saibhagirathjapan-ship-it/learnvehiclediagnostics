---
id: c3
type: concept
order: 40
section: { n: "H1", en: "The diagnostics landscape", jp: "診断の全体像" }
title:
  en: "UDS is the top of the stack"
  jp: "UDSはスタックの一番上"
illustration: figures/h1-c3-f1_osi-stack.svg
caption:
  en: "**Meaning on top, wires at the bottom.** Swap the bottom layer — the UDS on top is unchanged."
  jp: "**上に意味、下に配線。** 下の層を差し替えても、上のUDSは変わりません。"
---

## bar
:::en
Engineers picture any communication as a **stack of layers**. UDS is **only the top** — it fixes the **meaning** of a message and says nothing about wires:
:::
:::jp
エンジニアは通信を**階層の積み重ね**として描きます。UDSは**一番上だけ** ― メッセージの**意味**を定め、配線については何も言いません：
:::

:::en
- **Top — UDS: the meaning.** "Switch session", "reset the ECU". The application layer.
- **Middle — transport.** Carries the message; splits a long one into frames, then reassembles it.
- **Bottom — the physical bus.** The actual wires: CAN, Ethernet, K-Line …
- {key} Because UDS fixes only meaning, the **same** services ride over CAN today or Ethernet (**DoIP**) tomorrow {{→ V8 · transport descent}}.
:::
:::jp
- **上 ― UDS：意味。** 「セッション切替」「ECU再起動」。アプリケーション層。
- **中 ― トランスポート。** 電文を運ぶ。長い電文はフレームに分割し、再結合する。
- **下 ― 物理バス。** 実際の配線：CAN、Ethernet、K-Line …
- {key} UDSは意味だけを固定するので、**同じ**サービスが今日CANを、明日Ethernet（**DoIP**）を走ります {{→ V8 · 搬送層への降下}}。
:::

## footer
:::reading
ISO 14229-1:2020 | Introduction, Table 1 | UDS = the OSI application layer (layer 7); the full layer map
ISO 14229-1:2020 | cl.6 (transport-independence) | The application layer is defined independently of the transport
:::
