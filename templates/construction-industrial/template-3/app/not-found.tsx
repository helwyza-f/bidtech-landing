import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-orange-600/20 border border-orange-500 text-orange-500 flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-4xl">engineering</span>
        </div>
        <h1 className="text-6xl font-black font-heading tracking-tight mb-2">404</h1>
        <h2 className="text-xl font-bold uppercase tracking-wider text-slate-300 mb-4">
          Halaman Sedang Dalam Konstruksi
        </h2>
        <p className="text-slate-400 text-sm mb-8">
          Halaman yang Anda cari tidak ditemukan atau telah dipindahkan ke alur kerja proyek lainnya.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-orange-600/30"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Kembali ke Beranda Utama</span>
        </Link>
      </div>
    </div>
  );
}
