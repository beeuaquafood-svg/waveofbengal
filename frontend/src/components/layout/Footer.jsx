import Link from "next/link";
import SupportForm from "@/components/storefront/SupportForm";
export default function Footer() {
  return (
    <footer className="store-footer">
      <div className="shell footer-intro">
        <div>
          <span className="eyebrow">THE COAST, A LITTLE CLOSER.</span>
          <h2>
            Good things.
            <br />
            Worth coming back for.
          </h2>
        </div>
        <div className="newsletter-block">
          <h3>Notes from Bengal.</h3>
          <p>
            Special offers, new selections and inspiration for your next meal.
          </p>
          <SupportForm newsletter />
        </div>
      </div>
      <div className="shell footer-links">
        <div>
          <Link href="/home" className="footer-wordmark">
            Wave of Bengal<span>SEAFOOD, WITH A COASTAL SOUL.</span>
          </Link>
          <p>From our coast to your kitchen.</p>
        </div>
        <nav aria-label="Explore">
          <span className="eyebrow">EXPLORE</span>
          <Link href="/products">Our Catch</Link>
          <Link href="/our-story">Our Story</Link>
          <Link href="/sustainability">Sustainability</Link>
          <Link href="/certifications">Certifications</Link>
        </nav>
        <nav aria-label="Support">
          <span className="eyebrow">HERE TO HELP</span>
          <Link href="/faq">FAQ</Link>
          <Link href="/shipping">Shipping &amp; Returns</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/account">Your Account</Link>
        </nav>
      </div>
      <div className="shell footer-bottom">
        <span>
          © {new Date().getFullYear()} Wave of Bengal. All rights reserved.
        </span>
        <span>A little closer to the coast.</span>
      </div>
    </footer>
  );
}
