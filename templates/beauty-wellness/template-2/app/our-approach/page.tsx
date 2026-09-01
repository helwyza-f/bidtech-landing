import { SiteShell } from "../../components/layout/site-shell";
import { ArrowUpRight } from "lucide-react";

export const metadata = { title: "Our Approach" };

const principles = [
  ["01", "Useful ingredients", "Every formula begins with a clear purpose rather than a crowded claim list."],
  ["02", "Skin comfort first", "Daily skincare should fit into real routines and feel comfortable enough to repeat."],
  ["03", "Formula clarity", "Hero ingredients are explained in plain language and tied back to routine role."],
  ["04", "Considered packaging", "A restrained packaging system keeps the brand easy to understand and easy to rebrand."],
];

export default function OurApproachPage() {
  return (
    <SiteShell>
      <section className="approachHero pageHero">
        <div className="shell pageHero__grid">
          <span className="eyebrow">The Chulla approach</span>
          <h1>Less noise. <em>Better routine.</em></h1>
          <p>Chulla is designed as a calm, science-aware skincare showcase where composition, product education, and consistency do more work than hype.</p>
        </div>
      </section>
      <section className="approachCampaign">
        <img src="/images/community/community-campaign.webp" alt="Chulla editorial skincare campaign" />
        <div className="approachCampaign__copy">
          <span className="eyebrow">Manifesto / 01</span>
          <h2>Skincare should support your skin, not compete with it.</h2>
        </div>
      </section>
      <section className="section">
        <div className="shell principleList">
          {principles.map(([index, title, copy]) => 
            <div className="principleRow" key={index}>
              <span>{index}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </section>
      <section id="about" className="section aboutChulla">
        <div className="shell aboutChulla__grid">
          <span className="eyebrow">About Chulla</span>
          <h2>A fictional brand built to behave like a real premium skincare system.</h2>
          <p>This frontend-first identity is intentionally reusable: local product data, editorial components, responsive motion, and a clean official-store handoff can later be rebranded for a real skincare company.</p>
        </div>
      </section>
    </SiteShell>
  );
}
