import Link from "next/link";
import type { Product } from "../../types/product";
import { ArrowRight } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="productCard">
      <Link href={`/products/${product.slug}`} className="productCard__media" aria-label={`View ${product.name}`}>
        <img src={product.images[0]} alt={product.name} loading="lazy" />
        {product.images[1] && <img className="productCard__secondary" src={product.images[1]} alt="" loading="lazy" />}
        {(product.bestseller || product.isNew) && <span className="productCard__badge">{product.isNew ? "New" : "Daily essential"}</span>}
      </Link>
      <div className="productCard__copy">
        <span className="eyebrow">{product.category} · {product.routineStep}</span>
        <h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>
        <p>{product.shortBenefit}</p>
        <div className="productCard__meta">{product.keyIngredients.slice(0, 2).join(" · ")}</div>
        <Link className="textLink" href={`/products/${product.slug}`}>
          View product
          <ArrowRight size={15} strokeWidth={1.5} />
        </Link>
      </div>
    </article>
  );
}
