# Marketing Content Workspace — Qnit AG

Central workspace for the internal marketing department to plan, draft, and manage
social media content for **Instagram** ([@qnit_ag](https://www.instagram.com/qnit_ag/))
and **LinkedIn** ([Qnit AG](https://www.linkedin.com/company/qnit-ag/)).

**Qnit AG** — a PRODYNA company. The quality assurance specialists for cloud native,
bespoke applications, and SAP. See [brand/brand-voice.md](brand/brand-voice.md) for
voice, pillars, and identity.

## Marketing as code

This repository treats **marketing content like source code** — and uses
**GitHub Copilot** as the engine that drafts, refines, and maintains it.

The idea: everything a campaign needs lives in plain text (Markdown) in version
control, so content is reviewable, versioned, and reproducible — the same way
engineers manage software.

- **Content is text, in Git.** Captions, articles, reel scripts, briefs, and brand
  guidelines are Markdown files. Every change is diff-able and has history.
- **Single source of truth.** Brand voice, palette, typography, and hashtags live in
  [brand/](brand/) so every draft — human- or Copilot-authored — stays on-brand.
- **Copilot does the drafting.** Point Copilot at the brand files and a calendar
  entry, and it produces on-voice drafts, adapts a post across platforms, suggests
  hashtags, or writes alt text. The brand files are its context/guardrails.
- **Review like a pull request.** Drafts move through a status workflow (below) and
  can be reviewed, commented on, and approved before anything is published.
- **Reusable by design.** Templates and the content brief make new content a
  copy-edit-review loop rather than a blank page.

Think of it as a content pipeline: **idea → Copilot draft → human review → publish**,
with the brand as code keeping quality and consistency high.

### How Copilot uses this repo

- Reads [brand/brand-voice.md](brand/brand-voice.md) and
  [brand/hashtag-bank.md](brand/hashtag-bank.md) as the voice and tagging rules.
- Starts new drafts from the `write-social-content` skill templates and fills them in.
- Pulls facts and messaging from [source-material/](source-material/) for the relevant
  campaign or idea before drafting.
- Repurposes one piece across Instagram and LinkedIn while respecting each platform's
  tone and specs.
- Reference brand assets (logo, colors, fonts) from [brand/assets/](brand/assets/).
- Designs **post imagery as SVG** via the
  [design-linkedin-post-visuals skill](.github/skills/design-linkedin-post-visuals/),
  then the [export-tooling](export-tooling/) engine renders PNG (Instagram) and PDF
  (LinkedIn) — content as code, exports reproducible.

## Structure

```
marketing-pilot/
├── .github/                # Copilot agents and skills (drafting templates live here)
│   ├── agents/             # content-researcher, social-content-editor
│   └── skills/             # write-research-brief, write-social-content, design-linkedin-post-visuals (+ assets)
├── brand/                  # Brand voice, visual guidelines, hashtag bank
├── content-calendar/       # Editorial calendar and posting schedule
├── templates/              # Reusable content briefs and checklists
├── source-material/         # Raw inputs posts are derived from (by campaign / idea)
├── export-tooling/         # Node SVG → PNG/PDF export engine (renders a project's visuals/)
│   └── scripts/            # export-visuals.mjs — SVG → PNG (+ PDF) build
├── instagram/              # Instagram-specific content (one folder per post)
│   ├── posts/              # Feed post folders (draft + caption + assets)
│   ├── stories/            # Story folders
│   ├── reels/              # Reel folders (script + caption)
│   └── assets/             # Shared/reusable image & video source files
└── linkedin/               # LinkedIn-specific content (one folder per post)
    ├── posts/              # Short-form post folders (draft + caption)
    ├── articles/           # Article folders
    └── assets/             # Shared/reusable image & video source files
```

## Workflow

1. **Plan** — add the idea to [content-calendar/2026-content-calendar.md](content-calendar/2026-content-calendar.md).
2. **Brief** — copy [templates/content-brief.md](templates/content-brief.md) for anything non-trivial.
3. **Draft** — start from the matching template in the [write-social-content skill](.github/skills/write-social-content/) (Copilot can do this for you).
4. **Review** — set `Status: Review` in the draft front matter and request approval.
5. **Schedule/Publish** — mark `Status: Scheduled` then `Status: Published` with the live URL.

## Status values

`Idea` → `Draft` → `Review` → `Approved` → `Scheduled` → `Published`

## Conventions

- Give each post its own folder: `<platform>/<type>/YYYY-MM-DD-short-slug/` (publish/target date first) for easy sorting.
- Keep everything for one post in that folder — the draft `.md`, the `.caption.txt`, and any post-specific assets.
- Name the draft and caption after the folder slug (`YYYY-MM-DD-short-slug.md`, `YYYY-MM-DD-short-slug.caption.txt`).
- Shared, reusable assets can still live in the platform `assets/` folder; post-specific assets live in the post folder.
- Keep the raw inputs a post is derived from in [source-material/](source-material/),
  organized by theme/purpose (campaign or idea); reference them from the draft.

### Captions (ready to copy-paste)

Every post — on any platform — needs a caption, including image-heavy ones
(carousels, image posts, reels). The caption expands on what the visual conveys; keep
it as long as it needs to be and no longer, unless a longer form is deliberately planned.

- Store the final caption as a **plain-text `.txt` file** (no Markdown formatting) so
  it copy-pastes cleanly into Instagram/LinkedIn. Hashtags go at the end of the file.
- Colocate it in the post's folder and name it to match:
  - Single-platform posts: `<slug>.caption.txt`
  - Carousels / multi-platform: `caption.<platform>.txt` (e.g. `caption.instagram.txt`)
- The `.md` draft/brief stays the planning doc; the `.txt` is the source of truth for
  what actually gets posted.
