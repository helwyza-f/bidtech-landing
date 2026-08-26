import Link from 'next/link';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { BRAND, FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/constants';

/**
 * Footer sengaja dibiarkan tenang animasinya: satu reveal per kolom, selesai.
 * Di bagian bawah halaman user sudah mau pergi atau mau mencari info —
 * bukan tempat untuk pamer gerakan.
 */
export default function Footer() {
  return (
    <footer className="bg-ink text-cream/70">
      <div className="shell py-16 md:py-20">
        <Stagger className="grid gap-10 md:grid-cols-4" stagger={0.1}>
          <StaggerItem className="md:col-span-1">
            <p className="mb-4 text-sm font-extrabold uppercase tracking-eyebrow text-cream">
              {BRAND.name}
            </p>
            <p className="max-w-xs text-sm leading-relaxed">{BRAND.description}</p>
          </StaggerItem>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <StaggerItem key={heading}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-eyebrow text-cream/50">
                {heading}
              </p>
              <ul className="space-y-2.5 text-sm">
                {links.map((label) => (
                  <li key={label}>
                    <Link
                      href="#"
                      className="transition-colors duration-300 hover:text-gold"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}

          <StaggerItem>
            <p className="mb-4 text-xs font-semibold uppercase tracking-eyebrow text-cream/50">
              Lokasi
            </p>
            <p className="max-w-[15rem] text-sm leading-relaxed">{BRAND.address}</p>
            <a
              href={`tel:${BRAND.phone.replace(/-/g, '')}`}
              className="mt-3 inline-block text-sm transition-colors duration-300 hover:text-gold"
            >
              {BRAND.phone}
            </a>
          </StaggerItem>

          <StaggerItem>
            <p className="mb-4 text-xs font-semibold uppercase tracking-eyebrow text-cream/50">
              Ikuti Kami
            </p>
            <ul className="flex gap-3">
              {Object.entries(SOCIAL_LINKS).map(([name, href]) => (
                <li key={name}>
                  <a
                    href={href}
                    aria-label={name}
                    className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 text-xs uppercase transition-colors duration-300 hover:border-gold hover:text-gold"
                  >
                    {name.slice(0, 2)}
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>
        </Stagger>

        <Reveal>
          <div className="mt-14 flex flex-col gap-4 border-t border-cream/10 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} {BRAND.name}. Hak Cipta Dilindungi.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-gold">Kebijakan Privasi</Link>
              <Link href="#" className="hover:text-gold">Ketentuan Layanan</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
