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
- [ ] **Batch 2** — Administrators section: index + ai-providers-models + finance-pl + compliance-governance + sidebar.
- [ ] **Batch 3** — Administrators: operations-reliability + languages-voices.
- [ ] **Batch 4** — Developers section: index (quickstart) + auth/keys + production lifecycle + webhooks (+ link to dev portal).
- [ ] **Batch 5** — Operators: per-console-page how-tos (dashboards index, media library, prompt templates, connected platforms, settings tour) + VideoHelpers.
- [ ] **Batch 6** — Customers: expand (notifications, account settings, team/seats) + VideoHelpers on key pages.
- [ ] **Batch 7** — General: keyboard shortcuts, accessibility statement, data & security overview, release notes index.
- [ ] **Batch 8** — Cross-app Help links (needs-review PRs in studio-console / website / dev-portal) pointing to help.jarai.studio.
- [ ] **Batch 9** — VideoHelper coverage sweep: ensure every major page has a transcript block.

## Conventions
- Match the existing pages' depth + voice (concrete, accurate, role-aware). Don't fabricate UI that doesn't exist.
- Every new top-level page: add to the Starlight sidebar in `astro.config.mjs`.
- Build locally (`npm run build`) before every PR; merge on green (hosted CI ~1–2 min).
- Accuracy guard: product facts come from the JARAI repo (studio-console pages, JAR_* specs). When unsure, stay general rather than invent specifics.
