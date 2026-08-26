import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu as MenuIcon, User, X } from "lucide-react";
import logo from "../assets/icon.svg";
import { navLinks } from "../data/site";
import { ease } from "../lib/motion";
import Magnetic from "./motion/Magnetic";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();

  // useMotionValueEvent mendengarkan perubahan scroll TANPA re-render tiap pixel.
  // Kita baru memanggil setState saat statusnya benar-benar berubah.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrolled = latest > 8;
    setScrolled((previous) => (previous === isScrolled ? previous : isScrolled));
  });

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-base-100 transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_0_0_rgba(8,6,13,0.08)]" : ""
      }`}
    >
      <nav
        aria-label="Navigasi utama"
        className="section-container flex h-[72px] items-center justify-between gap-4 lg:h-[100px]"
      >
        {/* Logo */}
        <NavLink to="/" className="flex shrink-0 items-center gap-2.5">
          <img src={logo} alt="" width={20} height={19} aria-hidden="true" />
          <span className="text-xl font-semibold tracking-tight text-dark lg:text-2xl">
            {"Chef's Table"}
          </span>
        </NavLink>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative block py-1 text-base transition-colors duration-200 ${
                    isActive ? "text-primary" : "text-dark hover:text-primary"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      // layoutId = "elemen yang sama, posisi berbeda".
                      // Karena semua garis aktif memakai id yang sama, Motion
                      // MELUNCURKAN garis dari menu lama ke menu baru alih-alih
                      // menghapus lalu menggambar ulang.
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-primary"
                        transition={{ duration: 0.35, ease: ease.out }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Aksi kanan */}
        <div className="flex shrink-0 items-center gap-3">
          <Magnetic strength={0.3} className="hidden sm:block">
            <NavLink
              to="/kontak"
              className="btn btn-primary rounded-full px-6 text-sm font-semibold shadow-none"
            >
              Reservasi
            </NavLink>
          </Magnetic>

          <button
            type="button"
            aria-label="Akun saya"
            className="grid size-9 place-items-center rounded-full bg-primary text-primary-content transition-transform duration-200 hover:scale-105"
          >
            <User size={18} />
          </button>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            onClick={() => setMobileOpen((open) => !open)}
            className="grid size-9 place-items-center rounded-full text-dark transition-colors hover:bg-base-200 lg:hidden"
          >
            {mobileOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </nav>

      {/* Menu mobile.
          AnimatePresence memungkinkan animasi KELUAR — tanpa ini, elemen langsung
          hilang dari DOM begitu state jadi false dan tidak sempat dianimasikan. */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            id="menu-mobile"
            key="menu-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: ease.inOut }}
            className="overflow-hidden border-t border-base-300 bg-base-100 lg:hidden"
          >
            <ul className="section-container flex flex-col py-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block border-l-2 py-3 pl-4 text-base transition-colors ${
                        isActive
                          ? "border-primary font-semibold text-primary"
                          : "border-transparent text-dark hover:border-base-300"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
