# Social Media Promotion Agent Workflow

Use this folder for daily short-form promotion of Verse Studio clips.

For posting, platform prep, engagement, or social-growth work, use the repo-owned `$verse-social-publisher` skill in `../.agents/skills/verse-social-publisher/`.

Every expressive public social line must pass the skill's mandatory Verse voice gate, including replies, comments, bios, pinned comments, quote-post text, and outreach. Routine engagement is not exempt. Treat follows, likes, and reposts as public curation and apply the engagement check before acting.

When a request concerns a complete release campaign, long-form launch, channel strategy, partnerships, paid promotion, or cross-platform performance analysis, use `$verse-growth-operator` from `../.agents/skills/verse-growth-operator/`. This folder remains the clip-level execution and posting record.

## Main Folder

Work from:

```text
social-media-promotion/daily-social-clips/
```

This folder is for short clips intended for YouTube Shorts, TikTok, and X/Twitter. The website remains the home for flagship videos and longer public-facing content.

## Clip Format

Preferred simple format:

```text
daily-social-clips/
  clip-name.mp4
  clip-name.md
```

The sidecar `.md` file is optional but helpful. Use it for captions, platform notes, hashtags, and status.

Suggested sidecar format:

```md
# Clip Name

Status: ready
Platforms: youtube-shorts, tiktok, x

Caption:
Short caption here.

Hashtags:
#VerseStudio #AIvideo

Notes:
Anything the agent should know before posting.
```

If there is no sidecar file, inspect the clip and infer only operational metadata. Ask Alex before adding any public-facing text.

## Posting Workflow

When the user asks to post clips:

1. List unposted media in `daily-social-clips/`.
2. Check `posting-log.md` so the same clip is not reposted unless the user explicitly asks.
3. Pair each media file with its sidecar notes if present.
4. Ask Alex before publishing captions, titles, hashtags, or other post text unless he already approved the exact text or explicitly requested no text.
5. Use browser or computer-control tools to post through the logged-in platform accounts when those tools are available.
6. For YouTube, publish as a Short, not as a normal long-form website/flagship upload.
7. After posting, append the result to `posting-log.md` with date, filename, platform, caption used, and public URL when available.

Direct user instructions such as "post today's clips" or "post this to TikTok and X" count as approval to publish the named or implied clips. If there is a material ambiguity about which clip, which account, or what caption to use, ask before posting.

## Account Access

Do not request passwords, recovery codes, API keys, session cookies, or backup codes in chat. If login is required, ask the user to complete the login in the browser or desktop session.

Browser posting is acceptable for TikTok and X/Twitter. API-based posting is not required for this workflow.

## Content Rules

- Prefer vertical short-form clips when posting to Shorts and TikTok; make minor platform-prep edits when needed while preserving the full clip.
- Keep captions concise and specific to the clip, but ask Alex before adding captions, titles, hashtags, or post text.
- Do not claim something was made without AI if it was AI-generated or AI-assisted.
- Do not repost an item already listed in `posting-log.md` unless instructed.
- If a clip appears unfinished, corrupted, or missing context, stop and ask for direction.
