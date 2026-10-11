"use client";
import { useCart } from "@/contexts/CartContext";
import { money, totals } from "@/lib/catalog";
export default function OrderSummary({ children }) {
  const { cart, cartTotal } = useCart();
  const { shipping, tax, total } = totals(cartTotal);
  return (
    <aside className="order-summary">
      <span className="eyebrow">THE GOOD THINGS, TOGETHER</span>
      <h2>Order summary</h2>
      <div className="summary-lines">
        {cart.map((item) => (
          <div key={item.key}>
            <span>
              {item.name}
              <small>
                {item.size} · Qty {item.quantity}
              </small>
            </span>
            <strong>{money(item.price * item.quantity)}</strong>
          </div>
        ))}
      </div>
      <dl>
        <div>
          <dt>Subtotal</dt>
          <dd>{money(cartTotal)}</dd>
        </div>
        <div>
          <dt>Delivery</dt>
          <dd>{shipping ? money(shipping) : "Free"}</dd>
        </div>
        <div>
          <dt>Estimated tax (5%)</dt>
          <dd>{money(tax)}</dd>
        </div>
        <div className="summary-total">
          <dt>Total</dt>
          <dd>{money(total)}</dd>
        </div>
      </dl>
      {cartTotal < 2000 && cartTotal > 0 && (
        <p className="delivery-note">
          You’re {money(2000 - cartTotal)} away from free delivery.
        </p>
      )}
      {children}
    </aside>
  );
}
export function CheckoutSteps({ step = 1 }) {
  return (
    <ol className="checkout-steps" aria-label="Checkout progress">
      {["Bag", "Delivery", "Review"].map((name, i) => (
        <li
          key={name}
          aria-current={step === i + 1 ? "step" : undefined}
          className={step >= i + 1 ? "current" : ""}
        >
          <span>{i + 1}</span>
          {name}
        </li>
      ))}
    </ol>
  );
}
