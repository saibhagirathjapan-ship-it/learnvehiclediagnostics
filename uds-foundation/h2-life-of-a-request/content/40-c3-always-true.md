---
id: c3
type: concept
order: 40
section: { n: "H2", en: "The life of one request", jp: "1つのリクエストの一生" }
title:
  en: "Four rules hold around every beat"
  jp: "どの1拍にも成り立つ4つの規則"
short: { en: "Four rules", jp: "4つの規則" }
illustration: figures/c3-four-rules.svg
caption:
  en: "**Whatever the single request is, these four are always true** — how it's aimed, how the session stays open, where faults go, and what a reset undoes."
  jp: "**その1つの要求が何であれ、この4つは常に真** ― どう宛てるか、セッションをどう保つか、故障はどこへ、リセットが何を戻すか。"
legs:
  - id: addressing
    title: { en: "Aiming a request — one ECU, or all of them", jp: "要求の宛先 ― 1台か、全員か" }
  - id: lifecycle
    title: { en: "A session's life — open it, hold it, and how it ends", jp: "セッションの一生 ― 開き、保ち、そして終わる" }
---

## bar
:::en
You've just watched one beat up close. So what holds for *every* beat — whatever the request asks? **Four rules**, always:
:::
:::jp
1拍を間近で見ました。では、要求が何であれ*どの*拍にも成り立つのは何でしょう？ ― **4つの規則**、常に：
:::

:::en
- {key} **Aim — one ECU, or all of them.** A request can go to a **single** ECU (*physical*) or be **broadcast** to many (*functional*) — yet every answer comes back from **one** ECU alone.
- **Stay open — `$3E` holds the session.** A **non-default session** (any mode past the plain power-up default) **times out** if the tester falls silent. A periodic **`$3E` TesterPresent** message resets that clock and keeps it alive. {{→ V6 · timing}}
- **Faults log elsewhere.** The answer to your request is **not** where faults live. The ECU records faults in a **separate store** of its own — the **Dem**, its fault memory. {{→ M3 · fault memory}}
- {warn} **`$11` wipes the slate.** An **ECU reset** drops back to the **default session** and **re-locks security** — as if freshly powered on. Anything you unlocked is gone. {{→ V5 · sessions}}
:::
:::jp
- {key} **宛先 ― 1台か、全員か。** 要求は**1台**のECUへ（*物理*）も、多数へ**ブロードキャスト**（*機能*）もできます ― それでも答えは**1台**だけから返ります。
- **開いたまま ― `$3E` がセッションを保つ。** **非デフォルトのセッション**（電源投入時のデフォルトより先のモード）は、テスターが黙ると**タイムアウト**します。周期的な **`$3E` TesterPresent** がその時計をリセットし、生かし続けます。{{→ V6 · タイミング}}
- **故障は別の場所へ。** あなたの要求への答えは、故障のある場所では**ありません**。ECUは故障を専用の**別ストア** ― **Dem**（故障メモリ）― に記録します。{{→ M3 · 故障メモリ}}
- {warn} **`$11` は白紙に戻す。** **ECUリセット**は**デフォルトセッション**へ戻し、**セキュリティを再ロック**します ― 電源を入れ直したように。解除したものは消えます。{{→ V5 · セッション}}
:::

## leg:addressing
:::en
The first rule deserves a closer look, because it surprises people: a request can fan out to **many** ECUs, but a response is **always** one-to-one.
:::
:::jp
最初の規則は、意外に思われるので、もう少し詳しく見ます ― 要求は**多数**のECUに広がり得ますが、応答は**常に**1対1です。
:::

:::figure src=figures/c3-addressing.svg
en: **Requests can fan out; answers always come back from one.** Functional addressing asks many at once; each ECU that answers replies point-to-point.
jp: **要求は広がり得るが、応答は必ず1台から。** 機能アドレッシングは多数に同時に問い、答える各ECUは1対1で返す。
:::

:::en
- **Physical** — point-to-point, to one specific ECU.
- **Functional** — a broadcast, to one *or more* ECUs at once (used when you don't yet know which ECU owns a function).
- On a **functional** broadcast, an ECU that *can't* serve the request just **stays silent** — it holds back its "no" so the shared bus isn't flooded with refusals. Only the ECUs that *can* answer do.
- {key} However a request is aimed, the ECU's answer is **always sent physically**, from the one ECU that replied. {{→ V8 · addressing}}
:::
:::jp
- **物理** ― 1対1、特定の1台のECUへ。
- **機能** ― ブロードキャスト、1台*以上*へ同時に（どのECUが担うかまだ分からないときに使う）。
- **機能**ブロードキャストでは、要求を*処理できない*ECUはただ**黙ります** ― 共有バスが拒否で溢れないよう「いいえ」を控えます。*処理できる*ECUだけが答えます。
- {key} どう宛てても、ECUの答えは**常に物理的に**送られます ― 応答した1台から。{{→ V8 · アドレッシング}}
:::

## leg:lifecycle
:::en
Two of these rules — `$3E` and `$11` — are really one story: the **life of a session**. It opens, it must be **held open**, and it ends in one of two ways, both landing back at the safe **default**:
:::
:::jp
このうち2つ ― `$3E` と `$11` ― は、実は1つの物語です：**セッションの一生**。開き、**保ち続け**ねばならず、2通りのどちらかで終わり、どちらも安全な**デフォルト**に戻ります：
:::

:::figure src=figures/c3-session-life.svg
en: **Open · hold · close.** A non-default session must be fed `$3E` to stay alive; it ends either by an `$11` reset or by falling silent (timeout) — both return to the default session with security re-locked.
jp: **開く・保つ・閉じる。** 非デフォルトのセッションは `$3E` を与えて生かす必要があり、`$11` リセットか沈黙（タイムアウト）で終わる ― どちらもデフォルトへ戻り、セキュリティは再ロック。
:::

:::en
- **Open** — `$10` switches to a non-default session (that is the round trip we trace next).
- **Hold** — the session `$10` opened stays active *only while it's fed*: send `$3E` before the clock runs out, or it lapses back to default on its own.
- **Close** — an `$11` reset, or a silent timeout. Either way: **default session, security locked.**
:::
:::jp
- **開く** ― `$10` が非デフォルトのセッションに切り替える（次に追う往復がそれ）。
- **保つ** ― `$10` が開いたセッションは*与え続ける間だけ*有効。時計が切れる前に `$3E` を送る。さもないと自然にデフォルトへ戻る。
- **閉じる** ― `$11` リセット、または無言のタイムアウト。いずれも：**デフォルトセッション、セキュリティはロック。**
:::

## footer
:::reading
ISO 14229-1:2020 | cl.7.4.1.4 A_TA; cl.8.7.1 | Physical vs functional addressing; responses always physical
ISO 14229-1:2020 | cl.10.7 TesterPresent (`$3E`) | Keeping a non-default session alive
ISO 14229-1:2020 | cl.10.2 (Fig 7); cl.10.3 ECUReset (`$11`) | Return to default session; a reset re-locks security
AUTOSAR CP R25-11 | Dem cl.1 | Faults are stored by the Dem — a module separate from request handling (Dcm)
:::
