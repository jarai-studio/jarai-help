// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// ✦ BL-854 SEO go-live — indexable by default; set PUBLIC_SITE_INDEXABLE=false to
// re-hide. Read here (process.env) for the <meta robots>; src/config/site.ts reads
// the same variable (import.meta.env) for the robots.txt endpoint.
const SITE_INDEXABLE = process.env.PUBLIC_SITE_INDEXABLE !== 'false';

// JARAI Studio help centre.
// Combined audience: operators (Studio Console users) + customers (Client Portal
// users) + shared general/FAQ content.
//
// Brand tokens applied via src/styles/brand-tokens.css — these MUST stay in sync
// with the same tokens in:
//   - jarai-website/src/styles/global.css
//   - jarai-developer-portal/src/styles/global.css
//   - JARAI/src/studio-console/src/styles/*.css
//   - JARAI/client-portal/src/styles/*.css
//
// Long-term: extract to a published @jarai-studio/brand npm package so all five
// surfaces consume the same source of truth. Until then, the canonical reference
// is jarai-website's global.css.

export default defineConfig({
  site: 'https://help.jarai.studio',
  integrations: [
    starlight({
      title: 'JARAI Help',
      // ✦ Phase 0.3 header — unified brand zone (⊞ app-switcher + aperture + JARAI Help).
      // ✦ Phase 0.4 footer — Starlight built-in pager + shared © line (edit/last-updated dropped).
      components: {
        SiteTitle: './src/components/SiteTitle.astro',
        Footer: './src/components/Footer.astro',
        // ✦ Design System Phase 0.5 — replace the Dark/Light/Auto dropdown with the
        // unified icon toggle (sun/moon). Reconciles localStorage['starlight-theme']
        // + the shared jarai-theme cookie (the head bridge above handles the cookie).
        ThemeSelect: './src/components/ThemeSelect.astro',
      },
      description:
        'Help centre for JARAI Studio — onboarding, troubleshooting, and FAQs for operators and customers.',
      favicon: '/favicon.svg',
      customCss: ['./src/styles/brand-tokens.css', './src/styles/starlight-overrides.css'],
      // ✦ Phase 2 docs-prose contract — code blocks dark in BOTH site themes,
      // identical surface (#0c1413), font (JetBrains Mono) and radius to the dev
      // portal's <CodeBlock> (which uses the same github-dark Shiki theme), so
      // code reads identically across the two engines. A single dark theme is
      // applied regardless of light/dark site mode.
      // Spec: portal-consistency/content-prose-consistency.md
      expressiveCode: {
        themes: ['github-dark'],
        styleOverrides: {
          borderRadius: 'var(--radius-card)',
          codeFontFamily: 'var(--font-mono)',
          codeFontSize: '0.85rem',
          codeLineHeight: '1.6',
          codeBackground: '#0c1413',
          frames: {
            frameBoxShadowCssValue: 'none',
            editorBackground: '#0c1413',
            editorActiveTabBackground: '#0c1413',
            editorTabBarBackground: '#0a1110',
            terminalBackground: '#0c1413',
            terminalTitlebarBackground: '#0a1110',
          },
        },
      },
      // ✦ Phase 0.4 — docs aren't editable by visitors: no editLink, no last-updated.
      lastUpdated: false,
      pagefind: true,
      sidebar: [
        {
          label: 'Getting started',
          items: [
            { label: 'Welcome to JARAI Help', link: '/' },
            { label: 'Which audience are you?', link: '/getting-started/audience/' },
            { label: 'What is JARAI Studio?', link: '/getting-started/what-is-jarai/' },
          ],
        },
        {
          label: 'For operators',
          collapsed: false,
          items: [
            { label: 'Operator overview', link: '/operators/' },
            { label: 'First production walkthrough', link: '/operators/first-production/' },
            { label: 'Import existing content', link: '/operators/import-content/' },
            { label: 'Managing avatars', link: '/operators/avatars/' },
            { label: 'Voice variants', link: '/operators/voice-variants/' },
            { label: 'Production pipeline (Steps 1–15)', link: '/operators/pipeline/' },
            { label: 'Connected platforms', link: '/operators/connected-platforms/' },
            { label: 'Distribution and publishing', link: '/operators/distribution/' },
            { label: 'Media library', link: '/operators/media-library/' },
            { label: 'Account settings', link: '/operators/account-settings/' },
            { label: 'Account policies', link: '/operators/account-policies/' },
            { label: 'Talks queue', link: '/operators/talks-queue/' },
            { label: 'Prompt templates', link: '/operators/prompt-templates/' },
            { label: 'Prompt optimisation', link: '/operators/prompt-optimisation/' },
            { label: 'Dashboards', link: '/operators/dashboards/' },
            { label: 'Billing and usage', link: '/operators/billing/' },
            { label: 'Troubleshooting', link: '/operators/troubleshooting/' },
          ],
        },
        {
          label: 'For customers',
          collapsed: false,
          items: [
            { label: 'Customer overview', link: '/customers/' },
            { label: 'Onboarding to the Client Portal', link: '/customers/onboarding/' },
            { label: 'Reviewing productions', link: '/customers/reviewing-productions/' },
            { label: 'Approval and rights review', link: '/customers/rights-review/' },
            { label: 'Notifications', link: '/customers/notifications/' },
            { label: 'Account settings', link: '/customers/account-settings/' },
            { label: 'Team & seats', link: '/customers/team-and-seats/' },
            { label: 'Billing and subscriptions', link: '/customers/billing/' },
            { label: 'Your privacy rights (GDPR)', link: '/customers/privacy-rights/' },
            { label: 'Troubleshooting', link: '/customers/troubleshooting/' },
          ],
        },
        {
          label: 'For administrators',
          collapsed: false,
          items: [
            { label: 'Administrator overview', link: '/administrators/' },
            { label: 'AI providers, models & capabilities', link: '/administrators/ai-providers-models/' },
            { label: 'Finance & profit-and-loss', link: '/administrators/finance-pl/' },
            { label: 'Compliance & governance', link: '/administrators/compliance-governance/' },
            { label: 'Operations & reliability', link: '/administrators/operations-reliability/' },
            { label: 'Platform controls', link: '/administrators/platform-controls/' },
            { label: 'Languages & voices', link: '/administrators/languages-voices/' },
            { label: 'Platforms & distributors', link: '/administrators/platforms-distribution/' },
            { label: 'Customers, contacts & access', link: '/administrators/customers-contacts/' },
          ],
        },
        {
          label: 'For developers',
          collapsed: false,
          items: [
            { label: 'Developer quickstart', link: '/developers/' },
            { label: 'Authentication & API keys', link: '/developers/authentication/' },
            { label: 'Production lifecycle (API)', link: '/developers/production-lifecycle/' },
            { label: 'Full API reference ↗', link: 'https://developer.jarai.studio' },
          ],
        },
        {
          label: 'General',
          collapsed: true,
          items: [
            { label: 'FAQ', link: '/general/faq/' },
            { label: 'Glossary', link: '/general/glossary/' },
            { label: 'Status and incident history', link: '/general/status/' },
            { label: 'Release notes', link: '/general/release-notes/' },
            { label: 'Data & security overview', link: '/general/data-security/' },
            { label: 'Mobile app', link: '/general/mobile-app/' },
            { label: 'Accessibility statement', link: '/general/accessibility/' },
            { label: 'Contact us', link: '/general/contact/' },
            { label: 'Track a request', link: '/general/track/' },
            { label: 'Contact support', link: '/general/contact-support/' },
            { label: 'Takedown notice', link: '/general/takedown-notice/' },
            { label: 'Legal', link: '/general/legal/' },
          ],
        },
      ],
      // ✦ Phase 0.2b — aperture dark-tile icon set + Open Graph defaults.
      // Starlight already emits og:title/type/url/locale/description/site_name +
      // twitter:card; we override site_name → "JARAI STUDIO", set og:type=website,
      // and add the default share image (Starlight emits no og:image by default).
      head: [
        // ✦ BL-843 SEO — indexability (single switch) + brand structured data.
        // Always emit a robots meta; the single SITE_INDEXABLE switch decides its value.
        // (A direct array element narrows `tag` to the literal; a conditional spread would
        // widen the whole head array's element type and fail `astro check`.)
        {
          tag: 'meta',
          attrs: {
            name: 'robots',
            content: SITE_INDEXABLE ? 'index, follow, max-image-preview:large' : 'noindex, nofollow',
          },
        },
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          content: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'JARAI STUDIO',
            legalName: 'JARAI STUDIO LTD',
            url: 'https://www.jarai.studio',
            logo: 'https://www.jarai.studio/icon-512.png',
          }),
        },
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          content: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'JARAI Help',
            url: 'https://help.jarai.studio',
            publisher: {
              '@type': 'Organization',
              name: 'JARAI STUDIO',
              url: 'https://www.jarai.studio',
            },
          }),
        },
        // ✦ Design System Phase 0.5 — bridge Starlight's theme to the shared,
        // cross-subdomain `jarai-theme` cookie so the choice carries across the
        // app surfaces (console / dev portal / help). Runs early in <head>:
        // seeds Starlight's stored theme from the cookie (and re-applies
        // data-theme to avoid a flash), then mirrors explicit changes back.
        {
          tag: 'script',
          content: `(function(){try{var m=document.cookie.match(/(?:^|; )jarai-theme=([^;]+)/);var c=m&&decodeURIComponent(m[1]);if(c==='light'||c==='dark'){try{localStorage.setItem('starlight-theme',c);}catch(e){}document.documentElement.dataset.theme=c;}var dom=/(^|\\.)jarai\\.studio$/.test(location.hostname)?'; Domain=.jarai.studio':'';new MutationObserver(function(){var t=document.documentElement.getAttribute('data-theme');var s;try{s=localStorage.getItem('starlight-theme');}catch(e){}if(s==='light'||s==='dark'){document.cookie='jarai-theme='+t+'; Path=/; SameSite=Lax; Max-Age=31536000'+dom;}else{document.cookie='jarai-theme=; Path=/; SameSite=Lax; Max-Age=0'+dom;}}).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});}catch(e){}})();`,
        },
        // Favicons / PWA
        {
          tag: 'link',
          attrs: { rel: 'icon', href: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
        },
        {
          tag: 'link',
          attrs: { rel: 'icon', href: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
        },
        {
          tag: 'link',
          attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon-180.png' },
        },
        {
          tag: 'link',
          attrs: { rel: 'manifest', href: '/site.webmanifest' },
        },
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: '#0E1B19' },
        },
        // Open Graph / Twitter defaults
        {
          tag: 'meta',
          attrs: { property: 'og:type', content: 'website' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:site_name', content: 'JARAI STUDIO' },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://help.jarai.studio/og-default-1200x630.png',
          },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:width', content: '1200' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:height', content: '630' },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:card', content: 'summary_large_image' },
        },
        // ✦ BL-845 — Cloudflare Web Analytics (cookieless, no consent banner).
        // One beacon token per property; dev/tst/prd separated by the dashboard
        // hostname filter. Matches the marketing site + dev portal + console.
        {
          tag: 'script',
          attrs: {
            defer: true,
            src: 'https://static.cloudflareinsights.com/beacon.min.js',
            'data-cf-beacon': '{"token": "465c2d7888ba4bbb864a99595d3c3cd6"}',
          },
        },
      ],
    }),
  ],
});
