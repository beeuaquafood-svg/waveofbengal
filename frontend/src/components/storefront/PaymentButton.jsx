"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { commerce, loadCheckout } from "@/lib/commerce-client";
export default function PaymentButton({ items, delivery }) {
  const { user } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function pay() {
    setBusy(true);
    setError("");
    try {
      if (!navigator.onLine)
        throw new Error("Reconnect to the internet to pay securely.");
      await loadCheckout();
      const fingerprint = JSON.stringify({ items, delivery });
      let saved = JSON.parse(sessionStorage.getItem("wob-checkout") || "null");
      if (!saved || saved.fingerprint !== fingerprint) {
        saved = { fingerprint, key: crypto.randomUUID() };
        sessionStorage.setItem("wob-checkout", JSON.stringify(saved));
      }
      const { order, key } = await commerce(user, "create", {
        items,
        delivery,
        key: saved.key,
      });
      const destination = `/checkout/confirmation?id=${encodeURIComponent(order.id)}`;
      if (order.status !== "awaiting_payment") {
        router.push(destination);
        return;
      }
      const checkout = new window.Razorpay({
        key,
        order_id: order.razorpayOrderId,
        amount: order.amount,
        currency: "INR",
        name: "Wave of Bengal",
        description: order.number,
        prefill: {
          name: delivery.fullName,
          email: delivery.email,
          contact: delivery.phone,
        },
        theme: { color: "#173d3b" },
        handler: async (response) => {
          try {
            await commerce(user, "verify", { id: order.id, ...response });
          } catch {
            /* Status page reconciles with Razorpay even after a dropped callback. */
          }
          router.push(destination);
        },
        modal: { ondismiss: () => router.push(destination) },
      });
      checkout.on("payment.failed", () =>
        setError(
          "Payment was not completed. Your order page can check its latest status.",
        ),
      );
      checkout.open();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="payment-panel">
      <span className="eyebrow">SECURE CHECKOUT</span>
      <h2>A good meal starts here.</h2>
      <p>
        Pay with UPI, cards or netbanking through Razorpay. Your order is
        confirmed only when payment is verified.
      </p>
      {user ? (
        <button className="button" disabled={busy} onClick={pay}>
          {busy ? "Opening secure payment…" : "Pay securely →"}
        </button>
      ) : (
        <Link className="button" href="/login?next=%2Fcheckout">
          Sign in to pay →
        </Link>
      )}
      <p className="small-note">
        Cancel before dispatch from your order page. Eligible paid cancellations
        start a refund to the original payment method.
      </p>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
