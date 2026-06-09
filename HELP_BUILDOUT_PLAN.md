# JARAI Help — build-out roadmap & progress

Tracks the autonomous help-centre build-out (2026-06-09 → ~06-11). Goal: **100% documented
for every user type**, each major page carrying a `<VideoHelper>` (transcript now, recording later).
Durable plan so the work can resume after any interruption.

## Audiences (user types)
- **Operators** — Studio Console users (AccountOperator). _Existing section; expand for full page coverage._
- **Customers** — Client Portal users (CustomerAdministrator / CustomerViewer). _Existing; expand._
- **Platform administrators** — PlatformAdministrator (provider/model/language/finance/compliance/ops). _NEW._
- **Developers** — Partner API integrators. _NEW landing + link to developer.jarai.studio._
- **Finance** — FinanceViewer (P&L dashboards). _Covered within Administrators + a finance note._

## Progress
- [x] **Batch 1** — VideoHelper component + VIDEO_SCRIPTS.md + home/first-production wiring (PR #6, merged).
- [x] **Batch 2** — Administrators section: index + ai-providers-models + finance-pl + compliance-governance + sidebar (PR #7, merged).
- [x] **Batch 3** — Administrators: operations-reliability + languages-voices (+ sidebar).
- [x] **Batch 4** — Developers section: index (quickstart) + authentication + production-lifecycle (webhooks folded in) + sidebar + dev-portal link.
- [x] **Batch 5** — Operators: dashboards, media-library, prompt-templates, connected-platforms (+ sidebar, VideoHelpers). _(settings tour can fold into a later batch)_
- [x] **Batch 6** — Customers: notifications + account-settings + team-and-seats (+ sidebar, VideoHelpers).
- [x] **Batch 7** — General: accessibility statement + data-&-security overview + release-notes index (+ sidebar). _(keyboard-shortcuts skipped — no verified shortcuts to document; won't fabricate.)_
- [ ] **Batch 8** — Cross-app Help links (needs-review PRs in studio-console / website / dev-portal) pointing to help.jarai.studio.
- [ ] **Batch 9** — VideoHelper coverage sweep: ensure every major page has a transcript block.

## Conventions
- Match the existing pages' depth + voice (concrete, accurate, role-aware). Don't fabricate UI that doesn't exist.
- Every new top-level page: add to the Starlight sidebar in `astro.config.mjs`.
- Build locally (`npm run build`) before every PR; merge on green (hosted CI ~1–2 min).
- Accuracy guard: product facts come from the JARAI repo (studio-console pages, JAR_* specs). When unsure, stay general rather than invent specifics.
