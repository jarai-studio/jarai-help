# CLAUDE.md — JARAI Help

## Project Overview

Public help centre for JARAI Studio, serving onboarding, troubleshooting, and FAQ content for both **operators** (Studio Console users) and **customers** (Client Portal users) under one site, plus a shared `/general/` section. Built with Astro 7.x + Starlight, deployed to Azure Static Web Apps. Separate repository from the JARAI monorepo; open content — issues/PRs welcome for documentation, but security/bug reports route to the main JARAI org channels.

## Tech Stack

- **Framework:** Astro 7.x (static output) with the `@astrojs/starlight` docs theme
- **Content:** Markdown/MDX pages under `src/content/docs/`, loaded via Starlight's `docsLoader`/`docsSchema` (`src/content.config.ts`)
- **Search:** Pagefind (built into the production build, no extra config)
- **Code blocks:** Starlight's built-in Expressive Code, pinned to the `github-dark` Shiki theme (kept visually identical to the dev portal's `<CodeBlock>`)
- **Images:** `sharp`
- **Fonts:** self-hosted via `@fontsource` (IBM Plex Sans, JetBrains Mono, Poppins), served from `public/fonts/`
- **Styling:** CSS custom properties in `src/styles/brand-tokens.css` (JARAI brand tokens) + `src/styles/starlight-overrides.css`

## Key Commands

```bash
npm run dev           # Start dev server (localhost:4321)
npm run check         # astro check (type errors)
npm run build         # astro build (outputs to dist/)
npm run preview       # Preview built site locally
npm run links:check   # Crawl src/content/docs for broken internal/external/anchor links
npm run seo:generate  # Generate video sitemap + schema.org VideoObject SEO metadata
```

## Deployment

Auto-deploys to **dev** on every push to `main`. Manual deploys to any environment via GitHub Actions workflow `deploy.yml`:

```bash
gh workflow run deploy.yml --ref main -f environment=dev
gh workflow run deploy.yml --ref main -f environment=tst
gh workflow run deploy.yml --ref main -f environment=prd
```

Pull requests only run a build check (`astro check` + `astro build`) — no deploy. All jobs run on GitHub-hosted `ubuntu-latest`; prd deliberately avoids self-hosted runners so a release doesn't depend on the org's self-hosted runner being online.

### Environment URLs

| Environment | Custom Domain | SWA Resource |
|---|---|---|
| dev | `help-dev.jarai.studio` | `swa-jarai-dev-help` (rg-jarai-dev) |
| tst | `help-tst.jarai.studio` | `swa-jarai-tst-help` (rg-jarai-tst) |
| prd | `help.jarai.studio` | `swa-jarai-prd-help` (rg-jarai-prd) |

(SWA topology and CNAME targets per the monorepo's `DEPLOYMENT_RUNBOOK.md` §2.6 — DNS is on Wix, not Azure DNS.)

### Environment Variables

| Variable | Scope | Purpose |
|---|---|---|
| `PUBLIC_JARAI_ENV` | Build-time | `dev` \| `tst` \| `prd` — drives the per-env subdomain suffix used by the cross-site app-switcher (`src/components/siteLinks.ts`) |
| `PUBLIC_SITE_INDEXABLE` | Build-time | Fail-closed search-indexability switch. Only set to `'true'` in the `deploy-prd` job — dev/tst builds are always `noindex, nofollow` |

### GitHub Secrets Required

| Secret | Purpose |
|---|---|
| `SWA_TOKEN_HELP` | Azure SWA deployment token (env-scoped — a different value per GitHub environment: dev/tst/prd) |

## Project Structure

```
src/
  components/       # SiteTitle, Footer, ThemeSelect (Starlight overrides), VideoHelper(Enhanced),
                     # ContactForm, TrackCase, FaqSchema, BrandMark, home/ (homepage cards/CTA)
  components/siteLinks.ts  # Cross-site app-switcher URL registry — copied verbatim into the other
                     #   four repos' switchers; keep in sync manually
  content/docs/      # All page content (.mdx), organised by audience:
                     #   getting-started/, operators/, customers/, developers/, administrators/, general/
  content.config.ts  # Starlight docs collection loader/schema
  config/site.ts     # SITE_INDEXABLE flag + SITE_URL constant
  pages/robots.txt.ts  # Dynamic robots.txt driven by SITE_INDEXABLE
  styles/            # brand-tokens.css (JARAI brand tokens), starlight-overrides.css, motion.css
public/
  fonts/             # Self-hosted @fontsource woff2 files
  staticwebapp.config.json  # SWA routing, security headers, CSP
scripts/
  check-broken-links.mjs   # Link checker over src/content/docs
  generate-video-seo.mjs   # Video sitemap / schema.org SEO generator (reads ../jarai-help-videos)
```

Sidebar information architecture (which pages appear, in what order, under which audience section) is defined entirely in `astro.config.mjs`'s `starlight({ sidebar: [...] })` array — adding a page to the sidebar means editing that array, not just dropping a file into `content/docs/`.

## Conventions

- **Content authoring:** pages live under `src/content/docs/` as `.mdx`; each needs frontmatter `title:` + `description:`. Match existing pages' depth and voice — concrete, accurate, role-aware. Don't fabricate UI or behaviour that doesn't exist; when unsure, stay general rather than invent specifics (product facts should trace back to the JARAI monorepo's studio-console code or `JAR_*` specs).
- **VideoHelper pattern:** most guide pages embed a `<VideoHelper>` component wrapping a full written transcript in a `<details>` — the page must be complete and useful even before a video recording exists (renders a "coming soon" placeholder when `src` is omitted).
- **Brand tokens:** `src/styles/brand-tokens.css` MUST stay byte-identical to the equivalent block in the other four JARAI web surfaces (`jarai-website`, `jarai-developer-portal`, `JARAI/src/studio-console`, `JARAI/client-portal`). No shared npm package yet — propagate edits manually. Canonical source of truth: `jarai-brand-guidelines-SKILL.md` in the JARAI monorepo (`design/skills/`).
- **Theme sync:** a small inline script in `astro.config.mjs`'s `head` bridges Starlight's `localStorage` theme choice with a shared `jarai-theme` cookie (`Domain=.jarai.studio`) so light/dark mode carries across subdomains.
- **SEO indexability:** fail-closed by design — a build is only indexable when `PUBLIC_SITE_INDEXABLE=true`, which is set exclusively in the `deploy-prd` GitHub Actions job.
- **Security scanning:** `.github/workflows/security-scan.yml` runs gitleaks (blocking on PR commit ranges, advisory weekly full-history sweep) plus an advisory `npm audit` — see `.gitleaks.toml` for scan config.

## Sibling Repos

| Surface | Repo | Stack | URL |
|---|---|---|---|
| Marketing | `jarai-studio/jarai-website` | Astro SSG | https://www.jarai.studio |
| Developer Portal | `jarai-studio/jarai-developer-portal` | Astro SSG + React islands | https://developer.jarai.studio |
| **Help centre (this repo)** | `jarai-studio/jarai-help` | Astro Starlight | https://help.jarai.studio |
| Studio Console (operator app) | `jarai-studio/JARAI` (`src/studio-console/`) | React SPA on Azure SWA | operator-only |
| Client Portal (customer app) | `jarai-studio/JARAI` (`client-portal/`) | React SPA on Azure SWA | customer-only |
