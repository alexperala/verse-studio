# Verse Studio

Verse Studio is an artist-led creative studio using generative tools to make filmic, experimental media. The point of the work is the creative vision and the finished experience—not the mere use of AI.

Alex is the creative director and artist. Agents support production infrastructure, publishing, distribution, audience development, measurement, documentation, and operational follow-through.

## What This Repository Contains

Verse Studio is both a public creative portfolio and an operating workspace. The current portfolio includes:

- short narrative and experimental films;
- original ambient cinema under **Verse Ambient — A Verse Studio project**;
- the **Morning News Update** podcast and its automated editorial and speech-production concept;
- the public [Verse Studio website](https://verse-studio.com);
- a developing system for release campaigns, social distribution, analytics, and audience learning.

The current cross-project state is maintained in [`PROJECT_STATUS.md`](PROJECT_STATUS.md). Read it before assuming that a campaign, automation, account session, or publishing workflow is active.

## Operating Model

The studio works as one connected loop:

```text
creative direction → finished master → release campaign → public destination
                                      ↘ social discovery → measurement → next decision
```

Alex concentrates on making and directing the work. The repository preserves the surrounding operational memory so another agent can resume without reconstructing decisions from chat history.

### Work areas

| Area | Job | Primary records |
| --- | --- | --- |
| [`website/`](website/) | Public studio identity, flagship work, recent catalogue, blog, and contact surface | Astro source and [`website/README.md`](website/README.md) |
| [`distribution-and-growth/`](distribution-and-growth/) | Release intake, positioning, campaign design, channel architecture, analytics, experiments, partnerships, and paid-discovery planning | Campaign folders, append-only analytics, brand guidance, and campaign handoffs |
| [`social-media-promotion/`](social-media-promotion/) | Clip preparation, platform-native publishing, posting verification, and community engagement | Daily clip assets, [`posting-log.md`](social-media-promotion/posting-log.md), and [`inbound-engagement-log.md`](social-media-promotion/inbound-engagement-log.md) |
| [`.agents/skills/`](.agents/skills/) | Repeatable agent procedures specific to Verse Studio | `$verse-growth-operator` and `$verse-social-publisher` |

## Public Brand and Channel Architecture

- **Verse Studio** is the parent creative identity.
- **Verse Ambient** is a focused Verse Studio project for original ambient cinema: imagined worlds, slow-moving visual art, and quiet experimental music.
- The website is the portfolio and owned public home.
- YouTube is the canonical destination for long-form ambient releases.
- Instagram, TikTok, X, and YouTube Shorts are discovery surfaces, used selectively rather than automatically.
- The public voice is a studio asset and applies across posts, replies, comments, bios, outreach, and engagement choices.

Current public surfaces:

- Website: <https://verse-studio.com>
- Verse Ambient: <https://www.youtube.com/@verseambient>
- X: <https://x.com/verse_vids>
- Instagram: <https://www.instagram.com/verse.videos/>
- TikTok: <https://www.tiktok.com/@verse_vids>
- Morning News Update: <https://morning-news-update.podbean.com/>

## How to Enter the Project

For any nontrivial task:

1. Read this file for the stable project model.
2. Read [`PROJECT_STATUS.md`](PROJECT_STATUS.md) for the current portfolio, active work, blockers, and next decisions.
3. Read [`AGENTS.md`](AGENTS.md) for routing, authority, and documentation rules.
4. Enter the relevant work area and read its `README.md` and `AGENTS.md` when present.
5. For an existing release, read its campaign `handoff.md` before the detailed logs.
6. Verify live account, deployment, or platform state before acting; repository records explain prior state but do not guarantee current authentication or UI behavior.

For the current ambient release, start with [`distribution-and-growth/campaigns/ambient-seasons-001/handoff.md`](distribution-and-growth/campaigns/ambient-seasons-001/handoff.md).

## Authority and Approval

Alex is the final authority on creative direction, positioning, channel identity, and public-facing language. Keep these approvals distinct:

- approval of a strategy;
- approval of exact public copy and metadata;
- approval to publish or change visibility;
- approval to create or modify accounts and profiles;
- approval for external outreach or commitments;
- approval for paid spend, targeting, creative, and launch.

An approval in one category does not imply the others. Agents may proactively inspect, organize, analyze, prepare technical derivatives, draft options, and recommend next actions within the relevant skills.

Never store passwords, cookies, recovery codes, API keys, browser-session data, or other credentials in this repository. If authentication is needed, ask Alex to complete it directly in the appropriate browser or app.

## Records and Continuity

- Treat original masters as read-only source media.
- Give each major release a campaign folder under [`distribution-and-growth/campaigns/`](distribution-and-growth/campaigns/).
- Append analytics observations; do not rewrite history.
- Keep clip-level publication records in the social posting log rather than duplicating them in campaign analysis.
- Separate confirmed facts, hypotheses, proposals, approvals, and completed actions.
- Update `PROJECT_STATUS.md` after a material portfolio change.
- Update a campaign `handoff.md` after a major execution wave, strategic decision, pause, or restart.
- Record automation creation, alteration, pausing, or deletion in the relevant handoff and status file.

## Website Development

The Astro site is isolated under `website/`. Common commands from the repository root:

```sh
npm run install:website
npm run dev
npm run build
npm run preview
```

These commands delegate to the project in `website/`. Keep website changes inside that folder unless root documentation or configuration genuinely needs to change.
