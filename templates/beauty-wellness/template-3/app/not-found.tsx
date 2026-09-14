import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0C0C0E] text-white flex flex-col items-center justify-center px-4 font-mono select-none">
      <div className="p-8 border border-zinc-800 bg-[#111113] max-w-md w-full text-center relative">
        <span className="absolute -top-[1px] -left-[1px] text-[#D8F242] text-sm">┌</span>
        <span className="absolute -top-[1px] -right-[1px] text-[#D8F242] text-sm">┐</span>
        <span className="absolute -bottom-[1px] -left-[1px] text-[#D8F242] text-sm">└</span>
        <span className="absolute -bottom-[1px] -right-[1px] text-[#D8F242] text-sm">┘</span>

        <span className="text-[#D8F242] text-xs uppercase tracking-widest block mb-2">
          // ERROR 404 — OUT OF BOUNDS
        </span>
        <h1 className="font-display italic text-5xl font-bold text-white mb-3">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-zinc-400 font-sans text-xs leading-relaxed mb-6">
          Koordinat halaman yang Anda tuju tidak berada dalam pemetaan arsitektur studio Agak Rapi.
        </p>
        <Link
          href="/"
          className="inline-block px-5 py-2.5 bg-white text-black font-mono text-xs uppercase font-bold tracking-widest hover:bg-zinc-200 transition-colors"
        >
          KEMBALI KE BERANDA [ → ]
        </Link>
      </div>
    </div>
  );
}
