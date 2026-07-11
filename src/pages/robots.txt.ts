import type { APIRoute } from 'astro';
import { SITE_INDEXABLE, SITE_URL } from '../config/site';

// robots.txt generated at build time from the single SITE_INDEXABLE switch
// (src/config/site.ts). Pre-launch it blocks all crawling; at go-live the same
// flag opens the site and advertises the Starlight-generated sitemap.
export const GET: APIRoute = () => {
  const body = SITE_INDEXABLE
    ? [
        'User-agent: *',
        'Allow: /',
        '',
        `Sitemap: ${SITE_URL}/sitemap-index.xml`,
        '',
      ].join('\n')
    : [
        '# Pre-launch — kept out of search engines until go-live (BL-842 / BL-843).',
        '# Flip PUBLIC_SITE_INDEXABLE=true (see src/config/site.ts) at launch.',
        'User-agent: *',
        'Disallow: /',
        '',
      ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
