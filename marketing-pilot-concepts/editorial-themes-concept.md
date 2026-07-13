# Editorial themes concept

**Decision date:** 2026-07-13  
**Status:** Concept - theme specifications pending  
**Scope:** Extensible editorial themes for Qnit Instagram and LinkedIn content

## Objective

Qnit's recurring editorial series need more than a content pillar. In addition to
the strategic pillars already defined in the brand guidance, Qnit plans to use
recurring themes such as:

- **Facts Friday**
- **People of Qnit** / team spirit
- **Solutions**
- **Technical**

Each theme can have its own target group, content length, writing style, hashtag
set, visual treatment, and required on-image elements. For example, a Facts Friday
visual must include `#FactsFriday` in the lower-right corner. A quote visual must
show the source's name when the theme or post requires attribution.

The extensible model is to make themes a first-class editorial layer rather than
hard-coding theme rules into the Researcher, Editor, or visual-authoring skill.

## Keep the taxonomies separate

These fields answer different questions and should not replace one another:

| Field | Answers | Examples |
| --- | --- | --- |
| `format` | How will the post be published? | `Post`, `Article`, `single-image`, `multi-image`, `document/PDF` |
| `content_pillar` | Which strategic area does it support? | `Expertise & insight`, `People of Qnit`, `Hiring` |
| `theme` | Which repeatable editorial treatment applies? | `facts-friday`, `people-of-qnit`, `solutions`, `technical` |

This prevents a visual format from being confused with an editorial series. A
Facts Friday post could be a single-image or document/PDF post; a Technical post
could be text-only, multi-image, or document/PDF.

## Theme registry

Store reusable theme definitions under `brand/posts/themes/`, with one human-readable
Markdown profile per theme:

```text
brand/
└── posts/
  └── themes/
    ├── README.md
    ├── facts-friday.md
    ├── people-of-qnit.md
    ├── solutions.md
    └── technical.md
```

The registry README should define the profile schema, controlled values, slug rules,
and how defaults and overrides work. Individual files hold the rules for one theme.
Profiles should reference the existing brand voice, hashtag bank, and
platform-format guidance instead of copying those files in full.

### Theme profile contract

Each profile should contain frontmatter and stable sections for:

| Area | Contents |
| --- | --- |
| Identity | Stable `slug`, display name, status, owner, supported platforms |
| Editorial | Purpose, related content pillar(s), target group(s), reader need, writing style, hook pattern, recommended length or range, CTA pattern |
| Hashtags | Required theme tag(s), additional approved tags, platform-specific limits and notes |
| Visuals | Preferred post formats, backgrounds, color tokens, typography, layout notes, required on-image text, placement rules, source/attribution rules |
| Workflow | Required inputs, evidence requirements, permissions, approvals, exceptions, and override rules |
| Gaps | Explicit `Needs input` values and questions that must be answered before the profile is complete |

The profile is a reusable ruleset, not a replacement for the full brand voice or the
LinkedIn format specifications.

### Initial profile state

Create the four profiles with the known information and clearly mark missing values
as `Needs input`. Do not infer a target group, content length, hashtag set, color
palette, or writing style from a theme name alone.

- `facts-friday.md`: capture the required lower-right `#FactsFriday` visual marker;
  confirm the remaining audience, length, hashtag, copy, and visual rules.
- `people-of-qnit.md`: connect the team-spirit series to the existing
  `#peopleofqnit`, `#teamspirit`, and consent requirements; confirm the exact
  LinkedIn-specific rules and target group.
- `solutions.md`: leave target group, length, hashtags, writing style, and visual
  tokens open until supplied by the marketing team.
- `technical.md`: leave target group, length, hashtags, writing style, and visual
  tokens open until supplied by the marketing team.

## Request interface

Users should be able to provide a theme focus naturally when requesting research or
a post:

```text
Research AI testing myths for a LinkedIn post.
Theme focus: Facts Friday.
```

or:

```text
Create a LinkedIn single-image post about our solution for test automation.
Theme: solutions.
```

The agent normalizes the supplied display name to the controlled slug, for example
`Facts Friday` becomes `facts-friday`. The natural-language request is convenient
for users; the slug is stable for frontmatter, filtering, validation, and future
automation.

If the theme is unknown or the name maps to more than one profile, the agent asks
for clarification. It must not silently create a new profile or approximate the
rules from the theme name. A request without a theme remains a valid one-off post.

## Researcher integration

The Content Researcher accepts an optional theme focus and reads the resolved
profile before researching. The theme changes how the Researcher frames the work,
but does not change its evidence boundary.

The Researcher uses the profile to:

- frame the target audience and reader need;
- identify the evidence required by the theme;
- shape platform-appropriate content angles;
- identify theme-specific asset, permission, and attribution needs;
- flag missing theme rules or unsupported assumptions.

The resulting `research-brief.md` records the normalized theme:

```yaml
content_pillar: Expertise & insight
theme: facts-friday
platforms: LinkedIn
formats: Post
```

`theme` is additional metadata. It does not replace `content_pillar`, `platforms`,
or `formats`. The brief remains a traceable research handoff and the Researcher
still does not write final post copy.

The research completion gate should include:

- the selected theme profile is resolved and named;
- the target group and content angle fit the profile, or the gap is explicit;
- required facts, quotes, sources, permissions, and visual attribution are listed;
- the brief does not imply that an incomplete theme profile is fully specified.

## Social Content Editor integration

The Social Content Editor reads the same theme profile after receiving an approved
brief or explicit permission to draft from an in-progress brief.

The Editor applies the theme's defaults for:

- target group and reader need;
- writing style, hook, and recommended content length;
- CTA pattern;
- required and additional platform hashtags;
- required source, quote, name, or attribution treatment.

The Editor continues to apply platform rules independently. A LinkedIn draft still
needs a professional, insight-driven structure and three to five focused hashtags;
an Instagram draft still needs its own warmer adaptation and appropriate hashtag
set. Theme rules refine the platform treatment; they do not erase it.

The post frontmatter records the normalized theme:

```yaml
platform: LinkedIn
format: Post
theme: facts-friday
status: Draft
```

The Editor records deliberate deviations in Notes. For example, a Facts Friday
post may use a document/PDF format instead of the profile's preferred single-image
format because the approved evidence requires a page-by-page explanation.

## Visual-authoring integration

The `design-linkedin-post-visuals` skill accepts the same `theme` value and reads the
matching profile before creating SVG assets. The theme modifies the visual
 treatment; it does not change the LinkedIn publishing-format rules.

The visual workflow should:

1. Resolve the theme slug and load its visual defaults.
2. Choose the requested LinkedIn format independently: single-image,
   multi-image, or document/PDF.
3. Apply the theme's background, color, typography, layout, and required element
   rules to the SVG source.
4. Validate required on-image text and placement, such as lower-right
   `#FactsFriday`.
5. Validate source-name or quote attribution when the profile requires it.
6. Preserve alt text and asset references in the post draft.
7. Export through `export-tooling/`; never hand-edit generated PNG or PDF files.

Most themes should be implemented through profile-level design tokens and required
elements. Add a theme-specific SVG template only when its layout is materially
different from the existing templates. This keeps the skill extensible without
creating one hard-coded conditional branch per theme.

## Defaults and explicit overrides

Theme profiles provide defaults and required checks, but they should not make every
post identical. A post may explicitly override its theme's:

- target group;
- content length;
- hashtags;
- CTA;
- preferred visual format;
- background, color, or layout;
- required visual treatment.

An override must be visible in post frontmatter or Notes and include a short reason.
The editorial review flags an undocumented deviation rather than silently applying
or ignoring it.

Example:

```yaml
theme: facts-friday
theme_overrides:
  format: document/PDF
  reason: "The approved evidence needs a five-page explanation rather than one fact card."
```

Use a structured override field when a value needs to be machine-readable. Keep
longer rationale and unresolved questions in Notes.

## Editorial review additions

Extend the integrated editorial review with a theme-compliance section:

1. **Theme resolution** - The theme slug maps to exactly one profile.
2. **Audience** - The post addresses the profile's target group or documents an override.
3. **Length and writing style** - The copy follows the profile or explains the deviation.
4. **Hashtags** - Required theme tags are present, platform limits are respected, and additional tags are approved.
5. **Visual treatment** - Background, colors, layout, and required on-image elements match the profile.
6. **Attribution** - Quote sources, names, partners, and permissions are present where required.
7. **Accessibility** - Alt text describes the actual final visual, including meaningful text when needed.
8. **Format separation** - Theme treatment has not confused a single-image, multi-image, or document/PDF post.
9. **Overrides** - Every deliberate deviation is explicit and justified.

The result contract can add:

```markdown
- Theme compliance: Pass | Issues | Not applicable
- Theme overrides: None | Documented | Missing rationale
```

An incomplete theme profile or missing required theme input should produce
`Revision required` or `Blocked`, depending on whether the missing value affects a
core claim, target group, required visual element, consent, or attribution.

## Metadata and repository changes

Add an optional controlled `theme` field to:

- `templates/content-brief.md`;
- the `write-research-brief` skill contract;
- the `write-social-content` skill contract;
- LinkedIn and Instagram post templates where the field applies.

The theme registry becomes the source of truth for theme rules. Post and research
frontmatter carry the selected slug for traceability and filtering. The conceptual
content calendar should not become a second theme registry or be changed in this
phase. When the calendar becomes operational, it can expose a generated Theme view
from post metadata.

Existing posts should only receive a `theme` value when the intended series is
confirmed. Do not infer themes from titles, hashtags, or asset names during a broad
backfill.

## Implementation phases

### Phase 1: Registry and schema

- Add `brand/posts/themes/README.md` with the profile contract, slug rules, and default/
  override semantics.
- Add `facts-friday.md`, `people-of-qnit.md`, `solutions.md`, and `technical.md`.
- Record known values and explicit `Needs input` gaps.
- Add only confirmed theme hashtags to `brand/hashtag-bank.md`; do not invent or
  silently promote unverified tags.

### Phase 2: Metadata and drafting contracts

- Add optional `theme:` to the content brief and research/drafting skill contracts.
- Document that `theme` is a controlled slug and `content_pillar` remains separate.
- Define where structured overrides live and require rationale for deviations.

### Phase 3: Agent integration

- Update the Content Researcher to accept an optional theme focus, resolve the
  profile, and use it for audience and evidence framing.
- Update the Social Content Editor to apply theme-specific copy, length, CTA,
  hashtag, attribution, and permission defaults.
- Add theme compliance to the integrated editorial review.
- Keep the existing researcher/editor responsibilities and publishing boundaries.

### Phase 4: Visual integration

- Update `design-linkedin-post-visuals` to read the theme profile and apply its
  visual tokens and required elements.
- Add a generic validation approach for required text and placement.
- Add theme-specific templates only for genuinely distinct layouts.

### Phase 5: Validation and rollout

- Run one dry-run request for each of the four themes.
- Test Facts Friday's lower-right `#FactsFriday` requirement.
- Test unknown and ambiguous theme names.
- Test a documented post-level override.
- Confirm unthemed one-off posts remain valid.
- Confirm no publishing, scheduling, or calendar side effects occur.
- Backfill existing posts only after their intended themes are confirmed.

## Verification scenarios

| Scenario | Expected result |
| --- | --- |
| Research request with `theme focus: Facts Friday` | Researcher resolves `facts-friday`, records it in the brief, applies the profile, and flags missing inputs without writing final copy. |
| LinkedIn People of Qnit draft | Editor records `theme: people-of-qnit`, applies the approved hashtag/style/permission rules, and keeps LinkedIn adaptation intact. |
| Facts Friday visual | Visual skill produces an SVG with `#FactsFriday` in the lower-right and exports it through the standard pipeline. |
| Unknown theme | Agent asks for clarification or continues explicitly as an unthemed one-off; it does not invent a profile. |
| Explicit format override | Post records the override and rationale; review reports it as documented. |
| Existing unthemed draft | Draft remains valid and is not assigned a theme by inference. |

## Scope and future extensions

Included in this concept: theme profiles, controlled metadata, researcher/editor/
visual handoffs, profile-driven defaults, explicit overrides, and compliance review.

Deferred: publishing automation, scheduling, analytics, redesign of the conceptual
calendar, automatic theme inference, and a full design-system implementation.

Future extensions could include Front Matter CMS taxonomy controls, generated theme
views in the operational calendar, reusable theme-specific SVG components, and
performance reporting by theme once reliable publication metadata exists.
