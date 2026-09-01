# Campaigns

Each major Verse Studio release gets one campaign folder. The folder should allow a new agent to understand the release, its approvals, its execution history, its evidence, and its next decision without relying on chat history.

## Naming

Use a short stable campaign ID:

```text
descriptive-release-name-001/
```

Use the same ID in `analytics/content-performance.csv`, `analytics/channel-snapshots.csv`, and `analytics/experiments.csv`.

## Campaign Contract

A mature campaign folder should contain:

| File | Purpose |
| --- | --- |
| `campaign-brief.md` | Confirmed creative facts, goals, audience hypotheses, destination, assets, constraints, and approval register |
| `release-package.md` | Public title, description, thumbnail, credits, disclosures, channel copy, and packaging state |
| `launch-plan.md` | Dated distribution sequence, channel jobs, approval gates, and execution notes |
| `metrics-and-experiments.md` | Qualitative checkpoints, diagnoses, hypotheses, decisions, and proposed or completed experiments |
| `handoff.md` | Current read-first synthesis: what happened, what worked, what failed, blockers, decisions, automation state, and restart path |

Add campaign-specific watchlists or research files only when they serve an active decision. Do not duplicate clip publication rows from `social-media-promotion/posting-log.md` or raw observations from `analytics/`.

## Lifecycle

Use explicit status language:

- `planning` — positioning and assets are being prepared;
- `approved for execution` — required public actions and copy have the relevant approval;
- `published; measurement active` — the release is live and scheduled observations remain;
- `published; active promotion paused` — public work remains live, but no campaign execution or monitoring is currently running;
- `closed` — the final review is complete and no further campaign action is planned.

Status never expands authority. Record exact approvals separately.

## Handoff Rule

Create or update `handoff.md` after:

- a launch or major publishing wave;
- a material performance conclusion;
- a decision to pause, resume, repackage, begin outreach, or run paid discovery;
- a recurring automation change;
- an account or tooling blocker that affects execution.

The handoff should summarize; the logs should prove. Preserve uncertainty and distinguish current readings from older trustworthy baselines.

## New Release Intake

1. Keep the source master unchanged in `../master-video-drop/`.
2. Create a campaign ID and folder.
3. Record creative facts and unknowns before designing tactics.
4. Decide the destination and smallest useful channel mix.
5. Separate strategy, public-copy approval, publication authority, outreach authority, and spend authority.
6. Route clip-level preparation and publishing through `$verse-social-publisher`.
7. Capture append-only measurements and finish each active phase with an updated handoff.
