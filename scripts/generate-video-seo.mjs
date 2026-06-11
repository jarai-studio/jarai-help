#!/usr/bin/env node
// Generate SEO metadata for help videos
// Creates: video sitemap, structured data (schema.org VideoObject), OpenGraph tags
// Usage: node scripts/generate-video-seo.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const helpDir = path.join(__dirname, '..');
const videosDir = path.join(__dirname, '../../jarai-help-videos');

console.log('📺 Video SEO Generator\n');

// Video metadata
const VIDEOS = [
  {
    id: 'avatars',
    title: 'Set up an avatar and its voice',
    description: 'Learn how to create a new avatar in JARAI Studio, upload or generate an image likeness, and select from hundreds of voice variants.',
    duration: 'PT2M2S', // ISO 8601
    thumbnailUrl: 'https://help.jarai.studio/avatar-thumbnail.jpg',
  },
  {
    id: 'billing',
    title: 'Tokens, allowance & top-ups',
    description: 'Understand JARAI Studio billing: monthly token allowance, per-step consumption, and how to buy extra capacity or enable auto top-up.',
    duration: 'PT1M37S',
    thumbnailUrl: 'https://help.jarai.studio/billing-thumbnail.jpg',
  },
  {
    id: 'pipeline',
    title: 'How the pipeline works',
    description: 'Tour the 15-step AI production pipeline: from brief to narrative to voices, images, video composition, packaging, and delivery.',
    duration: 'PT2M15S',
    thumbnailUrl: 'https://help.jarai.studio/pipeline-thumbnail.jpg',
  },
  {
    id: 'distribution',
    title: 'Publish to your channels',
    description: 'Connect publishing channels via OAuth, approve productions, and track engagement and revenue across your distribution network.',
    duration: 'PT2M7S',
    thumbnailUrl: 'https://help.jarai.studio/distribution-thumbnail.jpg',
  },
  {
    id: 'first-production',
    title: 'Create your first production',
    description: 'Step-by-step guide to creating your first production: choose a type and theme, select avatars, and watch the pipeline run.',
    duration: 'PT2M',
    thumbnailUrl: 'https://help.jarai.studio/first-production-thumbnail.jpg',
  },
  {
    id: 'overview',
    title: 'JARAI Studio in 90 seconds',
    description: 'A quick overview of JARAI Studio: the platform that turns a brief into finished, ready-to-publish media automatically.',
    duration: 'PT1M30S',
    thumbnailUrl: 'https://help.jarai.studio/overview-thumbnail.jpg',
  },
  // Add more videos as needed
];

const SITE_URL = 'https://help.jarai.studio';
const ORGANIZATION_URL = 'https://www.jarai.studio';
const PUBLICATION_DATE = new Date().toISOString();

// ── Generate Video Sitemap (for Google Video Search) ────────────────

function generateVideoSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '         xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

  for (const video of VIDEOS) {
    const videoUrl = `${SITE_URL}/${video.id}/`;
    const mp4Url = `https://stjaraimediadev.blob.core.windows.net/help-videos/${video.id}.mp4?se=2099-12-31T23%3A59%3A59Z&sp=rl&sv=2026-02-06&sr=c&sig=UDdB33Nc6cLu9iOzeO4Aiq5CMiMR0mJu93QnRT8vXpU%3D`;

    xml += '  <url>\n';
    xml += `    <loc>${videoUrl}</loc>\n`;
    xml += '    <video:video>\n';
    xml += `      <video:thumbnail_loc>${video.thumbnailUrl}</video:thumbnail_loc>\n`;
    xml += `      <video:title>${escapeXml(video.title)}</video:title>\n`;
    xml += `      <video:description>${escapeXml(video.description)}</video:description>\n`;
    xml += `      <video:content_loc>${mp4Url}</video:content_loc>\n`;
    xml += `      <video:duration>${video.duration.replace('PT', '').replace(/[MS]/g, '')}</video:duration>\n`;
    xml += `      <video:publication_date>${PUBLICATION_DATE.split('T')[0]}</video:publication_date>\n`;
    xml += '      <video:tag>JARAI Studio</video:tag>\n';
    xml += '      <video:tag>tutorial</video:tag>\n';
    xml += '      <video:tag>help</video:tag>\n';
    xml += `      <video:category>Help & Support</video:category>\n`;
    xml += '    </video:video>\n';
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';
  return xml;
}

// ── Generate Structured Data (schema.org VideoObject) ────────────────

function generateStructuredData(video) {
  const videoUrl = `${SITE_URL}/${video.id}/`;
  const mp4Url = `https://stjaraimediadev.blob.core.windows.net/help-videos/${video.id}.mp4`;

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: [video.thumbnailUrl],
    uploadDate: PUBLICATION_DATE,
    duration: video.duration,
    contentUrl: mp4Url,
    embedUrl: videoUrl,
    interactionCount: '0',
  };
}

// ── Generate OpenGraph Meta Tags ────────────────────────────────────

function generateOpenGraphTags(video) {
  return {
    'og:title': video.title,
    'og:description': video.description,
    'og:type': 'video.other',
    'og:url': `${SITE_URL}/${video.id}/`,
    'og:image': video.thumbnailUrl,
    'og:video:url': `https://stjaraimediadev.blob.core.windows.net/help-videos/${video.id}.mp4`,
    'og:video:type': 'video/mp4',
    'twitter:card': 'player',
    'twitter:title': video.title,
    'twitter:description': video.description,
    'twitter:image': video.thumbnailUrl,
  };
}

// ── Utility: XML escape ────────────────────────────────────────────

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// ── Generate all outputs ────────────────────────────────────────────

console.log(`📺 Generating SEO assets for ${VIDEOS.length} videos\n`);

// 1. Video Sitemap
const videoSitemap = generateVideoSitemap();
const sitemapPath = path.join(helpDir, 'public', 'sitemap-videos.xml');
fs.mkdirSync(path.dirname(sitemapPath), { recursive: true });
fs.writeFileSync(sitemapPath, videoSitemap);
console.log(`✅ Video sitemap: ${sitemapPath}`);

// 2. Structured Data JSON-LD
const jsonLdPath = path.join(helpDir, 'public', 'video-schema.json');
const jsonLdData = VIDEOS.map(generateStructuredData);
fs.writeFileSync(jsonLdPath, JSON.stringify(jsonLdData, null, 2));
console.log(`✅ Structured data: ${jsonLdPath}`);

// 3. OpenGraph Reference
const ogPath = path.join(helpDir, 'public', 'video-og-tags.json');
const ogData = {};
for (const video of VIDEOS) {
  ogData[video.id] = generateOpenGraphTags(video);
}
fs.writeFileSync(ogPath, JSON.stringify(ogData, null, 2));
console.log(`✅ OpenGraph tags: ${ogPath}`);

// 4. Astro Component Helper
const helperComponentPath = path.join(helpDir, 'src', 'components', 'VideoSEO.astro');
const helperComponent = `---
/**
 * VideoSEO — Inject video structured data and OpenGraph tags into page head
 *
 * Usage:
 *   import VideoSEO from '../components/VideoSEO.astro';
 *   <VideoSEO videoId="avatars" />
 */
interface Props {
  videoId: string;
}

const { videoId } = Astro.props;

// Video metadata (should match server-side generation)
const VIDEOS: Record<string, any> = {
  avatars: {
    title: 'Set up an avatar and its voice',
    description: 'Learn how to create a new avatar in JARAI Studio...',
    duration: 'PT2M2S',
    thumbnail: 'https://help.jarai.studio/avatar-thumbnail.jpg',
  },
  // ... (import from generated JSON-LD)
};

const video = VIDEOS[videoId];
if (!video) {
  console.warn(\`Video metadata not found for: \${videoId}\`);
}

const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: video?.title,
  description: video?.description,
  thumbnailUrl: video?.thumbnail,
  duration: video?.duration,
  uploadDate: new Date().toISOString(),
};
---

{video && (
  <>
    <meta property="og:type" content="video.other" />
    <meta property="og:title" content={video.title} />
    <meta property="og:description" content={video.description} />
    <meta property="og:image" content={video.thumbnail} />
    <meta name="twitter:card" content="player" />
    <meta name="twitter:title" content={video.title} />
    <meta name="twitter:description" content={video.description} />
    <script type="application/ld+json" set:html={JSON.stringify(schemaData)} />
  </>
)}
`;

fs.writeFileSync(helperComponentPath, helperComponent);
console.log(`✅ Astro SEO component: ${helperComponentPath}`);

// Summary
console.log(`\n📊 Summary\n`);
console.log(`Videos processed: ${VIDEOS.length}`);
console.log(`Outputs generated:\n`);
console.log(`  1. Video Sitemap (Google Video Search)`);
console.log(`     → submit to Google Search Console at ${SITE_URL}/sitemap-videos.xml\n`);
console.log(`  2. Structured Data (schema.org VideoObject)`);
console.log(`     → Use VideoSEO.astro component in page headers\n`);
console.log(`  3. OpenGraph Tags (Social Media)`);
console.log(`     → Reference in page metadata for link previews\n`);

console.log('🚀 SEO setup complete!\n');
console.log('Next steps:');
console.log('  1. Add <VideoSEO videoId="avatars" /> to page headers');
console.log('  2. Submit sitemap-videos.xml to Google Search Console');
console.log('  3. Test with Google Rich Results Test: https://search.google.com/test/rich-results\n');
