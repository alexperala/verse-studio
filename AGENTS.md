# Agent Instructions

## Required Orientation

For any nontrivial task, read the root `README.md` and `PROJECT_STATUS.md` before acting. They define the stable studio model and the current operational state. Then read the relevant work area's `README.md` and `AGENTS.md`, plus the active campaign's `handoff.md` when one exists.

Do not infer that a campaign, automation, account session, deployment, or approval remains active from an old execution log. Verify current state.

This repo has three main work areas:

- `website/`: the Astro site for Verse Studio.
- `social-media-promotion/`: short-form social publishing workflow.
- `distribution-and-growth/`: release campaigns, channel strategy, analytics, growth experiments, partnerships, and paid-discovery planning.

When working on the website, keep changes inside `website/` unless a root-level config or README update is genuinely required.

When working on social posting, follow `social-media-promotion/AGENTS.md`. Use browser or computer-control tools for platform posting when available. Never ask the user to paste passwords or account recovery secrets into chat, and never commit credentials.

Use the repo-owned `$verse-social-publisher` skill in `.agents/skills/verse-social-publisher/` for daily clip review, minor platform prep, publishing, posting logs, clip-level social decisions, and audience engagement.

Use the repo-owned `$verse-growth-operator` skill in `.agents/skills/verse-growth-operator/` for long-form or flagship launches, cross-platform campaign planning, audience development, channel architecture, performance analysis, outreach, and paid-promotion experiments. Let it coordinate `$verse-social-publisher` when a campaign reaches clip-level preparation or posting.

## Decision Rights

Treat Alex as creative director and final authority on positioning, channel identity, and expressive public language. Keep strategy approval, exact-copy approval, publication authority, account or profile changes, external outreach, and paid spend as separate gates.

Agents may inspect, analyze, organize, prepare technical derivatives, fix in-scope implementation issues, and draft recommendations proactively. Do not publish, contact outsiders, make commitments, change accounts, or spend money beyond the authority granted for that exact action.

## Operational Continuity

- Preserve original masters and create derivatives as separate files.
- Append to analytics and activity logs; do not overwrite history.
- Put clip-level post results in `social-media-promotion/posting-log.md`.
- Put campaign interpretation and decisions in the relevant campaign folder.
- Update a campaign `handoff.md` after a major execution wave, material conclusion, pause, restart, or automation change.
- Update `PROJECT_STATUS.md` when the portfolio-level state, active work, major blocker, or next strategic direction changes.
- Keep confirmed facts, hypotheses, proposals, approvals, and completed actions visibly distinct.
- Never store credentials, session exports, recovery information, or private browser state in the repository.
