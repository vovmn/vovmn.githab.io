import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "src/img");

// какие форматы удаляем
const OLD_EXTS = new Set([
  ".jpg", ".jpeg", ".png",
  ".JPG", ".JPEG", ".PNG"
]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...await walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const allFiles = await walk(ROOT);
  let removed = 0;
  let skipped = 0;

  for (const file of allFiles) {
    const ext = path.extname(file);
    if (!OLD_EXTS.has(ext)) continue;

    const webp = file.replace(/\.(png|jpg|jpeg)$/i, ".webp");

    try {
      await fs.access(webp); // проверяем, существует ли webp
      await fs.unlink(file);
      removed++;
      console.log(`🗑 removed: ${path.relative(ROOT, file)}`);
    } catch {
      skipped++;
      console.log(`⏭ skipped (no webp): ${path.relative(ROOT, file)}`);
    }
  }

  console.log("────────────────────────");
  console.log(`✔ removed: ${removed}`);
  console.log(`⚠ skipped (no webp): ${skipped}`);
  console.log("Done.");
}

main();
