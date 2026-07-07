---
id: concl
type: conclusion
order: 80
eyebrow: "Section recap · まとめ"
---

## body
:::en
A **service** is a named job an ECU provides, under one fixed shape: one request in, one reply from a fixed set, and only in the right state. A service is **diagnostic** because of its purpose — these are the building blocks you use to read a vehicle's faults and data, test its parts, and check or update its software.

Those services come in **six families**: communication management, data transmission, stored data, input/output control, routine, and upload/download — with **security** guarding the risky ones across all six. Inside the data and routine families, a **16-bit DID or RID** names exactly which value or routine. And when a request arrives, the ECU runs it through **four stages** — route, check, decide, do — saying yes or no at the "decide" stage.
:::
:::jp
**サービス**とは、ECUが差し出す名前つきの仕事で、1つの決まった型を持ちます ― 要求が1つ入り、決まった集合から返答が1つ、しかも正しい状態のときだけ。サービスが**診断**なのは、その目的ゆえです ― これらは、車の故障やデータを読み、部品を試し、ソフトを確認・更新するための、基本の部品です。

それらのサービスは**6つの族**に分かれます ― 通信管理、データ伝送、保存データ、入出力制御、ルーチン、アップロード／ダウンロード ― そして**セキュリティ**が、6つすべてにまたがって危険なものを守ります。データ族とルーチン族の中では、**16ビットのDIDやRID**が、どの値・どのルーチンかを正確に指します。要求が届くと、ECUはそれを**4段階** ― 経路・確認・判断・実行 ― に通し、「判断」の段階でイエス・ノーを言います。
:::

:::key
label: You can now · できること
en: Place any UDS service on the map — name it by its SID, say which of the six families it belongs to, and tell what it needs to run: a plain session, a non-default one, or a security unlock. You can also trace the four stages a request crosses inside the ECU — route, check, decide, do — and say where a "no" is born.
jp: どのUDSサービスも地図に置けます ― SIDで名前を言い、6つの族のどれに属するかを言い、動かすのに何が要るか ― ふつうのセッションか、非デフォルトか、セキュリティのロック解除か ― を言えます。さらに、要求がECUの中で越える4段階 ― 経路・確認・判断・実行 ― をたどり、「いいえ」がどこで生まれるかを言えます。
:::

:::recall
q_en: **(a)** Which family does `$22` ReadDataByIdentifier belong to? **(b)** To reprogram an ECU, which family is that, and what gates it?
q_jp: **(a)** `$22` ReadDataByIdentifier はどの族に属しますか？ **(b)** ECUを再プログラミングするのは、どの族で、何がそれを制限しますか？
a_en: **(a)** The **data transmission** family — `$22` reads a named value. **(b)** The **upload/download** family — and it sits behind both gates: a non-default (programming) session **and** a security unlock, so it can only happen on purpose.
a_jp: **(a) データ伝送**の族 ― `$22` は名前つきの値を読みます。**(b) アップロード／ダウンロード**の族 ― そして両方の門の内側にあります：非デフォルト（プログラミング）セッション**と**セキュリティのロック解除。だから、意図したときにしか起きません。
:::

:::en
That is the whole picture. **H1** showed what UDS is and who talks; **H2** followed one request end to end; **H3** laid out everything an ECU can be asked, and how it decides. From here you can go deeper into any part — sessions, security, reprogramming — or move on to the first family in full: reading and writing data.
:::
:::jp
これで全体像が揃いました。**H1** はUDSとは何か、誰が話すかを示し、**H2** は1つの要求を端から端まで追い、**H3** はECUに頼めることすべてと、その決め方を広げました。ここからは、どの部分でも深く掘れます ― セッション、セキュリティ、再プログラミング ― あるいは、最初の族をまるごと次に進めます：データの読み書きです。
:::
