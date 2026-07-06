---
id: brief
type: brief
order: 10
eyebrow: "Start here · まずここから"
---

## body
:::en
In **H1** you learned the two roles: the **tester** asks, the **ECU** answers. Now we zoom in on a single question and follow it the whole way.

One request is a short handful of **bytes**. The tester sends them; the ECU reads them, does the work, and sends **one answer** straight back. That round trip is the heartbeat of all diagnostics — every fault read, every reset, every reflash is built from it.
:::
:::jp
**H1** では2つの役割を学びました ― **テスター**が尋ね、**ECU**が答える。今度は、たった1つの問いに絞って、それを最後まで追いかけます。

1つの要求は、ほんの数**バイト**です。テスターがそれを送り、ECUが読み、作業をして、**1つの答え**をすぐに返します。この往復こそ、あらゆる診断の鼓動です ― 故障の読み取りも、再起動も、再書き込みも、すべてこれの積み重ねです。
:::

:::en
1. The tester sends a request — a few bytes, starting with **which service** it wants.
2. Inside, the ECU reads the request, checks it, and does the work.
3. The ECU sends back **one** answer — a "yes, here it is" or a "no, and here's why".
:::
:::jp
1. テスターが要求を送ります ― 数バイト、先頭は「**どのサービス**か」。
2. ECUの中では、要求を読み、確認し、作業をします。
3. ECUは**1つ**の答えを返します ― 「はい、これです」か、「いいえ、理由はこれです」。
:::

:::figure src=figures/brief-beat.svg
en: **One request, one answer.** The tester sends bytes out; the ECU serves them and sends a single answer back. This one round trip is the beat we trace all through H2.
jp: **1つの要求、1つの答え。** テスターがバイトを送り、ECUが処理して1つの答えを返す。この往復が、H2を通して追う「1拍」です。
:::

:::key
en: Watch this one beat closely and the whole of UDS opens up — because every service, however powerful, is still just **one request and one answer**.
jp: この1拍をよく見れば、UDS全体が開けます ― どんなに強力なサービスも、結局は**1つの要求と1つの答え**だからです。
:::

:::reading
ISO 14229-1:2020 | cl.7.1 General | The client–server exchange as one request → one response
ISO 14229-1:2020 | cl.8.1 General; cl.8.2 A_PDU | A message is a byte string (A_Data) built from A_PCI + parameters
:::
