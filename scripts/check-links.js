#!/usr/bin/env node
/**
 * Link integrity checker for The Instant Camera Guy.
 * Modeled after gripaustralia/scripts/check-links.js.
 * Validates:
 * 1. Internal routes and anchor hashes (#about, #repairs, #videos, #contact, #contact-repair)
 * 2. Static asset references in public/ or dist/
 * 3. External links: syntax, HTTPS enforcement, and optional live network reachability (--network)
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const checkNetwork = process.argv.includes('--network');

const errors = [];
const warnings = [];

function error(msg) {
  errors.push(msg);
}

function warn(msg) {
  warnings.push(msg);
}

console.log('======================================================');
console.log('  The Instant Camera Guy - Link Integrity Check');
console.log('======================================================\n');

// 1. KNOWN VALID INTERNAL ROUTES & ANCHORS
const VALID_ROUTES = new Set(['/', '/repair', '/videos']);
const VALID_HOME_ANCHORS = new Set(['#about', '#repairs', '#instagram', '#videos', '#contact']);
const VALID_REPAIR_ANCHORS = new Set(['#contact-repair']);

// 2. EXTRACT LINKS FROM JSX / TSX / HTML / JSON FILES
const scannedFiles = [];
const discoveredLinks = [];

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name.startsWith('.')) {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (/\.(tsx|jsx|ts|js|html|json)$/.test(entry.name)) {
      scannedFiles.push(fullPath);
    }
  }
}

scanDirectory(path.resolve('.'));

console.log(`Scanning ${scannedFiles.length} project files for hyperlinks...`);

for (const file of scannedFiles) {
  // Skip script files themselves
  if (file.includes(path.join('scripts', ''))) continue;

  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative(process.cwd(), file);

  // Match href="..." and to="..."
  const hrefRegex = /(?:href|to)\s*=\s*["']([^"']+)["']/g;
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    discoveredLinks.push({ link: match[1], file: relPath });
  }

  // Match markdown links [text](url)
  const mdLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  while ((match = mdLinkRegex.exec(content)) !== null) {
    discoveredLinks.push({ link: match[2], file: relPath });
  }
}

console.log(`Discovered ${discoveredLinks.length} total link references.`);

// 3. AUDIT DISCOVERED LINKS
const externalUrls = new Set();

for (const { link, file } of discoveredLinks) {
  const trimmed = link.trim();
  if (!trimmed || trimmed.startsWith('javascript:')) continue;

  // Handle mailto:
  if (trimmed.startsWith('mailto:')) {
    const email = trimmed.slice(7);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error(`${file}: Invalid email address in mailto link: "${trimmed}"`);
    }
    continue;
  }

  // Handle tel:
  if (trimmed.startsWith('tel:')) {
    continue;
  }

  // Handle anchor-only links
  if (trimmed.startsWith('#')) {
    if (file.includes('RepairsPage')) {
      if (!VALID_REPAIR_ANCHORS.has(trimmed)) {
        error(`${file}: Invalid anchor link "${trimmed}" on RepairsPage.`);
      }
    } else if (file.includes('Header') || file.includes('HomePage')) {
      if (!VALID_HOME_ANCHORS.has(trimmed)) {
        error(`${file}: Invalid anchor link "${trimmed}" on HomePage.`);
      }
    }
    continue;
  }

  // Handle internal routes & static assets
  if (trimmed.startsWith('/')) {
    const cleanRoute = trimmed.split('#')[0].split('?')[0];
    const isAsset = /\.(css|ico|svg|png|jpg|jpeg|webp|avif|woff2|woff|ttf|json|webmanifest|js|mjs)$/i.test(cleanRoute) || cleanRoute.startsWith('/assets/');

    if (isAsset) {
      // Check static assets in public/, assets/, or root (e.g. styles.css)
      const rootFile = path.resolve('.' + cleanRoute);
      const localPublic = path.join('public', cleanRoute);
      const localAssets = path.join('assets', cleanRoute.replace(/^\/assets\//, ''));
      const distAsset = path.join('dist', cleanRoute);

      if (!fs.existsSync(rootFile) && !fs.existsSync(localPublic) && !fs.existsSync(localAssets) && !fs.existsSync(distAsset)) {
        warn(`${file}: Asset reference "${cleanRoute}" not found in root, public/, assets/, or dist/.`);
      }
    } else if (!VALID_ROUTES.has(cleanRoute)) {
      error(`${file}: Broken internal route "${cleanRoute}". Target does not exist in React Router.`);
    }
    continue;
  }

  // Handle external URLs
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    if (trimmed.startsWith('http://')) {
      error(`${file}: Insecure HTTP link detected: "${trimmed}". All external links must use HTTPS.`);
    }
    try {
      const parsed = new URL(trimmed);
      // Skip preconnect / API roots from page fetch checks
      if (['fonts.gstatic.com', 'fonts.googleapis.com'].includes(parsed.hostname) && (parsed.pathname === '/' || parsed.pathname === '')) {
        continue;
      }
      externalUrls.add(trimmed);
    } catch (e) {
      error(`${file}: Malformed external URL "${trimmed}": ${e.message}`);
    }
  }
}

// 4. OPTIONAL LIVE NETWORK VERIFICATION
async function verifyExternalLinks() {
  console.log(`\nVerifying live reachability of ${externalUrls.size} unique external links...`);
  const results = [];

  for (const url of externalUrls) {
    const status = await new Promise((resolve) => {
      try {
        const client = url.startsWith('https:') ? https : http;
        const req = client.request(
          url,
          {
            method: 'HEAD',
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) TheInstantCameraGuy-Validator' }
          },
          (res) => {
            resolve({ statusCode: res.statusCode, error: null });
          }
        );
        req.on('error', (err) => resolve({ statusCode: null, error: err.message }));
        req.setTimeout(8000, () => {
          req.destroy();
          resolve({ statusCode: null, error: 'TIMEOUT' });
        });
        req.end();
      } catch (e) {
        resolve({ statusCode: null, error: e.message });
      }
    });

    if (status.error) {
      warn(`External URL ${url}: Network check failed: ${status.error}`);
    } else if (status.statusCode >= 400 && status.statusCode !== 405 && status.statusCode !== 403) {
      warn(`External URL ${url}: Returned HTTP status ${status.statusCode}`);
    } else {
      console.log(`✓ External URL reachable: ${url} (HTTP ${status.statusCode || 200})`);
    }
  }
}

async function main() {
  if (checkNetwork && externalUrls.size > 0) {
    await verifyExternalLinks();
  }

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
    console.log('✓ All links verified successfully with 0 broken links!\n');
    process.exit(0);
  }
}

main();
