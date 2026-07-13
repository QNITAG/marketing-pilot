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

The idea: everything a campaign needs lives in version control as readable,
reviewable files. Planning and drafts use Markdown; final ready-to-post captions
use plain text so they can be copied directly into a platform.

- **Content is text, in Git.** Articles, reel scripts, briefs, research, and brand
  guidelines are Markdown files. Final captions are colocated `.caption.txt` files.
  Every change is diff-able and has history.
- **Single source of truth.** Brand voice, palette, typography, and hashtags live in
  [brand/](brand/) so every draft — human- or Copilot-authored — stays on-brand.
- **Copilot supports the pipeline.** The repository's agents and skills research
  source material, draft platform-specific content, design post visuals, and keep
  the calendar synchronized. The brand files and research briefs are the context
  and guardrails.
- **Review like a pull request.** Drafts move through a status workflow (below) and
  can be reviewed, commented on, and approved before anything is published.
- **Reusable by design.** Platform templates, the content brief, and visual templates
  make new content a copy-edit-review loop rather than a blank page.

Think of it as a content pipeline: **idea → Copilot draft → human review → publish**,
with the brand as code keeping quality and consistency high.

### How Copilot uses this repo

- Reads [brand/brand-voice.md](brand/brand-voice.md) and
  [brand/hashtag-bank.md](brand/hashtag-bank.md) as the voice and tagging rules.
- Uses the [Content Researcher](.github/agents/content-researcher.agent.md) to gather
  traceable source material and research briefs.
- Uses the [Social Content Editor](.github/agents/social-content-editor.agent.md) and
  [write-social-content skill](.github/skills/write-social-content/) to create
  platform-specific drafts from a ready research brief.
- Uses the [update-content-calendar skill](.github/skills/update-content-calendar/)
  whenever content is added, rescheduled, status-changed, published, or removed.
- Designs **post imagery as SVG** with the
  [design-linkedin-post-visuals skill](.github/skills/design-linkedin-post-visuals/),
  then uses [export-tooling](export-tooling/) to render reproducible PNG and PDF files.
- References brand assets (logo, colors, and fonts) from [brand/assets/](brand/assets/)
  and keeps post-specific assets with the relevant draft.

## Structure

```
marketing-pilot/
├── .github/                # Copilot agents, skills, and scoped instructions
│   ├── agents/             # content-researcher, social-content-editor
│   ├── instructions/       # caption-file conventions
│   └── skills/             # research, drafting, visual design, calendar sync
├── brand/                  # Brand voice, visual guidelines, hashtag bank
├── content-calendar/       # Editorial calendar and posting schedule
├── marketing-pilot-concepts/ # Ideas for content and Copilot tooling
├── templates/              # Reusable content briefs and checklists
├── source-material/         # Research and factual source context
│   ├── campaigns/           # Campaign-specific material and briefs
│   └── research/            # Ongoing research and reference material
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

See the [source-material README](source-material/README.md) for source organization
and the [export-tooling README](export-tooling/README.md) for visual export details.

## Workflow

1. **Plan** — add the idea to [content-calendar/2026-content-calendar.md](content-calendar/2026-content-calendar.md).
2. **Research** — for non-trivial content, gather source material and create a
   traceable brief with [write-research-brief](.github/skills/write-research-brief/).
   A brief must be `Ready for drafting` before it becomes the basis for a draft.
3. **Draft** — use the matching [write-social-content](.github/skills/write-social-content/)
   template. New content starts at `Draft`, with a source path in its front matter
   or Notes section.
4. **Design and export** — when visuals are needed, create numbered SVGs in the
   post's `visuals/` folder and run the export engine from [export-tooling/](export-tooling/).
5. **Review** — set the draft status to `Review` only after the editorial check and
   request approval. Keep the ready-to-post caption in the colocated plain-text file.
6. **Schedule/Publish** — move through `Scheduled` and `Published` explicitly. Record
   `published_url` when available and synchronize the calendar in the same task.

Whenever a draft's date, owner, platform, format, title, status, or publication URL
changes, update the calendar at the same time. Do not infer `Scheduled` or `Published`
from a date, caption file, or generated export.

## Status values

Content status: `Idea` → `Draft` → `Review` → `Approved` → `Scheduled` → `Published`.

Research-brief status is separate: `Draft`, `Ready for drafting`, or `Needs input`.

## Conventions

- Give each post its own folder: `<platform>/<type>/YYYY-MM-DD-short-slug/` (publish/target date first) for easy sorting.
- Keep everything for one post in that folder — the draft `.md`, the `.caption.txt`,
  any `visuals/` SVG sources, and post-specific assets.
- Name the draft and caption after the folder slug (`YYYY-MM-DD-short-slug.md`, `YYYY-MM-DD-short-slug.caption.txt`).
- Shared, reusable assets can still live in the platform `assets/` folder; post-specific assets live in the post folder.
- Keep the raw inputs a post is derived from in [source-material/](source-material/),
  organized by theme/purpose (campaign or idea); reference them from the draft.
- Treat SVGs as the source for generated exports. Do not hand-edit files under a
  post's `export/` folder; regenerate them after changing the SVG.

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

Caption files are governed by the [caption instructions](.github/instructions/captions.instructions.md)
and contain only ready-to-post text, with hashtags at the end.

## Exporting visuals

Install the export tooling once, then run it from `export-tooling/` with the project
folder as the argument:

```bash
cd export-tooling
npm install
npm run export -- ../linkedin/posts/YYYY-MM-DD-short-slug
npm run export -- ../linkedin/posts/YYYY-MM-DD-short-slug --pdf
```

The command writes PNGs to `export/instagram/` and `export/linkedin/`. The optional
`--pdf` flag also writes `export/linkedin/document.pdf` for a LinkedIn document post.
