import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import ScrollProgress from "./ScrollProgress";
import ScrollToTop from "./ScrollToTop";
import { JsonLd } from "./Seo";
import { restaurantSchema } from "../lib/schema";

/**
 * Kerangka yang dipakai SEMUA halaman.
 *
 * Pola "layout route" di react-router: komponen ini jadi induk, lalu <Outlet />
 * adalah lubang tempat halaman anak dirender. Keuntungannya, Navbar & Footer
 * tidak ikut di-mount ulang tiap pindah halaman.
 */
export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <ScrollProgress />

      {/* Link lompat: tersembunyi sampai di-Tab. Wajib untuk aksesibilitas —
          pengguna keyboard tidak perlu menelusuri seluruh menu tiap halaman. */}
      <a
        href="#konten-utama"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2 focus:text-primary-content"
      >
        Lompat ke konten utama
      </a>

      {/* Structured data global: berlaku untuk seluruh situs, jadi cukup sekali di sini. */}
      <JsonLd data={restaurantSchema()} />

      <Navbar />

      <main id="konten-utama">
        <Outlet />
      </main>

      {/* TODO: <Footer /> — dibangun di tahap section. */}
    </>
  );
}
