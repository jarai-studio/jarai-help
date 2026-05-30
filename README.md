# jarai-help

Help centre for JARAI Studio at [help.jarai.studio](https://help.jarai.studio). Built with [Astro Starlight](https://starlight.astro.build/), hosted on Azure Static Web Apps.

Public repo, open content. Issues + PRs welcome for documentation improvements; security and bug reports go to the main JARAI org channels (see [Contact support](https://help.jarai.studio/general/contact-support/)).

## Audience

Combined: covers both **operators** (Studio Console users) and **customers** (Client Portal users) under one site, with a shared `/general/` section for FAQs, glossary, takedown procedure, etc.

## Sibling repos

| Surface | Repo | Stack | URL |
|---|---|---|---|
| Marketing | `jarai-studio/jarai-website` | Astro SSG | https://www.jarai.studio |
| Developer Portal | `jarai-studio/jarai-developer-portal` | Astro SSG + React islands | https://developer.jarai.studio |
| **Help centre (this repo)** | `jarai-studio/jarai-help` | Astro Starlight | https://help.jarai.studio |
| Studio Console (operator app) | `jarai-studio/JARAI` (`src/studio-console/`) | React SPA on Azure SWA | (operator-only) |
| Client Portal (customer app) | `jarai-studio/JARAI` (`client-portal/`) | React SPA on Azure SWA | (customer-only) |

## Brand consistency

`src/styles/brand-tokens.css` MUST stay byte-identical to the same block in all five surfaces above. Source of truth: `jarai-brand-guidelines-SKILL.md`. Drift = brand inconsistency.

**Follow-up plan**: extract these tokens to a published `@jarai-studio/brand` npm package so all five surfaces import the same file (single source of truth, no copy/paste). Until then, edits propagate manually.

## Local development

```bash
npm install
npm run dev
# open http://localhost:4321
```

## Build

```bash
npm run check    # astro check (type errors)
npm run build    # builds to dist/
npm run preview  # local preview of the built output
```

## Deploy

Auto-deploy on push to `main` via Azure Static Web Apps. See `.github/workflows/deploy.yml`.

## Content authoring

- Pages live under `src/content/docs/` as `.md` or `.mdx` files
- Each page needs frontmatter: `title:` + `description:`
- Sidebar IA is defined in `astro.config.mjs` — adding a new page to the sidebar = edit the `sidebar:` array
- Pagefind search is built into the production build — no extra config

## Sections

- `/getting-started/` — audience picker, "what is JARAI"
- `/operators/` — Studio Console help
- `/customers/` — Client Portal help
- `/general/` — FAQ, glossary, support, takedown notice, legal
