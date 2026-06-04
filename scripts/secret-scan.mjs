import fs from "node:fs/promises";
import path from "node:path";

const IGNORED_DIRS = new Set([
  ".git",
  ".see-code",
  "node_modules",
  "dist"
]);

const SECRET_PATTERNS = [
  {
    name: "OpenAI-style secret key",
    pattern: /\bsk-[A-Za-z0-9]{32,}\b/g
  }
];

const rootPath = process.cwd();
const findings = [];

await scan(rootPath);

if (findings.length > 0) {
  console.error("Secret scan failed:");
  for (const finding of findings) {
    console.error(`- ${finding.file}: ${finding.name}`);
  }
  process.exitCode = 1;
} else {
  console.log("Secret scan passed.");
}

async function scan(currentPath) {
  const entries = await fs.readdir(currentPath, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(currentPath, entry.name);
    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name)) {
        await scan(absolutePath);
      }
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const relativePath = path.relative(rootPath, absolutePath);
    const content = await fs.readFile(absolutePath, "utf8").catch(() => "");
    for (const secretPattern of SECRET_PATTERNS) {
      secretPattern.pattern.lastIndex = 0;
      if (secretPattern.pattern.test(content)) {
        findings.push({
          file: relativePath,
          name: secretPattern.name
        });
      }
    }
  }
}
