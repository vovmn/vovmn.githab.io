import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(process.cwd(), "src/img"); // <-- твоя папка с картинками
const QUALITY = 82; // 75-85 обычно sweet spot
const KEEP_ORIGINALS = true; // поставь false, если хочешь удалять jpg/png после конверта

const exts = new Set([".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

async function main() {
  const all = await walk(ROOT);
  const targets = all.filter(f => exts.has(path.extname(f)));

  console.log(`Found ${targets.length} images to convert in ${ROOT}`);

  for (const file of targets) {
    const out = file.replace(/\.(png|jpg|jpeg|PNG|JPG|JPEG)$/i, ".webp");
    try {
      const img = sharp(file);
      const meta = await img.metadata();

      // Чуть умнее для PNG: если есть альфа, оставляем, webp умеет прозрачность
      const webp = img.webp({
        quality: QUALITY,
        effort: 6, // 0..6 (6 = лучше сжатие, чуть дольше)
      });

      await webp.toFile(out);

      if (!KEEP_ORIGINALS) {
        await fs.unlink(file);
      }

      const sizeIn = (await fs.stat(file)).size;
      const sizeOut = (await fs.stat(out)).size;
      const ratio = (sizeOut / sizeIn * 100).toFixed(1);

      console.log(`${path.relative(ROOT, file)} -> ${path.relative(ROOT, out)} (${ratio}%) ${meta.width}x${meta.height}`);
    } catch (e) {
      console.error(`Failed: ${file}`, e);
    }
  }

  console.log("Done.");
}

main();
