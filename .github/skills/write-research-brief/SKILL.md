---
name: write-research-brief
description: "Create a Qnit research brief from the standard template. Use when writing or scaffolding a research-brief.md for Instagram or LinkedIn source material, so facts, quotes, sources, and content angles land in a consistent, traceable structure."
---

# Write Research Brief

## When to use

- Creating or updating a `research-brief.md` for a Qnit content topic or campaign.
- Structuring gathered facts, quotes, and sources before the Social Content Editor drafts posts.

## Procedure

1. Create `source-material/<category>/<topic-slug>/research-brief.md` using the structure below. For an existing campaign folder, write it there — never start a second source tree.
2. Fill every section with sourced material, keeping verified facts separate from ideas, quotes, and unknowns.
3. Set frontmatter `status` to `Ready for drafting` only when the research is complete; otherwise use `Draft` or `Needs input` and list the gaps under `Handoff status`.

## Brief structure

```markdown
---
title:
status: Draft                 # Draft | Ready for drafting | Needs input
objective:
audience:
content_pillar:               # Expertise & insight | Events & industry | People of Qnit | Hiring
platforms:                    # Instagram | LinkedIn | both
formats:                      # Post | Story | Reel | Article | Carousel
requested_by:
research_date:
---

# Research brief

## Executive summary

## Communication objective

## Audience insight

## Verified key messages

| Claim or message | Evidence | Source | Confidence |
| --- | --- | --- | --- |

## Quotable material

| Exact quote | Speaker | Source | Consent/approval status |
| --- | --- | --- | --- |

## Source inventory

| Source | Type | Relevance | Accessed |
| --- | --- | --- | --- |

## Content opportunities

| Platform | Format | Angle | Why it fits | Required assets |
| --- | --- | --- | --- | --- |

## Recommended narrative

## Required tags, links, and attribution

## Unknowns and risks

## Do not claim

## Handoff status
```

## Section guide

| Section | Purpose |
| --- | --- |
| Verified key messages | Sourced, publishable claims — each with evidence, source, and confidence. |
| Quotable material | Exact quotes only, with speaker, source, and consent status. |
| Source inventory | Every source consulted, so any claim is traceable. |
| Content opportunities | Platform- and format-specific angles for Instagram and LinkedIn. |
| Unknowns and risks | Gaps, open questions, and anything needing verification. |
| Do not claim | Statements that are unsupported and must not appear in content. |

## Rules

- Every material external claim needs a recorded source; put unsupported claims under `Unknowns and risks` or `Do not claim`.
- Do not invent quotes, metrics, names, or outcomes to fill a section — leave it open and flag it.
- Keep the brief the single source of truth; do not write final post copy here.
