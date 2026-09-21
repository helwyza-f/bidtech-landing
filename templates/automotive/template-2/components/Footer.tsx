import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="kontak" className="bg-white border-t border-border pt-16 pb-8 overflow-hidden w-full max-w-[100vw]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold tracking-tight">Pinjam<span className="text-primary">Mobil</span></span>
            </Link>
            <p className="text-sm text-gray-500 mb-6">
              Solusi mobilitas harian dan bulanan yang praktis, aman, dan nyaman untuk setiap perjalanan Anda.
            </p>
            <p className="text-sm font-medium">© 2024 Pinjam Mobil. All rights reserved.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Tentang Kami</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Karir</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Hubungi Kami</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Layanan</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Lepas Kunci</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Dengan Sopir</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Antar-Jemput Bandara</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Syarat & Ketentuan</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Kebijakan Privasi</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Kebijakan Pembatalan</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
