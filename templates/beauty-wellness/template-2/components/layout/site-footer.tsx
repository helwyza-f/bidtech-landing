import Link from "next/link";
import { officialStores } from "../../data/stores";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="siteFooter__grid shell">
        <div className="siteFooter__brand">
          <span className="wordmark wordmark--footer">CHULLA</span>
          <p>Thoughtful daily essentials built around comfort, clarity, and consistent routines.</p>
        </div>
        <div>
          <span className="footerLabel">Products</span>
          <Link href="/products">All Products</Link>
          <Link href="/products?collection=daily-essentials">Daily Essentials</Link>
          <Link href="/products?category=Set">Sets</Link>
          <Link href="/skin-concerns">Skin Concerns</Link>
        </div>
        <div>
          <span className="footerLabel">Discover</span>
          <Link href="/our-approach">Our Approach</Link>
          <Link href="/ingredients">Ingredients</Link>
          <Link href="/skin-notes">Skin Notes</Link>
          <Link href="/our-approach#about">About Chulla</Link>
        </div>
        <div>
          <span className="footerLabel">Connect</span>
          <a href="mailto:hello@chulla.example">Contact</a>
          <a href="#faq">FAQ</a>
          {Object.values(officialStores).map((store) => (
            <a key={store.label} href={store.href} target="_blank" rel="noopener noreferrer" className="flex flex-row gap-2 items-center">
              <span>{store.label}</span>
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
      <div className="siteFooter__bottom shell">
        <div>Instagram · TikTok · Indonesia</div>
        <div>© Chulla 2026 · Terms · Privacy</div>
      </div>
    </footer>
  );
}
