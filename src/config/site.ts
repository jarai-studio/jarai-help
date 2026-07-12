// ───────────────────────────────────────────────────────────────────────────
//  SEARCH-ENGINE INDEXABILITY — THE SINGLE SWITCH  (help centre, fail-closed)
// ───────────────────────────────────────────────────────────────────────────
//
//  Default is NOINDEXED. A build is indexable ONLY when PUBLIC_SITE_INDEXABLE=true
//  is set at build time — which happens ONLY in the deploy-prd job (deploy.yml).
//  So dev/tst (help-dev / -tst.jarai.studio) stay out of search, and prd
//  (help.jarai.studio, swa-jarai-prd-help) goes live exactly when a PRD deploy runs.
//
//  The flag is read in two places: astro.config.mjs (process.env, for the <meta
//  robots>) and this module (import.meta.env, for the robots.txt endpoint).
// ───────────────────────────────────────────────────────────────────────────

export const SITE_INDEXABLE = import.meta.env.PUBLIC_SITE_INDEXABLE === 'true';
export const SITE_URL = 'https://help.jarai.studio';
