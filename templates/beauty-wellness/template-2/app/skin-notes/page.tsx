import { SiteShell } from "../../components/layout/site-shell";
import { journal } from "../../data/journal";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "Skin Notes" };

export default function SkinNotesPage() {
  return (
    <SiteShell>
      <section className="pageHero">
        <div className="shell pageHero__grid">
          <span className="eyebrow">Editorial journal</span>
          <h1>Skin Notes for a more <em>understandable routine.</em></h1>
          <p>Practical education around ingredients, routine order, texture, and everyday consistency.</p>
        </div>
      </section>
      <section className="section journalIndex">
        <div className="shell journalIndex__grid">
          {journal.map((article, index) => 
            <article id={article.slug} key={article.slug} className="journalFeature">
              <div className="journalFeature__media">
                <img src={article.image} alt="" />
              </div>
              <div>
                <span className="eyebrow">0{index + 1} · {article.category} · {article.readTime}</span>
                <h2>{article.title}</h2>
                <p>This Phase 3 page establishes the editorial article system and reusable visual language. Article content can remain local/static until a later content phase.</p>
                <button className="textLink flex flex-row items-center gap-2" type="button">
                  <span>Read note</span>
                  <ArrowRight size={15} strokeWidth={1.5} />
                </button>
              </div>
            </article>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
