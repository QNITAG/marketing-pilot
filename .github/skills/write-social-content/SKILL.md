---
name: write-social-content
description: "Draft Qnit Instagram and LinkedIn content from an approved research brief. Use when writing or adapting a feed post, Story, Reel script, LinkedIn post, or LinkedIn article, so each deliverable starts from the correct platform template and follows Qnit conventions."
---

# Write Social Content

## When to use

- Creating a new Instagram or LinkedIn draft from a `research-brief.md`.
- Adapting an approved message across platforms and formats.

## Templates

Start every draft by copying the matching template from this skill's assets:

| Platform | Format | Template |
| --- | --- | --- |
| Instagram | Feed post | [assets/instagram-post-template.md](./assets/instagram-post-template.md) |
| Instagram | Reel | [assets/instagram-reel-template.md](./assets/instagram-reel-template.md) |
| Instagram | Story | [assets/instagram-story-template.md](./assets/instagram-story-template.md) |
| LinkedIn | Post | [assets/linkedin-post-template.md](./assets/linkedin-post-template.md) |
| LinkedIn | Article | [assets/linkedin-article-template.md](./assets/linkedin-article-template.md) |

## Procedure

1. Create a per-post folder `<platform>/<format>/YYYY-MM-DD-short-slug/` and copy the matching template into it as `YYYY-MM-DD-short-slug.md`, keeping the frontmatter and section headings.
2. Fill each section from the research brief; do not invent facts, quotes, names, or outcomes.
3. Where the repository convention requires a caption, write the final plain-text caption to `YYYY-MM-DD-short-slug.caption.txt` (no Markdown) in the same post folder, hashtags at the end.
4. Keep any post-specific assets in the same post folder; reference the originating `source-material/` folder in frontmatter `source:` or the Notes section.

## Rules

- Adapt the message per platform — never post the same caption with only the hashtags swapped.
- New drafts start at `status: Draft`; do not advance to `Approved`, `Scheduled`, or `Published`.
- Keep any existing user-authored content in a draft intact.
