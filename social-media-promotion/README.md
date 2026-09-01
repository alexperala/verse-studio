# Social Media Promotion

This area is for daily Verse Studio short-form promotion.

Put short clips in:

```text
daily-social-clips/
```

Use `AGENTS.md` as the posting workflow for agents. The intended workflow is simple: add clips, tell the agent which platforms to post to, let the agent use browser/computer control to publish through the existing social accounts, then record results in `posting-log.md`.

Inbound comments and replies can be handled through a recurring engagement scan defined from the repo-owned social-publisher skill. Append scan results, published replies, queued drafts, ignored spam, and escalations to `inbound-engagement-log.md`; never overwrite earlier observations.

No recurring engagement scan is currently active. The prior task ran three times daily and was deleted on 2026-07-29 at Alex's request. Check the root [`PROJECT_STATUS.md`](../PROJECT_STATUS.md) and the relevant campaign handoff before recreating monitoring.

For a complete release campaign or growth review, start in `../distribution-and-growth/`. The growth operator can route individual excerpts back through this publishing workflow.
