const fs = require('fs');
const path = require('path');
const sharp = require(path.join(__dirname, '../frontend/node_modules/sharp'));

const TEMPLATES_DIR = path.join(__dirname, '../templates');

// File extensions to process for conversion
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.JPG', '.JPEG'];

// File extensions to check for text references
const CODE_EXTENSIONS = ['.tsx', '.ts', '.js', '.mjs', '.css', '.html', '.json', '.md'];

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

async function convertImageToWebp(filePath) {
  const ext = path.extname(filePath);
  const baseName = filePath.slice(0, -ext.length);
  const destPath = `${baseName}.webp`;

  try {
    console.log(`Converting: ${filePath} -> ${destPath}`);
    await sharp(filePath)
      .webp({ quality: 80 })
      .toFile(destPath);
    
    // Delete the original file
    fs.unlinkSync(filePath);
    console.log(`Deleted original: ${filePath}`);
    return true;
  } catch (err) {
    console.error(`Error converting ${filePath}:`, err);
    return false;
  }
}

function updateCodeReferences() {
  console.log('Updating code references...');
  walkDir(TEMPLATES_DIR, (filePath) => {
    const ext = path.extname(filePath);
    if (!CODE_EXTENSIONS.includes(ext)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Replace all occurrences of .jpg, .jpeg, etc. (case-insensitive for extension)
    content = content.replace(/\.jpe?g\b/gi, '.webp');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated references in: ${filePath}`);
    }
  });
}

async function main() {
  const imagesToConvert = [];
  
  walkDir(TEMPLATES_DIR, (filePath) => {
    const ext = path.extname(filePath);
    if (IMAGE_EXTENSIONS.includes(ext)) {
      imagesToConvert.push(filePath);
    }
  });

  console.log(`Found ${imagesToConvert.length} images to convert.`);

  for (const imgPath of imagesToConvert) {
    await convertImageToWebp(imgPath);
  }

  updateCodeReferences();
  console.log('WebP conversion completed successfully!');
}

main().catch(console.error);
