---
id: c6
type: concept
order: 70
section: { n: "H3", en: "What UDS can do, and how the ECU decides", jp: "UDSに何ができ、ECUがどう決めるか" }
title:
  en: "Placing the services you already know"
  jp: "すでに知るサービスを、地図に置く"
short: { en: "$10 · $11 · $3E", jp: "$10・$11・$3E" }
illustration: figures/h3-c6-f1_comms-family.svg
caption:
  en: "**`$10`, `$11`, and `$3E` all live in the first family — communication management.** They steer the conversation itself, rather than read or change the vehicle."
  jp: "**`$10`・`$11`・`$3E` はすべて、最初の族 ― 通信管理 ― にあります。** 車を読み書きするのではなく、会話そのものを操ります。"
legs:
  - id: others
    title: { en: "The rest of the family", jp: "族の残りのメンバー" }
---

## bar
:::en
The three services you met in H2 — `$10`, `$11`, and `$3E` — share something the other services do not: they act on the **conversation**, not on the vehicle. That places all three in the first family, **communication management**.
:::
:::jp
H2で出会った3つのサービス ― `$10`・`$11`・`$3E` ― には、ほかのサービスにない共通点があります：車ではなく、**会話**に働きかけるのです。だから3つとも、最初の族 ― **通信管理** ― に入ります。
:::

:::en
The other five families reach into the vehicle — its data, its faults, its parts. This one manages the exchange itself: opening it, holding it, closing it. Each of the three has its own page for the detail.
:::
:::jp
ほかの5つの族は、車に手を伸ばします ― データ、故障、部品に。この族は、やり取りそのものを扱います ― 開き、保ち、閉じる。3つそれぞれに、詳細を扱う専用ページがあります。
:::

:::en
- `$10` — the session control. {{→ V7a · $10 DiagnosticSessionControl}}
- `$11` — the reset. {{→ V7b · $11 ECUReset}}
- `$3E` — the stay-alive. {{→ V7c · $3E TesterPresent}}
:::
:::jp
- `$10` ― セッション制御。{{→ V7a · $10 DiagnosticSessionControl}}
- `$11` ― リセット。{{→ V7b · $11 ECUReset}}
- `$3E` ― キープアライブ。{{→ V7c · $3E TesterPresent}}
:::

## leg:others
:::en
This same family holds a few more services you will meet later. They also manage the conversation rather than the vehicle.
:::
:::jp
この同じ族には、あとで出会うサービスがいくつかあります。これらも、車ではなく会話を扱います。
:::

:::figure src=figures/h3-c6-f2_family-members.svg
en: **The communication-management family.** Alongside `$10`/`$11`/`$3E` sit the access-control services and the switch that silences fault logging during work.
jp: **通信管理の族。** `$10`/`$11`/`$3E` の隣には、アクセス制御のサービスと、作業中に故障記録を止める切り替えがあります。
:::

:::en
- `$27`, the security unlock from a moment ago, is formally a member of this family too. {{→ M4 · security & access}}
- The ECU provides `$28` and `$29` to control who may talk and what they may reach. {{→ M4 · security & access}}
- The ECU provides `$85` to switch fault logging off, so ordinary test work does not fill the fault memory. {{→ M3 · faults}}
:::
:::jp
- `$27` ― さきほどのセキュリティのロック解除 ― も、正式にはこの族の一員です。{{→ M4 · セキュリティとアクセス}}
- ECUは `$28` と `$29` を差し出し、誰が話せるか、何に届けるかを制御します。{{→ M4 · セキュリティとアクセス}}
- ECUは `$85` を差し出し、故障記録を止めて、ふだんの試験作業が故障メモリを埋めないようにします。{{→ M3 · 故障}}
:::

## footer
:::reading
ISO 14229-1:2020 | cl.10, Table 22 | The Diagnostic and communication management functional unit — its member services, including `$10`/`$11`/`$3E`
ISO 14229-1:2020 | cl.10.4, 10.5, 10.6 | SecurityAccess `$27`, CommunicationControl `$28`, Authentication `$29` — same family
:::
