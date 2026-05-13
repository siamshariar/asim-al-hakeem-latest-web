#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const chunkSize = process.argv[2] ? Number(process.argv[2]) : 2000;
const dataPath = path.join(process.cwd(), 'data', 'qna.json');
const outDir = path.join(process.cwd(), 'data', 'qna');

function exitWith(msg) {
  console.error(msg);
  process.exit(1);
}

if (!fs.existsSync(dataPath)) {
  exitWith(`Source file not found: ${dataPath}`);
}

const raw = fs.readFileSync(dataPath, 'utf8');
let parsed;
try {
  parsed = raw ? JSON.parse(raw) : [];
} catch (e) {
  exitWith(`Failed to parse JSON: ${e && e.message}`);
}

if (!Array.isArray(parsed)) {
  exitWith('qna.json does not contain a top-level array; aborting.');
}

fs.mkdirSync(outDir, { recursive: true });

let index = 0;
let fileCount = 0;
while (index < parsed.length) {
  const chunk = parsed.slice(index, index + chunkSize);
  const fileName = `qna-${String(fileCount).padStart(3, '0')}.json`;
  const outPath = path.join(outDir, fileName);
  fs.writeFileSync(outPath, JSON.stringify(chunk, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${outPath} (${chunk.length} items)`);
  index += chunkSize;
  fileCount += 1;
}

console.log(`Split ${parsed.length} items into ${fileCount} files in ${outDir}`);
