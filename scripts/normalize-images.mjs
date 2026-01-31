import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve("src/img");

// нормализуем имя: lower case + убираем лишние пробелы
function normalizeName(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " "); // схлопываем двойные пробелы
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  // сначала файлы
  for (const e of entries) {
    if (!e.isFile()) continue;

    const oldPath = path.join(dir, e.name);
    const newName = normalizeName(e.name);

    if (newName !== e.name) {
      const newPath = path.join(dir, newName);
      await fs.rename(oldPath, newPath);
      console.log(`📄 ${e.name} → ${newName}`);
    }
  }

  // потом папки (важно!)
  for (const e of entries) {
    if (!e.isDirectory()) continue;

    const oldDir = path.join(dir, e.name);
    const newName = normalizeName(e.name);
    const newDir = path.join(dir, newName);

    await walk(oldDir);

    if (newName !== e.name) {
      await fs.rename(oldDir, newDir);
      console.log(`📁 ${e.name} → ${newName}`);
    }
  }
}

walk(ROOT)
  .then(() => console.log("✅ Все файлы и папки нормализованы"))
  .catch(console.error);
