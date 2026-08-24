import Link from "next/link";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14">
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="mb-5">
                <span className="text-2xl font-extrabold tracking-tight text-blue-600">
                  Rent<span className="text-gray-900">car</span>
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed max-w-sm mb-6">
                Partner terpercaya Anda untuk penyewaan mobil. Berkendara dengan
                nyaman, percaya diri, dan tenang.
              </p>


              <div className="flex items-center gap-3">

                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-xl bg-gray-50 text-gray-500 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>


                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-xl bg-gray-50 text-gray-500 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-4 h-4 fill-none stroke-current stroke-2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>


                <a
                  href="#"
                  aria-label="Twitter"
                  className="w-10 h-10 rounded-xl bg-gray-50 text-gray-500 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
                  </svg>
                </a>


                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-xl bg-gray-50 text-gray-500 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>


          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-6">
              Tautan Cepat
            </h3>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="/"
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/kendaraan"
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Kendaraan
                </Link>
              </li>
              <li>
                <Link
                  href="/#why-choose-us"
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Layanan
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>


          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-6">
              Kontak
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700">
                  +62 812-3456-7890
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <a
                  href="mailto:support@rentcar.com"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  support@rentcar.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700">
                  Sen - Min (08:00 - 20:00)
                </span>
              </li>
            </ul>
          </div>


          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-6">
              Kantor Pusat
            </h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
              <span className="text-sm font-medium text-gray-700 leading-relaxed">
                Jl. Raya Mobil No. 123, Jakarta Selatan, Indonesia
              </span>
            </div>
          </div>

        </div>


        <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] sm:text-xs font-semibold tracking-wider text-gray-400 uppercase text-center sm:text-left">
            © 2024 RENTCAR. HAK CIPTA DILINDUNGI.
          </p>

          <div className="flex items-center gap-6 sm:gap-8">
            <a
              href="#"
              className="text-[11px] sm:text-xs font-semibold tracking-wider text-gray-400 hover:text-gray-600 uppercase transition-colors"
            >
              Kebijakan Privasi
            </a>
            <a
              href="#"
              className="text-[11px] sm:text-xs font-semibold tracking-wider text-gray-400 hover:text-gray-600 uppercase transition-colors"
            >
              Syarat & Ketentuan
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}