# Installation Guide

## Prerequisites

- Node.js 16+ 
- npm atau yarn
- Git

## Setup Instructions

### 1. Clone atau Copy Template

```bash
# Copy template folder ke project Anda
cp -r template-name your-project-folder
cd your-project-folder
```

### 2. Install Dependencies

```bash
npm install
# atau
yarn install
```

### 3. Run Development Server

```bash
npm run dev
# atau
yarn dev
```

Server akan berjalan di `http://localhost:3000`

### 4. Build untuk Production

```bash
npm run build
npm start
```

## Configuration

### 1. Update Metadata

Edit file `app/layout.tsx`:
```tsx
export const metadata: Metadata = {
  title: 'Your Company Name',
  description: 'Your description here',
  keywords: ['keyword1', 'keyword2'],
};
```

### 2. Customize Colors

Edit file `tailwind.config.js`:
```js
colors: {
  primary: '#your-color',
  secondary: '#your-color',
}
```

### 3. Replace Images

1. Ganti images di folder `public/images/`
2. Update `components/Hero.tsx` dan component lainnya
3. Pastikan ukuran image optimal (gunakan WebP jika perlu)

### 4. Update Content

Edit setiap component di folder `components/` sesuai kebutuhan:
- `Header.tsx` - Navigation menu
- `Hero.tsx` - Hero section
- `Features.tsx` - Feature list
- `Footer.tsx` - Footer content

## Customization Tips

### Menambah Page Baru

1. Buat folder di `app/` (misal: `app/about/`)
2. Buat file `page.tsx` di folder tersebut
3. Routing otomatis dengan Next.js App Router

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return <div>About Page</div>;
}
```

### Menambah Component

1. Buat file di `components/` (misal: `components/Services.tsx`)
2. Import dan gunakan di halaman yang diinginkan

```tsx
// app/page.tsx
import Services from '@/components/Services';

export default function Home() {
  return <Services />;
}
```

### Mengubah Styling

- Gunakan Tailwind CSS classes
- Atau buat CSS modules di folder `styles/`
- Edit `tailwind.config.js` untuk custom theme

## Deployment

### Deploy ke Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy ke Other Platforms

- **Netlify**: Connect git repo di dashboard
- **GitHub Pages**: Build static export
- **Docker**: Setup Dockerfile untuk containerization

## Troubleshooting

### Port 3000 sudah terpakai

```bash
npm run dev -- -p 3001
```

### Module not found error

```bash
# Clear node_modules dan reinstall
rm -rf node_modules
npm install
```

### Build error

1. Pastikan TypeScript config benar
2. Jalankan `npm run lint` untuk cek error
3. Clear `.next` folder: `rm -rf .next`

## Support

Untuk bantuan lebih lanjut:
- Lihat [README.md](./README.md)
- Baca [TEMPLATE_STRUCTURE.md](../TEMPLATE_STRUCTURE.md)
- Hubungi tim Bidtech

---

Happy coding! 🚀
