// ✦ Design System Phase 0.3 — app-switcher site registry (environment-aware).
// SINGLE SOURCE OF TRUTH for the cross-site URLs used by the header app-switcher (⊞).
// This same file is copied verbatim into the other four repos' switchers (they can't
// cross-import), so keep them in sync.
//
// ── How DEV / TST / PRD DNS is handled ────────────────────────────────────────
// The sites follow a `{site}-{env}.jarai.studio` DNS convention for non-prod and
// `{site}.jarai.studio` for prod (confirmed: console-dev, developers-dev,
// developers-tst, developers…). URLs are therefore DERIVED from the build, not
// hardcoded, using the same mechanism the repo already uses for the console under
// BL-764 (`PUBLIC_CONSOLE_BASE_URL`, set per-env in .github/workflows/deploy.yml):
//
//   • Each repo's deploy workflow sets  PUBLIC_JARAI_ENV = dev | tst | prd  for the
//     build it produces (PUBLIC_* so Astro/Vite inlines it into the client bundle —
//     the switcher is a client island). Defaults to "dev" (local + current DEV deploy).
//   • dev → "-dev"   tst → "-tst"   prd → ""  suffix on the per-env subdomains.
//   • Console reuses the authoritative PUBLIC_CONSOLE_BASE_URL the deploy already sets.
//
// Marketing keeps the single public domain (www.jarai.studio) across environments.
// Help + Client Portal are pinned to their single prod domains today (no -dev/-tst host
// confirmed yet) — flip them to perEnvHost(...) once those subdomains are provisioned.
export interface SiteLink {
  key: string;
  label: string;
  href: string;
}

// Read either prefix so this file is byte-identical across stacks: Astro exposes
// PUBLIC_*, Vite (console + client portal) exposes VITE_*.
const env = import.meta.env as Record<string, string | undefined>;
const ENV = (env.PUBLIC_JARAI_ENV ?? env.VITE_JARAI_ENV ?? 'dev').toString().toLowerCase();
const SUFFIX = ENV === 'prd' || ENV === 'prod' ? '' : `-${ENV}`; // "-dev" | "-tst" | ""

const perEnvHost = (site: string) => `https://${site}${SUFFIX}.jarai.studio`;
const fixedHost = (site: string) => `https://${site}.jarai.studio`;

// Console: reuse the per-env var the deploy workflow already wires (BL-764); fall back
// to the suffix convention for local builds where it is unset.
const consoleUrl =
  env.PUBLIC_CONSOLE_BASE_URL ?? env.VITE_CONSOLE_BASE_URL ?? perEnvHost('console');

export const CURRENT_SITE = 'help';

export const SITE_LINKS: SiteLink[] = [
  { key: 'marketing',  label: 'Marketing',     href: 'https://www.jarai.studio' },
  { key: 'console',    label: 'Console',        href: consoleUrl },              // per-env (PUBLIC_CONSOLE_BASE_URL)
  { key: 'developers', label: 'Developers',     href: perEnvHost('developers') }, // per-env subdomain (confirmed)
  { key: 'help',       label: 'Help',           href: fixedHost('help') },        // single domain today
  { key: 'portal',     label: 'Client Portal',  href: fixedHost('portal') },      // single domain today
];
