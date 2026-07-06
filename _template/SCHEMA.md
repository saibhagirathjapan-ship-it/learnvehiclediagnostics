# Concept-MD schema — how content is authored

**Source of truth.** Each concept lives in one Markdown file at
`wiki/learn/<module>/content/<id>.md`. The renderer turns it into a Blueprint T-card and
assembles the module's self-contained `index.html`. Refine content here; never hand-edit the
rendered HTML. Structure rules: [[CONVENTIONS]] §1c (T-cards) · §1d (content architecture).

---

## 1. Frontmatter (YAML) — metadata + the T structure

```yaml
---
id: c19                       # unique within the module
type: concept                 # divider | brief | concept | conclusion
section: { n: "04", en: "$10 Diagnostic Session Control", jp: "$10 診断セッション制御" }
sid: "$10"                    # optional service chip
title:
  en: "Requesting a session — and what the ECU does inside"
  jp: "セッションを要求する ― そのときECU内部で起きること"
illustration: figures/c19-roundtrip.svg     # the bar's ONE canonical figure
legs:                          # the T-stem: 3–4 max (CONVENTIONS §1c)
  - id: inside
    title: { en: "Inside the ECU — the switch itself", jp: "ECU内部 ― 切り替えの実際" }
    figure: figures/c19-dcm-sequence.svg      # a leg with a single card + its own sketch
  - id: bytes
    title: { en: "Byte by byte — reading the response", jp: "バイト単位 ― 応答を読む" }
  - id: values
    title: { en: "The session values — what each unlocks", jp: "セッション値 ― それぞれが開くもの" }
    cards:                     # a DEEP leg may hold up to ~4 nested cards
      - { id: v01, title: { en: "01 · Default", jp: "01・デフォルト" } }
      - { id: v02, title: { en: "02 · Programming → bootloader", jp: "02・プログラミング → ブートローダ" } }
      - { id: v03, title: { en: "03 · Extended", jp: "03・拡張" } }
---
```

## 2. Body — labelled sections, bilingual blocks

Prose lives under headings that match the structure. Each block carries EN and JP:

```markdown
## bar
:::en
To change what an ECU will let you do, you ask it to switch **session**. The tester sends
`10 <session>`; the ECU checks it, **flips its internal mode**, then replies `50 <session> …`.
:::
:::jp
ECUに「できること」を変えてもらうには、**セッション**の切り替えを頼みます。テスターが
`10 <session>` を送ると、ECUは確認し、**内部モードを切り替え**、`50 <session> …` を返します。
:::

## leg:inside
:::en  The switch isn't instant — the **DCM** runs a short sequence and can still **refuse**. :::
:::jp  切り替えは一瞬ではありません ― **DCM** は短い手順を踏み、**拒否**もします。 :::

## leg:values/card:v02
:::en  Programming hands over to the **bootloader**, so the running app can be replaced. :::
:::jp  プログラミングは **ブートローダ** へ引き渡し、動作中のアプリを置換可能にします。 :::
```

- **`**bold**` → auto-set in the accent colour** (the accent-highlight rule; no extra syntax).
- Headings: `## bar`, `## leg:<id>`, and for nested cards `## leg:<id>/card:<id>`.

## 3. Rich components — fenced directives inside a block

```markdown
:::bytes                         :::key                        :::figure src=figures/x.svg
50 | SID+0x40 | pos               en: Bytes are **hex**. …       en: caption …
03 | session | sub                jp: バイトは**16進**。…         jp: 図の説明 …
00 | P2 hi                       :::                           :::
32 | P2 lo
:::
```

- `:::bytes` — one row per line: `hex | caption | class?` (class ∈ `pos sub neg sid`).
- `:::key` / `:::warn` — callouts (label auto-set; `en:` / `jp:` bodies).
- `:::figure src=… ` — an extra sketch inside a leg (bar/leg canonical figures come from
  frontmatter). SVGs are separate files in `assets/figures/`, authored with the `.dgm`
  theme-aware classes so they invert.
- Standard Markdown **tables** pass through; use `<span class="en/jp">…</span>` in a cell for
  per-language text.

## 4. Fonts (self-containment note)

EN faces (Space Grotesk · IBM Plex Sans · IBM Plex Mono) are **bundled** as base64
`@font-face` in the rendered page (small). **Noto Sans JP is not bundled** — the full JP web
font is 1–4 MB per page, impractical; it is referenced by family with a fallback stack
(`Noto Sans JP → Yu Gothic → Meiryo → sans-serif`), all common on target machines. (A subset
JP bundle is a possible later optimization.)

> Directive set is finalized as the renderer is built; this doc is the contract.
