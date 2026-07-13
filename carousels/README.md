# Carousels

Image carousels (statements, short texts, info tidbits) are Qnit's main post style.
Slides are authored as **editable SVG** (versioned source) and exported to the
formats the platforms actually accept.

> SVG can't be posted directly. Instagram takes **PNG/JPEG**; LinkedIn's native
> swipeable carousel is a **PDF** document post. This pipeline exports both from one
> SVG source — see [../brand/brand-voice.md](../brand/brand-voice.md) for palette & type.

## Structure

```
carousels/
├── templates/                  # reusable starter slides (cover, statement, tidbit, cta)
├── scripts/export.mjs          # SVG -> PNG (+ PDF) build
├── package.json                # `npm run export`
└── <YYYY-MM-DD-slug>/
    ├── carousel.md             # brief: caption, hashtags, slide copy, alt text, status
    ├── slides/                 # source SVGs, numbered (01-…, 02-…)
    └── export/                 # generated + committed
        ├── instagram/          # 01.png … NN.png  (1080×1350)
        └── linkedin/           # carousel.pdf + 01.png … NN.png
```

## Create a carousel

1. Copy the folder pattern: `carousels/YYYY-MM-DD-slug/`.
2. Add a `carousel.md` brief (copy from an existing one).
3. Build slides in `slides/` from [templates/](templates/) — number them `01-…`, `02-…`.
   - Canvas **1080×1350** (4:5). Keep ~90px safe margins.
   - Colors: bg `#070656` or `#05032e`; accents `#21b4bb` `#3c91e6` `#ff7065`;
     text `#FFFFFF`; grey `#5c5c5c` for body only.
   - Font **Quicksand**: headings Bold (700), body Medium (500).
   - SVG has no auto-wrap — break lines manually with `<tspan>`.
4. Write the caption(s) as plain-text, copy-paste-ready files next to `carousel.md`:
   `caption.instagram.txt` and/or `caption.linkedin.txt` (no Markdown; hashtags at the end).
5. Export (see below) and commit the generated `export/` files.

## Export

```bash
# from carousels/
npm install                          # first time only
npm run export                       # export every carousel
npm run export -- 2026-07-30-qa-myths  # export a single carousel
```

Fonts are loaded from the repo's committed Quicksand TTFs, so exports are
reproducible without installing anything system-wide.

### No Node? Fallbacks

Render one slide with a standalone tool (fonts must be available):

```bash
# resvg CLI
resvg --font-family "Quicksand" slides/01-cover.svg export/instagram/01.png

# Inkscape CLI
inkscape slides/01-cover.svg --export-type=png -w 1080 -h 1350 -o export/instagram/01.png
```

Then combine PNGs into a PDF for LinkedIn (e.g. `img2pdf export/linkedin/*.png -o export/linkedin/carousel.pdf`).

## Publishing

- **Instagram:** upload `export/instagram/*.png` as a carousel (same 4:5 for every slide).
- **LinkedIn:** upload `export/linkedin/carousel.pdf` as a document post for the native
  swipe experience, or the PNGs as a multi-image post.
