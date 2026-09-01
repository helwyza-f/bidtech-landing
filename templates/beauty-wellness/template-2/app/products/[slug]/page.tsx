import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "../../../components/layout/site-shell";
import { ProductCard } from "../../../components/products/product-card";
import { ProductGallery } from "../../../components/products/product-gallery";
import { officialStores } from "../../../data/stores";
import { getProduct, products } from "../../../data/products";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((candidate) => candidate.slug !== product.slug && (candidate.concerns.some((concern) => product.concerns.includes(concern)) || candidate.routineStep === product.routineStep))
    .slice(0, 3);

  return (
    <SiteShell>
      <section className="pdpHero section">
        <div className="shell">
          <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/products">Products</Link><span>/</span><span>{product.name}</span></div>
          <div className="pdpHero__grid">
            <ProductGallery images={product.images} name={product.name} />
            <div className="pdpInfo">
              <span className="eyebrow">{product.category} · {product.routineStep}</span>
              <h1>{product.name}</h1>
              <p className="pdpInfo__lead">{product.shortBenefit}</p>
              <div className="pdpInfo__facts">
                <div><span>Size</span><strong>{product.size}</strong></div>
                <div><span>Texture</span><strong>{product.texture}</strong></div>
                <div><span>Finish</span><strong>{product.finish ?? "Comfortable"}</strong></div>
              </div>
              <div className="pdpInfo__benefits">{product.benefitHighlights.map((benefit, index) => <div key={benefit}><span>0{index + 1}</span><p>{benefit}</p></div>)}</div>
              <div className="pdpStoreBlock space-y-1">
                <span className="flex flex-row items-center gap-2">
                  <p className="eyebrow">Explore official stores</p>
                  <ArrowUpRight size={14} strokeWidth={1.5} />
                </span>
                <p>Continue to an official Chulla store to check current availability, price, promotions, and shipping.</p>
                <div>{Object.values(officialStores).map((store) => 
                  <a key={store.label} href={store.href} target="_blank" rel="noopener noreferrer">
                    {store.label}
                    <ArrowUpRight size={16} strokeWidth={1.5} /> 
                  </a>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pdpStory section">
        <div className="shell pdpStory__grid">
          <div><span className="eyebrow">What it does / 01</span><h2>Made to make its role <em>obvious.</em></h2><p>{product.description}</p></div>
          <div className="pdpStory__media"><img src={product.images[1] ?? product.images[0]} alt={`${product.name} texture`} /></div>
        </div>
      </section>

      <section className="section pdpDetails"><div className="shell pdpDetails__grid">
        <div><span className="eyebrow">Key ingredients</span>{product.keyIngredients.map((ingredient) => <Link key={ingredient} href={`/ingredients#${ingredient.toLowerCase().replace(" ", "-")}`}>{ingredient} <span><ArrowUpRight size={14} strokeWidth={1.5} /></span></Link>)}</div>
        <div><span className="eyebrow">How to use</span><p>{product.usage}</p></div>
        <div><span className="eyebrow">Best explored for</span>{product.concerns.map((concern) => <Link key={concern} href={`/products?concern=${encodeURIComponent(concern)}`}>{concern} <span><ArrowUpRight size={14} strokeWidth={1.5} /></span></Link>)}</div>
      </div></section>

      <section className="section relatedSection"><div className="shell"><div className="sectionHeader"><div><span className="eyebrow">Continue discovery</span><h2>Related by concern or routine.</h2></div><Link className="textLink" href="/products">All products <ArrowRight size={15} strokeWidth={1.5} /></Link></div><div className="productGrid productGrid--related">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></div></section>
    </SiteShell>
  );
}
