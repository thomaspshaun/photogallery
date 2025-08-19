import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export default async function (context, req) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const GALLERIES_ROOT = path.join(__dirname, "../galleries");

  function scanFolder(folderPath) {
    const items = fs.readdirSync(folderPath, { withFileTypes: true });
    const albums = [];
    const photos = [];
    items.forEach((item) => {
      const fullPath = path.join(folderPath, item.name);
      if (item.isDirectory()) {
        albums.push({
          name: item.name,
          ...scanFolder(fullPath),
        });
      } else if (item.isFile() && /\.(jpg|jpeg|png|gif)$/i.test(item.name)) {
        photos.push({
          name: item.name,
          url: `/galleries/${path
            .relative(GALLERIES_ROOT, fullPath)
            .replace(/\\/g, "/")}`,
        });
      }
    });
    return { albums, photos };
  }

  try {
    const gallery = scanFolder(GALLERIES_ROOT);
    context.res = {
      status: 200,
      body: gallery,
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch {
    context.res = {
      status: 500,
      body: { error: "Failed to scan galleries." },
    };
  }
}
