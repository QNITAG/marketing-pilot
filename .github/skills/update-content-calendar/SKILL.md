---
name: update-content-calendar
description: "Keep the Qnit content calendar synchronized with planned, rescheduled, status-changed, and published Instagram or LinkedIn content. Use whenever a post is added, its date, owner, platform, format, title, or status changes, or a published URL is recorded."
---

# Update Content Calendar

Keep `content-calendar/2026-content-calendar.md` aligned with content planning and the current state of every Instagram and LinkedIn deliverable.

## When to use

Run this workflow whenever:

- A content idea or draft is created.
- A draft's `target_date`, `owner`, `platform`, `format`, title, or `status` changes.
- Content is scheduled, published, postponed, cancelled, or removed from the plan.
- A `published_url` is added or corrected.
- The user asks to reconcile, audit, or update the content calendar.

When changing a draft's status or publication details, update the calendar in the same task. Do not leave calendar synchronization as a later follow-up.

## Sources of truth

- Use the draft frontmatter for `target_date`, `owner`, `platform`, `format`, and `status`. Use `published_url` when it has been maintained, but treat it as optional metadata.
- Use the draft's first level-one heading for the working title unless the user specifies a different calendar title.
- Use the calendar for idea-only entries that do not yet have a draft.
- Treat the colocated `.caption.txt` as the source of truth for posted copy, but do not derive calendar status from its existence.
- Never infer `Scheduled` or `Published` from the target date, generated exports, or caption files. Require an explicit status update.

Allowed statuses are `Idea`, `Draft`, `Review`, `Approved`, `Scheduled`, and `Published`.

## Procedure

1. Open `content-calendar/2026-content-calendar.md` and the affected draft.
2. Identify the calendar row by its draft link. If no link exists, match on the dated slug or the unique combination of date, platform, format, and title.
3. If multiple rows could match, stop and ask which row is authoritative. Do not merge or delete ambiguous entries.
4. Add or update exactly one schedule row with these mappings:

| Calendar column | Value |
| --- | --- |
| Date | Draft `target_date` in `YYYY-MM-DD` format |
| Platform | `IG` for Instagram, `LI` for LinkedIn, or `IG + LI` for a shared deliverable |
| Format | Draft `format`, using the calendar's title casing |
| Working title | Draft's first `#` heading or user-provided title |
| Owner | Draft `owner`; leave empty when unset |
| Status | Draft `status` exactly |
| Draft | Relative link from the calendar to the actual draft `.md` file |

5. For an idea without a draft, add the available planning details, set `Status` to `Idea`, and leave `Draft` empty.
6. For `Published` content, keep the `Draft` column linked to the repository file. Record the live URL in `published_url` when it is available, but do not block or question `Published` status when the field is empty.
7. If content is explicitly cancelled or removed from the plan, remove its calendar row only when the user requests removal. There is no `Cancelled` status in the workflow.
8. Sort all schedule rows by date ascending. Preserve unrelated rows, headings, legend text, and campaign themes.

## Link format

Drafts live in per-post folders. Link to the file itself, not just a similarly named path beside the folder.

```markdown
[linkedin/posts/2026-07-16-example/2026-07-16-example.md](../linkedin/posts/2026-07-16-example/2026-07-16-example.md)
```

## Validation

After editing, verify all of the following:

- The affected draft and calendar row have the same date, platform, format, owner, and status.
- An empty `published_url` does not prevent a row from being `Published`.
- Every non-empty Draft link resolves to an existing Markdown file.
- Each draft appears at most once in the schedule.
- Schedule rows remain sorted by date.
- The table still has seven columns in every row.

Report any inconsistency you cannot resolve from repository evidence. Do not invent missing owners, dates, publication URLs, or statuses.
