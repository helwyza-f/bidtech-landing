# Template Structure Guide - Bidtech

Setiap template menggunakan **Next.js App Router** sesuai dengan struktur bidtech yang sudah ada.

## 📁 Struktur Standar Template

```
template-name/
├── README.md                          # Deskripsi template, fitur, preview
├── INSTALLATION.md                    # Panduan instalasi dan setup
│
├── app/                               # Next.js App Router
│   ├── layout.tsx                     # Root layout
│   ├── page.tsx                       # Home page
│   ├── (sections)/                    # Grouping routes
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   └── contact/page.tsx
│   └── not-found.tsx
│
├── components/                        # Reusable components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Features.tsx
│   ├── Testimonials.tsx
│   ├── CTA.tsx
│   ├── Footer.tsx
│   └── common/                        # Shared components
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Section.tsx
│
├── lib/                               # Utilities & helpers
│   ├── utils.ts                       # Helper functions
│   ├── constants.ts                   # Constants & data
│   └── colors.ts                      # Color schemes (optional)
│
├── styles/                            # Global styles
│   ├── globals.css                    # Global CSS
│   ├── variables.css                  # CSS variables
│   └── tailwind.config.js             # Tailwind config (if using)
│
├── public/                            # Static assets
│   ├── images/
│   │   ├── hero/
│   │   ├── services/
│   │   └── testimonials/
│   ├── icons/
│   ├── fonts/
│   └── videos/
│
├── screens/                           # Template screenshots
│   ├── homepage.png                   # Screenshot halaman utama
│   ├── about.png                      # Screenshot halaman about
│   ├── services.png                   # Screenshot halaman services
│   ├── contact.png                    # Screenshot halaman contact
│   └── mobile.png                     # Screenshot mobile view
│
├── docs/                              # Documentation
│   ├── FEATURES.md                    # Detail fitur
│   ├── CUSTOMIZATION.md               # Panduan kustomisasi
│   └── COLORS.md                      # Color palette reference
│
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
├── next.config.js                     # Next.js config
└── .env.example                       # Environment variables template

```

## 🎯 Penjelasan Folder Utama

| Folder | Tujuan | Catatan |
|--------|--------|--------|
| `app/` | Next.js pages & routing | Gunakan App Router |
| `components/` | React components | Pisahkan per section |
| `lib/` | Utilities & data | Constants, helpers, utils |
| `styles/` | CSS global | Gunakan CSS modules atau Tailwind |
| `public/` | Static files | Images, icons, fonts |
| `screens/` | Template screenshots | Untuk preview & dokumentasi |
| `docs/` | Documentation | Setup, customization guide |

## 📋 File Minimal yang Diperlukan

Setiap template minimal harus punya:

```
template-name/
├── README.md                    ✅ WAJIB - Deskripsi & preview
├── app/
│   ├── layout.tsx               ✅ WAJIB
│   └── page.tsx                 ✅ WAJIB
├── components/
│   ├── Header.tsx               ✅ WAJIB
│   └── Footer.tsx               ✅ WAJIB
├── public/
│   └── images/                  ✅ WAJIB - Assets
├── package.json                 ✅ WAJIB
└── screens/
    └── homepage.png             ✅ WAJIB - Preview
```

## 🚀 Best Practices

1. **Naming**: Gunakan kebab-case untuk folder, PascalCase untuk components
2. **Components**: Buat component yang reusable dan modular
3. **Styling**: Konsisten dengan sistem styling (Tailwind / CSS Modules)
4. **Assets**: Optimalkan images, gunakan WebP jika perlu
5. **TypeScript**: Gunakan TypeScript untuk type safety
6. **Responsive**: Pastikan mobile-friendly
7. **Documentation**: Selalu update README dan INSTALLATION

## 📸 Screenshot Requirements

Setiap template harus punya minimal 3-5 screenshots:
- Homepage (desktop)
- Key section screenshot
- Mobile view
- (Optional) Dark mode / alternate designs

Format: PNG, resolution minimal 1280x720px

---
**Version:** 1.0  
**Last Updated:** 2026-08-19
