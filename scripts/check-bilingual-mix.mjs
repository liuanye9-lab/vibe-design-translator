import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const scanRoots = ["app", "components", "lib", "store"];
const ignoredParts = [
  `${path.sep}lib${path.sep}i18n${path.sep}`,
  `${path.sep}node_modules${path.sep}`,
  `${path.sep}.next${path.sep}`,
];

const bannedPhrases = [
  "平易近人 yet 前沿",
  "Before / After 可视化",
  "Agent 工作流",
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (ignoredParts.some((part) => fullPath.includes(part))) return [];
    if (entry.isDirectory()) return walk(fullPath);
    if (!/\.(ts|tsx|js|jsx|md)$/.test(entry.name)) return [];
    return [fullPath];
  });
}

const findings = [];
for (const scanRoot of scanRoots) {
  for (const file of walk(path.join(root, scanRoot))) {
    const content = fs.readFileSync(file, "utf8");
    for (const phrase of bannedPhrases) {
      if (content.includes(phrase)) {
        findings.push(`${path.relative(root, file)} contains banned phrase: ${phrase}`);
      }
    }
  }
}

if (findings.length) {
  console.error("bilingual mix check failed.");
  for (const finding of findings) {
    console.error(finding);
  }
  process.exit(1);
}

console.log("bilingual mix check passed.");
