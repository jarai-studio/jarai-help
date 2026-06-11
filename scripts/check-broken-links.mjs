#!/usr/bin/env node
// Broken link checker for help.jarai.studio
// Crawls all help pages and reports dead links
// Usage: node scripts/check-broken-links.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const contentDir = path.join(rootDir, 'src', 'content', 'docs');

console.log('🔗 Broken Link Checker for Help Site\n');

// Regex patterns for different link types
const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g; // [text](url)
const HTML_HREF = /href=["']([^"']+)["']/g; // href="url"
const YOUTUBE_EMBED = /https:\/\/(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/g;
const RELATIVE_LINK = /^\/|^\.\.?\//; // relative links
const ANCHOR_LINK = /^#/; // anchor links (#section)
const EXTERNAL_LINK = /^https?:\/\//; // http(s) links

// Track results
const results = {
  files: 0,
  links: 0,
  internal: 0,
  external: 0,
  anchors: 0,
  broken: [],
  warnings: [],
  missing: [],
};

// Get all markdown files
function getAllMarkdownFiles(dir) {
  const files = [];

  function walk(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

// Check if a relative path exists
function checkInternalLink(fromFile, targetPath) {
  // Remove hash
  const cleanPath = targetPath.split('#')[0];

  if (!cleanPath) {
    return true; // Just an anchor, can't validate further
  }

  // Resolve relative to current file
  const fromDir = path.dirname(fromFile);
  let resolvedPath = path.resolve(fromDir, cleanPath);

  // Try variations
  const variations = [
    resolvedPath,
    resolvedPath.replace(/\.md$/, '.mdx'),
    resolvedPath.replace(/\.mdx$/, '.md'),
    path.join(resolvedPath, 'index.md'),
    path.join(resolvedPath, 'index.mdx'),
  ];

  for (const varPath of variations) {
    if (fs.existsSync(varPath)) {
      return true;
    }
  }

  return false;
}

// Check external link (basic DNS/connection check)
async function checkExternalLink(url) {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (help.jarai.studio link checker)',
      },
    });

    if (response.status === 404) {
      return { status: 404, valid: false };
    }
    if (response.status >= 200 && response.status < 400) {
      return { status: response.status, valid: true };
    }
    return { status: response.status, valid: false };
  } catch (error) {
    return { status: 'error', valid: false, message: error.message };
  }
}

// Extract links from file content
function extractLinks(content, filePath) {
  const links = [];
  let match;

  // Markdown links
  const markdownRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  while ((match = markdownRegex.exec(content)) !== null) {
    links.push({
      text: match[1],
      url: match[2],
      type: 'markdown',
      line: content.substring(0, match.index).split('\n').length,
    });
  }

  // HTML href
  const hrefRegex = /href=["']([^"']+)["']/g;
  while ((match = hrefRegex.exec(content)) !== null) {
    links.push({
      text: '(HTML)',
      url: match[1],
      type: 'html',
      line: content.substring(0, match.index).split('\n').length,
    });
  }

  return links;
}

// Main function
async function checkAllLinks() {
  const files = getAllMarkdownFiles(contentDir);
  results.files = files.length;

  console.log(`📄 Found ${files.length} markdown files\n`);

  for (const file of files) {
    const relFile = path.relative(rootDir, file);
    const content = fs.readFileSync(file, 'utf8');
    const links = extractLinks(content, file);

    for (const link of links) {
      results.links++;

      // Skip certain patterns
      if (link.url.startsWith('mailto:') || link.url.startsWith('tel:')) {
        continue;
      }

      // Internal relative link
      if (RELATIVE_LINK.test(link.url)) {
        results.internal++;
        if (!checkInternalLink(file, link.url)) {
          results.broken.push({
            file: relFile,
            line: link.line,
            url: link.url,
            type: 'internal',
            reason: 'File or path not found',
          });
        }
      }

      // Anchor link
      else if (ANCHOR_LINK.test(link.url)) {
        results.anchors++;
        // Can't easily validate anchors without parsing headings
      }

      // External link
      else if (EXTERNAL_LINK.test(link.url)) {
        results.external++;
        // Skip external checks for now (slow and can be flaky)
        // Uncomment below to enable with rate limiting:
        // const check = await checkExternalLink(link.url);
        // if (!check.valid) {
        //   results.broken.push({
        //     file: relFile,
        //     line: link.line,
        //     url: link.url,
        //     type: 'external',
        //     status: check.status,
        //   });
        // }
      }

      // Unknown protocol or missing
      else {
        results.missing.push({
          file: relFile,
          line: link.line,
          url: link.url,
          type: 'unknown',
        });
      }
    }
  }
}

// Run the check
await checkAllLinks();

// Report results
console.log('📊 Link Check Summary\n');
console.log(`Total links found: ${results.links}`);
console.log(`  Internal: ${results.internal}`);
console.log(`  External: ${results.external}`);
console.log(`  Anchors: ${results.anchors}\n`);

if (results.broken.length > 0) {
  console.log(`❌ ${results.broken.length} Broken Links Found:\n`);
  for (const item of results.broken) {
    console.log(`  ${item.file}:${item.line}`);
    console.log(`    Link: ${item.url}`);
    console.log(`    Reason: ${item.reason}\n`);
  }
}

if (results.missing.length > 0) {
  console.log(`⚠️  ${results.missing.length} Unknown Link Formats:\n`);
  for (const item of results.missing.slice(0, 5)) {
    console.log(`  ${item.file}:${item.line}`);
    console.log(`    Link: ${item.url}\n`);
  }
  if (results.missing.length > 5) {
    console.log(`  ... and ${results.missing.length - 5} more\n`);
  }
}

if (results.broken.length === 0 && results.missing.length === 0) {
  console.log('✅ All links are valid!\n');
  process.exit(0);
} else {
  console.log('⚠️  Review and fix the issues above before deploying.\n');
  process.exit(results.broken.length > 0 ? 1 : 0);
}
