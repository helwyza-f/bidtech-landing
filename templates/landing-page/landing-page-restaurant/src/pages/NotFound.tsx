import { Link } from "react-router-dom";
import Seo from "../components/Seo";

function NotFound() {
  return (
    <section className="section-container flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      {/* noIndex: halaman 404 tidak boleh masuk indeks Google. */}
      <Seo
        title="Halaman Tidak Ditemukan"
        description="Halaman yang Anda cari tidak tersedia."
        path="/404"
        noIndex
      />

      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
        Error 404
      </p>
      <h1 className="mt-4 text-4xl font-bold text-dark md:text-5xl">
        Menunya tidak ada di sini
      </h1>
      <p className="mt-4 max-w-md text-base text-neutral/70">
        Halaman yang Anda cari mungkin sudah dipindahkan atau tidak pernah ada.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn btn-primary rounded-full px-6">
          Kembali ke Beranda
        </Link>
        <Link to="/menu" className="btn btn-outline btn-primary rounded-full px-6">
          Lihat Menu
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
