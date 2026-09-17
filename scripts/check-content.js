#!/usr/bin/env node
/**
 * Content governance and integrity check for The Instant Camera Guy.
 * Validates:
 * 1. Image asset existence (local assets in assets/images/)
 * 2. CSP compatibility for remote images against index.html CSP img-src
 * 3. Markdown link syntax and section target consistency
 * 4. Stale route references
 */

import fs from 'fs';
import path from 'path';

const errors = [];
const warnings = [];

function error(msg) {
  errors.push(msg);
}

function warn(msg) {
  warnings.push(msg);
}

console.log('======================================================');
console.log('  The Instant Camera Guy - Content Integrity Check');
console.log('======================================================\n');

// 1. READ CSP IMG-SRC DIRECTIVES FROM INDEX.HTML
console.log('1. Parsing Content Security Policy from index.html...');
const indexPath = path.resolve('index.html');
let allowedImgOrigins = [];

if (fs.existsSync(indexPath)) {
  const indexHtml = fs.readFileSync(indexPath, 'utf-8');
  const cspMatch = indexHtml.match(/img-src\s+([^;]+);/);
  if (cspMatch) {
    allowedImgOrigins = cspMatch[1].trim().split(/\s+/).filter(Boolean);
    console.log(`✓ Detected allowed img-src origins: ${allowedImgOrigins.join(', ')}`);
  } else {
    warn('Could not detect CSP img-src directive in index.html.');
  }
} else {
  error('index.html not found!');
}

function isOriginAllowed(urlStr) {
  if (urlStr.startsWith('data:') || urlStr.startsWith('/') || !urlStr.startsWith('http')) {
    return true;
  }
  try {
    const parsed = new URL(urlStr);
    return allowedImgOrigins.some(pattern => {
      if (pattern === "'self'") return false;
      if (pattern.startsWith('https://*.')) {
        const domain = pattern.replace('https://*.', '');
        return parsed.hostname.endsWith(domain);
      }
      return pattern === `${parsed.protocol}//${parsed.hostname}`;
    });
  } catch (e) {
    return false;
  }
}

// 2. AUDIT CONTENT.JSON IMAGES & ASSETS
console.log('\n2. Auditing Content Media Assets in content.json...');
const contentPath = path.resolve('content.json');
const imagesDir = path.resolve('assets/images');

if (fs.existsSync(contentPath)) {
  const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));

  content.forEach((item) => {
    const { slug, heroImage, image } = item.frontmatter;

    // Check Hero Image
    if (heroImage) {
      const heroPath = path.join(imagesDir, heroImage);
      if (!fs.existsSync(heroPath)) {
        error(`Hero image "${heroImage}" does not exist in ${imagesDir}.`);
      } else {
        console.log(`✓ Hero image verified: ${heroImage}`);
      }
    }

    // Check Feature Image
    if (image) {
      if (image.startsWith('http://') || image.startsWith('https://')) {
        if (!isOriginAllowed(image)) {
          error(`Remote image "${image}" in item "${slug}" is not permitted by CSP img-src in index.html!`);
        } else {
          console.log(`✓ Remote image verified against CSP: ${image.slice(0, 50)}...`);
        }
      } else {
        const localPath = path.join(imagesDir, image);
        if (!fs.existsSync(localPath)) {
          error(`Local image "${image}" in item "${slug}" does not exist in ${imagesDir}.`);
        } else {
          console.log(`✓ Local image verified: ${image}`);
        }
      }
    }

    // 3. AUDIT MARKDOWN LINKS & EMBEDDED REFERENCES
    if (item.content) {
      // Find markdown links [text](url)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      let match;
      while ((match = linkRegex.exec(item.content)) !== null) {
        const text = match[1].trim();
        const href = match[2].trim();

        if (!text) {
          warn(`Item "${slug}": Markdown link has empty anchor text: (${href}).`);
        }
        if (!href) {
          error(`Item "${slug}": Markdown link has empty target href.`);
        }

        // Flag dead/removed routes
        if (href === '/photography' || href.startsWith('/photography/') || href === '/reviews' || href.startsWith('/reviews/')) {
          error(`Item "${slug}": Link references removed route "${href}".`);
        }

        // Flag unencrypted HTTP links
        if (href.startsWith('http://')) {
          warn(`Item "${slug}": Insecure HTTP link found: "${href}". Consider using HTTPS.`);
        }
      }
    }
  });
} else {
  error('content.json not found!');
}

// SUMMARY
console.log('\n------------------------------------------------------');
if (warnings.length > 0) {
  console.log(`⚠️  ${warnings.length} Advisory Warning(s):`);
  warnings.forEach(w => console.log(`  - ${w}`));
}

if (errors.length > 0) {
  console.error(`\n❌ ${errors.length} Hard Error(s) encountered:`);
  errors.forEach(e => console.error(`  ✗ ${e}`));
  process.exit(1);
} else {
  console.log('✓ Content integrity check passed successfully with 0 errors!\n');
  process.exit(0);
}
