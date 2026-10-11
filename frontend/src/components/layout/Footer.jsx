import Link from "next/link";
export default function Footer() {
  return (
    <footer className="store-footer">
      <div className="shell footer-top">
        <div>
          <Link href="/home" className="footer-wordmark">
            Wave of Bengal<span>SEAFOOD, WITH A COASTAL SOUL.</span>
          </Link>
          <p>From our coast to your kitchen.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/products">Shop the collection</Link>
          <Link href="/our-story">Our story</Link>
          <Link href="/sustainability">Sustainability</Link>
          <Link href="/certifications">Our standards</Link>
        </nav>
        <div>
          <span className="eyebrow">MAKE YOURSELF AT HOME</span>
          <p>
            Beautiful ingredients.
            <br />
            Meals to remember.
          </p>
          <Link href="/account">Your account →</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Wave of Bengal</span>
        <span>A little closer to the coast.</span>
        <Link href="/products">Back to the collection ↑</Link>
      </div>
    </footer>
  );
}
