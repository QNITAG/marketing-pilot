// Qnit SVG export engine: renders a project's SVG sources to PNG (Instagram +
// LinkedIn) and, for multi-page projects, a LinkedIn document PDF.
//
// Usage:
//   npm run export -- <project-path> [--pdf]
//     <project-path> is relative to the repo root, e.g.
//     linkedin/posts/2026-07-13-ai-test-automation-myths
//     --pdf also builds a LinkedIn document (PDF) post from the slides.
//
// Reads  <project>/visuals/*.svg  (numbered 01-…, 02-…)
// Writes <project>/export/instagram/NN.png and <project>/export/linkedin/NN.png.
//        With --pdf, also writes <project>/export/linkedin/document.pdf for a
//        LinkedIn document (PDF) post.
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
const TOOLING_DIR = resolve(__dirname, ".."); // export-tooling/
const REPO_ROOT = resolve(TOOLING_DIR, ".."); // repo root
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

async function exportProject(projectPath, { pdf = false } = {}) {
  const dir = resolve(REPO_ROOT, projectPath);
  const visualsDir = join(dir, "visuals");
  if (!existsSync(visualsDir) || !(await stat(visualsDir)).isDirectory()) {
    throw new Error(`no visuals/ folder in ${projectPath}`);
  }

  const files = (await readdir(visualsDir))
    .filter((f) => f.toLowerCase().endsWith(".svg"))
    .sort();
  if (files.length === 0) {
    throw new Error(`no .svg sources in ${projectPath}/visuals`);
  }

  const igDir = join(dir, "export", "instagram");
  const liDir = join(dir, "export", "linkedin");
  await mkdir(igDir, { recursive: true });
  await mkdir(liDir, { recursive: true });

  const pngs = [];
  for (let i = 0; i < files.length; i++) {
    const num = String(i + 1).padStart(2, "0");
    const svg = await readFile(join(visualsDir, files[i]));
    const png = renderSlide(svg);
    await writeFile(join(igDir, `${num}.png`), png);
    await writeFile(join(liDir, `${num}.png`), png);
    pngs.push(png);
    console.log(`  ${files[i]} -> export/{instagram,linkedin}/${num}.png`);
  }

  // The LinkedIn document (PDF) post is its own format — only build the PDF when it
  // is explicitly requested with --pdf. Single-image and multi-image posts use the
  // PNGs above, not a PDF.
  if (pdf) {
    const pdfDoc = await PDFDocument.create();
    for (const png of pngs) {
      const img = await pdfDoc.embedPng(png);
      const page = pdfDoc.addPage([img.width, img.height]);
      page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    }
    await writeFile(join(liDir, "document.pdf"), await pdfDoc.save());
    console.log(`  export/linkedin/document.pdf (${pngs.length} page${pngs.length === 1 ? "" : "s"})`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const wantPdf = args.includes("--pdf") || args.includes("--document");
  const projectPath = args.find((a) => !a.startsWith("--"));
  if (!projectPath) {
    console.error("Usage: npm run export -- <project-path> [--pdf]");
    console.error("  --pdf   also build export/linkedin/document.pdf for a LinkedIn document post");
    console.error("  e.g. npm run export -- linkedin/posts/2026-07-13-ai-test-automation-myths");
    process.exit(1);
  }
  console.log(`Exporting: ${projectPath}${wantPdf ? " (+ document.pdf)" : ""}`);
  await exportProject(projectPath, { pdf: wantPdf });
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
