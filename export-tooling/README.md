# Export tooling

Node engine that renders **editable SVG** sources to the raster and document
formats the platforms accept. This is the build step only — authoring (templates,
brand rules, and which post format to build) lives in the
[design-linkedin-post-visuals skill](../.github/skills/design-linkedin-post-visuals/SKILL.md).

> SVG can't be posted directly. Instagram takes **PNG/JPEG**; LinkedIn's document
> post takes a **PDF**. This engine exports both from one SVG source — see
> [../brand/brand-voice.md](../brand/brand-voice.md) for palette & type.

## What it does

Given a project folder with a `visuals/` subfolder of numbered SVGs, it renders
each SVG at 1080px width (height follows the SVG) and writes:

```
<project>/
├── visuals/               # source SVGs, numbered (01-…, 02-…)
└── export/                # generated + committed
    ├── instagram/         # 01.png … NN.png
    └── linkedin/          # 01.png … NN.png  (+ document.pdf only with --pdf)
```

PNGs are always written — use them for single-image and multi-image posts. Pass
`--pdf` to also build `export/linkedin/document.pdf` for LinkedIn's native document
(PDF) post, which is a distinct format.

## Usage

```bash
# from export-tooling/
npm install                                          # first time only
npm run export -- linkedin/posts/2026-07-30-slug        # PNGs (single-image / multi-image)
npm run export -- linkedin/posts/2026-07-30-slug --pdf  # also build the document post PDF
```

Fonts are loaded from the repo's committed Quicksand TTFs, so exports are
reproducible without installing anything system-wide. Don't hand-edit the
generated files in `export/` — regenerate them from the SVG sources.

### No Node? Fallbacks

Render one SVG with a standalone tool (fonts must be available):

```bash
# resvg CLI
resvg --font-family "Quicksand" visuals/01-cover.svg export/instagram/01.png

# Inkscape CLI
inkscape visuals/01-cover.svg --export-type=png -w 1080 -h 1350 -o export/instagram/01.png
```

Then combine PNGs into a PDF for LinkedIn (e.g. `img2pdf export/linkedin/*.png -o export/linkedin/document.pdf`).

## Publishing

- **Single-image post:** upload the one PNG (LinkedIn or Instagram).
- **Multi-image post (LinkedIn):** upload `export/linkedin/*.png` in order.
- **Document post (LinkedIn):** upload `export/linkedin/document.pdf` for the native swipe experience.
- **Instagram carousel:** upload `export/instagram/*.png` (same 4:5 for every slide).
