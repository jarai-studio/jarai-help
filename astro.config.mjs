// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

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
      description:
        'Help centre for JARAI Studio — onboarding, troubleshooting, and FAQs for operators and customers.',
      logo: {
        src: './src/assets/logo.svg',
        replacesTitle: false,
      },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/brand-tokens.css', './src/styles/starlight-overrides.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/jarai-studio',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/jarai-studio/jarai-help/edit/main/',
      },
      lastUpdated: true,
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
            { label: 'Managing avatars', link: '/operators/avatars/' },
            { label: 'Voice variants', link: '/operators/voice-variants/' },
            { label: 'Production pipeline (Steps 1–15)', link: '/operators/pipeline/' },
            { label: 'Distribution and publishing', link: '/operators/distribution/' },
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
            { label: 'Billing and subscriptions', link: '/customers/billing/' },
            { label: 'Your privacy rights (GDPR)', link: '/customers/privacy-rights/' },
            { label: 'Troubleshooting', link: '/customers/troubleshooting/' },
          ],
        },
        {
          label: 'General',
          collapsed: true,
          items: [
            { label: 'FAQ', link: '/general/faq/' },
            { label: 'Glossary', link: '/general/glossary/' },
            { label: 'Status and incident history', link: '/general/status/' },
            { label: 'Contact support', link: '/general/contact-support/' },
            { label: 'Takedown notice', link: '/general/takedown-notice/' },
            { label: 'Legal', link: '/general/legal/' },
          ],
        },
      ],
      head: [
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: '#d97757' },
        },
      ],
    }),
  ],
});
