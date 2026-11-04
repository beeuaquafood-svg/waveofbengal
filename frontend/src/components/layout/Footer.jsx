"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SupportForm from "@/components/storefront/SupportForm";

export default function Footer() {
  const pathname = usePathname();
  // Keep the buying funnel free of sign-up prompts; they return after the order.
  const inFunnel = pathname === "/cart" || pathname === "/checkout";
  return (
    <footer className="wc-footer">
      {!inFunnel && (
        <section className="wc-join" aria-labelledby="join-heading">
          <div className="shell wc-join-inner">
            <div>
              <span className="wc-kicker">THE WAVE COLLECTIVE</span>
              <h2 id="join-heading">
                Join the wave.
                <br />
                Eat well.
              </h2>
            </div>
            <div className="newsletter-block">
              <h3>Notes from Bengal.</h3>
              <p>
                Special offers, new selections and inspiration for your next
                meal.
              </p>
              <SupportForm newsletter />
            </div>
          </div>
        </section>
      )}
      <div className="shell wc-footer-main">
        <div className="wc-footer-brand">
          <Link href="/home" className="wc-wordmark">
            <Image src="/images/wave-of-bengal-logo.png" alt="Wave of Bengal" width={1413} height={768} />
          </Link>
          <p>Seafood, with a coastal soul. From our coast to your kitchen.</p>
        </div>
        <nav aria-label="Explore">
          <span className="wc-kicker">EXPLORE</span>
          <Link href="/products">Our Catch</Link>
          <Link href="/cook">Cook with AI</Link>
          <Link href="/our-story">Our Story</Link>
          <Link href="/sustainability">Sustainability</Link>
          <Link href="/certifications">Certifications</Link>
        </nav>
        <nav aria-label="Support">
          <span className="wc-kicker">HERE TO HELP</span>
          <Link href="/faq">FAQ</Link>
          <Link href="/shipping">Shipping &amp; Returns</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/account">Your Account</Link>
        </nav>
      </div>
      <div className="shell wc-footer-bottom">
        <span>
          © {new Date().getFullYear()} Wave of Bengal. All rights reserved.
        </span>
        <span>A little closer to the coast.</span>
      </div>
    </footer>
  );
}
