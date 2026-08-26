import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Reviews from "./pages/Reviews";
import Galeri from "./pages/Galeri";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

/**
 * Slug memakai bahasa Indonesia (/ulasan, /galeri, /kontak) karena isi situsnya
 * berbahasa Indonesia. URL yang cocok dengan kata kunci pencarian pengguna
 * memberi sinyal relevansi ke Google dan lebih mudah diingat pelanggan.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route tanpa `path` = layout route. Semua anak di dalamnya
            memakai kerangka <Layout /> yang sama. */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/ulasan" element={<Reviews />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/kontak" element={<Contact />} />
          <Route path="/tentang" element={<About />} />
          {/* "*" menangkap semua URL yang tidak cocok di atas. */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
