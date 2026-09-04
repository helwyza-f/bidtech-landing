# Nivora Academy Assets — Batch 1–5

## Cara pakai di Next.js

1. Buat folder:
   public/images/nivora/

2. Copy folder berikut ke dalam folder tersebut:
   brand/
   hero/
   courses/
   mentors/
   intensive/
   career/
   events/
   testimonials/
   about/
   seo/

3. Copy `asset-paths.ts` ke:
   lib/data/asset-paths.ts

4. Import di component/data:

   import { nivoraAssets } from "@/lib/data/asset-paths";

   <Image
     src={nivoraAssets.hero.learner}
     alt="Learner Nivora Academy"
     width={1200}
     height={1500}
   />

## Quality

File WEBP di package ini tidak di-reencode saat proses penggabungan.
Penggabungan ZIP tidak mengubah kualitas visual file gambar.
