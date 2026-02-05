import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");

// carrega .env.development se existir (dev)
const envLocalPath = path.join(appRoot, ".env.development");
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
}

// THEME
const theme = (process.env.VITE_THEME || "").trim() || "noverde";

// PACKAGE
const pkg =
  (process.env.DESIGN_TOKENS_PKG || "").trim() ||
  "@thiagomoraesn13/design-tokens";

const require = createRequire(import.meta.url);

// resolve css do tema
let themeCss;
try {
  themeCss = require.resolve(`${pkg}/themes/${theme}/index.css`);
} catch {
  console.error(
    `[copy-assets] Não consegui resolver: ${pkg}/themes/${theme}/index.css`,
  );
  process.exit(1);
}

const themeDir = path.dirname(themeCss);
const assetsSrc = path.join(themeDir, "assets");

// destino
const destDir = path.join(appRoot, "public", "assets", "partner", theme);

fs.rmSync(destDir, { recursive: true, force: true });
fs.mkdirSync(destDir, { recursive: true });

if (!fs.existsSync(assetsSrc)) {
  console.log(`[copy-assets] Nenhum asset encontrado em ${assetsSrc}`);
  process.exit(0);
}

fs.cpSync(assetsSrc, destDir, { recursive: true });
//console.log(`[copy-assets] ${assetsSrc} -> ${destDir}`);
