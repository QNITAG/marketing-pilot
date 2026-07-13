---
name: design-linkedin-post-visuals
description: "Design SVG visuals for LinkedIn single-image, multi-image, and document/PDF posts, then export them to PNG/PDF. Use when a LinkedIn feed post needs on-brand imagery — a single graphic, an image sequence, or a swipeable document — built as editable SVG from Qnit templates."
---

# Design LinkedIn Post Visuals

Create the imagery for a LinkedIn feed post as **editable SVG**, then render it to
the formats LinkedIn accepts. SVG is the versioned source; the
[export engine](./references/exporting.md) turns it into PNG (and a
PDF for document posts). This skill covers visuals only — write the caption and draft
with the [write-social-content skill](../write-social-content/SKILL.md).

## When to use

- A LinkedIn post needs a designed graphic, an image sequence, or a swipeable document.
- Choosing between a single-image, multi-image, or document/PDF post and building the assets.

## Choose the format

Pick by the reader's task, then build the matching visuals. These are **distinct
LinkedIn formats** — never treat a multi-image post and a document post as the same
thing, and don't call either a "carousel" in production specs.

| Format | Build | Aspect / canvas | LinkedIn constraints (verify in the composer) |
| --- | --- | --- | --- |
| **Single-image** | 1 SVG → 1 PNG | 1080px wide; aspect **3:1–4:5** (4:5 = 1080×1350 default; 1:1 = 1080×1080; landscape ≈ 1.91:1). Anything outside 3:1–4:5 is center-cropped. | One image *or* a link preview, not both. Max upload 5 MB. Add alt text. |
| **Multi-image** | 2–20 SVGs → N PNGs | One **consistent** aspect, ≤ 4:5. The **first image sets the layout**; later rows may crop. | Up to 20 images. Native Page scheduling excludes multi-photo posts. Add alt text per image. |


## Templates

Start from a copy of the matching SVG in [assets/templates/](./assets/templates/):

| Template | Use for |
| --- | --- |
| [single-image.svg](./assets/templates/single-image.svg) | A single-image post (default 4:5). |
| [slide-cover.svg](./assets/templates/slide-cover.svg) | The first slide of a multi-image or document post. |
| [slide-statement.svg](./assets/templates/slide-statement.svg) | A bold claim + the reality. |
| [slide-tidbit.svg](./assets/templates/slide-tidbit.svg) | A label + stat + context. |
| [slide-cta.svg](./assets/templates/slide-cta.svg) | The closing slide + next step. |

## Procedure

1. In the post's draft folder (`linkedin/posts/YYYY-MM-DD-slug/`), create a `visuals/`
   subfolder.
2. Copy the matching template(s) into `visuals/`, numbered `01-…`, `02-…` in reading
   order. For multi-image and document posts, make slide `01` intentional — it sets the
   layout (multi-image) or is the cover (document).
3. Edit each copy on brand:
   - Canvas 1080×1350 (4:5), unless a single-image post uses 1:1 (1080×1080) or landscape.
   - Keep ~90px safe margins.
   - Branding: use the embedded **Qnit logo**, never a text wordmark. Inline the white logo
     (`brand/assets/Brand Logo/SVG/Qnit_logo_white.svg`) on dark backgrounds and the blue logo
     on light ones — the templates already include it as a nested `<svg>`.
   - Colors: bg `#070656` or `#05032e`; accents `#21b4bb` `#3c91e6` `#ff7065`;
     text `#FFFFFF`; grey `#5c5c5c` for body only.
   - Font **Quicksand**: headings Bold (700), body Medium (500).
   - SVG has no auto-wrap — break lines manually with `<tspan>`.
4. Export (below) and commit the generated `export/` files.
5. Record alt text for every image in the post draft's Assets section (see
   [write-social-content](../write-social-content/SKILL.md)).

## Export

```bash
# from export-tooling/
npm install                                          # first time only
npm run export -- linkedin/posts/YYYY-MM-DD-slug         # single-image / multi-image (PNGs)
npm run export -- linkedin/posts/YYYY-MM-DD-slug --pdf   # document (PDF) post
```

This writes `export/instagram/NN.png` and `export/linkedin/NN.png` per slide (use these
for single-image and multi-image posts). It builds `export/linkedin/document.pdf` only
when you pass `--pdf`, for a LinkedIn document (PDF) post. Full details, fallbacks, and
publishing steps: [references/exporting.md](./references/exporting.md).

## Rules

- Build visuals as SVG; never hand-edit the generated PNG/PDF exports — regenerate them.
- Always brand with the embedded Qnit logo, never a text wordmark — white on dark backgrounds,
  blue on light; keep it inlined as vector so exports stay reproducible.
- Single-image, multi-image, and document/PDF are distinct formats; don't reuse one label
  or one spec for another, and don't call them "carousels" in production.
- Add alt text for every image and record it in the draft.
- Stay on brand (palette, Quicksand, margins). This skill produces visuals only —
  captions, copy, and status stay with write-social-content; new content stays `Draft`.
