import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const pkg =
  process.env.DESIGN_TOKENS_PKG || "@dotzinc/web-lib-design-foundation";

// ajuste aqui se seu export real for outro
const colorsEntry = require.resolve(`${pkg}/tokens/colors.js`);
const { colorTokens } = await import(new URL(`file://${colorsEntry}`).href);

const tokens = Object.keys(colorTokens).sort();

// o que você quer gerar (se mudar isso, muda o hash)
const prefixes = ["text-", "bg-", "border-", "ring-", "from-", "to-"];

// monta conteúdo
const classes = tokens.flatMap((t) => prefixes.map((p) => `${p}${t}`));
const content = classes.join("\n") + "\n";

// hash da entrada/saída (qualquer mudança muda esse hash)
const hash = crypto.createHash("sha256").update(content).digest("hex");

// caminhos
const outFile = path.resolve("src/tw-safelist.txt");
const metaFile = path.resolve("src/tw-safelist.meta.json");

// lê hash anterior
let prevHash = null;
if (fs.existsSync(metaFile)) {
  try {
    prevHash = JSON.parse(fs.readFileSync(metaFile, "utf8")).hash;
  } catch {
    // se estiver corrompido, ignora
  }
}

// se não mudou, não reescreve (evita rebuild)
if (prevHash === hash && fs.existsSync(outFile)) {
  console.log(`[tw-safelist] sem mudanças (${tokens.length} tokens). skip`);
  process.exit(0);
}

// escreve arquivos
fs.writeFileSync(outFile, content, "utf8");
fs.writeFileSync(
  metaFile,
  JSON.stringify(
    { hash, tokensCount: tokens.length, generatedAt: new Date().toISOString() },
    null,
    2,
  ),
  "utf8",
);

console.log(
  `[tw-safelist] gerado (${tokens.length} tokens, ${classes.length} classes)`,
);
