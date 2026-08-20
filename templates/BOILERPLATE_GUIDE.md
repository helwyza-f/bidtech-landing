# Boilerplate Quick Start Guide

Panduan cepat menggunakan template boilerplate sebagai starter untuk template baru.

## 🚀 Quick Copy & Rename

### 1. Copy Boilerplate

```bash
# Copy dari _boilerplate ke kategori yang diinginkan
cp -r templates/_boilerplate templates/company-profile/template-modern
```

### 2. Rename Template

```bash
cd templates/company-profile/template-modern

# Update nama di README.md
# Update metadata di app/layout.tsx
# Update branding di lib/constants.ts
```

### 3. Install & Run

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## 📁 Boilerplate Folder Structure

```
_boilerplate/
├── app/
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── Header.tsx           # Navigation
│   ├── Hero.tsx             # Hero section
│   ├── Features.tsx         # Features list
│   ├── CTA.tsx              # Call to action
│   └── Footer.tsx           # Footer
├── lib/
│   └── constants.ts         # Configuration & content
├── styles/
│   └── globals.css          # Global styles
├── public/
│   └── images/              # Asset folder
├── docs/
│   └── CUSTOMIZATION.md     # Customization guide
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── next.config.js           # Next.js config
├── tailwind.config.js       # Tailwind config
├── .env.example             # Environment variables
├── README.md                # Template description
└── INSTALLATION.md          # Setup instructions
```

## ✏️ Step-by-Step Customization

### Step 1: Update Basic Info

Edit `lib/constants.ts`:
```ts
export const BRAND = {
  name: 'Your Company',
  email: 'your@email.com',
  // ...
};
```

### Step 2: Update Components

Edit components sesuai kebutuhan:
- `Header.tsx` - Navigation & logo
- `Hero.tsx` - Hero section content
- `Features.tsx` - Features list
- `Footer.tsx` - Footer links & info

### Step 3: Replace Images

1. Delete images di `public/images/`
2. Add images Anda sendiri
3. Update component imports

### Step 4: Take Screenshots

Setelah selesai custom:
1. Screenshot halaman (minimal 1280x720)
2. Save ke `screens/` folder
3. Update `README.md` dengan preview

### Step 5: Update Documentation

Update file penting:
- `README.md` - Template description & preview
- `INSTALLATION.md` - Setup instructions
- `docs/CUSTOMIZATION.md` - Custom guide

## 📋 Checklist Before Publishing

```
[ ] Metadata updated (title, description)
[ ] All images replaced/optimized
[ ] Content updated & proofread
[ ] Mobile responsive tested
[ ] Links working correctly
[ ] Screenshots added
[ ] README.md completed
- [ ] Title & description clear
- [ ] Features listed
- [ ] Screenshots showing
- [ ] Installation steps clear
[ ] INSTALLATION.md updated
[ ] lib/constants.ts customized
[ ] No console errors
[ ] Performance optimized (Lighthouse 80+)
```

## 🎨 Key Customization Points

| File | What to Change |
|------|----------------|
| `lib/constants.ts` | Brand name, email, features, links |
| `components/Header.tsx` | Logo, navigation menu |
| `components/Hero.tsx` | Headline, subheading, image |
| `components/Features.tsx` | Feature list & descriptions |
| `components/Footer.tsx` | Company info, links |
| `app/layout.tsx` | Meta title & description |
| `public/images/` | All images |
| `styles/globals.css` | Custom styles if needed |
| `tailwind.config.js` | Brand colors |

## 🔧 Common Tasks

### Add New Page
```bash
mkdir -p app/new-page
# Create app/new-page/page.tsx
```

### Add New Component
```bash
# Create components/MyComponent.tsx
```

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: '#your-hex',
}
```

### Add Images
1. Place di `public/images/category/`
2. Import di component
3. Optimize before shipping

## 📸 Screenshot Tips

- Use 1920x1080 atau 1280x720 resolution
- Show key sections (home, features, footer)
- Include mobile view
- Update README.md dengan screenshot
- Add captions untuk clarity

## 🚀 Ready to Deploy

Setelah template selesai:

1. **Commit & Push**
```bash
git add .
git commit -m "Add new template: template-name"
git push
```

2. **Update Category README**
Edit `templates/[category]/README.md`:
```md
- **Template Name**: Short description
```

3. **Announce Template**
Update main `templates/README.md`

## 💡 Pro Tips

1. **Use TypeScript** - Type safety untuk components
2. **Reuse Components** - Buat component yang flexible
3. **Organize Assets** - Folder terstruktur untuk mudah maintain
4. **Document Everything** - Update README & docs
5. **Test Mobile** - Jangan lupa responsive check
6. **Optimize Images** - Gunakan WebP format
7. **Keep It DRY** - Don't repeat code

---

**Questions?** Check TEMPLATE_STRUCTURE.md atau hubungi tim Bidtech.

Happy coding! 🎉
