import Seo from "../components/Seo";
import Hero from "../sections/Hero";
import Point from "../sections/Point";
import Catalog from "../sections/Catalog";
import Gallery from "../sections/Gallery";
import Rating from "../sections/Rating";

function Home() {
  return (
    <>
      <Seo
        title="Chef's Table — Restoran Bahan Segar di Pagedangan, Tangerang"
        description="Pengalaman kuliner dengan bahan musiman dan teknik halus. Burger, taco, wrap, dan minuman segar racikan koki. Buka setiap hari di Jl. Pemuda, Cijantra, Pagedangan."
        path="/"
      />

      <Hero />
      <Point />
      <Catalog />
      <Gallery />
      <Rating />
    </>
  );
}

export default Home;
