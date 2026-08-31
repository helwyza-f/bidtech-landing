const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = path.join(__dirname, '../templates/property/template-1/public/images');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const images = [
  // Hero section
  { id: 'hero-light.webp', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070&auto=format&fit=crop&fm=webp' },
  { id: 'hero-dark.webp', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&fm=webp' },
  { id: 'avatar-1.webp', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop&fm=webp' },
  { id: 'avatar-2.webp', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop&fm=webp' },
  { id: 'avatar-3.webp', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop&fm=webp' },
  
  // Craftsmanship
  { id: 'craft-1.webp', url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop&fm=webp' },
  { id: 'craft-2.webp', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop&fm=webp' },
  { id: 'craft-3.webp', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop&fm=webp' },
  { id: 'craft-4.webp', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop&fm=webp' },

  // Philosophy
  { id: 'philosophy-main.webp', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop&fm=webp' },
  { id: 'philosophy-sub-1.webp', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop&fm=webp' },
  { id: 'philosophy-sub-2.webp', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&auto=format&fit=crop&fm=webp' },

  // Signature Properties & Data
  { id: 'prop-1.webp', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop&fm=webp' },
  { id: 'prop-2.webp', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop&fm=webp' },
  { id: 'prop-3.webp', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1000&auto=format&fit=crop&fm=webp' },
  { id: 'prop-4.webp', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop&fm=webp' },
  { id: 'prop-5.webp', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1000&auto=format&fit=crop&fm=webp' },
  { id: 'prop-6.webp', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop&fm=webp' },
  { id: 'prop-7.webp', url: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=1000&auto=format&fit=crop&fm=webp' },
  { id: 'prop-8.webp', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000&auto=format&fit=crop&fm=webp' },
  { id: 'prop-9.webp', url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1000&auto=format&fit=crop&fm=webp' },
  { id: 'prop-10.webp', url: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?q=80&w=1000&auto=format&fit=crop&fm=webp' },
  { id: 'prop-11.webp', url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop&fm=webp' },
  { id: 'prop-12.webp', url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1000&auto=format&fit=crop&fm=webp' },

  // About & Contact Banner
  { id: 'about.webp', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop&fm=webp' },
  { id: 'contact-banner.webp', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop&fm=webp' },
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', reject);
  });
};

async function run() {
  console.log(`Starting download of ${images.length} webp assets...`);
  for (const item of images) {
    const dest = path.join(dir, item.id);
    try {
      await download(item.url, dest);
      const stats = fs.statSync(dest);
      console.log(`✓ Downloaded ${item.id} (${(stats.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`✗ Error downloading ${item.id}:`, err.message);
    }
  }
  console.log('All WebP assets successfully downloaded to public/images!');
}

run();
