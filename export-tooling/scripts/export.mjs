// Qnit carousel export: SVG slides -> PNG (Instagram + LinkedIn) + PDF (LinkedIn).
//
// Usage:
//   npm run export                 # export every carousel folder
//   npm run export -- <slug>       # export one carousel (e.g. 2026-07-30-qa-myths)
//
// Fonts are loaded from the repo's committed Quicksand TTFs so exports are
// reproducible without any system font install.

import { readdir, readFile, mkdir, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import { PDFDocument } from "pdf-lib";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CAROUSELS_DIR = resolve(__dirname, ".."); // carousels/
const REPO_ROOT = resolve(CAROUSELS_DIR, ".."); // repo root
const FONT_DIR = join(REPO_ROOT, "brand", "assets", "Font", "Font Quicksand", "static");

const FONT_FILES = [
  "Quicksand-Light.ttf",
  "Quicksand-Regular.ttf",
  "Quicksand-Medium.ttf",
  "Quicksand-SemiBold.ttf",
  "Quicksand-Bold.ttf",
].map((f) => join(FONT_DIR, f));

// Canvas width in px; height follows each SVG's own aspect ratio.
const RENDER_WIDTH = 1080;

// Folders under carousels/ that are not carousels.
const IGNORE = new Set(["node_modules", "scripts", "templates"]);

async function listCarousels() {
  const entries = await readdir(CAROUSELS_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && !IGNORE.has(e.name) && !e.name.startsWith("."))
    .map((e) => e.name)
    .sort();
}

function renderSlide(svg) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: RENDER_WIDTH },
    font: {
      fontFiles: FONT_FILES,
      loadSystemFonts: false,
      defaultFontFamily: "Quicksand",
    },
  });
  return resvg.render().asPng();
}

async function exportCarousel(slug) {
  const dir = join(CAROUSELS_DIR, slug);
  const slidesDir = join(dir, "slides");
  if (!existsSync(slidesDir) || !(await stat(slidesDir)).isDirectory()) {
    console.warn(`  skip ${slug}: no slides/ folder`);
    return;
  }

  const files = (await readdir(slidesDir))
    .filter((f) => f.toLowerCase().endsWith(".svg"))
    .sort();
  if (files.length === 0) {
    console.warn(`  skip ${slug}: no .svg slides`);
    return;
  }

  const igDir = join(dir, "export", "instagram");
  const liDir = join(dir, "export", "linkedin");
  await mkdir(igDir, { recursive: true });
  await mkdir(liDir, { recursive: true });

  const pngs = [];
  for (let i = 0; i < files.length; i++) {
    const num = String(i + 1).padStart(2, "0");
    const svg = await readFile(join(slidesDir, files[i]));
    const png = renderSlide(svg);
    await writeFile(join(igDir, `${num}.png`), png);
    await writeFile(join(liDir, `${num}.png`), png);
    pngs.push(png);
    console.log(`  ${files[i]} -> export/{instagram,linkedin}/${num}.png`);
  }

  // Assemble the LinkedIn native (document) carousel as a single PDF.
  const pdf = await PDFDocument.create();
  for (const png of pngs) {
    const img = await pdf.embedPng(png);
    const page = pdf.addPage([img.width, img.height]);
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
  }
  await writeFile(join(liDir, "carousel.pdf"), await pdf.save());
  console.log(`  export/linkedin/carousel.pdf (${pngs.length} pages)`);
}

async function main() {
  const arg = process.argv[2];
  const slugs = arg ? [arg] : await listCarousels();
  if (slugs.length === 0) {
    console.log("No carousels found under carousels/.");
    return;
  }
  for (const slug of slugs) {
    console.log(`Exporting: ${slug}`);
    await exportCarousel(slug);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
