---
id: c3
type: concept
order: 40
section: { n: "H1", en: "The diagnostics landscape", jp: "診断の全体像" }
title:
  en: "UDS is the top of the stack"
  jp: "UDSはスタックの一番上"
illustration: figures/c3-osi-stack.svg
caption:
  en: "**Meaning on top, wires at the bottom.** Swap the bottom layer — the UDS on top is unchanged."
  jp: "**上に意味、下に配線。** 下の層を差し替えても、上のUDSは変わりません。"
legs:
  - id: addressing
    title: { en: "Aiming a request — one ECU, or all of them", jp: "要求の宛先 ― 1台か、全員か" }
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

## leg:addressing
:::en
When the tester sends a request, it aims it one of two ways:

- **Physical addressing** — point-to-point, to **one specific ECU**.
- **Functional addressing** — a **broadcast**, to **one *or more* ECUs at once** (used when you don't yet know which ECU owns a function).
- {key} However a request is aimed, **each answer comes back physically** — from the single ECU that responded. Requests can be one-to-many; responses are always one-to-one.
:::
:::jp
テスターが要求を送るとき、宛先の付け方は2通りです：

- **物理アドレッシング** ― 1対1、**特定の1台のECU**へ。
- **機能アドレッシング** ― **ブロードキャスト**、**1台*以上*のECUへ同時に**（どのECUが担うかまだ分からないときに使う）。
- {key} どう宛てても、**応答は必ず物理的に**返ります ― 実際に答えた1台から。要求は1対多になり得ますが、応答は常に1対1です。
:::
:::figure src=figures/c3-addressing.svg
en: **Requests can fan out; answers always come back from one.** Functional asks many; each ECU that answers replies point-to-point.
jp: **要求は広がり得るが、応答は必ず1台から。** 機能アドレスは多数に問い、答える各ECUは1対1で返す。
:::

## footer
:::reading
ISO 14229-1:2020 | Introduction, Table 1 | UDS = the OSI application layer (layer 7); the full layer map
ISO 14229-1:2020 | cl.7.4.1.4 (A_TA); cl.8.7.1 | Physical vs functional addressing; responses always physical
:::
