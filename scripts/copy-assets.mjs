import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function listFilesRecursively(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  const stack = [dir];

  while (stack.length) {
    const cur = stack.pop();
    const entries = fs.readdirSync(cur, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(cur, e.name);
      if (e.isDirectory()) stack.push(full);
      else if (e.isFile()) out.push(full);
    }
  }

  // ordena para hash determinístico
  out.sort();
  return out;
}

function hashDirectory(dir) {
  const files = listFilesRecursively(dir);
  const hash = crypto.createHash("sha256");
  for (const f of files) {
    // inclui path relativo + conteúdo
    const rel = path.relative(dir, f).replaceAll("\\", "/");
    hash.update(rel);
    hash.update("\0");
    hash.update(fs.readFileSync(f));
    hash.update("\0");
  }
  return hash.digest("hex");
}

function readJsonIfExists(p) {
  try {
    if (!fs.existsSync(p)) return null;
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return null;
  }
}

function writeJson(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n", "utf8");
}

const theme = (process.env.VITE_THEME || "").trim() || "noverde";
const pkg =
  (process.env.DESIGN_TOKENS_PKG || "").trim() ||
  "@dotzinc/web-lib-design-foundation";

const require = createRequire(import.meta.url);

// resolve css do tema
let themeCss;
try {
  themeCss = require.resolve(`${pkg}/themes/${theme}/index.css`);
} catch {
  console.error(
    `[copy-assets] ERRO: não consegui resolver ${pkg}/themes/${theme}/index.css`,
  );
  console.error(
    `[copy-assets] Dica: confira se o pacote está instalado no ambiente de build e se o theme "${theme}" existe.`,
  );
  process.exit(1);
}

const themeDir = path.dirname(themeCss);
const assetsSrc = path.join(themeDir, "assets");

// destino
const destDir = path.join(appRoot, "public", "assets", "partner", theme);
ensureDir(destDir);

// se não existe assets, não falha o build
if (!fs.existsSync(assetsSrc)) {
  console.log(
    `[copy-assets] OK: nenhum asset encontrado em ${assetsSrc} (theme=${theme}).`,
  );
  process.exit(0);
}

// ---- hash + skip ----
const srcHash = hashDirectory(assetsSrc);
const manifestPath = path.join(destDir, ".copy-assets-manifest.json");
const prev = readJsonIfExists(manifestPath);

const nextManifest = {
  pkg,
  theme,
  assetsSrc,
  copiedAt: new Date().toISOString(),
  srcHash,
};

if (prev?.srcHash === srcHash && prev?.pkg === pkg && prev?.theme === theme) {
  console.log(`[copy-assets] SKIP: assets não mudaram (theme=${theme}).`);
  process.exit(0);
}

// copia “limpa” (agora só quando precisa)
fs.rmSync(destDir, { recursive: true, force: true });
ensureDir(destDir);

fs.cpSync(assetsSrc, destDir, { recursive: true });
writeJson(manifestPath, nextManifest);

console.log(
  `[copy-assets] OK: copiado ${assetsSrc} -> ${destDir} (theme=${theme}).`,
);
