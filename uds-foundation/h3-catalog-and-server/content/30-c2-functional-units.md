---
id: c2
type: concept
order: 30
section: { n: "H3", en: "What UDS can do, and how the ECU decides", jp: "UDSに何ができ、ECUがどう決めるか" }
title:
  en: "The six families of services"
  jp: "サービスの6つの族"
short: { en: "Six families", jp: "6つの族" }
illustration: figures/h3-c2-f1_six-families.svg
caption:
  en: "**Every UDS service belongs to one of six families.** Each family is one kind of job the ECU offers — talk, read data, read faults, control a signal, run a routine, or move memory."
  jp: "**どのUDSサービスも、6つの族のどれかに属します。** 各族は、ECUが差し出す仕事の1種類 ― 会話、データ読み取り、故障読み取り、信号制御、ルーチン実行、メモリ転送。"
legs:
  - id: comms
    title: { en: "The first family — the services you already met", jp: "最初の族 ― すでに出会ったサービス" }
  - id: security
    title: { en: "Security — the guard across the families", jp: "セキュリティ ― 族をまたぐ門番" }
---

## bar
:::en
An ECU offers many services. To keep them straight, the standard sorts them into **six families** — the *functional units* named a moment ago. Each family is one kind of job the ECU provides.
:::
:::jp
ECUは多くのサービスを差し出します。それらを整理するため、標準は**6つの族**にまとめます ― さきほど名づけた*機能ユニット*です。各族は、ECUが差し出す仕事の1種類です。
:::

:::en
- **Communication management** — set up and steer the conversation. This family holds `$10` (open a session), `$11` (reset), and `$3E` (stay connected) — the three you met in H2.
- **Data transmission** — read and write named values. The ECU provides `$22` to read a value, `$2E` to write one.
- **Stored data** — the fault memory. The ECU provides `$19` to read stored faults, `$14` to clear them.
- **Input/output control** — take direct control of a signal. The ECU provides `$2F` to force an input or output.
- **Routine** — run a built-in procedure. The ECU provides `$31` to start, stop, or check a routine.
- **Upload/download** — move a block of memory in or out. The ECU provides `$34`, `$36`, and `$37` to load new software.
:::
:::jp
- **通信管理** ― 会話を整え、操ります。この族には `$10`（セッションを開く）・`$11`（リセット）・`$3E`（接続を保つ）があります ― H2で出会った3つです。
- **データ伝送** ― 名前つきの値を読み書きします。ECUは `$22` で値を読み、`$2E` で書きます。
- **保存データ** ― 故障メモリ。ECUは `$19` で保存された故障を読み、`$14` で消去します。
- **入出力制御** ― 信号を直接制御します。ECUは `$2F` で入力や出力を強制します。
- **ルーチン** ― 組み込みの手順を走らせます。ECUは `$31` でルーチンを開始・停止・確認します。
- **アップロード／ダウンロード** ― メモリの塊を出し入れします。ECUは `$34`・`$36`・`$37` で新しいソフトを読み込みます。
:::

:::en
Two of these families point at a target with a second number. To read or write **data** (`$22`/`$2E`), or run a **routine** (`$31`), the service names the job — and a 16-bit **identifier** names *which* one: a **DID** for a data item, a **RID** for a routine. You ask by number, not by memory address. {{→ M2 · data}} · {{→ M5 · routines & I/O}}
:::
:::jp
このうち2つの族は、対象を2つ目の番号で指します。**データ**を読み書きする（`$22`/`$2E`）か、**ルーチン**を走らせる（`$31`）とき、サービスは仕事を指し ― 16ビットの**識別子**が*どれ*かを指します：データ項目には **DID**、ルーチンには **RID**。メモリ番地ではなく、番号で頼みます。{{→ M2 · データ}} · {{→ M5 · ルーチンとI/O}}
:::

:::en
Those six families cover everything UDS can do. Two of them repay a closer look right now: the **first** family — where the three services you already know live — and **security**, a guard that runs across all six.
:::
:::jp
この6つの族で、UDSにできることはすべて尽くされます。今すぐ詳しく見る価値があるのは2つ ― **最初の**族（すでに知る3つのサービスがある場所）と、6つすべてをまたぐ門番、**セキュリティ**です。
:::

## leg:comms
:::en
The three services you met in H2 — `$10`, `$11`, `$3E` — share one trait: they act on the **conversation**, not on the vehicle. That is what the first family, **communication management**, is for. Each has its own page for the detail.
:::
:::jp
H2で出会った3つのサービス ― `$10`・`$11`・`$3E` ― には共通点が1つあります：車ではなく、**会話**に働きかけるのです。それこそ最初の族、**通信管理**の役目です。3つそれぞれに、詳細を扱う専用ページがあります。
:::

:::figure src=figures/h3-c2-f2_comms-family.svg
en: **The three you know live in the first family.** `$10`, `$11`, and `$3E` steer the conversation; the same family also holds the access-control services and the fault-logging switch.
jp: **知っている3つは、最初の族にある。** `$10`・`$11`・`$3E` は会話を操ります。同じ族には、アクセス制御のサービスと、故障記録の切り替えもあります。
:::

:::en
- `$10` — open or switch a session. {{→ V7a · $10 DiagnosticSessionControl}}
- `$11` — reset the ECU. {{→ V7b · $11 ECUReset}}
- `$3E` — keep the session alive. {{→ V7c · $3E TesterPresent}}
- The same family also holds `$27`/`$28`/`$29` — the access-control services — and `$85`, which pauses fault logging during test work. {{→ M4 · security & access}} · {{→ M3 · faults}}
:::
:::jp
- `$10` ― セッションを開く・切り替える。{{→ V7a · $10 DiagnosticSessionControl}}
- `$11` ― ECUをリセットする。{{→ V7b · $11 ECUReset}}
- `$3E` ― セッションを保つ。{{→ V7c · $3E TesterPresent}}
- 同じ族には `$27`/`$28`/`$29`（アクセス制御のサービス）と、試験作業中に故障記録を止める `$85` もあります。{{→ M4 · セキュリティとアクセス}} · {{→ M3 · 故障}}
:::

## leg:security
:::en
Some services are dangerous — reprogram the ECU, or change a protected setting. The ECU does not offer these freely. They sit behind a **security** gate, and the ECU provides `$27` to unlock it.
:::
:::jp
一部のサービスは危険です ― ECUの再プログラミングや、保護された設定の変更。ECUはこれらを自由には差し出しません。**セキュリティ**の門の内側にあり、ECUは `$27` を差し出してそれを解錠します。
:::

:::figure src=figures/h3-c2-f3_security-gate.svg
en: **Security gates the risky services.** Unlock the ECU first (`$27`); only then do the guarded services — scattered across the families — open up.
jp: **セキュリティが危険なサービスを守る。** まずECUを解錠し（`$27`）、そのときはじめて、各族に散らばる守られたサービスが開きます。
:::

:::en
- {key} You can always **read**; you must **unlock** to change the dangerous things. Security is not a seventh family — it is a guard that cuts across the six. {{→ M4 · security & access}}
:::
:::jp
- {key} **読む**のはいつでもできますが、危険なものを**変える**には解錠が要ります。セキュリティは7つ目の族ではなく、6つをまたぐ門番です。{{→ M4 · セキュリティとアクセス}}
:::

## footer
:::reading
ISO 14229-1:2020 | cl.10–15 | The six functional units: communication management, data transmission, stored data, input/output control, routine, upload/download
ISO 14229-1:2020 | cl.10, Table 22 | The communication-management unit holds `$10`/`$11`/`$3E`, plus `$27`/`$28`/`$29` and `$85`
ISO 14229-1:2020 | cl.11 & cl.14 | Data addressed by a 2-byte DID (`$22`/`$2E`); a routine by a 2-byte RID (`$31`)
ISO 14229-1:2020 | cl.10.4 | SecurityAccess (`$27`) — the guard across the families, not a seventh unit
:::
