"use client";

import { useSyncExternalStore, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DEFAULT_PRODUCTS,
  getCatalogue,
  money,
  normalizeProduct,
} from "@/lib/catalog";

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

export function ProductCard({ product }) {
  const starting = Math.min(...product.sizes.map((size) => size.price));
  return (
    <Link className="product-card" href={`/products/${product.id}`}>
      <div className="product-photo">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 30vw"
          unoptimized={!product.image?.startsWith("/")}
        />
        <span className="product-tag">{product.category}</span>
        <span className="product-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
      <div className="product-meta">
        <h3>{product.name}</h3>
        <span>From {money(starting)}</span>
      </div>
      <p>{product.description}</p>
      <span className="product-link">
        {product.stock === 0 ? "Currently unavailable" : "Choose your pack"}{" "}
        <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

export default function Shop({ home = false }) {
  const products = useCatalogue();
  const [category, setCategory] = useState("All");
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
      : (Math.min(...a.sizes.map((s) => s.price)) -
          Math.min(...b.sizes.map((s) => s.price))) *
        (sort === "low" ? 1 : -1),
  );
  return (
    <>
      {home && (
        <section className="coastal-hero">
          <div className="hero-copy">
            <span className="eyebrow">
              WAVE OF BENGAL · THE PRAWN COLLECTION
            </span>
            <h1>
              Good food.
              <br />
              Great beginnings.
            </h1>
            <p>
              Sweet, succulent prawns. A little coastal inspiration. Everything
              you need to make a meal worth slowing down for.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/products">
                Shop the collection <span aria-hidden="true">↗</span>
              </Link>
              <Link className="text-link" href="/our-story">
                Our Bengal story →
              </Link>
            </div>
            <span className="hero-footnote">
              For everyday favourites. And special occasions.
            </span>
          </div>
          <div className="hero-photo">
            <Image
              src="/images/black%20tiger.jpeg"
              alt="Raw Black Tiger Prawns arranged with herbs and citrus"
              fill
              priority

              sizes="(max-width: 760px) 100vw, 55vw"
            />
            <div className="hero-caption">
              <span>THE SIGNATURE SELECTION</span>
              <strong>Black Tiger Prawns</strong>
              <Link href="/products/black-tiger-prawns">
                Discover the favourite ↗
              </Link>
            </div>
          </div>
        </section>
      )}
      {home && (
        <div className="service-strip">
          <span>
            01 <strong>Find your favourite</strong>
          </span>
          <span>
            02 <strong>Choose your pack</strong>
          </span>
          <span>
            03 <strong>Make something memorable</strong>
          </span>
        </div>
      )}
      <section className="shop-section shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              {home ? "A TASTE OF THE COAST" : "THE COLLECTION"}
            </span>
            {home ? (
              <h2>Your next favourite meal.</h2>
            ) : (
              <h1>Prawns, perfectly picked.</h1>
            )}
            <p>
              {home
                ? "From a simple supper to the centre of the table."
                : "Discover the selection. Pick a pack. Make it your own."}
            </p>
          </div>
          {home && (
            <Link className="text-link" href="/products">
              Explore all prawns ↗
            </Link>
          )}
        </div>
        {!home && (
          <>
            <div className="shop-tools">
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
            <div className="filter-row" aria-label="Product categories">
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
            <p className="result-count" role="status">
              {visible.length} selections
            </p>
          </>
        )}
        <div className="product-grid">
          {(home ? products.slice(0, 3) : visible).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {!home && !visible.length && (
          <div className="empty-state">
            <h2>No matches just yet.</h2>
            <p>Try another name or explore the whole collection.</p>
            <button
              className="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
      {home && (
        <section className="story-feature shell">
          <div className="story-image">
            <Image
              src="/images/skewers.jpeg"
              alt="Prawn skewers ready for cooking"
              fill

              sizes="(max-width: 760px) 100vw, 50vw"
            />
          </div>
          <div className="story-copy">
            <span className="eyebrow">ROOTED IN BENGAL</span>
            <h2>
              A coastal heart.
              <br />A place at your table.
            </h2>
            <p>
              Our love for seafood starts in Bengal. We bring that love to a
              carefully chosen collection of prawns, made for home cooks and
              professional kitchens alike.
            </p>
            <Link className="text-link" href="/our-story">
              Get to know Wave of Bengal ↗
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
