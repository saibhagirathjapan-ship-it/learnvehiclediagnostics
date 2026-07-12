// rigor.js — the course's Layer-1 rigor lint (STATIC + FAST; the Stop hook runs it).
//
// Three enforcement layers (work-types.md §Enforcement):
//   L1 — this script: mechanical checks over content-MD front-matter + prose. Fast (no browser;
//        checkmod.js stays the in-browser G4 gate). BLOCKING findings exit 2 (the Stop hook
//        surfaces them); ADVISORY findings print but exit 0 — triage input for the human gate,
//        never a wall to train ourselves to ignore.
//   L2 — /teach-back (zero-context subagent) + the figure fresh-eyes judge. Deliberate.
//   L3 — the user's sign-off / G-REV.
//
// Grandfathering: BLOCKING checks apply only to GOVERNED modules — module.yml carries
// `governed: true` (set on every module built from V3 onward; retrofitted modules gain it when
// their cards gain `load_bearing:`). Gating pre-convention cards would fail every run on
// known-deferred work and train the gate to be ignored.
//
// Checks:
//   B1 (blocking, governed)  type:concept card missing a non-empty `load_bearing:` (G0, §2c-1)
//   B2 (blocking, governed)  `crux: true` card missing a `derivation:` block (§2c-2)
//   A1 (advisory)            bare `0x..` hex in body prose — learner notation is `NNh`
//   A2 (advisory)            false agency in en: prose ("you sent/saw/learned…", §2b-4)
//   A3 (advisory)            load-bearing recall of a named module ("In H2 …", §2b-5)
//   A4 (advisory)            course-structure as actor / meta-framing ("the last chapter read",
//                            "this is the next step") — a chapter/card/step is not the story (§2b-4)
//   A5 (advisory)            generic/vague card title (G0 title-directness bar, §2b/OK-NG)
//
// Usage:  node _template/rigor.js --all            scan every */content/*.md under wiki/learn
//         node _template/rigor.js <module-dir...>  scan the given module folder(s)

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..'); // wiki/learn
const SKIP = new Set(['node_modules', 'assets', 'content', '_template', '_designlab', '_derive', '.claude', '.git']);

// find every directory that has a content/*.md (modules may nest, e.g. uds-foundation/v2-*/)
function findModules(dir, depth = 0, out = []) {
  if (depth > 3) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory() || SKIP.has(e.name) || e.name.startsWith('_')) continue;
    const d = path.join(dir, e.name);
    if (fs.existsSync(path.join(d, 'content'))) out.push(d);
    findModules(d, depth + 1, out);
  }
  return out;
}

const fm = (src) => { const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/); return m ? m[1] : ''; };
const body = (src) => src.replace(/^---\r?\n[\s\S]*?\r?\n---/, '');

function lintCard(file, governed, findings) {
  const src = fs.readFileSync(file, 'utf8');
  const head = fm(src);
  const type = (head.match(/^type:\s*(\w+)/m) || [])[1] || '';
  const rel = path.relative(ROOT, file).split(path.sep).join('/');

  if (governed && type === 'concept') {
    // load_bearing: inline value, quoted, or a `>`/`|` block scalar with an indented body
    const lb = head.match(/^load_bearing:\s*(.*)$/m);
    const hasLB = lb && (lb[1].replace(/^[>|][+-]?\s*$/, '').trim() !== ''
      ? lb[1].trim() !== '' && !/^[>|][+-]?$/.test(lb[1].trim())
      : /^load_bearing:\s*[>|][+-]?\s*\r?\n(\s+\S)/m.test(head));
    if (!hasLB) findings.push({ level: 'BLOCK', code: 'B1', file: rel,
      msg: 'concept card has no `load_bearing:` sentence (G0 — write it BEFORE authoring, §2c move 1)' });
    if (/^crux:\s*true/m.test(head) && !/^derivation:/m.test(head))
      findings.push({ level: 'BLOCK', code: 'B2', file: rel,
        msg: 'crux card has no `derivation:` block (§2c move 2 — record where each WHY lives on-card + its clause)' });
  }

  // A5 (advisory) — generic/vague card title (G0 title-directness bar; recurred ≥4×). Starter
  // heuristic: a negation opener, or a vague/filler noun — triage input, may be a legitimate title.
  const titleEn = (head.match(/^title:\s*\r?\n\s*en:\s*["'](.+?)["']/m) || [])[1] || '';
  if (titleEn && (/^\s*not\s+/i.test(titleEn)
      || /\b(overview|basics?|introduction|intro|general|various|several|stages?|things|parts|everything|anything|something|misc|stuff)\b/i.test(titleEn)))
    findings.push({ level: 'flag', code: 'A5', file: rel,
      msg: `possibly vague/generic title "${titleEn}" — name the ONE idea concretely, specific to THIS card (G0 title bar, §2b/OK-NG)` });

  // advisory prose flags — body text only, skipping fig:/figure paths and fenced code
  const text = body(src).split(/\r?\n/)
    .filter(l => !/^\s*(fig|figure|illustration):/.test(l) && !/\.svg\b/.test(l));
  let fence = false;
  text.forEach((line, i) => {
    if (/^\s*```/.test(line)) { fence = !fence; return; }
    if (fence) return;
    const at = `${rel}:${i + 1}`;
    if (/\b0x[0-9A-Fa-f]+\b/.test(line))
      findings.push({ level: 'flag', code: 'A1', file: at,
        msg: 'bare `0x..` hex in prose — learner notation is `NNh` (COURSE notation rule)' });
    // "you have met" is explicitly ALLOWED ([[feedback-prose-and-wording]]) — not in this list.
    if (/\byou\s+(sent|saw|received|learned|got|decoded)\b/i.test(line))
      findings.push({ level: 'flag', code: 'A2', file: at,
        msg: 'possible false agency ("you sent/saw/learned…") — the tester sends, the ECU replies (§2b-4)' });
    if (/(^|[.!?]\s+|^en:\s*)(In|Back in|As (you )?(saw|learned) in)\s+(H\d|V\d+[abc]?|M\d)\b/.test(line))
      findings.push({ level: 'flag', code: 'A3', file: at,
        msg: 'beat opens on a named earlier module — state the fact directly; back-ref rides as {{→}} (§2b-5)' });
    // A4 — course-structure as ACTOR / meta-framing. A chapter/card/section is not the story:
    // narration verbs ("the last chapter read", "the card shows you") or "is the next step". §2b-4.
    // Deliberately NOT flagging bare "this chapter has …" — a BRIEF legitimately previews its own
    // contents; the defect is a structure element narrating/acting, not an advance-organizer preview.
    if (/\b(?:chapter|card|section|drill|lesson)\s+(?:reads?|showed|shows\s+you|sends?|sent|tells?\s+you|told\s+you|teaches?|taught|explains?|explained|says?|said)\b/i.test(line)
      || /\bis\s+the\s+(?:next|last|previous)\s+step\b/i.test(line))
      findings.push({ level: 'flag', code: 'A4', file: at,
        msg: 'course-structure as actor / meta-framing ("the last chapter read", "this is the next step") — a chapter/card/step is not part of the story (§2b-4)' });
  });
}

// ── run ──────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2).filter(a => a !== '--all');
const all = process.argv.includes('--all') || args.length === 0;
const modules = all ? findModules(ROOT) : args.map(a => path.resolve(a));

const findings = [];
for (const mod of modules) {
  const yml = path.join(mod, 'module.yml');
  const governed = fs.existsSync(yml) && /^governed:\s*true/m.test(fs.readFileSync(yml, 'utf8'));
  const cdir = path.join(mod, 'content');
  if (!fs.existsSync(cdir)) continue;
  for (const f of fs.readdirSync(cdir).filter(f => f.endsWith('.md')))
    lintCard(path.join(cdir, f), governed, findings);
}

const blocks = findings.filter(f => f.level === 'BLOCK');
const flags = findings.filter(f => f.level === 'flag');
if (blocks.length) {
  console.error(`rigor L1 — ${blocks.length} BLOCKING:`);
  blocks.forEach(f => console.error(`  ✗ [${f.code}] ${f.file} — ${f.msg}`));
}
if (flags.length) {
  console.log(`rigor L1 — ${flags.length} advisory flag(s) (triage at the human gate; may be legitimate):`);
  flags.forEach(f => console.log(`  ⚑ [${f.code}] ${f.file} — ${f.msg}`));
}
if (!findings.length) console.log(`rigor L1 clean — ${modules.length} module(s) scanned.`);
process.exit(blocks.length ? 2 : 0);
