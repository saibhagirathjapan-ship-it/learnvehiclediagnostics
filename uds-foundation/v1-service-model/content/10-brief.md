---
id: brief
type: brief
order: 10
eyebrow: "Start here · まずここから"
---

## body
:::en
In **H1** you learned the two roles: the **tester** asks, the **ECU** answers. But "ask" and "answer" are vague words. What is the exact shape of **one** exchange — how many steps does it take, who makes each one, and what information travels along with it?
:::
:::jp
**H1** では2つの役割を学びました ― **テスター**が尋ね、**ECU**が答える。でも「尋ねる」「答える」は曖昧な言葉です。**1回**のやり取りの正確な形とは何でしょう ― 何ステップかかり、誰が各ステップを行い、どんな情報が一緒に運ばれるのか？
:::

:::en
Pin that shape down now, while it is still simple. Every real message you meet later is just this same shape, with actual bytes filled in. This drill has three parts:

1. **The four steps** — the fixed order every exchange follows: request, indication, response, confirmation.
2. **Who does each step** — which steps belong to the tester, and which to the ECU.
3. **The address label** — what every call carries: the kind of message, who is asking, and who should answer.
:::
:::jp
その形を、まだ単純なうちに、ここで固めておきます。あとで出会う実際のメッセージは、すべてこの同じ形に、実際のバイトを入れただけのものです。この章は3部構成です：

1. **4つのステップ** ― どのやり取りも従う決まった順序：リクエスト、通知、応答、確認。
2. **各ステップを誰が行うか** ― どのステップがテスターのもので、どれがECUのものか。
3. **宛先ラベル** ― どの呼び出しも運ぶもの：メッセージの種類、誰が尋ねているか、誰が答えるべきか。
:::

:::en
There is no hex here yet. This is the skeleton. In **H2**, we send a real request and watch bytes travel this exact path.
:::
:::jp
ここにはまだ16進はありません。これは骨組みです。**H2** では、実際のリクエストを送り、バイトがまさにこの経路を進む様子を見ます。
:::

:::figure src=figures/v1-b-f1_one-exchange.svg
en: **One exchange, about to be slowed down.** The tester sends, the ECU answers — but how many steps is that, really, and who owns each? This drill names them.
jp: **1回のやり取りを、これからゆっくり見る。** テスターが送り、ECUが答える ― でも実際それは何ステップで、各ステップは誰のもの？ この章でそれらに名前を付けます。
:::

:::key
label: By the end · この章を終えると
en: You can describe any UDS service as a short, named sequence of steps, tell the tester's steps apart from the ECU's, and name the address information every service call carries.
jp: どのUDSサービスも、名前のついた短いステップの並びとして説明でき、テスターのステップとECUのステップを見分け、どのサービス呼び出しも運ぶ宛先情報を挙げられます。
:::

:::reading
ISO 14229-1:2020 | cl.5 Conventions | Services are described by **service primitives** passed between a service user and a service provider
ISO 14229-1:2020 | cl.7.1 General | The application-layer services and their general form
:::
