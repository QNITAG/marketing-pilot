# Exporting visuals to PNG/PDF

SVG can't be posted directly — Instagram takes PNG/JPEG and LinkedIn's document post
takes a PDF. The Qnit export engine renders this skill's SVG sources to both from one
source, using the committed Quicksand fonts so exports are reproducible without a
system font install.

## Prerequisites

- Node.js.
- Install engine dependencies once: run `npm install` in
  [`export-tooling/`](../../../../export-tooling/).

## Run

From `export-tooling/`, pass the post project path (relative to the repo root):

```bash
npm run export -- linkedin/posts/YYYY-MM-DD-slug          # single-image / multi-image (PNGs)
npm run export -- linkedin/posts/YYYY-MM-DD-slug --pdf    # also build the document post PDF
```

The engine reads `<project>/visuals/*.svg` (numbered `01-…`, `02-…`) and renders each
at 1080px width; height follows each SVG's own aspect ratio. Pass `--pdf` only for a
LinkedIn document (PDF) post.

## Outputs

```
<project>/export/
├── instagram/   # 01.png … NN.png
└── linkedin/    # 01.png … NN.png  (+ document.pdf only with --pdf)
```

- PNGs are always written — use them for single-image and multi-image posts.
- `export/linkedin/document.pdf` is written only when you pass `--pdf`, for LinkedIn's
  native document (PDF) post.

## Publishing

- **Single-image post:** upload the one PNG (LinkedIn or Instagram).
- **Multi-image post (LinkedIn):** upload `export/linkedin/*.png` in order.
- **Document post (LinkedIn):** upload `export/linkedin/document.pdf`.
- **Instagram carousel:** upload `export/instagram/*.png` (same 4:5 for every slide).

## No Node? Fallbacks

Render one SVG with a standalone tool (Quicksand must be available):

```bash
# resvg CLI
resvg --font-family "Quicksand" visuals/01-cover.svg export/instagram/01.png

# Inkscape CLI
inkscape visuals/01-cover.svg --export-type=png -w 1080 -h 1350 -o export/instagram/01.png
```

Combine PNGs into a PDF for LinkedIn:

```bash
img2pdf export/linkedin/*.png -o export/linkedin/document.pdf
```

## Rules

- Never hand-edit the generated files in `export/` — regenerate them from the SVG sources.
- Commit the generated `export/` files alongside the SVG sources.

Engine implementation and internals live in
[`export-tooling/`](../../../../export-tooling/).
