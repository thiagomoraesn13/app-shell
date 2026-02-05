import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const pkg = process.env.DESIGN_TOKENS_PKG || "@thiagomoraesn13/design-tokens";

// resolve o arquivo compilado
const colorsEntry = require.resolve(`${pkg}/tokens/colors.js`);

// importa ESM via path file://
const { colorTokens } = await import(new URL(`file://${colorsEntry}`).href);

const tokens = Object.keys(colorTokens);

// gera classes que você quer suportar
const classes = tokens.flatMap((t) => [
  `text-${t}`,
  `bg-${t}`,
  `border-${t}`,
  `ring-${t}`,
  `from-${t}`,
  `to-${t}`,
]);

// arquivo de texto só pra scan (não precisa ser css)
const outFile = path.resolve("src", "tw-safelist.txt");
fs.writeFileSync(outFile, classes.join("\n") + "\n", "utf8");

console.log(`[tw-safelist] gerado: ${outFile} (${classes.length} classes)`);
