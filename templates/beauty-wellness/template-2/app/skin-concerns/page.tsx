import Link from "next/link";
import { SiteShell } from "../../components/layout/site-shell";
import { products } from "../../data/products";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "Skin Concerns" };

const concerns = ["Dryness", "Barrier Support", "Dullness", "Blemishes", "Sensitivity", "Daily Protection"];

export default function SkinConcernsPage() {
  return (
    <SiteShell>
      <section className="pageHero">
        <div className="shell pageHero__grid"><span className="eyebrow">Concern-led discovery</span><h1>Start with what your skin <em>needs today.</em></h1><p>Use concerns as a browsing lens, not a diagnosis. Each path leads back to Chulla’s local product catalog.</p></div>
      </section>
      <section className="section concernIndex"><div className="shell concernIndex__grid">
        {concerns.map((concern, index) => {
          const matches = products.filter((product) => product.concerns.includes(concern));
          return <article key={concern} className="concernIndexCard">
            <span>0{index + 1}</span>
            <h2>{concern}</h2>
            <p>{matches.slice(0, 3).map((product) => product.name).join(" · ")}</p>
            <Link href={`/products?concern=${encodeURIComponent(concern)}`}>
              <span className="flex flex-row gap-2 items-center">
                Explore {matches.length} matching formulations
                <ArrowRight size={15} strokeWidth={1.5} />
              </span>
            </Link>
          </article>;
        })}
      </div></section>
    </SiteShell>
  );
}
