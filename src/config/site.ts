// ───────────────────────────────────────────────────────────────────────────
//  SEARCH-ENGINE INDEXABILITY — THE SINGLE SWITCH  (help centre)
// ───────────────────────────────────────────────────────────────────────────
//
//  ✅ LIVE IN SEARCH as of BL-854 (go-live, 2026-07-12). Indexable by default.
//
//  The flag is read in two places (both flipped): astro.config.mjs (process.env,
//  for the <meta robots>) and this module (import.meta.env, for the robots.txt
//  endpoint). /robots.txt emits "Allow: /" + Sitemap; pages emit "index, follow".
//
//  🔒 EMERGENCY RE-HIDE: set PUBLIC_SITE_INDEXABLE=false in the deploy env and
//     redeploy (one variable moves both reads).
// ───────────────────────────────────────────────────────────────────────────

export const SITE_INDEXABLE = import.meta.env.PUBLIC_SITE_INDEXABLE !== 'false';
export const SITE_URL = 'https://help.jarai.studio';
