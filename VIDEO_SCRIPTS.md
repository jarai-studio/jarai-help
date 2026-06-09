# JARAI Help — video helper scripts & storyboards

Ready-to-record scripts for the short "video helper" blocks across the help centre.
Each page already ships a `<VideoHelper>` block with the **full written transcript**, so
the pages are complete today — recording a video is a pure enhancement.

## How to add a recording (no code review needed)

1. Record the video (screen capture; 60–150s; 1080p; brand accent `#d97757`).
2. Either:
   - **Self-host:** drop `my-clip.mp4` in `public/videos/` and set `src="/videos/my-clip.mp4"` (optionally `poster="/videos/my-clip.jpg"`), **or**
   - **Embed:** upload to YouTube/Loom/Vimeo and set `src="https://www.youtube.com/embed/XXXX"`.
3. Add the `src` attribute to the existing `<VideoHelper …>` tag on the page. Done — the placeholder disappears and the transcript stays as a fallback.

Conventions: keep each clip **under 2½ minutes**, no audio narration required (on-screen captions are fine — matches the "short helper" intent and avoids voice-over re-records when the UI changes).

---

## Planned clips (priority order)

### 1. Platform overview — `/` (home, splash)
**Title:** "JARAI Studio in 90 seconds" · **Length:** ~90s
**Storyboard:** Console dashboard → say what JARAI does (turns a brief into finished, distributed media via a 15-step AI pipeline) → cut to a finished video deliverable → cut to the Client Portal review screen → end on the help-centre home.

### 2. First production walkthrough — `/operators/first-production/`
**Title:** "Create your first production" · **Length:** ~2 min
**Storyboard:** Productions → New Production → pick project type + theme → pick avatar(s) → (optional) subject override → Start → watch the pipeline step badges advance → Story tab preview → Approve to publish. Mirror the 8 written steps exactly.

### 3. Managing avatars — `/operators/avatars/`
**Title:** "Set up an avatar and its voice" · **Length:** ~2 min
**Storyboard:** Avatars → New Avatar → name + likeness image → pick a voice variant (trait chip filter) → test-voice preview → save → show it selectable on New Production.

### 4. Distribution & publishing — `/operators/distribution/`
**Title:** "Publish to your channels" · **Length:** ~2 min
**Storyboard:** Connected Platforms (OAuth connect) → Approve-to-publish on a finished brief → Loop 2 distribution status → where to see published URLs + revenue events.

### 5. Reviewing & approving productions (customer) — `/customers/reviewing-productions/`
**Title:** "Review and approve your content" · **Length:** ~90s
**Storyboard:** Client Portal login → production list → open a production → preview assets → per-platform rights review → Approve / Reject → what happens next.

### 6. Billing & usage — `/operators/billing/` and `/customers/billing/`
**Title:** "Understand tokens, allowance & top-ups" · **Length:** ~90s
**Storyboard:** billing banner → allowance breakdown → tier (Creator/Pro/Atelier) → buy extra capacity → invoices.

### 7. Submitting a takedown — `/general/takedown-notice/`
**Title:** "How to submit a takedown" · **Length:** ~60s
**Storyboard:** the takedown form → required fields → what to expect (acknowledgement + SLA).

### 8. Administrator console tour — `/administrators/` (new section)
**Title:** "Platform admin console tour" · **Length:** ~2 min
**Storyboard:** AI Providers/Models → Languages & voice variants → Alerts & operations dashboards → Finance/P&L → DSAR/DLQ/takedowns. (Admin-only.)

### 9. Developer quickstart — `/developers/` (new section)
**Title:** "Call the Partner API in 5 minutes" · **Length:** ~2 min
**Storyboard:** Developer Portal → create API key → first authenticated request → poll production status → webhook. (Links to developer.jarai.studio.)
