---
name: write-research-brief
description: "Create a Qnit research brief from the standard template. Use when writing or scaffolding a research-brief.md for Instagram or LinkedIn source material, so facts, quotes, sources, and content angles land in a consistent, traceable structure."
---

# Write Research Brief

## When to use

- Creating or updating a `research-brief.md` for a Qnit content topic or campaign.
- Structuring gathered facts, quotes, and sources before the Social Content Editor drafts posts.

## Procedure

1. Resolve the target before gathering evidence or editing:
	- **Named campaign:** when the user identifies a campaign or campaign path, use `source-material/campaigns/<campaign-slug>/research-brief.md` only if the requested subject and objective belong to the same research unit. Keep one source tree for that identified campaign.
	- **Explicit continuation:** update an existing brief only when the user identifies its path; explicitly asks to continue or update a named existing brief, campaign, or topic; or directly refers to the brief already established in the same conversation. A subject name alone does not identify an existing brief.
	- **New standalone request:** in every other case, create `source-material/research/YYYY-MM-DD-<topic-slug>/research-brief.md` using the request date. Do not search for a similar brief to reuse.
2. Before updating an existing brief, compare its title, objective, and campaign or topic with the request. If they do not describe the same research unit, stop and resolve a new target instead.
3. If a new standalone target already exists for that date and slug but continuation is not explicit, ask whether to update it or create a separate request. Do not overwrite it or invent a suffix by inference.
4. Create or update the resolved `research-brief.md` using the structure below. A change of subject, objective, or campaign starts a new research request, even in the same chat.
5. Fill every section with sourced material, keeping verified facts separate from ideas, quotes, and unknowns.
6. Set frontmatter `status` to `Ready for drafting` only when the research is complete; otherwise use `Draft` or `Needs input` and list the gaps under `Handoff status`.

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
- Never update a brief merely because it is nearby, recent, topically similar, or the only brief found.
- The rule against a second campaign source tree applies only after the request has been identified as belonging to that campaign.
