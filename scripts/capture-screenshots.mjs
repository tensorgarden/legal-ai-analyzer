import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const baseUrl = process.env.SCREENSHOT_URL || 'http://127.0.0.1:3107';
const outDir = path.resolve('docs/screenshots');

const captures = [
  {
    file: '01-overview-stats.png',
    description: 'Overview section with contract metrics and trends',
    locator: 'h2:has-text("Overview")'
  },
  {
    file: '02-review-queue.png',
    description: 'Review queue with contracts awaiting review',
    locator: 'h2:has-text("Review Queue")'
  },
  {
    file: '03-privilege-ai-handling.png',
    description: 'Privilege & AI handling table with sensitivity and handling decisions',
    locator: 'h2:has-text("Privilege")'
  },
  {
    file: '04-work-product-discoverability.png',
    description: 'Work product and discoverability status dashboard',
    locator: 'h2:has-text("Work Product")'
  },
  {
    file: '05-external-use-readiness.png',
    description: 'External use readiness cards for filing and court usage',
    locator: 'h2:has-text("External Use Readiness")'
  },
  {
    file: '06-extracted-clauses.png',
    description: 'Extracted clauses table with risk scores',
    locator: 'h2:has-text("Extracted Clauses")'
  },
  {
    file: '00-full-page.png',
    description: 'Full-page portfolio demo screenshot',
    fullPage: true
  }
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
await page.goto(baseUrl, { waitUntil: 'networkidle' });
await page.emulateMedia({ colorScheme: 'light' });

const manifest = [];
for (const capture of captures) {
  try {
    const outputPath = path.join(outDir, capture.file);
    if (capture.fullPage) {
      await page.screenshot({ path: outputPath, fullPage: true });
    } else {
      const element = page.locator(capture.locator).first();
      const box = await element.boundingBox();
      if (!box) {
        console.log(`Warning: Could not find element for ${capture.file} with locator "${capture.locator}", skipping`);
        continue;
      }
      // Scroll to element and take a section screenshot
      await element.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500); // Allow render
      const section = page.locator(capture.locator).first().locator('..').first();
      await section.screenshot({ path: outputPath });
    }
    manifest.push({ file: `docs/screenshots/${capture.file}`, description: capture.description });
  } catch (e) {
    console.log(`Warning: Capture failed for ${capture.file}: ${e.message}`);
  }
}

await browser.close();
console.log(JSON.stringify({ ok: true, baseUrl, screenshots: manifest }, null, 2));
