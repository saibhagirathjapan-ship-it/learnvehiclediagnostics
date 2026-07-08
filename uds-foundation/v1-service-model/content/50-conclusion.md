---
id: concl
type: conclusion
order: 50
eyebrow: "Section recap · まとめ"
---

## body
:::en
One service exchange is a short, ordered sequence of named steps — **primitives**. The clean round trip is four: **request** (the tester starts), **indication** (the ECU is told), **response** (the ECU answers), **confirmation** (the tester receives). The tester **brackets** the exchange; the ECU serves the **middle**; one side always asks first.

And every call carries a small **address label** across a service access point — the kind of message (**A_Mtype**), who is asking (**A_SA**), who should answer (**A_TA**) — with the answer's label simply swapped so a reply always goes home.
:::
:::jp
1回のサービスのやり取りは、名前のついたステップ ― **プリミティブ** ― の、短く順序だった並びです。きれいな往復は4つ：**リクエスト**（テスターが始める）、**通知**（ECUが知らされる）、**応答**（ECUが答える）、**確認**（テスターが受け取る）。テスターがやり取りを**挟み**、ECUが**中間**に応じ、片側が必ず先に尋ねます。

そして、どの呼び出しも小さな**宛先ラベル**をサービスアクセスポイント越しに携えます ― メッセージの種類（**A_Mtype**）、誰が尋ねているか（**A_SA**）、誰が答えるべきか（**A_TA**） ― 答えのラベルは単純に入れ替わり、返答はいつも帰るべき所へ帰ります。
:::

:::key
label: You can now · できること
en: You can describe any UDS service as a named sequence of steps, tell the tester's steps (request, confirmation) from the ECU's (indication, response), say why a service with no reply has three steps and one with a reply has six, and name the address label — message type, source, target — that every call carries.
jp: どのUDSサービスも、名前のついたステップの並びとして説明でき、テスターのステップ（リクエスト、確認）とECUのステップ（通知、応答）を見分け、返答なしのサービスが3ステップ・返答ありが6ステップである理由を言え、どの呼び出しも運ぶ宛先ラベル ― メッセージの種類、送信元、宛先 ― を挙げられます。
:::

:::recall
q_en: **(a)** A service that expects no reply — how many steps does it use, and which ones? **(b)** When the answer comes back, which of the four steps belongs to the tester?
q_jp: **(a)** 返答を期待しないサービスは、何ステップを使い、どれですか？ **(b)** 答えが返ってくるとき、4つのうちどのステップがテスターのものですか？
a_en: **(a)** **Three** — request, request-confirmation, indication. The call goes out and arrives; nothing comes back. **(b)** **confirmation** — the tester receives the answer. (The tester also owns request, which opened the exchange.)
a_jp: **(a) 3つ** ― リクエスト、リクエスト確認、通知。呼び出しは出て届き、何も戻りません。**(b) 確認** ― テスターが答えを受け取ります。（テスターは、やり取りを開いたリクエストも担います。）
:::

:::en
That is the whole skeleton — the shape under every UDS service, with no bytes yet. Next, in **H2**, we send one real request and watch actual bytes travel this exact path: request out, one answer back.
:::
:::jp
これが骨組みの全体です ― どのUDSサービスの下にもある形で、まだバイトはありません。次に **H2** で、実際のリクエストを1つ送り、バイトがまさにこの経路 ― リクエストが出て、答えが1つ戻る ― を進む様子を見ます。
:::
