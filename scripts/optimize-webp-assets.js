const fs = require('fs');
const path = require('path');
const sharp = require(path.join(__dirname, '../frontend/node_modules/sharp'));

const TEMPLATES_DIR = path.join(__dirname, '../templates');

// Walk directory recursively
function walkDir(dir, callback, skipDirs = ['node_modules', '.next', 'out']) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (skipDirs.includes(file)) continue;
      walkDir(fullPath, callback, skipDirs);
    } else {
      callback(fullPath);
    }
  }
}

async function optimizeImage(filePath) {
  const stat = fs.statSync(filePath);
  const originalSizeKb = Math.round(stat.size / 1024);

  // If file is already small (e.g. < 80KB), we can skip it
  if (stat.size < 80 * 1024) {
    return;
  }

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    let pipeline = sharp(filePath);
    let resized = false;

    // Resize if the width is greater than 1600px
    if (metadata.width && metadata.width > 1600) {
      pipeline = pipeline.resize({ width: 1600, fit: 'inside', withoutEnlargement: true });
      resized = true;
    }

    const tempPath = filePath + '.opt.webp';
    await pipeline
      .webp({ quality: 75, effort: 4 })
      .toFile(tempPath);

    const optStat = fs.statSync(tempPath);
    const optSizeKb = Math.round(optStat.size / 1024);

    if (optStat.size < stat.size) {
      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);
      console.log(`Optimized: ${filePath}`);
      console.log(`  Size: ${originalSizeKb} KB -> ${optSizeKb} KB ${resized ? `(Resized from ${metadata.width}px)` : ''}`);
    } else {
      // If optimized file is somehow larger (rare), discard it
      fs.unlinkSync(tempPath);
      console.log(`Skipped (no size benefit): ${filePath} (${originalSizeKb} KB)`);
    }
  } catch (err) {
    console.error(`Error optimizing ${filePath}:`, err);
  }
}

async function main() {
  const webpImages = [];

  walkDir(TEMPLATES_DIR, (filePath) => {
    const ext = path.extname(filePath);
    if (ext.toLowerCase() === '.webp') {
      webpImages.push(filePath);
    }
  });

  console.log(`Found ${webpImages.length} WebP images. Checking sizes...`);

  for (const imgPath of webpImages) {
    await optimizeImage(imgPath);
  }

  console.log('All WebP assets optimized successfully!');
}

main().catch(console.error);
