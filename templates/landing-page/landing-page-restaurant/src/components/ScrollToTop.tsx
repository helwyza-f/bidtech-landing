import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Saat pindah halaman lewat react-router, browser TIDAK otomatis kembali ke atas
 * (berbeda dengan navigasi biasa). Tanpa ini, klik "Kontak" dari tengah halaman
 * akan mendarat di tengah halaman Kontak — terasa seperti bug.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
