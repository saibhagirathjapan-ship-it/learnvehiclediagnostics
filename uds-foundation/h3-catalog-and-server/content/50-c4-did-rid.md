---
id: c4
type: concept
order: 50
section: { n: "H3", en: "What UDS can do, and how the ECU decides", jp: "UDSに何ができ、ECUがどう決めるか" }
title:
  en: "Naming which value, and which routine"
  jp: "どの値か、どのルーチンかを指す"
short: { en: "DIDs & RIDs", jp: "DIDとRID" }
illustration: figures/h3-c4-f1_did-rid-spaces.svg
caption:
  en: "**A service names a job; a 16-bit number names the target.** Data lives at a **DID**; a routine lives at a **RID** — each a 2-byte address, 65,536 slots wide."
  jp: "**サービスは仕事を指し、16ビットの番号が対象を指します。** データは **DID**、ルーチンは **RID** にあり ― それぞれ2バイトのアドレス、65,536個の枠です。"
legs:
  - id: did
    title: { en: "What lives at a DID", jp: "DIDには何があるか" }
---

## bar
:::en
The **data** and **routine** families need one more thing from you. The SID names the family's job, but not *which* value to read, or *which* routine to run. That answer is a second number — 16 bits (2 bytes) wide.
:::
:::jp
**データ**族と**ルーチン**族は、もう1つ、あなたに求めます。SIDは族の仕事を指しますが ― *どの*値を読むか、*どの*ルーチンを走らせるかは指しません。その答えが、2つ目の番号 ― 16ビット（2バイト）の幅です。
:::

:::en
- A **DID** — a **data identifier** — names one data item. `$22` plus a DID reads that item. Example: one DID holds the vehicle's VIN, another the engine speed.
- A **RID** — a **routine identifier** — names one routine. `$31` plus a RID runs that routine. Example: a RID for "erase a memory block".
:::
:::jp
- **DID** ― **データ識別子** ― は、1つのデータ項目を指します。`$22` にDIDを添えると、その項目を読みます。例：あるDIDには車のVIN、別のDIDにはエンジン回転数。
- **RID** ― **ルーチン識別子** ― は、1つのルーチンを指します。`$31` にRIDを添えると、そのルーチンを走らせます。例：「メモリブロックを消去する」ためのRID。
:::

:::en
Each number is 2 bytes, so each space runs from `0000` to `FFFF` — **65,536** slots. The catalog is not just six families; inside two of them lie huge, numbered address spaces.
:::
:::jp
どちらの番号も2バイトなので、各空間は `0000` から `FFFF` まで ― **65,536** 個の枠です。カタログは6つの族だけではありません。そのうち2つの中には、番号のついた広大なアドレス空間が広がっています。
:::

## leg:did
:::en
The 65,536 DID slots are not a free-for-all. The standard reserves some ranges for well-known items, so a VIN sits at the same DID in every ECU; other ranges are left for each manufacturer to fill.
:::
:::jp
65,536個のDID枠は、無秩序ではありません。標準は一部の範囲を、よく知られた項目のために予約します ― だからVINはどのECUでも同じDIDにあります。ほかの範囲は、各メーカーが埋めるために空けてあります。
:::

:::figure src=figures/h3-c4-f2_did-map.svg
en: **The DID space is mapped, not random.** Standard ranges hold known items (same everywhere); manufacturer ranges are theirs to define.
jp: **DID空間は地図があり、でたらめではありません。** 標準範囲は既知の項目（どこでも同じ）、メーカー範囲は各社が定義します。
:::

:::en
- {key} Naming a value by number is what makes reads and writes work the same on every ECU — you ask for a DID, not a memory address. {{→ M2 · data}}
:::
:::jp
- {key} 値を番号で指すからこそ、読み書きはどのECUでも同じに動きます ― メモリ番地ではなく、DIDを指します。{{→ M2 · データ}}
:::

## footer
:::reading
ISO 14229-1:2020 | cl.11 (ReadDataByIdentifier `$22`) | Data is addressed by a 2-byte dataIdentifier (DID), range `0000`–`FFFF`
ISO 14229-1:2020 | cl.14 (RoutineControl `$31`) | A routine is addressed by a 2-byte routineIdentifier (RID)
:::
