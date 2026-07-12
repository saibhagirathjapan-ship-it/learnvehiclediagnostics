---
id: brief
type: brief
order: 10
title:
  en: "When the answer is no"
  jp: "答えが「ノー」のとき"
---

## body

:::en
Every request the tester sends comes back with an answer. One kind means **yes** — a positive response, its first byte the request's plus `40h`.

But an ECU cannot say yes to everything. It refuses when a request:

- asks for something the ECU does not offer,
- arrives at the wrong moment, or
- fails a check.

Then the ECU sends the other kind of answer: a **negative response**.
:::
:::jp
テスターが送るリクエストには、必ず答えが返ります。一方の答えは **はい** ― 肯定応答で、その先頭バイトはリクエストのそれに `40h` を足したものです。

しかし ECU は、すべてに「はい」と言えるわけではありません。次のようなとき、ECU はリクエストを拒否します：

- ECU が持たない機能を求めている、
- タイミングが悪い、または
- チェックに通らない。

そんなとき ECU は、もう一方の答え ― **否定応答** ― を返します。
:::

:::en
A negative response is not a crash, and not silence. It is a short reply, fixed in shape, that means *no* — and it carries the **reason** in a single byte.

Read it well and a refusal becomes useful: it says what was wrong, and sometimes what to do next.
:::
:::jp
否定応答は、故障でも沈黙でもありません。*いいえ* を意味する、短くて形の決まった返信で、**理由**をたった 1 バイトに載せています。

これを読めるようになれば、拒否はむしろ役に立ちます ― どこが悪かったのか、次に何をすればよいのかを教えてくれるからです。
:::

:::figure src=figures/v3-b-f1_two-answers.svg
en: One request, two possible answers. The **yes** is behind us (faded); this chapter is about the **no** — and the reason it carries.
jp: 一つのリクエストに、あり得る答えは二つ。**はい**は既習（淡色）。この章のテーマは**いいえ** ― そしてそれが載せる理由 ― です。
:::

:::en
This chapter has six short steps:

- **The shape of a no** — the three bytes that say *no*, *which* request, and *why*.
- **One catalog of reasons** — every service in the whole protocol draws its reason codes from one shared list.
- **The structural gate** — the checks that ask, "is this even a real request?"
- **The permission gate** — the checks that ask, "will I do this *now*?"
- **What a no changes** — what a refusal does, and mostly does *not* do, inside the ECU.
- **How to react** — the few refusals that are really instructions: wait, or try again.
:::
:::jp
この章は、六つの短いステップです：

- **「いいえ」の形** — *いいえ*・*どの*リクエストか・*なぜ* を伝える 3 バイト。
- **理由の唯一のカタログ** — プロトコル全体のどのサービスも、理由コードを一つの共通リストから引く。
- **構造のゲート** —「これはそもそも本物のリクエストか？」を問うチェック。
- **許可のゲート** —「*今*それをやるか？」を問うチェック。
- **「いいえ」が変えるもの** — 拒否が ECU の中で何を変え、そして何を変え*ない*か。
- **どう応答するか** — 実は指示である数少ない拒否：待つ、あるいはもう一度試す。
:::

:::key
label: By the end · この章を終えると
en: You can decode any negative response, look up any reason code and tell what *kind* of reason it is, and predict what a no does to the ECU — so you know when to wait, when to retry, and when to stop.
jp: どんな否定応答もデコードでき、どの理由コードもその*種類*まで見分けられ、「いいえ」が ECU に何をするかを予測できます ― だから、いつ待ち、いつ再試行し、いつやめるべきかが分かります。
:::
