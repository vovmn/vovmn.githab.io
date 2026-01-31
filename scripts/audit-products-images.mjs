import fs from "node:fs";
import path from "node:path";

const PROJECT_ROOT = process.cwd();

// где лежит json
const JSON_PATH = path.join(PROJECT_ROOT, "src", "data", "products.json");

// папка с картинками
const IMG_ROOT = path.join(PROJECT_ROOT, "src", "img");

// чем заменяем
const PLACEHOLDER = "/src/img/placeholder.webp";

// режимы запуска
const DO_FIX = process.argv.includes("--fix");
const TRY_APPEND_WEBP = process.argv.includes("--try-webp"); // полезно если путь "без расширения"

function toFsPathFromImageUrl(imgUrl) {
  // ожидаем /src/img/....
  if (!imgUrl || typeof imgUrl !== "string") return null;
  const clean = imgUrl.trim();

  if (!clean.startsWith("/src/img/")) return null;

  // /src/img/xxx.webp -> <root>/src/img/xxx.webp
  const relative = clean.replace("/src/img/", "");
  return path.join(IMG_ROOT, relative);
}

function exists(p) {
  try {
    return fs.existsSync(p);
  } catch {
    return false;
  }
}

function hasExtension(p) {
  const ext = path.extname(p);
  return Boolean(ext);
}

function normalizeSlashes(p) {
  return p.replaceAll("\\", "/");
}

function main() {
  if (!exists(JSON_PATH)) {
    console.error("Не найден файл:", JSON_PATH);
    process.exit(1);
  }

  const raw = fs.readFileSync(JSON_PATH, "utf-8");
  const data = JSON.parse(raw);

  const products = Array.isArray(data.products) ? data.products : [];
  const broken = [];

  let changed = 0;

  for (const product of products) {
    const name = product?.name ?? "(без имени)";
    const image = (product?.image ?? "").trim();

    // пустая картинка
    if (!image) {
      broken.push({ name, reason: "empty image", image });
      if (DO_FIX) {
        product.image = PLACEHOLDER;
        changed++;
      }
      continue;
    }

    const fsPath = toFsPathFromImageUrl(image);

    // путь вообще не из /src/img
    if (!fsPath) {
      broken.push({ name, reason: "image not in /src/img", image });
      if (DO_FIX) {
        product.image = PLACEHOLDER;
        changed++;
      }
      continue;
    }

    // если нет расширения — часто твой кейс “Роза/нету”
    if (!hasExtension(fsPath)) {
      if (TRY_APPEND_WEBP) {
        const candidateFs = fsPath + ".webp";
        const candidateUrl = image + ".webp";

        if (exists(candidateFs)) {
          // нашли webp с добавленным расширением
          product.image = candidateUrl;
          changed++;
          continue;
        }
      }

      broken.push({ name, reason: "no extension", image });
      if (DO_FIX) {
        product.image = PLACEHOLDER;
        changed++;
      }
      continue;
    }

    // файл не существует
    if (!exists(fsPath)) {
      broken.push({ name, reason: "file not found", image, fsPath: normalizeSlashes(fsPath) });

      // попробуем автоматически заменить .jpg/.png на .webp (часто помогает)
      if (TRY_APPEND_WEBP) {
        const asWebpUrl = image.replace(/\.(jpg|jpeg|png)$/i, ".webp");
        const asWebpFs = toFsPathFromImageUrl(asWebpUrl);

        if (asWebpFs && exists(asWebpFs)) {
          product.image = asWebpUrl;
          changed++;
          continue;
        }
      }

      if (DO_FIX) {
        product.image = PLACEHOLDER;
        changed++;
      }
      continue;
    }
  }

  // печать отчёта
  if (broken.length) {
    console.log("❌ Найдены товары с проблемными картинками:", broken.length);
    for (const b of broken) {
      console.log(`- ${b.name}`);
      console.log(`  reason: ${b.reason}`);
      console.log(`  image: ${b.image}`);
      if (b.fsPath) console.log(`  fs: ${b.fsPath}`);
    }
  } else {
    console.log("✅ Все картинки найдены, битых путей нет.");
  }

  // сохраняем изменения
  if (DO_FIX) {
    fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2), "utf-8");
    console.log(`🛠 Исправлено записей: ${changed}`);
    console.log(`✅ Сохранено в: ${JSON_PATH}`);
  } else {
    console.log("ℹ Запусти с --fix чтобы автоматически заменить битые пути на placeholder.");
  }
}

main();
