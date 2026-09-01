import { Suspense } from "react";
import { ProductCatalog } from "../../components/products/product-catalog";
import { SiteShell } from "../../components/layout/site-shell";

export const metadata = { title: "Products" };

export default function ProductsPage() {
  return (
    <SiteShell>
      <section className="pageHero pageHero--catalog">
        <div className="shell pageHero__grid">
          <span className="eyebrow">Product discovery / all formulations</span>
          <h1>Find the formula that fits <em>your routine.</em></h1>
          <p>Search by product type, concern, ingredient language, texture, or routine position. Chulla remains a showcase—purchase happens only through official marketplace stores.</p>
        </div>
      </section>
      <section className="section catalogSection"><div className="shell"><Suspense fallback={<div className="catalogEmpty">Loading product discovery…</div>}><ProductCatalog /></Suspense></div></section>
    </SiteShell>
  );
}
