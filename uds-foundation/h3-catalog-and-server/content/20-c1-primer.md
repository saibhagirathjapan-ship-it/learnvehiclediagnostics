---
id: c1
type: concept
order: 20
section: { n: "H3", en: "What UDS can do, and how the ECU decides", jp: "UDSに何ができ、ECUがどう決めるか" }
title:
  en: "What a service is — and what makes it diagnostic"
  jp: "サービスとは何か ― そして何が「診断」たらしめるのか"
short: { en: "What a service is", jp: "サービスとは" }
illustration: figures/h3-c1-f1_capability.svg
caption:
  en: "**A service is a capability.** One named job the ECU can do for you — read a fault, report a value, move a part. You ask by name; the ECU provides it."
  jp: "**サービスとは能力です。** ECUがあなたのためにできる、名前のついた仕事 ― 故障を読む、値を返す、部品を動かす。名前で頼めば、ECUがそれを差し出します。"
legs:
  - id: diagnostic
    title: { en: "What makes it diagnostic — the primitives you diagnose with", jp: "何が「診断」にするのか ― 診断の基本操作" }
  - id: provide
    title: { en: "Two roles — asking for a service, and providing one", jp: "2つの役割 ― 頼む側と、差し出す側" }
---

## bar
:::en
A **service** is a named job an ECU can do for you. You ask for it by name. The ECU does the job, and sends back an answer.
:::
:::jp
**サービス**とは、ECUがあなたのためにできる「名前のついた仕事」です。名前で頼みます。ECUはその仕事をして、答えを返します。
:::

:::en
We saw this once in H2 — one request, one answer. The bigger point is this: **every** service works the same way, whatever it does. They all share one fixed **shape**:

- One **request** goes in. Its first byte — the SID, from H2 — names the service.
- One **reply** comes back, from a fixed set — the positive or negative answer H2 traced.
- The ECU acts **only if it is in the right state** for that service.
:::
:::jp
これはH2で一度見ました ― 要求が1つ、答えが1つ。より大事な点はこれです：**どの**サービスも、何をするものでも、同じように動きます。すべてが1つの決まった**型**を共有します：

- **要求**が1つ入ります。先頭バイト ― H2で見たSID ― がサービスの名前です。
- **返答**が1つ、決まった集合から返ります ― H2が追った、肯定か否定の答えです。
- ECUは、そのサービスに応じられる**状態にあるときだけ**動きます。
:::

:::en
These services share one **purpose**: to diagnose the vehicle. That purpose is what makes them *diagnostic* services — and it is worth a closer look.
:::
:::jp
これらのサービスは1つの**目的**を共有します ― 車を診断すること。この目的こそが、*診断*サービスたらしめるものです ― もう少し詳しく見る価値があります。
:::

:::en
An ECU offers **many** services, and they are not a random pile. The standard sorts services that do related jobs into **functional units** — families of services. The `$10`, `$11`, and `$3E` you have already met form one such family. Next, we lay out all six.
:::
:::jp
ECUはサービスを**たくさん**差し出しますが、無秩序な山ではありません。標準は、関連する仕事をするサービスを**機能ユニット（functional unit）**にまとめます ― サービスの族です。すでに出会った `$10`・`$11`・`$3E` も、その1つの族です。次に、6つすべてを広げます。
:::

## leg:diagnostic
:::en
A service is *diagnostic* because of what you do with it. These services are the building blocks — the **primitives** — you use to diagnose and maintain a whole vehicle.
:::
:::jp
サービスを*診断*たらしめるのは、それで何をするかです。これらのサービスは、車全体を診断し保守するための基本操作 ― **プリミティブ** ― です。
:::

:::figure src=figures/h3-c1-f2_primitives-to-diagnosis.svg
en: **The primitives of diagnosis.** Each service returns one atomic piece of information; the technician combines them to find the root cause of the problem — all from outside, over the car's own wiring.
jp: **診断のプリミティブ。** 各サービスは、原子的な情報を1つ返します。技術者はそれらを組み合わせ、問題の根本原因を突き止めます ― すべて外側から、車自身の配線を通じて。
:::

:::en
With these services, you can:

- **Read fault information** — what has gone wrong, and when. {{→ M3 · fault memory}}
- **Read live data** — the current value of a sensor or signal. {{→ M2 · data}}
- **Test an actuator** — command a part to move, to check it works. {{→ M5 · routines & I/O}}
- **Check the software** — confirm the ECU is running the right program, unharmed.
- **Update the software** — reprogram or replace it. {{→ M6 · reprogramming}}
:::
:::jp
これらのサービスで、次のことができます：

- **故障情報を読む** ― 何が、いつ、おかしくなったか。{{→ M3 · 故障メモリ}}
- **ライブデータを読む** ― センサーや信号の現在値。{{→ M2 · データ}}
- **アクチュエータを試す** ― 部品に動作を命じ、動くか確かめる。{{→ M5 · ルーチンとI/O}}
- **ソフトウェアを確認する** ― ECUが正しいプログラムを、壊れずに動かしているか。
- **ソフトウェアを更新する** ― 再プログラミング、または入れ替え。{{→ M6 · 再プログラミング}}
:::

:::en
Put together, these let you diagnose a vehicle from the **outside** — over the car's own wiring, with nothing taken apart. The one asking is the **tester**: a scan tool in a workshop, a test station at the end of the assembly line, and — increasingly — a remote server over the air. {{→ M7 · from CAN to IP}}
:::
:::jp
まとめると、これらで車を**外側**から診断できます ― 車自身の配線を通じて、何も分解せずに。頼む側は**テスター**です：工場のスキャンツール、組立ラインの末端にある検査装置、そして近年は無線越しの遠隔サーバーも。{{→ M7 · CANからIPへ}}
:::

## leg:provide
:::en
A request has two sides, and they do very different jobs. One side **asks**; the other does **all the real work**.
:::
:::jp
1つの要求には2つの側があり、担う仕事はまるで違います。片方は**頼む**だけ。もう片方が**実際の仕事すべて**を担います。
:::

:::en
The **tester uses** the service — it sends the request, then waits. That is the easy side. The **ECU provides** it — it recognises the request, does the job, and returns the answer, or refuses with a reason. All the work, and the decision whether to serve, sits on the providing side.
:::
:::jp
**テスターはサービスを使う** ― 要求を送り、あとは待つだけ。こちらは楽な側です。**ECUはそれを差し出す** ― 要求を受け取り、仕事をして、答えを返すか、理由をつけて断ります。仕事のすべても、応じるか否かの判断も、差し出す側にあります。
:::

:::figure src=figures/h3-c1-f3_provide-vs-use.svg
en: **One asks; the other does the work.** The tester sends and waits. The ECU — in its *server* role — recognises the request, does the job, and answers or refuses. "Server" is a role any ECU plays when it answers, not a box.
jp: **片方は頼み、もう片方が担う。** テスターは送って待つだけ。ECUは*サーバー*の役割で、要求を受け取り、仕事をし、答えるか断ります。「サーバー」は、答えるとき任意のECUが担う役割で、箱ではありません。
:::

:::en
- {key} That providing side has a name you met in H1 — the **server** — and it is a **role, not a box**. Whichever software answers a request is the server for it. A tiny sensor module and a large control unit each act as the server when they answer; one ECU can even be a server to the tester and a client to its neighbour. {{→ V9 · inside the server}} · {{→ V1 · the service model}}
:::
:::jp
- {key} その差し出す側には、H1で出会った名前があります ― **サーバー** ― そしてそれは**箱ではなく役割**です。要求に答えるソフトウェアが、その要求のサーバーです。小さなセンサーモジュールも大きな制御ユニットも、答えるときはサーバーとして働きます。1つのECUが、テスターに対してはサーバー、隣のECUに対してはクライアントにもなれます。{{→ V9 · サーバーの内部}} · {{→ V1 · サービスモデル}}
:::

## footer
:::reading
ISO 14229-1:2020 | cl.3.6 | A (diagnostic) service is an information exchange a client starts to read from, or change, a server for a diagnostic purpose
ISO 14229-1:2020 | cl.3.18 & Note 1 | The server is a *function* in an ECU that provides the services — not the hardware box itself
ISO 14229-1:2020 | cl.8.1, 8.4 | UDS is confirmed: each request draws a reply; positive SID = request SID + 0x40, negative = 7F + SID + NRC
ISO 14229-1:2020 | cl.3.10 | A functional unit is a set of functionally close or complementary diagnostic services
:::
