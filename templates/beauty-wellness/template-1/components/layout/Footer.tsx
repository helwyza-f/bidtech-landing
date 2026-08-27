import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import { siteConfig } from "@/data/site";

import { Container } from "@/components/ui/Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const whatsappMessage = encodeURIComponent(
    `Halo ${siteConfig.brand.name}, saya ingin mendapatkan informasi lebih lanjut.`
  );

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${whatsappMessage}`;

  return (
    <footer className="bg-[#0b0b0b] text-white">
      <Container>
        <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-[1.4fr_0.6fr_0.6fr_0.8fr]">
          {/* Brand */}

          <div className="max-w-sm">
            <Link
              href="#top"
              className="font-heading text-2xl font-bold uppercase tracking-[-0.05em]"
            >
              {siteConfig.brand.name}
            </Link>

            <p className="mt-6 text-sm leading-7 text-white/45">
              {siteConfig.brand.name} adalah pusat
              kebugaran dengan fasilitas modern,
              pelatih profesional, dan lingkungan
              latihan yang nyaman untuk membantu Anda
              mencapai tujuan kebugaran.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-[var(--color-primary)]"
            >
              Hubungi Kami

              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>

          {/* Navigation */}

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
              Navigasi
            </p>

            <nav className="mt-6 flex flex-col gap-4">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-white/65 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
              Sosial
            </p>

            <div className="mt-6 flex flex-col gap-4">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white"
              >
                <FaInstagram size={15} />
                Instagram
              </a>

              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white"
              >
                <FaYoutube size={15} />
                YouTube
              </a>
            </div>
          </div>

          {/* Contact */}

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
              Kontak
            </p>

            <div className="mt-6 space-y-3 text-sm leading-6 text-white/65">
              <p>{siteConfig.contact.phone}</p>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="block transition-colors hover:text-white"
              >
                {siteConfig.contact.email}
              </a>

              <p>{siteConfig.contact.address}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-white/10 py-6 text-[11px] text-white/35 md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} {siteConfig.brand.name}. All
            rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Kebijakan Privasi
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-white"
            >
              Syarat Layanan
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}