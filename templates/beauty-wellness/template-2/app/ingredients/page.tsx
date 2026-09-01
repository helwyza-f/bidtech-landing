import Link from "next/link";
import { SiteShell } from "../../components/layout/site-shell";
import { ingredients } from "../../data/ingredients";
import { products } from "../../data/products";
import { ArrowUpRight } from "lucide-react";

export const metadata = { title: "Ingredients" };

export default function IngredientsPage() {
  return (
    <SiteShell>
      <section className="pageHero"><div className="shell pageHero__grid"><span className="eyebrow">Ingredient glossary</span><h1>Clear language for what goes <em>inside.</em></h1><p>A searchable-ready editorial index designed to connect ingredient education directly to matching Chulla formulations.</p></div></section>
      <section className="section ingredientIndex"><div className="shell">
        {ingredients.map((ingredient, index) => {
          const matches = products.filter((product) => product.keyIngredients.some((item) => item.toLowerCase().includes(ingredient.name.toLowerCase())));
          const id = ingredient.name.toLowerCase().replace(" ", "-");
          return <article id={id} key={ingredient.name} className="ingredientRow">
            <span>0{index + 1}</span>
            <div>
              <h2>{ingredient.name}</h2>
              <small>{ingredient.purpose}</small>
            </div>
            <p>{ingredient.note}</p>
            <div className="ingredientRow__products">
              {matches.length ? matches.map((product) => 
                <Link key={product.id} href={`/products/${product.slug}`} className="flex flex-row items-center gap-2">
                  {product.name} 
                  <ArrowUpRight size={14} strokeWidth={1.5} />
                </Link>) 
                : 
                <span>Used across future Chulla concepts.</span>
              }
            </div>
          </article>;
        })}
      </div></section>
    </SiteShell>
  );
}
