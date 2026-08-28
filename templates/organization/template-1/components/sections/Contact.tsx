'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Users, Navigation } from 'lucide-react';
import { ORGANIZATION } from '@/lib/constants';

export default function Contact() {
  return (
    <section id="kontak" className="py-20 md:py-24 bg-white border-t border-gray-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Left Column: Heading, Contact Cards, and Collaboration Banner */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 flex flex-col justify-between space-y-6"
          >
            {/* Section Tag */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4 }}
                className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#E05A47] mb-3"
              >
                HUBUNGI KAMI
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#0D4D44] tracking-tight leading-[1.15] mb-4"
              >
                Mari Terhubung dan <br />
                Bersama Membuat <br />
                Dampak Nyata
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg"
              >
                Kami siap menjawab pertanyaan, mendengar ide, dan menjalin kolaborasi untuk masa depan yang lebih baik.
              </motion.p>
            </div>

            {/* 3 Contact Info Cards */}
            <div className="space-y-3.5 pt-1">
              {/* Card 1: Email */}
              <div className="p-4 sm:p-4.5 rounded-2xl bg-[#F8FAF8] border border-gray-100 shadow-sm flex items-center gap-4 hover:border-emerald-200 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#eef5ed] text-[#0D4D44] flex items-center justify-center border border-emerald-200/60 shrink-0">
                  <Mail className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    EMAIL
                  </p>
                  <a
                    href={`mailto:${ORGANIZATION.email}`}
                    className="text-sm sm:text-base font-extrabold text-[#0D4D44] hover:underline"
                  >
                    {ORGANIZATION.email}
                  </a>
                </div>
              </div>

              {/* Card 2: Telepon */}
              <div className="p-4 sm:p-4.5 rounded-2xl bg-[#F8FAF8] border border-gray-100 shadow-sm flex items-center gap-4 hover:border-emerald-200 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#eef5ed] text-[#0D4D44] flex items-center justify-center border border-emerald-200/60 shrink-0">
                  <Phone className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    TELEPON
                  </p>
                  <a
                    href={`tel:${ORGANIZATION.phone}`}
                    className="text-sm sm:text-base font-extrabold text-[#0D4D44] hover:underline"
                  >
                    {ORGANIZATION.phone}
                  </a>
                </div>
              </div>

              {/* Card 3: Lokasi */}
              <div className="p-4 sm:p-4.5 rounded-2xl bg-[#F8FAF8] border border-gray-100 shadow-sm flex items-center gap-4 hover:border-emerald-200 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#eef5ed] text-[#0D4D44] flex items-center justify-center border border-emerald-200/60 shrink-0">
                  <MapPin className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    LOKASI
                  </p>
                  <p className="text-sm sm:text-base font-extrabold text-[#0D4D44]">
                    {ORGANIZATION.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Collaboration Banner Card */}
            <div className="p-5 rounded-2xl bg-[#eef5ed] border border-emerald-200/70 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#0D4D44] shrink-0 shadow-sm">
                <Users className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#0D4D44] mb-1">
                  Terbuka untuk Kolaborasi
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Kami selalu terbuka untuk bekerja sama dalam program pendidikan, pemberdayaan masyarakat, dan pelestarian lingkungan.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Google Maps Card (Equal Height) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-6 bg-white rounded-3xl p-4 sm:p-5 border border-gray-200/90 shadow-xl shadow-gray-200/50 flex flex-col justify-between h-full"
          >
            {/* Interactive Map Frame with flex-1 */}
            <div className="flex-1 w-full min-h-[380px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-gray-100 relative bg-gray-100 shadow-inner">
              <iframe
                title="Peta Lokasi Kami"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.27488052123!2d103.957597!3d1.130141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d9891823d70557%3A0x3039d80b220cc70!2sBatam%2C%20Kota%20Batam%2C%20Kepulauan%20Riau!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                className="w-full h-full min-h-[380px] sm:min-h-[420px] border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>

            {/* Bottom Bar: Lokasi & Buka di Google Maps Button */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eef5ed] text-[#0D4D44] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-gray-900">
                    Lokasi Kami
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    {ORGANIZATION.address}
                  </p>
                </div>
              </div>

              <div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(ORGANIZATION.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#eef5ed] hover:bg-[#dfeee0] text-[#0D4D44] text-xs font-bold px-5 py-3 rounded-xl border border-emerald-200/80 inline-flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
                >
                  <Navigation className="w-4 h-4 fill-current rotate-45" />
                  <span>Buka di Google Maps</span>
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

