# Source Material

This folder is a living repository of the raw material that informs marketing content: 
research, briefs, notes, transcripts, reference documents, links, and other factual context. 
It is the source behind the finished content in [../instagram/](../instagram/) and [../linkedin/](../linkedin/).

## Structure

Material is grouped by purpose and research request:

```
source-material/
├── campaigns/       # source material for a particular campaign
│   └── <campaign-slug>/
│       ├── research-brief.md
│       └── <source-material>
└── research/        # standalone research requests not tied to a campaign
        └── YYYY-MM-DD-<topic-slug>/
                ├── research-brief.md
                └── <source-material>

```

The exact folders and files vary with the work. The important distinction is that
this directory holds source context, while platform directories hold drafted and
ready-to-publish content.

## Research request identity

- Treat each new standalone research request as a separate unit, even when a recent
    or topically similar brief already exists. Create it under
    `research/YYYY-MM-DD-<topic-slug>/` using the request date.
- Update an existing brief only when the user identifies its path, explicitly asks to
    continue or update a named existing brief, campaign, or topic, or directly refers to
    the brief already established in the same conversation. A subject name alone does
    not identify an existing brief.
- A change of subject, objective, or campaign starts a new research request. Proximity,
    recency, topical similarity, or being the only brief found does not establish identity.
- If the dated standalone folder already exists and continuation is not explicit, ask
    whether to update that brief or create a separate request before editing anything.
- Campaign research stays in its identified `campaigns/<campaign-slug>/` source tree.
    This does not permit unrelated standalone research to be added to an existing campaign.

Existing standalone folders do not need to be renamed; the dated convention applies to
new research requests.
