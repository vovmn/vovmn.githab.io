import fs from "node:fs/promises";
import path from "node:path";

const JSON_PATH = path.resolve("src/data/products.json");

function normalizePath(p) {
  if (!p || typeof p !== "string") return p;

  return p
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

async function main() {
  const raw = await fs.readFile(JSON_PATH, "utf-8");
  const data = JSON.parse(raw);

  let changed = 0;

  for (const product of data.products || []) {
    if (!product.image) continue;

    const normalized = normalizePath(product.image);
    if (normalized !== product.image) {
      product.image = normalized;
      changed++;
    }
  }

  await fs.writeFile(JSON_PATH, JSON.stringify(data, null, 2), "utf-8");
  console.log(`✅ Обновлено путей в JSON: ${changed}`);
}

main().catch(console.error);
