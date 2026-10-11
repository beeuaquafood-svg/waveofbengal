"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/hooks/useAuth";
import OrderSummary, {
  CheckoutSteps,
} from "@/components/storefront/OrderSummary";

const fields = [
  ["fullName", "Full name", "text", "name"],
  ["email", "Email address", "email", "email"],
  ["phone", "Mobile number", "tel", "tel"],
  ["address1", "Address", "text", "address-line1"],
  ["address2", "Apartment, landmark (optional)", "text", "address-line2"],
  ["city", "City", "text", "address-level2"],
  ["state", "State", "text", "address-level1"],
  ["zip", "PIN code", "text", "postal-code"],
];
export default function Checkout() {
  const { cart, ready } = useCart();
  const { user, profile } = useAuth();
  const [step, setStep] = useState(2);
  const heading = useRef(null);
  const [values, setValues] = useState({
    fullName: null,
    email: null,
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });
  const valueFor = (key) =>
    values[key] ??
    (key === "fullName"
      ? profile?.name || user?.displayName || ""
      : key === "email"
        ? user?.email || ""
        : "");
  function review(e) {
    e.preventDefault();
    setStep(3);
    requestAnimationFrame(() => {
      heading.current?.focus();
      heading.current?.scrollIntoView({ block: "start" });
    });
  }
  return (
    <div className="shell checkout-page">
      <CheckoutSteps step={step} />
      <div className="section-heading">
        <div>
          <span className="eyebrow">ALMOST AT THE TABLE</span>
          <h1 tabIndex={-1} ref={heading}>
            {step === 2 ? "Delivery details." : "Review your selection."}
          </h1>
          <p>
            {step === 2
              ? "A few details for your next good meal."
              : "Check your bag and delivery address before the next step."}
          </p>
        </div>
        <Link className="text-link" href="/cart">
          ← Back to bag
        </Link>
      </div>
      {!ready ? (
        <p role="status">Loading your bag…</p>
      ) : !cart.length ? (
        <div className="empty-state">
          <h2>Your bag is empty.</h2>
          <Link className="button" href="/products">
            Explore prawns →
          </Link>
        </div>
      ) : (
        <div className="commerce-grid">
          <div className="checkout-form-panel">
            {step === 2 ? (
              <>
                {!user && (
                  <p className="sign-in-note">
                    Already a customer?{" "}
                    <Link href="/login?next=%2Fcheckout">Sign in</Link> or
                    continue as a guest.
                  </p>
                )}
                <form className="fields delivery-fields" onSubmit={review}>
                  <h2>Where should it go?</h2>
                  <div className="field-grid">
                    {fields.map(([key, label, type, autocomplete]) => (
                      <label
                        key={key}
                        className={
                          key.startsWith("address") ? "full-field" : ""
                        }
                      >
                        {label}
                        <input
                          name={key}
                          type={type}
                          autoComplete={autocomplete}
                          value={valueFor(key)}
                          onChange={(e) =>
                            setValues({ ...values, [key]: e.target.value })
                          }
                          required={key !== "address2"}
                          pattern={
                            key === "zip"
                              ? "[1-9][0-9]{5}"
                              : key === "phone"
                                ? "\+?[0-9 ()-]{10,18}"
                                : undefined
                          }
                          inputMode={key === "zip" ? "numeric" : undefined}
                          maxLength={key === "zip" ? 6 : undefined}
                          title={
                            key === "zip"
                              ? "Enter a valid six-digit Indian PIN code"
                              : undefined
                          }
                        />
                      </label>
                    ))}
                  </div>
                  <p className="small-note">
                    Country: India. Delivery availability and timing must be
                    confirmed for your address.
                  </p>
                  <button className="button" type="submit">
                    Review order →
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="review-heading">
                  <h2>Delivery address</h2>
                  <button className="text-link" onClick={() => setStep(2)}>
                    Edit details
                  </button>
                </div>
                <address>
                  {valueFor("fullName")}
                  <br />
                  {values.address1}
                  <br />
                  {values.address2 && (
                    <>
                      {values.address2}
                      <br />
                    </>
                  )}
                  {values.city}, {values.state} {values.zip}
                  <br />
                  India
                  <br />
                  <br />
                  {valueFor("email")}
                  <br />
                  {values.phone}
                </address>
                <div className="checkout-notice" role="status">
                  <h2>Online ordering is coming soon.</h2>
                  <p>
                    Your selection is saved in your bag. Payment and order
                    processing aren’t available yet, so no order has been placed
                    and you haven’t been charged.
                  </p>
                  <p>Please check back to complete your purchase.</p>
                </div>
                <Link className="button secondary" href="/cart">
                  Return to your bag →
                </Link>
              </>
            )}
          </div>
          <OrderSummary>
            <p className="small-note">
              This is an estimate. Your order is only confirmed after a
              supported payment and order service accepts it.
            </p>
          </OrderSummary>
        </div>
      )}
    </div>
  );
}
