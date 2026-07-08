---
id: c3
type: concept
order: 40
section: { n: "V1", en: "The service model", jp: "サービスモデル" }
title:
  en: "The address label every call carries"
  jp: "どの呼び出しも運ぶ宛先ラベル"
short: { en: "The address label", jp: "宛先ラベル" }
illustration: figures/v1-c3-f1_sap.svg
caption:
  en: "**Every call crosses a hand-off point, carrying a label.** At the service access point the call passes to the layer below, tagged with three facts: the kind of message, who is asking, who should answer. On the way back, the label swaps — the answer goes home to the asker."
  jp: "**どの呼び出しも受け渡し点を越え、ラベルを携える。** サービスアクセスポイントで、呼び出しは下の層へ渡され、3つの事実が付きます：メッセージの種類、誰が尋ねているか、誰が答えるべきか。戻り道ではラベルが入れ替わり、答えは尋ねた側へ帰ります。"
legs:
  - id: names
    title: { en: "The three names — A_Mtype, A_SA, A_TA", jp: "3つの名前 ― A_Mtype、A_SA、A_TA" }
    figure: figures/v1-c3-f2_param-names.svg
  - id: sessionlayer
    title: { en: "One layer down — the same call becomes S_Data", jp: "1つ下の層 ― 同じ呼び出しが S_Data になる" }
    figure: figures/v1-c3-f3_session-layer.svg
---

## bar
:::en
Every step so far has been about *timing* — who acts, and when. But a call also has to say **where** it is going. So each service crosses a **service access point** (**SAP**): the boundary where one layer hands the call to the layer below. As it crosses, it carries a small label of address information:
:::
:::jp
ここまでの各ステップは*タイミング*の話でした ― 誰が、いつ動くか。でも呼び出しは、**どこへ**行くのかも言わねばなりません。そこで各サービスは、**サービスアクセスポイント（SAP）** を越えます ― ある層が下の層へ呼び出しを渡す境界です。越えるとき、小さな宛先情報のラベルを携えます：
:::

:::en
- what **kind** of message it is,
- **who** is asking — the source,
- **who** should answer — the target.
:::
:::jp
- どんな**種類**のメッセージか、
- **誰**が尋ねているか ― 送信元、
- **誰**が答えるべきか ― 宛先。
:::

:::en
On the way back, the label simply swaps: the answer's target is whoever was the original source. That is why a reply always goes home to the asker, and never anywhere else.
:::
:::jp
戻り道では、ラベルは単純に入れ替わります：答えの宛先は、もとの送信元だった相手です。だから返答はいつも尋ねた側へ帰り、他のどこへも行きません。
:::

## leg:names
:::en
In the standard the label has exact names. There are **three mandatory** ones.
:::
:::jp
標準では、このラベルに正確な名前があります。**必須**のものが**3つ**あります。
:::

:::figure src=figures/v1-c3-f2_param-names.svg
en: **The label, with its real names.** A_Mtype picks the setup; A_SA is the source; A_TA is the target — aimed at one ECU, or a whole group.
jp: **ラベルとその本当の名前。** A_Mtype が構成を選び、A_SA が送信元、A_TA が宛先 ― 1台のECUに向けるか、グループ全体に向けるか。
:::

:::en
- **A_Mtype** — the message type. It picks one of four setups: plain **diagnostics**, remote, secure, or secure-remote.
- **A_SA** — the source address: a number naming who is asking.
- **A_TA** — the target address: a number naming who should answer.
:::
:::jp
- **A_Mtype** ― メッセージの種類。4つの構成から1つを選びます：素の**診断（diagnostics）**、リモート、セキュア、セキュアリモート。
- **A_SA** ― 送信元アドレス：誰が尋ねているかを表す番号。
- **A_TA** ― 宛先アドレス：誰が答えるべきかを表す番号。
:::

:::en
The target also carries **A_TAtype** — whether the call is aimed at **one** ECU or a **whole group**. The names for these two — physical and functional addressing — come later, with the full story of addressing on the wire. {{→ V8 · addressing & the transport}}
:::
:::jp
宛先はさらに **A_TAtype** を携えます ― 呼び出しが**1台**のECUに向くか、**グループ全体**に向くか。この2つの呼び方（物理アドレッシングと機能アドレッシング）と、線の上でのアドレッシングの全体像は、あとで扱います。{{→ V8 · アドレッシングとトランスポート}}
:::

## leg:sessionlayer
:::en
The four-step model lives at the top, in the **application layer**. One layer below sits the **session layer**, and it is deliberately plain.
:::
:::jp
4ステップのモデルは一番上、**アプリケーション層**にあります。1つ下には**セッション層**があり、これは意図的に素っ気なく作られています。
:::

:::figure src=figures/v1-c3-f3_session-layer.svg
en: **Rich on top, plain below.** The application layer hands the call down to the session layer, which offers only three plain calls: send, arrived, send-finished. The rich label rides down as the session layer's own address fields.
jp: **上は豊か、下は素っ気ない。** アプリケーション層は呼び出しをセッション層へ渡し、セッション層はたった3つの素っ気ない呼び出しだけを提供します：送る・届いた・送信済み。豊かなラベルは、セッション層自身のアドレス欄として下へ運ばれます。
:::

:::en
The session layer offers just three calls: **S_Data.request** (send this), **S_Data.indication** (this arrived), and **S_Data.confirm** (your send finished). The rich application-layer label rides down as the session layer's own address fields. This thin, fixed interface is exactly what lets one set of UDS services run unchanged over any wire. {{→ V8 · the layers, drawn}}
:::
:::jp
セッション層が提供する呼び出しは3つだけ：**S_Data.request**（これを送る）、**S_Data.indication**（これが届いた）、**S_Data.confirm**（あなたの送信が完了した）。豊かなアプリケーション層のラベルは、セッション層自身のアドレス欄として下へ運ばれます。この薄く固定されたインターフェースこそ、1組のUDSサービスをどんな線の上でも変えずに動かせる理由です。{{→ V8 · 層を図で見る}}
:::

## footer
:::reading
ISO 14229-1:2020 | cl.7.4.1.1 | The application-layer services carry three mandatory parameters
ISO 14229-1:2020 | cl.7.4.1.2–7.4.1.5 | A_Mtype, A_SA, A_TA, and A_TAtype (physical vs functional target)
ISO 14229-2:2021 | cl.6.1, cl.7.1 | The session-layer interface: S_Data.request / .indication / .confirm
:::
