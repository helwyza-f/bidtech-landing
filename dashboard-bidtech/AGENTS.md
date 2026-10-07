@docs/ARCHITECTURE.md

@docs/DESIGN.md

@docs/API.md

@docs/SCHEMA.md

## Service architecture

- Business logic lives only in these seven classes under `app/Services/`: `DomainService`, `TemplateService`, `PaymentService`, `OrderService`, `UserService`, `PromoService`, and `ArticleService`.
- Do not add `Actions`, `Support`, `Helper`, `Util`, or an eighth Service without an explicit architecture decision. Keep one-off helpers private on their owning Service.
- Public Service methods use semantic English names. Controllers use method injection; Service-to-Service dependencies use constructor injection. Do not use custom facades or static calls.
- Services accept primitives, arrays, Models, Users, or `Illuminate\Contracts\Session\Session` for session-bound flows; never pass an HTTP Request into a Service.
- Dependency direction is acyclic: Domain/Template/User/Promo/Article are leaves; Order may depend on Domain/Template/User; Payment may depend on Order/User and, only when needed, Domain/Template.
- Keep pricing formulas in `Template::breakdown()` / `Template::priceBreakdown()` / `Order::priceBreakdown()` and client-email generation in `Order::clientEmail()`.
- Review a Service around 800 lines. `PaymentService` may temporarily exceed this; Xendit and WhatsApp internals remain private until extraction is explicitly approved.
- Preserve controller names, route URLs/names, behavior, and output. Read `docs/ARCHITECTURE.md` for the controller map and known debts.

## View architecture

- View structure is organized into 23 Blade files + `vendor/pagination` overrides:
  - `layouts/`: `dashboard`, `login`, `checkout` (3 files)
  - `components/`: `sidebar`, `header` (2 files)
  - `pages/`: 15 agreed page views (`dashboard`, `login`, `order`, `kelola-pesanan`, `kelola-template`, `kelola-promo`, `riwayat-redeem`, `kelola-mitra`, `kelola-artikel`, `edit-profil`, `pilih-template`, `domain`, `data-diri`, `metode-pembayaran`, `konfirmasi`)
  - `pdf/invoice.blade.php`
  - `emails/`: `unpaid-invoice.blade.php`, `paid-invoice.blade.php`
- All controllers render `pages.*` view names. `GET /dashboard/profile` (`dashboard.profile.edit`) renders `pages.edit-profil`.

## Object storage

- Article images are uploaded through Laravel and owned by `ArticleService`, using `Storage::disk('s3')` against RustFS. The browser must not upload directly to RustFS.
- Keep S3-compatible `AWS_*` application variables, path-style endpoints, and stable public URLs under `media.bidtech.co.id/{bucket}/articles/`.
- RustFS runs outside this project's Docker Compose in every environment. Buckets, public-read policy, CORS, access accounts, and lifecycle rules are provisioned manually in the RustFS console.
- Do not add a RustFS Compose service, storage bootstrap command, or application code that changes bucket configuration.
- Do not set per-object ACLs. Public access comes from the bucket policy. Read `docs/RUSTFS.md` before changing storage behavior.
