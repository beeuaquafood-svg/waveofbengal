"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { money } from "@/lib/catalog";
import OrderSummary, {
  CheckoutSteps,
} from "@/components/storefront/OrderSummary";
export default function Cart() {
  const { cart, ready, cartCount, updateQuantity, removeFromCart } = useCart();
  return (
    <div className="shell bag-page">
      <CheckoutSteps />
      <div className="section-heading">
        <div>
          <span className="eyebrow">A GOOD MEAL STARTS HERE</span>
          <h1>
            Your bag
            {cartCount > 0 && (
              <span className="heading-count"> ({cartCount})</span>
            )}
          </h1>
        </div>
        <Link className="text-link" href="/products">
          Continue shopping →
        </Link>
      </div>
      {!ready ? (
        <p role="status">Loading your bag…</p>
      ) : !cart.length ? (
        <div className="empty-state">
          <h2>A little room for something delicious.</h2>
          <p>Explore our prawn collection and find your next favourite.</p>
          <Link href="/products" className="button">
            Shop prawns ↗
          </Link>
        </div>
      ) : (
        <div className="commerce-grid">
          <div className="bag-items">
            {cart.map((item) => (
              <article className="bag-item" key={item.key}>
                <Link href={`/products/${item.id}`} className="bag-image">
                  <Image
                    src={item.image || "/images/black%20tiger.jpeg"}
                    alt={item.name}
                    fill
                    sizes="140px"
                    unoptimized
                  />
                </Link>
                <div className="bag-item-info">
                  <Link href={`/products/${item.id}`}>
                    <h2>{item.name}</h2>
                  </Link>
                  <p>
                    {item.size} · {money(item.price)} per pack
                  </p>
                  <div className="bag-controls">
                    <div className="quantity-control">
                      <button
                        aria-label={`Decrease ${item.name} ${item.size}`}
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          updateQuantity(item.key, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <output aria-label="Quantity">{item.quantity}</output>
                      <button
                        aria-label={`Increase ${item.name} ${item.size}`}
                        disabled={item.quantity >= 99}
                        onClick={() =>
                          updateQuantity(item.key, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="remove-link"
                      onClick={() => removeFromCart(item.key)}
                      aria-label={`Remove ${item.name} ${item.size}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <strong className="line-price">
                  {money(item.price * item.quantity)}
                </strong>
              </article>
            ))}
          </div>
          <OrderSummary>
            <Link className="button wide" href="/checkout">
              Continue to delivery →
            </Link>
            <p className="small-note">
              No account needed to review your order.
            </p>
          </OrderSummary>
        </div>
      )}
    </div>
  );
}
