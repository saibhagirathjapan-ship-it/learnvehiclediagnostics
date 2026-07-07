---
id: c6
type: concept
order: 70
section: { n: "H2", en: "The life of one request", jp: "1つのリクエストの一生" }
sid: "$11"
title:
  en: "A reset wipes the slate"
  jp: "リセットは白紙に戻す"
short: { en: "Reset $11", jp: "$11 リセット" }
illustration: figures/h2-c6-f1_reset.svg
caption:
  en: "**`11 01` → `51 01`.** An ECU reset reboots the ECU: it comes back in the default session with security re-locked — as if freshly powered on."
  jp: "**`11 01` → `51 01`。** ECUリセットはECUを再起動します ― デフォルトセッションに戻り、セキュリティは再ロック ― 電源を入れ直したように。"
legs:
  - id: chain
    title: { en: "Reboot → default → locked", jp: "再起動 → デフォルト → ロック" }
  - id: survives
    title: { en: "What a reset does not touch", jp: "リセットが触れないもの" }
---

## bar
:::en
Sometimes you want the opposite of keep-alive. **`$11` ECUReset** tells the ECU to **reboot** — and it comes back exactly as it does at power-on: in the **default** session, with **security re-locked**. Anything you had unlocked is gone.
:::
:::jp
ときにはキープアライブの逆が必要です。**`$11` ECUReset** はECUに**再起動**を命じます ― そして電源投入時とまったく同じ状態で戻ります：**デフォルト**セッション、そして**セキュリティは再ロック**。解除していたものは消えます。
:::

:::en
- {key} **`11 01` → `51 01`.** The tester asks for a **hard reset** (`01`); the positive reply just echoes it — `51` = `11 + 0x40`, then the reset type. After replying, the ECU reboots.
- {warn} A reset **re-locks** the ECU. If you were mid-way through an unlocked operation, you begin again from the default session. {{→ V7b · ECUReset}}
:::
:::jp
- {key} **`11 01` → `51 01`。** テスターは**ハードリセット**（`01`）を頼み、肯定応答はそれを反射するだけ ― `51` ＝ `11 + 0x40`、続いてリセット種別。応答してから、ECUは再起動します。
- {warn} リセットはECUを**再ロック**します。解除済みの操作の途中だったなら、デフォルトセッションからやり直しです。{{→ V7b · ECUReset}}
:::

:::bytes
11 | SID · $11 | sid
01 | hardReset | sub
:::

:::bytes
51 | positive SID | pos
01 | reset type | sub
:::

## leg:chain
:::en
It is one short causal chain, and it lands in the same place a timeout does — the safe default:
:::
:::jp
それは短い因果の連鎖で、タイムアウトと同じ場所 ― 安全なデフォルト ― に着きます：
:::

:::en
- **Reboot** — the ECU restarts, as if power were cycled.
- **Default session** — it wakes in the plain power-up default, not whatever you had switched to.
- {key} **Security locked** — every unlock is cleared. This is exactly the end-state a silent timeout reaches. {{→ V5 · sessions}}
:::
:::jp
- **再起動** ― 電源を入れ直したようにECUが起動し直す。
- **デフォルトセッション** ― 切り替えていたモードではなく、素のデフォルトで目覚める。
- {key} **セキュリティはロック** ― すべての解除が消える。これは無言のタイムアウトが着く終状態とまったく同じです。{{→ V5 · セッション}}
:::

## leg:survives
:::en
A reboot clears the ECU's *volatile* state — the session, the unlocks. But it does **not** erase recorded **faults**. The ECU keeps those in a **separate**, non-volatile store of its own — its fault memory — so they survive a reset and a power cycle.
:::
:::jp
再起動はECUの*揮発性*の状態 ― セッションや解除 ― を消します。しかし記録された**故障**は消しません。ECUはそれらを専用の**別の**不揮発ストア ― 故障メモリ ― に保持するので、リセットや電源断を越えて残ります。
:::

:::key
en: That separate fault store is the **Dem**, and it's a module of its own {{→ M3 · fault memory}}.
jp: その別の故障ストアが **Dem** で、独立したモジュールです {{→ M3 · 故障メモリ}}。
:::

## footer
:::reading
ISO 14229-1:2020 | cl.10.3 ECUReset (`$11`), Table 34 | Reset types; a reset returns to the default session
ISO 14229-1:2020 | cl.10.2 (Fig 7) | A return to default re-locks security
AUTOSAR CP R25-11 | Dem cl.1 | Faults live in the Dem — a store separate from request handling (Dcm), surviving a reset
:::
