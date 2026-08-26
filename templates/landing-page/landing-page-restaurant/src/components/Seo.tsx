import { site } from "../data/site";

interface SeoProps {
  /** Judul halaman TANPA nama brand — nama brand ditambahkan otomatis. */
  title: string;
  description?: string;
  /** Path halaman, contoh "/menu". Dipakai untuk canonical URL. */
  path?: string;
  image?: string;
  /** Set true untuk halaman yang tidak ingin muncul di Google (mis. halaman terima kasih). */
  noIndex?: boolean;
  type?: "website" | "article";
}

/**
 * Meta tag per halaman.
 *
 * Catatan penting: sejak React 19, tag <title>, <meta>, dan <link> yang
 * dirender di komponen mana pun akan OTOMATIS dipindahkan ke <head> oleh React.
 * Jadi kita tidak perlu library seperti react-helmet lagi.
 */
export default function Seo({
  title,
  description = site.description,
  path = "/",
  image = site.ogImage,
  noIndex = false,
  type = "website",
}: SeoProps) {
  // Halaman utama tidak perlu "Beranda | Chef's Table" — cukup judul brand penuh.
  const fullTitle = path === "/" ? title : `${title} | ${site.name}`;
  const canonical = `${site.url}${path === "/" ? "" : path}`;
  const imageUrl = image.startsWith("http") ? image : `${site.url}${image}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph — dipakai WhatsApp, Facebook, LinkedIn saat link dibagikan. */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content={site.locale} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter/X memakai kartu terpisah. summary_large_image = gambar besar. */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  );
}

interface JsonLdProps {
  data: object;
}

/**
 * Menyuntikkan structured data ke halaman.
 * dangerouslySetInnerHTML dipakai karena isinya JSON mentah, bukan teks biasa —
 * React kalau tidak begitu akan meng-escape tanda kutipnya dan JSON jadi rusak.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
