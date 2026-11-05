"use client";

import { useSyncExternalStore, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DEFAULT_PRODUCTS,
  getCatalogue,
  money,
  normalizeProduct,
} from "@/lib/catalog";
import { useCart } from "@/contexts/CartContext";
import { BagIcon } from "./icons";
import {
  Hero,
  WhyWave,
  CookInvite,
  Story,
} from "./HomeSections";

let snapshot;
const serverCatalogue = DEFAULT_PRODUCTS.map(normalizeProduct);
function readCatalogue() {
  return (snapshot ||= getCatalogue());
}
function subscribe(callback) {
  const update = () => {
    snapshot = undefined;
    callback();
  };
  window.addEventListener("storage", update);
  return () => window.removeEventListener("storage", update);
}
export function useCatalogue() {
  return useSyncExternalStore(subscribe, readCatalogue, () => serverCatalogue);
}

/**
 * Product card. The whole card opens the product page (stretched title link);
 * the pack chips and quick-add sit above that link so a customer can pick a
 * pack and add it without leaving the grid.
 */
export function ProductCard({ product, signature = false }) {
  const { addToCart } = useCart();
  const [sizeId, setSizeId] = useState(product.sizes[0].id);
  const [added, setAdded] = useState(false);
  const timer = useRef(null);
  const [hasAdded, setHasAdded] = useState(false);
  useEffect(() => () => clearTimeout(timer.current), []);
  const size = product.sizes.find((s) => s.id === sizeId) || product.sizes[0];
  const unavailable = product.stock === 0;
  const Heading = signature ? "h1" : "h3";
  const single = product.sizes.length === 1;

  function quickAdd() {
    addToCart(
      {
        id: product.id,
        name: product.name,
        size: size.label,
        price: size.price,
        image: product.image,
      },
      1,
    );
    setAdded(true);
    setHasAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 2200);
  }

  return (
    <article className={signature ? "signature-catch" : "product-card wc-card"}>
      <div className={signature ? "signature-plate" : "product-photo wc-card-photo"}>
        <Image
          src={product.image}
          alt={signature ? product.name : ""}
          priority={signature}
          fill
          sizes={signature ? "(max-width: 760px) 100vw, 55vw" : "(max-width: 600px) 92vw, (max-width: 1000px) 46vw, 30vw"}
          unoptimized={!product.image?.startsWith("/")}
        />
        {signature ? <span className="signature-caption">The signature catch &nbsp; / &nbsp; No. 01</span> : <span className="product-tag">{product.category}</span>}
        {unavailable && <span className="wc-soldout">Unavailable</span>}
      </div>
      <div className={signature ? "signature-copy" : "wc-card-body"}>
        {signature && <span className="wc-kicker">THE BENGAL COLLECTION</span>}
        <Heading>
          <Link className={signature ? "signature-name" : "wc-card-link"} href={`/products/${product.id}`}>
            {product.name}
          </Link>
        </Heading>
        <p className="wc-card-desc">{product.description}</p>
        {signature && <p className="signature-label">Select your pack</p>}
        <div className="wc-card-buy">
          {!single && (
            <div
              className="wc-chips"
              role="group"
              aria-label={`Pack size for ${product.name}`}
            >
              {product.sizes.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={s.id === size.id}
                  onClick={() => {
                    setSizeId(s.id);
                    setAdded(false);
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
          <div className="wc-card-row">
            <div className="wc-card-price">
              <strong>{money(size.price)}</strong>
              {single && <span>{size.label}</span>}
            </div>
            <button
              type="button"
              className="wc-add"
              data-added={added || undefined}
              disabled={unavailable}
              aria-label={`Quick add ${product.name}, ${size.label}`}
              onClick={quickAdd}
            >
              {unavailable ? "Sold out" : added ? "Added ✓" : "Add to bag"}
            </button>
          </div>
          <span className={added ? "market-confirm" : "sr-only"} role="status">
            {added ? `${product.name}, ${size.label} added to your bag.` : ""}
          </span>
          {hasAdded && <Link className="collection-checkout" href="/cart">View bag & checkout <span aria-hidden="true">→</span></Link>}
        </div>
        {signature && <a className="signature-browse" href="#catch-counter">Shop prawns <span aria-hidden="true">↓</span></a>}
      </div>
    </article>
  );
}

// Appears on browse pages once something is in the bag, so the next step is
// always one tap away on a phone.
function BagBar() {
  const { ready, cartCount, cartTotal } = useCart();
  if (!ready || cartCount === 0) return null;
  return (
    <Link className="wc-bagbar" href="/cart">
      <BagIcon width={20} height={20} />
      <span>
        View bag · {cartCount} {cartCount === 1 ? "item" : "items"}
      </span>
      <strong>{money(cartTotal)}</strong>
    </Link>
  );
}

const lowest = (product) => Math.min(...product.sizes.map((s) => s.price));

export default function Shop({ home = false, initialCategory = "All" }) {
  const products = useCatalogue();
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const categories = [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];
  const filtered = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      `${p.name} ${p.description}`.toLowerCase().includes(search.toLowerCase()),
  );
  const visible = [...filtered].sort((a, b) =>
    sort === "featured"
      ? 0
      : (lowest(a) - lowest(b)) * (sort === "low" ? 1 : -1),
  );
  const reset = () => {
    setSearch("");
    setCategory("All");
  };

  const signature = home && products.find((p) => p.id === "black-tiger-prawns" && p.stock !== 0);
  return (
    <>
      {home ? (signature ? <ProductCard product={signature} signature /> : <Hero products={products} />) : (
      <section className="wc-page-head">
        <div className="shell">
          <span className="wc-kicker">THE COLLECTION</span>
          <h1>Prawns, perfectly picked.</h1>
          <p>Discover the selection. Pick a pack. Make it your own.</p>
        </div>
      </section>
      )}
      <section id="catch-counter" className="shell wc-section wc-collection" aria-label="Shop the catch">
        {home && <div className="market-counter-title"><span className="wc-kicker">OUR CATCH</span><h2>A collection for your table.</h2><p>Choose your favourite. We’ll take care of the pack.</p></div>}
        {(!home || products.length > 6) && (
        <div className="shop-tools wc-tools">
          <label className="search-field">
            <span aria-hidden="true">⌕</span>
            <input
              aria-label="Search prawns"
              placeholder="Find your favourite prawns…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <label className="sort-field">
            Sort by{" "}
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </label>
        </div>
        )}
        <div
          className="filter-row wc-filters"
          role="group"
          aria-label="Product categories"
        >
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              className={category === c ? "filter active" : "filter"}
              onClick={() => setCategory(c)}
            >
              {c === "All" ? "All prawns" : c}
            </button>
          ))}
        </div>
        <div className="wc-resultbar">
          <p className="result-count" role="status">
            {visible.length} selections
            {category !== "All" ? ` · ${category}` : ""}
          </p>
          {(category !== "All" || search) && (
            <button className="text-link reset-selection" onClick={reset}>
              Clear filters ×
            </button>
          )}
        </div>
        <div className="product-grid wc-grid">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {!visible.length && (
          <div className="empty-state">
            <h2>No matches just yet.</h2>
            <p>Try another name or explore the whole collection.</p>
            <button className="button" onClick={reset}>
              Clear filters
            </button>
          </div>
        )}
      </section>
      {home && <><Story /><CookInvite /><WhyWave /></>}
      <BagBar />
    </>
  );
}
