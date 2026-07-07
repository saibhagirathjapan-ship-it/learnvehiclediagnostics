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
- **Communication management** — set up and steer the conversation. The ECU provides `$10` to open a session, `$11` to reset, `$3E` to stay connected. {{→ V7a · $10}}
- **Data transmission** — read and write named values. The ECU provides `$22` to read a value, `$2E` to write one. {{→ M2 · data}}
- **Stored data** — the fault memory. The ECU provides `$19` to read stored faults, `$14` to clear them. {{→ M3 · faults}}
- **Input/output control** — take direct control of a signal. The ECU provides `$2F` to force an input or output. {{→ M5 · routines & I/O}}
- **Routine** — run a built-in procedure. The ECU provides `$31` to start, stop, or check a routine. {{→ M5 · routines & I/O}}
- **Upload/download** — move a block of memory in or out. The ECU provides `$34`, `$36`, and `$37` to load new software. {{→ M6 · reprogramming}}
:::
:::jp
- **通信管理** ― 会話を整え、操ります。ECUは `$10` でセッションを開き、`$11` でリセットし、`$3E` で接続を保ちます。{{→ V7a · $10}}
- **データ伝送** ― 名前つきの値を読み書きします。ECUは `$22` で値を読み、`$2E` で書きます。{{→ M2 · データ}}
- **保存データ** ― 故障メモリ。ECUは `$19` で保存された故障を読み、`$14` で消去します。{{→ M3 · 故障}}
- **入出力制御** ― 信号を直接制御します。ECUは `$2F` で入力や出力を強制します。{{→ M5 · ルーチンとI/O}}
- **ルーチン** ― 組み込みの手順を走らせます。ECUは `$31` でルーチンを開始・停止・確認します。{{→ M5 · ルーチンとI/O}}
- **アップロード／ダウンロード** ― メモリの塊を出し入れします。ECUは `$34`・`$36`・`$37` で新しいソフトを読み込みます。{{→ M6 · 再プログラミング}}
:::

:::en
Those six cover everything UDS can do. One more thing runs across all of them: **security**.
:::
:::jp
この6つで、UDSにできることはすべて尽くされます。もう1つ、6つすべてをまたぐものがあります ― **セキュリティ**です。
:::

## leg:security
:::en
Some services are dangerous — reprogram the ECU, or change a protected setting. The ECU does not offer these freely. They sit behind a **security** gate that cuts across all six families, and the ECU provides `$27` to unlock it.
:::
:::jp
一部のサービスは危険です ― ECUの再プログラミングや、保護された設定の変更。ECUはこれらを自由には差し出しません。6つの族すべてをまたぐ**セキュリティ**の門の内側にあり、ECUは `$27` を差し出してそれを解錠します。
:::

:::figure src=figures/h3-c2-f2_security-gate.svg
en: **Security gates the risky services.** Unlock the ECU first (`$27`); only then do the guarded services inside the families open up.
jp: **セキュリティが危険なサービスを守る。** まずECUをロック解除し（`$27`）、そのときはじめて、各族の中の守られたサービスが開きます。
:::

:::en
- {key} You can always **read**; you must **unlock** to change the dangerous things. Security is not a seventh family — it is a guard that sits across the six. {{→ M4 · security & access}}
:::
:::jp
- {key} **読む**のはいつでもできますが、危険なものを**変える**にはロック解除が要ります。セキュリティは7つ目の族ではなく、6つをまたぐ門番です。{{→ M4 · セキュリティとアクセス}}
:::

## footer
:::reading
ISO 14229-1:2020 | cl.10–15 | The six functional units: communication management, data transmission, stored data, input/output control, routine, upload/download
ISO 14229-1:2020 | cl.10.4 | SecurityAccess (`$27`) — the security gate that guards protected services, not a seventh unit
:::
