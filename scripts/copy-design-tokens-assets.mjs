import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const pkg = "@thiagomoraesn13/design-tokens";

// ✅ resolve algo que está exportado (CSS que você já importa no app-shell)
const entryCss = require.resolve(`${pkg}/dist/index.css`);
// .../node_modules/@thiagomoraesn13/design-tokens/dist/index.css
const distDir = path.dirname(entryCss); // .../dist

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");

const destDir = path.join(appRoot, "public", "assets", "design-tokens");

fs.rmSync(destDir, { recursive: true, force: true });
fs.mkdirSync(destDir, { recursive: true });
fs.cpSync(distDir, destDir, { recursive: true });

console.log(`[copy] ${distDir} -> ${destDir}`);
