---
id: concl
type: conclusion
order: 50
eyebrow: "Section recap · まとめ"
---

## body
:::en
Diagnostics is a **conversation** with the car's many ECUs, held in one shared language: **UDS (ISO 14229)**, a set of numbered **services**. Every exchange has two fixed roles — the **tester (client)** asks, the **ECU (server)** answers, never the other way round. ISO 14229 is a **family**: Part 1 is the services, Part 2 the session, Parts 3–7 the transport bindings that carry the same language over CAN, IP, K-Line or LIN. And UDS is only the **top of the stack** — pure meaning, riding on a transport you can swap out. Around it live **Dcm** (runs UDS), **Dem** (stores faults), **ODX**, and **SOVD** — the destination.
:::
:::jp
診断とは、車の多数のECUとの**会話**であり、1つの共通言語 ― 番号付き**サービス**の集合、**UDS（ISO 14229）** ― で行われます。あらゆるやり取りには2つの固定役割があります ― **テスター（クライアント）** が尋ね、**ECU（サーバー）** が答える。逆はありません。ISO 14229は**一族**です ― 第1部がサービス、第2部がセッション、第3〜7部が同じ言語をCAN・IP・K-Line・LINで運ぶトランスポート・バインディング。そしてUDSは**スタックの一番上**だけ ― 純粋な意味であり、差し替え可能なトランスポートに乗ります。その周りに **Dcm**（UDSを動かす）、**Dem**（故障を保存）、**ODX**、そして到達点の **SOVD** が住みます。
:::

:::key
en: **You can now** place any UDS document on this map (services / session / transport), and name the two roles in any exchange. That is the whole high-level picture — the drills only add depth.
jp: **これであなたは** どのUDS文書もこの地図（サービス／セッション／トランスポート）に置け、あらゆるやり取りの2役割を言えます。これで全体像は揃いました ― ドリルは深さを足すだけです。
:::

:::recall
q_en: An engineer says, "the ECU pinged my tester on its own to report a fault." One word in that sentence breaks a rule you just learned — which, and why?
q_jp: あるエンジニアが「ECUが自分から私のテスターに連絡して故障を報告した」と言います。この文のある一語が、今学んだ規則を破っています ― どれで、なぜ？
a_en: **"on its own."** The ECU is the **server** — it never *starts* a diagnostic conversation. The tester (client) always asks first; the ECU replies. (One advanced service, **ResponseOnEvent**, lets the client *arm* an ECU to send later event reports — but even then the client set it up first. We meet it much later.)
a_jp: **「自分から」**。ECUは**サーバー**で、診断の会話を自分から*始める*ことはありません。テスター（クライアント）が必ず先に尋ね、ECUが答えます。（上級サービスの一つ **ResponseOnEvent** は、クライアントがECUを*仕込んで*おき、後でイベント通知を送らせます ― ただしその場合も、先に設定したのはクライアントです。詳しくはずっと後で。）
:::

:::en
Next, **H2** takes this map and follows **one single request** all the way through — from the tester's send, into the ECU, and back out as an answer. One exchange, traced end to end.
:::
:::jp
次の **H2** では、この地図を手に、**たった1つの要求**を最後まで追いかけます ― テスターの送信からECUの中へ、そして答えとなって戻るまで。1回のやり取りを、端から端まで。
:::
