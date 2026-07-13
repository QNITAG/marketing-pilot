# Agent Guidelines

This is a marketing-as-code workspace for Qnit AG. Use [README.md](README.md) for the repository workflow, structure, naming, content statuses, and caption conventions; link to existing guidance instead of duplicating it.

## Route the Work

- For source gathering, fact-checking, or a new `research-brief.md`, use the [Content Researcher](.github/agents/content-researcher.agent.md) and the [write-research-brief skill](.github/skills/write-research-brief/SKILL.md).
- For posts, captions, Stories, Reels, or articles, use the [Social Content Editor](.github/agents/social-content-editor.agent.md) and the [write-social-content skill](.github/skills/write-social-content/SKILL.md).
- Research and drafting are separate stages. Draft from a brief with `status: Ready for drafting`, unless the user explicitly approves an in-progress brief.

## Content Guardrails

- Read [brand/brand-voice.md](brand/brand-voice.md) and [brand/hashtag-bank.md](brand/hashtag-bank.md) before drafting social content.
- Ground factual claims, quotes, names, metrics, dates, outcomes, and permissions in the relevant `source-material/` folder or research brief. Never invent missing details.
- Preserve traceability by referencing the originating `source-material/` folder in draft frontmatter `source:` or in Notes.
- Adapt copy genuinely for each platform; do not reuse one caption with only the hashtags changed.
- Do not approve, schedule, or publish content. New content starts at `Draft`; agents may move it to `Review` only after the editorial check passes and the user requests review readiness.
- Keep content statuses (`Idea` through `Published`) distinct from research-brief statuses (`Draft`, `Ready for drafting`, `Needs input`).

## Files and Validation

- Name platform drafts `YYYY-MM-DD-short-slug.md`. Keep planning in Markdown and the final ready-to-post caption in the colocated plain-text caption file; that `.txt` file is the posting source of truth.
- Follow [source-material/README.md](source-material/README.md) for source organization and traceability, and the platform guidance in [instagram/README.md](instagram/README.md) or [linkedin/README.md](linkedin/README.md).
- For LinkedIn post imagery (single-image, multi-image, document/PDF), use the [design-linkedin-post-visuals skill](.github/skills/design-linkedin-post-visuals/SKILL.md): author visuals as SVG, then render them with the [export-tooling](export-tooling/README.md) engine — `npm run export -- <project-path>` (run `npm install` in `export-tooling/` first when dependencies are absent).
- Do not edit generated exports by hand. Regenerate them from the SVG sources and commit the resulting PNG/PDF files when output changes.