"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { cartCount } = useCart();
  const pathname = usePathname();
  const links = [
    ["Shop prawns", "/products"],
    ["Our story", "/our-story"],
    ["Our standards", "/certifications"],
  ];
  return (
    <header className="store-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="nav-inner">
        <Link href="/home" className="brand" aria-label="Wave of Bengal home">
          <Image
            src="/images/WOB-black-4.png"
            alt="Wave of Bengal"
            width={166}
            height={54}
            priority
            unoptimized
          />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
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
        <div className="nav-actions">
          <Link className="account-link" href={user ? "/account" : "/login"}>
            {user ? "Account" : "Sign in"}
          </Link>
          <Link
            className="bag-link"
            href="/cart"
            aria-label={`Shopping bag, ${cartCount} items`}
          >
            <svg
              width="20"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M5 7h14l1 14H4L5 7Z" />
              <path d="M8 8V6a4 4 0 0 1 8 0v2" />
            </svg>
            <span>Bag ({cartCount})</span>
          </Link>
          <button
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          className="mobile-nav"
          aria-label="Mobile navigation"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {[
            ...links,
            ["Sustainability", "/sustainability"],
            [user ? "My account" : "Sign in", user ? "/account" : "/login"],
          ].map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
