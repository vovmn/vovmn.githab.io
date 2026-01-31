import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve("src/img");
const REMOVE_EXT = new Set([".jpg", ".jpeg", ".png", ".gif"]);
const DRY_RUN = process.argv.includes("--dry");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      await walk(full);
      continue;
    }
    if (!e.isFile()) continue;

    const ext = path.extname(e.name).toLowerCase();
    if (REMOVE_EXT.has(ext)) {
      if (DRY_RUN) {
        const s = await stat(full);
        console.log("[DRY]", full, s.size, "bytes");
      } else {
        await unlink(full);
        console.log("[DEL]", full);
      }
    }
  }
}

walk(ROOT).catch((e) => {
  console.error(e);
  process.exit(1);
});
