"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCatalogue, ProductCard } from "@/components/storefront/Shop";
import { useCart } from "@/contexts/CartContext";
import { money } from "@/lib/catalog";

function Product({ product, related }) {
  const [sizeId, setSizeId] = useState(product.sizes[0].id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const size = product.sizes.find((s) => s.id === sizeId) || product.sizes[0];
  const unavailable = product.stock === 0;
  return (
    <div className="shell detail-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/home">Home</Link>
        <span>/</span>
        <Link href="/products">Shop prawns</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>
      <div className="detail-grid">
        <div className="detail-photo">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            unoptimized={!product.image?.startsWith("/")}
            sizes="(max-width: 760px) 100vw, 55vw"
          />
          <span className="product-tag">{product.category}</span>
        </div>
        <div className="detail-copy">
          <span className="eyebrow">THE WAVE OF BENGAL COLLECTION</span>
          <h1>{product.name}</h1>
          <p className="detail-description">{product.description}</p>
          <div className="detail-price">
            {money(size.price)}
            <span> / {size.label}</span>
          </div>
          <fieldset className="pack-picker">
            <legend>Choose your pack</legend>
            <div>
              {product.sizes.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={size.id === s.id}
                  className={size.id === s.id ? "pack selected" : "pack"}
                  onClick={() => {
                    setSizeId(s.id);
                    setAdded(false);
                  }}
                >
                  <strong>{s.label}</strong>
                  <span>{money(s.price)}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <div className="purchase-row">
            <div className="quantity-control">
              <button
                aria-label="Decrease quantity"
                disabled={quantity === 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                −
              </button>
              <output aria-label="Quantity">{quantity}</output>
              <button
                aria-label="Increase quantity"
                disabled={quantity === Math.min(99, product.stock ?? 99)}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              className="button"
              disabled={unavailable}
              onClick={() => {
                addToCart(
                  {
                    id: product.id,
                    name: product.name,
                    size: size.label,
                    price: size.price,
                    image: product.image,
                  },
                  quantity,
                );
                setAdded(true);
              }}
            >
              {unavailable
                ? "Currently unavailable"
                : `Add to bag · ${money(size.price * quantity)}`}
            </button>
          </div>
          {added && (
            <div className="added-notice" role="status">
              Added to your bag. <Link href="/cart">View bag & checkout →</Link>
            </div>
          )}
          <p className="small-note">
            Delivery ₹100. Free delivery on orders of ₹2,000 or more.
            <br />
            Estimated tax shown in your bag.
          </p>
          <div className="product-details">
            <details open>
              <summary>What’s in your pack</summary>
              <p>{product.whatYouReceiveDetail || product.description}</p>
            </details>
            <details>
              <summary>Storage & preparation</summary>
              <p>
                Follow the storage and cooking instructions on your pack. Thaw
                in the refrigerator and cook thoroughly before serving.
              </p>
            </details>
            <details>
              <summary>Allergen information</summary>
              <p>
                Contains crustaceans. For marinated or breaded products, check
                the pack for the full ingredient and allergen list before use.
              </p>
            </details>
          </div>
        </div>
      </div>
      <section className="related-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">KEEP EXPLORING</span>
            <h2>Something else for the table?</h2>
          </div>
          <Link className="text-link" href="/products">
            All prawns →
          </Link>
        </div>
        <div className="product-grid">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
export default function ProductDetail() {
  const { id } = useParams();
  const products = useCatalogue();
  const product = products.find((p) => p.id === id);
  if (!product)
    return (
      <div className="shell empty-state">
        <h1>This selection isn’t available.</h1>
        <p>Explore the current collection to find your next favourite.</p>
        <Link className="button" href="/products">
          Back to the collection
        </Link>
      </div>
    );
  return (
    <Product
      key={product.id}
      product={product}
      related={products.filter((p) => p.id !== id).slice(0, 3)}
    />
  );
}
