---
id: s4-concl
type: conclusion
order: 90
---

## body
:::en
`$10` moves the ECU between modes and reports the timing limits for the new mode; internally the DCM validates, flips the session, and arms its timers before it replies. **You can now read a session-control exchange byte by byte.** Next: how **security** (`$27`) gates the deeper sessions.
:::
:::jp
`$10` はECUをモード間で動かし、新しいモードのタイミング上限を返します。内部ではDCMが確認し、セッションを切り替え、タイマーを起動してから応答します。**これでセッション制御のやり取りをバイト単位で読めます。** 次は、深いセッションを**セキュリティ**（`$27`）がどう守るか。
:::
