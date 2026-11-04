"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";
import { BagIcon } from "@/components/storefront/icons";
import InstallApp from "@/components/storefront/InstallApp";

const links = [
  ["Shop prawns", "/products"],
  ["Our Story", "/our-story"],
  ["Help & delivery", "/faq"],
  ["Cook with AI", "/cook"],
];

// Only claims the store already makes elsewhere (shipping, product copy).
function Ticker() {
  return <div className="boutique-announcement"><span>Savour the finest.</span><Link href="/shipping">Complimentary delivery on orders ₹2,000+ <span aria-hidden="true">→</span></Link></div>;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { cartCount } = useCart();
  const pathname = usePathname();

  // Close the menu on navigation and on Escape from anywhere on the page.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const mobileLinks = [
    ...links,
    ["Your orders", "/account/orders"],
    ["Contact Us", "/contact"],
    [user ? "My account" : "Sign in", user ? "/account" : "/login"],
  ];

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Ticker />
      <header className="wc-header">
        <InstallApp />
        <div className="wc-header-inner">
          <Link
            href="/home"
            className="wc-brand"
            aria-label="Wave of Bengal home"
          >
            <Image
              src="/images/wave-of-bengal-logo.png"
              alt="Wave of Bengal"
              width={1413}
              height={768}
              priority
              />
          </Link>
          <nav className="wc-nav" aria-label="Main navigation">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname.startsWith(href) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="wc-actions">
            <Link className="wc-account" href={user ? "/account" : "/login"}>
              {user ? "Account" : "Sign in"}
            </Link>
            <Link
              className="wc-bag"
              href="/cart"
              aria-label={`Shopping bag, ${cartCount} items`}
            >
              <BagIcon width={20} height={20} />
              <span>Bag</span>
              <b data-empty={cartCount === 0 || undefined}>{cartCount}</b>
            </Link>
            <button
              className="wc-menu-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(!open)}
            >
              <span aria-hidden="true" data-open={open || undefined}>
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
        {open && (
          <nav
            id="mobile-menu"
            className="wc-mobile-nav"
            aria-label="Mobile navigation"
          >
            {mobileLinks.map(([label, href], i) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                <small aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </small>
                {label}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
            <p>Free delivery on orders ₹2,000+</p>
          </nav>
        )}
      </header>
    </>
  );
}
