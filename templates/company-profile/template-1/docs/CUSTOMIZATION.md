# Customization Guide

Panduan lengkap untuk mengustomisasi template sesuai kebutuhan Anda.

## 1. Mengubah Colors & Branding

### Update Tailwind Colors

Edit `tailwind.config.js`:

```js
colors: {
  primary: '#your-color-hex',
  secondary: '#your-color-hex',
  accent: '#your-color-hex',
}
```

### Update CSS Variables

Edit `styles/globals.css`:

```css
:root {
  --color-primary: #your-color;
  --color-secondary: #your-color;
}
```

## 2. Mengubah Fonts

### Add Custom Fonts

1. Download font files (TTF/OTF)
2. Simpan di `public/fonts/`
3. Update `styles/globals.css`:

```css
@font-face {
  font-family: 'YourFont';
  src: url('/fonts/your-font.ttf') format('truetype');
}

body {
  font-family: 'YourFont', sans-serif;
}
```

## 3. Menambah Pages

### Create New Page

```bash
mkdir -p app/your-page
touch app/your-page/page.tsx
```

### Page Template

```tsx
// app/your-page/page.tsx
export default function YourPage() {
  return (
    <div className="container-max section-padding">
      <h1>Your Page Title</h1>
      {/* Content here */}
    </div>
  );
}
```

## 4. Menambah Components

### Create Component

```bash
touch components/YourComponent.tsx
```

### Component Template

```tsx
// components/YourComponent.tsx
interface YourComponentProps {
  title: string;
  description: string;
}

export default function YourComponent({ 
  title, 
  description 
}: YourComponentProps) {
  return (
    <div className="component">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
```

### Use Component

```tsx
// app/page.tsx
import YourComponent from '@/components/YourComponent';

export default function Home() {
  return (
    <YourComponent 
      title="Hello" 
      description="World" 
    />
  );
}
```

## 5. Replace Images

### Optimize Images

1. Ukuran rekomendasi:
   - Hero image: 1920x1080px
   - Card image: 400x300px
   - Thumbnail: 200x200px

2. Format: JPG (foto), PNG (dengan alpha), WebP (optimal)

3. Tools untuk optimize:
   - TinyPNG/TinyJPG
   - ImageOptim
   - Squoosh

### Update Image Paths

```tsx
import Image from 'next/image';

export default function Hero() {
  return (
    <Image
      src="/images/hero/main.jpg"
      alt="Hero"
      width={1920}
      height={1080}
    />
  );
}
```

## 6. Update Content

### Edit Navigation

```tsx
// lib/constants.ts
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  // Add more links
];
```

### Edit Features

```tsx
// lib/constants.ts
export const FEATURES = [
  {
    title: 'Your Feature',
    description: 'Your description',
    icon: '✨',
  },
  // Add more features
];
```

## 7. Add Analytics

### Google Analytics

1. Get GA ID dari Google Analytics
2. Update `.env.local`:

```
NEXT_PUBLIC_GA_ID=G-XXXXX
```

3. Import di `app/layout.tsx`:

```tsx
// Add in head
<script 
  async 
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
></script>
```

## 8. SEO Optimization

### Update Metadata

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Your Title',
  description: 'Your description',
  keywords: ['keyword1', 'keyword2'],
  openGraph: {
    title: 'Your Title',
    description: 'Your description',
    images: ['/og-image.jpg'],
  },
};
```

### Create Sitemap

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yoursite.com</loc>
    <lastmod>2026-08-19</lastmod>
  </url>
</urlset>
```

## 9. Dark Mode (Optional)

### Enable Dark Mode

1. Install package:
```bash
npm install next-themes
```

2. Update `app/layout.tsx`:
```tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <ThemeProvider attribute="class">
      {children}
    </ThemeProvider>
  )
}
```

3. Update components untuk dark mode support

## 10. Mobile Optimization

### Check Responsive

```bash
npm run dev
# Test di mobile browser atau device
```

### Add Mobile Menu

Update `components/Header.tsx` dengan mobile navigation:

```tsx
// Mobile menu toggle
<button className="md:hidden" onClick={toggleMenu}>
  Menu
</button>
```

---

Need more help? Check README.md atau hubungi tim Bidtech.
