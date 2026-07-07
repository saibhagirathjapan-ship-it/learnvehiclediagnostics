---
id: brief
type: brief
order: 10
eyebrow: "Start here · まずここから"
---

## body
:::en
In **H2**, we followed a single request into an ECU, and its one answer back. Now look at *where* that answer came from.
:::
:::jp
**H2** では、1つの要求がECUに入り、1つの答えが返るまでを追いました。今度は、その答えが*どこから*来たのかを見ます。
:::

:::en
It came from a small computer. It is sealed in hard resin and bolted deep in the car. It has no screen and no keyboard. The car holds dozens like it. For anyone to reach it, the ECU must first **offer** a way in.
:::
:::jp
答えを返したのは、小さなコンピュータです。硬い樹脂で密封され、車の奥にボルトで留められています。画面もキーボードもありません。車内には、同じようなものが何十とあります。誰かがそこに届くには、ECUがまず「入口」を**差し出す**必要があります。
:::

:::en
That way in has a name: a **service**. Picture the ECU holding up a menu — a list of named jobs you can ask for, one at a time.
:::
:::jp
その入口には名前があります ― **サービス**です。ECUがメニューを掲げている様子を思い浮かべてください ― 頼める「名前のついた仕事」の一覧を、1つずつ。
:::

:::en
This section has three parts:

1. **What a service is** — so the word is solid before you meet a whole list of them.
2. **The menu itself** — the families an ECU's services fall into.
3. **How the ECU decides** — whether to carry a request out, or turn it down.
:::
:::jp
この節は3部構成です：

1. **サービスとは何か** ― 一覧に出会う前に、言葉を固めます。
2. **メニューそのもの** ― ECUのサービスが分かれる「族（ファミリー）」。
3. **ECUがどう決めるか** ― 要求を実行するのか、断るのか。
:::

:::figure src=figures/h3-b-f1_a-whole-menu.svg
en: **One request, a whole menu behind it.** The ECU offers a list of named services. In H2, we followed just one of them.
jp: **1つの要求、その裏には一覧まるごと。** ECUは、名前のついたサービスの一覧を差し出します。H2で追ったのは、その中の1つだけでした。
:::

:::key
en: Get this one word right, and the rest of UDS is mostly detail — from reading a stored fault to reprogramming the ECU, every service is built to the same simple pattern. The next card pins that pattern down.
jp: この1つの言葉を正しく掴めば、UDSの残りはほとんど細部です ― 保存された故障を読むことからECUの再プログラミングまで、どのサービスも同じ単純な型で作られています。次のカードでその型を固めます。
:::

:::reading
ISO 14229-1:2020 | cl.7.1 General | Diagnostic services are the capabilities a client asks a server to perform
ISO 14229-1:2020 | cl.1 Scope | UDS addresses an ECU installed in a vehicle, over its on-board serial data link
:::
