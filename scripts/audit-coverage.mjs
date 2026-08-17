/**
 * Two-way coverage audit for the recommender ("the brain").
 *
 *   A. every signal a user can select must reach at least one reflex point;
 *   B. every reflex point in the catalogue must be able to appear in a result
 *      (not just be tagged — recommend() only returns the top 5, so this
 *      brute-forces every 1-, 2- and 3-signal selection and checks the output);
 *   C. no point carries a tag that no selection can ever produce;
 *   D. data integrity: unique ids, PT translations, image files, valid tags.
 *
 * Run with `npm run audit` after changing rules, points or regions. Exits 1 on
 * any gap so it can gate a deploy.
 *
 * The data files are parsed as text rather than imported so this stays a plain
 * Node script with no TypeScript loader or build step.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(ROOT, "src");
const LIMIT = 5;

const read = (p) => readFileSync(resolve(SRC, p), "utf8");
const pointsTs = read("data/reflexPoints.ts");
const regionsTs = read("data/bodyRegions.ts");
const emotionsTs = read("data/emotions.ts");
const contentTs = read("i18n/content.ts");

const all = (re, text) => [...text.matchAll(re)];
const quoted = (s) => [...s.matchAll(/"([^"]+)"/g)].map((m) => m[1]);

// --- catalogue (file order matters: it is the final tie-break) -------------
const points = all(/id:\s*"([^"]+)",[\s\S]*?tags:\s*\[([^\]]*)\]/g, pointsTs).map((m) => ({
  id: m[1],
  tags: quoted(m[2]),
}));

// --- what the user can select --------------------------------------------
const discomfortIds = all(/\{\s*id:\s*"([^"]+)",\s*label:\s*"[^"]*",\s*emoji/g, regionsTs).map(
  (m) => m[1],
);
const regionIds = all(/\{\s*id:\s*"([^"]+)",\s*label:/g, regionsTs)
  .map((m) => m[1])
  .filter((id) => !discomfortIds.includes(id));

const emotions = new Map();
for (const m of all(
  /\{\s*id:\s*"([^"]+)",\s*label:\s*"[^"]*",\s*family:\s*"([^"]+)",\s*level:\s*(\d)(?:,\s*parentId:\s*"([^"]+)")?/g,
  emotionsTs,
)) {
  emotions.set(m[1], { family: m[2], level: Number(m[3]), parent: m[4] });
}

/** Mirrors expandEmotionSelection: self + family + ancestors + descendants. */
function expand(id) {
  const out = new Set([id]);
  const e = emotions.get(id);
  if (!e) return out;
  out.add(e.family);
  for (let cur = e; cur?.parent; cur = emotions.get(cur.parent)) out.add(cur.parent);
  for (const [cid, c] of emotions) {
    if (c.parent === id || (c.parent && emotions.get(c.parent)?.parent === id)) out.add(cid);
  }
  return out;
}

const choices = [
  ...regionIds.map((id) => [`region:${id}`, new Set([id])]),
  ...discomfortIds.map((id) => [`discomfort:${id}`, new Set([id])]),
  ...[...emotions.keys()].map((id) => [`emotion:${id}`, expand(id)]),
];

const tagToPoints = new Map();
for (const p of points) {
  for (const tag of p.tags) {
    if (!tagToPoints.has(tag)) tagToPoints.set(tag, []);
    tagToPoints.get(tag).push(p.id);
  }
}

const failures = [];
const report = (title, offenders, ok) => {
  if (offenders.length === 0) {
    console.log(`  ok   ${title} — ${ok}`);
    return;
  }
  failures.push(title);
  console.log(`  FAIL ${title} (${offenders.length})`);
  for (const o of offenders.slice(0, 25)) console.log(`         ${o}`);
  if (offenders.length > 25) console.log(`         ... and ${offenders.length - 25} more`);
};

console.log(`\nSole coverage audit — ${points.length} points, ${choices.length} selectable signals\n`);

// --- A. every signal reaches a point --------------------------------------
console.log("A. signal -> point");
const unreachedSignals = choices
  .filter(([, signals]) => ![...signals].some((s) => tagToPoints.get(s)?.length))
  .map(([label]) => label);
report("every selectable signal reaches a point", unreachedSignals, "all signals covered");

// --- B. every point can actually be shown ---------------------------------
console.log("\nB. point -> result screen");

/** Mirrors tieBreaker() in src/data/recommender.ts. */
function tieBreaker(pointId, selectionKey) {
  let hash = 2166136261;
  const input = `${pointId}|${selectionKey}`;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967295;
}

/** Mirrors the ranking in recommend(); the boosts are uniform so they can't reorder. */
function topPoints(signals) {
  const key = [...signals].sort().join(",");
  const ranked = [];
  for (const p of points) {
    const matches = p.tags.filter((t) => signals.has(t)).length;
    if (matches > 0) {
      ranked.push({
        id: p.id,
        score: matches,
        precision: matches / p.tags.length,
        shuffle: tieBreaker(p.id, key),
      });
    }
  }
  if (ranked.length === 0) return ["solar-plexus-foot", "spine-foot"];
  ranked.sort((a, b) => b.score - a.score || b.precision - a.precision || b.shuffle - a.shuffle);
  return ranked.slice(0, LIMIT).map((r) => r.id);
}

const shown = new Set();
let selections = 0;
let emptyResults = 0;
const visit = (signals) => {
  const result = topPoints(signals);
  selections += 1;
  if (result.length === 0) emptyResults += 1;
  for (const id of result) shown.add(id);
};

for (let i = 0; i < choices.length; i += 1) {
  visit(choices[i][1]);
  for (let j = i + 1; j < choices.length; j += 1) {
    visit(new Set([...choices[i][1], ...choices[j][1]]));
    for (let k = j + 1; k < choices.length; k += 1) {
      visit(new Set([...choices[i][1], ...choices[j][1], ...choices[k][1]]));
    }
  }
}

report(
  "no selection returns an empty plan",
  emptyResults > 0 ? [`${emptyResults} of ${selections} selections returned nothing`] : [],
  `${selections.toLocaleString()} selections of 1-3 signals all returned points`,
);
report(
  `every point can reach the top ${LIMIT}`,
  points.filter((p) => !shown.has(p.id)).map((p) => p.id),
  `all ${points.length} points surface in some selection`,
);

// --- C. no dead tags ------------------------------------------------------
console.log("\nC. tag hygiene");
const selectableTags = new Set(choices.flatMap(([, s]) => [...s]));
report(
  "no point carries an unreachable tag",
  [...tagToPoints.keys()].filter((t) => !selectableTags.has(t)),
  `all ${tagToPoints.size} tags are produced by some selection`,
);

// --- D. data integrity ----------------------------------------------------
console.log("\nD. data integrity");
const ids = points.map((p) => p.id);
report("point ids are unique", [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))], "no duplicates");

const ptIds = new Set(all(/^ {2}"([^"]+)": \{/gm, contentTs).map((m) => m[1]));
report("every point has a PT translation", ids.filter((id) => !ptIds.has(id)), "PT complete");
report(
  "no orphan PT entries",
  [...ptIds].filter((id) => !ids.includes(id)),
  "PT entries all map to a point",
);

const imports = new Map(
  all(/import (\w+) from "\.\.\/assets\/reflex\/([^"]+)";/g, pointsTs).map((m) => [m[1], m[2]]),
);
const usedImages = new Set(all(/image:\s*(\w+),/g, pointsTs).map((m) => m[1]));
report(
  "every image file exists",
  [...imports.values()].filter((f) => !existsSync(resolve(SRC, "assets/reflex", f))),
  `${imports.size} images present`,
);
report(
  "every point has an image",
  usedImages.size < points.length
    ? [`${points.length - usedImages.size} point(s) have no image assigned`]
    : [],
  `${usedImages.size} points illustrated`,
);
report(
  "no unused image imports",
  [...imports.keys()].filter((v) => !usedImages.has(v)),
  "every import is used",
);
const onDisk = readdirSync(resolve(SRC, "assets/reflex"));
const bundled = new Set(imports.values());
report("no orphan image files", onDisk.filter((f) => !bundled.has(f)), "assets folder is clean");
report(
  "no leftover template text in PT content",
  [...ptIds].filter((id) =>
    new RegExp(`"${id}": \\{[^}]*(Correções da especialista|Pressão: )`).test(contentTs),
  ),
  "PT content clean",
);

// --- summary --------------------------------------------------------------
if (failures.length > 0) {
  console.log(`\n${failures.length} check(s) failed:\n  - ${failures.join("\n  - ")}\n`);
  process.exit(1);
}
console.log("\nAll checks passed.\n");
