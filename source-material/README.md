# Source Material

Raw inputs that posts are **derived from** — briefs, notes, transcripts, research,
reference docs, screenshots, product/service info, quotes, and links.

This is the *source*; the polished output lives in [../instagram/](../instagram/) and
[../linkedin/](../linkedin/). Keeping sources in
the repo makes every post traceable back to where its facts and messaging came from —
and gives Copilot the raw context it needs to draft on-topic.

## Structure

Organize by **theme and purpose** — one subfolder per campaign, initiative, or idea:

```
source-material/
├── campaigns/            # time-bound, goal-driven pushes
│   ├── ai-copilot-inm-testing-promo/
│   └── sap-promo/
└── ideas/               # evergreen themes / backlog (create as needed)
```

Add other top-level buckets (e.g. `events/`, `research/`, `personas/`) when a new
theme justifies it. Nest further where useful (e.g. `campaigns/<name>/assets/`,
`campaigns/<name>/notes/`).

## What goes in a theme folder

- A short `README.md` describing the purpose, audience, and key message.
- Raw material: briefs, notes, transcripts, research, links, reference images.
- Anything a draft — or Copilot — should read before writing posts on this theme.

## Naming

- Folder names: `lowercase-kebab-case`, descriptive of the theme/purpose.
- Date raw files as `YYYY-MM-DD-slug.ext` where a date is meaningful.

## Linking posts back to their source

When a post is derived from source material, reference it so the trail is clear —
add a `source:` line in the draft's front matter (or Notes) pointing to the relevant
`source-material/…` folder.
