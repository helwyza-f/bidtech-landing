import Link from "next/link";
import { featuredProducts, products } from "../../data/products";
import { ingredients } from "../../data/ingredients";
import { journal } from "../../data/journal";
import { officialStores } from "../../data/stores";
import { ProductCard } from "../products/product-card";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CommunityGallery } from "./community-gallery";
import { asset } from "../../lib/assets";

const concerns = [
  ["Dryness", asset("/images/community/bathroom-shelf.webp")],
  ["Barrier Support", asset("/images/community/product-closeup.webp")],
  ["Dullness", asset("/images/community/serum-texture-lifestyle.webp")],
  ["Blemishes", asset("/images/community/community-campaign.webp")],
  ["Sensitivity", asset("/images/community/packaging-detail.webp")],
  ["Daily Protection", asset("/images/community/bathroom-shelf.webp")],
] as const;

const principles = [
  ["01", "Useful ingredients", "Every formula begins with a clear purpose."],
  ["02", "Skin comfort first", "Actives should fit into real routines without turning skincare into a challenge."],
  ["03", "Full formula clarity", "Explain what each hero ingredient is there to do in plain language."],
  ["04", "Considered packaging", "Practical, minimal packaging that is easier to understand and rebrand."],
] as const;

const reviews = [
  { quote: "The texture disappears quickly and layers well under sunscreen.", name: "Alya", concern: "Dryness", product: "Barrier Reset Serum" },
  { quote: "Simple enough that I actually remember the routine every morning.", name: "Raka", concern: "Daily Protection", product: "Sun Veil SPF 50" },
  { quote: "It feels calm and clear—nothing in the routine fights for attention.", name: "Mira", concern: "Sensitivity", product: "Cloud Milk Cleanser" },
];

export function ManifestoSection() {
  return (
    <section className="manifestoSection section">
      <div className="shell manifestoGrid">
        <span className="eyebrow">The Chulla approach</span>
        <h2>Skincare should support your skin, <em>not compete with it.</em></h2>
        <p>We design uncomplicated daily formulas around skin comfort, useful actives, and textures you will actually want to use consistently.</p>
      </div>
    </section>
  );
}

export function FeaturedProductsSection() {
  return (
    <section className="section productSection">
      <div className="shell">
        <div className="sectionHeader">
          <div><span className="eyebrow">Product edit / 01</span><h2>Daily essentials</h2></div>
          <Link className="textLink" href="/products">
            Explore all products 
            <ArrowRight size={15} strokeWidth={1.5} />
          </Link>
        </div>
        <div className="productGrid productGrid--featured">
          {featuredProducts.map((product) => <ProductCard product={product} key={product.id} />)}
        </div>
      </div>
    </section>
  );
}

export function ConcernSection() {
  return (
    <section className="section concernSection">
      <div className="shell">
        <div className="sectionHeader sectionHeader--wide"><div><span className="eyebrow">Discovery / 02</span><h2>Start with what your skin needs.</h2></div></div>
        <div className="concernGrid">
          {concerns.map(([name, image], index) => (
            <Link className="concernTile" key={name} href={`/products?concern=${encodeURIComponent(name)}`}>
              <img src={image} alt="" loading="lazy" />
              <span className="concernTile__shade" />
              <span className="concernTile__index">0{index + 1}</span>
              <span className="concernTile__label">{name} 
                <b><ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                /></b>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SignatureStorySection() {
  const serum = products.find(
    (item) => item.slug === "barrier-reset-serum"
  )!;

  return (
    <section className="signatureStory section">
      <div className="shell signatureStory__grid">
        <div className="signatureStory__visual">
          <span
            className="signatureStory__ghost"
            aria-hidden="true"
          >
            RESET
          </span>

          <img
            className="signatureStory__texture"
            src={asset("/images/textures/serum-macro.webp")}
            alt=""
            loading="lazy"
          />

          <img
            className="signatureStory__product"
            src={serum.images[1]}
            alt={serum.name}
            loading="lazy"
          />
        </div>

        <div className="signatureStory__copy">
          <span className="eyebrow">
            The barrier edit
          </span>

          <h2>
            A reset for skin that feels{" "}
            <em>overworked.</em>
          </h2>

          <p>{serum.description}</p>

          <div className="ruledFacts">
            {serum.keyIngredients.map(
              (item, index) => (
                <div key={item}>
                  <span>0{index + 1}</span>
                  <strong>{item}</strong>
                </div>
              )
            )}
          </div>

          <Link
            className="button button--dark"
            href={`/products/${serum.slug}`}
          >
            Discover Barrier Reset
            <ArrowRight
              size={15}
              strokeWidth={1.5}
            />
          </Link>

          <div className="signatureStory__micro">
            <span>Lightweight texture</span>
            <span>Fragrance-free concept</span>
            <span>AM + PM</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PrinciplesSection() {
  return (
    <section className="section principlesSection">
      <div className="shell">
        <div className="sectionHeader sectionHeader--wide"><div><span className="eyebrow">Why Chulla</span><h2>Clear principles. Better daily habits.</h2></div></div>
        <div className="principleList">
          {principles.map(([index, title, copy]) => 
            <div className="principleRow" key={index}>
              <span>{index}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <b>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
            </b>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function RoutineSection() {
  const routine = ["cloud-milk-cleanser", "barrier-reset-serum", "dew-barrier-cream", "sun-veil-spf-50"]
    .map((slug) => products.find((item) => item.slug === slug)!);
  return (
    <section className="section routineSection">
      <div className="shell routineGrid">
        <div className="routineCopy">
          <span className="eyebrow">Daily method / 04</span>
          <h2>A routine you can <em>remember.</em></h2>
          <p>Four clear roles. Each step has a reason to exist, and every product remains explorable on its own.</p>
          <div className="routineSteps">
            {routine.map((product, index) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="routineStep"
                data-routine-step={index}
              >
                <span>0{index + 1}</span>

                <div>
                  <strong>{product.routineStep}</strong>
                  <small>{product.name}</small>
                </div>

                <b>
                  <ArrowRight
                    size={15}
                    strokeWidth={1.5}
                  />
                </b>
              </Link>
            ))}
          </div>
        </div>
        <div
          className="routineStage"
          aria-label="Four product routine"
        >
          {routine.map((product, index) => (
            <img
              key={product.id}
              className={`routineStage__product routineStage__product--${index + 1}`}
              data-routine-product={index}
              src={product.images[1]}
              alt={product.name}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function IngredientStorySection() {
  return (
    <section className="section ingredientStory">
      <div className="shell ingredientStory__grid">
        <div className="ingredientStory__copy">
          <span className="eyebrow">Ingredient notes / 01</span>
          <h2>Support first. <em>Actives second.</em></h2>
          <p>Chulla pairs functional actives with comfort-supporting ingredients so product education feels useful instead of overwhelming.</p>
          <div className="ingredientMiniList">
            {ingredients.slice(0, 3).map((ingredient) => <div key={ingredient.name}><strong>{ingredient.name}</strong><span>{ingredient.purpose}</span></div>)}
          </div>
          <Link className="textLink" href="/ingredients">
            Explore ingredients
            <ArrowRight size={15} strokeWidth={1.5} />
          </Link>
        </div>
        <div className="ingredientStory__media">
          <img src={asset("/images/community/serum-texture-lifestyle.webp")} alt="Serum texture and skincare ritual" loading="lazy" />
          <span>Centella + Ceramides</span>
        </div>
      </div>
    </section>
  );
}

export function CampaignBreakSection() {
  return (
    <section className="campaignBreak">
      <img src={asset("/images/community/community-campaign.webp")} alt="Chulla editorial skincare campaign" loading="lazy" />
      <div className="campaignBreak__shade" />
      <div className="campaignBreak__copy shell"><span className="eyebrow">Consistency / 05</span><h2>Good skin days begin with consistency.</h2>
        <Link className="button button--light" href="/#routine">
          Build your routine
          <ArrowRight size={15} strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  return (
    <section className="section reviewsSection">
      <div className="shell">
        <span className="eyebrow">In their routine</span>
        <div className="reviewsGrid">
          <blockquote className="reviewLead">“{reviews[0].quote}”<footer>{reviews[0].name} · {reviews[0].concern} · {reviews[0].product}</footer></blockquote>
          <div className="reviewStack">{reviews.slice(1).map((review) => <blockquote key={review.name}>“{review.quote}”<footer>{review.name} · {review.concern} · {review.product}</footer></blockquote>)}</div>
        </div>
      </div>
    </section>
  );
}

export function JournalSection() {
  return (
    <section className="section journalSection">
      <div className="shell">
        <div className="sectionHeader"><div><span className="eyebrow">Skin Notes</span><h2>Guides for a clearer routine.</h2></div>
          <Link className="textLink" href="/skin-notes">
            Read all notes
            <ArrowRight size={15} strokeWidth={1.5} />
          </Link>
        </div>
        <div className="journalGrid">
          {journal.map((article) => 
            <article key={article.slug} className="articleCard">
              <Link href={`/skin-notes#${article.slug}`}>
                <div className="articleCard__media">
                  <img src={article.image} alt="" loading="lazy" />
                </div>
                <span className="eyebrow">{article.category} · {article.readTime}</span>
                <h3>{article.title}</h3>
                <span className="textLink">
                  Read note 
                  <ArrowRight size={15} strokeWidth={1.5} />
                </span>
              </Link>
            </article>)}
        </div>
      </div>
    </section>
  );
}

export function CommunitySection() {
  return (
    <section className="section communitySection">
      <div className="shell communitySection__head">
        <div>
          <span className="eyebrow">
            Community / daily textures
          </span>

          <h2>@chullaskin</h2>
        </div>

        <p>
          Daily textures, routines, and skin notes.
        </p>
      </div>

      <CommunityGallery />
    </section>
  );
}

export function OfficialStoresSection() {
  return (
    <section id="official-stores" className="section officialStoresSection">
      <div className="shell officialStoresGrid">
        <div><span className="eyebrow">Where to find Chulla</span><h2>Ready when you are.</h2><p>Explore availability and purchase through Chulla&apos;s official marketplace stores.</p></div>
        <div className="officialStoreLinks">
          {Object.values(officialStores).map((store, index) => 
            <a key={store.label} href={store.href} target="_blank" rel="noopener noreferrer">
              <span>0{index + 1}</span>
              <strong>{store.label}</strong>
              <b>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />                
              </b>
            </a>
          )}
          <small>Pricing, stock, promotions, shipping, and transactions are handled by the marketplace.</small>
        </div>
      </div>
    </section>
  );
}

export function NewsletterSection() {
  return (
    <section className="newsletterSection section">
      <div className="shell newsletterGrid">
        <div>
          <span className="eyebrow">Chulla notes</span>
          <h2>A better note for your inbox.</h2>
          <p>Product launches, skin guides, and occasional offers.</p>
        </div>
        <form className="newsletterForm" action="#">
          <label>
            <span className="srOnly">Email address</span>
            <input type="email" placeholder="Email address" />
          </label>
          <button type="submit" className="flex flex-row items-center gap-2">
            <span>Join Chulla</span>
            <ArrowRight size={15} strokeWidth={1.5} />
          </button>
        </form>
      </div>
    </section>
  );
}
