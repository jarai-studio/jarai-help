// ───────────────────────────────────────────────────────────────────────────
//  SEARCH-ENGINE INDEXABILITY — THE SINGLE SWITCH  (help centre)
// ───────────────────────────────────────────────────────────────────────────
//
//  🔑 To take the Help Centre LIVE in search engines at launch, set
//     PUBLIC_SITE_INDEXABLE=true in the deploy environment and redeploy.
//     That one change flips /robots.txt (this value is read by the endpoint)
//     AND the <meta name="robots"> injected in astro.config.mjs (which reads the
//     same env var via process.env). Default is NOINDEXED (BL-842 / BL-843).
//
//     Note: astro.config.mjs reads process.env.PUBLIC_SITE_INDEXABLE directly
//     (config runs in Node, before import.meta.env is populated); this module is
//     the import.meta.env accessor used by the robots.txt endpoint. Both read the
//     same variable, so one flip moves both.
// ───────────────────────────────────────────────────────────────────────────

export const SITE_INDEXABLE = import.meta.env.PUBLIC_SITE_INDEXABLE === 'true';
export const SITE_URL = 'https://help.jarai.studio';
