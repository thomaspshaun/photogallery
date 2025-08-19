import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const GALLERIES_ROOT = path.join(__dirname, "galleries");

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

app.use("/galleries", express.static(GALLERIES_ROOT));

app.get("/api/gallery", (req, res) => {
  try {
    const gallery = scanFolder(GALLERIES_ROOT);
    res.json(gallery);
  } catch {
    res.status(500).json({ error: "Failed to scan galleries." });
  }
});

app.listen(PORT, () => {
  console.log(`Gallery server running on port ${PORT}`);
});
